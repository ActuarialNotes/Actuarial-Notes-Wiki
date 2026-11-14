---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b56739f1fbffeac1d398c177884756577f8b6cbde349ddfd7bcc104c6df95a78
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Usage-Based Insurance.md
---
![[Media/Figures/Usage-Based_Insurance.svg|340]]

**Usage-Based Insurance** (UBI; in Ontario's filing guidelines, *usage-based insurance pricing*, or UBIP) is automobile insurance whose premium discount depends on the insured's measured driving. A telematics device records driving behaviours such as acceleration and deceleration rates, speed and distance travelled, and the insurer turns them into a discount.

In Ontario the discount is part of the insurer's [[Rating Variable|rates and risk classification system]], so it must be filed with and approved by the regulator under [[Rate Regulation|prior approval]]: FSCO when the [[FSCO Tech Notes]] were written, and now the [[Financial Services Regulatory Authority of Ontario|FSRA]]. The insurer must show that the program's assumptions are reasonable and continue to be. Under Tech Notes E20(a) the filing must clearly indicate:

1. What driving behaviours are measured.
2. How the data are measured (frequency, occurrence, thresholds).
3. How the data are normalized and categorized for rating (total occurrences, averages).
4. All the claim experience (severity, frequency, loss costs) needed to support the discount.

Non-Ontario data may be used at the introductory stage, and initial discounts should be set conservatively until Ontario experience emerges. Any recalibration of the algorithm, formula, event definitions, capping or thresholds needs formal approval.

A usage-based discount cannot come in through a simplified filing. The Tech Notes' criteria for simplified filings allow a new discount "except for any usage-based (telematics) discount" (Exhibit 1). For other-than-private-passenger categories, introducing usage-based insurance makes the filing a major one (Exhibit 3).

## Conditional approval

FSCO approves a UBIP program on a conditional basis, for policies effective up to two years after approval. Continuing past that point requires a subsequent application backed by the insurer's Ontario experience. In between, the insurer files annual interim reports on adoption rates, average discounts and the issues it has seen, including consumer feedback and complaints.

An enrollment discount offered for one term only, or an actual discount expected to differ materially from it, requires an anniversary report on the change in the average discount and the rate-level change it produces. Anniversary filings without actuarial support stay conditionally approved until the support exists.

> [!example]- What rate-level change must this insurer's anniversary report show? {Example}
> Participants in an insurer's UBIP program write $20\%$ of its private passenger premium, measured before UBIP discounts. Enrollees receive a $5\%$ discount for their first term. At the first anniversary, the renewal discounts earned from telematics scores average $11\%$.
>
> > [!answer]-
> > - Measure the premium level against the undiscounted book, with non-participants at $0.80$.
> > - Before, the level is $0.80 + 0.20 \times (1 - 0.05) = 0.990$.
> > - After, the level is $0.80 + 0.20 \times (1 - 0.11) = 0.978$.
> > - The rate-level change is $0.978 / 0.990 - 1 = -1.21\%$.
> > - The average discount rose by $6$ points among participants, which cuts the book's average rate level by about $1.2\%$. The Major filing guidelines also ask for the expected loss-cost savings that go with UBIP discounts, and those savings are what justify the cut.

## Endorsement and costs

Under Tech Notes E20(c)–(d), the terms of participation must be filed as an endorsement under section 227 of the Insurance Act, so that FSCO and the consumer both know what personal information is used and how.

The filing must show the start-up and ongoing costs: the device, data transfer and analysis, marketing and third-party contracts. That holds even when the insurer has not put them into the rates. Some insurers treat start-up costs as research and development, but FSCO expects the ongoing costs to be reflected in the discount over time, and it watches for UBIP costs borne by policyholders who are not in the program.

## Consumer protection and privacy

The filing checklist asks whether a UBIP discount complies with FSCO's UBIP bulletin, issued in 2013. The published answers draw these points from it.

On transparency, the insurer tells the consumer what personal information is collected, how it is used, who may see it and when it goes to third parties. It explains how to qualify for the discount, its maximum and minimum and the measurement period, from before enrollment through renewal. It says how other drivers of the vehicle affect the discount, gives regular feedback on driving, and lets the consumer see the data behind the discount and correct errors.

UBI data may be used only to set the discount. It may not be used to adjust, investigate or deny a claim, to decline or non-renew a risk, or to verify other rating variables. A third party may offer added services using the data only if the insured opts in.

For competition, insurers should facilitate portability, so that a driver can take their UBI data to another insurer.

FSCO also raised concerns about consent, accuracy (including manipulation such as switching the device off), several drivers sharing one car, the security of the data, and what happens to the data after the consumer leaves the program.

> [!example]- Which of these uses of an Ontario UBIP program's data are permitted? {Example}
> 1. Using a participant's trip data to deny a suspicious collision claim.
> 2. Declining to renew a participant whose telematics score is poor.
> 3. Letting a roadside-assistance partner use the device data to offer the insured a service.
> 4. Replacing the program with a discount for customers with good credit.
>
> > [!answer]-
> > - Case 1 is not permitted, because UBI data may not be used to adjust, investigate or deny a claim.
> > - Case 2 is not permitted, because UBI data may not be used to decline or non-renew a risk.
> > - Case 3 is permitted only with the insured's opt-in consent. The published answer adds that the insurer must see that the third party meets at least the same privacy standards.
> > - Case 4 is not permitted, because credit history, credit rating and whether the insured has a credit card are all prohibited rating elements in Ontario auto.

## Usage-based insurance and credit scoring

Ontario's [[Ontario Reg. 664|Regulation 664]] prohibits rating on whether a person has a credit card and on their credit history or credit rating ([[Risk Classification Restrictions]]). The published answer's rationale for allowing UBI but not credit is that driving behaviour is within the driver's control, and the feedback promotes safer driving and fewer accidents. A credit score reflects social and economic status that may be outside the insured's control, and it is seen as [[Unfair Discrimination|discriminatory]] against groups such as the young and recent immigrants ([[Credit-Based Insurance Scoring]]).

> [!trap] Using UBI data beyond the discount
> Using telematics data to deny a claim, non-renew a poor driver or check another rating variable is prohibited. The data sets the discount and nothing else, and third-party use needs the insured's opt-in.
