---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:41d1b7a210cde716b353132b09683766b0cdfa7e52de8c3dcb13908432e51372
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Guaranteed Minimum Withdrawal Benefit.md
---

A **guaranteed minimum withdrawal benefit** (GMWB) lets the holder of an [[Equity-Linked Insurance|equity-linked]] annuity withdraw a fixed percentage of a **benefit base** each year until the withdrawals add up to the base, even if the fund falls to zero. The withdrawals come out of the policyholder's own fund for as long as it lasts, and the insurer pays only the guaranteed withdrawals that remain after the fund is exhausted. A **guaranteed lifetime withdrawal benefit** (GLWB) continues the withdrawals for the rest of the policyholder's life.

> $$\tilde F_t = F_{t-1}(1 - m)(1 + R_t)$$

> $$F_t = \left(\tilde F_t - W\right)^+$$

> $$\text{Insurer pays in year } t = \left(W - \tilde F_t\right)^+$$

- **Symbols:** $W = wB$ is the guaranteed withdrawal at the end of each year, $w$ is the withdrawal rate and $B$ is the benefit base, usually the premium. $\tilde F_t$ is the fund just before the year-$t$ withdrawal, after the management charge $m$ taken at the start of the year and the fund's return $R_t$. Once the fund is exhausted it stays at zero, so the insurer pays each remaining withdrawal in full.
- **How long it pays:** A GMWB pays until the total withdrawn reaches $B$, which takes $B/W$ years, with a smaller final payment when that is not a whole number. A GLWB pays $W$ for as long as the policyholder lives, so the insurer pays $W$ for every year the policyholder outlives the fund.
- **Path dependence:** Whether and when the fund runs out depends on the whole path of returns, not on the fund at one date. A fall early in the contract, when the fund is largest and withdrawals are drawing it down, does the most damage, so the GMWB is valued by simulating fund paths rather than by a [[Black-Scholes Model|Black-Scholes]] formula.
- **Mortality and behaviour:** The GMWB's guaranteed total does not depend on survival, while the GLWB's cost depends on longevity as well as on the market. In both, the holder decides how much to withdraw and whether to lapse, so the cost also depends on assumptions about policyholder behaviour.

> [!example]- When the Fund Runs Out in a Flat Market {Example}
> A single premium of \$100,000 is invested in an equity fund with a management charge of $1.5\%$ deducted at the start of each year. The fund earns $0\%$ before charges every year. Discount at $r = 0.04$, compounded continuously.
>
> (a) A GMWB allows withdrawals of $7\%$ of the premium at the end of each year until \$100,000 has been withdrawn. Ignoring mortality and lapses, find when the fund runs out and the present value of the insurer's payments.
>
> (b) A GLWB on a life aged 60 instead allows $5\%$ a year for life. Find the present value of the insurer's payments, using the Standard Ultimate Life Table, for which ${}_{18}p_{60} = 0.827929$ and $\sum_{t \geq 19} e^{-0.04t}\,{}_tp_{60} = 3.540603$.
>
> > [!answer]-
> > With no growth the fund shrinks by the factor $0.985$ each year before the withdrawal, so after $k$ withdrawals it is an annuity calculation at $j = -1.5\%$.
> > $$
> > \begin{align*}
> > F_k &= 100{,}000(0.985)^k - W\,\frac{(0.985)^k - 1}{-0.015} \\
> > F_{12} &= 83{,}413.20 - 7{,}000(11.057869) \\
> > &= 83{,}413.20 - 77{,}405.08 \\
> > &= 6{,}008.12
> > \end{align*}
> > $$
> > **(a)** In year 13 the fund holds $6{,}008.12(0.985) = 5{,}917.99$, so the insurer pays the remaining $1{,}082.01$ of that year's withdrawal. It then pays $7{,}000$ at time 14 and the final $2{,}000$ at time 15, which brings the total withdrawn to $14(7{,}000) + 2{,}000 = 100{,}000$.
> > $$
> > \begin{align*}
> > PV &= 1{,}082.01e^{-0.52} + 7{,}000e^{-0.56} + 2{,}000e^{-0.60} \\
> > &= 643.28 + 3{,}998.46 + 1{,}097.62 \\
> > &= 5{,}739.36
> > \end{align*}
> > $$
> > **(b)** With $W = 5{,}000$, the same formula gives $F_{17} = 1{,}815.73$. In year 18 the fund holds $1{,}788.50$, so the insurer pays $3{,}211.50$ at time 18 and then $5{,}000$ at the end of every later year while the policyholder is alive.
> > $$
> > \begin{align*}
> > PV &= 3{,}211.50e^{-0.72}(0.827929) + 5{,}000(3.540603) \\
> > &= 1{,}294.22 + 17{,}703.01 \\
> > &= 18{,}997.23
> > \end{align*}
> > $$
> > The lifetime guarantee costs more than three times as much although it pays less each year, because a 78-year-old can expect to live well beyond the point where the fund runs out.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to "define and calculate payoffs" under a GMWB, which means projecting the fund with its charges and withdrawals along a given return path, finding the year it is exhausted and finding the insurer's payments, as in the example.
> - **Explanations:** ALTAM's valuation objective names only the GMDB and the GMMB, so GMWB questions centre on payoffs and on explanations, such as why the cost depends on the order of returns and how a lifetime version changes the risk.

> [!warning]- Exam traps
> - **Withdrawals from the fund are not a cost:** Until the fund is exhausted, each withdrawal is the policyholder's own money. Counting those withdrawals as the insurer's outgo overstates the cost many times over.
> - **The year the fund runs out:** In that year the fund pays what it has and the insurer pays the rest. Treating the whole withdrawal as the insurer's, or none of it, misstates the first payment.
> - **The last payment:** A GMWB stops once the total withdrawn equals the base, so a 7% withdrawal rate gives 14 full payments and a final \$2,000, not 15 full payments.
> - **Charges on a shrinking fund:** The management charge is still taken from the fund each year, and it speeds up exhaustion. Projecting the fund without it delays the year it runs out and understates the cost.
