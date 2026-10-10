import { useApp } from "../lib/store";
import { IconCheck } from "../lib/icons";

export function Toast() {
  const { toastMsg } = useApp();
  if (!toastMsg) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex justify-center px-4 lg:bottom-7">
      <div
        key={toastMsg.id}
        role="status"
        aria-live="polite"
        className="pop-in neu-raised flex h-11 items-center gap-2.5 rounded-full px-4 text-[13px] font-semibold text-[#1c2434] shadow-[0_8px_24px_rgba(30,40,70,0.25)]"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#1a886e] text-white">
          <IconCheck size={14} />
        </span>
        <span>{toastMsg.text}</span>
      </div>
    </div>
  );
}
