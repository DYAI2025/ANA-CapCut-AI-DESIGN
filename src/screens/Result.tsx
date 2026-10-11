import { useMemo, useState } from "react";
import { useApp } from "../lib/store";
import { ScreenHead } from "../components/ScreenHead";
import { PhoneFrame, Scene } from "../components/Scene";
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
import { SYNTHETIC_EDIT_PLAN } from "../services/engineAdapter";
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
  } = useApp();

  const plan = SYNTHETIC_EDIT_PLAN;
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportOption, setExportOption] = useState<"video" | "prompt" | "both">("both");
  const [exportPhase, setExportPhase] = useState<"idle" | "busy" | "done">("idle");

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

  const startExportSimulation = () => {
    setExportPhase("busy");
    setTimeout(() => {
      setExportPhase("done");
    }, 1200);
  };

  return (
    <div className="mx-auto w-full max-w-[1380px] px-4 pb-24 pt-1 lg:px-6">
      {/* Screen Head */}
      <ScreenHead
        kicker="S6 — Candidate Edit Preview"
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
              onClick={() => {
                setExportPhase("idle");
                setExportModalOpen(true);
              }}
            >
              {t("exportBtn")}
            </Button>
          </div>
        }
      />

      {/* S6 Honest Result Watermark Notice */}
      <div className="sculpt-well-sm mb-5 flex items-center justify-between gap-3 p-3 text-[12px] text-[#4d5566]">
        <div className="flex items-center gap-2">
          <IconInfo size={15} className="text-[#0e6f64] shrink-0" />
          <span className="font-semibold text-[#151922]">PREVIEW_UNAVAILABLE / NOT_RENDERED: </span>
          <span>{t("resDemoWatermark")}</span>
        </div>
        <Pill tone="mint">Planned Target: {fmtTime(plan.actualDurationSeconds)}</Pill>
      </div>

      {/* Main Grid: Left 9:16 Video Player, Right Rationale & CapCut Prompt */}
      <div className="grid gap-6 lg:grid-cols-[380px_1fr] xl:grid-cols-[410px_1fr] lg:gap-7 items-start">
        {/* Left: 9:16 Video Frame Card */}
        <div className="flex flex-col gap-4.5 lg:sticky lg:top-20">
          <Card className="flex flex-col items-center gap-4 p-5">
            <PhoneFrame className="w-full max-w-[270px]">
              <div className="relative h-full w-full">
                <Scene kind="dawn" aspect="9/16" />

                {/* Subtitle simulation with clean Montserrat aesthetic */}
                <div className="absolute inset-x-3 bottom-14 rounded-[12px] bg-black/80 px-3 py-1.5 text-center text-[12px] font-bold text-white tracking-wide backdrop-blur-md">
                  "If you need 40 seconds to explain it, you lost the feed."
                </div>

                {/* Play Button */}
                {!playing && (
                  <div className="absolute inset-0 grid place-items-center">
                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      aria-label="Play candidate cut"
                      className="grid h-13 w-13 place-items-center rounded-full bg-white/85 text-[#3559cb] shadow-[0_6px_20px_rgba(21,25,34,0.35)] backdrop-blur-md"
                    >
                      <IconPlay size={20} className="ml-0.5" />
                    </button>
                  </div>
                )}
              </div>
            </PhoneFrame>

            {/* Playback Scrubber */}
            <div className="flex w-full items-center gap-2.5 px-1">
              <button
                type="button"
                onClick={() => setPlaying(!playing)}
                className="sculpt-btn-raised grid h-7 w-7 place-items-center rounded-full text-[#151922]"
              >
                {playing ? <IconPause size={12} /> : <IconPlay size={12} className="ml-0.5" />}
              </button>
              <div className="sculpt-well-sm relative h-2 flex-1 overflow-hidden p-0">
                <div
                  className="h-full bg-gradient-to-r from-[#6082ec] to-[#0e6f64]"
                  style={{ width: `${(currentTime / plan.actualDurationSeconds) * 100}%` }}
                />
              </div>
              <span className="font-mono text-[10.5px] font-semibold text-[#788296]">
                {fmtTime(currentTime)} / {fmtTime(plan.actualDurationSeconds)}
              </span>
            </div>

            {/* KEEP / CHANGE / DROP Feedback Actions */}
            <div className="w-full border-t border-[#c6ccd8]/50 pt-3.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#788296] text-center mb-2.5">
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
              <div className="text-[10px] font-bold text-[#788296] uppercase tracking-wider">
                {t("metricsSourceDuration")}
              </div>
              <div className="mt-0.5 font-mono text-[15px] font-bold text-[#151922]">
                {source?.formattedDuration ?? "18:36"}
              </div>
            </div>
            <div className="sculpt-well-sm p-2.5">
              <div className="text-[10px] font-bold text-[#3559cb] uppercase tracking-wider">
                {t("metricsCutDuration")}
              </div>
              <div className="mt-0.5 font-mono text-[15px] font-bold text-[#3559cb]">
                {fmtTime(plan.actualDurationSeconds)}
              </div>
            </div>
            <div className="sculpt-well-sm p-2.5">
              <div className="text-[10px] font-bold text-[#0e6f64] uppercase tracking-wider">
                {t("metricsPreservedMoments")}
              </div>
              <div className="mt-0.5 font-mono text-[15px] font-bold text-[#0e6f64]">
                {plan.preservedMomentsCount} takes
              </div>
            </div>
            <div className="sculpt-well-sm p-2.5">
              <div className="text-[10px] font-bold text-[#7d4508] uppercase tracking-wider">
                {t("metricsRemovedMoments")}
              </div>
              <div className="mt-0.5 font-mono text-[15px] font-bold text-[#7d4508]">
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
              <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#788296] mb-2">
                Planned Assembly Segments
              </div>
              <div className="space-y-1.5">
                {plan.segments.map((seg, i) => (
                  <div
                    key={seg.id}
                    className="sculpt-well-sm flex items-center justify-between gap-3 px-3.5 py-2 text-[12.5px]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[10.5px] font-bold text-[#3559cb]">
                        {i + 1}
                      </span>
                      <span className="font-semibold text-[#151922]">{seg.title}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11.5px] text-[#788296]">
                      <span>Source {fmtTime(seg.sourceStart)}–{fmtTime(seg.sourceEnd)}</span>
                      <span>→</span>
                      <span className="text-[#3559cb] font-bold">{fmtTime(seg.cutStart)}–{fmtTime(seg.cutEnd)}</span>
                    </div>
                  </div>
                ))}
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
                <p className="mt-0.5 text-[12.5px] text-[#788296]">
                  {t("promptSub")}
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                icon={<IconCopy size={14} />}
                onClick={() => copyText(promptText)}
              >
                {t("copyPromptBtn")}
              </Button>
            </div>

            {/* Prompt Text Box */}
            <pre className="sculpt-well max-h-[250px] overflow-auto whitespace-pre-wrap p-4 font-mono text-[12px] leading-[1.65] text-[#151922] select-all">
              {promptText}
            </pre>
          </Card>
        </div>
      </div>

      {/* Export Modal */}
      {exportModalOpen && (
        <Modal onClose={() => setExportModalOpen(false)}>
          <Card className="p-6 sm:p-7">
            {exportPhase === "done" ? (
              <div className="flex flex-col items-center gap-3.5 py-3 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-[#0e6f64]/15 text-[#0e6f64]">
                  <IconCheck size={28} />
                </span>
                <div>
                  <h3 className="text-[18px] font-bold text-[#151922]">
                    {t("exportSimulatedDone")}
                  </h3>
                  <p className="mt-1 text-[13px] text-[#788296]">
                    Artifacts packaged locally for CapCut desktop/mobile import.
                  </p>
                </div>
                <Button variant="primary" size="md" onClick={() => setExportModalOpen(false)}>
                  {t("exportClose")}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4.5">
                <div className="flex items-center justify-between border-b border-[#c6ccd8]/50 pb-2.5">
                  <h3 className="text-[17.5px] font-bold text-[#151922] tracking-tight">
                    {t("exportTitle")}
                  </h3>
                  <Pill tone="mint">Local Handoff</Pill>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: "video", label: t("exportOptionVideo"), sub: t("exportOptionVideoDesc") },
                    { id: "prompt", label: t("exportOptionPrompt"), sub: t("exportOptionPromptDesc") },
                    { id: "both", label: t("exportOptionBoth"), sub: t("exportOptionBothDesc") },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setExportOption(opt.id as any)}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-[16px] p-3 text-center transition-all",
                        exportOption === opt.id
                          ? "sculpt-well border border-[#3559cb]/30 text-[#3559cb]"
                          : "sculpt-btn-raised"
                      )}
                    >
                      <span className="text-[13px] font-bold text-[#151922]">{opt.label}</span>
                      <span className="text-[10.5px] text-[#788296] leading-tight">{opt.sub}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-1.5 flex justify-end gap-2.5">
                  <Button variant="ghost" size="md" onClick={() => setExportModalOpen(false)}>
                    {t("cancelBtn")}
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    disabled={exportPhase === "busy"}
                    onClick={startExportSimulation}
                  >
                    {exportPhase === "busy" ? "Preparing..." : t("exportAction")}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </Modal>
      )}
    </div>
  );
}
