---
aliases:
  - Guaranteed Minimum Accumulation-maturity Benefit
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7c55aca02c3a2939aec834feb504eb471a2a3da80bc1a22736dc2bb3808e07fc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Guaranteed Minimum Maturity Benefit.md
---
A **Guaranteed Minimum Maturity Benefit** (GMMB) guarantees that a policyholder who is alive at the end of an [[Equity-Linked Insurance|equity-linked]] contract's term $n$ receives at least $G$, so the maturity benefit is $\max(G, F_n)$ for a fund $F_n$. The insurer pays $(G - F_n)^+$ to each survivor, which is a European put on the fund with strike $G$ and expiry $n$. The insurer's payoff at time $n$ is

> $$\text{Payoff at } n = \mathbb{1}\{T_x > n\}\,(G - F_n)^+$$

- $T_x$ is the future lifetime of the policyholder, aged $x$ at issue.

## Value at issue

If the premium $F_0$ is invested in an index fund and a management charge $m$ is deducted at the start of each year, the fund is a fixed number of units of the index, $F_0(1-m)^n/S_0$ of them by maturity for an index $S$. The guarantee is a [[Black-Scholes Model|Black-Scholes]] put on those units, paid only to survivors, so its value at issue is

> $$\pi(0) = {}_np_x\left[Ge^{-rn}N(-d_2) - F_0(1-m)^nN(-d_1)\right]$$

- $d_1 = [\ln(F_0(1-m)^n/G) + (r + \sigma^2/2)n]/(\sigma\sqrt{n})$ and $d_2 = d_1 - \sigma\sqrt{n}$.
- $r$ is the continuously compounded risk-free rate.
- $\sigma$ is the index's [[Volatility|volatility]].

Black-Scholes needs the continuously compounded rate, so an effective rate of $4\%$ is used as $r = \ln 1.04 = 0.03922$. If the charge were taken continuously at rate $m$, the fund would behave like a stock with dividend yield $m$, and the put would use $F_0e^{-mn}$ in place of $F_0(1-m)^n$. A policy that lapses before $n$ loses the guarantee. With lapses, ${}_np_x$ is replaced by the probability that the policy is still in force at $n$, which lowers the cost of the guarantee.

> [!example]- What is the value at issue of this 10-year GMMB? {Example}
> A single premium of $\$100{,}000$ from a life aged 60 is invested in an equity index fund, and a management charge of $1.5\%$ of the fund is deducted at the start of each year. A policyholder alive at the end of 10 years receives at least $\$100{,}000$. Use $r = 0.04$, $\sigma = 0.20$ and the Standard Ultimate Life Table, for which ${}_{10}p_{60} = 0.942549$.
>
> > [!answer]-
> > - The put is on $100{,}000(0.985)^{10} = 85{,}973.04$, with strike $100{,}000$ and expiry 10.
> > - $d_1 = (\ln 0.8597304 + 0.6)/(0.20\sqrt{10}) = 0.70972$ and $d_2 = 0.07726$.
> > - $N(-d_2) = 0.46921$, $N(-d_1) = 0.23894$ and $Ge^{-0.4} = 67{,}032.00$.
> > - The put is $31{,}451.97 - 20{,}542.42 = 10{,}909.55$.
> > - The guarantee is worth $\pi(0) = 0.942549(10{,}909.55) = 10{,}282.79$, about $10.3\%$ of the premium.

## Value after issue

At a later time $t$, the value of the guarantee per policy still in force, $\pi(t)$, is

> $$\begin{aligned} \pi(t) = {}_{n-t}p_{x+t}\big[ & Ge^{-r(n-t)}N(-d_2) \\ & - F_t(1-m)^{n-t}N(-d_1)\big] \end{aligned}$$

- $F_t$ is the fund at time $t$, before that year's charge.
- $d_1$ and $d_2$ use $F_t(1-m)^{n-t}$ in place of $F_0(1-m)^n$ and the remaining term $n - t$ in place of $n$.

> [!example]- After three years the fund in the example above is $\$75{,}000$, before the year-4 charge. What is the guarantee worth per policy in force? {Example}
> - The policyholder is now 63, and ${}_7p_{63} = 0.953399$.
> - Seven charges remain, so the put is on $75{,}000(0.985)^7 = 67{,}470.65$, with 7 years to run.
> - $d_1 = (\ln 0.6747065 + 0.42)/(0.20\sqrt{7}) = 0.05012$ and $d_2 = -0.47903$.
> - $N(-d_2) = 0.68404$, $N(-d_1) = 0.48001$ and $Ge^{-0.28} = 75{,}578.37$.
> - The put is $51{,}698.67 - 32{,}386.74 = 19{,}311.93$.
> - The guarantee is worth $\pi(3) = 0.953399(19{,}311.93) = 18{,}411.97$, up from $10{,}282.79$ at issue. A market-consistent reserve for it rises by the same amount, and so does the hedge the insurer holds.

## Guaranteed minimum accumulation benefit

A guaranteed minimum accumulation benefit (GMAB) applies the same guarantee at the end of each term of a contract that renews. If the fund is below the guarantee at a renewal date, the insurer tops it up, and the guarantee for the next term is reset, often to the fund value at renewal. Each term is valued like a GMMB, but the reset makes the strikes of later terms depend on the fund's path.

> [!trap] Writing the put on $F_0$ instead of $F_0(1-m)^n$
> The charges come out of the fund before maturity, so the put is on the fund net of all future charges. Leaving them out understates the cost, which falls from $\$10{,}282.79$ to $\$7{,}596.23$ in the first example.
