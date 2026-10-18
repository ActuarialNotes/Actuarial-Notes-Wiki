---
target: Concepts/Entropy.md
created: 2026-10-18
---

## [F-001] Information-theory claims are not in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: lead ('derived from information theory'), formula note ('base-2 gives entropy in bits'), bullets 4-5 ('Information gain')
- claim: Entropy is 'derived from information theory'; base-2 gives 'bits'; the decrease is called 'information gain' and the split maximizing it is chosen.
- evidence: Full-text search of ISLR 2nd ed.: 'information theory' 0 hits, 'information gain' 0 hits; 'bits' only on p.453 (unrelated). ISLR §8.1.2 (p.336) gives D = -sum p log p and says only that Gini or entropy 'are typically used to evaluate the quality of a particular split'. The terms are standard ML vocabulary but no source was read for them this run.
- source_rank: 2
- proposed_action: Cite a reference that defines information gain (e.g. ESL §9.2.3 or an information-theory text), or delete the terminology and keep the reading's wording.
- applied: false
- fingerprint: 766f1da9310c

## [F-002] Overstates how alike Gini and entropy are
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 3
- claim: Entropy and Gini 'give numerically similar results and generally lead to the same tree structure'.
- evidence: ISLR §8.1.2, printed p.336: 'it turns out that the Gini index and the entropy are quite similar numerically.' Nothing about leading to the same tree.
- source_rank: 2
- proposed_action: Restate to the reading's sentence.
- applied: true
- fingerprint: 68b1ad4a6130

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Restated to 'Entropy and Gini are quite similar numerically' (ISLR p.336) in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: read the routed ISLR pages before the page; formula-by-formula comparison; full-text search of every named method; worked examples recomputed independently; wiki-links and embeds resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.1, printed pp.327-340 (PDF pp.335-348; printed = PDF - 8), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Formula (8.7), purity behaviour and similarity to Gini match p.336. Examples recomputed: D(0.4)=0.366+0.307=0.673; gain 0.693-0.300-0.080=0.313. F-002 fixed; F-001 (information-theory terms not in the reading) open.
