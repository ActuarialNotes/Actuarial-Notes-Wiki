---
aliases:
  - Funds Flow
  - Market Power
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2c5c688c514e4c270443fff6f6286a3b391b55ce63845d734d9316bf54f6495b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Health Care System.md
---
The **Health Care System** is the set of people and organizations that use, deliver and pay for health care: patients and members, providers such as physicians, hospitals and pharmacies, and payers such as insurers and health plans, employers and government programs. Money flows from households to providers, mostly through intermediaries that pool it and pay on the patient's behalf, so most of the price of a service is paid by a third party rather than by the person receiving it.

Every dollar that enters the system reaches a provider or is kept by an intermediary, so the flow of funds is

> $$\sum_{s} F_s = \sum_{p} R_p + A$$

- $F_s$ is the money that enters from source $s$: taxes, premiums and out-of-pocket payments.
- $R_p$ is the revenue of provider type $p$.
- $A$ is what the intermediaries keep for administration and profit.

> [!example]- How much of this system's money reaches providers, and how much of provider revenue does a third party pay? {Example}
> In an illustrative system, the health care spending of an average resident is funded by $\$2{,}000$ of taxes, $\$4{,}500$ of premiums (employer and employee shares together) and $\$900$ paid out of pocket. The government program spends 3% of its funds on administration, and insurers keep 12% of premiums for administration and profit.
>
> > [!answer]-
> > - The money entering is $2{,}000 + 4{,}500 + 900 = \$7{,}400$.
> > - Providers receive $0.97(2{,}000) + 0.88(4{,}500) + 900 = 1{,}940 + 3{,}960 + 900 = \$6{,}800$.
> > - Intermediaries keep $A = 7{,}400 - 6{,}800 = \$600$, about 8.1% of the money.
> > - Third parties pay $1{,}940 + 3{,}960 = \$5{,}900$ of the providers' $\$6{,}800$, or 86.8%.
> > - At the point of care the patient pays only about 13 cents of each dollar the provider receives.

## Sources of funds

Households pay for all of it in the end. They pay taxes that fund government programs, premiums, and out-of-pocket costs at the point of service. The employer's share of group coverage is paid out of total compensation, so economists treat it as wages paid in another form. Employers and governments act as sponsors, and insurers and health plans pool the money and pay the providers.

## Third-party payment

Because an insurer pays most of each bill, the patient sees only the [[Deductible|deductible]], copay or [[Coinsurance|coinsurance]], and has little reason to compare prices. This is the source of [[Moral Hazard|moral hazard]] in health care and the reason payers try to control cost through benefit design, networks and the way they pay providers.

## The role of physicians

Physicians' own fees are a modest share of total spending, but their decisions direct most of the rest. They admit patients to hospitals, order tests, prescribe drugs and refer to specialists. Patients know less than physicians about what care they need, so demand is shaped by the supplier. A fee-for-service payment rewards more services ([[Provider Reimbursement|provider reimbursement]], [[Utilization|utilization]]). Measuring physicians' role by their fees alone therefore misses most of their influence on the flow of funds.

## Hospital market power

A hospital system that patients and physicians regard as essential can demand higher prices from insurers, because a network without it is hard to sell. A payer's leverage depends on whether it can credibly leave the system out of its network. Market power shows up in unit cost, not in how much care members use. Total spending is

> $$S = \sum_{k} U_k \times C_k$$

- $U_k$ is the utilization of service category $k$.
- $C_k$ is its unit cost.

Mergers of hospitals in the same area raise concentration and usually raise the prices paid by commercial insurers. Concentration is measured by the Herfindahl-Hirschman index,

> $$\text{HHI} = \sum_{j} m_j^2$$

- $m_j$ is the market share of hospital system $j$, in percent.

> [!example]- What are the HHI before and after this merger, and how much does the plan's hospital cost rise? {Example}
> Four hospital systems in a city have market shares of 40%, 30%, 20% and 10%, and the two smallest merge. The merged system negotiates a 10% increase in its commercial prices. A health plan spends $\$300$ per member per month (PMPM) on hospital care, 30% of it at the merged system, and its members' use of hospitals does not change.
>
> > [!answer]-
> > - Before the merger, $\text{HHI} = 40^2 + 30^2 + 20^2 + 10^2 = 3{,}000$.
> > - After it, $\text{HHI} = 40^2 + 30^2 + 30^2 = 3{,}400$.
> > - Only the unit cost at the merged system changes, so the cost rises $300 \times 0.30 \times 0.10 = \$9.00$ PMPM, or 3%.
> > - The plan can resist only if its members would accept a network without the merged system.

## Competition among provider systems

Systems compete for patients through reputation, location, technology and amenities rather than price, because insured patients pay little of the price. They compete for physicians by employing them, buying their practices and offering equipment and privileges, since physicians bring the patients. They compete for contracts by trading lower prices for a place in an insurer's network and the volume it brings. Price competition therefore happens between hospitals and payers over contracts, not between hospitals for patients.

## The U.S. and Canadian systems

The U.S. is a multi-payer system of employer group coverage, [[Medicare]], [[Medicaid]], individual coverage and the uninsured. Each payer negotiates its own prices, so prices vary widely and administration costs more.

Canada is single-payer. Each province pays hospitals and physicians for medically necessary care from tax revenue, and private insurance covers the supplementary services the public plans exclude ([[Health Care Insurance]]). The payment is public, but the delivery need not be: most physicians are independent and paid by the province, and hospitals are largely not-for-profit bodies funded by the province.

> [!trap] Ending the flow of funds at the employer
> Employer contributions to premiums are paid out of total compensation, so they are households' money. A framework that stops the flow at the employer leaves out who really pays.
