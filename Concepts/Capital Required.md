---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:51c1e50290352760d20b26d93bc655c78e7bf07ec26d57883bd9841608073550
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.1.5, §1.2.1; ch.4 intro, §4.2.1; §4.3.2.2, §4.3.3.1, §4.3.3.2; ch.5 intro, §5.1; ch.6 intro; §7.1, §7.2.2, §7.2.3, §7.2.4; ch.8, §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), pp.3, 5 (MCT capital requirement = minimum capital required; ORSA and internal targets), sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Capital Required.md
---

![[Media/Figures/Capital_Required.svg|340]]

**Capital Required** is the [[MCT]]'s measure of the capital an insurer's risks require at the target level, which OSFI sets at $99\%$ of the expected shortfall (CTE $99\%$) over a one-year horizon, including a terminal provision. It is the sum of the requirements for each category of risk, less a credit for diversification.

Capital required, $\text{CR}$, is

> $$\text{CR} = \text{Insurance} + \text{Market} + \text{Credit} + \text{Operational} - \text{Diversification}$$

- $\text{Insurance}$ is the [[Insurance Risk Margin|insurance risk]] requirement: risk factors by class of insurance applied to the liability for incurred claims (net of reinsurance contracts held) and to unexpired coverage, plus requirements for unregistered reinsurance and for [[Earthquake Exposure Risk Margin|earthquake]] and nuclear catastrophes.
- $\text{Market}$ is the [[Market Risk Margin|market risk]] requirement for interest rate, foreign exchange, equity, real estate, right-of-use asset and other market exposures.
- $\text{Credit}$ is the [[Credit Risk Margin|credit risk]] requirement for counterparty default on balance sheet assets and off-balance sheet exposures, and on collateral held for unregistered reinsurance and self-insured retentions.
- $\text{Operational}$ is the [[Operational Risk Margin|operational risk]] requirement, a charge on capital required and on premiums, including premium growth above a $20\%$ threshold, capped at $30\%$ of capital required before the operational risk margin and diversification credit.
- $\text{Diversification}$ is the [[Diversification Credit|diversification credit]], allowed between the insurance risk requirement and the sum of the credit and market risk requirements because losses across those categories are not perfectly correlated.

The MCT is a standardized measure of capital adequacy and one of several indicators OSFI uses. Its minimum and supervisory target rest on industry-wide simplifying assumptions, so OSFI expects each insurer to determine its own capital needs through its [[ORSA]].

## Minimum capital required

The denominator of the MCT ratio is the minimum capital required, which is

> $$\text{Minimum Capital Required} = \frac{\text{CR}}{1.5}$$

At the $100\%$ minimum, capital available equals two-thirds of capital required. At the $150\%$ [[Supervisory Target Capital Ratio|supervisory target]], it equals capital required. [[Base Solvency Buffer]] is the name of the life insurers' LICAT denominator, not an MCT term.

## Growth

The insurance risk factors are applied to the liability for incurred claims and to unexpired coverage, so writing more business raises the insurance risk requirement. Gross premiums received above a $20\%$ year-over-year growth threshold also draw an additional operational risk charge of $2.5\%$ of the excess.

> [!example]- What does this growth plan do to the insurer's MCT ratio? {Example}
> An insurer's capital required is $\$140$ million, of which $\$88$ million is insurance risk. Its capital available is $\$330$ million. It plans to grow premium $20\%$ at break-even. Its insurance risk requirement rises $20\%$, its other requirements are unchanged, and its diversification credit rises from $\$18$ million to $\$21$ million.
>
> > [!answer]-
> > - Before, minimum capital required is $\$140\text{M}/1.5 = \$93.3\text{M}$, and the MCT ratio is $\$330\text{M}/\$93.3\text{M} = 354\%$.
> > - The insurance risk requirement rises by $0.20 \times \$88\text{M} = \$17.6\text{M}$, and the larger diversification credit takes off $\$3\text{M}$.
> > - Capital required becomes $\$140\text{M} + \$17.6\text{M} - \$3\text{M} = \$154.6\text{M}$, and minimum capital required $\$154.6\text{M}/1.5 = \$103.1\text{M}$.
> > - The MCT ratio becomes $\$330\text{M}/\$103.1\text{M} = 320\%$, about $33$ points lower with no losses, because break-even business adds nothing to capital available.
> > - To hold $354\%$, capital available must grow to $\$330\text{M} \times 154.6/140 = \$364\text{M}$, or $\$34$ million more, from profitable growth, a capital injection or reinsurance that holds the insurance risk requirement down.

## Reinsurance

The insurance risk requirements are calculated net of reinsurance, but recoverables from [[Registered Reinsurance|registered]] reinsurers carry a [[Credit Risk Margin|credit risk]] factor. Unregistered reinsurance earns credit only where it is secured by acceptable collateral, and the unsecured amount is deducted from capital available. Premiums paid for reinsurance contracts held draw a $2.5\%$ operational risk charge, because the operational risk remains with the ceding insurer.

> [!trap] Dividing capital available by capital required
> The MCT ratio's denominator is minimum capital required, $\text{CR}/1.5$. Capital available of $\$330$ million against capital required of $\$140$ million is an MCT ratio of $354\%$, not $236\%$.
