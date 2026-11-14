---
aliases:
  - Fund Performance
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7f1c886c3eaa7df1bc575b82e875c048e5ee0ce713b5d3ca16317900c1cd6535
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Target Volatility Fund.md
---

A **Target Volatility Fund** is an investment fund that rebalances between equities and cash so that its [[Volatility|volatility]] stays near a fixed target, holding less equity when the market's recent volatility is high and more when it is low. Insurers use these funds, often required as the investment option under a variable annuity guarantee, because a fund whose volatility is held near a known level makes the guarantee's cost lower, more stable and easier to [[Hedging|hedge]].

With a target volatility $\sigma_{\text{target}}$ and an estimate $\hat\sigma_t$ of the equity volatility at time $t$, the weight in equities set at time $t$ is

> $$w_t = \min\left(w_{\max},\ \frac{\sigma_{\text{target}}}{\hat\sigma_t}\right)$$

- $w_{\max}$ is the cap on the weight, often $100\%$ or a modest leverage limit.

The fund's return over the next period of length $\Delta t$ is

> $$R_{F,t+1} = w_t\,R_{S,t+1} + (1 - w_t)\,r_f\,\Delta t$$

- $R_{S,t+1}$ is the equity return over the period.
- $r_f$ is the rate earned on cash.

The fund's volatility $\sigma_F$, with $\sigma_S$ the equity volatility, is then approximately

> $$\sigma_F \approx w_t\,\sigma_{S} \approx \sigma_{\text{target}}$$

> [!example]- How do this fund's weights and value compare with the unmanaged index through a market fall? {Example}
> A fund targets $12\%$ volatility, with equity weight capped at $100\%$ and cash earning nothing. At the start of four successive weeks the estimated equity volatility is $15\%$, $24\%$, $40\%$ and $30\%$, and the equity index then returns $-3\%$, $-8\%$, $+2\%$ and $+6\%$. The fund and the index both start at 1.
>
> > [!answer]-
> > - The weights are $0.12/0.15 = 0.80$, $0.12/0.24 = 0.50$, $0.12/0.40 = 0.30$ and $0.12/0.30 = 0.40$.
> > - The fund returns $-2.4\%$, $-4.0\%$, $+0.6\%$ and $+2.4\%$.
> > - At the trough after week 2, the fund is worth $(0.976)(0.960) = 0.93696$ and the index $(0.97)(0.92) = 0.89240$.
> > - The fund was down $6.3\%$ against $10.8\%$ for the index.
> > - After week 4, the fund is worth $0.93696(1.006)(1.024) = 0.96520$ and the index $0.89240(1.02)(1.06) = 0.96486$.
> > - In the rebound the index rose $8.1\%$ from its low and the fund only $3.0\%$, because the weights were still low.
> > - The two end almost level, the fund having traded a smaller drawdown for a smaller recovery.

> [!trap] Forgetting the cap on the weight
> In calm markets $\sigma_{\text{target}}/\hat\sigma_t$ can exceed $1$, and the weight is then the cap, not the ratio. Forgetting the cap makes the fund hold leverage that the mandate does not allow.

## Estimating the volatility

A common estimate of the annualized equity volatility is an exponentially weighted moving average of recent squared returns, which is

> $$\hat\sigma_t^2 = \lambda\,\hat\sigma_{t-1}^2 + (1 - \lambda)\,\frac{R_{S,t}^2}{\Delta t}$$

- $\lambda$ is the decay factor.

The weight is set from the volatility estimated before the period, not the volatility realized during it. If volatility jumps between rebalancings, the fund overshoots the target, so the target is met only on average.

## Effect on fund performance

Because volatility rises as markets fall, the fund sells equities during a crash and loses less than the index. Because volatility stays high for a while after the bottom, the fund is still underweight when the market rebounds, and it lags the recovery. Over the long run it holds less equity on average than an unmanaged fund, so its expected return is lower, but its returns are smoother and its drawdowns smaller.

## Effect on guarantee cost and hedging

A guarantee such as a [[Guaranteed Minimum Maturity Benefit|GMMB]] or [[Guaranteed Minimum Withdrawal Benefit|GMWB]] is a put on the fund, and its price rises steeply with the fund's volatility. Holding that volatility near the target lowers the put's value, and keeps it from jumping when the market's [[Volatility Smile|implied volatility]] spikes. The insurer can then charge a lower or more stable guarantee fee.

The fund itself does much of the volatility management that the insurer would otherwise buy with options, so the insurer's vega exposure and its rebalancing costs fall. The remaining risks are the gap between the estimated and the realized volatility, sudden jumps that happen before the fund can rebalance, and basis between the fund and the hedge instruments.

> [!example]- How much does targeting $12\%$ volatility, against an unmanaged fund at $22\%$, cut the Black-Scholes value of this guarantee? {Example}
> A 10-year maturity guarantee pays $(100 - F_{10})^+$ on a fund starting at $F_0 = 100$. Ignore fees, mortality and lapses, and use $r = 0.03$.
>
> > [!answer]-
> > - The discounted strike is $100e^{-0.30} = 74.0818$.
> > - At $\sigma = 0.22$, $d_1 = 0.77907$ and $d_2 = 0.08337$.
> > - The put is worth $74.0818\,N(-0.08337) - 100\,N(-0.77907) = 74.0818(0.466779) - 100(0.217969) = 12.78$.
> > - At $\sigma = 0.12$, $d_1 = 0.98031$ and $d_2 = 0.60083$.
> > - The put is worth $74.0818(0.273976) - 100(0.163468) = 3.95$.
> > - Targeting cuts the guarantee's value from $\$12.78$ to $\$3.95$ per $\$100$, about $69\%$.
> > - The unmanaged fund's cost also moves with implied volatility, while the managed fund's stays close to the target's, so the insurer can price the fee more stably and hedge less vega.

## Risk control

Volatility targeting is a form of [[Risk Control|risk control]] that works through the policyholder's own investments rather than the insurer's hedge. It is pro-cyclical, because many such funds sell equities at the same time in a falling market. It shifts part of the cost of the guarantee to the policyholder in the form of lower expected returns, so its lower risk is not free.

## Modelling the fund

In a risk-neutral valuation, the fund is a self-financing portfolio of traded assets, so it grows at the risk-free rate before fees whatever its weight. Using the lower expected real-world return to value the guarantee mixes the two measures and overstates its cost. The guarantee is valued at a volatility close to the target, with simulation used to capture the lag in $\hat\sigma_t$ and the cap $w_{\max}$. A [[Stochastic Volatility|stochastic volatility]] model shows more of the benefit than a constant-volatility one, because the fund offsets the volatility changes that a constant-volatility model leaves out.
