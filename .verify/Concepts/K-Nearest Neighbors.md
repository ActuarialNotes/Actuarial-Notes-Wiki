---
target: Concepts/K-Nearest Neighbors.md
created: 2026-10-18
---

## [F-001] K=1 / K=50 example contradicts the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: example 'Effect of K on Decision Boundary', answer
- claim: The K=1 boundary 'passes through every training point'; the K=50 boundary 'generalizes better to new data'.
- evidence: ISLR §2.2.3, printed p.41: with K=1 the boundary is overly flexible and training error is 0; on the book's data K=1 and K=100 test errors are 0.1695 and 0.1925 — the smoother fit generalized worse, and the optimum was near K=10. A classification boundary separates points; it does not pass through them.
- source_rank: 2
- proposed_action: Delete both clauses, keeping 'zero training error' and 'may misclassify some training observations'.
- applied: true
- fingerprint: c9db8ff52466

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Both clauses deleted in this run.

## [F-002] 'Lazy learner' is not in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 4
- claim: KNN is a lazy learner with no explicit training phase.
- evidence: Full-text search of ISLR 2nd ed.: 'lazy' 0 hits.
- source_rank: 2
- proposed_action: Cite a source for the term or delete the bullet.
- applied: false
- fingerprint: 4681ac584b55

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: read the routed ISLR pages before the page; formula-by-formula comparison; full-text search of every named method; worked examples recomputed independently; wiki-links and embeds resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §2.2.3 'K-Nearest Neighbors', printed pp.39-42 (PDF pp.50-53); §3.5, printed pp.105-108 (PDF pp.115-118); §4.7.6, printed p.183 (PDF p.193), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Classification estimate (2.12) and argmax rule (p.39), regression average (p.105), non-parametric (p.105), K trade-off and choice via Ch.5 methods (pp.41-42, 106), standardization because scale matters (p.183), curse of dimensionality (p.108) all match. Example 1: 2/3 fraud -> Fraud. F-001 fixed; F-002 open. Also linked from Exam SRM.
