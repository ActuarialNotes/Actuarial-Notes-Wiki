---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3ead765e74135d8717a36792befe0f6f2d299b499ac373ffad69b84a982d9138
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Retirement Risk.md
---

**Retirement Risk** is the set of risks that can leave a worker or [[Retiree|retiree]] without enough income to maintain their standard of living for as long as they live. The main ones are outliving one's savings, [[Inflation|inflation]], poor investment returns, the price of turning savings into income, health and long-term care costs, the death of a spouse, cognitive decline, the failure of an employer or plan, and the retiree's own decisions. Each type of [[Retirement Plan|retirement plan]] leaves each risk with a different party, and the design question is who should carry which.

> $$W\,\ddot{a}_{\overline{N}|} = F_0$$

> $$\Pr(\text{ruin}) = {}_{N}p_x$$

> $$\frac{B_t^{\text{real}}}{B} = (1 + \pi)^{-t}$$

> $$B = \frac{F}{\ddot{a}_x}$$

- **Symbols:** $F_0$ is the savings at retirement, $W$ a level withdrawal at the start of each year and $N$ the number of full withdrawals the fund supports at return $i$. ${}_Np_x$ is the probability that a retiree aged $x$ survives $N$ years, so it is the chance of outliving the fund. $\pi$ is the inflation rate and $B$ a level pension, so $B_t^{\text{real}}$ is that pension in today's money after $t$ years. $\ddot{a}_x$ is the annuity factor that converts a fund $F$ into a lifetime income at the rates of the day.
- **Longevity:** [[Longevity Risk|Longevity risk]] for an individual is the chance of living far beyond the average, which a retiree cannot diversify alone. Pooling in a [[Life Annuity|life annuity]] or a DB plan removes it, because the plan needs only to be right about the group.
- **Inflation:** A level pension loses purchasing power steadily, and the loss compounds over a retirement that can last 30 years. Indexing, full or partial, moves the risk to the plan, as do benefits tied to prices in social insurance.
- **Investment and annuity price:** Before retirement, poor returns shrink the fund. At retirement, low interest rates raise the price of an annuity, and the order of returns matters most just after withdrawals begin, which is sequence-of-returns risk. A [[Defined Benefit Plan|DB plan]] leaves all three with the sponsor, and a [[Defined Contribution Plan|DC plan]] leaves them with the member.
- **Health, care and family:** Health care costs not covered by public plans, the cost of [[Long-Term Care Insurance|long-term care]] and the loss of a spouse's income are shocks rather than trends. A joint and survivor [[Optional Form of Payment|form of payment]] protects the surviving spouse, and retiree health benefits or insurance cover part of the rest.
- **Cognitive decline and behaviour:** Ability to manage money declines with age, which raises the risk of poor choices and fraud late in life. Earlier, workers under-save, claim social benefits early and spend lump sums quickly. [[Behavioral Finance|Behavioural finance]] explains these patterns through [[Cognitive Bias|biases]] such as present bias and inertia, and defaults such as auto-enrolment and annuitization use the same biases to help.
- **Employer and plan default:** A member's benefits in an underfunded plan depend on the sponsor's survival, and supplementary benefits are usually unsecured. Guarantee funds, funding rules and [[Pension Risk Transfer|buyouts]] reduce the risk but do not remove it.
- **Who carries each risk:** A traditional DB plan with indexing carries longevity, investment, interest and inflation risk for the member, and keeps only default risk with the member. A DC plan carries none of them unless the member buys an annuity. Hybrid and target benefit plans sit between, sharing risks between the sponsor and the members or among the members.

> [!example]- Outliving a Level Drawdown {Example}
> A 65-year-old retires with savings of \$1 and withdraws 5% of that starting amount, \$0.05, at the start of each year, with no inflation adjustment. The fund earns 3% a year. Mortality follows the Standard Ultimate Life Table of Dickson, Hardy & Waters (Makeham with $A = 0.00022$, $B = 2.7 \times 10^{-6}$, $c = 1.124$), under which ${}_{29}p_{65} = 0.2653$. How many full withdrawals can the fund pay, and what is the probability that the retiree outlives it?
>
> > [!answer]-
> > The fund supports the withdrawals while their present value is no more than the fund. Setting $0.05\,\ddot{a}_{\overline{N}|} = 1$ with $d = 0.03/1.03$:
> > $$
> > \begin{align*}
> > 1 - v^{N} &= 20\,d \\
> > &= 0.5825 \\
> > N &= \frac{\ln(1/0.4175)}{\ln 1.03} \\
> > &= 29.55
> > \end{align*}
> > $$
> > The fund pays 29 full withdrawals, at ages 65 through 93, and the one due at 94 is short. The retiree outlives the fund if alive at 94, which has probability ${}_{29}p_{65} = 0.265$, about one chance in four. At a 4% return the fund pays 37 withdrawals and the probability falls to ${}_{37}p_{65} = 0.032$. A life annuity bought with the same fund would remove the risk entirely, at the price of giving up the fund on death.

> [!example]- Inflation Erosion of a Level Pension {Example}
> A retiree's pension is a level \$30,000 a year with no indexing. Find its purchasing power after 20 years if inflation runs at 2.5% a year, and at 3%.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > B^{\text{real}}_{20} &= 30{,}000 \times 1.025^{-20} \\
> > &= 30{,}000 \times 0.6103 \\
> > &= 18{,}308 \\
> > B^{\text{real}}_{20} &= 30{,}000 \times 1.03^{-20} \\
> > &= 16{,}610
> > \end{align*}
> > $$
> > At 2.5% inflation the pension loses 39% of its value by age 85, and at 3% it loses 45%. Under the life table above, a 65-year-old has a 65% chance of reaching 85, so the loss is likely to be lived through. This is why plan design treats indexing as protection against a risk, not as a luxury.

> [!tip]- How it appears on the exam
> - **RET-101 (2a):** Candidates identify the risks faced by retirees and the elderly, as catalogued in the SOA's *Managing Post-Retirement Risks* and McGill ch. 9, and explain each.
> - **RET-101 (2b, 2d):** Questions contrast which of these risks a DB, DC, hybrid, public sector or social insurance plan leaves with its members, then ask how design features such as annuitization, indexing, joint and survivor forms, lifetime income options and defaults manage them.
> - **RET-101 (4d, 4g):** In a design recommendation, candidates recognize where the sponsor's goals contradict the members' retirement risks and propose a design that manages them.
> - **Calculations:** Short calculations show how long a drawdown lasts and how likely a retiree is to outlive it, or how far inflation erodes a level pension.

> [!warning]- Exam traps
> - **Life expectancy is not the planning horizon:** Planning to an average age of death leaves about half of retirees short. The longevity risk is in the tail, so a plan should be tested at an age the retiree has a small chance of reaching.
> - **Survival to the shortfall:** The chance of outliving a fund is the probability of being alive when the first payment fails, ${}_Np_x$, not one minus it.
> - **Sequence matters:** Two retirees with the same average return can end with very different outcomes if one suffers the losses early, while withdrawals are largest relative to the fund. An answer that uses the average return alone misses sequence risk.
> - **Who bears the risk:** A DB plan moves investment and longevity risk to the sponsor but leaves the member exposed to the sponsor's default. Saying a DB member bears "no risk" ignores default and, without indexing, inflation.
