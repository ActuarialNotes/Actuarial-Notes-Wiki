---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:055690156b8c769020872d480a4767f1739ab2ea4d47d1e4338ed1e078b10af0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Salary Scale.md
---

A **Salary Scale** $s_y$ is the function of age that a [[Pension Plan|pension plan]] valuation uses to project a member's future salary. Only its ratios matter: the salary earned in one year of age is the salary of another year times the ratio of the scale's values at the two ages. The scale carries the assumed growth in pay from price inflation, productivity and promotion.

> $$\frac{S_y}{S_x} = \frac{s_y}{s_x}$$

> $$S_y = \bar{S}_x\,\frac{s_y}{s_{x-\frac12}}$$

> $$s_{x-\frac12} \approx \tfrac12\left(s_{x-1} + s_x\right)$$

> $$s_y = (1+I)^{\,y}\,(1+P)^{\,y}\,m_y$$

- **Symbols:** Following Dickson, Hardy & Waters (chapter 10), $S_y$ is the salary earned in the year of age $y$ to $y+1$, and $\bar{S}_x$ is the annual rate of salary at exact age $x$. The scale can be multiplied by any constant without changing a projection. In the last block, $I$ is price inflation, $P$ is productivity growth, the real growth in pay across the whole economy, and $m_y$ is the promotional or merit scale.
- **A rate at an exact age:** $S_y$ is paid over a whole year, so it matches the salary rate at about the middle of that year, age $y + \frac12$. A salary rate at exact age $x$ therefore matches the year of age from $x - \frac12$ to $x + \frac12$, which is why it is divided by $s_{x-1/2}$. A scale tabulated at whole ages is interpolated for that value, usually by averaging its two neighbours.
- **Components:** Inflation and productivity together make up the general increase in pay, which applies at every age. The promotional component reflects a member's progress through her career, so it is largest early on and usually levels off in the years before retirement.
- **Uses:** The scale projects the final or final average salary of a [[Defined Benefit Plan|final-salary plan]], which the [[Projected Unit Credit Method|projected unit credit method]] and the [[Replacement Ratio|replacement ratio]] need, and it projects the contributions of a [[Defined Contribution Plan|defined contribution plan]]. A career-average plan revalued with prices depends on the scale only for the salaries still to be earned.

> [!example]- Projecting from a Salary Rate at an Exact Age {Example}
> A plan's salary scale has $s_{44} = 2.7425$, $s_{45} = 2.8554$, $s_{50} = 3.4878$ and $s_{64} = 5.5544$. A member aged exactly 45 has an annual salary rate of \$70,000. Estimate her salary in the year of age 50 to 51 and in the year of age 64 to 65, and find the error that dividing by $s_{45}$ would cause.
>
> > [!answer]-
> > The rate at exact age 45 matches the year from 44.5 to 45.5, so the base of the projection is $s_{44.5}$.
> > $$
> > \begin{align*}
> > s_{44.5} &\approx \tfrac12(2.7425 + 2.8554) \\
> > &= 2.79895 \\
> > S_{50} &= 70{,}000 \times \frac{3.4878}{2.79895} \\
> > &= 87{,}227.71 \\
> > S_{64} &= 70{,}000 \times \frac{5.5544}{2.79895} \\
> > &= 138{,}912.09
> > \end{align*}
> > $$
> > Dividing by $s_{45}$ treats the \$70,000 as the salary for the year 45 to 46, which is half a year of growth later than a rate at 45. It gives $S_{64} = 136{,}165.86$, which is 2.0% too low. If the \$70,000 had been the salary earned in the year of age 44 to 45, the base would be $s_{44}$ and $S_{64}$ would be \$141,771.38.

> [!example]- Splitting Salary Growth into Its Components {Example}
> The scale above is built as $s_y = (1.02)^{y-20}(1.01)^{y-20}\,m_y$, where 2% is price inflation, 1% is productivity growth and $m_y$ is a promotional scale with $m_{45} = 1.3571$ and $m_{55} = 1.5000$, flat from age 55. Find the growth in salary from the year of age 45 to 46 to the year 55 to 56, and split it into its components. Then find the real growth over those ten years and the annual growth after 55.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \frac{s_{55}}{s_{45}} &= (1.02)^{10}\,(1.01)^{10}\,\frac{1.5000}{1.3571} \\
> > &= 1.21899 \times 1.10462 \times 1.10530 \\
> > &= 1.48831
> > \end{align*}
> > $$
> > Salary grows 48.8% over the ten years. Inflation alone would give 21.9%, productivity 10.5% and promotion 10.5%, and the three compound rather than add. In real terms salary grows by $1.48831/1.21899 = 1.22094$, or 22.1%. After 55 the promotional scale is flat, so $s_{y+1}/s_y = 1.02 \times 1.01 = 1.0302$, and salary grows 3.02% a year, close to the 3% assumed for the member near retirement on the [[Projected Unit Credit Method|projected unit credit]] page.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to identify, interpret and apply salary scale functions: to project a member's salary to a later year, or to the final or final average salary on which her pension is based, from a tabulated scale or a constant growth rate.
> - **The salary given:** The question says whether the salary is the amount earned over the past year or a rate at an exact age, and that choice decides the base of the projection.
> - **Downstream uses:** The projected salaries then feed [[Replacement Ratio|replacement ratios]], DC contribution rates, and the [[Actuarial Accrued Liability|accrued liability]] and [[Normal Cost|normal cost]] under the projected unit credit method.

> [!warning]- Exam traps
> - **A rate divided by $s_x$:** A salary rate at exact age $x$ is divided by $s_{x-1/2}$. Dividing by $s_x$ understates every projected salary by half a year of growth, which is 2.0% in the first example.
> - **The salary over the past year:** A salary earned in the year just completed is $S_{x-1}$, so the base is $s_{x-1}$. Using $s_x$ drops a full year of growth.
> - **One year too many:** The salary in the final year before retirement at 65 is $S_{64} = S_x\,s_{64}/s_x$. Using $s_{65}$ adds a year of growth that the member never earns.
> - **Revaluing with the whole scale:** A career-average plan revalued with prices uses the inflation component alone. Revaluing past salaries with the full salary scale also credits productivity and promotion, and overstates the benefit.
