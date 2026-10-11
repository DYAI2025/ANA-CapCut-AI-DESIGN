# DESIGN SPECIFICATION — DESTILL “SCULPTED LIGHT” UI
**Document Version:** 1.0 · **Status:** DESIGN PROPOSAL ONLY · **Target User:** Ana (Creator, iPhone CapCut Workflow)

---

## 1. Aesthetic Rationale & Physical Lighting Model

Destill is styled as a precision-machined object composed from **warm-cool pearl ceramic, satin-coated soft material, and diffuse daylight**. It avoids flat SaaS grids, candy-colored neumorphic bloat, and dark glossy dashboards in favor of restrained, tactile Apple-adjacent digital product design.

### Lighting Vector Model (Non-Negotiable Invariant)
- **Illumination Origin:** Upper-Left (simulating broad daylight from 10 o'clock).
- **Convex / Raised Surfaces:** Upper-left outer edge receives soft diffuse illumination (`rgba(255, 255, 255, 0.93)`); lower-right outer edge receives a soft cast contact shadow (`rgba(154, 168, 188, 0.25)`). A 1px subtle top-edge gleam (`rgba(255, 255, 255, 0.62)`) defines tactile elevation.
- **Concave / Milled Inset Surfaces:** Upper-left inner wall is recessed and darker (`rgba(154, 168, 188, 0.34)`); lower-right inner rim catches reflected daylight (`rgba(255, 255, 255, 0.90)`).
- **Pressed State:** Smooth physical transition from raised to inset shadow profile (`--shadow-pressed`).
- **Alternating Relief Discipline:** 
  $$\text{Quiet Page Background} \longrightarrow \text{Raised Support Card} \longrightarrow \text{Milled Concave Well} \longrightarrow \text{Raised Tactile Control Inside}$$
  Prevents recursive raised-on-raised container mush.

---

## 2. Design Token System

### 2.1 Color Palette
```css
--bg: #eef1f6;              /* Soft pearl base background */
--bg-high: #f8fafc;         /* Diffuse light crest wash */
--surface: #f2f5f9;         /* Raised card body */
--surface-low: #e8edf3;     /* Milled well inner floor */
--ink: #151922;             /* High-contrast text (11.4:1 contrast ratio against #eef1f6) */
--ink-muted: #4d5566;       /* Supporting body and labels (min 5.2:1 contrast) */
--ink-faint: #788296;       /* Subordinate timestamps and borders */
--accent: #3559cb;          /* Restrained cobalt primary action accent */
--accent-soft: #e6ecff;     /* Highlight chip background */
--success: #0e6f64;         /* Semantic verified / local status */
--warning: #7d4508;         /* High-contrast amber for review calls */
--danger: #a8301f;          /* Blocked / error alerts */
--focus: #2f5bd3;           /* Accessible 2px focus ring */
```

### 2.2 Curvature & Radii Hierarchy
```css
--radius-shell: 32px;       /* Broad application workspace shell */
--radius-card: 28px;        /* Primary raised material cards */
--radius-well: 22px;        /* Milled source ingestion well */
--radius-control: 18px;     /* Tactile push buttons and segmented tracks */
--radius-small: 12px;       /* Chips, evidence tags, status pills */
--radius-pill: 999px;       /* Toggle switches, timeline thumb, full pills */
```

### 2.3 Paired Physical Shadows
```css
--shadow-shell:
  14px 16px 34px rgba(153, 165, 186, 0.20),
  -12px -12px 30px rgba(255, 255, 255, 0.90),
  inset 0 1px 0 rgba(255, 255, 255, 0.55);

--shadow-raised:
  7px 8px 17px rgba(154, 168, 188, 0.25),
  -7px -7px 17px rgba(255, 255, 255, 0.93),
  inset 0 1px 0 rgba(255, 255, 255, 0.62);

--shadow-raised-small:
  3px 4px 9px rgba(154, 168, 188, 0.25),
  -3px -3px 9px rgba(255, 255, 255, 0.90),
  inset 0 1px 0 rgba(255, 255, 255, 0.65);

--shadow-inset:
  inset 4px 4px 9px rgba(154, 168, 188, 0.34),
  inset -4px -4px 9px rgba(255, 255, 255, 0.90);

--shadow-inset-small:
  inset 2px 2px 5px rgba(154, 168, 188, 0.36),
  inset -2px -2px 5px rgba(255, 255, 255, 0.88);

--shadow-pressed:
  inset 3px 3px 7px rgba(154, 168, 188, 0.38),
  inset -3px -3px 7px rgba(255, 255, 255, 0.89);

--shadow-cta:
  0 14px 26px -8px rgba(21, 25, 34, 0.45),
  6px 8px 16px rgba(154, 168, 188, 0.28),
  -6px -6px 16px rgba(255, 255, 255, 0.92),
  inset 0 1px 0 rgba(255, 255, 255, 0.25);
```

---

## 3. Screen State Architecture (S0 – S7)

1. **S0 — Empty / Welcome:** Displays product promise, discrete local sandbox guarantee, and a milled source well (`sculpt-well`) with a circular medallion button.
2. **S1 — Source Selected:** Seamlessly renders the probed video file inside the same milled well without a layout reset. Probes duration, dimensions, and file size. Displays `Unknown` where unprobed.
3. **S2 — Capability / Consent Blocked:** Transparently communicates engine daemon or consent gating. Distinguishes browser preview limitations from FFmpeg offline engine capabilities.
4. **S3 — Explicit Demo Processing:** Deterministic progression through 5 stages (`Prepare`, `Listen`, `Observe`, `Interpret`, `Review`) with a tactile progress ring and accessible status copy.
5. **S4 — Evidence-Based Understanding (DEMO DATA):** Left 40% 9:16 interactive scrubber with yellow timeline markers; Right 60% tabbed panels (Message, Story, Speech, Delivery, Visuals, Evidence).
6. **S5 — Editing Decision / Refine (NEEDS_EDITOR_DECISION):** Two-step editorial refinement comparing Moment A vs. Moment B. Allows adjusting duration (+15s / -15s / Focus) before explicit confirmation.
7. **S6 — Honest Result / Next-Step:** Labeled as `PREVIEW_UNAVAILABLE / NOT_RENDERED`. Provides step-by-step English CapCut EditPilot prompt with copy-to-clipboard functionality.
8. **S7 — Error / Offline / Cancelled:** Calm recovery state with actionable retry and return buttons.

---

## 4. Four Material Closeups (Microcraft Criteria)

1. **Source Well (`.sculpt-well`):** Milled 22px corners, soft upper-left recessed shadow, lower-right inner rim catch light.
2. **Primary CTA (`.sculpt-primary`):** Tactile graphite button, 18px radius, fine upper bevel specular highlight, and 26px diffused contact shadow.
3. **Segmented Control (`.sculpt-seg-track` & `.sculpt-seg-thumb`):** Carved inset track with a raised sliding thumb.
4. **Slider Thumb (`.sculpt-range`):** Circular thumb with 3px concentric cobalt dot and paired contact drop shadow.
