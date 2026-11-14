---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:681813b98fce8a4fdaca17d85eff55ed0dbbfcdd6b0ae98553d9b2ead2c98b29
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Retirement Risk.md
---

**Retirement Risk** is the set of risks that can leave a worker or [[Retiree|retiree]] without enough income to maintain their standard of living for as long as they live. Each type of [[Retirement Plan|retirement plan]] leaves each risk with a different party, and the design question is who should carry which.

The main retirement risks are:

1. **[[Longevity Risk|Longevity]]:** outliving one's savings.
2. **[[Inflation]]:** a level income losing purchasing power.
3. **Investment and annuity price:** poor returns, and the price of turning savings into income.
4. **Health and long-term care:** costs not covered by public plans.
5. **Death of a spouse:** the loss of the spouse's income.
6. **Cognitive decline and behaviour:** poor decisions by the retiree, and fraud.
7. **Employer or plan default:** the failure of the sponsor of an underfunded plan.

## Who bears each risk

A traditional [[Defined Benefit Plan|DB plan]] with indexing carries most of these risks for the member, and a [[Defined Contribution Plan|DC plan]] carries none of them:

| Risk | DB plan with indexing | DC plan |
| :--- | :--- | :--- |
| Longevity | Sponsor | Member, unless they buy an annuity |
| Investment and interest | Sponsor | Member |
| Annuity price | Sponsor | Member |
| Inflation | Sponsor | Member |
| Employer default | Member | — |

Hybrid and target benefit plans sit between the two, sharing risks between the sponsor and the members or among the members. Without indexing, a DB member also bears inflation risk.

## Longevity risk

[[Longevity Risk|Longevity risk]] for an individual is the chance of living far beyond the average, which a retiree cannot diversify alone. Pooling in a [[Life Annuity|life annuity]] or a DB plan removes it, because the plan needs only to be right about the group. A retiree draws a level amount $W$ at the start of each year from savings $F_0$ earning a return $i$. The fund is used up at the term $N$ that solves

> $$W\,\ddot{a}_{\overline{N}|} = F_0$$

The fund pays the whole part of $N$ in full withdrawals. The chance that a retiree aged $x$ outlives the fund, the probability of being alive when the first payment fails, is

> $$\Pr(\text{ruin}) = {}_{N}p_x$$

> [!example]- How many full withdrawals can this fund pay, and what is the probability that the retiree outlives it? {Example}
> A 65-year-old retires with savings of $\$1$ and withdraws 5% of that starting amount, $\$0.05$, at the start of each year, with no inflation adjustment. The fund earns 3% a year. Mortality follows the Standard Ultimate Life Table, under which ${}_{29}p_{65} = 0.2653$.
>
> > [!answer]-
> > - The fund lasts while $0.05\,\ddot{a}_{\overline{N}|} \le 1$, so $1 - v^N = 20\,d = 20 \times 0.03/1.03 = 0.5825$.
> > - Then $v^N = 0.4175$ and $N = \ln(1/0.4175)/\ln 1.03 = 29.55$.
> > - The fund pays 29 full withdrawals, at ages 65 through 93, and the one due at 94 is short.
> > - The retiree outlives the fund if alive at 94, which has probability ${}_{29}p_{65} = 0.265$.

At a 4% return the same fund pays 37 withdrawals, and the probability falls to ${}_{37}p_{65} = 0.032$. A life annuity bought with the same fund would remove the risk, at the price of giving up the fund on death.

> [!trap] Planning to life expectancy
> Planning to an average age of death leaves about half of retirees short. The longevity risk is in the tail, so a plan should be tested at an age the retiree has a small chance of reaching.

## Inflation risk

A level pension $B$ loses purchasing power steadily, and the loss compounds over a retirement that can last 30 years. At an inflation rate $\pi$, its value in today's money after $t$ years is

> $$B_t^{\text{real}} = B\,(1 + \pi)^{-t}$$

> [!example]- What is the purchasing power of a level $\$30{,}000$ pension after 20 years of 2.5% inflation? {Example}
> - The discount factor is $1.025^{-20} = 0.6103$.
> - The pension is worth $30{,}000 \times 0.6103 = \$18{,}308$ in today's money, a loss of 39%.
> - Under the Standard Ultimate Life Table, a 65-year-old has a 65% chance of reaching 85, so the loss is likely to be lived through.

Indexing, full or partial, moves the risk to the plan, as do benefits tied to prices in [[Social Insurance|social insurance]].

## Investment and annuity price risk

Before retirement, poor returns shrink the fund. At retirement, the fund $F$ buys a lifetime income

> $$B = \frac{F}{\ddot{a}_x}$$

- $\ddot{a}_x$ is the annuity factor at the rates of the day.

At retirement, low interest rates raise the price of an annuity, and the order of returns matters most just after withdrawals begin, which is sequence-of-returns risk. Two retirees with the same average return can end with very different outcomes if one suffers the losses early, while withdrawals are largest relative to the fund. A DB plan leaves all three risks with the sponsor, and a DC plan leaves them with the member.

## Health, care and family

Health care costs not covered by public plans, the cost of [[Long-Term Care Insurance|long-term care]] and the loss of a spouse's income are shocks rather than trends. A joint and survivor [[Optional Form of Payment|form of payment]] protects the surviving spouse, and retiree health benefits or insurance cover part of the rest.

## Cognitive decline and behaviour

Ability to manage money declines with age, which raises the risk of poor choices and fraud late in life. Earlier, workers under-save, claim social benefits early and spend lump sums quickly. [[Behavioral Finance|Behavioural finance]] explains these patterns through [[Cognitive Bias|biases]] such as present bias and inertia. Defaults such as auto-enrolment and annuitization use the same biases to help.

## Employer and plan default

A member's benefits in an underfunded plan depend on the sponsor's survival, and supplementary benefits are usually unsecured. Guarantee funds, funding rules and [[Pension Risk Transfer|buyouts]] reduce the risk but do not remove it. A DB member therefore does not bear "no risk": they bear default and, without indexing, inflation.
