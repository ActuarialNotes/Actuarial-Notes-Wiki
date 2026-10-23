---
id: "fams-003"
exam: "Exam FAM"
topic: "Frequency Distribution"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Frequency+Distribution
  - Concepts/Negative+Binomial+Distribution
  - Concepts/Poisson+Distribution
  - Concepts/Model+Selection
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:40bc08a3495eb9fe36d8adf3c9a6466ab7aa25d1772e37b8635b5a909cd10767
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q3, p.4, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q3, p.2, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-003.md
---

The distribution of accidents for 84 randomly selected policies is as follows:

| Number of Accidents | Number of Policies |
|---|---|
| 0 | 32 |
| 1 | 26 |
| 2 | 12 |
| 3 | 7 |
| 4 | 4 |
| 5 | 2 |
| 6 | 1 |
| Total | 84 |

Determine which of the following models best represents these data.

- A) Negative binomial
- B) Discrete uniform
- C) Poisson
- D) Binomial
- E) Zero-modified Poisson

## Explanation

| $k$ | $kn_k/n_{k-1}$ |
|---|---|
| 0 | |
| 1 | 0.81 |
| 2 | 0.92 |
| 3 | 1.75 |
| 4 | 2.29 |
| 5 | 2.50 |
| 6 | 3.00 |

Positive slope implies that the negative binomial distribution is a good choice. Alternatively, the sample mean and variance are 1.2262 and 1.9131 respectively. With the variance substantially exceeding the mean, the negative binomial model is again supported.

The answer is **A**.
