---
id: "fams-037"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:44e2aac650a56468d2b48b3a3b64fa46fcf2125cfc28dd88896940e729414749
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q37, p.30, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q37, p.17, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-037.md
---

You are given the following three observations:

0.74     0.81     0.95

You fit a distribution with the following density function to the data:

$$f(x) = (p + 1)x^p, \quad 0 < x < 1, \; p > -1$$

Calculate the maximum likelihood estimate of $p$.

- A) 4.0
- B) 4.1
- C) 4.2
- D) 4.3
- E) 4.4

## Explanation

$$\begin{align*}
L(p) &= f(0.74)f(0.81)f(0.95) \\
&= (p + 1)0.74^p(p + 1)0.81^p(p + 1)0.95^p \\
&= (p + 1)^3(0.56943)^p \\
l(p) &= \ln L(p) \\
&= 3\ln(p + 1) + p\ln(0.56943) \\
l'(p) &= \frac{3}{p + 1} - 0.563119 \\
&= 0 \\
p + 1 &= \frac{3}{0.563119} \\
&= 5.32747 \\
p &= 4.32747
\end{align*}$$

The answer is **D**.
