---
aliases:
  - Funds Flow
  - Market Power
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:750826c320299f97b100b3d75b4a23507e40eb0ad95c4d928452b2f60870019d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Health Care System.md
---
**The health care system** is the set of people and organizations that use, deliver and pay for health care: patients and members, providers such as physicians, hospitals and pharmacies, and payers such as insurers and health plans, employers and government programs. Money flows from households to providers, mostly through intermediaries that pool it and pay on the patient's behalf, so most of the price of a service is paid by a third party rather than by the person receiving it.

> $$\sum_{s} F_s = \sum_{p} R_p + A$$

> $$S = \sum_{k} U_k \times C_k$$

> $$\text{HHI} = \sum_{j} m_j^2$$

- **Symbols:** $F_s$ is the money that enters from source $s$: taxes, premiums and out-of-pocket payments. $R_p$ is the revenue of provider type $p$, and $A$ is what the intermediaries keep for administration and profit. In the second formula, total spending $S$ is the sum over service categories $k$ of utilization $U_k$ times unit cost $C_k$. $m_j$ is the market share of hospital system $j$, in percent, and $\text{HHI}$ is the Herfindahl-Hirschman index of how concentrated the market is.
- **Where the money comes from:** Households pay for all of it in the end. They pay taxes that fund government programs, premiums, including the employer's share of group coverage, which economists treat as wages paid in another form, and out-of-pocket costs at the point of service. Employers and governments act as sponsors, and insurers and health plans pool the money and pay the providers.
- **Third-party payment:** Because an insurer pays most of each bill, the patient sees only the [[Deductible|deductible]], copay or [[Coinsurance|coinsurance]], and has little reason to compare prices. This is the source of [[Moral Hazard|moral hazard]] in health care and the reason payers try to control cost through benefit design, networks and the way they pay providers.
- **The role of physicians:** Physicians' own fees are a modest share of total spending, but their decisions direct most of the rest. They admit patients to hospitals, order tests, prescribe drugs and refer to specialists. Patients know less than physicians about what care they need, so demand is shaped by the supplier, and a fee-for-service payment rewards more services ([[Provider Reimbursement|provider reimbursement]], [[Utilization|utilization]]).
- **Hospital market power:** A hospital system that patients and physicians regard as essential can demand higher prices from insurers, because a network without it is hard to sell. Mergers of hospitals in the same area raise concentration and usually raise the prices paid by commercial insurers. A payer's leverage depends on whether it can credibly leave the system out of its network.
- **How provider systems compete:** Systems compete for patients through reputation, location, technology and amenities rather than price, because insured patients pay little of the price. They compete for physicians by employing them, buying their practices and offering equipment and privileges, since physicians bring the patients. They compete for contracts by trading lower prices for a place in an insurer's network and the volume it brings.
- **U.S. and Canada:** The U.S. is a multi-payer system of employer group coverage, [[Medicare]], [[Medicaid]], individual coverage and the uninsured, in which each payer negotiates its own prices, so prices vary widely and administration costs more. Canada is single-payer: each province pays hospitals and physicians for medically necessary care from tax revenue, and private insurance covers the supplementary services the public plans exclude ([[Health Care Insurance]]).

> [!example]- Tracing the Flow of Funds {Example}
> In an illustrative system, the health care spending of an average resident is funded by \$2,000 of taxes, \$4,500 of premiums (employer and employee shares together) and \$900 paid out of pocket. The government program spends 3% of its funds on administration, and insurers keep 12% of premiums for administration and profit. Find the providers' revenue, the share of the money that never reaches a provider, and the share of provider revenue paid by a third party.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \sum_s F_s &= 2{,}000 + 4{,}500 + 900 \\
> > &= 7{,}400 \\
> > \sum_p R_p &= 0.97(2{,}000) + 0.88(4{,}500) + 900 \\
> > &= 1{,}940 + 3{,}960 + 900 \\
> > &= 6{,}800 \\
> > A &= 7{,}400 - 6{,}800 \\
> > &= 600
> > \end{align*}
> > $$
> > About 8.1% of the money ($600/7{,}400$) pays for administration and profit. Third parties pay \$5,900 of the providers' \$6,800, or 86.8%, so at the point of care the patient pays only about 13 cents of each dollar the provider receives. That gap between who uses care and who pays for it at the time is what the rest of the system's design tries to manage.

> [!example]- A Hospital Merger and a Health Plan's Costs {Example}
> Four hospital systems in a city have market shares of 40%, 30%, 20% and 10%. The two smallest merge. Afterwards, the merged system negotiates a 10% increase in its commercial prices. A health plan spends \$300 per member per month (PMPM) on hospital care, 30% of it at the merged system, and its members' use of hospitals does not change. Find the HHI before and after, and the increase in the plan's hospital cost.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{HHI}_{\text{before}} &= 40^2 + 30^2 + 20^2 + 10^2 \\
> > &= 3{,}000 \\
> > \text{HHI}_{\text{after}} &= 40^2 + 30^2 + 30^2 \\
> > &= 3{,}400 \\
> > \Delta S &= 300 \times 0.30 \times 0.10 \\
> > &= 9.00
> > \end{align*}
> > $$
> > The plan's hospital cost rises \$9.00 PMPM, or 3%, with no change in utilization: the whole increase is unit cost. The plan can resist only if its members would accept a network without the merged system.

> [!tip]- How it appears on the exam
> - **GH-201C and GH-201U:** The Flow of Funds section asks candidates to set out a framework for how funds flow through the health care system, to describe how physicians influence that flow, and to describe the market power of hospitals and how provider systems compete for patients, physicians and contracts. These are written questions: draw or describe the flows among households, sponsors, payers and providers, or explain why a merged hospital system can raise prices. GH-201C then asks candidates to compare the flow of funds in the U.S. and Canadian systems and evaluate the value of each, and GH-201U asks them to describe the flow of funds in the Canadian system and the roles of the provider and the government.

> [!warning]- Exam traps
> - **Employers are not the ultimate source:** Employer contributions to premiums are paid out of total compensation, so economists count them as households' money. A framework that ends the flow at the employer leaves out who really pays.
> - **Physician fees understate physician influence:** The share of spending paid to physicians is small, but the services they order make up most of the rest. An answer that measures their role by their fees alone misses the point the objective is asking for.
> - **Price, not volume:** Hospital market power shows up in the unit cost a payer negotiates, not in how much care its members use. Splitting spending into utilization and unit cost shows which one a merger moves.
> - **Non-price competition:** Insured patients pay little of the price, so hospitals compete for them on quality, technology and convenience. Describing hospital competition as price competition for patients gets the market backwards, because price competition happens between hospitals and payers over contracts.
> - **Single-payer does not mean public delivery:** In Canada, most physicians are independent and paid by the province, and hospitals are largely not-for-profit bodies funded by the province. It is the payment that is public, not necessarily the provider.
