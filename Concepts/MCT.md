---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:093acaf33ca5074f12694dc2f75fc87998b1f3252dcf53927fbc8cf26a1c7cbd
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, preamble; §1.1.1, §1.1.2, §1.1.5, §1.2.1; ch.4 intro; §2.3.1; §4.3.2.2, §4.3.3.1, §4.3.3.2; ch.5 intro, §5.1; ch.6 intro; §7.1; ch.8, §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), pp.3-5 (capital requirement = minimum capital required for MCT; Internal Targets from the ORSA, set above Supervisory Targets; industry-wide simplifying assumptions), sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/MCT.md
---

**The Minimum Capital Test** (MCT) is [[OSFI]]'s capital guideline for federally regulated P&C insurers that are not mortgage insurers. It compares the capital an insurer actually has — **[[Capital Available]]** — with its **minimum capital required**, derived from the capital its risks require at a target level, and expresses the result as a percentage.

> $$\text{MCT Ratio} = \frac{\text{Capital Available}}{\text{Minimum Capital Required}} \times 100\%$$

- **The build-up.** The guideline's risk factors set capital requirements directly at a target confidence level: $99\%$ of the expected shortfall (CTE $99\%$) over a one-year horizon, including a terminal provision. [[Capital Required]] at that level is the sum of the [[Insurance Risk Margin|insurance]], [[Market Risk Margin|market]], [[Credit Risk Margin|credit]] and [[Operational Risk Margin|operational]] risk requirements, less a [[Diversification Credit]] between the insurance risk requirement and the combined credit and market risk requirements. **Minimum capital required is that total divided by $1.5$.**

> $$\text{Minimum Capital Required} = \frac{\text{Insurance} + \text{Market} + \text{Credit} + \text{Operational} - \text{Diversification}}{1.5}$$

- **The thresholds:** a **minimum** MCT ratio of $100\%$; an industry-wide **[[Supervisory Target Capital Ratio|supervisory target]]** of $150\%$, a cushion above the minimum that facilitates OSFI's early intervention (the Superintendent may set an alternative supervisory target for an individual insurer); and an **[[Internal Target Capital Ratio|internal target]]** each insurer determines through its [[ORSA]] and sets above the supervisory target. An insurer that anticipates falling below its internal target must inform OSFI immediately and lay out its plans to return to it. Because minimum capital required is capital required divided by $1.5$, an insurer at the $150\%$ supervisory target holds capital available equal to its capital required at the target level.
- **Risk-based.** Capital required is built from the insurer's own balance sheet: risk factors by class of insurance on its liability for incurred claims and unexpired coverage, with requirements for unregistered reinsurance and for earthquake and nuclear catastrophes (insurance risk); shocks and factors on interest rate sensitive assets and liabilities, foreign exchange, equity, real estate, right-of-use assets and other exposures (market risk); factors on balance sheet assets and off-balance sheet exposures (credit risk); and a charge on capital required and premiums, subject to a cap (operational risk).
- **Reinsurance credit depends on registration.** Credit for reinsurance with an [[Unregistered Reinsurance|unregistered]] reinsurer is given where the cedant holds a valid, enforceable, first-priority security interest in the reinsurer's assets held in Canada, or acceptable letters of credit; amounts receivable and recoverable from an unregistered reinsurer that are not covered by amounts payable to it or by acceptable collateral are deducted from capital available. Recoverables from a [[Registered Reinsurance|registered]] reinsurer carry a credit risk factor instead.
- **It is one indicator among several.** The MCT is a standardized measure of capital adequacy, one of several indicators OSFI uses to assess an insurer's financial condition, and it should not be used in isolation for ranking and rating insurers. Its minimum and supervisory target rest on industry-wide simplifying assumptions, so OSFI expects each insurer to determine its own capital needs through its [[ORSA]].

![[Media/Figures/MCT.svg|340]]

> [!example]- Computing the MCT Ratio {Example}
> An insurer reports: capital available $\$248$ million; insurance risk margin $\$92$ million; market risk margin $\$54$ million; credit risk margin $\$21$ million; operational risk margin $\$17$ million; diversification credit $\$26$ million. Its internal target is $185\%$.
>
> Compute the ratio and assess.
>
> > [!answer]-
> > **Capital required at the target level:**
> >
> > $$\begin{align*}
> > \text{CR} &= \$92 + \$54 + \$21 + \$17 - \$26 \\
> > &= \$158\text{M}
> > \end{align*}$$
> >
> > **Minimum capital required:**
> >
> > $$\begin{align*}
> > \text{MCR} &= \frac{\$158\text{M}}{1.5} \\
> > &= \$105.3\text{M}
> > \end{align*}$$
> >
> > **MCT ratio:**
> >
> > $$\begin{align*}
> > \text{MCT} &= \frac{\$248\text{M}}{\$105.3\text{M}} \times 100\% \\
> > &= 235.4\%
> > \end{align*}$$
> >
> > **Above the $100\%$ minimum, the $150\%$ supervisory target and the $185\%$ internal target.** At $150\%$ the insurer would need capital available of $1.5 \times \$105.3\text{M} = \$158\text{M}$ — its capital required — and at its $185\%$ internal target $1.85 \times \$105.3\text{M} = \$194.9\text{M}$, so it holds about $\$53$ million above its own target.
