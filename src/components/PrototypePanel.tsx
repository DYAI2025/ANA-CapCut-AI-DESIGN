import { useState } from "react";
import { useApp, type BlockKind, type Screen } from "../lib/store";
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
    t,
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

  const journeys: {
    id: string;
    label: string;
    active: boolean;
    run: () => void;
  }[] = [
    {
      id: "empty",
      label: "Screen 01: Empty Source",
      active: screen === "home" && !source,
      run: () => {
        removeSource();
        go("home");
      },
    },
    {
      id: "ready",
      label: "Screen 01: Source Selected",
      active: screen === "home" && !!source,
      run: () => {
        ensureSource();
        go("home");
      },
    },
    {
      id: "proc",
      label: "Screen 02: Analysis Processing",
      active: screen === "processing",
      run: () => {
        ensureSource();
        go("processing");
      },
    },
    {
      id: "understand",
      label: "Screen 03: Video Understanding",
      active: screen === "understanding",
      run: () => {
        ensureSource();
        go("understanding");
      },
    },
    {
      id: "result",
      label: "Screen 04: Result Preview",
      active: screen === "result",
      run: () => {
        ensureSource();
        go("result");
      },
    },
    {
      id: "decision",
      label: "Screen 05: Editorial Decision",
      active: screen === "decision",
      run: () => {
        ensureSource();
        go("decision");
      },
    },
  ];

  const blockedStates: { id: BlockKind; label: string }[] = [
    { id: "nofile", label: "No Video Selected" },
    { id: "unsupported", label: "Unsupported Codec/Container" },
    { id: "unavailable", label: "Local Engine Paused" },
    { id: "notready", label: "Draft Still Processing" },
    { id: "consent_missing", label: "Missing User Consent" },
  ];

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2.5 lg:bottom-5 lg:right-5">
      {open && (
        <div className="pop-in neu-raised w-[260px] rounded-[26px] p-3 shadow-[0_16px_36px_rgba(30,40,70,0.3)]">
          <div className="flex items-center justify-between px-2 pb-2 pt-1 border-b border-[#cfd6e3]/50">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#5160e8]">
              <IconFlask size={13} />
              {t("protoPanelLabel")}
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-6 w-6 place-items-center rounded-lg text-[#6b7791] hover:text-[#1c2434]"
            >
              <IconClose size={13} />
            </button>
          </div>

          {/* Flow Journeys */}
          <div className="mt-2.5">
            <span className="block px-2 text-[10px] font-bold uppercase tracking-wider text-[#6b7791]">
              {t("protoPanelFlow")}
            </span>
            <div className="mt-1 space-y-1">
              {journeys.map((j) => (
                <button
                  key={j.id}
                  type="button"
                  onClick={() => {
                    j.run();
                    setOpen(false);
                  }}
                  className={cn(
                    "flex h-8 w-full items-center gap-2 rounded-xl px-2.5 text-left text-[12px] font-semibold transition-all duration-150",
                    j.active
                      ? "neu-inset-sm text-[#5160e8]"
                      : "text-[#4a566d] hover:bg-white/60 hover:text-[#1c2434]"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full shrink-0",
                      j.active ? "bg-[#5160e8]" : "bg-[#cfd6e3]"
                    )}
                  />
                  <span className="truncate">{j.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Edge Cases & Error Screens */}
          <div className="mt-3 border-t border-[#cfd6e3]/50 pt-2">
            <span className="block px-2 text-[10px] font-bold uppercase tracking-wider text-[#bd730a]">
              {t("protoPanelBlocked")}
            </span>
            <div className="mt-1 space-y-1">
              {blockedStates.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    triggerBlock(b.id, b.id === "unsupported" ? "recording_raw.mkv" : undefined);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex h-8 w-full items-center gap-2 rounded-xl px-2.5 text-left text-[12px] font-semibold transition-all duration-150",
                    screen === "blocked" && blockKind === b.id
                      ? "neu-inset-sm text-[#bd730a]"
                      : "text-[#4a566d] hover:bg-white/60 hover:text-[#1c2434]"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full shrink-0",
                      screen === "blocked" && blockKind === b.id ? "bg-[#bd730a]" : "bg-[#cfd6e3]"
                    )}
                  />
                  <span className="truncate">{b.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Engine Simulation Toggles */}
          <div className="mt-3 border-t border-[#cfd6e3]/50 pt-2 space-y-1.5 px-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#4a566d]">
              <span>Engine Status</span>
              <button
                type="button"
                onClick={() => {
                  setEngineOnline(!engineOnline);
                  showToast(engineOnline ? "Engine paused" : "Engine online");
                }}
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10.5px] font-bold",
                  engineOnline ? "bg-[#1a886e]/15 text-[#1a886e]" : "bg-[#bd730a]/15 text-[#bd730a]"
                )}
              >
                {engineOnline ? "Online" : "Paused"}
              </button>
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#4a566d]">
              <span>Calm Mode</span>
              <button
                type="button"
                onClick={() => {
                  setCalmMotion(!calmMotion);
                  showToast(calmMotion ? "Motion enabled" : "Motion calmed");
                }}
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10.5px] font-bold",
                  calmMotion ? "bg-[#5160e8]/15 text-[#5160e8]" : "bg-black/5 text-[#6b7791]"
                )}
              >
                {calmMotion ? "Active" : "Standard"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Panel Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Prototype state switch panel"
        className="neu-btn neu-raised flex h-10 items-center gap-2 rounded-full px-3.5 text-[12px] font-bold text-[#4a566d] shadow-[0_6px_16px_rgba(30,40,70,0.2)] hover:text-[#1c2434]"
      >
        <IconLayers size={14} className="text-[#5160e8]" />
        <span>Prototype State</span>
        {open ? <IconChevron size={12} className="rotate-180" /> : <IconChevronUp size={12} />}
      </button>
    </div>
  );
}
