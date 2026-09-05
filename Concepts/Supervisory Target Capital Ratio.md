---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:53707dcf75aa22a4244eaceca268c9338cabdc494facfa1a2ef050a9ccddb999
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Supervisory Target Capital Ratio.md
---

**The Supervisory Target Capital Ratio** is the [[MCT]] ratio at which [[OSFI]] expects every federally regulated P&C insurer to operate: **$150\%$**. It is above the $100\%$ minimum, and the space between them is deliberate — it gives the regulator room to act while the insurer still has capital to work with.

> $$\text{Supervisory target} = 150\%$$
>
> $$\text{Minimum} = 100\%$$

- **Not a minimum, and not optional.** An insurer below $150\%$ has not breached a legal requirement, but it has fallen below the level at which OSFI considers it soundly capitalised, and heightened supervision follows.
- **The three-level ladder:** the insurer's own **[[Internal Target Capital Ratio|internal target]]** (set through [[ORSA]], above $150\%$), the supervisory target ($150\%$), and the minimum ($100\%$). Each breach triggers a stronger response, and the ladder exists so that action begins early rather than at the point of failure.
- **What a breach brings:** a required capital restoration plan with dates, restrictions on dividends and other capital distributions, increased reporting frequency, likely limits on growth (since growth raises the [[Base Solvency Buffer]]), and escalation through OSFI's intervention stages.
- **Trend beats level.** A ratio of $160\%$ falling $20$ points a year is a more urgent problem than a stable $145\%$ — the first will breach the minimum within three years, the second will not. Supervisory attention follows direction.
- **The target is uniform; the internal target is not.** OSFI applies $150\%$ to all, and expects each insurer's own target to reflect *its* risks — catastrophe exposure, business concentration, reserve uncertainty, growth plans — through [[ORSA]] and tested in [[FCT]].

> [!example]- How Much Room Is There? {Example}
> An insurer holds a $158\%$ MCT ratio with capital available of $\$237$ million and a base solvency buffer of $\$150$ million. Its [[FCT]] report models a $1$-in-$100$ earthquake costing $\$46$ million net of reinsurance, after tax.
>
> Does it survive the scenario, and what should the internal target be?
>
> > [!answer]-
> > **After the event**, capital available falls by $\$46$ million. The buffer also changes — an earthquake consumes reinsurance and changes the risk profile — but take it as roughly unchanged for a first pass:
> >
> > $$\begin{align*}
> > \text{MCT} &= \frac{\$237\text{M} - \$46\text{M}}{\$150\text{M}} \\
> > &= \frac{\$191\text{M}}{\$150\text{M}} \\
> > &= 127\%
> > \end{align*}$$
> >
> > **It survives** — above the $100\%$ minimum — **but lands below the $150\%$ supervisory target**, in escalation, with an earthquake to pay for and reduced access to capital markets precisely when it needs them.
> >
> > **What the internal target should be.** If the insurer wants to remain at or above the supervisory target after its largest modelled event, it needs:
> >
> > $$\begin{align*}
> > \text{Required CA} &= 1.50 \times \$150\text{M} + \$46\text{M} \\
> > &= \$271\text{M} \\[4pt]
> > \text{Implied target} &= \frac{\$271\text{M}}{\$150\text{M}} = 181\%
> > \end{align*}$$
> >
> > **So an internal target of roughly $180\%$**, not the $158\%$ currently held — and that is before allowing for the possibility of a reserve strengthening or a market decline occurring in the same year, which [[FCT]] would test as a combined scenario.
> >
> > **The general principle:** the internal target is not a comfort margin chosen by feel. It is derived from *how far the insurer's own scenarios say the ratio can fall*, and the supervisory target is the floor those scenarios must respect.
