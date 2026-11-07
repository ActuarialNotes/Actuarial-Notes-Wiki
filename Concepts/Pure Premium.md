---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-12
  last_checked_by: agent:validate-v1
  content_hash: sha256:c8bc5bf25e6c0fe5558d3054abb71f7bc8afdb159fe3d3612af8cd2364b40125
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 pp. 7-8 (PDF pp. 19-20), Pure Premium (or Loss Cost), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p. 94 (PDF p. 106), frequency/severity/pure premium ratios, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp. 141-143 (PDF pp. 153-155), Pure Premium Method, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pure Premium.md
---

![[Media/Figures/Pure_Premium.svg|340]]

A **Pure Premium**, also called a [[Loss Cost|loss cost]] or burning cost, is the average loss per unit of [[Exposure Base|exposure]]. It is the portion of the rate that pays claims, before any provision for expenses or profit. The pure premium of a group of risks over a period is

> $$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}}$$

> $$\text{Pure Premium} = \text{Frequency} \times \text{Severity}$$

- $\text{Losses}$ are the reported or [[Ultimate Loss|ultimate]] losses of the period.
- $\text{LAE}$ is the [[Loss and Loss Adjustment Expense|loss adjustment expense]], which may be included in full, in part or not at all.
- $\text{Earned Exposures}$ are the [[Earned Exposure|earned exposures]] of the period, in the unit of the exposure base.
- [[Frequency]] is the number of claims per earned exposure, and [[Severity]] is the average loss per claim.
- The claims counted in the frequency are the same claims divided into the severity.

The same book gives different pure premiums on different inputs, so a pure premium is quoted with the losses and exposures it uses. Frequency and severity are trended, developed and diagnosed separately.

> [!example]- A homeowners book has 12,000 earned house-years, 960 ultimate claims and $\$5{,}280{,}000$ of ultimate losses and LAE. What is its pure premium, directly and as frequency times severity? {Example}
> - Directly, the pure premium is $5{,}280{,}000/12{,}000 = \$440$ per house-year.
> - The frequency is $960/12{,}000 = 0.080$ claims per house-year.
> - The severity is $5{,}280{,}000/960 = \$5{,}500$ per claim.
> - Their product is $0.080 \times 5{,}500 = \$440$ per house-year, the same pure premium.

## Projected pure premium

A rate is an estimate of future costs, so the pure premium used in a rate is projected to the period the rates will be in effect. For one historical year, it is

> $$\text{Projected Pure Premium} = \frac{(\text{Losses} + \text{LAE}) \times \text{CDF} \times (1 + t)^n}{\text{Earned Exposures}}$$

- $\text{CDF}$ is the [[Cumulative Development Factor|cumulative development factor]] that develops the losses from their current age to ultimate.
- $t$ is the annual [[Loss Trend|loss trend]].
- $n$ is the trend period in years, from the average accident date of the historical year to the average accident date of the period the rates will be in effect.

Before they are developed and trended, the losses exclude the part of each [[Large Loss|large loss]] above a threshold and the [[Catastrophe Loss|catastrophe losses]], which are replaced by a provision for their long-term average. An exposure base that inflates, such as payroll, is trended as well ([[Exposure Trend|exposure trend]]).

> [!example]- An accident year has $\$2{,}000{,}000$ of reported losses and LAE at 24 months and 10,000 earned car-years. The CDF from 24 months to ultimate is 1.25, the loss trend is 5% a year and the trend period is 3 years. What is the projected pure premium? {Example}
> - The ultimate losses and LAE are $2{,}000{,}000 \times 1.25 = \$2{,}500{,}000$.
> - The trend factor is $1.05^3 = 1.157625$.
> - The trended ultimate losses and LAE are $2{,}500{,}000 \times 1.157625 = \$2{,}894{,}063$.
> - The projected pure premium is $2{,}894{,}063/10{,}000 = \$289.41$ per car-year.

## Pure premium in the indicated rate

In the [[Pure Premium Method|pure premium method]], the projected pure premium and the fixed expense per exposure are grossed up for variable expenses and profit, so the indicated rate is

> $$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$

- $F$ is the [[Fixed Expenses|fixed expense]] per exposure.
- $V$ is the [[Variable Expenses|variable expense]] provision, as a share of premium.
- $Q_T$ is the target [[Profit and Contingency Provision|profit provision]], as a share of premium.

Advisory organizations such as ISO and NCCI file loss costs, which are pure premiums, rather than rates. Each insurer adds its own expense and profit provisions to them.

> [!example]- The homeowners book's projected pure premium is $\$440$. Fixed expenses are $\$30$ per house-year, variable expenses are 20% of premium and the target profit provision is 5%. What is the indicated rate? {Example}
> - The pure premium and the fixed expense together are $440 + 30 = \$470$ per house-year.
> - The share of premium left after variable expenses and profit is $1 - 0.20 - 0.05 = 0.75$.
> - The indicated rate is $470/0.75 = \$626.67$ per house-year.

> [!trap] Mixing claim counts between frequency and severity
> Frequency on one claim count times severity on another is not a pure premium. The homeowners book has 960 ultimate claims, and $\$3{,}600{,}000$ has been paid on 800 closed claims. Its ultimate frequency of 0.080 times its paid severity of $\$4{,}500$ gives $\$360$. That is neither its pure premium on ultimate losses ($\$440$) nor on paid losses ($3{,}600{,}000/12{,}000 = \$300$). Count the same claims in both.
