import { useApp } from "../lib/store";
import { LANG_OPTIONS } from "../lib/i18n";
import { IconGlobe, IconLock, IconSpark, IconWave } from "../lib/icons";
import { Button, Logo, Pill, Tooltip } from "./ui";
import { cn } from "../utils/cn";

export function TopBar() {
  const {
    t,
    lang,
    setLang,
    mode,
    setMode,
    screen,
    go,
    engineOnline,
    source,
    loadSample,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#eef1f6]/90 px-4 pt-3 pb-3 backdrop-blur-md lg:px-6">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => go("home")}
            className="group flex items-center gap-2.5 text-left select-none"
          >
            <Logo size={40} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[18.5px] font-bold tracking-tight text-[#151922]">
                  {t("brandName")}
                </span>
                <span className="rounded-md bg-[#3559cb]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#3559cb]">
                  v0.2
                </span>
              </div>
              <span className="hidden text-[11px] font-medium tracking-tight text-[#788296] sm:block">
                {t("brandKicker")}
              </span>
            </div>
          </button>
        </div>

        {/* Product Mode Switcher: Analyze (First capability) vs Destill (Future editing) */}
        <div
          role="group"
          aria-label="Product Capability Mode"
          className="sculpt-well-sm hidden items-center gap-1 p-1 sm:flex"
        >
          <Tooltip label={t("modeAnalyzeDesc")} side="bottom">
            <button
              type="button"
              onClick={() => {
                setMode("analyze");
                if (screen === "result") go("understanding");
              }}
              className={cn(
                "flex h-7.5 items-center gap-1.5 rounded-[10px] px-3 text-[12px] font-semibold transition-all duration-150",
                mode === "analyze"
                  ? "sculpt-btn-raised text-[#3559cb]"
                  : "text-[#788296] hover:text-[#151922]"
              )}
            >
              <IconWave size={13} />
              {t("modeAnalyze")}
            </button>
          </Tooltip>

          <Tooltip label={t("modeDestillDesc")} side="bottom">
            <button
              type="button"
              onClick={() => {
                setMode("destill");
                if (screen === "understanding") go("result");
              }}
              className={cn(
                "flex h-7.5 items-center gap-1.5 rounded-[10px] px-3 text-[12px] font-semibold transition-all duration-150",
                mode === "destill"
                  ? "sculpt-btn-raised text-[#151922]"
                  : "text-[#788296] hover:text-[#151922]"
              )}
            >
              <IconSpark size={13} />
              {t("modeDestill")}
            </button>
          </Tooltip>
        </div>

        {/* System & Localization Utilities */}
        <div className="flex items-center gap-2">
          {/* Privacy Guarantee */}
          <Tooltip label={t("localGuaranteeTooltip")} side="bottom">
            <Pill tone="mint" icon={<IconLock size={12} />} className="hidden md:inline-flex">
              {t("localGuarantee")}
            </Pill>
          </Tooltip>

          {/* Engine Status */}
          <Tooltip label={engineOnline ? t("engineReady") : t("enginePaused")} side="bottom">
            <Pill tone={engineOnline ? "mint" : "amber"} dot className="hidden lg:inline-flex">
              {engineOnline ? "Engine Online" : "Engine Paused"}
            </Pill>
          </Tooltip>

          {/* Language Switch */}
          <div
            role="group"
            aria-label="Select Language"
            className="sculpt-well-sm flex items-center p-0.5"
          >
            <span className="hidden px-1.5 text-[#788296] sm:inline">
              <IconGlobe size={13} />
            </span>
            {LANG_OPTIONS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLang(l.id)}
                aria-pressed={lang === l.id}
                className={cn(
                  "h-6.5 rounded-[9px] px-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-150",
                  lang === l.id
                    ? "sculpt-btn-raised text-[#151922]"
                    : "text-[#788296] hover:text-[#4d5566]"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Quick Demo Sample Action if empty */}
          {!source && (
            <Button
              size="sm"
              variant="utility"
              tip={t("sampleVideoTip")}
              onClick={loadSample}
              className="hidden sm:inline-flex"
            >
              {t("sampleVideoBtn")}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
