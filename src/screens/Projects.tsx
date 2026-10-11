import { useApp } from "../lib/store";
import { ScreenHead } from "../components/ScreenHead";
import { Scene, type SceneKind } from "../components/Scene";
import { Button, Card, Pill } from "../components/ui";
import {
  IconArrowRight,
  IconCompare,
  IconFolder,
  IconPlus,
} from "../lib/icons";

interface ProjectItem {
  id: string;
  name: string;
  duration: string;
  meta: string;
  sceneKind: SceneKind;
  isKept: boolean;
}

export function Projects() {
  const { t, go, source, loadSample } = useApp();

  const demoItems: ProjectItem[] = [
    {
      id: "demo-lisbon",
      name: "Lisbon_trip_raw_0412.mov",
      duration: "18:36",
      meta: "TikTok • 4K ProRes",
      sceneKind: "dawn",
      isKept: true,
    },
    {
      id: "demo-market",
      name: "Market morning take.mov",
      duration: "12:10",
      meta: "Instagram • 1080p",
      sceneKind: "market",
      isKept: true,
    },
    {
      id: "demo-coast",
      name: "Coast highway walk.mp4",
      duration: "08:44",
      meta: "TikTok • 4K",
      sceneKind: "coast",
      isKept: false,
    },
    {
      id: "demo-forest",
      name: "Sintra forest talk.mov",
      duration: "15:20",
      meta: "TikTok • 1080p",
      sceneKind: "forest",
      isKept: true,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-1 lg:px-6">
      <ScreenHead
        kicker={t("projTitle")}
        tone="accent"
        icon={<IconFolder size={13} />}
        title={t("projTitle")}
        sub={t("projSub")}
        right={
          <Button
            variant="primary"
            size="md"
            icon={<IconPlus size={14} />}
            onClick={() => go("home")}
          >
            {t("projNewBtn")}
          </Button>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {demoItems.map((p) => (
          <Card key={p.id} hover className="flex flex-col gap-3 p-4">
            <div className="sculpt-well overflow-hidden p-1.5 rounded-[18px]">
              <div className="aspect-[16/10] overflow-hidden rounded-[14px]">
                <Scene kind={p.sceneKind} aspect="16/9" />
              </div>
            </div>

            <div className="px-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate text-[14.5px] font-bold text-[#151922] tracking-tight">
                    {p.name}
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-[#788296] font-mono">
                    {p.meta} • {p.duration}
                  </div>
                </div>

                <Pill tone={p.isKept ? "mint" : "amber"} dot>
                  {p.isKept ? t("statusKept") : t("statusDraft")}
                </Pill>
              </div>

              <div className="mt-3.5 flex items-center gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  iconRight={<IconArrowRight size={13} />}
                  onClick={() => {
                    if (!source) loadSample();
                    go("understanding");
                  }}
                >
                  View Understanding
                </Button>
                <Button
                  size="sm"
                  variant="utility"
                  tip="Compare candidate cut variations"
                  onClick={() => go("compare")}
                >
                  <IconCompare size={13} />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Add Source Well Card */}
        <button
          type="button"
          onClick={() => go("home")}
          className="sculpt-well flex min-h-[200px] flex-col items-center justify-center gap-2.5 p-5 text-center text-[#788296] hover:text-[#3559cb] transition-colors"
        >
          <span className="sculpt-btn-raised grid h-12 w-12 place-items-center rounded-full text-[#3559cb]">
            <IconPlus size={22} />
          </span>
          <div>
            <span className="block text-[14px] font-bold text-[#151922]">
              {t("projNewBtn")}
            </span>
            <span className="text-[11.5px] text-[#788296]">Drop raw footage to begin</span>
          </div>
        </button>
      </div>
    </div>
  );
}
