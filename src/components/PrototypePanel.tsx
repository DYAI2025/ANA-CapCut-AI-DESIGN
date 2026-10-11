import { useState } from "react";
import { useApp, type BlockKind } from "../lib/store";
import {
  IconChevron,
  IconChevronUp,
  IconClose,
  IconFlask,
  IconLayers,
} from "../lib/icons";
import { cn } from "../utils/cn";

export function PrototypePanel() {
  const [open, setOpen] = useState(false);
  const {
    screen,
    source,
    loadSample,
    removeSource,
    go,
    triggerBlock,
    blockKind,
    engineOnline,
    setEngineOnline,
    calmMotion,
    setCalmMotion,
    showToast,
  } = useApp();

  const ensureSource = () => {
    if (!source) loadSample();
  };

  const statesS0toS7: {
    id: string;
    code: string;
    label: string;
    active: boolean;
    run: () => void;
  }[] = [
    {
      id: "s0",
      code: "S0",
      label: "Empty / Welcome (Milled Well)",
      active: screen === "home" && !source,
      run: () => {
        removeSource();
        go("home");
      },
    },
    {
      id: "s1",
      code: "S1",
      label: "Source Selected (Probed Metadata)",
      active: screen === "home" && !!source,
      run: () => {
        ensureSource();
        go("home");
      },
    },
    {
      id: "s2",
      code: "S2",
      label: "Capability / Consent Blocked",
      active: screen === "blocked" && blockKind === "unavailable",
      run: () => {
        triggerBlock("unavailable");
      },
    },
    {
      id: "s3",
      code: "S3",
      label: "Explicit Demo Processing",
      active: screen === "processing",
      run: () => {
        ensureSource();
        go("processing");
      },
    },
    {
      id: "s4",
      code: "S4",
      label: "Evidence-Based Understanding",
      active: screen === "understanding",
      run: () => {
        ensureSource();
        go("understanding");
      },
    },
    {
      id: "s5",
      code: "S5",
      label: "Editing Decision / Refine",
      active: screen === "decision",
      run: () => {
        ensureSource();
        go("decision");
      },
    },
    {
      id: "s6",
      code: "S6",
      label: "Honest Result (NOT_RENDERED)",
      active: screen === "result",
      run: () => {
        ensureSource();
        go("result");
      },
    },
    {
      id: "s7",
      code: "S7",
      label: "Error / Offline / Cancelled",
      active: screen === "blocked" && blockKind === "unsupported",
      run: () => {
        triggerBlock("unsupported", "camera_card_take.mkv");
      },
    },
  ];

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2.5 lg:bottom-4 lg:right-5">
      {open && (
        <div className="pop-in sculpt-card w-[290px] p-3 shadow-[0_16px_36px_rgba(21,25,34,0.32)]">
          <div className="flex items-center justify-between px-2 pb-2 pt-0.5 border-b border-[#c6ccd8]/50">
            <div className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-[#3559cb]">
              <IconFlask size={13} />
              Sculpted Light Navigator (S0–S7)
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-6 w-6 place-items-center rounded-lg text-[#606d81] hover:text-[#151922]"
            >
              <IconClose size={13} />
            </button>
          </div>

          {/* S0 to S7 State Inventory */}
          <div className="mt-2 space-y-1">
            {statesS0toS7.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  item.run();
                  setOpen(false);
                }}
                className={cn(
                  "flex h-8 w-full items-center gap-2 rounded-[10px] px-2 text-left text-[11.5px] font-semibold transition-all duration-120",
                  item.active
                    ? "sculpt-well text-[#3559cb]"
                    : "text-[#4d5566] hover:bg-white/60 hover:text-[#151922]"
                )}
              >
                <span
                  className={cn(
                    "grid h-4.5 w-6 place-items-center rounded-[5px] text-[9.5px] font-bold font-mono shrink-0",
                    item.active
                      ? "bg-[#3559cb] text-white"
                      : "bg-black/5 text-[#606d81]"
                  )}
                >
                  {item.code}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Toggles */}
          <div className="mt-2.5 border-t border-[#c6ccd8]/50 pt-2 space-y-1.5 px-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#4d5566]">
              <span>Daemon Engine</span>
              <button
                type="button"
                onClick={() => {
                  setEngineOnline(!engineOnline);
                  showToast(engineOnline ? "Engine Daemon Paused" : "Engine Daemon Resumed");
                }}
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                  engineOnline ? "bg-[#0e6f64]/15 text-[#0e6f64]" : "bg-[#7d4508]/15 text-[#7d4508]"
                )}
              >
                {engineOnline ? "Online" : "Paused"}
              </button>
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#4d5566]">
              <span>Calm Mode (No Motion)</span>
              <button
                type="button"
                onClick={() => {
                  setCalmMotion(!calmMotion);
                  showToast(calmMotion ? "Animations Active" : "Calm Mode Active");
                }}
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                  calmMotion ? "bg-[#3559cb]/15 text-[#3559cb]" : "bg-black/5 text-[#606d81]"
                )}
              >
                {calmMotion ? "Active" : "Normal"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Navigator Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Prototype state switch panel"
        className="sculpt-btn-raised flex h-9.5 items-center gap-2 px-3.5 text-[12px] font-bold text-[#4d5566] shadow-[0_6px_16px_rgba(21,25,34,0.18)] hover:text-[#151922]"
      >
        <IconLayers size={14} className="text-[#3559cb]" />
        <span>S0–S7 State Navigator</span>
        {open ? <IconChevron size={11} className="rotate-180" /> : <IconChevronUp size={11} />}
      </button>
    </div>
  );
}
