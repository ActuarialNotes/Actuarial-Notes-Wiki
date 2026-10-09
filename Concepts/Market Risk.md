---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:85dbea66d0dc3543f931ff17f380e229083d1f629512c9578270c5dc1d4545ed
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Market Risk.md
---

**Market risk** is the risk of loss from movements in market prices and rates: equity prices, [[Interest Rate Risk|interest rates]], credit spreads, exchange rates, real estate values, and the volatilities of these. For an [[Insurer|insurer]] it is measured on surplus, assets less liabilities, because many liabilities move with the same markets as the assets, such as a [[Guaranteed Minimum Maturity Benefit|maturity guarantee]] or reserves discounted at market rates. It is one part of [[Financial Risk|financial risk]], beside [[Credit Risk|credit risk]] and liquidity risk.

> $$\Delta S \approx \sum_k \frac{\partial S}{\partial f_k}\,\Delta f_k$$

> $$\sigma_{\Delta S}^2 = \sum_i \sum_j \rho_{ij}\,e_ie_j\,\sigma_i\sigma_j$$

> $$\text{VaR}_p = z_p\,\sigma_{\Delta S}$$

- **Symbols:** $S$ is surplus and $f_k$ are the market risk factors, so $\partial S / \partial f_k$ is a sensitivity, such as a dollar duration for interest rates or the equity holding for an equity shock. In the variance–covariance model, $e_i$ is the exposure to factor $i$, $\sigma_i$ is that factor's volatility over the horizon, $\rho_{ij}$ are the [[Correlation|correlations]], and $z_p$ is the standard [[Normal Distribution|normal]] $p$-quantile, $2.3263$ at $99\%$. The last block assumes normal changes with a mean of zero.
- **Measuring it:** Sensitivities such as [[Duration|duration]], [[Convexity|convexity]] and an option's delta describe small moves. VaR and TVaR from a [[Risk Measure|risk measure]] summarise the distribution of losses, computed with the variance–covariance formula, with historical simulation, or by Monte Carlo from an economic scenario generator, and [[Stress Testing|stress tests]] apply large specified moves. Each has a blind spot: the normal formula understates fat tails, and historical simulation sees only the moves in its data window.
- **Mitigating it:** Asset–liability matching, such as [[Duration Matching|duration matching]] and [[Immunization|immunization]], removes the mismatch between assets and liabilities. [[Hedging]] with futures, swaps and options offsets what remains, limits on each exposure cap it, and product design, such as charging for guarantees or using target-volatility funds, reduces how much of it new business creates.
- **Not the MCT margin:** The [[Market Risk Margin|market risk margin]] is the capital charge for this risk in Canada's Minimum Capital Test for P&C insurers, set by a regulatory formula. Market risk itself is the exposure, which an insurer measures with whatever model suits it.

> [!example]- Value at Risk for an Equity and Bond Portfolio {Example}
> An insurer holds \$60 million of equities, with a one-year volatility of $18\%$, and \$40 million of bonds, with a one-year volatility of $6\%$, and the correlation between their returns is $0.2$. Treating the liabilities as fixed and the changes as normal with a mean of zero, find the one-year $99\%$ VaR of the portfolio, and compare it with the sum of the two holdings' VaRs.
>
> > [!answer]-
> > The dollar volatilities are $60(0.18) = 10.8$ and $40(0.06) = 2.4$ (\$ millions).
> > $$
> > \begin{align*}
> > \sigma_{\Delta S}^2 &= 10.8^2 + 2.4^2 + 2(0.2)(10.8)(2.4) \\
> > &= 116.64 + 5.76 + 10.368 \\
> > &= 132.768 \\
> > \sigma_{\Delta S} &= 11.5225 \\
> > \text{VaR}_{0.99} &= 2.3263(11.5225) \\
> > &= 26.80
> > \end{align*}
> > $$
> > On their own the equities have a VaR of $2.3263(10.8) = 25.12$ and the bonds $2.3263(2.4) = 5.58$, which add to $30.70$. The portfolio's VaR is $3.90$ million lower because the two returns are far from perfectly correlated. If the correlation rose to 1 in a crisis, the benefit would vanish, which is why a stress test checks the result.

> [!example]- An Equity and Interest Rate Stress, Then a Fix {Example}
> An insurer has \$800 million of bonds with modified duration 6 and \$200 million of equities, against liabilities of \$850 million with modified duration 9. Its surplus is \$150 million. Estimate the change in surplus if equities fall $30\%$ and all yields fall by 1 percentage point. Then find the bond duration that would remove the interest rate part of the loss.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \Delta\text{Bonds} &\approx -6(800)(-0.01) \\
> > &= +48 \\
> > \Delta\text{Equities} &= -0.30(200) \\
> > &= -60 \\
> > \Delta L &\approx -9(850)(-0.01) \\
> > &= +76.5 \\
> > \Delta S &= 48 - 60 - 76.5 \\
> > &= -88.5
> > \end{align*}
> > $$
> > Surplus falls from \$150 million to \$61.5 million, a loss of $59\%$. The rate fall alone costs $28.5$ million, because the liabilities' dollar duration of $7{,}650$ exceeds the bonds' $4{,}800$. Lengthening the bonds to a duration of $7{,}650/800 = 9.5625$ matches the two, which leaves only the $60$ million equity loss. That loss can then be capped with put options on the equity holding or limited by a smaller equity allocation.

> [!tip]- How it appears on the exam
> - **CP-312** asks candidates to "describe, apply, and assess" market risk models and to "evaluate the appropriateness of their usage". The work is to compute a VaR or a stressed loss with a stated model and then to say where its assumptions, such as normal returns, stable correlations or the chosen horizon, fail.
> - **CP-351** asks candidates to "explain and implement techniques used to mitigate market risks". Its readings for that objective include *ALM for Life, Annuities, and Pensions* and Hardy and Saunders's chapter on risk mitigation using options and derivatives. A question gives a balance sheet and a shock, and asks for the matching or hedging trade that reduces the loss and what it leaves exposed.

> [!warning]- Exam traps
> - **Assets alone:** Measuring market risk on the assets ignores liabilities that move with the same markets. In the second example the assets lose only $12$ million, while surplus loses $88.5$ million.
> - **Adding VaRs:** The VaRs of separate holdings add up only when their returns are perfectly correlated. Adding them overstates the portfolio's VaR, while assuming low correlation in a stress can understate it.
> - **Scaling the horizon:** Converting a one-day VaR to ten days by $\sqrt{10}$ assumes independent, identically distributed daily changes. When returns trend, the scaled figure understates the risk, and when volatility clusters it can be wrong in either direction.
> - **Market risk and the market risk margin:** The MCT's market risk margin is one regulatory measure of the risk. Using its factors as if they were the insurer's own risk model confuses a capital rule with a measurement.
