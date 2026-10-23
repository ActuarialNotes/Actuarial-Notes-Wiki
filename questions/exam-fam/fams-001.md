---
id: "fams-001"
exam: "Exam FAM"
topic: "Limited Fluctuation Credibility"
learning_objective: "Introduction to Credibility"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Limited+Fluctuation+Credibility
  - Concepts/Full+Credibility+Standard
  - Concepts/Pareto+Distribution
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:4a3285b12f8dae5e71e1abdad8fdb29b53dc095db1606e024a5237493f3a889c
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q1, p.2, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q1, p.2, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-001.md
---

You are given:

(i) The number of claims has a Poisson distribution.

(ii) Claim sizes have a Pareto distribution with parameters $\theta = 0.5$ and $\alpha = 6$

(iii) The number of claims and claim sizes are independent.

(iv) The observed average total payment should be within 2% of the expected average total payment 90% of the time.

Calculate the expected number of claims needed for full credibility.

- A) Less than 7,000
- B) At least 7,000, but less than 10,000
- C) At least 10,000, but less than 13,000
- D) At least 13,000, but less than 16,000
- E) At least 16,000

## Explanation

The standard for full credibility is

$$\left(\frac{1.645}{0.02}\right)^2\left(1+\frac{Var(X)}{E(X)^2}\right)$$

where $X$ is the claim size variable.

For the Pareto variable,

$$\begin{align*}
E(X) &= 0.5/5 \\
&= 0.1 \\
Var(X) &= \frac{2(0.5)^2}{5(4)} - (0.1)^2 \\
&= 0.015
\end{align*}$$

Then the standard is

$$\begin{align*}
n &= \left(\frac{1.645}{0.02}\right)^2\left(1+\frac{0.015}{0.1^2}\right) \\
&= 16{,}913 \text{ claims.}
\end{align*}$$

The answer is **E**.
