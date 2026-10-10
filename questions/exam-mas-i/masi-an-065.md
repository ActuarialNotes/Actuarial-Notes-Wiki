---
id: "masi-an-065"
exam: "Exam MAS-I"
topic: "Empirical Distribution"
learning_objective: "Statistics"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Empirical+Distribution
  - Concepts/Binomial+Distribution
  - Concepts/Unbiasedness
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:ce9121d811abaaab684facb8ba4f838fdaef64bd9437d63c61fdab4e6547d8d3
  sources:
    - "Siegrist, randomservices.org, ch.6 Order Statistics, N_x = number of sample values <= x is binomial(n, F(x)), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html"
    - "Frees et al., Loss Data Analytics (open text), ch.4 Model Selection and Estimation, 4.1.1 empirical distribution function F_n(x), indicator I(X <= x) is Bernoulli, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-065.md
---

An actuary has 40 individual claim amounts, all fully observed, and estimates $F(1{,}000) = P(X \le 1{,}000)$ by the empirical distribution function, obtaining $F_{40}(1{,}000) = 0.30$.

Which statement about this estimate is correct?

- A) The number of claims at or below 1,000 is binomial, so the estimate is unbiased
- B) Its variance is estimated by 0.30 × 0.70 / 39, as one degree of freedom is used up
- C) Its standard error would be cut in half if the number of claims were doubled to 80
- D) It is biased low, because the step function $F_{40}$ lies below $F$ between data points
- E) The same claims would estimate $F$ more precisely at their median than at 1,000

## Explanation

Each claim is at or below 1,000 with probability $F(1{,}000)$, independently, so the count at or below 1,000 is binomial:

$$
40 \cdot F_{40}(1{,}000) \sim \text{Binomial}\big(40,\ F(1{,}000)\big)
$$

Dividing by 40:

$$
\begin{align*}
E\big[F_{40}(1{,}000)\big] &= F(1{,}000) \\
\text{Var}\big(F_{40}(1{,}000)\big) &= \frac{F(1{,}000)\,[1 - F(1{,}000)]}{40}
\end{align*}
$$

The estimate is unbiased, and its estimated variance is 0.30 × 0.70 / 40 = 0.00525 (standard error 0.072). The answer is **A**.

**Why not the others**

- **B** — divides by $n - 1$ as for the sample variance; the empirical CDF at a point is a binomial proportion, whose variance divides by $n$.
- **C** — the standard error is proportional to $n^{-1/2}$, so doubling the sample cuts it by a factor of $\sqrt{2}$ only; halving it takes four times the claims.
- **D** — $F_n$ is a step function, but at any fixed point its expectation is exactly $F$; the steps are random and land on both sides of $F$.
- **E** — $F(1 - F)/n$ is largest when $F = 0.5$, so the median is where the empirical CDF is *least* precise: 0.25/40 there against 0.21/40 at 1,000.
