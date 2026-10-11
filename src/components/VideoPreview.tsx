import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { IconPause, IconPlay } from "../lib/icons";
import type { MediaAsset } from "../types/contracts";
import { Scene, type SceneKind } from "./Scene";
import { fmtTime } from "../utils/formatters";
import { isSafeMediaUrl } from "../utils/security";

export interface EvidenceMarker {
  id: string;
  timestamp: number;
  label: string;
  category: "claim" | "story_beat" | "prosody" | "visual_moment" | "pause";
}

export function VideoPreview({
  asset,
  sceneKind = "dawn",
  ratio = "16/9",
  badge,
  overlay,
  scan,
  markers = [],
  currentTimeOverride,
  onTimeChange,
  className,
}: {
  asset?: MediaAsset | null;
  sceneKind?: SceneKind;
  ratio?: "16/9" | "9/16";
  badge?: ReactNode;
  overlay?: ReactNode;
  scan?: boolean;
  markers?: EvidenceMarker[];
  currentTimeOverride?: number;
  onTimeChange?: (sec: number) => void;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(currentTimeOverride ?? 0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const rawDuration = asset?.durationSeconds && asset.durationSeconds > 0 ? asset.durationSeconds : 1116;
  const duration = Number.isFinite(rawDuration) && rawDuration > 0 ? rawDuration : 1116;

  // Sync external time overrides (e.g. clicking evidence markers)
  useEffect(() => {
    if (currentTimeOverride !== undefined && Number.isFinite(currentTimeOverride)) {
      const safeTime = Math.max(0, Math.min(duration, currentTimeOverride));
      setCurrentTime(safeTime);
      if (videoRef.current) {
        videoRef.current.currentTime = safeTime;
      }
    }
  }, [currentTimeOverride, duration]);

  // Simulated timer for generative scenes when real video isn't playing
  useEffect(() => {
    const hasRealSafeUrl = asset?.objectUrl && isSafeMediaUrl(asset.objectUrl);
    if (!playing || (hasRealSafeUrl && !videoError)) return;
    const interval = window.setInterval(() => {
      setCurrentTime((t) => {
        const next = t + 0.5 >= duration ? 0 : t + 0.5;
        onTimeChange?.(next);
        return next;
      });
    }, 200);
    return () => window.clearInterval(interval);
  }, [playing, asset?.objectUrl, videoError, duration, onTimeChange]);

  const togglePlay = () => {
    const hasRealSafeUrl = asset?.objectUrl && isSafeMediaUrl(asset.objectUrl);
    if (videoRef.current && hasRealSafeUrl && !videoError) {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      } else {
        videoRef.current
          .play()
          .then(() => setPlaying(true))
          .catch(() => {
            // Browser playback blocked or codec unsupported, fallback to simulated scrubber
            setVideoError(true);
            setPlaying(true);
          });
      }
    } else {
      setPlaying((p) => !p);
    }
  };

  const pct = Math.min(100, Math.max(0, (currentTime / duration) * 100));

  const handleSeek = (clientX: number, target: HTMLDivElement) => {
    const rect = target.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const ratioPos = Math.max(0, Math.min(1, (clientX - rect.left) / width));
    const newTime = Math.round(ratioPos * duration);
    setCurrentTime(newTime);
    if (videoRef.current && !videoError) {
      videoRef.current.currentTime = newTime;
    }
    onTimeChange?.(newTime);
  };

  const hasSafeVideoUrl = !!(asset?.objectUrl && isSafeMediaUrl(asset.objectUrl));

  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-[26px] bg-[#0c101c] shadow-[0_12px_28px_rgba(30,40,70,0.25)] select-none",
        ratio === "9/16" ? "aspect-[9/16]" : "aspect-[16/9]",
        className
      )}
    >
      {/* Real Video Element if available, otherwise vector generative scene */}
      {hasSafeVideoUrl && !videoError ? (
        <video
          ref={videoRef}
          src={asset?.objectUrl}
          playsInline
          muted
          className="absolute inset-0 h-full w-full object-cover"
          onTimeUpdate={(e) => {
            const t = e.currentTarget.currentTime;
            setCurrentTime(t);
            onTimeChange?.(t);
          }}
          onEnded={() => setPlaying(false)}
          onError={() => setVideoError(true)}
        />
      ) : (
        <div className="absolute inset-0 h-full w-full">
          <Scene kind={sceneKind} aspect={ratio} />
        </div>
      )}

      {/* Atmospheric lighting scrim */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0d17]/80 via-transparent to-[#0a0d17]/30" />

      {/* Scanline overlay for processing state */}
      {scan && (
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:100%_4px]" />
      )}

      {/* Top Badge */}
      {badge && <div className="absolute left-3.5 top-3.5 z-20">{badge}</div>}

      {/* Play/Pause Center Action */}
      {!playing && (
        <div className="absolute inset-0 z-20 grid place-items-center">
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Play video"
            className="grid h-16 w-16 place-items-center rounded-full bg-white/80 text-[#5160e8] shadow-[0_10px_30px_rgba(20,28,60,0.4)] backdrop-blur-md transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <IconPlay size={24} className="ml-0.5" />
          </button>
        </div>
      )}

      {/* Custom Overlays */}
      {overlay}

      {/* Bottom Timeline Controls */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col gap-2 p-3.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
        {/* Timestamp & Play button */}
        <div className="flex items-center justify-between text-[11.5px] font-semibold text-white/90 tabular-nums">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-white hover:bg-white/35"
            >
              {playing ? <IconPause size={12} /> : <IconPlay size={12} className="ml-0.5" />}
            </button>
            <span>{fmtTime(currentTime)}</span>
          </div>
          <span>{fmtTime(duration)}</span>
        </div>

        {/* Timeline Scrub Track */}
        <div
          role="slider"
          aria-label="Timeline position"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={Math.round(currentTime)}
          tabIndex={0}
          onClick={(e) => handleSeek(e.clientX, e.currentTarget)}
          className="relative h-2.5 w-full cursor-pointer rounded-full bg-white/25"
        >
          {/* Progress fill */}
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7b8bff] to-[#1a886e]"
            style={{ width: `${pct}%` }}
          />

          {/* Evidence Markers */}
          {markers.map((m) => {
            const markerPct = Math.min(100, Math.max(0, (m.timestamp / duration) * 100));
            return (
              <span
                key={m.id}
                title={`${m.label} (${fmtTime(m.timestamp)})`}
                className="absolute top-1/2 h-3.5 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffea79] shadow-[0_0_6px_rgba(255,234,121,0.9)] hover:scale-125"
                style={{ left: `${markerPct}%` }}
              />
            );
          })}

          {/* Thumb */}
          <span
            className="neu-raised-xs absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
            style={{ left: `calc(${pct}% - 8px)` }}
          />
        </div>
      </div>
    </div>
  );
}
