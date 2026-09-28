---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:28548075f2065c50e19b1e79b4dbb47b5f91bd86f68d20a3af37f61da63e3bcf
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Usage-Based Insurance.md
---

**Usage-Based Insurance** (UBI; in Ontario's filing guidelines, *usage-based insurance pricing*, or UBIP) is automobile insurance whose premium discount depends on the insured's measured driving. A telematics device records driving behaviours such as acceleration and deceleration rates, speed and distance travelled, and the insurer turns them into a discount. In Ontario the discount is part of the insurer's [[Rating Variable|rates and risk classification system]], so it must be filed with and approved by the regulator under [[Rate Regulation|prior approval]]: FSCO when the Tech Notes were written, and now the [[Financial Services Regulatory Authority of Ontario|FSRA]]. It is on the Fall 2026 syllabus through the [[FSCO Tech Notes]], section E20 (objective A1).

- **What a UBIP filing must show** (Tech Notes E20(a)). Any UBIP discount must be filed with and approved by FSCO, and the insurer must show that the program's assumptions are reasonable and continue to be. The filing must clearly indicate:
  - what driving behaviours are measured;
  - how the data are measured (frequency, occurrence, thresholds);
  - how the data are normalized and categorized for rating (total occurrences, averages);
  - all the claim experience (severity, frequency, loss costs) needed to support the discount.

  Non-Ontario data may be used at the introductory stage, and initial discounts should be set conservatively until Ontario experience emerges. Any recalibration of the algorithm, formula, event definitions, capping or thresholds needs formal approval.
- **Approval is conditional.** FSCO approves a UBIP program on a conditional basis, for policies effective up to two years after approval. Continuing past that point requires a subsequent application backed by the insurer's Ontario experience. In between, the insurer files annual interim reports on adoption rates, average discounts and the issues it has seen, including consumer feedback and complaints. An enrollment discount offered for one term only, or an actual discount expected to differ materially from it, requires an anniversary report on the change in the average discount and the rate-level change it produces. Anniversary filings without actuarial support stay conditionally approved until the support exists.
- **Endorsement and costs** (E20(c)–(d)). The terms of participation must be filed as an endorsement under section 227 of the Insurance Act, so that FSCO and the consumer both know what personal information is used and how. The filing must show the start-up and ongoing costs: the device, data transfer and analysis, marketing and third-party contracts. That holds even when the insurer has not put them into the rates. Some insurers treat start-up costs as research and development, but FSCO expects the ongoing costs to be reflected in the discount over time, and it watches for UBIP costs borne by policyholders who are not in the program.
- **Not through a simplified filing.** The Tech Notes' criteria for simplified filings allow a new discount "except for any usage-based (telematics) discount" (Exhibit 1). For other-than-private-passenger categories, introducing usage-based insurance makes the filing a major one (Exhibit 3).
- **Consumer protection and privacy.** The filing checklist asks whether a UBIP discount complies with FSCO's UBIP bulletin, issued in 2013. The published answers draw these points from it:
  - **Transparency.** Tell the consumer what personal information is collected, how it is used, who may see it and when it goes to third parties. Explain how to qualify for the discount, its maximum and minimum and the measurement period, from before enrollment through renewal. Say how other drivers of the vehicle affect the discount, give regular feedback on driving, and let the consumer see the data behind the discount and correct errors.
  - **Use of the data.** UBI data may be used only to set the discount: not to adjust, investigate or deny a claim, not to decline or non-renew a risk, and not to verify other rating variables. A third party may offer added services using the data only if the insured opts in.
  - **Competition.** Insurers should facilitate portability, so that a driver can take their UBI data to another insurer.
  - **Concerns FSCO raised.** Consent; accuracy, including manipulation such as switching the device off; several drivers sharing one car; security of the data; and what happens to the data after the consumer leaves the program.
- **Why allow it but ban credit.** Ontario's [[Ontario Reg. 664|Regulation 664]] prohibits rating on whether a person has a credit card and on their credit history or credit rating ([[Risk Classification Restrictions]]). The published answer's rationale: driving behaviour is within the driver's control, and the feedback promotes safer driving and fewer accidents. A credit score reflects social and economic status that may be outside the insured's control, and it is seen as [[Unfair Discrimination|discriminatory]] against groups such as the young and recent immigrants ([[Credit-Based Insurance Scoring]]).

![[Media/Figures/Usage-Based_Insurance.svg|340]]

> [!example]- Filing a New Telematics Program {Example}
> An insurer wants to introduce a UBIP program for Ontario private passenger auto. The device measures hard braking, speed and night-time driving, and renewal discounts range from $0\%$ to $25\%$. Its supporting data come from the same program in another province. It expects $\$3$ million of start-up costs and a per-vehicle device and data cost.
>
> What must the filing contain, and what approval should the insurer expect?
>
> > [!answer]-
> > **A major filing.** A usage-based discount cannot come in through the simplified guidelines.
> >
> > **The support.** The filing must show:
> >
> > - the behaviours measured (hard braking, speed, night-time driving);
> > - how each is measured: the frequency or occurrences counted, and the thresholds, such as the deceleration that counts as a hard brake;
> > - how the readings are normalized and grouped into discount tiers;
> > - the claim frequency, severity and loss-cost experience behind each tier.
> >
> > Out-of-province data is acceptable at introduction, but FSCO recommends setting the initial discounts conservatively.
> >
> > **The paperwork.** The terms of participation go in as an endorsement for approval. The $\$3$ million start-up cost and the ongoing device and data costs must be disclosed, whether or not they are loaded into the rates, with attention to whether non-participants end up paying for them.
> >
> > **The approval.** Conditional, for business effective within two years. Annual interim reports are due in the meantime, then a subsequent application supported by Ontario experience. Any later change to the scoring algorithm or thresholds is itself a filing.

> [!example]- The Anniversary Report {Example}
> Participants in an insurer's UBIP program write $20\%$ of its private passenger premium, measured before UBIP discounts. Enrollees receive a $5\%$ discount for their first term. At the first anniversary, the renewal discounts earned from telematics scores average $11\%$.
>
> What does the anniversary report have to show?
>
> > [!answer]-
> > FSCO requires a report on the change in the average UBIP discount and the rate-level change that flows from it. Measure the premium level against the undiscounted book:
> >
> > $$
> > \begin{align*}
> > \text{Before} &= 0.80 + 0.20\,(1 - 0.05) \\
> > &= 0.990 \\[4pt]
> > \text{After} &= 0.80 + 0.20\,(1 - 0.11) \\
> > &= 0.978
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Rate-level change} &= \frac{0.978}{0.990} - 1 \\
> > &= -1.21\%
> > \end{align*}
> > $$
> >
> > The average discount rose by $6$ points among participants, which cuts the book's average rate level by about $1.2\%$. That is the rate-level change the report must account for. The Major filing guidelines also ask for the expected loss-cost savings that go with UBIP discounts, and those savings are what justify the cut.

> [!example]- What May the Insurer Do With the Data? {Example}
> An Ontario insurer runs an approved UBIP program. Is each of these permitted?
>
> 1. Using a participant's trip data to deny a suspicious collision claim.
> 2. Declining to renew a participant whose telematics score is poor.
> 3. Letting a roadside-assistance partner use the device data to offer the insured a service.
> 4. Replacing the program with a discount for customers with good credit.
>
> > [!answer]-
> > 1. **No.** UBI data may not be used to adjust, investigate or deny a claim.
> > 2. **No.** UBI data may not be used to decline or non-renew a risk; its only permitted use is setting the discount.
> > 3. **Only with the insured's opt-in consent.** The insured cannot be required to join, and the published answer adds that the insurer must see that the third party meets at least the same privacy standards.
> > 4. **No.** Credit history, credit rating and whether the insured has a credit card are all prohibited rating elements in Ontario auto.
> >
> > The pattern: the program may price what the driver controls, openly and with the driver's consent, and the data goes no further than the discount. Credit fails the first test, because a credit score reflects circumstances the driver may not control.
