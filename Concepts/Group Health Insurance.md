---
aliases:
  - Health Insurance Contract
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6a34f596e41ba05949678063143777a138abccba388b9bd4274cdd8776001b9e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Group Health Insurance.md
---
**Group Health Insurance** is insurance of the medical, prescription drug, dental and vision costs of a group's members, usually employees and their dependents, under one contract issued to the [[Plan Sponsor|plan sponsor]] rather than to each person. It is a short-duration contract: rates are typically guaranteed for a year and set again at renewal, and most claims are paid within months of the service. The long-duration disability, long-term care and critical illness contracts are [[Health Insurance|health insurance]] in the life-exam sense.

Group health cost is measured per member per month (PMPM), and for service category $k$ it is

> $$\text{PMPM}_k = \frac{U_k \times S_k}{12{,}000}$$

- $U_k$ is the annual utilization of category $k$ per 1,000 members, such as inpatient admissions or prescriptions.
- $S_k$ is the average allowed cost per service.

The 12,000 converts a yearly rate per 1,000 members into a monthly cost per member, so dropping either the 1,000 or the 12 gives an answer off by that factor. PMPM divides by all covered members, including dependents, while a per employee per month figure divides by employees only.

## Coverages

A medical plan pays for hospital, physician and outpatient services, with cost sharing through deductibles, coinsurance, copays and an out-of-pocket maximum. Plans differ in how they use provider networks, from HMOs that pay only for in-network care to PPOs that pay less out of network.

Drug benefits usually charge a copay or coinsurance that rises by formulary tier, from generics to brand and specialty drugs. They are often run by a pharmacy benefit manager that negotiates discounts and rebates.

Dental plans group services into classes, such as preventive, basic and major, each with its own coinsurance, and cap the plan's payments with an annual maximum. Vision plans pay for eye exams and an allowance for lenses and frames. Both carry more [[Adverse Selection|adverse selection]] when voluntary, because members can foresee much of their own use.

## Member cost sharing

For a member with allowed charges $A$ in the year, the member's cost sharing is

> $$m(A) = \min\Big(\min(A, D) + c\,(A - D)_+,\ M\Big)$$

- $D$ is the [[Deductible|deductible]].
- $c$ is the member's [[Coinsurance|coinsurance]] share, which applies only to allowed charges above the deductible.
- $M$ is the out-of-pocket maximum, which limits the member's total cost sharing.

The plan pays the rest:

> $$\text{Plan pays} = A - m(A)$$

With a fixed deductible and out-of-pocket maximum, the plan's paid cost grows faster than allowed charges. This is deductible leveraging, and it is why a plan with fixed cost sharing needs a paid trend above its allowed trend.

> [!example]- What does the plan pay for these three members, and how much does its cost rise next year? {Example}
> A group medical plan has a $\$1{,}000$ deductible, 20% member coinsurance and a $\$4{,}000$ out-of-pocket maximum. Three members have allowed charges of $\$600$, $\$3{,}500$ and $\$40{,}000$ this year. Next year every allowed charge rises 8%, with the plan design unchanged.
>
> > [!answer]-
> > - The first member stays below the deductible and pays the whole $\$600$, so the plan pays nothing.
> > - The second member pays $1{,}000 + 0.20(2{,}500) = 1{,}500$, so the plan pays $\$2{,}000$.
> > - The third member's $1{,}000 + 0.20(39{,}000) = 8{,}800$ is capped at $\$4{,}000$, so the plan pays $\$36{,}000$.
> > - This year the plan pays $0 + 2{,}000 + 36{,}000 = 38{,}000$.
> > - Next year the allowed charges are $\$648$, $\$3{,}780$ and $\$43{,}200$, and the second member pays $1{,}000 + 0.20(2{,}780) = 1{,}556$.
> > - The plan pays $0 + 2{,}224 + 39{,}200 = 41{,}424$, an increase of $41{,}424/38{,}000 - 1 = 9.0\%$ against the 8% rise in allowed charges.

## Carriers, funding and pricing

Insurers, Blue Cross and Blue Shield plans and HMOs sell insured contracts, and larger employers often self-fund. In Canada the provincial plans cover hospital and physician care, so group plans cover the supplementary layer of drugs, dental, vision and paramedical services ([[Health Care Insurance]]).

The same benefits can be fully insured, experience rated, or self-funded with stop-loss cover ([[Funding]]). A small group is priced from a [[Manual Rate|manual rate]], and a larger group's own claims are blended in with [[Credibility|credibility]] weights ([[Experience Rating|experience rating]]).

Insurance lowers the price a member sees, which raises use ([[Moral Hazard|moral hazard]]), and cost sharing and networks are the plan's response. The insurer also bears [[Trend|trend]] risk during the rate guarantee and selection risk when members choose among options.

## Valuation

The insurer holds a [[Claim Reserve|claim reserve]] for services incurred but unpaid, including [[IBNR]], usually estimated by completion factors from a lag triangle. It also holds an unearned premium reserve for premium paid in advance. When the premiums still due for the guaranteed period will not cover that period's claims and expenses, it holds a premium deficiency reserve of

> $$\text{PDR} = \max\big(0,\ \text{PV}(C + E) - \text{PV}(P)\big)$$

- $C$, $E$ and $P$ are the claims, expenses and premiums expected for the coverage still to be provided before premiums can be changed.

The claim reserve is for services already incurred, and the premium deficiency reserve is for coverage still to come. A valuation that holds only claim reserves leaves a loss expected on the rest of the guarantee period unreserved.

> [!example]- What are this block's claim reserve and premium deficiency reserve? {Example}
> A block of group medical contracts covers 20,000 members, and all premiums are guaranteed to December 31 at $\$520$ PMPM, payable on the first of each month. At the September 30 valuation, paid claims to date (in $\$000$) and completion factors for the three most recent incurral months are:
>
> | Incurred | Paid to date | Completion factor |
> |---|---|---|
> | July | 9,800 | 0.95 |
> | August | 8,400 | 0.85 |
> | September | 4,100 | 0.40 |
>
> Earlier months need a further $\$150{,}000$. For October to December, expected claims are $\$505$ PMPM, higher than earlier in the year because more members have met their deductibles, and maintenance expenses are $\$28$ PMPM. Ignore interest.
>
> > [!answer]-
> > - Each month's unpaid amount is its estimated incurred claims, paid to date divided by the completion factor, less what has been paid.
> > - July needs $9{,}800/0.95 - 9{,}800 = 515.8$, August $8{,}400/0.85 - 8{,}400 = 1{,}482.4$ and September $4{,}100/0.40 - 4{,}100 = 6{,}150.0$.
> > - The claim reserve is $515.8 + 1{,}482.4 + 6{,}150.0 + 150 = 8{,}298$ thousand, about $\$8.30$ million.
> > - October's premium is not yet received, so there is no unearned premium.
> > - The guaranteed premium falls short of the expected cost, so $\text{PDR} = (505 + 28 - 520) \times 3 \times 20{,}000 = 780{,}000$.
> > - September's estimate rests on only 40% of its claims paid, so in practice it would be checked against a projected PMPM.

> [!trap] Applying the allowed trend to paid claims
> With fixed deductibles, copays and out-of-pocket maximums, the plan's paid cost grows faster than allowed charges. In the cost-sharing example an 8% allowed trend is a 9.0% paid trend, so applying 8% to paid claims understates the projected cost.
