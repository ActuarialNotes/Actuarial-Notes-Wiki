---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f551e60a238514f10294191459599dcf929feaa552ae9d53ec064f449c4a519e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Real Estate.md
---

**Real Estate** as an asset class is ownership of, or lending against, land and the buildings on it, held for the rent the property earns and for the change in its value. An investor can own property directly, buy shares of a publicly traded real estate investment trust (REIT), or commit capital to a private real estate fund.

With $V_t$ the property's value at the end of period $t$, the total return for the period is

> $$r_t = \frac{NOI_t + V_t - V_{t-1}}{V_{t-1}}$$

- $NOI_t$ is the net operating income for the period, the rent collected less operating expenses, before debt service and income tax.

The total return splits into the income return $NOI_t/V_{t-1}$ and the capital return $(V_t - V_{t-1})/V_{t-1}$.

> [!example]- What are the income, capital and total returns on this office building in its first year? {Example}
> An investor buys an office building for \$10,000,000. Its net operating income over the first year is \$600,000, received at the end of the year, and the building is appraised at \$10,300,000 at the end of the year.
>
> > [!answer]-
> > - The income return is $600{,}000/10{,}000{,}000 = 6\%$.
> > - The capital return is $300{,}000/10{,}000{,}000 = 3\%$.
> > - The total return is $6\% + 3\% = 9\%$.

## The capitalization rate

The capitalization rate is the first year's income yield on the price paid. It is

> $$\text{Cap rate} = \frac{NOI_1}{V_0}$$

If the income is expected to grow at a constant rate $g$ and the investor requires a total return $r$, a growing perpetuity gives $V_0 = NOI_1/(r - g)$, so the cap rate is approximately $r - g$. A falling cap rate raises values for the same income, which is why capital returns respond to interest rates and to expected rent growth. In the office building example, the cap rate on the purchase price is $600{,}000/10{,}000{,}000 = 6\%$, the same as the income return.

> [!trap] The cap rate is not a total return
> The cap rate is the income yield only. The investor's expected return is roughly the cap rate plus expected income growth, so comparing a cap rate with a bond yield or a stock's total return compares unlike things.

## Three ways to hold real estate

Direct ownership gives control and the full income, but each property is large, unique, costly to buy and sell, and needs management.

A REIT owns a portfolio of properties and trades on an exchange, so it is liquid and divisible. In return for not paying corporate income tax it must distribute most of its taxable income. Its share price is marked to market daily and moves with the stock market over short horizons, so its volatility is not evidence that the property itself is riskier than an appraisal index says.

Private funds pool investors' commitments under a manager. They are grouped by strategy from low-risk core to value-added and opportunistic, use more leverage as the strategy gets riskier, and are illiquid for the life of the fund, much like [[Private Equity|private equity]].

## Leverage

A mortgage magnifies the equity return in both directions. With $r_P$ the unlevered property return and $r_D$ the interest rate on the debt, the return on equity is

> $$r_E = r_P + \left(r_P - r_D\right)\frac{D}{E}$$

- $D/E$ is the ratio of debt to equity.

When the property earns more than the debt costs, every dollar borrowed adds the spread $r_P - r_D$ to the equity. When it earns less, the same spread is subtracted, so leverage raises the expected return and the volatility of the equity together.

> [!example]- What is the return on equity if the office building was bought with a \$6,000,000 interest-only loan at $5\%$? {Example}
> The building cost \$10,000,000, earned \$600,000 of net operating income and is worth \$10,300,000 at the end of the year, a property return of $9\%$.
>
> > [!answer]-
> > - The equity is $10{,}000{,}000 - 6{,}000{,}000 = 4{,}000{,}000$, so $D/E = 1.5$.
> > - The return on equity is $9\% + (9\% - 5\%)(1.5) = 15\%$.
> > - As a check, the equity investor receives \$600,000 less \$300,000 of interest and keeps \$10,300,000 less the \$6,000,000 loan, a gain of \$300,000 of income and \$300,000 of value, or $15\%$ of \$4,000,000.
> > - Had the building fallen to \$9,700,000, the property return would be $3\%$ and the equity return $3\% + (3\% - 5\%)(1.5) = 0\%$.

## Appraisal smoothing

Private real estate has no market price each quarter, so its indices are built from appraisals. An appraiser anchors on the last valuation and adjusts only partly toward new evidence. With $r_t$ the true return, the return on the appraisal-based index is modelled as

> $$r^*_t = (1-a)\,r_t + a\,r^*_{t-1}$$

- $a$ is the smoothing parameter, between 0 and 1.

The index then lags the market, has positively autocorrelated returns, and shows less volatility and less correlation with stocks than the property really has. If true returns are uncorrelated with variance $\sigma^2$, the smoothed index has variance

> $$\text{Var}(r^*_t) = \sigma^2\,\frac{1-a}{1+a}$$

Solving the smoothing model for $r_t$ gives the reverse filter, which is

> $$r_t = \frac{r^*_t - a\,r^*_{t-1}}{1 - a}$$

It removes the lag and restores the volatility, and $a$ is usually estimated as the first-order autocorrelation of the index's returns. The unsmoothed return is more extreme than the appraisal return, because dividing by $1 - a$ scales the move up. The unsmoothed series is the one to use when real estate enters an asset allocation alongside marked-to-market assets.

> [!example]- What are this quarter's true return and the true volatility behind this appraisal-based index? {Example}
> An appraisal-based real estate index returned $2.0\%$ last quarter and $4.0\%$ this quarter. Its returns have a first-order autocorrelation of $0.6$, used as the smoothing parameter $a$ (an illustrative value), and their standard deviation is $5\%$ a quarter. True returns are assumed uncorrelated.
>
> > [!answer]-
> > - The true return is $\dfrac{0.040 - 0.6(0.020)}{1 - 0.6} = \dfrac{0.028}{0.4} = 7.0\%$.
> > - The true volatility is $5\% \times \sqrt{(1 + 0.6)/(1 - 0.6)} = 5\% \times 2 = 10\%$.
> > - The index reported only part of a market move that was larger and earlier.
> > - An allocation built on the raw index would credit real estate with a quarter of its true variance and would hold too much of it.

## Role in a portfolio

Real estate supplies a large income component, some protection against inflation because rents can be reset, and diversification against stocks and bonds. The diversification is real but smaller than raw appraisal-based statistics suggest, and the asset class carries illiquidity and high transaction costs that a mean-variance model does not see.
