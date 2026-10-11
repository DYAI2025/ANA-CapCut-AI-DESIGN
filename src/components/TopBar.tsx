import { useApp, type Screen } from "../lib/store";
import { LANG_OPTIONS } from "../lib/i18n";
import { IconGlobe, IconLock, IconSpark, IconWave } from "../lib/icons";
import { Button, Logo, Pill, Tooltip } from "./ui";
import { cn } from "../utils/cn";

export function TopBar() {
  const {
    t,
    lang,
    setLang,
    screen,
    go,
    source,
    triggerBlock,
    loadSample,
  } = useApp();

  const navLinks: { id: Screen; label: string; requiresSource?: boolean }[] = [
    { id: "home", label: t("navHome") },
    { id: "understanding", label: t("navUnderstanding"), requiresSource: true },
    { id: "result", label: t("navResult"), requiresSource: true },
    { id: "projects", label: t("navProjects") },
    { id: "settings", label: t("navSettings") },
  ];

  const handleNav = (item: { id: Screen; requiresSource?: boolean }) => {
    if (item.requiresSource && !source) {
      triggerBlock("nofile");
      return;
    }
    go(item.id);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#eef1f6]/92 px-4 py-3 backdrop-blur-md border-b border-white/60 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => go("home")}
            className="group flex items-center gap-2.5 text-left select-none focus:outline-none"
            aria-label="Destill Home"
          >
            <Logo size={36} />
            <div className="flex items-baseline gap-2">
              <span className="text-[19px] font-bold tracking-tight text-[#151922]">
                {t("brandName")}
              </span>
              <span className="text-[11px] font-semibold text-[#606d81] tracking-tight hidden sm:inline">
                Design Reference R1
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Integrated Navigation Links (Single-Line Controls) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-1.5 sculpt-well-sm p-1"
        >
          {navLinks.map((item) => {
            const active =
              screen === item.id ||
              (item.id === "understanding" && screen === "understanding") ||
              (item.id === "result" && (screen === "result" || screen === "decision"));

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "h-7.5 px-3.5 text-[12.5px] font-semibold rounded-[10px] whitespace-nowrap transition-all duration-150 select-none",
                  active
                    ? "sculpt-btn-raised text-[#151922] shadow-sm"
                    : "text-[#606d81] hover:text-[#151922]"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Essential Utilities & Creator Context */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Demo Sample Action if empty */}
          {!source && (
            <Button
              size="sm"
              variant="utility"
              tip={t("sampleVideoTip")}
              onClick={loadSample}
              className="hidden lg:inline-flex"
            >
              {t("sampleVideoBtn")}
            </Button>
          )}

          {/* Language Switcher */}
          <div
            role="group"
            aria-label="Language"
            className="sculpt-well-sm flex items-center p-0.5"
          >
            <span className="hidden px-1.5 text-[#606d81] sm:inline">
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
                    : "text-[#606d81] hover:text-[#151922]"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Ana Creator Context Avatar */}
          <Tooltip label="Creator: Ana (iPhone CapCut Workflow)" side="bottom">
            <div className="sculpt-btn-raised grid h-8 w-8 place-items-center rounded-full text-[12px] font-bold text-[#151922] cursor-pointer">
              A
            </div>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
