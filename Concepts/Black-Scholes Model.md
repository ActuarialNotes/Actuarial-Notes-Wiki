---
aliases:
  - Black-Schole
  - Black-Scholes
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:181e63a0985cbcdb75164500187026190fce6f1fab42b2849499b52ab8bfd440
  sources:
    - "M. Haugh, A Brief Introduction to Stochastic Calculus (Columbia IEOR E4706, 2016), §3.2 Example 3, eq. (13), p.7, sha256:4b46de3a7be7614a125324d6360ed019727aa7d4a9cb75e87f681d9ecc36e19d — http://www.columbia.edu/~mh2078/FoundationsFE/IntroStochCalc.pdf"
    - "M. Haugh, The Black-Scholes Model (Columbia IEOR E4706, 2016), eq. (1), p.1 (GBM drift mu); p.2 (mu = r would mean no premium for holding the stock; Q-dynamics eq. (10)), sha256:a84225df571d081f2eb2079d8e1160d51af50c72e4fd2c52f5073ac39d6884bb — http://www.columbia.edu/~mh2078/FoundationsFE/BlackScholes.pdf"
    - "SOA Exam FAM-S sample solutions (Oct 2024), Q104 p.41, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Black-Scholes Model.md
---
The **Black-Scholes Model** is a model that prices a European option on a non-dividend-paying stock by assuming that the stock price follows a geometric Brownian motion with constant [[Volatility|volatility]] $\sigma$ and that the continuously compounded risk-free rate $r$ is constant. The price is the [[Risk-Neutral Valuation|risk-neutral]] expected [[Present Value|present value]] of the option's [[Payoff|payoff]]. The price of a European call with strike $K$ and time to expiry $T$ years, on a stock priced at $S_0$ today, is

> $$c = S_0\,N(d_1) - K e^{-rT} N(d_2)$$

- $N(\cdot)$ is the standard [[Normal Distribution|normal]] CDF.

The first argument of $N$ is

> $$d_1 = \frac{\ln(S_0/K) + \left(r + \tfrac{1}{2}\sigma^2\right)T}{\sigma\sqrt{T}}$$

The second argument is

> $$d_2 = d_1 - \sigma\sqrt{T}$$

The price of the European put with the same strike and expiry is

> $$p = K e^{-rT} N(-d_2) - S_0\,N(-d_1)$$

Under the risk-neutral measure, $\ln S_T$ is normal with mean $\ln S_0 + (r - \sigma^2/2)T$ and variance $\sigma^2 T$, so $S_T$ is [[Lognormal Distribution|lognormal]]. $N(d_2)$ is the risk-neutral probability that the call finishes in the money. Call and put satisfy [[Put-Call Parity|put-call parity]], $c - p = S_0 - Ke^{-rT}$, which is a quick check on any pair of prices.

An option's delta is the number of shares of stock in its [[Delta Hedging|replicating portfolio]]. It is $N(d_1)$ for the call, $-N(-d_1)$ for the put. Valuing at time $t$ replaces $T$ by $T - t$.

> [!example]- What are the Black-Scholes prices and deltas of 1-year European calls and puts with strike $105$ on this stock? {Example}
> A non-dividend-paying stock trades at $S_0 = 100$. The continuously compounded risk-free rate is $r = 0.04$ and $\sigma = 0.25$.
>
> > [!answer]-
> > - $\ln(100/105) = -0.04879$ and $(r + \sigma^2/2)T = 0.07125$, so $d_1 = (-0.04879 + 0.07125)/0.25 = 0.08984$.
> > - $d_2 = 0.08984 - 0.25 = -0.16016$, so $N(d_1) = 0.53579$ and $N(d_2) = 0.43638$.
> > - The discounted strike is $Ke^{-rT} = 105e^{-0.04} = 100.8829$.
> > - The call is $c = 100(0.53579) - 100.8829(0.43638) = 9.556$.
> > - The put is $p = 100.8829(0.56362) - 100(0.46421) = 10.439$.
> > - As a parity check, $c - p = -0.883 = 100 - 100.883$.
> > - The call's delta is $0.536$ and the put's is $-0.464$: a writer of the put hedges by shorting $0.464$ shares per option.

## Real-world probabilities

A real probability, such as the chance that a fund ends below a guarantee, uses the distribution of actual returns, not the risk-neutral one. A stock or fund said to follow a lognormal distribution with parameters $\mu$ and $\sigma$ per year has $\ln(S_t/S_0) \sim N(\mu t, \sigma^2 t)$. The mean and the variance of the log return both grow in proportion to $t$, so its standard deviation grows with $\sqrt t$. The probability that it ends below a level $G$ at time $t$ is

> $$\Pr(S_t < G) = N\!\left(\frac{\ln(G/S_0) - \mu t}{\sigma\sqrt t}\right)$$

Here $\mu$ is the mean of the log return. Under geometric Brownian motion with expected return $\alpha$, that mean is $\alpha - \sigma^2/2$, so check which of the two parameters a question gives.

> [!example]- What are the real-world and the risk-neutral probabilities that this fund is worth less in 4 years than today? {Example}
> A fund follows a lognormal distribution with parameters $\mu = 0.05$ and $\sigma = 0.20$ per year. The continuously compounded risk-free rate is $r = 0.03$.
>
> > [!answer]-
> > - Over 4 years the mean and the variance of the log return both scale by 4, so $\ln(S_4/S_0) \sim N(0.20,\ 0.16)$, a standard deviation of $0.40$.
> > - The real-world probability is $N\!\left(\frac{0 - 0.20}{0.40}\right) = N(-0.50) = 0.3085$.
> > - Under the risk-neutral measure the mean of the log return is $(r - \sigma^2/2)\,t = (0.03 - 0.02)(4) = 0.04$.
> > - The risk-neutral probability is $N\!\left(\frac{0 - 0.04}{0.40}\right) = N(-0.10) = 0.4602$.
> > - The risk-neutral measure replaces the fund's own drift with the risk-free rate, so it prices the guarantee but does not say how often it pays.

## Guarantees embedded in insurance contracts

The same formula values the guarantees embedded in equity-linked [[Life Insurance|life insurance]] and [[Annuity Contract|annuity contracts]]. A guaranteed minimum maturity benefit (GMMB) $G$ at time $T$ on a fund $F_T = F_0\,(S_T/S_0)(1-m)^T$ is a put on the fund, where $m$ is the annual management charge. Its value at issue is ${}_Tp_x$ times a Black-Scholes put with $F_0(1-m)^T$ in place of $S_0$ and $G$ in place of $K$.

> [!example]- What is the value at issue of this guarantee? {Example}
> A single premium of $100{,}000$ from a life aged 55 is invested in an equity fund that tracks a stock index. A management charge of $m = 0.25\%$ is deducted from the fund at the start of each year. At the end of 10 years, if the policyholder is alive, the insurer tops the fund up to the premium, a GMMB with $G = 100{,}000$. Also, ${}_{10}p_{55} = 0.92$, $r = 0.04$ and $\sigma = 0.20$.
>
> > [!answer]-
> > - The guarantee pays $(G - F_{10})^+$, where $F_{10} = 100{,}000\,(S_{10}/S_0)(0.9975)^{10}$.
> > - It is a put on a fund worth $F_0(1-m)^{10} = 97{,}527.94$ in today's money, with strike $100{,}000$.
> > - $\ln(97{,}527.94/100{,}000) = -0.02503$, $(r + \sigma^2/2)T = 0.6$ and $\sigma\sqrt{T} = 0.63246$, so $d_1 = (-0.02503 + 0.6)/0.63246 = 0.90911$ and $d_2 = 0.27665$.
> > - $N(-d_1) = 0.18165$, $N(-d_2) = 0.39102$ and $Ge^{-10r} = 67{,}032.00$.
> > - The put is $67{,}032.00(0.39102) - 97{,}527.94(0.18165) = 8{,}495.47$.
> > - The value of the guarantee is $0.92 \times 8{,}495.47 = 7{,}815.84$, about $7.8\%$ of the premium.

> [!trap] Using an annual effective rate for $r$
> Black-Scholes needs the continuously compounded rate. An annual effective rate of $i = 5\%$ becomes $r = \ln 1.05 = 0.04879$ before it goes into $d_1$ and $e^{-rT}$.
