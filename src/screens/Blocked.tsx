import { useApp, type BlockKind } from "../lib/store";
import {
  IconAlert,
  IconArrowLeft,
  IconClock,
  IconLock,
  IconRefresh,
  IconSettings,
  IconVideo,
} from "../lib/icons";
import { Button, Card, Pill, type PillTone } from "../components/ui";
import type { DictKey } from "../lib/i18n";
import { cn } from "../utils/cn";

interface BlockConfig {
  icon: typeof IconVideo;
  tone: PillTone;
  stateCode: string;
  titleKey: DictKey;
  descKey: DictKey;
  primaryActionKey: DictKey;
  primaryAction: () => void;
  secondaryActionKey?: DictKey;
  secondaryAction?: () => void;
}

export function Blocked() {
  const {
    t,
    blockKind,
    rejectedFileName,
    openPicker,
    loadSample,
    go,
    setEngineOnline,
    showToast,
  } = useApp();

  const configs: Record<BlockKind, BlockConfig> = {
    nofile: {
      icon: IconVideo,
      tone: "accent",
      stateCode: "S2 / S7 — SOURCE_EMPTY",
      titleKey: "errNoFileTitle",
      descKey: "errNoFileDesc",
      primaryActionKey: "errNoFileAction",
      primaryAction: openPicker,
      secondaryActionKey: "sampleVideoBtn",
      secondaryAction: loadSample,
    },
    unsupported: {
      icon: IconAlert,
      tone: "rose",
      stateCode: "S7 — CODEC_PREVIEW_LIMITATION",
      titleKey: "errUnsupportedTitle",
      descKey: "errUnsupportedDesc",
      primaryActionKey: "errUnsupportedAction",
      primaryAction: openPicker,
      secondaryActionKey: "backBtn",
      secondaryAction: () => go("home"),
    },
    unavailable: {
      icon: IconSettings,
      tone: "amber",
      stateCode: "S2 — ENGINE_DAEMON_OFFLINE",
      titleKey: "errUnavailableTitle",
      descKey: "errUnavailableDesc",
      primaryActionKey: "errUnavailableAction",
      primaryAction: () => {
        setEngineOnline(true);
        showToast("Local Destill engine daemon resumed");
        go("home");
      },
      secondaryActionKey: "navSettings",
      secondaryAction: () => go("settings"),
    },
    notready: {
      icon: IconClock,
      tone: "neutral",
      stateCode: "S2 — ANALYSIS_NOT_READY",
      titleKey: "errNotReadyTitle",
      descKey: "errNotReadyDesc",
      primaryActionKey: "errNotReadyAction",
      primaryAction: () => go("home"),
    },
    consent_missing: {
      icon: IconLock,
      tone: "amber",
      stateCode: "S2 — CONSENT_GATED",
      titleKey: "errConsentTitle",
      descKey: "errConsentDesc",
      primaryActionKey: "errConsentAction",
      primaryAction: () => go("settings"),
      secondaryActionKey: "backBtn",
      secondaryAction: () => go("home"),
    },
  };

  const cfg = configs[blockKind] || configs.nofile;
  const IconComponent = cfg.icon;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-220px)] w-full max-w-[600px] items-center px-4 py-6">
      <Card className="flex w-full flex-col items-center px-6 py-9 text-center sm:px-10 sm:py-11">
        {/* Sculpted Well Medallion */}
        <div className="sculpt-well grid h-[104px] w-[104px] place-items-center rounded-full">
          <div
            className={cn(
              "sculpt-btn-raised grid h-[76px] w-[76px] place-items-center rounded-full",
              cfg.tone === "accent"
                ? "text-[#3559cb]"
                : cfg.tone === "rose"
                ? "text-[#a8301f]"
                : cfg.tone === "amber"
                ? "text-[#7d4508]"
                : "text-[#4d5566]"
            )}
          >
            <IconComponent size={32} strokeWidth={1.7} />
          </div>
        </div>

        <div className="mt-6">
          <Pill tone={cfg.tone} dot>
            {cfg.stateCode}
          </Pill>
        </div>

        <h2 className="mt-3.5 text-[24px] font-bold leading-tight tracking-tight text-[#151922] sm:text-[28px]">
          {t(cfg.titleKey)}
        </h2>

        <p className="mt-2 max-w-[400px] text-[14px] leading-relaxed text-[#4d5566]">
          {t(cfg.descKey)}
        </p>

        {/* Truthful Engine vs Browser Diagnostic Notice */}
        <div className="sculpt-well-sm mt-6 flex w-full max-w-[400px] flex-col gap-1.5 p-3.5 text-left text-[11.5px] font-mono text-[#4d5566]">
          <div className="flex justify-between">
            <span className="font-semibold text-[#151922]">Diagnostic State:</span>
            <span>{blockKind.toUpperCase()}</span>
          </div>
          {rejectedFileName && (
            <div className="flex justify-between">
              <span className="font-semibold text-[#151922]">Target Container:</span>
              <span className="truncate max-w-[210px] text-[#a8301f]">{rejectedFileName}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-[#c6ccd8]/50 pt-1 text-[11px]">
            <span className="text-[#606d81]">Engine Distinction:</span>
            <span className="text-[#0e6f64]">Browser playback limit ≠ FFmpeg offline limit</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
          {cfg.secondaryAction && cfg.secondaryActionKey && (
            <Button variant="secondary" size="md" onClick={cfg.secondaryAction}>
              {t(cfg.secondaryActionKey)}
            </Button>
          )}
          <Button variant="primary" size="lg" onClick={cfg.primaryAction}>
            {t(cfg.primaryActionKey)}
          </Button>
        </div>
      </Card>
    </div>
  );
}
