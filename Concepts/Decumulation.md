---
aliases:
  - Decumulation Feature
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:78362fdad09e96e7c0698d438507cc65ed5d529a99e4d1b3ab49063b790b96fd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Decumulation.md
---

**Decumulation** is the phase in which a retiree turns accumulated savings, typically a [[Defined Contribution Plan|defined contribution]] account, into retirement income. A decumulation feature is an option a plan offers for doing so, such as buying a [[Life Annuity|life annuity]], systematic withdrawals, a guaranteed lifetime withdrawal benefit, or a pooled or variable annuity.

Each option trades income level, flexibility and money left at death against protection from [[Longevity Risk|longevity]], investment and [[Inflation|inflation]] risk. The sponsor who offers one takes on fiduciary and operational risk of its own.

## Annuity purchase

A life annuity converts the account into a guaranteed income and removes longevity and investment risk. With an account of $F_0$ at retirement at age $x$, the annual lifetime income it buys is

> $$B = \frac{F_0}{\ddot{a}_x}$$

- $\ddot{a}_x$ is the annuity-due factor at age $x$ on the insurer's pricing basis.

The purchase is irreversible, leaves nothing on death without a guarantee period, and locks in the interest rates at the date of purchase. An in-plan annuity uses the plan's group pricing and the sponsor's choice of insurer, while an out-of-plan purchase leaves the member to shop the retail market.

> [!example]- What level annuity does $\$500{,}000$ buy at 65, on the SULT at 5% with $\ddot{a}_{65} = 13.5498$? {Example}
> - The annual income is $B = 500{,}000/13.5498 = \$36{,}901$, paid for life.
> - After 20 years of 2.5% inflation, its purchasing power falls to $36{,}901/1.025^{20} = \$22{,}520$ in today's money.

The annuity pays more than a withdrawal plan's first-year income because it gives up the balance on death and pools mortality. Comparing the incomes alone, without the bequest and the inflation protection, misjudges the trade-off.

## Systematic withdrawals

The member keeps the account invested and withdraws a fixed amount, a fixed percentage or the regulatory minimum. This keeps flexibility and the balance on death, but leaves the member with longevity, sequence-of-returns and spending risk. A fixed-percentage rule protects the fund by letting the income fall.

With $F_t$ the account at the start of year $t$, $W_t$ the withdrawal taken then and $r_t$ the return earned, the account at the start of the next year is

> $$F_{t+1} = \left(F_t - W_t\right)(1 + r_t)$$

Under an inflation-adjusted withdrawal rule, the withdrawal in year $t$ is

> $$W_t = w\,F_0\,(1 + \pi)^t$$

- $w$ is the initial withdrawal rate, 4% in the familiar rule of thumb.
- $\pi$ is the inflation rate.

> [!example]- At what age can this retiree's withdrawals no longer be paid in full? {Example}
> A member retires at 65 with $\$500{,}000$. She withdraws $\$20{,}000$ at the start of the first year, rising 2.5% a year with inflation, and the account earns 4% a year.
>
> > [!answer]-
> > - The withdrawal in year $t$ is $W_t = 20{,}000 \times 1.025^t$, and the account rolls forward as $F_{t+1} = (F_t - W_t)(1.04)$.
> > - Projected year by year, the account pays 30 full withdrawals, at ages 65 to 94.
> > - At 95 the withdrawal due is $\$41{,}951$ but only $\$32{,}815$ remains, so income falls short at 95.
> > - On the SULT, ${}_{30}p_{65} = 0.224$, so about one retiree in five lives to see it.
> > - At a 3% return the account fails at 91, with a 40% chance of being alive then, and at 5% it lasts to 102.

> [!trap] Crediting interest before a start-of-year withdrawal
> If withdrawals come out at the start of the year, interest is earned only on what is left. Crediting a full year's interest before the withdrawal makes the fund last longer than it does.

## Minimum withdrawals

A Canadian RRIF sets a minimum withdrawal each year. For an annuitant aged $x_t$ under 71 it is

> $$W_t^{\min} = \frac{F_t}{90 - x_t}$$

Beyond 71 a prescribed table of rising percentages applies. Because each year's minimum is a fraction of the remaining balance, the minimums alone never exhaust the account. The income they produce falls after poor returns or a long life, and the rising percentage draws the account down hardest at the oldest ages. A RRIF or required minimum distribution sets the slowest pace at which tax-deferred money may come out, and it is not designed to produce a stable lifetime income.

> [!example]- What is the RRIF minimum for a retiree aged 65 with $\$500{,}000$ at the start of the year? {Example}
> - The minimum is $500{,}000/(90 - 65) = \$20{,}000$, or 4% of the account.

## Guaranteed lifetime withdrawal benefit

A [[Guaranteed Minimum Withdrawal Benefit|GLWB]] lets the member withdraw a percentage of a benefit base for life while the account stays invested and accessible. The insurer pays once the account runs out, and the member pays an annual fee for that guarantee.

## Pooled and variable annuities

A variable or pooled lifetime income pays a pension from a shared fund and adjusts it each year for the fund's investment and mortality experience. It pools longevity risk at low cost while leaving investment risk with the members, much like the variable annuity plans among [[Hybrid Plan|hybrid plans]].

## Combining options

Many designs blend a partial annuity for a floor of essential spending with withdrawals from the rest for flexibility. A deferred annuity bought at retirement and starting at 80 or 85 caps the horizon a withdrawal plan must cover.

## Sponsor considerations

A sponsor that offers a decumulation feature must choose and monitor the insurer or fund, set the default, keep fees reasonable and communicate the risks. Its exposures are fiduciary liability for a poor choice, insurer default, and member complaints when a non-guaranteed income falls. Offering an in-plan annuity moves part of the member's risk to the insurer, but it adds the fiduciary risk of choosing and monitoring that insurer.
