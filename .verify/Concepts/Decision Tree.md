---
target: Concepts/Decision Tree.md
created: 2026-10-18
---

## [F-001] Tie-break in the pruning example is not in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: example 'Pruning a Decision Tree', answer
- claim: Both subtrees score 100, and 'in practice, the simpler (pruned) tree would be preferred for its interpretability and lower overfitting risk.'
- evidence: Recomputed: 50+5(10)=100 and 80+5(4)=100, a genuine tie. ISLR §8.1.1 (printed pp.331-333, eq. 8.4, Algorithm 8.1) says only that for each alpha there corresponds a subtree minimizing (8.4); it gives no rule for ties. The page's tie-break is a convention the reading does not state.
- source_rank: 2
- proposed_action: Either cite a source for the smallest-minimizing-subtree convention (e.g. ESL §9.2.2, not reachable this run) or change the example's numbers so one tree wins outright.
- applied: false
- fingerprint: 3254076c0072

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: read the routed ISLR pages before the page; formula-by-formula comparison; full-text search of every named method; worked examples recomputed independently; wiki-links and embeds resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.1, printed pp.327-340 (PDF pp.335-348; printed = PDF - 8), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Definition, RSS and Gini/entropy formulas, recursive binary splitting, stopping rule, cost-complexity criterion (8.4) and the non-robustness claim all match §8.1 (pp.330-340). Pruning example arithmetic correct (100 vs 100); its tie-break is unsourced (F-001, open). Also linked from Exam SRM, whose reading includes ISLR ch.8; claims hold for both.
