---
id: "cas6c-an-015"
exam: "Exam 6C"
topic: "Insurance Service Result"
learning_objective: "Canadian Financial Reporting, Solvency, and Professional Responsibility"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Insurance+Service+Result
  - Concepts/Insurance+Revenue
  - Concepts/Insurance+Service+Expenses
  - Concepts/Reinsurance+Contracts+Held
  - Concepts/Insurance+Finance+Income+or+Expenses
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:f7cac73fef9cc337bad49e07b3e6046d15fc9336c81a9a6173323b6735383c47
  sources:
    - "OSFI, P&C Core Financial Statement Quarterly Return PC1 (2023) (IFRS 17 workbook, CAS-hosted), page 20.22 Statement of Profit or Loss (lines 099-199 ISR; 310 insurance finance in Net Investment Result; 420 General and Operating Expenses), sha256:1de8ae31f568e91557650a1e78720e2ea7e310953e91ba5210444bea212afae0 — https://www.casact.org/sites/default/files/2022-05/6c_irfs17_core.xlsx"
    - "OSFI, P&C Supervisory Quarterly Return PC2 (IFRS 17 workbook, CAS-hosted), page 60.25 column headings, sha256:80070b06f101a632278aaa3407c646c0ae7c5062be3925266490c8bc8daf4251 — https://www.casact.org/sites/default/files/2022-05/6c_pc_irfs17_qrt.xlsx"
    - "CIA, Educational Note: IFRS 17 – Actuarial Considerations Related to Liability for Remaining Coverage in P&C Insurance Contracts (June 2022, Document 222092), §5.2 worked example (\"Other Expenses\" below the ISR), PDF p.25, sha256:a7e5ecea716dc20bffcc88045f20c950e71400ac3de3bfb1544736dac46a0333 — https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_IFRS_17_Actuarial_Considerations_Related_to_Liability.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-6c/cas6c-an-015.md
---

A P&C insurer reports the following for the year:

| Item | Amount |
|---|---|
| Insurance revenue | 5,000 |
| Incurred claims and other insurance service expenses | 3,400 |
| Amortization of insurance acquisition cash flows | 600 |
| Losses on onerous contracts | 100 |
| Net expenses from reinsurance contracts held | 300 |
| Insurance finance expenses from insurance contracts issued | 150 |
| General and operating expenses not directly attributable to insurance contracts | 250 |

Calculate the insurance service result.

- A) 200
- B) 350
- C) 450
- D) 600
- E) 900

## Explanation

The statement of profit or loss in OSFI's core financial statement return (page 20.22) defines the insurance service result as:

$$
\text{ISR} = \text{Insurance revenue} - \text{Insurance service expenses} - \text{Net expenses from reinsurance contracts held}
$$

Page 60.25 breaks insurance service expenses into incurred claims and other insurance service expenses, amortization of insurance acquisition cash flows, losses and reversal of losses on onerous contracts, and adjustments to liabilities for incurred claims. The table has no adjustment to liabilities for incurred claims, so:

$$
\begin{aligned}
\text{ISE} &= 3{,}400 + 600 + 100 \\
&= 4{,}100 \\
\text{ISR} &= 5{,}000 - 4{,}100 - 300 \\
&= 600
\end{aligned}
$$

Insurance finance expenses belong to the *net investment result*, and non-attributable expenses to *other income and expenses*. Both come below the ISR. The answer is **D**.

**Why not the others**

- **A** — 200 also deducts the insurance finance expense and the non-attributable expenses, as if the ISR were profit before tax.
- **B** — 350 also deducts the non-attributable expenses. The CIA's educational note on the LRC treats these as "other expenses" outside the insurance service result.
- **C** — 450 also deducts the insurance finance expense, mixing time-value effects into the underwriting measure IFRS 17 separates them from.
- **E** — 900 leaves out the net expense from reinsurance contracts held, which the return deducts above the ISR line.
