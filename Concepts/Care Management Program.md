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
  content_hash: sha256:d03e2d7bdb803aff74dcbf2d83bebd76f540b42fdd346111d90287657a0277f1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Care Management Program.md
---
A **care management program** is a healthcare intervention by a payer or provider that identifies members at risk of costly care, such as people with diabetes, heart failure or a recent hospital stay, and works with them to improve their health and avoid preventable admissions, emergency visits and complications. Its value to the actuary is economic: the program pays for itself only if the cost it avoids exceeds what it costs to run, and measuring the avoided cost needs a credible estimate of what the members would have cost without it.

> $$\text{Savings} = \left[\text{PMPM}_0 (1 + T_{nc}) - \text{PMPM}_1\right] \times \text{MM}_1$$

> $$1 + T_{nc} = \frac{\text{PMPM}^{nc}_1 / \bar{R}^{nc}_1}{\text{PMPM}^{nc}_0 / \bar{R}^{nc}_0}$$

> $$\text{ROI} = \frac{\text{Savings}}{\text{Program cost}}$$

> $$\text{Savings}_{\text{model}} = N \times p \times u \times r \times C$$

- **Symbols:** $\text{PMPM}_0$ and $\text{PMPM}_1$ are the chronic population's cost per member per month in the baseline and measurement periods, $\text{MM}_1$ is its member months in the measurement period, and $T_{nc}$ is the **non-chronic trend**, the cost trend of members without the targeted conditions. $\bar{R}^{nc}$ is the non-chronic population's average [[Health Risk Adjustment|risk score]]. In the economic model, $N$ is the number of members with the condition, $p$ the share who engage with the program, $u$ the annual rate of the events the program can affect, $r$ the reduction in those events among engaged members, and $C$ the cost per event avoided.
- **Types of program:** Disease management targets members with chronic conditions such as diabetes, asthma, COPD, coronary artery disease and heart failure. Case management works with a few members facing catastrophic or complex episodes, and [[Utilization|utilization]] management reviews services before or during care. Wellness, transitions-of-care, palliative care and medication adherence programs complete the range, and each care management situation calls for a different target population and outcome measure.
- **The economic model:** Savings come only from events the program can change, among members it can reach, so the opportunity shrinks at every step from prevalence to engagement to effectiveness. An opportunity analysis estimates each factor before a program is bought, and the break-even reduction in events, $r^{*} = \text{Program cost} / (N p u C)$, shows whether the vendor's promised effect is plausible.
- **Evaluation methods:** A randomized controlled trial is the most reliable design but is rarely possible in a working health plan. A simple pre-post comparison of participants overstates savings, because members chosen for high cost in one year tend to cost less the next year anyway, which is **regression to the mean**. Matched control designs pair participants with similar non-participants, and **propensity scoring** does this by fitting a [[Logistic Regression|logistic regression]] for the probability of participating and matching members with similar fitted probabilities.
- **Actuarially adjusted historical control:** This population-based method measures every member who meets the condition definition, whether or not they engage, in a baseline and a measurement period. The baseline cost is projected with the non-chronic trend as the estimate of what would have happened without the program, and savings are the projected cost less the actual cost. The non-chronic population serves as the control because the program does not touch it but it is exposed to the same prices, benefit changes and provider contracts.
- **Patient risk and trend:** Members move between the populations. A non-chronic member who develops a condition is reclassified as chronic and takes their rising cost with them, and newly identified chronic members differ in severity from long-standing ones. Raw trends of the two groups therefore mix true cost trend with changes in risk mix, so the trend is calculated in a manner that reflects patient risk, on cost divided by the average risk score, before it is used as the benchmark.

> [!example]- Savings and ROI from an Actuarially Adjusted Historical Control {Example}
> A health plan runs a disease management program for its chronic population at a fee of \$15 per chronic member per month. In the baseline year the chronic population cost \$850 PMPM. In the measurement year it had 24,000 member months and cost \$880 PMPM. The non-chronic population cost \$210 PMPM with an average risk score of 0.80 in the baseline year, and \$228 PMPM with a score of 0.83 in the measurement year. Find the savings and ROI using a risk-adjusted non-chronic trend, and compare with the result using the raw trend.
>
> > [!answer]-
> > First risk-adjust the non-chronic trend, then project the chronic baseline with it.
> > $$
> > \begin{align*}
> > 1 + T_{nc} &= \frac{228 / 0.83}{210 / 0.80} \\
> > &= \frac{274.70}{262.50} \\
> > &= 1.04647 \\
> > \text{Expected PMPM} &= 850 \times 1.04647 \\
> > &= 889.50 \\
> > \text{Savings} &= (889.50 - 880) \times 24{,}000 \\
> > &= 228{,}000 \\
> > \text{ROI} &= \frac{228{,}000}{15 \times 24{,}000} \\
> > &= 0.63
> > \end{align*}
> > $$
> > The program saves \$228,000 against a cost of \$360,000, so it loses about 37 cents per dollar spent. The raw non-chronic trend is $228/210 - 1 = 8.57\%$, which projects \$922.86 PMPM, savings of about \$1,028,600 and an ROI of 2.86. The difference is the rise in the non-chronic population's risk score, which the raw trend counts as cost inflation that the chronic population would also have suffered.

> [!example]- Break-Even Effect for a Diabetes Program {Example}
> A plan has 2,000 members with diabetes, who have 300 inpatient admissions per 1,000 per year at an average cost of \$12,000. A vendor expects to engage 50% of them and to cut admissions among engaged members by 15%, for a fee of \$40 per engaged member per month. Estimate the gross savings, the ROI and the break-even reduction in admissions.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Avoided admissions} &= 2{,}000 \times 0.5 \times 0.30 \times 0.15 \\
> > &= 45 \\
> > \text{Savings} &= 45 \times 12{,}000 \\
> > &= 540{,}000 \\
> > \text{Program cost} &= 1{,}000 \times 12 \times 40 \\
> > &= 480{,}000 \\
> > \text{ROI} &= \frac{540{,}000}{480{,}000} \\
> > &= 1.125 \\
> > r^{*} &= \frac{480{,}000}{2{,}000 \times 0.5 \times 0.30 \times 12{,}000} \\
> > &= 13.3\%
> > \end{align*}
> > $$
> > The program returns \$1.125 per dollar only if it achieves at least a 13.3% reduction, which leaves little margin for a vendor's estimate. Not every admission of a diabetic member is related to diabetes or avoidable, so an opportunity analysis that counts only addressable admissions would shrink $u$ and the savings further.

> [!tip]- How it appears on the exam
> - **GH-301 calculations:** Questions give baseline and measurement-period PMPMs for the chronic and non-chronic populations and ask for the savings, the ROI or the break-even effect, sometimes after first risk-adjusting the non-chronic trend.
> - **GH-301 written parts:** Candidates describe and compare programs, critique an evaluation design for regression to the mean or selection bias, explain how propensity scoring builds a comparison group, or explain why chronic and non-chronic trends differ.
> - **Care management in risk adjustment:** The risk adjustment section asks how risk scores are used to choose members for a program and to normalize the populations being compared.

> [!warning]- Exam traps
> - **Participants are not the population:** Measuring only members who enrolled in the program compares self-selected, motivated members with no control, which overstates savings. The adjusted historical control method measures everyone who meets the condition definition.
> - **The control trend:** The benchmark is the non-chronic trend, not the chronic population's own trend, which the program is supposed to change. Using the chronic trend measures the program against itself and finds no savings by construction.
> - **Risk mix in the trend:** An unadjusted non-chronic trend that includes a rise in the population's risk score overstates expected cost and so overstates savings, as the first example shows.
> - **Gross and net:** ROI is gross savings divided by program cost, and net savings are gross savings less program cost. An ROI of 1.0 means the program breaks even, not that it saves money.
> - **Regression to the mean:** Members selected because they were expensive in the baseline year will on average cost less next year without any intervention. A pre-post comparison of such a cohort books that fall as savings.
