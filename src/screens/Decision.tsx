import { useState } from "react";
import { useApp, type DecisionOption } from "../lib/store";
import { ScreenHead } from "../components/ScreenHead";
import { Scene, type SceneKind } from "../components/Scene";
import { Button, Card, OptionTile, Pill, Segmented } from "../components/ui";
import {
  IconArrowLeft,
  IconExpand,
  IconMinus,
  IconRefresh,
  IconScissors,
  IconSpark,
  IconTarget,
} from "../lib/icons";
import { fmtTime } from "../utils/formatters";
import type { DictKey } from "../lib/i18n";
import { cn } from "../utils/cn";

interface DecisionCardOption {
  id: DecisionOption;
  icon: typeof IconTarget;
  labelKey: DictKey;
  descKey: DictKey;
}

const OPTIONS: DecisionCardOption[] = [
  { id: "tighter", icon: IconMinus, labelKey: "optTighter", descKey: "optTighterDesc" },
  { id: "longer", icon: IconExpand, labelKey: "optLonger", descKey: "optLongerDesc" },
  { id: "focus", icon: IconTarget, labelKey: "optFocus", descKey: "optFocusDesc" },
  { id: "retry", icon: IconRefresh, labelKey: "optRetry", descKey: "optRetryDesc" },
];

export function Decision() {
  const {
    t,
    targetDuration,
    decisionChoice,
    setDecisionChoice,
    applyDecision,
    go,
  } = useApp();

  const [localSelection, setLocalSelection] = useState<DecisionOption>(decisionChoice);
  const [momentView, setMomentView] = useState<"all" | "A" | "B">("all");

  const calculatedDuration =
    localSelection === "longer"
      ? 39
      : localSelection === "tighter"
      ? 18
      : localSelection === "focus"
      ? 24
      : 28;

  const handleConfirm = () => {
    applyDecision(localSelection);
  };

  const moments: { tag: "A" | "B"; kind: SceneKind; label: string; time: string; quote: string }[] = [
    {
      tag: "A",
      kind: "dawn",
      label: t("momentA"),
      time: "00:18",
      quote: "Spontaneous dawn realization — hooks viewer within 2 seconds.",
    },
    {
      tag: "B",
      kind: "market",
      label: t("momentB"),
      time: "01:42",
      quote: "Market energy & climax — provides emotional payoff.",
    },
  ];

  const visibleMoments =
    momentView === "all"
      ? moments
      : moments.filter((m) => m.tag === momentView);

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 pb-24 pt-1 lg:px-6">
      <ScreenHead
        kicker="S5 — NEEDS_EDITOR_DECISION"
        tone="amber"
        icon={<IconScissors size={13} />}
        title={t("decTitle")}
        sub={t("decSub")}
        right={
          <Button
            variant="ghost"
            size="md"
            icon={<IconArrowLeft size={14} />}
            onClick={() => go("result")}
          >
            {t("decBackBtn")}
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-7 items-start">
        {/* Left: Competing Candidate Moments with Segmented View Control */}
        <Card className="flex flex-col gap-4 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#c6ccd8]/50 pb-3">
            <div>
              <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#606d81]">
                Candidate Moments
              </span>
              <p className="text-[12px] text-[#4d5566]">
                Conflicting editorial evidence at target duration
              </p>
            </div>

            {/* Segmented Control: Moment Filter (sculpt-seg-track & sculpt-seg-thumb) */}
            <div className="w-full sm:w-auto">
              <Segmented<"all" | "A" | "B">
                value={momentView}
                onChange={setMomentView}
                className="w-full sm:w-[220px]"
                options={[
                  { value: "all", label: "Split View" },
                  { value: "A", label: "Moment A" },
                  { value: "B", label: "Moment B" },
                ]}
              />
            </div>
          </div>

          <div
            className={cn(
              "grid gap-3.5 transition-all duration-200",
              momentView === "all" ? "grid-cols-2" : "grid-cols-1"
            )}
          >
            {visibleMoments.map((m) => (
              <figure key={m.tag} className="flex flex-col gap-2">
                <div className="sculpt-well p-1.5 rounded-[20px]">
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-[16px] transition-all duration-200",
                      momentView === "all" ? "aspect-[4/5]" : "aspect-[16/9]"
                    )}
                  >
                    <Scene kind={m.kind} aspect={momentView === "all" ? "9/16" : "16/9"} />
                    <span className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-white/92 px-2.5 py-0.5 text-[11px] font-bold text-[#151922] shadow-sm backdrop-blur-md">
                      <span>{m.tag}</span>
                      <span className="text-[#606d81] font-mono">@{m.time}</span>
                    </span>
                  </div>
                </div>
                <figcaption className="px-1 text-left">
                  <div className="text-[12.5px] font-bold text-[#151922]">{m.label}</div>
                  <p className="text-[11.5px] leading-relaxed text-[#606d81]">{m.quote}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="sculpt-well-sm p-3.5 text-left text-[12px] leading-relaxed text-[#606d81]">
            <strong className="text-[#151922]">Editorial Rationale: </strong>
            Selecting an option refines pacing without destroying narrative coherence. Destill recalculates transitions automatically.
          </div>
        </Card>

        {/* Right: Decision Strategy with Segmented Control & Option Tiles */}
        <div className="flex flex-col gap-4">
          <Card className="flex flex-col gap-4 p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-[#c6ccd8]/50 pb-3">
              <div>
                <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#606d81]">
                  Pacing & Cut Strategy
                </span>
                <p className="text-[12px] text-[#4d5566]">
                  Select editorial direction for short composition
                </p>
              </div>
              <Pill tone="mint" dot>
                {localSelection === "tighter" ? "Suggested (-15s)" : "Custom Tuning"}
              </Pill>
            </div>

            {/* Primary Segmented Control (sculpt-seg-track & sculpt-seg-thumb) */}
            <Segmented<DecisionOption>
              value={localSelection}
              onChange={setLocalSelection}
              className="w-full"
              options={[
                { value: "tighter", label: "Tighter (-15s)", icon: <IconMinus size={13} /> },
                { value: "longer", label: "Expand (+15s)", icon: <IconExpand size={13} /> },
                { value: "focus", label: "Focus Climax", icon: <IconTarget size={13} /> },
                { value: "retry", label: "Re-synthesize", icon: <IconRefresh size={13} /> },
              ]}
            />

            {/* Synchronized Option Cards */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {OPTIONS.map((o) => {
                const Icon = o.icon;
                const isSelected = localSelection === o.id;

                return (
                  <OptionTile
                    key={o.id}
                    icon={<Icon size={18} />}
                    label={t(o.labelKey)}
                    desc={t(o.descKey)}
                    selected={isSelected}
                    badge={o.id === "tighter" ? "Suggested" : undefined}
                    onClick={() => setLocalSelection(o.id)}
                  />
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Confirmation & Target Tuning Step */}
      <Card className="mt-7 flex flex-col items-center gap-4 p-6 sm:p-7 text-center">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#606d81]">
            Target Duration Delta
          </span>
          <div className="flex items-center gap-2 text-[14px] font-semibold text-[#151922]">
            <span>
              {t("decNewDurationHint", { len: fmtTime(calculatedDuration) })}
            </span>
            <Pill tone="mint">
              {localSelection === "longer" ? "+15s" : localSelection === "tighter" ? "-15s" : "0s"}
            </Pill>
          </div>
        </div>

        {/* Secondary Duration Segmented Control (sculpt-seg-track & sculpt-seg-thumb) */}
        <div className="w-full max-w-[480px]">
          <Segmented<"tighter" | "focus" | "longer">
            value={localSelection === "longer" ? "longer" : localSelection === "tighter" ? "tighter" : "focus"}
            onChange={(val) => setLocalSelection(val)}
            options={[
              { value: "tighter", label: "Tighter (-15s)", icon: <IconMinus size={13} /> },
              { value: "focus", label: `Hold (${targetDuration}s)`, icon: <IconTarget size={13} /> },
              { value: "longer", label: "Expand (+15s)", icon: <IconExpand size={13} /> },
            ]}
          />
        </div>

        <div className="mt-2 flex flex-col items-center gap-2">
          <Button
            variant="primary"
            size="xl"
            icon={<IconScissors size={18} />}
            onClick={handleConfirm}
          >
            {t("decConfirmBtn")}
          </Button>

          <button
            type="button"
            onClick={() => go("result")}
            className="text-[12px] font-semibold text-[#606d81] hover:text-[#151922]"
          >
            {t("decBackBtn")}
          </button>
        </div>
      </Card>
    </div>
  );
}
