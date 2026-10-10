---
aliases:
  - Principles-Based Reserve
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c22ffc396d5952017f6b782b1705c8c4bb2e2dbcb46ca2c36a4b4208017d6975
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Principles-Based Reserving.md
---
**Principles-Based Reserving** (PBR) is the U.S. [[Statutory Accounting Principles|statutory]] approach that sets a life insurer's reserves by projecting the cash flows of its own business on the company's own assumptions, with prudent margins, rather than only by formulas with prescribed mortality and interest. The NAIC's Valuation Manual sets it out, in VM-20 for life insurance, VM-21 for variable annuities and VM-22 for non-variable annuities. Under VM-20 the reserve is the larger of a formulaic net premium reserve and two modelled reserves, so the formula sets a floor and the models capture risks the formula misses.

> $$\text{Reserve} = \text{NPR} + \max\left(0,\ \max(\text{DR}, \text{SR}) - \text{NPR}\right)$$

> $$\text{SR} = \text{CTE}_{70}\left(\text{scenario reserves}\right)$$

> $$\text{Prudent estimate} = \text{Anticipated experience} + \text{Margin}$$

- **Symbols:** NPR is the net premium reserve, a formulaic reserve computed policy by policy with prescribed mortality, interest and lapse rates. DR is the deterministic reserve, the present value of the projected benefits, expenses and other outflows less premiums and other inflows under one prescribed economic scenario, on prudent estimate assumptions. SR is the stochastic reserve. $\text{CTE}_{70}$ is the average of the worst 30% of the scenario reserves, each of which is the amount of starting assets needed for the projection to stay solvent in that scenario.
- **Exclusion tests:** A group of policies that passes the stochastic exclusion test has little interest-rate or asset risk, so the company need not compute the SR for it. A group that also passes the deterministic exclusion test need not compute the DR, and holds the NPR alone. The tests keep the modelling effort where the risk is.
- **Prudent estimate assumptions:** Each assumption starts from the company's anticipated experience, from its own [[Experience Study|experience studies]] blended with industry tables by credibility, and adds a margin for uncertainty. Mortality grades from company experience to an industry table as the data run out, and some assumptions, such as the economic scenarios and asset default costs, are prescribed.
- **VM-21 and VM-22:** For variable annuities, VM-21 sets the reserve from a stochastic CTE calculation of the guarantees, with a standard projection amount as a check. VM-22 extends a principles-based approach to fixed and other non-variable annuities, replacing the formulaic Commissioners Annuity Reserve Valuation Method (CARVM) for new business.
- **Against formulaic CRVM:** Under the Commissioners Reserve Valuation Method (CRVM), the reserve is a modified net premium reserve on a prescribed mortality table and valuation interest rate. A formula fits a typical product well, but it can be far too high for some products and too low for others, such as term and secondary guarantee products whose formula reserves led to reserve financing. PBR ties the reserve to the risks of the actual product, at the cost of more modelling, documentation and governance.
- **Governance:** PBR requires a qualified actuary to sign a PBR actuarial report each year, assumption and model governance, and review by the regulator. The approach relies on the company's judgment, so the [[Valuation Principle|valuation principle]] is enforced through disclosure and review rather than through the formula alone. See also [[Life Insurance Company]].

> [!example]- Reserve for a Group That Fails the Exclusion Tests {Example}
> A group of [[Universal Life Insurance|universal life]] policies with secondary guarantees fails both exclusion tests. Its aggregate NPR is \$125 million and its deterministic reserve is \$118 million. Ten economic scenarios (a real calculation uses many more) give scenario reserves, in millions, of 98, 104, 110, 115, 121, 126, 133, 141, 152 and 168. Find the SR and the VM-20 reserve. What would the reserve be if the group passed the stochastic exclusion test?
>
> > [!answer]-
> > The worst 30% of ten scenarios are the three largest scenario reserves.
> > $$
> > \begin{align*}
> > \text{SR} &= \frac{141 + 152 + 168}{3} \\
> > &= 153.67 \\
> > \text{Reserve} &= 125 + \max\left(0,\ 153.67 - 125\right) \\
> > &= 153.67
> > \end{align*}
> > $$
> > The reserve is \$153.67 million, set by the stochastic reserve, because the secondary guarantee is costly in the low-rate scenarios. If the group had passed the stochastic exclusion test, the reserve would be $125 + \max(0, 118 - 125) = 125$, the NPR.

> [!example]- A Deterministic Reserve Against the NPR {Example}
> On prudent estimate assumptions, a small block of term policies is projected to collect premiums of \$1,000 at the start of each of the next three years and to pay benefits and expenses of \$700, \$1,100 and \$1,600 at the ends of those years, per policy now in force, already allowing for deaths and lapses. Discount at an illustrative 4%. The formulaic NPR is \$180 per policy. Find the DR and the reserve, assuming the group passes the stochastic exclusion test.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{PV outflows} &= 673.08 + 1{,}017.01 + 1{,}422.39 \\
> > &= 3{,}112.48 \\
> > \text{PV inflows} &= 1{,}000 + 961.54 + 924.56 \\
> > &= 2{,}886.09 \\
> > \text{DR} &= 3{,}112.48 - 2{,}886.09 \\
> > &= 226.39
> > \end{align*}
> > $$
> > The reserve is $180 + \max(0, 226.39 - 180) = \$226.39$ per policy. The level premium covers the early claims but not the later ones, and the prudent estimate assumptions show a larger shortfall than the prescribed basis of the NPR. That excess is the risk the formula alone would have missed.

> [!tip]- How it appears on the exam
> - **ILA-101:** Questions ask candidates to describe the U.S. statutory actuarial framework, including principles-based reserves, and to calculate basic life insurance reserves. A typical question computes a formulaic net premium reserve, then explains how VM-20 adds the deterministic and stochastic reserves.
> - **ILA-201U:** Questions ask candidates to describe, apply and evaluate U.S. statutory valuation methods, including the calculation of principles-based and formulaic reserves. They combine the NPR, DR and SR into the VM-20 reserve, apply the exclusion tests, set prudent estimate assumptions with margins, and evaluate whether a method suits a product.

> [!warning]- Exam traps
> - **The floor:** The NPR is a floor, so the reserve is never below it even when the modelled reserves are lower. Reporting the DR as the reserve when it is below the NPR understates the reserve.
> - **CTE, not the mean:** The SR is the average of the worst 30% of scenario reserves, not the average of all scenarios or the 70th percentile. Averaging every scenario understates the tail.
> - **Exclusion tests remove calculations, not reserves:** Passing the stochastic exclusion test removes the SR from the formula, but the DR still applies unless the deterministic test is passed too. Skipping both after passing one leaves out a reserve that may bind.
> - **Margins on every assumption:** A prudent estimate is anticipated experience plus a margin. Using best estimates with no margins, as a pricing or GAAP basis would, understates the DR and SR.
