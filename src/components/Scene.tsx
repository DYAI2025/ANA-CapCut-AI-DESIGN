import { useId, type ReactNode } from "react";
import { cn } from "../utils/cn";

export type SceneKind = "dawn" | "coast" | "market" | "forest" | "city";

/**
 * Generative SVG scene illustrations for video preview thumbnails and frames.
 * Self-contained vector art that renders reliably without external assets.
 */
export function Scene({
  kind,
  aspect = "16/9",
  className,
}: {
  kind: SceneKind;
  aspect?: "16/9" | "9/16";
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const sky = `${id}-sky`;
  const sea = `${id}-sea`;

  let art: ReactNode;

  switch (kind) {
    case "dawn":
      art = (
        <>
          <defs>
            <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b6bcff" />
              <stop offset="55%" stopColor="#ffd3cf" />
              <stop offset="100%" stopColor="#ffe9c8" />
            </linearGradient>
          </defs>
          <rect width="160" height="90" fill={`url(#${sky})`} />
          <circle cx="82" cy="46" r="28" fill="#fff" opacity="0.28" />
          <circle cx="82" cy="46" r="14" fill="#fff5dd" />
          <path d="M0 56C24 48 46 54 70 56s52-8 90-2V90H0z" fill="#a6a9ec" opacity="0.8" />
          <path d="M0 64c30-6 58 2 92-3s48-2 68 3v26H0z" fill="#8a8ed9" />
          <rect y="72" width="160" height="18" fill="#6f75c7" />
          <path
            d="M68 76h28M74 80h16M70 84h24"
            stroke="#fff5dd"
            strokeOpacity="0.65"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path d="M124 70v-8M122 70h6" stroke="#5a5fb0" strokeWidth="1.4" strokeLinecap="round" />
        </>
      );
      break;

    case "coast":
      art = (
        <>
          <defs>
            <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bfe0ff" />
              <stop offset="100%" stopColor="#f3faff" />
            </linearGradient>
            <linearGradient id={sea} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#74c4d4" />
              <stop offset="100%" stopColor="#3f9fb8" />
            </linearGradient>
          </defs>
          <rect width="160" height="90" fill={`url(#${sky})`} />
          <circle cx="118" cy="22" r="9" fill="#fff" opacity="0.9" />
          <rect y="48" width="160" height="42" fill={`url(#${sea})`} />
          <path d="M0 52h160" stroke="#fff" strokeOpacity="0.5" />
          <path d="M0 90V56c14-4 26 2 38 12 10 8 8 14 6 22z" fill="#ecd7bb" />
          <path d="M0 90V70c10-3 20 3 26 20z" fill="#d9bf9c" />
          <path
            d="M60 70h22M88 76h30M70 82h40M110 62h26"
            stroke="#fff"
            strokeOpacity="0.65"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </>
      );
      break;

    case "market":
      art = (
        <>
          <defs>
            <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffe6c8" />
              <stop offset="100%" stopColor="#ffc9bb" />
            </linearGradient>
          </defs>
          <rect width="160" height="90" fill={`url(#${sky})`} />
          <rect x="0" y="30" width="52" height="60" fill="#eba892" />
          <rect x="108" y="22" width="52" height="68" fill="#e49a86" />
          <rect x="52" y="40" width="56" height="50" fill="#f3b9a0" />
          <path d="M60 90V62a20 20 0 0 1 40 0v28z" fill="#fff0dc" opacity="0.92" />
          <path d="M10 48a7 7 0 0 1 14 0v10H10zM30 48a7 7 0 0 1 14 0v10H30z" fill="#fff0dc" opacity="0.85" />
          <path d="M116 40a7 7 0 0 1 14 0v10h-14zM136 40a7 7 0 0 1 14 0v10h-14z" fill="#fff0dc" opacity="0.85" />
          <path d="M0 18C40 30 120 30 160 14" stroke="#b9786a" strokeWidth="0.8" fill="none" />
          <circle cx="24" cy="25" r="2.6" fill="#ff8f8f" />
          <circle cx="52" cy="29" r="2.6" fill="#ffd36a" />
          <circle cx="80" cy="30" r="2.6" fill="#8fd6c0" />
          <circle cx="108" cy="29" r="2.6" fill="#ff8f8f" />
          <circle cx="136" cy="24" r="2.6" fill="#ffd36a" />
          <rect y="78" width="160" height="12" fill="#d98a76" opacity="0.65" />
        </>
      );
      break;

    case "forest":
      art = (
        <>
          <defs>
            <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e4f7ee" />
              <stop offset="100%" stopColor="#bfe9d6" />
            </linearGradient>
          </defs>
          <rect width="160" height="90" fill={`url(#${sky})`} />
          <circle cx="40" cy="22" r="10" fill="#fff" opacity="0.7" />
          <path
            d="M10 70l14-38 14 38zM34 74l16-44 16 44zM62 72l12-34 12 34zM88 74l16-46 16 46zM116 70l14-36 14 36z"
            fill="#6cbba0"
            opacity="0.75"
          />
          <path d="M-4 90l16-46 16 46zM24 90l14-38 14 38zM96 90l14-40 14 40zM128 90l16-44 16 44z" fill="#3f9d7f" />
          <rect y="70" width="160" height="20" fill="#2f8a6e" opacity="0.5" />
        </>
      );
      break;

    case "city":
    default:
      art = (
        <>
          <defs>
            <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cfd8f6" />
              <stop offset="100%" stopColor="#f0f2fc" />
            </linearGradient>
          </defs>
          <rect width="160" height="90" fill={`url(#${sky})`} />
          <circle cx="126" cy="20" r="8" fill="#fff" />
          <rect x="8" y="40" width="26" height="50" rx="2" fill="#a3aed8" />
          <rect x="38" y="26" width="30" height="64" rx="2" fill="#8a97c9" />
          <rect x="72" y="44" width="24" height="46" rx="2" fill="#a3aed8" />
          <rect x="100" y="32" width="28" height="58" rx="2" fill="#7f8cbf" />
          <rect x="132" y="48" width="24" height="42" rx="2" fill="#a3aed8" />
          <path
            d="M44 34h6M56 34h6M44 44h6M56 44h6M44 54h6M56 54h6M106 40h6M118 40h6M106 50h6M118 50h6"
            stroke="#fff"
            strokeOpacity="0.7"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <rect y="80" width="160" height="10" fill="#6f7cae" opacity="0.55" />
        </>
      );
  }

  const viewBox = aspect === "9/16" ? "35 0 90 90" : "0 0 160 90";

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full select-none", className)}
      aria-hidden="true"
    >
      {art}
    </svg>
  );
}

/** Soft vertical frame used for vertical 9:16 mobile previews */
export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("sculpt-well p-3", className)}>
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[20px] bg-[#111622] shadow-[0_12px_28px_rgba(21,25,34,0.35)]">
        {children}
      </div>
    </div>
  );
}
