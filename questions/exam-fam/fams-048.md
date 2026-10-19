---
id: "fams-048"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Truncation
  - Concepts/Censoring
  - Concepts/Pareto+Distribution
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:569654943631955079adba89b38d2f63271f1bf97287184f2131d9f11b1f729d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-048.md
---

You are given the following 20 bodily injury losses before the deductible is applied:

| Loss | Number of Losses | Deductible | Policy Limit |
|---|---|---|---|
| 750 | 3 | 200 | $\infty$ |
| 200 | 3 | 0 | 10,000 |
| 300 | 4 | 0 | 20,000 |
| >10,000 | 6 | 0 | 10,000 |
| 400 | 4 | 300 | $\infty$ |

Past experience indicates that these losses follow a Pareto distribution with parameters $\alpha$ and $\theta = 10{,}000$.

Calculate the maximum likelihood estimate of $\alpha$.

- A) Less than 2.0
- B) At least 2.0, but less than 3.0
- C) At least 3.0, but less than 4.0
- D) At least 4.0, but less than 5.0
- E) At least 5.0

## Explanation

$$\begin{align*}
L &= \left[\frac{f(750)}{1 - F(200)}\right]^3 f(200)^3 f(300)^4[1 - F(10{,}000)]^6\left[\frac{f(400)}{1 - F(300)}\right]^4 \\
&= \left[\frac{\alpha 10{,}200^\alpha}{10{,}750^{\alpha+1}}\right]^3\left[\frac{\alpha 10{,}000^\alpha}{10{,}200^{\alpha+1}}\right]^3\left[\frac{\alpha 10{,}000^\alpha}{10{,}300^{\alpha+1}}\right]^4\left[\frac{10{,}000^\alpha}{20{,}000^\alpha}\right]^6\left[\frac{\alpha 10{,}300^\alpha}{10{,}400^{\alpha+1}}\right]^4 \\
&= \alpha^{14}10{,}200^{-3}10{,}000^{13\alpha}10{,}300^{-4}10{,}750^{-3\alpha-3}20{,}000^{-6\alpha}10{,}400^{-4\alpha-4} \\
&\propto \alpha^{14}10{,}000^{13\alpha}10{,}750^{-3\alpha}20{,}000^{-6\alpha}10{,}400^{-4\alpha}
\end{align*}$$

$$\begin{align*}
\ln L &= 14\ln\alpha + 13\alpha\ln(10{,}000) - 3\alpha\ln(10{,}750) - 6\alpha\ln(20{,}000) - 4\alpha\ln(10{,}400) \\
&= 14\ln\alpha - 4.5327\alpha
\end{align*}$$

The derivative is $14/\alpha - 4.5327$ and setting it equal to zero gives $\hat{\alpha} = 3.089$.

The answer is **C**.
