---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d9929d36e646ce4e333e43a6cf51c0165bbc47387e009bbc3b43a80bc9da0d20
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Retirement Plan.md
---

A **Retirement Plan** is an arrangement under which a [[Plan Sponsor]] (an employer, a group of employers or a union) and usually the employees set money aside during working years to pay income to members after they retire. It is a [[Defined Benefit Plan]] when the *benefit* is promised and contributions adjust to fund it, a [[Defined Contribution Plan]] when the *contribution* is promised and the benefit is whatever the account buys, and a **hybrid** (cash balance, target benefit, shared risk) when the two are mixed.

> $$C + I = B + E$$

> $$F_{t+1} = F_t + C_t + I_t - B_t - E_t$$

> $$R = \frac{\text{pension income in the year after retirement}}{\text{salary in the year before retirement}}$$

- **The funding equation.** Over the plan's life, contributions $C$ plus investment income $I$ must equal benefits $B$ plus expenses $E$; year by year the fund $F_t$ rolls forward the same way. [[Funding]] decisions only change *when* $C$ is paid and how much $I$ does the work, never the ultimate $B + E$.
- **Replacement ratio** $R$ is the yardstick of benefit adequacy (Dickson, Hardy & Waters, ch. 10): a DB formula fixes it in advance, a DC account only projects it. The plan's ratio is read together with government benefits ([[Social Insurance]]).
- **Who bears the risk** is what separates the types: in DB, investment, [[Mortality|longevity]] and inflation risk sit with the sponsor; in DC they sit with the member. Hybrids share them — a target benefit plan fixes contributions and lets benefits adjust.
- A **[[Pension Plan]]** is a retirement plan paying a lifetime income; the plan's rules — formula, eligibility, vesting, retirement ages, indexation — are its [[Plan Design]].

> [!example]- Rolling the Pension Fund Forward One Year {Example}
> A DB fund holds \$50{,}000{,}000 at the start of the year. The sponsor contributes \$4{,}000{,}000 at the start of the year, benefits of \$6{,}000{,}000 are paid at mid-year, expenses of \$500{,}000 are paid at year-end, and the fund earns 6% effective. Find the investment income and the year-end fund.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > I &= 0.06\,(50{,}000{,}000 + 4{,}000{,}000) - 6{,}000{,}000\,(1.06^{0.5} - 1) \\
> > &= 3{,}240{,}000 - 177{,}378 \\
> > &= 3{,}062{,}622
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > F_1 &= 50{,}000{,}000 + 4{,}000{,}000 + 3{,}062{,}622 - 6{,}000{,}000 - 500{,}000 \\
> > &= 50{,}562{,}622
> > \end{align*}
> > $$
> > Investment income, not contributions, covered half the year's benefits — the $I$ in $C + I = B + E$ doing its share.

> [!example]- Same Money, Different Risk Bearer: DB versus DC {Example}
> \$100{,}000 is set aside for a member aged 55 who retires at 65; the pension is bought with $\ddot{a}^{(12)}_{65} = 13.0870$. Ignore death before 65. (a) In a DC plan, find the annual pension if the account earns 6% a year, and if it earns 3%. (b) In a DB plan the sponsor promised the pension that 6% would buy. If assets earn 3%, how much must the sponsor add at 65?
>
> > [!answer]-
> > (a) DC: the member takes whatever the account buys.
> > $$
> > \begin{align*}
> > P_{6\%} &= \frac{100{,}000\,(1.06)^{10}}{13.0870} \\
> > &= \frac{179{,}085}{13.0870} \\
> > &= 13{,}684
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > P_{3\%} &= \frac{100{,}000\,(1.03)^{10}}{13.0870} \\
> > &= \frac{134{,}392}{13.0870} \\
> > &= 10{,}269
> > \end{align*}
> > $$
> > (b) DB: the pension stays \$13{,}684, so the sponsor makes up the shortfall.
> > $$
> > \begin{align*}
> > \text{Top-up} &= 179{,}085 - 134{,}392 \\
> > &= 44{,}693
> > \end{align*}
> > $$
> > The same 3% return costs the DC member a quarter of their pension and costs the DB sponsor \$44{,}693 — investment risk lands on whoever did not fix their side of the deal.

> [!tip]- How it appears on the exam
> - **RET-101** asks you to identify and prioritize a sponsor's goals for the retirement plan, assess whether they are feasible, and recommend a plan type — written answers comparing DB, DC and hybrids (target benefit, shared risk, executive plans) on cost, risk and adequacy.
> - **RET-101** also asks how plan design manages the risks participants and retirees face (longevity, investment, inflation), including in multi-employer plans.
> - **RET-201** and **RET-301** set the plan inside its funding, accounting and Canadian regulatory frame: the sponsor's funding options, and the assumptions chosen for a funding valuation.
> - **ALTAM** computes replacement ratios for DB and DC plans — see the two archetype pages.

> [!warning]- Exam traps
> - Saying a DC plan "has no risk": it has all the same risks, they simply sit with the member — the written answer must name who bears each one.
> - Treating a target benefit plan as DB because it states a target benefit: contributions are fixed, so benefits are cut when the fund falls short.
> - Thinking a funding method lowers cost: by $C + I = B + E$ it only moves contributions in time; the ultimate cost changes only through $B$, $E$ or $I$.
> - Measuring $R$ against final *average* salary, or against the salary in the year of retirement: the denominator is the salary in the year *before* retirement.
