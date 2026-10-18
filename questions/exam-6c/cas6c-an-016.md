---
id: "cas6c-an-016"
exam: "Exam 6C"
topic: "Insurance Finance Income or Expenses"
learning_objective: "Canadian Financial Reporting, Solvency, and Professional Responsibility"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Insurance+Finance+Income+or+Expenses
  - Concepts/Liability+for+Incurred+Claims
  - Concepts/IFRS+17+Discount+Rates
  - Concepts/Insurance+Service+Expenses
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:590eda18e8d6db3d8aae51d0a4dfcfd015b6ede0722274fe7c0816f642a97d44
  sources:
    - "CIA, Educational Note: IFRS 17 Discount Rates and Cash Flow Considerations for P&C Insurance Contracts (2025, Document 225109), §2 Terminology (IFIE definition and components), PDF p.9; §11 and §11.2 (changes in payment patterns and risk adjustment belong in insurance service expense), PDF pp.29-31, sha256:ba5d55e4e3429fa74681b03719336d5e186a812856f0445a5c4f8438fec5c4dc — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=628504&fid=628505"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-6c/cas6c-an-016.md
---

During the year, an insurer's discounted liability for incurred claims (LIC) changes for the following reasons:

| Reason | Change in LIC |
|---|---|
| Unwinding of the discount as time passes | +40 |
| Increase in current discount rates | -70 |
| Adverse development of the undiscounted estimate for prior accident years | +120 |
| Release of risk adjustment as risk expires | -15 |

Calculate the insurance finance income or expenses (IFIE) for the year.

- A) Net insurance finance income of 70
- B) Net insurance finance income of 30
- C) Insurance finance expense of 40
- D) Insurance finance expense of 90
- E) Insurance finance expense of 110

## Explanation

The CIA's educational note on IFRS 17 discount rates defines IFIE as "the change in the carrying amount of the group of insurance contracts arising from the effect of the time value of money and changes in the time value of money and financial risk." Its components are the **unwinding of discount** and **changes in discounting assumptions** (and, rarely for P&C, other financial risk).

$$
\text{IFIE} = \underbrace{+40}_{\text{unwind}} + \underbrace{(-70)}_{\text{rate increase}} = -30
$$

A net reduction in the liability from financial effects is **income**, so the answer is **B**: net insurance finance income of 30. The adverse development and the risk adjustment release relate to non-financial estimates and service. They are reported in insurance service expenses.

**Why not the others**

- **A** — counts only the effect of the rate change and leaves out the unwind.
- **C** — counts only the unwind. A change in discount rates is IFIE too.
- **D** — 90 adds the adverse development of 120 to the financial items. Changes in estimates of claims already incurred are service, not finance.
- **E** — 110 adds the unwind and the rate effect as if both increased the liability, ignoring that higher rates *lower* the present value.
