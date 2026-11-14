---
aliases:
  - Age Retirement
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9b362bd9af383c01f25d5c214f5da9e3bae4a42249c1a669d539a5af3b20bbac
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Service Table.md
---
A **Service Table** is the [[Multiple Decrement Model|multiple decrement table]] of the active members of a [[Pension Plan|pension plan]]. It starts from a radix of $l_x$ members in service at exact age $x$ and records how many leave in each year of age by each cause: withdrawal, ill-health retirement, age retirement and death. The number in service a year later is

> $$l_{x+1} = l_x - w_x - i_x - r_x - d_x$$

- $w_x$, $i_x$, $r_x$ and $d_x$ are the numbers who leave between ages $x$ and $x+1$ by withdrawal, ill-health retirement, age retirement and death.

The service table plays the part of the [[Life Table|life table]] in pension valuation, because every probability that an active member reaches a benefit is read from it. The probability that a member aged $x$ leaves by a given cause between $x+t$ and $x+t+1$ is that column's entry at age $x+t$ divided by $l_x$. The probability that she is still in service at $x+t$ is ${}_tp_x^{(\tau)} = l_{x+t}/l_x$. Every member still in service at the table's last age retires there, and the $l$ at that age is their count.

> [!example]- What are the probabilities of each exit for a member in service at 60, and of retiring before 65 from 62? {Example}
> A pension plan's service table for ages 60 to 65 is below. Members may retire from age 62, and every member still in service at 65 retires at that age. A member who leaves before 62 withdraws, and there are no ill-health retirements at these ages.
>
> | $x$ | $l_x$ | $w_x$ | $r_x$ | $d_x$ |
> |---|---|---|---|---|
> | 60 | 10,000 | 500 | 0 | 30 |
> | 61 | 9,470 | 400 | 0 | 35 |
> | 62 | 9,035 | 0 | 1,800 | 35 |
> | 63 | 7,200 | 0 | 1,400 | 30 |
> | 64 | 5,770 | 0 | 1,700 | 30 |
> | 65 | 4,040 | | | |
>
> > [!answer]-
> > - Every probability for a member aged 60 divides a count by $l_{60} = 10{,}000$.
> > - She withdraws with probability $(500 + 400)/10{,}000 = 0.0900$.
> > - She dies in service with probability $(30 + 35 + 35 + 30 + 30)/10{,}000 = 0.0160$.
> > - She retires before 65 with probability $(1{,}800 + 1{,}400 + 1{,}700)/10{,}000 = 0.4900$.
> > - She retires at 65 with probability $4{,}040/10{,}000 = 0.4040$.
> > - The four probabilities add to 1, because every member leaves by exactly one route.
> > - A member aged 62 divides by $l_{62}$ instead, so her probability of retiring before 65 is $4{,}900/9{,}035 = 0.5423$. It is higher than 0.49 because the withdrawals and deaths before 62 are already behind her.

## Age retirement and the other exits

Age retirement is leaving service to take a pension inside the plan's retirement window, which runs from the earliest age at which the plan allows retirement to the normal retirement age, when every remaining member retires. A retirement before the normal retirement age is an early retirement, and the plan may reduce its pension.

Ill-health retirement is a different decrement. It can happen at any age, it is triggered by disability, and it usually pays an unreduced pension at once. Withdrawal is leaving service before the window opens, and it usually gives a deferred pension from the normal retirement age.

## EPV of the age-retirement pension

If exits happen in the middle of the year of age, the EPV at $x$ of an age-retirement pension of 1 a year, paid annually in advance from the date of retirement, is

> $$\sum_{t} \frac{r_{x+t}}{l_x}\,v^{\,t+\frac12}\,\ddot{a}_{x+t+\frac12}$$

- $v$ is the annual discount factor at the valuation interest rate.
- $\ddot{a}_{x+t+\frac12}$ is the value of the pension at the retirement age, from mortality alone.

The retirements at the last age of the table are discounted for a whole number of years and valued with the annuity at that age. Using whole-year discounting or $\ddot{a}_{x+t}$ for the mid-year exits misstates every term by about half a year of interest and mortality.

> [!example]- What is the EPV at 60 of the age-retirement benefit for each $\$1$ a year of accrued pension? {Example}
> In the plan above, the pension on age retirement is reduced by 5% for each year by which retirement precedes 65, so a member who retires at 62.5 receives 87.5% of her accrued pension. Exits happen at mid-year, $i = 5\%$, and pensions are paid annually in advance for life, with $\ddot{a}_{62.5} = 14.2516$, $\ddot{a}_{63.5} = 13.9767$, $\ddot{a}_{64.5} = 13.6940$ and $\ddot{a}_{65} = 13.5498$ (SULT at 5%).
>
> > [!answer]-
> > - Each retirement age contributes its probability from the table, times the discount factor $v^t$ to the retirement date, times the value at that date of the reduced pension.
> > - That value is the reduction factor times the annuity, for example $0.875(14.2516) = 12.47015$ at 62.5.
> >
> > | Retires at | Probability | $v^t$ | Pension value | EPV |
> > |---|---|---|---|---|
> > | 62.5 | 0.180 | 0.88517 | 12.47015 | 1.98688 |
> > | 63.5 | 0.140 | 0.84302 | 12.92845 | 1.52585 |
> > | 64.5 | 0.170 | 0.80288 | 13.35165 | 1.82236 |
> > | 65 | 0.404 | 0.78353 | 13.54980 | 4.28914 |
> > | Total | 0.894 | | | 9.62423 |
> >
> > - Each $\$1$ a year of pension accrued by age 60 is worth $\$9.62$ at 60 through age retirement alone.
> > - The retirements at 65 are the largest term, 4.28914 of the 9.62423.
> > - Multiplied by the accrued pension on current salary, the total gives the age-retirement part of the [[Traditional Unit Credit Method|traditional unit credit]] liability. Under the [[Projected Unit Credit Method|projected unit credit method]], each row is first multiplied by the salary projected to its retirement date.

## EPV of the pension on withdrawal

For a member who withdraws at age $y = x+t+\frac12$, the EPV at $x$ of a deferred pension of 1 a year from 65 is

> $$\sum_{t} \frac{w_{x+t}}{l_x}\,v^{\,65-x}\;{}_{65-y}p_{y}\;\ddot{a}_{65}$$

- ${}_{65-y}p_{y}$ is the probability, from mortality alone, that a member aged $y$ survives to 65.

Once a member has left, only mortality applies to her: she can no longer withdraw or retire from service. Using ${}_{65-y}p_y^{(\tau)}$ from the service table counts decrements that no longer apply. A death-in-service benefit is valued the same way with $d_{x+t}$.

> [!trap] Dividing by the wrong radix
> A probability for a member aged $x$ divides by $l_x$. In the example, dividing $r_{63}$ by $l_{63}$ gives 0.194, the probability for a member who has already reached 63 in service, instead of 0.140 for the member aged 60.
