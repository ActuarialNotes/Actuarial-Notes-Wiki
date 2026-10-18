---
id: "fams-013"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Mixture+Distribution
  - Concepts/Exponential+Distribution
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e3fcb9536dfc5a245ec9fcaa55258729a293b4b60fd7a092efa79c61caacebf1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-013.md
---

Losses come from a mixture of an exponential distribution with mean 100 with probability $p$ and an exponential distribution with mean 10,000 with probability $1 - p$.

Losses of 100 and 2000 are observed.

Determine the likelihood function of $p$.

- A) $\left(\dfrac{pe^{-1}}{100}\cdot\dfrac{(1-p)e^{-0.01}}{10{,}000}\right)\cdot\left(\dfrac{pe^{-20}}{100}\cdot\dfrac{(1-p)e^{-0.2}}{10{,}000}\right)$
- B) $\left(\dfrac{pe^{-1}}{100}\cdot\dfrac{(1-p)e^{-0.01}}{10{,}000}\right)+\left(\dfrac{pe^{-20}}{100}\cdot\dfrac{(1-p)e^{-0.2}}{10{,}000}\right)$
- C) $\left(\dfrac{pe^{-1}}{100}+\dfrac{(1-p)e^{-0.01}}{10{,}000}\right)\cdot\left(\dfrac{pe^{-20}}{100}+\dfrac{(1-p)e^{-0.2}}{10{,}000}\right)$
- D) $\left(\dfrac{pe^{-1}}{100}+\dfrac{(1-p)e^{-0.01}}{10{,}000}\right)+\left(\dfrac{pe^{-20}}{100}+\dfrac{(1-p)e^{-0.2}}{10{,}000}\right)$
- E) $p\left(\dfrac{e^{-1}}{100}+\dfrac{e^{-0.01}}{10{,}000}\right)+(1-p)\left(\dfrac{e^{-20}}{100}+\dfrac{e^{-0.2}}{10{,}000}\right)$

## Explanation

$$f(x) = p\frac{1}{100}e^{-x/100} + (1-p)\frac{1}{10{,}000}e^{-x/10{,}000}$$

$$\begin{align*}
L(100, 200) &= f(100)f(2000) \\
&= \left(\frac{pe^{-1}}{100} + \frac{(1-p)e^{-0.01}}{10{,}000}\right)\left(\frac{pe^{-20}}{100} + \frac{(1-p)e^{-0.2}}{10{,}000}\right)
\end{align*}$$

The answer is **C**.
