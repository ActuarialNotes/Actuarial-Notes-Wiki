---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3b31d5ed2550ab62b5dfb1790d9a886f1c75d36681e68c23f9483ebccb4f99fc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Plan Sponsor.md
---
A **Plan Sponsor** is the employer, group of employers, union or joint board that establishes a benefit plan, such as a [[Retirement Plan|retirement plan]] or a retiree health or group benefits program, chooses its [[Plan Design|plan design]], pays for it and carries the risk the design leaves with it. In a [[Defined Benefit Plan|defined benefit plan]] the sponsor's contribution is the balancing item that keeps the promised benefits funded.

A sponsor holds four roles whose interests can conflict:

1. Plan designer.
2. Funder, setting the [[Funding Policy|funding policy]] within regulatory limits.
3. Fiduciary or administrator.
4. Employer.

## The sponsor's contribution

The unfunded liability at time $t$ is

> $$UAL_t = AL_t - F_t$$

- $AL_t$ is the [[Actuarial Accrued Liability|actuarial accrued liability]].
- $F_t$ is the fund's assets.

A negative $UAL_t$ is a surplus. When the deficit is amortized over $m$ years with payments at the start of each year, the total contribution is

> $$C_t = NC_t + \frac{UAL_t}{\ddot{a}_{\overline{m}|}}$$

- $NC_t$ is the [[Normal Cost|normal cost]].
- $\ddot{a}_{\overline{m}|}$ is the [[Annuity Due|annuity-due]] factor for $m$ years at the valuation rate.

Legislation and the funding policy fix $m$ and the valuation basis. When members contribute, the sponsor's contribution is

> $$C^{\text{sponsor}}_t = C_t - C^{\text{member}}_t$$

- $C^{\text{member}}_t$ is the members' contribution.

Only the sponsor's share absorbs gains and losses.

> [!example]- What is this sponsor's contribution as a percent of payroll? {Example}
> A plan's actuarial liability is $\$120{,}000{,}000$ and its assets are $\$105{,}000{,}000$. The normal cost is $\$6{,}000{,}000$ and payroll is $\$60{,}000{,}000$, of which members contribute 5%. The deficit is amortized over 15 years at 5%, with payments at the start of each year.
>
> > [!answer]-
> > - The unfunded liability is $120{,}000{,}000 - 105{,}000{,}000 = 15{,}000{,}000$.
> > - The amortization factor is $\ddot{a}_{\overline{15}|} = (1 - 1.05^{-15})/(0.05/1.05) = 10.8986$.
> > - The total contribution is $6{,}000{,}000 + 15{,}000{,}000/10.8986 = 7{,}376{,}318$.
> > - Members contribute $0.05 \times 60{,}000{,}000 = 3{,}000{,}000$.
> > - The sponsor contributes $7{,}376{,}318 - 3{,}000{,}000 = \$4{,}376{,}318$, or 7.29% of payroll.

## Risks the sponsor bears

In a defined benefit plan the sponsor bears investment, interest-rate, [[Mortality|longevity]] and salary risk, because its contribution is what keeps the promised benefits funded. Plan features such as early retirement subsidies and indexing add risk of their own. These risks surface as contribution volatility, balance-sheet liabilities under accounting standards and cash demands in bad years. In a [[Defined Contribution Plan|defined contribution plan]] the sponsor's cost is fixed at the contribution rate times payroll.

Sponsors manage the risk through design (defined contribution or hybrid plans, benefit caps), investment ([[Duration Matching|liability-driven investing]], [[Hedging|hedging]]) and risk transfer (annuity buy-outs to an [[Insurer|insurance company]]).

> [!example]- In the plan above, assets fall 15% before the valuation while the liability is unchanged. How does the sponsor's contribution change? {Example}
> - The assets become $0.85 \times 105{,}000{,}000 = 89{,}250{,}000$.
> - The unfunded liability becomes $120{,}000{,}000 - 89{,}250{,}000 = 30{,}750{,}000$.
> - The total contribution is $6{,}000{,}000 + 30{,}750{,}000/10.8986 = 8{,}821{,}453$.
> - The sponsor contributes $8{,}821{,}453 - 3{,}000{,}000 = 5{,}821{,}453$, or 9.70% of payroll.
> - The members' 5% does not move, so the whole shock is the sponsor's: its contribution rises by $\$1{,}445{,}134$, or 33%.

## Multi-employer plans

The sponsor of a multi-employer plan is usually a joint board of trustees, not an employer. Contributions are often fixed by collective agreement, so benefits, not contributions, absorb shortfalls.

> [!trap] Amortizing with the wrong annuity
> Payments at the start of each year call for an annuity-due, $\ddot{a}_{\overline{m}|}$. An annuity-immediate, or the plan's whole remaining life in place of the stated period $m$, misstates the amortization payment.
