# DESTILL — Premium Sculpted Light UI Refinement Specification
**Status:** DESIGN PROPOSAL — PRODUCT OWNER APPROVAL REQUIRED  
**Reference Target Commit:** `fcda91059d5640976a83e103b54669a26603fc6b`  
**Artifact URL:** `/proposal.html`  

---

## 1. Executive Summary & Objective

Destill is a local-first, AI-assisted video editing companion for creators (Ana). This refinement builds upon the established soft neumorphic physical identity, resolving optical hierarchy discrepancies, correcting low-contrast typography, fixing micro-geometric inaccuracies, and enforcing strict interface truthfulness across all user journeys.

---

## 2. Protected Design Invariants (Non-Negotiable)

1. **Pearl-White Sculpted Ceramic Material Base:** Warm neutral foundation (`#eef1f6` page canvas, `#f8fafc` ambient crest highlight, `#f2f5f9` surface plane).
2. **Physically Coherent Upper-Left Light Vector:** Luminous upper-left specular rim (`rgba(255, 255, 255, 0.70–0.95)`), lower-right diffuse contact shadow (`rgba(154, 168, 188, 0.25–0.38)`).
3. **Milled Recessed Wells:** Opposing inner shadow structure (darker upper-left inner bevel, luminous lower-right inner rim).
4. **Concentric Radii Hierarchy:**
   - 32px Outer Shell
   - 28px Card Surfaces
   - 22px Milled Ingestion Wells
   - 18px Primary Control Buttons
   - 12px Secondary Chips, Badges & Thumbs
   - 999px Circular Knobs & Pills
5. **Anti-Flatness Guarantee:** No flattening of layered shadows, no generic glassmorphic blur substitutions, and no generic SaaS dashboard aesthetics.

---

## 3. BEFORE → AFTER → OUTCOME Product Change Ledger

| Area | Before (Commit `fcda91059`) | Proposed After (v0.2.1 Refinement) | Product & Visual Outcome |
| :--- | :--- | :--- | :--- |
| **Typography Contrast** | `--ink-faint: #788296` yielded **3.49:1** contrast on `#f2f5f9` surface (Fails WCAG AA for normal text). | Introduce calibrated `--ink-support: #606d81` (**4.66:1** contrast on `#f2f5f9` cards, **5.12:1** on `#eef1f6` background). | Immediate legibility for all small metadata labels, timestamps, and captions without breaking visual lightness. |
| **Microgeometry in Scrubber** | Line 217 of `src/components/VideoPreview.tsx` used legacy `neu-raised-xs` with non-concentric circular geometry. | Update to dedicated `sculpt-thumb-knob` with concentric circular radius, radial specular crest, and keyboard focus ring. | Pristine micro-geometry at 100% and 200% zoom with full arrow-key scrub accessibility. |
| **Home Experience Hierarchy** | S0 (Empty) and S1 (Selected) competed with secondary creative parameters (platform & duration). | Group secondary creative parameters into an integrated recessed panel with progressive disclosure. The source ingestion well and the primary action button (`Analyze Video`) strictly dominate the viewport. | Reducation in visual clutter; clear focal point for first-time and returning creators. |
| **Interface Truthfulness (Data Provenance)** | When a user uploaded an arbitrary video, synthetic sample analysis could be misconstrued as real local AI inference. | Introduce explicit provenance disclosure: *"Showing verified synthetic reference analysis. Local neural model execution pending."* Capability `automatedMp4Rendering` remains explicitly `NOT_IMPLEMENTED`. | Complete transparency; zero false claims regarding unimplemented backend capabilities. |
| **Clipboard Interaction Truthfulness** | Toast displayed "Copied" immediately even if the clipboard API failed or permissions were denied. | Await `navigator.clipboard.writeText()` promise resolution. Display positive confirmation only on verified resolution; provide visual inline copy buffer on failure. | No deceptive feedback in restrictive browser environments. |
| **Timeline Keyboard Accessibility** | Timeline track in `VideoPreview.tsx` had `tabIndex={0}` but lacked keyboard listeners. Evidence markers lacked accessible button roles. | Add `onKeyDown` supporting `ArrowLeft` (-2s), `ArrowRight` (+2s), `Home` (0s), `End` (duration), `Space` (Play/Pause). Evidence markers receive `role="button"` and `aria-label`. | Full keyboard navigation and screen-reader accessibility for fine-grained scrub operations. |
| **Local-First Network Hygiene** | Direct Google Fonts stylesheet `<link>` in `index.html` created an external network dependency. | Implement robust system font stack fallback (`-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI"`) with `font-display: swap`, ensuring complete offline functionality. | Truthful local-first execution without network rendering blockers. |
| **Localization Completeness** | Hardcoded English strings in `src/screens/Home.tsx` ("Creative Parameters", "Selected Video Source", "Hardware Decoded"). | Integrated all labels into `src/lib/i18n.ts` across English (`en`), Italian (`it`), and German (`de`) with width verification on narrow viewports. | Seamless internationalization for European creator community. |

---

## 4. ADD / CHANGE / REMOVE / PRESERVE Inventory

### ADD
- **Token `--ink-support: #606d81`:** Added to `src/index.css` for guaranteed WCAG AA legibility on all pearl surfaces.
- **Micro-token `.sculpt-thumb-knob`:** Added to `src/index.css` for concentric timeline slider thumb styling.
- **Keyboard Scrub Navigation:** Added `ArrowLeft`, `ArrowRight`, `Home`, `End`, and `Space` handlers to `src/components/VideoPreview.tsx`.
- **Verified Provenance Banner:** Added contextual badge distinguishing synthetic demo evidence from user media in `src/screens/Understanding.tsx`.
- **Localization Keys:** Added `sourceWellTitleEmpty`, `sourceWellTitleSelected`, `creativeParamsTitle`, `hardwareDecodedLabel` to `src/lib/i18n.ts`.

### CHANGE
- **`src/components/VideoPreview.tsx`:** Replaced outdated `neu-raised-xs` with `.sculpt-thumb-knob`; added accessible roles and aria labels to timeline markers.
- **`src/screens/Home.tsx`:** Refined surface hierarchy to elevate the Milled Ingestion Well; replaced low-contrast `#788296` text classes with `#606d81`; localized remaining strings.
- **`src/index.css`:** Calibrated shadow spreads and color contrast tokens; unified physical lighting angles.
- **`src/lib/store.tsx`:** Hardened clipboard feedback to only trigger positive toast on verified asynchronous write resolution.
- **`index.html`:** Refined font loading strategy to guarantee full offline rendering without external network blockers.

### REMOVE
- **Removed outdated `neu-raised-xs` class usage** in `VideoPreview.tsx`.
- **Removed low-contrast `#788296` tokens** from small metadata and timestamp displays.
- **Removed optimistic (unverified) clipboard toasts.**

### PRESERVE
- **Preserved all 5 core surface levels:** S0 flat page backdrop, S1 card surfaces, S2 milled recessed wells, S3 graphite tactile CTA, S4 floating prototype controller.
- **Preserved all 5 generative vector SVG scenes** in `Scene.tsx` (`dawn`, `coast`, `market`, `forest`, `city`).
- **Preserved the standalone React/Vite/Tailwind architecture** with zero added external package dependencies.
- **Preserved strict definition-of-ready boundaries:** No production commits, no backend modifications, no billable API invocations.

---

## 5. Expected Changed Files

1. `src/index.css` (tokens, legibility tokens, microgeometry)
2. `src/components/VideoPreview.tsx` (scrubber thumb microgeometry, keyboard navigation, accessible markers)
3. `src/screens/Home.tsx` (hierarchy balance, progressive disclosure, localized strings)
4. `src/screens/Understanding.tsx` (provenance disclosures, contrast refinement)
5. `src/screens/Result.tsx` (honest rendering disclosures, verified clipboard resolution)
6. `src/lib/store.tsx` (verified clipboard resolution, localized status updates)
7. `src/lib/i18n.ts` (complete EN/IT/DE translation parity for new tokens)
8. `index.html` (offline system font stack hygiene)
9. `QA_REPORT.md` (updated QA audit and verification evidence)

---

## 6. Acceptance Criteria & Verification Matrix

- [ ] **Legibility:** All text elements measure ≥ 4.5:1 contrast against their rendered parent surfaces.
- [ ] **Microgeometry:** Timeline slider knob in `VideoPreview.tsx` exhibits concentric circular radii and specular highlight without outdated utility classes.
- [ ] **Keyboard Accessibility:** Timeline slider can be scrubbed in 2-second increments using `ArrowLeft` and `ArrowRight`, and toggled with `Space`.
- [ ] **Data Provenance:** The interface explicitly communicates when synthetic demo analysis is displayed.
- [ ] **Clipboard Truthfulness:** Denying clipboard permissions or encountering a write error displays a fallback error rather than a false "Copied" toast.
- [ ] **Responsive Integrity:** 1440×900, 1280×800, 390×844, and 320px viewports render without horizontal overflow, text clipping, or broken touch targets.
- [ ] **Offline Execution:** App functions completely offline without active internet connectivity.
- [ ] **Zero Compilation/Lint Errors:** `tsc --noEmit` and `vite build` pass with 0 warnings/errors.

---

## 7. Negative Cases & Error Boundaries

1. **Negative Case 1: Corrupted or Unsupported Video Ingestion**
   - User drops an empty 0-byte file or an unreadable `.mkv` container.
   - *Expected Behavior:* Ingestion cleanly triggers the Blocked/Error state (`Screen 06`) with diagnostic metadata and a "Choose Other File" recovery action without unhandled JavaScript exceptions.
2. **Negative Case 2: Restricted Clipboard Permissions**
   - User runs the app in an iframe where clipboard permissions are denied.
   - *Expected Behavior:* System catches permission rejection, avoids displaying "Copied", and reveals the raw text inside an accessible `<pre>` buffer.
3. **Negative Case 3: Offline Launch**
   - User launches the prototype with internet disconnected.
   - *Expected Behavior:* System font stack (`-apple-system, BlinkMacSystemFont`) renders immediately without layout shift or missing glyphs.

---

## 8. Rollback Boundaries

- All changes are strictly isolated to the standalone design repository.
- Changes can be rolled back atomically via Git without affecting the separate production editing engine or Python backend harness.

---

**STATUS: DESIGN PROPOSAL COMPLETE — AWAITING PRODUCT OWNER APPROVAL BEFORE IMPLEMENTING.**
