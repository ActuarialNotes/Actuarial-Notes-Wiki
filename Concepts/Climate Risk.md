---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:59cc25e09241b013598b87194cec737cbeb107274fdb637675041d8224a43e6b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Climate Risk.md
---

![[Media/Figures/Climate_Risk.svg|340]]

**Climate Risk** is the risk to an insurer from climate change, in two forms: **physical risk**, from more frequent and severe weather events damaging insured property and the insurer's own assets, and **transition risk**, from losses arising in the shift to a low-carbon economy through policy, technology, litigation and changing preferences. [[OSFI]]'s Guideline B-15 makes it a prudential matter, not a corporate social responsibility one.

Each form divides further:

- **Physical risk**
  - *Acute*: individual events such as [[Flood Insurance|flood]], wildfire, hail and windstorm.
  - *Chronic*: gradual shifts in sea level, temperature and precipitation regimes, and permafrost.
- **Transition risk**
  - *Investments*: carbon-intensive assets losing value.
  - *Liability underwriting*: directors' and officers' and professional liability exposure to climate litigation.
  - *Business model*: declining demand for coverage of activities being phased out.

Canadian insured catastrophe losses have risen by an order of magnitude over recent decades, and flood and wildfire dominate them.

## Non-stationarity

Ratemaking and catastrophe models assume the past is a guide to the future. If the hazard itself is changing, historical experience is a biased estimator of future cost, and a "$1$-in-$100$" return period read from the past no longer holds. This is the most important technical point on the topic.

> [!example]- Should this pricing actuary project the $9\%$ trend forward? {Example}
> An insurer's water damage and flood loss costs per exposure have risen an average of $9\%$ a year over ten years. Three of those years contained a major flood event. The pricing actuary proposes projecting the $9\%$ forward for the next three years.
>
> > [!answer]-
> > - The $9\%$ mixes four effects: ordinary inflation in repair costs, change in exposure (more finished basements, more expensive contents, more building in exposed locations), event randomness and genuine change in the hazard.
> > - Inflation and exposure change are persistent and projectable, but exposure change belongs in the exposure base, not the hazard.
> > - Event randomness is not projectable at all. If much of the $9\%$ is three unlucky years, projecting it forward overprices.
> > - Hazard change is persistent. If much of the $9\%$ is hazard change, the history understates what is coming and even $9\%$ underprices.
> > - The two errors point in opposite directions, and one blended trend cannot tell them apart, so the projection should not be used as proposed.
> > - Instead, separate attritional from catastrophe experience and model catastrophe losses with a model calibrated to the current climate, normalise historical losses to current exposure before fitting a trend, and use forward-looking hazard science for the hazard change.
> > - Test the sensitivity, put the range in front of the pricing committee and in the [[ORSA]], and state the uncertainty in the report, as the [[Standards of Practice]] require.

## OSFI Guideline B-15

OSFI's Guideline B-15 expects:

1. Governance and accountability for climate risk at board level.
2. Climate risk integrated into the risk management framework and the [[ORSA]].
3. Scenario analysis using specified transition and physical pathways.
4. Disclosure aligned with international frameworks.

OSFI has also run standardised climate scenario exercises across the industry. The IAA and the CIA have both published on the actuary's role. Climate belongs in pricing, reserving, catastrophe modelling, capital, investment and disclosure, and within the [[Appointed Actuary]]'s remit.

## Insurability

Rising hazard can make coverage unaffordable or unwritable in the most exposed locations, the [[Flood Insurance|flood insurance]] problem generalised. The policy response has the same three options: risk-based pricing, explicit subsidy, or a coverage gap absorbed by [[Disaster Financial Assistance Arrangements|government assistance]].

> [!trap] Reading a return period off past experience
> A "$1$-in-$100$" event estimated from history assumes the hazard is stationary. Under a changing climate, calibrate catastrophe models to the current climate rather than to the insurer's own event history.
