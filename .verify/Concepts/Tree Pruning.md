---
target: Concepts/Tree Pruning.md
created: 2026-10-18
---

## [F-001] Pruning-criterion advice dropped the reading's condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 4 ('For classification the loss is ...')
- claim: Gini and entropy are preferred for growing, 'misclassification rate for *pruning*' (unconditional).
- evidence: ISLR §8.1.2, printed p.336 (PDF p.344): 'Any of these three approaches might be used when pruning the tree, but the classification error rate is preferable if prediction accuracy of the final pruned tree is the goal.' The page dropped the condition.
- source_rank: 2
- proposed_action: Restate to the reading: add 'when prediction accuracy of the final pruned tree is the goal'.
- applied: true
- fingerprint: e0ed557a57d1

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated to ISLR p.336 wording in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: read the routed ISLR pages before the page; formula-by-formula comparison; full-text search of every named method; worked examples recomputed independently; wiki-links and embeds resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.1, printed pp.327-340 (PDF pp.335-348; printed = PDF - 8), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Formula (8.4), grow-then-prune rationale (p.331), alpha=0 gives T0 and nested sequence as alpha rises (p.333), CV choice of alpha and refit on full data (Algorithm 8.1, p.333), and unpruned bagged trees (p.341) all match. Example recomputed: 545/415/410/462 at alpha=25 (5 leaves wins); at alpha=40, 560/460/485/582 (3 leaves wins). F-001 fixed.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: whole page against ISLR §8.1-8.2: (8.4), alpha=0 gives T0, nested sequence, CV then refit on full data, short-sighted early stopping (p.331), Gini/entropy for growing and error rate for pruning (p.336), bagged trees not pruned (p.343); collapse of a subtree to one terminal node against Klusowski §2; the 'prune when added RSS < alpha x leaves removed' sentence derived from (8.4); example recomputed (545/415/410/462 -> 5 leaves; at alpha=40, 460 vs 485 -> 3 leaves); rule 10 vs masii-2018f-038 (no question RSS values or answer)
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.1.1 incl. 'Tree Pruning' eq. (8.4) and Algorithm 8.1, printed pp.331-333 (PDF pp.339-341), §8.1.2 printed pp.335-336, §8.2.1 printed p.343, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Klusowski, J. M., 'Sparse Learning with CART', NeurIPS 2020, arXiv:2006.04266, §2 p.3 (a pruned subtree is obtained by merging internal nodes; weakest-link pruning successively collapses the internal node that increases the error least), sha256:f3a445d99ff3fd14569958486963c74793308e94017451b94843f10a23ac451a — https://arxiv.org/pdf/2006.04266
- note: Re-verified after the MAS-II G8 edit (pruning at an internal node). No findings.
