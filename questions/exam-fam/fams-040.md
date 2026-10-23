---
id: "fams-040"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Truncation
  - Concepts/Poisson+Distribution
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:11f301d42037ed13f120ee873a16d1e36c126fac114a1579f8e178831179deb7
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q40, p.32, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q40, p.18, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-040.md
---

You are given:

(i) The number of claims follows a Poisson distribution with mean $\lambda$.

(ii) Observations other than 0 and 1 have been deleted from the data.

(iii) The data contain an equal number of observations of 0 and 1.

Calculate the maximum likelihood estimate of $\lambda$.

- A) 0.50
- B) 0.75
- C) 1.00
- D) 1.25
- E) 1.50

## Explanation

There are $n/2$ observations of $N = 0$ (given $N = 0$ or 1) and $n/2$ observations of $N = 1$ (given $N = 0$ or 1).  The likelihood function is

$$\begin{align*}
L &= \left(\frac{e^{-\lambda}}{e^{-\lambda} + \lambda e^{-\lambda}}\right)^{n/2}\left(\frac{\lambda e^{-\lambda}}{e^{-\lambda} + \lambda e^{-\lambda}}\right)^{n/2} \\
&= \frac{\lambda^{n/2}e^{-n\lambda}}{(e^{-\lambda} + \lambda e^{-\lambda})^n} \\
&= \frac{\lambda^{n/2}}{(1 + \lambda)^n}
\end{align*}$$

Taking logs, differentiating and solving provides the answer.

$$\begin{align*}
l &= \ln L \\
&= (n/2)\ln\lambda - n\ln(1 + \lambda) \\
l' &= \frac{n}{2\lambda} - \frac{n}{1 + \lambda} \\
&= 0
\end{align*}$$

$$n(1 + \lambda) - n2\lambda = 0$$

$$1 - \lambda = 0, \quad \lambda = 1$$

The answer is **C**.
