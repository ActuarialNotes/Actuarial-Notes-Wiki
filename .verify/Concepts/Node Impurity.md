---
target: Concepts/Node Impurity.md
created: 2026-10-18
---

## [F-001] Weighted impurity-decrease formula is not in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: formula block, last line ($\Delta I$) and bullet 1
- claim: Delta I = I_parent - (n_L/n) I_L - (n_R/n) I_R
- evidence: ISLR §8.1.2 (printed pp.335-338) defines E, G and D per node and §8.2.1 (p.343) speaks of 'the total amount that the Gini index is decreased by splits', but gives no node-size weighting. Full-text search of the PDF: 'information gain' 0 hits. The weighting is standard (ESL §9.2.3) but ESL's author-hosted copy (hastie.su.domains) refused connection this run, so it is unsourced here. The worked example's numbers are unaffected (equal-size children).
- source_rank: 2
- proposed_action: Cite ESL §9.2.3 (author-hosted) for the weighted decrease, or mark it as a convention beyond the reading.
- applied: false
- fingerprint: a5289cf84f39

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: read the routed ISLR pages before the page; formula-by-formula comparison; full-text search of every named method; worked examples recomputed independently; wiki-links and embeds resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.1, printed pp.327-340 (PDF pp.335-348; printed = PDF - 8), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.2.1-8.2.3 and 8.2.5, printed pp.340-347, 351-352 (PDF pp.348-355, 359-360), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.3.3-8.3.4 lab, printed pp.358-360 (PDF pp.366-368), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: E (8.5), G (8.6), D (8.7) match; RSS criterion matches (8.1)/(8.3); grow-with-Gini/entropy, prune-with-error-rate-for-accuracy matches p.336; the purity argument matches the RestECG<1 discussion (p.338); impurity importance matches p.343. All three examples recomputed: Delta E=0, Delta G=0.045, Delta D=0.0633 (D: 0.5623, 0.6730, 0.3251); RSS 106 -> 10 vs 31; importances 0.0433/0.0220/0.0140 -> 100/51/32. Weighted Delta I unsourced (F-001, open).
