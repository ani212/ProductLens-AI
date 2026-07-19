import { getTeardownData, TeardownReport, resolveProducts, ProductInfo } from './mock-data';

const GEMINI_KEY = process.env.GEMINI_API_KEY || '';
const GROQ_KEY = process.env.GROQ_API_KEY || '';

export async function runTeardownAnalysis(
  productsInput: string,
  objective: string,
  persona: string,
  depth: 'quick' | 'deep'
): Promise<{ report: TeardownReport; isMock: boolean; sourcesCount: number }> {
  
  const productsList = productsInput.split(',').map(p => p.trim()).filter(Boolean);
  const prompt = `
You are a world-class Product Manager and Competitive Intelligence Specialist.
Perform a detailed product teardown and competitive analysis for these products: ${productsList.join(', ')}.
Target Persona: ${persona || 'Startup Product Teams'}
Analysis Objective: ${objective || 'Understand positioning, features, pricing, gaps, and recommendations.'}
Depth: ${depth === 'deep' ? 'Deep Teardown' : 'Quick Scan'}

You must retrieve pricing plans, features, and user reviews for these products. Generate a rigorous comparative analysis.

You must return a single, valid JSON object matching the JSON schema below. DO NOT wrap the JSON in markdown code blocks like \`\`\`json. Return ONLY the raw JSON string.

Schema:
{
  "products": [
    {
      "id": "lowercase_slug",
      "name": "Product Name",
      "website": "URL",
      "logoText": "1-2 char",
      "logoBg": "Tailwind color class, e.g. bg-blue-600 text-white",
      "companyName": "Legal Company Name",
      "category": "Market Category",
      "description": "Short description"
    }
  ],
  "timestamp": "Current Date String",
  "objective": "Objective",
  "persona": "Persona",
  "executiveSummary": {
    "overview": "High-level summary of the comparison",
    "targetAudience": "Summary of target users",
    "strongestAdvantage": { "product_id": "strongest advantage string" },
    "biggestWeakness": { "product_id": "biggest weakness string" },
    "competitivePosition": "Overview of competitive landscape",
    "topOpportunity": "Top overall opportunity for a PM to exploit"
  },
  "overview": {
    "product_id": {
      "company": "Company Name",
      "category": "Category",
      "productType": "SaaS / Mobile / etc",
      "tagline": "Marketing tagline",
      "ratingG2": 4.5,
      "reviewVolume": 1500,
      "pricingEntry": "$10/mo"
    }
  },
  "jtbd": [
    {
      "job": "Core Job statement, e.g. When I want to X, help me Y so I can Z",
      "functional": ["Functional requirement 1"],
      "emotional": ["Emotional need 1"],
      "social": ["Social perception 1"],
      "alternatives": ["Alternative 1", "Alternative 2"]
    }
  ],
  "segments": [
    {
      "name": "Segment Title",
      "mainNeed": "Core frustration/need",
      "productFit": {
        "product_id": 8
      }
    }
  ],
  "positioning": {
    "product_id": {
      "headline": "Core home page headline",
      "corePromise": "Value promise",
      "differentiators": ["Differentiator 1"],
      "primaryCTA": "CTA Text",
      "socialProof": "Proof metrics or logos",
      "messagingClarity": 8
    }
  },
  "features": [
    {
      "capability": "Capability Name",
      "description": "Detail description",
      "status": {
        "product_id": "Advanced or Full or Partial or Basic or No"
      },
      "opportunityScore": "High or Medium or Low"
    }
  ],
  "userJourney": [
    {
      "stage": "Stage Name",
      "userGoal": "User Goal",
      "actions": {
        "product_id": "Description of action"
      },
      "friction": {
        "product_id": "Description of friction"
      },
      "opportunities": ["Ideas to improve"]
    }
  ],
  "heuristics": [
    {
      "dimension": "Ease of Use or Onboarding Flow or Mobile Access",
      "scores": {
        "product_id": 8
      },
      "description": "Explanation of score"
    }
  ],
  "pricing": [
    {
      "planName": "Free Tier / Pro Tier / Enterprise",
      "price": { "product_id": "$0 or $10/mo" },
      "restrictions": { "product_id": "Feature limits" },
      "upgradeTriggers": ["Reason for upgrading"]
    }
  ],
  "voc": [
    {
      "productId": "product_id",
      "praised": ["Praise 1"],
      "frustrated": ["Frustration 1"],
      "requests": ["Request 1"],
      "switchingReasons": "Primary reason users switch to/from this product"
    }
  ],
  "painPoints": [
    {
      "category": "Category Name",
      "severity": "Critical or High or Medium or Low",
      "frequency": "Daily or Weekly or Rare",
      "impact": "Detail impact description",
      "stage": "Journey Stage Name",
      "evidenceMentions": 45,
      "products": ["product_id"],
      "quotes": ["Representative user quote"]
    }
  ],
  "swot": {
    "product_id": {
      "strengths": ["Item 1", "Item 2"],
      "weaknesses": ["Item 1", "Item 2"],
      "opportunities": ["Item 1", "Item 2"],
      "threats": ["Item 1", "Item 2"]
    }
  },
  "matrix": [
    {
      "category": "Ease of Onboarding or Feature Depth or Collaboration or Pricing or Mobile Experience",
      "scores": { "product_id": 8 }
    }
  ],
  "opportunitiesMap": [
    {
      "quadrant": "Quick Wins or Strategic Bets or Table Stakes or Avoid",
      "title": "Opportunity Title",
      "description": "Detail opportunity",
      "impact": "High or Medium or Low",
      "effort": "High or Medium or Low"
    }
  ],
  "recommendations": [
    {
      "title": "Recommendation Title",
      "problem": "User problem statement",
      "targetSegment": "Who benefits",
      "evidence": "Mentions, metrics, or observations supporting this",
      "proposedSolution": "How to build/improve it",
      "expectedOutcome": "Outcome",
      "businessImpact": "SaaS impact",
      "effort": "Low or Medium or High",
      "risk": "Low or Medium or High",
      "successMetric": "Metric name",
      "confidence": 90
    }
  ],
  "sources": [
    {
      "title": "Source name",
      "url": "URL link",
      "retrievedAt": "Date",
      "snippet": "Short evidence snippet",
      "confidence": "High or Medium or Low",
      "classification": "Verified Fact or User Finding or AI Observation or AI Hypothesis"
    }
  ]
}

Strictly output valid JSON only. Do not add explanations.
`;

  // 1. Prioritize Groq API if key is present
  if (GROQ_KEY) {
    try {
      console.log("Calling Groq API (Llama-3-70b) for products:", productsInput);
      const body = {
        model: 'llama-3.1-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.2
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_KEY}`
        },
        body: JSON.stringify(body),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Groq API returned status code ${res.status}`);
      }

      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content;

      if (!text) {
        throw new Error("No response text returned from Groq API");
      }

      const report: TeardownReport = JSON.parse(text);
      return {
        report,
        isMock: false,
        sourcesCount: report.sources?.length || 0
      };
    } catch (error) {
      console.error("Groq API call failed. Error details:", error);
      if (!GEMINI_KEY) {
        const report = getTeardownData(productsInput, objective, persona);
        return { report, isMock: true, sourcesCount: report.sources.length };
      }
    }
  }

  // 2. Fallback to Gemini API if key is present
  if (GEMINI_KEY) {
    try {
      console.log("Calling Gemini API (Grounding fallback) for products:", productsInput);
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;
      const body = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" },
        tools: [{ google_search: {} }]
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Gemini API returned status code ${res.status}`);
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        throw new Error("No response text returned from Gemini API");
      }

      const report: TeardownReport = JSON.parse(text);
      
      const searchResultSources = data?.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const processedSources = searchResultSources.map((chunk: any, i: number) => ({
        title: chunk.web?.title || `Search Source ${i + 1}`,
        url: chunk.web?.uri || '#',
        retrievedAt: new Date().toLocaleDateString('en-US'),
        snippet: chunk.web?.title || 'Retrieved from live search results.',
        confidence: 'High' as const,
        classification: 'Verified Fact' as const
      }));

      if (processedSources.length > 0) {
        report.sources = [...processedSources, ...(report.sources || [])].slice(0, 10);
      }

      return {
        report,
        isMock: false,
        sourcesCount: report.sources?.length || 0
      };
    } catch (error) {
      console.error("Gemini API call failed, falling back to local mock data. Error details:", error);
    }
  }

  // 3. Absolute fallback to mock generator
  const report = getTeardownData(productsInput, objective, persona);
  return {
    report,
    isMock: true,
    sourcesCount: report.sources.length
  };
}
