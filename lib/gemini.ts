import { getTeardownData, TeardownReport, resolveProducts, ProductInfo } from './mock-data';

const API_KEY = process.env.GEMINI_API_KEY || '';
const MODEL_NAME = 'gemini-1.5-flash'; // standard stable model with search grounding

export async function runTeardownAnalysis(
  productsInput: string,
  objective: string,
  persona: string,
  depth: 'quick' | 'deep'
): Promise<{ report: TeardownReport; isMock: boolean; sourcesCount: number }> {
  
  if (!API_KEY) {
    console.warn("No GEMINI_API_KEY found in environment. Falling back to high-fidelity mock data.");
    const report = getTeardownData(productsInput, objective, persona);
    return { report, isMock: true, sourcesCount: report.sources.length };
  }

  const productsList = productsInput.split(',').map(p => p.trim()).filter(Boolean);
  const prompt = `
You are a world-class Product Manager and Competitive Intelligence Specialist.
Perform a detailed product teardown and competitive analysis for these products: ${productsList.join(', ')}.
Target Persona: ${persona || 'Startup Product Teams'}
Analysis Objective: ${objective || 'Understand positioning, features, pricing, gaps, and recommendations.'}
Depth: ${depth === 'deep' ? 'Deep Teardown' : 'Quick Scan'}

You must retrieve official websites, pricing plans, and reviews for these products. Use Google Search Grounding to get the latest accurate features and pricing as of July 2026.

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
      "platforms": ["Web", "iOS", "Android"],
      "targetUsers": "Description of target user segments",
      "businessModel": "Freemium / Premium / Paid / Enterprise",
      "coreUseCases": ["Use case 1", "Use case 2"],
      "maturity": "Early / Growth / Mature / Enterprise",
      "geography": "Availability"
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
      "name": "Segment name",
      "mainNeed": "Primary need of this segment",
      "features": ["Features they use"],
      "painPoints": ["Frictions they experience"],
      "willingnessToPay": "Low or Medium or High",
      "productFit": { "product_id": 8 }
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
      "capability": "Feature Category Name",
      "description": "Short description of the capability",
      "status": { "product_id": "Advanced or Full or Partial or Basic or No" },
      "opportunityScore": "High or Medium or Low"
    }
  ],
  "userJourney": [
    {
      "stage": "Sign-up or Onboarding or Discovery or First Action or Retention",
      "userGoal": "User's goal in this stage",
      "actions": { "product_id": "User action description" },
      "friction": { "product_id": "Friction experienced or None" },
      "opportunities": ["Improvement ideas for this stage"]
    }
  ],
  "heuristics": [
    {
      "dimension": "Clarity / Consistency / Discoverability / Cognitive Load / Time-to-Value",
      "scores": { "product_id": 8 },
      "description": "Brief explanation of scores"
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
      "title": "Short descriptive pain point name",
      "productId": "product_id",
      "affectedUsers": "Target segments affected",
      "severity": "High or Medium or Low",
      "frequency": "Frequent or Intermittent or Rare",
      "stage": "Journey stage",
      "evidenceCount": 14,
      "competitorComparison": "Comparison with other products",
      "solution": "Potential product solution",
      "confidence": 85,
      "quote": "Direct quote or summarized representative quote"
    }
  ],
  "swot": {
    "product_id": {
      "strengths": ["Strength 1"],
      "weaknesses": ["Weakness 1"],
      "opportunities": ["Opportunity 1"],
      "threats": ["Threat 1"]
    }
  },
  "matrix": [
    {
      "category": "Ease of Onboarding or Feature Depth or Collaboration or Pricing or Mobile Experience",
      "scores": { "product_id": 8 }
    }
  ],
  "opportunityMap": [
    {
      "id": "1",
      "title": "Actionable product opportunity title",
      "type": "Quick Win or Strategic Bet or Table Stakes or Avoid for Now",
      "impact": 8,
      "effort": 3,
      "evidence": "Source of evidence"
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

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
    
    // Add Google Search Grounding to tools
    const body = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      },
      tools: [
        {
          google_search: {}
        }
      ]
    };

    console.log("Calling Gemini Live API with Google Search Grounding for products:", productsInput);
    
    // Set up AbortController to handle connection timeout quickly (15 seconds max)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
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
    
    // Extract sources/citations returned by Google Search Grounding if available, or merge them
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
    console.error("Gemini API call failed, falling back to local high-fidelity generator. Error details:", error);
    const report = getTeardownData(productsInput, objective, persona);
    return {
      report,
      isMock: true,
      sourcesCount: report.sources.length
    };
  }
}
