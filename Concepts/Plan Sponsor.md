---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:27d6cb1b99205d14d7ae4a8cdc9cd0f045157ae2c64bfeb4e6c5bf44da99da68
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Plan Sponsor.md
---

A **Plan Sponsor** is the employer, group of employers, union or joint board that establishes a benefit plan — a [[Retirement Plan]], or a retiree health or group benefits program — chooses its [[Plan Design]], pays for it, and carries the risk the design leaves with it. In a [[Defined Benefit Plan]] the sponsor's contribution is the balancing item that keeps the promised benefits funded.

> $$UAL_t = AL_t - F_t$$

> $$C_t = NC_t + \frac{UAL_t}{\ddot{a}_{\overline{m}|}}$$

> $$C^{\text{sponsor}}_t = C_t - C^{\text{member}}_t$$

- **Symbols:** $AL_t$ is the [[Actuarial Accrued Liability]] and $F_t$ the fund's assets, so $UAL_t$ is the unfunded liability (a surplus if negative); $NC_t$ is the [[Normal Cost]]; the deficit is amortized over $m$ years with payments at the start of each year. Legislation and the funding policy fix $m$ and the valuation basis.
- **Roles:** plan designer, funder (setting [[Funding|funding policy]] within regulatory limits), fiduciary or administrator, and employer — four hats whose interests can conflict.
- **Risks:** in DB the sponsor bears investment, interest-rate, [[Mortality|longevity]] and salary risk, which surface as contribution volatility, balance-sheet liabilities under accounting standards, and cash demands in bad years. In a [[Defined Contribution Plan]] its cost is fixed at the contribution rate times payroll.
- Sponsors manage the risk through design (DC or hybrid plans, benefit caps), investment ([[Duration Matching|liability-driven investing]], [[Hedging]]) and risk transfer (annuity buy-outs to an [[Insurance Company]]).

> [!example]- The Sponsor's Contribution with a Deficit {Example}
> A plan's actuarial liability is \$120{,}000{,}000 and its assets \$105{,}000{,}000. The normal cost is \$6{,}000{,}000 and payroll is \$60{,}000{,}000, of which members contribute 5%. The deficit is amortized over 15 years at 5%, payments at the start of each year. Find the sponsor's contribution as a percent of payroll.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \ddot{a}_{\overline{15}|5\%} &= \frac{1 - 1.05^{-15}}{0.05/1.05} \\
> > &= 10.8986 \\
> > C &= 6{,}000{,}000 + \frac{15{,}000{,}000}{10.8986} \\
> > &= 6{,}000{,}000 + 1{,}376{,}318 \\
> > &= 7{,}376{,}318
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > C^{\text{sponsor}} &= 7{,}376{,}318 - 0.05 \times 60{,}000{,}000 \\
> > &= 4{,}376{,}318 \\
> > &= 7.29\% \text{ of payroll}
> > \end{align*}
> > $$

> [!example]- An Asset Shock Hits the Sponsor's Cash Flow {Example}
> In the plan above, assets fall 15% before the valuation while the liability is unchanged. Recompute the sponsor's contribution and its change.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > F &= 0.85 \times 105{,}000{,}000 \\
> > &= 89{,}250{,}000 \\
> > UAL &= 120{,}000{,}000 - 89{,}250{,}000 \\
> > &= 30{,}750{,}000 \\
> > C &= 6{,}000{,}000 + \frac{30{,}750{,}000}{10.8986} \\
> > &= 8{,}821{,}453
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > C^{\text{sponsor}} &= 8{,}821{,}453 - 3{,}000{,}000 \\
> > &= 5{,}821{,}453 \\
> > &= 9.70\% \text{ of payroll}
> > \end{align*}
> > $$
> > A 15% market fall raises the sponsor's contribution by \$1{,}445{,}134, or 33% — the members' 5% does not move, so the whole shock is the sponsor's.

> [!tip]- How it appears on the exam
> - **RET-101** asks how plan features, temporary or permanent, can adversely affect the sponsor, and how to identify and prioritize the sponsor's goals — written answers, often with a case study.
> - **RET-201** asks for advice to sponsors on funding options, accounting methods and disclosures, and mitigating investment risk; **RET-301** asks you to evaluate funding alternatives for the sponsor, shareholders and participants under Canadian pension legislation.
> - **CP-321** asks for advice to a sponsor choosing the design of a retiree health program; **GH-201C** and **GH-201U** for the impact of regulation (and, in Canada, taxation) on plan sponsors.

> [!warning]- Exam traps
> - Charging the whole contribution to the sponsor when members contribute: the sponsor's share is $C$ less member contributions, and only it absorbs gains and losses.
> - Amortizing with an annuity-immediate when payments are at the start of the year, or using the plan's whole remaining life instead of the stated period $m$.
> - Answering "the employer" when asked for a multi-employer plan's sponsor: it is usually a joint board of trustees, and contributions are often fixed by collective agreement, so benefits — not contributions — absorb shortfalls.
> - Listing only investment risk: a written answer on sponsor risk should also name longevity, interest-rate, salary and plan-design risks (early retirement subsidies, indexing).
