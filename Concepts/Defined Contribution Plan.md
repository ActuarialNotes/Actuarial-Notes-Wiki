---
aliases:
  - DC
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:28ddab06e56f992f0574422f9344ab7494e5e9b4f5a373b9c49fe9d2bcd5e4ce
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Defined Contribution Plan.md
---
A **Defined Contribution Plan** (DC plan) is a [[Retirement Plan]] in which the employer and member pay a fixed contribution rate $c$ of salary into the member's own account, and the retirement income is whatever the accumulated account can buy — typically a [[Life Annuity]] bought at retirement. The contribution is promised; the benefit is not.

> $$F_{x_0+n} = \sum_{k=0}^{n-1} c\,S_{x_0+k}\,(1+i)^{\,n-k}$$

> $$P = \frac{F_{x_0+n}}{\ddot{a}^{(12)}_{x_0+n}}$$

> $$R = \frac{P}{S_{x_0+n-1}}$$

- **Symbols:** $S_y$ is salary in the year of age $y$ to $y+1$, with each year's contribution paid at its start; $i$ is the fund's return; $\ddot{a}^{(12)}$ the annuity rate at retirement; $R$ the replacement ratio against the final year's salary (Dickson, Hardy & Waters, ch. 10). With monthly contributions a common approximation is mid-year timing, $(1+i)^{n-k-1/2}$.
- **Required contribution rate.** $F$ is linear in $c$, so the rate that meets a target ratio $R^{*}$ is $c^{*} = c\,R^{*}/R$.
- **The member bears the risks** a [[Defined Benefit Plan]] leaves with the [[Plan Sponsor]]: investment returns before retirement, annuity prices (interest rates and [[Mortality|longevity]]) at retirement, and — if no annuity is bought — outliving the account. The sponsor's cost is fixed at $c$ times payroll.
- With salary growth $g$, the sum is geometric: $F = c\,S_{x_0}(1+i)^n \frac{1-k^n}{1-k}$, $k = \frac{1+g}{1+i}$.

> [!example]- Accumulating a DC Account to a Replacement Ratio {Example}
> A member joins at 35 with salary \$50{,}000 in the year of age 35 to 36. Salaries rise 3.5% a year; 10% of salary is contributed at the start of each year to age 65; the account earns 6%. At 65 it buys a monthly life annuity at $\ddot{a}^{(12)}_{65} = 13.0870$. Find the replacement ratio.
>
> > [!answer]-
> > With $k = 1.035/1.06$ and $n = 30$:
> > $$
> > \begin{align*}
> > F_{65} &= 5{,}000\,(1.06)^{30}\,\frac{1 - k^{30}}{1 - k} \\
> > &= 5{,}000 \times 124.516 \\
> > &= 622{,}580
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > P &= \frac{622{,}580}{13.0870} \\
> > &= 47{,}572 \\
> > S_{64} &= 50{,}000\,(1.035)^{29} \\
> > &= 135{,}594 \\
> > R &= \frac{47{,}572}{135{,}594} \\
> > &= 35.1\%
> > \end{align*}
> > $$
> > Thirty years at 10% of pay replaces about a third of final salary.

> [!example]- Required Contribution Rate for a 60% Target {Example}
> For the member above, find the contribution rate that gives a 60% replacement ratio (a) if the account earns 6%, and (b) if it earns 4%, where 4% gives $R = 25.6\%$ at a 10% rate.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > c^{*}_{6\%} &= 0.10 \times \frac{0.60}{0.35084} \\
> > &= 17.1\%
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > c^{*}_{4\%} &= 0.10 \times \frac{0.60}{0.25588} \\
> > &= 23.4\%
> > \end{align*}
> > $$
> > Two points of return cost 6.3 points of pay a year — the price of investment risk, paid by the member.

> [!tip]- How it appears on the exam
> - **ALTAM** asks for the replacement ratio of a DC member from a salary scale, a contribution rate and an annuity factor, and for the required contribution rate to meet a target replacement ratio, deterministically.
> - **ALTAM** sets DC beside DB in the same question, so the same member's FAS and DC ratios can be compared.
> - **RET-101** asks for written answers on DC plan success factors, how DC design (default contributions, investment options, decumulation) manages participant risks, and when a sponsor should prefer DC.

> [!warning]- Exam traps
> - Off-by-one timing: contributions at the start of years 0 to $n-1$ earn $(1+i)^{n-k}$, not $(1+i)^{n-k-1}$; mid-year contributions earn a half-year less.
> - Dividing $P$ by the salary at age 65 or by an average salary: $R$ uses the final year's salary $S_{x_0+n-1}$.
> - Pricing the annuity at the fund's accumulation rate when the question gives a separate annuity factor or rate.
> - Writing that the sponsor bears investment risk "because it pays most of the contributions": in DC, the sponsor's cost is fixed at $c$ times payroll.
