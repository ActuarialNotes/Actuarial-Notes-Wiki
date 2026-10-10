---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:161bd3443d734fe8bdd2e84997e83e4fe9671a5702ad11d15f71bb7916da6aed
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Economic Scenario Generator.md
---

An **Economic Scenario Generator** (ESG) is a model that simulates many joint future paths of economic and financial variables, such as interest rates across the [[Yield Curve|yield curve]], equity returns, credit spreads and defaults, [[Inflation|inflation]] and exchange rates, so that an insurer can project its assets and liabilities under each path. A **real-world** ESG aims to reproduce how markets actually behave and is used for risk measurement, capital and [[Asset-Liability Management|asset-liability management]]. A **risk-neutral** ESG reproduces market prices and is used to value options and guarantees by [[Risk-Neutral Valuation|risk-neutral valuation]].

> $$dr_t = a\left(b - r_t\right)dt + \sigma\,dW_t$$

> $$r_{t+\Delta} = r_t + a\left(b - r_t\right)\Delta + \sigma\sqrt{\Delta}\,Z$$

> $$S_{t+\Delta} = S_t \exp\!\left(\left(\mu - \tfrac{1}{2}\sigma_S^2\right)\Delta + \sigma_S\sqrt{\Delta}\,Z\right)$$

> $$\frac{1}{N}\sum_{j=1}^{N} \frac{S^{(j)}_T}{B^{(j)}_T} \approx S_0$$

- **Symbols:** The first two blocks are the Vasicek short rate model, a [[Stochastic Differential Equation|stochastic differential equation]] with speed of mean reversion $a$, long-run level $b$ and volatility $\sigma$, and its [[Euler-Maruyama Discretization|Euler-Maruyama]] step with $Z \sim N(0,1)$. The third is a lognormal equity model with drift $\mu$ and volatility $\sigma_S$. In the last, $B_T$ is the money market account and $N$ the number of scenarios.
- **Real-world versus risk-neutral:** A real-world ESG uses drifts that include risk premiums, such as an equity return above the risk-free rate, and is judged on whether its distributions and stylized facts look like history. A risk-neutral ESG sets every asset's expected return to the risk-free rate, so that discounted prices are [[Martingale|martingales]], and is judged on whether it reproduces market prices. Real-world scenarios must not be used to price, and risk-neutral scenarios do not give realistic probabilities of loss.
- **Components:** An ESG links an interest rate model, which may be one-factor like Vasicek or multi-factor, with equity, credit and inflation models through [[Correlation|correlations]] or a cascade structure in which later variables depend on earlier ones. The equity model may add [[Stochastic Volatility|stochastic volatility]] or regime switching to capture fat tails and volatility clustering.
- **Calibration:** Parameters are chosen to match targets: historical means, volatilities, correlations and tail percentiles for a real-world model, or the current yield curve and option prices for a risk-neutral one, as in [[Model Calibration|model calibration]]. The starting point always comes from current market data, so that the scenarios begin from today's curve.
- **Validation:** A real-world ESG is checked against stylized facts, such as mean reversion of rates, the frequency of inverted curves, fat-tailed equity returns and the occurrence of negative rates. A risk-neutral ESG is checked with the martingale test in the last block and by repricing the instruments it was calibrated to.
- **Uses:** Stochastic reserves and capital under [[Principles-Based Reserving|principle-based reserving]] (VM-20 and VM-21), [[Asset Adequacy Analysis|asset adequacy]] and cash flow testing, [[Economic Capital|economic capital]], hedging programs and strategic asset allocation all run on ESG output.
- **Regulatory generators:** In the U.S., prescribed scenarios for statutory reserves and capital came from the American Academy of Actuaries' interest rate and equity generators, and the NAIC has since field-tested a replacement, the Generator of Economic Scenarios (GOES). CP-312 reads a case study of the Academy interest rate generator and a review of the NAIC's second field test of GOES.

> [!example]- One Step of a Vasicek Short Rate {Example}
> A real-world ESG models the short rate with the Vasicek model, $r_0 = 3\%$, $a = 0.2$, $b = 4\%$ and $\sigma = 1\%$. Generate the one-year rate in three scenarios with standard normal draws $Z = -1.2$, $0.3$ and $1.5$, using one Euler step with $\Delta = 1$. Then find the model's long-run standard deviation and the long-run probability of a negative rate.
>
> > [!answer]-
> > The drift pulls the rate toward 4%, so before the random shock every scenario moves to $0.03 + 0.2(0.04 - 0.03) = 0.032$.
> > $$
> > \begin{align*}
> > r_1 &= 0.032 + 0.01Z \\
> > r_1(Z = -1.2) &= 0.020 \\
> > r_1(Z = 0.3) &= 0.035 \\
> > r_1(Z = 1.5) &= 0.047
> > \end{align*}
> > $$
> > Over a long horizon, the Vasicek rate is normal with mean $b$ and variance $\sigma^2/(2a)$.
> > $$
> > \begin{align*}
> > \text{SD}_\infty &= \frac{0.01}{\sqrt{2(0.2)}} \\
> > &= 0.0158 \\
> > P(r < 0) &= \Phi\!\left(\frac{0 - 0.04}{0.0158}\right) \\
> > &= \Phi(-2.53) \\
> > &= 0.0057
> > \end{align*}
> > $$
> > The scenarios show the stylized fact of mean reversion, and the model allows negative rates in about 0.6% of long-run outcomes. Whether that is acceptable is a validation question for the ESG's user. The exact one-year mean is $0.04 + (0.03 - 0.04)e^{-0.2} = 3.18\%$, so a one-year Euler step is only an approximation, and production ESGs use monthly steps or the exact transition.

> [!example]- Martingale Test of Equity Scenarios {Example}
> An ESG produces four equally likely one-year equity scenarios with $S_0 = 100$, $\sigma_S = 20\%$ and draws $Z = -1.15$, $-0.32$, $0.32$ and $1.15$. The continuously compounded risk-free rate is 3%. Apply the martingale test to the risk-neutral scenarios, with $\mu = 3\%$, and to real-world scenarios with $\mu = 7\%$.
>
> > [!answer]-
> > Under the risk-neutral drift, $S_1 = 100\exp(0.03 - 0.02 + 0.2Z)$, which gives 80.25, 94.74, 107.68 and 127.12.
> > $$
> > \begin{align*}
> > \bar S_1 &= \frac{80.25 + 94.74 + 107.68 + 127.12}{4} \\
> > &= 102.45 \\
> > e^{-0.03}\,\bar S_1 &= 99.42
> > \end{align*}
> > $$
> > The real-world scenarios are each $e^{0.04}$ times larger, so their discounted mean is 103.48. The risk-neutral set misses 100 only because four draws cannot reproduce the lognormal's full spread, and the error shrinks as the number of scenarios grows. The real-world set fails by about 3.5%, which is the equity risk premium built into its drift. Discounting those scenarios at the risk-free rate values the index above its market price, so they would misprice an equity-linked guarantee and must not be used for market-consistent values.

> [!tip]- How it appears on the exam
> - **CP-312 model questions:** Candidates describe, apply and assess ESGs using the SOA's *Economic Scenario Generators: A Practical Guide* and its three-part series, explaining the difference between real-world and risk-neutral scenarios and which applications need each.
> - **Calibration and validation:** Questions ask how a generator is calibrated, which stylized facts or market prices its output should reproduce, and what tests would detect a problem, such as a failed martingale test or too few inverted yield curves.
> - **Regulatory scenarios:** Some questions ask about the Academy interest rate generator or the NAIC's GOES field test, and how a change of generator affects VM-20 and VM-21 reserves and capital.

> [!warning]- Exam traps
> - **Wrong measure for the job:** Pricing a guarantee on real-world scenarios discounted at the risk-free rate misstates its value, and measuring a capital tail on risk-neutral scenarios uses probabilities that do not describe reality. Name the measure before using the scenarios.
> - **A risk-neutral generator is not a forecast:** Its drifts are set to reproduce prices, not to predict returns. A risk-neutral equity return of 3% is not a view that equities will earn 3%.
> - **Calibrated parameters versus starting values:** The long-run level and volatility come from calibration, but the starting yield curve comes from today's market. Starting every scenario at the long-run level hides the effect of current rates.
> - **Discretization error:** One Euler step per year in a mean-reverting model can misstate means and allow implausible values. Report the step size and check the output against the model's exact moments.
