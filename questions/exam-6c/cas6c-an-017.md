---
id: "cas6c-an-017"
exam: "Exam 6C"
topic: "Other Comprehensive Income Option"
learning_objective: "Canadian Financial Reporting, Solvency, and Professional Responsibility"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Other+Comprehensive+Income+Option
  - Concepts/Insurance+Finance+Income+or+Expenses
  - Concepts/IFRS+17+Discount+Rates
  - Concepts/Comprehensive+Income
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:6bdc4684601c2fa68f14dfcf6fae2f07c2a317f483e3a52a3d3b40abb19e13b7
  sources:
    - "CIA, Educational Note: IFRS 17 Discount Rates and Cash Flow Considerations for P&C Insurance Contracts (2025, Document 225109), §10 Locked-in yield curve (purposes; IFRS 17.B72(e)(iii) date of incurred claims for PAA OCI option), PDF p.28; §12.1 (IFRS 17.88, B130), PDF p.32, sha256:ba5d55e4e3429fa74681b03719336d5e186a812856f0445a5c4f8438fec5c4dc — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=628504&fid=628505"
    - "OSFI, P&C Core Financial Statement Quarterly Return PC1 (2023) (IFRS 17 workbook, CAS-hosted), page 20.42 Comprehensive Income: \"Insurance Finance Income (Expenses) Reserve from Insurance Contracts\" under items that may be reclassified, sha256:1de8ae31f568e91557650a1e78720e2ea7e310953e91ba5210444bea212afae0 — https://www.casact.org/sites/default/files/2022-05/6c_irfs17_core.xlsx"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-6c/cas6c-an-017.md
---

A P&C insurer measures its contracts under the premium allocation approach and has elected the option in IFRS 17.88 to disaggregate insurance finance income or expenses (IFIE) between profit or loss and other comprehensive income (OCI).

For the year:

- Total IFIE on its liability for incurred claims is a net **income** of 90.
- The systematic allocation to profit or loss, computed with the yield curves locked in at the dates the claims were incurred, is an **expense** of 60.

How is the IFIE presented?

- A) Profit or loss: income of 90; OCI: nil
- B) Profit or loss: income of 150; OCI: expense of 60
- C) Profit or loss: nil; OCI: income of 90
- D) Profit or loss: expense of 60; OCI: income of 150
- E) Profit or loss: income of 90; OCI: income of 150

## Explanation

The CIA's educational note on IFRS 17 discount rates explains that locked-in yield curves are used for "systematic allocation of IFIE to the income statement if the entity chooses to disaggregate the IFIE between profit and loss and the OCI." For groups under the PAA, the locked-in curves for the OCI option are those at the date of the incurred claims (IFRS 17.B72(e)(iii)).

Profit or loss shows the systematic amount, and OCI shows the rest of the total:

$$
\begin{aligned}
\text{Profit or loss} &= \text{expense of } 60 \\
\text{OCI} &= \text{Total} - \text{P\&L} \\
&= (-90) - (+60) \\
&= -150 \quad\text{(income of 150)}
\end{aligned}
$$

Here a positive sign is an expense. Total comprehensive income is unchanged (a net income of 90 either way). The option moves the effect of rate changes out of profit, and on OSFI's core return it appears in OCI as the *Insurance Finance Income (Expenses) Reserve from Insurance Contracts*, an item that may be reclassified to net income. The answer is **D**.

**Why not the others**

- **A** — the presentation with *no* election: all IFIE in profit or loss.
- **B** — reverses the split, putting the systematic amount in OCI and the remainder in profit.
- **C** — puts all IFIE in OCI. The option leaves the systematic amount in profit or loss.
- **E** — counts the rate effect twice, once in profit and again in OCI, so total comprehensive income no longer equals the total IFIE.
