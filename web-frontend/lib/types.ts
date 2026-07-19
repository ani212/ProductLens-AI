// ═══════════════════════════════════════════════
// ProductLens AI V2 — Core Type Definitions
// ═══════════════════════════════════════════════

export interface ProductInfo {
  id: string;
  name: string;
  website: string;
  logoText: string;
  logoBg: string;
  companyName: string;
  category: string;
  description: string;
}

// ───────────────────────────────────────────────
// RAW EVIDENCE (collected before AI touches anything)
// ───────────────────────────────────────────────

export interface SourceStatus {
  name: string;
  status: 'success' | 'partial' | 'unavailable' | 'pending';
  itemsCollected: number;
  url?: string;
  error?: string;
}

export interface RawEvidence {
  text: string;
  source: string;
  sourceUrl: string;
  type: 'review' | 'discussion' | 'documentation' | 'pricing' | 'feature' | 'release_note' | 'company_info';
  date?: string;
  rating?: number;
  upvotes?: number;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface ClusteredInsight {
  theme: string;
  count: number;
  sources: string[];
  sentiment: 'positive' | 'negative' | 'mixed';
  confidence: 'High' | 'Medium' | 'Low';
  representativeQuotes: string[];
}

export interface EvidenceBundle {
  product: ProductInfo;
  officialData: {
    websiteContent: string;
    documentationExtracts: string[];
    pricingData: string;
    changelogEntries: string[];
    featurePageContent: string[];
    securityInfo: string;
    enterpriseInfo: string;
    apiDocs: string;
  };
  reviews: {
    raw: RawEvidence[];
    clustered: ClusteredInsight[];
    totalCount: number;
    sourceBreakdown: { source: string; count: number }[];
    averageRating: number | null;
  };
  communityDiscussions: {
    raw: RawEvidence[];
    clustered: ClusteredInsight[];
    recurringComplaints: string[];
    featureRequests: string[];
    switchingReasons: string[];
    praise: string[];
  };
  extractedFeatures: string[];
  extractedPricing: {
    plans: { name: string; price: string; features: string[]; limits: string }[];
    freeTrialAvailable: boolean;
    enterprisePricing: string;
  };
  sourceStatuses: SourceStatus[];
  collectionTimestamp: string;
}

// ───────────────────────────────────────────────
// AI-GENERATED ANALYSIS (produced FROM evidence)
// ───────────────────────────────────────────────

export interface ProductResearch {
  product: ProductInfo;
  evidenceBundle: EvidenceBundle;
  voc: {
    mostPraised: string[];
    biggestFrustrations: string[];
    customerQuotes: { quote: string; source: string; sentiment: 'positive' | 'negative' | 'neutral' }[];
    switchingTriggers: string[];
    adoptionDrivers: string[];
    retentionDrivers: string[];
    commonRequests: string[];
    powerUserFeedback: string[];
    beginnerFeedback: string[];
    enterpriseFeedback: string[];
  };
  swot: {
    strengths: { point: string; evidence: string; sources: string[] }[];
    weaknesses: { point: string; evidence: string; sources: string[] }[];
    opportunities: { point: string; evidence: string; sources: string[] }[];
    threats: { point: string; evidence: string; sources: string[] }[];
    context: { targetAudience: string; industry: string; competitors: string[] };
  };
  painPoints: {
    title: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Rare';
    affectedSegment: string;
    description: string;
    evidenceCount: number;
    sources: string[];
    confidence: 'High' | 'Medium' | 'Low';
    quote: string;
  }[];
  reviews: {
    totalAnalyzed: number;
    sources: string[];
    confidence: 'High' | 'Medium' | 'Low';
    lastUpdated: string;
    overallSentiment: number;
    themes: { theme: string; count: number; sentiment: 'positive' | 'negative' | 'mixed' }[];
    sampleReviews: { text: string; rating: number; source: string; date: string }[];
  };
  employeeIntel: {
    leadership: string;
    engineeringCulture: string;
    productCulture: string;
    innovation: string;
    hiring: string;
    growth: string;
    pros: string[];
    cons: string[];
    workLifeBalance: string;
    stability: string;
  };
  companyIntel: {
    size: string;
    headquarters: string;
    industry: string;
    growthSignals: string[];
    hiringTrends: string;
    openPMRoles: number;
    engineeringHiring: string;
    expansion: string;
    recentUpdates: string[];
    techIndicators: string[];
    investmentSignals: string[];
  };
  pricing: {
    plans: { name: string; price: string; features: string[]; limits: string }[];
    freeTrialAvailable: boolean;
    enterprisePricing: string;
  };
  features: { name: string; description: string; maturity: 'Advanced' | 'Full' | 'Partial' | 'Basic' | 'None'; source: string }[];
  sources: { title: string; url: string; type: string; snippet: string; confidence: 'High' | 'Medium' | 'Low'; status: 'success' | 'partial' | 'unavailable' }[];
}

// ───────────────────────────────────────────────
// CROSS-PRODUCT ANALYSIS (second AI pass)
// ───────────────────────────────────────────────

export interface CrossProductAnalysis {
  executiveSummary: string;
  overallWinner: { productId: string; reason: string; score: number };
  commonFeatures: string[];
  uniqueFeatures: { [productId: string]: string[] };
  featureMatrix: { capability: string; status: { [productId: string]: string }; isCommon: boolean }[];
  sharedComplaints: string[];
  sharedOpportunities: string[];
  sharedRisks: string[];
  sharedStrengths: string[];
  sharedWeaknesses: string[];
  opportunityMap: { title: string; quadrant: string; impact: number; effort: number; description: string }[];
}

// ───────────────────────────────────────────────
// FULL V2 REPORT
// ───────────────────────────────────────────────

export interface V2Report {
  id: string;
  timestamp: string;
  products: ProductInfo[];
  persona: string;
  objective: string;
  industry: string;
  productResearch: { [productId: string]: ProductResearch };
  crossAnalysis: CrossProductAnalysis;
}

// ───────────────────────────────────────────────
// PIPELINE PROGRESS EVENTS
// ───────────────────────────────────────────────

export type PipelineStage =
  | 'Resolving Product'
  | 'Discovering Sources'
  | 'Collecting Data'
  | 'Normalizing Data'
  | 'Generating Analysis'
  | 'Cross-Product Analysis'
  | 'Complete';

export interface PipelineProgress {
  productId: string;
  productName: string;
  stage: PipelineStage;
  sourceStatuses?: SourceStatus[];
  progress?: number; // 0-100
}
