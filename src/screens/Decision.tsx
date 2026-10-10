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

  // Compute calculated duration change preview
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
    <div className="mx-auto w-full max-w-[1080px] px-4 pb-24 pt-2 lg:px-6">
      <ScreenHead
        kicker={t("decKicker")}
        tone="amber"
        icon={<IconScissors size={13} />}
        title={t("decTitle")}
        sub={t("decSub")}
        right={
          <Button
            variant="ghost"
            size="md"
            icon={<IconArrowLeft size={15} />}
            onClick={() => go("result")}
          >
            {t("decBackBtn")}
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 items-start">
        {/* Left: Competing Candidate Moments */}
        <Card className="flex flex-col gap-4 p-5 sm:p-6">
          <div className="text-[12px] font-bold uppercase tracking-wider text-[#6b7791] text-center">
            Competing Candidate Moments
          </div>
          <div className="grid grid-cols-2 gap-4">
            {moments.map((m) => (
              <figure key={m.tag} className="flex flex-col gap-2">
                <div className="neu-inset rounded-[24px] p-2">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] shadow-[0_6px_16px_rgba(30,40,70,0.2)]">
                    <Scene kind={m.kind} aspect="9/16" />
                    <span className="absolute left-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full bg-white/85 text-[12px] font-bold text-[#1c2434] backdrop-blur-md">
                      {m.tag}
                    </span>
                  </div>
                </div>
                <figcaption className="text-center text-[13px] font-semibold text-[#4a566d]">
                  {m.label}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="rounded-[16px] bg-black/5 p-3 text-center text-[12px] text-[#6b7791]">
            Both takes support the story goal. Choosing an option below dictates narrative emphasis.
          </div>
        </Card>

        {/* Right: Decision Options Selection */}
        <div className="grid grid-cols-2 gap-4">
          {OPTIONS.map((o) => {
            const Icon = o.icon;
            const isSelected = localSelection === o.id;

            return (
              <OptionTile
                key={o.id}
                icon={<Icon size={22} />}
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
      <div className="mt-9 flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-2 text-[14.5px] font-medium text-[#4a566d]">
          <span>
            {t("decNewDurationHint", { len: fmtTime(calculatedDuration) })}
          </span>
          <Pill tone="mint">
            {localSelection === "longer" ? "+15s" : localSelection === "tighter" ? "-15s" : "0s"}
          </Pill>
        </div>

        <div className="mt-2">
          <Button
            variant="primary"
            size="xl"
            icon={<IconScissors size={20} />}
            onClick={handleConfirm}
          >
            {t("decConfirmBtn")}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => go("result")}
          className="mt-2 text-[13px] font-semibold text-[#6b7791] hover:text-[#1c2434]"
        >
          {t("decBackBtn")}
        </button>
      </div>
    </div>
  );
}
