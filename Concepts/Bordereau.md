---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:21e7dbee6868fbbcf6b929306884b55a75ca874e5c222c39795053e6ba91c0ae
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bordereau.md
---

A **Bordereau** (plural *bordereaux*) is a detailed report furnished periodically by the reinsured to its reinsurer, listing the premiums or losses affected by reinsurance during the reporting period. There are two kinds:

- A **premium bordereau** lists the policies reinsured, with the insured, the amount and location of the risk, the policy dates, the amount reinsured and the reinsurance premium.
- A **loss bordereau** lists the claims and claim expenses paid and outstanding, with the reinsurance indemnity on each.

Bordereau reporting applies mainly to pro rata arrangements such as [[Quota Share|quota share]] and [[Surplus Share|surplus share]], and has to a large extent been supplanted by summary reporting. A facultative automatic agreement also works through a bordereau of the risks ceded, which the reinsurer has limited rights to decline ([[Facultative Reinsurance]]).

## Bordereaux and the reinsurer's reporting lag

The time for a claim to reach the reinsurer is

> $$\text{Lag}_{\text{reinsurer}} = \text{Lag}_{\text{cedant}} + \text{Wait for the bordereau}$$

- $\text{Lag}_{\text{cedant}}$ is the time for a claim to be reported to and recorded by the ceding company.
- The wait for the bordereau is the time until the next bordereau reaches the reinsurer.

Bordereaux are sent monthly, quarterly, semi-annually or annually. [[Reserving for Reinsurance (Friedland - 2022)|Friedland]] notes that the less frequent the reporting, the greater the lag in the reinsurer's reporting and settlement patterns. Bordereau delays are one of Friedland's reasons that reinsurance reporting and payment patterns are longer than primary ones ([[Reinsurance Reserving]]). A cedant that changes how often it reports changes the reinsurer's development pattern, against the [[Chain Ladder Method|development method]]'s assumption of consistent claim processing.

> [!example]- What happens if the reinsurer applies its quarterly-reporting factor to this year? {Example}
> A 50% quota share covers accident year 2025. The cedant moved from quarterly to monthly loss bordereaux in 2025. It records three claims, with no later development:
>
> | Claim | Date of loss | Recorded by cedant | Gross reported |
> | :--- | :--- | :--- | ---: |
> | 1 | Feb 10 | Mar 20 | 400 |
> | 2 | Sep 5 | Oct 20 | 600 |
> | 3 | Dec 1 | Dec 15 | 1,000 |
>
> Quarterly bordereaux were sent 45 days after each quarter ends, and monthly ones are sent 15 days after each month ends.
>
> > [!answer]-
> > - The cedant's own ceded reported losses at 12 months are $0.5 \times (400 + 600 + 1{,}000) = 1{,}000$, and the reinsurer reaches the same 1,000 by 24 months.
> > - Quarterly, claim 1 is on the first-quarter bordereau, sent May 15. Claims 2 and 3 are on the fourth-quarter bordereau, sent February 14, 2026.
> > - So under quarterly reporting the reinsurer holds $0.5 \times 400 = 200$ at 12 months, and its 12–24 month factor is $1{,}000/200 = 5.0$.
> > - Monthly, claim 2 is on the October bordereau, sent November 15, and claim 3 on the December bordereau, sent January 15, 2026.
> > - So under monthly reporting the reinsurer holds $0.5 \times (400 + 600) = 500$ at 12 months, and the true factor is $1{,}000/500 = 2.0$.
> > - The historical factor of 5.0 applied to 500 projects $5.0 \times 500 = 2{,}500$ against a true ultimate of 1,000. The claims are the same and only the reporting changed, so the reinsurer needs the cedant's reporting history before it selects factors.

## Data issues

Each ceding company and broker reports from its own systems, so bordereaux differ in the data they carry, how they label it and how often they arrive. Producing and absorbing them is a manually intensive process, and standardised data sets have been adopted slowly. A bordereau's loss detail is far less complete than the claim file behind it. All of this makes validating reinsurance data harder than primary data ([[Data Issues]]).

> [!trap] Reusing factors after a change in reporting frequency
> Development factors from years reported quarterly overstate the development of a year reported monthly, because more of its losses have already reached the reinsurer. Check the cedant's reporting history before selecting factors.
