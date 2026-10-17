---
target: Concepts/Frequency-Severity Models.md
created: 2026-10-17
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: verified
- confidence: high
- checks_run: definition, formulas and every bullet checked against the routed reading pages; every worked example recomputed before comparison; [[links]] and $$ balance checked
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §5.1.1-5.1.2, PDF pp.53-55, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Goldburd §5.1.1: two models combined by multiplying relativities under log links; data and time constraints; four advantages (insight incl. offsetting effects, stability/underfitting, overfitting, Tweedie assumes frequency and severity move together) - all as the page states. §5.1.2: separate coverages and perils (fire and lightning, wind and hail, all other); combine by-peril models by scoring exposure data, adding peril predictions, refitting on the union of predictors; mix of business matters. Examples recomputed: e^0.40 = 1.4918, e^-0.10 = 0.9048, e^0.30 = 1.3499, PP = 539.94; peril cells 160/210/220/270, naive frame/coastal 288.75 (+6.9%); a Poisson log-link fit weighted by the stated mix (solved by iterative proportional fitting) gives 161.85, 1.282, 1.337, cells 161.85/207.54/216.31/277.38, errors +1.2/-1.2/-1.7/+2.7%, total 198 - matches the page.
