---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a308736da33a54940d9b880176140b75ba82ec9fee9181da07d864bf8f4ff273
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Guaranteed Minimum Income Benefit.md
---

A **guaranteed minimum income benefit** (GMIB) gives the holder of a deferred [[Equity-Linked Insurance|equity-linked]] annuity the right, at an annuitization date, to convert a guaranteed **benefit base** into a [[Life Annuity|life annuity]] at guaranteed annuity rates, instead of converting the fund at the rates on offer then. The insurer pays the amount by which the market value of the guaranteed income exceeds the fund. That market value depends on interest rates and [[Mortality|mortality]] at the annuitization date as well as on the fund, so the GMIB is an option on all three and is not valued by a single [[Black-Scholes Model|Black-Scholes]] put.

> $$\text{Guaranteed income} = g\,B_n$$

> $$\text{Payoff at } n = \left(g\,B_n\,\ddot{a}_{x+n} - F_n\right)^+$$

> $$\text{Payoff if } B_n = F_n:\ F_n\left(g\,\ddot{a}_{x+n} - 1\right)^+$$

- **Symbols:** $B_n$ is the benefit base at the annuitization time $n$, and $g$ is the guaranteed annual income per unit of base, the reciprocal of the guaranteed annuity factor. $\ddot{a}_{x+n}$ is the market price at time $n$ of a life annuity-due of 1 a year to the policyholder, then aged $x + n$, and $F_n$ is the fund. The last block is the case where the base is the fund itself, a guaranteed annuity option, whose payoff depends on interest rates and mortality alone.
- **The benefit base:** The base is a notional amount, often the premium rolled up at a guaranteed rate or ratcheted to past fund highs. It cannot be taken as cash and only buys income on the guaranteed terms, which is why the guaranteed annuity rates are set conservatively, below the income the market would pay per unit.
- **Three sources of cost:** The payoff grows when the fund falls, when interest rates fall, because $\ddot{a}_{x+n}$ then rises, and when annuitants are expected to live longer than the guaranteed rates allowed for. An equity put hedges only the first of these, so the insurer also carries interest rate and longevity risk.
- **Policyholder choice:** The holder decides whether to annuitize and, when the contract allows a choice of dates, when to do so. The cost therefore depends on how many holders exercise the option when it is in the money, an assumption that can be wrong in either direction.

> [!example]- GMIB Payoff in Three Markets {Example}
> A single premium of \$100,000 from a life aged 60 is invested in an equity fund with a management charge of $1.5\%$ a year. At age 70 the policyholder may convert a benefit base, equal to the premium rolled up at $4\%$ a year, into a life annuity-due at a guaranteed rate of 1 a year for every 16 of base. At age 70 the market price of a life annuity-due is $\ddot{a}_{70} = 12.0083$ (SULT at 5%). Find the insurer's cost at age 70 if (a) the fund is \$90,000, (b) the fund is \$90,000 and interest rates have fallen so that $\ddot{a}_{70} = 14.1843$ (SULT mortality at 3%), or (c) the fund is \$125,000 and $\ddot{a}_{70} = 12.0083$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > B_{10} &= 100{,}000(1.04)^{10} \\
> > &= 148{,}024.43 \\
> > gB_{10} &= \frac{148{,}024.43}{16} \\
> > &= 9{,}251.53
> > \end{align*}
> > $$
> > The guaranteed income is \$9,251.53 a year for life.
> >
> > **(a)**
> > $$
> > \begin{align*}
> > \text{Value of income} &= 9{,}251.53(12.0083) \\
> > &= 111{,}095.15 \\
> > \text{Payoff} &= 111{,}095.15 - 90{,}000 \\
> > &= 21{,}095.15
> > \end{align*}
> > $$
> > **(b)**
> > $$
> > \begin{align*}
> > \text{Value of income} &= 9{,}251.53(14.1843) \\
> > &= 131{,}226.48 \\
> > \text{Payoff} &= 131{,}226.48 - 90{,}000 \\
> > &= 41{,}226.48
> > \end{align*}
> > $$
> > **(c)** The fund of \$125,000 is worth more than the guaranteed income, valued at \$111,095.15 in (a), so the payoff is 0. Taking the fund buys $125{,}000/12.0083 = 10{,}409.47$ a year at market rates, more than the guaranteed \$9,251.53.
> >
> > The fall in interest rates nearly doubles the cost in (b) without any change in the fund. That is the risk an equity hedge does not cover.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to "define and calculate payoffs" under a GMIB, which means using the benefit base's roll-up or ratchet, the guaranteed annuity rate and the market annuity factor to find the guaranteed income and the insurer's cost at annuitization, as in the example.
> - **Comparisons:** ALTAM's valuation objective names only the GMDB and the GMMB, so GMIB questions centre on payoffs and on explanations, such as why the GMIB is harder to hedge than the [[Guaranteed Minimum Maturity Benefit|GMMB]] and which market and mortality changes raise its cost.

> [!warning]- Exam traps
> - **Compare values, not incomes:** The payoff is the market value of the guaranteed income less the fund. Subtracting the incomes, or comparing the base with the fund, misses the annuity factor and gives a cost in the wrong units.
> - **The base is not cash:** A rolled-up base of \$148,024 does not mean the insurer owes \$148,024. It owes only the amount needed to provide the guaranteed income, beyond what the fund pays for.
> - **Direction of the annuity factor:** A higher guaranteed annuity factor means less income per unit of base, while a higher market factor, from lower interest rates or longer lives, means a larger payoff. Mixing up the two factors reverses the conclusion.
> - **Pricing it as an equity put:** A Black-Scholes put on the fund with strike $gB_n\ddot{a}_{x+n}$ treats the annuity factor as fixed. It ignores the interest rate and longevity parts of the cost, which part (b) of the example shows can be as large as the equity part.
