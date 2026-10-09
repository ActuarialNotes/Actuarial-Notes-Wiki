---
aliases:
  - Health Insurance Contract
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bb74e8a821c93ef80b92bf2b526784d108beb0b772733fc73c6c9f1f5f716ea0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Group Health Insurance.md
---
**Group Health Insurance** covers the medical, prescription drug, dental and vision costs of a group's members, usually employees and their dependents, under one contract issued to the [[Plan Sponsor|plan sponsor]] rather than to each person. It is a short-duration contract: rates are typically guaranteed for a year and set again at renewal, and most claims are paid within months of the service. Its cost is measured per member per month (PMPM), and its main liability is the [[Claim Reserve|claim reserve]] for services already incurred. (The long-duration disability, long-term care and critical illness contracts are [[Health Insurance]] in the life-exam sense.)

> $$\text{PMPM}_k = \frac{U_k \times S_k}{12{,}000}$$

> $$m(A) = \min\Big(\min(A, D) + c\,(A - D)_+,\ M\Big)$$

> $$\text{Plan pays} = A - m(A)$$

> $$\text{PDR} = \max\big(0,\ \text{PV}(C + E) - \text{PV}(P)\big)$$

- **Symbols:** $U_k$ is the annual utilization of service category $k$ per 1,000 members, such as inpatient admissions or prescriptions, and $S_k$ is the average allowed cost per service, so the first block converts a yearly rate per 1,000 into a monthly cost per member. $A$ is a member's allowed charges for the year, $D$ the [[Deductible|deductible]], $c$ the member's [[Coinsurance|coinsurance]] share, and $M$ the out-of-pocket maximum, so $m(A)$ is the member's cost sharing. In the last block, $C$, $E$ and $P$ are the claims, expenses and premiums expected for the coverage still to be provided before premiums can be changed.
- **Medical:** A medical plan pays for hospital, physician and outpatient services, with cost sharing through deductibles, coinsurance, copays and an out-of-pocket maximum. Plans differ in how they use provider networks, from HMOs that pay only for in-network care to PPOs that pay less out of network.
- **Prescription drug:** Drug benefits usually charge a copay or coinsurance that rises by formulary tier, from generics to brand and specialty drugs, and are often run by a pharmacy benefit manager that negotiates discounts and rebates.
- **Dental and vision:** Dental plans group services into classes, such as preventive, basic and major, each with its own coinsurance, and cap the plan's payments with an annual maximum. Vision plans pay for eye exams and an allowance for lenses and frames. Both carry more [[Adverse Selection|adverse selection]] when voluntary, because members can foresee much of their own use.
- **Who offers it:** Insurers, Blue Cross and Blue Shield plans and HMOs sell insured contracts, and larger employers often self-fund. In Canada the provincial plans cover hospital and physician care, so group plans cover the supplementary layer: drugs, dental, vision and paramedical services ([[Health Care Insurance]]).
- **Funding and pricing:** The same benefits can be fully insured, experience rated, or self-funded with stop-loss cover ([[Funding]]). A small group is priced from a [[Manual Rate|manual rate]], and a larger group's own claims are blended in with [[Credibility|credibility]] weights ([[Experience Rating|experience rating]]).
- **Moral hazard and other risks:** Insurance lowers the price a member sees, which raises use ([[Moral Hazard|moral hazard]]), and cost sharing and networks are the plan's response. The insurer also bears [[Trend|trend]] risk during the rate guarantee and selection risk when members choose among options.
- **Valuation:** The insurer holds a claim reserve for services incurred but unpaid, including [[IBNR]], usually estimated by completion factors from a lag triangle. It also holds an unearned premium reserve for premium paid in advance, and a premium deficiency reserve when the premiums still due for the guaranteed period will not cover that period's claims and expenses.

> [!example]- Cost Sharing and Leveraged Trend {Example}
> A group medical plan has a \$1,000 deductible, 20% member coinsurance and a \$4,000 out-of-pocket maximum. Three members have allowed charges of \$600, \$3,500 and \$40,000 this year. Find what the plan pays for each. Then suppose every allowed charge rises 8% next year with the plan design unchanged, and find the plan's cost increase.
>
> > [!answer]-
> > The first member stays below the deductible, and the third reaches the out-of-pocket maximum.
> > $$
> > \begin{align*}
> > m(3{,}500) &= 1{,}000 + 0.20(2{,}500) \\
> > &= 1{,}500 \\
> > m(40{,}000) &= \min(1{,}000 + 0.20(39{,}000),\ 4{,}000) \\
> > &= 4{,}000 \\
> > \text{Plan pays} &= 0 + 2{,}000 + 36{,}000 \\
> > &= 38{,}000
> > \end{align*}
> > $$
> > Next year the allowed charges are \$648, \$3,780 and \$43,200, and the second member pays $1{,}000 + 0.20(2{,}780) = 1{,}556$.
> > $$
> > \begin{align*}
> > \text{Plan pays} &= 0 + 2{,}224 + 39{,}200 \\
> > &= 41{,}424 \\
> > \text{Increase} &= \frac{41{,}424}{38{,}000} - 1 \\
> > &= 9.0\%
> > \end{align*}
> > $$
> > Allowed charges rose 8%, but the plan's cost rose 9.0%, because the deductible and the out-of-pocket maximum stayed fixed while costs grew. This is deductible leveraging, and it is why a plan with fixed cost sharing needs a paid trend above its allowed trend.

> [!example]- The Liabilities of a Group Medical Block at a Valuation Date {Example}
> A block of group medical contracts covers 20,000 members, and all premiums are guaranteed to December 31 at \$520 PMPM, payable on the first of each month. At the September 30 valuation, paid claims to date (in \$000) and completion factors for the three most recent incurral months are:
>
> | Incurred | Paid to date | Completion factor |
> |---|---|---|
> | July | 9,800 | 0.95 |
> | August | 8,400 | 0.85 |
> | September | 4,100 | 0.40 |
>
> Earlier months need a further \$150,000. For October to December, expected claims are \$505 PMPM, higher than earlier in the year because more members have met their deductibles, and maintenance expenses are \$28 PMPM. Ignoring interest, find the claim reserve and the premium deficiency reserve.
>
> > [!answer]-
> > Each month's unpaid amount is its estimated incurred claims less what has been paid.
> > $$
> > \begin{align*}
> > \text{July} &= 9{,}800/0.95 - 9{,}800 \\
> > &= 515.8 \\
> > \text{August} &= 8{,}400/0.85 - 8{,}400 \\
> > &= 1{,}482.4 \\
> > \text{September} &= 4{,}100/0.40 - 4{,}100 \\
> > &= 6{,}150.0 \\
> > \text{Claim reserve} &= 515.8 + 1{,}482.4 + 6{,}150.0 + 150 \\
> > &= 8{,}298.2
> > \end{align*}
> > $$
> > The claim reserve is about \$8.30 million. October's premium is not yet received, so there is no unearned premium, but the guaranteed premium falls short of the expected cost of the last quarter.
> > $$
> > \begin{align*}
> > \text{PDR} &= (505 + 28 - 520) \times 3 \times 20{,}000 \\
> > &= 780{,}000
> > \end{align*}
> > $$
> > The insurer holds a premium deficiency reserve of \$780,000 for coverage not yet provided. September's estimate rests on only 40% of its claims paid, so in practice it would be checked against a projected PMPM.

> [!tip]- How it appears on the exam
> - **GH-101:** Questions ask candidates to describe the medical, dental, vision and prescription drug contracts, who offers them, and the moral hazard and financial and legal risks of each. A short calculation applies a plan's cost sharing to a member's claims or shows how fixed cost sharing leverages trend.
> - **GH-201U:** The reserving objectives apply valuation principles to short-duration group and health insurance contracts. Questions ask for the types of claim reserves, a claim reserve from lag data, the effect of trend, seasonality or claim processing changes on it, and the non-IBNR reserves, such as unearned premium and premium deficiency reserves, with when each is required.
> - **GH-201C:** The same reserving objectives are asked for group and health insurance contracts in the Canadian setting, where group plans sit on top of the provincial plans.

> [!warning]- Exam traps
> - **Per member, not per employee:** PMPM divides by all covered members, including dependents, while a per employee per month figure divides by employees only. Mixing the two overstates or understates the cost by the average family size.
> - **Dividing by 12,000:** Utilization is usually quoted per 1,000 members per year. Converting it to a monthly cost per member needs both the 1,000 and the 12 months, and dropping either gives an answer off by that factor.
> - **Allowed trend versus paid trend:** With fixed deductibles, copays and out-of-pocket maximums, the plan's paid cost grows faster than allowed charges. Applying the allowed trend to paid claims understates the projected cost.
> - **Claim reserve versus premium deficiency:** The claim reserve is for services already incurred, and the premium deficiency reserve is for coverage still to come. A loss expected on the rest of the guarantee period is not part of the claim reserve, so a valuation that holds only claim reserves leaves that loss unreserved.
