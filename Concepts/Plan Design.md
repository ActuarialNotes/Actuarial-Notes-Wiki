---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:58f79fa074de6c1cc8e81fe3f752d23e2368d356b89d87040abaff9ec15c4e19
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Plan Design.md
---

**Plan Design** is the set of rules that defines what a [[Retirement Plan]] pays and to whom — plan type ([[Defined Benefit Plan|DB]], [[Defined Contribution Plan|DC]] or hybrid), benefit or contribution formula, eligibility, vesting, normal and early retirement ages, indexation, forms of payment and ancillary benefits — chosen by the [[Plan Sponsor]] to meet its goals for adequacy, cost, risk and competitiveness within legal and tax limits. Each feature also fixes who bears which risk and shapes the plan's cash flows, cost and investment strategy.

> $$R^{*} = R_{\text{plan}} + R_{\text{gov}}$$

> $$\alpha = \frac{R^{*} - R_{\text{gov}}}{n}$$

> $$B_{y} = B \left(1 - r\,(NRA - y)\right)$$

- **Designing to a target.** A sponsor starts from a target total replacement ratio $R^{*}$, nets off government benefits $R_{\text{gov}}$ ([[Social Insurance|integration with social security]]), and solves for the accrual rate $\alpha$ over a career of $n$ years — or, in DC, for the contribution rate.
- **Early retirement.** $B_y$ is the accrued pension $B$ starting at age $y$ before the normal retirement age $NRA$, reduced by $r$ per year early. A reduction smaller than the actuarially equivalent one is a **subsidy** — an embedded option the member exercises against the sponsor.
- **Other levers:** vesting (when the accrued benefit becomes the member's), indexation (protection from inflation, at the sponsor's cost in DB), the normal form of payment (single or joint-and-survivor [[Life Annuity]], lump sum), and eligibility. Each changes the plan's liability duration and [[Funding|funding]] pattern.
- Design and investment interact: a younger, DC-heavy or indexed plan supports different asset strategies than a closed, mature DB plan paying out to [[Retiree|retirees]].

> [!example]- Setting the Accrual Rate for an Integrated Plan {Example}
> A sponsor wants a 70% total replacement ratio for a member who retires with 35 years' service. At this salary level the government pension replaces 25% of final salary. What FAS accrual rate meets the target?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \alpha &= \frac{0.70 - 0.25}{35} \\
> > &= 1.286\%
> > \end{align*}
> > $$
> > A 1.29% accrual over 35 years supplies 45 points of replacement; the government plan supplies the other 25.

> [!example]- Is the Early Retirement Reduction a Subsidy? {Example}
> A member aged 60 has an accrued pension of \$20{,}000 a year payable from 65, annually in advance. The plan lets them start now with a 3% reduction per year early. On the SUSM at 5%: $\ddot{a}_{60} = 14.9041$, $\ddot{a}_{65} = 13.5498$, ${}_5E_{60} = 0.76687$. Find the actuarially equivalent reduction factor and the value of the subsidy.
>
> > [!answer]-
> > Equate the value of the deferred pension to that of an immediate one:
> > $$
> > \begin{align*}
> > f &= \frac{{}_5E_{60}\,\ddot{a}_{65}}{\ddot{a}_{60}} \\
> > &= \frac{0.76687 \times 13.5498}{14.9041} \\
> > &= 0.69719
> > \end{align*}
> > $$
> > The plan pays $1 - 5(0.03) = 0.85$ instead.
> > $$
> > \begin{align*}
> > \text{EPV}_{\text{deferred}} &= 20{,}000 \times 0.76687 \times 13.5498 \\
> > &= 207{,}819 \\
> > \text{EPV}_{\text{early}} &= 20{,}000 \times 0.85 \times 14.9041 \\
> > &= 253{,}370 \\
> > \text{Subsidy} &= 253{,}370 - 207{,}819 \\
> > &= 45{,}551
> > \end{align*}
> > $$
> > The 3% reduction is far gentler than the 30% an equivalent factor implies, so retiring at 60 is worth 21.9% more to the member — a cost the sponsor carries.

> [!tip]- How it appears on the exam
> - **RET-201** asks how cash flow requirements and different plan designs (a closed DB plan, an indexed plan, a DC or hybrid plan) affect the plan's investment strategy — written answers linking design to liability duration and liquidity.
> - **RET-101** asks you to evaluate alternative plan types and features against a sponsor's goals and recommend a design, and to state where the sponsor's goals and the taxpayers' perspective conflict.
> - **ALTAM** calculates the consequences of design choices: replacement ratios under FAS, CAE and CARE formulas, and benefits on early exit.

> [!warning]- Exam traps
> - Calling any reduction factor below 1 "actuarially reduced": a reduction is a subsidy whenever it is smaller than ${}_kE_y\,\ddot{a}_{NRA}/\ddot{a}_y$ — here 15% versus about 30%.
> - Netting government benefits off at the wrong salary: integration is set at a salary level, so a high earner's $R_{\text{gov}}$ is smaller and the same $\alpha$ under-replaces them.
> - Treating indexation as free in DB: it raises the liability and the plan's sensitivity to inflation, and the sponsor carries it unless indexing is conditional on funding.
> - Recommending a design without tying it to the stated goals: a RET-101 answer that lists features but not why each meets (or misses) the sponsor's priority earns little.
