---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:02276b6c016ceab4c359dffb8092c26b9dbeebdae0d82f7a8d5e31bccc4581fb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Asset Class.md
---

An **Asset Class** is a group of investments whose returns are driven by the same economic factors, so that they behave alike within the group and differently from other groups. An investor treats each class as one building block when setting a [[Portfolio|portfolio's]] [[Asset Allocation|strategic asset allocation]].

The CFA Institute's asset allocation reading asks five things of a set of classes:

1. The assets within a class are relatively homogeneous.
2. The classes are mutually exclusive.
3. Each class diversifies the others rather than duplicating them.
4. Together the classes cover most of the investable wealth available.
5. Each class can absorb a meaningful share of the portfolio without moving its own prices.

A label that fails these tests, such as a single manager's strategy, is better treated as a way of accessing a class than as a class of its own. Each class is described by its cash flows, the risks that drive them and the role it plays in the portfolio:

| Class | Cash flows | Main risks | Typical role |
|---|---|---|---|
| Government bonds | Fixed coupons and principal | Interest rate, inflation | Liquidity, liability hedge |
| Corporate bonds | Fixed coupons plus a spread | Credit, spread, rates | Income |
| Leveraged loans | Floating coupons | Credit, liquidity | Income with little duration |
| Mortgages and MBS | Amortizing payments | Prepayment, credit, rates | Income, spread |
| Private debt | Floating or fixed coupons | Credit, illiquidity | Illiquidity premium |
| Public equity | Dividends, price change | Market, earnings | Growth |
| Private equity | Distributions on exit | Market, illiquidity, leverage | Growth |
| Real estate | Rent, value change | Property market, leverage | Income, inflation hedge |
| Hedge funds | Manager-driven returns | Manager, leverage, liquidity | Diversification |

> [!example]- Is a hedge fund strategy run by one manager an asset class? {Example}
> - A hedge fund's return comes from its strategy and its manager's skill rather than from one shared risk factor, so the assets under the label are not homogeneous.
> - The same label covers very different exposures from one fund to the next.
> - It is better treated as a way of accessing other classes, and hedge funds as a heterogeneous group when judging their role.

## Fixed income

Government [[Bonds|bonds]] pay fixed coupons with almost no default risk, so their risk is interest rate risk, and they provide liquidity and a hedge against falling rates and recessions. A [[Corporate Bond|corporate bond]] adds a credit spread for default and downgrade risk.

A [[Leveraged Loan|leveraged loan]] is a senior secured, floating-rate loan to a sub-investment-grade borrower. Its floating coupon removes most of its interest rate risk, but its credit risk is high.

A [[Mortgage Loan|mortgage loan]], commercial or residential, is secured by property and amortizes. A [[Mortgage-Backed Security|mortgage-backed security]] passes the pooled mortgage payments through to investors, which adds [[Prepayment Risk|prepayment risk]] and negative convexity. Its duration shortens when rates fall, because borrowers refinance, and lengthens when rates rise.

[[Structured Finance|Structured credit]], such as collateralized loan obligations, tranches a pool of loans so that each tranche takes a different share of the losses. [[Private Debt|Private debt]] is lending outside public markets, which pays an illiquidity premium.

## Equity and alternatives

[[Public Equity|Public equity]] is the main source of long-run growth, through dividends and rising earnings, with high volatility. [[Private Equity|Private equity]] seeks a higher return in exchange for illiquidity, long commitments and stale valuations. [[Real Estate|Real estate]] earns rent and a change in property value, which gives it a partial hedge against inflation. A [[Hedge Fund|hedge fund]] is a pooled vehicle that uses leverage, short selling and derivatives to target returns that depend less on the market's direction.

Private equity, private debt and real estate are valued by appraisal or by the manager, so their reported returns are smoothed. Smoothing understates both their volatility and their correlation with public markets, which makes them look more diversifying in an optimizer than they are and leads to too large an allocation. Unsmoothing the returns, or capping the weights, is the usual fix.

## Roles in the portfolio

Classes are often grouped by what they do for the investor rather than by their legal form. Equities and private capital provide growth, government bonds provide liquidity and protection in a downturn, and real estate, infrastructure and inflation-linked bonds protect against [[Inflation|inflation]]. An insurer or pension plan also judges each class against its liabilities, so a long bond that hedges the liabilities can be the lowest-risk asset even when its own volatility is high.

## Adding a class to a portfolio

A class earns a place only if adding it improves the portfolio's risk and return. With $w_j$ the weight of class $j$ and $E[R_j]$ its expected return, the portfolio's expected return is

> $$E[R_p] = \sum_j w_j\,E[R_j]$$

Its variance is

> $$\sigma_p^2 = \sum_i \sum_j w_i\,w_j\,\rho_{ij}\,\sigma_i\,\sigma_j$$

- $\sigma_j$ is the [[Volatility|volatility]] of class $j$.
- $\rho_{ij}$ is the [[Correlation|correlation]] between classes $i$ and $j$.

A small allocation to a new class $k$ raises the Sharpe ratio of an existing portfolio $p$ when

> $$\frac{E[R_k] - R_f}{\sigma_k} > \rho_{k,p}\,\frac{E[R_p] - R_f}{\sigma_p}$$

- $R_f$ is the risk-free rate.
- $\rho_{k,p}$ is the correlation between the new class and the existing portfolio.

> [!example]- Does moving 30% of this equity portfolio into the second class improve it, at a correlation of 0.9 and of 0.3? {Example}
> A portfolio holds only public equity, with an expected return of 7.5% and volatility of 16%. The second class has an expected return of 5.5% and volatility of 12%. The risk-free rate is 3%.
>
> > [!answer]-
> > - The 70/30 mix's expected return does not depend on the correlation: $0.7(7.5\%) + 0.3(5.5\%) = 6.9\%$.
> > - The variance has two fixed terms, $0.49(0.16^2) + 0.09(0.12^2) = 0.013840$, and a covariance term $2(0.21)\rho(0.16)(0.12)$.
> > - With $\rho = 0.9$ the covariance term is $0.007258$, so $\sigma_p^2 = 0.021098$ and $\sigma_p = 14.53\%$.
> > - With $\rho = 0.3$ it is $0.002419$, so $\sigma_p^2 = 0.016259$ and $\sigma_p = 12.75\%$.
> > - The Sharpe ratios are $(6.9 - 3)/14.53 = 0.268$ and $(6.9 - 3)/12.75 = 0.306$, against $(7.5 - 3)/16 = 0.281$ for equity alone.
> > - The test agrees. The second class's Sharpe ratio is $(5.5 - 3)/12 = 0.208$, against a hurdle of $0.9(0.281) = 0.253$ at $\rho = 0.9$, which it fails, and $0.3(0.281) = 0.084$ at $\rho = 0.3$, which it passes.
> > - The move worsens the portfolio at a correlation of 0.9 and improves it at 0.3, because with low correlation the class removes more risk than return.

> [!trap] Judging a class on its standalone return
> A class with a lower expected return and a lower Sharpe ratio than the current portfolio can still improve it, as the example shows. Rejecting it on its standalone return ignores the covariance term.
