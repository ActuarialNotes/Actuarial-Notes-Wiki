---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a8243b9d3316a6ef7af9cf6848fe8a673377e6af1269b3f183404d1dde5f1477
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Diversification.md
---

**Risk diversification** is the reduction in total risk that comes from holding risks that don't all reach their worst outcomes at the same time. When risks are aggregated, the capital needed for the [[Portfolio|portfolio]] is less than the sum of the capital each would need alone, and the difference is the diversification benefit.

If risk $i$ needs stand-alone capital $C_i$ and the [[Correlation|correlation]] assumed between risks $i$ and $j$ is $\rho_{ij}$, the aggregate capital $C$ under the variance-covariance method is

> $$C = \sqrt{\sum_i \sum_j \rho_{ij}\, C_i\, C_j}$$

- $\rho_{ii} = 1$ and $\rho_{ij} = \rho_{ji}$.

The diagonal terms are the squared stand-alone capitals. Each pair appears twice in the double sum, so the cross term is $2\rho_{ij} C_i C_j$. The diversification benefit is

> $$\text{Benefit} = \sum_i C_i - C$$

How much benefit to recognise, and how reliable it is in a crisis, is the central judgment of risk aggregation for [[Economic Capital|economic capital]] and [[Regulatory Capital|regulatory capital]].

> [!example]- What are this insurer's aggregate capital and diversification benefit? {Example}
> An insurer's stand-alone capital, in millions of dollars, is 300 for market risk, 150 for credit risk and 200 for insurance risk. The illustrative correlations are 0.50 between market and credit, and 0.25 between insurance and each of the other two.
>
> > [!answer]-
> > - The squared stand-alone capitals sum to $300^2 + 150^2 + 200^2 = 152{,}500$.
> > - The market and credit cross term is $2(0.50)(300)(150) = 45{,}000$.
> > - The insurance cross terms are $2(0.25)(300)(200) = 30{,}000$ and $2(0.25)(150)(200) = 15{,}000$.
> > - So $C^2 = 242{,}500$ and $C = \$492.4$ million.
> > - The benefit is $650 - 492.4 = \$157.6$ million, 24% less than the $\$650$ million sum.
> > - If market and credit risk become perfectly correlated in a crisis, their cross term doubles to $90{,}000$, $C$ rises to $\sqrt{287{,}500} = \$536.2$ million, and the benefit shrinks to $\$113.8$ million.

> [!trap] Counting the cross term once
> Each pair appears twice in the double sum, so the cross term for two risks is $2\rho C_1 C_2$. Dropping the 2 understates the aggregate for positive correlations and overstates it for negative ones.

## Two risks

For two risks with correlation $\rho$, the aggregate capital is

> $$C = \sqrt{C_1^2 + C_2^2 + 2\rho\, C_1 C_2}$$

The square-root formula is exact for the standard deviation of a sum of risks, and for a quantile when the risks are jointly normal. Applied to stand-alone capital amounts, it is an approximation that is quick, transparent and easy to explain, which is why regulatory formulas such as the NAIC's [[Risk-Based Capital|RBC]], the [[MCT]]'s [[Diversification Credit|diversification credit]] and Solvency II's standard formula use it. It applies to capital or standard deviations, not to variances or expected losses.

The correlation sets the size of the benefit:

1. With $\rho = 1$, $C = C_1 + C_2$, the simple sum, and there is no benefit.
2. With $\rho = 0$, $C = \sqrt{C_1^2 + C_2^2}$.
3. With $0 \le \rho \le 1$, $C$ lies between these two values. A positive correlation reduces the benefit, so the combined risk is larger than under independence.
4. With $\rho < 0$, $C$ is below the independent value, because losses in one risk are offset by gains in the other.

## Other aggregation techniques

The variance-covariance method is one of several techniques:

1. A simple sum assumes every correlation is one, which gives no benefit and an upper bound.
2. A [[Copula|copula]] joins the marginal distributions and can give the tails more dependence than the body.
3. Integrated simulation draws the risk drivers together and revalues the whole balance sheet, which captures non-linear liabilities.

Each step up costs more data and model risk.

## Correlation in the tail

Correlations estimated in normal times tend to rise in a crisis, when a market fall, credit defaults and lapses can come together. A matrix calibrated to the body of the data overstates the benefit exactly when capital is needed, so models apply stressed correlations or tail dependence and test what happens if the risks coincide. A written answer should say how the correlation was set and how it holds up under stress.

## Offsetting mortality and longevity risk

A block of life insurance loses when mortality is higher than expected, and a block of [[Life Annuity|annuities]] loses when it is lower, which is [[Longevity Risk|longevity risk]]. A common shock to mortality trend therefore hurts one and helps the other, and the negative correlation offsets part of the capital.

The offset is partial because the two blocks cover different ages, genders and socioeconomic groups, whose mortality doesn't move together. Their sensitivities differ by duration and size, and a level or volatility shock, such as a pandemic, need not affect them equally. Modelers hold the offset to the trend component, size it on each block's own exposure, and test it rather than assume a correlation of minus one.

> [!example]- With $\$80$ million of term life trend capital and $\$120$ million of annuity trend capital, what is the combined capital at correlations of $0$, $-0.25$ and $-1$? {Example}
> - With $\rho = 0$, $C = \sqrt{80^2 + 120^2} = \$144.2$ million.
> - With $\rho = -0.25$, $C = \sqrt{20{,}800 - 2(0.25)(80)(120)} = \sqrt{16{,}000} = \$126.5$ million, which saves $\$73.5$ million against the $\$200$ million sum.
> - With $\rho = -1$, $C = \sqrt{(120 - 80)^2} = \$40.0$ million, only the mismatch.
> - A perfect hedge is unrealistic because the blocks cover different ages and populations, so the insurer would test the $-0.25$ against its own data and stress it toward zero.

## Where diversification is available

A group's benefit may not reach each legal entity, because capital can't always be moved between subsidiaries or jurisdictions. Diversification also doesn't remove [[Concentration Risk|concentration risk]]: many similar exposures to one event, region or counterparty diversify little.

## Allocating the benefit

A unit's share of the diversified total depends on the allocation method, such as proportional, marginal or [[Shapley Value|Shapley]]. A risk that offsets the others can receive a small or negative allocation, which rewards the business that diversifies the portfolio.
