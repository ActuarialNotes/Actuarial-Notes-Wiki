---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9057e0f64f81424080cf43ecd7e88d2e7094df91a9bde714d9a26f485e08676d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Valuation Principle.md
---
A **Valuation Principle** is the set of rules a reporting framework lays down for measuring insurance contract liabilities ([[Reserve|reserves]]). U.S. [[Statutory Accounting Principles|statutory]], [[GAAP]], [[IFRS 17]], tax and the health-reserving standards each apply their own, so one block of business has several reserves.

A valuation principle settles five questions:

1. Which cash flows count.
2. Whether assumptions are prescribed, best-estimate, or best-estimate with margins.
3. What [[Discount Rate|discount rate]] to use.
4. Whether assumptions are locked in or updated.
5. When profit emerges.

Whatever the principle, a prospective liability is

> $$\text{Liability} = \text{PV}(\text{benefits} + \text{expenses}) - \text{PV}(\text{premiums})$$

The principles differ in the assumptions and the discount rate that go into each present value.

> [!example]- What is this term policy's reserve at time 1 on each basis? {Example}
> A fully discrete 3-year term insurance of $\$100{,}000$ is valued on two bases with level net premiums, and expenses are ignored.
>
> | Basis | $q$ in years 1, 2, 3 | $i$ |
> | :--- | :--- | ---: |
> | A, prescribed and conservative | 0.010, 0.014, 0.019 | 3.5% |
> | B, best estimate | 0.008, 0.011, 0.015 | 4.5% |
>
> > [!answer]-
> > - On each basis, $P = 100{,}000\,A^1_{x:\overline{3}|}/\ddot{a}_{x:\overline{3}|}$ and ${}_1V = 100{,}000\,A^1_{x+1:\overline{2}|} - P\,\ddot{a}_{x+1:\overline{2}|}$.
> > - On Basis A, $P = 3{,}932.83/2.86776 = 1{,}371.39$.
> > - On Basis A, ${}_1V = 3{,}101.50 - 1{,}371.39 \times 1.95266 = 423.63$.
> > - On Basis B, $P = 3{,}054.38/2.84769 = 1{,}072.58$.
> > - On Basis B, ${}_1V = 2{,}411.12 - 1{,}072.58 \times 1.94641 = 323.43$.
> > - The conservative basis holds about 31% more reserve for the same contract. The difference is profit that the conservative basis releases later.

## U.S. statutory

The aim is solvency, so the basis is conservative. Formulaic reserves (CRVM for life, CARVM for annuities) use prescribed mortality and interest. Principle-based reserves (VM-20 for life, VM-21 for variable annuities) project cash flows on prudent-estimate assumptions. Under VM-20 the reserve is the largest of the formulaic net premium reserve, the deterministic reserve and the stochastic reserve.

## U.S. GAAP

The aim of U.S. GAAP under long-duration targeted improvements (LDTI) is matching revenue and expense. The GAAP reserve is

> $$\text{GAAP reserve} = \text{PV(benefits)} - \text{NPR} \times \text{PV(gross premiums)}$$

- $\text{NPR}$ is the net premium ratio, the share of gross premium needed to fund benefits.

Cash-flow assumptions are reviewed and updated at least annually, with a catch-up, while the discount rate for interest accretion stays locked in at issue. The discount rate is an upper-medium-grade bond yield. Acquisition costs go into a separate DAC asset. In the term example above with expenses ignored, the NPR times the gross premium on Basis B is just the net premium.

## IFRS 17

The aim of IFRS 17 is current measurement. The liability for a group of contracts is

> $$\text{IFRS 17 liability} = \text{PV(net outflows)} + \text{RA} + \text{CSM}$$

- $\text{PV(net outflows)}$ is the present value of future outflows less inflows, the [[Fulfilment Cash Flows|fulfilment cash flows]] before the risk adjustment, unbiased and current.
- $\text{RA}$ is the explicit [[Risk Adjustment for Non-Financial Risk|risk adjustment for non-financial risk]].
- $\text{CSM}$ is the [[Contractual Service Margin|contractual service margin]], which holds unearned profit so that no gain is recognised at inception.

The CSM is never negative. An [[Onerous Contract|onerous]] group recognises its loss immediately. Statutory reserves are deliberately prudent, while IFRS 17 puts the margin into the explicit RA, so a statutory-style margin added to IFRS 17 cash flows counts it twice.

> [!example]- What are this group's CSM and liability at initial recognition, and what if its outflows are 970? {Example}
> A group of life contracts has a PV of future premiums of 1,000 and a PV of future claims and expenses of 820, with an RA of 60.
>
> > [!answer]-
> > - The fulfilment cash flows are $820 + 60 - 1{,}000 = -120$.
> > - The CSM absorbs the profit, so $\text{CSM} = 120$.
> > - The liability is $-120 + 120 = 0$, with no day-one gain.
> > - With outflows of 970, the fulfilment cash flows are $970 + 60 - 1{,}000 = +30$.
> > - The group is onerous: there is no CSM, a [[Loss Component|loss component]] of 30, and a loss of 30 recognised at once.

## Short-duration health

[[Claim Reserve|Claim reserves]] are best estimates of unpaid claims, often with an explicit margin for adverse deviation. They are governed by [[Actuarial Standards of Practice|ASOP]] No. 5 for incurred claims and ASOP No. 42 for other health liabilities. Contract and premium-deficiency reserves sit alongside them.

> [!trap] Valuing on the pricing basis
> Statutory mortality and interest are prescribed, and GAAP and IFRS 17 assumptions are current. Using the pricing basis because it was given in the question is the usual slip.
