import { useState } from "react";
import { useApp } from "../lib/store";
import { ScreenHead } from "../components/ScreenHead";
import { PhoneFrame, Scene, type SceneKind } from "../components/Scene";
import { Button, Card, Pill } from "../components/ui";
import { IconCheck, IconClock, IconCompare, IconSpark } from "../lib/icons";
import { fmtTime } from "../utils/formatters";

export function Compare() {
  const { t, targetDuration, setKeptCut, showToast, go } = useApp();
  const [selectedTake, setSelectedTake] = useState<"a" | "b">("a");

  const takes: {
    id: "a" | "b";
    label: string;
    scene: SceneKind;
    duration: number;
    hookStyle: string;
    pacing: string;
  }[] = [
    {
      id: "a",
      label: t("takeA"),
      scene: "dawn",
      duration: targetDuration,
      hookStyle: "Spontaneous confession at pier (00:18)",
      pacing: "Calm room-to-breathe cadence with 0.8s breath holds",
    },
    {
      id: "b",
      label: t("takeB"),
      scene: "coast",
      duration: Math.max(30, targetDuration - 15),
      hookStyle: "Direct attention statement (00:24)",
      pacing: "Punchy, immediate jump-cuts without transit buffer",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 pb-24 pt-1 lg:px-6">
      <ScreenHead
        kicker={t("cmpTitle")}
        tone="accent"
        icon={<IconCompare size={13} />}
        title={t("cmpTitle")}
        sub={t("cmpSub")}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:gap-7">
        {takes.map((take) => {
          const isSelected = selectedTake === take.id;

          return (
            <Card
              key={take.id}
              className="flex flex-col items-center gap-4.5 p-5.5 transition-all"
            >
              <div className="flex w-full items-center justify-between border-b border-[#c6ccd8]/50 pb-2">
                <div className="flex items-center gap-2">
                  <span className="grid h-5.5 w-5.5 place-items-center rounded-full bg-[#3559cb]/10 text-[11px] font-bold text-[#3559cb]">
                    {take.id.toUpperCase()}
                  </span>
                  <span className="text-[15.5px] font-bold text-[#151922] tracking-tight">
                    {take.label}
                  </span>
                </div>
                <Pill icon={<IconClock size={11} />}>{fmtTime(take.duration)}</Pill>
              </div>

              {/* 9:16 Video Frame */}
              <div className="w-full max-w-[210px]">
                <PhoneFrame>
                  <Scene kind={take.scene} aspect="9/16" />
                </PhoneFrame>
              </div>

              {/* Take Attributes */}
              <div className="w-full space-y-2 text-left text-[12px] text-[#4d5566]">
                <div className="sculpt-well-sm p-2.5">
                  <span className="font-bold text-[#151922] block mb-0.5">Hook Choice:</span>
                  {take.hookStyle}
                </div>
                <div className="sculpt-well-sm p-2.5">
                  <span className="font-bold text-[#151922] block mb-0.5">Rhythmic Profile:</span>
                  {take.pacing}
                </div>
              </div>

              {/* Select & Keep Action */}
              <Button
                variant={isSelected ? "primary" : "secondary"}
                size="lg"
                icon={isSelected ? <IconCheck size={15} /> : undefined}
                className="w-full"
                onClick={() => {
                  setSelectedTake(take.id);
                  setKeptCut(true);
                  showToast(`Selected Take ${take.id.toUpperCase()} as active candidate`);
                }}
              >
                {isSelected ? "Active Candidate" : `Choose Take ${take.id.toUpperCase()}`}
              </Button>
            </Card>
          );
        })}
      </div>

      <div className="mt-7 flex justify-center">
        <Button
          variant="secondary"
          size="md"
          icon={<IconSpark size={15} />}
          onClick={() => go("result")}
        >
          Review in Full Screen Result
        </Button>
      </div>
    </div>
  );
}
