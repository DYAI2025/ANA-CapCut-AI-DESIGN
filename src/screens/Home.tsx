import { useState, type DragEvent } from "react";
import { useApp } from "../lib/store";
import {
  IconArrowRight,
  IconCamera,
  IconDevice,
  IconDrop,
  IconLock,
  IconRefresh,
  IconSpark,
  IconTrash,
  IconVideo,
  IconWave,
} from "../lib/icons";
import { Button, Card, Field, Pill, Segmented, Slider, Tooltip } from "../components/ui";
import { VideoPreview } from "../components/VideoPreview";
import { fmtTime } from "../utils/formatters";
import { cn } from "../utils/cn";

export function Home() {
  const {
    t,
    source,
    openPicker,
    pickFile,
    loadSample,
    removeSource,
    goal,
    setGoal,
    platform,
    setPlatform,
    targetDuration,
    setTargetDuration,
    mode,
    setMode,
    startAnalysis,
    startDestillRun,
  } = useApp();

  const [dragOver, setDragOver] = useState(false);
  const ready = !!source;

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) pickFile(file);
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col px-4 pb-20 pt-2 lg:px-6">
      {/* Hero Header */}
      <div className="mb-7 text-center lg:mb-10">
        <h1 className="text-[32px] font-bold leading-[1.08] tracking-[-0.03em] text-[#1c2434] sm:text-[46px]">
          {t("homeTitle")}
        </h1>
        <p className="mx-auto mt-3 max-w-[620px] text-[15.5px] leading-relaxed text-[#4a566d] sm:text-[17px]">
          {t("homeSub")}
        </p>
      </div>

      {/* Main Grid: Left = Source DropZone / Selected Card, Right = Brief Specification */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-8 items-start">
        {/* Left Column: Source Video Dropzone or Probed File Card */}
        {ready ? (
          <Card className="flex flex-col gap-5 p-5 sm:p-7">
            {/* Real or Generative Video Preview */}
            <div className="overflow-hidden rounded-[24px]">
              <VideoPreview
                asset={source}
                sceneKind="dawn"
                ratio="16/9"
                badge={
                  <Pill tone="mint" dot>
                    {t("sourceReadyBadge")}
                  </Pill>
                }
              />
            </div>

            {/* Probed Metadata Summary — Truthful (no fabricated stats) */}
            <div className="flex items-start justify-between gap-4 px-1 pt-1">
              <div className="min-w-0">
                <div
                  className="truncate text-[18px] font-bold tracking-tight text-[#1c2434]"
                  title={source.name}
                >
                  {source.name}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[12.5px] font-medium text-[#6b7791]">
                  <span>{t("durationLabel")}: <strong className="text-[#1c2434]">{source.formattedDuration}</strong></span>
                  <span>•</span>
                  <span>{t("sizeLabel")}: <strong className="text-[#1c2434]">{source.formattedSize}</strong></span>
                  <span>•</span>
                  <span>{t("resolutionLabel")}: <strong className="text-[#1c2434]">{source.width && source.height ? `${source.width}×${source.height}` : source.displayAspectRatio}</strong></span>
                </div>
              </div>
            </div>

            {/* Local Codec / Hardware Acceleration notice */}
            <div className="rounded-[18px] bg-black/5 px-3.5 py-2.5 text-[11.5px] leading-relaxed text-[#6b7791]">
              <span className="font-semibold text-[#1c2434]">Local Source: </span>
              {t("hevcNotice")}
            </div>

            {/* Replace / Remove Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button size="sm" icon={<IconRefresh size={14} />} onClick={openPicker}>
                {t("replaceSource")}
              </Button>
              <Button size="sm" variant="ghost" icon={<IconTrash size={14} />} onClick={removeSource}>
                {t("removeSource")}
              </Button>
            </div>
          </Card>
        ) : (
          /* Empty DropZone */
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={cn(
              "neu-inset relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-[36px] p-8 text-center transition-all duration-300",
              dragOver && "scale-[1.01] ring-2 ring-[#5160e8]/50"
            )}
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-5 rounded-[26px] border border-dashed transition-colors duration-300",
                dragOver ? "border-[#5160e8]" : "border-[#6b7791]/30"
              )}
            />

            <button
              type="button"
              onClick={openPicker}
              className="group relative z-10 flex flex-col items-center gap-5 rounded-[28px] p-4 select-none"
            >
              <span className="anim-float relative block">
                <span className="neu-raised grid h-[104px] w-[104px] place-items-center rounded-[32px] text-[#5160e8] transition-transform duration-300 group-hover:-translate-y-1 group-active:scale-95">
                  <IconVideo size={42} strokeWidth={1.6} />
                </span>
              </span>

              <span>
                <span className="block text-[23px] font-bold tracking-tight text-[#1c2434]">
                  {dragOver ? t("dropRelease") : t("dropTitle")}
                </span>
                <span className="mt-1 block text-[15px] text-[#6b7791]">
                  {t("dropSub")}
                </span>
              </span>
            </button>

            <div className="relative z-10 mt-3 flex flex-col items-center gap-3">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#6b7791]/80">
                {t("dropFormats")}
              </span>
              <Button
                variant="ghost"
                size="sm"
                icon={<IconSpark size={14} />}
                tip={t("sampleVideoTip")}
                onClick={loadSample}
              >
                {t("sampleVideoBtn")}
              </Button>
            </div>
          </div>
        )}

        {/* Right Column: Brief Parameters Card */}
        <Card className="flex flex-col justify-center gap-6 p-6 sm:p-7">
          <div className="flex items-center justify-between pb-1 border-b border-[#cfd6e3]/50">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#6b7791]">
              Creative Parameters
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#1a886e]">
              <IconLock size={12} />
              Local-first
            </span>
          </div>

          {/* Optional One-Line Story Goal */}
          <Field
            label={t("briefStoryLabel")}
            aside={
              <span className="text-[11px] font-semibold text-[#6b7791] tabular-nums">
                {goal.length}/80
              </span>
            }
          >
            <label className="neu-inset neu-field flex h-13 items-center gap-3 rounded-2xl px-4">
              <IconSpark size={16} className="text-[#6b7791]" />
              <input
                value={goal}
                maxLength={80}
                onChange={(e) => setGoal(e.target.value)}
                placeholder={t("briefStoryPlaceholder")}
                className="w-full bg-transparent text-[14px] font-medium text-[#1c2434] outline-none placeholder:font-normal placeholder:text-[#6b7791]"
              />
            </label>
          </Field>

          {/* Platform Selector: TikTok vs Instagram */}
          <Field label={t("briefPlatformLabel")}>
            <Segmented
              value={platform}
              onChange={setPlatform}
              options={[
                { value: "tiktok", label: "TikTok (9:16)", icon: <IconDevice size={15} /> },
                { value: "instagram", label: "Instagram Reels", icon: <IconCamera size={15} /> },
              ]}
            />
          </Field>

          {/* Target Duration Setting (Default ~90 seconds) */}
          <Field
            label={t("briefLengthLabel")}
            aside={
              <span className="text-[19px] font-bold tabular-nums tracking-tight text-[#1c2434]">
                {fmtTime(targetDuration)}
              </span>
            }
          >
            <div className="px-1">
              <Slider
                value={targetDuration}
                min={30}
                max={180}
                step={5}
                onChange={setTargetDuration}
                label={t("briefLengthLabel")}
              />
              <div className="mt-1.5 flex justify-between text-[11px] font-semibold tabular-nums text-[#6b7791]">
                <span>30s</span>
                <span className="text-[#5160e8]">~90s Default</span>
                <span>3m (180s)</span>
              </div>
            </div>
          </Field>

          {/* Product Mode Description */}
          <div className="rounded-2xl bg-black/5 p-3.5 text-[12px] leading-relaxed text-[#4a566d]">
            <div className="font-semibold text-[#1c2434] mb-0.5">
              Current Mode: {mode === "analyze" ? t("modeAnalyze") : t("modeDestill")}
            </div>
            {mode === "analyze"
              ? "Understands what was said, voice delivery, and visual scenes with clickable source evidence."
              : "Generates candidate cuts and English CapCut EditPilot instructions (capability gated)."}
          </div>
        </Card>
      </div>

      {/* Main Action Bar */}
      <div className="mt-10 flex flex-col items-center gap-4 lg:mt-12">
        <div className={cn(ready && "cta-glow")}>
          {mode === "analyze" ? (
            <Button
              variant="primary"
              size="xl"
              icon={<IconWave size={22} />}
              onClick={startAnalysis}
              className="w-full sm:w-auto"
            >
              {t("ctaAnalyze")}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="xl"
              icon={<IconDrop size={22} />}
              onClick={startDestillRun}
              className="w-full sm:w-auto"
            >
              {t("ctaDestill")}
            </Button>
          )}
        </div>

        {ready ? (
          <div className="flex flex-wrap items-center justify-center gap-3 text-[13.5px] font-medium text-[#4a566d]">
            <span>Source: <strong className="text-[#1c2434]">{source.formattedDuration}</strong></span>
            <IconArrowRight size={15} className="text-[#6b7791]" />
            <span>Target: <strong className="text-[#1c2434]">{fmtTime(targetDuration)}</strong></span>
            <span>•</span>
            <span className="uppercase text-[11.5px] font-bold text-[#5160e8]">{platform}</span>
          </div>
        ) : (
          <p className="text-[13.5px] text-[#6b7791]">{t("ctaEmptyWarning")}</p>
        )}
      </div>
    </div>
  );
}
