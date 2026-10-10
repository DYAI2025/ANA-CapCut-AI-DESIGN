/**
 * Destill — Engine Adapter Boundary
 *
 * Implements: UI -> Application Service -> Engine Adapter
 *
 * Provides:
 * 1. DemoEngineAdapter: Deterministic synthetic analysis & edit plan fixtures (clearly labeled DEMO DATA)
 * 2. ProductionEngineAdapter: Unimplemented production adapter ready for local ana-edit / FFmpeg integration
 */

import type {
  CapabilityStatus,
  AnalysisRequest,
  VideoUnderstandingReport,
  EditPlanSummary,
  MediaAsset,
} from "../types/contracts";

export interface IEngineAdapter {
  getCapabilities(): Promise<CapabilityStatus>;
  analyzeVideo(
    asset: MediaAsset,
    request: AnalysisRequest,
    onProgress?: (stage: string, pct: number) => void
  ): Promise<VideoUnderstandingReport>;
  generateEditPlan(
    asset: MediaAsset,
    request: AnalysisRequest
  ): Promise<EditPlanSummary>;
  cancelCurrentRun(): Promise<void>;
}

/**
 * Deterministic Demo Fixture for Video Understanding (Screen 03)
 */
export const SYNTHETIC_UNDERSTANDING_REPORT: VideoUnderstandingReport = {
  id: "rep-demo-001",
  assetId: "asset-lisbon-raw",
  sourceDurationSeconds: 1116, // 18m 36s
  generatedAt: "2026-10-10T15:30:00Z",
  isSyntheticDemoData: true,
  message: {
    primaryThesis:
      "Creating daily video essays requires ruthless distillation: the best hook is often hidden in unscripted reflection, not the rehearsed intro.",
    secondaryTakeaways: [
      "Ana repeats the central thesis three times with progressive clarity; the third take at 06:14 carries the most genuine vocal gravity.",
      "The morning ambient market noise provides organic texture but drowns conversational audio between 09:20 and 11:15 without high-pass filtering.",
      "The concluding sunset pier sequence at 17:02 creates a natural visual anchor that mirrors the opening hook.",
    ],
    confidence: 0.94,
    uncertaintyNotes:
      "Speech pacing speeds up noticeably around minute 12; manual review suggested to ensure no key context is trimmed.",
    keyTimeReferences: [
      {
        id: "ev-hook",
        timestampStart: 18,
        timestampEnd: 32,
        formattedRange: "00:18 – 00:32",
        label: "Spontaneous Hook Opening",
        category: "story_beat",
        confidenceScore: 0.96,
        description: "High prosodic energy opening stating the challenge before the scripted greeting.",
      },
      {
        id: "ev-thesis",
        timestampStart: 374,
        timestampEnd: 405,
        formattedRange: "06:14 – 06:45",
        label: "Refined Central Claim",
        category: "claim",
        confidenceScore: 0.98,
        description: "Clear delivery of the core argument with deliberate pauses.",
      },
      {
        id: "ev-payoff",
        timestampStart: 1022,
        timestampEnd: 1055,
        formattedRange: "17:02 – 17:35",
        label: "Closing Narrative Payoff",
        category: "visual_moment",
        confidenceScore: 0.92,
        description: "Sunset on pier with matching spoken conclusion.",
      },
    ],
  },
  storyBeats: [
    {
      id: "beat-1",
      phase: "beginning",
      timestampStart: 18,
      timestampEnd: 74,
      formattedTime: "00:18",
      summary: "The creative bottleneck: 10 hours of footage, no clear hook.",
      significance: "Establishes immediate empathy with audience.",
    },
    {
      id: "beat-2",
      phase: "development",
      timestampStart: 215,
      timestampEnd: 360,
      formattedTime: "03:35",
      summary: "Exploring CapCut timeline fatigue and false starts in Lisbon.",
      significance: "Demonstrates problem context and visual environmental grounding.",
    },
    {
      id: "beat-3",
      phase: "climax_argument",
      timestampStart: 374,
      timestampEnd: 512,
      formattedTime: "06:14",
      summary: "The turning point: cutting the intro entirely and opening on the realization.",
      significance: "Core emotional and instructional value beat of the piece.",
    },
    {
      id: "beat-4",
      phase: "conclusion",
      timestampStart: 1022,
      timestampEnd: 1084,
      formattedTime: "17:02",
      summary: "Final takeaway: distill until every second earns its place.",
      significance: "High retention closing payoff suitable for loop replay.",
    },
  ],
  claims: [
    {
      id: "cl-1",
      speaker: "Speaker 1",
      timestamp: 24,
      formattedTime: "00:24",
      text: "If you need 40 seconds to explain what the video is about, you lost the feed.",
      isKeyStatement: true,
      isRepetition: false,
      retentionRecommendation: "KEEP",
    },
    {
      id: "cl-2",
      speaker: "Speaker 1",
      timestamp: 198,
      formattedTime: "03:18",
      text: "I spent three days shooting b-roll that doesn't say anything.",
      isKeyStatement: false,
      isRepetition: false,
      retentionRecommendation: "TRIM",
    },
    {
      id: "cl-3",
      speaker: "Speaker 1",
      timestamp: 382,
      formattedTime: "06:22",
      text: "The edit didn't work until I threw away my favorite 4-minute montage.",
      isKeyStatement: true,
      isRepetition: false,
      retentionRecommendation: "KEEP",
    },
    {
      id: "cl-4",
      speaker: "Speaker 1",
      timestamp: 735,
      formattedTime: "12:15",
      text: "Like I said before, you really have to let go of footage you love.",
      isKeyStatement: false,
      isRepetition: true,
      retentionRecommendation: "TRIM",
    },
  ],
  prosody: [
    {
      id: "pro-1",
      metric: "emphasis",
      timestamp: 26,
      formattedTime: "00:26",
      observation: "Pitch peak on 'lost the feed' (+4.2 semitones, high emotional cadence).",
      impactOnPacing: "high_engagement",
    },
    {
      id: "pro-2",
      metric: "pause",
      timestamp: 142,
      formattedTime: "02:22",
      observation: "3.4s hesitancy pause while adjusting camera angle.",
      impactOnPacing: "awkward_silence",
    },
    {
      id: "pro-3",
      metric: "speech_rate",
      timestamp: 395,
      formattedTime: "06:35",
      observation: "Deliberate deceleration to 118 wpm (high authority beat).",
      impactOnPacing: "natural_breath",
    },
    {
      id: "pro-4",
      metric: "loudness_pitch",
      timestamp: 610,
      formattedTime: "10:10",
      observation: "Sudden drop in vocal volume as passing tram causes mic compressor dip.",
      impactOnPacing: "slows_narrative",
    },
  ],
  visuals: [
    {
      id: "vis-1",
      timestamp: 18,
      formattedTime: "00:18",
      sceneType: "talking_head",
      framing: "medium",
      visualHookRating: 5,
      overlayObservations: "Natural golden hour rim lighting, direct gaze into lens.",
      description: "Direct camera engagement with candid expression.",
    },
    {
      id: "vis-2",
      timestamp: 215,
      formattedTime: "03:35",
      sceneType: "broll_wide",
      framing: "wide",
      visualHookRating: 4,
      overlayObservations: "Tram 28 ascending steep cobblestone street.",
      description: "Dynamic diagonal street motion supporting travel context.",
    },
    {
      id: "vis-3",
      timestamp: 374,
      formattedTime: "06:14",
      sceneType: "talking_head",
      framing: "close_up",
      visualHookRating: 5,
      overlayObservations: "Punch-in focal shift, sharp eye reflection.",
      description: "Intimate close-up delivery of turning point epiphany.",
    },
    {
      id: "vis-4",
      timestamp: 1022,
      formattedTime: "17:02",
      sceneType: "action",
      framing: "wide",
      visualHookRating: 4,
      overlayObservations: "Sunset silhouettes at river pier, wind in hair.",
      description: "Poetic ending shot with high aesthetic replay appeal.",
    },
  ],
  evidenceList: [
    {
      id: "ev-1",
      timestampStart: 18,
      timestampEnd: 32,
      formattedRange: "00:18 – 00:32",
      label: "Hook realization",
      category: "claim",
      confidenceScore: 0.96,
      description: "Opening sentence immediately identifies the feed retention issue.",
    },
    {
      id: "ev-2",
      timestampStart: 215,
      timestampEnd: 235,
      formattedRange: "03:35 – 03:55",
      label: "Visual street transit",
      category: "visual_moment",
      confidenceScore: 0.91,
      description: "Provides geographic atmosphere before emotional turning point.",
    },
    {
      id: "ev-3",
      timestampStart: 374,
      timestampEnd: 410,
      formattedRange: "06:14 – 06:50",
      label: "Turning point confession",
      category: "claim",
      confidenceScore: 0.98,
      description: "Unplanned moment of clarity that anchors the entire argument.",
    },
    {
      id: "ev-4",
      timestampStart: 1022,
      timestampEnd: 1055,
      formattedRange: "17:02 – 17:35",
      label: "Sunset pier resolution",
      category: "visual_moment",
      confidenceScore: 0.94,
      description: "Visual payoff shot that closes the narrative arc.",
    },
  ],
};

/**
 * Deterministic Demo Fixture for Edit Plan Summary (Future Result Preview)
 */
export const SYNTHETIC_EDIT_PLAN: EditPlanSummary = {
  id: "plan-demo-001",
  sourceAssetId: "asset-lisbon-raw",
  targetDurationSeconds: 45,
  actualDurationSeconds: 44,
  platform: "tiktok",
  preservedMomentsCount: 5,
  removedMomentsCount: 18,
  segments: [
    {
      id: "seg-1",
      sourceStart: 18,
      sourceEnd: 27,
      cutStart: 0,
      cutEnd: 9,
      title: "Hook: The Feed Retention Trap",
      rationale: "Selected for highest prosodic urgency and immediate attention capture.",
      audioTreatment: "original",
    },
    {
      id: "seg-2",
      sourceStart: 215,
      sourceEnd: 224,
      cutStart: 9,
      cutEnd: 18,
      title: "Context: Street Transit B-Roll",
      rationale: "Establishes location in 9 seconds without lingering on redundant pauses.",
      audioTreatment: "ducked",
    },
    {
      id: "seg-3",
      sourceStart: 374,
      sourceEnd: 388,
      cutStart: 18,
      cutEnd: 32,
      title: "Core Thesis: Cutting The Sacred Montage",
      rationale: "Delivers the central insight with high vocal authority.",
      audioTreatment: "original",
    },
    {
      id: "seg-4",
      sourceStart: 420,
      sourceEnd: 428,
      cutStart: 32,
      cutEnd: 40,
      title: "The Formula: 1 Second Per Thought",
      rationale: "Provides concise actionable creator instruction.",
      audioTreatment: "original",
    },
    {
      id: "seg-5",
      sourceStart: 1022,
      sourceEnd: 1026,
      cutStart: 40,
      cutEnd: 44,
      title: "Outro: Sunset Pier Hold",
      rationale: "Holds for 4 seconds allowing loop replay into the opening hook.",
      audioTreatment: "original",
    },
  ],
  editorialRationale: {
    strongOpening: "Starts on the unscripted realization at 00:18 rather than the rehearsed studio intro.",
    narrativeThread: "Every retained 9-second segment directly reinforces the single thesis of cutting filler.",
    cleanCutsExplanation: "Removed 17 minutes 52 seconds of camera adjustments, tram compressor dips, and repeated takes.",
  },
  capCutEditPilotPrompt: `Destill EditPilot Handoff — Raw Footage to 45s Cut
Target Platform: TikTok (9:16 Vertical, 1080x1920)
Pacing: Fast Hook, Deliberate Insight, 0.8s Max Pause Trim

Step 1: Import Source "Lisbon_trip_raw_0412.mov" (No re-encoding)
Step 2: Assemble 5 In/Out Ranges:
   • 00:18 – 00:27 (Hook: Direct address)
   • 03:35 – 03:44 (B-Roll: Street transit, duck audio -6dB)
   • 06:14 – 06:28 (Insight: The montage confession)
   • 07:00 – 07:08 (Rule: 1 second per thought)
   • 17:02 – 17:06 (Outro: Pier sunset, hold 0.6s before loop)
Step 3: Trim all silences > 0.8s automatically.
Step 4: Add high-contrast white centered captions with subtle drop shadow.
Step 5: Export settings: 1080x1920, 30fps, Rec.709 H.264.`,
};

/**
 * Concrete Demo Implementation of Engine Adapter
 */
export class DemoEngineAdapter implements IEngineAdapter {
  async getCapabilities(): Promise<CapabilityStatus> {
    return {
      videoUnderstanding: "AVAILABLE",
      prosodyAnalysis: "AVAILABLE",
      visualDetection: "AVAILABLE",
      automatedMp4Rendering: "NOT_IMPLEMENTED", // Explicitly truthful!
      capCutPromptGeneration: "AVAILABLE",
      offlineLocalEngine: true,
      engineHeartbeatTimestamp: Date.now(),
    };
  }

  async analyzeVideo(
    _asset: MediaAsset,
    _request: AnalysisRequest,
    onProgress?: (stage: string, pct: number) => void
  ): Promise<VideoUnderstandingReport> {
    const stages = [
      { name: "Prepare", pct: 15 },
      { name: "Listen", pct: 40 },
      { name: "Observe", pct: 65 },
      { name: "Interpret", pct: 85 },
      { name: "Review", pct: 100 },
    ];

    for (const s of stages) {
      if (onProgress) onProgress(s.name, s.pct);
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    return SYNTHETIC_UNDERSTANDING_REPORT;
  }

  async generateEditPlan(
    _asset: MediaAsset,
    _request: AnalysisRequest
  ): Promise<EditPlanSummary> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return SYNTHETIC_EDIT_PLAN;
  }

  async cancelCurrentRun(): Promise<void> {
    // Deterministic cancellation
    return Promise.resolve();
  }
}

/**
 * Unimplemented Production Adapter Interface
 * Ready for future backend connectivity (e.g. localhost:8765 / ana-edit CLI)
 */
export class ProductionEngineAdapter implements IEngineAdapter {
  private endpoint: string;

  constructor(endpoint = "http://localhost:8765") {
    this.endpoint = endpoint;
  }

  async getCapabilities(): Promise<CapabilityStatus> {
    return {
      videoUnderstanding: "NOT_IMPLEMENTED",
      prosodyAnalysis: "NOT_IMPLEMENTED",
      visualDetection: "NOT_IMPLEMENTED",
      automatedMp4Rendering: "NOT_IMPLEMENTED",
      capCutPromptGeneration: "NOT_IMPLEMENTED",
      offlineLocalEngine: false,
    };
  }

  async analyzeVideo(
    _asset: MediaAsset,
    _request: AnalysisRequest
  ): Promise<VideoUnderstandingReport> {
    throw new Error(
      `Production engine not connected at ${this.endpoint}. Use DemoEngineAdapter for prototype testing.`
    );
  }

  async generateEditPlan(
    _asset: MediaAsset,
    _request: AnalysisRequest
  ): Promise<EditPlanSummary> {
    throw new Error(
      `Production video editing backend not deployed. Use DemoEngineAdapter for future result preview.`
    );
  }

  async cancelCurrentRun(): Promise<void> {
    return Promise.resolve();
  }
}

export const defaultEngineAdapter = new DemoEngineAdapter();
