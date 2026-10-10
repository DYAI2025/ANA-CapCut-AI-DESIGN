import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconDrop = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M12 3.2c3.3 4 6 7.1 6 10.3a6 6 0 0 1-12 0c0-3.2 2.7-6.3 6-10.3z" />
    <path d="M9 14.4a3.2 3.2 0 0 0 2.6 3" strokeOpacity={0.8} />
  </svg>
);

export const IconVideo = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <rect x="2.5" y="6" width="13" height="12" rx="3.2" />
    <path d="M15.5 10.8l4.5-2.8a0.8 0.8 0 0 1 1.2.7v6.6a0.8 0.8 0 0 1-1.2.7l-4.5-2.8z" />
  </svg>
);

export const IconPlay = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p} fill="currentColor" stroke="none">
    <path d="M8.5 5.8v12.4a0.8 0.8 0 0 0 1.2 0.7l10-6.2a0.8 0.8 0 0 0 0-1.4l-10-6.2a0.8 0.8 0 0 0-1.2 0.7z" />
  </svg>
);

export const IconPause = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p} fill="currentColor" stroke="none">
    <rect x="6.5" y="5" width="4" height="14" rx="1.5" />
    <rect x="13.5" y="5" width="4" height="14" rx="1.5" />
  </svg>
);

export const IconHome = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M3.5 10.5l8.5-7 8.5 7" />
    <path d="M5.5 9.5v10a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-10" />
    <path d="M9.5 21v-6a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5v6" />
  </svg>
);

export const IconUnderstanding = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const IconFolder = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2.5h7.5A2.5 2.5 0 0 1 21 10v7.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z" />
  </svg>
);

export const IconCompare = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <rect x="3" y="4.5" width="8" height="15" rx="2" />
    <rect x="13" y="4.5" width="8" height="15" rx="2" />
    <path d="M12 3v18" strokeDasharray="2 3" opacity={0.5} />
  </svg>
);

export const IconPalette = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.9 2-1.8 0-1.2-1-1.5-1-2.7 0-1 .8-1.5 1.8-1.5H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8z" />
    <circle cx="7.5" cy="11" r="1" fill="currentColor" />
    <circle cx="10" cy="7" r="1" fill="currentColor" />
    <circle cx="15" cy="7.5" r="1" fill="currentColor" />
  </svg>
);

export const IconSettings = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21" />
    <path d="M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" />
  </svg>
);

export const IconCheck = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const IconClose = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconPlus = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
);

export const IconChevron = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const IconChevronUp = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M6 15l6-6 6 6" />
  </svg>
);

export const IconArrowRight = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconArrowLeft = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const IconLock = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.5" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </svg>
);

export const IconSpark = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M12 3l1.8 4.8L18.6 9.6l-4.8 1.8L12 16.2l-1.8-4.8L5.4 9.6l4.8-1.8z" />
    <path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
  </svg>
);

export const IconWave = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M3 12c1.5-3.5 3-3.5 4.5 0s3 3.5 4.5 0 3-3.5 4.5 0 3 3.5 4.5 0" />
  </svg>
);

export const IconScissors = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <circle cx="6" cy="6.5" r="2.5" />
    <circle cx="6" cy="17.5" r="2.5" />
    <path d="M8 8.2L20 18M8 15.8L20 6" />
  </svg>
);

export const IconTarget = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const IconCopy = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M15 9V6.5A2.5 2.5 0 0 0 12.5 4H6.5A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15H9" />
  </svg>
);

export const IconDownload = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M12 4v11M7.5 10.5L12 15l4.5-4.5" />
    <path d="M4.5 17.5v1.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-1.5" />
  </svg>
);

export const IconRefresh = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M20 11a8 8 0 1 0-2.3 5.7" />
    <path d="M20 4v7h-7" />
  </svg>
);

export const IconTrash = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M4.5 6.5h15M9.5 6.5V4.5h5v2" />
    <path d="M6.5 6.5l1 12.5a2 2 0 0 0 2 1.8h5a2 2 0 0 0 2-1.8l1-12.5" />
    <path d="M10 10.5v6M14 10.5v6" />
  </svg>
);

export const IconSwap = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M4 8h13M13 4l4 4-4 4" />
    <path d="M20 16H7M11 12l-4 4 4 4" />
  </svg>
);

export const IconAlert = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5M12 16.5h.01" />
  </svg>
);

export const IconInfo = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.2M12 7.8h.01" />
  </svg>
);

export const IconClock = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconGlobe = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.6 10h16.8M3.6 14h16.8" />
    <path d="M12 3c2.4 2.6 3.6 5.8 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.8-3.6-9s1.2-6.4 3.6-9z" />
  </svg>
);

export const IconLayers = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M12 3.5l9 5-9 5-9-5z" />
    <path d="M3 13.5l9 5 9-5" />
  </svg>
);

export const IconMic = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5.5 10.5a6.5 6.5 0 0 0 13 0M12 17v4" />
  </svg>
);

export const IconText = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M5 7V5h14v2M12 5v14M9 19h6" />
  </svg>
);

export const IconWand = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M4 20L15.5 8.5" />
    <path d="M15 4l.8 2.2L18 7l-2.2.8L15 10l-.8-2.2L12 7l2.2-.8z" />
  </svg>
);

export const IconEye = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconDevice = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <rect x="6.5" y="3.5" width="11" height="17" rx="3" />
    <path d="M10.5 17.5h3" />
  </svg>
);

export const IconCamera = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <rect x="3" y="6.5" width="18" height="13" rx="3.5" />
    <circle cx="12" cy="13" r="3.2" />
    <path d="M8.5 6.5l1-2.5h5l1 2.5" />
  </svg>
);

export const IconGrid = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="2" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="2" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="2" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2" />
  </svg>
);

export const IconBolt = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M13 3L5 13.5h6L10 21l8-10.5h-6z" />
  </svg>
);

export const IconBook = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export const IconExpand = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

export const IconFlask = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} {...base} {...p}>
    <path d="M9.5 3.5h5v4.2l3.8 8.6a2.5 2.5 0 0 1-2.3 3.7H8a2.5 2.5 0 0 1-2.3-3.7l3.8-8.6z" />
    <path d="M7 14.5h10" />
  </svg>
);
