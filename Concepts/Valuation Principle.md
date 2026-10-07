---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:449f446c107ed0085c841721c7323c0ca571cacf48c06019c5c16919dd0a0e7f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Valuation Principle.md
---

**A Valuation Principle** is the set of rules a reporting framework lays down for measuring insurance contract liabilities ([[Reserve|reserves]]). It says which cash flows count; whether assumptions are prescribed, best-estimate, or best-estimate with margins; what [[Discount Rate|discount rate]] to use; whether assumptions are locked in or updated; and when profit emerges. U.S. [[Statutory Accounting Principles|statutory]], [[GAAP]], [[IFRS 17]], tax and the health-reserving standards each apply their own, so one block of business has several reserves.

> $$\text{Liability} = \text{PV}(\text{benefits} + \text{expenses}) - \text{PV}(\text{premiums})$$

> $$\text{IFRS 17 liability} = \text{PV(net outflows)} + \text{RA} + \text{CSM}$$

> $$\text{GAAP reserve} = \text{PV(benefits)} - \text{NPR} \times \text{PV(gross premiums)}$$

- **Statutory (ILA-201U, ILA-101).** The aim is solvency, so the basis is conservative. Formulaic reserves (CRVM for life, CARVM for annuities) use prescribed mortality and interest. Principle-based reserves (VM-20 for life, VM-21 for variable annuities) project cash flows on prudent-estimate assumptions. Under VM-20 the reserve is the largest of the formulaic net premium reserve, the deterministic reserve and the stochastic reserve.
- **U.S. GAAP (LDTI).** The aim is matching revenue and expense. The net premium ratio (NPR) is the share of gross premium needed to fund benefits. Cash-flow assumptions are reviewed and updated at least annually, the discount rate is an upper-medium-grade bond yield, and acquisition costs go into a separate DAC asset.
- **IFRS 17 (ILA-201I).** The aim is current measurement. [[Fulfilment Cash Flows|Fulfilment cash flows]] are unbiased and current, plus an explicit [[Risk Adjustment for Non-Financial Risk|risk adjustment]] (RA). The [[Contractual Service Margin|CSM]] holds unearned profit so that no gain is recognised at inception. An [[Onerous Contract|onerous]] group recognises its loss immediately.
- **Short-duration health (GH-201, CP-321).** [[Claim Reserve|Claim reserves]] are best estimates of unpaid claims, often with an explicit margin for adverse deviation. They are governed by [[Actuarial Standards of Practice|ASOP]] No. 5 for incurred claims and ASOP No. 42 for other health liabilities. Contract and premium-deficiency reserves sit alongside them.

> [!example]- Same Term Block, Two Bases {Example}
> A fully discrete 3-year term insurance of \$100,000 is valued on two bases with level net premiums. Basis A is prescribed and conservative: $q = 0.010, 0.014, 0.019$ in years 1 to 3, and $i = 3.5\%$. Basis B is best estimate: $q = 0.008, 0.011, 0.015$, and $i = 4.5\%$. Expenses are ignored, so on Basis B the NPR times the gross premium is just the net premium. Find each basis's reserve at time 1.
>
> > [!answer]-
> > On each basis, $P = 100{,}000\,A^1_{x:\overline{3}|}/\ddot{a}_{x:\overline{3}|}$. Then ${}_1V = 100{,}000\,A^1_{x+1:\overline{2}|} - P\,\ddot{a}_{x+1:\overline{2}|}$.
> > $$
> > \begin{align*}
> > P_A &= \frac{3{,}932.83}{2.86776} \\
> > &= 1{,}371.39 \\
> > {}_1V_A &= 3{,}101.50 - 1{,}371.39(1.95266) \\
> > &= 423.63 \\
> > P_B &= \frac{3{,}054.38}{2.84769} \\
> > &= 1{,}072.58 \\
> > {}_1V_B &= 2{,}411.12 - 1{,}072.58(1.94641) \\
> > &= 323.43
> > \end{align*}
> > $$
> > The conservative basis holds about $31\%$ more reserve for the same contract. The difference is profit that the conservative basis releases later.

> [!example]- IFRS 17 at Initial Recognition {Example}
> A group of life contracts has a PV of future premiums of 1,000 and a PV of future claims and expenses of 820, with RA = 60. Find the CSM and the liability at initial recognition. Repeat with outflows of 970.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{FCF} &= 820 + 60 - 1{,}000 \\
> > &= -120 \\
> > \text{CSM} &= 120 \\
> > \text{Liability} &= -120 + 120 \\
> > &= 0 \\
> > \text{FCF}' &= 970 + 60 - 1{,}000 \\
> > &= +30
> > \end{align*}
> > $$
> > The profitable group carries a CSM of 120 and no day-one gain. With outflows of 970 the group is onerous: no CSM, a [[Loss Component|loss component]] of 30, and a loss of 30 recognised at once.

> [!tip]- How it appears on the exam
> - **ILA-201U** tests the U.S. statutory (formulaic and principle-based) and GAAP (including DAC) principles. Questions ask for a reserve under a stated principle, or ask candidates to evaluate which method or assumption the principle requires.
> - **ILA-201I** describes and evaluates IFRS 17 for life and annuity products: fulfilment cash flows, risk adjustment, CSM release over coverage units, and onerous groups.
> - **GH-201** and **CP-321** test reserving principles for group and health contracts and for long-duration contracts, through claim reserve calculations and written answers on adequacy, margins and the relevant ASOPs.

> [!warning]- Exam traps
> - **One basis per answer.** Statutory mortality and interest are prescribed. GAAP and IFRS 17 assumptions are current. Valuing with the pricing basis because "it was given" is the usual slip.
> - **Locked-in vs updated.** Under LDTI, cash-flow assumptions are updated with a catch-up, while the discount rate for interest accretion stays locked in at issue. Updating both, or neither, misstates the reserve change.
> - **CSM is never negative.** An unfavourable fulfilment cash flow at inception makes a group onerous. A negative CSM in an answer means a loss has been deferred that should have been recognised.
> - **Conservatism is not a margin everywhere.** Statutory reserves are deliberately prudent, while IFRS 17 puts the margin into the explicit RA. Adding a statutory-style margin to IFRS 17 cash flows counts it twice.
