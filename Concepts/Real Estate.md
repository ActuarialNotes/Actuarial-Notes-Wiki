---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:75f5152da4c227dc00e4af165501b78a747e94d17ee2591cd4bc70fe6227b92b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Real Estate.md
---

**Real estate** as an asset class is ownership of, or lending against, land and the buildings on it, held for the rent the property earns and for the change in its value. An investor can own property directly, buy shares of a publicly traded real estate investment trust (REIT), or commit capital to a private real estate fund, and each route gives the same underlying asset a different liquidity, cost and measured risk in a [[Portfolio|portfolio]].

> $$r_t = \frac{NOI_t + V_t - V_{t-1}}{V_{t-1}}$$

> $$\text{Cap rate} = \frac{NOI_1}{V_0}$$

> $$r_E = r_P + \left(r_P - r_D\right)\frac{D}{E}$$

> $$r_t = \frac{r^*_t - a\,r^*_{t-1}}{1 - a}$$

- **Symbols:** $V_t$ is the property's value at the end of period $t$ and $NOI_t$ is its net operating income for the period, the rent collected less operating expenses, before debt service and income tax. The total return $r_t$ splits into the income return $NOI_t/V_{t-1}$ and the capital return $(V_t - V_{t-1})/V_{t-1}$. In the leverage formula $r_P$ is the unlevered property return, $r_D$ is the interest rate on the debt, and $D/E$ is the ratio of debt to equity. In the last block $r^*_t$ is the return on an appraisal-based index, $r_t$ is the estimated true return, and $a$ is the smoothing parameter, between 0 and 1.
- **Cap rates and growth:** The capitalization rate is the first year's income yield on the price paid. If the income is expected to grow at a constant rate $g$ and the investor requires a total return $r$, a growing perpetuity gives $V_0 = NOI_1/(r - g)$, so the cap rate is approximately $r - g$. A falling cap rate raises values for the same income, which is why capital returns respond to interest rates and to expected rent growth.
- **Three ways to hold it:** Direct ownership gives control and the full income, but each property is large, unique, costly to buy and sell, and needs management. A REIT owns a portfolio of properties and trades on an exchange, so it is liquid and divisible, and in return for not paying corporate income tax it must distribute most of its taxable income. Private funds pool investors' commitments under a manager, are grouped by strategy from low-risk core to value-added and opportunistic, use more leverage as the strategy gets riskier, and are illiquid for the life of the fund, much like [[Private Equity|private equity]].
- **Leverage:** A mortgage magnifies the equity return in both directions. When the property earns more than the debt costs, every dollar borrowed adds the spread $r_P - r_D$ to the equity, and when it earns less the same spread is subtracted, so leverage raises the expected return and the volatility of the equity together.
- **Appraisal smoothing and lag:** Private real estate has no market price each quarter, so its indices are built from appraisals. An appraiser anchors on the last valuation and adjusts only partly toward new evidence, which can be modelled as $r^*_t = (1-a)\,r_t + a\,r^*_{t-1}$. The index then lags the market, has positively autocorrelated returns, and shows less volatility and less correlation with stocks than the property really has. If true returns are uncorrelated with variance $\sigma^2$, the smoothed index has variance $\sigma^2(1-a)/(1+a)$.
- **Unsmoothing:** Solving the smoothing model for $r_t$ gives the reverse filter in the last block. It removes the lag and restores the volatility, and $a$ is usually estimated as the first-order autocorrelation of the index's returns. The unsmoothed series is the one to use when real estate enters an asset allocation alongside marked-to-market assets.
- **Role in a portfolio:** Real estate supplies a large income component, some protection against inflation because rents can be reset, and diversification against stocks and bonds. The diversification is real but smaller than raw appraisal-based statistics suggest, and the asset class carries illiquidity and high transaction costs that a mean-variance model does not see.

> [!example]- Income, Capital and Levered Returns on an Office Building {Example}
> An investor buys an office building for \$10,000,000. Its net operating income over the first year is \$600,000, received at the end of the year, and the building is appraised at \$10,300,000 at the end of the year. Find the cap rate, the income and capital returns and the total return. Then find the return on equity if the purchase was financed with a \$6,000,000 interest-only loan at $5\%$.
>
> > [!answer]-
> > The cap rate on the purchase price is $600{,}000/10{,}000{,}000 = 6\%$, which is also the income return. The capital return is $300{,}000/10{,}000{,}000 = 3\%$.
> > $$
> > \begin{align*}
> > r_P &= 6\% + 3\% \\
> > &= 9\% \\
> > \frac{D}{E} &= \frac{6{,}000{,}000}{4{,}000{,}000} \\
> > &= 1.5 \\
> > r_E &= 9\% + (9\% - 5\%)(1.5) \\
> > &= 15\%
> > \end{align*}
> > $$
> > Checking with cash flows, the equity investor puts in \$4,000,000, receives \$600,000 less \$300,000 of interest, and keeps \$10,300,000 less the \$6,000,000 loan. The gain is \$300,000 of income and \$300,000 of value, or $15\%$ of the equity. If the building had instead fallen to \$9,700,000, the property return would be $3\%$ and the equity return $3\% + (3\% - 5\%)(1.5) = 0\%$.

> [!example]- Unsmoothing an Appraisal-Based Index {Example}
> An appraisal-based real estate index returned $2.0\%$ last quarter and $4.0\%$ this quarter. Its returns have a first-order autocorrelation of $0.6$, which is used as the smoothing parameter $a$ (an illustrative value), and their standard deviation is $5\%$ a quarter. Estimate this quarter's true return and the true volatility, assuming true returns are uncorrelated.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > r_t &= \frac{0.040 - 0.6(0.020)}{1 - 0.6} \\
> > &= \frac{0.028}{0.4} \\
> > &= 7.0\% \\
> > \sigma &= 5\% \times \sqrt{\frac{1 + 0.6}{1 - 0.6}} \\
> > &= 5\% \times 2 \\
> > &= 10\%
> > \end{align*}
> > $$
> > The index reported only part of a market move that was larger and earlier. The true volatility is twice the reported one, so an allocation built on the raw index would credit real estate with a quarter of its true variance and would hold too much of it.

> [!tip]- How it appears on the exam
> - **INV-101, asset classes:** The asset-classes objective asks for the distinguishing investment characteristics of real estate and its potential contributions to a portfolio, read in Geltner et al.'s *Commercial Real Estate Analysis and Investments* (after-tax analysis, investment value with debt financing, and REITs). Calculations ask for cap rates, income and capital returns, and the effect of leverage on the equity return.
> - **INV-101, behavioural bias:** The portfolio objective on behavioural bias pairs real estate with a reading on built-in biases in real estate investment. Expect to explain why appraisal-based returns understate risk and correlation, and to correct them with the reverse filter.

> [!warning]- Exam traps
> - **Cap rate is not total return:** The cap rate is the income yield only. The investor's expected return is roughly the cap rate plus expected income growth, so comparing a cap rate with a bond yield or a stock's total return compares unlike things.
> - **Smoothing direction:** The unsmoothed return is more extreme than the appraisal return, not less. Dividing by $1 - a$ scales the move up, and a formula that shrinks the reported return has been inverted the wrong way.
> - **REIT versus property:** A REIT's share price is marked to market daily and moves with the stock market over short horizons. Its volatility is not evidence that the property itself is riskier than an appraisal index says, nor is the index's calm evidence that it is safer.
> - **Leverage cuts both ways:** Positive leverage requires the property return to exceed the cost of debt. When it falls below, the equity return drops faster than the property return, and the higher expected return comes with higher volatility.
