---
aliases:
  - Individual Savings Plan
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9a338f13380c365594d13e9e5616b9cea478580f835a38e962fad3fd1242856f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Registered Retirement Savings Plan.md
---
A **Registered Retirement Savings Plan** (RRSP) is a Canadian individual savings plan registered under the Income Tax Act. Contributions up to the holder's contribution room are deductible from income, investment income is not taxed inside the plan, and withdrawals are taxed as income.

The RRSP deduction limit $R_t$ for year $t$ is

> $$R_t = \min\left(0.18\,E_{t-1},\ L_t\right) - PA_{t-1} - PSPA_{t} + PAR_{t} + U_{t-1}$$

- $E_{t-1}$ is the previous year's earned income.
- $L_t$ is the RRSP dollar limit for the year.
- $PA_{t-1}$ is the previous year's pension adjustment.
- $PSPA_t$ is any past service pension adjustment certified in the year.
- $PAR_t$ is any pension adjustment reversal.
- $U_{t-1}$ is the unused room carried forward.

This year's room comes from last year's earned income and last year's PA. The PA is subtracted after taking the lesser of 18% of earnings and the dollar limit.

## The pension adjustment

The pension adjustment (PA) ties the RRSP to employer [[Pension Plan|registered pension plans]] by reducing RRSP room by the value of the year's pension accrual. For a [[Defined Contribution Plan|DC]] member it is the contributions made. For a [[Defined Benefit Plan|DB]] member with benefit entitlement $BE$ it is

> $$PA = 9 \times BE - 600$$

Subtracting the PA from the 18% room gives a pension plan member and a person who saves only in an RRSP about the same tax shelter, as described under [[Canadian Pension Legislation]]. A PAR restores room when a member leaves with a [[Commuted Value|commuted value]] smaller than the PAs reported.

> [!example]- A member earned $\$150{,}000$ last year, had $\$15{,}000$ of DC contributions and carries $\$4{,}000$ of unused room. What is this year's RRSP deduction limit? {Example}
> - Use an illustrative RRSP dollar limit of $\$32{,}000$.
> - For a DC member the PA is the contributions made, $\$15{,}000$.
> - The 18% room is $0.18 \times 150{,}000 = \$27{,}000$, below the dollar limit, so it applies.
> - The limit is $R_t = 27{,}000 - 15{,}000 + 4{,}000 = \$16{,}000$.
> - The member can deduct $\$16{,}000$ of RRSP contributions this year, to the member's own plan or to a spousal RRSP.

## Spousal RRSP

A holder can use their own room to contribute to a plan owned by a spouse or common-law partner. The contributor takes the deduction and the spouse is taxed on withdrawals, which splits retirement income. A withdrawal within the year of contribution or the two calendar years after it is taxed back to the contributor.

## Maturity at 71

An RRSP must be wound up by the end of the year the holder turns 71. The holder converts it to a registered retirement income fund (RRIF), which sets a minimum withdrawal each year, buys a [[Life Annuity|life annuity]], or takes it in cash, which is fully taxable. Locked-in money from a pension, held in a locked-in RRSP or account, follows the same path through a life income fund, whose withdrawals also have a maximum.

## Group RRSP

An employer can offer an RRSP through payroll, often with a matching contribution. Each member's account is an ordinary individual RRSP, so the employer's contributions count as taxable pay deducted by the member. The money is not locked in unless the plan's terms say so. A group RRSP is often chosen over a registered pension plan because it carries no pension standards obligations.

## TFSA and FHSA

A tax-free savings account (TFSA) is TEE: contributions are not deductible, but growth and withdrawals are tax-free, and an amount withdrawn is added back to the room the following year. A first home savings account (FHSA) gives a deduction and a tax-free withdrawal for a first home, and its balance can move to an RRSP without using RRSP room. Neither is reduced by the pension adjustment.

For the same pre-tax saving and the same return, the ratio of the after-tax amounts at retirement is

> $$\frac{W^{\text{RRSP}}}{W^{\text{TFSA}}} = \frac{1 - t_r}{1 - t_w}$$

- $t_w$ is the marginal tax rate when the contribution is made.
- $t_r$ is the marginal tax rate when the money is withdrawn.

> [!example]- Which plan gives more after tax when the retirement tax rate is 25%, 40% or 50%? {Example}
> A saver with a 40% marginal tax rate has $\$5{,}000$ of pre-tax income to save for 25 years at 5% a year. In an RRSP the full $\$5{,}000$ is contributed and deducted. In a TFSA the saver contributes the $\$3{,}000$ left after tax.
>
> > [!answer]-
> > - The accumulation factor is $(1.05)^{25} = 3.386355$.
> > - The TFSA amount does not depend on the retirement rate: $3{,}000 \times 3.386355 = \$10{,}159$.
> > - At 25% the RRSP gives $5{,}000 \times 3.386355 \times 0.75 = \$12{,}699$.
> > - At 40% it gives $5{,}000 \times 3.386355 \times 0.60 = \$10{,}159$, the same as the TFSA.
> > - At 50% it gives $5{,}000 \times 3.386355 \times 0.50 = \$8{,}466$.
> > - The RRSP wins when the retirement rate is lower than the contribution rate, and the TFSA wins when it is higher.
> > - A low-income retiree whose RRSP withdrawals reduce income-tested benefits, such as the Guaranteed Income Supplement, faces a high effective rate and is usually better off in a TFSA.

## Overcontributions

Contributions more than $\$2{,}000$ above the deduction limit are taxed at 1% a month until they are withdrawn or absorbed by new room.

> [!trap] Capping after subtracting the PA
> Subtracting the PA from 18% of earnings and then capping at the dollar limit overstates the room for a high earner. Take the lesser of 18% of last year's earnings and the dollar limit first, then subtract last year's PA.
