---
target: Concepts/Risk Margin.md
created: 2026-10-16
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- status_set: in_review
- checks_run: Exam 7 section checked against Marshall et al.: sources of uncertainty, balanced scorecard, seven external categories, correlation bands, independence of the three sources, normal vs lognormal at 75%/90%, additional analysis; worked example recomputed (CoV 11.18%, normal 7.54% / $15.1M, lognormal 7.14% / $14.3M, 7.8% and 5.3% without external) and the lognormal-margin formula reproduced against Marshall Figure 3 (CoV 8.7% -> 5.6%); MCT example arithmetic recomputed (DC 21.08, 155.92, 103.95, 240.5%); link check
- sources_checked: Marshall et al., A Framework for Assessing Risk Margins (2008), Sections 1.2, 2.2, 2.5-2.7 (pp.4-27), Figure 3 p.21, Section 4.1 pp.31-36, sha256:534ad0edf3b2294d2d1421b1d17df1fc0837f1fe3a4e430db347a6abbcc8c774 — https://www.casact.org/sites/default/files/2021-03/7_Marshall_et_al.pdf
- note: Exam 7 section verified against Marshall et al. with no findings. The Exam 6C sections (MCT risk margins, the MCT example, the IFRS 17 risk adjustment, Solvency II) were not checked against their sources in this run, so the page stays in_review.

## [C-002] Exam 6C half left for the Exam 6C campaign
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- note: Run e7rba checked only the Exam 7 half of this page (the lead's Exam 7 sentence, the first formula block, 'Exam 7: a margin over the central estimate' and the 'Consolidating CoVs' example) against Marshall et al. (2008); it holds. Not checked, because none of this packet's readings covers them: the lead's MCT sentence and the target-capital formula, 'Exam 6C: the MCT risk margins (Canada)', 'The accounting margin: IFRS 17' and the 'MCT Risk Margins to a Ratio' example. Their sources are OSFI's Minimum Capital Test guideline effective January 1, 2024 (the version the Exam 6C Fall 2026 outline cites, with exclusions), IFRS 17 and the CIA/OSFI material on the risk adjustment, and the Solvency II delegated regulation. The example's arithmetic is internally consistent (DC 21.08, minimum capital 103.95, MCT 240.5%), and its divide-by-1.5 agrees with the MCT guideline sec. 1.1.1 as quoted in .verify/Concepts/MCT.md F-001, but that is a cross-reference, not a check.
