---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e67c532320a14bdf4d18586e3b2b55b1b3c417b5a1ae2187d5e25203609e162d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Market Risk.md
---
**Market risk** is the risk of loss from movements in market prices and rates: equity prices, [[Interest Rate Risk|interest rates]], credit spreads, exchange rates, real estate values, and the volatilities of these. For an [[Insurer|insurer]] it is measured on surplus, assets less liabilities, because many liabilities move with the same markets as the assets, such as a [[Guaranteed Minimum Maturity Benefit|maturity guarantee]] or reserves discounted at market rates. It is one part of [[Financial Risk|financial risk]], beside [[Credit Risk|credit risk]] and liquidity risk.

When the market risk factors $f_k$ move by $\Delta f_k$, the change in surplus $S$ is approximately

> $$\Delta S \approx \sum_k \frac{\partial S}{\partial f_k}\,\Delta f_k$$

- $\partial S / \partial f_k$ is the sensitivity of surplus to factor $k$, such as a dollar [[Duration|duration]] for interest rates or the equity holding for an equity shock.

Sensitivities such as duration, [[Convexity|convexity]] and an option's delta describe small moves. [[Stress Testing|Stress tests]] apply large specified moves to the same balance sheet.

> [!example]- How much surplus does this insurer lose in the stress, and what bond duration removes the interest rate part of the loss? {Example}
> An insurer has $\$800$ million of bonds with modified duration 6 and $\$200$ million of equities, against liabilities of $\$850$ million with modified duration 9. Its surplus is $\$150$ million. In the stress, equities fall 30% and all yields fall by 1 percentage point.
>
> > [!answer]-
> > - The bonds gain about $6 \times 800 \times 0.01 = 48$ million.
> > - The equities lose $0.30 \times 200 = 60$ million.
> > - The liabilities rise by about $9 \times 850 \times 0.01 = 76.5$ million.
> > - Surplus changes by $48 - 60 - 76.5 = -88.5$ million, from $\$150$ million to $\$61.5$ million, a loss of 59%.
> > - The rate fall alone costs $76.5 - 48 = 28.5$ million, because the liabilities' dollar duration of $9 \times 850 = 7{,}650$ exceeds the bonds' $6 \times 800 = 4{,}800$.
> > - A bond duration of $7{,}650/800 = 9.5625$ matches the two dollar durations, which leaves only the $60$ million equity loss.

## Value at risk by the variance–covariance method

Value at risk (VaR) and TVaR from a [[Risk Measure|risk measure]] summarise the distribution of losses. In the variance–covariance model, which assumes normal changes with a mean of zero, the variance of the change in surplus is

> $$\sigma_{\Delta S}^2 = \sum_i \sum_j \rho_{ij}\,e_ie_j\,\sigma_i\sigma_j$$

- $e_i$ is the exposure to factor $i$.
- $\sigma_i$ is the factor's volatility over the horizon.
- $\rho_{ij}$ is the [[Correlation|correlation]] between factors $i$ and $j$, with $\rho_{ii} = 1$.

The VaR at level $p$ is then

> $$\text{VaR}_p = z_p\,\sigma_{\Delta S}$$

- $z_p$ is the standard [[Normal Distribution|normal]] $p$-quantile, $2.3263$ at 99%.

VaR can also be computed by historical simulation, or by Monte Carlo from an economic scenario generator. Each method has a blind spot. The normal formula understates fat tails, and historical simulation sees only the moves in its data window. Converting a one-day VaR to ten days by $\sqrt{10}$ assumes independent, identically distributed daily changes.

> [!example]- What is the one-year 99% VaR of this portfolio, and how does it compare with the sum of the two holdings' VaRs? {Example}
> An insurer holds $\$60$ million of equities, with a one-year volatility of 18%, and $\$40$ million of bonds, with a one-year volatility of 6%. The correlation between their returns is $0.2$. The liabilities are fixed and the changes are normal with a mean of zero.
>
> > [!answer]-
> > - The dollar volatilities are $60 \times 0.18 = 10.8$ and $40 \times 0.06 = 2.4$ ($\$$ millions).
> > - The variance is $10.8^2 + 2.4^2 + 2(0.2)(10.8)(2.4) = 132.768$.
> > - The standard deviation is $\sqrt{132.768} = 11.5225$.
> > - The portfolio's VaR is $2.3263 \times 11.5225 = 26.80$ million.
> > - On their own, the equities have a VaR of $2.3263 \times 10.8 = 25.12$ and the bonds $2.3263 \times 2.4 = 5.58$, which add to $30.71$.
> > - The portfolio's VaR is $3.90$ million lower because the two returns are far from perfectly correlated. If the correlation rose to 1 in a crisis, the difference would vanish.

The VaRs of separate holdings add up only when their returns are perfectly correlated.

## Mitigating market risk

Asset–liability matching, such as [[Duration Matching|duration matching]] and [[Immunization|immunization]], removes the mismatch between assets and liabilities. [[Hedging]] with futures, swaps and options offsets what remains, and limits on each exposure cap it. Product design, such as charging for guarantees or using target-volatility funds, reduces how much market risk new business creates.

## Market risk and the market risk margin

The [[Market Risk Margin|market risk margin]] is the capital charge for this risk in Canada's Minimum Capital Test for P&C insurers, set by a regulatory formula. Market risk itself is the exposure, which an insurer measures with whatever model suits it.

> [!trap] Measuring market risk on the assets alone
> Measuring market risk on the assets ignores liabilities that move with the same markets. In the stress example the assets lose only $60 - 48 = 12$ million, while surplus loses $88.5$ million.
