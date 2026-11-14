---
aliases:
  - Funding Requirement
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7e50c95f7d6b9e62f47b9a579dd59b85585a1a4f23bf5bfbb22dda52a12f80e2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Self-Insurance Funding.md
---

**Self-Insurance Funding** is the amount a self-insurer, such as a public entity, a [[Self-Insured Retention|self-insured]] employer, a group self-insurance pool or a captive, must set aside to pay the claims it retains. The **funding requirement** has two parts: the expected cost of the coming year's claims within the retention, and the [[Unpaid Claims|unpaid claims]] of past years. Each is usually discounted for the investment income the fund will earn and then raised to a chosen confidence level, so that the fund is likely, not merely expected, to be enough.

At confidence level $q$, the funding for the coming year is

> $$F_q = E\big[L^{(R)}\big] \times \bar v \times \text{CF}_q$$

- $E[L^{(R)}]$ is the expected loss and allocated expense limited to the per-occurrence retention $R$.
- $\bar v$ is the payment-weighted [[Discount Factor|discount factor]].
- $\text{CF}_q$ is the confidence-level factor.

## Expected retained loss

A self-insurer collects no premium in an insurer's sense, so the expected loss is built from an exposure base such as payroll, vehicles or property values. The expected retained loss is

> $$E\big[L^{(R)}\big] = \text{Exposure} \times \text{Loss rate} \times \text{LF}_R$$

- $\text{LF}_R$ is the limited loss factor, the share of unlimited losses that falls below the retention.

The loss rate comes from the entity's own trended and developed experience, credibility-weighted with industry or benchmark data where its volume is thin. Only losses within the retention are funded here. Excess insurance or reinsurance above $R$, claims administration and other expenses are separate items of the budget, and losses above an aggregate stop-loss are removed as well.

## Discounting for investment income

Funding for long-tailed lines such as workers compensation and liability is often stated on a [[Loss Reserve Discounting|discounted]] basis, because the money is invested until claims are paid. With payments assumed at mid-year, the discount factor is

> $$\bar v = \sum_{k} p_k\,(1+r)^{-(k - 1/2)}$$

- $p_k$ is the share of the year's retained losses paid in year $k$.
- $r$ is the expected investment yield.

The discount rate should reflect the yield the fund can realistically expect, and the report should show undiscounted figures too. The payment pattern is that of the retained layer. Large claims are capped at the retention, so retained losses are paid faster than unlimited losses, and a gross pattern overstates the discount and understates the funding.

## Confidence level

Funding at the expected value leaves the fund short about half the time, so boards often choose a level such as 75% or 90%. The choice is a policy decision for the entity, and the actuary shows the cost of each level. The confidence-level factor is

> $$\text{CF}_q = \frac{\text{VaR}_q(S)}{E[S]}$$

- $S$ is the year's aggregate retained loss.
- $\text{VaR}_q(S)$ is the $q$-th percentile of $S$.

The distribution of $S$, often a lognormal or a simulated [[Aggregate Loss Model|aggregate loss model]], gives the margin. The factor depends on the coefficient of variation of the retained aggregate loss, not of a single claim. A higher retention or a smaller entity gives a wider distribution and a larger factor.

> [!example]- What should this city fund for next year's workers compensation at the expected level, at 75% and at 90%? {Example}
> A city retains \$500,000 per occurrence for workers compensation and buys excess insurance above it. Next year's payroll is \$80,000,000, the projected loss rate at unlimited value is \$1.50 per \$100 of payroll, and 85% of losses fall below \$500,000. Retained losses are paid 35%, 30%, 20% and 15% in the first four years, at mid-year, and the fund expects to earn 3%. Retained aggregate losses are lognormal with a coefficient of variation of 0.25.
>
> > [!answer]-
> > - The expected retained loss is $800{,}000 \times 1.50 \times 0.85 = \$1{,}020{,}000$.
> > - The discount factors are $0.9853$, $0.9566$, $0.9288$ and $0.9017$, so $\bar v = 0.35(0.9853) + 0.30(0.9566) + 0.20(0.9288) + 0.15(0.9017) = 0.95287$.
> > - At the expected level, the funding is $1{,}020{,}000 \times 0.95287 = \$971{,}923$.
> > - For the lognormal, $\sigma^2 = \ln(1 + 0.25^2) = 0.060625$, so $\sigma = 0.24622$.
> > - The factor is $\text{CF}_q = \exp(-\sigma^2/2 + \sigma z_q)$, where $z_q$ is the standard normal percentile.
> > - $\text{CF}_{0.75} = \exp(-0.030312 + 0.24622 \times 0.67449) = 1.1454$, so $F_{0.75} = \$1{,}113{,}248$.
> > - $\text{CF}_{0.90} = \exp(-0.030312 + 0.24622 \times 1.28155) = 1.3301$, so $F_{0.90} = \$1{,}292{,}726$.
> > - The city should budget about \$972,000 at the expected level, \$1,113,000 at 75% and \$1,293,000 at 90%, plus its excess premium and claims administration.
> > - Moving from 75% to 90% costs about \$180,000 a year for a smaller chance of a shortfall.

## Fund position for past years

The assets already held are compared with the discounted unpaid claims of past years at the chosen confidence level. A surplus can reduce future contributions or be returned, and a deficit is usually recovered over a few years of extra contributions.

> [!example]- What is this pool's fund position for its past years? {Example}
> A self-insurance pool holds \$5,600,000 of assets for prior accident years. Its undiscounted expected unpaid claims are \$5,000,000, the payment-weighted discount factor is 0.93, and its confidence-level factors for unpaid claims are 1.12 at 75% and 1.25 at 90%. The board funds at 75% and returns any assets above the 90% level.
>
> > [!answer]-
> > - The expected discounted unpaid claims are $5{,}000{,}000 \times 0.93 = \$4{,}650{,}000$.
> > - The requirement at 75% is $4{,}650{,}000 \times 1.12 = \$5{,}208{,}000$.
> > - The level at 90% is $4{,}650{,}000 \times 1.25 = \$5{,}812{,}500$.
> > - The pool is \$392,000 above its 75% target and \$212,500 below the 90% level, so it is adequately funded and nothing is returned.
> > - Against the undiscounted expected \$5,000,000 alone, it would look \$600,000 in surplus, which overstates its strength.

## Funding and financial reporting

In the U.S., the estimate of unpaid claims follows ASOP No. 43, and the projection of the coming year's cost falls under ASOP No. 53 on prospective risk transfer and risk retention. The funding basis differs from financial reporting, which usually carries an unmargined estimate. A discounted, margined funding figure is not the liability reported in the entity's financial statements, so the two figures need to be reconciled in the report.

> [!trap] Funding the unlimited losses
> Funding the full expected loss without the limited loss factor charges the self-insurer for losses its excess insurer pays. In the city's example, the unlimited expected loss of \$1,200,000 is \$180,000 more than the retained \$1,020,000.
