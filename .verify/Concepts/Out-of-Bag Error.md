---
target: Concepts/Out-of-Bag Error.md
created: 2026-10-18
---

## [F-001] Use of OOB to tune m is not in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 2
- claim: 'which is why it is used to tune m in a Random Forest'
- evidence: ISLR §8.2.1, pp.342-343, presents OOB as a test-error estimate for the bagged model; §8.2.2 compares values of m by test error (Fig. 8.10), not OOB. No sentence of the reading uses OOB to tune m.
- source_rank: 2
- proposed_action: Delete the clause.
- applied: true
- fingerprint: 430b9f0025c3

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Clause deleted in this run.

## [F-002] Small-B pessimism claim is not in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 5
- claim: OOB is 'slightly pessimistic for small B ... a 100-tree forest's OOB error overstates the error of the full 100-tree model'.
- evidence: ISLR §8.2.1 (pp.342-343) says OOB is a valid test-error estimate and virtually equivalent to LOOCV for B sufficiently large; Fig. 8.8's caption notes the OOB error there was 'by chance — considerably lower'. Nothing on pessimism for small B.
- source_rank: 2
- proposed_action: Cite a source for the claim (e.g. Breiman 2001 / ESL ch.15) or delete the bullet.
- applied: false
- fingerprint: d9e4969f51e9

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: read the routed ISLR pages before the page; formula-by-formula comparison; full-text search of every named method; worked examples recomputed independently; wiki-links and embeds resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.2.1-8.2.3 and 8.2.5, printed pp.340-347, 351-352 (PDF pp.348-355, 359-360), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §5.4 Exercise 2(c), printed p.219 (PDF p.228), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: About one-third out of bag, ~B/3 predictions per observation, average/majority vote, valid test-error estimate and LOOCV equivalence for large B match pp.342-343; (1-1/n)^n is ISLR Exercise 5.2(c) (p.219), its limit e^-1 recomputed. Example: 0.368*600=220.8 ~ 221. 'Boosting has no OOB' holds for Algorithm 8.2, which draws no bootstrap samples (p.345). F-001 fixed; F-002 open.
