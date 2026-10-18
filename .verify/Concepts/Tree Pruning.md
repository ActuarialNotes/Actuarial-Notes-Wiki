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
