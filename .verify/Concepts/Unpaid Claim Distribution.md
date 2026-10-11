---
target: Concepts/Unpaid Claim Distribution.md
created: 2026-10-11
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7raa
- date: 2026-10-11
- status_set: verified
- confidence: high
- checks_run: definition and the lognormal fit (Mack's suggestion, Meyers s.3 p. 7); simulation route (Shapland, Verrall s.3, Meyers s.5); Shapland 5.5.1 reasonableness list item by item; Meyers uniform-percentile test; range vs distribution against Shapland s.6 (ranges are of model means, footnote 66); example 1 recomputed blind: CV 0.16, sigma^2 0.02528, mu 8.50455, lognormal 5,496 / 6,413, normal 5,540 / 6,316 - agree; example 2 recomputed: CoVs 79/39/28/20/16.1/32.9%, total 9,980 and 15.2% - agree, remedy (BF/Cape Cod) per Shapland 5.5.1, negative-iteration handling per 4.1.1
- sources_checked: Shapland, CAS Monograph 4 (2016), Sections 1, 3.2-3.4, 4.1.1, 5.5.1, 6, 6.1 (pp. 1-3, 8-19, 21-22, 41-49; PDF 9-11, 16-27, 29-30, 49-57), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf; Meyers, CAS Monograph 8 (2019), Sections 1, 3-5, 7-8, 12 (pp. 1-2, 6-22, 31-42, 77-80; PDF 11-12, 16-32, 41-52, 87-90), sha256:3c01999f6c8a170dc412968658d4f7d673d637e74cb27d84b4173ea60532d2d1 — https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf; Mack, Measuring the Variability of Chain Ladder Reserve Estimates, CAS Forum Spring 1994, assumptions (3)-(5) pp. 109-113, formulas (6)-(9) pp. 115-117, formula (11) p. 120, Appendices D and F pp. 150-154 (PDF 9-20, 50-54), sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf; Verrall, Variance 1(1) 2007, Sections 1, 3, 5, 6.1 (pp. 53-60, 61-63, 65-66; PDF 1-8, 9-11, 13-14), sha256:da4a19ac50ec7756ad651c5632e73b71ff99f584d7db436772f94de1ec024506 — https://www.casact.org/sites/default/files/2021-03/7_Verrall.pdf
- note: Clean.
