# DESTILL — DESIGN REFERENCE SPECIFICATION (R1)
**Candidate Identifier:** `DESIGN-REF-R1`  
**Target Design Persona:** Ana (iPhone Content Creator, CapCut Desktop/Mobile Editor)  
**Status:** DESIGN REFERENCE CANDIDATE — AWAITING PRODUCT OWNER VISUAL ACCEPTANCE  
**Material System:** Sculpted Light (Upper-Left Diffuse Illumination, Pearl-Ceramic Porcelain)

---

## 1. Visual Concept & Material Philosophy

Destill is an intelligent, local-first creative video-editing companion designed to distill ten minutes of raw footage into a coherent, high-retention short (~90s), complete with transparent editorial reasoning and a copyable CapCut EditPilot prompt.

Rather than adopting generic dark-mode SaaS dashboards or flat cards-within-cards, Destill is sculpted from a single tactile, satin-finished pearl-ceramic porcelain material. 

### Core Physical Principles

1. **Unilateral Upper-Left Light Vector:**
   - Illumination emanates consistently from 135° (top-left).
   - Convex objects display a delicate, luminous upper-left crest highlight and cast a soft lower-right diffuse ambient shadow.
   - Concave objects (milled ingestion wells, slider tracks, status pills) feature a soft inner shadow along the upper-left wall and a subtle specular rim along the lower-right lip.
2. **Material Levels (Non-Compete Elevation):**
   - **Level 0 (Flat Page Field):** Quiet neutral canvas (`#eef1f6`) with ambient daylight gradients.
   - **Level 1 (Sculpted Surface):** Gently raised porcelain workspace panels (`#f2f5f9`).
   - **Level 2 (Milled Inset Well):** Recessed functional areas (`#e8edf3`) milled into the material.
   - **Level 3 (Tactile Raised Control):** Elevated interactive components with pressed travel states.
   - **Level 4 (Dominant Graphite Primary Action):** Deep charcoal control (`#151922` to `#242b3a`) with bevel edge highlights, asserting unmistakable visual dominance.
3. **No Flattening Guarantee:**
   - Nuanced shadows and convex/concave reliefs are structural design invariants. They are calibrated for maximum optical subtlety, not eliminated.

---

## 2. Intended User Journey

The creator journey follows a calm, deterministic 6-step progression:

1. **Ingest & Verify (Home):**
   - Creator drops raw footage or selects the verified sample vlog (Lisbon trip, 18:36).
   - Local hardware decoding probes duration, resolution, size, and codec on-device.
2. **Context & Goal (Subordinated Settings):**
   - Platform (TikTok 9:16 vs Instagram Reels) and target duration (~90s) configured cleanly.
3. **Multimodal Analysis Simulation (Processing):**
   - Deterministic 5-stage progress (Prepare → Listen → Observe → Interpret → Review) with live progress ring.
4. **Evidence-Based Understanding (Screen D):**
   - Interactive 9:16 video preview with scrubber and yellow evidence markers.
   - 4 prioritized facets: Story Arc & Claims, Vocal Prosody & Pacing, Visual Framing, Evidence Catalog.
   - Clickable evidence anchors automatically seek video to the exact second.
5. **Editorial Decision (Screen F):**
   - Creator refines pacing (Tighter cut, Balanced context, or Climax focus).
   - Two-step deliberate confirmation recalculates proposed duration.
6. **Candidate Cut Review & Handoff (Screen E):**
   - Realistic 9:16 vertical short preview with word-by-word dynamic captions.
   - Honest labeling: `DEMO CANDIDATE PREVIEW — MP4 NOT RENDERED`.
   - Verified 1-click copy of the English CapCut EditPilot prompt.
   - 1-click download of the complete Edit Decision List (`.json`).

---

## 3. Screen-by-Screen Composition & Layout Math

### Desktop Layout (1440px Baseline)
- Outer workspace container: `max-w-[1400px] mx-auto px-6 lg:px-8`.
- Header: Follows the strict **Top Bar Contract** (Brand wordmark → 5 single-line navigation links → Language & creator context utilities).
- Home workspace: Centered `max-w-[920px]` container ensuring the **Milled Source Well** dominates the upper half and the **Graphite Action Button** anchors the bottom.
- Understanding & Result workspaces: Asymmetric 2-column split (Left column: 380px–410px sticky phone frame preview; Right column: flexible evidence/rationale cards).

### Mobile Transformation (390px / Touch Baseline)
- Single-column linear stack (`w-full px-4`).
- Phone preview remains full-width responsive with comfortable touch scrub zones.
- Secondary creative parameters disclosed progressively via toggle to prevent viewport congestion.
- Fixed elements capped to `<15%` viewport height via compact `BottomNav` (`h-12`).

---

## 4. Typography Scale & Contrast Discipline

Strict WCAG AA compliance ($>4.5:1$ contrast on all pearl surfaces) paired with anti-slop font selection:

| Role | Font Family | Size / Leading | Weight | Color Token | Contrast Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | *Plus Jakarta Sans* | 32px–42px / 1.1 | Bold (700) | `--ink` (`#151922`) | **13.8:1** (Passes AAA) |
| **Section Headings** | *Plus Jakarta Sans* | 18px–24px / 1.25 | Bold (700) | `--ink` (`#151922`) | **13.8:1** (Passes AAA) |
| **Body Prose** | *Plus Jakarta Sans* | 14px–15px / 1.6 | Regular / Medium | `--ink-muted` (`#4d5566`) | **5.9:1** (Passes AA) |
| **Supporting / Metadata** | *Plus Jakarta Sans* | 11.5px–13px / 1.4 | SemiBold (600) | `--ink-support` (`#606d81`) | **4.66:1** on surface, **5.12:1** on canvas (Passes AA) |
| **Timecode / Numeric** | *JetBrains Mono* | 11px–16px | Bold (700) | Tabular Numerals | **13.8:1** (Passes AAA) |

*Note: The previous `--ink-faint: #788296` (3.49:1, WCAG failure) has been completely replaced with calibrated `--ink-support: #606d81`.*

---

## 5. Spacing, Radii & Shadow Tokens

Concentric radius math ($r_{\text{inner}} = r_{\text{outer}} - \text{padding}$):

```css
--radius-shell: 32px;      /* Main application shells */
--radius-card: 28px;       /* Primary raised surface cards */
--radius-well: 22px;       /* Milled ingestion wells */
--radius-control: 18px;    /* Primary & secondary action buttons */
--radius-small: 12px;      /* Chips, badges, inner controls */
--radius-pill: 999px;      /* Knobs, status pills, circular badges */
```

### Physical Shadow Elevation Tokens

```css
/* Raised Surface (Level 1) */
--shadow-raised:
  7px 8px 17px rgba(154, 168, 188, 0.25),
  -7px -7px 17px rgba(255, 255, 255, 0.93),
  inset 0 1px 0 rgba(255, 255, 255, 0.62);

/* Raised Tactile Button (Level 3) */
--shadow-raised-small:
  3px 4px 9px rgba(154, 168, 188, 0.25),
  -3px -3px 9px rgba(255, 255, 255, 0.90),
  inset 0 1px 0 rgba(255, 255, 255, 0.65);

/* Milled Concave Well (Level 2) */
--shadow-inset:
  inset 4px 4px 9px rgba(154, 168, 188, 0.34),
  inset -4px -4px 9px rgba(255, 255, 255, 0.90);

/* Dominant Graphite CTA (Level 4) */
--shadow-cta:
  0 14px 26px -8px rgba(21, 25, 34, 0.45),
  6px 8px 16px rgba(154, 168, 188, 0.28),
  -6px -6px 16px rgba(255, 255, 255, 0.92),
  inset 0 1px 0 rgba(255, 255, 255, 0.25);
```

---

## 6. Interaction & Accessibility Invariants

1. **Keyboard-Operable Timeline Scrubbing:**
   - `ArrowLeft` / `ArrowRight`: Step backward / forward by 2s (or 10s with `Shift`).
   - `Home` / `End`: Jump directly to 0:00 / total duration.
   - `Space` / `Enter`: Toggle playback.
   - Timeline slider thumb uses dedicated concentric `.sculpt-thumb-knob`.
2. **Evidence Marker Affordances:**
   - Yellow timeline markers are accessible `<button>` tags with `role="button"` and unique `aria-label`.
   - Activating any marker seeks the video immediately to that timestamp and selects the corresponding observation.
3. **Truthful Asynchronous Clipboard Feedback:**
   - Awaits `navigator.clipboard.writeText()` resolution.
   - Displays positive "Copied" feedback only when verified. Displays an error toast when blocked by sandboxed iframes.
4. **Reduced Motion & Local Offline Hygiene:**
   - `@media (prefers-reduced-motion)` and manual `.calm` mode disable all keyframes and transitions.
   - Fallback system fonts (`-apple-system, BlinkMacSystemFont, "SF Pro Text"`) guarantee 100% offline functionality.
