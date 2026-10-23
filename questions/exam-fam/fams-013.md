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
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:5bee5d1d247da9465c95d6f2cd201e3ce417e3fb595a1b20291acc360d44c212
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q13, p.11, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q13, p.7, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
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
L(100, 200)\text{ (as printed)} &= f(100)f(2000) \\
&= \left(\frac{pe^{-1}}{100} + \frac{(1-p)e^{-0.01}}{10{,}000}\right)\left(\frac{pe^{-20}}{100} + \frac{(1-p)e^{-0.2}}{10{,}000}\right)
\end{align*}$$

The answer is **C**.
