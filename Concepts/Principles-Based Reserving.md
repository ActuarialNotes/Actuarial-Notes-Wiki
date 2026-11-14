---
aliases:
  - Principles-Based Reserve
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3eefcf8740cafce9866dc4a08a9ac556f2dad5776eb14ffe6488828dc965c792
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Principles-Based Reserving.md
---

**Principles-Based Reserving** (PBR) is the U.S. [[Statutory Accounting Principles|statutory]] approach that sets a life insurer's reserves by projecting the cash flows of its own business on the company's own assumptions, with prudent margins, rather than only by formulas with prescribed mortality and interest. The NAIC's Valuation Manual sets it out, in VM-20 for life insurance, VM-21 for variable annuities and VM-22 for non-variable annuities.

Under VM-20 the reserve is the larger of a formulaic net premium reserve (NPR) and two modelled reserves, the deterministic reserve (DR) and the stochastic reserve (SR). The reserve is

> $$\text{Reserve} = \text{NPR} + \max\left(0,\ \max(\text{DR}, \text{SR}) - \text{NPR}\right)$$

- $\text{NPR}$ is a formulaic reserve computed policy by policy with prescribed mortality, interest and lapse rates.

The NPR is a floor, so the reserve is never below it even when the modelled reserves are lower. The models capture risks the formula misses.

## Exclusion tests

A group of policies that passes the stochastic exclusion test has little interest-rate or asset risk, so the company need not compute the SR for it. A group that also passes the deterministic exclusion test need not compute the DR, and holds the NPR alone. Passing the stochastic test alone removes only the SR, and the DR still applies. The tests keep the modelling effort where the risk is.

## The stochastic reserve

The stochastic reserve is

> $$\text{SR} = \text{CTE}_{70}\left(\text{scenario reserves}\right)$$

- A scenario reserve is the amount of starting assets needed for the projection to stay solvent in that economic scenario.
- $\text{CTE}_{70}$ is the average of the worst 30% of the scenario reserves.

> [!example]- What is the VM-20 reserve for this group, and what would it be if the group passed the stochastic exclusion test? {Example}
> A group of [[Universal Life Insurance|universal life]] policies with secondary guarantees fails both exclusion tests. Its aggregate NPR is $\$125$ million and its deterministic reserve is $\$118$ million. Ten economic scenarios (a real calculation uses many more) give scenario reserves, in millions, of 98, 104, 110, 115, 121, 126, 133, 141, 152 and 168.
>
> > [!answer]-
> > - The worst 30% of ten scenarios are the three largest scenario reserves.
> > - $\text{SR} = (141 + 152 + 168)/3 = 153.67$.
> > - The reserve is $125 + \max(0,\ 153.67 - 125) = \$153.67$ million, set by the stochastic reserve, because the secondary guarantee is costly in the low-rate scenarios.
> > - If the group passed the stochastic exclusion test, the reserve would be $125 + \max(0,\ 118 - 125) = \$125$ million, the NPR.

## The deterministic reserve

On prudent estimate assumptions and one prescribed economic scenario, the deterministic reserve is

> $$\text{DR} = \text{PV of outflows} - \text{PV of inflows}$$

- The outflows are the projected benefits, expenses and other outflows.
- The inflows are the projected premiums and other inflows.

> [!example]- What are the DR and the reserve per policy for this block of term policies? {Example}
> On prudent estimate assumptions, a small block of term policies is projected to collect premiums of $\$1{,}000$ at the start of each of the next three years and to pay benefits and expenses of $\$700$, $\$1{,}100$ and $\$1{,}600$ at the ends of those years, per policy now in force, already allowing for deaths and lapses. Discount at an illustrative 4%. The formulaic NPR is $\$180$ per policy, and the group passes the stochastic exclusion test.
>
> > [!answer]-
> > - The present value of outflows is $673.08 + 1{,}017.01 + 1{,}422.39 = 3{,}112.48$.
> > - The present value of inflows is $1{,}000 + 961.54 + 924.56 = 2{,}886.09$.
> > - $\text{DR} = 3{,}112.48 - 2{,}886.09 = 226.39$.
> > - The reserve is $180 + \max(0,\ 226.39 - 180) = \$226.39$ per policy.
> > - The level premium covers the early claims but not the later ones, and the prudent estimate assumptions show a larger shortfall than the prescribed basis of the NPR.

## Prudent estimate assumptions

Each assumption starts from the company's anticipated experience, from its own [[Experience Study|experience studies]] blended with industry tables by credibility, and adds a margin for uncertainty. The prudent estimate is

> $$\text{Prudent estimate} = \text{Anticipated experience} + \text{Margin}$$

Using best estimates with no margins, as a pricing or GAAP basis would, understates the DR and SR. Mortality grades from company experience to an industry table as the data run out, and some assumptions, such as the economic scenarios and asset default costs, are prescribed.

## VM-21 and VM-22

For variable annuities, VM-21 sets the reserve from a stochastic CTE calculation of the guarantees, with a standard projection amount as a check. VM-22 extends a principles-based approach to fixed and other non-variable annuities, replacing the formulaic Commissioners Annuity Reserve Valuation Method (CARVM) for new business.

## PBR and formulaic reserves

Under the [[Commissioners Reserve Valuation Method|Commissioners Reserve Valuation Method]] (CRVM), the reserve is a modified net premium reserve on a prescribed mortality table and valuation interest rate. A formula fits a typical product well, but it can be far too high for some products and too low for others, such as term and secondary guarantee products whose formula reserves led to reserve financing. PBR ties the reserve to the risks of the actual product, at the cost of more modelling, documentation and governance.

PBR requires a qualified actuary to sign a PBR actuarial report each year, assumption and model governance, and review by the regulator. The approach relies on the company's judgment, so the [[Valuation Principle|valuation principle]] is enforced through disclosure and review rather than through the formula alone.

> [!trap] Averaging every scenario for the SR
> The SR is the average of the worst 30% of scenario reserves, not the average of all scenarios or the 70th percentile. Averaging every scenario understates the tail: $126.8$ million against $153.67$ million in the example.
