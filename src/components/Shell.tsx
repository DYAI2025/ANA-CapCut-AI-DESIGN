import { useApp, type Screen } from "../lib/store";
import {
  IconCompare,
  IconFolder,
  IconHome,
  IconPalette,
  IconSettings,
  IconSpark,
  IconUnderstanding,
} from "../lib/icons";
import { Tooltip } from "./ui";
import { cn } from "../utils/cn";
import type { DictKey } from "../lib/i18n";
import type { ReactNode } from "react";

interface NavItem {
  id: Screen;
  labelKey: DictKey;
  icon: (props: { size?: number }) => ReactNode;
  requiresSource?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", labelKey: "navHome", icon: IconHome },
  { id: "understanding", labelKey: "navUnderstanding", icon: IconUnderstanding, requiresSource: true },
  { id: "result", labelKey: "navResult", icon: IconSpark, requiresSource: true },
  { id: "projects", labelKey: "navProjects", icon: IconFolder },
  { id: "compare", labelKey: "navCompare", icon: IconCompare },
  { id: "style", labelKey: "navStyle", icon: IconPalette },
  { id: "settings", labelKey: "navSettings", icon: IconSettings },
];

/** Desktop Sidebar Rail */
export function Sidebar() {
  const { t, screen, go, source, triggerBlock } = useApp();

  const handleNav = (item: NavItem) => {
    if (item.requiresSource && !source) {
      triggerBlock("nofile");
      return;
    }
    go(item.id);
  };

  return (
    <aside
      aria-label="Destill Application Navigation"
      className="neu-raised sticky top-20 hidden h-[calc(100vh-6rem)] w-[88px] shrink-0 flex-col items-center justify-between rounded-[32px] py-5 lg:flex"
    >
      <nav className="flex flex-col items-center gap-2">
        {NAV_ITEMS.map((item) => {
          const active = screen === item.id;
          const IconComponent = item.icon;
          const label = t(item.labelKey);

          return (
            <Tooltip key={item.id} label={label} side="right">
              <button
                type="button"
                onClick={() => handleNav(item)}
                aria-current={active ? "page" : undefined}
                aria-label={label}
                className={cn(
                  "neu-btn flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-[18px] text-[10.5px] font-semibold transition-all duration-200",
                  active
                    ? "is-pressed text-[#5160e8]"
                    : "text-[#6b7791] hover:text-[#1c2434] neu-flat"
                )}
              >
                <IconComponent size={20} />
                <span className="truncate max-w-[56px] scale-90">{label}</span>
              </button>
            </Tooltip>
          );
        })}
      </nav>

      {/* Ana Creator Avatar */}
      <div className="flex flex-col items-center gap-2 pt-2">
        <Tooltip label="Creator Profile: Ana (CapCut Active)" side="right">
          <div className="neu-inset-sm grid h-10 w-10 place-items-center rounded-full text-[13px] font-bold text-[#4a566d]">
            A
          </div>
        </Tooltip>
      </div>
    </aside>
  );
}

/** Mobile Bottom Tab Navigation */
export function BottomNav() {
  const { t, screen, go, source, triggerBlock } = useApp();

  const handleNav = (item: NavItem) => {
    if (item.requiresSource && !source) {
      triggerBlock("nofile");
      return;
    }
    go(item.id);
  };

  // Keep mobile tab bar concise with primary 5 tabs
  const mobileTabs = NAV_ITEMS.filter((item) =>
    ["home", "understanding", "result", "projects", "settings"].includes(item.id)
  );

  return (
    <nav
      aria-label="Mobile Navigation"
      className="neu-raised fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-[26px] p-1.5 shadow-[0_12px_32px_rgba(30,40,70,0.3)] backdrop-blur-lg lg:hidden"
    >
      {mobileTabs.map((item) => {
        const active = screen === item.id;
        const IconComponent = item.icon;
        const label = t(item.labelKey);

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNav(item)}
            aria-current={active ? "page" : undefined}
            aria-label={label}
            className={cn(
              "neu-btn flex h-13 flex-1 flex-col items-center justify-center gap-1 rounded-[18px] text-[10px] font-bold transition-all duration-200",
              active ? "is-pressed text-[#5160e8]" : "text-[#6b7791]"
            )}
          >
            <IconComponent size={19} />
            <span className="truncate">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
