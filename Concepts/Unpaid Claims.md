---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:10f5eb35a811c1a04b2db76fadead6c15b7814593d748cb1aa792e5f3c4eddd7
  sources:
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), SSAP No. 55 ¶4, 6.a-c, 11, 13-14 (PDF pp.362-363, 367); SSAP No. 62R ¶31 (PDF pp.441-442), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), Ch.2 p.12 (printed 11); Ch.22 p.306 (printed 305), sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf"
    - "ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, updated for deviation language May 2011, Doc. No. 159), sections 2.1, 2.11 (PDF p.8) — re-fetched this run; this ASB copy's hash differs from the copy cited in run f8d9 (the 2011 deviation-language reissue), definitions identical, sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.1 printed pp.13-14 — prior-pass source, re-fetched, hash unchanged, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Unpaid Claims.md
---

![[Media/Figures/Unpaid_Claims.svg|340]]

**Unpaid Claims** are an insurer's liability, at a valuation date, for claims that occurred on or before that date but have not yet been paid. [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] calls the actuary's estimate of it the **unpaid claim estimate**: the estimate of the obligation for future payment resulting from claims due to past events. For a group of claims, such as an [[Accident Year|accident year]], it is

> $$\text{Unpaid Claims} = \text{Ultimate Claims} - \text{Paid Claims}$$

> $$\text{Unpaid Claims} = \text{Case Outstanding} + \text{IBNR}$$

- $\text{Ultimate Claims}$ are the total value of the claims after all of them are settled and closed with no chance of reopening ([[Ultimate Loss|ultimate claims]]).
- $\text{Paid Claims}$ are the cumulative [[Paid Losses|claim payments]] through the valuation date.
- $\text{Case Outstanding}$ is the total of the [[Case Reserves|case reserves]] that claims professionals set on reported claims.
- $\text{IBNR}$ is the broad [[IBNR]]: ultimate claims minus reported claims, where reported claims are paid claims plus case outstanding.

Ultimate claims are projected first, and the unpaid claim estimate follows from them. The estimate covers [[Allocated Loss Adjustment Expense|ALAE]] when the claims data include it, and the unpaid [[Unallocated Loss Adjustment Expenses ULAE|ULAE]] is estimated separately. The same identities hold on any basis, so unpaid claims net of [[Reinsurance|reinsurance]] are net ultimate claims minus net paid claims.

> [!example]- An accident year has projected ultimate claims of $\$5{,}000{,}000$, paid claims of $\$1{,}800{,}000$ and case outstanding of $\$2{,}200{,}000$. What are its unpaid claims and its IBNR? {Example}
> - The unpaid claims are $5{,}000{,}000 - 1{,}800{,}000 = \$3{,}200{,}000$.
> - The reported claims are $1{,}800{,}000 + 2{,}200{,}000 = \$4{,}000{,}000$.
> - The IBNR is $5{,}000{,}000 - 4{,}000{,}000 = \$1{,}000{,}000$.
> - As a check, case outstanding plus IBNR is $2{,}200{,}000 + 1{,}000{,}000 = \$3{,}200{,}000$, the same unpaid claims.

## Components of the unpaid claim estimate

Friedland divides the unpaid claim estimate into five components:

1. **Case outstanding** on known claims.
2. **Provision for future development on known claims**, called IBNER (incurred but not enough reported).
3. **Estimate for reopened claims.**
4. **Provision for claims incurred but not reported**, called pure IBNR or IBNYR.
5. **Provision for claims in transit**, which are reported but not yet recorded.

The last four together are the broad definition of IBNR. Separating IBNER from pure IBNR tests the adequacy of case outstanding over time.

## Unpaid claim estimate and carried reserve

ASOP 43 limits the word *reserve* to an amount booked in a financial statement. The **carried reserve** is the amount reported in a published or internal statement of financial condition. The unpaid claim estimate is the result of one estimation technique, so different techniques give different estimates for the same claims, and the estimate changes from one valuation date to the next. ASOP 43's **actuarial central estimate** is an estimate that represents an expected value over the range of reasonably possible outcomes.

The same estimate is needed by self-insurers, captives and pools, which retain [[Risk|risk]] through a [[Self-Insured Retention|self-insured retention]] rather than an insurance policy.

## Importance of accurate estimates

An inaccurate estimate misleads everyone who relies on the insurer's financial statements:

1. **Internal management.** Unpaid claim estimates feed pricing, underwriting, strategic and financial decisions, including reinsurance purchases, claims management and the allocation of capital between lines. An inadequate estimate can lead the insurer to cut rates that were already too low, and a redundant one to raise rates and lose market share.
2. **Investors.** An insurer with inadequate reserves overstates its profitability and looks stronger than it is, which may attract investment that would not otherwise be made. Redundant reserves understate profitability and may drive investors away.
3. **Regulators.** Regulators rely on the financial statements to assess solvency. An inadequate estimate can hide a struggling insurer until it is too late to help it, and a redundant one can prompt an intervention that is not needed. Indicated rates are built on estimates of ultimate claims, so the same error reaches the rate filings regulators review.

Estimating unpaid claims is also required by law. Most U.S. insurers file a Statement of Actuarial Opinion on their carried loss and LAE reserves, and Canadian insurers have an Appointed Actuary.

## Unpaid claims net of reinsurance

Gross, ceded and net unpaid claims are each ultimate claims minus paid claims on their own basis. Ceded unpaid claims are therefore gross unpaid minus net unpaid claims.

> [!example]- A book has gross ultimate claims of $\$68{,}000{,}000$ and gross paid claims of $\$41{,}000{,}000$. Its ceded ultimate claims are $\$9{,}000{,}000$, of which $\$3{,}800{,}000$ has been recovered. What are its net unpaid claims? {Example}
> - The gross unpaid claims are $68{,}000{,}000 - 41{,}000{,}000 = \$27{,}000{,}000$.
> - The ceded unpaid claims are $9{,}000{,}000 - 3{,}800{,}000 = \$5{,}200{,}000$.
> - The net unpaid claims are $27{,}000{,}000 - 5{,}200{,}000 = \$21{,}800{,}000$.
> - Directly, net ultimate claims of $\$59{,}000{,}000$ less net paid claims of $\$37{,}200{,}000$ give the same $\$21{,}800{,}000$.

## Statutory accounting for unpaid claims

In a U.S. insurer's statutory statements, losses and LAE are recognized as expenses when the covered event occurs, which for a claims-made policy is the reporting of the incident to the insurer, and a liability is set up for what is unpaid: reported losses, IBNR (including bulk provisions for deficiencies in case reserves) and LAE. This is SSAP No. 55. The liability is based on the estimated ultimate cost of settling the claims, including inflation, and it is not discounted unless a specific SSAP allows it. Reserves recoverable from reinsurers are netted against the gross liability (SSAP No. 62R), so the statutory balance sheet shows unpaid claims net of reinsurance.

> [!trap] Recognizing an occurrence loss only when it is reported
> Under an occurrence policy the loss is recognized when the event occurs, even if no one has reported it yet (IBNR). Only for claims-made coverage is the report the covered event.
