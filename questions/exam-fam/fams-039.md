---
id: "fams-039"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Truncation
  - Concepts/Exponential+Distribution
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:6c44933f824c06e60ebb07326fef108fdc1150f3e55b57bf015119b5a2914774
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q39, p.32, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q39, p.18, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-039.md
---

You are given:

(i) A sample of losses is:

600     700     900

(ii) No information is available about losses of 500 or less.

(iii) Losses are assumed to follow an exponential distribution with mean $\theta$.

Calculate the maximum likelihood estimate of $\theta$.

- A) 233
- B) 400
- C) 500
- D) 733
- E) 1233

## Explanation

These observations are truncated at 500.  The contribution to the likelihood function is

$$\frac{f(x)}{1 - F(500)} = \frac{\theta^{-1}e^{-x/\theta}}{e^{-500/\theta}}$$

Then the likelihood function is

$$\begin{align*}
L(\theta) &= \frac{\theta^{-1}e^{-600/\theta}\theta^{-1}e^{-700/\theta}\theta^{-1}e^{-900/\theta}}{\left(e^{-500/\theta}\right)^3} \\
&= \theta^{-3}e^{-700/\theta} \\
l(\theta) &= \ln L(\theta) \\
&= -3\ln\theta - 700\theta^{-1} \\
l'(\theta) &= -3\theta^{-1} + 700\theta^{-2} \\
&= 0 \\
\theta &= 700/3 \\
&= 233.33
\end{align*}$$

The answer is **A**.
