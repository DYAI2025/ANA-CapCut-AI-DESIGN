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
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-xl bg-[#1c2434]/95 px-3 py-1.5 text-[12px] font-medium tracking-tight text-white opacity-0 shadow-[0_8px_20px_rgba(28,36,52,0.3)] backdrop-blur transition-all duration-200",
          "group-hover/tip:opacity-100 group-hover/tip:delay-200 group-focus-within/tip:opacity-100",
          side === "top" && "left-1/2 -translate-x-1/2 bottom-full mb-2.5 translate-y-1 group-hover/tip:translate-y-0 group-focus-within/tip:translate-y-0",
          side === "bottom" && "left-1/2 -translate-x-1/2 top-full mt-2.5 -translate-y-1 group-hover/tip:translate-y-0 group-focus-within/tip:translate-y-0",
          side === "right" && "left-full ml-2.5 top-1/2 -translate-y-1/2 -translate-x-1 group-hover/tip:translate-x-0 group-focus-within/tip:translate-x-0"
        )}
      >
        {label}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ Button */
export type ButtonVariant = "primary" | "secondary" | "utility" | "ghost" | "danger";
export type ButtonSize = "xl" | "lg" | "md" | "sm";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  tip?: string;
  tipSide?: "top" | "bottom";
  pressed?: boolean;
  children?: ReactNode;
}

const sizeCls: Record<ButtonSize, string> = {
  xl: "h-[64px] min-w-[220px] rounded-[24px] px-10 text-[18px]",
  lg: "h-13 rounded-[20px] px-7 text-[15px]",
  md: "h-11 rounded-[16px] px-5 text-[14px]",
  sm: "h-9 rounded-[13px] px-3.5 text-[13px]",
};

const iconOnlyCls: Record<ButtonSize, string> = {
  xl: "h-[64px] w-[64px] rounded-full",
  lg: "h-13 w-13 rounded-full",
  md: "h-11 w-11 rounded-full",
  sm: "h-9 w-9 rounded-full",
};

const variantCls: Record<ButtonVariant, string> = {
  primary: "neu-primary font-semibold",
  secondary: "neu-raised-sm text-[#1c2434] hover:text-[#1c2434]",
  utility: "neu-raised-xs text-[#4a566d] hover:text-[#1c2434]",
  ghost: "neu-flat text-[#4a566d] hover:text-[#1c2434]",
  danger: "neu-raised-sm text-[#cc3d61] hover:text-[#9e1c3c]",
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
        "neu-btn inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap font-medium tracking-tight",
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
        "neu-raised rounded-[32px] p-6 sm:p-8 transition-transform duration-300",
        hover && "hover:-translate-y-1 hover:shadow-[18px_18px_36px_var(--lo),-18px_-18px_36px_var(--hi)]",
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
  neutral: "text-[#4a566d]",
  accent: "text-[#5160e8]",
  mint: "text-[#1a886e]",
  amber: "text-[#bd730a]",
  rose: "text-[#cc3d61]",
};

const dotBg: Record<PillTone, string> = {
  neutral: "bg-[#6b7791]",
  accent: "bg-[#5160e8]",
  mint: "bg-[#1a886e]",
  amber: "bg-[#bd730a]",
  rose: "bg-[#cc3d61]",
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
        "neu-inset-sm inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[12px] font-semibold tracking-tight",
        toneCls[tone],
        className
      )}
    >
      {pulse ? (
        <span className="relative flex h-2 w-2">
          <span className={cn("absolute inset-0 animate-ping rounded-full opacity-75", dotBg[tone])} />
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
      className={cn("neu-toggle", checked && "is-on")}
    >
      <span className="neu-toggle-knob" />
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
      className="neu-range"
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

  return (
    <div
      role="radiogroup"
      className={cn("neu-inset relative grid rounded-2xl p-1.5", className)}
      style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden
        className="neu-raised-sm absolute bottom-1.5 left-1.5 top-1.5 rounded-xl transition-transform duration-300 ease-[cubic-bezier(.3,1.2,.5,1)]"
        style={{ width: `calc((100% - 12px) / ${n})`, transform: `translateX(${idx * 100}%)` }}
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
              "relative z-10 flex h-10 items-center justify-center gap-2 rounded-xl text-[13.5px] font-semibold transition-colors duration-200",
              active ? "text-[#1c2434]" : "text-[#6b7791] hover:text-[#4a566d]"
            )}
          >
            {o.icon && <span className={active ? "text-[#5160e8]" : ""}>{o.icon}</span>}
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
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[13px] font-semibold tracking-tight text-[#6b7791]">{label}</span>
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
        "neu-btn neu-raised-md flex min-h-[148px] flex-col items-start justify-between gap-4 rounded-[28px] p-5 text-left",
        selected && "is-pressed"
      )}
    >
      <div className="flex w-full items-start justify-between">
        <span
          className={cn(
            "grid h-12 w-12 place-items-center rounded-2xl transition-all duration-300",
            selected ? "neu-raised-sm text-[#5160e8]" : "neu-inset-sm text-[#4a566d]"
          )}
        >
          {icon}
        </span>
        {badge && <Pill tone="accent">{badge}</Pill>}
      </div>
      <div>
        <div className="text-[17px] font-semibold tracking-tight text-[#1c2434]">{label}</div>
        <div className="mt-1 text-[13px] leading-relaxed text-[#4a566d]">{desc}</div>
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
          {i > 0 && <div className="neu-groove" />}
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
    <div className="flex items-center justify-between gap-4 py-4.5">
      <div className="flex min-w-0 items-center gap-3.5">
        {icon && (
          <span className="neu-inset-sm hidden h-10 w-10 shrink-0 place-items-center rounded-2xl text-[#4a566d] sm:grid">
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <div className="text-[15.5px] font-semibold tracking-tight text-[#1c2434]">{label}</div>
          {desc && <div className="text-[13px] text-[#6b7791]">{desc}</div>}
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ ProgressRing */
export function ProgressRing({
  progress,
  size = 200,
  children,
}: {
  progress: number;
  size?: number;
  children?: ReactNode;
}) {
  const stroke = 10;
  const r = (size - stroke) / 2 - 4;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <div className="neu-inset absolute inset-0 rounded-full" />
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8191ff" />
            <stop offset="55%" stopColor="#5160e8" />
            <stop offset="100%" stopColor="#1a886e" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(198,205,221,0.5)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * Math.min(100, Math.max(0, progress))) / 100}
          style={{
            transition: "stroke-dashoffset 0.4s ease",
            filter: "drop-shadow(0 3px 6px rgba(81,96,232,0.35))",
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
      <div className="absolute inset-0 bg-[#0f1422]/45 backdrop-blur-md" onClick={onClose} />
      <div role="dialog" aria-modal="true" className="pop-in relative w-full max-w-[500px]">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Brand Mark */
export function Logo({ size = 44 }: { size?: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <span
      className="neu-raised grid shrink-0 place-items-center"
      style={{ width: size, height: size, borderRadius: size * 0.34 }}
    >
      <svg width={size * 0.52} height={size * 0.52} viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8191ff" />
            <stop offset="1" stopColor="#404fc7" />
          </linearGradient>
        </defs>
        <path
          d="M12 2.8c3.6 4.3 6.6 7.6 6.6 11.2a6.6 6.6 0 0 1-13.2 0C5.4 10.4 8.4 7.1 12 2.8z"
          fill={`url(#${id})`}
        />
        <path
          d="M9 14.4a3.2 3.2 0 0 0 2.6 3"
          stroke="#ffffff"
          strokeOpacity="0.8"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}
