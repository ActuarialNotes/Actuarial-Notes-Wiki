---
target: Concepts/Random Forest.md
created: 2026-10-18
---

## [F-001] Variance formula and m trade-off claims are not in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: formula block line 2; bullet 3
- claim: Var(Z-bar)=rho sigma^2+(1-rho)sigma^2/B; small m 'weakens each individual tree (higher sigma^2)'; 'm is the one real tuning parameter and can be chosen by Out-of-Bag Error'.
- evidence: ISLR §8.2.2 (pp.343-345) gives the decorrelation argument qualitatively, says the main difference from bagging is the choice of m, and compares m by test error (Fig. 8.10). No formula, no statement on individual-tree strength, and no use of OOB to choose m. ESL ch.15 (the usual source) could not be fetched this run.
- source_rank: 2
- proposed_action: Cite ESL §15.2-15.3 for these claims or restate to the reading.
- applied: false
- fingerprint: 68f88d49936d

## [F-002] Example answer assumes 500 trees the stem never gives
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: nit
- status: open
- locus: example 'Choosing m', answer
- claim: 'chosen at the root of nearly all 500 trees'
- evidence: The stem gives p=36 and no number of trees.
- source_rank: 2
- proposed_action: Drop the number.
- applied: true
- fingerprint: 562d5e355a37

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Changed to 'nearly all the trees' in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: read the routed ISLR pages before the page; formula-by-formula comparison; full-text search of every named method; worked examples recomputed independently; wiki-links and embeds resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.2.1-8.2.3 and 8.2.5, printed pp.340-347, 351-352 (PDF pp.348-355, 359-360), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.3.3-8.3.4 lab, printed pp.358-360 (PDF pp.366-368), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: m ~ sqrt(p) (p.343), randomForest defaults p/3 regression and sqrt(p) classification (lab p.358), m=p is bagging (p.345), one strong predictor makes trees correlated (p.344), no overfitting as B grows (p.345), small m helps with many correlated predictors (p.345). Example: sqrt(36)=6. F-002 fixed; F-001 open. Also linked from Exam SRM and Exam PA.
