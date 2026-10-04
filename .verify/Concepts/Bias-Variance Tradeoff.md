---
target: Concepts/Bias-Variance Tradeoff.md
created: 2026-10-04
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: decomposition vs ISLR (2.7) with sigma^2 = Var(eps); bias and variance definitions vs ISLR pp.34-35; flexibility -> bias down, variance up and the U-shaped test MSE vs ISLR pp.32-36; irreducible floor vs ISLR p.34; overfitting vs ISLR p.32 and Monograph 5 p.49; training error monotone vs ISLR p.32; more data lowers variance / bias persists vs ISLR pp.35-36 and §6 intro; credibility as shrinkage minimizing expected squared error vs Dean STAM-23-18 pp.10-11 (bias of the credibility estimate derived: (1-Z)(mu - mu(theta))); example 1 recomputed (50 vs 65); example 2 re-read; links resolve; figure checked by SVG title/labels only
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §2.2.1-2.2.2 (printed pp.29-36, PDF pp.40-47), eq (2.7) on printed p.34; §6 intro (printed p.226, PDF p.234); §6.2.1 ridge bias-variance, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §4.3 overfitting PDF p.49, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Dean, 'Topics in Credibility Theory', SOA STAM study note STAM-23-18, §1.1 (pp.10-11: X-bar unbiased for mu(theta); Z*X-bar + (1-Z)*mu minimizes expected squared error at Z = N/(N+K)), sha256:a45571885a311426c0d5a16e4d24b9d70d7ff5ff024c2b18f888d5bdaa16f352 — https://www.soa.org/globalassets/assets/Files/Edu/2018/2018-stam-23-18.pdf
- note: Verified, medium: no findings; the credibility bullet rests on a rank-3 source (Dean, SOA study note).
