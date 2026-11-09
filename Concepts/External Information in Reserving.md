---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:00ea6f88fe7ab8e97019051588de1e947a91566aafec3947aaea680019dc3384
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Ch.3 p.28 (PDF p.34); Ch.7 pp.88, 90 (PDF pp.94, 96); Ch.15 p.346 (PDF p.352), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), §§3.6.3, 3.6.6, 4.1(f),(h), pp.7-10 (PDF pp.12-15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf"
    - "CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/External Information in Reserving.md
---

![[Media/Figures/External_Information_in_Reserving.svg|340]]

**External Information in Reserving** is information from outside the insurer whose [[Unpaid Claims|unpaid claims]] are being estimated, such as industry claim development patterns, trend rates and claim ratios, used to supplement or replace the insurer's own data. Large insurers can often rely solely on their internal data. An insurer turns to external information when

1. **its data is limited in volume**, so it has little [[Credibility|credibility]], as for many smaller insurers;
2. **its data is unavailable**, because of the limits of its systems;
3. **it has no history**, because it recently entered a new line of insurance or a new territory, state or province; or
4. **its own history ends too soon**, as at the end of a long-tailed triangle where a [[Tail Factor|tail factor]] must be selected.

Many insurers combine internal data with external industry benchmarks. External information is particularly valuable when selecting tail factors, trend rates and expected claim ratios, and when reconciling the results of the various methods before selecting the ultimate claims.

| United States | Canada |
| --- | --- |
| Insurance Services Office (ISO) | A.M. Best |
| National Council on Compensation Insurance (NCCI) | General Insurance Statistical Agency (GISA) |
| Reinsurance Association of America (RAA) | Insurance Bureau of Canada (IBC) |
| The Surety & Fidelity Association of America (SFAA) | Reinsurance Research Council (RRC) |
| A.M. Best | Market-Security Analysis & Research (MSA) |
| NAIC Annual Statement data | |

> [!example]- An insurer has written commercial auto liability for five years. Why might it supplement its own claim development data with industry data? {Example}
> - Liability claims take many years to settle, so five accident years have not shown a single year developing to ultimate.
> - The tail of the insurer's own pattern is unobserved, so it would have to be extrapolated or taken from industry patterns.
> - With only five years and a small book, its early age-to-age factors are volatile and have little credibility.
> - Industry data adds volume and stability, which is why the insurer supplements rather than relies on its own data alone.

## Comparability of external data

Any benchmark is used with caution. The line being analyzed and the benchmark can differ in claims practices, policy coverages, underwriting, geographic mix, claim coding, policyholder deductibles and limits, legal precedents and [[Mix of Business|mix of business]]. Such differences make development patterns noncomparable and increase the variability of the estimates. Two books with the same nominal line can develop very differently if one is written at higher limits. Industry data must also be on the same basis as the insurer's: gross or net of reinsurance, the same aggregation by accident, policy or calendar year, and the same claim definitions. The Academy recommends against relying heavily on industry benchmarks unless low credibility makes it necessary.

> [!example]- An insurer's commercial auto liability triangle runs only 60 months, and its last age-to-age factors are still above 1.000. The industry tail factor at 60 months is 1.045, from business written at a $\$1{,}000{,}000$ limit, while the insurer writes at $\$500{,}000$. Should it use 1.045? {Example}
> - The factors above 1.000 at 60 months show development continuing, but the triangle cannot measure how much remains.
> - The industry tail is the evidence for the development the triangle cannot see, so it is the starting point.
> - Late development in liability comes mostly from large, slowly settled claims, which a $\$500{,}000$ limit cuts off.
> - The insurer's tail should therefore be below 1.045, with the adjustment and its reasoning documented.

## Combining internal and external data

External data is usually blended with the insurer's own rather than replacing it, as the [[Complement of Credibility|complement of credibility]]:

> $$\text{Estimate} = Z \times \text{Internal Estimate} + (1 - Z) \times \text{External Estimate}$$

- $Z$ is the credibility of the insurer's own data, which grows with its volume and stability.

Internal data reflects the insurer's own claim settlement rates, case reserving practices and book mix, so when it is credible it is relied on over external data. External information also checks internal results without being blended into them. Comparing the insurer's own age-to-age factors, or its loss ratios, with the industry's at each age shows where the insurer's experience departs from its peers, and a departure is a reason to re-examine its assumptions. The [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] and [[Expected Loss Method|expected claims]] techniques need an expected claim ratio, which external data can supply when the insurer's own history cannot.

> [!example]- An insurer entered a new state for homeowners in 2024. At 12 months, accident year 2024 has $\$1{,}150{,}000$ of reported claims on $\$8{,}000{,}000$ of earned premium. The industry's ultimate claim ratio in the state is 62%, the insurer's rates are 4% below the industry average, and the industry CDF at 12 months is 1.25. What are the Bornhuetter-Ferguson ultimate claims? {Example}
> - Rates 4% lower raise the claim ratio, so the expected claim ratio is $0.62/0.96 = 64.58\%$.
> - The expected claims are $0.6458 \times 8{,}000{,}000 = \$5{,}166{,}667$.
> - The percentage unreported is $1 - 1/1.25 = 20\%$.
> - The expected unreported claims are $0.20 \times 5{,}166{,}667 = \$1{,}033{,}333$.
> - The ultimate claims are the reported $\$1{,}150{,}000$ plus the expected unreported $\$1{,}033{,}333$, which is $\$2{,}183{,}333$.
> - Every input except the reported claims is external, and the estimate is revisited as the insurer's own experience gains credibility.

## External conditions

Claim obligations are also influenced by external conditions, such as economic changes, regulatory actions, judicial decisions and political or social forces. [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] requires the actuary to consider the relevant ones that qualified actuaries in the same practice area generally know of and that are likely to have a material effect. Examples are a rise in [[Inflation|inflation]], new court rulings and back-logs in the courts, the introduction of [[No-Fault Insurance|no-fault]] automobile insurance, [[Tort Reform|tort reform]] and growing [[Tort Litigation|attorney involvement]]. A condition that has not yet shown in the historical claims is reflected by adjusting the data or the selections.

## External data in ratemaking

Ratemaking uses external data for the same reasons: a new line of business has no internal data, and an existing line's data can be supplemented. The common sources are statistical plans and data calls, other aggregated industry data, competitors' rate filings and third-party data such as economic and geo-demographic data. A competitor's filing is relied on with great care, since each company has different insureds, goals, expense levels and operating procedures. When a [[Generalized Linear Model|GLM]] estimate for a level is not credible, the actuary relies on external information such as a competitor's factors or an industry benchmark, or a blend of them. When it is credible, the internal estimate is relied on, and the external factors check its direction and size.
