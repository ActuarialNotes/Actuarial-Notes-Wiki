---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3e3323c4b1d073146f3c721e677ee406b5ba03136477aeca581ac760fb948440
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Solvency Regulation.md
---
![[Media/Figures/Solvency_Regulation.svg|340]]

**Solvency Regulation** is the supervision of an insurer's ability to pay claims as they come due, through capital requirements, valuation standards, reserve adequacy, and intervention when they are breached. In Canada it is [[OSFI]]'s federal mandate, and the province's for provincially chartered insurers. It is distinct from [[Market Conduct Regulation|market conduct]] and [[Rate Regulation|rate]] regulation.

The condition a solvency regulator supervises is

> $$\text{Assets} \ge \text{Liabilities} + \text{Required Capital}$$

- $\text{Liabilities}$ are valued under the regulator's valuation standards, such as the [[Insurance Contract Liabilities|insurance contract liabilities]].
- $\text{Required Capital}$ is the capital the regulator requires on top of the liabilities, set by a test such as the [[MCT]].

## The three pillars

Canadian solvency regulation follows the international pattern that [[Solvency II]] made explicit:

1. **Quantitative requirements**: the [[MCT]] and the valuation of [[Insurance Contract Liabilities|insurance contract liabilities]].
2. **Supervisory review**: the [[ORSA]], the [[FCT]], on-site examination and the [[Appointed Actuary|appointed actuary]]'s reports.
3. **Disclosure**: the [[Canadian Annual Return]] and public financial statements.

## Features of the Canadian regime

Canadian solvency regulation is risk-based. Required capital scales with the insurer's actual risk profile, [[Insurance Risk Margin|insurance]], [[Market Risk Margin|market]], [[Credit Risk Margin|credit]] and [[Operational Risk Margin|operational]] risk less a [[Diversification Credit|diversification credit]], rather than being a flat percentage of premium.

It is deliberately not zero-failure. OSFI's mandate requires it to let insurers compete and take reasonable risks, and the residual failures are handled by [[PACICC]]. A regime with no failures would set capital requirements so high that insurance became unaffordable.

Early intervention is the design goal. The ladder of [[Internal Target Capital Ratio|internal target]], [[Supervisory Target Capital Ratio|supervisory target]] and minimum capital ratio exists so that action begins while the insurer still has surplus to work with, not at the point of insolvency.

## Conflict with rate regulation

Solvency and rate regulation can conflict. A regulator that suppresses rates for affordability weakens the insurers that are also supervised for solvency. In Canada the provinces regulate prices and [[OSFI]] regulates capital, so neither body owns both sides of that trade-off.

> [!example]- How does rate suppression flow through the solvency framework? {Example}
> A province holds auto rate increases to $2\%$ a year for three years while claims costs rise $8\%$ a year.
>
> > [!answer]-
> > - After three years prices are $1.02^3 = 1.061$ times the base and costs are $1.08^3 = 1.260$ times, so costs have grown about $19\%$ faster than premium.
> > - Underwriting losses erode capital, which lowers the [[MCT]] ratio through a smaller numerator.
> > - Reserves are strengthened as the inadequacy shows in development, which lowers the ratio again.
> > - Insurers restrict writing in the province. This relieves the capital strain but creates an availability problem, pushing risks into the [[Facility Association]] and the [[Residual Market|residual market]].
> > - If the [[FCT]]'s adverse scenarios show the ratio falling below the supervisory target, OSFI escalates, but it cannot fix the cause, because it does not set rates.
> > - Reducing what the product costs is the lever that reconciles affordability with solvency, which is why [[Automobile Insurance Reform|auto reform]] is usually about benefits rather than prices.
