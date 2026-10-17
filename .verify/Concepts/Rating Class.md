---
target: Concepts/Rating Class.md
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
- sources_checked: ASOP No. 12, Risk Classification (Actuarial Standards Board, Dec 2005, doc. 132), §2.9, §3.2, PDF pp.8-10, sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf; Mahler, An Example of Credibility and Shifting Risk Parameters (PCAS LXXVII, 1990), §4.2 and Table 4, PDF pp.10-12, sha256:101593b055845cf0882738352dde247da6c40bb5f029f394b5c1ebc597dfdb58 — https://www.casact.org/sites/default/files/database/proceed_proceed90_90225.pdf; Bailey & Simon, An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (PCAS XLVI, 1959), conclusions (2)-(3), PDF p.3, sha256:3e44bb5b3d17e96aaae61b27b0d72889043c44feb049a3ca3444095101f456e2 — https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon.pdf; Couret & Venter, Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation (ASTIN Bulletin 38(1), 2008), §1-2, Table C, PDF pp.1-3, 7-11, sha256:ce50d8a0fbc395621d29dd153836b0303a269d94697bb1932b5f334b47ebba18 — https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.3-2.4.3, PDF pp.18-20, 25-26, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: ASOP 12 §2.9 (risk class) and §3.2.1-3.2.7 (relationship to outcomes, causality not required, objectivity, practicality, law, industry and business practice). Mahler §4.2/Table 4: chi-squared test of each team's 5-year segments shows shifting parameters. Bailey & Simon conclusion (2): in a highly refined classification there is little accuracy in individual merit rating. Couret & Venter: correlated serious injury types, multi-dimensional credibility, odd-year holdout quintiles test where raw even-year estimates are too steep (regression to the mean) and the credibility procedure fits best (Table C SSE 0.5618 / 0.7315 / 0.0105). Goldburd §2.3, §2.4.3: SE, p-value, CI, sparse base level. Examples recomputed: chi2 = 0.8+3.0+0.5 = 4.3 (p = e^-2.15 = 0.117), x4 data 17.2 (p = 0.00018); holdout SSE 0.3330 / 0.2062 / 0.00449.
