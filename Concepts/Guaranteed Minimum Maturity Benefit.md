---
aliases:
  - Guaranteed Minimum Accumulation-maturity Benefit
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a089bb47dd2a51ebfaf1816b90342037a1bf6c1a975dac39bd75c53e2812bfd6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Guaranteed Minimum Maturity Benefit.md
---
A **guaranteed minimum maturity benefit** (GMMB) guarantees that a policyholder who is alive at the end of an [[Equity-Linked Insurance|equity-linked]] contract's term $n$ receives at least $G$, so the maturity benefit is $\max(G, F_n)$. The insurer pays $(G - F_n)^+$ to each survivor, which is a European put on the fund with strike $G$ and expiry $n$. Its value at issue is the survival probability ${}_np_x$ times a [[Black-Scholes Model|Black-Scholes]] put on the fund net of all future charges.

> $$\text{Payoff at } n = \mathbb{1}\{T_x > n\}\,(G - F_n)^+$$

> $$\pi(0) = {}_np_x\left[Ge^{-rn}N(-d_2) - F_0(1-m)^nN(-d_1)\right]$$

> $$d_1 = \frac{\ln\!\left(F_0(1-m)^n/G\right) + \left(r + \tfrac12\sigma^2\right)n}{\sigma\sqrt{n}}$$

> $$\begin{aligned} \pi(t) = {}_{n-t}p_{x+t}\big[ & Ge^{-r(n-t)}N(-d_2) \\ & - F_t(1-m)^{n-t}N(-d_1)\big] \end{aligned}$$

- **Symbols:** $T_x$ is the policyholder's future lifetime, $F_0$ is the premium invested and $m$ is the management charge deducted at the start of each year, so $F_n = F_0(1-m)^nS_n/S_0$ for an index $S$. $r$ is the continuously compounded risk-free rate, $\sigma$ is the index's [[Volatility|volatility]] and $d_2 = d_1 - \sigma\sqrt{n}$. At a later time $t$, $\pi(t)$ is the value per policy still in force, $F_t$ is the fund before that year's charge, and $d_1$ and $d_2$ use $F_t(1-m)^{n-t}$ and the remaining term $n - t$.
- **Why it is a put:** The fund is a fixed number of units of the index, $F_0(1-m)^n/S_0$ of them by maturity, so the guarantee is a put on those units with strike $G$. If the charge were taken continuously at rate $m$, the fund would behave like a stock with dividend yield $m$, and the put would use $F_0e^{-mn}$ in place of $F_0(1-m)^n$.
- **The GMAB:** A guaranteed minimum accumulation benefit applies the same guarantee at the end of each term of a contract that renews. If the fund is below the guarantee at a renewal date, the insurer tops it up, and the guarantee for the next term is reset, often to the fund value at renewal. Each term is valued like a GMMB, but the reset makes the strikes of later terms depend on the fund's path.
- **Lapses:** A policy that lapses before $n$ loses the guarantee. With lapses, ${}_np_x$ is replaced by the probability that the policy is still in force at $n$, which lowers the cost of the guarantee.

> [!example]- Value of a 10-Year GMMB at Issue {Example}
> A single premium of \$100,000 from a life aged 60 is invested in an equity index fund, and a management charge of $1.5\%$ of the fund is deducted at the start of each year. A policyholder alive at the end of 10 years receives at least \$100,000. Use $r = 0.04$, $\sigma = 0.20$ and the Standard Ultimate Life Table, for which ${}_{10}p_{60} = 0.942549$. Find the value of the guarantee at issue.
>
> > [!answer]-
> > The put is on $100{,}000(0.985)^{10} = 85{,}973.04$, with strike $100{,}000$ and expiry 10.
> > $$
> > \begin{align*}
> > d_1 &= \frac{\ln(0.8597304) + 0.06(10)}{0.20\sqrt{10}} \\
> > &= \frac{-0.15114 + 0.6}{0.63246} \\
> > &= 0.70972
> > \end{align*}
> > $$
> > So $d_2 = 0.07726$, $N(-d_2) = 0.46921$, $N(-d_1) = 0.23894$ and $Ge^{-0.4} = 67{,}032.00$.
> > $$
> > \begin{align*}
> > P &= 67{,}032.00\,N(-d_2) - 85{,}973.04\,N(-d_1) \\
> > &= 31{,}451.97 - 20{,}542.42 \\
> > &= 10{,}909.55 \\
> > \pi(0) &= 0.942549(10{,}909.55) \\
> > &= 10{,}282.79
> > \end{align*}
> > $$
> > The guarantee is worth about $10.3\%$ of the premium. The insurer has to fund it from the charges, and on this contract it takes most of the $1.5\%$ charge (see [[Equity-Linked Insurance]]).

> [!example]- Value of the Guarantee After a Market Fall {Example}
> Three years after issue, the policyholder in the first example is alive at 63, and the fund has fallen to $F_3 = 75{,}000$ before the charge for year 4 is taken. Given ${}_7p_{63} = 0.953399$, find the value of the guarantee per policy in force.
>
> > [!answer]-
> > Seven charges remain, so the put is on $75{,}000(0.985)^7 = 67{,}470.65$, with 7 years to run.
> > $$
> > \begin{align*}
> > d_1 &= \frac{\ln(0.6747065) + 0.06(7)}{0.20\sqrt{7}} \\
> > &= \frac{-0.39348 + 0.42}{0.52915} \\
> > &= 0.05012
> > \end{align*}
> > $$
> > So $d_2 = -0.47903$, $N(-d_2) = 0.68404$, $N(-d_1) = 0.48001$ and $Ge^{-0.28} = 75{,}578.37$.
> > $$
> > \begin{align*}
> > P &= 75{,}578.37\,N(-d_2) - 67{,}470.65\,N(-d_1) \\
> > &= 51{,}698.67 - 32{,}386.74 \\
> > &= 19{,}311.93 \\
> > \pi(3) &= 0.953399(19{,}311.93) \\
> > &= 18{,}411.97
> > \end{align*}
> > $$
> > The fall has raised the guarantee's value from \$10,283 to \$18,412 per policy. A market-consistent reserve for the guarantee rises by the same amount, and so does the hedge the insurer has to hold.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to "define and calculate payoffs" under a GMMB, given a fund path with its charges, and then to value the "guaranteed minimum accumulation/maturity benefit using the Black-Scholes model" at issue or at a later date.
> - **Reserving and hedging:** The section's aim is to "price, reserve, and hedge" these options, so a question can follow the valuation with the value at a later date, as in the second example, or with the [[Replicating Portfolio|replicating portfolio]] and its rebalancing cost.
> - **Profit testing:** In a deterministic [[Profit Testing|profit test]] the GMMB appears as the top-up $(G - F_n)^+$ paid to survivors in the final year's cash flow under the stated fund path.

> [!warning]- Exam traps
> - **The survival weight:** The value is the market price of the put times ${}_np_x$, because only survivors are paid. Leaving out the survival probability overstates the cost, and using a death probability values a GMDB instead.
> - **The charges:** The put is written on $F_0(1-m)^n$, not on $F_0$. Leaving out the charges understates the cost, which falls from \$10,282.79 to \$7,596.23 in the first example.
> - **The rate basis:** Black-Scholes needs the continuously compounded rate. Given an effective rate of $4\%$, use $r = \ln 1.04 = 0.03922$ rather than $0.04$.
> - **A later valuation:** At time $t$, use the remaining term $n - t$, the survival probability ${}_{n-t}p_{x+t}$ from the policyholder's current age, and the fund net of the charges still to come.
