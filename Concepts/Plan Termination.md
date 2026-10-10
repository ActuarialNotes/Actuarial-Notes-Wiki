---
aliases:
  - Wind-Up
  - Termination-wind-up
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:993ecb550cf89dc82c8d3c5f05b018418c7ba7dca9df3e33bea41ff6cc6781d7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Plan Termination.md
---
**Plan Termination** is the ending of a [[Defined Benefit Plan|defined benefit]] [[Pension Plan|pension plan]], called a **wind-up** in Canada: benefit accrual stops, every member's benefit is fixed at the termination date, and the plan's assets are used to settle the benefits, by buying annuities from an insurer or paying commuted values. The plan's position is measured by a wind-up valuation at settlement prices, and an ongoing Canadian plan is also valued as if it were wound up today, in a solvency or hypothetical wind-up valuation.

> $$L^{WU} = \sum_{\text{annuities}} P_k\,\ddot{a}_k^{\text{ins}} + \sum_{\text{lump sums}} CV_k$$

> $$TR = \frac{A - X}{L^{WU}}$$

> $$D^{WU} = L^{WU} + X - A$$

> $$\text{Paid now}_k = \min(TR,\ 1) \times CV_k$$

- **Symbols:** $L^{WU}$ is the wind-up liability. $P_k$ is a pension to be settled by an annuity purchase, $\ddot{a}_k^{\text{ins}}$ is the insurer's purchase price per \$1 of annual pension, and $CV_k$ is a commuted value, calculated under the CIA's standard of practice for pension commuted values. $A$ is the market value of the assets, $X$ is the expected cost of winding up, $TR$ is the transfer ratio and $D^{WU}$ is the wind-up deficiency.
- **Full and partial wind-up:** A full wind-up ends the plan for all members. A partial wind-up, where a jurisdiction still recognizes one, applies the wind-up rules to the members affected by an event such as a plant closure while the plan continues for the rest.
- **The wind-up valuation:** On wind-up each member's benefits vest, the actuary values them on the settlement basis, and members choose between the options the law allows, usually a commuted value transferred out or a deferred or immediate annuity bought from an insurer. Benefits that only arise on termination, such as Ontario's grow-in rights for members whose age plus service reaches a threshold, are included.
- **Deficits and surplus:** In Canada a sponsor that winds up an underfunded single-employer plan must generally fund the deficiency, over a period the legislation allows. A surplus belongs to whoever the plan documents and the law say it does, and an employer that wants it must apply to the regulator, usually with the members' consent.
- **The transfer ratio:** When the assets don't cover the liability, a member taking a commuted value receives only the transfer-ratio share of it now, and the rest once the deficiency is funded. This keeps the members who leave first from draining the fund at the expense of those who stay.
- **Solvency and hypothetical wind-up valuations:** An ongoing Canadian plan is also valued as if it were wound up on the valuation date, with no future salary increases or service, settlement-based discount rates and wind-up expenses. The hypothetical wind-up liability includes every benefit payable on wind-up. The solvency liability is that liability less the benefits the legislation lets the plan exclude, such as indexation in some jurisdictions, and it drives the solvency funding test under [[Canadian Pension Legislation|Canadian pension legislation]].
- **U.S. terminations:** Under ERISA a single-employer plan can end in a standard termination only if its assets cover all benefit liabilities, which are then settled by annuities or lump sums. A sponsor in financial distress can apply for a distress termination, and the PBGC can also terminate a plan itself. In either of those cases the PBGC takes over the plan and pays the benefits it guarantees, up to its limits.
- **Accounting:** A termination is usually a settlement and often a curtailment under the pension accounting standards, so the sponsor recognizes gains and losses that would otherwise have been deferred.

> [!example]- Settling a Wind-Up With a Deficiency {Example}
> A plan is wound up. Retirees receive \$1,200,000 a year in pensions, and an insurer quotes an illustrative \$14.50 per \$1 of annual pension to buy their annuities. The other members' benefits are worth \$12,000,000 for those electing commuted values and \$6,000,000 for those electing deferred annuities. The assets are \$31,000,000 at market value and wind-up expenses are expected to be \$400,000. Find the wind-up liability, the transfer ratio and the deficiency, and what a member with a commuted value of \$200,000 receives now.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > L^{WU} &= 1{,}200{,}000(14.50) + 12{,}000{,}000 + 6{,}000{,}000 \\
> > &= 35{,}400{,}000 \\
> > TR &= \frac{31{,}000{,}000 - 400{,}000}{35{,}400{,}000} \\
> > &= 86.44\% \\
> > D^{WU} &= 35{,}400{,}000 + 400{,}000 - 31{,}000{,}000 \\
> > &= 4{,}800{,}000 \\
> > \text{Paid now} &= 0.86441(200{,}000) \\
> > &= 172{,}881
> > \end{align*}
> > $$
> > The member receives \$172,881 now and the remaining \$27,119 once the employer has paid the \$4,800,000 deficiency into the fund. Paying the full commuted value at once would leave less than 86.44% of their benefits for the members still waiting for settlement.

> [!example]- Solvency and Hypothetical Wind-Up Ratios {Example}
> An ongoing plan's hypothetical wind-up liability is \$40,000,000, of which \$5,000,000 is the value of indexation that the governing legislation lets the plan exclude from its solvency liability. The assets, net of wind-up expenses, are \$34,000,000. Find the two ratios and the solvency deficiency.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{HWU ratio} &= \frac{34{,}000{,}000}{40{,}000{,}000} \\
> > &= 85.0\% \\
> > \text{Solvency ratio} &= \frac{34{,}000{,}000}{35{,}000{,}000} \\
> > &= 97.1\% \\
> > \text{Deficiency} &= 35{,}000{,}000 - 34{,}000{,}000 \\
> > &= 1{,}000{,}000
> > \end{align*}
> > $$
> > The solvency deficiency of \$1,000,000 sets the solvency funding requirement, while the hypothetical wind-up ratio of 85.0% tells members what share of all their benefits, indexation included, the fund could settle today.

> [!tip]- How it appears on the exam
> - **RET-301 special purposes:** Candidates prepare valuation results for a plan termination or wind-up. Questions give member data, annuity purchase prices or commuted value bases, and assets, and ask for the liabilities, the transfer ratio, the deficiency and what each member receives, together with the legislative rules on wind-up and on paying out a surplus.
> - **RET-301 solvency and hypothetical wind-up:** Candidates differentiate these valuations from going-concern funding and from an actual wind-up, explaining which benefits each includes, which assumptions it uses and how the legislation turns the result into required contributions.

> [!warning]- Exam traps
> - **Going-concern assumptions on wind-up:** A wind-up liability has no future salary increases and uses annuity purchase and commuted value bases. Projecting pay or discounting at the expected return on assets understates it.
> - **Forgetting expenses:** Wind-up expenses reduce the assets available for benefits. Leaving them out overstates the transfer ratio and understates the deficiency.
> - **Solvency is not hypothetical wind-up:** The solvency liability excludes the benefits the legislation allows, so the solvency ratio is the higher of the two. Quoting it as the share of all benefits the plan could settle overstates member security.
> - **Full commuted values from an underfunded plan:** A member electing a commuted value from a plan with a transfer ratio below 1 receives only the transfer-ratio share at once. Paying 100% is the error the rule exists to prevent.
