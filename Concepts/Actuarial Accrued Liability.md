---
aliases:
  - Accrued Liability
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ea4bbb30d16fc020200e5ac23b7243971649e1fb16199e4dcf4d558e77b64e3f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuarial Accrued Liability.md
---
The **Actuarial Accrued Liability** (AAL, written ${}_0V$ in AMLCR) of a [[Defined Benefit Plan|defined benefit]] [[Pension Plan|pension plan]] is the expected present value, at the valuation date, of the benefits members have earned for service up to that date. It is the target the plan's assets are measured against, and the cost method (projected unit credit or traditional unit credit) decides which salary the earned benefit is based on.

> $${}_0V = \text{EPV at time 0 of the benefits accrued for past service}$$

> $${}_0V^{\,\text{ret}} = n\,\alpha\,S^{*}\,v^{\,65-x}\;{}_{65-x}p_x^{(\tau)}\;\ddot{a}_{65}$$

- The second block is the age-retirement benefit for an active member aged $x$ with $n$ years of service in a final-salary plan with accrual rate $\alpha$, normal retirement at 65 and a pension paid annually in advance. ${}_{65-x}p_x^{(\tau)}$ is the probability of staying in service to 65 and $v$ is at the valuation rate
- **PUC** (projected unit credit): $S^{*}$ is the **projected** final salary, current salary grown by the salary scale, $S\,s_{64}/s_{x-1}$. **TUC** (traditional unit credit): $S^{*}$ is the **current** salary, with no allowance for future increases. With salaries rising, the TUC liability is smaller
- Benefits on early exit (withdrawal, death in service, early retirement) add their own EPV terms, each based on service to date. Retirees and deferred members contribute the EPV of their fixed pensions
- AAL minus the actuarial value of assets is the **unfunded** liability. It rolls forward through the [[Normal Cost|normal cost]] and the funding equation ${}_0V + C = \text{EPV(exit benefits in year)} + v\,p_x^{(\tau)}\,{}_1V$

> [!example]- PUC and TUC Liabilities for One Member {Example}
> A final-salary plan pays $1.5\%$ of the salary in the year before retirement for each year of service, from age 65, annually in advance. A member aged 50 has 20 years of service and earned $\$80{,}000$ in the year just completed; salaries rise $3\%$ a year. Given ${}_{15}p_{50}^{(\tau)} = 0.85$, $\ddot{a}_{65} = 13.0$ and $i = 5\%$, find the AAL under PUC and TUC.
>
> > [!answer]-
> > Projected final salary: $80{,}000(1.03)^{15} = 124{,}637.39$. EPV of 1 a year from 65 for an active member:
> > $$
> > \begin{align*}
> > v^{15}\,{}_{15}p_{50}^{(\tau)}\,\ddot{a}_{65} &= 0.48102(0.85)(13.0) \\
> > &= 5.31524
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > {}_0V^{\,\text{PUC}} &= 20(0.015)(124{,}637.39)(5.31524) \\
> > &= 37{,}391.22(5.31524) \\
> > &= 198{,}743.26
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > {}_0V^{\,\text{TUC}} &= 20(0.015)(80{,}000)(5.31524) \\
> > &= 24{,}000(5.31524) \\
> > &= 127{,}565.73
> > \end{align*}
> > $$
> > The accrued pension is $\$37{,}391$ projected versus $\$24{,}000$ on today's pay, so TUC holds about $36\%$ less today and makes it up through larger normal costs later.

> [!example]- Plan Liability and Funded Status {Example}
> The plan in the previous example also has a retiree aged 72 receiving $\$24{,}000$ a year ($\ddot{a}_{72} = 10.2$) and a deferred member aged 55 entitled to $\$9{,}000$ a year from 65 (${}_{10}p_{55} = 0.88$). Assets are $\$420{,}000$. Find the total AAL (PUC for the active member), the unfunded liability and the funded ratio.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Retiree} &= 24{,}000(10.2) \\
> > &= 244{,}800.00
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \text{Deferred} &= 9{,}000\,v^{10}(0.88)(13.0) \\
> > &= 9{,}000(0.61391)(0.88)(13.0) \\
> > &= 63{,}208.51
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \text{AAL} &= 198{,}743.26 + 244{,}800.00 + 63{,}208.51 \\
> > &= 506{,}751.77
> > \end{align*}
> > $$
> > Unfunded AAL $= 506{,}751.77 - 420{,}000 = 86{,}751.77$; funded ratio $= 420{,}000/506{,}751.77 = 82.9\%$. The [[Plan Sponsor|sponsor]] pays the normal cost plus an amortization of the $\$86{,}752$ shortfall.

> [!tip]- How it appears on the exam
> - **ALTAM** gives a salary scale, a service table or decrement probabilities and annuity values, and asks for the AAL of an active member under PUC and TUC, for the age-retirement benefit and for early-exit benefits (withdrawal, death in service), usually followed by the [[Normal Cost|normal cost]].
> - ALTAM also asks to interpret the difference: why PUC exceeds TUC when salaries rise, and what that means for funding over the member's career.
> - **RET-201** places the AAL in a periodic valuation of an ongoing plan under several cost methods, with the unfunded liability, gains and losses, and the written discussion of method choice and [[Funding|funding]] policy.

> [!warning]- Exam traps
> - Projecting salary in a TUC valuation, or using current salary in PUC. The two methods differ only in $S^{*}$, so a swapped salary produces the other method's answer exactly.
> - Counting salary increases from the wrong year: the projected final salary uses $s_{64}/s_{x-1}$ when $S$ is the salary of the year just completed (age $x-1$ to $x$). Writing $s_{64}/s_x$ drops a year of increases: $80{,}000(1.03)^{14}$ instead of $(1.03)^{15}$ in the first example.
> - Using the mortality-only survival probability for an active member's age-retirement benefit. While in service the member also leaves by withdrawal, so the probability is ${}_{65-x}p_x^{(\tau)}$ across all decrements.
> - Including future service. The AAL counts the $n$ years already worked; the projected total service at 65 belongs to the present value of all future benefits, not the accrued liability.
