---
target: Resources/Books/Measures of Predictive Accuracy (Salis - 2025).md
created: 2026-10-18
---

## [F-001] ROC threshold count misstated as 'between each pair'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:15Z/724f
- date: 2026-10-18
- severity: nit
- status: open
- locus: ## 4 Measures for Binary Models, 4.2 AUROC, first bullet
- claim: Page said the 9 discriminations are 'one threshold between each pair of them and one above and below them all'.
- evidence: Study note p.9 (sha256:e952ace6...): 'Since there are 8 unique predicted probabilities, there will be 9 unique discriminations: 7 from discrimination thresholds lying between the unique predicted probabilities and 2 from a discrimination threshold above the highest ... and ... below the lowest'. 8 values have 28 pairs but 7 adjacent gaps; Table 10 lists 9 thresholds 0.90, 0.75, ..., 0.05.
- source_rank: 1
- proposed_action: Restate as 'seven thresholds between adjacent unique probabilities and one above and one below them all'.
- applied: true
- fingerprint: 554a1a7822e5

## [F-002] Lift's 'difference' form attached to binary targets
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:15Z/724f
- date: 2026-10-18
- severity: nit
- status: open
- locus: ## 3 Measures of Model Lift, 3.1 Lift, first bullet
- claim: Page read 'for a binary target it can also be the odds ratio, or in some contexts the difference', tying the difference to binary targets.
- evidence: Study note p.4: 'When predicting a binary target, lift can also be measured as the odds ratio of the last and first quantiles. In some contexts, the difference between the last and first quantiles can be used.' The difference is a separate sentence, not restricted to binary targets.
- source_rank: 1
- proposed_action: Split the clause: '; for a binary target it can also be the odds ratio; and in some contexts the difference is used.'
- applied: true
- fingerprint: beca09ce8267

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:15Z/724f
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated to the study note's p.9 wording in this run.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:15Z/724f
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Clause split to match the study note's p.4 sentences in this run.

## [C-001] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:15Z/724f
- date: 2026-10-18
- note: Conflict inside the source, not a vault error: study note Table 3 (p.5) gives policy 10 a predicted loss cost of 200, but Table 4 (p.5) aggregates the last row under 190. Exposure 1.0 and loss 400 agree, so the Lorenz points and the Gini of 0.27 are unaffected. The page quotes neither value.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:15Z/724f
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: Frontmatter vs title page (title + subtitle, Anthony T. Salis, 'Updated: November 6, 2025'; no PDF bookmark outline, metadata empty, dated 2025-11-06); every ## / sub-heading vs the note's numbered divisions 1, 2 (2.1-2.3), 3 (3.1-3.2), 4 (4.1-4.2), none missing; every bullet and the five formulas vs pp.1-12; lead and On-the-syllabus bullet vs outline p.4 citation 'Salis, A., "Measures of Predictive Accuracy," CAS Study Note, November 2025', Salis / C3 & C10 / OP, and p.3 Domain C readings 'Salis'; outline p.4 link annotation points at the Available-from URL; recomputed blind: Table 1 Gini 0.56/0.54/0.48 and entropy 0.95, Table 5 Gini 1-0.73=0.27, Table 11 AUROC 0.74, Table 12 74/(2*10*5)=0.74, and AUROC from Table 8 by pairwise concordance 37/50=0.74; all 10 concept links and both related-reading links resolve; resource_lint 0 errors
- sources_checked: Salis, Measures of Predictive Accuracy: Study Note for MAS-II (CAS, updated November 6, 2025), 12 pp., PDF pp.1-12, sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf; CAS, Exam Content Outline — Modern Actuarial Statistics II (MAS-II), 2026 (MASII_CO_S_2026 v06), PDF pp.3-4 (Domain C tasks and readings; Complete Text References) incl. link annotations, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: verified: every heading, claim and formula matches the CAS-hosted study note, and the syllabus bullet matches the outline. Two nits fixed (threshold count, lift clause).
