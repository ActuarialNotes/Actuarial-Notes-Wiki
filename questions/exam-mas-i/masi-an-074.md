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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:861b4180fc613321be7d7e1dd2bb0d4a0468d3eee2162ca8b55e2bc34229c001
  sources:
    - "Frees et al., Loss Data Analytics (open text), ch.10 Insurance Portfolio Management (tails), 10.2.2 Definition 10.2 limiting ratio of survival functions; Example 10.2.4 Pareto heavier than Weibull; 10.2.1 Pareto tail heavier as alpha falls; lognormal has no MGF, sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html"
    - "CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.2.4.1 Pareto, A.3.2.3 Weibull, A.3.3.1 exponential, A.4.1.1 lognormal survival functions, PDF pp.10-13, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
