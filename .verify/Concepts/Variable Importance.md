---
target: Concepts/Variable Importance.md
created: 2026-10-18
---

## [F-001] Cardinality bias and correlated-credit claims are not in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 2 ('not biased toward high-cardinality predictors'); bullet 4 and the example's answer (correlated predictors split the credit)
- claim: Impurity importance is biased toward high-cardinality predictors; correlated predictors split the credit, so dropping one makes the other's importance jump.
- evidence: ISLR §8.2.1 (p.343) and the lab (p.359) define impurity and OOB-permutation importance only. Full-text search 'cardinality': not in the reading; no passage on correlated predictors sharing importance.
- source_rank: 2
- proposed_action: Cite a source (e.g. Strobl et al. 2007 on cardinality bias) or delete.
- applied: false
- fingerprint: 5fd793053d6e

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: read the routed ISLR pages before the page; formula-by-formula comparison; full-text search of every named method; worked examples recomputed independently; wiki-links and embeds resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.2.1-8.2.3 and 8.2.5, printed pp.340-347, 351-352 (PDF pp.348-355, 359-360), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.3.3-8.3.4 lab, printed pp.358-360 (PDF pp.366-368), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Formula and impurity-based definition match p.343 (RSS/Gini); permutation importance on OOB data matches lab p.359; partial dependence plots for direction match lab p.360; rescaled to the maximum matches Fig. 8.9. F-001 open. Also linked from Exam ATPA.
