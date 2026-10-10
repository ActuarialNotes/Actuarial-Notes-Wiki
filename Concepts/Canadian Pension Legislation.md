---
aliases:
  - Regulatory Policy
  - Tax Legislation
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5ed2a45d3c90ecf076c14452891dcdfc2aca17dc74b0aa4befa365ba22df6b13
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Canadian Pension Legislation.md
---
**Canadian Pension Legislation** is the body of law that governs a registered pension plan in Canada, in two layers. Pension benefits standards legislation, either the federal Pension Benefits Standards Act, 1985 (PBSA) or the act of the province where the members work, sets minimum standards for members' rights and the rules for funding, investment, reporting and wind-up. The federal Income Tax Act and its regulations decide which plans are registered and so tax-sheltered, by capping the benefits and contributions a plan may provide. Regulators' policies, the guidelines of the Canadian Association of Pension Supervisory Authorities (CAPSA) and the [[Canadian Institute of Actuaries (CIA)|CIA's]] standards of practice sit on top.

> $$PA = 9 \times BE - 600$$

> $$\text{RRSP room}_{t} = \min\left(0.18\,E_{t-1},\ \text{RRSP limit}_{t}\right) - PA_{t-1}$$

> $$SP^{\text{solv}} = \frac{D^{\text{solv}}}{\ddot{a}_{\overline{n}|}}$$

- **Symbols:** $BE$ is the member's benefit entitlement, the pension accrued in the year under a [[Defined Benefit Plan|DB]] provision, and $PA$ is the pension adjustment the plan reports for the member. In a [[Defined Contribution Plan|money purchase]] provision the PA is the contributions made for the member instead. $E_{t-1}$ is the previous year's earned income, so the RRSP room formula shows how the PA reduces the member's room in a registered retirement savings plan, ignoring carryforwards and the other adjustments. $D^{\text{solv}}$ is the solvency deficiency to be funded and $n$ the amortization period the legislation sets.
- **Sources and jurisdiction:** Pensions are a provincial matter, except for federally regulated employment such as banking, airlines and interprovincial transport, which falls under the PBSA and is supervised by [[OSFI]]. Each province has its own act and regulator, such as Ontario's Pension Benefits Act, administered by the [[Financial Services Regulatory Authority of Ontario|FSRA]]. A plan registers with the jurisdiction where the largest number of its active members work, and the CAPSA agreements on multi-jurisdictional plans decide which jurisdiction's rules apply to what.
- **Minimum standards:** The acts set rules on eligibility, vesting and locking-in, the portability of a terminating member's commuted value, joint and survivor pensions for spouses, disclosure to members, plan amendments, and the wind-up and merger of plans. They also require the administrator to keep a written statement of investment policies and procedures, the Canadian form of an [[Investment Policy Statement|investment policy statement]].
- **Funding rules:** A DB plan files periodic valuations on a [[Going-Concern Valuation|going-concern]] basis and on a solvency basis, and the legislation sets the amortization periods for each kind of deficiency. Jurisdictions differ widely: some fund solvency deficiencies in full over a short period, some fund only below a threshold, and several give [[Multi-Employer Plan|multi-employer]] and target benefit plans their own rules.
- **Tax legislation:** The Income Tax Act caps the lifetime pension a registered DB plan can pay per year of service, limits the contributions an employer can deduct, and stops employer contributions once the plan's surplus is too large. The pension adjustment system then makes the tax shelter about equal across members of DB plans, members of DC plans and people who save only in RRSPs. Past-service pension adjustments and pension adjustment reversals correct the PA when past benefits are upgraded or forfeited.
- **Regulatory policies:** Regulators publish policies and guidance notes on how they apply the act, and CAPSA publishes guidelines adopted across jurisdictions, such as those on capital accumulation plans, prudent investment practices and funding policy.
- **Actuarial standards:** The CIA's Standards of Practice govern the actuary's work: the general standards and the pension standards, including the rules for computing commuted values. The CIA's educational notes, such as its regular note on assumptions for solvency and hypothetical wind-up valuations, guide the assumptions used under the legislation.
- **Termination and wind-up:** The legislation decides when a plan is wound up, how benefits are settled, who funds a deficiency and who may receive a surplus, as described under [[Plan Termination]].

> [!example]- A DB Member's Pension Adjustment and RRSP Room {Example}
> A member earns \$90,000 in a year and accrues a DB pension of 1.5% of earnings for that year. Find the pension adjustment and the member's RRSP contribution room for the following year, assuming the RRSP dollar limit does not bind and there is no unused room carried forward.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > BE &= 0.015 \times 90{,}000 \\
> > &= 1{,}350 \\
> > PA &= 9 \times 1{,}350 - 600 \\
> > &= 11{,}550 \\
> > \text{Room} &= 0.18 \times 90{,}000 - 11{,}550 \\
> > &= 4{,}650
> > \end{align*}
> > $$
> > The PA values each \$1 of accrued DB pension at about \$9 of savings, less a \$600 offset. A member with no pension plan would have the full \$16,200 of RRSP room, so the DB member's combined shelter is about the same.

> [!example]- Full Solvency Funding and a Threshold Rule {Example}
> A plan's solvency liability is \$50,000,000 and its solvency assets are \$40,000,000. The solvency deficiency is amortized over five years by payments at the start of each year at an illustrative 4%. Find the annual solvency special payment (a) if the full deficiency must be funded, and (b) under a rule like Ontario's, which funds only the amount needed to bring the plan to 85% solvency-funded.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \ddot{a}_{\overline{5}|4\%} &= 4.62990 \\
> > SP^{(a)} &= \frac{50{,}000{,}000 - 40{,}000{,}000}{4.62990} \\
> > &= 2{,}159{,}876 \\
> > D^{(b)} &= 0.85(50{,}000{,}000) - 40{,}000{,}000 \\
> > &= 2{,}500{,}000 \\
> > SP^{(b)} &= \frac{2{,}500{,}000}{4.62990} \\
> > &= 539{,}969
> > \end{align*}
> > $$
> > The threshold cuts the solvency payment by three-quarters. The plan's members carry the risk of the unfunded 15%, which is why a threshold rule is usually paired with a stronger going-concern basis, such as a required margin for adverse deviation.

> [!tip]- How it appears on the exam
> - **RET-301 assumptions and methods:** Candidates select funding assumptions and prepare valuation results, including the required contributions, under the legislation, regulatory policies, tax rules and CIA standards. Questions combine going-concern and solvency results with the jurisdiction's amortization rules.
> - **RET-301 regulations:** Candidates describe the sources and framework of regulation and apply the legislation, regulatory policies and tax rules to plan design, establishment, members' rights, contributions and benefits, amendments, wind-up, mergers and spin-offs, reporting and individual savings plans. Calculations include pension adjustments, maximum pensions and RRSP room.
> - **RET-301 plan funding:** Candidates evaluate funding alternatives for the sponsor, shareholders and members, and the funding restrictions the regulations impose, including the tax limits on contributions when the plan is in surplus.

> [!warning]- Exam traps
> - **Wrong jurisdiction:** A plan is governed by the jurisdiction of registration for funding, but each member's benefits follow the law of the jurisdiction where that member works. A multi-jurisdictional plan can apply several provinces' rules at once.
> - **PA formula by plan type:** The $9 \times BE - 600$ formula applies to a DB provision. Using it for a money purchase provision, whose PA is the contributions, gives the wrong room.
> - **Room lags a year:** This year's RRSP room depends on last year's earned income and last year's PA. Using the current year's figures mixes two years.
> - **Funding the whole deficiency:** Where the legislation funds solvency deficiencies only below a threshold, the special payment covers the gap to the threshold, not to 100%. Where it requires full funding, the reverse error understates the payment.
