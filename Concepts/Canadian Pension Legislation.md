---
aliases:
  - Regulatory Policy
  - Tax Legislation
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a3ebd8b6c76e463bab7d7a47dfcd5a2702f9a9a523b6b80560a36151c583008e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Canadian Pension Legislation.md
---

**Canadian Pension Legislation** is the body of law that governs a registered pension plan in Canada. It has two layers, with regulators' policies and actuarial standards on top:

1. **Pension benefits standards legislation**, either the federal Pension Benefits Standards Act, 1985 (PBSA) or the act of the province where the members work, sets minimum standards for members' rights and the rules for funding, investment, reporting and wind-up.
2. **Tax legislation**, the federal Income Tax Act and its regulations, decides which plans are registered and so tax-sheltered, by capping the benefits and contributions a plan may provide.
3. **Regulatory policies and standards**: the regulators' policies, the guidelines of the Canadian Association of Pension Supervisory Authorities (CAPSA) and the [[Canadian Institute of Actuaries (CIA)|CIA's]] standards of practice.

## Jurisdiction

Pensions are a provincial matter, except for federally regulated employment such as banking, airlines and interprovincial transport, which falls under the PBSA and is supervised by [[OSFI]]. Each province has its own act and regulator, such as Ontario's Pension Benefits Act, administered by the [[Financial Services Regulatory Authority of Ontario|FSRA]]. A plan registers with the jurisdiction where the largest number of its active members work. The CAPSA agreements on multi-jurisdictional plans decide which jurisdiction's rules apply to what: funding follows the jurisdiction of registration, but each member's benefits follow the law of the jurisdiction where that member works.

## Minimum standards

The acts set rules on eligibility, vesting and locking-in, the portability of a terminating member's [[Commuted Value|commuted value]], joint and survivor pensions for spouses, disclosure to members, plan amendments, and the wind-up and merger of plans. They also require the administrator to keep a written statement of investment policies and procedures, the Canadian form of an [[Investment Policy Statement|investment policy statement]].

## Funding rules

A DB plan files periodic valuations on a [[Going-Concern Valuation|going-concern]] basis and on a solvency basis, and the legislation sets the amortization period $n$ for each kind of deficiency. Paid at the start of each year, the special payment that funds a solvency deficiency $D^{\text{solv}}$ is

> $$SP^{\text{solv}} = \frac{D^{\text{solv}}}{\ddot{a}_{\overline{n}|}}$$

Jurisdictions differ widely. Some fund solvency deficiencies in full over a short period, some fund only below a threshold, and several give [[Multi-Employer Plan|multi-employer]] and target benefit plans their own rules.

> [!example]- What is the annual solvency special payment, with full funding and under an 85% threshold? {Example}
> A plan's solvency liability is $\$50{,}000{,}000$ and its solvency assets are $\$40{,}000{,}000$. The deficiency is amortized over five years by payments at the start of each year at an illustrative 4%. The threshold rule, like Ontario's, funds only the amount needed to bring the plan to 85% solvency-funded.
>
> > [!answer]-
> > - The amortization factor is $\ddot{a}_{\overline{5}|4\%} = 4.62990$.
> > - With full funding the deficiency is $50{,}000{,}000 - 40{,}000{,}000 = \$10{,}000{,}000$, and the payment is $10{,}000{,}000/4.62990 = \$2{,}159{,}876$.
> > - Under the threshold the deficiency is $0.85(50{,}000{,}000) - 40{,}000{,}000 = \$2{,}500{,}000$.
> > - The payment is $2{,}500{,}000/4.62990 = \$539{,}969$, a quarter of the full-funding payment.
> > - The members carry the risk of the unfunded 15%.

> [!trap] Funding to 100% under a threshold rule
> Where the legislation funds solvency deficiencies only below a threshold, the special payment covers the gap to the threshold, not to 100%. Where it requires full funding, funding only to the threshold understates the payment.

## Tax legislation

The Income Tax Act caps the lifetime pension a registered DB plan can pay per year of service, limits the contributions an employer can deduct, and stops employer contributions once the plan's surplus is too large. The pension adjustment (PA) system makes the tax shelter about equal across members of DB plans, members of DC plans and people who save only in RRSPs. Under a [[Defined Benefit Plan|DB]] provision, the PA the plan reports for a member is

> $$PA = 9 \times BE - 600$$

- $BE$ is the member's benefit entitlement, the pension accrued in the year.

In a [[Defined Contribution Plan|money purchase]] provision the PA is the contributions made for the member instead. The PA reduces the member's room in a registered retirement savings plan. Ignoring carryforwards and the other adjustments, the RRSP room for year $t$ is

> $$\text{RRSP room}_{t} = \min\left(0.18\,E_{t-1},\ \text{RRSP limit}_{t}\right) - PA_{t-1}$$

- $E_{t-1}$ is the previous year's earned income.

This year's room depends on last year's earned income and last year's PA. Past-service pension adjustments and pension adjustment reversals correct the PA when past benefits are upgraded or forfeited.

> [!example]- What are this member's pension adjustment and RRSP room for the following year? {Example}
> A member earns $\$90{,}000$ in a year and accrues a DB pension of 1.5% of earnings for that year. The RRSP dollar limit does not bind and there is no unused room carried forward.
>
> > [!answer]-
> > - The benefit entitlement is $BE = 0.015 \times 90{,}000 = \$1{,}350$.
> > - The pension adjustment is $9 \times 1{,}350 - 600 = \$11{,}550$.
> > - The RRSP room is $0.18 \times 90{,}000 - 11{,}550 = \$4{,}650$.
> > - A member with no pension plan would have the full $\$16{,}200$ of room, so the DB member's combined shelter is about the same.

## Regulatory policies and actuarial standards

Regulators publish policies and guidance notes on how they apply the act. CAPSA publishes guidelines adopted across jurisdictions, such as those on capital accumulation plans, prudent investment practices and funding policy. The CIA's Standards of Practice govern the actuary's work: the general standards and the pension standards, including the rules for computing commuted values. The CIA's educational notes, such as its regular note on assumptions for solvency and hypothetical wind-up valuations, guide the assumptions used under the legislation.

## Termination and wind-up

The legislation decides when a plan is wound up, how benefits are settled, who funds a deficiency and who may receive a surplus, as described under [[Plan Termination|plan termination]].
