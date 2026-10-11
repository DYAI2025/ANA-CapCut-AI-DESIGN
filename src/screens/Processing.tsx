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
    <div className="mx-auto flex min-h-[calc(100vh-210px)] w-full max-w-[760px] items-center px-4 py-4">
      <Card className="relative w-full overflow-hidden px-5 py-8 text-center sm:px-10 sm:py-10">
        {/* State Tag & Source File Context */}
        <div className="mb-7 flex flex-wrap items-center justify-center gap-2">
          <Pill tone="accent" dot>
            {t("engineDemoBadge")}
          </Pill>
          <span className="sculpt-well-sm inline-flex h-7 items-center gap-2 px-3 text-[11.5px] font-semibold text-[#151922]">
            <span className="truncate max-w-[170px]">{source?.name ?? "Source Video"}</span>
          </span>
          <Pill tone="neutral">
            {fmtTime(targetDuration)} • {platform.toUpperCase()}
          </Pill>
        </div>

        {/* Sculpted Progress Ring */}
        <div className="relative mx-auto grid place-items-center">
          <ProgressRing progress={procProgress} size={200}>
            <div className="flex flex-col items-center">
              <span className="text-[40px] font-bold leading-none tabular-nums font-mono tracking-tight text-[#151922]">
                {Math.floor(procProgress)}
                <span className="text-[18px] font-semibold text-[#788296]">%</span>
              </span>
              <span className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-[#3559cb]">
                <IconWave size={13} className="animate-pulse" />
                {t(STAGES[activeIdx].labelKey)}
              </span>
            </div>
          </ProgressRing>
        </div>

        {/* Status Text */}
        <h1 className="mt-6 text-[25px] font-bold tracking-tight text-[#151922]">
          {mode === "analyze" ? t("procTitle") : t("procTitleDestill")}
        </h1>
        <p className="mx-auto mt-1.5 h-6 max-w-[480px] text-[14px] text-[#4d5566]">
          {t(STAGES[activeIdx].captionKey)}
        </p>

        {/* 5-Stage Step Visualizer */}
        <ol className="sculpt-well mt-7 grid grid-cols-5 gap-1 p-1.5">
          {STAGES.map((s, idx) => {
            const isDone = procProgress >= s.pct;
            const isActive = !isDone && idx === activeIdx;

            return (
              <li
                key={s.id}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-[14px] py-2.5 transition-all duration-200",
                  isActive ? "sculpt-btn-raised text-[#151922]" : isDone ? "text-[#151922]" : "text-[#788296]/50"
                )}
              >
                <span
                  className={cn(
                    "grid h-6 w-6 place-items-center rounded-full text-[10.5px] font-bold transition-all duration-200",
                    isDone
                      ? "bg-[#0e6f64]/15 text-[#0e6f64]"
                      : isActive
                      ? "bg-[#3559cb]/15 text-[#3559cb]"
                      : "sculpt-well-sm text-[#788296]"
                  )}
                >
                  {isDone ? <IconCheck size={12} /> : idx + 1}
                </span>
                <span className="text-[10.5px] font-semibold truncate max-w-full px-1">
                  {t(s.labelKey)}
                </span>
              </li>
            );
          })}
        </ol>

        {/* Cancel Button */}
        <div className="mt-7 flex flex-col items-center gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            icon={<IconClose size={13} />}
            onClick={cancelRun}
          >
            {t("cancelBtn")}
          </Button>

          <p className="flex items-center gap-1 text-[11.5px] font-medium text-[#788296]">
            <IconLock size={12} />
            {t("procLocalNote")}
          </p>
        </div>
      </Card>
    </div>
  );
}
