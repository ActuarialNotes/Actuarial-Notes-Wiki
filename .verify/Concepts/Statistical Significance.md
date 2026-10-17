---
target: Concepts/Statistical Significance.md
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
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.3, §2.4.3, §5.3, §6.2.1, PDF pp.18-20, 25-26, 57, 74-76, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Monograph 5 errata sheet (approved 28 Jan 2026), p.65-66 corrections, sha256:4622f59623aded645b229235ab0579a527823942ff35dce531033fe534b6735b — https://www.casact.org/sites/default/files/2026-02/Monograph_No_5_Errata_Sheet.pdf; ASOP No. 12, Risk Classification (Actuarial Standards Board, Dec 2005, doc. 132), §3.2.1-3.2.2, PDF pp.9-10, sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf; Mahler, An Example of Credibility and Shifting Risk Parameters (PCAS LXXVII, 1990), §4.2, PDF pp.11-12, sha256:101593b055845cf0882738352dde247da6c40bb5f029f394b5c1ebc597dfdb58 — https://www.casact.org/sites/default/files/database/proceed_proceed90_90225.pdf
- note: Goldburd §2.3.1-2.3.3 (SE, p-value as chance of an estimate that large if the true coefficient is zero, 1-in-20 spurious acceptance when many variables are tested, non-significance is not evidence of no effect), §2.4.3 (significance measured against the base level, choose a populous base), §5.3 (no magic-number p-value), §6.2.1 Eq.17 F-test with unscaled deviances, phi_B, m-1 parameters for an m-level variable, F(added, n - p_B); the 2026 errata (dispersion parameter not counted in p_B) does not change the page's example. ASOP 12 §3.2.1-3.2.2 for the relationship/causality bullet. Mahler §4.2 for the chi-squared test of class/risk counts. The chi-square likelihood-ratio remark for known phi is standard statistics not stated in Goldburd, hence medium. Examples recomputed: z = 3.03 and 1.36, intervals [1.07,1.35] and [0.96,1.26]; chi2 = 4.67, p = 0.097, doubled 9.33 p = 0.009; F = 15.6/3.9 = 4.00 vs F(3,4988) 95th pct 2.61, p about 0.007.
