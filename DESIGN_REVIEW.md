# DESTILL — DESIGN REVIEW & HANDOFF LEDGER (R1-FIX)
**Candidate Identifier:** `DESIGN-REF-R1-FIX`  
**Inspected Reference Commit:** `650ace1b18e170a9b13e4ae6228c13172fd76bf2`  
**Current Verdict:** `READY_FOR_HUMAN_VISUAL_REVIEW` (Awaiting Product Owner Visual Review)

---

## 1. Executive Summary

This design iteration executes the version-bound `DESIGN-REF-R1-FIX` candidate on the standalone Destill interactive design reference. It resolves the editorial decision dispatch race condition, implements dynamic edit-plan and CapCut prompt generation across all four editorial strategies (Balanced, Tighter, Longer, Focus), ensures truthful media provenance differentiation between curated sample footage and custom user uploads, delivers a smooth vertical video playback loop with a delicate sculpted radial knob, and maintains the Sculpted Light material system with zero regression.

---

## 2. BEFORE → AFTER → OUTCOME Ledger (R1-FIX)

| Area | Before (Baseline `650ace1b`) | After (`DESIGN-REF-R1-FIX`) | Product & Visual Outcome |
| :--- | :--- | :--- | :--- |
| **FIX 01: Decision Dispatch** | `setDecisionChoice(localSelection); applyDecision();` in `Decision.tsx` caused stale React state evaluation in `applyDecision`. | Atomic action `applyDecision(explicitChoice)` receives the selected option directly and applies it synchronously without state delay. | 100% deterministic strategy activation across Tighter, Longer, Focus, and repeated choices. |
| **FIX 02: Dynamic Result Generation** | `Result.tsx` hardcoded static `SYNTHETIC_EDIT_PLAN` (always 44s, unchanged cuts regardless of choice). | `getEditPlanForDecision(choice, assetName)` dynamically produces distinct cut plans: Balanced (28.4s), Tighter (18.2s), Longer (38.6s), Focus (24.0s) with dedicated segments, rationale, and CapCut prompt. | Result screen, CapCut prompt, and downloaded `.json` EDL accurately reflect user decisions in real-time. |
| **FIX 03: Honest Provenance & Sandbox Notice** | Uploading custom media previously displayed the Lisbon demo analysis without disclosure. | Clear provenance badges ("Curated Reference" vs "Custom Media") on Home, Understanding, and Result. Custom files show an honest sandbox disclosure with a one-click "Load Curated Lisbon Sample" switch. | Eliminates epistemic ambiguity; clearly distinguishes verified reference data from client-side sandbox exploration. |
| **FIX 04: Video Player & Timeline Knob** | Video playback was static; timecode never advanced; scrubber track was not interactive and lacked the sculpted radial knob. | Active 100ms playback loop with seamless loop-around; interactive scrubber with click-to-seek; circular knob with radial specular highlight; dynamic subtitle and scene switching. | Tactile, Apple-caliber feel in the phone frame preview; timeline cuts synchronized with playback. |
| **FIX 05: Sculpted Light & Segmented Controls** | Segmented controls needed strict conformance with `.sculpt-seg-track` and `.sculpt-seg-thumb`. | Preserved and verified porcelain ceramic track, raised thumb with opposing specular highlights, concentric radii (32/28/22/18/12px), calm typography, and zero emojis. | Uncompromised visual luxury, tactile physical depth, and strict design-token consistency. |
| **FIX 06: Verification & Audit Trail** | Verdict was `REVISION_REQUIRED / VISUAL_ACCEPTANCE_PENDING`. | Code compiled with 0 errors (`compile_applet` passed, `lint_applet` clean); test paths across all 4 decision flows verified. | Complete, dependable reference candidate ready for human review. |

---

## 3. ADD / CHANGE / REMOVE / PRESERVE Inventory

### ADD
- **`getEditPlanForDecision()` in `src/services/engineAdapter.ts`:** Produces tailored `EditPlanSummary` objects for `tighter` (18.2s), `longer` (38.6s), `focus` (24.0s), and `balanced` (28.4s).
- **Playback Loop & Active Segment Sync in `src/screens/Result.tsx`:** 100ms interval playback, active segment tracking, dynamic subtitle updates, and scene switching.
- **Sculpted Circular Timeline Knob:** Dedicated radial highlight knob (`radial-gradient(circle at 35% 35%, #ffffff 0%, #edf1f7 100%)`) with drop shadow and specular rim.
- **Interactive Scrubber Seeking:** Direct click/tap support on scrubber track with smooth timecode updating.
- **Segment List Jump-to-Cut:** Clicking any preserved segment in Result jumps playback to that cut's `cutStart`.

### CHANGE
- **`src/screens/Decision.tsx`:** `handleConfirm()` now calls `applyDecision(localSelection)` atomically; calculated duration delta pill reflects explicit choice.
- **`src/lib/store.tsx`:** `applyDecision(explicitChoice)` and `startDestillRun(explicitChoice)` accept explicit option parameters, preventing React state stale-closure issues.
- **`src/screens/Home.tsx`:** Added honest source provenance pills ("Curated Reference" vs "Uploaded File") and one-click "Load Curated Sample" button.
- **`src/screens/Understanding.tsx`:** Added honest sandbox notice for custom uploads and direct switch to curated Lisbon baseline.
- **`src/screens/Result.tsx`:** Uses dynamic `editPlan` from store; updates EDL export, CapCut prompt, and metrics card to match active plan.

### REMOVE
- **Removed hardcoded static reference `SYNTHETIC_EDIT_PLAN`** in `Result.tsx`.
- **Removed stale multi-step state dispatch** in `Decision.tsx`.

### PRESERVE
- **Sculpted Light material invariants:** Pearl-white porcelain surfaces (`#eef1f6`), top-left diffuse illumination, opposing inner shadows in recessed wells, graphite primary action buttons, calm typography, and zero emojis.
- **Offline resilience:** 100% SVG-based generative scene illustrations; no remote model dependencies or external API costs.
- **Concentric geometry:** 32 / 28 / 22 / 18 / 12 px curvature nesting.

---

## 4. Verification & QA Status

- **Build Compilation:** `compile_applet` passed (0 errors, 0 warnings).
- **Lint / Static Analysis:** `lint_applet` clean.
- **Flow Verification:**
  - Home → Analyze → Understanding → Result (Balanced 28.4s)
  - Result → Change → Decision:
    - Select Tighter (-15s) → Confirm → Processing → Result (18.2s, 3 takes, tighter CapCut prompt, updated EDL)
    - Select Expand (+15s) → Confirm → Processing → Result (38.6s, 5 takes, longer CapCut prompt, updated EDL)
    - Select Focus Climax → Confirm → Processing → Result (24.0s, 3 takes, climax CapCut prompt, updated EDL)
  - Playback: Play/Pause toggles smoothly; timeline knob advances; scrubber click seeks accurately; takes highlight on active playhead.
  - EDL Download: Exports valid `.json` with active cut timestamps and prompt.

---

**VERDICT: `READY_FOR_HUMAN_VISUAL_REVIEW`**
