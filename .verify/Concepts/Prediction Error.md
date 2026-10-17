---
target: Concepts/Prediction Error.md
created: 2026-10-11
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7raa
- date: 2026-10-11
- status_set: verified
- confidence: high
- checks_run: definition and MSEP split (Mack p. 115; Verrall (3.3) p. 59; Taylor s.4.2); 'standard error' naming (Mack p. 115, Shapland s.5.5.1); formulas (7), (8) and (9) against the page images (Mack pp. 116-117), sigma = Mack's alpha notation; process/estimation reading of the two terms against Appendix D (D13, p. 150); the three assumptions (3)-(5) (pp. 109-113); total covariance term (11) p. 120 and Appendix F (F3)-(F4) p. 154; example 1 recomputed from scratch before reading the answer: f = 2.000, 1.200, 1.050; sigma^2 = 8.712, 1.496, 0.257; R3 = 598; mse 7,359 (process 4,501, parameter 2,857), PE 85.8 - agree; example 2: AY s.e. 39.65/85.78/183.86, covariance 10,043, total mse 52,777, PE 229.7, independent 206.7, sum 309.3 - agree
- sources_checked: Mack, Measuring the Variability of Chain Ladder Reserve Estimates, CAS Forum Spring 1994, assumptions (3)-(5) pp. 109-113, formulas (6)-(9) pp. 115-117, formula (11) p. 120, Appendices D and F pp. 150-154 (PDF 9-20, 50-54), sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf; Verrall, Variance 1(1) 2007, Sections 1, 3, 5, 6.1 (pp. 53-60, 61-63, 65-66; PDF 1-8, 9-11, 13-14), sha256:da4a19ac50ec7756ad651c5632e73b71ff99f584d7db436772f94de1ec024506 — https://www.casact.org/sites/default/files/2021-03/7_Verrall.pdf; Taylor and McGuire, CAS Monograph 3 (2016), Sections 2.1.2, 3.2-3.3, 4.1-4.5, 5.2-5.4, 7 headings (pp. 10, 24-33, 35-41, 44-55; PDF 20, 34-43, 45-51, 54-65), sha256:d9ca082d0e8e8c0ed514e5e526cf0372cc457f4b5c94e4ff774cd6fc9e24249a — https://www.casact.org/sites/default/files/2021-03/7_Taylor.pdf; Clark, LDF Curve-Fitting and Stochastic Reserving, CAS Forum Fall 2003, Sections 2.3-2.4 (PDF 13-14) and the LDF/Cape Cod examples, pp. 65 and 69 (PDF 25, 29), sha256:1db0baa8ca6aef6711e6483601de5be6e180f016b1110a7fb0e49765c0953b9e — https://www.casact.org/sites/default/files/2021-03/7_Clark.pdf; Shapland, CAS Monograph 4 (2016), Sections 1, 3.2-3.4, 4.1.1, 5.5.1, 6, 6.1 (pp. 1-3, 8-19, 21-22, 41-49; PDF 9-11, 16-27, 29-30, 49-57), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf
- note: Clean. Notation differs from Mack's (sigma_k for alpha_k); Mack also allows alpha_{I-1} = 0 when development is complete, and loglinear extrapolation, besides the min() rule the page gives - not wrong, just the simplest of his options.
