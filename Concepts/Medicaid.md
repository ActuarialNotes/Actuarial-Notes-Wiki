---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4db0f8f51a46713f30ffc9f5e0210cdccca67d3099b3a1ccad5574bafd1408de
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Medicaid.md
---

**Medicaid** is the U.S. health coverage program for people with low income, financed jointly by the federal government and the states and run by each state within federal rules. It covers children, pregnant women, parents, people with disabilities and the elderly poor, and in states that adopted the Affordable Care Act (ACA) expansion, low-income adults under 65. Most states deliver it through managed care organizations (MCOs) paid a monthly capitation per member, and adjust those payments for the health risk of each plan's members.

> $$\text{FMAP} = 1 - 0.45\left(\frac{y_s}{y_{\text{US}}}\right)^{2}$$

> $$\text{Cap}_c = \frac{\text{PMPM}_c}{1 - \ell}$$

> $$\text{Cap}_{p,c} = \text{Cap}_c \times \frac{\bar{R}_{p}}{\bar{R}}$$

- **Symbols:** FMAP is the federal medical assistance percentage, the federal share of a state's Medicaid spending on medical services. $y_s$ and $y_{\text{US}}$ are per capita income in the state and in the U.S. $\text{Cap}_c$ is the capitation rate for rate cell $c$, $\text{PMPM}_c$ is the projected claim cost per member per month (PMPM) for that cell, and $\ell$ is the load for administration and margin as a share of the rate. $\bar{R}_p$ is the average risk score of plan $p$'s members and $\bar{R}$ is the enrollment-weighted average over all plans.
- **Federal and state shares:** The FMAP formula gives a poorer state a higher federal share, within a floor of 50% and a ceiling of 83%. The ACA expansion adults carry a higher federal match of 90%, and the Children's Health Insurance Program (CHIP), which covers children in families above the Medicaid income limit, carries an enhanced match that moves the regular FMAP 30% of the way toward 100%.
- **Eligibility:** Eligibility depends on income measured against the federal poverty level and on belonging to a covered group. The ACA set the expansion group at incomes up to 138% of the poverty level, and a 2012 Supreme Court decision made the expansion optional for each state. People eligible for both programs, the dual eligibles, have [[Medicare]] pay first and Medicaid pay the cost sharing and the services Medicare excludes, above all nursing home care.
- **Benefits:** Federal rules require mandatory benefits, such as hospital, physician, laboratory and nursing facility services, and let each state add optional ones such as prescription drugs, dental and home- and community-based services. Cost sharing is low or zero, so the program's cost depends on [[Utilization|utilization]] and on the [[Provider Reimbursement|reimbursement]] levels the state sets, which are usually below those of commercial payers.
- **Managed care capitation:** Capitation rates must be actuarially sound and certified by an actuary. They are built from base experience for each rate cell, defined by age, sex, eligibility category and region, adjusted for program and benefit changes, projected with [[Trend|trend]], and loaded for administration and margin.
- **Risk adjustment:** Within a rate cell, a plan that enrolls sicker members than its competitors would lose money at a flat rate. States therefore pay each plan its rate cell's capitation scaled by its members' average risk score relative to the statewide average. The models, such as the Chronic Illness and Disability Payment System (CDPS), score members from diagnoses and often pharmacy data, and the adjustment is usually budget neutral: it moves money between plans without changing the state's total cost.
- **Why risk adjustment matters here:** Medicaid members move in and out of eligibility as their income changes, so many have short enrollment histories and little claim data. The models must handle partial-year members, and the scores of a new or growing plan are less reliable, which is a [[Credibility|credibility]] problem as much as a modelling one.

> [!example]- A State's Share of Medicaid Spending {Example}
> A state's per capita income is 90% of the U.S. figure. It spends \$10 billion on its traditional Medicaid population and \$3 billion on ACA expansion adults, matched at 90%. Find its FMAP, its own share of the total spending, and its enhanced CHIP match.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{FMAP} &= 1 - 0.45 \times 0.90^2 \\
> > &= 0.6355 \\
> > \text{State} &= (1 - 0.6355)(10) + (1 - 0.90)(3) \\
> > &= 3.645 + 0.300 \\
> > &= 3.945 \\
> > \text{CHIP} &= 0.6355 + 0.30(1 - 0.6355) \\
> > &= 0.74485
> > \end{align*}
> > $$
> > The FMAP of 63.55% is within the 50% to 83% bounds, so it applies unchanged. The state pays \$3.945 billion of the \$13 billion, and federal funds pay the other \$9.055 billion. Its CHIP match is 74.49%. Each dollar the state spends on expansion adults brings nine federal dollars, against about 1.74 for its traditional population, which is what made expansion attractive to states that took it.

> [!example]- Budget-Neutral Risk Adjustment Between Two Plans {Example}
> In one rate cell the base capitation is \$400 PMPM. Plan A has 60,000 members with an average risk score of 1.10, and Plan B has 40,000 members with an average of 0.90. Find each plan's risk-adjusted rate and confirm that the state's total payment does not change.
>
> > [!answer]-
> > The statewide average is weighted by enrollment.
> > $$
> > \begin{align*}
> > \bar{R} &= \frac{60{,}000(1.10) + 40{,}000(0.90)}{100{,}000} \\
> > &= 1.02 \\
> > \text{Cap}_A &= 400 \times \frac{1.10}{1.02} \\
> > &= 431.37 \\
> > \text{Cap}_B &= 400 \times \frac{0.90}{1.02} \\
> > &= 352.94
> > \end{align*}
> > $$
> > The total is $60{,}000(431.37) + 40{,}000(352.94) \approx 40{,}000{,}000$, the same \$40 million a month a flat \$400 would cost. Dividing by 1.02, rather than using the raw scores, is what keeps it budget neutral: raw scores would pay \$440 and \$360, about \$0.8 million more a month.

> [!tip]- How it appears on the exam
> - **GH-301:** The Healthcare Risk Adjustment section asks candidates to apply risk adjustment to underwriting, pricing, claims and care management, with Medicaid among the named applications, and to use it to normalize population claims experience. Its readings include the chapter on Medicaid risk adjustment and a paper on risk adjustment in state Medicaid programs. The calculation scales a plan's capitation by its relative risk score, often budget neutral, and the written part asks how the model's data and the members' short enrollment affect the result.
> - **GH-201U:** The candidate describes Medicaid's program structure and benefits and evaluates pricing and filing requirements, with ASOP 49 on Medicaid managed care capitation rate development among the readings.

> [!warning]- Exam traps
> - **Squared income ratio:** The FMAP formula squares the ratio of state to U.S. per capita income before multiplying by 0.45. Forgetting the square gives a state at 90% of U.S. income an FMAP of 59.5% instead of 63.55%.
> - **Weighted average:** Budget neutrality needs the enrollment-weighted average risk score. A simple average of the plans' scores changes the state's total cost whenever the plans differ in size.
> - **Which match applies:** Expansion adults, CHIP children and the traditional population carry different federal shares. Applying the regular FMAP to the whole program understates the federal share in an expansion state.
> - **Dual eligibles:** For a member with both Medicare and Medicaid, Medicare pays first. Pricing a Medicaid rate cell for dual eligibles as if Medicaid paid hospital and physician claims in full overstates its cost.
