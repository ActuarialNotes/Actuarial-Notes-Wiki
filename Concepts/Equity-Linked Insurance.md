---
aliases:
  - Options Embedded
  - Equity-Linked Life Insurance Guarantee
  - Equity-Linked Life Insurance Cash Flow
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d68fe40fa6a404da5930192eb5a1a624c7275495576e826eb40399d2c82545cf
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Equity-Linked Insurance.md
---
**Equity-Linked Insurance** is [[Life Insurance|life insurance]] or an [[Annuity Contract|annuity contract]] whose premiums, after charges, are invested in a fund of equities or other assets, so that the benefits rise and fall with the value of that fund. The [[Policyholder|policyholder]] bears the investment risk except where the contract adds a guarantee. Such contracts are sold as variable annuities in the United States, segregated fund contracts in Canada and unit-linked contracts in the United Kingdom.

The policyholder's fund at time $t$, before the charge for the next year is taken, is

> $$F_t = \left(F_{t-1} + a_tP_t\right)(1 - m)(1 + R_t)$$

- $P_t$ is the premium paid at the start of year $t$, of which the fraction $a_t$ is allocated to the fund.
- $m$ is the management charge, deducted from the fund at the start of each year.
- $R_t$ is the fund's return in year $t$.

The fund belongs to the policyholder and is paid out on death, surrender or maturity, so it is not the insurer's income. The insurer receives the unallocated premium $(1 - a_t)P_t$ and the charges. It pays the expenses and any amount by which a guaranteed benefit exceeds the fund. A charge taken at the end of the year is $m$ times the grown fund instead, which changes both the charge and the fund.

## Guarantees embedded in the contract

The guarantees are options embedded in the contract, which the [[Insurer|insurer]] must price, [[Reserve|reserve]] for and [[Hedging|hedge]].

| Guarantee | What it guarantees |
| --- | --- |
| [[Guaranteed Minimum Death Benefit]] (GMDB) | At least $G$ is paid on death |
| [[Guaranteed Minimum Maturity Benefit]] (GMMB) | The fund is topped up to $G$ at maturity |
| Guaranteed minimum accumulation benefit (GMAB) | The GMMB's guarantee, renewed at the end of each term |
| [[Guaranteed Minimum Income Benefit]] (GMIB) | A minimum annuity income |
| [[Guaranteed Minimum Withdrawal Benefit]] (GMWB) | A stream of withdrawals, even if the fund runs out |

Each pays $(G - F)^+$ in some form, so each is a put option on the fund, and [[Payoff]] works through their payoffs. The GMDB and the GMMB are valued with the [[Black-Scholes Model]] weighted by mortality, and they are hedged with a [[Replicating Portfolio|replicating portfolio]]. Under the risk-neutral measure the fund grows at the risk-free rate $r$ before charges, so the management charges have a market-consistent value too, and the insurer needs it to cover the guarantees.

> [!example]- What part of the management charge pays for the guarantees? {Example}
> A single premium of $\$100{,}000$ from a life aged 60 is fully allocated to an equity fund, with a charge of $1.5\%$ of the fund at the start of each year. The contract runs for 10 years and pays at least $\$100{,}000$ on death or at maturity. With $r = 0.04$ and $\sigma = 0.20$, the GMMB is worth $10{,}282.79$ and the GMDB $593.65$ at issue. You are also given $\sum_{t=0}^{9}{}_tp_{60}(0.985)^t = 9.16201$. Ignore lapses.
>
> > [!answer]-
> > - The charge taken at time $t$ is worth $0.015 \times 100{,}000(0.985)^t$ today, and it is collected only if the policy is still in force.
> > - The charges are worth $1{,}500 \times 9.16201 = 13{,}743.02$.
> > - The guarantees are worth $10{,}282.79 + 593.65 = 10{,}876.44$.
> > - Their share of the charges is $10{,}876.44 / 13{,}743.02 = 0.7914$.
> > - About $79\%$ of the charge, or $1.19\%$ of the fund a year, pays for the guarantees, which leaves about $0.31\%$ a year for expenses and profit.

## Profit testing

The whole contract is assessed by [[Profit Testing|profit testing]]. The fund is projected along an assumed return path, and the insurer's cash flows follow from it. For a death benefit of $\max(G_t, F_t)$ paid at the end of the year of death, the insurer's cash flow at the end of year $t$ per policy in force at the start of the year, $\text{Pr}_t$, is

> $$\begin{aligned} \text{Pr}_t = {} & \left[(1 - a_t)P_t + m\left(F_{t-1} + a_tP_t\right) - E_t\right](1 + i) \\ & - q_{x+t-1}\left(G_t - F_t\right)^+ \end{aligned}$$

- $E_t$ is the insurer's expense at the start of the year.
- $i$ is the rate the insurer earns on its own funds.
- $q_{x+t-1}$ is the probability of death in the year.
- $G_t$ is the guaranteed death benefit.

The insurer pays only the excess $(G_t - F_t)^+$ on death, because the fund is already the policyholder's. The $\text{Pr}_t$ form the [[Profit Vector|profit vector]], and ${}_{t-1}p_x\,\text{Pr}_t$ is the [[Profit Signature|profit signature]]. A single best-estimate path usually shows no guarantee cost, so stress paths or stochastic scenarios are needed to see the risk. In a falling market the charges fall with the fund.

> [!example]- What are the profit vector and the profit signature for the first three years of this stress test? {Example}
> A single premium of $\$100{,}000$ from a life aged 60 is fully allocated to an equity fund. A management charge of $1.5\%$ of the fund is deducted at the start of each year. The death benefit, paid at the end of the year of death, is the larger of the fund and the premium. The insurer's expenses are $\$1{,}000$ at issue and $\$100$ at the start of each later year, and its own funds earn $5\%$. In the stress test the fund earns $-24\%$, $+6\%$ and $+4\%$ in the first three years. The Standard Ultimate Life Table gives:
>
> | $t$ | $q_{59+t}$ |
> | ---: | ---: |
> | 1 | 0.003398 |
> | 2 | 0.003792 |
> | 3 | 0.004234 |
>
> > [!answer]-
> > - The fund is $F_1 = 100{,}000(0.985)(0.76) = 74{,}860.00$, then $F_2 = 78{,}161.33$ and $F_3 = 80{,}068.46$.
> > - The charges are $1{,}500.00$, then $0.015(74{,}860.00) = 1{,}122.90$ and $0.015(78{,}161.33) = 1{,}172.42$.
> > - In year 1 the charge less the expense, with interest, is $(1{,}500 - 1{,}000)(1.05) = 525.00$. The death benefit cost is $0.003398(25{,}140.00) = 85.43$, so $\text{Pr}_1 = 439.57$.
> > - In year 2 they are $(1{,}122.90 - 100)(1.05) = 1{,}074.05$ and $0.003792(21{,}838.67) = 82.81$, so $\text{Pr}_2 = 991.24$.
> > - In year 3 they are $(1{,}172.42 - 100)(1.05) = 1{,}126.04$ and $0.004234(19{,}931.54) = 84.39$, so $\text{Pr}_3 = 1{,}041.65$.
> > - With ${}_1p_{60} = 0.996602$ and ${}_2p_{60} = 0.992823$, the profit signature is $439.57$, $987.87$ and $1{,}034.17$.
> > - The fall cuts the charge income by about a quarter in the years after it and creates a death benefit cost.

> [!trap] Counting the fund as the insurer's income
> The policyholder's fund and its investment return are not the insurer's. Only the unallocated premium, the charges, the expenses and the guarantee top-ups belong in $\text{Pr}_t$. Counting the fund overstates profit enormously, and charging the whole death benefit $\max(G_t, F_t)$ double counts the fund the policyholder already owns.
