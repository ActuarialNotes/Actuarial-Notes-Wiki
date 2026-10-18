---
target: Concepts/Tree Ensemble.md
created: 2026-10-18
---

## [F-001] Variable-importance example misstates what the score measures
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: major
- status: open
- locus: example 'Random Forest Variable Importance', answer
- claim: Vehicle age reduces RSS 'by an average of 420 per split across all trees'.
- evidence: ISLR §8.2.1, printed p.343: 'we can record the total amount that the RSS (8.1) is decreased due to splits over a given predictor, averaged over all B trees'; lab p.359: 'the total decrease in node impurity that results from splits over that variable, averaged over all trees'. The score is a per-tree total, not a per-split average.
- source_rank: 2
- proposed_action: Restate to the reading: 'reducing RSS by a total of 420 from its splits, averaged over all the trees'.
- applied: true
- fingerprint: 34b66a46f327

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated to ISLR p.343's definition in this run.

## [F-002] Says all boosting parameters are tuned by cross-validation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 3
- claim: B, lambda and d are 'all tuned by cross-validation'.
- evidence: ISLR §8.2.3, printed p.347: 'We use cross-validation to select B'; lambda 'typical values are 0.01 or 0.001'; for d 'often d = 1 works well'. Only B is said to be chosen by CV.
- source_rank: 2
- proposed_action: Restate: B chosen by cross-validation.
- applied: true
- fingerprint: 91d39c82eb9f

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Restated in this run.

## [F-003] 'Reduces bias' for boosting is not in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: table, Boosting row, Key Property
- claim: Boosting 'Reduces bias'.
- evidence: ISLR §8.2.3 (pp.345-348) and §8.2.5 (p.352) describe boosting as slow learning on residuals, never as bias reduction. Same claim as Boosting.md F-001.
- source_rank: 2
- proposed_action: Cite a source or restate to the reading's 'slow learning on the residuals'.
- applied: false
- fingerprint: f8d8d703af74

## [F-004] Boosting update mixes index notation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: nit
- status: open
- locus: formula 'Boosting (e.g., gradient boosting)'
- claim: f^(m)(x) = f^(m-1)(x) + lambda f_b(x; r_i^(m-1))
- evidence: ISLR (8.10): f(x) <- f(x) + lambda f^b(x), the tree fitted to residuals r (Algorithm 8.2, p.347). The page uses both m and b for the iteration; the meaning matches.
- source_rank: 2
- proposed_action: Write it in the reading's notation, as Boosting.md does.
- applied: false
- fingerprint: 2f47794e87d9

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: read the routed ISLR pages before the page; formula-by-formula comparison; full-text search of every named method; worked examples recomputed independently; wiki-links and embeds resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.2.1-8.2.3 and 8.2.5, printed pp.340-347, 351-352 (PDF pp.348-355, 359-360), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.3.3-8.3.4 lab, printed pp.358-360 (PDF pp.366-368), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Bagging formula, RF sqrt(p), OOB ~ one-third left out, importance by mean decrease in Gini/RSS, boosting's lambda match §8.2. F-001 (major) and F-002 fixed; F-003 minor and F-004 nit open.
