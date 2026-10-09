---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ec6161c35eb2467e132779f90930cf0a6f7854ad667b18f54fa3f3ae11738d0c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Diversification.md
---

**Risk diversification** is the reduction in total risk that comes from holding risks that don't all reach their worst outcomes at the same time. When risks are aggregated, the capital needed for the [[Portfolio|portfolio]] is less than the sum of the capital each would need alone, and the difference is the diversification benefit. How much benefit to recognise, and how reliable it is in a crisis, is the central judgment of risk aggregation for [[Economic Capital|economic capital]] and [[Regulatory Capital|regulatory capital]].

> $$C = \sqrt{\sum_i \sum_j \rho_{ij}\, C_i\, C_j}$$

> $$C = \sqrt{C_1^2 + C_2^2 + 2\rho\, C_1 C_2}$$

> $$\text{Benefit} = \sum_i C_i - C$$

- **Symbols:** $C_i$ is the stand-alone capital for risk $i$, $\rho_{ij}$ is the [[Correlation|correlation]] assumed between risks $i$ and $j$, and $C$ is the aggregate capital. The second block is the first for two risks.
- **The variance-covariance method:** The square-root formula is exact for the standard deviation of a sum of risks, and for a quantile when the risks are jointly normal. Applied to stand-alone capital amounts, it is an approximation that is quick, transparent and easy to explain, which is why regulatory formulas such as the NAIC's [[Risk-Based Capital|RBC]], the [[MCT]]'s [[Diversification Credit|diversification credit]] and Solvency II's standard formula use it.
- **Other aggregation techniques:** A simple sum assumes every correlation is one, which gives no benefit and an upper bound. A copula joins the marginal distributions and can give the tails more dependence than the body. Integrated simulation draws the risk drivers together and revalues the whole balance sheet, which captures non-linear liabilities. Each step up costs more data and model risk.
- **Correlation in the tail:** Correlations estimated in normal times tend to rise in a crisis, when a market fall, credit defaults and lapses can come together. A matrix calibrated to the body of the data overstates the benefit exactly when capital is needed, so models apply stressed correlations or tail dependence and test what happens if the risks coincide.
- **Mortality and longevity:** A block of life insurance loses when mortality is higher than expected, and a block of [[Life Annuity|annuities]] loses when it is lower, which is [[Longevity Risk|longevity risk]]. A common shock to mortality trend therefore hurts one and helps the other, and the negative correlation offsets part of the capital.
- **Limits to the offset:** The offset is partial because the two blocks cover different ages, genders and socioeconomic groups, whose mortality doesn't move together. Their sensitivities differ by duration and size, and a level or volatility shock, such as a pandemic, need not affect them equally. Modelers hold the offset to the trend component, size it on each block's own exposure, and test it rather than assume a correlation of minus one.
- **Where diversification is available:** A group's benefit may not reach each legal entity, because capital can't always be moved between subsidiaries or jurisdictions. Diversification also doesn't remove [[Concentration Risk|concentration risk]]: many similar exposures to one event, region or counterparty diversify little.
- **Allocating the benefit:** A unit's share of the diversified total depends on the allocation method, such as proportional, marginal or [[Shapley Value|Shapley]]. A risk that offsets the others can receive a small or negative allocation, which rewards the business that diversifies the portfolio.

> [!example]- Aggregating Three Risks with a Correlation Matrix {Example}
> An insurer's stand-alone capital, in \$ millions, is 300 for market risk, 150 for credit risk and 200 for insurance risk. The illustrative correlations are 0.50 between market and credit, and 0.25 between insurance and each of the other two. Find the aggregate capital and the diversification benefit.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > C^2 &= 300^2 + 150^2 + 200^2 \\
> > &\quad + 2(0.50)(300)(150) \\
> > &\quad + 2(0.25)(300)(200) + 2(0.25)(150)(200) \\
> > &= 152{,}500 + 45{,}000 + 30{,}000 + 15{,}000 \\
> > &= 242{,}500 \\
> > C &= 492.4 \\
> > \text{Benefit} &= 650 - 492.4 \\
> > &= 157.6
> > \end{align*}
> > $$
> > The insurer needs \$492.4 million, 24% less than the \$650 million sum. If market and credit risk become perfectly correlated in a crisis, the market and credit term doubles, to $90{,}000$, $C$ rises to $\sqrt{287{,}500} = 536.2$, and the benefit shrinks to \$113.8 million.

> [!example]- Offsetting Mortality and Longevity Risk {Example}
> An insurer holds stand-alone trend capital of \$80 million for its term life block and \$120 million for its annuity block. Find the combined capital with correlations of 0, $-0.25$ and $-1$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > C_{\rho = 0} &= \sqrt{80^2 + 120^2} \\
> > &= 144.2 \\
> > C_{\rho = -0.25} &= \sqrt{20{,}800 - 2(0.25)(80)(120)} \\
> > &= \sqrt{16{,}000} \\
> > &= 126.5 \\
> > C_{\rho = -1} &= \sqrt{(120 - 80)^2} \\
> > &= 40.0
> > \end{align*}
> > $$
> > A modest negative correlation saves \$73.5 million against the \$200 million sum. A perfect hedge would leave only the \$40 million mismatch, but the blocks' different ages and populations make it unrealistic. The insurer would test the $-0.25$ against its own data and stress it toward zero.

> [!tip]- How it appears on the exam
> - **CFE-101:** The objective asks candidates to demonstrate risk aggregation techniques that illustrate diversification. Expect stand-alone capital and a correlation matrix to aggregate, a comparison with the simple sum, and a written part on the weaknesses of variance-covariance aggregation, copulas and simulation.
> - **ILA-201I and ILA-201U:** The objective asks candidates to analyze the impact of diversification, including modeling considerations and the offset between mortality and longevity risk. Expect a calculation of the offset and a discussion of why it is partial and how a model or a regulator should recognise it.

> [!warning]- Exam traps
> - **Correlation on the wrong amounts:** The square-root formula applies to capital or standard deviations, not to variances or expected losses. Putting squared amounts into it squares them twice.
> - **The cross term counted once:** Each pair appears twice in the double sum, so the cross term is $2\rho_{ij} C_i C_j$. Dropping the 2 understates the aggregate for positive correlations and overstates it for negative ones.
> - **Sign of the mortality-longevity correlation:** The two risks are negatively correlated, because the same improvement in mortality lowers life claims and raises annuity payments. A positive correlation removes the offset the question is testing.
> - **Benefit as a free gift:** A benefit calibrated to normal-time correlations can disappear in a crisis. A written answer should say how the correlation was set and how it holds up under stress.
