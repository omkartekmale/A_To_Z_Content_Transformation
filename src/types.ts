export type OutputFormatType = 
  | 'video'
  | 'linkedin'
  | 'twitter'
  | 'advisory'
  | 'infographic'
  | 'executive_summary'
  | 'presentation';

export interface GenerationParams {
  targetAudience: string;
  tone: string;
  language: string;
  detailLevel: 'Concise (BLUF)' | 'Standard (Balanced)' | 'Comprehensive (Exhaustive)';
  communicationObjective: string;
  contentStyle: string;
  customDirectives: string;
}

export interface SourceDocument {
  id: string;
  title: string;
  category: 'threat_intelligence' | 'policy_document' | 'research_paper' | 'incident_report' | 'news_article' | 'announcement' | 'free_prompt';
  content: string;
  authorOrSource?: string;
  dateAdded: string;
  tags: string[];
}

// 1. Video Package
export interface VideoScene {
  sceneNumber: number;
  duration: string;
  sceneTitle: string;
  visualRecommendation: string;
  cameraAngle: string;
  onScreenText: string;
  narrationScript: string;
  soundDesignFx: string;
}

export interface VideoPackage {
  title: string;
  estimatedTotalDuration: string;
  targetPlatform: string; // e.g. "YouTube Explainer / Enterprise Briefing"
  hookHeadline: string;
  pacingStyle: string;
  scenes: VideoScene[];
  voiceoverTone: string;
  musicMood: string;
  callToAction: string;
  keyVisualKeywords: string[];
}

// 2. LinkedIn Post
export interface LinkedInPost {
  headline: string;
  hookLine: string;
  bodyContent: string;
  bulletTakeaways: string[];
  callToAction: string;
  hashtags: string[];
  suggestedVisualAsset: string;
  engagementQuestion: string;
  estimatedReadTime: string;
  characterCount: number;
}

// 3. Twitter/X Thread
export interface TweetItem {
  tweetNumber: number;
  content: string;
  characterCount: number;
  visualSuggestion?: string;
}

export interface TwitterThread {
  threadTopic: string;
  totalTweets: number;
  hookTweet: string;
  tweets: TweetItem[];
  closingCta: string;
  hashtags: string[];
  recommendedPostTime: string;
}

// 4. Structured Advisory Document
export interface AdvisoryActionStep {
  stepNumber: number;
  actionTitle: string;
  description: string;
  urgency: 'CRITICAL_IMMEDIATE' | 'HIGH_24HR' | 'MEDIUM_7DAYS' | 'ONGOING';
  assignedRole: string;
}

export interface AdvisoryDoc {
  advisoryId: string;
  title: string;
  classificationLevel: 'PUBLIC' | 'RESTRICTED' | 'CRITICAL_OFFICIAL' | 'INTERNAL_ONLY';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL';
  issuingBody: string;
  releaseDate: string;
  targetAudience: string;
  executiveSummary: string;
  threatOrSituationAnalysis: string;
  impactedSystemsOrStakeholders: string[];
  indicatorsOrSymptoms: string[];
  mitigationProtocol: AdvisoryActionStep[];
  verificationProcedures: string[];
  complianceLegalNote: string;
  officialPointOfContact: string;
}

// 5. Infographic Blueprint
export interface InfographicStat {
  value: string;
  label: string;
  trendOrContext: string;
  iconHint: string;
}

export interface InfographicSection {
  sectionTitle: string;
  visualArchetype: 'comparison_cards' | 'step_flow' | 'radial_breakdown' | 'highlight_banner';
  keyPoints: string[];
  visualDirective: string;
}

export interface InfographicFlowStep {
  step: number;
  phaseTitle: string;
  description: string;
  keyMetric?: string;
}

export interface InfographicBlueprint {
  title: string;
  tagline: string;
  recommendedLayout: 'Vertical 9:16 (Mobile/Social)' | 'Horizontal 16:9 (Executive/Report)' | 'Square 1:1 (Carousel/Feed)';
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    textColor: string;
  };
  heroHeadline: string;
  heroStats: InfographicStat[];
  sections: InfographicSection[];
  processFlow: InfographicFlowStep[];
  concludingTakeaway: string;
  assetKeywords: string[];
}

// 6. Executive Summary (C-Suite BLUF)
export interface RiskOpportunityItem {
  domain: string;
  riskDescription: string;
  opportunityOrUpside: string;
  severityRating: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface StrategicRecommendation {
  priority: number;
  recommendation: string;
  businessImpact: string;
  timeline: string;
  estimatedEffort: 'Low' | 'Medium' | 'High';
}

export interface ExecutiveSummary {
  briefingTitle: string;
  organization: string;
  date: string;
  bluf: string; // Bottom Line Up Front
  contextAndBackground: string;
  coreKeyFindings: string[];
  strategicImpactAnalysis: string;
  riskAndOpportunityMatrix: RiskOpportunityItem[];
  resourceAndBudgetImplications: string;
  strategicRecommendations: StrategicRecommendation[];
  decisionRequired: string;
}

// 7. Presentation (Slide Deck)
export interface PresentationSlide {
  slideNumber: number;
  layoutArchetype: 'title_hero' | 'two_column_comparison' | 'metrics_grid' | 'step_roadmap' | 'key_takeaway_quote';
  slideTitle: string;
  slideSubtitle: string;
  bulletContent: string[];
  visualDiagramDescription: string;
  speakerNotes: string;
  estimatedTalkingTime: string;
}

export interface PresentationDeck {
  deckTitle: string;
  presenterSubtitle: string;
  targetAudience: string;
  slidesCount: number;
  slides: PresentationSlide[];
  suggestedDeckTheme: string;
  keyTakeawayMessage: string;
}

// Consolidated Generated Output
export interface GeneratedDeliverables {
  video?: VideoPackage;
  linkedin?: LinkedInPost;
  twitter?: TwitterThread;
  advisory?: AdvisoryDoc;
  infographic?: InfographicBlueprint;
  executive_summary?: ExecutiveSummary;
  presentation?: PresentationDeck;
}

export interface TransformationJob {
  id: string;
  timestamp: string;
  sourceDoc: SourceDocument;
  params: GenerationParams;
  selectedFormats: OutputFormatType[];
  results?: GeneratedDeliverables;
  status: 'idle' | 'generating' | 'completed' | 'failed';
  error?: string;
  durationMs?: number;
}
