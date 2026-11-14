---
aliases:
  - Healthcare Claim
  - Private Data
  - Multiple Data
  - Common Healthcare Data
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b9c1d07318e1137eaab2fb906c80016f390fa4be69717d3054c6f1f77524dc29
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Healthcare Data.md
---
**Healthcare Data** are the records of who is covered, what care they received, what it cost and what was found, which health actuaries use for pricing, reserving, [[Health Risk Adjustment|risk adjustment]] and [[Predictive Analytics|predictive modelling]]. The most common source is the healthcare claim, a provider's bill as the payer adjudicated it, which is complete for paid services and carries standard [[Medical Coding|codes]] but was built to pay bills rather than to describe health.

The common sources are:

- **Medical claims**, as professional claims from physicians and facility claims from hospitals.
- **Pharmacy claims**, from the pharmacy benefit manager within days of the fill.
- **Eligibility data**, which record who was covered in each month and give the exposure.
- **Clinical and member data**, such as laboratory results, electronic health records, health risk assessments and member surveys, which add clinical values and behaviours that claims lack.
- **Provider files and area-level data**, such as census measures, which describe where and from whom members get care.

## Public and private data

| | Public data | Private data |
| --- | --- | --- |
| Released or owned by | Governments and research bodies | A payer, provider or vendor |
| Examples | National household and health surveys, hospital discharge databases, census data, Medicare public use and limited data sets | The insurer's own claims, a licensed multi-payer claims database |
| Strength | Broad and comparable | Detailed and current |
| Limit | Aggregated, sampled or delayed | Cover one population |

Medicare's limited data sets are released only under a data use agreement. The HIPAA privacy rule limits how protected health information in private data may be used and shared. Public data describe a national or program population, so applying their rates to a commercial block without adjustment ignores differences in benefits, prices and health status.

## Challenges of claims data

1. Claims arrive with a lag, so recent months look cheap until they are completed.
2. Diagnoses are coded to support payment, and coding practice drifts.
3. One claim can be adjusted or reversed several times, so summing every record without netting reversals double counts cost.
4. Under coordination of benefits a secondary payer sees only part of the cost.
5. Capitated services generate encounter records with no paid amount, and carved-out benefits such as behavioural health or pharmacy may sit with another vendor.
6. Members join and leave, so many have only part-year histories.
7. A few high-cost claimants dominate the totals.

## Completing paid claims

Paid claims are completed before they are modelled. This is the completion step of the [[Claim Reserve|claim reserve]] calculation. If $f_j$ is the paid development factor from lag $j$ to lag $j+1$, with the last one running to ultimate, the completion factor at lag $k$, the share of a month's ultimate claims paid by then, is

> $$CF_k = \frac{1}{\prod_{j \geq k} f_j}$$

The completed claims for services incurred in month $m$ are

> $$\hat{C}_m = \frac{P_m}{CF_{k(m)}}$$

- $P_m$ is what has been paid to date for month $m$.
- $k(m)$ is the month's lag at the valuation date.

The difference between completed and paid claims is the [[IBNR]] and pending claims. The cost per member per month is

> $$\text{PMPM} = \frac{\sum_m \hat{C}_m}{\sum_m \text{MM}_m}$$

- $\text{MM}_m$ is month $m$'s member months from the eligibility data.

Members with no claims still belong in the member months, and part-year records in a member-level model need their member months as an exposure weight or offset.

> [!example]- What is the completed PMPM for each month of this quarter? {Example}
> An analyst builds a model on claims incurred October to December, paid through December 31. Each month has 10,000 member months. The paid development factors are 2.50 from lag 0 to lag 1, 1.10 from lag 1 to lag 2, and 1.02 from lag 2 to ultimate.
>
> | Month | Lag | Paid to date |
> | :--- | ---: | ---: |
> | October | 2 | $\$1{,}870{,}000$ |
> | November | 1 | $\$1{,}640{,}000$ |
> | December | 0 | $\$700{,}000$ |
>
> > [!answer]-
> > - The completion factors are $CF_2 = 1/1.02 = 0.9804$, $CF_1 = 1/1.122 = 0.8913$ and $CF_0 = 1/2.805 = 0.3565$.
> > - October completes to $1{,}870{,}000 \times 1.02 = \$1{,}907{,}400$.
> > - November completes to $1{,}640{,}000 \times 1.122 = \$1{,}840{,}080$.
> > - December completes to $700{,}000 \times 2.805 = \$1{,}963{,}500$.
> > - The completed PMPMs are $\$190.74$, $\$184.01$ and $\$196.35$, against paid PMPMs of $\$187.00$, $\$164.00$ and $\$70.00$. Completion adds about $\$1.50$ million of unpaid claims.
> > - A model trained on paid claims would learn that costs collapse in December.

> [!example]- An eligibility file shows 1,200 distinct members and 10,800 member months, with $\$4{,}320{,}000$ of completed claims. What is the PMPM? {Example}
> - The PMPM is $4{,}320{,}000/10{,}800 = \$400$.
> - Treating every member as covered all year gives $4{,}320{,}000/14{,}400 = \$300$, which overstates exposure by a third and understates cost by 25%.

## Combining multiple data sources

Answering one question often needs several sources linked on a member identifier, such as claims joined to eligibility for exposure, to pharmacy for drug use and to lab results for severity. Identifiers differ between vendors, so a matching step and a match rate are part of the work. Totals are reconciled to the financial statements, as [[Data Quality|ASOP No. 23]] requires, before the data are relied on.

A question answered from data rests on a study design. Randomized trials assign the intervention, cohort studies follow groups forward, case-control studies compare people with and without an outcome, and cross-sectional studies observe one point in time. Observational designs need adjustment for confounding before an effect is attributed to a cause.

Health data are sensitive, so modelling needs a lawful basis, minimal use of identifiers and attention to fairness. A model that predicts cost as a stand-in for medical need inherits differences in access to care, which is a form of [[Proxy Discrimination|proxy discrimination]], and the actuary's [[Data Ethics|data ethics]] obligations apply.

> [!trap] Dividing by a development factor
> A completion factor is below 1 and is divided into paid claims. A development factor is above 1 and is multiplied. Dividing October's $\$1{,}870{,}000$ by 1.02 gives $\$1{,}833{,}333$, which shrinks the claims instead of completing them.
