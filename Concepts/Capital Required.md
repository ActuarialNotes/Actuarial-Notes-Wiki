---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:736a7422db2f27615c02bd5980d65adbcc34b7d7cfb6e0fbd33cc18597564af2
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.1.5, §1.2.1; ch.4 intro, §4.2.1; §4.3.2.2, §4.3.3.1, §4.3.3.2; ch.5 intro, §5.1; ch.6 intro; §7.1, §7.2.2, §7.2.3, §7.2.4; ch.8, §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), pp.3, 5 (MCT capital requirement = minimum capital required; ORSA and internal targets), sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Capital Required.md
---

**Capital Required** is the [[MCT]]'s measure of the capital an insurer's risks require at the target level: OSFI sets the MCT's capital requirements directly at $99\%$ of the expected shortfall (CTE $99\%$) over a one-year horizon, including a terminal provision. It is the sum of the requirements for each category of risk, less a credit for diversification, and dividing it by $1.5$ gives the **minimum capital required** against which the MCT ratio is measured.

> $$\text{CR} = \text{Insurance} + \text{Market} + \text{Credit} + \text{Operational} - \text{Diversification}$$
>
> $$\text{Minimum Capital Required} = \frac{\text{CR}}{1.5}$$

- **The four risk requirements:**
  - **[[Insurance Risk Margin|Insurance risk]]** — risk factors by class of insurance applied to the liability for incurred claims (net of reinsurance contracts held) and to unexpired coverage, plus requirements for unregistered reinsurance and for [[Earthquake Exposure Risk Margin|earthquake]] and nuclear catastrophes.
  - **[[Market Risk Margin|Market risk]]** — interest rate, foreign exchange, equity, real estate, right-of-use asset and other market exposures.
  - **[[Credit Risk Margin|Credit risk]]** — counterparty default on balance sheet assets and off-balance sheet exposures, and collateral held for unregistered reinsurance and self-insured retentions.
  - **[[Operational Risk Margin|Operational risk]]** — a charge on capital required and on premiums, including premium growth above a $20\%$ threshold, capped at $30\%$ of capital required before the operational risk margin and diversification credit.
- **The [[Diversification Credit]]** is allowed between the insurance risk requirement and the sum of the credit and market risk requirements, because losses across those categories are not perfectly correlated.
- **Minimum capital required is capital required divided by $1.5$**, and it is the denominator of the MCT ratio. At the $100\%$ minimum, capital available equals two-thirds of capital required; at the $150\%$ [[Supervisory Target Capital Ratio|supervisory target]], it equals capital required. ([[Base Solvency Buffer]] is the name of the life insurers' LICAT denominator, not an MCT term.)
- **Growth raises it.** The insurance risk factors are applied to the liability for incurred claims and to unexpired coverage, so writing more business raises the insurance risk requirement; and gross premiums received above a $20\%$ year-over-year growth threshold draw an additional operational risk charge of $2.5\%$ of the excess.
- **Reinsurance reduces it, against charges elsewhere.** The insurance risk requirements are calculated net of reinsurance, but recoverables from [[Registered Reinsurance|registered]] reinsurers carry a [[Credit Risk Margin|credit risk]] factor; unregistered reinsurance earns credit only where it is secured by acceptable collateral, and the unsecured amount is deducted from capital available; and premiums paid for reinsurance contracts held draw a $2.5\%$ operational risk charge, because the operational risk remains with the ceding insurer.
- **The formula is standardised.** The MCT is a standardized measure of capital adequacy and one of several indicators OSFI uses; its minimum and supervisory target rest on industry-wide simplifying assumptions, so OSFI expects each insurer to determine its own capital needs through its [[ORSA]].

![[Media/Figures/Capital_Required.svg|340]]

> [!example]- The Capital Cost of Growth {Example}
> An insurer's capital required is $\$140$ million, of which $\$88$ million is insurance risk. Capital available is $\$330$ million. It plans to grow premium $20\%$, which will raise the insurance risk margin proportionally, with other margins unchanged and the diversification credit of $\$18$ million rising to $\$21$ million.
>
> What happens to the MCT ratio, assuming the growth is written at break-even?
>
> > [!answer]-
> > **Before:**
> >
> > $$\begin{align*}
> > \text{MCR} &= \frac{\$140\text{M}}{1.5} = \$93.3\text{M} \\[4pt]
> > \text{MCT} &= \frac{\$330\text{M}}{\$93.3\text{M}} = 354\%
> > \end{align*}$$
> >
> > **After.** Insurance risk rises $20\%$ to $\$105.6$M, an increase of $\$17.6$M; the diversification credit rises $\$3$M:
> >
> > $$\begin{align*}
> > \text{CR} &= \$140\text{M} + \$17.6\text{M} - \$3\text{M} \\
> > &= \$154.6\text{M} \\[4pt]
> > \text{MCR} &= \frac{\$154.6\text{M}}{1.5} = \$103.1\text{M} \\[4pt]
> > \text{MCT} &= \frac{\$330\text{M}}{\$103.1\text{M}} = 320\%
> > \end{align*}$$
> >
> > **The ratio falls $33$ points from growth alone, with no losses** — still above the $150\%$ supervisory target. Break-even business adds nothing to capital available while adding to minimum capital required.
> >
> > **What this means in practice.** Growth must be *funded*. To hold $354\%$ the insurer needs capital available to grow in step with capital required, to $\$330\text{M} \times \$154.6\text{M} / \$140\text{M} = \$364$ million, or $\$34$ million more than it has. The sources are retained earnings (so the growth must be **profitable**, not break-even), a capital injection, or reinsurance to hold the insurance risk margin down.
