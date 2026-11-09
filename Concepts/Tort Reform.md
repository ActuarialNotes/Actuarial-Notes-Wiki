---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:43e50fb405261045e32f5262fc30357945bc7b7037acb25065837a358fea61f0
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), Ch.7 p.96 (PDF 102); Ch.8 pp.133-134 (PDF 139-140); Ch.11 pp.204, 211 (PDF 210, 217), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Automobile Insurance Advisory Committee, Report on Fundamental Reform of the Alberta Automobile Insurance Compensation System (2020), pp.74, 185, sha256:2fb0e97ad65126b5f2bcd44abf9f1215a21f2240dc2be147e9df66f86e8a163e — https://www.casact.org/sites/default/files/2021-05/6C_Alberta_Auto_Reform.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tort Reform.md
---

![[Media/Figures/Tort_Reform.svg|340]]

**Tort Reform** is legislation designed to reduce liability costs through limits on various kinds of damages, through modification of liability rules, or both. A cap on claim settlements and a shorter statute of limitations are examples. A reform changes the legal environment the claims are settled in, so historical claims from before it are not a guide to claims after it until they are restated. In the [[Expected Loss Method|expected claims technique]], each year's claims are restated as if they had occurred in the new legal environment:

> $$\text{Adjusted Claims} = \text{Claims} \times (1 - r)$$

- $r$ is the estimated reduction in the cost of claims that the reform brings, from an independent analysis of the reform.

The factor $1 - r$ applies to the years wholly before the reform. A year in which the reform took effect part-way through gets a pro rata factor for the part of its claims that occurred before the reform, and the years wholly after it are not adjusted. The restated claims sit beside the trend and rate level adjustments, so the claim ratios averaged into an expected claim ratio are all at the tort environment of the year being estimated.

> [!example]- A reform effective January 1, 2022 cuts the cost of claims occurring after it by 25%. The trended, on-level claim ratios of accident years 2020 to 2024 are 88%, 92%, 70%, 72% and 74%. What is the straight-average expected claim ratio for accident year 2026? {Example}
> - Accident year 2026 is settled under the reform, so the claims are restated to the new environment.
> - The pre-reform years are multiplied by $1 - 0.25 = 0.75$, giving 66% for 2020 and 69% for 2021.
> - The years 2022 to 2024 already occurred under the reform and are not adjusted.
> - The expected claim ratio is the average of 66%, 69%, 70%, 72% and 74%, which is 70.2%.

## Tort reform and the development technique

The development technique assumes that historical claim development is predictive of future development. A major tort reform, such as a cap on claim settlements or a restriction in the statute of limitations, can make that assumption untrue. The actuary should then consider other techniques, or at the very least adjust the selected development factors. A shorter statute of limitations, which often accompanies major tort reform, can also change the ratio of closed to reported claim counts.

> [!example]- A tort reform takes effect during accident year 2006, and accident year 2007's reported claims at 24 months are well below the three years before it. Should the actuary develop 2007 with factors selected from accident years 2001 to 2005? {Example}
> - The lower 2007 claims may be the reform at work rather than slower reporting.
> - The factors from 2001 to 2005 describe claims settled in the old legal environment.
> - Applying them assumes the old development continues, which the reform may have changed.
> - The actuary adjusts the selected factors for the reform or gives weight to another technique, such as an expected claims or Bornhuetter-Ferguson estimate on reform-adjusted claim ratios.

## Tort reform in frequency-severity techniques

In a [[Frequency-Severity Method|frequency-severity technique]], the reform adjustment goes on the severities, beside the severity trend, so that every year's severities are at the cost level and tort environment of the year being projected. The frequencies are adjusted for frequency trend and rate level.

## Tort reform in Canadian automobile insurance

Canadian provinces reform automobile insurance by moving the balance between tort and [[No-Fault Insurance|no-fault]] benefits. Manitoba replaced its tort system entirely with no-fault benefits in 1994, and the KPMG report found a net premium reduction of 34% in the first two years. Alberta's 2003–2004 reform kept tort but capped non-pecuniary damages for defined minor injuries at $\$4{,}000$, a [[Cap on Non-Pecuniary Damages|cap on non-pecuniary damages]], with diagnostic and treatment protocols. Premiums decreased between 2004 and 2011, the only such interval from 1990 to 2018. After a court decision in January 2012 ruled a category of injury outside the cap, bodily injury costs rose, and some insurers reported a 6.4% cost increase annually since 2014. The government amended the Minor Injury Regulation in May 2018 to reverse the decision.

> [!example]- Why did the savings from Alberta's 2004 reform not last? {Example}
> - The reform's saving depended on which injuries the courts held to be "minor".
> - Court decisions reinterpreted the definition of minor injury, so injuries the reform meant to cap fell outside it.
> - One insurer reported that the number of bodily injury exposures settled within the cap decreased by 25%.
> - Each reinterpretation raised bodily injury costs, so premiums returned to an upward trend from 2012.
