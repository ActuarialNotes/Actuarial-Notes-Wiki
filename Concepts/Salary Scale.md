---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2e3bcbbb7969a2b0cd440581f9590b05a318f8087cc39df9b3ea28579b4394d3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Salary Scale.md
---

A **Salary Scale** $s_y$ is the function of age that a [[Pension Plan|pension plan]] valuation uses to project a member's future salary. It carries the assumed growth in pay from price inflation, productivity and promotion. Only its ratios matter: the salary earned in one year of age is the salary of another year times the ratio of the scale's values at the two ages,

> $$\frac{S_y}{S_x} = \frac{s_y}{s_x}$$

- $S_y$ is the salary earned in the year of age $y$ to $y+1$.

The scale can be multiplied by any constant without changing a projection. It projects the final or final average salary of a [[Defined Benefit Plan|final-salary plan]], which the [[Projected Unit Credit Method|projected unit credit method]] and the [[Replacement Ratio|replacement ratio]] need, and it projects the contributions of a [[Defined Contribution Plan|defined contribution plan]]. A career-average plan revalued with prices depends on the scale only for the salaries still to be earned.

The salary in the final year before retirement at 65 is $S_{64} = S_x\,s_{64}/s_x$. Using $s_{65}$ adds a year of growth that the member never earns.

## A salary rate at an exact age

$S_y$ is paid over a whole year, so it matches the salary rate at about the middle of that year, age $y + \frac12$. A salary rate at exact age $x$ therefore matches the year of age from $x - \frac12$ to $x + \frac12$, and the salary it projects to the year of age $y$ to $y+1$ is

> $$S_y = \bar{S}_x\,\frac{s_y}{s_{x-\frac12}}$$

- $\bar{S}_x$ is the annual rate of salary at exact age $x$.

A scale tabulated at whole ages is interpolated for the value at $x - \frac12$, usually by averaging its two neighbours:

> $$s_{x-\frac12} \approx \tfrac12\left(s_{x-1} + s_x\right)$$

A salary earned in the year just completed is $S_{x-1}$, so its base is $s_{x-1}$. Using $s_x$ for it drops a full year of growth.

> [!example]- What are this member's salaries in the years of age 50 to 51 and 64 to 65, and what error would dividing by $s_{45}$ cause? {Example}
> A plan's salary scale has $s_{44} = 2.7425$, $s_{45} = 2.8554$, $s_{50} = 3.4878$ and $s_{64} = 5.5544$. A member aged exactly 45 has an annual salary rate of $\$70{,}000$.
>
> > [!answer]-
> > - The rate at exact age 45 matches the year from 44.5 to 45.5, so the base of the projection is $s_{44.5}$.
> > - Averaging $s_{44}$ and $s_{45}$, $s_{44.5} \approx 2.79895$.
> > - Her salary in the year of age 50 to 51 is $S_{50} = 70{,}000 \times 3.4878/2.79895 = \$87{,}227.71$.
> > - Her salary in the year of age 64 to 65 is $S_{64} = 70{,}000 \times 5.5544/2.79895 = \$138{,}912.09$.
> > - Dividing by $s_{45}$ treats the $\$70{,}000$ as the salary for the year 45 to 46, half a year of growth later than a rate at 45. It gives $S_{64} = \$136{,}165.86$, which is 2.0% too low.
> > - If the $\$70{,}000$ had been the salary earned in the year of age 44 to 45, the base would be $s_{44}$ and $S_{64}$ would be $\$141{,}771.38$.

## Components of the salary scale

A salary scale built from its components is

> $$s_y = (1+I)^{\,y}\,(1+P)^{\,y}\,m_y$$

- $I$ is price inflation.
- $P$ is productivity growth, the real growth in pay across the whole economy.
- $m_y$ is the promotional or merit scale.

Inflation and productivity together make up the general increase in pay, which applies at every age. The promotional component reflects a member's progress through her career, so it is largest early on and usually levels off in the years before retirement. A career-average plan revalued with prices uses the inflation component alone: revaluing past salaries with the full salary scale also credits productivity and promotion, and overstates the benefit.

> [!example]- How much of this salary growth from age 45 to 55 does each component give, and how fast does salary grow after 55? {Example}
> Salary grows from the year of age 45 to 46 to the year 55 to 56. The scale is built as $s_y = (1.02)^{y-20}(1.01)^{y-20}\,m_y$, where 2% is price inflation, 1% is productivity growth and $m_y$ is a promotional scale with $m_{45} = 1.3571$ and $m_{55} = 1.5000$, flat from age 55.
>
> > [!answer]-
> > - Over the ten years, inflation gives $(1.02)^{10} = 1.21899$, productivity $(1.01)^{10} = 1.10462$ and promotion $1.5000/1.3571 = 1.10530$.
> > - The three compound rather than add, so $s_{55}/s_{45}$ is $1.21899 \times 1.10462 \times 1.10530 = 1.48832$, and salary grows 48.8%.
> > - In real terms salary grows by $1.48832/1.21899 = 1.22094$, or 22.1%.
> > - After 55 the promotional scale is flat, so $s_{y+1}/s_y = 1.02 \times 1.01 = 1.0302$, and salary grows 3.02% a year.

> [!trap] Dividing a salary rate by $s_x$
> A salary rate at exact age $x$ is divided by $s_{x-1/2}$. Dividing by $s_x$ understates every projected salary by half a year of growth, which is 2.0% in the first example.
