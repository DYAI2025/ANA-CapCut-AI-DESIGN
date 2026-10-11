# DESTILL — DESIGN STATES & SCENARIOS (R1)
**Candidate Identifier:** `DESIGN-REF-R1`  
**Scope:** Demo Scenarios, State Transitions, Available Controls & Truthfulness Boundaries

---

## 1. Demo Scenario & Fictional Fixture Context

To ensure complete privacy and zero leakage of creator Ana's personal media, Destill runs on a **deterministic fictional reference scenario**:

- **Video Asset:** `Lisbon_trip_raw_0412.mov` (Travel vlog raw camera roll)
- **Raw Duration:** 18 minutes 36 seconds (1116s)
- **File Size:** 2.4 GB
- **Codec:** Apple ProRes 422 (Hardware-accelerated Metal decode)
- **Resolution:** 3840×2160 (16:9 widescreen source)
- **Core Thesis:** *"If you need 40 seconds to explain it, you lost the feed. Hook with the contrast between old Alfama streets and modern remote work within 3 seconds."*
- **Planned Target Short:** ~90 seconds (01:28 actual distilled assembly)
- **Target Platform:** TikTok (9:16 vertical) & Instagram Reels

---

## 2. Clickdummy Screen States (S0 through S7)

| State Code | Screen ID | Title | Key Surface Presentation | Available Click Actions |
| :--- | :--- | :--- | :--- | :--- |
| **S0** | `home` (empty) | Empty / Welcome | Deep Milled Well with floating medallion; formats list; "Load Demo Footage" CTA | Click dropzone to open native file picker; click "Load Demo Footage (18:36)" |
| **S1** | `home` (selected) | Source Loaded | 16:9 preview in well; probed metadata strip; progressive creative parameters | Replace source; remove source; adjust platform/duration; click "Analyze Video" |
| **S2** | `blocked` | Capability / Consent Gated | Sculpted circular medallion with warning tone; diagnostic breakdown | "Resume Engine Daemon"; "Settings & Consent"; "Back to Home" |
| **S3** | `processing` | Simulated Analysis | Progress ring (0–100%); 5 sequential stages; explicit `DEMO SIMULATION` pill | "Cancel" (aborts and restores pristine state safely) |
| **S4** | `understanding` | Video Understanding | 9:16 preview with yellow evidence markers; 4 prioritized facet tabs | Scrub timeline; click evidence markers; switch facet tabs; click "Preview Proposed Cut" |
| **S5** | `decision` | Editorial Refinement | Side-by-side candidate takes (A vs B); 4 choice tiles (Tighter, Longer, Focus, Balanced) | Select tile; inspect real-time duration recalculation; click "Apply Refinement & Update Plan" |
| **S6** | `result` | Proposed Cut & Handoff | 9:16 vertical player with dynamic captions; segment table; CapCut prompt box | Scrub candidate cut; KEEP / CHANGE / DROP feedback; Copy CapCut prompt; Download EDL `.json` |
| **S7** | `blocked` | Codec / Recovery State | Diagnostic panel distinguishing browser playback limits from FFmpeg offline engine | "Choose Other File"; "Explore with Demo Sample" |

---

## 3. Truthfulness & Data Provenance Boundaries

Destill enforces strict interface integrity so that simulated demo data is never misrepresented as production capability:

1. **Synthetic Data Provenance:**
   - When viewing analysis, the screen explicitly displays: *"VERIFIED SYNTHETIC REFERENCE SCENARIO — Lisbon raw footage (18:36). Local neural model execution pending for custom user media."*
2. **Unrendered Video Export Truthfulness:**
   - The result screen is explicitly badged: `DEMO CANDIDATE PREVIEW — MP4 NOT RENDERED`.
   - The application never simulates a fake progress bar ending in "Download Finished" for a nonexistent MP4 file.
3. **Genuine Handoff Artifacts:**
   - **CapCut EditPilot Prompt:** English text prompt copied to system clipboard with verified asynchronous write confirmation.
   - **Edit Decision List (EDL JSON):** Generates and downloads a real, structured `.json` data file with segment in/out points, duration math, and rationale.
4. **Offline Capability Truthfulness:**
   - Full typography and vector scenes render completely offline without requiring Google Fonts or remote CDN image assets.
