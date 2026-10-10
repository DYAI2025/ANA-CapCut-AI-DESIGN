# PRODUCT CHANGE LEDGER — DESTILL v0.2 PROPOSAL

This document records the exact changes made when merging Version A (UX Reference) and Version B (Technical Foundation) into the **DESTILL HYBRID v0.2** proposal.

---

## 1. BEFORE → AFTER → OUTCOME Matrix

| Dimension | Before (Version A & Version B Discrepancies) | After (Hybrid v0.2 Proposal) | Product Outcome |
| :--- | :--- | :--- | :--- |
| **Initial Source Ingestion** | Version B forced an intermediate "Ready" screen that added unnecessary friction. Version A had an integrated screen but lacked Version B's rich metadata cards. | **Single-Screen Home (Screen 01)** integrates Empty Dropzone and Selected Source card in one place. Real metadata probing with honest fallback (`Unknown`). | Reduced cognitive friction. Ana selects a file and immediately configures story parameters without wizard step proliferation. |
| **Primary Backend Capability** | Both prototypes ambiguously suggested that automated video rendering was already implemented. | **Explicit Dual Mode**: **Analyze** (First delivery capability: Multimodal Video Understanding) is primary. **Destill** (Editing & rendering) is capability-gated and presented as a future result preview. | Complete product truthfulness. Eliminates broken promises regarding local rendering while showcasing genuine video understanding value. |
| **Video Understanding Screen** | Neither version had a dedicated Screen 03 for multimodal semantic, prosodic, and visual analysis. | **Screen 03 — Video Understanding** introduced: 40% vertical preview with scrubber and yellow markers; 60% tabbed panels for Message thesis, Story beats, Transcript claims, Delivery prosody, Visual moments, and Evidence catalog. | Directly delivers on the project's Source-of-Truth backend requirement ("multimodal backend design: video understanding first"). |
| **Editorial Refinement** | Version B jumped straight to re-running on button click. Version A had a deliberate choice screen but lacked connection to candidate takes. | **Screen 05 — Decision** implements Version A's two-step interaction (Select option -> Preview duration adjustment -> Explicit confirm) combined with Version B's moment comparison. | Prevents accidental re-runs. Creator maintains ultimate editorial agency. |
| **Localization & Accessibility** | Version B had incomplete Italian and German strings. Neither had comprehensive reduced-motion styling. | **100% Typed Translations** in EN, IT, and DE across all modules. Global `.calm` mode and `@media (prefers-reduced-motion)` disables transitions and keyframes. | Full European creator accessibility with minimum 4.5:1 text contrast. |
| **Object URL Lifecycle** | Version B leaked object URLs on file replacement. | **Lifecycle Guard**: Object URLs are revoked via `URL.revokeObjectURL` whenever a file is replaced, removed, or unmounted. | Zero browser memory leaks during extended editing sessions. |

---

## 2. Exact Slice Operations: ADD / CHANGE / REMOVE / PRESERVE

### ADD
- **`src/screens/Understanding.tsx` (Screen 03):** Brand-new multimodal understanding experience with synchronized video scrubber, confidence scores, uncertainty disclosures, and clickable evidence anchors.
- **`src/types/contracts.ts`:** 12 structured TypeScript interfaces (`MediaAsset`, `CapabilityStatus`, `VideoUnderstandingReport`, `EditPlanSummary`, etc.) decoupling the frontend from proprietary backend schemas.
- **`src/services/engineAdapter.ts`:** Engine adapter boundary with `DemoEngineAdapter` and `ProductionEngineAdapter`.
- **Mode Switcher (`Analyze` vs `Destill`):** Top bar pill group that toggles between video understanding and candidate edit preview.
- **`hevcNotice` Banner:** Explicit guidance explaining that 10-bit HEVC and Apple ProRes are processed locally via Apple Silicon hardware decoding.
- **Verified Style Tags:** `ANA APPROVED`, `SUPPORTED`, and `CANDIDATE` badges on style presets to avoid falsely claiming presets are confirmed personal preferences.

### CHANGE
- **`src/screens/Home.tsx`:** Replaced the disjointed two-step flow with an integrated empty/ready experience. Probed video metadata dynamically without hardcoding duration.
- **`src/components/VideoPreview.tsx`:** Enhanced with real HTML5 `<video>` playback support, timeline scrubber, and evidence marker indicators.
- **`src/screens/Result.tsx`:** Clarified that the result is a candidate preview with a copyable CapCut EditPilot prompt rather than an exported MP4.
- **`src/lib/i18n.ts`:** Upgraded to strict TypeScript `Record<DictKey, string>` guaranteeing zero missing translation keys across English, Italian, and German.
- **`src/components/ui.tsx`:** Standardized neumorphic shadows, border radii, and button sizing across all screens.

### REMOVE
- **Removed Version B's `src/screens/Ready.tsx`:** Eliminated redundant screen transition; empty and source cards now live in `Home.tsx`.
- **Removed all emojis:** Enforced zero-emoji discipline across all code, text, badges, and tooltips in accordance with the design directives.
- **Removed fabricated performance claims:** Removed statements claiming the browser ran an on-device neural network or rendered an MP4 file.
- **Removed hardcoded English strings:** Every user-facing string is now translated via the `t()` helper.

### PRESERVE
- **Preserved Version B's Neumorphic Visual System:** Pearl-white surfaces, gentle top-left lighting, raised tactile primary buttons (`.neu-primary`), and inset wells (`.neu-inset`).
- **Preserved Version B's Modular Component Hierarchy:** `ScreenHead.tsx`, `TopBar.tsx`, `FlowTrail.tsx`, `VideoPreview.tsx`.
- **Preserved Version A's Generative SVG Scenes:** `dawn`, `coast`, `market`, `forest`, `city` frames in `Scene.tsx` for zero broken image dependencies.
- **Preserved CapCut Alignment:** Destill continues to target creator Ana as an intelligent companion leading into CapCut desktop and mobile workflows.
