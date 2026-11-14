---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7c3aa4b0a5cd90f70e9472e7b992f1d64195e14aab93e4ed95f8be976a4adf27
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Guaranteed Minimum Death Benefit.md
---
A **Guaranteed Minimum Death Benefit** (GMDB) is a guarantee in an [[Equity-Linked Insurance|equity-linked]] contract that the benefit paid on death will be at least a guaranteed amount $G_t$. If the policyholder's fund at the time of death is $F_t$, the death benefit is

> $$\max(G_t, F_t) = F_t + (G_t - F_t)^+$$

The fund is the policyholder's own money, so the insurer pays only the excess $(G_t - F_t)^+$. That excess is a put option on the fund with strike $G_t$, which expires at the time of death.

## Value at issue

For a contract of term $n$ with the benefit paid at the end of the year of death, the value of the guarantee at issue per policy, $\pi(0)$, is

> $$\pi(0) = \sum_{t=1}^{n} {}_{t-1|}q_x\,P(t)$$

- ${}_{t-1|}q_x = {}_{t-1}p_x\,q_{x+t-1}$ is the probability of death in year $t$.
- $P(t)$ is the price of a put with strike $G_t$ and expiry $t$ on the fund.

If the fund is worth $F_0$ at issue and a management charge $m$ is deducted at the start of each year, the [[Black-Scholes Model|Black-Scholes]] price of that put is

> $$P(t) = G_te^{-rt}N(-d_2) - F_0(1-m)^tN(-d_1)$$

- $d_1 = [\ln(F_0(1-m)^t/G_t) + (r + \sigma^2/2)t]/(\sigma\sqrt{t})$ and $d_2 = d_1 - \sigma\sqrt{t}$.
- $r$ is the continuously compounded risk-free rate.
- $\sigma$ is the fund's [[Volatility|volatility]].

Death in any one year is unlikely, so a GMDB costs far less than a [[Guaranteed Minimum Maturity Benefit|GMMB]] with the same guarantee, which is paid to everyone who survives. The valuation assumes that deaths are independent of the market and diversified across a large portfolio. The insurer then hedges the expected number of deaths in each year by [[Delta Hedging|delta hedging]], and deaths that differ from those expected are left unhedged.

> [!example]- What is the value at issue of this 10-year return-of-premium GMDB? {Example}
> A single premium of $\$100{,}000$ from a life aged 60 is invested in an equity index fund. A management charge of $1.5\%$ of the fund is deducted at the start of each year. On death within 10 years the contract pays, at the end of the year of death, the larger of the fund and $\$100{,}000$. Use $r = 0.04$, $\sigma = 0.20$ and the Standard Ultimate Life Table.
>
> > [!answer]-
> > - For death in year 1 the put is on $100{,}000(0.985) = 98{,}500$, with strike $100{,}000$ and expiry 1.
> > - $d_1 = (\ln 0.985 + 0.06)/0.20 = 0.22443$ and $d_2 = 0.02443$.
> > - $P(1)$ is $96{,}078.94\,N(-d_2) = 47{,}103.09$ less $98{,}500\,N(-d_1) = 40{,}504.25$, which is $6{,}598.84$.
> > - Each later year uses $100{,}000(0.985)^t$ and expiry $t$ in the same way:
> >
> > | $t$ | ${}_{t-1\vert}q_{60}$ | $P(t)$ | Product |
> > |---|---|---|---|
> > | 1 | 0.003398 | 6,598.84 | 22.42 |
> > | 2 | 0.003779 | 8,454.39 | 31.95 |
> > | 3 | 0.004203 | 9,521.17 | 40.02 |
> > | 4 | 0.004676 | 10,187.12 | 47.64 |
> > | 5 | 0.005203 | 10,605.11 | 55.18 |
> > | 6 | 0.005789 | 10,854.56 | 62.84 |
> > | 7 | 0.006440 | 10,983.01 | 70.73 |
> > | 8 | 0.007161 | 11,021.59 | 78.93 |
> > | 9 | 0.007960 | 10,991.88 | 87.49 |
> > | 10 | 0.008842 | 10,909.55 | 96.46 |
> >
> > - The products sum to $\pi(0) = 593.65$, about $0.6\%$ of the premium. The GMMB with the same guarantee on this contract is worth $10{,}282.79$.

For a benefit paid at the moment of death, the value is

> $$\pi(0) = \int_0^n {}_tp_x\,\mu_{x+t}\,P(t)\,dt$$

- $\mu_{x+t}$ is the [[Hazard Rate|force of mortality]] at age $x + t$.

## Return of premium, roll-up and ratchet guarantees

A return-of-premium GMDB has $G_t$ equal to the premium. A roll-up GMDB grows the guarantee at a fixed rate $g$, so each $P(t)$ has the higher strike $G(1+g)^t$. A ratchet resets the guarantee at each anniversary to the fund value when that is higher. The ratchet's payoff depends on the fund's whole path, so it is not a single Black-Scholes put and is usually valued by simulation. In every design the payoff uses the fund when the benefit is paid, after the charges deducted to that date.

> [!example]- What does each of these three GMDB designs pay on death in year 3? {Example}
> For the contract in the example above, the fund earns $+12\%$, $+8\%$ and $-25\%$ in the first three years, after the $1.5\%$ charge taken at the start of each year. The guarantee is (a) the premium, (b) the premium rolled up at $3\%$ a year, or (c) an annual ratchet that resets the guarantee to the fund at each anniversary when the fund is higher.
>
> > [!answer]-
> > - The fund is $F_1 = 100{,}000(0.985)(1.12) = 110{,}320.00$.
> > - Then $F_2 = 110{,}320.00(0.985)(1.08) = 117{,}358.42$.
> > - Then $F_3 = 117{,}358.42(0.985)(0.75) = 86{,}698.53$.
> > - (a) The payoff is $100{,}000 - 86{,}698.53 = 13{,}301.47$.
> > - (b) The guarantee is $100{,}000(1.03)^3 = 109{,}272.70$, so the payoff is $22{,}574.17$.
> > - (c) The guarantee has ratcheted to the highest anniversary value, $117{,}358.42$, so the payoff is $30{,}659.89$.
> > - The ratchet locked in the gains of the first two years, so it costs the insurer the most.

> [!trap] Weighting each put by $q_{x+t-1}$ alone
> Death in year $t$ has probability ${}_{t-1|}q_x = {}_{t-1}p_x\,q_{x+t-1}$. Using $q_{x+t-1}$ alone leaves out survival to the start of the year, and using ${}_np_x$ is the GMMB's weight. Each year's put also has its own expiry $t$ and its own charge factor $(1-m)^t$.
