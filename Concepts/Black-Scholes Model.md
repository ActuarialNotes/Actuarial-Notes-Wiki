---
aliases:
  - Black-Schole
  - Black-Scholes
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:4f5da096e442af4f91a45b66b86b233f80058abd6a1a58b6b6377a6397bd787d
  sources:
    - "M. Haugh, A Brief Introduction to Stochastic Calculus (Columbia IEOR E4706, 2016), §3.2 Example 3, eq. (13), p.7, sha256:4b46de3a7be7614a125324d6360ed019727aa7d4a9cb75e87f681d9ecc36e19d — http://www.columbia.edu/~mh2078/FoundationsFE/IntroStochCalc.pdf"
    - "M. Haugh, The Black-Scholes Model (Columbia IEOR E4706, 2016), eq. (1), p.1 (GBM drift mu); p.2 (mu = r would mean no premium for holding the stock; Q-dynamics eq. (10)), sha256:a84225df571d081f2eb2079d8e1160d51af50c72e4fd2c52f5073ac39d6884bb — http://www.columbia.edu/~mh2078/FoundationsFE/BlackScholes.pdf"
    - "SOA Exam FAM-S sample solutions (Oct 2024), Q104 p.41, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Black-Scholes Model.md
---
The **Black-Scholes Model** prices a European option on a non-dividend-paying stock by assuming the stock price follows a geometric Brownian motion with constant [[Volatility|volatility]] $\sigma$ and a constant continuously compounded risk-free rate $r$; the price is the [[Risk-Neutral Valuation|risk-neutral]] expected [[Present Value|present value]] of the option's [[Payoff|payoff]]. The same formula values the guarantees embedded in equity-linked [[Life Insurance|life insurance]] and [[Annuity Contract|annuity contracts]].

> $$c = S_0\,N(d_1) - K e^{-rT} N(d_2)$$

> $$p = K e^{-rT} N(-d_2) - S_0\,N(-d_1)$$

> $$d_1 = \frac{\ln(S_0/K) + \left(r + \tfrac{1}{2}\sigma^2\right)T}{\sigma\sqrt{T}}$$

> $$d_2 = d_1 - \sigma\sqrt{T}$$

- $S_0$ is today's stock price, $K$ the strike, $T$ the time to expiry in years and $N(\cdot)$ the standard [[Normal Distribution|normal]] CDF. Under the risk-neutral measure $\ln S_T$ is normal with mean $\ln S_0 + (r - \sigma^2/2)T$ and variance $\sigma^2 T$, so $S_T$ is [[Lognormal Distribution|lognormal]]; $N(d_2)$ is the risk-neutral probability that a call finishes in the money
- **Real-world (P-measure) model.** For a real probability, such as the chance that a fund ends below a guarantee, use the distribution of actual returns, not the risk-neutral one. A stock or fund said to follow a lognormal distribution with parameters $\mu$ and $\sigma$ per year has $\ln(S_t/S_0) \sim N(\mu t, \sigma^2 t)$: the mean and the variance of the log return both grow in proportion to $t$, so its standard deviation grows with $\sqrt t$. Then $\Pr(S_t < G) = N\!\left(\frac{\ln(G/S_0) - \mu t}{\sigma\sqrt t}\right)$. Here $\mu$ is the mean of the log return. Under geometric Brownian motion with expected return $\alpha$, that mean is $\alpha - \sigma^2/2$, so check which of the two parameters a question gives.
- **Delta** (units of stock in the [[Delta Hedging|replicating portfolio]]): $N(d_1)$ for the call, $-N(-d_1)$ for the put. Valuing at time $t$ replaces $T$ by $T - t$
- Call and put satisfy [[Put-Call Parity|put-call parity]], $c - p = S_0 - Ke^{-rT}$, which is a quick check on any pair of prices
- **Embedded guarantees (AMLCR):** a guaranteed minimum maturity benefit $G$ at time $T$ on a fund $F_T = F_0\,(S_T/S_0)(1-m)^T$ is a put on the fund. Its value at issue is ${}_Tp_x$ times a Black-Scholes put with $F_0(1-m)^T$ in place of $S_0$ and $G$ in place of $K$, where $m$ is the annual management charge

> [!example]- Pricing a Put and a Call on the Same Stock {Example}
> A non-dividend-paying stock trades at $S_0 = 100$. The risk-free force of interest is $r = 0.04$ and $\sigma = 0.25$. Find the Black-Scholes prices and deltas of one-year European call and put options with strike $K = 105$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > d_1 &= \frac{\ln(100/105) + (0.04 + 0.03125)(1)}{0.25} \\
> > &= \frac{-0.04879 + 0.07125}{0.25} \\
> > &= 0.08984
> > \end{align*}
> > $$
> > So $d_2 = 0.08984 - 0.25 = -0.16016$, $N(d_1) = 0.53579$, $N(d_2) = 0.43638$, and $Ke^{-rT} = 105e^{-0.04} = 100.8829$.
> > $$
> > \begin{align*}
> > c &= 100(0.53579) - 100.8829(0.43638) \\
> > &= 53.579 - 44.023 \\
> > &= 9.556
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > p &= 100.8829(0.56362) - 100(0.46421) \\
> > &= 56.860 - 46.421 \\
> > &= 10.439
> > \end{align*}
> > $$
> > Parity check: $c - p = -0.883 = 100 - 100.883$. The call's delta is $0.536$ and the put's is $-0.464$: a writer of the put hedges by shorting $0.464$ shares per option.

> [!example]- Cost of a Guaranteed Minimum Maturity Benefit {Example}
> A single premium of $100{,}000$ from a life aged 55 is invested in an equity fund that tracks a stock index. A management charge of $m = 0.25\%$ is deducted from the fund at the start of each year. At the end of 10 years, if the policyholder is alive, the insurer tops the fund up to the premium (a GMMB with $G = 100{,}000$). Given ${}_{10}p_{55} = 0.92$, $r = 0.04$ and $\sigma = 0.20$, find the value of the guarantee at issue.
>
> > [!answer]-
> > The guarantee pays $(G - F_{10})^+$ where $F_{10} = 100{,}000\,(S_{10}/S_0)(0.9975)^{10}$, so it is a put on a fund worth $F_0(1-m)^{10} = 97{,}527.94$ in today's money, with strike $100{,}000$.
> > $$
> > \begin{align*}
> > d_1 &= \frac{\ln(97{,}527.94/100{,}000) + (0.04 + 0.02)(10)}{0.20\sqrt{10}} \\
> > &= \frac{-0.02503 + 0.6}{0.63246} \\
> > &= 0.90911
> > \end{align*}
> > $$
> > $d_2 = 0.27665$, $N(-d_1) = 0.18165$, $N(-d_2) = 0.39102$, and $Ge^{-10r} = 67{,}032.00$.
> > $$
> > \begin{align*}
> > \text{put} &= 67{,}032.00(0.39102) - 97{,}527.94(0.18165) \\
> > &= 26{,}211.16 - 17{,}715.68 \\
> > &= 8{,}495.47
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \text{Value} &= {}_{10}p_{55} \times 8{,}495.47 \\
> > &= 0.92 \times 8{,}495.47 \\
> > &= 7{,}815.84
> > \end{align*}
> > $$
> > The guarantee costs about $7.8\%$ of the premium, which the insurer recovers from the management charges or a separate risk charge.

> [!example]- Real-World Versus Risk-Neutral Probability of a Shortfall {Example}
> A fund follows a lognormal distribution with parameters $\mu = 0.05$ and $\sigma = 0.20$ per year. A guarantee pays if the fund's value in 4 years is below its value today. The continuously compounded risk-free rate is $r = 0.03$. Find the real-world probability that the guarantee pays, and compare it with the risk-neutral probability used in pricing.
>
> > [!answer]-
> > Over 4 years both the mean and the variance of the log return scale by 4, so $\ln(S_4/S_0) \sim N(0.20,\ 0.16)$, a standard deviation of $0.40$.
> >
> > $$
> > \begin{align*}
> > \Pr(S_4 < S_0) &= N\!\left(\frac{0 - 0.20}{0.40}\right) \\
> > &= N(-0.50) \\
> > &= 0.3085
> > \end{align*}
> > $$
> >
> > Under the risk-neutral measure the mean of the log return is $(r - \sigma^2/2)\,t = (0.03 - 0.02)(4) = 0.04$:
> >
> > $$
> > \begin{align*}
> > \Pr{}^{Q}(S_4 < S_0) &= N\!\left(\frac{0 - 0.04}{0.40}\right) \\
> > &= N(-0.10) \\
> > &= 0.4602
> > \end{align*}
> > $$
> >
> > *Why do they differ?* The risk-neutral measure is a pricing device: it replaces the fund's own drift with the risk-free rate. How often the guarantee actually pays is a question about the real-world distribution, with its own $\mu$.

> [!tip]- How it appears on the exam
> - **FAM** asks for the price of a European call or put on a non-dividend-paying stock, and its delta, from $S_0$, $K$, $r$, $\sigma$ and $T$; a companion part often checks or uses [[Put-Call Parity|put-call parity]].
> - **ALTAM** asks for the value of a GMMB or GMDB "using the Black-Scholes model": the put is written on the fund net of management charges, then multiplied by a survival probability (GMMB) or summed over the year of death (GMDB).
> - ALTAM follows on with a [[Delta Hedging|delta hedge]]: the units of stock and the bond holding in the replicating portfolio at issue and after one step, and the hedging error from rebalancing only at discrete times.

> [!warning]- Exam traps
> - Using an annual effective rate for $r$: Black-Scholes needs the continuously compounded rate, so $i = 5\%$ becomes $r = \ln 1.05 = 0.04879$.
> - Writing the GMMB put on $F_0$ instead of $F_0(1-m)^T$. Leaving out the charges understates the guarantee's cost.
> - Forgetting the survival probability on an embedded option: the option value is the market price, but the insurer only pays if the life is alive at $T$ (GMMB) or dies before $T$ (GMDB).
> - Sign slips in the put: it is $N(-d_2)$ and $N(-d_1)$, and the put's delta is negative. A positive put delta means the hedge has been set up in the wrong direction.
