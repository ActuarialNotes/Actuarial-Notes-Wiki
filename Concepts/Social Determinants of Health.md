---
aliases:
  - Social Determinant
  - SDOH Derived Statistics
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2b4380e59a056a92866392670968d5d664a26111ff8f5b194f41105d0804bb3f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Social Determinants of Health.md
---
**Social Determinants of Health** (SDOH) are the non-medical conditions in which people are born, live, learn, work and age, such as income, housing, education, neighbourhood, transport, food security and social support, that shape their health and therefore their health care costs. They explain part of the variation in cost that diagnoses miss. **SDOH derived statistics**, measures built from these conditions at the member or neighbourhood level, enter pricing, [[Health Risk Adjustment|risk adjustment]] and program evaluation.

A common framework, the U.S. Healthy People 2030 initiative, groups SDOH into five domains:

1. Economic stability.
2. Education access and quality.
3. Health care access and quality.
4. Neighbourhood and built environment.
5. Social and community context.

## How SDOH affect cost

Poverty, unstable housing and food insecurity are associated with more chronic disease, more emergency and inpatient use, and worse adherence to treatment. SDOH can raise cost, for example through avoidable admissions when a member has no stable place to recover. They can also lower measured cost, when barriers to access mean needed care isn't received. A model that sees only claims reads the second effect as good health, so claims-based scores can understate the needs of disadvantaged members and underpay the plans that serve them.

## Sources of SDOH data

| | Area-level measures | Member-level data |
| --- | --- | --- |
| Source | A member's address linked to census data for the block group or tract | Screening questionnaires, ICD-10-CM Z codes (Z55 to Z65) on claims, consumer data bought from vendors |
| Examples | Area Deprivation Index, Social Vulnerability Index, a neighbourhood stress score | A housing instability flag |
| Strength | Covers everyone | Specific to the person |
| Limit | Describes the neighbourhood, not the person | Z codes are rarely recorded |

An area-level score assigns every resident the neighbourhood's value. It cannot tell a well-off resident of a poor area from a poor one, so it adjusts payment for groups well and for individuals poorly. A composite area score averages $K$ census measures, each standardized across areas. For area $a$ it is

> $$\text{NSS}_a = \frac{1}{K}\sum_{k=1}^{K} \frac{x_{ak} - \mu_k}{\sigma_k}$$

- $x_{ak}$ is area $a$'s value of census measure $k$.
- $\mu_k$ and $\sigma_k$ are that measure's mean and standard deviation across areas.

> [!example]- What is this block group's neighbourhood stress score? {Example}
> A census block group has 28% of families below the poverty level, 9% of adults unemployed and 20% of households without a car. Across the state's block groups the means are 12%, 5% and 10%, with standard deviations of 8, 2.5 and 8 percentage points.
>
> > [!answer]-
> > - The standardized measures are $(28 - 12)/8 = 2.00$, $(9 - 5)/2.5 = 1.60$ and $(20 - 10)/8 = 1.25$.
> > - Their average is $(2.00 + 1.60 + 1.25)/3 = 1.62$.
> > - The block group sits about 1.6 standard deviations above the state average on social stress, and every member living there receives that score.

## Use in risk adjustment

Adding SDOH variables to a payment model directs more money to plans and providers that serve disadvantaged members, so they are not penalized for doing so. The MassHealth model for Massachusetts Medicaid ACOs and managed care plans added variables such as housing instability, disability and a neighbourhood stress score to a diagnosis-based model. [[Accountable Care Organization#The benchmark|ACO REACH]] adjusts its benchmarks for beneficiaries in deprived areas. With SDOH terms, member $i$'s risk score is

> $$R_i = R_i^{\text{clin}} + \sum_{k} \gamma_k\, z_{ik}$$

- $R_i^{\text{clin}}$ is the member's clinical risk score from diagnoses and demographics.
- $z_{ik}$ is the member's value of SDOH variable $k$, such as an indicator of unstable housing or the stress score of the member's neighbourhood.
- $\gamma_k$ is that variable's coefficient.

A plan's capitation is then

> $$\text{Cap}_p = \text{Base} \times \frac{\bar{R}_p}{\bar{R}}$$

- $\text{Base}$ is the capitation for an average member.
- $\bar{R}_p$ and $\bar{R}$ are the plan's and the market's average scores on the same model.

> [!example]- What is this Medicaid plan's capitation with and without the SDOH terms? {Example}
> A plan's base capitation is $\$500$ PMPM for a member of average risk. Its members have an average clinical risk score of 1.05, 25% of them are unstably housed, and their average neighbourhood stress score is 1.2. Under an illustrative model, unstable housing adds 0.20 to a member's score and each unit of neighbourhood stress adds 0.05. The market averages 1.03 on the clinical model and 1.06 on the model with SDOH.
>
> > [!answer]-
> > - The SDOH terms add to each member's score, so the plan's average is $1.05 + 0.25(0.20) + 1.2(0.05) = 1.16$.
> > - With SDOH the capitation is $500 \times 1.16/1.06 = \$547.17$.
> > - Without SDOH it is $500 \times 1.05/1.03 = \$509.71$.
> > - The SDOH model pays the plan $\$37.46$ PMPM more, because its members face more social risk than the market average.

## Use in actuarial practice

SDOH variables appear in population health analytics, in identifying members for [[Care Management Program|care management]], and in pricing Medicaid and other public programs. Their use in commercial underwriting and rating is limited by law and by concern about [[Proxy Discrimination|proxy discrimination]], since many are correlated with race and income. Using them to direct funding toward need is different from using them to raise a member's premium, and the two uses face different legal and ethical limits.

## Measuring program performance

Programs that address SDOH, such as housing support, medically tailored meals or transport, are judged by their effect on cost and outcomes. Members are rarely randomized, so evaluations compare participants with a matched comparison group and use difference-in-differences to remove trends common to both groups, before computing savings and return on investment. Comparing a treated group $T$ with a comparison group $C$ before (0) and after (1) a program, the estimated effect is

> $$\hat{\Delta} = \left(\bar{Y}^{T}_1 - \bar{Y}^{T}_0\right) - \left(\bar{Y}^{C}_1 - \bar{Y}^{C}_0\right)$$

- $\bar{Y}$ is the group's average outcome in the period, such as cost PMPM.

> [!example]- Participants' cost goes from $\$1{,}000$ to $\$1{,}050$ PMPM and the comparison group's from $\$1{,}000$ to $\$1{,}100$. What is the program's estimated effect? {Example}
> - Participants' cost rose $\$50$ and the comparison group's rose $\$100$.
> - The estimated effect is $50 - 100 = -\$50$ PMPM, a saving, although participants' own cost went up.

> [!trap] Dividing by the wrong market average
> A plan's SDOH-inclusive score is divided by the market average on the same SDOH-inclusive model. Dividing 1.16 by the clinical model's 1.03 gives $\$563.11$ instead of $\$547.17$ and overstates the plan's relative risk.
