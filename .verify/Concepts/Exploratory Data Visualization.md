---
target: Concepts/Exploratory Data Visualization.md
created: 2026-10-10
---

## [C-001] Validation pass
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Every claim against r4ds (exploratory vs presentation = §11.1; plot-by-type map = §1.4-1.5; variation, outliers, zero-coded missing, zoom = §10.3; densities/proportions for unequal groups = §10.5.1 and §1.5.2; overplotting fixes = §10.5.3; bin width = §1.4.2; covariation questions = §10.6). Examples: plot choices match §1.4-1.5 and §10.5; 12,000/30,000 = 40%, 6,000/10,000 = 60%; direct mix 60/30/10, agency 40/40/20 — match. Tip: DISC-DA 5.c and 6 = syllabus. Links resolve.
- sources_checked: Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.11 Communication, §11.1: exploratory plots — variables known before looking, made for a purpose, looked at quickly, tens or hundreds per analysis mostly thrown away; communication plots for an audience without the background, made self-explanatory, sha256:0756a2408a456cd5dc71f64d18a17f636dd57cfea2a817568f38689421eab088 — https://r4ds.hadley.nz/communication.html; Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.1 'Data visualization', §1.4.1-1.4.2 bar chart / histogram / density; §1.5.1-1.5.3 side-by-side box plots, stacked bar plots (position = "fill" for relative frequency), scatterplots; §1.5.4 extra aesthetics clutter, facets, sha256:871721caf69ea711517d9a4f0f627806da4200f6f7fd0068aa89530943339ad4 — https://r4ds.hadley.nz/data-visualize.html; Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.10 'Exploratory data analysis', §10.3.1-10.3.2 typical/rare/unusual values, clusters, zero-coded missing, coord_cartesian zoom, repeat with and without outliers; §10.5.1 density when group sizes differ; §10.5.2 geom_tile counts; §10.5.3 overplotting: alpha, geom_bin2d/geom_hex, cut_width boxplots; §10.6 pattern questions, sha256:ab13c323616810e786eb9f6298ed5d4b9bc50d1cebfb753d2725f91684553432 — https://r4ds.hadley.nz/EDA.html; The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf
- note: Medium: r4ds (rank 3; its 1st ed. is a PCPA reading). The tip's description of DISC-DA question shapes is study guidance (the only public statement of question form is CAS's 'application-based multiple-choice'); its topic placement was checked against the DISC DA syllabus.
