---
id: "fams-102"
exam: "Exam FAM"
topic: "Risk Measure"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Risk+Measure
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:95aa2046b7550216765278fffaf09f1b14c182c1b5e4aa30d7daeb252de2f781
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q102, p.84, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q102, p.40, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-102.md
---

You are given:

(i) For any random variable $X$, the risk measure is $\rho(X) = \mu_X + k\sigma_X$.

(ii) The variables $Y$ and $Z$ are defined as follows:

| $y$ | $P(Y = y)$ |
|---|---|
| 0 | 0.2 |
| 1 | 0.8 |

and $Z$ is constant with $Z = 1$.

Calculate the largest value of $k$ such that $\rho$ has the monotonicity property with respect to $Y$ and $Z$.

- A) 0.50
- B) 0.75
- C) 1.00
- D) 1.25
- E) 1.50

## Explanation

The monotonicity property states that if $Y \le Z$ for all possible outcomes, then $\rho(Y) \le \rho(Z)$.

From the variable definitions, we have $\mu_Y = 0.8$, $\sigma_Y^2 = 0.8 - 0.8^2 = 0.16$, $\mu_Z = 1$, and $\sigma_Z^2 = 0$.

Monotonicity requires $0.8 + 0.4k \le 1$. Therefore, $k \le 0.5$.

The answer is **A**.
