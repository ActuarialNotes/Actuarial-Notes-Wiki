---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:457406242b4cbbe2d12f47a517a27259c663317ddf9480f50b7a4ac47a7be2cf
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Volatility.md
---
**Volatility** is the annualized [[Standard Deviation|standard deviation]] of an asset's continuously compounded return. Under the lognormal model of the [[Black-Scholes Model|Black-Scholes model]], with volatility $\sigma$, the [[Variance|variance]] of the log return over $T$ years is

> $$\operatorname{Var}\!\left[\ln\frac{S_T}{S_0}\right] = \sigma^2 T$$

- $S_0$ is the asset price today and $S_T$ the price at time $T$.

Volatility is the one Black-Scholes input that cannot be observed directly. It is either estimated from past prices, as **realized** or historical volatility, or backed out of option prices, as **implied** volatility.

## Historical volatility

From log returns $\ln(S_i/S_{i-1})$ observed every $h$ years, the estimated volatility is

> $$\hat\sigma = \frac{s}{\sqrt{h}}$$

- $s$ is the sample standard deviation of the log returns, with divisor $n - 1$.
- $h$ is $1/52$ for weekly returns and $1/252$ for daily returns over trading days.

Volatility scales with the square root of time, so a daily standard deviation of 1% is about 16% a year.

> [!example]- An equity index closed at $50.00$, $51.20$, $49.80$, $50.60$, $52.10$ and $51.40$ on six consecutive Fridays. What is its estimated annual volatility? {Example}
> - The five weekly log returns are $0.023717$, $-0.027725$, $0.015937$, $0.029213$ and $-0.013527$.
> - Their mean is $\bar R = 0.005523$, and $\sum (R_i - \bar R)^2 = 0.0024690$.
> - The sample standard deviation is $s = \sqrt{0.0024690/4} = 0.024844$.
> - The annual volatility is $\hat\sigma = 0.024844\sqrt{52} = 0.1792$, about 17.9% a year.
> - Five returns make this a very noisy estimate.

## Implied volatility

The implied volatility $\sigma_{\text{imp}}$ of an option is the $\sigma$ that makes the model price equal the market price:

> $$C_{BS}(S_0, K, r, \delta, \sigma_{\text{imp}}, T) = C_{\text{market}}$$

- $K$ is the strike, $r$ the risk-free rate and $\delta$ the dividend yield.

The equation is solved numerically. Implied volatility differs by strike, a pattern called the **smile** or **skew**, which is itself evidence that the constant-$\sigma$ lognormal model is wrong.

The option price's sensitivity to $\sigma$ is its vega, one of the [[Option Greeks|option Greeks]]:

> $$\text{Vega} = S_0 e^{-\delta T}\, n(d_1) \sqrt{T}$$

- $n(d_1)$ is the standard [[Normal Distribution|normal]] density at $d_1$.

Vega is the same for a call and a put, and it is positive for both. Writing either option leaves an insurer short volatility, as a variable annuity guarantee does.

> [!example]- What is the implied volatility after one Newton step from $\sigma = 0.20$? {Example}
> An index at $100$ has dividend yield $\delta = 0.015$, and $r = 0.03$. A one-year at-the-money European call trades at $9.00$.
>
> > [!answer]-
> > - At $\sigma = 0.20$, $d_1 = (0.03 - 0.015 + 0.02)/0.20 = 0.175$ and the model price is $C = 8.5437$.
> > - The vega is $100e^{-0.015} \times n(0.175) = 98.5112 \times 0.39288 = 38.703$.
> > - The Newton step is $\sigma_1 = 0.20 + (9.00 - 8.5437)/38.703 = 0.2118$.
> > - The model price at $\sigma_1$ is $8.99993$, so the implied volatility is 21.18%.

## Realized versus implied volatility

A [[Delta Hedging|delta hedge]] priced at $\sigma_{\text{imp}}$ earns or loses according to the volatility the asset actually realizes over the hedge.

## Target volatility funds

A target volatility fund caps a guarantee's cost by setting its equity weight to

> $$w_t = \frac{\sigma_{\text{target}}}{\hat\sigma_t}$$

- $\sigma_{\text{target}}$ is the fund's target volatility.
- $\hat\sigma_t$ is the current estimate of the equity index's volatility.

The rest of the fund is held in cash.

> [!example]- What is this fund's equity allocation, and what is its volatility if the index's volatility turns out to be 24%? {Example}
> A fund backing a variable annuity targets 10% volatility, holding equities and cash. The equity index's volatility is currently estimated at 16%.
>
> > [!answer]-
> > - The equity weight is $w = 0.10/0.16 = 0.625$, so the fund holds 62.5% equities and 37.5% cash.
> > - Treating cash as riskless, the fund's volatility is $0.625 \times 0.24 = 0.15$.
> > - The fund runs at 15% until the next rebalancing, so the target is met only as well as $\hat\sigma$ forecasts the next period.

> [!trap] Annualizing with the wrong factor
> Multiply a periodic standard deviation by the square root of the number of periods per year. Multiplying weekly by $52$ instead of $\sqrt{52}$ gives a volatility about seven times too large.
