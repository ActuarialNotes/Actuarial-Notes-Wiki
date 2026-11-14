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
  content_hash: sha256:89f7b7fc8e9789016e4ec57b77442e35231573e6cae5cc179628b440900832e9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Health Risk Adjustment.md
---

**Health Risk Adjustment** is the adjustment of revenue, capitation rates or claims experience for the expected health cost of the members a health plan or provider actually serves. It is measured by a **risk score** that a model assigns each member from their demographics, diagnoses or prescriptions.

Member $i$'s risk score is

> $$R_i = \sum_{k} \beta_k\, x_{ik}$$

- $x_{ik}$ is 1 when the member falls in demographic cell or condition category $k$, and 0 otherwise.
- $\beta_k$ is the coefficient the model assigns cell $k$, relative to the average cost of the population the model was calibrated on.

The relative risk score of a group or plan $g$ is

> $$\tilde{R}_g = \frac{\bar{R}_g}{\bar{R}}$$

- $\bar{R}_g$ is the member-month weighted average score of $g$.
- $\bar{R}$ is the average score over the reference population.

## Normalizing claims experience

To **normalize population claims experience**, an actuary divides a group's cost by its relative risk score, so that what remains reflects price, efficiency and benefit design rather than health status. The normalized cost is

> $$\text{PMPM}^{\text{adj}}_g = \frac{\text{PMPM}_g}{\tilde{R}_g}$$

- $\text{PMPM}_g$ is the group's claim cost per member per month.

> [!example]- Which of these two groups has the higher underlying cost once health status is removed? {Example}
> Two employer groups are on the same benefit plan in the same area. The scores come from the same model and are relative to the insurer's book, which averages 1.00.
>
> | Group | Claim cost (PMPM) | Average risk score |
> | :--- | ---: | ---: |
> | A | \$520 | 1.30 |
> | B | \$380 | 0.85 |
>
> > [!answer]-
> > - Group A's normalized cost is $520/1.30 = \$400.00$ PMPM.
> > - Group B's normalized cost is $380/0.85 = \$447.06$ PMPM.
> > - Group A costs 37% more on the raw figures, but only because its members are sicker.
> > - For a member of average health, Group B costs about 11.8% more, which points to higher unit prices, heavier use of services or a less efficient provider network.
> > - A renewal that charged Group B less on the strength of its raw PMPM would underprice it.

## Risk-adjusted capitation

A payment is set the other way round, by multiplying a base rate by the relative score. A plan's capitation is

> $$\text{Cap}_g = \text{Base} \times \tilde{R}_g$$

- $\text{Base}$ is the capitation rate for a member of average risk.

The relative score must be measured against the same population that defines the base rate. Using raw scores against a base rate set for the statewide average, when the scores average 1.06, overpays every plan by 6%. Measured against the enrollment-weighted average of the plans' scores, the adjustment is budget neutral. It moves money between plans without changing the payer's total cost.

> [!example]- What is each plan's budget-neutral capitation? {Example}
> A state pays two managed care plans for one rate cell, with a base capitation of \$450 PMPM for a member of average risk. The state wants the adjustment to move money between the plans without changing its total cost.
>
> | Plan | Member months | Average risk score |
> | :--- | ---: | ---: |
> | A | 6,000 | 1.18 |
> | B | 9,000 | 0.98 |
>
> > [!answer]-
> > - The enrollment-weighted average score is $(6{,}000 \times 1.18 + 9{,}000 \times 0.98)/15{,}000 = 1.06$.
> > - Plan A's capitation is $450 \times 1.18/1.06 = \$500.94$ PMPM.
> > - Plan B's capitation is $450 \times 0.98/1.06 = \$416.04$ PMPM.
> > - The state pays $6{,}000 \times 500.94 + 9{,}000 \times 416.04 = \$6{,}750{,}000$, which is $15{,}000 \times \$450$, so the adjustment is budget neutral.
> > - Paying both plans \$450 would have overpaid Plan B by about \$34 PMPM and underpaid Plan A by about \$51.

## Types of risk adjustment models

| Model | Inputs | Examples |
| :--- | :--- | :--- |
| Demographic | Age, sex and eligibility category | The oldest models |
| Diagnosis-based | Diagnosis codes from claims or encounter data, mapped to condition categories | CMS-HCC for [[Medicare]] Advantage, HHS-HCC for the individual and small group markets, CDPS for [[Medicaid]] |
| Pharmacy-based | The drugs a member fills | MedicaidRx, RxHCC |
| Combined | Diagnoses and drugs | CDPS+Rx |

Demographic models are cheap and hard to game, but they explain little of the variation in cost, because most of it comes from the small share of members with serious conditions. In a diagnosis-based model, hierarchies let only the most severe condition in a family count, so a member is not paid twice for one disease. Pharmacy claims arrive within days and leave little room for coding discretion, but a pharmacy-based score depends on prescribing patterns, and a condition left untreated scores nothing.

A **concurrent** model explains cost in a period from diagnoses recorded in the same period, so it captures acute events and fits better. The ACA's HHS-HCC model is concurrent, and concurrent scores also suit judging a provider's efficiency after the fact. A **prospective** model predicts next period's cost from this period's diagnoses, which is what pricing, underwriting and choosing members for a [[Care Management Program|care management program]] need. The Medicare CMS-HCC model is prospective. Using a concurrent score to price next year treats this year's acute events, such as a fracture, as if they will recur.

## Normalization of risk scores

A model is calibrated on one population in one year, and scores drift as coding becomes more complete and the population changes. A plan whose coding becomes more complete shows a higher score without its members being sicker. Payers therefore rescale scores so the reference population averages 1.0, through the Medicare normalization factor and coding intensity reduction, or by making a Medicaid adjustment budget neutral. Scores from different models, model versions or calibration years are on different scales, so they are renormalized to a common base before they are compared or averaged.

## Uses

Medicare Advantage capitation is the plan's rate times each member's score. Medicaid capitation within a rate cell is scaled by each plan's relative score. Under the [[Affordable Care Act]], plans in a state market make zero-sum transfers to one another based on their scores. In group pricing, a risk score is one **risk assessment mechanism** alongside prior claims and medical underwriting. It is also used to profile providers and set [[Accountable Care Organization|accountable care organization]] benchmarks.

The goal is a payment under which a plan is indifferent to whether it enrolls a healthy or a sick member, so that no plan profits from avoiding the sick. ASOP No. 45, *The Use of Health Status Based Risk Adjustment Methodologies*, asks the actuary to consider the purpose of the work when selecting a model, the consistency of the data with the data the model was calibrated on, the model's limitations, and the effect of changes in coding practice, and to disclose them. ASOP No. 23 on data quality and ASOP No. 41 on communications apply to the same work.

In U.S. health practice the term means this payment and normalization tool, not the IFRS 17 [[Risk Adjustment for Non-Financial Risk|risk adjustment for non-financial risk]].

> [!trap] Multiplying by the score to normalize
> Normalizing experience divides cost by the relative score, and setting a payment multiplies a base rate by it. Multiplying Group A's \$520 PMPM by 1.30 gives \$676, which doubles the effect of health status instead of removing it. The normalized cost is $520/1.30 = \$400$.
