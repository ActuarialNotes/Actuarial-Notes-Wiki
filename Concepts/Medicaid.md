---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:70cbba2819cc3fa557de9fc6209fddbbeabfcc52f57ea0ddc558d8f01044e2bf
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Medicaid.md
---
**Medicaid** is the U.S. health coverage program for people with low income, financed jointly by the federal government and the states and run by each state within federal rules. Most states deliver it through managed care organizations (MCOs) paid a monthly capitation per member, adjusted for the health risk of each plan's members.

## Federal and state shares

The federal medical assistance percentage (FMAP), the federal share of a state's Medicaid spending on medical services, is

> $$\text{FMAP} = 1 - 0.45\left(\frac{y_s}{y_{\text{US}}}\right)^{2}$$

- $y_s$ and $y_{\text{US}}$ are per capita income in the state and in the U.S.
- The FMAP is kept within a floor of 50% and a ceiling of 83%.

A poorer state gets a higher federal share. The ratio is squared before it is multiplied by 0.45, so a state at 90% of U.S. income has an FMAP of 63.55%, not 59.5%. Adults covered by the Affordable Care Act ([[Affordable Care Act|ACA]]) expansion carry a federal match of 90%. The Children's Health Insurance Program (CHIP), which covers children in families above the Medicaid income limit, carries an enhanced match that moves the regular FMAP 30% of the way toward 100%. Applying the regular FMAP to the whole program understates the federal share in an expansion state.

> [!example]- What are this state's FMAP, its own share of the spending and its CHIP match? {Example}
> A state's per capita income is 90% of the U.S. figure. It spends $\$10$ billion on its traditional Medicaid population and $\$3$ billion on ACA expansion adults, matched at 90%.
>
> > [!answer]-
> > - The FMAP is $1 - 0.45 \times 0.90^2 = 0.6355$, within the 50% to 83% bounds, so it applies unchanged.
> > - The state pays $(1 - 0.6355)(10) = \$3.645$ billion for the traditional population.
> > - It pays $(1 - 0.90)(3) = \$0.300$ billion for the expansion adults.
> > - Its share is $\$3.945$ billion of the $\$13$ billion, and federal funds pay the other $\$9.055$ billion.
> > - Its CHIP match is $0.6355 + 0.30(1 - 0.6355) = 74.49\%$.
> > - Each dollar the state spends on expansion adults brings nine federal dollars, against about 1.74 for its traditional population.

## Eligibility

Medicaid covers children, pregnant women, parents, people with disabilities and the elderly poor, and in states that adopted the ACA expansion, low-income adults under 65. Eligibility depends on income measured against the federal poverty level and on belonging to a covered group. The ACA set the expansion group at incomes up to 138% of the poverty level, and a 2012 Supreme Court decision made the expansion optional for each state.

People eligible for both programs are the dual eligibles. For them [[Medicare]] pays first, and Medicaid pays the cost sharing and the services Medicare excludes, above all nursing home care. Pricing a Medicaid rate cell for dual eligibles as if Medicaid paid hospital and physician claims in full overstates its cost.

## Benefits

Federal rules require mandatory benefits, such as hospital, physician, laboratory and nursing facility services, and let each state add optional ones such as prescription drugs, dental and home- and community-based services. Cost sharing is low or zero, so the program's cost depends on [[Utilization|utilization]] and on the [[Provider Reimbursement|reimbursement]] levels the state sets, which are usually below those of commercial payers.

## Managed care capitation

Capitation rates must be actuarially sound and certified by an actuary. They are built from base experience for each rate cell, defined by age, sex, eligibility category and region, adjusted for program and benefit changes, projected with [[Trend|trend]], and loaded for administration and margin. The capitation rate for rate cell $c$ is

> $$\text{Cap}_c = \frac{\text{PMPM}_c}{1 - \ell}$$

- $\text{PMPM}_c$ is the projected claim cost per member per month for the cell.
- $\ell$ is the load for administration and margin as a share of the rate.

## Risk adjustment

Within a rate cell, a plan that enrolls sicker members than its competitors would lose money at a flat rate. States therefore pay plan $p$ its rate cell's capitation scaled by its members' relative risk,

> $$\text{Cap}_{p,c} = \text{Cap}_c \times \frac{\bar{R}_{p}}{\bar{R}}$$

- $\bar{R}_p$ is the average risk score of plan $p$'s members.
- $\bar{R}$ is the enrollment-weighted average over all plans.

The models, such as the Chronic Illness and Disability Payment System (CDPS), score members from diagnoses and often pharmacy data. The adjustment is usually budget neutral: it moves money between plans without changing the state's total cost. Medicaid members move in and out of eligibility as their income changes, so many have short enrollment histories and little claim data. The models must handle partial-year members, and the scores of a new or growing plan are less reliable, which is a [[Credibility|credibility]] problem as much as a modelling one.

> [!example]- What is each plan's risk-adjusted rate, and does the state's total payment change? {Example}
> In one rate cell the base capitation is $\$400$ PMPM. Plan A has 60,000 members with an average risk score of 1.10, and Plan B has 40,000 members with an average of 0.90.
>
> > [!answer]-
> > - The enrollment-weighted average is $\bar{R} = [60{,}000(1.10) + 40{,}000(0.90)]/100{,}000 = 1.02$.
> > - Plan A is paid $400 \times 1.10/1.02 = \$431.37$ PMPM.
> > - Plan B is paid $400 \times 0.90/1.02 = \$352.94$ PMPM.
> > - The total is $60{,}000(431.37) + 40{,}000(352.94) \approx \$40$ million a month, the same as a flat $\$400$.
> > - The raw scores would pay $\$440$ and $\$360$, about $\$0.8$ million more a month, so dividing by 1.02 is what keeps the adjustment budget neutral.

> [!trap] Averaging the plans' scores without weights
> Budget neutrality needs the enrollment-weighted average risk score. A simple average of the plans' scores, here $1.00$ instead of $1.02$, changes the state's total cost whenever the plans differ in size.
