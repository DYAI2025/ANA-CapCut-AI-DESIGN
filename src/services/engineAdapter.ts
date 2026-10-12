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
 * Deterministic Demo Fixture Generator for Edit Plan Summary
 * Dynamically tailored per editorial decision: Balanced (28.4s), Tighter (18.2s), Longer (38.6s), Focus (24.0s)
 */
export function getEditPlanForDecision(
  choice: "balanced" | "longer" | "tighter" | "focus" | "retry" = "balanced",
  assetName = "Lisbon_trip_raw_0412.mov"
): EditPlanSummary {
  if (choice === "tighter") {
    return {
      id: "plan-tighter-001",
      sourceAssetId: "asset-lisbon-raw",
      targetDurationSeconds: 18,
      actualDurationSeconds: 18.2,
      platform: "tiktok",
      preservedMomentsCount: 3,
      removedMomentsCount: 22,
      segments: [
        {
          id: "seg-t1",
          sourceStart: 18,
          sourceEnd: 24,
          cutStart: 0,
          cutEnd: 6.0,
          title: "Hook: Feed Retention Trap",
          rationale: "Confrontational direct address; all breathing pauses and pre-roll trimmed.",
          audioTreatment: "original",
        },
        {
          id: "seg-t2",
          sourceStart: 374,
          sourceEnd: 382,
          cutStart: 6.0,
          cutEnd: 14.0,
          title: "Thesis: Cutting The Sacred Montage",
          rationale: "Delivers the turning point insight with zero conversational filler.",
          audioTreatment: "original",
        },
        {
          id: "seg-t3",
          sourceStart: 420,
          sourceEnd: 424,
          cutStart: 14.0,
          cutEnd: 18.2,
          title: "Punchline: 1 Second Per Thought",
          rationale: "High-density creator rule formatted for instant replay loop.",
          audioTreatment: "original",
        },
      ],
      editorialRationale: {
        strongOpening: "Direct cut to 00:18 realization with zero pre-roll. Viewer hooked in under 1.2s.",
        narrativeThread: "High-velocity compression: The Trap → The Montage Sacrifice → The 1-Second Rule.",
        cleanCutsExplanation: "Removed 18 minutes 18 seconds. All pauses clamped to 0.4s max; all transit B-roll pruned.",
      },
      capCutEditPilotPrompt: `Destill EditPilot Handoff — Ultra-Tight 18.2s High-Retention Cut
Target Platform: TikTok (9:16 Vertical, 1080x1920)
Editorial Strategy: TIGHTER (Maximum Pacing, Zero Buffer, Instant Retention)

Step 1: Import Source "${assetName}" (No re-encoding)
Step 2: Assemble 3 In/Out Ranges:
   • 00:18 – 00:24 (Hook: Direct confrontational address, 6.0s)
   • 06:14 – 06:22 (Thesis: Montage confession, 8.0s)
   • 07:00 – 07:04 (Punchline: 1 second per thought, 4.2s)
Step 3: Clamp all audio silences > 0.4s immediately.
Step 4: Hard jump-cuts between takes; no transition dissolves.
Step 5: Apply dynamic punch-in zoom (1.12x) on thesis delivery at 06:14.
Step 6: Center-weighted high-contrast captions with black stroke. Rec.709 H.264 export.`,
    };
  }

  if (choice === "longer") {
    return {
      id: "plan-longer-001",
      sourceAssetId: "asset-lisbon-raw",
      targetDurationSeconds: 39,
      actualDurationSeconds: 38.6,
      platform: "tiktok",
      preservedMomentsCount: 5,
      removedMomentsCount: 16,
      segments: [
        {
          id: "seg-l1",
          sourceStart: 18,
          sourceEnd: 26,
          cutStart: 0,
          cutEnd: 8.0,
          title: "Hook: Dawn Awakening & Address",
          rationale: "Natural conversational inflection establishing emotional connection.",
          audioTreatment: "original",
        },
        {
          id: "seg-l2",
          sourceStart: 215,
          sourceEnd: 224,
          cutStart: 8.0,
          cutEnd: 17.0,
          title: "Atmosphere: Tram 28 Street Transit",
          rationale: "Full 9-second atmospheric transit giving viewer a visceral sense of place.",
          audioTreatment: "ducked",
        },
        {
          id: "seg-l3",
          sourceStart: 374,
          sourceEnd: 384,
          cutStart: 17.0,
          cutEnd: 27.0,
          title: "Core Insight: Sacred Montage Confession",
          rationale: "Full 10 seconds of emotional vulnerability with organic speech pauses.",
          audioTreatment: "original",
        },
        {
          id: "seg-l4",
          sourceStart: 420,
          sourceEnd: 427,
          cutStart: 27.0,
          cutEnd: 34.0,
          title: "The Method: 1 Second Per Thought",
          rationale: "Clear explanation allowing viewer to absorb creator methodology.",
          audioTreatment: "original",
        },
        {
          id: "seg-l5",
          sourceStart: 1022,
          sourceEnd: 1027,
          cutStart: 34.0,
          cutEnd: 38.6,
          title: "Resolution: Sunset Pier Wind Hold",
          rationale: "Cinematic cooldown shot with ambient river audio before loop replay.",
          audioTreatment: "original",
        },
      ],
      editorialRationale: {
        strongOpening: "Maintains natural conversational pre-beat to establish authentic creator intimacy.",
        narrativeThread: "Balances storytelling rhythm, acoustic cobblestone ambience, and actionable advice.",
        cleanCutsExplanation: "Removed 17 minutes 57 seconds. Preserves musicality of street audio and natural breath.",
      },
      capCutEditPilotPrompt: `Destill EditPilot Handoff — Extended 38.6s Narrative Cut
Target Platform: TikTok (9:16 Vertical, 1080x1920)
Editorial Strategy: LONGER (Cinematic Texture, Ambient B-Roll, Narrative Breathing Room)

Step 1: Import Source "${assetName}" (No re-encoding)
Step 2: Assemble 5 In/Out Ranges:
   • 00:18 – 00:26 (Hook: Dawn awakening, 8.0s)
   • 03:35 – 03:44 (B-Roll: Tram 28 transit, duck audio -6dB, 9.0s)
   • 06:14 – 06:24 (Insight: The montage confession, 10.0s)
   • 07:00 – 07:07 (Method: 1 second per thought, 7.0s)
   • 17:02 – 17:07 (Outro: Pier sunset, hold 0.6s before loop, 4.6s)
Step 3: Trim all silences > 0.9s (preserve organic cadence).
Step 4: Use 0.15s cross-dissolve into Tram 28 transit shot.
Step 5: Add subtle ambient street reverb ducked behind voice track. Rec.709 H.264 export.`,
    };
  }

  if (choice === "focus") {
    return {
      id: "plan-focus-001",
      sourceAssetId: "asset-lisbon-raw",
      targetDurationSeconds: 24,
      actualDurationSeconds: 24.0,
      platform: "tiktok",
      preservedMomentsCount: 3,
      removedMomentsCount: 20,
      segments: [
        {
          id: "seg-f1",
          sourceStart: 102,
          sourceEnd: 111,
          cutStart: 0,
          cutEnd: 9.0,
          title: "Climax Hook: Market Energy Peak",
          rationale: "Climax-first opening. Starts at emotional zenith (Moment B) to trigger instant curiosity.",
          audioTreatment: "original",
        },
        {
          id: "seg-f2",
          sourceStart: 374,
          sourceEnd: 384,
          cutStart: 9.0,
          cutEnd: 19.0,
          title: "Epiphany: Cutting The Sacred Montage",
          rationale: "Direct emotional pivot answering the chaotic market energy with intimate clarity.",
          audioTreatment: "original",
        },
        {
          id: "seg-f3",
          sourceStart: 1022,
          sourceEnd: 1027,
          cutStart: 19.0,
          cutEnd: 24.0,
          title: "Outro: Sunset Pier Cooldown",
          rationale: "Visual anchor holding until 24s mark before looping back to market climax.",
          audioTreatment: "original",
        },
      ],
      editorialRationale: {
        strongOpening: "Climax-first restructuring: leads with highest emotional energy rather than chronological sequence.",
        narrativeThread: "High contrast dynamic between vibrant market movement and intimate confession.",
        cleanCutsExplanation: "Removed 18 minutes 12 seconds of chronological buildup to maximize emotional payoff first.",
      },
      capCutEditPilotPrompt: `Destill EditPilot Handoff — Climax-First 24.0s Focus Cut
Target Platform: TikTok (9:16 Vertical, 1080x1920)
Editorial Strategy: FOCUS (Climax-First Hook, Non-Linear Restructuring, High Energy)

Step 1: Import Source "${assetName}" (No re-encoding)
Step 2: Assemble 3 In/Out Ranges:
   • 01:42 – 01:51 (Climax Hook: Market energy peak, 9.0s)
   • 06:14 – 06:24 (Insight: The montage confession, 10.0s)
   • 17:02 – 17:07 (Outro: Sunset pier resolution, 5.0s)
Step 3: Trim all silences > 0.6s.
Step 4: Fast whip-pan cut between Market peak and intimate lens confession.
Step 5: High-contrast yellow kinetic captions for market climax. Rec.709 H.264 export.`,
    };
  }

  // Default: Balanced Strategy (28.4s)
  return {
    id: "plan-balanced-001",
    sourceAssetId: "asset-lisbon-raw",
    targetDurationSeconds: 28,
    actualDurationSeconds: 28.4,
    platform: "tiktok",
    preservedMomentsCount: 4,
    removedMomentsCount: 18,
    segments: [
      {
        id: "seg-b1",
        sourceStart: 18,
        sourceEnd: 25,
        cutStart: 0,
        cutEnd: 7.0,
        title: "Hook: Feed Retention Trap",
        rationale: "Immediate hook at unscripted dawn realization; engages viewer in 2s.",
        audioTreatment: "original",
      },
      {
        id: "seg-b2",
        sourceStart: 215,
        sourceEnd: 222,
        cutStart: 7.0,
        cutEnd: 14.0,
        title: "Context: Street Transit B-Roll",
        rationale: "Establishes Lisbon street context in 7s without lingering on redundant pauses.",
        audioTreatment: "ducked",
      },
      {
        id: "seg-b3",
        sourceStart: 374,
        sourceEnd: 383,
        cutStart: 14.0,
        cutEnd: 23.0,
        title: "Core Thesis: Cutting The Sacred Montage",
        rationale: "Delivers central takeaway with authoritative vocal delivery.",
        audioTreatment: "original",
      },
      {
        id: "seg-b4",
        sourceStart: 1022,
        sourceEnd: 1027,
        cutStart: 23.0,
        cutEnd: 28.4,
        title: "Outro: Sunset Pier Hold",
        rationale: "Holds for 5.4s for smooth replay loop back into opening hook.",
        audioTreatment: "original",
      },
    ],
    editorialRationale: {
      strongOpening: "Starts on spontaneous realization at 00:18 rather than rehearsed studio intro.",
      narrativeThread: "Balances narrative clarity, street texture, and actionable advice in 28 seconds.",
      cleanCutsExplanation: "Removed 18 minutes 08 seconds of camera adjustments, tram compressor dips, and repeated takes.",
    },
    capCutEditPilotPrompt: `Destill EditPilot Handoff — Balanced 28.4s Candidate Cut
Target Platform: TikTok (9:16 Vertical, 1080x1920)
Editorial Strategy: BALANCED (Narrative Clarity, Rhythmic Pacing, Seamless Replay)

Step 1: Import Source "${assetName}" (No re-encoding)
Step 2: Assemble 4 In/Out Ranges:
   • 00:18 – 00:25 (Hook: Direct address, 7.0s)
   • 03:35 – 03:42 (B-Roll: Street transit, duck audio -6dB, 7.0s)
   • 06:14 – 06:23 (Insight: The montage confession, 9.0s)
   • 17:02 – 17:07 (Outro: Pier sunset, hold 0.5s before loop, 5.4s)
Step 3: Trim all silences > 0.75s automatically.
Step 4: Clean cut assembly; high-contrast white centered captions with subtle drop shadow.
Step 5: Export settings: 1080x1920, 30fps, Rec.709 H.264.`,
  };
}

/**
 * Backward-compatible static reference fixture
 */
export const SYNTHETIC_EDIT_PLAN: EditPlanSummary = getEditPlanForDecision("balanced");

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
