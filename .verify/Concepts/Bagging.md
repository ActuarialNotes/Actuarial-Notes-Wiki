---
target: Concepts/Bagging.md
created: 2026-10-18
---

## [F-001] Correlated-average variance formula and the bias claim are not in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: formula block, line 2; lead ('leaves bias essentially unchanged'); bullet 3
- claim: Var(Z-bar) = rho sigma^2 + (1-rho) sigma^2 / B; bagging leaves bias essentially unchanged.
- evidence: ISLR §8.2.1 (p.340) gives only Var(Z-bar)=sigma^2/n for independent observations, and §8.2.2 (p.344) says qualitatively that 'averaging many highly correlated quantities does not lead to as large of a reduction in variance'. The rho formula is algebraically right (rank-5 recomputation: (1/B^2)[B sigma^2 + B(B-1) rho sigma^2]) but appears nowhere in the reading; its usual source, ESL eq. 15.1, could not be fetched (hastie.su.domains reset the connection).
- source_rank: 2
- proposed_action: Cite ESL §15.2 eq. 15.1 for the formula and the bias statement, or drop them to the reading's qualitative sentence.
- applied: false
- fingerprint: 0f7bf32f077d

## [F-002] Example answer introduces a sample size the stem never gives
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: nit
- status: open
- locus: example 'Why Bagging Helps a Tree and Not a Line', answer
- claim: 'An OLS fit on n = 3,000 is already stable' — the stem gives no n.
- evidence: Stem states 500 trees vs 500 OLS fits 'on the same data', no n. ISLR §8.2.1, p.340: 'linear regression tends to have low variance, if the ratio of n to p is moderately large'.
- source_rank: 2
- proposed_action: Restate to the reading's condition: 'with n large relative to p'.
- applied: true
- fingerprint: 30e00fc46cba

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Restated to 'with n large relative to p' (ISLR p.340) in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: read the routed ISLR pages before the page; formula-by-formula comparison; full-text search of every named method; worked examples recomputed independently; wiki-links and embeds resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.2.1-8.2.3 and 8.2.5, printed pp.340-347, 351-352 (PDF pp.348-355, 359-360), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: f_bag formula, majority vote, deep unpruned trees, high correlation from one strong predictor, B not critical / no overfitting, OOB and variable importance all match pp.340-344. F-002 fixed; F-001 (rho-sigma formula, bias claim) open. Also linked from Exam SRM and Exam PA, whose readings include ISLR ch.8.
