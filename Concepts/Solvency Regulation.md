---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:95a84f4f6a2614acf89ac159ca4f868d2ce0df93af22f4cfea702847df908684
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Solvency Regulation.md
---

**Solvency Regulation** is supervision aimed at ensuring an insurer can pay claims as they come due — capital requirements, valuation standards, reserve adequacy, and intervention when they are breached. In Canada it is [[OSFI]]'s federal mandate (and the province's for provincially chartered insurers), and it is distinct from [[Market Conduct Regulation|market conduct]] and [[Rate Regulation|rate]] regulation.

> $$\text{Solvent} \iff \text{Assets} \ge \text{Liabilities} + \text{Required Capital}$$

- The three pillars, following the international pattern that [[Solvency II]] made explicit: **quantitative requirements** ([[MCT]], valuation of [[Insurance Contract Liabilities]]), **supervisory review** ([[ORSA]], [[FCT]], on-site examination, the [[Appointed Actuary]]'s reports), and **disclosure** (the [[Canadian Annual Return]], public financial statements).
- Canadian solvency regulation is **risk-based**: required capital scales with the insurer's actual risk profile — [[Insurance Risk Margin|insurance]], [[Market Risk Margin|market]], [[Credit Risk Margin|credit]] and [[Operational Risk Margin|operational]] risk, less a [[Diversification Credit|diversification credit]] — rather than being a flat percentage of premium.
- It is deliberately **not zero-failure**. OSFI's mandate requires it to let insurers compete and take reasonable risks; the residual failures are handled by [[PACICC]]. A regime with no failures would have set capital requirements so high that insurance became unaffordable.
- **Early intervention** is the design goal. The ladder of internal target, supervisory target and minimum capital ratio ([[Supervisory Target Capital Ratio]], [[Internal Target Capital Ratio]]) exists so that action begins while the insurer still has surplus to work with, not at the point of insolvency.
- Solvency and rate regulation can **conflict**: a regulator suppressing rates for affordability weakens the insurers it also supervises for solvency. Canada's split — provinces price, [[OSFI]] capitalises — means neither body owns both sides of that trade-off.

> [!example]- Rate Suppression Meets Solvency Supervision {Example}
> A province holds auto rate increases to $2\%$ for three years while claims costs rise $8\%$ per year. Trace the consequences through the solvency framework.
>
> > [!answer]-
> > Year by year the gap compounds: after three years, prices are roughly $1.02^3 = 1.061$ times the base while costs are $1.08^3 = 1.260$ times — a shortfall of about $16\%$ of premium.
> >
> > The chain of effects:
> >
> > 1. **Underwriting losses** erode capital, lowering the [[MCT]] ratio through a smaller numerator.
> > 2. **Reserve strengthening** as the inadequacy becomes visible in development, lowering it again.
> > 3. **Volume contraction** as insurers restrict writing in the province — which relieves the capital strain but creates an **availability** problem, pushing risks into the [[Facility Association]] and [[Residual Market|residual market]].
> > 4. If the [[FCT]] report's adverse scenarios show the ratio falling below the supervisory target, OSFI escalates — but OSFI cannot fix the cause, because it does not set rates.
> >
> > This is the structural tension in Canadian regulation, and it is the reason [[Automobile Insurance Reform|auto reform]] is usually about *benefits* rather than *prices*: reducing what the product costs is the only lever that reconciles affordability with solvency.
