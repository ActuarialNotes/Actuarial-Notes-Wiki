---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:44b545e760a7ce1bf0ddbefcbe5301c27d64af876093b6204e947d8b21fc4efb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Guaranteed Minimum Death Benefit.md
---

A **guaranteed minimum death benefit** (GMDB) is a guarantee in an [[Equity-Linked Insurance|equity-linked]] contract that the benefit paid on death will be at least a guaranteed amount $G_t$, so the beneficiary receives $\max(G_t, F_t)$ instead of the fund $F_t$. The insurer pays the excess $(G_t - F_t)^+$, which is a put option on the fund that expires at the time of death. Its value at issue is the [[Black-Scholes Model|Black-Scholes]] put price for each possible year of death, weighted by the probability of dying in that year.

> $$\max(G_t, F_t) = F_t + (G_t - F_t)^+$$

> $$\pi(0) = \sum_{t=1}^{n} {}_{t-1|}q_x\,P(t)$$

> $$P(t) = G_te^{-rt}N(-d_2) - F_0(1-m)^tN(-d_1)$$

> $$\pi(0) = \int_0^n {}_tp_x\,\mu_{x+t}\,P(t)\,dt$$

- **Symbols:** $\pi(0)$ is the value of the guarantee at issue per policy, for a benefit paid at the end of the year of death on a contract of term $n$, and ${}_{t-1|}q_x$ is the probability of death in year $t$. $P(t)$ is a Black-Scholes put with strike $G_t$ and expiry $t$ on a fund worth $F_0$ at issue, from which a management charge $m$ is deducted at the start of each year. Its $d_1 = [\ln(F_0(1-m)^t/G_t) + (r + \sigma^2/2)t]/(\sigma\sqrt{t})$ and $d_2 = d_1 - \sigma\sqrt{t}$, with $r$ the continuously compounded risk-free rate. The integral, with the [[Hazard Rate|force of mortality]] $\mu_{x+t}$, is the version for a benefit paid at the moment of death.
- **Guarantee designs:** A return-of-premium GMDB has $G_t$ equal to the premium. A roll-up GMDB grows the guarantee at a fixed rate $g$, so each $P(t)$ simply has the higher strike $G(1+g)^t$. A ratchet resets the guarantee at each anniversary to the fund value when that is higher, which makes the payoff depend on the fund's whole path, so it is not a single Black-Scholes put and is usually valued by simulation.
- **Size of the cost:** Death in any one year is unlikely, so a GMDB costs far less than a [[Guaranteed Minimum Maturity Benefit|GMMB]] with the same guarantee, which is paid to everyone who survives. On the contract in the first example, the 10-year GMDB is worth $593.66$ against $10{,}282.79$ for the GMMB.
- **Mortality:** The valuation assumes that deaths are independent of the market and diversified across a large portfolio. The insurer then hedges the expected number of deaths in each year by [[Delta Hedging|delta hedging]], and deaths that differ from those expected are left unhedged.

> [!example]- Valuing a 10-Year Return-of-Premium GMDB {Example}
> A single premium of \$100,000 from a life aged 60 is invested in an equity index fund. A management charge of $1.5\%$ of the fund is deducted at the start of each year, and on death within 10 years the contract pays, at the end of the year of death, the larger of the fund and \$100,000. Use $r = 0.04$, $\sigma = 0.20$ and the Standard Ultimate Life Table. Find the value of the guarantee at issue.
>
> > [!answer]-
> > For death in year 1 the put is on $100{,}000(0.985) = 98{,}500$, with strike $100{,}000$ and expiry 1.
> > $$
> > \begin{align*}
> > d_1 &= \frac{\ln(0.985) + 0.06}{0.20} \\
> > &= 0.22443 \\
> > d_2 &= 0.22443 - 0.20 \\
> > &= 0.02443 \\
> > P(1) &= 96{,}078.94\,N(-d_2) - 98{,}500\,N(-d_1) \\
> > &= 47{,}103.09 - 40{,}504.25 \\
> > &= 6{,}598.84
> > \end{align*}
> > $$
> > Each later year uses $100{,}000(0.985)^t$ and expiry $t$ in the same way.
> >
> > | $t$ | ${}_{t-1\vert}q_{60}$ | $P(t)$ | Product |
> > |---|---|---|---|
> > | 1 | 0.003398 | 6,598.84 | 22.42 |
> > | 2 | 0.003779 | 8,454.39 | 31.95 |
> > | 3 | 0.004203 | 9,521.17 | 40.02 |
> > | 4 | 0.004676 | 10,187.12 | 47.63 |
> > | 5 | 0.005203 | 10,605.11 | 55.18 |
> > | 6 | 0.005789 | 10,854.56 | 62.84 |
> > | 7 | 0.006440 | 10,983.01 | 70.73 |
> > | 8 | 0.007161 | 11,021.59 | 78.93 |
> > | 9 | 0.007960 | 10,991.88 | 87.50 |
> > | 10 | 0.008842 | 10,909.55 | 96.46 |
> >
> > The products sum to $\pi(0) = 593.66$, or about $0.6\%$ of the premium. The puts grow with their term at first, because each extra year adds time value and another charge, and then they level off as discounting the strike over more years starts to outweigh both.

> [!example]- Return of Premium, Roll-Up and Ratchet on One Fund Path {Example}
> For the contract in the first example, the fund earns $+12\%$, $+8\%$ and $-25\%$ in the first three years, after the $1.5\%$ charge taken at the start of each year. Find the GMDB payoff on death in year 3 if the guarantee is (a) the premium, (b) the premium rolled up at $3\%$ a year, or (c) an annual ratchet that resets the guarantee to the fund at each anniversary when the fund is higher.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > F_1 &= 100{,}000(0.985)(1.12) \\
> > &= 110{,}320.00 \\
> > F_2 &= 110{,}320.00(0.985)(1.08) \\
> > &= 117{,}358.42 \\
> > F_3 &= 117{,}358.42(0.985)(0.75) \\
> > &= 86{,}698.53
> > \end{align*}
> > $$
> > **(a)** $100{,}000 - 86{,}698.53 = 13{,}301.47$.
> >
> > **(b)** The guarantee is $100{,}000(1.03)^3 = 109{,}272.70$, so the payoff is $109{,}272.70 - 86{,}698.53 = 22{,}574.17$.
> >
> > **(c)** The guarantee has ratcheted to the highest anniversary value, $\max(100{,}000,\ 110{,}320.00,\ 117{,}358.42) = 117{,}358.42$, so the payoff is $117{,}358.42 - 86{,}698.53 = 30{,}659.89$.
> >
> > The ratchet locked in the gains of the first two years, so a fall that leaves the fund well above the premium still costs the insurer the most. That is why ratchets cost more than return-of-premium guarantees.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to "define and calculate payoffs" under a GMDB, given a fund path, the charges and the guarantee design, as in the second example.
> - **Valuation:** ALTAM then asks for its value "using the Black-Scholes model", summing a put for each year of death weighted by the probability of death in that year, and sometimes compares it with the GMMB on the same contract.
> - **Hedging:** The replicating portfolio for the GMDB is the sum over the years of death of each put's index and bond holdings, weighted the same way, and ALTAM asks candidates to construct it and roll it forward to the next rebalancing date.

> [!warning]- Exam traps
> - **The weight on each put:** Death in year $t$ has probability ${}_{t-1|}q_x = {}_{t-1}p_x\,q_{x+t-1}$. Using $q_{x+t-1}$ alone leaves out survival to the start of the year, and using ${}_np_x$ is the GMMB's weight.
> - **One put per year:** Each year of death has its own expiry $t$ and its own charge factor $(1-m)^t$. Pricing every year's put with the full term $n$ treats every death as if it happened at maturity.
> - **The ratchet is path-dependent:** A ratchet's strike is the highest past anniversary value, which is not known at issue. Pricing it as a put with today's guarantee as the strike understates its cost.
> - **Fund at the time of death:** The payoff uses the fund when the benefit is paid, after the charges deducted to that date. Using the premium or last year's fund value gives the wrong top-up.
