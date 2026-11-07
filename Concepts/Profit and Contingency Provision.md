---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:77183e1c600722fc909a31bf3a76f66adeac7ff3b073e902a972e2d89e7c57f1
  sources:
    - "CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988; rescinded Dec 2020, reinstated May 2021), pp.1-5, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp.125, 138 (PDF pp.137, 150), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp.142-144 (PDF pp.154-156), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Robbin, The Underwriting Profit Provision (CAS Exam Study Note, 1992), outline p.2; §III p.16; §V p.25; §IX p.44; Conclusion p.50 (PDF pages), sha256:8dd432d4d021809b625c2a09f3f587cf188275bd979c3849ba5a61c10908d6fb — https://www.casact.org/sites/default/files/database/studynotes_robbin9.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Profit and Contingency Provision.md
---

![[Media/Figures/Profit_and_Contingency_Provision.svg|340]]

A **Profit and Contingency Provision** is the loading in a rate that, together with net investment and other income, provides an appropriate total after-tax return, as the CAS [[Principles of Ratemaking|Statement of Principles]] defines the underwriting profit and contingency provisions. In ratemaking it is the target underwriting profit provision $Q_T$, a share of premium, and the indicated rate is

> $$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$

- $F$ is the [[Fixed Expenses|fixed expense]] per exposure.
- $V$ is the [[Variable Expenses|variable expense]] provision, as a share of premium.

$Q_T$ is a share of the final premium, so it sits in the denominator with the variable expenses as part of the variable permissible loss ratio, $1 - V - Q_T$. It is a provision, not a projection of total profit dollars. A negative provision is added back, raising the denominator. With a $0\%$ provision, the indicated rate is the break-even rate, and any profit is the margin of the rate charged over expected cost.

> [!example]- A line has a projected pure premium of $\$250$, no fixed expenses, variable expenses of $30\%$ and a target profit provision of $5\%$. What is the indicated rate, and what does it hold for profit? {Example}
> - The share of premium left after variable expenses and profit is $1 - 0.30 - 0.05 = 0.65$.
> - The indicated rate is $250/0.65 = \$384.62$.
> - It holds $0.30 \times 384.62 = \$115.38$ of variable expenses and $0.05 \times 384.62 = \$19.23$ of profit.
> - The target combined ratio is $1 - Q_T = 95\%$.

## Profit and contingency

The two halves answer two different risks. A charge for random variation from expected costs belongs in the total return consistent with the cost of capital, and so in the underwriting profit provision. A charge for systematic variation of the estimated costs from the expected costs belongs in the contingency provision. The Statement of Principles asks that the contribution of net investment and other income be considered, and that the material assumptions of a ratemaking be documented and available for disclosure.

## Investment income and the provision

The total profit of an insurer is its [[Underwriting Profit|underwriting profit]] plus its [[Investment Income|investment income]]. Investment income comes from two sources:

1. **Policyholder-supplied funds**, the [[Unearned Premium|unearned premium]] reserve and the loss reserves, case and IBNR, held between the payment of premium and the settlement of claims.
2. **Capital**, the owners' equity or policyholder surplus. There is substantial disagreement about whether this income should be included in ratemaking.

The actuary typically determines the underwriting profit needed to achieve the target total rate of return after consideration of investment income. The provision therefore reflects the time value of money between the receipt of premium and the payment of losses. [[Long Tail Lines|Long-tail lines]] hold reserves for years and earn substantial investment income on them, so they can support a low or even negative underwriting provision and still achieve the target total return. [[Short Tail Insurance|Short-tail lines]] earn little investment income, so underwriting profit is a larger part of their return. Robbin's study note derives the provision from a target return on equity, from a discounted cash flow or internal rate of return model, or by offsetting calendar year investment income.

> [!example]- Workers compensation claims are settled years after the premium is paid, while auto collision claims are settled within months. Which line can price at a lower underwriting profit provision for the same target total return? {Example}
> - Workers compensation is long-tailed, so the insurer holds and invests its loss reserves for years.
> - That investment income supplies much of the target return, so the underwriting provision can be low or even negative.
> - Auto collision is short-tailed, so it earns little investment income and needs a higher underwriting provision.
> - Workers compensation can price at the lower provision.

## Selecting the provision

The provision is the insurer's choice, within what regulation allows. It may differ between companies for several reasons:

1. **Risk.** A book with more risk needs more capital to support it. An insurer with a high concentration of catastrophe exposure may raise the provision to reflect that higher cost of capital.
2. **Strategy.** A company may accept a lower provision to compete for new business or market share.
3. **Regulation.** Regulators may restrict the profit allowed in the rates.
4. **Investment income.** A line with more investment income needs less underwriting profit for the same total return.

> [!trap] Treating the provision as total profit
> A $-2\%$ provision on a long-tailed line is not a plan to lose money. The underwriting loss is funded by the investment income on the reserves, and the total return can still meet the target. Judge the provision with the line's investment income, never on its own.
