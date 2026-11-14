---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:787289658a462c595e95c11c6d213d2754b920fd9257d00056f7532f46860ba7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Guaranteed Minimum Withdrawal Benefit.md
---
A **Guaranteed Minimum Withdrawal Benefit** (GMWB) lets the holder of an [[Equity-Linked Insurance|equity-linked]] annuity withdraw a fixed percentage of a **benefit base** each year until the withdrawals add up to the base, even if the fund falls to zero. The withdrawals come out of the policyholder's own fund for as long as it lasts, and the insurer pays only the guaranteed withdrawals that remain after the fund is exhausted.

The fund just before the year-$t$ withdrawal, $\tilde F_t$, is

> $$\tilde F_t = F_{t-1}(1 - m)(1 + R_t)$$

- $F_{t-1}$ is the fund just after the previous withdrawal.
- $m$ is the management charge, taken at the start of the year.
- $R_t$ is the fund's return in year $t$.

After a guaranteed withdrawal $W$ at the end of the year, the fund is

> $$F_t = \left(\tilde F_t - W\right)^+$$

- $W = wB$, where $w$ is the withdrawal rate and $B$ is the benefit base, usually the premium.

The insurer pays the part of the withdrawal the fund cannot, so in year $t$ it pays

> $$\text{Insurer pays in year } t = \left(W - \tilde F_t\right)^+$$

Once the fund is exhausted it stays at zero, so the insurer pays each remaining withdrawal in full. A GMWB pays until the total withdrawn reaches $B$, which takes $B/W$ years, with a smaller final payment when that is not a whole number. The management charge is still taken from the fund each year, and it speeds up exhaustion.

> [!example]- When does the fund run out, and what is the present value of the insurer's payments? {Example}
> A single premium of $\$100{,}000$ is invested in an equity fund with a management charge of $1.5\%$ deducted at the start of each year. The fund earns $0\%$ before charges every year. A GMWB allows withdrawals of $7\%$ of the premium at the end of each year until $\$100{,}000$ has been withdrawn. Discount at $r = 0.04$, compounded continuously, and ignore mortality and lapses.
>
> > [!answer]-
> > - With no growth the fund is multiplied by $0.985$ each year before the withdrawal.
> > - After 12 withdrawals it is $100{,}000(0.985)^{12} - 7{,}000\sum_{j=0}^{11}(0.985)^j$.
> > - That is $83{,}413.20 - 77{,}405.08 = 6{,}008.12$.
> > - In year 13 the fund holds $6{,}008.12(0.985) = 5{,}917.99$, so the insurer pays the remaining $1{,}082.01$ of that year's withdrawal.
> > - The insurer then pays $7{,}000$ at time 14 and the final $2{,}000$ at time 15, which brings the total withdrawn to $14(7{,}000) + 2{,}000 = 100{,}000$.
> > - The present value is $1{,}082.01e^{-0.52} + 7{,}000e^{-0.56} + 2{,}000e^{-0.60}$.
> > - That is $643.28 + 3{,}998.46 + 1{,}097.62 = 5{,}739.36$.

## Guaranteed lifetime withdrawal benefit

A guaranteed lifetime withdrawal benefit (GLWB) continues the withdrawals for the rest of the policyholder's life. The insurer pays $W$ for every year the policyholder outlives the fund, so the GLWB's cost depends on longevity as well as on the market. The GMWB's guaranteed total does not depend on survival.

> [!example]- What is the present value of the insurer's payments under this GLWB? {Example}
> The fund in the example above is instead on a life aged 60, with a GLWB that allows $5\%$ of the premium a year for life. The fund still earns $0\%$ before charges, and $r = 0.04$. The Standard Ultimate Life Table gives ${}_{18}p_{60} = 0.827929$ and $\sum_{t \geq 19} e^{-0.04t}\,{}_tp_{60} = 3.540603$.
>
> > [!answer]-
> > - With $W = 5{,}000$, the fund after 17 withdrawals is $F_{17} = 1{,}815.73$.
> > - In year 18 the fund holds $1{,}788.50$, so the insurer pays $3{,}211.50$ at time 18 if the policyholder is alive.
> > - It then pays $5{,}000$ at the end of every later year while the policyholder is alive.
> > - The present value is $3{,}211.50e^{-0.72}(0.827929) + 5{,}000(3.540603)$.
> > - That is $1{,}294.22 + 17{,}703.01 = 18{,}997.23$.
> > - The lifetime guarantee costs more than three times as much as the GMWB although it pays less each year, because a 78-year-old can expect to live well beyond the point where the fund runs out.

## Valuation

Whether and when the fund runs out depends on the whole path of returns, not on the fund at one date. A fall early in the contract, when the fund is largest and withdrawals are drawing it down, does the most damage. The GMWB is therefore valued by simulating fund paths rather than by a [[Black-Scholes Model|Black-Scholes]] formula. The holder decides how much to withdraw and whether to lapse, so the cost also depends on assumptions about policyholder behaviour.

> [!trap] Counting withdrawals from the fund as the insurer's cost
> Until the fund is exhausted, each withdrawal is the policyholder's own money. Counting those withdrawals as the insurer's outgo overstates the cost many times over. In the year the fund runs out, the fund pays what it has and the insurer pays the rest.
