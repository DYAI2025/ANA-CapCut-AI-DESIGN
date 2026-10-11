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
    <div className="mx-auto flex w-full max-w-[1200px] flex-col px-4 pb-20 pt-1 lg:px-6">
      {/* S0 / S1 Header: Restrained Application Workspace Title */}
      <div className="mb-6 text-center lg:mb-8">
        <h1 className="text-[30px] font-bold leading-[1.1] tracking-[-0.03em] text-[#151922] sm:text-[40px]">
          {t("homeTitle")}
        </h1>
        <p className="mx-auto mt-2.5 max-w-[580px] text-[15px] leading-relaxed text-[#4d5566]">
          {t("homeSub")}
        </p>
      </div>

      {/* Main Alternating Surface Grid: Quiet page → Raised Support Card → Milled Concave Well */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-7 items-start">
        {/* Left Column: Milled Source Well (Flagship Concave Surface) */}
        <div className="sculpt-card p-5 sm:p-6.5">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#788296]">
              {ready ? "Selected Video Source" : "Video Ingestion Well"}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0e6f64]">
              <IconLock size={12} />
              {t("staysLocal")}
            </span>
          </div>

          {/* Milled Well (22px radius, opposing inner shadows) */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={cn(
              "sculpt-well relative flex flex-col justify-center overflow-hidden p-4 sm:p-5 transition-all duration-200",
              ready ? "min-h-[290px]" : "min-h-[340px] items-center text-center",
              dragOver && "border-[#3559cb] ring-2 ring-[#3559cb]/30"
            )}
          >
            {ready ? (
              /* S1 State inside the well */
              <div className="flex flex-col gap-4">
                <div className="overflow-hidden rounded-[18px]">
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

                {/* Real probed metadata */}
                <div className="px-1">
                  <div className="truncate text-[16.5px] font-bold tracking-tight text-[#151922]">
                    {source.name}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px] text-[#4d5566]">
                    <span>{t("durationLabel")}: <strong className="text-[#151922] font-mono">{source.formattedDuration}</strong></span>
                    <span>•</span>
                    <span>{t("sizeLabel")}: <strong className="text-[#151922] font-mono">{source.formattedSize}</strong></span>
                    <span>•</span>
                    <span>{t("resolutionLabel")}: <strong className="text-[#151922] font-mono">{source.width && source.height ? `${source.width}×${source.height}` : source.displayAspectRatio}</strong></span>
                  </div>
                </div>

                {/* Local Hardware Acceleration note */}
                <div className="rounded-[14px] bg-white/70 px-3.5 py-2 text-[11px] leading-relaxed text-[#4d5566]">
                  <strong className="text-[#151922]">Hardware Decoded: </strong>
                  {t("hevcNotice")}
                </div>

                {/* Controls inside well */}
                <div className="flex items-center gap-2.5 pt-1">
                  <Button size="sm" icon={<IconRefresh size={13} />} onClick={openPicker}>
                    {t("replaceSource")}
                  </Button>
                  <Button size="sm" variant="ghost" icon={<IconTrash size={13} />} onClick={removeSource}>
                    {t("removeSource")}
                  </Button>
                </div>
              </div>
            ) : (
              /* S0 State inside the well (Milled Dropzone) */
              <>
                <button
                  type="button"
                  onClick={openPicker}
                  className="group relative z-10 flex flex-col items-center gap-4 p-3 select-none"
                >
                  {/* Round medallion with upper-left crest illumination */}
                  <span className="anim-float relative block">
                    <span className="sculpt-btn-raised grid h-[88px] w-[88px] place-items-center rounded-full text-[#3559cb] transition-transform duration-200 group-hover:-translate-y-1">
                      <IconVideo size={36} strokeWidth={1.6} />
                    </span>
                  </span>

                  <div>
                    <span className="block text-[21px] font-bold tracking-tight text-[#151922]">
                      {dragOver ? t("dropRelease") : t("dropTitle")}
                    </span>
                    <span className="mt-1 block text-[13.5px] text-[#788296]">
                      {t("dropSub")}
                    </span>
                  </div>
                </button>

                <div className="relative z-10 mt-3 flex flex-col items-center gap-2.5">
                  <span className="text-[10.5px] font-bold tracking-wider uppercase text-[#788296]">
                    {t("dropFormats")}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<IconSpark size={13} />}
                    tip={t("sampleVideoTip")}
                    onClick={loadSample}
                  >
                    {t("sampleVideoBtn")}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Brief Parameters Card */}
        <div className="sculpt-card flex flex-col gap-5.5 p-5 sm:p-6.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#c6ccd8]/50">
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#788296]">
              Creative Parameters
            </span>
            <Pill tone="neutral">Ana Context</Pill>
          </div>

          {/* Optional One-Line Story Goal */}
          <Field
            label={t("briefStoryLabel")}
            aside={
              <span className="text-[11px] font-mono text-[#788296]">
                {goal.length}/80
              </span>
            }
          >
            <div className="sculpt-input-well flex h-11 items-center gap-2.5 px-3.5">
              <IconSpark size={15} className="text-[#788296] shrink-0" />
              <input
                value={goal}
                maxLength={80}
                onChange={(e) => setGoal(e.target.value)}
                placeholder={t("briefStoryPlaceholder")}
                className="w-full bg-transparent text-[13.5px] font-medium text-[#151922] outline-none placeholder:text-[#788296]"
              />
            </div>
          </Field>

          {/* Platform Segmented Control */}
          <Field label={t("briefPlatformLabel")}>
            <Segmented
              value={platform}
              onChange={setPlatform}
              options={[
                { value: "tiktok", label: "TikTok (9:16)", icon: <IconDevice size={14} /> },
                { value: "instagram", label: "Instagram Reels", icon: <IconCamera size={14} /> },
              ]}
            />
          </Field>

          {/* Target Duration Setting */}
          <Field
            label={t("briefLengthLabel")}
            aside={
              <span className="text-[17px] font-bold font-mono tracking-tight text-[#151922]">
                {fmtTime(targetDuration)}
              </span>
            }
          >
            <div className="px-0.5">
              <Slider
                value={targetDuration}
                min={30}
                max={180}
                step={5}
                onChange={setTargetDuration}
                label={t("briefLengthLabel")}
              />
              <div className="mt-1.5 flex justify-between text-[11px] font-mono text-[#788296]">
                <span>30s</span>
                <span className="text-[#3559cb] font-bold">~90s Target</span>
                <span>180s</span>
              </div>
            </div>
          </Field>

          {/* Mode Explanation Notice */}
          <div className="sculpt-well-sm p-3.5 text-[11.5px] leading-relaxed text-[#4d5566]">
            <span className="font-bold text-[#151922] block mb-0.5">
              Active Mode: {mode === "analyze" ? t("modeAnalyze") : t("modeDestill")}
            </span>
            {mode === "analyze"
              ? "Understands message, verbal claims, vocal prosody, and scene framing with evidence grounding."
              : "Drafts a 5-segment assembly plan and CapCut EditPilot prompt (future capability gated)."}
          </div>
        </div>
      </div>

      {/* Primary Action Button (Single Dominant High-Contrast Control) */}
      <div className="mt-8 flex flex-col items-center gap-3 lg:mt-10">
        <div>
          {mode === "analyze" ? (
            <Button
              variant="primary"
              size="xl"
              icon={<IconWave size={20} />}
              onClick={startAnalysis}
              className="w-full sm:w-auto"
            >
              {t("ctaAnalyze")}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="xl"
              icon={<IconDrop size={20} />}
              onClick={startDestillRun}
              className="w-full sm:w-auto"
            >
              {t("ctaDestill")}
            </Button>
          )}
        </div>

        {ready ? (
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-[13px] text-[#4d5566]">
            <span>Raw Source: <strong className="text-[#151922] font-mono">{source.formattedDuration}</strong></span>
            <IconArrowRight size={14} className="text-[#788296]" />
            <span>Target Short: <strong className="text-[#151922] font-mono">{fmtTime(targetDuration)}</strong></span>
            <span>•</span>
            <span className="uppercase text-[11px] font-bold text-[#3559cb]">{platform}</span>
          </div>
        ) : (
          <p className="text-[13px] text-[#788296]">{t("ctaEmptyWarning")}</p>
        )}
      </div>
    </div>
  );
}
