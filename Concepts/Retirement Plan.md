---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:92feba7153f049aafc18a2f5685bd415b2388dfdddd9a7ba5dec05417fce4aa9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Retirement Plan.md
---

A **Retirement Plan** is an arrangement under which a [[Plan Sponsor|plan sponsor]] (an employer, a group of employers or a union), and usually the employees, set money aside during working years to pay income to members after they retire. It is a [[Defined Benefit Plan|defined benefit plan]] when the benefit is promised and contributions adjust to fund it, a [[Defined Contribution Plan|defined contribution plan]] when the contribution is promised and the benefit is whatever the account buys, and a hybrid (cash balance, target benefit, shared risk) when the two are mixed.

A [[Pension Plan|pension plan]] is a retirement plan paying a lifetime income. The plan's rules (formula, eligibility, vesting, retirement ages, indexation) are its [[Plan Design|plan design]].

Over the plan's life, the money in must equal the money out, so the funding equation is

> $$C + I = B + E$$

- $C$ is the contributions.
- $I$ is the investment income.
- $B$ is the benefits paid.
- $E$ is the expenses.

[[Funding]] decisions change only when $C$ is paid and how much of the cost $I$ covers. They never change the ultimate $B + E$.

## The fund year by year

Year by year, the fund $F_t$ at the start of year $t$ rolls forward as

> $$F_{t+1} = F_t + C_t + I_t - B_t - E_t$$

- $C_t$, $I_t$, $B_t$ and $E_t$ are the contributions, investment income, benefits and expenses of year $t$.

> [!example]- What are this fund's investment income and year-end value? {Example}
> A DB fund holds \$50,000,000 at the start of the year. The sponsor contributes \$4,000,000 at the start of the year, benefits of \$6,000,000 are paid at mid-year, expenses of \$500,000 are paid at year-end, and the fund earns 6% effective.
>
> > [!answer]-
> > - The \$54,000,000 held all year earns $0.06 \times 54{,}000{,}000 = 3{,}240{,}000$.
> > - The benefits leave at mid-year, so the fund loses their interest for half a year, $6{,}000{,}000\,(1.06^{0.5} - 1) = 177{,}378$.
> > - The investment income is $I = 3{,}240{,}000 - 177{,}378 = 3{,}062{,}622$, about half the year's benefits.
> > - The year-end fund is $F_1 = 50{,}000{,}000 + 4{,}000{,}000 + 3{,}062{,}622 - 6{,}000{,}000 - 500{,}000 = 50{,}562{,}622$.

## Who bears the risk

Who bears the risk is what separates the types. In a DB plan, investment, [[Mortality|longevity]] and inflation risk sit with the sponsor. In a DC plan they sit with the member. Hybrids share them. A target benefit plan fixes contributions and lets benefits adjust, so benefits are cut when the fund falls short.

> [!example]- What pension does each return buy in a DC plan, and what must a DB sponsor add at 3%? {Example}
> \$100,000 is set aside for a member aged 55 who retires at 65, and the pension is bought with $\ddot{a}^{(12)}_{65} = 13.0870$. Ignore death before 65. In the DC plan the account earns 6% a year or 3% a year. In the DB plan the sponsor promised the pension that 6% would buy, and the assets earn 3%.
>
> > [!answer]-
> > - At 6% the account grows to $100{,}000\,(1.06)^{10} = 179{,}085$, which buys $179{,}085/13.0870 = 13{,}684$ a year.
> > - At 3% it grows to $100{,}000\,(1.03)^{10} = 134{,}392$, which buys $134{,}392/13.0870 = 10{,}269$ a year.
> > - The DC member takes whatever the account buys, so 3% costs them a quarter of their pension.
> > - The DB pension stays \$13,684, so the sponsor adds $179{,}085 - 134{,}392 = 44{,}693$ at 65.

## Replacement ratio

The replacement ratio measures benefit adequacy (Dickson, Hardy & Waters, ch. 10). It is

> $$R = \frac{\text{pension income in the year after retirement}}{\text{salary in the year before retirement}}$$

A DB formula fixes it in advance, and a DC account only projects it. The denominator is the salary in the year before retirement, not a final average salary. A plan's ratio is read together with government benefits ([[Social Insurance|social insurance]]).

> [!trap] Saying a DC plan has no risk
> A DC plan has the same investment, longevity and inflation risks as a DB plan. They sit with the member instead of the sponsor, and a written answer names who bears each one.
