// ═══════════════════════════════════════════════
// Pipeline Orchestrator — Gemini-only research-first pipeline
// Gathers live evidence sequentially, normalizes, and passes to Gemini Analysis
// ═══════════════════════════════════════════════

import {
  ProductInfo, PipelineProgress, SourceStatus, EvidenceBundle, RawEvidence
} from '@/lib/types';
import { TeardownReport } from '@/lib/mock-data';
import { fetchDocumentation } from '@/lib/sources/documentation';
import { fetchPricing } from '@/lib/sources/pricing';
import { fetchRedditDiscussions } from '@/lib/sources/reddit';
import { fetchReviews } from '@/lib/sources/reviews';
import { fetchCompanyInfo } from '@/lib/sources/company';
import { normalizeAndCluster } from './normalizer';
import { generateTeardownReport, ProductResearchSummary } from './analyzer';

export async function runResearchPipeline(
  products: ProductInfo[],
  persona: string,
  industry: string,
  objective: string,
  competitors: string[],
  onProgress: (progress: PipelineProgress) => void
): Promise<TeardownReport> {
  const productResearches: ProductResearchSummary[] = [];

  // 1. Research products sequentially to avoid Gemini rate limits
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    onProgress({
      productId: product.id,
      productName: product.name,
      stage: 'Researching Documentation',
      progress: Math.floor((i / products.length) * 80)
    });

    const summary = await researchProduct(product, persona, industry, competitors, onProgress);
    if (summary) {
      productResearches.push(summary);
    }
  }

  // 2. Generate TeardownReport format
  onProgress({
    productId: 'all',
    productName: 'Analysis Engine',
    stage: 'Generating Analysis',
    progress: 85
  });

  const report = await generateTeardownReport(
    productResearches,
    persona,
    industry,
    objective
  );

  onProgress({
    productId: 'all',
    productName: 'Report Assembly',
    stage: 'Complete',
    progress: 100
  });

  return report;
}

async function researchProduct(
  product: ProductInfo,
  persona: string,
  industry: string,
  competitors: string[],
  onProgress: (progress: PipelineProgress) => void
): Promise<ProductResearchSummary | null> {
  try {
    const sourceStatuses: SourceStatus[] = [
      { name: 'Documentation', status: 'pending', itemsCollected: 0 },
      { name: 'Pricing', status: 'pending', itemsCollected: 0 },
      { name: 'Reddit', status: 'pending', itemsCollected: 0 },
      { name: 'Reviews', status: 'pending', itemsCollected: 0 },
      { name: 'Company Info', status: 'pending', itemsCollected: 0 }
    ];

    const collectedSources: any[] = [];

    const emit = (stage: PipelineProgress['stage'], progress: number) => {
      onProgress({ productId: product.id, productName: product.name, stage, sourceStatuses, progress });
    };

    emit('Researching Documentation', 10);
    const docsRes = await safeRun(() => fetchDocumentation(product.name, product.website));

    emit('Analyzing Pricing', 20);
    const pricingRes = await safeRun(() => fetchPricing(product.name, product.website));

    emit('Collecting Reddit', 30);
    const redditRes = await safeRun(() => fetchRedditDiscussions(product.name, getCategoryForIndustry(industry)));

    emit('Reading Reviews', 40);
    const reviewsRes = await safeRun(() => fetchReviews(product.name));

    emit('Gathering Company Intel', 50);
    const companyRes = await safeRun(() => fetchCompanyInfo(product.name, product.website));

    const docs = docsRes.status === 'fulfilled' ? docsRes.value : { evidence: [], features: [], docsUrl: '' };
    sourceStatuses[0] = {
      name: 'Documentation',
      status: docs.evidence.length > 0 ? 'success' : 'unavailable',
      itemsCollected: docs.evidence.length + docs.features.length,
      url: docs.docsUrl
    };
    if (docs.docsUrl) {
      collectedSources.push({ title: `${product.name} Documentation`, url: docs.docsUrl, type: 'Documentation', snippet: `${docs.features.length} features extracted`, confidence: 'High', status: 'success' });
    }

    const pricing = pricingRes.status === 'fulfilled' ? pricingRes.value : { data: '', parsed: { plans: [], freeTrialAvailable: false, enterprisePricing: '' }, url: '', evidence: [] };
    sourceStatuses[1] = {
      name: 'Pricing',
      status: pricing.parsed.plans.length > 0 ? 'success' : 'unavailable',
      itemsCollected: pricing.parsed.plans.length,
      url: pricing.url
    };
    if (pricing.url) {
      collectedSources.push({ title: `${product.name} Pricing`, url: pricing.url, type: 'Pricing', snippet: `${pricing.parsed.plans.length} plans found`, confidence: 'High', status: 'success' });
    }

    const reddit = redditRes.status === 'fulfilled' ? redditRes.value : [];
    sourceStatuses[2] = {
      name: 'Reddit',
      status: reddit.length > 0 ? 'success' : 'unavailable',
      itemsCollected: reddit.length
    };
    const redditUrls = new Set<string>();
    for (const r of reddit) {
      if (r.sourceUrl && !redditUrls.has(r.sourceUrl)) {
        redditUrls.add(r.sourceUrl);
        if (collectedSources.length < 50) {
          collectedSources.push({ title: `Reddit: ${r.text.slice(0, 60)}...`, url: r.sourceUrl, type: 'Discussion', snippet: r.text.slice(0, 100), confidence: 'Medium', status: 'success' });
        }
      }
    }

    const reviews = reviewsRes.status === 'fulfilled' ? reviewsRes.value : [];
    sourceStatuses[3] = {
      name: 'Reviews',
      status: reviews.length > 0 ? 'success' : 'unavailable',
      itemsCollected: reviews.length
    };
    const reviewUrls = new Set<string>();
    for (const r of reviews) {
      if (r.sourceUrl && !reviewUrls.has(r.sourceUrl)) {
        reviewUrls.add(r.sourceUrl);
        if (collectedSources.length < 60) {
          collectedSources.push({ title: `${r.source}: Review`, url: r.sourceUrl, type: 'Review', snippet: r.text.slice(0, 100), confidence: r.confidence || 'Medium', status: 'success' });
        }
      }
    }

    const companyData = companyRes.status === 'fulfilled' ? companyRes.value : { companyIntel: null, employeeIntel: null, evidence: [] };
    sourceStatuses[4] = {
      name: 'Company Info',
      status: companyData.companyIntel ? 'success' : 'unavailable',
      itemsCollected: companyData.evidence?.length || 0
    };
    for (const e of (companyData.evidence || [])) {
      if (e.sourceUrl) {
        collectedSources.push({ title: e.text, url: e.sourceUrl, type: 'Company', snippet: '', confidence: e.confidence || 'Medium', status: 'success' });
      }
    }

    emit('Normalizing Data', 60);

    const [normalizedReviews, normalizedReddit] = await Promise.all([
      normalizeAndCluster(reviews, product.name, 'review'),
      normalizeAndCluster(reddit, product.name, 'discussion')
    ]);

    const sourceBreakdown = computeSourceBreakdown([...reviews, ...reddit]);
    const averageRating = computeAverageRating(reviews);

    const evidenceBundle: EvidenceBundle = {
      product,
      officialData: {
        websiteContent: '',
        documentationExtracts: docs.evidence.map(e => e.text),
        pricingData: pricing.data,
        changelogEntries: docs.evidence.filter(e => e.type === 'release_note').map(e => e.text),
        featurePageContent: docs.evidence.filter(e => e.type === 'feature').map(e => e.text),
        securityInfo: docs.evidence.filter(e => e.text.toLowerCase().includes('security') || e.text.toLowerCase().includes('compliance')).map(e => e.text).join('\n'),
        enterpriseInfo: docs.evidence.filter(e => e.text.toLowerCase().includes('enterprise') || e.text.toLowerCase().includes('sso')).map(e => e.text).join('\n'),
        apiDocs: docs.evidence.filter(e => e.text.toLowerCase().includes('api') || e.text.toLowerCase().includes('webhook')).map(e => e.text).join('\n'),
      },
      reviews: {
        raw: normalizedReviews.raw,
        clustered: normalizedReviews.clustered,
        totalCount: normalizedReviews.raw.length,
        sourceBreakdown,
        averageRating,
      },
      communityDiscussions: {
        raw: normalizedReddit.raw,
        clustered: normalizedReddit.clustered,
        recurringComplaints: normalizedReddit.clustered.filter(c => c.sentiment === 'negative').map(c => c.theme),
        featureRequests: normalizedReddit.clustered.filter(c =>
          c.theme.toLowerCase().includes('request') || c.theme.toLowerCase().includes('wish') || c.theme.toLowerCase().includes('need')
        ).map(c => c.theme),
        switchingReasons: normalizedReddit.clustered.filter(c =>
          c.theme.toLowerCase().includes('switch') || c.theme.toLowerCase().includes('migrat') || c.theme.toLowerCase().includes('alternative')
        ).map(c => c.theme),
        praise: normalizedReddit.clustered.filter(c => c.sentiment === 'positive').map(c => c.theme),
      },
      extractedFeatures: docs.features,
      extractedPricing: pricing.parsed,
      sourceStatuses,
      collectionTimestamp: new Date().toISOString()
    };

    emit('Complete', 100);

    return {
      product,
      evidenceBundle,
      sources: collectedSources
    };

  } catch (err) {
    console.error(`[orchestrator] Pipeline failed for ${product.name}:`, err);
    return null;
  }
}

function getCategoryForIndustry(industry: string): string {
  const lower = (industry || '').toLowerCase();
  if (lower.includes('dev') || lower.includes('engineering') || lower.includes('software')) return 'devtools';
  if (lower.includes('ai') || lower.includes('ml') || lower.includes('machine learning')) return 'ai';
  if (lower.includes('design') || lower.includes('ux') || lower.includes('creative')) return 'design';
  if (lower.includes('saas') || lower.includes('b2b') || lower.includes('startup')) return 'saas';
  return 'general';
}

function computeSourceBreakdown(evidence: RawEvidence[]): { source: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const e of evidence) {
    const src = e.source || 'Unknown';
    counts[src] = (counts[src] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
}

function computeAverageRating(reviews: RawEvidence[]): number | null {
  const rated = reviews.filter(r => typeof r.rating === 'number' && r.rating > 0);
  if (rated.length === 0) return null;
  const sum = rated.reduce((acc, r) => acc + (r.rating || 0), 0);
  return Math.round((sum / rated.length) * 10) / 10;
}

async function safeRun<T>(fn: () => Promise<T>): Promise<PromiseSettledResult<T>> {
  try {
    const value = await fn();
    return { status: 'fulfilled', value };
  } catch (reason) {
    console.warn('[orchestrator] Source collector failed:', reason);
    return { status: 'rejected', reason };
  }
}
