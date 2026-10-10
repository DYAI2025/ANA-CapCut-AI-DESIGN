import { useState } from "react";
import { useApp } from "../lib/store";
import { ScreenHead } from "../components/ScreenHead";
import { VideoPreview, type EvidenceMarker } from "../components/VideoPreview";
import { Button, Card, Pill, Segmented } from "../components/ui";
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconEye,
  IconInfo,
  IconMic,
  IconScissors,
  IconSpark,
  IconTarget,
  IconText,
  IconWave,
} from "../lib/icons";
import { SYNTHETIC_UNDERSTANDING_REPORT } from "../services/engineAdapter";
import { fmtTime } from "../utils/formatters";
import { cn } from "../utils/cn";

type TabId = "message" | "story" | "speech" | "delivery" | "visuals" | "evidence";

export function Understanding() {
  const {
    t,
    source,
    go,
    setMode,
    understandingReport = SYNTHETIC_UNDERSTANDING_REPORT,
    selectedEvidenceId,
    setSelectedEvidenceId,
    showToast,
  } = useApp();

  const report = understandingReport ?? SYNTHETIC_UNDERSTANDING_REPORT;
  const [activeTab, setActiveTab] = useState<TabId>("message");
  const [currentVideoTime, setCurrentVideoTime] = useState(18); // Start at hook

  // Evidence markers for the scrubber track
  const markers: EvidenceMarker[] = report.evidenceList.map((e) => ({
    id: e.id,
    timestamp: e.timestampStart,
    label: e.label,
    category: e.category,
  }));

  const jumpToEvidence = (timeSec: number, evidenceId?: string) => {
    setCurrentVideoTime(timeSec);
    if (evidenceId) setSelectedEvidenceId(evidenceId);
    showToast(`Jumped to timestamp ${fmtTime(timeSec)}`);
  };

  const selectedEvidence = report.evidenceList.find((e) => e.id === selectedEvidenceId);

  return (
    <div className="mx-auto w-full max-w-[1380px] px-4 pb-24 pt-2 lg:px-6">
      {/* Screen Head */}
      <ScreenHead
        kicker={t("underTitle")}
        tone="accent"
        icon={<IconWave size={13} />}
        title={t("underTitle")}
        sub={t("underSub")}
        right={
          <div className="flex items-center gap-2.5">
            <Pill tone="mint" dot>
              {t("engineDemoBadge")}
            </Pill>
            <Button
              variant="primary"
              size="md"
              iconRight={<IconArrowRight size={15} />}
              onClick={() => {
                setMode("destill");
                go("result");
              }}
            >
              {t("previewEditPlanBtn")}
            </Button>
          </div>
        }
      />

      {/* Synthetic Demo Banner Notice */}
      <div className="mb-6 flex items-center justify-between gap-3 rounded-[20px] bg-black/5 px-4 py-2.5 text-[12.5px] font-medium text-[#4a566d]">
        <div className="flex items-center gap-2">
          <IconInfo size={16} className="text-[#5160e8] shrink-0" />
          <span>{t("underDemoWarning")}</span>
        </div>
        <span className="hidden font-mono text-[11px] text-[#6b7791] sm:inline">
          Confidence: {Math.round(report.message.confidence * 100)}%
        </span>
      </div>

      {/* 2-Column Responsive Layout: Left ~40% Video & Evidence, Right ~60% Deep Understanding */}
      <div className="grid gap-6 lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] lg:gap-8 items-start">
        {/* Left Column: 9:16 Video Preview & Evidence Navigator */}
        <div className="flex flex-col gap-5 lg:sticky lg:top-24">
          <Card className="flex flex-col items-center gap-4 p-4.5 sm:p-5">
            <div className="w-full max-w-[320px]">
              <VideoPreview
                asset={source}
                sceneKind="dawn"
                ratio="9/16"
                markers={markers}
                currentTimeOverride={currentVideoTime}
                onTimeChange={(t) => setCurrentVideoTime(Math.round(t))}
                badge={
                  <Pill tone="neutral" icon={<IconClock size={12} />}>
                    {fmtTime(currentVideoTime)} / {fmtTime(report.sourceDurationSeconds)}
                  </Pill>
                }
              />
            </div>

            {/* Selected Evidence Inspector */}
            {selectedEvidence && (
              <div className="neu-inset-sm w-full rounded-[20px] p-3.5 text-left">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#6b7791] uppercase tracking-wider">
                  <span>{t("evidenceSelected")}</span>
                  <span className="text-[#5160e8] font-mono">{selectedEvidence.formattedRange}</span>
                </div>
                <div className="mt-1 text-[14px] font-bold text-[#1c2434] tracking-tight">
                  {selectedEvidence.label}
                </div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[#4a566d]">
                  {selectedEvidence.description}
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-[11px] text-[#6b7791]">
                    Match Score: {Math.round(selectedEvidence.confidenceScore * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => jumpToEvidence(selectedEvidence.timestampStart, selectedEvidence.id)}
                    className="text-[12px] font-bold text-[#5160e8] hover:underline"
                  >
                    Play from {fmtTime(selectedEvidence.timestampStart)}
                  </button>
                </div>
              </div>
            )}
          </Card>

          {/* Source Context Summary */}
          <Card className="p-4.5 text-sm text-[#4a566d]">
            <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#6b7791] mb-1.5">
              Source File
            </div>
            <div className="truncate font-semibold text-[#1c2434] text-[14px]">
              {source?.name ?? "Lisbon_trip_raw_0412.mov"}
            </div>
            <div className="mt-2 flex items-center justify-between text-[12px] text-[#6b7791]">
              <span>Probed: 1,116 seconds</span>
              <span>4 Story Beats Identified</span>
            </div>
          </Card>
        </div>

        {/* Right Column: Deep Understanding Facets (Message, Story, Speech, Delivery, Visual, Evidence) */}
        <div className="flex flex-col gap-6">
          {/* Navigation Tabs */}
          <Segmented
            value={activeTab}
            onChange={setActiveTab}
            options={[
              { value: "message", label: t("tabMessage"), icon: <IconTarget size={14} /> },
              { value: "story", label: t("tabStory"), icon: <IconSpark size={14} /> },
              { value: "speech", label: t("tabSpeech"), icon: <IconText size={14} /> },
              { value: "delivery", label: t("tabDelivery"), icon: <IconMic size={14} /> },
              { value: "visuals", label: t("tabVisual"), icon: <IconEye size={14} /> },
              { value: "evidence", label: t("tabEvidence"), icon: <IconCheck size={14} /> },
            ]}
          />

          {/* TAB 1: MESSAGE */}
          {activeTab === "message" && (
            <Card className="flex flex-col gap-6 p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#5160e8]">
                    {t("underPrimaryThesis")}
                  </span>
                  <Pill tone="mint">Confidence: {Math.round(report.message.confidence * 100)}%</Pill>
                </div>
                <div className="mt-2.5 text-[19px] font-semibold leading-relaxed tracking-tight text-[#1c2434]">
                  "{report.message.primaryThesis}"
                </div>
              </div>

              {/* Observed Key Takeaways */}
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#6b7791]">
                  {t("underSecondaryNotes")}
                </span>
                <ul className="mt-3 space-y-2.5">
                  {report.message.secondaryTakeaways.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[#4a566d]">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#5160e8] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Uncertainty Notes */}
              {report.message.uncertaintyNotes && (
                <div className="rounded-2xl bg-black/5 p-4 text-[13px] leading-relaxed text-[#4a566d]">
                  <span className="font-semibold text-[#1c2434]">{t("underUncertainty")}: </span>
                  {report.message.uncertaintyNotes}
                </div>
              )}

              {/* Connected Key Time References */}
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#6b7791]">
                  Grounding Evidence Anchors
                </span>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {report.message.keyTimeReferences.map((ref) => (
                    <button
                      key={ref.id}
                      type="button"
                      onClick={() => jumpToEvidence(ref.timestampStart, ref.id)}
                      className="neu-btn neu-raised-xs flex flex-col items-start gap-1.5 rounded-[18px] p-3.5 text-left"
                    >
                      <span className="text-[11px] font-bold text-[#5160e8] font-mono">
                        {ref.formattedRange}
                      </span>
                      <span className="text-[13px] font-bold text-[#1c2434] leading-tight">
                        {ref.label}
                      </span>
                      <span className="text-[11.5px] text-[#6b7791] line-clamp-2">
                        {ref.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* TAB 2: STORY BEATS */}
          {activeTab === "story" && (
            <Card className="flex flex-col gap-5 p-6 sm:p-8">
              <div className="text-[12px] font-bold uppercase tracking-wider text-[#6b7791]">
                Narrative Progression
              </div>
              <div className="space-y-4">
                {report.storyBeats.map((beat) => (
                  <div
                    key={beat.id}
                    onClick={() => jumpToEvidence(beat.timestampStart)}
                    className="neu-btn neu-raised-sm flex cursor-pointer flex-col gap-2 rounded-[22px] p-4.5 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[#5160e8]/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#5160e8]">
                        {beat.phase}
                      </span>
                      <span className="font-mono text-[12px] font-bold text-[#1c2434]">
                        {beat.formattedTime} ({fmtTime(beat.timestampEnd - beat.timestampStart)} span)
                      </span>
                    </div>
                    <div className="text-[15px] font-semibold text-[#1c2434] tracking-tight">
                      {beat.summary}
                    </div>
                    <div className="text-[12.5px] text-[#6b7791]">
                      Significance: {beat.significance}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 3: SPEECH & CLAIMS */}
          {activeTab === "speech" && (
            <Card className="flex flex-col gap-5 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#6b7791]">
                  Verbal Claims & Transcript Segments
                </span>
                <span className="text-[11.5px] text-[#6b7791]">Filtered for Retention</span>
              </div>
              <div className="space-y-3">
                {report.claims.map((claim) => (
                  <div
                    key={claim.id}
                    onClick={() => jumpToEvidence(claim.timestamp)}
                    className="neu-btn neu-raised-xs flex cursor-pointer items-start justify-between gap-4 rounded-[20px] p-4 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11.5px] font-bold text-[#5160e8]">
                          {claim.formattedTime}
                        </span>
                        {claim.isKeyStatement && (
                          <span className="rounded-md bg-[#1a886e]/15 px-1.5 py-0.2 text-[10px] font-bold text-[#1a886e]">
                            CORE INSIGHT
                          </span>
                        )}
                        {claim.isRepetition && (
                          <span className="rounded-md bg-[#bd730a]/15 px-1.5 py-0.2 text-[10px] font-bold text-[#bd730a]">
                            REPETITION
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-[14px] font-medium text-[#1c2434] leading-relaxed">
                        "{claim.text}"
                      </div>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-bold shrink-0",
                        claim.retentionRecommendation === "KEEP"
                          ? "bg-[#1a886e]/15 text-[#1a886e]"
                          : "bg-black/5 text-[#6b7791]"
                      )}
                    >
                      {claim.retentionRecommendation}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 4: DELIVERY & PROSODY */}
          {activeTab === "delivery" && (
            <Card className="flex flex-col gap-5 p-6 sm:p-8">
              <div className="text-[12px] font-bold uppercase tracking-wider text-[#6b7791]">
                Vocal Cadence, Inflection & Silence Observations
              </div>
              <div className="space-y-3.5">
                {report.prosody.map((pro) => (
                  <div
                    key={pro.id}
                    onClick={() => jumpToEvidence(pro.timestamp)}
                    className="neu-btn neu-raised-xs flex cursor-pointer items-start justify-between gap-4 rounded-[20px] p-4 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-xl bg-[#5160e8]/10 text-[#5160e8] shrink-0">
                        <IconWave size={16} />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11.5px] font-bold text-[#5160e8]">
                            {pro.formattedTime}
                          </span>
                          <span className="text-[12px] font-bold uppercase tracking-wider text-[#1c2434]">
                            {pro.metric.replace("_", " ")}
                          </span>
                        </div>
                        <div className="mt-1 text-[13.5px] text-[#1c2434] leading-snug">
                          {pro.observation}
                        </div>
                      </div>
                    </div>
                    <Pill
                      tone={
                        pro.impactOnPacing === "high_engagement"
                          ? "mint"
                          : pro.impactOnPacing === "awkward_silence"
                          ? "amber"
                          : "neutral"
                      }
                    >
                      {pro.impactOnPacing.replace("_", " ")}
                    </Pill>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 5: VISUALS */}
          {activeTab === "visuals" && (
            <Card className="flex flex-col gap-5 p-6 sm:p-8">
              <div className="text-[12px] font-bold uppercase tracking-wider text-[#6b7791]">
                Framing, Composition & Scene Events
              </div>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {report.visuals.map((vis) => (
                  <div
                    key={vis.id}
                    onClick={() => jumpToEvidence(vis.timestamp)}
                    className="neu-btn neu-raised-sm flex cursor-pointer flex-col gap-2 rounded-[22px] p-4 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11.5px] font-bold text-[#5160e8]">
                        {vis.formattedTime}
                      </span>
                      <span className="text-[11px] font-bold text-[#1a886e]">
                        Hook Score: {vis.visualHookRating}/5
                      </span>
                    </div>
                    <div className="text-[14px] font-bold text-[#1c2434]">
                      {vis.description}
                    </div>
                    <div className="text-[12px] text-[#6b7791]">
                      {vis.overlayObservations}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-[#4a566d]">
                      <span className="rounded bg-black/5 px-1.5 py-0.5 uppercase">{vis.sceneType}</span>
                      <span className="rounded bg-black/5 px-1.5 py-0.5 uppercase">{vis.framing}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 6: ALL EVIDENCE */}
          {activeTab === "evidence" && (
            <Card className="flex flex-col gap-5 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#6b7791]">
                  Grounding Evidence Catalog
                </span>
                <span className="text-[12px] text-[#6b7791] font-mono">
                  {report.evidenceList.length} references
                </span>
              </div>
              <div className="space-y-3">
                {report.evidenceList.map((ev) => (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => jumpToEvidence(ev.timestampStart, ev.id)}
                    className={cn(
                      "neu-btn flex w-full cursor-pointer items-start justify-between gap-4 rounded-[20px] p-4 text-left transition-all",
                      selectedEvidenceId === ev.id ? "neu-inset text-[#5160e8]" : "neu-raised-xs"
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11.5px] font-bold text-[#5160e8]">
                          {ev.formattedRange}
                        </span>
                        <span className="rounded-md bg-black/5 px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#6b7791]">
                          {ev.category}
                        </span>
                      </div>
                      <div className="mt-1 text-[14px] font-bold text-[#1c2434]">{ev.label}</div>
                      <div className="mt-0.5 text-[12.5px] text-[#4a566d]">{ev.description}</div>
                    </div>
                    <Pill tone="mint">Score {Math.round(ev.confidenceScore * 100)}%</Pill>
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Direct Handoff Callout */}
          <Card className="flex flex-wrap items-center justify-between gap-4 p-5 bg-gradient-to-r from-[#f6f8fc] to-[#eef2f9]">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[14.5px] font-bold text-[#1c2434]">
                <IconScissors size={17} className="text-[#5160e8]" />
                Ready to review the candidate edit?
              </div>
              <p className="mt-0.5 text-[13px] text-[#6b7791]">
                Convert these evidence observations into a 45s CapCut candidate cut.
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              iconRight={<IconArrowRight size={16} />}
              onClick={() => {
                setMode("destill");
                go("result");
              }}
            >
              {t("ctaDestill")}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
