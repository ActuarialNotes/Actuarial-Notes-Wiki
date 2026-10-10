---
aliases:
  - Medical Cost Trend Experience
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:be59ec66d3dbdaf06adf0249c8a4398e7869626aea589f9b757cee3e5f8defcf
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Medical Cost Trend.md
---
**Medical Cost Trend** is the annual rate at which the claim cost of a health plan changes for a fixed population and a fixed benefit design, measured per member per month (PMPM). It is the product of changes in [[Utilization|utilization]], unit cost and the intensity or mix of services. The pricing actuary measures it from the plan's own claim experience and projects it forward to bring an experience period's claim cost to the level of the rating period in a [[Manual Rate|manual rate]] or an [[Experience Rating|experience rate]].

> $$1 + T = (1 + u)(1 + c)(1 + s)$$

> $$T_{12}(t) = \frac{\overline{\text{PMPM}}_{\,t-11:\,t}}{\overline{\text{PMPM}}_{\,t-23:\,t-12}} - 1$$

> $$\text{PMPM}_{\text{proj}} = \text{PMPM}_{\text{exp}} \times (1 + T)^{m/12}$$

- **Symbols:** $T$ is the allowed-cost trend, $u$ the change in services per 1,000 members per year, $c$ the change in the average price paid per service (unit cost), and $s$ the change in intensity and mix, such as a shift from generic to brand drugs or from an office visit to an outpatient procedure. $T_{12}(t)$ is the rolling 12-month trend ending in month $t$, where each bar is a member-month weighted average PMPM over twelve months. $m$ is the number of months from the midpoint of the experience period to the midpoint of the rating period.
- **Unit cost:** Provider price increases, renegotiated network contracts and new fee schedules raise the unit cost. Changes in the discount the plan gets from its network, or in where members go for care, also change it.
- **Utilization and intensity:** New technology, new drugs, an aging membership and changes in medical practice raise the number and intensity of services. Care management and plan design that steers members to cheaper settings can lower them.
- **Leveraging:** A fixed-dollar deductible, copay or out-of-pocket maximum does not grow with costs, so the member pays a falling share of a rising bill. The plan's paid trend is therefore higher than the allowed trend, which is why trend is studied on allowed claims and the paid trend is derived from it.
- **Cost shifting:** When a public payer such as [[Medicare]] or [[Medicaid]] pays providers less than cost, providers may raise the prices they charge commercial plans to make up the shortfall. The commercial unit cost trend then exceeds the providers' own cost inflation.
- **Normalizing the experience:** Before a historical trend is read, the claims are completed for claims incurred but not yet paid, adjusted for benefit changes, and adjusted for changes in the population's age, sex, area and industry. Large claims are often capped, and a 12-month moving window removes [[Seasonality|seasonality]], because deductibles reset each January and claims rise through the year.
- **Projection:** The selected trend is a judgment that blends the measured trend with published surveys, provider contract terms, known price changes and expected new drugs. It is applied over the period from the midpoint of the experience period to the midpoint of the rating period, as in [[Trend|property-casualty trending]] and [[Loss Trend|loss trend]].

> [!example]- Splitting a 7% PMPM Trend {Example}
> A group plan's allowed PMPM rose from \$500.00 to \$535.00 between two consecutive 12-month periods, an increase of 7%. Over the same periods, utilization rose from 16,000 to 16,400 services per 1,000 members per year. The population and the benefits did not change. Find the unit cost in each period and split the 7% trend into utilization and unit cost.
>
> > [!answer]-
> > PMPM is utilization times unit cost divided by 12,000, so the unit cost is the PMPM times 12,000 divided by utilization.
> > $$
> > \begin{align*}
> > c_0 &= \frac{500.00 \times 12{,}000}{16{,}000} \\
> > &= 375.00 \\
> > c_1 &= \frac{535.00 \times 12{,}000}{16{,}400} \\
> > &= 391.46 \\
> > 1 + u &= \frac{16{,}400}{16{,}000} \\
> > &= 1.0250 \\
> > 1 + c &= \frac{1.0700}{1.0250} \\
> > &= 1.0439
> > \end{align*}
> > $$
> > Utilization grew 2.5% and the cost per service grew 4.39%. The components multiply rather than add, since $1.025 \times 1.0439 = 1.07$, so the sum $2.5\% + 4.39\% = 6.89\%$ understates the total. Any change in intensity or mix is inside the 4.39% here, because the unit cost is an average over all services.

> [!example]- Leveraging Through a Fixed Deductible {Example}
> A small plan has three members whose allowed claims this year are \$400, \$2,000 and \$9,000. The plan has a \$1,000 deductible, then pays 80% of allowed charges. Allowed costs rise 7% next year for every member, and the deductible stays at \$1,000. Find the paid trend and the member cost-sharing trend.
>
> > [!answer]-
> > Next year's allowed claims are \$428, \$2,140 and \$9,630. The plan pays $0.8\,(A - 1{,}000)_+$ for each member.
> > $$
> > \begin{align*}
> > P_0 &= 0 + 0.8(1{,}000) + 0.8(8{,}000) \\
> > &= 7{,}200 \\
> > P_1 &= 0 + 0.8(1{,}140) + 0.8(8{,}630) \\
> > &= 7{,}816 \\
> > 1 + T_{\text{paid}} &= \frac{7{,}816}{7{,}200} \\
> > &= 1.0856
> > \end{align*}
> > $$
> > Total allowed claims grow from \$11,400 to \$12,198, so members pay \$4,200 this year and \$4,382 next year, a rise of only 4.33%. The 7% allowed trend becomes an 8.56% paid trend for the plan. Indexing the deductible to \$1,070 would remove the leveraging and bring the paid trend back to 7%.

> [!example]- Projecting a Claim Cost to the Rating Period {Example}
> A plan's experience period runs from January 1 to December 31, 2025, and its normalized allowed PMPM is \$500. The rates will apply from January 1 to December 31, 2027, and the selected allowed trend is 7% a year. Find the projected allowed PMPM.
>
> > [!answer]-
> > The midpoints are July 1, 2025 and July 1, 2027, so the trend period is 24 months.
> > $$
> > \begin{align*}
> > \text{PMPM}_{\text{proj}} &= 500 \times 1.07^{24/12} \\
> > &= 500 \times 1.1449 \\
> > &= 572.45
> > \end{align*}
> > $$
> > The paid PMPM would then be found by applying the rating period's plan design to the projected allowed cost, which picks up the leveraging of any fixed cost sharing.

> [!tip]- How it appears on the exam
> - **GH-101:** Objective 2b asks candidates to develop a medical cost trend experience analysis, so a question gives monthly PMPMs or a claim triangle and asks for rolling 12-month trends, after adjusting for incomplete claims, a benefit change or a shift in demographics.
> - **Components:** Other questions give utilization and PMPM, or unit costs and services, and ask for the split of trend into its parts, or give a fixed deductible or copay and ask for the paid trend implied by an allowed trend.
> - **Written answers:** Written parts ask candidates to list the drivers of medical trend, to explain why a measured trend should not simply be projected, or to recommend a trend assumption from conflicting sources.

> [!warning]- Exam traps
> - **Adding components:** Trend components combine by multiplication. Adding a 2.5% utilization trend to a 4.39% unit cost trend gives 6.89%, not the correct 7.00%, and the gap grows as the components get larger.
> - **Paid versus allowed:** A trend measured on paid claims includes the leveraging of the cost sharing in force at the time. Applying a paid trend to a plan with a different deductible double counts or misses the leveraging, so measure on allowed claims and reapply the new design.
> - **Benefit changes in the data:** A deductible increase in the middle of the experience lowers paid claims and looks like a low trend. Normalize the history to one benefit design before measuring trend.
> - **Incomplete recent months:** The most recent months are not fully paid. Measuring trend before completing them makes the latest rolling 12-month trend look too low.
> - **The trend period:** The trend runs from midpoint to midpoint. Using the end of the experience period, or the start of the rating period, understates or overstates the projection by six months or more.
