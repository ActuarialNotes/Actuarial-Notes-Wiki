---
id: "fams-096"
exam: "Exam FAM"
topic: "Trend"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Trend
  - Concepts/Loss+Cost
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:2e467f5f7cb94a360c7f82cc6bdd14f151e3d4d11ca9d5d0815956e3ed589f83
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q96, p.78, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q96, p.37, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-096.md
---

An insurance company uses the following information to set new rates:

(i) The projected loss cost grows at an annual effective rate of 7% per year.

(ii) The table below shows loss cost data for two policy years, with corresponding weights:

| Policy Year | Loss Cost | Weight |
|---|---|---|
| PY3 | 600 | $1 - p$ |
| PY4 | 670 | $p$ |

(iii) New rates will be effective on April 1, CY9. Policies are one-year policies and rates will be in effect for one year.

The projected expected loss cost is 951.

Calculate $p$.

- A) 0.089
- B) 0.119
- C) 0.567
- D) 0.881
- E) 0.911

## Explanation

For any given policy year, the average accident date is a full year after the beginning of that year. Similarly for new rates effective on April 1, CY9, the midpoint of the effective period is April 1, CY10.

Therefore, the PY3 and PY4 loss costs will be projected 6.25 and 5.25 years, respectively.

Using the projected loss cost, we find:

$$\begin{align*}
600(1.07)^{6.25}(1 - p) + 670(1.07)^{5.25}(p) &= 951 \\
\Rightarrow p &= 0.8813
\end{align*}$$

The answer is **D**.
