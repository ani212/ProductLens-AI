// ═══════════════════════════════════════════════
// Pipeline Orchestrator — coordinates all research stages
// ═══════════════════════════════════════════════

import { 
  ProductInfo, PipelineProgress, V2Report, ProductResearch, 
  SourceStatus, EvidenceBundle 
} from '@/lib/types';
import { fetchDocumentation } from '@/lib/sources/documentation';
import { fetchPricing } from '@/lib/sources/pricing';
import { fetchRedditDiscussions } from '@/lib/sources/reddit';
import { fetchReviews } from '@/lib/sources/reviews';
import { fetchCompanyInfo } from '@/lib/sources/company';
import { normalizeAndCluster } from './normalizer';
import { generateAnalysis } from './analyzer';
import { crossAnalyze } from './cross-analyzer';

export async function runResearchPipeline(
  products: ProductInfo[],
  persona: string,
  industry: string,
  objective: string,
  competitors: string[],
  onProgress: (progress: PipelineProgress) => void
): Promise<V2Report> {
  
  // 1. Run per-product research in parallel
  const productResearches: ProductResearch[] = [];
  const researchPromises = products.map(product => 
    researchProduct(product, persona, industry, competitors, onProgress)
  );

  const results = await Promise.allSettled(researchPromises);
  
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value) {
      productResearches.push(result.value);
    }
  }

  // 2. Cross-product analysis
  onProgress({
    productId: 'all',
    productName: 'Cross-Analysis',
    stage: 'Cross-Product Analysis',
    progress: 90
  });

  const crossAnalysis = await crossAnalyze(productResearches);

  // 3. Assemble final report
  const reportId = crypto.randomUUID();
  const timestamp = new Date().toISOString();

  onProgress({
    productId: 'all',
    productName: 'Report Assembly',
    stage: 'Complete',
    progress: 100
  });

  const productResearchMap: Record<string, ProductResearch> = {};
  productResearches.forEach(pr => {
    productResearchMap[pr.product.id] = pr;
  });

  return {
    id: reportId,
    timestamp,
    products,
    persona,
    objective,
    industry,
    productResearch: productResearchMap,
    crossAnalysis
  };
}

async function researchProduct(
  product: ProductInfo,
  persona: string,
  industry: string,
  competitors: string[],
  onProgress: (progress: PipelineProgress) => void
): Promise<ProductResearch | null> {
  try {
    const sourceStatuses: SourceStatus[] = [
      { name: 'Documentation', status: 'pending', itemsCollected: 0 },
      { name: 'Pricing', status: 'pending', itemsCollected: 0 },
      { name: 'Reddit', status: 'pending', itemsCollected: 0 },
      { name: 'Reviews', status: 'pending', itemsCollected: 0 },
      { name: 'Company Info', status: 'pending', itemsCollected: 0 }
    ];

    const emit = (stage: PipelineProgress['stage'], progress: number) => {
      onProgress({ productId: product.id, productName: product.name, stage, sourceStatuses, progress });
    };

    // ─── STAGE: DISCOVER & COLLECT ──────────────────────────────────────────────
    emit('Discovering Sources', 10);
    
    // Run all collectors in parallel
    emit('Collecting Data', 20);
    const [docsRes, pricingRes, redditRes, reviewsRes, companyRes] = await Promise.allSettled([
      fetchDocumentation(product.name, product.website),
      fetchPricing(product.name, product.website),
      fetchRedditDiscussions(product.name, 'saas'),
      fetchReviews(product.name),
      fetchCompanyInfo(product.name, product.website)
    ]);

    // Extract results and update statuses
    const docs = docsRes.status === 'fulfilled' ? docsRes.value : { evidence: [], features: [], docsUrl: '' };
    sourceStatuses[0] = { name: 'Documentation', status: docs.evidence.length > 0 ? 'success' : 'unavailable', itemsCollected: docs.evidence.length, url: docs.docsUrl };

    const pricing = pricingRes.status === 'fulfilled' ? pricingRes.value : { data: '', parsed: { plans: [], freeTrialAvailable: false, enterprisePricing: '' }, url: '' };
    sourceStatuses[1] = { name: 'Pricing', status: pricing.data ? 'success' : 'unavailable', itemsCollected: pricing.parsed.plans.length, url: pricing.url };

    const reddit = redditRes.status === 'fulfilled' ? redditRes.value : [];
    sourceStatuses[2] = { name: 'Reddit', status: reddit.length > 0 ? 'success' : 'unavailable', itemsCollected: reddit.length };

    const reviews = reviewsRes.status === 'fulfilled' ? reviewsRes.value : [];
    sourceStatuses[3] = { name: 'Reviews', status: reviews.length > 0 ? 'success' : 'unavailable', itemsCollected: reviews.length };

    const companyInfo = companyRes.status === 'fulfilled' ? companyRes.value : null;
    sourceStatuses[4] = { name: 'Company Info', status: companyInfo ? 'success' : 'unavailable', itemsCollected: 1 };

    emit('Collecting Data', 50);

    // ─── STAGE: NORMALIZE & CLUSTER ──────────────────────────────────────────
    emit('Normalizing Data', 60);

    const [normalizedReviews, normalizedReddit] = await Promise.all([
      normalizeAndCluster(reviews, product.name, 'review'),
      normalizeAndCluster(reddit, product.name, 'discussion')
    ]);

    const evidenceBundle: EvidenceBundle = {
      product,
      officialData: {
        websiteContent: '',
        documentationExtracts: docs.evidence.map(e => e.text),
        pricingData: pricing.data,
        changelogEntries: [],
        featurePageContent: [],
        securityInfo: '',
        enterpriseInfo: '',
        apiDocs: ''
      },
      reviews: {
        raw: normalizedReviews.raw,
        clustered: normalizedReviews.clustered,
        totalCount: normalizedReviews.raw.length,
        sourceBreakdown: [{ source: 'Aggregated', count: normalizedReviews.raw.length }],
        averageRating: 4.0
      },
      communityDiscussions: {
        raw: normalizedReddit.raw,
        clustered: normalizedReddit.clustered,
        recurringComplaints: normalizedReddit.clustered.filter(c => c.sentiment === 'negative').map(c => c.theme),
        featureRequests: [],
        switchingReasons: [],
        praise: normalizedReddit.clustered.filter(c => c.sentiment === 'positive').map(c => c.theme)
      },
      extractedFeatures: docs.features,
      extractedPricing: pricing.parsed,
      sourceStatuses,
      collectionTimestamp: new Date().toISOString()
    };

    // ─── STAGE: GENERATE AI ANALYSIS ─────────────────────────────────────────
    emit('Generating Analysis', 75);

    const analysis = await generateAnalysis(evidenceBundle, persona, industry, competitors);
    
    // Inject company info directly
    if (companyInfo) {
      analysis.companyIntel = companyInfo;
    }

    emit('Complete', 100);

    return {
      product,
      evidenceBundle,
      voc: analysis.voc,
      swot: analysis.swot,
      painPoints: analysis.painPoints,
      reviews: analysis.reviews,
      employeeIntel: analysis.employeeIntel,
      companyIntel: analysis.companyIntel,
      pricing: analysis.pricing,
      features: docs.features.map(f => ({ name: f, description: '', maturity: 'Full', source: 'Docs' })),
      sources: []
    } as ProductResearch;

  } catch (err) {
    console.error(`[orchestrator] Pipeline failed for ${product.name}:`, err);
    return null;
  }
}
