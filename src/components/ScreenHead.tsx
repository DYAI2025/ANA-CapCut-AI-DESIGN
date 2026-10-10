import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import { Pill, type PillTone } from "./ui";

export function ScreenHead({
  kicker,
  tone = "neutral",
  icon,
  pulse,
  title,
  sub,
  right,
  className,
}: {
  kicker: string;
  tone?: PillTone;
  icon?: ReactNode;
  pulse?: boolean;
  title: string;
  sub?: string;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex flex-wrap items-end justify-between gap-4 lg:mb-8", className)}>
      <div className="max-w-[720px]">
        <Pill tone={tone} icon={icon} pulse={pulse}>
          {kicker}
        </Pill>
        <h1 className="mt-3.5 text-[28px] font-bold leading-[1.12] tracking-[-0.025em] text-[#1c2434] sm:text-[36px]">
          {title}
        </h1>
        {sub && (
          <p className="mt-2 text-[15px] leading-relaxed text-[#4a566d]">
            {sub}
          </p>
        )}
      </div>
      {right && <div className="flex flex-wrap items-center gap-2.5">{right}</div>}
    </div>
  );
}
