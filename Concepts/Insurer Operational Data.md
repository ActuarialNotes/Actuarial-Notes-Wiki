---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:513163156a0d829c984b7b417ca4f906375dd6227d82fe8d3f130084edeba7fc
  sources:
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, May 2016), Ch.3 Ratemaking Data, printed pp.36-47 (PDF pp.48-59): Internal Data; Policy Database (Table 3.1); Claims Database (Table 3.2); Accounting Information; Data Aggregation; External Data intro, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurer Operational Data.md
---

**Insurer Operational Data** is the internal data an insurer's own systems record as it writes and services policies and settles claims. It is the main source for pricing and modelling an existing product, because it describes the insurer's own book at the level of the individual policy and claim.

It comes from three sources:

1. The **policy database**, of exposures, premium and the characteristics of each risk.
2. The **claims database**, of every payment and reserve change on each claim.
3. **Accounting** records, of expenses that belong to no single policy.

The first two hold *risk information* (exposures, premium, claim counts, losses and the characteristics of each policy and claim) record by record. *Accounting information*, such as underwriting expenses and unallocated loss adjustment expenses, is generally available only in aggregate, tracked by calendar year and sometimes approximated by line and state. Allocated loss adjustment expense is the part of claim expense that is on the claim record.

## The policy database

Each record of the policy database is a policy or a subdivision of one, and its fields describe it. What counts as a record depends on the exposure measure and on how premium is calculated. In homeowners a record may be one home for an annual term, in U.S. workers compensation records are often kept by payroll classification, and in personal auto a record may be kept for each coverage, each car and each driver. Typical fields are the policy identifier, risk identifiers (such as vehicle and operator numbers), the original effective and termination dates and the transaction date, written premium and written [[Exposure Base|exposure]] by coverage, and the characteristics: [[Rating Variable|rating variables]], underwriting variables and anything else known about the risk.

A cancellation or a mid-term change does not overwrite the original record. It adds records: one that reverses the unearned part of the original terms and, for a change, one that writes the rest of the term on the new terms. So the written premium of a policy $p$, summed over its records $r$, is

> $$\text{WP}_p = \sum_{r \in p} \text{WP}_r$$

- $\text{WP}_r$ is the written premium on record $r$, positive at issue and positive or negative for each cancellation or mid-term change.

Written exposure is netted the same way, and [[Earned Premium|earned]] and in-force premium are calculated from the records.

> [!example]- What records does each of these policies produce, and what are its net written exposure and premium? {Example}
> A homeowners insurer writes two annual policies, earned evenly by month.
>
> - Policy X is written on March 1, 2024 for \$900 and cancelled on December 1, 2024.
> - Policy Y is written on July 1, 2024 for \$800 with a \$500 deductible. On January 1, 2025 the insured raises the deductible to \$1,000, and the full annual premium on the new terms is \$700.
>
> > [!answer]-
> > - Policy X ran 9 of its 12 months, so the cancellation record reverses the last quarter of the term: $0.25 \times 900 = 225$.
> > - X has 2 records: $+1.00$ exposure and $+\$900$ on March 1, 2024, then $-0.25$ and $-\$225$ on December 1, 2024.
> > - Net, X is $0.75$ exposure and $900 - 225 = \$675$.
> > - Policy Y is changed halfway through its term. One record reverses the unearned half on the old deductible, $0.50 \times 800 = 400$, and another writes that half on the new deductible, $0.50 \times 700 = 350$.
> > - Y has 3 records: $+1.00$ and $+\$800$ at a \$500 deductible on July 1, 2024, $-0.50$ and $-\$400$ at \$500 on January 1, 2025, and $+0.50$ and $+\$350$ at \$1,000 on January 1, 2025.
> > - Net, Y is $1.00$ exposure and $800 - 400 + 350 = \$750$.
> > - For a model of the deductible's effect, Y's records are collapsed by period of exposure: $0.50$ exposure and \$400 at the \$500 deductible, and $0.50$ and \$350 at \$1,000, so each piece carries the characteristics in force while it was earned.

## The claims database

Each record of the claims database is usually a transaction on one claim, such as a payment or a change in its reserve. Typical fields are the policy and risk identifiers (to match the claim to its policy record), the claim and claimant identifiers, the accident, report and transaction dates, the claim status (open, closed and, where common, reopened), the claim count, the paid loss, an event identifier for catastrophes, the [[Case Reserves|case reserve]], paid [[Allocated Loss Adjustment Expense|allocated loss adjustment expense]], [[Salvage and Subrogation|salvage and subrogation]] recoveries, and claim characteristics such as the type of injury.

The reported (case-incurred) loss on a claim $c$ at valuation date $t$ is

> $$\text{Reported}_c(t) = \sum_{\tau \le t} \text{Paid}_{c,\tau} + \text{Case}_c(t)$$

- $\text{Paid}_{c,\tau}$ is a payment on the claim made on date $\tau$, on or before $t$.
- $\text{Case}_c(t)$ is the case reserve still held on the claim at $t$.

> [!example]- How many records does this claim produce, and what does it contribute to calendar year 2025 reported losses? {Example}
> A loss on Policy Y occurs on November 20, 2024 and is reported on November 25, 2024, when a \$12,000 case reserve is set. On January 15, 2025 the insurer pays \$3,000 and lowers the reserve to \$9,000. On April 10, 2025 it pays \$8,000 and closes the claim. On June 1, 2025 it recovers \$2,500 by subrogation.
>
> > [!answer]-
> > - Each transaction is a record: the report with its reserve, the two payments with their reserve changes, and the recovery. The claim has 4 records under one claim identifier.
> > - At December 31, 2024 nothing is paid and the reserve is \$12,000, so the reported loss is \$12,000.
> > - At December 31, 2025 the payments total $3{,}000 + 8{,}000 = \$11{,}000$ and the reserve is 0, so the reported loss is \$11,000, gross of the \$2,500 recovery, which is tracked separately and linked to the claim.
> > - Only payments made within 2025 count toward calendar year 2025, and the reserve counts as its change from the start of the year to the end, $0 - 12{,}000$.
> > - Calendar year 2025 reported losses are $11{,}000 + (0 - 12{,}000) = -\$1{,}000$. The year sees payments of \$11,000 but releases the \$12,000 reserve set in 2024, so this claim lowers calendar year 2025 reported losses by \$1,000.

## Using operational data

Because policy and claim information sit in separate databases, an analysis matches them on the policy and risk identifiers with a [[Table Join|table join]], and aggregates the transactions by [[Calendar Year|calendar year]], [[Accident Year|accident year]], [[Policy Year|policy year]] or report year. The same transactions give different totals depending on how they are aggregated. Some insurers provide a [[Data Mart|data mart]] built for ratemaking. Elsewhere the analyst starts from the transactional databases and reshapes the data.

The data are the insurer's own experience, at the finest level of detail kept, so they can be summarized for an overall rate review or kept at the policy level for a multivariate [[Classification Ratemaking|classification analysis]]. They also have limits:

- A characteristic is often captured in several systems and can be hard to merge.
- A field captured as a changing value (a driver's age) is less useful than a stable one it can be derived from (the date of birth).
- A claim characteristic can describe what drives claim size, but only characteristics known for every policyholder when the policy is quoted can be used in a rating algorithm.
- A new product has no history of its own, and sparse or unstable internal data may need [[External Data|external data]] or [[Statistical Plan|industry statistical data]] as a benchmark.
- The data must still be reviewed for [[Data Quality|quality]] before use.

> [!trap] Using a claim characteristic as a rating variable
> A characteristic recorded on the claim, such as the type of injury, may explain severity in a reserving study, but it cannot be a rating variable, because it is not known for a policyholder before a claim.
