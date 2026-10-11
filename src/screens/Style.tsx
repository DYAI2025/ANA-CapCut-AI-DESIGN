import { useApp, type StylePreset } from "../lib/store";
import { ScreenHead } from "../components/ScreenHead";
import { Card, OptionTile, Pill, SettingList, SettingRow, Slider, Toggle } from "../components/ui";
import {
  IconBolt,
  IconBook,
  IconGrid,
  IconMic,
  IconPalette,
  IconText,
  IconWave,
} from "../lib/icons";
import type { DictKey } from "../lib/i18n";

interface PresetItem {
  id: StylePreset;
  icon: typeof IconWave;
  labelKey: DictKey;
  descKey: DictKey;
  tagKey: DictKey;
  tagTone: "mint" | "accent" | "neutral";
}

const PRESETS: PresetItem[] = [
  {
    id: "calm",
    icon: IconWave,
    labelKey: "styleCalm",
    descKey: "styleCalmDesc",
    tagKey: "tagAnaApproved",
    tagTone: "mint",
  },
  {
    id: "punchy",
    icon: IconBolt,
    labelKey: "stylePunchy",
    descKey: "stylePunchyDesc",
    tagKey: "tagSupported",
    tagTone: "accent",
  },
  {
    id: "story",
    icon: IconBook,
    labelKey: "styleStory",
    descKey: "styleStoryDesc",
    tagKey: "tagSupported",
    tagTone: "accent",
  },
  {
    id: "clean",
    icon: IconGrid,
    labelKey: "styleClean",
    descKey: "styleCleanDesc",
    tagKey: "tagCandidate",
    tagTone: "neutral",
  },
];

export function Style() {
  const { t, styleConfig, setStyleConfig, showToast } = useApp();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-1 lg:px-6">
      <ScreenHead
        kicker={t("styleTitle")}
        tone="accent"
        icon={<IconPalette size={13} />}
        title={t("styleTitle")}
        sub={t("styleSub")}
      />

      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-7 items-start">
        {/* Left: Style Archetypes Grid with Verified Tags */}
        <div className="grid grid-cols-2 gap-3.5">
          {PRESETS.map((p) => {
            const Icon = p.icon;
            const isSelected = styleConfig.preset === p.id;

            return (
              <div key={p.id} className="flex flex-col gap-2">
                <OptionTile
                  icon={<Icon size={20} />}
                  label={t(p.labelKey)}
                  desc={t(p.descKey)}
                  selected={isSelected}
                  onClick={() => {
                    setStyleConfig({ preset: p.id });
                    showToast(`Active Style preset set to ${t(p.labelKey)}`);
                  }}
                />
                <div className="flex justify-center">
                  <Pill tone={p.tagTone} dot>
                    {t(p.tagKey)}
                  </Pill>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Rhythmic & Assembly Parameters Card */}
        <Card className="flex flex-col p-5.5 sm:px-7 sm:py-5">
          <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#788296] pb-2 border-b border-[#c6ccd8]/50">
            Assembly Rules
          </div>

          <SettingList>
            <SettingRow
              icon={<IconText size={17} />}
              label={t("prefCaptions")}
              desc={t("prefCaptionsDesc")}
            >
              <Toggle
                label={t("prefCaptions")}
                checked={styleConfig.captions}
                onChange={(v) => setStyleConfig({ captions: v })}
              />
            </SettingRow>

            <SettingRow
              icon={<IconMic size={17} />}
              label={t("prefSound")}
              desc={t("prefSoundDesc")}
            >
              <Toggle
                label={t("prefSound")}
                checked={styleConfig.sound}
                onChange={(v) => setStyleConfig({ sound: v })}
              />
            </SettingRow>

            <SettingRow
              icon={<IconWave size={17} />}
              label={t("prefMusic")}
              desc={t("prefMusicDesc")}
            >
              <Toggle
                label={t("prefMusic")}
                checked={styleConfig.music}
                onChange={(v) => setStyleConfig({ music: v })}
              />
            </SettingRow>

            {/* Pacing Frequency Slider */}
            <div className="flex flex-col gap-2 py-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold tracking-tight text-[#151922]">
                  {t("prefPace")}
                </span>
                <span className="font-mono text-[12.5px] font-bold text-[#3559cb]">
                  {styleConfig.pace}%
                </span>
              </div>
              <div className="px-0.5">
                <Slider
                  label={t("prefPace")}
                  min={10}
                  max={90}
                  step={5}
                  value={styleConfig.pace}
                  onChange={(v) => setStyleConfig({ pace: v })}
                />
                <div className="mt-1 flex justify-between text-[10.5px] font-mono text-[#788296]">
                  <span>Breathing (Calm)</span>
                  <span>Rapid Hook (Punchy)</span>
                </div>
              </div>
            </div>
          </SettingList>
        </Card>
      </div>
    </div>
  );
}
