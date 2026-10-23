---
id: "fams-046"
exam: "Exam FAM"
topic: "Mixture Distribution"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Mixture+Distribution
  - Concepts/Pareto+Distribution
  - Concepts/Probability
  - Concepts/Severity
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:f06bc5818ecc49a97d6289f0136e314a30c5c8ba643a9e45ef19291681326b50
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q46, p.37, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q46, p.21, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-046.md
---

The distribution of a loss, $X$, is a two-point mixture:

(i) With probability 0.8, $X$ has a Pareto distribution with $\alpha = 2$ and $\theta = 100$.

(ii) With probability 0.2, $X$ has a Pareto distribution with with (as printed) $\alpha = 4$ and $\theta = 3000$.

Calculate $P(X \le 200)$.

- A) 0.76
- B) 0.79
- C) 0.82
- D) 0.85
- E) 0.88

## Explanation

$$\begin{align*}
F(200) &= 0.8\left[1 - \left(\frac{100}{200 + 100}\right)^2\right] + 0.2\left[1 - \left(\frac{3000}{3000 + 200}\right)^4\right] \\
&= 0.7566
\end{align*}$$

The answer is **A**.
