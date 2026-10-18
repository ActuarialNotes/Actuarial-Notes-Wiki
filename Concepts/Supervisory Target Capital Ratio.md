---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:d764243b3f484eff660f144817b200f7b48f08c3f81801112f617f358082dc1f
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), pp.3-5 (Minimums and Supervisory Targets defined; 100%/150% for MCT/BAAT; stage 1; Internal Targets from the ORSA, set above Supervisory Targets; industry-wide simplifying assumptions), sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Supervisory Target Capital Ratio.md
---

**The Supervisory Target Capital Ratio** is [[OSFI]]'s industry-wide supervisory target for the [[MCT]] ratio of federally regulated P&C insurers: **$150\%$**. It sits above the $100\%$ minimum as a cushion that facilitates OSFI's early intervention process.

> $$\text{Supervisory target} = 150\%$$
>
> $$\text{Minimum} = 100\%$$

- **What it covers.** The minimum is the capital an insurer needs to cover the risks specified in the capital guideline; the supervisory target covers those risks and provides a margin for other risks. It provides additional capacity to absorb unexpected losses and addresses capital needs through on-going market access. Because the MCT's minimum capital required is capital required at the target level divided by $1.5$, an insurer at $150\%$ holds capital available equal to its capital required.
- **Below it.** Failing to maintain capital above the supervisory target is, from OSFI's perspective, indicative of material safety and soundness concerns and a vulnerability to adverse conditions requiring immediate attention. An insurer whose capital approaches or falls below the supervisory target attracts increased supervisory attention, generally including an early warning intervention status (stage 1); the intensity and nature of the intervention depend on the insurer's circumstances.
- **The three-level ladder:** the insurer's own **[[Internal Target Capital Ratio|internal target]]**, determined through its [[ORSA]] and set above the supervisory target; the supervisory target ($150\%$); and the minimum ($100\%$). An insurer that anticipates falling below its internal target must inform OSFI immediately and lay out its plans to return to it; one whose capital approaches or falls below the minimum leaves OSFI very concerned about its ongoing viability.
- **Approaching counts, not only falling below.** Supervisory attention is drawn by capital that *approaches* the target. A ratio of $160\%$ falling $20$ points a year reaches $100\%$ in three years, while a stable $145\%$ stays where it is.
- **The target is industry-wide; the internal target is not.** OSFI sets $150\%$ for the industry, but the Superintendent may, case by case and in consultation with an insurer, establish an alternative supervisory target based on its individual risk profile. The minimum and supervisory target rest on simplifying assumptions applicable industry-wide, so each insurer determines its own capital needs, and its internal target, through its [[ORSA]].

![[Media/Figures/Supervisory_Target_Capital_Ratio.svg|340]]

> [!example]- How Much Room Is There? {Example}
> An insurer holds a $158\%$ MCT ratio with capital available of $\$237$ million and minimum capital required of $\$150$ million. Its [[FCT]] report models a $1$-in-$100$ earthquake costing $\$46$ million net of reinsurance, after tax.
>
> Does it survive the scenario, and what should the internal target be?
>
> > [!answer]-
> > **After the event**, capital available falls by $\$46$ million. Minimum capital required also changes — an earthquake consumes reinsurance and changes the risk profile — but take it as roughly unchanged for a first pass:
> >
> > $$\begin{align*}
> > \text{MCT} &= \frac{\$237\text{M} - \$46\text{M}}{\$150\text{M}} \\
> > &= \frac{\$191\text{M}}{\$150\text{M}} \\
> > &= 127\%
> > \end{align*}$$
> >
> > **It survives** — above the $100\%$ minimum — **but lands below the $150\%$ supervisory target**, where it attracts increased supervisory attention, generally an early warning (stage 1) status.
> >
> > **What the internal target should be.** If the insurer wants to remain at or above the supervisory target after its largest modelled event, it needs:
> >
> > $$\begin{align*}
> > \text{Required CA} &= 1.50 \times \$150\text{M} + \$46\text{M} \\
> > &= \$271\text{M} \\[4pt]
> > \text{Implied target} &= \frac{\$271\text{M}}{\$150\text{M}} = 181\%
> > \end{align*}$$
> >
> > **So an internal target of roughly $180\%$**, not the $158\%$ currently held — and that is before allowing for the possibility of a reserve strengthening or a market decline occurring in the same year.
> >
> > **The general principle:** the internal target is not a comfort margin chosen by feel. It is determined from the insurer's own assessment of its risks through its [[ORSA]], and it must sit above the supervisory target.
