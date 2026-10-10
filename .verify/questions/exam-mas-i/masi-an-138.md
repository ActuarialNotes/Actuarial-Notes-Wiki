---
target: questions/exam-mas-i/masi-an-138.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: a B, b A, c E, d D, e C; all keys match; leverage (ISLR §3.3.3), variation in Y changing with X (NIST); key present among options/answer form valid; tags and learning_objective checked
- sources_checked: NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.26 Scatter Plot: Y vs X; linear or non-linear relationship, variation in Y changing with X, outliers, sha256:e5847cce6c0469fb68a2ad3ad38688f0753b680a308e09cf4c798f23b6bf57ac — https://www.itl.nist.gov/div898/handbook/eda/section3/scatterp.htm; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §3.3.3 Potential Problems, PDF pp.107-112 (outliers vs high-leverage points; collinearity, correlation matrix, VIF), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §2.7.1-2.7.3, PDF pp.29-33 (gamma V(mu)=mu^2; inverse Gaussian V(mu)=mu^3, sharper peak and wider tail; Poisson V(mu)=mu, phi=1, overdispersion and ODP with the same coefficients; Tweedie 1<p<2 a compound Poisson-gamma with mass at zero, for pure premium), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
