---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cee7eca1297efdae92916d03bc934f9fdcaec00754eb1803dc1a757da0478013
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Economic Scenario Generator.md
---

An **Economic Scenario Generator** (ESG) is a model that simulates many joint future paths of economic and financial variables, such as interest rates across the [[Yield Curve|yield curve]], equity returns, credit spreads and defaults, [[Inflation|inflation]] and exchange rates, so that an insurer can project its assets and liabilities under each path.

An ESG links an interest rate model, which may be one-factor or multi-factor, with equity, credit and inflation models. The links are [[Correlation|correlations]] or a cascade structure in which later variables depend on earlier ones. The equity model may add [[Stochastic Volatility|stochastic volatility]] or regime switching to capture fat tails and volatility clustering.

Stochastic reserves and capital under [[Principles-Based Reserving|principle-based reserving]] (VM-20 and VM-21), [[Asset Adequacy Analysis|asset adequacy]] and cash flow testing, [[Economic Capital|economic capital]], hedging programs and strategic asset allocation all run on ESG output.

## Real-world and risk-neutral scenarios

A **real-world** ESG aims to reproduce how markets actually behave and is used for risk measurement, capital and [[Asset-Liability Management|asset-liability management]]. Its drifts include risk premiums, such as an equity return above the risk-free rate, and it is judged on whether its distributions and stylized facts look like history.

A **risk-neutral** ESG reproduces market prices and is used to value options and guarantees by [[Risk-Neutral Valuation|risk-neutral valuation]]. It sets every asset's expected return to the risk-free rate, so that discounted prices are [[Martingale|martingales]], and it is judged on whether it reproduces market prices. Its drifts are not a forecast of returns.

Real-world scenarios must not be used to price, and risk-neutral scenarios do not give realistic probabilities of loss.

> [!trap] Using the wrong measure for the job
> Pricing a guarantee on real-world scenarios discounted at the risk-free rate misstates its value. Measuring a capital tail on risk-neutral scenarios uses probabilities that do not describe reality. Name the measure before using the scenarios.

## The Vasicek short rate model

One one-factor interest rate model is the Vasicek model, a [[Stochastic Differential Equation|stochastic differential equation]] for the short rate $r_t$:

> $$dr_t = a\left(b - r_t\right)dt + \sigma\,dW_t$$

- $a$ is the speed of mean reversion.
- $b$ is the long-run level.
- $\sigma$ is the volatility.
- $W_t$ is a standard Brownian motion.

Over a step of length $\Delta$, its [[Euler-Maruyama Discretization|Euler-Maruyama]] step is

> $$r_{t+\Delta} = r_t + a\left(b - r_t\right)\Delta + \sigma\sqrt{\Delta}\,Z$$

- $Z \sim N(0,1)$ is a standard normal draw.

Over a long horizon, the Vasicek rate is normal with mean $b$ and variance $\sigma^2/(2a)$. One Euler step per year can misstate the means and allow implausible values, so the output is checked against the model's exact moments.

> [!example]- What are this ESG's one-year rates in three scenarios, and how often does it produce negative rates in the long run? {Example}
> A real-world ESG models the short rate with the Vasicek model, $r_0 = 3\%$, $a = 0.2$, $b = 4\%$ and $\sigma = 1\%$. The three scenarios have standard normal draws $Z = -1.2$, $0.3$ and $1.5$, with one Euler step of $\Delta = 1$.
>
> > [!answer]-
> > - The drift pulls every scenario to $0.03 + 0.2(0.04 - 0.03) = 0.032$ before the shock, so $r_1 = 0.032 + 0.01Z$.
> > - The one-year rates are $2.0\%$, $3.5\%$ and $4.7\%$.
> > - The long-run standard deviation is $0.01/\sqrt{2(0.2)} = 0.0158$.
> > - The long-run probability of a negative rate is $\Phi(-0.04/0.0158) = \Phi(-2.53) = 0.0057$, about 0.6% of outcomes.
> > - Whether that is acceptable is a validation question for the ESG's user.
> > - The exact one-year mean is $0.04 + (0.03 - 0.04)e^{-0.2} = 3.18\%$, so the one-year Euler step is only an approximation, and production ESGs use monthly steps or the exact transition.

## Equity returns

A lognormal equity model moves the index $S_t$ over a step of length $\Delta$ to

> $$S_{t+\Delta} = S_t \exp\!\left(\left(\mu - \tfrac{1}{2}\sigma_S^2\right)\Delta + \sigma_S\sqrt{\Delta}\,Z\right)$$

- $\mu$ is the drift, the risk-free rate in a risk-neutral ESG.
- $\sigma_S$ is the equity volatility.

## Calibration and validation

Parameters are chosen to match targets, as in [[Model Calibration|model calibration]]. A real-world model targets historical means, volatilities, correlations and tail percentiles. A risk-neutral model targets the current yield curve and option prices. The starting point always comes from current market data, so that the scenarios begin from today's curve.

A real-world ESG is validated against stylized facts, such as mean reversion of rates, the frequency of inverted curves, fat-tailed equity returns and the occurrence of negative rates. A risk-neutral ESG is validated by repricing the instruments it was calibrated to, and by the martingale test, which it passes when the average discounted index value across its $N$ scenarios is

> $$\frac{1}{N}\sum_{j=1}^{N} \frac{S^{(j)}_T}{B^{(j)}_T} \approx S_0$$

- $B^{(j)}_T$ is the money market account at time $T$ in scenario $j$.

> [!example]- Do these risk-neutral and real-world equity scenarios pass the martingale test? {Example}
> An ESG produces four equally likely one-year equity scenarios with $S_0 = 100$, $\sigma_S = 20\%$ and draws $Z = -1.15$, $-0.32$, $0.32$ and $1.15$. The continuously compounded risk-free rate is 3%. The risk-neutral scenarios use $\mu = 3\%$ and the real-world scenarios $\mu = 7\%$.
>
> > [!answer]-
> > - Under the risk-neutral drift, $S_1 = 100\exp(0.03 - 0.02 + 0.2Z)$, which gives 80.25, 94.74, 107.68 and 127.12.
> > - Their mean is 102.45, and discounted at 3% it is $e^{-0.03}(102.45) = 99.42$.
> > - The risk-neutral set misses 100 only because four draws cannot reproduce the lognormal's full spread, and the error shrinks as the number of scenarios grows.
> > - The real-world scenarios are each $e^{0.04}$ times larger, so their discounted mean is 103.48.
> > - The real-world set fails by about 3.5%, the equity risk premium built into its drift, so it would misprice an equity-linked guarantee.

## Regulatory generators

In the U.S., prescribed scenarios for statutory reserves and capital came from the American Academy of Actuaries' interest rate and equity generators. The NAIC has since field-tested a replacement, the Generator of Economic Scenarios (GOES).
