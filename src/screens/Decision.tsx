import { useState } from "react";
import { useApp, type DecisionOption } from "../lib/store";
import { ScreenHead } from "../components/ScreenHead";
import { Scene, type SceneKind } from "../components/Scene";
import { Button, Card, OptionTile, Pill } from "../components/ui";
import {
  IconArrowLeft,
  IconExpand,
  IconMinus,
  IconRefresh,
  IconScissors,
  IconTarget,
} from "../lib/icons";
import { fmtTime } from "../utils/formatters";
import type { DictKey } from "../lib/i18n";

interface DecisionCardOption {
  id: DecisionOption;
  icon: typeof IconTarget;
  labelKey: DictKey;
  descKey: DictKey;
}

const OPTIONS: DecisionCardOption[] = [
  { id: "longer", icon: IconExpand, labelKey: "optLonger", descKey: "optLongerDesc" },
  { id: "tighter", icon: IconMinus, labelKey: "optTighter", descKey: "optTighterDesc" },
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

  const calculatedDuration =
    localSelection === "longer"
      ? Math.min(120, targetDuration + 15)
      : localSelection === "tighter"
      ? Math.max(30, targetDuration - 15)
      : targetDuration;

  const handleConfirm = () => {
    setDecisionChoice(localSelection);
    applyDecision();
  };

  const moments: { tag: string; kind: SceneKind; label: string }[] = [
    { tag: "A", kind: "dawn", label: t("momentA") },
    { tag: "B", kind: "market", label: t("momentB") },
  ];

  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 pb-24 pt-1 lg:px-6">
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

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-7 items-start">
        {/* Left: Competing Candidate Moments */}
        <Card className="flex flex-col gap-3.5 p-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#606d81] text-center">
            Competing Candidate Moments
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            {moments.map((m) => (
              <figure key={m.tag} className="flex flex-col gap-1.5">
                <div className="sculpt-well p-1.5 rounded-[18px]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[14px]">
                    <Scene kind={m.kind} aspect="9/16" />
                    <span className="absolute left-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-white/90 text-[11px] font-bold text-[#151922] backdrop-blur-md">
                      {m.tag}
                    </span>
                  </div>
                </div>
                <figcaption className="text-center text-[12px] font-semibold text-[#4d5566]">
                  {m.label}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="sculpt-well-sm p-3 text-center text-[12px] leading-relaxed text-[#606d81]">
            Selecting an option refines duration rather than blindly chopping important context.
          </div>
        </Card>

        {/* Right: Decision Options Selection */}
        <div className="grid grid-cols-2 gap-3.5">
          {OPTIONS.map((o) => {
            const Icon = o.icon;
            const isSelected = localSelection === o.id;

            return (
              <OptionTile
                key={o.id}
                icon={<Icon size={20} />}
                label={t(o.labelKey)}
                desc={t(o.descKey)}
                selected={isSelected}
                badge={o.id === "tighter" ? "Suggested" : undefined}
                onClick={() => setLocalSelection(o.id)}
              />
            );
          })}
        </div>
      </div>

      {/* Confirmation Step (Deliberate 2-step flow) */}
      <div className="mt-8 flex flex-col items-center gap-2.5 text-center">
        <div className="flex items-center gap-2 text-[13.5px] font-medium text-[#4d5566]">
          <span>
            {t("decNewDurationHint", { len: fmtTime(calculatedDuration) })}
          </span>
          <Pill tone="mint">
            {localSelection === "longer" ? "+15s" : localSelection === "tighter" ? "-15s" : "0s"}
          </Pill>
        </div>

        <div className="mt-1">
          <Button
            variant="primary"
            size="xl"
            icon={<IconScissors size={18} />}
            onClick={handleConfirm}
          >
            {t("decConfirmBtn")}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => go("result")}
          className="mt-1 text-[12px] font-semibold text-[#606d81] hover:text-[#151922]"
        >
          {t("decBackBtn")}
        </button>
      </div>
    </div>
  );
}
