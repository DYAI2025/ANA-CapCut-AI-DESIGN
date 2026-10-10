import { useApp } from "../lib/store";
import { IconCheck, IconClose, IconLock, IconWave } from "../lib/icons";
import { Button, Card, Pill, ProgressRing } from "../components/ui";
import { cn } from "../utils/cn";
import type { DictKey } from "../lib/i18n";
import { fmtTime } from "../utils/formatters";

interface StageItem {
  id: string;
  labelKey: DictKey;
  captionKey: DictKey;
  pct: number;
}

const STAGES: StageItem[] = [
  { id: "prepare", labelKey: "procStagePrepare", captionKey: "procCaptionPrepare", pct: 18 },
  { id: "listen", labelKey: "procStageListen", captionKey: "procCaptionListen", pct: 44 },
  { id: "observe", labelKey: "procStageObserve", captionKey: "procCaptionObserve", pct: 68 },
  { id: "interpret", labelKey: "procStageInterpret", captionKey: "procCaptionInterpret", pct: 88 },
  { id: "review", labelKey: "procStageReview", captionKey: "procCaptionReview", pct: 100 },
];

export function Processing() {
  const { t, source, targetDuration, platform, mode, procStage, procProgress, cancelRun } = useApp();

  const activeIdx = Math.max(
    0,
    STAGES.findIndex((s) => s.id.toLowerCase() === procStage.toLowerCase())
  );

  return (
    <div className="mx-auto flex min-h-[calc(100vh-210px)] w-full max-w-[800px] items-center px-4 py-6">
      <Card className="relative w-full overflow-hidden px-5 py-9 text-center sm:px-12 sm:py-12">
        {/* Source Chip & Demo Mode Tag */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2.5">
          <Pill tone="accent" dot>
            {t("engineDemoBadge")}
          </Pill>
          <span className="neu-inset-sm inline-flex h-7.5 items-center gap-2 rounded-full px-3 text-[12px] font-semibold text-[#1c2434]">
            <span className="truncate max-w-[180px]">{source?.name ?? "Source Video"}</span>
          </span>
          <Pill tone="neutral">
            {fmtTime(targetDuration)} • {platform.toUpperCase()}
          </Pill>
        </div>

        {/* Tactile Progress Orb */}
        <div className="relative mx-auto grid place-items-center">
          <ProgressRing progress={procProgress} size={220}>
            <div className="flex flex-col items-center">
              <span className="text-[44px] font-bold leading-none tabular-nums tracking-tight text-[#1c2434]">
                {Math.floor(procProgress)}
                <span className="text-[20px] font-semibold text-[#6b7791]">%</span>
              </span>
              <span className="mt-2.5 flex items-center gap-1.5 text-[12.5px] font-semibold text-[#5160e8]">
                <IconWave size={14} className="animate-pulse" />
                {t(STAGES[activeIdx].labelKey)}
              </span>
            </div>
          </ProgressRing>
        </div>

        {/* Title & Stage Caption */}
        <h1 className="mt-7 text-[28px] font-bold tracking-tight text-[#1c2434]">
          {mode === "analyze" ? t("procTitle") : t("procTitleDestill")}
        </h1>
        <p className="mx-auto mt-2 h-7 max-w-[500px] text-[15px] text-[#4a566d]">
          {t(STAGES[activeIdx].captionKey)}
        </p>

        {/* Stage Steps Grid */}
        <ol className="neu-inset mt-8 grid grid-cols-5 gap-1 rounded-[26px] p-2">
          {STAGES.map((s, idx) => {
            const isDone = procProgress >= s.pct;
            const isActive = !isDone && idx === activeIdx;

            return (
              <li
                key={s.id}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-[20px] py-3.5 transition-all duration-300",
                  isActive ? "neu-raised-sm text-[#1c2434]" : isDone ? "text-[#1c2434]" : "text-[#6b7791]/60"
                )}
              >
                <span
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold transition-all duration-300",
                    isDone
                      ? "bg-[#1a886e]/15 text-[#1a886e]"
                      : isActive
                      ? "bg-[#5160e8]/15 text-[#5160e8]"
                      : "neu-inset-sm text-[#6b7791]"
                  )}
                >
                  {isDone ? <IconCheck size={14} /> : idx + 1}
                </span>
                <span className="text-[11px] font-semibold truncate max-w-full px-1">
                  {t(s.labelKey)}
                </span>
              </li>
            );
          })}
        </ol>

        {/* Safe Cancellation Button */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            icon={<IconClose size={15} />}
            onClick={cancelRun}
          >
            {t("cancelBtn")}
          </Button>

          <p className="flex items-center gap-1.5 text-[12px] font-medium text-[#6b7791]">
            <IconLock size={13} />
            {t("procLocalNote")}
          </p>
        </div>
      </Card>
    </div>
  );
}
