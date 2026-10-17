---
target: Concepts/Model Implementation.md
created: 2026-10-17
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: verified
- confidence: medium
- checks_run: definition, formulas and every bullet checked against the routed reading pages; every worked example recomputed before comparison; [[links]] and $$ balance checked
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §3.2, §3.8-3.9, §9.1, PDF pp.42-44, 99-100, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; FSCO, Technical Notes for Automobile Insurance (Oct 2016), §16, PDF p.8, sha256:b2ca7a6cdf4e19924f8f4dcb0e2890d723ba9ee3bcd31c31277e72a298f6d2a0 — https://www.casact.org/sites/default/files/2022-05/6C_FSCOTechNotes_102016.pdf
- note: Goldburd §3.2 (stakeholders: regulators restrict variables, varying by state; IT system limits; communicate the rating structure early), §3.8 (no ambiguity in risk classification; plan items not in the model such as a first-time safe-driving discount may overlap modelled variables, judgmental adjustments), §3.9 (accuracy decays; rebuild periodically, refresh in between), §9.1 (deductible factor above unity from selection; coverage options outside the GLM by loss elimination, entered as an offset). Capping and dislocation: FSCO Technical Notes §16 cap differential changes at +/-10% to minimize rate dislocation. Example recomputed: OB = 1.185/1.160 = 1.02155, B = 504.14, premiums 504.14/680.58/705.79, average 597.40 (+3.0%); with the cap 591.23 (+1.9%).
