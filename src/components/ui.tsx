import {
  Children,
  Fragment,
  useEffect,
  useId,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";
import { useApp } from "../lib/store";

/* ------------------------------------------------------------------ Tooltip */
export function Tooltip({
  label,
  children,
  side = "top",
  className,
}: {
  label?: string;
  children: ReactNode;
  side?: "top" | "bottom" | "right";
  className?: string;
}) {
  const { hintsEnabled } = useApp();
  if (!hintsEnabled || !label) return <>{children}</>;

  return (
    <span className={cn("group/tip relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-[10px] bg-[#151922] px-2.5 py-1 text-[11.5px] font-medium tracking-tight text-white opacity-0 shadow-[0_6px_16px_rgba(21,25,34,0.32)] backdrop-blur transition-all duration-150",
          "group-hover/tip:opacity-100 group-hover/tip:delay-200 group-focus-within/tip:opacity-100",
          side === "top" && "left-1/2 -translate-x-1/2 bottom-full mb-2 translate-y-1 group-hover/tip:translate-y-0 group-focus-within/tip:translate-y-0",
          side === "bottom" && "left-1/2 -translate-x-1/2 top-full mt-2 -translate-y-1 group-hover/tip:translate-y-0 group-focus-within/tip:translate-y-0",
          side === "right" && "left-full ml-2 top-1/2 -translate-y-1/2 -translate-x-1 group-hover/tip:translate-x-0 group-focus-within/tip:translate-x-0"
        )}
      >
        {label}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ Button */
export type ButtonVariant = "primary" | "secondary" | "accent" | "utility" | "ghost" | "danger";
export type ButtonSize = "xl" | "lg" | "md" | "sm";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  tip?: string;
  tipSide?: "top" | "bottom" | "right";
  pressed?: boolean;
  children?: ReactNode;
}

const sizeCls: Record<ButtonSize, string> = {
  xl: "h-[58px] min-w-[210px] rounded-[18px] px-8 text-[16.5px]",
  lg: "h-12 rounded-[18px] px-6 text-[15px]",
  md: "h-10 rounded-[16px] px-4.5 text-[13.5px]",
  sm: "h-8.5 rounded-[12px] px-3 text-[12.5px]",
};

const iconOnlyCls: Record<ButtonSize, string> = {
  xl: "h-[58px] w-[58px] rounded-full",
  lg: "h-12 w-12 rounded-full",
  md: "h-10 w-10 rounded-full",
  sm: "h-8.5 w-8.5 rounded-full",
};

const variantCls: Record<ButtonVariant, string> = {
  primary: "sculpt-primary font-semibold tracking-tight",
  secondary: "sculpt-btn-raised font-semibold text-[#151922]",
  accent: "sculpt-accent-btn font-semibold text-white",
  utility: "sculpt-btn-raised font-medium text-[#4d5566] hover:text-[#151922]",
  ghost: "sculpt-flat font-medium text-[#4d5566] hover:text-[#151922]",
  danger: "sculpt-btn-raised font-semibold text-[#a8301f] hover:text-[#802215]",
};

export function Button({
  variant = "secondary",
  size = "md",
  icon,
  iconRight,
  tip,
  tipSide = "top",
  pressed,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  const iconOnly = !children;
  const btn = (
    <button
      type={type}
      aria-pressed={pressed}
      aria-label={iconOnly ? tip : undefined}
      className={cn(
        "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap",
        variantCls[variant],
        iconOnly ? iconOnlyCls[size] : sizeCls[size],
        pressed && "is-pressed",
        className
      )}
      {...rest}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );

  return tip ? (
    <Tooltip label={tip} side={tipSide}>
      {btn}
    </Tooltip>
  ) : (
    btn
  );
}

/* ------------------------------------------------------------------ Card */
export function Card({
  className,
  children,
  hover,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "sculpt-card p-6 sm:p-7",
        hover && "sculpt-card-hover cursor-pointer",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ Pill */
export type PillTone = "neutral" | "accent" | "mint" | "amber" | "rose";

const toneCls: Record<PillTone, string> = {
  neutral: "text-[#4d5566]",
  accent: "text-[#3559cb]",
  mint: "text-[#0e6f64]",
  amber: "text-[#7d4508]",
  rose: "text-[#a8301f]",
};

const dotBg: Record<PillTone, string> = {
  neutral: "bg-[#606d81]",
  accent: "bg-[#3559cb]",
  mint: "bg-[#0e6f64]",
  amber: "bg-[#7d4508]",
  rose: "bg-[#a8301f]",
};

export function Pill({
  tone = "neutral",
  dot,
  pulse,
  icon,
  children,
  className,
}: {
  tone?: PillTone;
  dot?: boolean;
  pulse?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "sculpt-pill inline-flex h-7 items-center gap-1.5 whitespace-nowrap px-3 text-[12px] font-semibold tracking-tight",
        toneCls[tone],
        className
      )}
    >
      {pulse ? (
        <span className="relative flex h-2 w-2">
          <span className={cn("absolute inset-0 animate-ping rounded-full opacity-70", dotBg[tone])} />
          <span className={cn("relative h-2 w-2 rounded-full", dotBg[tone])} />
        </span>
      ) : (
        dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotBg[tone])} />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ Toggle */
export function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn("sculpt-toggle", checked && "is-on")}
    >
      <span className="sculpt-toggle-knob" />
    </button>
  );
}

/* ------------------------------------------------------------------ Slider */
export function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  label: string;
}) {
  const r = (value - min) / (max - min);
  return (
    <input
      type="range"
      aria-label={label}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="sculpt-range"
      style={{ "--r": r } as CSSProperties}
    />
  );
}

/* ------------------------------------------------------------------ Segmented */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: { value: T; label: ReactNode; icon?: ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  const n = options.length;
  const idx = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = (idx + 1) % n;
      onChange(options[nextIdx].value);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevIdx = (idx - 1 + n) % n;
      onChange(options[prevIdx].value);
    }
  };

  return (
    <div
      role="radiogroup"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn("sculpt-seg-track relative grid focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3559cb]/30", className)}
      style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden
        className="sculpt-seg-thumb pointer-events-none absolute bottom-1 left-1 top-1 transition-transform duration-250 ease-[cubic-bezier(.25,1.2,.4,1)]"
        style={{ width: `calc((100% - 8px) / ${n})`, transform: `translateX(${idx * 100}%)` }}
      />
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "relative z-10 flex h-9.5 items-center justify-center gap-1.5 px-3 text-[13px] font-semibold transition-colors duration-150 select-none",
              active ? "text-[#151922]" : "text-[#606d81] hover:text-[#151922]"
            )}
          >
            {o.icon && <span className={active ? "text-[#3559cb]" : ""}>{o.icon}</span>}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ Field */
export function Field({
  label,
  aside,
  children,
}: {
  label: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[12.5px] font-semibold tracking-tight text-[#4d5566]">{label}</span>
        {aside}
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ OptionTile */
export function OptionTile({
  icon,
  label,
  desc,
  selected,
  badge,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  desc: string;
  selected?: boolean;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex min-h-[142px] flex-col items-start justify-between gap-3.5 rounded-[22px] p-4.5 text-left transition-all duration-200 select-none",
        selected
          ? "sculpt-well border-2 border-[#3559cb]/40 ring-1 ring-[#3559cb]/30"
          : "sculpt-card sculpt-card-hover"
      )}
    >
      <div className="flex w-full items-start justify-between">
        <span
          className={cn(
            "grid h-11 w-11 place-items-center rounded-[16px] transition-all duration-200",
            selected ? "sculpt-btn-raised text-[#3559cb]" : "sculpt-well-sm text-[#4d5566]"
          )}
        >
          {icon}
        </span>
        {badge && <Pill tone="accent">{badge}</Pill>}
      </div>
      <div>
        <div className="text-[16px] font-bold tracking-tight text-[#151922]">{label}</div>
        <div className="mt-0.5 text-[12.5px] leading-relaxed text-[#4d5566]">{desc}</div>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ Setting Rows */
export function SettingList({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      {Children.toArray(children).map((c, i) => (
        <Fragment key={i}>
          {i > 0 && <div className="sculpt-groove my-1" />}
          {c}
        </Fragment>
      ))}
    </div>
  );
}

export function SettingRow({
  icon,
  label,
  desc,
  children,
}: {
  icon?: ReactNode;
  label: string;
  desc?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex min-w-0 items-center gap-3">
        {icon && (
          <span className="sculpt-well-sm hidden h-9 w-9 shrink-0 place-items-center rounded-[14px] text-[#4d5566] sm:grid">
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <div className="text-[14.5px] font-semibold tracking-tight text-[#151922]">{label}</div>
          {desc && <div className="text-[12px] text-[#606d81] leading-snug">{desc}</div>}
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ ProgressRing */
export function ProgressRing({
  progress,
  size = 196,
  children,
}: {
  progress: number;
  size?: number;
  children?: ReactNode;
}) {
  const stroke = 9;
  const r = (size - stroke) / 2 - 4;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <div className="sculpt-well absolute inset-0 rounded-full" />
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        <defs>
          <linearGradient id="sculptRingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6082ec" />
            <stop offset="60%" stopColor="#3559cb" />
            <stop offset="100%" stopColor="#0e6f64" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(154,168,188,0.30)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#sculptRingGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * Math.min(100, Math.max(0, progress))) / 100}
          style={{
            transition: "stroke-dashoffset 0.35s ease",
            filter: "drop-shadow(0 2px 6px rgba(53,89,203,0.35))",
          }}
        />
      </svg>
      <div className="relative z-10 grid place-items-center">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ Modal */
export function Modal({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-[#151922]/40 backdrop-blur-sm" onClick={onClose} />
      <div role="dialog" aria-modal="true" className="pop-in relative w-full max-w-[480px]">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Brand Mark */
export function Logo({ size = 42 }: { size?: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <span
      className="sculpt-btn-raised grid shrink-0 place-items-center"
      style={{ width: size, height: size, borderRadius: size * 0.36 }}
    >
      <svg width={size * 0.52} height={size * 0.52} viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6082ec" />
            <stop offset="100%" stopColor="#2442a8" />
          </linearGradient>
        </defs>
        <path
          d="M12 2.8c3.6 4.3 6.6 7.6 6.6 11.2a6.6 6.6 0 0 1-13.2 0C5.4 10.4 8.4 7.1 12 2.8z"
          fill={`url(#${id})`}
        />
        <path
          d="M9 14.4a3.2 3.2 0 0 0 2.6 3"
          stroke="#ffffff"
          strokeOpacity="0.85"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}
