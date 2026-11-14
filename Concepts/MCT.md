---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:8e2c2f202d1cc48faa73c73cb5a3f80d8893390cb082a8633cbef12648e94179
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, preamble; §1.1.1, §1.1.2, §1.1.5, §1.2.1; ch.4 intro; §2.3.1; §4.3.2.2, §4.3.3.1, §4.3.3.2; ch.5 intro, §5.1; ch.6 intro; §7.1; ch.8, §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), pp.3-5 (capital requirement = minimum capital required for MCT; Internal Targets from the ORSA, set above Supervisory Targets; industry-wide simplifying assumptions), sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/MCT.md
---

![[Media/Figures/MCT.svg|340]]

The **Minimum Capital Test** (MCT) is [[OSFI]]'s capital guideline for federally regulated P&C insurers that are not mortgage insurers. It compares the capital an insurer has, its [[Capital Available|capital available]], with its minimum capital required, and expresses the result as a percentage.

The MCT ratio is

> $$\text{MCT ratio} = \frac{\text{Capital available}}{\text{Minimum capital required}} \times 100\%$$

The guideline's risk factors set capital requirements at a target confidence level of $99\%$ of the expected shortfall (CTE $99\%$) over a one-year horizon, including a terminal provision. [[Capital Required|Capital required]] at that level is the sum of the insurance, market, credit and operational risk requirements, less a [[Diversification Credit|diversification credit]] between the insurance risk requirement and the combined credit and market risk requirements. Minimum capital required is

> $$\text{Minimum capital required} = \frac{I + M + C + O - D}{1.5}$$

- $I$ is the [[Insurance Risk Margin|insurance risk margin]].
- $M$ is the [[Market Risk Margin|market risk margin]].
- $C$ is the [[Credit Risk Margin|credit risk margin]].
- $O$ is the [[Operational Risk Margin|operational risk margin]].
- $D$ is the diversification credit.

> [!example]- What is this insurer's MCT ratio? {Example}
> An insurer reports capital available of $\$248$ million. Its risk margins are:
>
> | Requirement | $\$$ millions |
> | :--- | ---: |
> | Insurance risk | 92 |
> | Market risk | 54 |
> | Credit risk | 21 |
> | Operational risk | 17 |
> | Diversification credit | 26 |
>
> > [!answer]-
> > - Capital required is $92 + 54 + 21 + 17 - 26 = \$158$ million.
> > - Minimum capital required is $\$158\text{M}/1.5 = \$105.3$ million.
> > - The MCT ratio is $\$248\text{M}/\$105.3\text{M} = 235.4\%$.

## Capital required

Capital required is built from the insurer's own balance sheet:

1. **Insurance risk**: risk factors by class of insurance on the liability for incurred claims and unexpired coverage, with requirements for unregistered reinsurance and for earthquake and nuclear catastrophes.
2. **Market risk**: shocks and factors on interest rate sensitive assets and liabilities, foreign exchange, equity, real estate, right-of-use assets and other exposures.
3. **Credit risk**: factors on balance sheet assets and off-balance sheet exposures.
4. **Operational risk**: a charge on capital required and premiums, subject to a cap.

## Target ratios

The MCT sets three levels:

| Level | MCT ratio | Set by |
| :--- | :--- | :--- |
| Minimum | $100\%$ | The guideline |
| Supervisory target | $150\%$ | OSFI, industry-wide |
| Internal target | Above the supervisory target | The insurer, through its [[ORSA]] |

The [[Supervisory Target Capital Ratio|supervisory target]] is a cushion above the minimum that facilitates OSFI's early intervention, and the Superintendent may set an alternative supervisory target for an individual insurer. An insurer that anticipates falling below its [[Internal Target Capital Ratio|internal target]] must inform OSFI immediately and lay out its plans to return to it. Because minimum capital required is capital required divided by $1.5$, an insurer at the $150\%$ supervisory target holds capital available equal to its capital required at the target level.

> [!example]- The insurer above has an internal target of $185\%$. How much capital does it hold above that target? {Example}
> - Its ratio of $235.4\%$ is above the $100\%$ minimum, the $150\%$ supervisory target and the $185\%$ internal target.
> - At $150\%$ it would need $1.5 \times \$105.3\text{M} = \$158$ million, its capital required.
> - At $185\%$ it would need $1.85 \times \$105.3\text{M} = \$194.9$ million.
> - It holds $\$248\text{M} - \$194.9\text{M} = \$53.1$ million above its internal target.

## Credit for reinsurance

Credit for reinsurance depends on registration. Credit for reinsurance with an [[Unregistered Reinsurance|unregistered]] reinsurer is given where the cedant holds a valid, enforceable, first-priority security interest in the reinsurer's assets held in Canada, or acceptable letters of credit. Amounts receivable and recoverable from an unregistered reinsurer that are not covered by amounts payable to it or by acceptable collateral are deducted from capital available. Recoverables from a [[Registered Reinsurance|registered]] reinsurer carry a credit risk factor instead.

## The MCT as one indicator

The MCT is a standardized measure of capital adequacy and one of several indicators OSFI uses to assess an insurer's financial condition. It should not be used in isolation for ranking and rating insurers. Its minimum and supervisory target rest on industry-wide simplifying assumptions, so OSFI expects each insurer to determine its own capital needs through its ORSA.

> [!trap] Forgetting to divide by 1.5
> The ratio's denominator is minimum capital required, which is capital required divided by $1.5$. Dividing capital available by capital required itself gives $248/158 = 157\%$ in the example, two-thirds of the true $235\%$.
