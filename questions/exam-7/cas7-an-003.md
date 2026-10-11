---
id: "cas7-an-003"
exam: "Exam 7"
topic: "Parameter Estimation"
learning_objective: "Estimation of Claims Liabilities"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Parameter+Estimation
  - Concepts/Chain+Ladder+Method
  - Concepts/Unpaid+Claim+Distribution
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:13a084306a0cfd5a9db1cd58b867d45d906cb5032eb7f79e99ba1f50a9db3d26
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-7/cas7-an-003.md
---

A cumulative paid loss triangle has five accident years ($I = 5$). The amounts at development ages 1 and 2 for the four accident years that have reached age 2 are:

| Accident year | Age 1 | Age 2 |
|---|---|---|
| 1 | 1,000 | 1,800 |
| 2 | 1,200 | 2,100 |
| 3 | 900 | 1,710 |
| 4 | 1,500 | 2,550 |

Using Mack's (1994) unbiased estimator, calculate the variance parameter $\alpha_1^2$ for the development from age 1 to age 2.

- A) Less than 7.0
- B) At least 7.0, but less than 8.1
- C) At least 8.1, but less than 9.0
- D) At least 9.0, but less than 13.0
- E) At least 13.0

## Explanation

Mack's age-to-age factor is the volume-weighted average of the individual link ratios:

$$
\begin{align*}
\hat f_1 &= \frac{1{,}800 + 2{,}100 + 1{,}710 + 2{,}550}{1{,}000 + 1{,}200 + 900 + 1{,}500} \\
&= \frac{8{,}160}{4{,}600} \\
&= 1.77391
\end{align*}
$$

The individual link ratios are 1.80, 1.75, 1.90 and 1.70. The variance parameter weights each squared deviation by the age-1 amount and divides by $I - k - 1$:

$$
\begin{align*}
\hat\alpha_1^2 &= \frac{1}{I - k - 1} \sum_{j=1}^{I-k} C_{j1}\left(\frac{C_{j2}}{C_{j1}} - \hat f_1\right)^2 \\
&= \frac{1}{3}\Big[1{,}000(0.02609)^2 + 1{,}200(-0.02391)^2 + 900(0.12609)^2 + 1{,}500(-0.07391)^2\Big] \\
&= \frac{0.681 + 0.686 + 14.308 + 8.195}{3} \\
&= \frac{23.870}{3} \\
&= \mathbf{7.96}
\end{align*}
$$

With $I = 5$ and $k = 1$ there are $I - k = 4$ link ratios, and one degree of freedom is used by estimating $\hat f_1$, so the divisor is 3. The answer is **B**.

**Why not the others**

- **A** — dividing by the number of link ratios, $I - k = 4$, gives 5.97. That estimator is biased low; Mack's divisor $I - k - 1$ is what makes it unbiased.
- **C** — measuring the deviations from the simple average of the link ratios (1.7875) instead of the volume-weighted $\hat f_1$ gives 8.24. The estimator is centred on the same $\hat f_k$ the chain ladder uses.
- **D** — dividing by $I - k - 2 = 2$ gives 11.93, removing one degree of freedom too many.
- **E** — weighting the squared deviations by the age-2 amounts instead of the age-1 amounts gives 14.51. In Mack's model the variance of $C_{j,k+1}$ given $C_{jk}$ is proportional to $C_{jk}$, so the weight is the amount being developed.
