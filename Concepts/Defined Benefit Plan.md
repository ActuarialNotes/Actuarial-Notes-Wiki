---
aliases:
  - Benefit Plan
  - DB
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:82bbc194de0c3048062a4f9bfd927e9361543915786ea6db9df0a6e64de086c6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Defined Benefit Plan.md
---
A **Defined Benefit Plan** (DB plan) is a [[Retirement Plan]] that promises each member a pension set by a formula — usually an accrual rate $\alpha$ times years of service $n$ times a salary measure — and leaves the [[Plan Sponsor]] to contribute whatever it takes to fund that promise. The salary measure names the three classic designs: final average salary (FAS), career average earnings (CAE) and career average revalued earnings (CARE).

> $$B_{\text{FAS}} = n\,\alpha\,S_{\text{Fin}}$$

> $$B_{\text{CAE}} = \alpha \sum_{k=0}^{n-1} S_{x_0+k}$$

> $$B_{\text{CARE}} = \alpha \sum_{k=0}^{n-1} S_{x_0+k}\,\frac{I_{\text{ret}}}{I_{x_0+k}}$$

- **Symbols** (Dickson, Hardy & Waters, ch. 10): $\alpha$ is the accrual rate (typically 1%–2%), $S_y$ the salary earned in the year of age $y$ to $y+1$, $x_0$ the entry age, $S_{\text{Fin}}$ the average salary over the last few years before retirement, $I$ a revaluation index (prices or wages).
- **Salary scale.** Future salaries are projected with $s_y$: $S_{y} = S_x\,s_y/s_x$. FAS benefits depend on it; CAE benefits do not, which is why a CAE plan needs a higher $\alpha$ for the same [[Retirement Plan|replacement ratio]].
- **Risks** — investment, [[Mortality|longevity]] and, for FAS, salary inflation — are the sponsor's; the member's pension does not move with the fund. The cost is measured by [[Valuation]]: the [[Actuarial Accrued Liability]] for service to date and the [[Normal Cost]] for the year's accrual.
- The benefit is paid as a [[Life Annuity]], so its value is $B$ times an annuity factor discounted for interest and survival to retirement. Compare [[Defined Contribution Plan]].

> [!example]- FAS versus CAE Replacement Ratio with a Salary Scale {Example}
> A member joins at 35 and retires at exact age 65 with 30 years' service. Salary in the year of age 35 to 36 is \$60{,}000 and $s_y = 1.03^{\,y}$. The accrual rate is 1.5%. Find the replacement ratio (a) under a FAS plan using the average of the last three years' salaries, and (b) under a CAE plan.
>
> > [!answer]-
> > $S_y = 60{,}000\,(1.03)^{y-35}$, so $S_{62} = 133{,}277$, $S_{63} = 137{,}276$, $S_{64} = 141{,}394$.
> > $$
> > \begin{align*}
> > S_{\text{Fin}} &= \tfrac{1}{3}\,(133{,}277 + 137{,}276 + 141{,}394) \\
> > &= 137{,}316 \\
> > B_{\text{FAS}} &= 30 \times 0.015 \times 137{,}316 \\
> > &= 61{,}792 \\
> > R_{\text{FAS}} &= \frac{61{,}792}{141{,}394} \\
> > &= 43.7\%
> > \end{align*}
> > $$
> > Total career salary is $\sum_{y=35}^{64} S_y = 2{,}854{,}525$.
> > $$
> > \begin{align*}
> > B_{\text{CAE}} &= 0.015 \times 2{,}854{,}525 \\
> > &= 42{,}818 \\
> > R_{\text{CAE}} &= \frac{42{,}818}{141{,}394} \\
> > &= 30.3\%
> > \end{align*}
> > $$
> > Unrevalued early salaries drag the CAE pension down; matching 43.7% would need $\alpha \approx 2.16\%$.

> [!example]- Value of the Accrued Benefit: TUC versus PUC {Example}
> An active member is exactly 50 with 15 years' service. Salary in the year of age 49 to 50 was \$80{,}000; $s_y = 1.03^{\,y}$. The plan pays $1.5\%$ of the final year's salary per year of service from 65, monthly for life. Retirement at 65 is the only exit apart from death, ${}_{15}E_{50} = 0.46151$ and $\ddot{a}^{(12)}_{65} = 13.0870$ (SUSM, 5%). Find the actuarial liability for the accrued benefit under the traditional unit credit (current salary) and projected unit credit (projected salary) methods.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > B_{\text{TUC}} &= 15 \times 0.015 \times 80{,}000 \\
> > &= 18{,}000 \\
> > S_{64} &= 80{,}000 \times \frac{s_{64}}{s_{49}} \\
> > &= 80{,}000 \times 1.03^{15} \\
> > &= 124{,}637 \\
> > B_{\text{PUC}} &= 15 \times 0.015 \times 124{,}637 \\
> > &= 28{,}043
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > AL_{\text{TUC}} &= 18{,}000 \times 0.46151 \times 13.0870 \\
> > &= 108{,}716 \\
> > AL_{\text{PUC}} &= 28{,}043 \times 0.46151 \times 13.0870 \\
> > &= 169{,}376
> > \end{align*}
> > $$
> > PUC holds 56% more today because it prices the salary growth the sponsor's promise is already exposed to.

> [!tip]- How it appears on the exam
> - **ALTAM** asks for replacement ratios under FAS, CAE and CARE plans with a salary scale, and for accrued benefits, including benefits on early exit.
> - **ALTAM** then values them: the accrued liability and normal cost under PUC and TUC, often paired with a service table for withdrawal and early retirement.
> - **RET-101** asks for written comparisons of traditional DB plans with DC and hybrid designs — cost volatility, who bears longevity and investment risk, and how the plan suits the sponsor's goals.

> [!warning]- Exam traps
> - Projecting with the wrong salary-scale ages: salary in year $y$ to $y+1$ is $S_x\,s_y/s_x$; projecting the final salary as $S_x\,s_{65}/s_x$ instead of $s_{64}/s_x$ overstates it by a year of growth.
> - A salary *rate* at exact age $x$ is centred on $x - \tfrac{1}{2}$: divide by $s_{x-1/2}$ (often $\tfrac{1}{2}(s_{x-1}+s_x)$), not by $s_x$.
> - Averaging the wrong salaries: FAS over the last three years before 65 is ages 62, 63, 64 — not 63, 64, 65.
> - Using total career salary in the FAS formula, or $n\,\alpha\,S_{\text{Fin}}$ for CAE: CAE already sums over service, so multiplying by $n$ again counts it twice.
