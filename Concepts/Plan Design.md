---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f00f3657dc733521b402acd0a80f2681bda3f27e858c79a8473e518961658060
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Plan Design.md
---
**Plan Design** is the set of rules that defines what a [[Retirement Plan|retirement plan]] pays and to whom, chosen by the [[Plan Sponsor|plan sponsor]] to meet its goals for adequacy, cost, risk and competitiveness within legal and tax limits. Each feature also fixes who bears which risk and shapes the plan's cash flows, cost and investment strategy.

A plan's design sets:

1. The plan type: [[Defined Benefit Plan|defined benefit (DB)]], [[Defined Contribution Plan|defined contribution (DC)]] or hybrid.
2. The benefit or contribution formula.
3. Eligibility.
4. Vesting, when the accrued benefit becomes the member's.
5. The normal and early retirement ages.
6. Indexation, the protection of benefits from inflation.
7. The forms of payment, such as a single or joint-and-survivor [[Life Annuity|life annuity]] or a lump sum.
8. Ancillary benefits.

A recommended design ties each feature to the sponsor's stated goals and says where it meets or misses them. A list of features alone does not.

## Designing to a target replacement ratio

A sponsor starts from a target total replacement ratio $R^{*}$, which is

> $$R^{*} = R_{\text{plan}} + R_{\text{gov}}$$

- $R_{\text{plan}}$ is the share of final salary the plan replaces.
- $R_{\text{gov}}$ is the share government benefits replace, which the plan nets off through [[Social Insurance|integration with social security]].

Over a career of $n$ years, the accrual rate that meets the target, $\alpha$, is

> $$\alpha = \frac{R^{*} - R_{\text{gov}}}{n}$$

In a DC plan the sponsor solves for the contribution rate instead. Integration is set at a salary level, so a high earner's $R_{\text{gov}}$ is smaller and the same $\alpha$ under-replaces them.

> [!example]- What final average salary accrual rate meets this sponsor's target? {Example}
> A sponsor wants a 70% total replacement ratio for a member who retires with 35 years' service. At this salary level the government pension replaces 25% of final salary.
>
> > [!answer]-
> > - The plan must supply $0.70 - 0.25 = 0.45$ of final salary.
> > - Over 35 years, $\alpha = 0.45/35 = 1.286\%$.
> > - A 1.29% accrual over 35 years supplies 45 points of replacement, and the government plan supplies the other 25.

## Early retirement reduction

A member who starts an accrued pension $B$ at age $y$, before the normal retirement age $NRA$, receives the reduced pension

> $$B_{y} = B \left(1 - r\,(NRA - y)\right)$$

- $r$ is the reduction per year early.

The actuarially equivalent reduction factor is ${}_kE_y\,\ddot{a}_{NRA}/\ddot{a}_y$, where $k = NRA - y$. A reduction smaller than the actuarially equivalent one is a subsidy, an embedded option the member exercises against the sponsor.

> [!example]- Is this early retirement reduction a subsidy, and what is it worth? {Example}
> A member aged 60 has an accrued pension of $\$20{,}000$ a year payable from 65, annually in advance. The plan lets the member start now with a 3% reduction per year early. On the SUSM at 5%, $\ddot{a}_{60} = 14.9041$, $\ddot{a}_{65} = 13.5498$ and ${}_5E_{60} = 0.76687$.
>
> > [!answer]-
> > - The actuarially equivalent factor is $0.76687 \times 13.5498/14.9041 = 0.69719$, a reduction of about 30%.
> > - The plan pays $1 - 5 \times 0.03 = 0.85$ instead, so the reduction is a subsidy.
> > - The deferred pension is worth $20{,}000 \times 0.76687 \times 13.5498 = \$207{,}819$.
> > - The early pension is worth $20{,}000 \times 0.85 \times 14.9041 = \$253{,}370$.
> > - The subsidy is $253{,}370 - 207{,}819 = \$45{,}551$, so retiring at 60 is worth 21.9% more to the member, a cost the sponsor carries.

## Plan design and investment strategy

Vesting, indexation, the normal form of payment and eligibility each change the plan's liability duration and [[Funding|funding]] pattern. Indexation in a DB plan raises the liability and the plan's sensitivity to inflation, and the sponsor carries that cost unless indexing is conditional on funding. A younger, DC-heavy or indexed plan supports different asset strategies than a closed, mature DB plan paying out to [[Retiree|retirees]].

> [!trap] Calling any reduction "actuarially reduced"
> A reduction factor below 1 is not automatically actuarial. It is a subsidy whenever the reduction is smaller than the actuarially equivalent one, as the 15% reduction against about 30% above shows.
