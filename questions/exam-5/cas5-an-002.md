---
id: "cas5-an-002"
exam: "Exam 5"
topic: "Data Quality"
learning_objective: "Ratemaking"
difficulty: easy
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Data+Quality
  - Concepts/Data+Issues
  - Concepts/Reasonableness+Testing
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:9438b6fa5f440ff6094a4a352272e1721cb7ad31c3d8ccd01f0e916ed7d52fc1
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, v3 2010), Ch.3 Verification of the Data, printed pp.37-38 (PDF 43-44), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-5/cas5-an-002.md
---

An actuary is preparing an analysis from an insurer's paid claim data. In total the data reconcile to the insurer's financial statements within 0.1%. Reviewing the detail, the actuary finds several large negative paid claim amounts in one accident year, material to that year's results.

Which response is most appropriate?

- A) Delete the negative records before the analysis, since negative paid claims are data errors
- B) Proceed without further review, since the data reconcile to externally audited statements
- C) Require a formal audit of the claim data before any estimate is produced from it
- D) Replace that accident year's paid data with an industry benchmark pattern
- E) Find out what the negative amounts represent before using them, and document the review

## Explanation

Friedland's "Verification of the Data" (Chapter 3) lists the components of a data review: consistency with financial statement data, consistency with prior data, **data reasonableness** and data definitions. On reasonableness it names this very case: large negative paid claims are questionable values, and *questionable values are not always incorrect values*, but the actuary should generally investigate them before using them, especially when they are material. The verification and what it found should also be documented. The answer is **E**.

**Why not the others**

- **A** — this treats a questionable value as a wrong one. A negative paid amount may be a legitimate recovery or a correcting entry; deleting it unexamined could itself distort the data.
- **B** — reconciliation to the financial statements is only one of the review's components. Totals can tie out while individual values are unreasonable or offsetting.
- **C** — the actuarial standards require procedures to verify that the data are reliable and sufficient, *not* a formal audit of the data.
- **D** — nothing yet shows that the year's data are unusable. Replacing them is premature before the questionable values have been investigated.
