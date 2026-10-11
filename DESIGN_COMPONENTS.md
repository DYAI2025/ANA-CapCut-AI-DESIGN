# DESTILL — DESIGN COMPONENTS REFERENCE (R1)
**Candidate Identifier:** `DESIGN-REF-R1`  
**Scope:** Reusable UI Primitives, Microgeometry, Tokens & Lighting Rationale

---

## 1. Milled Source-Video Well (`.sculpt-well`)

### Role & Visual Focal Point
The primary concave surface in the application. Represents an ingestion bay gently milled into the pearl-white ceramic plane.

### Lighting Rationale
- **Upper-Left Inner Shadow:** `inset 4px 4px 9px rgba(154, 168, 188, 0.34)` simulates the depth shadow cast by the elevated surrounding card edge.
- **Lower-Right Specular Inner Lip:** `inset -4px -4px 9px rgba(255, 255, 255, 0.90)` simulates light grazing the opposite interior wall.
- **Floor Gradient:** `linear-gradient(150deg, #e8edf3 0%, #f4f6fa 100%)`.

### Key States
- **Empty (S0):** Minimum height 360px, center-aligned, houses the floating medallion button, format guidance, and "Load Demo Footage (18:36)" shortcut.
- **Drag-Over:** Border highlighted with `rgba(53, 89, 203, 0.60)` and active outer ring.
- **Source Loaded (S1):** Houses the 16:9 responsive video preview, probed duration, file size, codec metadata, and replace/remove actions.

---

## 2. Graphite Primary Action (`.sculpt-primary`)

### Role & Visual Focal Point
The singular dominant control on each screen ("Analyze Video", "Preview Destill Result").

### Lighting Rationale
- High-contrast charcoal foundation (`#242b3a` to `#151922` to `#0d1017`).
- Upper-left white specular border rim: `inset 0 1px 0 rgba(255, 255, 255, 0.25)`.
- Multi-layer diffuse shadow: `0 14px 26px -8px rgba(21, 25, 34, 0.45)`, `6px 8px 16px rgba(154, 168, 188, 0.28)`, `-6px -6px 16px rgba(255, 255, 255, 0.92)`.

### Key States
- **Rest:** Elevation Level 4, crisp white typography, subtle outer crest.
- **Hover:** `translateY(-1.5px)` with brightness amplification (`1.08`).
- **Pressed (`:active`):** Shallow inset depression `translateY(1px) scale(0.99)` with `inset 0 2px 6px rgba(0, 0, 0, 0.45)`.
- **Disabled:** `opacity: 0.45`, grayscale filter, flattened elevation.

---

## 3. Segmented Control (`.sculpt-seg-track` & `.sculpt-seg-thumb`)

### Role
Compact selection mechanism for mutually exclusive choices (Platform, Pacing modes, Facet views).

### Lighting Rationale & Geometry
- **Track (`.sculpt-seg-track`):** Recessed well floor with `inset 2px 2px 5px rgba(154, 168, 188, 0.36)`. Padding: 4px.
- **Selection Thumb (`.sculpt-seg-thumb`):** Concentric raised porcelain thumb (`#ffffff` to `#f2f5f9`), rounded at `calc(18px - 4px) = 14px`, with ambient contact shadow `3px 4px 9px rgba(154, 168, 188, 0.25)` and `-3px -3px 9px rgba(255, 255, 255, 0.90)`.

### Key States
- **Selected Segment:** Ink `#151922`, bold text weight.
- **Unselected Segment:** Ink `#606d81` (WCAG AA compliant), hover shifts smoothly to `#151922`.

---

## 4. Circular Timeline Scrubber Knob (`.sculpt-thumb-knob`)

### Role & Audit Resolution
Replaces the outdated non-concentric `neu-raised-xs` class in `VideoPreview.tsx`.

### Microgeometry (100% & 200% Zoom)
- Strict circular geometry: `18px × 18px`, `border-radius: 999px`.
- Radial specular highlight: `radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.95) 0%, transparent 60%)`.
- Triple-layer drop & contact shadow:
  - `0 2px 5px rgba(21, 25, 34, 0.28)` (crisp ground contact shadow)
  - `0 4px 10px rgba(154, 168, 188, 0.35)` (ambient porcelain shadow)
  - `inset 0 1px 1px rgba(255, 255, 255, 0.95)` (crest rim highlight)

### Key States
- **Hover:** `scale(1.15)` with increased shadow spread.
- **Grabbed (`:active`):** `scale(1.05)`, cursor changes to `grabbing`.
- **Keyboard Focused (`:focus-visible`):** High-contrast 2px blue ring (`#3559cb`).

---

## 5. Evidence Marker & Anchors

### Role
Time-synchronized indicators marking claims, thesis points, prosody peaks, and visual moments on the video scrubber track.

### Styling & Interaction
- Yellow luminescent capsule: `h-3.5 w-1.5 rounded-full bg-[#ffea79]` with soft bloom `shadow-[0_0_6px_rgba(255,234,121,0.9)]`.
- **Interactive Button:** Rendered as `<button role="button" aria-label="...">`.
- Clicking seeks the video to the precise second and surfaces the corresponding observation card.

---

## 6. Video Preview Card (`VideoPreview.tsx`)

### Role
Immersive 16:9 (Source Ingestion) and 9:16 (Vertical Short Preview) playback canvas.

### Features
- Native HTML5 `<video>` support when safe local file URL is provided.
- Generative vector SVG scenes (`dawn`, `coast`, `market`, `forest`, `city`) for hermetic offline rendering without broken network images.
- Full keyboard scrub navigation: `ArrowLeft` / `ArrowRight` (+/-2s), `Home` / `End`, `Space`.
- Integrated audio play/pause toggle and elapsed/total duration readout.

---

## 7. Editorial Decision Tile (`OptionTile`)

### Role
Deliberate choice control for refining short-video duration and creative priorities.

### Styling
- Recessed/raised state toggle: Selected state converts outer raised card into a sculpted inset well with a distinctive 2px cobalt accent border (`#3559cb`).
- Badge indicators ("Suggested", "-15s", "+15s") in unboxed text or soft accent pills.
