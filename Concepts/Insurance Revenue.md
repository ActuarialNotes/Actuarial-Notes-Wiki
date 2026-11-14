---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:87013debdb1d000cf327c3326a27adc5e0fd6670fb6a86bb8768dd2f231363ec
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Revenue.md
---

![[Media/Figures/Insurance_Revenue.svg|340]]

**Insurance Revenue** is the [[IFRS 17]] top line of an insurer's income statement: the consideration the insurer becomes entitled to in exchange for services provided in the period. It excludes any investment or deposit component, the amounts the insurer would repay to the policyholder whether or not an insured event occurs.

Insurance revenue replaces written and earned premium on the face of the income statement. Under the [[General Measurement Model|GMM]] it is built up from the amounts released in the period, so the insurance revenue of a period is

> $$\text{Insurance Revenue} = E + RA + CSM + A$$

- $E$ is the expected claims and expenses for the period.
- $RA$ is the [[Risk Adjustment for Non-Financial Risk|risk adjustment]] released as risk expires.
- $CSM$ is the [[Contractual Service Margin|CSM]] released for services provided.
- $A$ is the amortisation of [[Insurance Acquisition Cash Flows|acquisition cash flows]].

## Revenue under the premium allocation approach

Under the [[Premium Allocation Approach|PAA]], insurance revenue is the premium allocated to the period. The allocation is normally on a time basis, or on the basis of the expected release of claims where risk is not spread evenly over the coverage period. This is close to the old earned premium, so a Canadian P&C insurer's revenue line looks familiar.

Three differences from premium most often surprise:

1. Deposit components are excluded.
2. Ceded premium on [[Reinsurance Contracts Held|reinsurance contracts held]] is not deducted from revenue. The income statement shows insurance revenue, then [[Insurance Service Expenses|insurance service expenses]], then the net expense (or income) from reinsurance contracts held as its own line.
3. A group with a [[Loss Component]] recognises revenue only on the non-onerous portion of the [[Liability for Remaining Coverage|LRC]].

> [!example]- What is this PAA insurer's insurance revenue? {Example}
> A PAA insurer writes $\$300$ million of premium in the year, of which $\$170$ million is earned. It cedes $\$55$ million of premium to reinsurers, $\$32$ million of which relates to coverage received in the year. One group is onerous, with a loss component releasing $\$6$ million against expected claims of $\$40$ million in the year.
>
> > [!answer]-
> > - Written premium is not revenue. Only the $\$170$ million relating to coverage provided in the year is.
> > - Ceded premium is not deducted. The $\$55$ million belongs to the separate reinsurance line.
> > - Revenue is recognised only on the non-onerous portion of the LRC, so the $\$6$ million released against the loss component is excluded.
> > - Insurance revenue is $\$170\text{M} - \$6\text{M} = \$164$ million.
> > - Separately, the net expense from reinsurance contracts held is the $\$32$ million of ceded premium relating to coverage received, less amounts recoverable, shown as one line.

Insurance revenue is intended to be comparable with the revenue reported by non-insurance businesses, an explicit IASB objective. It broke the continuity of decades of premium-based analysis, which is why insurers disclose written premium as a supplementary measure. A reader given only the $\$164$ million above knows little about the insurer's $\$300$ million of volume.

> [!trap] Netting ceded premium against revenue
> Insurance revenue is gross of reinsurance. Deducting the $\$55$ million of ceded premium above from revenue is the classic error. Reinsurance held is always presented as its own net line.
