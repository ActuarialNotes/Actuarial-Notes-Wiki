---
aliases:
  - Base Rate
  - Rating Manual
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:80f1b9a8d0160df226b363f4504f8c3c8bf856bc338e4fc5f5d63414eaa59597
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Manual Rate.md
---
**A Manual Rate** is the premium rate an insurer charges a group from its rating manual rather than from the group's own claims: a base rate developed from a large body of data, adjusted by rating factors for the group's demographics, location, industry and plan design, projected to the rating period, and loaded for retention. It prices new and small groups whose own experience is not [[Credibility|credible]], and it is the [[Complement of Credibility|complement of credibility]] when a larger group is [[Experience Rating|experience rated]].

> $$c = b \times \prod_{k} f_k \times (1 + \tau)^{m/12}$$

> $$R_{\text{manual}} = \frac{c + F}{1 - r}$$

> $$R = Z\,c_{\text{exp}} + (1 - Z)\,c$$

- **Symbols:** $b$ is the base claim cost per member per month (PMPM) for a standard group and plan in the experience period, $f_k$ are the rating manual's factors, $\tau$ is the annual [[Trend|trend]], and $m$ is the number of months from the midpoint of the experience period to the midpoint of the rating period. $F$ is the fixed retention per member per month, and $r$ is the retention charged as a share of premium. In the blend, $c_{\text{exp}}$ is the group's own claim cost adjusted to the same basis, and $Z$ is its credibility, with the result loaded for retention in the same way.
- **Base rate development:** The base rate comes from data sources such as the insurer's own block, purchased claim cost manuals, consultants' databases and published government data. Each source is judged for its quality, appropriateness and limitations, and is then adjusted to a standard: completed for unpaid claims, normalized to the standard plan, area and demographics, and stripped of unusual large claims or one-time events.
- **Rating factors:** Typical factors adjust for age and sex, area, industry, group size and plan design. Plan design factors come from claim cost distributions, which show how a different deductible, coinsurance or out-of-pocket maximum changes the plan's share of claims. Provider network discounts and any expected change in [[Utilization|utilization]] are reflected too.
- **Trend:** The base rate is projected from the midpoint of the experience period to the midpoint of the rating period, because claims are spread over both periods. Medical trend combines changes in unit cost, utilization, mix of services and the leveraging effect of fixed cost sharing.
- **Retention:** Retention covers administration, commissions, premium taxes, a risk or contingency charge and profit. Some items are fixed amounts per member or per employee, and others are a share of premium, so they enter the formula separately.
- **Other coverages:** The same structure prices group life, from mortality rates by age and sex per \$1,000 of insurance, and disability, where the claim cost is incidence times the present value of a claim ([[Group Life Insurance]], [[Disability Income Insurance]]). For long-duration coverage the rating manual also needs lapse, interest and termination assumptions.
- **Role of credibility:** The data behind the base rate must itself be credible, so thin cells are smoothed or borrowed from a larger source. A group's experience earns more weight as its exposure grows, and the manual rate supplies the rest.

> [!example]- A Monthly Manual Rate for a Medical Plan {Example}
> The base claim cost for a standard plan is \$480 PMPM, from experience incurred in calendar 2025. A group's rating period is calendar 2027, and annual trend is 7%. With illustrative rating factors of 1.08 for age and sex, 0.95 for area, 1.03 for industry and 0.92 for its higher deductible, find the monthly manual rate. Retention is \$35 PMPM for administration plus 9% of premium for commissions, premium tax, risk charge and profit.
>
> > [!answer]-
> > The midpoints are July 1, 2025 and July 1, 2027, so the base rate is trended for 24 months.
> > $$
> > \begin{align*}
> > b\,(1.07)^{2} &= 480 \times 1.1449 \\
> > &= 549.55 \\
> > \prod_k f_k &= 1.08 \times 0.95 \times 1.03 \times 0.92 \\
> > &= 0.97224 \\
> > c &= 549.55 \times 0.97224 \\
> > &= 534.30 \\
> > R_{\text{manual}} &= \frac{534.30 + 35}{1 - 0.09} \\
> > &= 625.60
> > \end{align*}
> > $$
> > The manual rate is \$625.60 PMPM. The group's older-than-standard members and its industry nearly offset its favourable area and leaner plan, so most of the change from the base rate is two years of trend and the retention load.

> [!example]- Blending the Group's Own Experience {Example}
> The same group has 400 members. Its own claims, completed, trended and adjusted to the 2027 plan, come to \$610 PMPM over 4,800 member months. The insurer uses the square root rule with an illustrative full credibility standard of 24,000 member months. Find the blended claim cost and the premium rate.
>
> > [!answer]-
> > Credibility is partial because the group has a fifth of the exposure needed for full credibility.
> > $$
> > \begin{align*}
> > Z &= \sqrt{4{,}800 / 24{,}000} \\
> > &= 0.4472 \\
> > c_{\text{blend}} &= 0.4472(610) + 0.5528(534.30) \\
> > &= 568.15 \\
> > R &= \frac{568.15 + 35}{0.91} \\
> > &= 662.80
> > \end{align*}
> > $$
> > The rate is \$662.80 PMPM. The group's claims were \$75.70 above manual, and about 45% of that difference, \$33.86, passes into its claim cost. The manual rate keeps one bad year of a small group from setting its whole price.

> [!tip]- How it appears on the exam
> - **GH-101:** Candidates calculate and recommend a manual rate for medical, dental, vision, prescription drug and group life contracts. A question gives a base claim cost or the data to build one, the rating factors, trend and retention, and asks for the rate and a recommendation, along with an evaluation of the data sources behind it.
> - **CP-321:** The manual rate objectives cover disability income, long-term care, critical illness and Medicare Supplement. Questions ask for base rate development and the application of a rating manual, and for the role the credibility of the data plays in setting the rate.

> [!warning]- Exam traps
> - **Trend period:** Trend runs from the midpoint of the experience period to the midpoint of the rating period, not from the end of one to the start of the other. For two calendar years apart that is 24 months, not 12.
> - **Retention as a share of premium:** A percentage of premium must be loaded by dividing by $1 - r$. Multiplying the claim cost by $1 + r$ gives a rate that collects less than the retention it is meant to cover.
> - **Factors on the same basis:** Rating factors are relative to the standard group the base rate describes. Applying an area factor to a base rate already built from that area's data counts the area twice.
> - **Credibility applies to claims, not retention:** The group's experience replaces part of the manual claim cost, not its fixed expenses or profit. Blending premium rates that carry different retention loads mixes the two.
