---
id: "fams-086"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Normal+Approximation
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:a333adfb284a6cf11625eecd0a3bb323fc016ec6885201a63eb432a0671f54ab
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q86, p.68, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q86, p.34, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-086.md
---

For a product liability policy, you are given:

(i) The following statistics for products X and Y

| | | Product X | Product Y |
|---|---|---|---|
| Number of Claims | Mean | 10 | 2 |
| | Standard Deviation | 3 | 1 |
| Loss Amount | Mean | 20 | 50 |
| | Standard Deviation | 5 | 10 |

(ii) Loss amounts and claim numbers are independent within and between products.

(iii) Aggregate losses, for both products combined, approximately follow the normal distribution.

Determine the probability that aggregate losses for both products combined exceed 400.

- A) Less than 0.10
- B) At least 0.10, but less than 0.15
- C) At least 0.15, but less than 0.20
- D) At least 0.20, but less than 0.25
- E) At least 0.25

## Explanation

For Product X: aggregate losses have mean $10 \times 20 = 200$ and variance $10 \times 25 + 400 \times 9 = 3850$.

For Product Y: aggregate losses have mean $2 \times 50 = 100$ and variance $2 \times 100 + 2500 = 2700$.

Because Product X and Product Y are independent, total aggregate losses, $S$, have mean 300 and variance 6550.

Using the normal approximation, we have:

$$\begin{align*}
P(S > 400) &= P\left(\frac{S - 300}{\sqrt{6550}} > \frac{400 - 300}{\sqrt{6550}}\right) \\
&= P(Z > 1.24) \\
&= 0.11
\end{align*}$$

The answer is **B**.
