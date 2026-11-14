---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:4cecbbaa0a5a48f7bac4a0a8c76acb61befcbc8b15a92bf81020a3b4b822796b
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Quarterly Return.md
---
![[Media/Figures/Quarterly_Return.svg|340]]

The **Quarterly Return** is the abbreviated regulatory filing a Canadian P&C insurer submits to [[OSFI]] after each of the first three quarters. It is a reduced version of the [[Canadian Annual Return]], giving the regulator a current read on capital and results between annual filings.

An annual filing alone would leave a regulator eleven months behind a deteriorating insurer. Capital erodes fast once it starts, and OSFI's early-intervention model depends on seeing the [[MCT]] ratio and its trend at least four times a year.

## Contents of the quarterly return

The quarterly return contains:

1. An interim [[Financial Position|statement of financial position]] and income statement, unaudited.
2. The MCT calculation, with [[Capital Available]] and minimum capital required.
3. Premium and claims by class.
4. Reinsurance information.

It does not contain the audited statements, the full [[Notes to Financial Statements|note]] disclosure or the [[Statement of Actuarial Opinion]].

## The actuary's quarterly work

[[Insurance Contract Liabilities]] must still be estimated for the interim statements. The usual method rolls forward the last full valuation with actual-versus-expected analysis rather than repeating it in full. The [[Standards of Practice]] apply to that work as to any other.

A roll-forward that simply applies expected emergence will not detect a deterioration in the underlying pattern. Actual-versus-expected analysis by accident year is the control that catches it. This is why a quarter's actual versus expected is more informative than its reported result.

## Reading the quarterly sequence

OSFI and analysts read the sequence of quarterly MCT ratios, not any one of them. Direction matters more than level, the same principle that governs the annual return's development exhibit.

> [!example]- When should the actuary have raised this MCT trend, and what does it indicate? {Example}
> An insurer's [[MCT]] ratios by quarter over two years are $202\%$, $198\%$, $195\%$, $191\%$, $186\%$, $178\%$, $169\%$ and $158\%$. The internal target is $180\%$ and the supervisory target is $150\%$.
>
> > [!answer]-
> > - The ratio fell in seven straight quarters, and the fall is accelerating: about $4$ points a quarter in year 1 and about $9$ in year 2.
> > - It went below the internal target at quarter 6 and is now $8$ points above the supervisory target.
> > - Four consecutive declines by quarter 4 were already a trend, so the ordinary quarterly review should have asked why then. Waiting for a target breach means acting when the remaining buffer is smallest.
> > - At $9$ points a quarter, the supervisory target is breached next quarter and the $100\%$ minimum within seven quarters, so the projection belongs in front of the board now.
> > - The diagnosis is whether [[Capital Available]] is falling (underwriting losses, reserve strengthening, dividends, unrealised investment losses through [[Comprehensive Income|OCI]]) or minimum capital required is rising (growth, a shift into riskier lines, more [[Concentration Risk|catastrophe]] exposure). Growth consuming capital is a different problem from losses destroying it.
> > - A trend threatening the supervisory target engages the [[Duty to Report]] under the [[Insurance Companies Act]] if management does not act. The [[FCT]] report must model whether adverse scenarios breach the minimum, and OSFI will require a capital restoration plan and will likely restrict dividends.
