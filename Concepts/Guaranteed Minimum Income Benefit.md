---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a866c8fa842d8e2a88b38175aff07257b5b6c8a877d8c814cc2d0f89b764b5d5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Guaranteed Minimum Income Benefit.md
---
A **Guaranteed Minimum Income Benefit** (GMIB) gives the holder of a deferred [[Equity-Linked Insurance|equity-linked]] annuity the right, at an annuitization date $n$, to convert a guaranteed **benefit base** $B_n$ into a [[Life Annuity|life annuity]] at guaranteed annuity rates, instead of converting the fund at the rates on offer then. The guaranteed income a year is

> $$\text{Guaranteed income} = g\,B_n$$

- $g$ is the guaranteed annual income per unit of base, the reciprocal of the guaranteed annuity factor.

The benefit base is a notional amount, often the premium rolled up at a guaranteed rate or ratcheted to past fund highs. It cannot be taken as cash and only buys income on the guaranteed terms, which is why the guaranteed annuity rates are set conservatively, below the income the market would pay per unit.

The insurer pays the amount by which the market value of the guaranteed income exceeds the fund, so its payoff at time $n$ is

> $$\text{Payoff at } n = \left(g\,B_n\,\ddot{a}_{x+n} - F_n\right)^+$$

- $\ddot{a}_{x+n}$ is the market price at time $n$ of a life annuity-due of 1 a year to the policyholder, then aged $x + n$.
- $F_n$ is the fund at time $n$.

> [!example]- What does this GMIB cost the insurer at age 70 in each of three markets? {Example}
> A single premium of $\$100{,}000$ from a life aged 60 is invested in an equity fund with a management charge of $1.5\%$ a year. At age 70 the policyholder may convert a benefit base, equal to the premium rolled up at $4\%$ a year, into a life annuity-due at a guaranteed rate of 1 a year for every 16 of base. The three markets at age 70 are:
>
> | Market | Fund | $\ddot{a}_{70}$ |
> | --- | ---: | ---: |
> | (a) | $\$90{,}000$ | 12.0083 (SULT at 5%) |
> | (b) | $\$90{,}000$ | 14.1843 (SULT at 3%) |
> | (c) | $\$125{,}000$ | 12.0083 (SULT at 5%) |
>
> > [!answer]-
> > - The base is $B_{10} = 100{,}000(1.04)^{10} = 148{,}024.43$.
> > - The guaranteed income is $148{,}024.43/16 = 9{,}251.53$ a year for life.
> > - (a) The income is worth $9{,}251.53(12.0083) = 111{,}095.15$, and less the fund of $\$90{,}000$ the payoff is $21{,}095.15$.
> > - (b) The income is worth $9{,}251.53(14.1843) = 131{,}226.48$, so the payoff is $41{,}226.48$.
> > - (c) The fund of $\$125{,}000$ is worth more than the guaranteed income's $111{,}095.15$, so the payoff is 0. The fund buys $125{,}000/12.0083 = 10{,}409.47$ a year at market rates.
> > - The fall in interest rates in (b) nearly doubles the cost without any change in the fund.

## Guaranteed annuity option

When the base is the fund itself, $B_n = F_n$, the GMIB is a guaranteed annuity option, and its payoff is

> $$\text{Payoff at } n = F_n\left(g\,\ddot{a}_{x+n} - 1\right)^+$$

This payoff depends on interest rates and mortality alone.

## Sources of cost

The payoff grows when the fund falls, when interest rates fall, because $\ddot{a}_{x+n}$ then rises, and when annuitants are expected to live longer than the guaranteed rates allowed for. The GMIB is therefore an option on the fund, interest rates and [[Mortality|mortality]] at the annuitization date, and it is not valued by a single [[Black-Scholes Model|Black-Scholes]] put. An equity put hedges only the fall in the fund, so the insurer also carries interest rate and longevity risk.

The holder decides whether to annuitize and, when the contract allows a choice of dates, when to do so. The cost therefore depends on how many holders exercise the option when it is in the money, an assumption that can be wrong in either direction.

> [!trap] Comparing incomes instead of values
> The payoff is the market value of the guaranteed income less the fund. Subtracting the incomes, or comparing the base with the fund, misses the annuity factor and gives a cost in the wrong units. A rolled-up base of $\$148{,}024$ does not mean the insurer owes $\$148{,}024$.
