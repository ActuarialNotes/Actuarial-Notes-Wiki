---
target: Concepts/Rating Plan.md
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
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §10, PDF pp.14-18, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §3.8-3.9, §7.2-7.2.4, PDF pp.43-44, 86-90, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15, PDF pp.301-305, 319, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Fisher Ch.1 §10: manual vs standard premium; quintiles test (manual loss ratios should rise with the mod; standard loss ratios flat; falling = too much credibility, rising = too little); efficiency test = Var(standard LR)/Var(manual LR), lower is better (PDF pp.14-18). Goldburd §3.8-3.9 (clear classification, plan items not in model, refresh), §7.2-7.2.4 (quantile plots, double lift, loss ratio chart: a perfect plan has equal loss ratios, Gini). Werner Ch.15 for experience/schedule/retro structure. Examples recomputed: standard LRs A 0.640-0.650 flat, B 0.800 -> 0.553, C 0.522 -> 0.755; Var(manual) 0.01815; efficiencies 0.0013, 0.533, 0.442; loss ratio chart 1.21 and 0.82 against 66%.
