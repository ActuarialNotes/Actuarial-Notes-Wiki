---
Title: "Duration Considerations for P&C Insurers"
Author: "Canadian Institute of Actuaries"
Year: "2023"
date: "2023"
Publisher: "Canadian Institute of Actuaries"
Type: "Educational Note"
Available from: "[cia-ica.ca](https://www.cia-ica.ca/publications/223126e/)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:aad3d6fb04b6a628f9eb439ee3f8b613a0dd2c69c559831768dd1d8e84d4ef91
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/CIA Duration.md
---
![[CIA Duration - Cover.svg]]

The CIA's August 2023 note on **duration** for P&C insurers under [[IFRS 17]]. Read for [[Exam 6C (CAS)|Exam 6C]] objectives C1 and C5. The syllabus makes candidates **responsible for the Excel illustrations** attached to the note.

## Contents

1. Introduction and scope
2. **Duration defined**
3. **Discounting under IFRS 17**
4. **Duration of interest-rate-sensitive insurance contract assets and liabilities**
5. **Duration of interest-rate-sensitive assets**
6. Appendices

## Why it appeared when it did

Before IFRS 17, a P&C insurer's liabilities were discounted at a rate derived from its own assets, so an interest-rate movement pushed asset values and liability values in the same direction and the balance sheet was partly self-hedging. Under IFRS 17 the liability is discounted at a **liability-characteristic curve** (see [[CIA Discount Rates]]) while assets are measured under IFRS 9. The two now move independently, and the residual — the mismatch — lands in equity or in [[Insurance Finance Income or Expenses|insurance finance income or expenses]] depending on the [[Other Comprehensive Income Option|OCI option]] elected. Measuring the mismatch requires a duration on both sides computed consistently.

## The technical points

- **Macaulay versus modified versus effective duration**, and which is appropriate when the cash flows themselves respond to the rate.
- **The liability's cash flows are not fixed.** Claim payment patterns are estimates; inflation-sensitive cash flows (bodily injury, care costs) respond to the same economic conditions that move rates, so a nominal duration overstates the hedge. The note addresses computing duration on the discounted [[Fulfilment Cash Flows|fulfilment cash flows]].
- **Consistency of basis.** An asset duration computed off a market curve and a liability duration computed off the IFRS 17 curve are not directly comparable; the note sets out how to put them on the same footing.
- **What duration does not capture** — convexity, non-parallel shifts, and the illiquidity-premium component of the IFRS 17 curve, which does not move with the risk-free rate.

## Where it is used

Duration is the input to interest-rate matching in **[[FCT|financial condition testing]]** and **[[ORSA]]**, to the [[MCT|MCT]]'s market risk margin, and to the [[Appointed Actuary's Report|Appointed Actuary's Report]] discussion of the insurer's exposure to a rate movement. That is why the syllabus tags this note to C5 (professional responsibility) as well as C1.

## Related readings
- [[CIA Discount Rates]] — the curve whose movement duration measures
- [[OSFI MCT]] — the market risk margin for interest-rate risk
- [[CIA FCT 1]] — interest-rate scenarios in financial condition testing

## Links
- [Duration Considerations for P&C Insurers (CIA)](https://www.cia-ica.ca/publications/223126e/)
