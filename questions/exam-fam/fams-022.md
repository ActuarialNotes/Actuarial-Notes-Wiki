---
id: "fams-022"
exam: "Exam FAM"
topic: "Frequency Distribution"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Frequency+Distribution
  - Concepts/Panjer+Recursion
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2cf8b295f199842815785bbc5e18f6f57d81e8d10095695e62eb2eddef6a5a0d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-022.md
---

$X$ is a discrete random variable with a probability function that is a member of the $(a,b,0)$ class of distributions.

You are given:

(i) $\text{P}(X = 0) = \text{P}(X = 1) = 0.25$

(ii) $\text{P}(X = 2) = 0.1875$

Calculate $\text{P}(X = 3)$.

- A) 0.120
- B) 0.125
- C) 0.130
- D) 0.135
- E) 0.140

## Explanation

$$p_k = \left(a + \frac{b}{k}\right)p_{k-1}$$

$$0.25 = (a+b)0.25 \Rightarrow a = 1 - b$$

$$0.1875 = \left(a + \frac{b}{2}\right)(0.25) \Rightarrow 0.1875 = (1 - 0.5b)(0.25) \Rightarrow b = 0.5,\ a = 0.5$$

$$\begin{align*}
p_3 &= \left(0.5 + \frac{0.5}{3}\right)(0.1875) \\
&= 0.125
\end{align*}$$

The answer is **B**.
