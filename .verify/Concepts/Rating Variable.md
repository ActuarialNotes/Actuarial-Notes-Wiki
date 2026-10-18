---
target: Concepts/Rating Variable.md
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
- sources_checked: ASOP No. 12, Risk Classification (Actuarial Standards Board, Dec 2005, doc. 132), §3.2.1-3.2.5, PDF pp.9-10, sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §3.8-3.9, §5.3, §7.2.2, §9.1, PDF pp.43-44, 57, 88-89, 99-100, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: ASOP 12 §3.2.1 (relationship to expected outcomes), §3.2.2 (causality not required), §3.2.3 (objective, not easily manipulated), §3.2.4 (practicality), §3.2.5 (applicable law). Goldburd §5.3 (cost-effective to collect, ASOPs/regulation, quoting system), §5.4-5.6 (binning, polynomials, splines, interactions), §3.8-3.9 (implementation, refresh between rebuilds), §7.2.2 (double lift chart), §9.1 (coverage options outside the model as offsets). Off-balance formula is the standard base-rate offset. Example recomputed: R_old 0.8960, R_new 0.9265, ratio 0.96708; changes -3.3%, +1.1%, +2.8%, premium-weighted net 0.
