import { cn } from "../utils/cn";
import { useApp } from "../lib/store";
import { IconCheck } from "../lib/icons";

export function FlowTrail() {
  const { t, screen, go, source, mode } = useApp();

  let activeIndex = 0;
  if (screen === "home" || screen === "blocked") {
    activeIndex = source ? 1 : 0;
  } else if (screen === "processing") {
    activeIndex = 1;
  } else if (screen === "understanding") {
    activeIndex = 2;
  } else if (screen === "result" || screen === "decision") {
    activeIndex = 3;
  } else {
    return null;
  }

  const steps = [
    { id: "select", label: t("stepSelect"), screen: "home" as const },
    { id: "process", label: t("stepProcess"), screen: "processing" as const },
    {
      id: "understand",
      label: mode === "analyze" ? t("stepUnderstand") : t("stepReview"),
      screen: mode === "analyze" ? ("understanding" as const) : ("result" as const),
    },
    { id: "review", label: t("stepReview"), screen: "result" as const },
  ];

  return (
    <nav
      aria-label="Workflow progress"
      className="mx-auto my-2.5 flex w-fit items-center justify-center"
    >
      <ol className="sculpt-well-sm flex items-center gap-1 p-1 sm:p-1.5">
        {steps.map((s, idx) => {
          const isDone = idx < activeIndex;
          const isActive = idx === activeIndex;
          const isNavigable = idx <= activeIndex && (idx === 0 || !!source);

          return (
            <li key={s.id} className="flex items-center">
              <button
                type="button"
                disabled={!isNavigable}
                onClick={() => {
                  if (isNavigable) go(s.screen);
                }}
                className={cn(
                  "flex h-7 items-center gap-1.5 rounded-[10px] px-2.5 text-[12px] font-semibold transition-all duration-150",
                  isActive
                    ? "sculpt-btn-raised text-[#3559cb]"
                    : isDone
                    ? "text-[#151922] hover:text-[#3559cb]"
                    : "text-[#788296]/60 cursor-not-allowed"
                )}
              >
                {isDone ? (
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-[#0e6f64]/15 text-[#0e6f64]">
                    <IconCheck size={11} />
                  </span>
                ) : (
                  <span
                    className={cn(
                      "grid h-4 w-4 place-items-center rounded-full text-[10px] font-bold tabular-nums",
                      isActive ? "bg-[#3559cb]/15 text-[#3559cb]" : "bg-black/5 text-[#788296]"
                    )}
                  >
                    {idx + 1}
                  </span>
                )}
                <span>{s.label}</span>
              </button>
              {idx < steps.length - 1 && (
                <span className="mx-1 h-0.5 w-2.5 rounded-full bg-[#c6ccd8]" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
