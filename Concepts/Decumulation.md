---
aliases:
  - Decumulation Feature
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e8a43d46c83e39c5a6701b3a81d41d3ec680a7b6b23f16767ee11a70e2f51859
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Decumulation.md
---
**Decumulation** is the phase in which a retiree turns accumulated savings, typically a [[Defined Contribution Plan|defined contribution]] account, into retirement income. A **decumulation feature** is an option a plan offers for doing so, such as buying a [[Life Annuity|life annuity]] inside or outside the plan, systematic withdrawals, a guaranteed lifetime withdrawal benefit, or a pooled or variable annuity. Each option trades income level, flexibility and money left at death against protection from [[Longevity Risk|longevity]], investment and [[Inflation|inflation]] risk, and the sponsor who offers one takes on fiduciary and operational risk of its own.

> $$B = \frac{F_0}{\ddot{a}_x}$$

> $$F_{t+1} = \left(F_t - W_t\right)(1 + r_t)$$

> $$W_t = w\,F_0\,(1 + \pi)^t$$

> $$W_t^{\min} = \frac{F_t}{90 - x_t}$$

- **Symbols:** $F_0$ is the account at retirement and $\ddot{a}_x$ the annuity-due factor at age $x$, so $B$ is the annual lifetime income an annuity purchase buys. $F_t$ is the account at the start of year $t$, $W_t$ the withdrawal taken then and $r_t$ the return earned. Under an inflation-adjusted withdrawal rule, $w$ is the initial rate (4% in the familiar rule of thumb) and $\pi$ the inflation rate. $W_t^{\min}$ is the Canadian RRIF minimum for an annuitant aged $x_t$ under 71, beyond which a prescribed table of rising percentages applies.
- **Annuity purchase:** A life annuity converts the account into a guaranteed income and removes longevity and investment risk, but it is irreversible, leaves nothing on death without a guarantee period, and locks in the interest rates at the date of purchase. An in-plan annuity uses the plan's group pricing and the sponsor's choice of insurer, while an out-of-plan purchase leaves the member to shop the retail market.
- **Systematic withdrawals:** The member keeps the account invested and withdraws a fixed amount, a fixed percentage or the regulatory minimum. This keeps flexibility and the balance on death but leaves the member with longevity, sequence-of-returns and spending risk, and a fixed-percentage rule protects the fund by letting the income fall.
- **Guaranteed lifetime withdrawal benefit:** A [[Guaranteed Minimum Withdrawal Benefit|GLWB]] lets the member withdraw a percentage of a benefit base for life while the account stays invested and accessible. The insurer pays once the account runs out, and the member pays an annual fee for that guarantee.
- **Pooled and variable annuities:** A variable or pooled lifetime income pays a pension from a shared fund and adjusts it each year for the fund's investment and mortality experience. It pools longevity risk at low cost while leaving investment risk with the members, much like the variable annuity plans among [[Hybrid Plan|hybrid plans]].
- **Combining options:** Many designs blend a partial annuity for a floor of essential spending with withdrawals from the rest for flexibility. A deferred annuity bought at retirement and starting at 80 or 85 caps the horizon a withdrawal plan must cover.
- **Sponsor considerations:** A sponsor that offers a decumulation feature must choose and monitor the insurer or fund, set the default, keep fees reasonable and communicate the risks. Its exposures are fiduciary liability for a poor choice, insurer default, and member complaints when a non-guaranteed income falls, and it weighs those against the members' need for retirement income.

> [!example]- An Annuity Versus a 4% Inflation-Adjusted Withdrawal {Example}
> A member retires at 65 with \$500,000. Option 1 buys a level life annuity priced at 5% on the Standard Ultimate Life Table of Dickson, Hardy & Waters, for which $\ddot{a}_{65} = 13.5498$. Option 2 withdraws \$20,000 at the start of the first year, rising 2.5% a year with inflation, and the account earns 4% a year. Find the annuity income, and the age at which the withdrawals can no longer be paid in full.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > B &= \frac{500{,}000}{13.5498} \\
> > &= 36{,}901
> > \end{align*}
> > $$
> > The annuity pays \$36,901 a year for life, 85% more than the first withdrawal. Projecting option 2 year by year with $F_{t+1} = (F_t - W_t)(1.04)$ and $W_t = 20{,}000 \times 1.025^t$, the account pays 30 full withdrawals, at ages 65 to 94. At 95 the withdrawal due is \$41,951 but only \$32,815 remains, so income falls short at 95. Under the same table ${}_{30}p_{65} = 0.224$, so about one retiree in five lives to see it. At a 3% return the account fails at 91, with a 40% chance of being alive then, and at 5% it lasts to 102. The withdrawal plan keeps the money accessible and keeps pace with prices, while the level annuity's purchasing power falls to \$22,520 in today's money after 20 years at 2.5% inflation.

> [!example]- The RRIF Minimum at 65 {Example}
> A Canadian retiree holds a RRIF worth \$500,000 at the start of a year in which she is 65, and takes only the minimum withdrawal. Find that year's minimum and explain how the rule manages, and fails to manage, longevity risk.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > W^{\min} &= \frac{500{,}000}{90 - 65} \\
> > &= 20{,}000
> > \end{align*}
> > $$
> > The minimum is \$20,000, or 4%. Because each year's minimum is a fraction of the remaining balance, the account can never be exhausted by the minimums alone, so the rule protects the fund. It does so by letting the income fall: after poor returns or a long life, the withdrawals shrink, and the minimum percentage rises with age, so the account is drawn down hardest at the oldest ages. The rule controls how slowly tax-deferred money comes out, and it is not designed to produce a stable lifetime income.

> [!tip]- How it appears on the exam
> - **RET-101 (3b):** Candidates assess the risk to the sponsor of offering decumulation features, such as in-plan annuities, guaranteed withdrawals or pooled income, and describe ways to mitigate it, using the SOA's 2013 guide for DC sponsors and the SOA's 2023 retirement income primer.
> - **RET-101 (2a, 2d):** Questions ask which retirement risks each decumulation option leaves with the member and how plan design, such as a default option or a partial annuity, can manage them.
> - **RET-101 (4):** A design recommendation may ask for a retirement income program for a DC plan, weighing the members' needs against the sponsor's fiduciary exposure.
> - **Calculations:** Short calculations convert an account into an annuity income, project a withdrawal plan to the age it runs out, or apply a minimum withdrawal rule.

> [!warning]- Exam traps
> - **Higher income is not more value:** The annuity's \$36,901 exceeds the \$20,000 withdrawal because it gives up the balance on death and pools mortality. Comparing the incomes alone, without the bequest and the inflation protection, misjudges the trade-off.
> - **Start-of-year withdrawals:** If withdrawals come out at the start of the year, interest is earned only on what is left. Crediting a full year's interest before the withdrawal makes the fund last longer than it does.
> - **A minimum is not a plan:** A RRIF or required minimum distribution sets the slowest pace allowed. It never exhausts the account, but the income it produces can fall below the retiree's needs.
> - **The sponsor's risk:** Offering an in-plan annuity moves part of the member's risk to the insurer, but it adds a fiduciary risk for the sponsor in choosing and monitoring that insurer. An answer that treats the feature as cost-free to the sponsor misses that risk.
