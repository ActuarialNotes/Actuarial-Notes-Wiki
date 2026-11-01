---
target: Concepts/Scale and Shape Parameters.md
created: 2026-10-31
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Scale-distribution and scale-parameter definitions and the lognormal case against LDA 3.3.2; theta as scale across the tables families by reading each tabled CDF; moments, CV and skewness of the gamma and moment existence of the Pareto from the tables E[X^k]; Weibull hazard behaviour against LDA 3.2.3; both worked examples recomputed independently (0.017351 -> 0.025343, +46%; theta 500 and 1,128.38, S(5000) 0.042329 and 2.97e-9, CV 2.236 and 0.523, hazard values); exam wording against FAM and ASTAM; wiki-links resolve. Notation: LDA writes the Weibull shape as alpha, the tables and this page as tau.
- sources_checked: Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.3, 3.2.1-3.2.3 gamma/Pareto/Weibull shape and scale; Weibull hazard decreasing/constant/increasing in the shape; 3.3.2 Multiplication by a Constant: scale distribution and scale parameter definition, lognormal mu + log c with e^mu the scale, inflation and currency, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; SOA Tables for Exam FAM (Loss Models Appendices A and B excerpts), Appendix A: x enters each CDF through x/theta; gamma E[X^k]; Pareto E[X^k] k<alpha; Weibull; lognormal; A.6 "the scale parameter theta", pp.5-12, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf; SOA Exam ASTAM Syllabus, October 2026, Topic 1 outcome a (how changes in the parameters affect the distributions), p.2, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf; SOA Exam FAM Syllabus, February 2027, Topic 2 outcome b (role of scale and shape parameters), p.3, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf
- note: No findings.
