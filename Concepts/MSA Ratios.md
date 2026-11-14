---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:b449d3be623cd0c1bc90d9add153837b1ef930d88755df481f6dcf77ac68eecf
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/MSA Ratios.md
---

![[Media/Figures/MSA_Ratios.svg|340]]

**MSA Ratios** are the standardised financial ratios computed from Canadian P&C insurers' regulatory filings and published by MSA Research. Every insurer files the same [[Canadian Annual Return]] on the same instructions, so the ratios are comparable across companies.

The central profitability ratio, the combined ratio, is

> $$\text{Combined ratio} = \frac{\text{Claims incurred} + \text{Expenses}}{\text{Earned premium}}$$

A combined ratio below $100\%$ is an underwriting profit.

The ratios fall into four groups:

| Group | Ratios |
| :--- | :--- |
| Profitability | Loss ratio, expense ratio, combined ratio, return on equity, investment yield, operating ratio |
| Leverage | Premium to surplus, reserves to surplus |
| Reserve adequacy | One-year and two-year development on prior-year reserves, as a percentage of opening surplus |
| Capital and liquidity | The [[MCT]] ratio and its trend, liquid assets to liabilities, change in net written premium |

The operating ratio nets investment income against the combined ratio. Premium to surplus measures how much business each dollar of capital supports. Reserves to surplus measures how exposed surplus is to a reserve error. The development ratios most directly signal a reserving problem and are the analogue of the US Schedule P development measures. Rapid growth in net written premium is a standard precursor of failure.

> [!example]- An insurer's reserves are $3$ times its surplus. What share of surplus does a $10\%$ reserve deficiency consume? {Example}
> - The deficiency is $10\%$ of reserves, which is $0.10 \times 3 = 0.30$ times surplus.
> - It consumes $30\%$ of surplus.

## Reading the ratios together

No single ratio diagnoses anything. The combination that signals distress is the one [[PACICC]]'s failure research identifies: rapid premium growth, high premium-to-surplus leverage, adverse development and a falling MCT ratio appearing together.

> [!example]- What do these ratios say about this insurer? {Example}
> | Ratio | Insurer | Industry |
> | :--- | ---: | ---: |
> | Combined ratio | $103\%$ | $96\%$ |
> | Premium to surplus | $2.8$ | $1.4$ |
> | Reserves to surplus | $3.4$ | $1.9$ |
> | One-year development | $+7\%$ of surplus | $-1\%$ |
> | Growth in net written premium | $+31\%$ | $+5\%$ |
> | MCT ratio | $154\%$ | $221\%$ |
>
> > [!answer]-
> > - Growth of $31\%$ against the industry's $5\%$ suggests business won on price rather than selection.
> > - The combined ratio of $103\%$ confirms the business is written at an underwriting loss.
> > - Premium to surplus of $2.8$, double the industry's, means the same loss ratio hurts twice as much.
> > - Reserves at $3.4$ times surplus mean a $10\%$ reserve deficiency wipes out $34\%$ of surplus.
> > - Adverse development of $7\%$ of surplus shows the reserve error is already occurring.
> > - The MCT ratio of $154\%$ is near the supervisory target. Continued growth raises minimum capital required while losses reduce [[Capital Available|capital available]].
> > - Together these are the pre-failure profile PACICC's research describes. [[OSFI]] would be expected to escalate, require a capital plan and restrict growth, and the [[Appointed Actuary|appointed actuary]]'s [[FCT]] would test whether the minimum is breached under adverse scenarios.

## Ratios after IFRS 17

[[Insurance Revenue|Insurance revenue]] is not earned premium, and [[Insurance Service Expenses|insurance service expenses]] exclude discount unwind. Ratios computed after the transition to [[IFRS 17]] are therefore not directly comparable with earlier ones, and a ratio series spanning 2023 must be read with that break in mind.
