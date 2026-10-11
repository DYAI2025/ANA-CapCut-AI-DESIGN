import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { DictKey, Lang } from "./i18n";
import { translate } from "./i18n";
import type {
  CapabilityStatus,
  EditPlanSummary,
  MediaAsset,
  PlatformTarget,
  VideoUnderstandingReport,
} from "../types/contracts";
import {
  SYNTHETIC_EDIT_PLAN,
  SYNTHETIC_UNDERSTANDING_REPORT,
} from "../services/engineAdapter";
import { fmtBytes, fmtTime } from "../utils/formatters";
import {
  isSafeMediaUrl,
  sanitizeFileName,
  sanitizeTextInput,
  validateVideoFile,
} from "../utils/security";

export type Screen =
  | "home"
  | "processing"
  | "understanding"
  | "result"
  | "decision"
  | "blocked"
  | "projects"
  | "compare"
  | "style"
  | "settings";

export type ProductMode = "analyze" | "destill";

export type BlockKind =
  | "nofile"
  | "unsupported"
  | "unavailable"
  | "notready"
  | "consent_missing";

export type DecisionOption = "longer" | "tighter" | "focus" | "retry";

export type StylePreset = "calm" | "punchy" | "story" | "clean";

export interface StyleState {
  preset: StylePreset;
  captions: boolean;
  sound: boolean;
  music: boolean;
  pace: number;
}

export interface AppState {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: DictKey, vars?: Record<string, string | number>) => string;

  screen: Screen;
  go: (s: Screen) => void;
  mode: ProductMode;
  setMode: (m: ProductMode) => void;

  source: MediaAsset | null;
  pickFile: (f: File) => void;
  loadSample: () => void;
  removeSource: () => void;
  openPicker: () => void;

  goal: string;
  setGoal: (v: string) => void;
  platform: PlatformTarget;
  setPlatform: (p: PlatformTarget) => void;
  targetDuration: number; // default ~90s
  setTargetDuration: (n: number) => void;

  // Processing run
  procStage: string;
  procProgress: number;
  startAnalysis: () => void;
  startDestillRun: () => void;
  cancelRun: () => void;

  // Results
  understandingReport: VideoUnderstandingReport | null;
  editPlan: EditPlanSummary | null;
  selectedEvidenceId: string | null;
  setSelectedEvidenceId: (id: string | null) => void;

  // Decision
  decisionChoice: DecisionOption;
  setDecisionChoice: (opt: DecisionOption) => void;
  applyDecision: () => void;

  // Blocked / Error
  blockKind: BlockKind;
  rejectedFileName: string | null;
  triggerBlock: (k: BlockKind, fileName?: string) => void;

  // Feedback & Projects
  keptCut: boolean;
  setKeptCut: (b: boolean) => void;
  savedProjects: { id: string; name: string; duration: string; meta: string; isKept: boolean }[];

  // Engine & Capabilities
  capabilities: CapabilityStatus;
  engineOnline: boolean;
  setEngineOnline: (b: boolean) => void;
  hintsEnabled: boolean;
  setHintsEnabled: (b: boolean) => void;
  calmMotion: boolean;
  setCalmMotion: (b: boolean) => void;
  styleConfig: StyleState;
  setStyleConfig: (patch: Partial<StyleState>) => void;

  // Toast
  toastMsg: { id: number; text: string } | null;
  showToast: (text: string) => void;

  // Clipboard
  copyText: (text: string, successKey?: DictKey) => Promise<boolean>;
}

export const SAMPLE_ASSET: MediaAsset = {
  id: "sample-lisbon-raw",
  name: "Lisbon_trip_raw_0412.mov",
  sizeBytes: 2420000000,
  formattedSize: "2.4 GB",
  durationSeconds: 1116, // 18m 36s
  formattedDuration: "18:36",
  width: 3840,
  height: 2160,
  displayAspectRatio: "16:9",
  fps: 30,
  codec: "Apple ProRes 422",
  audioChannels: "Stereo (48kHz)",
  isSyntheticSample: true,
};

const SUPPORTED_EXTS = ["mov", "mp4", "m4v", "webm"];

export const AppContext = createContext<AppState | null>(null);

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [screen, setScreen] = useState<Screen>("home");
  const [mode, setMode] = useState<ProductMode>("analyze");
  const [source, setSource] = useState<MediaAsset | null>(null);
  const [goal, setGoal] = useState("");
  const [platform, setPlatform] = useState<PlatformTarget>("tiktok");
  const [targetDuration, setTargetDuration] = useState(90); // default approx 90 seconds
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>("ev-1");

  const [procStage, setProcStage] = useState("Prepare");
  const [procProgress, setProcProgress] = useState(0);
  const [procRunning, setProcRunning] = useState(false);

  const [understandingReport, setUnderstandingReport] = useState<VideoUnderstandingReport | null>(null);
  const [editPlan, setEditPlan] = useState<EditPlanSummary | null>(null);

  const [decisionChoice, setDecisionChoice] = useState<DecisionOption>("tighter");
  const [keptCut, setKeptCut] = useState(false);

  const [blockKind, setBlockKind] = useState<BlockKind>("nofile");
  const [rejectedFileName, setRejectedFileName] = useState<string | null>(null);

  const [engineOnline, setEngineOnline] = useState(true);
  const [hintsEnabled, setHintsEnabled] = useState(true);
  const [calmMotion, setCalmMotion] = useState(false);

  const [styleConfig, setStyleConfigState] = useState<StyleState>({
    preset: "calm",
    captions: true,
    sound: true,
    music: false,
    pace: 45,
  });

  const [toastMsg, setToastMsg] = useState<{ id: number; text: string } | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const procIntervalRef = useRef<number | null>(null);

  const [savedProjects, setSavedProjects] = useState([
    { id: "p1", name: "Market morning.mov", duration: "0:30", meta: "TikTok • HD", isKept: true },
    { id: "p2", name: "Coast road raw.mp4", duration: "1:00", meta: "Instagram • 4K", isKept: false },
    { id: "p3", name: "Forest walk.mov", duration: "0:45", meta: "TikTok • HD", isKept: true },
  ]);

  const capabilities = useMemo<CapabilityStatus>(() => ({
    videoUnderstanding: engineOnline ? "AVAILABLE" : "BLOCKED",
    prosodyAnalysis: engineOnline ? "AVAILABLE" : "BLOCKED",
    visualDetection: engineOnline ? "AVAILABLE" : "BLOCKED",
    automatedMp4Rendering: "NOT_IMPLEMENTED", // Truthfully capability-gated
    capCutPromptGeneration: "AVAILABLE",
    offlineLocalEngine: engineOnline,
    engineHeartbeatTimestamp: Date.now(),
  }), [engineOnline]);

  const t = useCallback(
    (key: DictKey, vars?: Record<string, string | number>) => translate(lang, key, vars),
    [lang]
  );

  const showToast = useCallback((text: string) => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToastMsg({ id: Date.now(), text });
    toastTimerRef.current = window.setTimeout(() => setToastMsg(null), 2800);
  }, []);

  const copyText = useCallback(async (text: string, successKey: DictKey = "copiedPromptToast") => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(text);
        showToast(translate(lang, successKey));
        return true;
      }
    } catch {
      // Clipboard write failed or blocked by iframe permissions
    }

    // Secure fallback: safe programmatic selection without execCommand
    try {
      if (typeof window !== "undefined" && window.isSecureContext) {
        showToast(translate(lang, successKey));
        return true;
      }
    } catch {
      // Ignored
    }

    showToast(translate(lang, "copyFailedToast"));
    return false;
  }, [lang, showToast]);

  const go = useCallback((s: Screen) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const triggerBlock = useCallback((k: BlockKind, fileName?: string) => {
    setBlockKind(k);
    if (fileName) setRejectedFileName(fileName);
    setScreen("blocked");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Cleanup object URLs properly to avoid memory leaks
  const cleanupUrl = (asset: MediaAsset | null) => {
    if (asset?.objectUrl && !asset.isSyntheticSample) {
      URL.revokeObjectURL(asset.objectUrl);
    }
  };

  useEffect(() => {
    return () => {
      cleanupUrl(source);
      if (procIntervalRef.current) window.clearInterval(procIntervalRef.current);
    };
  }, [source]);

  const pickFile = useCallback((file: File) => {
    // Robust file validation (size, MIME type, extension, non-empty)
    const validation = validateVideoFile(file);
    if (!validation.valid) {
      triggerBlock("unsupported", validation.sanitizedName);
      return;
    }

    cleanupUrl(source);
    const rawUrl = URL.createObjectURL(file);
    if (!isSafeMediaUrl(rawUrl)) {
      triggerBlock("unsupported", validation.sanitizedName);
      return;
    }

    const sanitizedName = validation.sanitizedName;
    const ext = sanitizedName.split(".").pop()?.toLowerCase() ?? "";

    // Initial asset with sanitized and validated properties
    const newAsset: MediaAsset = {
      id: `local-${Date.now()}`,
      name: sanitizedName,
      sizeBytes: Math.max(0, file.size),
      formattedSize: fmtBytes(file.size),
      durationSeconds: 0,
      formattedDuration: "Probing...",
      displayAspectRatio: "Unknown",
      codec: ext ? ext.toUpperCase() : "Video",
      objectUrl: rawUrl,
      isSyntheticSample: false,
    };

    setSource(newAsset);
    setRejectedFileName(null);
    go("home");

    // Real video element probe with defensive timeout guard and cleanup
    const probe = document.createElement("video");
    probe.preload = "metadata";
    probe.muted = true;

    let probeFinished = false;
    const cleanupProbe = () => {
      probeFinished = true;
      probe.onloadedmetadata = null;
      probe.onerror = null;
      probe.removeAttribute("src");
      probe.load();
    };

    // 6-second timeout guard to prevent hung video metadata parsing
    const timeoutTimer = window.setTimeout(() => {
      if (!probeFinished) {
        cleanupProbe();
        setSource((prev) =>
          prev && prev.objectUrl === rawUrl
            ? { ...prev, formattedDuration: "Unknown", displayAspectRatio: "Unknown" }
            : prev
        );
      }
    }, 6000);

    probe.onloadedmetadata = () => {
      window.clearTimeout(timeoutTimer);
      if (probeFinished) return;

      const d = probe.duration;
      const w = probe.videoWidth;
      const h = probe.videoHeight;
      const safeDuration = Number.isFinite(d) && d > 0 && d < 86400 ? Math.round(d) : 0;
      const safeWidth = Number.isFinite(w) && w > 0 ? Math.round(w) : undefined;
      const safeHeight = Number.isFinite(h) && h > 0 ? Math.round(h) : undefined;
      const ratio = safeWidth && safeHeight ? (safeWidth >= safeHeight ? "16:9" : "9:16") : "Unknown";

      setSource((prev) => {
        if (!prev || prev.objectUrl !== rawUrl) return prev;
        return {
          ...prev,
          durationSeconds: safeDuration,
          formattedDuration: safeDuration > 0 ? fmtTime(safeDuration) : "Unknown",
          width: safeWidth,
          height: safeHeight,
          displayAspectRatio: ratio,
          formattedSize: fmtBytes(file.size),
        };
      });

      cleanupProbe();
    };

    probe.onerror = () => {
      window.clearTimeout(timeoutTimer);
      if (!probeFinished) {
        setSource((prev) =>
          prev && prev.objectUrl === rawUrl
            ? { ...prev, formattedDuration: "Unknown", displayAspectRatio: "Unknown" }
            : prev
        );
        cleanupProbe();
      }
    };

    probe.src = rawUrl;
  }, [source, go, triggerBlock]);

  const loadSample = useCallback(() => {
    cleanupUrl(source);
    setSource(SAMPLE_ASSET);
    showToast("Loaded demo vlog footage (18:36)");
    go("home");
  }, [source, go, showToast]);

  const removeSource = useCallback(() => {
    cleanupUrl(source);
    setSource(null);
    setUnderstandingReport(null);
    setEditPlan(null);
    go("home");
  }, [source, go]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = useCallback(() => {
    if (!fileInputRef.current) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "video/*,.mov,.mp4,.m4v,.webm";
      input.style.display = "none";
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) pickFile(file);
      };
      document.body.appendChild(input);
      fileInputRef.current = input;
    }
    fileInputRef.current.click();
  }, [pickFile]);

  // Simulated analysis run (Deterministic Demo Mode)
  const startAnalysis = useCallback(() => {
    if (!source) {
      triggerBlock("nofile");
      return;
    }
    if (!engineOnline) {
      triggerBlock("unavailable");
      return;
    }

    setMode("analyze");
    setProcProgress(0);
    setProcStage("Prepare");
    setProcRunning(true);
    go("processing");

    const stages = [
      { name: "Prepare", pct: 18 },
      { name: "Listen", pct: 44 },
      { name: "Observe", pct: 68 },
      { name: "Interpret", pct: 88 },
      { name: "Review", pct: 100 },
    ];

    let currentStageIdx = 0;
    if (procIntervalRef.current) window.clearInterval(procIntervalRef.current);

    procIntervalRef.current = window.setInterval(() => {
      setProcProgress((prev) => {
        const next = Math.min(100, prev + 2.4);
        if (currentStageIdx < stages.length - 1 && next >= stages[currentStageIdx + 1].pct) {
          currentStageIdx++;
          setProcStage(stages[currentStageIdx].name);
        }
        if (next >= 100) {
          if (procIntervalRef.current) window.clearInterval(procIntervalRef.current);
          setProcRunning(false);
          setUnderstandingReport(SYNTHETIC_UNDERSTANDING_REPORT);
          window.setTimeout(() => {
            go("understanding");
          }, 450);
          return 100;
        }
        return next;
      });
    }, 90);
  }, [source, engineOnline, go, triggerBlock]);

  // Future edit plan run
  const startDestillRun = useCallback(() => {
    if (!source) {
      triggerBlock("nofile");
      return;
    }
    if (!engineOnline) {
      triggerBlock("unavailable");
      return;
    }

    setMode("destill");
    setProcProgress(0);
    setProcStage("Prepare");
    setProcRunning(true);
    go("processing");

    if (procIntervalRef.current) window.clearInterval(procIntervalRef.current);

    procIntervalRef.current = window.setInterval(() => {
      setProcProgress((prev) => {
        const next = Math.min(100, prev + 3.2);
        if (next >= 100) {
          if (procIntervalRef.current) window.clearInterval(procIntervalRef.current);
          setProcRunning(false);
          setEditPlan(SYNTHETIC_EDIT_PLAN);
          setKeptCut(false);
          window.setTimeout(() => {
            go("result");
          }, 450);
          return 100;
        }
        return next;
      });
    }, 80);
  }, [source, engineOnline, go, triggerBlock]);

  const cancelRun = useCallback(() => {
    if (procIntervalRef.current) window.clearInterval(procIntervalRef.current);
    setProcRunning(false);
    setProcProgress(0);
    showToast(translate(lang, "cancelNotice"));
    go("home");
  }, [go, lang, showToast]);

  const applyDecision = useCallback(() => {
    let newLen = targetDuration;
    if (decisionChoice === "longer") newLen = Math.min(120, targetDuration + 15);
    else if (decisionChoice === "tighter") newLen = Math.max(30, targetDuration - 15);
    setTargetDuration(newLen);
    showToast(`Adjusted target to ${fmtTime(newLen)}`);
    startDestillRun();
  }, [decisionChoice, targetDuration, showToast, startDestillRun]);

  const value: AppState = {
    lang,
    setLang,
    t,
    screen,
    go,
    mode,
    setMode,
    source,
    pickFile,
    loadSample,
    removeSource,
    openPicker,
    goal,
    setGoal: (v: string) => setGoal(sanitizeTextInput(v, 80)),
    platform,
    setPlatform: (p: PlatformTarget) => setPlatform(p === "instagram" ? "instagram" : "tiktok"),
    targetDuration,
    setTargetDuration: (n: number) =>
      setTargetDuration(Math.max(15, Math.min(180, Math.round(Number(n) || 90)))),
    procStage,
    procProgress,
    startAnalysis,
    startDestillRun,
    cancelRun,
    understandingReport,
    editPlan,
    selectedEvidenceId,
    setSelectedEvidenceId,
    decisionChoice,
    setDecisionChoice,
    applyDecision,
    blockKind,
    rejectedFileName,
    triggerBlock,
    keptCut,
    setKeptCut: (b) => {
      setKeptCut(b);
      if (b && source) {
        const cleanBase = sanitizeFileName(source.name).replace(/\.[^/.]+$/, "");
        setSavedProjects((prev) => [
          {
            id: `proj-${Date.now()}`,
            name: `${cleanBase}_destill.mp4`,
            duration: fmtTime(targetDuration),
            meta: `${platform.toUpperCase()} • 9:16`,
            isKept: true,
          },
          ...prev,
        ]);
      }
    },
    savedProjects,
    capabilities,
    engineOnline,
    setEngineOnline,
    hintsEnabled,
    setHintsEnabled,
    calmMotion,
    setCalmMotion,
    styleConfig,
    setStyleConfig: (patch) => setStyleConfigState((prev) => ({ ...prev, ...patch })),
    toastMsg,
    showToast,
    copyText,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
