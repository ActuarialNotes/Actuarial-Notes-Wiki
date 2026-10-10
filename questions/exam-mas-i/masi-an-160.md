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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ac3f7fdf3d059444a10596881afbf9bf5563eab20e4f545faf7076995ca3263a
  sources: []
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
