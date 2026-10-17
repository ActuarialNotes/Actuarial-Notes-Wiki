---
target: Resources/Books/Loss Development Using Credibility (Brosius - 1993).md
created: 2026-10-16
---

## [F-001] Simulation test overstates which poorer results show a negative coefficient
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rca
- date: 2026-10-16
- severity: nit
- status: open
- locus: ## Practical application of the first formula, simulation-test bullet
- claim: Least squares beats the link ratio method in the great majority of cases (average MSE 3.658 against 6.384); its poorer results show negative coefficients.
- evidence: Brosius p.11-12 (Table 4 and the text under it): 'some of its poorer performances (trials 6 and 12) can be identified by the appearance of a negative coefficient and judgmentally weeded out'. Table 4 shows only trials 6 (a = -0.175) and 12 (b = -0.704) with a negative coefficient; other poor trials (e.g. 14, MSE 5.465; 19, MSE 4.010) have positive a and b. The page's 'its poorer results show negative coefficients' reads as all of them.
- source_rank: 2
- proposed_action: Restate to the paper: 'some of its poorer results (trials 6 and 12) show a negative coefficient and can be weeded out'.
- applied: false
- fingerprint: 1ad53100ad47

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rca
- date: 2026-10-16
- status_set: in_review
- checks_run: outline built from the source first (no PDF bookmarks; every printed heading pp.1-19) and diffed against the page's headings in order, none missing; every formula (least squares b and a, Formulas 1-3, Z, Appendix) against the page images (pp.3, 10-11, 13, 16, 19 rendered); independent recomputation of Table 1 fit (b=0.968, a=6,024, 1991 estimate 45,210 at full precision, 45,217 at the paper's rounded coefficients), d=0.798 and Z=bd=0.773, Table 2 fit (b=155/160=0.969, a=2.344), the verbal-threshold example (VHM 5.06, EVPV 3.00, Z 0.628, L 9.49m), Table 8 (b 1.30, a 0.020, LR 0.229, c 1.360, Z 0.957) and the 1.10 tail (0.219/0.594/0.580); every proper noun (Simon, Tapley, Clarke, DeVylder, Robbin, Salzmann, Hugh White, Buhlmann, Berquist-Sherman) found in the text; frontmatter against the title page; syllabus callout against the Fall 2026 content outline (A.i.1-A.ii.2, A.iii.1, A.iv.1 = A1-A3, A6, A11; CAS Study Note, March 1993); Available from URL fetched
- sources_checked: https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf, pp.1-19, all sections, Tables 1-10, Development Formulas 1-3, Appendix, sha256:de06a701db8825c8a6384bf92f577a5fe6ccfab627379f21199df35396a2a690 — https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf; https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf, pp.3-5, tasks A.i-A.iv and the Brosius, Hurlimann and Mack - Benktander citations, sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf
- note: Everything checked matches the study note except one nit (F-001) left for the clean-up round of this campaign.

## [F-001/R] Restated to the paper
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rcb
- date: 2026-10-16
- resolves: F-001
- status: resolved
- note: Clean-up round: the bullet now reads 'some of its poorer results (trials 6 and 12) show a negative coefficient and can be weeded out', which is what Brosius pp.11-12 says. Restatement only, nothing new authored.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rcb
- date: 2026-10-16
- status_set: verified
- confidence: high
- checks_run: delta check of the clean-up edit against Brosius pp.11-12 and Table 4; the rest of the page as checked in run 2026-10-11T02:10Z/e7rca (outline diff, formulas against page images, independent recomputation of Tables 1, 2 and 8 and the verbal-threshold example, proper nouns, frontmatter, syllabus callout against the Fall 2026 outline)
- sources_checked: https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf, pp.1-19, all sections, Tables 1-10, Development Formulas 1-3, Appendix, sha256:de06a701db8825c8a6384bf92f577a5fe6ccfab627379f21199df35396a2a690 — https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf; https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf, pp.3-5, tasks A.i-A.iv and the Brosius, Hurlimann and Mack - Benktander citations, sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf
- note: F-001 resolved; no open findings.
