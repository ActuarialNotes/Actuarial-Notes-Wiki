---
id: "cas6c-an-008"
exam: "Exam 6C"
topic: "Contractual Service Margin"
learning_objective: "Canadian Financial Reporting, Solvency, and Professional Responsibility"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Contractual+Service+Margin
  - Concepts/Fulfilment+Cash+Flows
  - Concepts/Risk+Adjustment+for+Non-Financial+Risk
  - Concepts/General+Measurement+Model
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:8fceaacf393d332db20970ce3e203f5990b53dd81028afd781a61ac2782fd699
  sources:
    - "CIA, Educational Note: IFRS 17 – Actuarial Considerations Related to Liability for Remaining Coverage in P&C Insurance Contracts (June 2022, Document 222092), §4.6 Contractual service margin, PDF p.17 (\"the CSM is set at the amount such that no profit is recognized ... with a floor of zero\"), sha256:a7e5ecea716dc20bffcc88045f20c950e71400ac3de3bfb1544736dac46a0333 — https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_IFRS_17_Actuarial_Considerations_Related_to_Liability.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-6c/cas6c-an-008.md
---

An insurer measures a group of multi-year contracts under the general measurement approach. At initial recognition:

| Item | Amount |
|---|---|
| Present value of future cash inflows (premiums) | 10,000 |
| Present value of future cash outflows (claims and directly attributable expenses) | 8,200 |
| Risk adjustment for non-financial risk | 600 |

Determine the contractual service margin (CSM) at initial recognition and the amount recognized in profit or loss on that date.

- A) CSM of 1,800; nothing recognized in profit or loss
- B) CSM of 0; a gain of 1,200 recognized in profit or loss
- C) CSM of 1,200; nothing recognized in profit or loss
- D) CSM of 1,200; a gain of 600 recognized in profit or loss
- E) CSM of 600; a gain of 600 recognized in profit or loss

## Explanation

The fulfilment cash flows are the present value of the future cash flows plus the risk adjustment:

$$
\text{FCF} = 8{,}200 - 10{,}000 + 600 = -1{,}200
$$

The negative sign means a net inflow. The CIA's educational note on the LRC (section 4.6) says that at initial recognition "the CSM is set at the amount such that no profit is recognized": inflows less outflows, floored at zero.

$$
\text{CSM}_0 = \max(0,\ 10{,}000 - 8{,}200 - 600) = 1{,}200
$$

The CSM is the **unearned profit**, released as insurance contract services are provided, so nothing reaches profit or loss on day one. The answer is **C**.

**Why not the others**

- **A** — leaves out the risk adjustment. The RA is part of the fulfilment cash flows, so it reduces the CSM.
- **B** — recognizes a day-one gain. IFRS 17 defers the profit in the CSM. Only a *loss* on an onerous group is recognized immediately.
- **D** — treats the risk adjustment as released at inception. The RA is part of the liability and is released as risk expires.
- **E** — splits the profit arbitrarily. Nothing is recognized at inception, and the full 1,200 is deferred.
