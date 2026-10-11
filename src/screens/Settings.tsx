import { useState } from "react";
import { useApp } from "../lib/store";
import { LANG_OPTIONS, type Lang } from "../lib/i18n";
import { ScreenHead } from "../components/ScreenHead";
import { Button, Card, Pill, Segmented, SettingList, SettingRow, Toggle } from "../components/ui";
import {
  IconGlobe,
  IconInfo,
  IconLayers,
  IconLock,
  IconSettings,
  IconTrash,
  IconWave,
} from "../lib/icons";

export function Settings() {
  const {
    t,
    lang,
    setLang,
    engineOnline,
    setEngineOnline,
    hintsEnabled,
    setHintsEnabled,
    calmMotion,
    setCalmMotion,
    showToast,
  } = useApp();

  const [cacheSize, setCacheSize] = useState("2.1 GB");

  const handleClearCache = () => {
    setCacheSize("0 B");
    showToast(t("settStorageCleared"));
  };

  return (
    <div className="mx-auto w-full max-w-[800px] px-4 pb-24 pt-1 lg:px-6">
      <ScreenHead
        kicker={t("settTitle")}
        tone="accent"
        icon={<IconSettings size={13} />}
        title={t("settTitle")}
        sub={t("settSub")}
      />

      <div className="space-y-5">
        <Card className="px-5 py-2.5 sm:px-7">
          <SettingList>
            {/* Language Selection */}
            <SettingRow
              icon={<IconGlobe size={17} />}
              label={t("settLanguage")}
              desc="Interface labels and transcripts localization."
            >
              <Segmented<Lang>
                className="w-[170px]"
                value={lang}
                onChange={setLang}
                options={LANG_OPTIONS.map((l) => ({ value: l.id, label: l.label }))}
              />
            </SettingRow>

            {/* Privacy Architecture Statement */}
            <SettingRow
              icon={<IconLock size={17} />}
              label={t("settPrivacy")}
              desc={t("settPrivacyDesc")}
            >
              <Pill tone="mint">Local-First Sandbox</Pill>
            </SettingRow>

            {/* Local Engine Toggle */}
            <SettingRow
              icon={<IconWave size={17} />}
              label={t("settLocalEngine")}
              desc={t("settLocalEngineDesc")}
            >
              <div className="flex items-center gap-2">
                <Pill tone={engineOnline ? "mint" : "amber"}>
                  {engineOnline ? "Online" : "Paused"}
                </Pill>
                <Toggle
                  label={t("settLocalEngine")}
                  checked={engineOnline}
                  onChange={setEngineOnline}
                />
              </div>
            </SettingRow>

            {/* Model & Cache Storage */}
            <SettingRow
              icon={<IconLayers size={17} />}
              label={t("settStorage")}
              desc={t("settStorageDesc")}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[12.5px] font-bold text-[#151922]">{cacheSize}</span>
                <Button size="sm" variant="utility" icon={<IconTrash size={12} />} onClick={handleClearCache}>
                  {t("settClearStorage")}
                </Button>
              </div>
            </SettingRow>

            {/* Calm Motion Mode */}
            <SettingRow
              icon={<IconInfo size={17} />}
              label={t("settCalmMotion")}
              desc={t("settCalmMotionDesc")}
            >
              <Toggle
                label={t("settCalmMotion")}
                checked={calmMotion}
                onChange={setCalmMotion}
              />
            </SettingRow>

            {/* Hints Toggle */}
            <SettingRow
              icon={<IconInfo size={17} />}
              label={t("settHints")}
              desc={t("settHintsDesc")}
            >
              <Toggle
                label={t("settHints")}
                checked={hintsEnabled}
                onChange={setHintsEnabled}
              />
            </SettingRow>
          </SettingList>
        </Card>

        {/* Prototype Version Notice */}
        <div className="sculpt-well-sm p-4 text-center text-[12px] leading-relaxed text-[#606d81]">
          <strong className="text-[#151922] block mb-0.5">
            DESTILL — Design Reference R1 (Sculpted Light UI)
          </strong>
          Designed for creator Ana. Built in single end-to-end execution. Zero billable external API spending.
        </div>
      </div>
    </div>
  );
}
