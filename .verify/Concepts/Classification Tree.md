---
target: Concepts/Classification Tree.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: impurity formulas and grow/prune guidance vs ISLR; both examples recomputed (Gini decreases 0.0450/0.0771, error 0.04/0.00, entropy 0.0497/0.1328; referral threshold 0.0625, cost 262,000 vs 472,000, error 26.9%); links resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §8.1.2 PDF pp.343-345 (eq. 8.5-8.7, error rate not sensitive enough, prune with error rate for accuracy, qualitative splits, same-class leaves), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
