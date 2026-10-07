---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2631f2830648ce71b00fcb257903ab41d0c843112db4d24596bb5eecc3f588a4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Volatility.md
---

**Volatility** ($\sigma$) is the annualized [[Standard Deviation|standard deviation]] of an asset's continuously compounded return: under the lognormal model of the [[Black-Scholes Model]], $\ln(S_T/S_0)$ has [[Variance|variance]] $\sigma^2 T$. It is the one Black-Scholes input that cannot be observed directly, so it is either estimated from past prices (**realized** or historical volatility) or backed out of option prices (**implied** volatility).

> $$\operatorname{Var}\!\left[\ln\frac{S_T}{S_0}\right] = \sigma^2 T$$

> $$\hat\sigma = \frac{s}{\sqrt{h}}$$

> $$C_{BS}(S_0, K, r, \delta, \sigma_{\text{imp}}, T) = C_{\text{market}}$$

> $$\text{Vega} = S_0 e^{-\delta T}\, n(d_1) \sqrt{T}$$

- $s$ is the sample standard deviation (divisor $n-1$) of the log returns $\ln(S_i/S_{i-1})$ observed every $h$ years ($h = 1/52$ for weekly, $1/252$ for trading days); volatility scales with $\sqrt{\text{time}}$, so a daily $1\%$ is about $16\%$ a year
- Implied volatility is the $\sigma$ that makes the model price equal the market price; it is solved numerically, and it differs by strike (the **smile** or **skew**), which is itself evidence that the constant-$\sigma$ lognormal model is wrong
- **Vega** ($n(d_1)$ is the standard [[Normal Distribution|normal]] density) is the option price's sensitivity to $\sigma$; it is the same for a call and a put, so writing either leaves an insurer short volatility, as a variable annuity guarantee does
- **Realized versus implied**: a delta hedge priced at $\sigma_{\text{imp}}$ earns or loses according to the volatility actually realized (see [[Delta Hedging]]); **target volatility funds** cap a guarantee's cost by setting the equity weight to $w_t = \sigma_{\text{target}} / \hat\sigma_t$

> [!example]- Estimating Volatility from Weekly Prices {Example}
> An equity index closed at $50.00$, $51.20$, $49.80$, $50.60$, $52.10$, $51.40$ on six consecutive Fridays. Estimate its annual volatility.
>
> > [!answer]-
> > The five weekly log returns are $0.023717$, $-0.027725$, $0.015937$, $0.029213$, $-0.013527$, with mean $\bar R = 0.005523$ and $\sum (R_i - \bar R)^2 = 0.0024690$.
> > $$
> > \begin{align*}
> > s &= \sqrt{\frac{0.0024690}{4}} \\
> >   &= 0.024844 \\
> > \hat\sigma &= 0.024844\sqrt{52} \\
> >            &= 0.1792
> > \end{align*}
> > $$
> > The index's estimated volatility is about $17.9\%$ a year. Five returns make this a very noisy estimate.

> [!example]- Backing Out Implied Volatility {Example}
> An index at $100$ has dividend yield $\delta = 0.015$; $r = 0.03$. A 1-year at-the-money European call trades at $9.00$. Starting from $\sigma = 0.20$, take one Newton step to estimate the implied volatility.
>
> > [!answer]-
> > At $\sigma = 0.20$, $d_1 = (0.03 - 0.015 + 0.02)/0.20 = 0.175$ and the model price is $C = 8.5437$.
> > $$
> > \begin{align*}
> > \text{Vega} &= 100e^{-0.015}\, n(0.175)\sqrt{1} \\
> >             &= 98.5112 \times 0.39288 \\
> >             &= 38.703 \\
> > \sigma_1 &= 0.20 + \frac{9.00 - 8.5437}{38.703} \\
> >          &= 0.2118
> > \end{align*}
> > $$
> > The model price at $\sigma_1$ is $8.99993$, so the implied volatility is $21.18\%$, above the $20\%$ starting guess because the market price is higher.

> [!example]- Equity Weight in a Target Volatility Fund {Example}
> A fund backing a variable annuity targets $10\%$ volatility, holding equities and cash. The equity index's volatility is currently estimated at $16\%$. Find the equity allocation, and the fund's volatility if the index's volatility turns out to be $24\%$ before the next rebalancing.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > w &= \frac{0.10}{0.16} \\
> >   &= 0.625 \\
> > \sigma_{\text{fund}} &= 0.625 \times 0.24 \\
> >                      &= 0.15
> > \end{align*}
> > $$
> > The fund holds $62.5\%$ equities and $37.5\%$ cash, treating cash as riskless. Volatility rising between rebalancings pushes the fund to $15\%$, so the target is met only as well as $\hat\sigma$ forecasts the next period.

> [!tip]- How it appears on the exam
> - **INV-201** ("realized versus implied volatility"; risks "that can be hedged, including ... volatility"): explain why implied exceeds or differs from realized volatility, and what that gap does to the profit of a delta-hedged book, as a written answer.
> - **INV-201**: compute vega and the vega exposure of a guarantee or hedge portfolio, then the trades in options that neutralize it alongside delta and gamma (see [[Hedging]]).
> - **INV-201** (target volatility funds and their effect on "fund performance, guarantee cost, and risk control"): compute the equity weight and describe how the mechanism lowers the guarantee's cost and what it gives up in returns.
> - The Black-Scholes questions on **FAM** and **ALTAM** give $\sigma$ as an input; the volatility work there is reading it correctly into $d_1$ and $d_2$.

> [!warning]- Exam traps
> - **Annualizing with the wrong factor.** Multiply a periodic standard deviation by $\sqrt{\text{periods per year}}$, not by the number of periods; weekly $\times 52$ instead of $\times\sqrt{52}$ gives a volatility seven times too large.
> - **Using simple returns or the population divisor.** The estimator uses log returns and divides by $n-1$; with few observations, dividing by $n$ visibly understates $\hat\sigma$.
> - **Mixing up $\sigma^2$ and $\sigma$.** A question may give the variance of the annual log return ($0.04$); $\sigma$ is its square root ($0.20$).
> - **Assuming a put's vega is negative.** Both calls and puts gain value as volatility rises; a short put (a GMMB) loses when volatility rises.
