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
  IconWave,
} from "../lib/icons";
import { SYNTHETIC_UNDERSTANDING_REPORT } from "../services/engineAdapter";
import { fmtTime } from "../utils/formatters";
import { cn } from "../utils/cn";

type TabId = "story" | "delivery" | "visuals" | "evidence";

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
    loadSample,
  } = useApp();

  const report = understandingReport ?? SYNTHETIC_UNDERSTANDING_REPORT;
  const [activeTab, setActiveTab] = useState<TabId>("story");
  const [currentVideoTime, setCurrentVideoTime] = useState(18);

  const markers: EvidenceMarker[] = report.evidenceList.map((e) => ({
    id: e.id,
    timestamp: e.timestampStart,
    label: e.label,
    category: e.category,
  }));

  const jumpToEvidence = (timeSec: number, evidenceId?: string) => {
    setCurrentVideoTime(timeSec);
    if (evidenceId) setSelectedEvidenceId(evidenceId);
    showToast(`Jumped timeline to ${fmtTime(timeSec)}`);
  };

  const selectedEvidence = report.evidenceList.find((e) => e.id === selectedEvidenceId);

  return (
    <div className="mx-auto w-full max-w-[1380px] px-4 pb-24 pt-1 lg:px-6">
      {/* Screen Head */}
      <ScreenHead
        kicker="S4 — Evidence-Based Understanding"
        tone="accent"
        icon={<IconWave size={13} />}
        title={t("underTitle")}
        sub={t("underSub")}
        right={
          <div className="flex items-center gap-2">
            <Pill tone="mint" dot>
              {source?.isSyntheticSample ? t("engineDemoBadge") : "Sandbox Simulation"}
            </Pill>
            <Button
              variant="primary"
              size="md"
              iconRight={<IconArrowRight size={14} />}
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

      {/* Synthetic Demo Banner Notice with Epistemic Status (Evidence vs Hypothesis vs Unknown) */}
      <div className="sculpt-well-sm mb-5 flex flex-wrap items-center justify-between gap-3 p-3.5 text-[12px] text-[#4d5566]">
        <div className="flex items-center gap-2">
          <IconInfo size={15} className="text-[#3559cb] shrink-0" />
          <strong className="text-[#151922]">
            {source?.isSyntheticSample ? "VERIFIED SYNTHETIC REFERENCE SCENARIO: " : "CLIENT-ONLY DESIGN SANDBOX: "}
          </strong>
          <span>
            {source?.isSyntheticSample
              ? "Lisbon raw footage (18:36). Local neural model execution pending for custom user media."
              : `Demonstrating pipeline flow with synthetic analysis baseline for "${source?.name ?? "custom media"}". Local neural inference engine pending in web sandbox.`}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          {source?.isSyntheticSample ? (
            <>
              <span className="sculpt-pill px-2.5 py-0.5 text-[#0e6f64] font-semibold">Model Hypothesis (94%)</span>
              <span className="sculpt-pill px-2.5 py-0.5 text-[#7d4508] font-semibold">Unknowns Disclosed</span>
            </>
          ) : (
            <Button size="sm" variant="secondary" icon={<IconSpark size={12} />} onClick={loadSample}>
              Load Curated Lisbon Sample
            </Button>
          )}
        </div>
      </div>

      {/* 2-Column Responsive Workspace */}
      <div className="grid gap-6 lg:grid-cols-[380px_1fr] xl:grid-cols-[410px_1fr] lg:gap-7 items-start">
        {/* Left Column: Inset Media Preview & Evidence Scrubber */}
        <div className="flex flex-col gap-4.5 lg:sticky lg:top-20">
          <Card className="flex flex-col items-center gap-4 p-5">
            <div className="w-full max-w-[300px]">
              <VideoPreview
                asset={source}
                sceneKind="dawn"
                ratio="9/16"
                markers={markers}
                currentTimeOverride={currentVideoTime}
                onTimeChange={(t) => setCurrentVideoTime(Math.round(t))}
                badge={
                  <Pill tone="neutral" icon={<IconClock size={11} />}>
                    {fmtTime(currentVideoTime)} / {fmtTime(report.sourceDurationSeconds)}
                  </Pill>
                }
              />
            </div>

            {/* Selected Evidence Detail Box */}
            {selectedEvidence ? (
              <div className="sculpt-well w-full p-4 text-left">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#606d81] uppercase tracking-wider">
                  <span>{t("evidenceSelected")}</span>
                  <span className="text-[#3559cb] font-mono tabular-nums">{selectedEvidence.formattedRange}</span>
                </div>
                <div className="mt-1.5 text-[14px] font-bold text-[#151922] tracking-tight">
                  {selectedEvidence.label}
                </div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[#4d5566]">
                  {selectedEvidence.description}
                </p>
                <div className="mt-2.5 flex items-center justify-between border-t border-[#c6ccd8]/50 pt-2.5">
                  <span className="text-[11.5px] text-[#606d81] font-medium">
                    Confidence: {Math.round(selectedEvidence.confidenceScore * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => jumpToEvidence(selectedEvidence.timestampStart, selectedEvidence.id)}
                    className="text-[12px] font-bold text-[#3559cb] hover:underline"
                  >
                    Play at {fmtTime(selectedEvidence.timestampStart)}
                  </button>
                </div>
              </div>
            ) : (
              <div className="sculpt-well-sm w-full p-3 text-center text-[12px] text-[#606d81]">
                Click yellow markers on the timeline to inspect evidence moments.
              </div>
            )}
          </Card>

          {/* Source Context Summary */}
          <Card className="p-4.5 text-[12.5px] text-[#4d5566]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#606d81] mb-1.5">
              Source Asset Details
            </div>
            <div className="truncate font-semibold text-[#151922]">
              {source?.name ?? "Lisbon_trip_raw_0412.mov"}
            </div>
            <div className="mt-2 flex items-center justify-between text-[11.5px] text-[#606d81] font-mono tabular-nums">
              <span>Probed: 18m 36s</span>
              <span>4 Narrative Beats</span>
            </div>
          </Card>
        </div>

        {/* Right Column: Deep Understanding Facets */}
        <div className="flex flex-col gap-5">
          {/* Facet Segmented Selector (4 Curated Categories) */}
          <Segmented
            value={activeTab}
            onChange={setActiveTab}
            options={[
              { value: "story", label: "Story Arc & Claims", icon: <IconSpark size={13} /> },
              { value: "delivery", label: "Vocal Prosody & Pacing", icon: <IconMic size={13} /> },
              { value: "visuals", label: "Visual Framing", icon: <IconEye size={13} /> },
              { value: "evidence", label: "Evidence Catalog", icon: <IconCheck size={13} /> },
            ]}
          />

          {/* TAB 1: STORY ARC & CLAIMS */}
          {activeTab === "story" && (
            <div className="flex flex-col gap-5">
              {/* Flagship One-Sentence Core Summary */}
              <Card className="flex flex-col gap-4.5 p-6 sm:p-7">
                <div className="sculpt-well p-4.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#3559cb]">
                      {t("underPrimaryThesis")}
                    </span>
                    <Pill tone="mint">94% Confidence</Pill>
                  </div>
                  <div className="mt-2 text-[18px] font-bold leading-snug tracking-tight text-[#151922]">
                    "{report.message.primaryThesis}"
                  </div>
                </div>

                {/* Narrative Arc Progression (4 Story Beats) */}
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#606d81] mb-3">
                    Narrative Arc Progression
                  </div>
                  <div className="space-y-3">
                    {report.storyBeats.map((beat) => (
                      <div
                        key={beat.id}
                        onClick={() => jumpToEvidence(beat.timestampStart)}
                        className="sculpt-btn-raised flex cursor-pointer flex-col gap-1.5 p-4 text-left"
                      >
                        <div className="flex items-center justify-between">
                          <span className="rounded-md bg-[#3559cb]/10 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-[#3559cb]">
                            {beat.phase}
                          </span>
                          <span className="font-mono text-[11.5px] font-bold text-[#151922] tabular-nums">
                            {beat.formattedTime} ({fmtTime(beat.timestampEnd - beat.timestampStart)})
                          </span>
                        </div>
                        <div className="text-[14.5px] font-bold text-[#151922] tracking-tight">
                          {beat.summary}
                        </div>
                        <div className="text-[12px] text-[#606d81]">
                          Significance: {beat.significance}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Claims with KEEP / CHANGE / DROP */}
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#606d81] mb-3">
                    Transcript Claims & Retention Recommendations
                  </div>
                  <div className="space-y-2.5">
                    {report.claims.map((claim) => (
                      <div
                        key={claim.id}
                        onClick={() => jumpToEvidence(claim.timestamp)}
                        className="sculpt-btn-raised flex cursor-pointer items-start justify-between gap-3 p-3.5 text-left"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-bold text-[#3559cb] tabular-nums">
                              {claim.formattedTime}
                            </span>
                            {claim.isKeyStatement && (
                              <span className="rounded-sm bg-[#0e6f64]/15 px-1.5 py-0.5 text-[9.5px] font-bold text-[#0e6f64]">
                                CORE INSIGHT
                              </span>
                            )}
                            {claim.isRepetition && (
                              <span className="rounded-sm bg-[#7d4508]/15 px-1.5 py-0.5 text-[9.5px] font-bold text-[#7d4508]">
                                REPETITION
                              </span>
                            )}
                          </div>
                          <div className="mt-1 text-[13.5px] font-medium text-[#151922] leading-snug">
                            "{claim.text}"
                          </div>
                        </div>
                        <span
                          className={cn(
                            "sculpt-pill px-2.5 py-0.5 text-[10.5px] font-bold shrink-0",
                            claim.retentionRecommendation === "KEEP"
                              ? "text-[#0e6f64]"
                              : "text-[#606d81]"
                          )}
                        >
                          {claim.retentionRecommendation}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 2: DELIVERY & PROSODY */}
          {activeTab === "delivery" && (
            <Card className="flex flex-col gap-4 p-6 sm:p-7">
              <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#606d81]">
                Vocal Cadence, Inflections & Pauses
              </div>
              <div className="space-y-3">
                {report.prosody.map((pro) => (
                  <div
                    key={pro.id}
                    onClick={() => jumpToEvidence(pro.timestamp)}
                    className="sculpt-btn-raised flex cursor-pointer items-start justify-between gap-3 p-3.5 text-left"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-[10px] bg-[#3559cb]/10 text-[#3559cb] shrink-0">
                        <IconWave size={14} />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-[#3559cb] tabular-nums">
                            {pro.formattedTime}
                          </span>
                          <span className="text-[11.5px] font-bold uppercase text-[#151922]">
                            {pro.metric.replace("_", " ")}
                          </span>
                        </div>
                        <div className="mt-0.5 text-[13px] text-[#151922]">
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

          {/* TAB 3: VISUALS */}
          {activeTab === "visuals" && (
            <Card className="flex flex-col gap-4 p-6 sm:p-7">
              <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#606d81]">
                Framing & Scene Visual Anchors
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {report.visuals.map((vis) => (
                  <div
                    key={vis.id}
                    onClick={() => jumpToEvidence(vis.timestamp)}
                    className="sculpt-btn-raised flex cursor-pointer flex-col gap-1.5 p-3.5 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-[#3559cb] tabular-nums">
                        {vis.formattedTime}
                      </span>
                      <span className="text-[10.5px] font-bold text-[#0e6f64]">
                        Hook: {vis.visualHookRating}/5
                      </span>
                    </div>
                    <div className="text-[13.5px] font-bold text-[#151922]">
                      {vis.description}
                    </div>
                    <div className="text-[11.5px] text-[#606d81]">
                      {vis.overlayObservations}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 4: EVIDENCE CATALOG */}
          {activeTab === "evidence" && (
            <Card className="flex flex-col gap-4 p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#606d81]">
                  Grounding Evidence Catalog
                </span>
                <span className="font-mono text-[11px] text-[#606d81] tabular-nums">
                  {report.evidenceList.length} references
                </span>
              </div>
              <div className="space-y-2.5">
                {report.evidenceList.map((ev) => (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => jumpToEvidence(ev.timestampStart, ev.id)}
                    className={cn(
                      "flex w-full cursor-pointer items-start justify-between gap-3 p-3.5 text-left transition-all",
                      selectedEvidenceId === ev.id
                        ? "sculpt-well border border-[#3559cb]/30"
                        : "sculpt-btn-raised"
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-[#3559cb] tabular-nums">
                          {ev.formattedRange}
                        </span>
                        <span className="sculpt-pill px-1.5 py-0.5 text-[9.5px] font-bold uppercase text-[#606d81]">
                          {ev.category}
                        </span>
                      </div>
                      <div className="mt-1 text-[13.5px] font-bold text-[#151922]">{ev.label}</div>
                      <div className="mt-0.5 text-[12px] text-[#4d5566]">{ev.description}</div>
                    </div>
                    <Pill tone="mint">Score {Math.round(ev.confidenceScore * 100)}%</Pill>
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Bridge Handoff Banner */}
          <Card className="flex flex-wrap items-center justify-between gap-3.5 p-5 bg-gradient-to-r from-[#fbfcfd] to-[#edf1f8]">
            <div>
              <div className="flex items-center gap-2 text-[14.5px] font-bold text-[#151922]">
                <IconScissors size={16} className="text-[#3559cb]" />
                Proceed to Future Candidate Cut?
              </div>
              <p className="mt-0.5 text-[12px] text-[#606d81]">
                Converts these evidence observations into a 90s CapCut EditPilot assembly plan.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              iconRight={<IconArrowRight size={14} />}
              onClick={() => {
                setMode("destill");
                go("result");
              }}
            >
              {t("previewEditPlanBtn")}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
