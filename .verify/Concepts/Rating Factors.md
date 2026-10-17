---
target: Concepts/Rating Factors.md
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
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.4.3, §9.1-9.2, PDF pp.25-26, 99-101, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., §8.2-8.3, PDF pp.143-146, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf
- note: Goldburd §2.4.3 (populous base level), log-link factors as exponentiated coefficients, §9.1 (coverage options estimated outside the GLM by loss elimination and entered as an offset; higher deductible can come out above unity through selection), §9.2 (territory too many levels; offset; two-way street iterated). Chalk Ch.8 §8.2-8.3: GLM without zip code, residuals smoothed geospatially, recombined. Examples recomputed: e^5.70 = 298.87, e^0.47 = 1.600, e^0.18 = 1.197, e^6.35 = 572.49, rounded-factor product 572.40; one-way 1.467 = 1.222 x 1.200, blended 0.60(1.200)+0.40(1.10) = 1.160.
