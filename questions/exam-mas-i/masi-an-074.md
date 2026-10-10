---
id: "masi-an-074"
exam: "Exam MAS-I"
topic: "Tail Weight"
learning_objective: "Statistics"
difficulty: hard
type: free-entry
bloom: analyze
wiki_link:
  - Concepts/Tail+Weight
  - Concepts/Pareto+Distribution
  - Concepts/Lognormal+Distribution
  - Concepts/Weibull+Distribution
  - Concepts/Exponential+Distribution
answer: "DBCEA"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:861b4180fc613321be7d7e1dd2bb0d4a0468d3eee2162ca8b55e2bc34229c001
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-074.md
---

A reinsurer is comparing five candidate severity models for a large-loss layer. Their means differ widely, as shown.

- (A) Pareto with $\alpha = 1.5$ and $\theta = 100$ (mean 200)
- (B) Exponential with mean 5,000
- (C) Lognormal with $\mu = 5$ and $\sigma = 1$ (mean 244.69)
- (D) Weibull with $\tau = 2$ and $\theta = 20{,}000$ (mean 17,724.54)
- (E) Pareto with $\alpha = 4$ and $\theta = 10{,}000$ (mean 3,333.33)

Rank the models by the weight of their right tails, as measured by the limit of the ratio of survival functions as $x \to \infty$, from the **lightest** tail to the **heaviest**. Enter the letters with no spaces, e.g. ABCDE.

## Explanation

Tail weight is a limiting property: compare $S_1(x)/S_2(x)$ as $x \to \infty$. Scale parameters and means only shift where the curves cross; the *form* of the survival function decides the limit. As $x \to \infty$:

$$
\begin{align*}
\text{(D) Weibull, } \tau = 2: \quad & S(x) = e^{-(x/20{,}000)^2} \\
\text{(B) Exponential:} \quad & S(x) = e^{-x/5{,}000} \\
\text{(C) Lognormal:} \quad & \ln S(x) \approx -\frac{(\ln x - 5)^2}{2} \\
\text{(E) Pareto, } \alpha = 4: \quad & S(x) \approx (10{,}000/x)^{4} \\
\text{(A) Pareto, } \alpha = 1.5: \quad & S(x) \approx (100/x)^{1.5}
\end{align*}
$$

- $e^{-cx^2}$ dies faster than $e^{-x/5{,}000}$ for any $c > 0$, so the Weibull with $\tau > 1$ is lighter than every exponential: **D** before **B**.
- The lognormal's log-survival falls like $(\ln x)^2$, far slower than $x$, so it is heavier than any exponential but lighter than any power law: **B**, then **C**, then the Paretos.
- Between Paretos, $S \propto x^{-\alpha}$, so the smaller $\alpha$ is heavier whatever the scales: **E** ($\alpha = 4$) before **A** ($\alpha = 1.5$).

From lightest to heaviest: **DBCEA**. Numerically, at $x = 10^6$ the log-survival values are about $-2{,}500$ (D), $-200$ (B), $-42$ (C), $-18.5$ (E) and $-13.8$ (A).

**Common wrong entries**

- **ACEBD** — ranks by the mean, treating a small mean as a light tail. Model A has the smallest mean and the heaviest tail of all.
- **CAEBD** — ranks by the survival probability at a single large loss, $S(10{,}000)$. At that point the large-scale Weibull and exponential still have the most probability left, but most of these comparisons reverse further out.
