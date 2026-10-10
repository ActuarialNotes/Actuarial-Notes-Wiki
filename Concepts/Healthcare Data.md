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
  content_hash: sha256:21071ede942f8c15b889417879e6afa380e7f31216bb2a70b4c5237a2c014e1e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Healthcare Data.md
---
**Healthcare data** are the records of who is covered, what care they received, what it cost and what was found, which health actuaries use for pricing, reserving, [[Health Risk Adjustment|risk adjustment]] and [[Predictive Analytics|predictive modelling]]. The most common source is the healthcare claim, a provider's bill as the payer adjudicated it, which is complete for paid services and has standard [[Medical Coding|codes]], but it was built to pay bills rather than to describe health, so every analysis has to correct for how and when claims arrive.

> $$CF_k = \frac{1}{\prod_{j \geq k} f_j}$$

> $$\hat{C}_m = \frac{P_m}{CF_{k(m)}}$$

> $$\text{PMPM} = \frac{\sum_m \hat{C}_m}{\sum_m \text{MM}_m}$$

- **Symbols:** $f_j$ is the paid development factor from lag $j$ to lag $j+1$, with the last one running to ultimate, and $CF_k$ is the completion factor at lag $k$, the share of a month's ultimate claims paid by then. $P_m$ is what has been paid to date for services incurred in month $m$, $k(m)$ is that month's lag at the valuation date, and $\hat{C}_m$ is its completed claims. $\text{MM}_m$ is the month's member months from the eligibility data. This is the completion step of the [[Claim Reserve|claim reserve]] calculation, and the difference between completed and paid claims is the [[IBNR]] and pending claims.
- **Common healthcare data sources:** Medical claims come as professional claims from physicians and facility claims from hospitals, and pharmacy claims come from the pharmacy benefit manager within days of the fill. Eligibility data record who was covered in each month and give the exposure. Laboratory results, electronic health records, health risk assessments and member surveys add clinical values and behaviours that claims lack, and provider files and area-level data such as census measures describe where and from whom members get care.
- **Public and private data:** Public data are released by governments and research bodies, such as national household and health surveys, hospital discharge databases, census data, and Medicare files released as public use or limited data sets, the latter only under a data use agreement. Private data are owned by a payer, provider or vendor, such as the insurer's own claims or a licensed multi-payer claims database, and the HIPAA privacy rule limits how protected health information in them may be used and shared. Public data are broad and comparable but aggregated or delayed, while private data are detailed and current but cover one population.
- **Challenges of claims data:** Claims arrive with a lag, so recent months look cheap until they are completed. Diagnoses are coded to support payment, coding practice drifts, and one claim can be adjusted or reversed several times. Coordination of benefits means a secondary payer sees only part of the cost, capitated services generate encounter records with no paid amount, and carved-out benefits such as behavioural health or pharmacy may sit with another vendor. Members join and leave, so many have only part-year histories, and a few high-cost claimants dominate the totals.
- **Combining multiple data sources:** Answering one question often needs several sources linked on a member identifier, such as claims joined to eligibility for exposure, to pharmacy for drug use and to lab results for severity. Identifiers differ between vendors, so a matching step and a match rate are part of the work. Totals are reconciled to the financial statements as [[Data Quality|ASOP No. 23]] requires before the data are relied on.
- **Study designs:** A question answered from data rests on a study design. Randomized trials assign the intervention, cohort studies follow groups forward, case-control studies compare people with and without an outcome, and cross-sectional studies observe one point in time. Observational designs need adjustment for confounding before an effect is attributed to a cause.
- **Ethics:** Health data are sensitive, so modelling needs a lawful basis, minimal use of identifiers and attention to fairness. A model that predicts cost as a stand-in for medical need inherits differences in access to care, which is a form of [[Proxy Discrimination|proxy discrimination]], and the actuary's [[Data Ethics|data ethics]] obligations apply.

> [!example]- Completing Paid Claims Before Modelling {Example}
> An analyst builds a model on claims incurred October to December, paid through December 31. Paid to date is \$1,870,000 for October, \$1,640,000 for November and \$700,000 for December, and each month has 10,000 member months. The paid development factors are 2.50 from lag 0 to lag 1, 1.10 from lag 1 to lag 2, and 1.02 from lag 2 to ultimate. Find the completed PMPM for each month.
>
> > [!answer]-
> > At December 31, December is at lag 0, November at lag 1 and October at lag 2.
> > $$
> > \begin{align*}
> > CF_2 &= \frac{1}{1.02} \\
> > &= 0.9804 \\
> > CF_1 &= \frac{1}{1.10 \times 1.02} \\
> > &= 0.8913 \\
> > CF_0 &= \frac{1}{2.50 \times 1.10 \times 1.02} \\
> > &= 0.3565 \\
> > \hat{C}_{\text{Oct}} &= 1{,}870{,}000 \times 1.02 \\
> > &= 1{,}907{,}400 \\
> > \hat{C}_{\text{Nov}} &= 1{,}640{,}000 \times 1.122 \\
> > &= 1{,}840{,}080 \\
> > \hat{C}_{\text{Dec}} &= 700{,}000 \times 2.805 \\
> > &= 1{,}963{,}500
> > \end{align*}
> > $$
> > The completed PMPMs are \$190.74, \$184.01 and \$196.35, against paid PMPMs of \$187.00, \$164.00 and \$70.00. A model trained on paid claims would learn that costs collapse in December and would understate the cost of every member whose claims fall in recent months. Completion adds about \$1.50 million of unpaid claims across the quarter.

> [!example]- Exposure from Eligibility Data {Example}
> An eligibility file shows 1,200 distinct members covered at some time during a year, with 10,800 member months in total because of members joining and leaving. Their completed claims total \$4,320,000. Find the claim cost PMPM, and the figure an analyst would get by treating every member as covered all year.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{PMPM} &= \frac{4{,}320{,}000}{10{,}800} \\
> > &= 400 \\
> > \text{Naive PMPM} &= \frac{4{,}320{,}000}{1{,}200 \times 12} \\
> > &= 300
> > \end{align*}
> > $$
> > Counting distinct members overstates exposure by a third and understates cost by 25%. In a member-level model the same issue appears as part-year records, which need their member months as an exposure weight or offset rather than being treated as full years.

> [!tip]- How it appears on the exam
> - **GH-301 medical data:** Questions ask candidates to distinguish public from private data, name sources suited to a stated question, and describe how they would research a question using multiple data sources, including how the sources are linked and checked.
> - **GH-301 predictive analytics:** Candidates describe the common healthcare data sources for predictive modelling and identify challenges specific to healthcare claims in model development, such as lag, coding variation, churn and high-cost claimants, with the remedy for each.
> - **Calculations:** A short calculation may complete paid claims with given factors or build a PMPM from claims and eligibility before the data enter a model.

> [!warning]- Exam traps
> - **Paid is not incurred:** Paid claims for recent months are incomplete, and using them as the target makes recent periods and new members look cheap. Complete them, or exclude the immature months.
> - **Factors in the right direction:** A completion factor is below 1 and is divided into paid claims, while a development factor is above 1 and is multiplied. Dividing by a development factor shrinks the claims instead of completing them.
> - **Members are not exposure:** The denominator of a PMPM is member months from eligibility data, not the count of distinct members or of claimants. Members with no claims still belong in the exposure.
> - **One claim, many lines:** Adjusted and reversed claims appear as several records. Summing every record without netting reversals double counts cost.
> - **Public data limits:** Public datasets are often aggregated, sampled or a year or more old. They describe a national or program population, so applying their rates to a commercial block without adjustment ignores differences in benefits, prices and health status.
