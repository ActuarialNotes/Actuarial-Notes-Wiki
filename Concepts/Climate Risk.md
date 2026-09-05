---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0bb727c69a72752a48e2cccb45e7fa26883d75de90f5fbf5b7fc286e0314f9e2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Climate Risk.md
---

**Climate Risk** is the risk to an insurer from climate change, in two forms: **physical risk** — more frequent and severe weather events damaging insured property and the insurer's own assets — and **transition risk** — losses arising from the shift to a low-carbon economy, through policy, technology, litigation and changing preferences. [[OSFI]]'s Guideline B-15 makes it a prudential matter, not a corporate social responsibility one.

- **Physical risk** divides into *acute* (individual events: [[Flood Insurance|flood]], wildfire, hail, windstorm) and *chronic* (gradual shifts: sea level, temperature and precipitation regimes, permafrost). Canadian insured catastrophe losses have risen by an order of magnitude over recent decades, and flood and wildfire dominate.
- **Transition risk** reaches insurers through their **investments** (carbon-intensive assets losing value), their **liability** underwriting (directors' and officers' and professional liability exposure to climate litigation), and their **business model** (declining demand for coverage of activities being phased out).
- **The actuarial problem is non-stationarity.** Ratemaking and catastrophe models assume the past is a guide to the future. If the hazard itself is changing, historical experience is a **biased** estimator of future cost, and "$1$-in-$100$" language describes a return period that no longer holds. This is the single most important technical point on the topic.
- **OSFI's expectations** (B-15): governance and accountability at board level; climate risk integrated into the risk management framework and [[ORSA]]; **scenario analysis** using specified transition and physical pathways; and **disclosure** aligned with international frameworks. OSFI has also run standardised climate scenario exercises across the industry.
- **The insurability question.** Rising hazard can make coverage unaffordable or unwritable in the most exposed locations — the [[Flood Insurance]] problem generalised. The policy response is the same trilemma: risk-based pricing, explicit subsidy, or a coverage gap absorbed by [[Disaster Financial Assistance Arrangements|government assistance]].
- **The IAA and CIA** have both published on the actuary's role: climate belongs in pricing, reserving, catastrophe modelling, capital, investment and disclosure, and it is within the [[Appointed Actuary]]'s remit rather than beside it.

> [!example]- Trending a Non-Stationary Hazard {Example}
> An insurer's water damage and flood loss costs per exposure over ten years show an average annual increase of $9\%$. Three of those years contained a major flood event. The pricing actuary proposes projecting the $9\%$ forward for the next three years.
>
> Critique the approach.
>
> > [!answer]-
> > The $9\%$ is a mixture of at least four distinct effects, and projecting the blend forward is wrong regardless of which direction it errs in.
> >
> > **Decompose it:**
> >
> > 1. **Ordinary inflation** in repair and remediation costs — persistent, and projectable.
> > 2. **Exposure change** — more finished basements, more expensive contents, more building in exposed locations. Persistent, and projectable, but it is a change in the *exposure base*, not in the hazard.
> > 3. **Event randomness** — three major events in ten years may be more or fewer than the underlying rate implies. Not projectable at all; it is process variance being read as trend.
> > 4. **Genuine hazard change** — the underlying frequency and severity of extreme precipitation increasing. Persistent, and the reason the past understates the future.
> >
> > **Why the naive projection fails.** If much of the $9\%$ is item 3, the insurer is projecting bad luck forward and will overprice. If much of it is item 4, the historical average **understates** what is coming and the insurer will underprice even at $9\%$. The two errors point in opposite directions, and a single blended trend cannot distinguish them.
> >
> > **The defensible approach:**
> >
> > - **Separate attritional from catastrophe** experience, and model catastrophe losses from a model calibrated to *current* climate, not from ten years of the insurer's own event history.
> > - **Normalise historical losses** to current exposure levels before fitting any trend, so item 2 is removed.
> > - **Use forward-looking hazard science** rather than the insurer's own loss history for item 4 — this is the specific point at which climate change breaks the actuarial toolkit, and no amount of care with the insurer's own data solves it.
> > - **Test the sensitivity** and put the range, not the point, in front of the pricing committee and in [[ORSA]].
> >
> > **And say so in the report.** Under the [[Standards of Practice]] the assumptions and their uncertainty must be communicated; a $9\%$ trend presented as a selection, with no statement that the underlying hazard is changing, is not adequate communication.
