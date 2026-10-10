---
aliases:
  - Social Determinant
  - SDOH Derived Statistics
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:927ed30880c3811e9bd00dced3e0b5ccb5b0d0b9c45605e4d72746a7ce0cf0f2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Social Determinants of Health.md
---
**Social determinants of health** (SDOH) are the non-medical conditions in which people are born, live, learn, work and age, such as income, housing, education, neighbourhood, transport, food security and social support, that shape their health and therefore their health care costs. For the health actuary they explain part of the variation in cost that diagnoses miss, and SDOH derived statistics, measures built from these conditions at the member or neighbourhood level, enter pricing, [[Health Risk Adjustment|risk adjustment]] and program evaluation.

> $$R_i = R_i^{\text{clin}} + \sum_{k} \gamma_k\, z_{ik}$$

> $$\text{NSS}_a = \frac{1}{K}\sum_{k=1}^{K} \frac{x_{ak} - \mu_k}{\sigma_k}$$

> $$\text{Cap}_p = \text{Base} \times \frac{\bar{R}_p}{\bar{R}}$$

> $$\hat{\Delta} = \left(\bar{Y}^{T}_1 - \bar{Y}^{T}_0\right) - \left(\bar{Y}^{C}_1 - \bar{Y}^{C}_0\right)$$

- **Symbols:** $R_i^{\text{clin}}$ is member $i$'s clinical risk score from diagnoses and demographics, $z_{ik}$ is the member's value of SDOH variable $k$, such as an indicator of unstable housing or the stress score of the member's neighbourhood, and $\gamma_k$ is its coefficient. $\text{NSS}_a$ is a composite score for area $a$, the average of $K$ census measures $x_{ak}$, each standardized by its mean $\mu_k$ and standard deviation $\sigma_k$ across areas. $\bar{R}_p$ and $\bar{R}$ are the plan's and the market's average scores, Base is the capitation for an average member, and $\hat{\Delta}$ is a difference-in-differences estimate comparing a treated group $T$ with a comparison group $C$ before (0) and after (1) a program.
- **The domains:** A common framework, the U.S. Healthy People 2030 initiative, groups SDOH into economic stability, education access and quality, health care access and quality, neighbourhood and built environment, and social and community context. Poverty, unstable housing and food insecurity are associated with more chronic disease, more emergency and inpatient use, and worse adherence to treatment.
- **How they affect cost:** SDOH can raise cost, for example through avoidable admissions when a member has no stable place to recover. They can also lower measured cost, when barriers to access mean needed care isn't received. A model that sees only claims reads the second effect as good health, which is why claims-based scores can understate the needs of disadvantaged members.
- **Sources of SDOH data:** Area-level measures link a member's address to census data for the block group or tract, through indexes such as the Area Deprivation Index, the Social Vulnerability Index or a neighbourhood stress score. Member-level data come from screening questionnaires, ICD-10-CM Z codes (Z55 to Z65) that record social circumstances on a claim, and consumer data bought from vendors. Area measures cover everyone but describe the neighbourhood rather than the person, while Z codes are specific but rarely recorded.
- **Use in risk adjustment:** Adding SDOH variables to a payment model directs more money to plans and providers that serve disadvantaged members, so they are not penalized for doing so. The MassHealth model for Massachusetts Medicaid ACOs and managed care plans added variables such as housing instability, disability and a neighbourhood stress score to a diagnosis-based model, and ACO REACH adjusts its benchmarks for beneficiaries in deprived areas.
- **Use in traditional actuarial practice:** SDOH variables appear in population health analytics, in identifying members for [[Care Management Program|care management]], and in pricing Medicaid and other public programs. Their use in commercial underwriting and rating is limited by law and by concern about [[Proxy Discrimination|proxy discrimination]], since many are correlated with race and income.
- **Measuring program performance:** Programs that address SDOH, such as housing support, medically tailored meals or transport, are judged by their effect on cost and outcomes. Because members are rarely randomized, evaluations compare participants with a matched comparison group and use difference-in-differences to remove trends common to both groups, then compute savings and return on investment.

> [!example]- Capitation Adjusted for Social Risk {Example}
> A Medicaid plan's base capitation is \$500 PMPM for a member of average risk. Its members have an average clinical risk score of 1.05, 25% of them are unstably housed, and their average neighbourhood stress score is 1.2. Under an illustrative model, unstable housing adds 0.20 to a member's score and each unit of neighbourhood stress adds 0.05. The market averages 1.03 on the clinical model and 1.06 on the model with SDOH. Find the plan's capitation with and without the SDOH terms.
>
> > [!answer]-
> > The SDOH terms add to each member's score, so they add to the plan's average in the same way.
> > $$
> > \begin{align*}
> > \bar{R}_p &= 1.05 + 0.25(0.20) + 1.2(0.05) \\
> > &= 1.16 \\
> > \text{Cap}_p &= 500 \times \frac{1.16}{1.06} \\
> > &= 547.17 \\
> > \text{Cap}_p^{\text{clin}} &= 500 \times \frac{1.05}{1.03} \\
> > &= 509.71
> > \end{align*}
> > $$
> > The SDOH model pays the plan \$37.46 PMPM more, because its members face more social risk than the market average. Each model's scores are compared with that same model's market average, so the adjustment stays budget neutral across plans.

> [!example]- A Neighbourhood Stress Score {Example}
> A census block group has 28% of families below the poverty level, 9% of adults unemployed and 20% of households without a car. Across the state's block groups the means are 12%, 5% and 10%, with standard deviations of 8, 2.5 and 8 percentage points. Find the block group's stress score as the average of the three standardized measures.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{NSS} &= \frac{1}{3}\left(\frac{28 - 12}{8} + \frac{9 - 5}{2.5} + \frac{20 - 10}{8}\right) \\
> > &= \frac{1}{3}\left(2.00 + 1.60 + 1.25\right) \\
> > &= 1.62
> > \end{align*}
> > $$
> > The block group sits about 1.6 standard deviations above the state average on social stress. Every member living there receives the same score, which is the strength and the weakness of an area-level measure.

> [!tip]- How it appears on the exam
> - **GH-301 explanation:** Candidates explain what the social determinants of health are and how they affect the cost of health care, with examples from housing, income and neighbourhood.
> - **GH-301 programs:** Questions ask how a program addressing SDOH is designed and how its performance is measured, such as by a comparison group, difference-in-differences and an ROI.
> - **GH-301 actuarial models:** Candidates describe the current use of SDOH in actuarial practice and evaluate SDOH derived statistics, such as a neighbourhood stress score or housing indicator in the MassHealth model, including a calculation of an adjusted risk score or capitation.

> [!warning]- Exam traps
> - **Area is not individual:** An area-level score assigns every resident the neighbourhood's value. It cannot tell a well-off resident of a poor area from a poor one, so it adjusts payment for groups well and for individuals poorly.
> - **Low cost is not low need:** Members facing access barriers may have low claims because they don't receive care. Treating their low cost as low risk underpays the plans that serve them, which is the bias SDOH adjustment tries to correct.
> - **Consistent normalization:** A plan's SDOH-inclusive score must be divided by the market average on the same SDOH-inclusive model. Mixing it with the clinical model's average overstates the plan's relative risk.
> - **Correlation and fairness:** Many SDOH variables are correlated with race and other protected characteristics. Using them to direct funding toward need is different from using them to raise a member's premium, and the two uses face different legal and ethical limits.
