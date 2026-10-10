# DESTILL — HYBRID DESIGN & INTERACTIVE PROTOTYPE v0.2

**Local-first, AI-assisted video understanding and editing companion for creators (Ana).**

---

## 1. Executive Summary

Destill turns long raw video footage into a focused, high-retention short (e.g., 18 minutes down to ~45–90 seconds) with evidence-grounded rationale, transcript claims, prosodic analysis, and an English CapCut EditPilot prompt.

This standalone prototype (**DESTILL HYBRID v0.2 — PROPOSAL**) merges the single-screen low-friction UX of **Version A** with the modular component architecture and design primitives of **Version B**, while introducing the critical new core capability: **Screen 03 — Video Understanding**.

---

## 2. Product Architecture & Two Product Modes

Because the backend engine's first deliverable capability is **video understanding** (not automated video rendering), the prototype strictly distinguishes two modes:

1. **Analyze Mode (First Delivery Capability — Active):**
   - Ingests raw local footage without remote uploads.
   - Extracts semantic thesis, narrative story beats, verbal claims with retention suggestions, prosodic emphasis/pauses, and visual scene events.
   - Grounded in an interactive, clickable **Evidence Catalog** directly synchronized with the 9:16 video preview.
2. **Destill Mode (Future Editing Capability — Capability-Gated):**
   - Formulates a structured 5-segment assembly plan.
   - Generates the exact English CapCut EditPilot prompt for seamless creator handoff.
   - Previews future candidate cuts through explicitly labeled demo proxy frames and two-step editorial refinement decisions.

---

## 3. Key Design & UX Innovations

- **Unified Single-Screen Entry (Screen 01):** Empty dropzone and selected video card live in the same view. Probes real video metadata (`duration`, `aspect ratio`, `file size`) and gracefully displays `Unknown` where unprobed.
- **Resource Lifecycle Management:** Object URLs (`URL.createObjectURL`) are automatically revoked via `URL.revokeObjectURL` whenever a video is replaced, removed, or unmounted.
- **Multimodal Video Understanding (Screen 03):** 2-column layout (40% preview scrubber with yellow evidence markers, 60% tabbed insight panels for Message, Story, Speech, Delivery, Visuals, and Evidence). Clicking any evidence marker immediately seeks the preview to that timestamp.
- **Two-Step Editorial Decisions (Screen 05):** Deliberate selection followed by an explicit confirmation step (e.g., Longer +15s, Tighter -15s, Focus, Fresh Pass). Never abruptly restarts processing without confirmation.
- **Apple-Inspired Soft Neumorphism:** Pearl-white canvas (`#edf0f5`), gentle top-left lighting, raised tactile primary controls (`.neu-primary`), inset wells for fields (`.neu-inset`), and zero emoji clutter.
- **Full Trilingual Coverage:** 100% complete EN, IT, and DE translations across all screens, buttons, tooltips, and modals.
- **Responsive Architecture:** Desktop sidebar rail + tablet + mobile 390px bottom navigation bar with fluid touch targets.

---

## 4. Running the Prototype

```bash
# Development server (port 3000)
npm run dev

# Type check & lint
npm run lint

# Production build
npm run build
```

---

## 5. Prototype State Controller

A floating **Prototype State** controller is pinned in the bottom right corner. It allows testing any screen or edge case in one click:
- `Screen 01: Empty Source`
- `Screen 01: Source Selected`
- `Screen 02: Analysis Processing`
- `Screen 03: Video Understanding`
- `Screen 04: Result Preview`
- `Screen 05: Editorial Decision`
- **Error States:** `No Video Selected`, `Unsupported Format`, `Local Engine Paused`, `Draft Processing`, `Missing Consent`.

---

## 6. Privacy & Hardware Truth

- Original video files remain on the local machine.
- No remote telemetry or unprompted network calls.
- No API keys are requested or embedded.
- Backend automated rendering is marked truthfully as `NOT_IMPLEMENTED` in the capability contract.
