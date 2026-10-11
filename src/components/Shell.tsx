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
      className="sculpt-card sticky top-20 hidden h-[calc(100vh-6rem)] w-[84px] shrink-0 flex-col items-center justify-between py-4.5 lg:flex"
    >
      <nav className="flex flex-col items-center gap-1.5">
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
                  "flex h-13 w-13 flex-col items-center justify-center gap-1 rounded-[16px] text-[10px] font-semibold transition-all duration-150 select-none",
                  active
                    ? "sculpt-well text-[#3559cb]"
                    : "text-[#788296] hover:text-[#151922] sculpt-flat"
                )}
              >
                <IconComponent size={19} />
                <span className="truncate max-w-[50px] scale-90">{label}</span>
              </button>
            </Tooltip>
          );
        })}
      </nav>

      {/* Ana Creator Avatar */}
      <div className="flex flex-col items-center gap-2 pt-2">
        <Tooltip label="Creator Context: Ana (iPhone CapCut Workflow)" side="right">
          <div className="sculpt-well-sm grid h-9.5 w-9.5 place-items-center rounded-full text-[12.5px] font-bold text-[#4d5566]">
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

  const mobileTabs = NAV_ITEMS.filter((item) =>
    ["home", "understanding", "result", "projects", "settings"].includes(item.id)
  );

  return (
    <nav
      aria-label="Mobile Navigation"
      className="sculpt-card fixed inset-x-3 bottom-3 z-40 flex items-center justify-around p-1.5 shadow-[0_12px_32px_rgba(21,25,34,0.22)] backdrop-blur-lg lg:hidden"
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
              "flex h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-[14px] text-[9.5px] font-bold transition-all duration-150 select-none",
              active ? "sculpt-well text-[#3559cb]" : "text-[#788296]"
            )}
          >
            <IconComponent size={18} />
            <span className="truncate">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
