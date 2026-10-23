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
  - Concepts/Probability+Distributions
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:31a458209eb122255c4572ae8eed14bf67fae5b1053c68cfbd7bac17cc792bb9
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q22, p.18, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q22, p.12, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
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
