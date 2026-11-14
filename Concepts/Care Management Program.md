---
aliases:
  - Healthcare Intervention
  - Care Management Situation
  - Non-Chronic Trend
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cb39f858033a5554cdeb0240caa95ad07d51ebb7819503289991365ead79fdf1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Care Management Program.md
---
A **Care Management Program** is a healthcare intervention by a payer or provider that identifies members at risk of costly care, such as people with diabetes, heart failure or a recent hospital stay, and works with them to improve their health and avoid preventable admissions, emergency visits and complications. The program pays for itself only if the cost it avoids exceeds what it costs to run, and measuring the avoided cost needs a credible estimate of what the members would have cost without it.

Programs differ by the members they target:

- **Disease management** targets members with chronic conditions such as diabetes, asthma, COPD, coronary artery disease and heart failure.
- **Case management** works with a few members facing catastrophic or complex episodes.
- **[[Utilization|Utilization]] management** reviews services before or during care.
- **Wellness, transitions-of-care, palliative care and medication adherence programs** complete the range.

Each care management situation calls for a different target population and outcome measure. [[Health Risk Adjustment|Risk scores]] are used to choose members for a program and to normalize the populations being compared.

## The economic model of a program

Savings come only from events the program can change, among members it can reach, so the opportunity shrinks at every step from prevalence to engagement to effectiveness. If $N$ members have the condition, the expected savings are

> $$\text{Savings} = N \times p \times u \times r \times C$$

- $p$ is the share of members who engage with the program.
- $u$ is the annual rate of the events the program can affect.
- $r$ is the reduction in those events among engaged members.
- $C$ is the cost per event avoided.

An opportunity analysis estimates each factor before a program is bought. The return on investment is

> $$\text{ROI} = \frac{\text{Savings}}{\text{Program cost}}$$

Net savings are gross savings less program cost, so an ROI of 1.0 means the program breaks even. Setting the ROI to 1.0 gives the break-even reduction in events, which shows whether a vendor's promised effect is plausible:

> $$r^{*} = \frac{\text{Program cost}}{N \times p \times u \times C}$$

> [!example]- What are the gross savings, the ROI and the break-even reduction in admissions for this diabetes program? {Example}
> A plan has 2,000 members with diabetes, who have 300 inpatient admissions per 1,000 per year at an average cost of $\$12{,}000$. A vendor expects to engage 50% of them and to cut admissions among engaged members by 15%, for a fee of $\$40$ per engaged member per month.
>
> > [!answer]-
> > - The avoided admissions are $2{,}000 \times 0.5 \times 0.30 \times 0.15 = 45$, so the savings are $45 \times 12{,}000 = \$540{,}000$.
> > - The program costs $1{,}000 \times 12 \times 40 = \$480{,}000$, so the ROI is $540{,}000/480{,}000 = 1.125$.
> > - The break-even reduction is $480{,}000/(2{,}000 \times 0.5 \times 0.30 \times 12{,}000) = 13.3\%$.
> > - The program returns $\$1.125$ per dollar only if it achieves at least a 13.3% reduction, which leaves little margin for the vendor's estimate. Not every admission of a diabetic member is avoidable, so counting only addressable admissions would shrink $u$ and the savings further.

## Evaluation methods

A randomized controlled trial is the most reliable design but is rarely possible in a working health plan. A simple pre-post comparison of participants overstates savings, because members chosen for high cost in one year tend to cost less the next year anyway. This is **regression to the mean**. Measuring only members who enrolled also compares self-selected, motivated members with no control. Matched control designs pair participants with similar non-participants. **Propensity scoring** does this by fitting a [[Logistic Regression|logistic regression]] for the probability of participating and matching members with similar fitted probabilities.

## Actuarially adjusted historical control

This population-based method measures every member who meets the condition definition, whether or not they engage, in a baseline and a measurement period. The baseline cost is projected with the **non-chronic trend** $T_{nc}$, the cost trend of members without the targeted conditions, as the estimate of what would have happened without the program. The non-chronic population serves as the control because the program does not touch it, but it is exposed to the same prices, benefit changes and provider contracts. The savings are

> $$\text{Savings} = \left[\text{PMPM}_0 (1 + T_{nc}) - \text{PMPM}_1\right] \times \text{MM}_1$$

- $\text{PMPM}_0$ and $\text{PMPM}_1$ are the chronic population's cost per member per month in the baseline and measurement periods.
- $\text{MM}_1$ is the chronic population's member months in the measurement period.

Members move between the populations. A non-chronic member who develops a condition is reclassified as chronic and takes their rising cost with them, and newly identified chronic members differ in severity from long-standing ones. Raw trends therefore mix true cost trend with changes in risk mix, so the non-chronic trend is calculated on cost divided by the average risk score. The risk-adjusted non-chronic trend is

> $$1 + T_{nc} = \frac{\text{PMPM}^{nc}_1 / \bar{R}^{nc}_1}{\text{PMPM}^{nc}_0 / \bar{R}^{nc}_0}$$

- $\text{PMPM}^{nc}_0$ and $\text{PMPM}^{nc}_1$ are the non-chronic population's cost per member per month in the two periods.
- $\bar{R}^{nc}_0$ and $\bar{R}^{nc}_1$ are its average risk scores.

> [!example]- What are this program's savings and ROI with a risk-adjusted non-chronic trend, and with the raw trend? {Example}
> A health plan runs a disease management program for its chronic population at a fee of $\$15$ per chronic member per month. In the baseline year the chronic population cost $\$850$ PMPM. In the measurement year it had 24,000 member months and cost $\$880$ PMPM.
>
> | Non-chronic population | Baseline year | Measurement year |
> | :--- | ---: | ---: |
> | Cost PMPM | $\$210$ | $\$228$ |
> | Average risk score | 0.80 | 0.83 |
>
> > [!answer]-
> > - The risk-adjusted trend is $1 + T_{nc} = (228/0.83)/(210/0.80) = 274.70/262.50 = 1.04647$.
> > - The expected chronic PMPM is $850 \times 1.04647 = \$889.50$.
> > - The savings are $(889.50 - 880) \times 24{,}000 = \$228{,}000$.
> > - The program costs $15 \times 24{,}000 = \$360{,}000$, so the ROI is $228{,}000/360{,}000 = 0.63$, a loss of about 37 cents per dollar spent.
> > - The raw trend is $228/210 - 1 = 8.57\%$, which projects $\$922.86$ PMPM, savings of about $\$1{,}028{,}600$ and an ROI of 2.86.
> > - The difference is the rise in the non-chronic risk score, which the raw trend counts as cost inflation the chronic population would also have suffered.

> [!trap] Measuring the program against the chronic trend
> The benchmark is the non-chronic trend. The chronic population's own trend is what the program is supposed to change, so using it measures the program against itself and finds no savings by construction.
