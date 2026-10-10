---
aliases:
  - Fund Performance
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:75de2460d7f7e5f4f495c1d2ead421af8391b15af9bf6d4aaf4da5743d90b826
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Target Volatility Fund.md
---
A **target volatility fund** is an investment fund that rebalances between equities and cash so that its [[Volatility|volatility]] stays near a fixed target, holding less equity when the market's recent volatility is high and more when it is low. Insurers use these funds, often required as the investment option under a variable annuity guarantee, because a fund whose volatility is held near a known level makes the guarantee's cost lower, more stable and easier to [[Hedging|hedge]].

> $$w_t = \min\left(w_{\max},\ \frac{\sigma_{\text{target}}}{\hat\sigma_t}\right)$$

> $$R_{F,t+1} = w_t\,R_{S,t+1} + (1 - w_t)\,r_f\,\Delta t$$

> $$\hat\sigma_t^2 = \lambda\,\hat\sigma_{t-1}^2 + (1 - \lambda)\,\frac{R_{S,t}^2}{\Delta t}$$

> $$\sigma_F \approx w_t\,\sigma_{S} \approx \sigma_{\text{target}}$$

- **Symbols:** $w_t$ is the weight in equities set at time $t$, $w_{\max}$ the cap on that weight, often $100\%$ or a modest leverage limit, and $\sigma_{\text{target}}$ the target volatility. $R_{S,t+1}$ is the equity return and $R_{F,t+1}$ the fund return over the next period of length $\Delta t$, and $r_f$ is the rate earned on cash. $\hat\sigma_t$ is the annualized estimate of equity volatility, here an exponentially weighted moving average with decay $\lambda$ of recent squared returns.
- **Effect on fund performance:** Because volatility rises as markets fall, the fund sells equities during a crash and loses less than the index. Because volatility stays high for a while after the bottom, the fund is still underweight when the market rebounds, and it lags the recovery. Over the long run it holds less equity on average than an unmanaged fund, so its expected return is lower, but its returns are smoother and its drawdowns smaller.
- **Effect on guarantee cost:** A guarantee such as a [[Guaranteed Minimum Maturity Benefit|GMMB]] or [[Guaranteed Minimum Withdrawal Benefit|GMWB]] is a put on the fund, and its price rises steeply with the fund's volatility. Holding that volatility near the target lowers the put's value, and keeps it from jumping when the market's [[Volatility Smile|implied volatility]] spikes. The insurer can then charge a lower or more stable guarantee fee.
- **Effect on hedging:** The fund itself does much of the volatility management that the insurer would otherwise buy with options, so the insurer's vega exposure and its rebalancing costs fall. The remaining risks are the gap between the estimated and the realized volatility, sudden jumps that happen before the fund can rebalance, and basis between the fund and the hedge instruments.
- **Risk control:** Volatility targeting is a form of [[Risk Control|risk control]] that works through the policyholder's own investments rather than the insurer's hedge. It is pro-cyclical, because many such funds sell equities at the same time in a falling market, and it shifts part of the cost of the guarantee to the policyholder in the form of lower expected returns.
- **Modelling:** In a risk-neutral valuation, the fund is a self-financing portfolio of traded assets, so it grows at the risk-free rate before fees whatever its weight. The guarantee is valued at a volatility close to the target, with simulation used to capture the lag in $\hat\sigma_t$ and the cap $w_{\max}$. A [[Stochastic Volatility|stochastic volatility]] model shows more of the benefit than a constant-volatility one, because the fund offsets the volatility changes that a constant-volatility model leaves out.

> [!example]- Equity Weights Through a Market Fall {Example}
> A fund targets $12\%$ volatility, with equity weight capped at $100\%$ and cash earning nothing. At the start of four successive weeks the estimated equity volatility is $15\%$, $24\%$, $40\%$ and $30\%$, and the equity index then returns $-3\%$, $-8\%$, $+2\%$ and $+6\%$. Find the weights, the fund's returns, and its value against the unmanaged index, both starting at 1.
>
> > [!answer]-
> > The weights are $0.12/0.15 = 0.80$, $0.12/0.24 = 0.50$, $0.12/0.40 = 0.30$ and $0.12/0.30 = 0.40$, so the fund returns $-2.4\%$, $-4.0\%$, $+0.6\%$ and $+2.4\%$.
> > $$
> > \begin{align*}
> > F_2 &= (0.976)(0.960) \\
> > &= 0.93696 \\
> > S_2 &= (0.97)(0.92) \\
> > &= 0.89240 \\
> > F_4 &= 0.93696(1.006)(1.024) \\
> > &= 0.96520 \\
> > S_4 &= 0.89240(1.02)(1.06) \\
> > &= 0.96486
> > \end{align*}
> > $$
> > At the trough the fund was down $6.3\%$ against $10.8\%$ for the index. In the rebound the index rose $8.1\%$ from its low and the fund only $3.0\%$, because the weights were still low. The two end almost level, the fund having traded a smaller drawdown for a smaller recovery.

> [!example]- Guarantee Cost at the Target Volatility {Example}
> A 10-year maturity guarantee pays $(100 - F_{10})^+$ on a fund starting at $F_0 = 100$. Ignore fees, mortality and lapses, and use $r = 0.03$. Value the guarantee by Black-Scholes when the fund is an unmanaged equity fund at $22\%$ volatility, and when it is a target volatility fund at $12\%$.
>
> > [!answer]-
> > At $\sigma = 0.22$, $d_1 = 0.77907$ and $d_2 = 0.08337$, and $100e^{-0.30} = 74.0818$.
> > $$
> > \begin{align*}
> > P_{22\%} &= 74.0818\,N(-0.08337) - 100\,N(-0.77907) \\
> > &= 74.0818(0.466779) - 100(0.217969) \\
> > &= 12.78
> > \end{align*}
> > $$
> > At $\sigma = 0.12$, $d_1 = 0.98031$ and $d_2 = 0.60083$.
> > $$
> > \begin{align*}
> > P_{12\%} &= 74.0818(0.273976) - 100(0.163468) \\
> > &= 3.95
> > \end{align*}
> > $$
> > Targeting cuts the guarantee's value from \$12.78 to \$3.95 per \$100, about $69\%$. The unmanaged fund's cost also moves with implied volatility, while the managed fund's stays close to the target's, so the insurer can price the fee more stably and hedge less vega.

> [!tip]- How it appears on the exam
> - **INV-201:** The objective asks candidates to "demonstrate an understanding of target volatility funds and their effect on fund performance, guarantee cost, and risk control", read in the notes on variable annuity volatility management and on investment instruments with a volatility target mechanism.
> - **Calculations:** Expect to compute the equity weight from a target and a volatility estimate, track a fund through a few periods against the index, or compare a guarantee's value at the target volatility with its value unmanaged.
> - **Explanations:** Written parts ask why the fund loses less in a crash and lags in a rebound, why it lowers and stabilizes the guarantee's cost and hedge cost, which risks remain, and who bears the cost of the lower expected return.

> [!warning]- Exam traps
> - **The weight uses the estimate:** The weight is set from the volatility estimated before the period, not the volatility realized during it. If volatility jumps between rebalancings, the fund overshoots the target, so the target is met only on average.
> - **The cap on leverage:** In calm markets $\sigma_{\text{target}}/\hat\sigma_t$ can exceed $1$, and the weight is then the cap, not the ratio. Forgetting the cap makes the fund hold leverage that the mandate does not allow.
> - **Lower volatility is not free:** The fund's lower risk comes with lower expected return, because it holds less equity on average. Saying that targeting lowers the guarantee's cost with no effect on the policyholder ignores the transfer.
> - **The risk-neutral drift:** Under the risk-neutral measure the fund still grows at the risk-free rate, whatever its equity weight. Using the lower expected real-world return to value the guarantee mixes the two measures and overstates its cost.
