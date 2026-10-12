import { useState, type DragEvent } from "react";
import { useApp } from "../lib/store";
import {
  IconArrowRight,
  IconCamera,
  IconChevron,
  IconChevronUp,
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
  const [showAdvancedParams, setShowAdvancedParams] = useState(false);
  const ready = !!source;

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) pickFile(file);
  };

  return (
    <div className="mx-auto flex w-full max-w-[920px] flex-col px-4 pb-20 pt-2 sm:px-6">
      {/* S0 / S1 Header: Calm, Restrained Sculptural Identity */}
      <div className="mb-8 text-center sm:mb-10">
        <h1 className="text-[32px] font-bold leading-[1.1] tracking-[-0.03em] text-[#151922] sm:text-[42px]">
          {t("homeTitle")}
        </h1>
        <p className="mx-auto mt-2.5 max-w-[620px] text-[15px] leading-relaxed text-[#606d81]">
          {t("homeSub")}
        </p>
      </div>

      {/* Hero Milled Source-Video Well (Dominant Sculptural Center) */}
      <div className="sculpt-card p-5 sm:p-7">
        <div className="mb-3.5 flex items-center justify-between px-1">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#606d81]">
            {ready ? "Selected Video Source" : "Video Ingestion Well"}
          </span>
          <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#0e6f64]">
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
            "sculpt-well relative flex flex-col justify-center overflow-hidden p-5 sm:p-6 transition-all duration-200",
            ready ? "min-h-[300px]" : "min-h-[360px] items-center text-center",
            dragOver && "border-[#3559cb] ring-2 ring-[#3559cb]/30"
          )}
        >
          {ready ? (
            /* S1 State: Ingestion Well with Probed Media */
            <div className="flex flex-col gap-4.5">
              <div className="overflow-hidden rounded-[18px]">
                <VideoPreview
                  asset={source}
                  sceneKind="dawn"
                  ratio="16/9"
                  badge={
                    source.isSyntheticSample ? (
                      <Pill tone="mint" dot>
                        Curated Reference (18:36)
                      </Pill>
                    ) : (
                      <Pill tone="amber" dot>
                        Uploaded File
                      </Pill>
                    )
                  }
                />
              </div>

              {/* Real probed metadata strip with source provenance */}
              <div className="flex flex-col gap-2 px-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="truncate text-[17px] font-bold tracking-tight text-[#151922]">
                    {source.name}
                  </div>
                  <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/5 text-[#4d5566]">
                    {source.isSyntheticSample ? "CURATED SCENARIO" : "CUSTOM MEDIA"}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-[#606d81]">
                  <span>
                    {t("durationLabel")}:{" "}
                    <strong className="text-[#151922] font-mono tabular-nums">
                      {source.formattedDuration}
                    </strong>
                  </span>
                  <span>·</span>
                  <span>
                    {t("sizeLabel")}:{" "}
                    <strong className="text-[#151922] font-mono tabular-nums">
                      {source.formattedSize}
                    </strong>
                  </span>
                  <span>·</span>
                  <span>
                    {t("resolutionLabel")}:{" "}
                    <strong className="text-[#151922] font-mono tabular-nums">
                      {source.width && source.height
                        ? `${source.width}×${source.height}`
                        : source.displayAspectRatio}
                    </strong>
                  </span>
                  {source.codec && (
                    <>
                      <span>·</span>
                      <span className="font-mono text-[11.5px] text-[#3559cb] font-semibold">
                        {source.codec}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Hardware Acceleration Note */}
              <div className="rounded-[14px] bg-white/70 px-4 py-2.5 text-[12px] leading-relaxed text-[#606d81] border border-white/80">
                <strong className="text-[#151922]">
                  {source.isSyntheticSample ? "Deterministic Pipeline: " : "Client-Side Sandbox: "}
                </strong>
                {source.isSyntheticSample
                  ? t("hevcNotice")
                  : `Probed metadata for "${source.name}". Pipeline flow and synthetic analysis enabled for interactive testing.`}
              </div>

              {/* Controls inside well */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button size="sm" icon={<IconRefresh size={13} />} onClick={openPicker}>
                  {t("replaceSource")}
                </Button>
                {!source.isSyntheticSample && (
                  <Button size="sm" variant="secondary" icon={<IconSpark size={13} />} onClick={loadSample}>
                    Load Curated Sample
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  icon={<IconTrash size={13} />}
                  onClick={removeSource}
                >
                  {t("removeSource")}
                </Button>
              </div>
            </div>
          ) : (
            /* S0 State: Inviting Milled Dropzone */
            <div className="flex flex-col items-center gap-4 py-4">
              <button
                type="button"
                onClick={openPicker}
                className="group relative z-10 flex flex-col items-center gap-4 p-2 select-none focus:outline-none"
              >
                {/* Round Medallion with Upper-Left Specular Crest Illumination */}
                <span className="anim-float relative block">
                  <span className="sculpt-btn-raised grid h-[94px] w-[94px] place-items-center rounded-full text-[#3559cb] transition-transform duration-200 group-hover:-translate-y-1">
                    <IconVideo size={38} strokeWidth={1.6} />
                  </span>
                </span>

                <div>
                  <span className="block text-[22px] font-bold tracking-tight text-[#151922]">
                    {dragOver ? t("dropRelease") : t("dropTitle")}
                  </span>
                  <span className="mt-1 block text-[14px] text-[#606d81]">
                    {t("dropSub")}
                  </span>
                </div>
              </button>

              <div className="relative z-10 mt-1 flex flex-col items-center gap-3">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#606d81]">
                  {t("dropFormats")}
                </span>
                <Button
                  variant="secondary"
                  size="md"
                  icon={<IconSpark size={14} className="text-[#3559cb]" />}
                  tip={t("sampleVideoTip")}
                  onClick={loadSample}
                >
                  {t("sampleVideoBtn")} (18:36)
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subordinate Creative Parameters Panel */}
      <div className="mt-6 flex flex-col gap-4">
        {/* Toggle bar for secondary settings or quick glance */}
        <div className="sculpt-card p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-[14.5px] font-bold tracking-tight text-[#151922]">
                Creative Parameters & Workflow
              </span>
              <Pill tone="neutral">Ana Context</Pill>
            </div>
            <button
              type="button"
              onClick={() => setShowAdvancedParams(!showAdvancedParams)}
              className="flex items-center gap-1.5 text-[12px] font-semibold text-[#3559cb] hover:text-[#2442a8]"
            >
              <span>{showAdvancedParams ? "Hide details" : "Adjust settings"}</span>
              {showAdvancedParams ? <IconChevronUp size={14} /> : <IconChevron size={14} />}
            </button>
          </div>

          {/* Core settings always visible, expanded details disclosed progressively */}
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {/* Platform Selection */}
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

            {/* Target Duration Slider */}
            <Field
              label={t("briefLengthLabel")}
              aside={
                <span className="text-[16px] font-bold font-mono tracking-tight text-[#151922] tabular-nums">
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
                <div className="mt-1.5 flex justify-between text-[11px] font-mono text-[#606d81] tabular-nums">
                  <span>30s</span>
                  <span className="text-[#3559cb] font-bold">~90s Target</span>
                  <span>180s</span>
                </div>
              </div>
            </Field>
          </div>

          {/* Progressive Disclosure: Story Goal & Engine Mode */}
          {showAdvancedParams && (
            <div className="mt-5 border-t border-[#c6ccd8]/50 pt-4.5 flex flex-col gap-4.5">
              <Field
                label={t("briefStoryLabel")}
                aside={
                  <span className="text-[11px] font-mono text-[#606d81] tabular-nums">
                    {goal.length}/80
                  </span>
                }
              >
                <div className="sculpt-input-well flex h-11 items-center gap-2.5 px-3.5">
                  <IconSpark size={15} className="text-[#606d81] shrink-0" />
                  <input
                    value={goal}
                    maxLength={80}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder={t("briefStoryPlaceholder")}
                    className="w-full bg-transparent text-[13.5px] font-medium text-[#151922] outline-none placeholder:text-[#606d81]"
                  />
                </div>
              </Field>

              {/* Mode Selection */}
              <Field label="Active Exploration Mode">
                <Segmented
                  value={mode}
                  onChange={(v) => setMode(v as any)}
                  options={[
                    {
                      value: "analyze",
                      label: "Video Understanding (Screen 03)",
                      icon: <IconWave size={14} />,
                    },
                    {
                      value: "destill",
                      label: "Proposed Short Cut (Screen 04)",
                      icon: <IconDrop size={14} />,
                    },
                  ]}
                />
              </Field>
            </div>
          )}
        </div>
      </div>

      {/* Dominant High-Contrast Graphite Primary Action Button */}
      <div className="mt-8 flex flex-col items-center gap-3.5 sm:mt-10">
        <div>
          {mode === "analyze" ? (
            <Button
              variant="primary"
              size="xl"
              icon={<IconWave size={20} />}
              onClick={startAnalysis}
              className="w-full sm:min-w-[280px]"
            >
              {t("ctaAnalyze")}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="xl"
              icon={<IconDrop size={20} />}
              onClick={() => startDestillRun()}
              className="w-full sm:min-w-[280px]"
            >
              {t("ctaDestill")}
            </Button>
          )}
        </div>

        {ready ? (
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-[13px] text-[#606d81]">
            <span>
              Raw Footage:{" "}
              <strong className="text-[#151922] font-mono tabular-nums">
                {source.formattedDuration}
              </strong>
            </span>
            <IconArrowRight size={14} className="text-[#606d81]" />
            <span>
              Target Short:{" "}
              <strong className="text-[#151922] font-mono tabular-nums">
                {fmtTime(targetDuration)}
              </strong>
            </span>
            <span>·</span>
            <span className="uppercase text-[11px] font-bold text-[#3559cb]">{platform}</span>
          </div>
        ) : (
          <p className="text-[13px] text-[#606d81]">{t("ctaEmptyWarning")}</p>
        )}
      </div>
    </div>
  );
}
