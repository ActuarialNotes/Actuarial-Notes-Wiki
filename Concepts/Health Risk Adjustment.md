---
aliases:
  - Risk Score
  - Normalize Population Claims Experience
  - Reflects Patient Risk
  - Risk Assessment Mechanism
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cec1304bc3b5a58012880dd63650c8dd038b968d557c2553542449540425050e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Health Risk Adjustment.md
---
**Health risk adjustment** is the adjustment of revenue, capitation rates or claims experience for the expected health cost of the members a health plan or provider actually serves, measured by a **risk score** that a model assigns each member from their demographics, diagnoses or prescriptions. It lets a payer pay a plan with sicker members more than a plan with healthier ones, and lets an actuary compare the cost of two populations once the difference in their health has been taken out. In U.S. health practice it means this payment and normalization tool, not the IFRS 17 [[Risk Adjustment for Non-Financial Risk|risk adjustment for non-financial risk]].

> $$R_i = \sum_{k} \beta_k\, x_{ik}$$

> $$\tilde{R}_g = \frac{\bar{R}_g}{\bar{R}}$$

> $$\text{PMPM}^{\text{adj}}_g = \frac{\text{PMPM}_g}{\tilde{R}_g}$$

> $$\text{Cap}_g = \text{Base} \times \tilde{R}_g$$

- **Symbols:** $R_i$ is member $i$'s risk score, $x_{ik}$ is 1 when the member falls in demographic cell or condition category $k$ (and 0 otherwise), and $\beta_k$ is the coefficient the model assigns that cell, expressed relative to the average cost of the population the model was calibrated on. $\bar{R}_g$ is the member-month weighted average score of group or plan $g$, $\bar{R}$ is the average over the reference population, and $\tilde{R}_g$ is the relative risk score. $\text{PMPM}_g$ is the group's claim cost per member per month, and Base is the capitation rate for a member of average risk.
- **Demographic models:** The oldest models use age, sex and eligibility category only. They are cheap and hard to game, but they explain little of the variation in cost, because most of it comes from the small share of members with serious conditions.
- **Diagnosis-based models:** These map each member's diagnosis codes from claims or encounter data into condition categories and add a coefficient for each. The CMS hierarchical condition category (CMS-HCC) model for [[Medicare]] Advantage, the HHS-HCC model for the individual and small group markets, and the Chronic Illness and Disability Payment System (CDPS) for [[Medicaid]] work this way. Hierarchies let only the most severe condition in a family count, so a member is not paid twice for one disease.
- **Pharmacy-based models:** Models such as MedicaidRx and RxHCC score members from the drugs they fill. Pharmacy claims arrive within days and leave little room for coding discretion, but the score depends on prescribing patterns, and a condition left untreated scores nothing. Combined models, such as CDPS+Rx, use both sources.
- **Concurrent and prospective models:** A concurrent model explains cost in a period from diagnoses recorded in the same period, so it captures acute events and fits better. The ACA's HHS-HCC model is concurrent, and concurrent scores also suit judging a provider's efficiency after the fact. A prospective model predicts next period's cost from this period's diagnoses, which is what pricing, underwriting and choosing members for a [[Care Management Program|care management program]] need. The Medicare CMS-HCC model is prospective.
- **Normalization:** A model is calibrated on one population in one year, and scores drift as coding becomes more complete and the population changes. Payers therefore rescale scores so the reference population averages 1.0, through the Medicare normalization factor and coding intensity reduction, or by making a Medicaid adjustment budget neutral. To **normalize population claims experience**, an actuary divides a group's cost by its relative risk score, so that what remains reflects price, efficiency and benefit design rather than health status.
- **Uses:** Medicare Advantage capitation is the plan's rate times each member's score. Medicaid capitation within a rate cell is scaled by each plan's relative score. Under the [[Affordable Care Act]], plans in a state market make zero-sum transfers to one another based on their scores. In group pricing, a risk score is one **risk assessment mechanism** alongside prior claims and medical underwriting, and it is used to profile providers and set [[Accountable Care Organization|accountable care organization]] benchmarks.
- **Standards and the indifference ideal:** ASOP No. 45, *The Use of Health Status Based Risk Adjustment Methodologies*, asks the actuary to consider the purpose of the work when selecting a model, the consistency of the data with the data the model was calibrated on, the model's limitations, and the effect of changes in coding practice, and to disclose them. The goal is a payment under which a plan is indifferent to whether it enrolls a healthy or a sick member, so that no plan profits from avoiding the sick.

> [!example]- Normalizing Two Groups' Claims Experience {Example}
> Two employer groups on the same benefit plan in the same area report the following experience. Group A's claim cost is \$520 PMPM, and its members' average risk score is 1.30. Group B's claim cost is \$380 PMPM with an average score of 0.85. The scores come from the same model and are relative to the insurer's book, which averages 1.00. Which group's underlying cost is higher once health status is removed?
>
> > [!answer]-
> > Divide each group's PMPM by its relative risk score.
> > $$
> > \begin{align*}
> > \text{PMPM}^{\text{adj}}_A &= \frac{520}{1.30} \\
> > &= 400.00 \\
> > \text{PMPM}^{\text{adj}}_B &= \frac{380}{0.85} \\
> > &= 447.06
> > \end{align*}
> > $$
> > Group A costs 37% more on the raw figures, but only because its members are sicker. For a member of average health, Group B costs about 11.8% more, which points to higher unit prices, heavier use of services or a less efficient provider network. A renewal that charged Group B less on the strength of its raw PMPM would underprice it.

> [!example]- Budget-Neutral Medicaid Capitation {Example}
> A state pays two managed care plans for one rate cell, with a base capitation of \$450 PMPM for a member of average risk. Plan A has 6,000 member months and an average risk score of 1.18. Plan B has 9,000 member months and an average score of 0.98. The state wants the adjustment to move money between the plans without changing its total cost. Find each plan's capitation.
>
> > [!answer]-
> > First find the enrollment-weighted average score, then each plan's relative score.
> > $$
> > \begin{align*}
> > \bar{R} &= \frac{6{,}000(1.18) + 9{,}000(0.98)}{15{,}000} \\
> > &= 1.06 \\
> > \text{Cap}_A &= 450 \times \frac{1.18}{1.06} \\
> > &= 500.94 \\
> > \text{Cap}_B &= 450 \times \frac{0.98}{1.06} \\
> > &= 416.04
> > \end{align*}
> > $$
> > The state pays $6{,}000(500.94) + 9{,}000(416.04) = \$6{,}750{,}000$, exactly $15{,}000 \times \$450$, so the adjustment is budget neutral. Paying both plans \$450 would have overpaid Plan B by about \$34 PMPM and underpaid Plan A by about \$51.

> [!tip]- How it appears on the exam
> - **GH-301:** Questions apply risk adjustment to pricing, claims and care management situations in Medicare, Medicaid and ACA products. A typical calculation normalizes experience by a risk score or scales a capitation rate by a relative score, and written parts ask candidates to compare demographic, diagnosis-based and pharmacy-based models, or concurrent and prospective ones.
> - **GH-301 best practices:** Candidates explain what ASOP No. 45, together with ASOP No. 23 on data quality and ASOP No. 41 on communications, requires when an actuary selects a model, relies on its scores and discloses its limitations.
> - **GH-101:** Risk scores appear as one of the risk assessment mechanisms used in group underwriting and case-specific pricing, alongside prior claims experience and medical underwriting.

> [!warning]- Exam traps
> - **Divide to normalize, multiply to pay:** Normalizing experience divides cost by the relative score, while setting a payment multiplies a base rate by it. Multiplying the PMPM by the score when comparing groups doubles the effect of health status instead of removing it.
> - **The right reference:** A relative score must be measured against the same population that defines the base rate. Using raw scores against a base rate set for the statewide average, when the scores average 1.06, overpays every plan by 6%.
> - **Concurrent or prospective:** A concurrent score explains this year's cost and a prospective one predicts next year's. Using a concurrent score to price next year treats this year's acute events, such as a fracture, as if they will recur.
> - **Comparable scores:** Scores from different models, model versions or calibration years are on different scales. They have to be renormalized to a common base before they are compared or averaged.
> - **Coding drift:** A plan whose coding becomes more complete shows a higher score without its members being sicker. That is why Medicare applies a coding intensity reduction, and why a rising score is not on its own evidence of a sicker population.
