// ═══════════════════════════════════════════════
// ProductLens AI — Core Type Definitions
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

export type AnalysisMode = 
  | 'Quick Scan' 
  | 'Deep Teardown' 
  | 'Compare Products' 
  | 'Interview Mode' 
  | 'Market Mode';

export type SourceClassification = 
  | 'Verified Fact' 
  | 'User Finding' 
  | 'AI Observation' 
  | 'AI Hypothesis';

// ───────────────────────────────────────────────
// RAW & CLUSTERED EVIDENCE
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
  confidence?: 'High' | 'Medium' | 'Low';
}

export interface ClusteredInsight {
  theme: string;
  count: number;
  sources: string[];
  sentiment: 'positive' | 'negative' | 'mixed';
  confidence: 'High' | 'Medium' | 'Low';
  representativeQuotes: string[];
  evidenceCount?: number;
  sourceTypes?: string[];
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
// PIPELINE PROGRESS EVENTS
// ───────────────────────────────────────────────

export type PipelineStage =
  | 'Resolving Product'
  | 'Discovering Sources'
  | 'Collecting Data'
  | 'Researching Documentation'
  | 'Reading Reviews'
  | 'Analyzing Pricing'
  | 'Collecting Reddit'
  | 'Gathering Company Intel'
  | 'Normalizing Data'
  | 'Generating Analysis'
  | 'Generating SWOT'
  | 'Generating VoC'
  | 'Generating Pain Points'
  | 'Cross-Product Analysis'
  | 'Complete';

export interface PipelineProgress {
  productId: string;
  productName: string;
  stage: PipelineStage;
  sourceStatuses?: SourceStatus[];
  progress?: number; // 0-100
}
