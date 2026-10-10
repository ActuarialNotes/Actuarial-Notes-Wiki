---
aliases:
  - Individual Savings Plan
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5924cccb3c9dc59b15aa90ef49b150c53b8079d080fb744f7e385de81402c627
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Registered Retirement Savings Plan.md
---
A **Registered Retirement Savings Plan** (RRSP) is a Canadian individual savings plan registered under the Income Tax Act: contributions up to the holder's contribution room are deductible from income, investment income is not taxed inside the plan, and withdrawals are taxed as income. It sits beside the other individual plans, the group RRSP, the tax-free savings account (TFSA) and the first home savings account (FHSA), and it is tied to employer [[Pension Plan|registered pension plans]] through the pension adjustment, which reduces RRSP room by the value of the pension a member earned.

> $$R_t = \min\left(0.18\,E_{t-1},\ L_t\right) - PA_{t-1} - PSPA_{t} + PAR_{t} + U_{t-1}$$

> $$\frac{W^{\text{RRSP}}}{W^{\text{TFSA}}} = \frac{1 - t_r}{1 - t_w}$$

- **Symbols:** $R_t$ is the RRSP deduction limit for year $t$, $E_{t-1}$ the previous year's earned income, $L_t$ the RRSP dollar limit for the year, and $PA_{t-1}$ the previous year's pension adjustment. $PSPA_t$ is any past service pension adjustment certified in the year, $PAR_t$ any pension adjustment reversal, and $U_{t-1}$ the unused room carried forward. In the second block, $t_w$ is the marginal tax rate when the contribution is made and $t_r$ the rate when the money is withdrawn.
- **The pension adjustment:** The PA is the value of the year's pension accrual: the contributions for a [[Defined Contribution Plan|DC]] member and $9 \times BE - 600$ for a [[Defined Benefit Plan|DB]] member with benefit entitlement $BE$. Subtracting it from the 18% room gives a pension plan member and a person who saves only in an RRSP about the same tax shelter, as described under [[Canadian Pension Legislation]]. A PAR restores room when a member leaves with a [[Commuted Value|commuted value]] smaller than the PAs reported.
- **Spousal RRSP:** A holder can use their own room to contribute to a plan owned by a spouse or common-law partner. The contributor takes the deduction and the spouse is taxed on withdrawals, which splits retirement income. A withdrawal within the year of contribution or the two calendar years after it is taxed back to the contributor.
- **Maturity at 71:** An RRSP must be wound up by the end of the year the holder turns 71, by converting it to a registered retirement income fund (RRIF), which sets a minimum withdrawal each year, by buying a [[Life Annuity|life annuity]], or by taking it in cash, which is fully taxable. Locked-in money from a pension, held in a locked-in RRSP or account, follows the same path through a life income fund, whose withdrawals also have a maximum.
- **Group RRSP:** An employer can offer an RRSP through payroll, often with a matching contribution. Each member's account is an ordinary individual RRSP, so the employer's contributions count as taxable pay deducted by the member, and the money is not locked in unless the plan's terms say so. It is often chosen over a registered pension plan because it carries no pension standards obligations.
- **TFSA and FHSA:** A TFSA is TEE: contributions are not deductible, but growth and withdrawals are tax-free, and an amount withdrawn is added back to the room the following year. An FHSA gives a deduction and a tax-free withdrawal for a first home, and its balance can move to an RRSP without using RRSP room. Neither is reduced by the pension adjustment.
- **Overcontributions:** Contributions more than \$2,000 above the deduction limit are taxed at 1% a month until they are withdrawn or absorbed by new room.

> [!example]- Next Year's RRSP Room for a DC Member {Example}
> A member earned \$150,000 last year. The member's DC pension plan received \$15,000 of contributions for the member that year, and the member has \$4,000 of unused RRSP room carried forward. Using an illustrative RRSP dollar limit of \$32,000, find the member's RRSP deduction limit for this year.
>
> > [!answer]-
> > For a DC member the PA is the contributions made. The 18% room is below the dollar limit, so it applies.
> > $$
> > \begin{align*}
> > 0.18\,E_{t-1} &= 0.18(150{,}000) \\
> > &= 27{,}000 \\
> > R_t &= \min(27{,}000,\ 32{,}000) - 15{,}000 + 4{,}000 \\
> > &= 16{,}000
> > \end{align*}
> > $$
> > The member can deduct \$16,000 of RRSP contributions this year, which can go to the member's own plan or to a spousal RRSP. The pension plan has already used \$15,000 of the member's shelter.

> [!example]- RRSP or TFSA at Different Retirement Tax Rates {Example}
> A saver with a 40% marginal tax rate has \$5,000 of pre-tax income to save for 25 years at 5% a year. In an RRSP the full \$5,000 is contributed and deducted; in a TFSA the saver contributes the \$3,000 left after tax. Compare the after-tax amounts at retirement when the retirement tax rate is 25%, 40% and 50%.
>
> > [!answer]-
> > The accumulation factor is $(1.05)^{25} = 3.386355$. The TFSA amount does not depend on the retirement rate.
> > $$
> > \begin{align*}
> > W^{\text{TFSA}} &= 3{,}000(3.386355) \\
> > &= 10{,}159 \\
> > W^{\text{RRSP}}_{25\%} &= 5{,}000(3.386355)(0.75) \\
> > &= 12{,}699 \\
> > W^{\text{RRSP}}_{40\%} &= 5{,}000(3.386355)(0.60) \\
> > &= 10{,}159 \\
> > W^{\text{RRSP}}_{50\%} &= 5{,}000(3.386355)(0.50) \\
> > &= 8{,}466
> > \end{align*}
> > $$
> > The two plans are equal when the rates are equal, as the ratio $(1 - t_r)/(1 - t_w)$ shows. The RRSP wins when the retirement rate is lower, and the TFSA wins when it is higher. A low-income retiree whose RRSP withdrawals reduce income-tested benefits, such as the Guaranteed Income Supplement, faces a high effective rate and is usually better off in a TFSA.

> [!tip]- How it appears on the exam
> - **RET-301 Regulations:** Questions ask a candidate to describe and apply the tax rules for individual savings plans, often in the same question as a registered pension plan: a member's PA, then next year's RRSP room, or the PAR after a termination.
> - **Advice questions:** Written questions ask which vehicle suits a member, an RRSP, a spousal RRSP, a TFSA or a group RRSP, given the member's tax rates now and in retirement, and what must happen to an RRSP at 71.
> - **Plan design:** A sponsor's choice between a group RRSP and a registered pension plan is tested on its tax, governance and locking-in consequences.

> [!warning]- Exam traps
> - **Use last year's figures:** This year's room comes from last year's earned income and last year's PA. Using the current year's income or PA gives the wrong room.
> - **18% or the dollar limit, then subtract:** The PA is subtracted after taking the lesser of 18% of earnings and the dollar limit. Subtracting it from 18% of earnings and then capping at the dollar limit overstates the room for a high earner.
> - **Group RRSP is not a pension plan:** Employer contributions to a group RRSP are taxable to the member and are not locked in by pension standards. Treating them like registered pension plan contributions misstates both the tax and the member's rights.
> - **Spousal attribution:** A spousal withdrawal within the three-year window is taxed to the contributor. Treating it as the spouse's income breaks the income-splitting answer.
