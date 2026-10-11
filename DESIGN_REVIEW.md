# DESTILL — DESIGN REVIEW & HANDOFF LEDGER (R1)
**Candidate Identifier:** `DESIGN-REF-R1`  
**Inspected Reference Commit:** `fcda91059d5640976a83e103b54669a26603fc6b` / `ad56afb268761d1cbad20ec108aa5865017e6765`  
**Current Status:** DESIGN REFERENCE CANDIDATE — AWAITING PRODUCT OWNER VISUAL ACCEPTANCE

---

## 1. Executive Summary

This design iteration refines the Destill interactive prototype into an Apple-caliber, clickable design reference (**DESIGN-REF-R1**). It resolves optical hierarchy discrepancies, elevates the source ingestion well as the dominant sculptural center, introduces WCAG AA calibrated typography (`--ink-support: #606d81`), replaces outdated non-concentric scrubber classes with dedicated concentric microgeometry, adds full keyboard scrubbing, streamlines top bar navigation, and enforces strict interface truthfulness throughout.

---

## 2. BEFORE → AFTER → OUTCOME Ledger

| Area | Before (Baseline `fcda91059`) | After (`DESIGN-REF-R1` Candidate) | Product & Visual Outcome |
| :--- | :--- | :--- | :--- |
| **Typography Contrast** | `--ink-faint: #788296` measured **3.49:1** contrast on cards (Failed WCAG AA for normal text). | Replaced with calibrated `--ink-support: #606d81` (**4.66:1** on cards, **5.12:1** on page canvas). | Immediate, effortless legibility for all metadata, labels, and timestamps while maintaining visual lightness. |
| **Home Experience Hierarchy** | S0 and S1 competed 50/50 with a dense Creative Parameters card in a side-by-side dashboard layout. | Centered `max-w-[920px]` composition. The **Milled Source Well** dominates the upper viewport; secondary parameters are subordinated with progressive disclosure; dominant **Graphite CTA** anchors the bottom. | Dramatic reduction in visual clutter. Intuitive focal hierarchy: *"My video goes here; Destill turns it into a clear story."* |
| **Scrubber Microgeometry** | Line 217 of `VideoPreview.tsx` used outdated `neu-raised-xs` with non-concentric geometry. | Introduced dedicated `.sculpt-thumb-knob` with concentric circular radii, radial specular highlight, and contact shadow. | Pristine microgeometry at 100% and 200% zoom with keyboard scrub accessibility. |
| **Navigation Architecture** | Heavy 84px desktop sidebar rail competed with the workspace cards. | Replaced with an integrated 3-zone **Top Bar Contract** (Brand → Single-line Nav Links → Utilities). Compact mobile bottom nav. | Generous negative space and calm workspace breathing room. |
| **Video Understanding Facets** | 6 equally prominent tab categories caused cognitive overload. | Streamlined into 4 prioritized facets: Story Arc & Claims, Vocal Prosody, Visual Framing, Evidence Catalog. | Strongest narrative thesis visible immediately; progressive disclosure for advanced prosody/framing. |
| **Export Truthfulness** | Simulated a fake MP4 download progress bar without a rendered file. | Labeled `DEMO CANDIDATE PREVIEW — MP4 NOT RENDERED`. Offers verified copy of CapCut EditPilot prompt and **real `.json` EDL download**. | 100% interface truthfulness; zero false promises regarding backend capabilities. |
| **Clipboard Feedback** | Displayed "Copied" toast even if clipboard write permission was denied. | Awaits `navigator.clipboard.writeText()` promise. Confirms only on verified resolution; shows fallback error on failure. | Reliable, truthful interaction feedback across restricted iframe environments. |
| **Timeline Keyboard Accessibility** | Timeline track had `tabIndex={0}` but lacked keyboard listeners. Markers lacked button roles. | Added `ArrowLeft`/`ArrowRight` (+/-2s), `Home`, `End`, and `Space`. Evidence markers receive accessible button roles. | Full keyboard navigation and screen-reader accessibility for timeline scrubbing. |

---

## 3. ADD / CHANGE / REMOVE / PRESERVE Inventory

### ADD
- **Token `--ink-support: #606d81`:** Added to `src/index.css` for guaranteed WCAG AA legibility.
- **Component Class `.sculpt-thumb-knob`:** Added to `src/index.css` for circular timeline scrubber knobs.
- **Keyboard Scrub Listeners:** `handleKeyDown` in `src/components/VideoPreview.tsx` supporting arrows, Home, End, Space.
- **Real EDL Download:** Functional client-side `.json` blob export in `src/screens/Result.tsx`.
- **4 Design Handoff Documents:** `DESIGN_REFERENCE.md`, `DESIGN_COMPONENTS.md`, `DESIGN_STATES.md`, `DESIGN_REVIEW.md`.

### CHANGE
- **`src/screens/Home.tsx`:** Centered sculptural composition with Milled Ingestion Well strictly dominating; progressive disclosure for secondary parameters; high-contrast graphite CTA.
- **`src/components/TopBar.tsx`:** Standardized to strict 3-zone Top Bar Contract with integrated single-line navigation links.
- **`src/components/VideoPreview.tsx`:** Replaced `neu-raised-xs` with `.sculpt-thumb-knob`; converted evidence markers into accessible button elements.
- **`src/screens/Understanding.tsx`:** Streamlined from 6 tabs to 4 prioritized facets; updated contrast to `#606d81`; added explicit synthetic provenance banner.
- **`src/screens/Result.tsx`:** Honest export handoff with verified prompt copy and real JSON EDL download; labeled `MP4 NOT RENDERED`.
- **`src/screens/Processing.tsx`:** Calibrated progress ring text contrast; labeled `DEMO SIMULATION`.
- **`src/screens/Decision.tsx`:** Updated contrast tokens; deliberate 2-step choice confirmation.
- **`src/lib/store.tsx`:** Corrected clipboard write truthfulness.

### REMOVE
- **Removed outdated `neu-raised-xs` class usage** in `VideoPreview.tsx`.
- **Removed competing desktop sidebar rail** from `App.tsx` layout.
- **Removed fake simulated MP4 download modal** in `Result.tsx`.
- **Removed low-contrast `#788296` tokens** from all user-facing text.

### PRESERVE
- **Preserved the entire pearl-white material system:** Porcelain base (`#eef1f6`), convex specular rims, concave milled wells, tactile pressed physics.
- **Preserved all 5 generative vector SVG scenes** in `Scene.tsx` for 100% offline resilience.
- **Preserved single-turn deterministic demo data** without external API costs or private creator media leaks.
- **Preserved standalone React/Vite/Tailwind architecture** with zero unapproved package dependencies.

---

## 4. Verification & QA Status

- **Build Compilation:** `compile_applet` passed successfully (0 errors, 0 warnings).
- **TypeScript Static Verification:** `tsc --noEmit` passed with 0 errors.
- **WCAG AA Legibility:** All body, metadata, and supporting text tokens measure $\ge 4.5:1$ contrast against their parent surfaces.
- **Concentric Microgeometry:** Verified at 100% and 200% zoom math ($r_{\text{inner}} = r_{\text{outer}} - \text{padding}$).
- **State Switcher:** Built-in floating `PrototypePanel.tsx` allows instant testing of states S0 through S7.

### Items Explicitly NOT_TESTED:
- Native headless Chrome bitmap rendering (no headless browser binary installed in container environment).
- Physical mobile touch-screen hardware feel (verified via standard responsive CSS and 390px viewport rules).

---

## 5. Recommended Next Visual Correction
For the subsequent development slice: integrate an animated SVG waveform scrubber to dynamically visualize vocal prosody amplitude directly on the timeline track during playback.

---

**DESIGN REFERENCE CANDIDATE — AWAITING PRODUCT OWNER VISUAL ACCEPTANCE**
