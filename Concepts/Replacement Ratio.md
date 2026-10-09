---
aliases:
  - Target Replacement
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a66fbec60d2231113c6f2e287a0e37f8eaad6a31fa6f082d76f72049c9bfc2a4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Replacement Ratio.md
---
The **Replacement Ratio** $R$ is a retiring member's pension income in the first year of retirement divided by her salary in the year before retirement. It measures how much of a member's working income a [[Retirement Plan|retirement plan]] replaces. A [[Defined Benefit Plan|defined benefit plan]]'s formula fixes it in advance, while a [[Defined Contribution Plan|defined contribution plan]] can only aim at a target replacement ratio through its contribution rate.

> $$R = \frac{B}{S_{x_r-1}}$$

> $$F^{*} = R^{*}\,S_{x_r-1}\,\ddot{a}^{(12)}_{x_r}$$

> $$c^{*} = \frac{F^{*} - F_0\,(1+i)^{m}}{\sum_{k=0}^{m-1} S_{x+k}\,(1+i)^{\,m-k}}$$

- **Symbols:** Following Dickson, Hardy & Waters (chapter 10), $x_r$ is the retirement age, $B$ is the annual pension in the first year of retirement and $S_{x_r-1}$ is the salary earned in the year of age $x_r - 1$ to $x_r$. For a DC member aged $x$ with $m = x_r - x$ years to go, $R^{*}$ is the target ratio, $F^{*}$ is the fund that buys the target pension at the annuity price $\ddot{a}^{(12)}_{x_r}$, $F_0$ is her account today, $i$ is the assumed return, and $c^{*}$ is the contribution rate, with contributions paid at the start of each year.
- **DB replacement ratio:** In a plan whose pensionable salary is the final year's salary, $R = n\alpha$, so 35 years at 2% replace 70%. A final average salary, a career average, or a revaluation index that grows more slowly than salary gives less, because the pensionable salary then falls below $S_{x_r-1}$.
- **DC target:** The account at retirement is linear in the contribution rate, so a deterministic projection, with one assumed return, one salary path and one annuity price, gives $c^{*}$ from a single linear equation. The member bears any shortfall if returns, salary growth or annuity prices turn out worse than assumed.
- **Adequacy:** A target is often set for total retirement income, so the plan's share is the target less the ratio that government benefits ([[Social Insurance]]) provide, as in [[Plan Design|plan design]].

> [!example]- Final Salary versus Career Average Revalued Earnings {Example}
> A member joins at 30 and retires at exact age 65 with 35 years of service. Her salary rises 3.5% a year, of which 2% is price inflation. The accrual rate is 2%. Find her replacement ratio (a) in a final-salary plan based on the salary in the year before retirement, (b) in a CARE plan that revalues each year's salary by 2% a year from the end of that year to retirement, and (c) in a CARE plan that revalues by 3.5% a year.
>
> > [!answer]-
> > (a) The pensionable salary is $S_{64}$, so $R = 35(0.02) = 70\%$.
> >
> > (b) The salary of the year of age $30 + k$ is $S_{64}(1.035)^{-(34-k)}$, and it is revalued by $(1.02)^{34-k}$. Writing $j = 34 - k$ for the years from that salary to retirement:
> > $$
> > \begin{align*}
> > R &= 0.02 \sum_{j=0}^{34} \left(\frac{1.02}{1.035}\right)^{j} \\
> > &= 0.02 \times \frac{1 - (1.02/1.035)^{35}}{1 - 1.02/1.035} \\
> > &= 0.02 \times 27.6055 \\
> > &= 55.2\%
> > \end{align*}
> > $$
> > (c) Revaluing by 3.5% a year turns every year's salary into $S_{64}$, so the ratio is 70% again. Price revaluation keeps each year's earnings at their purchasing power, but it does not credit the 1.5% a year of real growth in her pay, which costs her 14.8 points of replacement. A CARE plan revalued with her own salary growth is the same as a final-salary plan for a member whose pay rises steadily.

> [!example]- Required DC Contribution Rate with an Existing Balance {Example}
> A DC member aged 45 has an account of \$150,000. Her salary in the year of age 45 to 46 is \$80,000 and rises 3% a year. Contributions of $c$ times salary are paid at the start of each year from 45 to 64, the account earns 5% a year, and at 65 it buys a monthly life annuity at $\ddot{a}^{(12)}_{65} = 13.0870$ (SULT at 5%). Find the contribution rate that gives a replacement ratio of 60%.
>
> > [!answer]-
> > The target pension is 60% of the salary in the year of age 64 to 65.
> > $$
> > \begin{align*}
> > S_{64} &= 80{,}000(1.03)^{19} \\
> > &= 140{,}280.48 \\
> > F^{*} &= 0.60(140{,}280.48)(13.0870) \\
> > &= 84{,}168.29(13.0870) \\
> > &= 1{,}101{,}510.41
> > \end{align*}
> > $$
> > The existing account grows to $150{,}000(1.05)^{20} = 397{,}994.66$, so contributions must provide $703{,}515.75$. A contribution rate of 1 would accumulate to $\sum_{k=0}^{19} 80{,}000(1.03)^k(1.05)^{20-k} = 80{,}000(44.47729) = 3{,}558{,}183.20$.
> > $$
> > \begin{align*}
> > c^{*} &= \frac{703{,}515.75}{3{,}558{,}183.20} \\
> > &= 19.77\%
> > \end{align*}
> > $$
> > Without the existing balance she would need $1{,}101{,}510.41/3{,}558{,}183.20 = 30.96\%$ of salary. Twenty years of contributions are a short time to build a pension, and the money she saved earlier does more than a third of the work.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to calculate replacement ratios for DB plans with final average salary, career average earnings and career average revalued earnings formulas, using a [[Salary Scale|salary scale]], and for DC members from an account projection and an annuity factor.
> - **Required contribution rate:** The syllabus also asks for the contribution rate that meets a target replacement ratio for a DC participant, by a deterministic approach: project the salary, find the fund that buys the target pension, and solve for $c$.
> - **Comparisons:** Interpretation parts compare the same member's ratio under different formulas or plan types, or ask how a change in the return, salary growth or annuity price moves the ratio or the required rate.

> [!warning]- Exam traps
> - **The wrong denominator:** The ratio divides by the salary in the year before retirement, $S_{x_r-1}$. Dividing by the final average salary, a salary projected to age $x_r$, or today's salary gives a different answer.
> - **The wrong annuity factor:** A monthly pension is priced with $\ddot{a}^{(12)}_{65} = 13.0870$, not $\ddot{a}_{65} = 13.5498$. The annual factor overstates the fund needed by 3.5% and so overstates the required contribution rate.
> - **The existing balance:** An account already built up keeps earning interest until retirement. Subtracting $F_0$ without accumulating it, here \$150,000 instead of \$397,994.66, overstates the contribution rate.
> - **Contribution timing:** A contribution at the start of year $k$ earns $(1+i)^{m-k}$. Contributions paid monthly or at mid-year earn about half a year less, and need a slightly higher rate for the same target.
