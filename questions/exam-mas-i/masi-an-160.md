---
id: "masi-an-160"
exam: "Exam MAS-I"
topic: "Quadratic Discriminant Analysis"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Quadratic+Discriminant+Analysis
  - Concepts/Bias-Variance+Tradeoff
  - Concepts/Naive+Bayes
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:ac3f7fdf3d059444a10596881afbf9bf5563eab20e4f545faf7076995ca3263a
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §4.4 Generative Models for Classification, PDF pp.151-167 (logistic regression models Pr(Y=k|X=x) directly; QDA discriminant (4.28) quadratic in x incl. log pi_k, Kp(p+1)/2 covariance parameters PDF p.163; naive Bayes (4.29)-(4.30), qualitative predictor estimated by class proportions PDF pp.165-166), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §4.5.1 An Analytical Comparison, PDF pp.168-170 (QDA log-odds quadratic (4.33); naive Bayes additive (4.34); Gaussian naive Bayes with common sigma_j^2 is LDA with diagonal Sigma; 'Neither QDA nor naive Bayes is a special case of the other'), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-160.md
---

An insurer wants to classify claims as fraudulent or legitimate from $p = 30$ quantitative claim characteristics. The training data hold 60 confirmed fraud claims and 2,000 legitimate claims. An analyst proposes quadratic discriminant analysis (QDA). The insurer's criterion is the lowest expected error rate on new claims.

Which critique of the proposal is most valid?

- A) The fraud class alone needs 465 covariance terms estimated from 60 claims, so QDA's added variance likely outweighs its lower bias
- B) QDA assumes the 30 characteristics are independent within each class, which claim characteristics seldom are in practice
- C) QDA draws a linear boundary between the two classes, so it cannot use the difference in spread between fraud and legitimate claims
- D) QDA ignores the roughly 3% share of fraud in the training data, so it will classify far too many new claims as fraudulent
- E) QDA requires both classes to share one covariance matrix, which is implausible when fraud claims behave so differently

## Explanation

QDA estimates a separate covariance matrix for each class. For the fraud class that is

$$
\begin{align*}
\frac{p(p+1)}{2} &= \frac{30(31)}{2} \\
&= 465
\end{align*}
$$

variances and covariances, plus 30 means, from only 60 observations. The estimate is extremely noisy, so the classifier's variance is high. A more restricted model, such as naive Bayes (a diagonal covariance matrix, 30 variances per class) or one covariance matrix shared by both classes, introduces some bias but cuts the variance sharply, which is what lowers expected test error when $n$ is small relative to $p$. The answer is **A**.

**Why not the others**

- **B** — describes naive Bayes, not QDA. QDA's full $\boldsymbol\Sigma_k$ is exactly what lets it model correlated predictors.
- **C** — QDA's boundary is *quadratic* in the predictors, and it is QDA that can use class-specific spreads; a linear boundary comes from a shared covariance matrix.
- **D** — QDA includes the priors through the $\ln\pi_k$ term of the discriminant function, so the 3% base rate is used, not ignored.
- **E** — a shared covariance matrix is the assumption QDA *drops*; it belongs to linear discriminant analysis.
