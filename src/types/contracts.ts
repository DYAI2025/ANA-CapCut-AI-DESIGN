/**
 * Destill — Backend-Ready Frontend Contracts
 * Typed interfaces for future ana-edit / Python / FFmpeg engine integration
 * Note: These are design-ready contract definitions, not coupled to any proprietary remote LLM payload.
 */

export type PlatformTarget = "tiktok" | "instagram";

export interface MediaAsset {
  id: string;
  name: string;
  sizeBytes: number;
  formattedSize: string;
  durationSeconds: number;
  formattedDuration: string;
  width?: number;
  height?: number;
  displayAspectRatio?: string;
  fps?: number;
  codec?: string;
  audioChannels?: string;
  objectUrl?: string;
  isSyntheticSample?: boolean;
}

export interface CreatorContextSnapshot {
  creatorId: string;
  name: string;
  primaryEditor: "capcut";
  activePersona: "ana-vlog" | "ana-tech" | "ana-lifestyle";
  learnedCutsSampleCount: number;
  confirmedPreferences: {
    hookWindowSeconds: number;
    maxPauseThresholdSeconds: number;
    captionPacing: "word-by-word" | "sentence-chunk";
    musicDuckingDb: number;
  };
}

export type CapabilityLevel = "AVAILABLE" | "BLOCKED" | "NOT_IMPLEMENTED";

export interface CapabilityStatus {
  videoUnderstanding: CapabilityLevel;
  prosodyAnalysis: CapabilityLevel;
  visualDetection: CapabilityLevel;
  automatedMp4Rendering: CapabilityLevel;
  capCutPromptGeneration: CapabilityLevel;
  offlineLocalEngine: boolean;
  engineHeartbeatTimestamp?: number;
}

export interface AnalysisRequest {
  assetId: string;
  storyGoal?: string;
  platform: PlatformTarget;
  targetDurationSeconds: number;
  userConsentedCloudAnalysis: boolean;
  analysisDepth: "fast" | "deep";
}

export type RunState =
  | "IDLE"
  | "READY"
  | "RUNNING"
  | "COMPLETE"
  | "PARTIAL"
  | "NEEDS_EDITOR_DECISION"
  | "BLOCKED"
  | "FAILED"
  | "CANCELED";

export interface EvidenceRef {
  id: string;
  timestampStart: number;
  timestampEnd: number;
  formattedRange: string;
  label: string;
  category: "claim" | "story_beat" | "prosody" | "visual_moment" | "pause";
  confidenceScore: number; // 0.0 - 1.0
  thumbnailFrameId?: string;
  description: string;
}

export interface MessageHypothesis {
  primaryThesis: string;
  secondaryTakeaways: string[];
  confidence: number;
  uncertaintyNotes?: string;
  keyTimeReferences: EvidenceRef[];
}

export interface StoryBeat {
  id: string;
  phase: "beginning" | "development" | "climax_argument" | "conclusion";
  timestampStart: number;
  timestampEnd: number;
  formattedTime: string;
  summary: string;
  significance: string;
}

export interface TranscriptClaim {
  id: string;
  speaker: string;
  timestamp: number;
  formattedTime: string;
  text: string;
  isKeyStatement: boolean;
  isRepetition: boolean;
  retentionRecommendation: "KEEP" | "TRIM" | "OPTIONAL";
}

export interface ProsodyObservation {
  id: string;
  metric: "pause" | "emphasis" | "speech_rate" | "loudness_pitch";
  timestamp: number;
  formattedTime: string;
  observation: string;
  impactOnPacing: "slows_narrative" | "high_engagement" | "natural_breath" | "awkward_silence";
}

export interface VisualObservation {
  id: string;
  timestamp: number;
  formattedTime: string;
  sceneType: "talking_head" | "broll_wide" | "product_closeup" | "action";
  framing: "close_up" | "medium" | "wide";
  visualHookRating: number; // 1 - 5
  overlayObservations?: string;
  description: string;
}

export interface VideoUnderstandingReport {
  id: string;
  assetId: string;
  sourceDurationSeconds: number;
  generatedAt: string;
  isSyntheticDemoData: boolean;
  message: MessageHypothesis;
  storyBeats: StoryBeat[];
  claims: TranscriptClaim[];
  prosody: ProsodyObservation[];
  visuals: VisualObservation[];
  evidenceList: EvidenceRef[];
}

export interface CutSegment {
  id: string;
  sourceStart: number;
  sourceEnd: number;
  cutStart: number;
  cutEnd: number;
  title: string;
  rationale: string;
  audioTreatment: "original" | "ducked" | "cut";
}

export interface EditPlanSummary {
  id: string;
  sourceAssetId: string;
  targetDurationSeconds: number;
  actualDurationSeconds: number;
  platform: PlatformTarget;
  preservedMomentsCount: number;
  removedMomentsCount: number;
  segments: CutSegment[];
  editorialRationale: {
    strongOpening: string;
    narrativeThread: string;
    cleanCutsExplanation: string;
  };
  capCutEditPilotPrompt: string;
}

export interface ReviewFeedback {
  decision: "KEEP" | "CHANGE" | "DROP";
  refinementOption?: "longer" | "tighter" | "focus" | "retry";
  timestamp: number;
  notes?: string;
}
