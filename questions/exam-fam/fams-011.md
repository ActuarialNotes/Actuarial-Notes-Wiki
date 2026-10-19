---
id: "fams-011"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Truncation
  - Concepts/Exponential+Distribution
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c72e989a852f7007ff834ba74ef0034c11e7e54833380f736b8a20309055aaf4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-011.md
---

You observe the following five ground-up claims from a data set that is truncated from below at 100:

125 150 165 175 250

You fit a ground-up exponential distribution using maximum likelihood estimation.

Calculate the mean of the fitted distribution.

- A) 73
- B) 100
- C) 125
- D) 156
- E) 173

## Explanation

Because the exponential distribution is memoryless, the excess over the deductible is also exponential with the same parameter. So subtracting 100 from each observation yields data from an exponential distribution and noting that the maximum likelihood estimate is the sample mean gives the answer of 73.

Working from first principles,

$$\begin{align*}
L(\theta) &= \frac{f(x_1)f(x_2)f(x_3)f(x_4)f(x_5)}{[1-F(100)]^5} \\
&= \frac{\theta^{-1}e^{-125/\theta}\,\theta^{-1}e^{-150/\theta}\,\theta^{-1}e^{-165/\theta}\,\theta^{-1}e^{-175/\theta}\,\theta^{-1}e^{-250/\theta}}{(e^{-100/\theta})^5} \\
&= \theta^{-5}e^{-365/\theta}
\end{align*}$$

Taking logarithms and then a derivative gives

$$\begin{align*}
l(\theta) &= -5\ln(\theta) - 365/\theta \\
l'(\theta) &= -5/\theta + 365/\theta^2 \\
           &= 0 \\
\hat{\theta} &= 365/5 \\
&= 73
\end{align*}$$

The answer is **A**.
