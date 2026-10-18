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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:44e2aac650a56468d2b48b3a3b64fa46fcf2125cfc28dd88896940e729414749
  sources: []
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
