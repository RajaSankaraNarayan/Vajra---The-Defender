export interface StoreReview {
  id: string;
  author: string;
  rating: number;
  timeAgo: string;
  timestamp: string; // ISO string or time string
  timeOffsetMinutes: number; // for exact cluster calculation
  comment: string;
  verifiedPurchase: boolean;
  location?: string;
}

export interface ReviewProfile {
  totalReviews: number;
  averageRating: number;
  fiveStarPercentage: number;
  hasUnnaturalUniformity: boolean; // all reviews 100% 5-star perfect
  hasTemporalClustering: boolean;  // 5-10 reviews clustered tightly in 3-5 hours
  reviewBurstCount?: number;
  reviewTimeClusterGapHours?: number;
  reviewsList: StoreReview[];
}

export interface StoreProfile {
  id: string;
  name: string;
  domain: string;
  fullUrl: string;
  isScam: boolean;
  category: string;
  tagline: string;
  heroProduct: {
    title: string;
    description: string;
    originalPrice: number;
    salePrice: number;
    discountPercent: number;
    rating: number;
    reviewsCount: number;
    images: string[];
    inStock: number;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    isFreeEmail: boolean;
    hasPhysicalAddress: boolean;
    hasWorkingContactForm: boolean;
  };
  infrastructure: {
    domainAgeDays: number;
    tld: string;
    registrar: string;
    sslIssuer: string;
    privacyWhois: boolean;
  };
  reviews: ReviewProfile;
  blacklist?: {
    isBlacklisted: boolean;
    source?: string;
    listingDate?: string;
    threatCategory?: string;
    confidenceScore?: number;
    referenceId?: string;
  };
  policy: {
    termsOfServiceText: string;
    returnPolicyText: string;
    hasPlaceholders: boolean;
    detectedPlaceholders: string[];
    isPlagiarizedTemplate: boolean;
  };
  behavioral: {
    hasResettingTimer: boolean;
    timerDurationSeconds: number;
    hasFakeSocialProof: boolean;
    socialProofMessages: Array<{ name: string; location: string; item: string; timeAgo: string }>;
    hasExitIntentPopup: boolean;
    forcedUrgencyBannerText?: string;
  };
  traffic: {
    hasAdClickParameter: boolean;
    adSource: string;
    referrer: string;
  };
}

export interface HeuristicVectorResult {
  id: string;
  name: string;
  description: string;
  riskLevel: 'SAFE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  score: number; // 0 (safest) to 100 (highest risk)
  weight: number;
  evidence: string[];
  explanation: string;
  iconName: string;
}

export interface UnveilScanResult {
  storeId: string;
  storeName: string;
  url: string;
  timestamp: string;
  compositeRiskScore: number; // 0 - 100
  verdict: 'CLEARED_SAFE' | 'CAUTION_DISCOUNT' | 'HIGH_RISK_SCAM' | 'CRITICAL_INTERCEPT';
  isScamDetected: boolean;
  isFalsePositiveProtected: boolean;
  vectors: {
    globalBlacklist: HeuristicVectorResult;
    supportAndContact: HeuristicVectorResult;
    infrastructure: HeuristicVectorResult;
    fakeReviewDetector: HeuristicVectorResult;
    behavioralDarkPatterns: HeuristicVectorResult;
    trafficOrigin: HeuristicVectorResult;
  };
  summary: string;
  forensicCitations: Array<{
    category: string;
    codeSnippet?: string;
    domElement?: string;
    severity: 'info' | 'warning' | 'danger';
    message: string;
  }>;
}

export type ActiveAppTab = 
  | 'dashboard'
  | 'simulator'
  | 'heuristics_matrix'
  | 'ai_forensics'
  | 'extension_code';
