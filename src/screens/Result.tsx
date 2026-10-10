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
  IconTarget,
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
    <div className="mx-auto w-full max-w-[1380px] px-4 pb-24 pt-2 lg:px-6">
      {/* Screen Head */}
      <ScreenHead
        kicker={t("resTitle")}
        tone="mint"
        icon={<IconSpark size={13} />}
        title={t("resTitle")}
        sub={t("resSub")}
        right={
          <div className="flex items-center gap-2.5">
            <Button
              variant="secondary"
              size="md"
              icon={<IconArrowLeft size={15} />}
              onClick={() => go("understanding")}
            >
              {t("navUnderstanding")}
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<IconDownload size={15} />}
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

      {/* Future Result Truthful Notice */}
      <div className="mb-6 flex items-center justify-between gap-3 rounded-[20px] bg-black/5 px-4 py-2.5 text-[12.5px] font-medium text-[#4a566d]">
        <div className="flex items-center gap-2">
          <IconInfo size={16} className="text-[#1a886e] shrink-0" />
          <span>{t("resDemoWatermark")}</span>
        </div>
        <Pill tone="mint">Estimated duration: {fmtTime(plan.actualDurationSeconds)}</Pill>
      </div>

      {/* Main Grid: Left 9:16 Video Player, Right Rationale & CapCut Prompt */}
      <div className="grid gap-6 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] lg:gap-8 items-start">
        {/* Left: 9:16 Video Preview Card */}
        <div className="flex flex-col gap-5 lg:sticky lg:top-24">
          <Card className="flex flex-col items-center gap-4 p-5">
            <PhoneFrame className="w-full max-w-[280px]">
              <div className="relative h-full w-full">
                <Scene kind="dawn" aspect="9/16" />

                {/* Subtitle simulation */}
                <div className="absolute inset-x-3 bottom-14 rounded-xl bg-black/75 px-3 py-1.5 text-center text-[12.5px] font-bold text-white backdrop-blur">
                  "If you need 40 seconds to explain it, you lost the feed."
                </div>

                {/* Center Play Button */}
                {!playing && (
                  <div className="absolute inset-0 grid place-items-center">
                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      aria-label="Play candidate cut"
                      className="grid h-14 w-14 place-items-center rounded-full bg-white/80 text-[#5160e8] shadow-[0_8px_24px_rgba(20,28,60,0.4)] backdrop-blur-md"
                    >
                      <IconPlay size={22} className="ml-0.5" />
                    </button>
                  </div>
                )}
              </div>
            </PhoneFrame>

            {/* Playback Controls & Scrubber */}
            <div className="flex w-full items-center gap-3 px-2">
              <button
                type="button"
                onClick={() => setPlaying(!playing)}
                className="grid h-8 w-8 place-items-center rounded-full bg-black/5 text-[#1c2434] hover:bg-black/10"
              >
                {playing ? <IconPause size={14} /> : <IconPlay size={14} className="ml-0.5" />}
              </button>
              <div className="relative h-2 flex-1 rounded-full bg-black/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#7b8bff] to-[#1a886e]"
                  style={{ width: `${(currentTime / plan.actualDurationSeconds) * 100}%` }}
                />
              </div>
              <span className="font-mono text-[11px] font-semibold text-[#6b7791]">
                {fmtTime(currentTime)} / {fmtTime(plan.actualDurationSeconds)}
              </span>
            </div>

            {/* KEEP / CHANGE / DROP Feedback Actions */}
            <div className="w-full border-t border-[#cfd6e3]/50 pt-4">
              <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#6b7791] text-center mb-3">
                {t("feedbackSub")}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={keptCut ? "primary" : "secondary"}
                  size="sm"
                  icon={<IconCheck size={14} />}
                  onClick={handleKeep}
                >
                  {keptCut ? t("feedbackKept") : t("feedbackKeep")}
                </Button>
                <Button
                  size="sm"
                  icon={<IconRefresh size={14} />}
                  onClick={() => go("decision")}
                >
                  {t("feedbackChange")}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<IconTrash size={14} />}
                  onClick={handleDrop}
                >
                  {t("feedbackDrop")}
                </Button>
              </div>
            </div>
          </Card>

          {/* Metric Comparison Card */}
          <Card className="grid grid-cols-2 gap-3 p-4.5 text-center">
            <div className="neu-inset-sm rounded-[18px] p-3">
              <div className="text-[10.5px] font-bold text-[#6b7791] uppercase tracking-wider">
                {t("metricsSourceDuration")}
              </div>
              <div className="mt-1 font-mono text-[17px] font-bold text-[#1c2434]">
                {source?.formattedDuration ?? "18:36"}
              </div>
            </div>
            <div className="neu-inset-sm rounded-[18px] p-3">
              <div className="text-[10.5px] font-bold text-[#5160e8] uppercase tracking-wider">
                {t("metricsCutDuration")}
              </div>
              <div className="mt-1 font-mono text-[17px] font-bold text-[#5160e8]">
                {fmtTime(plan.actualDurationSeconds)}
              </div>
            </div>
            <div className="neu-inset-sm rounded-[18px] p-3">
              <div className="text-[10.5px] font-bold text-[#1a886e] uppercase tracking-wider">
                {t("metricsPreservedMoments")}
              </div>
              <div className="mt-1 font-mono text-[17px] font-bold text-[#1a886e]">
                {plan.preservedMomentsCount} takes
              </div>
            </div>
            <div className="neu-inset-sm rounded-[18px] p-3">
              <div className="text-[10.5px] font-bold text-[#bd730a] uppercase tracking-wider">
                {t("metricsRemovedMoments")}
              </div>
              <div className="mt-1 font-mono text-[17px] font-bold text-[#bd730a]">
                {plan.removedMomentsCount} trimmed
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Rationale & CapCut EditPilot Prompt */}
        <div className="flex flex-col gap-6">
          {/* Editorial Rationale Card */}
          <Card className="flex flex-col gap-5 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#cfd6e3]/50 pb-2">
              <div className="flex items-center gap-2 font-bold text-[17px] text-[#1c2434] tracking-tight">
                <IconSpark size={18} className="text-[#5160e8]" />
                {t("whySectionTitle")}
              </div>
              <Pill tone="mint">Evidence-grounded</Pill>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="neu-inset-sm flex flex-col gap-1.5 rounded-[22px] p-4 text-left">
                <span className="text-[12px] font-bold text-[#5160e8] uppercase tracking-wider">
                  {t("whyOpenTitle")}
                </span>
                <p className="text-[13px] leading-relaxed text-[#4a566d]">
                  {plan.editorialRationale.strongOpening}
                </p>
              </div>

              <div className="neu-inset-sm flex flex-col gap-1.5 rounded-[22px] p-4 text-left">
                <span className="text-[12px] font-bold text-[#1a886e] uppercase tracking-wider">
                  {t("whyThreadTitle")}
                </span>
                <p className="text-[13px] leading-relaxed text-[#4a566d]">
                  {plan.editorialRationale.narrativeThread}
                </p>
              </div>

              <div className="neu-inset-sm flex flex-col gap-1.5 rounded-[22px] p-4 text-left">
                <span className="text-[12px] font-bold text-[#bd730a] uppercase tracking-wider">
                  {t("whyCleanTitle")}
                </span>
                <p className="text-[13px] leading-relaxed text-[#4a566d]">
                  {plan.editorialRationale.cleanCutsExplanation}
                </p>
              </div>
            </div>

            {/* Preserved Segments List */}
            <div>
              <div className="text-[12px] font-bold uppercase tracking-wider text-[#6b7791] mb-2.5">
                Assembly Segments
              </div>
              <div className="space-y-2">
                {plan.segments.map((seg, i) => (
                  <div
                    key={seg.id}
                    className="flex items-center justify-between gap-3 rounded-[16px] bg-black/5 px-4 py-2.5 text-[13px]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[11px] font-bold text-[#5160e8]">
                        {i + 1}
                      </span>
                      <span className="font-semibold text-[#1c2434]">{seg.title}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[12px] text-[#6b7791]">
                      <span>Source {fmtTime(seg.sourceStart)}–{fmtTime(seg.sourceEnd)}</span>
                      <span>→</span>
                      <span className="text-[#5160e8] font-bold">{fmtTime(seg.cutStart)}–{fmtTime(seg.cutEnd)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* CapCut EditPilot Prompt Card */}
          <Card className="flex flex-col gap-4 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 font-bold text-[17px] text-[#1c2434] tracking-tight">
                  <IconWand size={18} className="text-[#5160e8]" />
                  {t("promptTitle")}
                </div>
                <p className="mt-1 text-[13px] text-[#6b7791]">
                  {t("promptSub")}
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                icon={<IconCopy size={15} />}
                onClick={() => copyText(promptText)}
              >
                {t("copyPromptBtn")}
              </Button>
            </div>

            {/* Prompt Text Block */}
            <pre className="neu-inset max-h-[260px] overflow-auto whitespace-pre-wrap rounded-[22px] p-5 font-mono text-[12.5px] leading-[1.7] text-[#1c2434] select-all">
              {promptText}
            </pre>
          </Card>
        </div>
      </div>

      {/* Export Candidate Artifacts Modal */}
      {exportModalOpen && (
        <Modal onClose={() => setExportModalOpen(false)}>
          <Card className="p-6 sm:p-8">
            {exportPhase === "done" ? (
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-[#1a886e]/15 text-[#1a886e]">
                  <IconCheck size={32} />
                </span>
                <div>
                  <h3 className="text-[20px] font-bold text-[#1c2434]">
                    {t("exportSimulatedDone")}
                  </h3>
                  <p className="mt-1 text-[13.5px] text-[#6b7791]">
                    Vertical MP4 proxy and CapCut EditPilot prompt saved to local project store.
                  </p>
                </div>
                <Button variant="primary" size="md" onClick={() => setExportModalOpen(false)}>
                  {t("exportClose")}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-[#cfd6e3]/50 pb-3">
                  <h3 className="text-[19px] font-bold text-[#1c2434] tracking-tight">
                    {t("exportTitle")}
                  </h3>
                  <Pill tone="mint">Local Only</Pill>
                </div>

                <div className="grid grid-cols-3 gap-3">
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
                        "neu-btn flex flex-col items-center gap-1.5 rounded-[20px] p-3.5 text-center transition-all",
                        exportOption === opt.id ? "neu-inset text-[#5160e8]" : "neu-raised-xs"
                      )}
                    >
                      <span className="text-[13.5px] font-bold text-[#1c2434]">{opt.label}</span>
                      <span className="text-[11px] text-[#6b7791] leading-tight">{opt.sub}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-2 flex justify-end gap-3">
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
