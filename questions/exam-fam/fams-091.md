---
id: "fams-091"
exam: "Exam FAM"
topic: "Limited Fluctuation Credibility"
learning_objective: "Introduction to Credibility"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Limited+Fluctuation+Credibility
  - Concepts/Full+Credibility+Standard
  - Concepts/Coefficient+of+Variation
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:a56b0bea496b8094a101a6d4151cfddb3675f2fb04c092746d222b784c3032a5
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q91, p.73, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q91, p.36, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-091.md
---

You are given:

(i) The number of claims follows a Poisson distribution.

(ii) The number of claims and claim severity are independent.

(iii) The severity distribution is:

| Claim Size | Probability |
|---|---|
| 5 | 0.60 |
| 40 | 0.35 |
| 60 | 0.05 |

Calculate the expected number of claims needed so the total cost of claims is within 5% of the expected with probability 0.90.

- A) 511
- B) 726
- C) 1083
- D) 2044
- E) 3126

## Explanation

For the severity distribution, we have $\mu_X = 20$ and $\sigma_X^2 = 355$. The standard for full credibility is

$$\begin{align*}
\left(\frac{1.645}{0.05}\right)^2\left(1 + CV_X^2\right) &= \left(\frac{1.645}{0.05}\right)^2\left(1 + \frac{355}{20^2}\right) \\
&= 2043.05
\end{align*}$$

Round up to 2044.

The answer is **D**.
