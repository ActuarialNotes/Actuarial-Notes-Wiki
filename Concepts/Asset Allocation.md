---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9696082c0995a358161c5915f98f8bd1da33f720def4c95636843ad2f95637d3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Asset Allocation.md
---

**Asset Allocation** is the decision of how an investor's [[Portfolio|portfolio]] is divided among asset classes, such as equities, bonds, [[Real Estate|real estate]] and [[Private Equity|private equity]]. The strategic asset allocation (SAA) sets the long-term target weights that best meet the investor's return objective, risk tolerance and constraints.

In the asset-only approach, mean-variance optimization chooses the mix $m$ that maximizes the investor's risk-adjusted expected return, which is

> $$U_m = E(R_m) - \tfrac{1}{2}\lambda\,\sigma_m^2$$

- $E(R_m)$ is the expected return on the mix.
- $\sigma_m^2$ is the variance of the mix's return.
- $\lambda$ is the investor's risk aversion.

The variance of a mix of asset classes is

> $$\sigma_m^2 = \sum_i\sum_j w_i w_j\,\rho_{ij}\,\sigma_i\sigma_j$$

- $w_i$ is the weight of asset class $i$.
- $\sigma_i$ is the standard deviation of class $i$'s return.
- $\rho_{ij}$ is the [[Correlation|correlation]] between classes $i$ and $j$.

The reading writes the penalty as $0.005\,\lambda\,\sigma_m^2$ with returns in percent, which equals $\tfrac{1}{2}\lambda\sigma_m^2$ with returns as decimals.

> [!example]- Which equity weight, $30\%$, $50\%$ or $70\%$, does an investor with $\lambda = 4$ choose, and one with $\lambda = 2$? {Example}
> The illustrative capital market assumptions are:
>
> | Class | Expected return | Standard deviation |
> | :--- | ---: | ---: |
> | Equities | 8% | 18% |
> | Bonds | 4% | 6% |
>
> The correlation between them is $0.2$.
>
> > [!answer]-
> > - For the $30\%$ mix, the expected return is $0.3(8\%) + 0.7(4\%) = 5.2\%$.
> > - Its variance is $0.3^2(0.18)^2 + 0.7^2(0.06)^2 + 2(0.3)(0.7)(0.2)(0.18)(0.06) = 0.005587$.
> > - With $\lambda = 4$, its utility is $0.052 - \tfrac{1}{2}(4)(0.005587) = 4.08\%$.
> > - The same steps give expected returns of $6.0\%$ and $6.8\%$ and variances of $0.010080$ and $0.017107$ for the $50\%$ and $70\%$ mixes.
> > - With $\lambda = 4$ the utilities are $4.08\%$, $3.98\%$ and $3.38\%$, so the more risk-averse investor holds $30\%$ equities.
> > - With $\lambda = 2$ they are $4.64\%$, $4.99\%$ and $5.09\%$, so the less risk-averse investor holds $70\%$ equities.

Mean-variance optimization has well-known weaknesses. Small changes in expected returns produce large changes in weights, the optimal mixes are concentrated in a few classes, and the inputs are estimates. The usual remedies are reverse optimization, which backs expected returns out of market-capitalization weights, Black-Litterman views layered on top of them, resampling, and constraints on the weights.

## Strategic and tactical asset allocation

The SAA is the policy portfolio, written into the [[Investment Policy Statement|investment policy statement]] with a target and a permitted range for each class. Tactical asset allocation (TAA) is a deliberate short-term departure from the targets to exploit a view on relative returns. It is judged by whether it beats the SAA after costs. [[Portfolio Rebalancing|Rebalancing]] is the opposite move, trading back to the targets after market drift.

## Asset classes

An asset class used in an allocation should be internally similar, distinct from the other classes, and large enough to hold without moving prices. It should also add something to the risk and return of the whole. Grouping classes by the risk factors they share, such as equity risk, duration and inflation, shows overlaps that a list of class names hides.

## Liability-relative asset allocation

For a pension plan or an insurer, the risk that matters is a shortfall of assets against liabilities. The allocation is then optimized on the surplus return, which is

> $$R_S = R_A - \frac{L_0}{A_0}\,R_L$$

- $A_0$ and $L_0$ are the assets and liabilities at the start of the period.
- $R_A$ and $R_L$ are the returns on the assets and the liabilities over the period.

The surplus return is measured on the assets, so the liability return is multiplied by $L_0/A_0$. A common form splits the assets into a hedging portfolio that moves with the liabilities, typically long bonds matched on duration, and a return-seeking portfolio for the rest. This is [[Asset-Liability Management|asset-liability management]] applied to the allocation, and it ties to [[Immunization|immunization]] of the [[Asset-Liability Portfolio|asset-liability portfolio]].

> [!example]- Is cash or long bonds the less risky holding for this pension plan? {Example}
> A pension plan has assets of $\$100$ million and liabilities of $\$90$ million. The liabilities grow by an expected $4\%$ a year with a standard deviation of $10\%$ from interest rate moves. Cash returns $2\%$ with no volatility. Long bonds return an expected $4.5\%$ with a standard deviation of $10\%$ and a correlation of $0.95$ with the liabilities. The figures are illustrative.
>
> > [!answer]-
> > - The ratio $L_0/A_0$ is $0.9$, so the surplus variance is $\sigma_A^2 + 0.9^2\sigma_L^2 - 2(0.9)\rho\,\sigma_A\sigma_L$.
> > - In cash, the expected surplus return is $2\% - 0.9(4\%) = -1.6\%$.
> > - In cash, the surplus standard deviation is $0.9(10\%) = 9.0\%$.
> > - In long bonds, the expected surplus return is $4.5\% - 0.9(4\%) = 0.9\%$.
> > - In long bonds, the surplus variance is $0.01 + 0.0081 - 0.0171 = 0.0010$, a standard deviation of $3.2\%$.
> > - The long bonds hedge most of the liabilities' interest rate sensitivity, so they have about a third of the surplus risk and a higher expected surplus return. Cash is risk-free only in an asset-only view.

## Goals-based asset allocation

A private investor's wealth can be split into sub-portfolios, one for each goal, each with its own horizon and required probability of success. The overall allocation is the sum of the sub-portfolios.

## Constraints and behavioural biases

The size of the assets, liquidity needs, time horizon, regulation, tax and the investor's preferences all narrow the choice. An institution with large assets can use private markets that a small one cannot, and an insurer's regulator limits how much of some classes it may hold.

Familiarity and home bias overweight domestic or own-company assets. Loss aversion and mental accounting distort the risk taken in different pots. The illusion of control and hindsight lead to overconfident tactical moves. A formal policy and a governance process are the defence against these biases.

> [!trap] Treating cash as the safe choice for a liability-relative investor
> For a pension plan or an insurer, the least risky portfolio is the one that hedges the liabilities. Recommending cash as the safe choice answers the asset-only question and leaves the surplus exposed to falling interest rates.
