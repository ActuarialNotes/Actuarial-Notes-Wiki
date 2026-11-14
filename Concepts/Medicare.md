---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:98adca78655adeeecc580e3864316e9e0b6593f0dcb9740241ca3a86eae06437
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Medicare.md
---
**Medicare** is the U.S. federal [[Social Insurance|social insurance]] program that pays for health care for people aged 65 and over, for younger people who have received Social Security disability benefits for two years, and for people with end-stage renal disease. It is run by the Centers for Medicare & Medicaid Services (CMS) in four parts.

| Part | What it covers | How it is paid for |
| :--- | :--- | :--- |
| A, hospital insurance | Inpatient hospital stays, skilled nursing facility care after a hospital stay, hospice and some home health care | Mainly a payroll tax on employers and employees |
| B, medical insurance | Physician services, outpatient care, preventive services and durable medical equipment | A monthly premium for about a quarter of its cost, general federal revenue for the rest |
| C, Medicare Advantage | Everything Parts A and B cover, through a private plan | A monthly CMS payment per member, set from the plan's bid |
| D, prescription drugs | Drugs, through a private plan alone or within an MA plan | Private plans paid on bids against a national average |

Most beneficiaries pay no premium for Part A because they or a spouse paid the payroll tax while working. Part A has a deductible per benefit period. Part B is voluntary, and the beneficiary pays an annual deductible and coinsurance of 20% of allowed charges. Original Medicare (Parts A and B) has no out-of-pocket maximum.

## Medicare Advantage bids and rebates

A beneficiary can instead enroll in a private Medicare Advantage (MA) plan, usually a managed care plan with a network. Each plan submits a bid $b$ for Part A and B coverage of a member of average risk, per member per month (PMPM). CMS compares it with a county benchmark $B$ derived from fee-for-service spending, increased for plans with high quality star ratings. A plan that bids below the benchmark is paid its bid and receives a rebate of

> $$\text{Rebate} = \rho \times \max(B - b,\ 0)$$

- $\rho$ is the rebate percentage, set by the plan's star rating.

The rebate must go back to members as extra benefits or lower premiums, so it is not profit. A plan that bids above the benchmark is paid the benchmark, and its members pay the excess as a premium.

## Risk adjustment

CMS pays each MA member's capitation at the plan's rate times the member's risk score, so a plan with sicker members is paid more and has no reason to avoid them. Under the CMS hierarchical condition category (CMS-HCC) model, member $i$'s risk score is

> $$R_i = \left(d_i + \sum_{h \in H_i} \beta_h\right) \frac{1 - c}{N}$$

- $d_i$ is the demographic factor for the member's age, sex, Medicaid status and reason for entitlement.
- $H_i$ is the set of condition categories the member's diagnoses map to.
- $\beta_h$ is the coefficient of category $h$.
- $N$ is the normalization factor, which makes the average fee-for-service beneficiary score 1.0 in the payment year.
- $c$ is the coding adjustment for the more complete coding that MA plans achieve compared with fee-for-service.

The model is prospective: diagnoses recorded in one year set the score for the next, so a condition first diagnosed during the payment year does not raise that year's payment. Within a hierarchy of related conditions only the most severe one counts, so a member with a severe and a milder form of the same condition gets only the severe category's coefficient. The member's monthly payment is

> $$\text{Pay}_i = R_i \times \min(b,\ B)$$

> [!example]- What is this plan's rebate per member, and its payment for this member? {Example}
> A Medicare Advantage plan bids $\$1{,}000$ PMPM against a county benchmark of $\$1{,}100$, and its star rating earns a rebate percentage of 65%. A member has an illustrative demographic factor of 0.45 and two condition categories with illustrative coefficients 0.30 (diabetes with chronic complications) and 0.33 (congestive heart failure). The normalization factor is 1.05 and the coding adjustment 5.9%.
>
> > [!answer]-
> > - The bid is below the benchmark, so the plan is paid on its bid.
> > - The rebate is $0.65 \times (1{,}100 - 1{,}000) = \$65.00$ per member.
> > - The raw score is $0.45 + 0.30 + 0.33 = 1.08$.
> > - The payment score is $1.08 \times (1 - 0.059)/1.05 = 1.08 \times 0.896190 = 0.9679$.
> > - The payment is $0.9679 \times 1{,}000 = \$967.90$ a month, and the $\$65.00$ rebate funds supplemental benefits or lower premiums.

Part D plans are paid with their own risk adjustment model (RxHCC).

## Medicare Supplement

Private Medicare Supplement (Medigap) policies pay the deductibles and coinsurance of Original Medicare. The benefits come in standardized plans identified by letters, so insurers compete on price and service rather than coverage. A supplement is not used with a Medicare Advantage plan, which replaces Original Medicare's cost sharing with its own. The claim cost moves with Medicare's own cost sharing, which makes its trend leveraged: a fixed deductible absorbs none of an increase in allowed charges.

> [!example]- What is this supplement's annual claim cost and PMPM, and how much does its Part B cost rise? {Example}
> A Medicare Supplement plan pays the Part A inpatient deductible and the 20% Part B coinsurance, but not the Part B deductible. With illustrative figures, members have 0.25 admissions a year and the Part A deductible is $\$1{,}600$. Each member has $\$6{,}000$ of Part B allowed charges a year, and the Part B deductible is $\$250$. Allowed charges then rise 6%, and the Part B deductible does not change.
>
> > [!answer]-
> > - The Part A cost is $0.25 \times 1{,}600 = \$400$ a year.
> > - The Part B cost is $0.20 \times (6{,}000 - 250) = \$1{,}150$ a year.
> > - The PMPM is $(400 + 1{,}150)/12 = \$129.17$.
> > - After the increase, the Part B cost is $0.20 \times (6{,}360 - 250) = \$1{,}222$.
> > - It rises $1{,}222/1{,}150 - 1 = 6.26\%$, faster than the 6% trend in allowed charges, because the fixed deductible absorbs none of the increase.

## Medicare in Canada

In Canadian usage, "medicare" means the provincial single-payer system of [[Health Care Insurance]], which covers the whole population. The U.S. program leaves most people under 65 to employer coverage, [[Medicaid]] and individual coverage.

> [!trap] Paying on the raw risk score
> The payment uses the risk score after normalization and the coding adjustment. Multiplying the base rate by the raw sum of factors, 1.08 in the example instead of 0.9679, overpays the plan by more than 10%.
