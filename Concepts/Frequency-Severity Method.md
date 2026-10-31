---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:d39190a27c88503956e52041045a7ce594f31d7eaf05f28f05bf44011ffd3165
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.11 Frequency-Severity Techniques, PDF pp.200-203, 207-213, 218 (printed 194-197, 201-207, 212), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Frequency-Severity Method.md
---

**Frequency-Severity Method** projects [[Claim Count Triangle|claim counts]] and average [[Severity|severity]] separately and multiplies them, instead of developing loss dollars directly.

> $$U = N_{\text{ult}} \times S_{\text{ult}}$$

> $$U = \text{Exposures} \times \text{Frequency}_{\text{ult}} \times S_{\text{ult}}$$

Friedland gives three variants:

- **Development on counts and severities.** Develop the count triangle to ultimate counts; develop an average severity triangle (dollars ÷ counts at each age) to ultimate severity; multiply. The straightforward version.
- **Exposures and inflation.** For the most recent accident years, where development factors are most leveraged: compare developed ultimate counts with a trended **exposure** base to select a **frequency**, and select severity from developed severities **trended** to the latest year's cost level.
- **Disposal rate approach.** Project the number of claims closing in each future period from historical **disposal rates**, value them at a trended severity for that maturity, and sum the future payments. This is the variant that handles a changing [[Settlement Rate|settlement rate]] head on.

Further points:

- The value of the split is **diagnostic**. A dollar triangle tells you losses grew; frequency and severity tell you *why*, and the two causes call for different responses and carry different persistence.
- Counts are more **credible** and less inflation-sensitive; severity is where the trend lives. Projecting each with the tool it suits — development for counts, trend for severity — is often better than developing either alone.
- The method needs **consistent count definitions** across the whole triangle, and it is sensitive to [[Large Loss|large losses]] in the severity series, so severities are usually capped and the excess layer added back separately.
- A pitfall: average severity triangles mix two opposing forces — IBNER pushing severity up, late-reported small claims pulling it down. Report-year severities avoid the dilution; accident-year severities do not.

![[Media/Figures/Frequency-Severity_Method.svg|340]]

> [!example]- Straightforward Frequency-Severity Projection {Example}
> An accident year has $10{,}000$ earned car-years. Projected ultimate frequency is $0.08$ claims per car-year and projected ultimate severity is $\$12{,}500$.
>
> Estimate ultimate losses.
>
> > [!answer]-
> > $$\begin{align*}
> > N_{\text{ult}} &= 10{,}000 \times 0.08 = 800 \text{ claims} \\[4pt]
> > U &= 800 \times \$12{,}500 = \$10{,}000{,}000
> > \end{align*}$$
> >
> > Equivalently a pure premium of $0.08 \times \$12{,}500 = \$1{,}000$ per car-year. The decomposition matters when the estimate is challenged: an actuary can defend $0.08$ against the exposure base and $\$12{,}500$ against severity trend and settled-claim data, where a bare $\$1{,}000$ has no supporting evidence of its own.

> [!example]- Diagnosing an Adverse Year {Example}
> An accident year's ultimate estimate has risen $22\%$ since the previous valuation. The components:
>
> | | Prior valuation | Current |
> |---|---|---|
> | Ultimate counts | $1{,}200$ | $1{,}215$ |
> | Ultimate severity | $\$9{,}000$ | $\$10{,}830$ |
>
> What happened, and what should change in the analysis?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Count change} &= \frac{1{,}215}{1{,}200} - 1 = +1.3\% \\[4pt]
> > \text{Severity change} &= \frac{10{,}830}{9{,}000} - 1 = +20.3\%
> > \end{align*}$$
> >
> > $$1.013 \times 1.203 = 1.219 \;\checkmark$$
> >
> > Counts are essentially where they were — reporting is complete and the earlier count projection was good. **The entire deterioration is severity.**
> >
> > That narrows the causes sharply. It is not a reporting-pattern change, not a frequency shock, and not a volume issue. The candidates are: claims already known getting worse (IBNER, possibly from a [[Case Adequacy|case adequacy]] change), an [[Inflation|inflation]] or legal shock hitting open claims, or one or two [[Large Loss|large claims]] developing.
> >
> > Two things follow for the analysis. First, check whether this is one accident year or **all of them** — a severity jump across every open year on the same diagonal is a calendar-year effect requiring a triangle restatement, not a year-specific reserve increase. Second, if severity trend has genuinely stepped up, the **pricing** severity trend selection is stale too, and the reserving finding is also a rate-adequacy finding.
