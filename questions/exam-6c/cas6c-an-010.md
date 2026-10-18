---
id: "cas6c-an-010"
exam: "Exam 6C"
topic: "Coverage Units"
learning_objective: "Canadian Financial Reporting, Solvency, and Professional Responsibility"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Coverage+Units
  - Concepts/Contractual+Service+Margin
  - Concepts/General+Measurement+Model
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:668cfe81726f376c49f6111e79ffa87e5fffe7b12a3c72f73b95d87bf443c0b4
  sources:
    - "CIA, Educational Note: IFRS 17 – Actuarial Considerations Related to Liability for Remaining Coverage in P&C Insurance Contracts (June 2022, Document 222092), §4.6 (IFRS 17.44(e), B119 allocation), PDF p.17-18; §4.7 Coverage units, declining limit pattern and cancellation example, PDF pp.18-21, sha256:a7e5ecea716dc20bffcc88045f20c950e71400ac3de3bfb1544736dac46a0333 — https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_IFRS_17_Actuarial_Considerations_Related_to_Liability.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-6c/cas6c-an-010.md
---

A one-year contract measured under the general measurement approach has a CSM of 1,000 at initial recognition. Its policy limit declines over the year, and the insurer uses the limit in force as its coverage units:

| Quarter | Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|---|
| Coverage units (limit, in thousands) | 400 | 300 | 200 | 100 |

There is no discounting and no change in assumptions. The policyholder cancels the contract at the end of Q2.

Calculate the CSM recognized in profit or loss in Q2.

- A) 180
- B) 250
- C) 300
- D) 600
- E) 1,000

## Explanation

Each period, the CSM at the end of the period (before release) is allocated equally to each coverage unit provided in the period and expected in future periods (IFRS 17.44(e) and B119). The share released is:

$$
\frac{\text{units in the period}}{\text{units in the period} + \text{expected remaining units}}
$$

**Q1:** 400 / (400 + 300 + 200 + 100) = 40%, so 400 is released and the CSM falls to 600.

**Q2:** the contract is cancelled at the end of Q2, so no coverage units remain after the quarter:

$$
\frac{300}{300 + 0} = 100\% \quad\Rightarrow\quad \text{Q2 release} = 100\% \times 600 = 600
$$

This follows the CIA educational note's own cancellation example (section 4.7): with no expected remaining coverage units, "the full CSM is amortized." The answer is **D**.

**Why not the others**

- **A** — 180 multiplies Q2's share of the *original* total units (30%) by the opening CSM of 600, mixing two bases.
- **B** — 250 releases the CSM evenly over four quarters, ignoring both the declining limit and the cancellation.
- **C** — 300 is the Q2 release if the contract had run to term (600 × 300/600). It ignores the cancellation, after which no coverage remains to carry CSM forward.
- **E** — 1,000 releases the CSM at initial recognition, forgetting the 400 already released in Q1.
