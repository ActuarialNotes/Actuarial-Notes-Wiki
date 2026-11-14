---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:23373aea56c5f6c83e0728b9c263909dbeff178b2be4e6d46959e984b55d32f0
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stress Testing.md
---
![[Media/Figures/Stress_Testing.svg|340]]

**Stress Testing** is the examination of an insurer's financial position under severe but plausible adverse conditions. It is the general technique underlying the [[FCT]] and the [[ORSA]], and [[OSFI]] expects it to be embedded in risk management rather than performed once a year for a report.

There are three types of stress test:

1. **Sensitivity test**: one variable is moved and the effect observed, such as a $100$ basis point rate change or a $10\%$ reserve deterioration. It identifies which assumptions matter.
2. **Scenario test**: a coherent set of variables is moved together in a way that could actually happen, such as a recession raising claim frequency and fraud while depressing asset values and premium volume. Scenarios are harder to build and more informative, because real adversity is correlated.
3. **[[Reverse Stress Testing|Reverse stress test]]**: the test starts from failure and works backwards to what would have to happen for the insurer to become non-viable. It surfaces vulnerabilities that forward scenarios, anchored on the risks management already worries about, miss.

> [!example]- An insurer wants to understand its exposure to an economic downturn. What would one test of each type be, and what would each reveal? {Example}
> - **Sensitivity test**: equity values fall $25\%$, all else held constant. Capital available falls by $25\%$ of the equity holding, after tax, and the MCT ratio falls with it. This shows how much of the capital ratio depends on equity values, and nothing about the rest of a downturn.
> - **Scenario test**: a two-year recession in which equities fall $25\%$, credit spreads widen and one bond holding defaults, commercial claim frequency rises $6\%$, personal auto fraud indicators rise, premium volume falls $8\%$, and reserve development turns adverse. Each element alone is survivable, but together they reduce capital available and raise minimum capital required at the same time. This tests the [[Diversification Credit|diversification credit]] assumption.
> - **Reverse stress test**: the question is what would take the MCT ratio below $100\%$. Suppose the answer is a $1$-in-$250$ catastrophe combined with the failure of the insurer's largest reinsurer. The failure mode is reinsurer concentration, which forward scenarios built around market and underwriting risk would not have found.
> - The three are complements. Sensitivities size individual exposures, scenarios test correlation, and the reverse test finds the vulnerability management has not considered.

## Calibrating severity

Severity calibration is the hard judgement. A test that is too mild reveals nothing, and one that is too extreme is dismissed as implausible. The standard is severe but plausible, and the calibration should be documented, usually by reference to historical events, industry experience or a stated return period.

## Ripple effects and management actions

A stress test models both the scenario's second-order consequences, its [[Ripple Effect|ripple effects]], and the realistic management actions available in response.

> [!trap] Assuming capital can be raised in the stress
> A management action must be available in the scenario being tested. Assuming the insurer can raise capital in the middle of the scenario that caused the problem makes the stress test useless.

## Using the results

A stress test that produces a report and no change to limits, reinsurance, capital targets or the business plan has not been used. OSFI's supervisory reviews look for the link between test results and action.
