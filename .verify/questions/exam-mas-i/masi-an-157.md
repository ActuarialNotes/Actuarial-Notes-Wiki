---
target: questions/exam-mas-i/masi-an-157.md
created: 2026-10-10
---

## [F-001] Explanation calls naive Bayes in general a restricted QDA
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- severity: minor
- status: open
- locus: Part d, Explanation, last sentence (option B)
- claim: '**B** forgets that naive Bayes is a restricted QDA, not a linear method'
- evidence: ISLR 2nd ed. §4.5.1 (CAS-hosted copy, PDF p.170, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf) states 'Neither QDA nor naive Bayes is a special case of the other' — naive Bayes allows any one-dimensional f_kj and is purely additive. Only naive Bayes with normal f_kj is QDA with a diagonal Sigma_k, which is what the same paragraph's previous sentence says and what part d's answer (C) rests on. The unqualified clause contradicts the reading; qualifying it with the paragraph's own condition makes it true. Answer C unaffected.
- source_rank: 2
- proposed_action: Qualify the clause: 'naive Bayes with normal $f_{kj}$ is a restricted QDA'.
- applied: true
- fingerprint: 701020e6b014

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in the working tree: the option-B clause now reads 'naive Bayes with normal $f_{kj}$ is a restricted QDA, not a linear method', the condition the preceding sentence already states; consistent with ISLR §4.5.1 PDF pp.169-170. No other change; key C unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: a B, b A, c D, d C; keys match; NB within-class independence, qualitative-predictor proportions (ISLR p.166), logistic regression models the posterior directly (§4.4 intro), Gaussian NB with class-specific variances keeps an x_j^2 term (coefficient sign checked); F-001 fixed this run; key present among options/answer form valid; tags and learning_objective checked
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §4.4 Generative Models for Classification, PDF pp.151-167 (logistic regression models Pr(Y=k|X=x) directly; QDA discriminant (4.28) quadratic in x incl. log pi_k, Kp(p+1)/2 covariance parameters PDF p.163; naive Bayes (4.29)-(4.30), qualitative predictor estimated by class proportions PDF pp.165-166), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §4.5.1 An Analytical Comparison, PDF pp.168-170 (QDA log-odds quadratic (4.33); naive Bayes additive (4.34); Gaussian naive Bayes with common sigma_j^2 is LDA with diagonal Sigma; 'Neither QDA nor naive Bayes is a special case of the other'), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
