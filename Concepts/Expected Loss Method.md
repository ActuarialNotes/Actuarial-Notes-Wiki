---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:086bc235698b567e0ca7e052f144be5eeb4bf99379a19b4777c155c7d6274586
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.8 Expected Claims Technique, PDF pp.137-139 (printed 131-133): key assumption, common uses, claim-ratio and exposure bases, on-level and trend adjustments, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.9, PDF p.158 (printed 152), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Expected Loss Method.md
---

![[Media/Figures/Expected_Loss_Method.svg|340]]

The **Expected Loss Method**, or expected claims technique, is the reserving method that sets an accident year's [[Ultimate Loss|ultimate claims]] equal to an a priori estimate of expected claims, without using the claims reported or paid to date. For an insurer the exposure base is usually [[Earned Premium|earned premium]], so the ultimate claims are

> $$\text{Ultimate Claims} = \text{Expected Claim Ratio} \times \text{Earned Premium}$$

- $\text{Expected Claim Ratio}$ is the a priori ratio of ultimate claims to earned premium for the year, also called the expected loss ratio.
- $\text{Earned Premium}$ is the year's earned premium, at the rate level the expected claim ratio was selected for.

A self-insurer, which collects no premium, uses an exposure base and a [[Pure Premium|pure premium]] instead:

> $$\text{Ultimate Claims} = \text{Pure Premium} \times \text{Exposures}$$

- $\text{Pure Premium}$ is the expected claims per unit of exposure.
- $\text{Exposures}$ are the year's units of an exposure base such as payroll, vehicles or population.

The [[IBNR]] is these expected claims less the reported claims, and the [[Unpaid Claims|unpaid claims]] are the expected claims less the paid claims. Reported and paid claims only split the estimate. They play no part in setting it. The same expected claims are the a priori estimate in the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] and [[Cape Cod Method|Cape Cod]] methods.

> [!idea] The idea
> The expected claims technique gives no credibility to the claims to date and the development technique gives full credibility, and the Bornhuetter-Ferguson method weights the two by the percent reported, $Z = 1/\text{CDF}$.

> [!example]- An accident year is three months old. Its earned premium is $\$2{,}000{,}000$, the expected claim ratio is 65%, reported claims are $\$50{,}000$ and paid claims are $\$10{,}000$. What are its ultimate claims, IBNR and unpaid claims? {Example}
> - The ultimate claims are $0.65 \times 2{,}000{,}000 = \$1{,}300{,}000$.
> - The IBNR is $1{,}300{,}000 - 50{,}000 = \$1{,}250{,}000$.
> - The unpaid claims are $1{,}300{,}000 - 10{,}000 = \$1{,}290{,}000$.

## Key assumption and common uses

The key assumption is that the actuary can better estimate unpaid claims from an a priori estimate than from the claims experience observed to date. The method is often used when:

1. An insurer enters a new line of business or a new territory, with no history of its own. Industry benchmarks then supply the claim ratio.
2. Operational or environmental changes, such as a longer statute of limitations or coverage expanded by court decisions, make the recent history irrelevant.
3. The year is so immature that the [[Chain Ladder Method|development technique]]'s factors are too highly leveraged.
4. The data for other methods is unavailable.

Because the reported and paid claims do not enter it, the estimate is unaffected by a change in [[Case Adequacy|case reserve adequacy]], [[Settlement Rate|settlement rate]] or reporting pattern. That is its stability. The cost is that it does not respond to actual experience: a catastrophe that has occurred, or claims running above expectation, changes nothing unless the actuary changes the expected claim ratio. Claims emerging below expectation raise the IBNR instead, as if the shortfall will reverse. The method needs the expected claim ratio to reflect the year's rate level, cost level, legal environment and [[Mix of Business|mix of business]].

> [!example]- Case reserves were strengthened last year and claim settlement has slowed. Which estimates does that distort: the reported development technique, the paid development technique or the expected claims technique? {Example}
> - The reported development technique is distorted, because its factors come from years with weaker case reserves.
> - The paid development technique is distorted, because its factors come from years that paid faster.
> - The expected claims technique is not distorted, because its ultimate is the expected claim ratio times the premium, whatever the reported or paid claims are.
> - The slowdown lowers paid claims and raises the expected claims technique's unpaid estimate by the same amount, so that estimate is neither over- nor understated.

## Selecting the expected claim ratio

The expected claim ratio is often derived from the insurer's own history. Each prior year's ultimate claims are trended to the cost level of the year being projected and adjusted for changes such as a tort reform or a benefit change. Its premium is brought to the current rate level ([[On Level Premium|on-level premium]]). Each prior year's adjusted claim ratio is then

> $$\text{Claim Ratio} = \frac{\text{Ultimate Claims} \times (1 + t)^n \times \text{Reform Factor}}{\text{On-Level Earned Premium}}$$

- $t$ is the annual [[Loss Trend|claim trend]], covering both frequency and severity.
- $n$ is the number of years from the prior accident year to the year being projected.
- $\text{Reform Factor}$ restates the claims as if they had occurred in the current legal environment, and is 1.00 for years after the reform.

The expected claim ratio is selected from these ratios, often by an average. The most recent years, whose ultimates rest on highly leveraged CDFs, are left out of it. A premium-weighted average, the total adjusted claims over the total on-level premium, is another choice.

> [!example]- The ultimate claims of AY 2021, 2022 and 2023 are $\$7.0$M, $\$7.4$M and $\$8.0$M, on on-level earned premium of $\$10.0$M, $\$10.4$M and $\$11.0$M. Claim trend is 5% a year, and a 2022 tort reform cut claims by 10%, so AY 2021 takes a reform factor of 0.90. AY 2024 earned $\$12.0$M at current rates and has $\$2.5$M reported. What are its expected claims and IBNR? {Example}
> - AY 2021 is trended 3 years: $7.0 \times 1.05^3 \times 0.90 = 7.293$, a claim ratio of $7.293/10.0 = 72.9\%$.
> - AY 2022 is trended 2 years: $7.4 \times 1.05^2 = 8.159$, a claim ratio of $8.159/10.4 = 78.4\%$.
> - AY 2023 is trended 1 year: $8.0 \times 1.05 = 8.400$, a claim ratio of $8.400/11.0 = 76.4\%$.
> - The average is 75.9%, and 76.0% is selected.
> - The AY 2024 expected claims are $0.760 \times 12.0 = \$9.12$M, and its IBNR is $9.12 - 2.5 = \$6.62$M.

> [!trap] Using an unadjusted claim ratio
> A historical claim ratio carries the rate level, cost level and legal environment of its own year. Applied to a year written after a 10% rate increase, an unadjusted 70% ratio overstates the expected claims by 10%, because on-level premium would have brought it to $0.70/1.10 = 63.6\%$. The error repeats every year, so the reserves look stable while running redundant. A negative IBNR, with reported claims already above the expected claims, is a sign that the selected ratio is too low.
