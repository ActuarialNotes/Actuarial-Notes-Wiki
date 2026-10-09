---
aliases:
  - Age Retirement
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:507ee3771db3a572ce852a98e22042ac930de580c6c853f484d10ee115741db4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Service Table.md
---
A **Service Table** is the [[Multiple Decrement Model|multiple decrement table]] of the active members of a [[Pension Plan|pension plan]]. It starts from a radix of $l_x$ members in service at exact age $x$ and records how many leave in each year of age by each cause: withdrawal, ill-health retirement, age retirement and death. It plays the part of the [[Life Table|life table]] in pension valuation, because every probability that an active member reaches a benefit is read from it.

> $$l_{x+1} = l_x - w_x - i_x - r_x - d_x$$

> $$\sum_{t} \frac{r_{x+t}}{l_x}\,v^{\,t+\frac12}\,\ddot{a}_{x+t+\frac12}$$

> $$\sum_{t} \frac{w_{x+t}}{l_x}\,v^{\,65-x}\;{}_{65-y}p_{y}\;\ddot{a}_{65}$$

- **Symbols:** Following Dickson, Hardy & Waters (chapter 10), $l_x$ is the number of members in service at exact age $x$, and $w_x$, $i_x$, $r_x$ and $d_x$ are the numbers who leave between ages $x$ and $x+1$ by withdrawal, ill-health retirement, age retirement and death. The probability that a member aged $x$ leaves by a given cause between $x+t$ and $x+t+1$ is that column's entry at age $x+t$ divided by $l_x$, and ${}_tp_x^{(\tau)} = l_{x+t}/l_x$ is the probability that she is still in service at $x+t$. The book's Standard Service Table has these four columns.
- **Age retirement:** Age retirement is leaving service to take a pension inside the plan's retirement window, which runs from the earliest age at which the plan allows retirement to the normal retirement age, when every remaining member retires. A retirement before the normal retirement age is an early retirement, and the plan may reduce its pension. Ill-health retirement is a different decrement: it can happen at any age, it is triggered by disability, and it usually pays an unreduced pension at once. Withdrawal is leaving service before the window opens, and it usually gives a deferred pension from the normal retirement age.
- **EPVs on each exit:** The second block is the EPV at $x$ of an age-retirement pension of 1 a year, paid annually in advance from the date of retirement, and the third is the EPV of a deferred pension of 1 a year from 65 for a member who withdraws at age $y = x+t+\frac12$. Both assume that exits happen in the middle of the year of age, and the retirements at the last age of the table are discounted for a whole number of years. Once a member has left, only mortality applies to her, so the deferred pension is discounted to 65 with the single-decrement ${}_{65-y}p_y$. A death-in-service benefit is valued the same way with $d_{x+t}$.

> [!example]- Reading a Service Table {Example}
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
> For a member in service at exact age 60, find the probabilities that she withdraws, that she dies in service, that she retires before 65 and that she retires at 65. Then find the probability that a member in service at 62 retires before 65.
>
> > [!answer]-
> > Every probability for a member aged 60 divides a count by $l_{60} = 10{,}000$.
> > $$
> > \begin{align*}
> > \Pr[\text{withdraws}] &= \frac{500 + 400}{10{,}000} \\
> > &= 0.0900 \\
> > \Pr[\text{dies in service}] &= \frac{30 + 35 + 35 + 30 + 30}{10{,}000} \\
> > &= 0.0160 \\
> > \Pr[\text{retires before 65}] &= \frac{1{,}800 + 1{,}400 + 1{,}700}{10{,}000} \\
> > &= 0.4900 \\
> > \Pr[\text{retires at 65}] &= \frac{4{,}040}{10{,}000} \\
> > &= 0.4040
> > \end{align*}
> > $$
> > The four probabilities add to 1, because every member leaves by exactly one route. A member aged 62 divides by $l_{62}$ instead, so her probability of retiring before 65 is $4{,}900/9{,}035 = 0.5423$. It is higher than 0.49 because the withdrawals and deaths before 62 are already behind her.

> [!example]- EPV of the Age-Retirement Benefit {Example}
> In the plan above, the pension on age retirement is reduced by 5% for each year by which retirement precedes 65, so a member who retires at 62.5 receives 87.5% of her accrued pension. Exits happen at mid-year, $i = 5\%$, and pensions are paid annually in advance for life, with $\ddot{a}_{62.5} = 14.2516$, $\ddot{a}_{63.5} = 13.9767$, $\ddot{a}_{64.5} = 13.6940$ and $\ddot{a}_{65} = 13.5498$ (SULT at 5%). Find the EPV at 60 of the age-retirement benefit for each \$1 a year of accrued pension.
>
> > [!answer]-
> > Each retirement age contributes its probability from the table, times the discount factor $v^t$ to the retirement date, times the value at that date of the reduced pension. That value is the reduction factor times the annuity, for example $0.875(14.2516) = 12.47015$ at 62.5.
> >
> > | Retires at | Probability | $v^t$ | Pension value | EPV |
> > |---|---|---|---|---|
> > | 62.5 | 0.180 | 0.88517 | 12.47015 | 1.98688 |
> > | 63.5 | 0.140 | 0.84302 | 12.92845 | 1.52585 |
> > | 64.5 | 0.170 | 0.80288 | 13.35165 | 1.82236 |
> > | 65 | 0.404 | 0.78353 | 13.54980 | 4.28914 |
> > | Total | 0.894 | | | 9.62423 |
> >
> > Each \$1 a year of pension accrued by age 60 is worth \$9.62 at 60 through age retirement alone. Multiplied by the accrued pension on current salary, it gives the age-retirement part of the [[Traditional Unit Credit Method|traditional unit credit]] liability. Under the [[Projected Unit Credit Method|projected unit credit method]], each row is first multiplied by the salary projected to its retirement date.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to identify and apply service table functions: the probability that an active member leaves by a given cause in a given year, or reaches a given age in service.
> - **Building EPVs:** The question then uses the table to value a benefit on each exit, such as an age-retirement pension at each retirement age, a deferred pension on withdrawal or a lump sum on death in service, and it states when in the year the exits happen.
> - **Valuation methods:** These EPVs feed the [[Actuarial Accrued Liability|accrued liability]] and the [[Normal Cost|normal cost]] under the projected and traditional unit credit methods, and interpretation parts ask what a change in the table, such as heavier withdrawal, does to them.

> [!warning]- Exam traps
> - **The wrong radix:** A probability for a member aged $x$ divides by $l_x$. Dividing $r_{63}$ by $l_{63}$ gives 0.194, the probability for a member who has already reached 63 in service, instead of 0.140 for the member aged 60.
> - **The final retirements:** Every member still in service at the last age retires there, and $l_{65}$ is that count. Leaving it out drops the largest term, which is 4.28914 of the 9.62423 above.
> - **Exit timing:** With mid-year exits, a benefit on an exit in the year of age $x+t$ is discounted with $v^{t+1/2}$ and valued with $\ddot{a}_{x+t+1/2}$. Using whole-year discounting or $\ddot{a}_{x+t}$ misstates every term by about half a year of interest and mortality.
> - **The service table after exit:** A member who has withdrawn can no longer withdraw or retire from service, so her survival to 65 uses mortality alone. Using ${}_{65-y}p_y^{(\tau)}$ from the table counts decrements that no longer apply.
> - **Ill-health versus age retirement:** Ill-health retirement is its own column with its own benefit, often unreduced and payable at any age. Treating it as age retirement applies the early-retirement reduction to the wrong members.
