import { useEffect, useMemo, useState } from "react";
import { useApp } from "../lib/store";
import { ScreenHead } from "../components/ScreenHead";
import { PhoneFrame, Scene, type SceneKind } from "../components/Scene";
import { Button, Card, Modal, Pill } from "../components/ui";
import {
  IconArrowLeft,
  IconCheck,
  IconClock,
  IconCopy,
  IconDownload,
  IconInfo,
  IconPause,
  IconPlay,
  IconRefresh,
  IconScissors,
  IconSpark,
  IconTrash,
  IconWand,
} from "../lib/icons";
import { getEditPlanForDecision } from "../services/engineAdapter";
import { fmtTime } from "../utils/formatters";
import { cn } from "../utils/cn";

export function Result() {
  const {
    t,
    source,
    go,
    targetDuration,
    platform,
    keptCut,
    setKeptCut,
    showToast,
    copyText,
    editPlan,
    decisionChoice,
  } = useApp();

  const plan = editPlan ?? getEditPlanForDecision(decisionChoice, source?.name);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Smooth playback loop
  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(() => {
      setCurrentTime((prev) => {
        const next = Math.round((prev + 0.1) * 10) / 10;
        if (next >= plan.actualDurationSeconds) {
          return 0; // loop seamlessly
        }
        return next;
      });
    }, 100);
    return () => window.clearInterval(interval);
  }, [playing, plan.actualDurationSeconds]);

  // Synchronized active segment
  const activeSegmentIndex = useMemo(() => {
    const idx = plan.segments.findIndex(
      (s) => currentTime >= s.cutStart && currentTime <= s.cutEnd
    );
    return idx >= 0 ? idx : 0;
  }, [plan.segments, currentTime]);

  const activeSegment = plan.segments[activeSegmentIndex] || plan.segments[0];

  const activeSceneKind: SceneKind = useMemo(() => {
    const title = (activeSegment.title || "").toLowerCase();
    if (title.includes("market") || title.includes("climax")) return "market";
    if (title.includes("transit") || title.includes("tram") || title.includes("b-roll")) return "city";
    if (title.includes("sunset") || title.includes("pier") || title.includes("outro")) return "coast";
    return "dawn";
  }, [activeSegment]);

  const promptText = useMemo(() => {
    return plan.capCutEditPilotPrompt;
  }, [plan]);

  const handleKeep = () => {
    const next = !keptCut;
    setKeptCut(next);
    showToast(next ? t("feedbackKept") : "Unsaved");
  };

  const handleDrop = () => {
    setKeptCut(false);
    showToast(t("droppedToast"));
    go("home");
  };

  // Real Edit Decision List (.json) file generation and download
  const handleDownloadEDL = () => {
    const edlData = {
      project: "Destill Candidate Cut",
      sourceAsset: source?.name ?? "Lisbon_trip_raw_0412.mov",
      targetDurationSeconds: plan.actualDurationSeconds,
      platform: platform,
      segments: plan.segments,
      editorialRationale: plan.editorialRationale,
      capCutPrompt: plan.capCutEditPilotPrompt,
      metadata: {
        rawDuration: source?.formattedDuration ?? "18:36",
        renderedMp4Status: "NOT_RENDERED_DEMO_PREVIEW",
        exportedAt: new Date().toISOString(),
      },
    };

    const blob = new Blob([JSON.stringify(edlData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `destill_edit_decision_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Downloaded Edit Decision List (.json)");
  };

  return (
    <div className="mx-auto w-full max-w-[1380px] px-4 pb-24 pt-1 lg:px-6">
      {/* Screen Head */}
      <ScreenHead
        kicker="S6 — Proposed Candidate Cut"
        tone="mint"
        icon={<IconSpark size={13} />}
        title={t("resTitle")}
        sub={t("resSub")}
        right={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="md"
              icon={<IconArrowLeft size={14} />}
              onClick={() => go("understanding")}
            >
              {t("navUnderstanding")}
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<IconDownload size={14} />}
              onClick={() => setExportModalOpen(true)}
            >
              {t("exportBtn")}
            </Button>
          </div>
        }
      />

      {/* S6 Honest Result Watermark Notice */}
      <div className="sculpt-well-sm mb-5 flex flex-wrap items-center justify-between gap-3 p-3.5 text-[12px] text-[#4d5566]">
        <div className="flex items-center gap-2">
          <IconInfo size={15} className="text-[#3559cb] shrink-0" />
          <strong className="text-[#151922]">DEMO CANDIDATE PREVIEW — MP4 NOT RENDERED: </strong>
          <span>
            {source?.isSyntheticSample
              ? "Showing proposed short cut structure and CapCut EditPilot prompt for Lisbon raw footage."
              : `Showing proposed cut structure and CapCut prompt for custom source "${source?.name ?? "media"}".`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Pill tone="mint">Planned Target: {fmtTime(plan.actualDurationSeconds)}</Pill>
          <span className="font-mono text-[11px] text-[#606d81] uppercase font-semibold">
            {decisionChoice.toUpperCase()} CUT
          </span>
        </div>
      </div>

      {/* Main Grid: Left 9:16 Video Player, Right Rationale & CapCut Prompt */}
      <div className="grid gap-6 lg:grid-cols-[380px_1fr] xl:grid-cols-[410px_1fr] lg:gap-7 items-start">
        {/* Left: 9:16 Video Frame Card */}
        <div className="flex flex-col gap-4.5 lg:sticky lg:top-20">
          <Card className="flex flex-col items-center gap-4 p-5">
            <PhoneFrame className="w-full max-w-[270px]">
              <div className="relative h-full w-full">
                <Scene kind={activeSceneKind} aspect="9/16" />

                {/* Active Segment Tag */}
                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="truncate max-w-[170px]">
                    Take {activeSegmentIndex + 1}/{plan.segments.length}: {activeSegment.title}
                  </span>
                </div>

                {/* Subtitle simulation with clean typography */}
                <div className="absolute inset-x-3 bottom-14 rounded-[12px] bg-black/85 px-3 py-2 text-center text-[12px] font-bold text-white tracking-wide backdrop-blur-md leading-snug">
                  "{activeSegment.title}"
                  <span className="block mt-0.5 text-[10.5px] font-normal text-white/80">
                    {activeSegment.rationale.slice(0, 56)}...
                  </span>
                </div>

                {/* Play Button Overlay */}
                {!playing && (
                  <div className="absolute inset-0 grid place-items-center">
                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      aria-label="Play candidate cut"
                      className="grid h-13 w-13 place-items-center rounded-full bg-white/90 text-[#3559cb] shadow-[0_6px_20px_rgba(21,25,34,0.35)] backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
                    >
                      <IconPlay size={20} className="ml-0.5" />
                    </button>
                  </div>
                )}
              </div>
            </PhoneFrame>

            {/* Playback Scrubber with Delicate Sculpted Radial Knob */}
            <div className="flex w-full items-center gap-2.5 px-1">
              <button
                type="button"
                onClick={() => setPlaying(!playing)}
                className="sculpt-btn-raised grid h-8 w-8 place-items-center rounded-full text-[#151922] transition-transform active:scale-95 shrink-0"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? <IconPause size={13} /> : <IconPlay size={13} className="ml-0.5" />}
              </button>

              <div
                role="slider"
                aria-valuemin={0}
                aria-valuemax={plan.actualDurationSeconds}
                aria-valuenow={currentTime}
                tabIndex={0}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                  setCurrentTime(Math.round(pos * plan.actualDurationSeconds * 10) / 10);
                }}
                className="sculpt-well-sm relative h-3 flex-1 cursor-pointer overflow-visible p-0 rounded-full select-none"
              >
                {/* Progress fill */}
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#6082ec] via-[#3559cb] to-[#0e6f64] transition-[width] duration-75"
                  style={{ width: `${Math.min(100, (currentTime / plan.actualDurationSeconds) * 100)}%` }}
                />

                {/* Sculpted Circular Timeline Knob with delicate radial specular highlight */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full border border-white/90 shadow-[0_2px_6px_rgba(21,25,34,0.35),inset_0_1px_2px_rgba(255,255,255,1)]"
                  style={{
                    left: `${Math.min(100, (currentTime / plan.actualDurationSeconds) * 100)}%`,
                    background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #edf1f7 100%)",
                  }}
                />
              </div>

              <span className="font-mono text-[11px] font-semibold text-[#606d81] tabular-nums whitespace-nowrap shrink-0">
                {fmtTime(Math.min(currentTime, plan.actualDurationSeconds))} / {fmtTime(plan.actualDurationSeconds)}
              </span>
            </div>

            {/* KEEP / CHANGE / DROP Feedback Actions */}
            <div className="w-full border-t border-[#c6ccd8]/50 pt-3.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#606d81] text-center mb-2.5">
                {t("feedbackSub")}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={keptCut ? "primary" : "secondary"}
                  size="sm"
                  icon={<IconCheck size={13} />}
                  onClick={handleKeep}
                >
                  {keptCut ? t("feedbackKept") : t("feedbackKeep")}
                </Button>
                <Button
                  size="sm"
                  icon={<IconRefresh size={13} />}
                  onClick={() => go("decision")}
                >
                  {t("feedbackChange")}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<IconTrash size={13} />}
                  onClick={handleDrop}
                >
                  {t("feedbackDrop")}
                </Button>
              </div>
            </div>
          </Card>

          {/* Metric Comparison Card */}
          <Card className="grid grid-cols-2 gap-2.5 p-4 text-center">
            <div className="sculpt-well-sm p-2.5">
              <div className="text-[10px] font-bold text-[#606d81] uppercase tracking-wider">
                {t("metricsSourceDuration")}
              </div>
              <div className="mt-0.5 font-mono text-[15px] font-bold text-[#151922] tabular-nums">
                {source?.formattedDuration ?? "18:36"}
              </div>
            </div>
            <div className="sculpt-well-sm p-2.5">
              <div className="text-[10px] font-bold text-[#3559cb] uppercase tracking-wider">
                {t("metricsCutDuration")}
              </div>
              <div className="mt-0.5 font-mono text-[15px] font-bold text-[#3559cb] tabular-nums">
                {fmtTime(plan.actualDurationSeconds)}
              </div>
            </div>
            <div className="sculpt-well-sm p-2.5">
              <div className="text-[10px] font-bold text-[#0e6f64] uppercase tracking-wider">
                {t("metricsPreservedMoments")}
              </div>
              <div className="mt-0.5 font-mono text-[15px] font-bold text-[#0e6f64] tabular-nums">
                {plan.preservedMomentsCount} takes
              </div>
            </div>
            <div className="sculpt-well-sm p-2.5">
              <div className="text-[10px] font-bold text-[#7d4508] uppercase tracking-wider">
                {t("metricsRemovedMoments")}
              </div>
              <div className="mt-0.5 font-mono text-[15px] font-bold text-[#7d4508] tabular-nums">
                {plan.removedMomentsCount} trimmed
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Rationale & CapCut EditPilot Prompt */}
        <div className="flex flex-col gap-5">
          {/* Editorial Rationale Card */}
          <Card className="flex flex-col gap-4.5 p-6 sm:p-7">
            <div className="flex items-center justify-between border-b border-[#c6ccd8]/50 pb-2">
              <div className="flex items-center gap-2 font-bold text-[16px] text-[#151922] tracking-tight">
                <IconSpark size={16} className="text-[#3559cb]" />
                {t("whySectionTitle")}
              </div>
              <Pill tone="mint">Evidence Grounded</Pill>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="sculpt-well-sm flex flex-col gap-1 p-3.5 text-left">
                <span className="text-[11px] font-bold text-[#3559cb] uppercase tracking-wider">
                  {t("whyOpenTitle")}
                </span>
                <p className="text-[12.5px] leading-relaxed text-[#4d5566]">
                  {plan.editorialRationale.strongOpening}
                </p>
              </div>

              <div className="sculpt-well-sm flex flex-col gap-1 p-3.5 text-left">
                <span className="text-[11px] font-bold text-[#0e6f64] uppercase tracking-wider">
                  {t("whyThreadTitle")}
                </span>
                <p className="text-[12.5px] leading-relaxed text-[#4d5566]">
                  {plan.editorialRationale.narrativeThread}
                </p>
              </div>

              <div className="sculpt-well-sm flex flex-col gap-1 p-3.5 text-left">
                <span className="text-[11px] font-bold text-[#7d4508] uppercase tracking-wider">
                  {t("whyCleanTitle")}
                </span>
                <p className="text-[12.5px] leading-relaxed text-[#4d5566]">
                  {plan.editorialRationale.cleanCutsExplanation}
                </p>
              </div>
            </div>

            {/* Preserved Segments List */}
            <div>
              <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#606d81] mb-2 flex items-center justify-between">
                <span>Planned Assembly Segments ({plan.segments.length} Takes)</span>
                <span className="font-mono text-[11px] text-[#3559cb] font-semibold">Active: Take #{activeSegmentIndex + 1}</span>
              </div>
              <div className="space-y-1.5">
                {plan.segments.map((seg, i) => {
                  const isCurrent = i === activeSegmentIndex;
                  return (
                    <div
                      key={seg.id}
                      onClick={() => {
                        setCurrentTime(seg.cutStart);
                        setPlaying(true);
                      }}
                      className={cn(
                        "sculpt-well-sm flex items-center justify-between gap-3 px-3.5 py-2.5 text-[12.5px] cursor-pointer transition-all hover:bg-white/90",
                        isCurrent && "border-[#3559cb] ring-2 ring-[#3559cb]/30 bg-white shadow-sm"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "grid h-5 w-5 place-items-center rounded-full text-[10.5px] font-bold tabular-nums transition-colors",
                            isCurrent ? "bg-[#3559cb] text-white" : "bg-white text-[#3559cb]"
                          )}
                        >
                          {i + 1}
                        </span>
                        <div className="flex flex-col">
                          <span className={cn("font-semibold text-[#151922]", isCurrent && "text-[#3559cb]")}>
                            {seg.title}
                          </span>
                          <span className="text-[11px] text-[#606d81] line-clamp-1">{seg.rationale}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[11.5px] text-[#606d81] tabular-nums shrink-0">
                        <span>Source {fmtTime(seg.sourceStart)}–{fmtTime(seg.sourceEnd)}</span>
                        <span>→</span>
                        <span className="text-[#3559cb] font-bold">{fmtTime(seg.cutStart)}–{fmtTime(seg.cutEnd)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* CapCut EditPilot Prompt Card */}
          <Card className="flex flex-col gap-3.5 p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 font-bold text-[16px] text-[#151922] tracking-tight">
                  <IconWand size={16} className="text-[#3559cb]" />
                  {t("promptTitle")}
                </div>
                <p className="mt-0.5 text-[12.5px] text-[#606d81]">
                  {t("promptSub")}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="md"
                  icon={<IconCopy size={14} />}
                  onClick={() => copyText(promptText)}
                >
                  {t("copyPromptBtn")}
                </Button>
              </div>
            </div>

            {/* Prompt Text Box */}
            <pre className="sculpt-well max-h-[250px] overflow-auto whitespace-pre-wrap p-4 font-mono text-[12px] leading-[1.65] text-[#151922] select-all">
              {promptText}
            </pre>
          </Card>
        </div>
      </div>

      {/* Honest Export & Handoff Modal */}
      {exportModalOpen && (
        <Modal onClose={() => setExportModalOpen(false)}>
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4.5">
              <div className="flex items-center justify-between border-b border-[#c6ccd8]/50 pb-2.5">
                <div>
                  <h3 className="text-[17.5px] font-bold text-[#151922] tracking-tight">
                    Export & CapCut Handoff
                  </h3>
                  <span className="text-[11.5px] text-[#606d81]">
                    Candidate cut ready for external editor assembly
                  </span>
                </div>
                <Pill tone="mint">Local Handoff</Pill>
              </div>

              <div className="flex flex-col gap-3">
                {/* Option 1: Copy CapCut EditPilot Prompt */}
                <div className="sculpt-well-sm flex items-center justify-between p-3.5 gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#3559cb]/10 text-[#3559cb]">
                      <IconCopy size={16} />
                    </span>
                    <div>
                      <div className="text-[13px] font-bold text-[#151922]">
                        CapCut EditPilot Prompt
                      </div>
                      <div className="text-[11.5px] text-[#606d81]">
                        Copy prompt directly into CapCut AI Script / Generator
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="primary"
                    icon={<IconCopy size={12} />}
                    onClick={() => copyText(promptText)}
                  >
                    Copy
                  </Button>
                </div>

                {/* Option 2: Download Edit Decision List JSON */}
                <div className="sculpt-well-sm flex items-center justify-between p-3.5 gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0e6f64]/10 text-[#0e6f64]">
                      <IconDownload size={16} />
                    </span>
                    <div>
                      <div className="text-[13px] font-bold text-[#151922]">
                        Edit Decision List (.json)
                      </div>
                      <div className="text-[11.5px] text-[#606d81]">
                        Download complete cut timestamps & rationale data
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={<IconDownload size={12} />}
                    onClick={handleDownloadEDL}
                  >
                    Download
                  </Button>
                </div>

                {/* Status Notice */}
                <div className="rounded-[12px] bg-black/5 p-3 text-[11.5px] leading-relaxed text-[#606d81]">
                  <strong className="text-[#151922]">Direct MP4 Video Rendering: </strong>
                  The local GPU-accelerated video rendering engine is in development for native macOS.
                  Use the CapCut EditPilot prompt or EDL JSON above to assemble footage in CapCut desktop or mobile.
                </div>
              </div>

              <div className="mt-2 flex justify-end">
                <Button variant="ghost" size="md" onClick={() => setExportModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </Modal>
      )}
    </div>
  );
}
