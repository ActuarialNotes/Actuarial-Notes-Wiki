---
aliases:
  - Funding Requirement
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:60812718f4bc11581d83f79d251908a07cb8d7eda83d2dfffc0e7059a45a235e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Self-Insurance Funding.md
---
**Self-Insurance Funding** is the amount a self-insurer, such as a public entity, a [[Self-Insured Retention|self-insured]] employer, a group self-insurance pool or a captive, must set aside to pay the claims it retains. The **funding requirement** has two parts: the expected cost of the coming year's claims within the retention, and the [[Unpaid Claims|unpaid claims]] of past years. Each is usually discounted for the investment income the fund will earn and then raised to a chosen confidence level, so that the fund is likely, not merely expected, to be enough.

> $$E\big[L^{(R)}\big] = \text{Exposure} \times \text{Loss rate} \times \text{LF}_R$$

> $$\bar v = \sum_{k} p_k\,(1+r)^{-(k - 1/2)}$$

> $$\text{CF}_q = \frac{\text{VaR}_q(S)}{E[S]}$$

> $$F_q = E\big[L^{(R)}\big] \times \bar v \times \text{CF}_q$$

- **Symbols:** $E[L^{(R)}]$ is the expected loss and allocated expense limited to the per-occurrence retention $R$. $\text{LF}_R$ is the share of unlimited losses that falls below the retention, the limited loss factor. $p_k$ is the share of the year's losses paid in year $k$, assumed paid mid-year, and $r$ is the expected investment yield, so $\bar v$ is the payment-weighted [[Discount Factor|discount factor]]. $S$ is the year's aggregate retained loss, and $\text{CF}_q$ is the confidence-level factor, the $q$-th percentile of $S$ as a multiple of its mean.
- **Exposure, not premium:** A self-insurer collects no premium in an insurer's sense, so the expected loss is built from an exposure base such as payroll, vehicles or property values. The loss rate comes from the entity's own trended and developed experience, credibility-weighted with industry or benchmark data where its volume is thin.
- **The retained layer:** Only losses within the retention are funded here. Excess insurance or reinsurance above $R$, claims administration and other expenses are separate items of the budget, and losses above an aggregate stop-loss are removed as well.
- **Confidence level:** The aggregate distribution of retained losses, often a lognormal or a simulated [[Aggregate Loss Model|aggregate loss model]], gives the margin. Funding at the expected value leaves the fund short about half the time, so boards often choose a level such as 75% or 90%. The choice is a policy decision for the entity, and the actuary shows the cost of each level.
- **Discounting:** Funding for long-tailed lines such as workers compensation and liability is often stated on a [[Loss Reserve Discounting|discounted]] basis, because the money is invested until claims are paid. The discount rate should reflect the yield the fund can realistically expect, and the report should show undiscounted figures too.
- **Fund position:** The assets already held are compared with the discounted unpaid claims of past years at the chosen confidence level. A surplus can reduce future contributions or be returned, and a deficit is usually recovered over a few years of extra contributions.
- **Standards:** In the U.S., the estimate of unpaid claims follows ASOP No. 43, and the projection of the coming year's cost falls under ASOP No. 53 on prospective risk transfer and risk retention. The funding basis differs from financial reporting, which usually carries an unmargined estimate, so the two figures need to be reconciled in the report.

> [!example]- Next Year's Funding for a Municipal Workers Compensation Program {Example}
> A city retains \$500,000 per occurrence for workers compensation and buys excess insurance above it. Next year's payroll is \$80,000,000, the projected loss rate at unlimited value is \$1.50 per \$100 of payroll, and 85% of losses fall below \$500,000. Retained losses are paid 35%, 30%, 20% and 15% in the first four years, at mid-year, and the fund expects to earn 3%. Retained aggregate losses are lognormal with a coefficient of variation of 0.25. Find the funding at the expected level, at 75% and at 90%.
>
> > [!answer]-
> > The expected retained loss and the discount factor come first.
> > $$
> > \begin{align*}
> > E\big[L^{(R)}\big] &= \frac{80{,}000{,}000}{100} \times 1.50 \times 0.85 \\
> > &= 1{,}020{,}000 \\
> > \bar v &= 0.35(0.9853) + 0.30(0.9566) + 0.20(0.9288) + 0.15(0.9017) \\
> > &= 0.95287 \\
> > E\big[L^{(R)}\big]\,\bar v &= 971{,}923
> > \end{align*}
> > $$
> > For a lognormal, $\sigma^2 = \ln(1 + 0.25^2) = 0.060625$ and $\text{CF}_q = \exp(-\sigma^2/2 + \sigma z_q)$, with $\sigma = 0.24622$.
> > $$
> > \begin{align*}
> > \text{CF}_{0.75} &= \exp(-0.030312 + 0.24622 \times 0.67449) \\
> > &= 1.1454 \\
> > \text{CF}_{0.90} &= \exp(-0.030312 + 0.24622 \times 1.28155) \\
> > &= 1.3301 \\
> > F_{0.75} &= 971{,}923 \times 1.1454 \\
> > &= 1{,}113{,}248 \\
> > F_{0.90} &= 971{,}923 \times 1.3301 \\
> > &= 1{,}292{,}726
> > \end{align*}
> > $$
> > The city should budget about \$972,000 at the expected level, \$1,113,000 at 75% and \$1,293,000 at 90%, plus its excess premium and claims administration. Moving from 75% to 90% costs about \$180,000 a year in exchange for a smaller chance of a shortfall.

> [!example]- The Pool's Fund Position for Past Years {Example}
> A self-insurance pool holds \$5,600,000 of assets for prior accident years. Its undiscounted expected unpaid claims are \$5,000,000, the payment-weighted discount factor is 0.93, and its confidence-level factors for unpaid claims are 1.12 at 75% and 1.25 at 90%. The board funds at 75% and returns any assets above the 90% level. Find the fund position.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Expected, discounted} &= 5{,}000{,}000 \times 0.93 \\
> > &= 4{,}650{,}000 \\
> > \text{Required at 75\%} &= 4{,}650{,}000 \times 1.12 \\
> > &= 5{,}208{,}000 \\
> > \text{Level at 90\%} &= 4{,}650{,}000 \times 1.25 \\
> > &= 5{,}812{,}500
> > \end{align*}
> > $$
> > The pool is \$392,000 above its 75% target and \$212,500 below the 90% level, so it is adequately funded and nothing is returned. Measured against the undiscounted expected \$5,000,000 alone, it would look \$600,000 in surplus, which overstates its strength.

> [!tip]- How it appears on the exam
> - **GI-101 (topic 7):** Real-life scenarios end with defining the funding requirement for a self-insurer. The candidate projects the retained losses for the coming year, applies the discount and a confidence level, and explains each choice.
> - **Data and methods:** The same scenarios test reserving for a capped retained layer, the choice of benchmark development patterns when the entity's own data are thin, and how a change in retention affects the triangle.
> - **Written answers:** Questions ask why a self-insurer funds above the expected value, how the confidence level and discount rate affect the contribution, and how funding differs from the liability in the financial statements.

> [!warning]- Exam traps
> - **Unlimited losses:** Funding the full expected loss without the limited loss factor charges the self-insurer for losses its excess insurer pays. Only the layer below the retention is funded here.
> - **Gross payment pattern:** The discount factor needs the payment pattern of the retained layer. Large claims are capped at the retention, so retained losses are paid faster than unlimited losses, and a gross pattern overstates the discount and understates the funding.
> - **Confidence factor from the wrong distribution:** The factor depends on the coefficient of variation of the retained aggregate loss, not of a single claim. A higher retention or a smaller entity gives a wider distribution and a larger factor.
> - **Funding versus reporting:** A discounted, margined funding figure is not the liability reported in the entity's financial statements. Mixing the two misstates both the surplus and the contribution.
