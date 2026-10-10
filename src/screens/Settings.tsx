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
    <div className="mx-auto w-full max-w-[800px] px-4 pb-24 pt-2 lg:px-6">
      <ScreenHead
        kicker={t("settTitle")}
        tone="accent"
        icon={<IconSettings size={13} />}
        title={t("settTitle")}
        sub={t("settSub")}
      />

      <div className="space-y-6">
        <Card className="px-6 py-3 sm:px-8">
          <SettingList>
            {/* Language Selection */}
            <SettingRow
              icon={<IconGlobe size={18} />}
              label={t("settLanguage")}
              desc="Active localization for interface labels and transcripts."
            >
              <Segmented<Lang>
                className="w-[180px]"
                value={lang}
                onChange={setLang}
                options={LANG_OPTIONS.map((l) => ({ value: l.id, label: l.label }))}
              />
            </SettingRow>

            {/* Privacy Architecture Statement */}
            <SettingRow
              icon={<IconLock size={18} />}
              label={t("settPrivacy")}
              desc={t("settPrivacyDesc")}
            >
              <Pill tone="mint">Local-First</Pill>
            </SettingRow>

            {/* Local Engine Toggle */}
            <SettingRow
              icon={<IconWave size={18} />}
              label={t("settLocalEngine")}
              desc={t("settLocalEngineDesc")}
            >
              <div className="flex items-center gap-2.5">
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
              icon={<IconLayers size={18} />}
              label={t("settStorage")}
              desc={t("settStorageDesc")}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[13px] font-bold text-[#1c2434]">{cacheSize}</span>
                <Button size="sm" variant="utility" icon={<IconTrash size={13} />} onClick={handleClearCache}>
                  {t("settClearStorage")}
                </Button>
              </div>
            </SettingRow>

            {/* Calm Motion Accessibility Mode */}
            <SettingRow
              icon={<IconInfo size={18} />}
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
              icon={<IconInfo size={18} />}
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

        {/* Prototype Version & Definition of Ready Notice */}
        <div className="rounded-[24px] bg-black/5 p-5 text-center text-[12px] leading-relaxed text-[#6b7791]">
          <div className="font-semibold text-[#1c2434] mb-1">
            DESTILL HYBRID v0.2 — DEFINITION OF READY ARTIFACT
          </div>
          Designed autonomously for creator Ana. Separates multimodal video understanding from automated cut generation.
          Zero external billable API spending.
        </div>
      </div>
    </div>
  );
}
