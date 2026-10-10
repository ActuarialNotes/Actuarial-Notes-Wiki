---
id: "discda-an-215"
exam: "Exam DISC-DA"
topic: "Underwriting Modeling Dataset"
learning_objective: "9. Preparing Data for Insurance Applications"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Underwriting+Modeling+Dataset
  - Concepts/Earned+Exposure
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:939cac2751c7d10163bd57775cfcf9baf7bbbde125146bb79803c7cdfa1406d6
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §4.1 PDF p.46 (calendar-year exposure), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-215.md
---

An analyst builds calendar-year 2025 rows for an auto frequency model, measuring exposure in months / 12:

- **Q1:** annual policy effective 2025-04-01; one claim on 2025-05-14.
- **Q2:** annual policy effective 2024-10-01; claims on 2024-12-02 and 2025-02-20.
- **Q3:** six-month policy effective 2025-07-01; no claims.

What are the total 2025 earned exposure and claim count?

- A) 3.00 car-years and 3 claims
- B) 2.50 car-years and 2 claims
- C) 2.00 car-years and 2 claims
- D) 2.00 car-years and 3 claims

## Explanation

Each row holds only the part of a term that falls in 2025, and only the claims with accident dates in that part.

$$
\begin{align*}
e_{Q1} &= \tfrac{9}{12} \\
&= 0.75 \\
e_{Q2} &= \tfrac{9}{12} \\
&= 0.75 \\
e_{Q3} &= \tfrac{6}{12} \\
&= 0.50 \\
e_{\text{total}} &= 0.75 + 0.75 + 0.50 \\
&= 2.00
\end{align*}
$$

Q1 earns April to December, Q2 January to September, and Q3 July to December. The claims are Q1's May claim and Q2's February claim; Q2's December 2024 claim belongs to the 2024 row. The answer is **C**.

**Why not the others**

- **A** — counts each policy as a full car-year and keeps the 2024 claim.
- **B** — treats the six-month Q3 as if it earned 1.00 car-year in 2025.
- **D** — has the exposure right but attaches Q2's 2024 claim to the 2025 row.
