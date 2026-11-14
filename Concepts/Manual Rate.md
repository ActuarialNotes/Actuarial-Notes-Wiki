---
aliases:
  - Base Rate
  - Rating Manual
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:153e458f246e1c6b34c9a00e6d328a9571c99b54d5b477f1685c746edbdad9a2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Manual Rate.md
---
A **Manual Rate** is the premium rate an insurer charges a group from its rating manual rather than from the group's own claims: a base rate developed from a large body of data, adjusted by rating factors for the group's demographics, location, industry and plan design, projected to the rating period, and loaded for retention. It prices new and small groups whose own experience is not [[Credibility|credible]], and it is the [[Complement of Credibility|complement of credibility]] when a larger group is [[Experience Rating|experience rated]].

The manual claim cost per member per month (PMPM) is

> $$c = b \times \prod_{k} f_k \times (1 + \tau)^{m/12}$$

- $b$ is the base claim cost PMPM for a standard group and plan in the experience period.
- $f_k$ are the rating manual's factors.
- $\tau$ is the annual [[Trend|trend]].
- $m$ is the number of months from the midpoint of the experience period to the midpoint of the rating period.

The base rate is projected from the midpoint of the experience period to the midpoint of the rating period, because claims are spread over both periods. Medical trend combines changes in unit cost, utilization, mix of services and the leveraging effect of fixed cost sharing.

Retention covers administration, commissions, premium taxes, a risk or contingency charge and profit. Some items are fixed amounts per member or per employee, and others are a share of premium, so they enter the formula separately. The manual rate is

> $$R_{\text{manual}} = \frac{c + F}{1 - r}$$

- $F$ is the fixed retention PMPM.
- $r$ is the retention charged as a share of premium.

> [!example]- What is this group's monthly manual rate? {Example}
> The base claim cost for a standard plan is $\$480$ PMPM, from experience incurred in calendar 2025. The group's rating period is calendar 2027, and annual trend is 7%. Retention is $\$35$ PMPM for administration plus 9% of premium for commissions, premium tax, risk charge and profit.
>
> | Rating factor | Value |
> | :--- | ---: |
> | Age and sex | 1.08 |
> | Area | 0.95 |
> | Industry | 1.03 |
> | Higher deductible | 0.92 |
>
> > [!answer]-
> > - The midpoints are July 1, 2025 and July 1, 2027, so the base rate is trended for 24 months: $480 \times 1.07^{2} = 549.55$.
> > - The product of the factors is $1.08 \times 0.95 \times 1.03 \times 0.92 = 0.97224$.
> > - The manual claim cost is $549.55 \times 0.97224 = \$534.30$ PMPM.
> > - The manual rate is $(534.30 + 35)/(1 - 0.09) = \$625.60$ PMPM.
> > - The factors nearly offset each other, so most of the change from the base rate is two years of trend and the retention load.

## Base rate development

The base rate comes from data sources such as the insurer's own block, purchased claim cost manuals, consultants' databases and published government data. Each source is judged for its quality, appropriateness and limitations. It is then adjusted to a standard: completed for unpaid claims, normalized to the standard plan, area and demographics, and stripped of unusual large claims or one-time events. The data behind the base rate must itself be credible, so thin cells are smoothed or borrowed from a larger source.

## Rating factors

Typical factors adjust for age and sex, area, industry, group size and plan design. Plan design factors come from claim cost distributions, which show how a different deductible, coinsurance or out-of-pocket maximum changes the plan's share of claims. Provider network discounts and any expected change in [[Utilization|utilization]] are reflected too. Rating factors are relative to the standard group the base rate describes, so an area factor applied to a base rate already built from that area's data counts the area twice.

## Blending with the group's experience

A group's experience earns more weight as its exposure grows, and the manual rate supplies the rest. The blended claim cost is

> $$R = Z\,c_{\text{exp}} + (1 - Z)\,c$$

- $c_{\text{exp}}$ is the group's own claim cost adjusted to the same basis.
- $Z$ is its credibility.

The blend is then loaded for retention in the same way. Credibility applies to claims, not to retention.

> [!example]- What are the blended claim cost and premium rate of this group? {Example}
> The same group has 400 members. Its own claims, completed, trended and adjusted to the 2027 plan, come to $\$610$ PMPM over 4,800 member months. The insurer uses the square root rule with a full credibility standard of 24,000 member months.
>
> > [!answer]-
> > - The credibility is $Z = \sqrt{4{,}800/24{,}000} = 0.4472$.
> > - The blended claim cost is $0.4472(610) + 0.5528(534.30) = \$568.15$ PMPM.
> > - The rate is $(568.15 + 35)/0.91 = \$662.80$ PMPM.
> > - The group's claims were $\$75.70$ above manual, and about 45% of that difference, $\$33.86$, passes into its claim cost.

## Other coverages

The same structure prices group life, from mortality rates by age and sex per $\$1{,}000$ of insurance, and disability, where the claim cost is incidence times the present value of a claim ([[Group Life Insurance]], [[Disability Income Insurance]]). For long-duration coverage the rating manual also needs lapse, interest and termination assumptions.

> [!trap] Multiplying by $1 + r$ for retention
> A retention charged as a share of premium is loaded by dividing by $1 - r$. Multiplying the claim cost by $1 + r$ gives a rate that collects less than the retention it is meant to cover.
