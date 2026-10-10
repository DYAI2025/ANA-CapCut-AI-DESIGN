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
      titleKey: "errNotReadyTitle",
      descKey: "errNotReadyDesc",
      primaryActionKey: "errNotReadyAction",
      primaryAction: () => go("home"),
    },
    consent_missing: {
      icon: IconLock,
      tone: "amber",
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
    <div className="mx-auto flex min-h-[calc(100vh-220px)] w-full max-w-[620px] items-center px-4 py-8">
      <Card className="flex w-full flex-col items-center px-6 py-10 text-center sm:px-12 sm:py-12">
        {/* Soft Neumorphic Status Well */}
        <div className="neu-raised grid h-[120px] w-[120px] place-items-center rounded-full">
          <div
            className={cn(
              "neu-inset grid h-[88px] w-[88px] place-items-center rounded-full",
              cfg.tone === "accent"
                ? "text-[#5160e8]"
                : cfg.tone === "rose"
                ? "text-[#cc3d61]"
                : cfg.tone === "amber"
                ? "text-[#bd730a]"
                : "text-[#6b7791]"
            )}
          >
            <IconComponent size={36} strokeWidth={1.7} />
          </div>
        </div>

        <div className="mt-7">
          <Pill tone={cfg.tone} dot>
            {t("blockedKicker")}
          </Pill>
        </div>

        <h2 className="mt-4 text-[26px] font-bold leading-tight tracking-tight text-[#1c2434] sm:text-[30px]">
          {t(cfg.titleKey)}
        </h2>

        <p className="mt-2.5 max-w-[420px] text-[15px] leading-relaxed text-[#4a566d]">
          {t(cfg.descKey)}
        </p>

        {/* Diagnostic Metadata Container */}
        <div className="neu-inset-sm mt-7 flex w-full max-w-[420px] flex-col gap-1 rounded-2xl p-3.5 text-left text-[12px] font-mono text-[#6b7791]">
          <div className="flex justify-between">
            <span className="font-semibold text-[#1c2434]">Condition:</span>
            <span>{blockKind.toUpperCase()}</span>
          </div>
          {rejectedFileName && (
            <div className="flex justify-between">
              <span className="font-semibold text-[#1c2434]">File Track:</span>
              <span className="truncate max-w-[240px] text-[#cc3d61]">{rejectedFileName}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="font-semibold text-[#1c2434]">Execution Layer:</span>
            <span>Local Mac Sandbox</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
