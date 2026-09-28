---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cda461a967a2654bfa22ec4345e681317a2b05c83fa289bb6fcb2c5a715e5e90
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bordereau.md
---

**A bordereau** (plural *bordereaux*) is a detailed report furnished periodically by the reinsured to its reinsurer, listing the premiums or losses affected by reinsurance during the reporting period. A **premium bordereau** lists the policies reinsured, with the insured, the amount and location of the risk, the policy dates, the amount reinsured and the reinsurance premium. A **loss bordereau** lists the claims and claim expenses paid and outstanding, with the reinsurance indemnity on each.

> $$
> \begin{aligned}
> \text{Lag}_{\text{reinsurer}} &= \text{Lag}_{\text{cedant}} \\
> &\quad + \text{Wait for the bordereau}
> \end{aligned}
> $$

- $\text{Lag}_{\text{cedant}}$ is the time for a claim to be reported to and recorded by the ceding company, and the wait is the time until the next bordereau reaches the reinsurer. Bordereaux are sent monthly, quarterly, semi-annually or annually. [[Reserving for Reinsurance (Friedland - 2022)|Friedland]] notes that the less frequent the reporting, the greater the lag in the reinsurer's reporting and settlement patterns.
- **Where it is used.** Bordereau reporting applies mainly to pro rata arrangements such as [[Quota Share|quota share]] and [[Surplus Share|surplus share]], and has to a large extent been supplanted by summary reporting. A facultative automatic agreement also works through a bordereau of the risks ceded, which the reinsurer has limited rights to decline ([[Facultative Reinsurance]]).
- **Data issues.** Each ceding company and broker reports from its own systems, so bordereaux differ in the data they carry, how they label it and how often they arrive. Producing and absorbing them is a manually intensive process, standardised data sets have been adopted slowly, and a bordereau's loss detail is far less complete than the claim file behind it. All of this makes validating reinsurance data harder than primary data ([[Data Issues]]).
- **Consequence for reserving.** Bordereau delays are one of Friedland's reasons that reinsurance reporting and payment patterns are longer than primary ones ([[Reinsurance Reserving]]). A cedant that changes how often it reports changes the reinsurer's development pattern, against the [[Chain Ladder Method|development method]]'s assumption of consistent claim processing.

> [!example]- How Bordereau Frequency Shapes the Reinsurer's Triangle {Example}
> A 50% quota share covers accident year 2025. The ceding company records three claims, with no later development:
>
> | Claim | Date of loss | Recorded by cedant | Gross reported |
> |---|---|---|---|
> | 1 | Feb 10 | Mar 20 | 400 |
> | 2 | Sep 5 | Oct 20 | 600 |
> | 3 | Dec 1 | Dec 15 | 1,000 |
>
> (a) With quarterly loss bordereaux sent 45 days after each quarter ends, what ceded reported losses does the reinsurer hold at 12 months (12/31/2025), and what is its 12–24 month factor? (b) Repeat with monthly bordereaux sent 15 days after each month ends. (c) The cedant moved from quarterly to monthly reporting in 2025. What happens if the reinsurer applies its historical factor from (a)?
>
> > [!answer]-
> > The cedant's own ceded reported losses at 12 months are $0.5 \times (400 + 600 + 1{,}000) = 1{,}000$, and the reinsurer reaches the same 1,000 by 24 months.
> >
> > **(a) Quarterly.** Claim 1 is on the first-quarter bordereau, sent May 15. Claims 2 and 3 are recorded in the fourth quarter, whose bordereau is sent February 14, 2026.
> >
> > $$
> > \begin{align*}
> > \text{Reported at 12} &= 0.5 \times 400 \\
> > &= 200 \\
> > \text{Factor 12--24} &= 1{,}000 / 200 \\
> > &= 5.0
> > \end{align*}
> > $$
> >
> > **(b) Monthly.** Claim 2 is on the October bordereau, sent November 15; claim 3 is on the December bordereau, sent January 15, 2026.
> >
> > $$
> > \begin{align*}
> > \text{Reported at 12} &= 0.5 \times (400 + 600) \\
> > &= 500 \\
> > \text{Factor 12--24} &= 1{,}000 / 500 \\
> > &= 2.0
> > \end{align*}
> > $$
> >
> > **(c)** The historical factor of 5.0, from years reported quarterly, applied to the 500 reported under monthly bordereaux projects $5.0 \times 500 = 2{,}500$ against a true ultimate of 1,000. The claims are the same; only the reporting changed. The reinsurer needs the cedant's reporting history before it selects factors.
