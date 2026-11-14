---
aliases:
  - Wind-Up
  - Termination-wind-up
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:47cdf72640c713148afeee25b3232144eda684e432cebd28b476c865eb1af7b8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Plan Termination.md
---
**Plan Termination** is the ending of a [[Defined Benefit Plan|defined benefit]] [[Pension Plan|pension plan]], called a **wind-up** in Canada. Benefit accrual stops, every member's benefit is fixed at the termination date, and the plan's assets are used to settle the benefits by buying annuities from an insurer or paying commuted values.

A full wind-up ends the plan for all members. A partial wind-up, where a jurisdiction still recognizes one, applies the wind-up rules to the members affected by an event such as a plant closure while the plan continues for the rest.

## The wind-up valuation

On wind-up each member's benefits vest, the actuary values them on the settlement basis, and members choose between the options the law allows. These are usually a commuted value transferred out or a deferred or immediate annuity bought from an insurer. Benefits that only arise on termination, such as Ontario's grow-in rights for members whose age plus service reaches a threshold, are included. The wind-up liability is

> $$L^{WU} = \sum_{\text{annuities}} P_k\,\ddot{a}_k^{\text{ins}} + \sum_{\text{lump sums}} CV_k$$

- $P_k$ is a pension to be settled by an annuity purchase.
- $\ddot{a}_k^{\text{ins}}$ is the insurer's purchase price per $\$1$ of annual pension.
- $CV_k$ is a [[Commuted Value|commuted value]], calculated under the CIA's standard of practice for pension commuted values.

The wind-up liability has no future salary increases and uses the annuity purchase and commuted value bases, not the expected return on assets. The wind-up deficiency is

> $$D^{WU} = L^{WU} + X - A$$

- $X$ is the expected cost of winding up.
- $A$ is the market value of the assets.

In Canada a sponsor that winds up an underfunded single-employer plan must generally fund the deficiency, over a period the legislation allows. A surplus belongs to whoever the plan documents and the law say it does, and an employer that wants it must apply to the regulator, usually with the members' consent.

## The transfer ratio

The transfer ratio is

> $$TR = \frac{A - X}{L^{WU}}$$

When the assets don't cover the liability, a member taking a commuted value receives only the transfer-ratio share of it now, and the rest once the deficiency is funded. The amount paid now to member $k$ is

> $$\text{Paid now}_k = \min(TR,\ 1) \times CV_k$$

This keeps the members who leave first from draining the fund at the expense of those who stay.

> [!example]- What are the wind-up liability, transfer ratio and deficiency, and what does this member receive now? {Example}
> A plan is wound up. Retirees receive $\$1{,}200{,}000$ a year in pensions, and an insurer quotes an illustrative $\$14.50$ per $\$1$ of annual pension to buy their annuities. The other members' benefits are worth $\$12{,}000{,}000$ for those electing commuted values and $\$6{,}000{,}000$ for those electing deferred annuities. The assets are $\$31{,}000{,}000$ at market value, and wind-up expenses are expected to be $\$400{,}000$. One member has a commuted value of $\$200{,}000$.
>
> > [!answer]-
> > - The wind-up liability is $L^{WU} = 1{,}200{,}000(14.50) + 12{,}000{,}000 + 6{,}000{,}000 = \$35{,}400{,}000$.
> > - The transfer ratio is $TR = (31{,}000{,}000 - 400{,}000)/35{,}400{,}000 = 86.44\%$.
> > - The deficiency is $D^{WU} = 35{,}400{,}000 + 400{,}000 - 31{,}000{,}000 = \$4{,}800{,}000$.
> > - The member receives $0.86441 \times 200{,}000 = \$172{,}881$ now.
> > - The remaining $\$27{,}119$ is paid once the employer has paid the $\$4{,}800{,}000$ deficiency into the fund.

## Solvency and hypothetical wind-up valuations

An ongoing Canadian plan is also valued as if it were wound up on the valuation date, with no future salary increases or service, settlement-based discount rates and wind-up expenses. The hypothetical wind-up liability includes every benefit payable on wind-up. The solvency liability is that liability less the benefits the legislation lets the plan exclude, such as indexation in some jurisdictions. It drives the solvency funding test under [[Canadian Pension Legislation|Canadian pension legislation]].

> [!example]- What are this plan's hypothetical wind-up ratio, solvency ratio and solvency deficiency? {Example}
> An ongoing plan's hypothetical wind-up liability is $\$40{,}000{,}000$, of which $\$5{,}000{,}000$ is the value of indexation that the governing legislation lets the plan exclude from its solvency liability. The assets, net of wind-up expenses, are $\$34{,}000{,}000$.
>
> > [!answer]-
> > - The hypothetical wind-up ratio is $34{,}000{,}000/40{,}000{,}000 = 85.0\%$.
> > - The solvency liability is $40{,}000{,}000 - 5{,}000{,}000 = \$35{,}000{,}000$.
> > - The solvency ratio is $34{,}000{,}000/35{,}000{,}000 = 97.1\%$.
> > - The solvency deficiency is $35{,}000{,}000 - 34{,}000{,}000 = \$1{,}000{,}000$, which sets the solvency funding requirement.
> > - The hypothetical wind-up ratio of 85.0% is the share of all the members' benefits, indexation included, that the fund could settle today.

## U.S. terminations

Under ERISA a single-employer plan can end in a standard termination only if its assets cover all benefit liabilities, which are then settled by annuities or lump sums. A sponsor in financial distress can apply for a distress termination, and the PBGC can also terminate a plan itself. In either of those cases the PBGC takes over the plan and pays the benefits it guarantees, up to its limits.

## Accounting

A termination is usually a settlement and often a curtailment under the pension accounting standards, so the sponsor recognizes gains and losses that would otherwise have been deferred.

> [!trap] Quoting the solvency ratio as the members' security
> The solvency liability excludes the benefits the legislation allows, so the solvency ratio is the higher of the two ratios. Quoting it as the share of all benefits the plan could settle overstates member security. Use the hypothetical wind-up ratio for that.
