---
Title: "IFRS 17 Risk Adjustment for Non-Financial Risk for Property and Casualty Insurance Contracts"
Author: "Canadian Institute of Actuaries"
Year: "2024"
date: "2024"
Publisher: "Canadian Institute of Actuaries"
Type: "Educational Note"
Available from: "[cia-ica.ca](https://www.cia-ica.ca/publications/224090e/)"
verification:
  status: in_review
  confidence: null
  last_checked: 2026-09-25
  last_checked_by: agent:validate-v1
  content_hash: sha256:58fca790dc118bebace9a819aa68d82bd549b0c6732e34b8ec916d84b7327fdd
  sources:
    - "CIA Educational Note: IFRS 17 Risk Adjustment for Non-Financial Risk for Property and Casualty Insurance Contracts, August 14 2024 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=348400&fid=348401 via https://www.cia-ica.ca/publications/224090e/ (sha256 c34ba39e72404117d9827b3a71f478242b379024de017eea798f7f0e337d9d71)"
    - "CAS Exam 6C (Canada) Content Outline, Fall 2026 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf (sha256 1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1)"
  open_findings: 2
  open_critical: 0
  log: .verify/Resources/Books/CIA IFRS 2.md
---
![[CIA IFRS 2 - Cover.svg]]

The CIA's August 2024 note on computing the **[[Risk Adjustment for Non-Financial Risk|risk adjustment]]** for P&C contracts. Read for [[Exam 6C (CAS)|Exam 6C]] objectives C1–C3. The syllabus makes candidates **responsible for the Excel illustrations** attached to the note.

## What the risk adjustment is

IFRS 17 defines it as the compensation the entity requires for bearing the uncertainty about the **amount and timing** of cash flows that arises from **non-financial** risk. IFRS 17 prescribes no method — only that the entity **disclose the confidence level** to which its risk adjustment corresponds, which is what makes the choice of method examinable rather than arbitrary. It replaces the pre-2023 [[Margin for Adverse Deviations|PfADs]].

## Contents

| Section | Subject |
|---|---|
| 1–2 | Introduction; **transition from IFRS 4 to IFRS 17** |
| **3** | General considerations — 3.1 measurement approach · 3.2 diversification, allocation and aggregation · 3.3 [[Reinsurance Contracts Held\|reinsurance held]] · 3.4 discount rate · 3.5 time horizon · 3.6 disclosure requirements · 3.7 risk adjustment under the [[Premium Allocation Approach\|PAA]] |
| **4** | **Quantile methods** — 4.1 introduction · 4.2 generating a distribution · 4.3 measuring risk · 4.4 aggregation and allocation |
| **5** | **Cost of capital method** — 5.2 the general formula · 5.3 capital $C_t$ · 5.4 the cost of capital rate $r_t$ |
| **6** | **Margin method** |
| **7** | Reinsurance held methods — quantile methods, catastrophe models, proportional scaling, cost of capital |
| **8** | Catastrophe reinsurance |
| **9** | Combining approaches and methods — 9.1 aggregate/entity-level · 9.2 hybrid |
| **10** | **Quantification of the confidence level** — 10.1 quantile method as primary · 10.2 quantile method as secondary |

## The three families of method

- **Quantile** — build a distribution of the fulfilment cash flows (bootstrap, Mack, stochastic reserving, simulation), then take a risk measure: **VaR** at a chosen percentile, **TVaR**, or a proportional hazard transform. The confidence-level disclosure falls out directly.
- **Cost of capital** — hold capital against the run-off of the liabilities and charge a return on it: $RA=\sum_t r_t\, C_t\, v^{t}$, so the questions become what capital base $C_t$ and what rate $r_t$. This is the Solvency II construction (see [[IFOA]]), and needs section 10's back-solve to report an equivalent confidence level.
- **Margin** — a loading applied to the discounted best estimate, closest in spirit to the old PfADs.

## The judgements the exam probes

- **Diversification.** The risk adjustment is measured at the level the *entity* considers, but must be **allocated** down to groups of contracts for reporting. How much diversification benefit is recognised, and at what level, changes the answer materially — and IFRS 17 does not permit recognising diversification the entity does not actually have.
- **Reinsurance held** — the risk adjustment represents risk **transferred to** the reinsurer, so the net risk adjustment is smaller than the gross.
- **Time horizon** — to the end of the run-off, not to the end of the reporting period.
- **Under the PAA**, a risk adjustment is still required on the **[[Liability for Incurred Claims|LIC]]** (and on the [[Loss Component|loss component]] of an onerous group), even though the LRC is premium-based.

## Related readings
- [[CIA Discount Rates]] — the financial-risk half of the measurement
- [[CIA IFRS 17 - Comparison]] — the risk adjustment against the PfADs it replaced
- [[IFOA]] — the Solvency II risk margin, the same cost-of-capital construction

## Links
- [IFRS 17 Risk Adjustment for Non-Financial Risk for P&C Insurance Contracts (CIA)](https://www.cia-ica.ca/publications/224090e/)
