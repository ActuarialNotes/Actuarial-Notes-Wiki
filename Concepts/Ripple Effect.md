---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f23f7f17b2d15e9fa3cdd3fa6fae4262f7ed88e8f05a147e65bb4c3b7e41b868
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ripple Effect.md
---

**A Ripple Effect** is a second-order consequence that follows from an adverse scenario, beyond its direct financial impact. [[FCT]] requires the [[Appointed Actuary]] to model them: a scenario examined only for its immediate effect understates its severity, sometimes by a wide margin.

- **Typical ripples following a catastrophe:** reinstatement premium payable immediately; reinsurance renewal at much higher cost or reduced capacity; a [[Rating Agency|rating]] downgrade; higher borrowing costs and impaired access to capital markets; reduced new business as the rating falls; and, if the event affected the insurer's own region, operational disruption.
- **Ripples following reserve deterioration:** loss of regulatory and market confidence; a [[Rating Agency]] downgrade; the need to re-price, which loses business; increased [[OSFI]] scrutiny and possible restrictions on dividends and growth; and — since inadequate reserves usually mean inadequate rates — continued losses on business still being written.
- **Ripples following an investment loss:** reduced [[Capital Available]], which raises the cost of writing business; forced asset sales realising further losses; and a [[Market Risk Margin|market risk]] profile that may worsen if the remaining portfolio is less liquid.
- **The compounding is the point.** A $\$50$ million catastrophe that triggers a downgrade, a $30\%$ reinsurance cost increase and a $10\%$ loss of business is not a $\$50$ million event. Modelling only the direct loss produces a scenario the insurer comfortably survives on paper and would not survive in fact.
- **Management actions are the counterpart.** FCT requires both: the ripples that worsen the scenario, and the realistic responses that mitigate it. The discipline is to be equally honest about both — and to recognise that some actions available in normal conditions (raising capital, buying reinsurance) are unavailable in the scenario that created the need.
- The most commonly omitted ripple is the **feedback into pricing**: the events that damage capital usually also mean the business currently being written is underpriced.

> [!example]- A Catastrophe With and Without Ripples {Example}
> An insurer suffers a $\$60$ million net catastrophe loss. Capital available before the event is $\$340$ million and the base solvency buffer is $\$200$ million.
>
> Model the effect with direct impact only, then with ripple effects: reinstatement premium $\$8$ million; reinsurance renewal cost rising $\$12$ million annually; a downgrade causing a $9\%$ loss of commercial business worth $\$14$ million of annual underwriting contribution; and borrowing costs rising $\$3$ million annually.
>
> > [!answer]-
> > **Direct impact only**, after tax at $27\%$:
> >
> > $$\begin{align*}
> > \text{Capital available} &= \$340\text{M} - 0.73(\$60\text{M}) \\
> > &= \$296.2\text{M} \\[4pt]
> > \text{MCT} &= \frac{\$296.2\text{M}}{\$200\text{M}} = 148\%
> > \end{align*}$$
> >
> > Marginally below the supervisory target. A board shown this number would find it uncomfortable but manageable.
> >
> > **With ripple effects.** Year 1 adds the reinstatement premium; the ongoing items affect year 2 onward:
> >
> > $$\begin{align*}
> > \text{Year 1} &= \$340\text{M} - 0.73(\$60\text{M} + \$8\text{M}) \\
> > &= \$290.4\text{M} \quad (145\%) \\[6pt]
> > \text{Year 2 drag} &= 0.73(\$12\text{M} + \$14\text{M} + \$3\text{M}) \\
> > &= \$21.2\text{M} \\[4pt]
> > \text{Year 2} &= \$290.4\text{M} - \$21.2\text{M} \\
> > &= \$269.2\text{M} \quad (135\%) \\[6pt]
> > \text{Year 3} &= \$248\text{M} \quad (124\%)
> > \end{align*}$$
> >
> > **The difference is the whole point.** The direct-impact view shows a one-time dip to $148\%$ followed by recovery. The ripple view shows a **continuing decline** to $124\%$ over three years, because the event permanently raised the cost of doing business and permanently reduced the business being done.
> >
> > **What changes as a result.** The direct view suggests no action is needed. The ripple view requires a capital plan, and it identifies the actionable items: the reinsurance cost increase and the downgrade-driven business loss are both larger than the reinstatement premium, and both are addressable — by pre-negotiating multi-year reinsurance terms, and by holding a higher [[Internal Target Capital Ratio|internal target]] so that a $\$60$ million event does not threaten the rating in the first place.
