---
id: "fams-053"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Binomial+Distribution
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:7fe469643bd542c98a4dda36cb22583dad935f2fe1abc16fa0400ea7498341ab
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q53, p.43, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q53, p.24, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-053.md
---

You are given:

(i) The distribution of the number of claims per policy during a one-year period for 10,000 insurance policies is:

| Number of Claims per Policy | Number of Policies |
|---|---|
| 0 | 5000 |
| 1 | 5000 |
| 2 or more | 0 |

(ii) You fit a binomial model with parameters $m$ and $q$ using the method of maximum likelihood.

Calculate the maximum value of the loglikelihood function when $m = 2$.

- A) -10,397
- B) -7,781
- C) -7,750
- D) -6,931
- E) -6,730

## Explanation

$$\begin{align*}
L(q) &= \left[\binom{2}{0}(1 - q)^2\right]^{5000}\left[\binom{2}{1}q(1 - q)\right]^{5000} \\
&= 2^{5000}q^{5000}(1 - q)^{15000} \\
l(q) &= 5000\ln(2) + 5000\ln(q) + 15000\ln(1 - q) \\
l'(q) &= 5000q^{-1} - 15000(1 - q)^{-1} \\
&= 0 \\
\hat{q} &= 0.25
\end{align*}$$

$$\begin{align*}
l(0.25) &= 5000\ln(2) + 5000\ln(0.25) + 15000\ln(0.75) \\
&= -7780.97
\end{align*}$$

The answer is **B**.
