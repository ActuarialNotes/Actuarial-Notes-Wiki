---
aliases:
  - Reimbursement
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:df7be7cb1ff7524dc3f175516a84c25d5f7c5da967ad392516c7007236cc2e26
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Provider Reimbursement.md
---
**Provider reimbursement** is the method and the amount by which a payer, such as an insurer, a health plan or a government program, pays physicians, hospitals and other providers for the care its members receive. The method sets the unit the payer pays for, from a single service up to a member's total care for a year, and with it how the financial risk of [[Utilization|utilization]] and cost is shared between payer and provider.

> $$\text{Fee} = \left(\sum_{k} \text{RVU}_k \times \text{GPCI}_k\right) \times \text{CF}$$

> $$\text{Pay}_{\text{DRG}} = W_d \times B$$

> $$\text{Cap} = \text{PMPM} \times \text{MM}$$

> $$\text{SS} = s \times q \times (\text{Bench} - \text{Actual})$$

- **Symbols:** In the fee schedule, $\text{RVU}_k$ is a service's relative value units for component $k$ (physician work, practice expense and malpractice), $\text{GPCI}_k$ is the geographic practice cost index for that component, and CF is the conversion factor in dollars per unit. $W_d$ is the relative weight of diagnosis related group $d$ and $B$ the hospital's base rate. MM is member months. In the shared savings formula, $s$ is the provider's sharing rate, $q$ its quality score, and Bench and Actual are the benchmark and actual total cost of the attributed population.
- **Fee-for-service:** The payer pays for each service, either as billed charges, as a percent of charges (a discount off the provider's own list prices), or from a fee schedule. The resource-based relative value scale (RBRVS) that Medicare uses for physicians ranks every service in relative value units, and many commercial contracts pay a negotiated percentage of the Medicare fee schedule. The provider bears little risk, and more services mean more revenue.
- **Per diem:** A hospital is paid a fixed amount for each day of an inpatient stay, often by type of care. The payer knows the price of a day but still bears the risk of the number of admissions and the length of stay.
- **Case rates and DRGs:** A diagnosis related group (DRG) system pays one amount per admission, the base rate times the weight of the patient's DRG, whatever the length of stay. The hospital now bears the cost of a long stay, which rewards shorter stays but can reward discharging too early or readmitting. Outlier provisions pay extra for cases far above the DRG's normal cost.
- **Capitation:** The provider receives a fixed amount per member per month (PMPM) for a defined set of services, whatever the members use. The provider bears the utilization risk for those services, which needs enough members to be stable and can encourage under-treatment, so it is paired with quality measures and sometimes with stop-loss protection.
- **Bundled payments:** A single price covers all the services in an episode of care, such as a joint replacement from admission through 90 days after discharge, across the hospital, surgeon and post-acute providers. It sits between a case rate and capitation, putting the providers at risk for the cost of the episode but not for how many episodes occur.
- **Value-based payment and ACOs:** Value-based arrangements add incentives for cost and quality on top of a base payment, through pay-for-performance bonuses, withholds or shared savings. An accountable care organization (ACO) is measured against a risk-adjusted benchmark for its attributed population's total cost. It shares in savings only if they exceed a minimum savings rate, so that random variation isn't rewarded, and in two-sided models it also repays part of any losses.
- **The spectrum of risk:** Moving from fee-for-service through per diem, case rates, bundles and capitation transfers more of the cost risk from payer to provider. Each step reduces the incentive to over-treat and increases the incentive to under-treat, which is why the evaluation in practice weighs cost and quality together.

> [!example]- One Hospital Stay Under Four Methods {Example}
> A patient's admission falls in a DRG with an illustrative weight of 1.40. The hospital's billed charges are \$40,000 for a 5-day stay. Its contracts pay either 55% of charges, a per diem of \$3,200, or a DRG base rate of \$11,500. Find the payment under each. Then repeat for a complicated 8-day stay in the same DRG with charges of \$60,000 that does not reach the outlier threshold.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Pay}_{\text{\%chg}} &= 0.55 \times 40{,}000 \\
> > &= 22{,}000 \\
> > \text{Pay}_{\text{diem}} &= 3{,}200 \times 5 \\
> > &= 16{,}000 \\
> > \text{Pay}_{\text{DRG}} &= 1.40 \times 11{,}500 \\
> > &= 16{,}100
> > \end{align*}
> > $$
> > Billed charges pay the full \$40,000. For the 8-day stay:
> > $$
> > \begin{align*}
> > \text{Pay}_{\text{\%chg}} &= 0.55 \times 60{,}000 \\
> > &= 33{,}000 \\
> > \text{Pay}_{\text{diem}} &= 3{,}200 \times 8 \\
> > &= 25{,}600
> > \end{align*}
> > $$
> > The DRG payment stays at \$16,100. Under percent of charges and per diem the payer pays for the longer stay, and under the DRG the hospital absorbs it. That is the incentive each method creates for managing length of stay.

> [!example]- Shared Savings for an ACO {Example}
> An ACO has 10,000 attributed members and a risk-adjusted benchmark of \$1,000 PMPM. Their actual cost for the year is \$960 PMPM. The contract shares 50% of savings, scaled by the quality score, provided the savings are at least a minimum savings rate of 2% of the benchmark. The ACO's quality score is 90%. Find its shared savings payment, and decide whether it would earn one if actual cost had been \$985 PMPM.
>
> > [!answer]-
> > The savings rate is $(1{,}000 - 960)/1{,}000 = 4\%$, above the 2% minimum.
> > $$
> > \begin{align*}
> > \text{Savings} &= (1{,}000 - 960) \times 120{,}000 \\
> > &= 4{,}800{,}000 \\
> > \text{SS} &= 0.50 \times 0.90 \times 4{,}800{,}000 \\
> > &= 2{,}160{,}000
> > \end{align*}
> > $$
> > The ACO earns \$2,160,000, and the payer keeps the remaining \$2,640,000 of the savings. At \$985 PMPM the savings rate is 1.5%, below the minimum, so the ACO earns nothing even though cost was under the benchmark.

> [!tip]- How it appears on the exam
> - **GH-301:** The Provider Contracting and Reimbursement section asks candidates to describe contracts between payers and providers, to calculate provider payments under various reimbursement methods, and to evaluate standard contracting methods and ACOs from a cost and quality perspective. The calculations turn a service or a stay into a payment under a fee schedule, a percent of charges, a per diem, a DRG, a bundle or capitation, and compute an ACO's shared savings or losses against its benchmark. The written parts ask which party bears which risk under each method and what behaviour it encourages.

> [!warning]- Exam traps
> - **Length of stay:** A DRG payment does not change with the length of stay, but a per diem does. Multiplying a DRG payment by days, or treating a per diem as a case rate, gets the payment and the risk transfer wrong.
> - **Percent of charges:** A contract at a percent of charges pays more when the hospital raises its list prices. A discount off charges isn't a fixed price, and comparing it with a per diem needs the charges per day.
> - **Minimum savings rate:** Savings below the minimum savings rate earn nothing, and above it the share usually applies to all the savings, not only the part above the minimum. Check which one the contract specifies before computing.
> - **Benchmark adjustment:** An ACO's benchmark is risk-adjusted. Comparing its cost with the prior year's unadjusted cost rewards an ACO whose population became healthier and penalizes one whose population became sicker.
> - **Capitation scope:** A capitation rate covers only the services listed in the contract. Services carved out, such as drugs or out-of-network care, stay with the payer and must be priced separately.
