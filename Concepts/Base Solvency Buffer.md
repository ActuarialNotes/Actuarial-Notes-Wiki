---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:fe6ea4a4c335587c59bef36fd176b801ab28cc863685628f4accf5e32aa77974
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, preamble (ICA ss. 515(1), 608(1)); §1.1.1, §1.1.2 (target-level requirements less diversification credit, divided by 1.5; MCT ratio = capital available / minimum capital required); §1.2.1 (100% minimum, 150% supervisory target, internal target); §4.2.1, §4.3.3.2, sha256:34c28477cae162661beec2d0b80b23314746df6b488fe6b959fe0606177fc60e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI, Life Insurance Capital Adequacy Test (2025), Chapter 1, §1.1.1 (Total Ratio formula), §1.1.5 (Base Solvency Buffer, CTE 99% target level, scalar 1.0), §1.2 (90% minimum, 100% supervisory target Total Ratio), sha256:1ef353a982c35e3129b6d39fd7d2fcc445a97cf408970ff1cf8f4feb86051cec — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/life-insurance-capital-adequacy-test-2025-chapter-1-overview-general-requirements"
    - "OSFI, MCT Minimum Capital Test - 2024 PC4 Quarterly Return (workbook), document title; line 'Minimum Capital (Margin) Required (line 115 / 1.5)', sha256:110223b6b834ae5c488e79405c00d2076f4a8a86542d0505cb6a6c516658167c — https://www.osfi-bsif.gc.ca/sites/default/files/documents/mct24-rtrn_english-french-en.xlsx"
    - "OSFI Guideline E-19, Own Risk and Solvency Assessment (2017), PDF p.7 (forward-looking, consistent with strategic and business planning, planning horizon), sha256:394df077823ea98813707cbe29527fcca2dbfdd1b76278c094aacd41e04b446e — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_ORSA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Base Solvency Buffer.md
---

![[Media/Figures/Base_Solvency_Buffer.svg|340]]

The **Base Solvency Buffer** (BSB) is the denominator of the capital ratios in OSFI's Life Insurance Capital Adequacy Test (LICAT), the capital guideline for life insurers. It is not a term of the [[MCT]], the test for P&C insurers.

In the 2025 LICAT guideline, the Base Solvency Buffer is

> $$\text{BSB} = 1.0 \times \sum_{\text{regions}} \bigl(\text{capital requirements} - \text{credits}\bigr)$$

- The sum runs over the aggregate capital requirements, net of credits, for each geographic region.
- $1.0$ is the scalar.

The requirements are set at a target level aimed at $99\%$ of the expected shortfall (CTE $99\%$) over one year, including a terminal provision.

LICAT's Total Ratio is

> $$\text{Total Ratio} = \frac{\text{AC} + \text{SA} + \text{ED}}{\text{BSB}}$$

- $\text{AC}$ is Available Capital.
- $\text{SA}$ is the Surplus Allowance.
- $\text{ED}$ is Eligible Deposits.

The supervisory target Total Ratio is $100\%$ and the minimum is $90\%$.

## Minimum capital required in the MCT

The MCT also sets its capital requirements directly at the CTE $99\%$ target level over one year, including a terminal provision. Its ratio's denominator is not that target but **minimum capital required**, which is

> $$\text{MCR} = \frac{\text{Capital Required}}{1.5}$$

- $\text{Capital Required}$ is the [[Capital Required|capital required]] at the target level, less the [[Diversification Credit|diversification credit]].

The MCT ratio is

> $$\text{MCT Ratio} = \frac{\text{Capital Available}}{\text{MCR}}$$

- $\text{Capital Available}$ is the insurer's [[Capital Available|capital available]].

An insurer meets the minimum standard at an MCT ratio of $100\%$. OSFI's [[Supervisory Target Capital Ratio|supervisory target]] is $150\%$. Each threshold, including an [[Internal Target Capital Ratio|internal target]] of $200\%$, is a multiple of the target level:

| MCT ratio | Capital available as a multiple of capital required |
| :--- | :--- |
| $100\%$ minimum | $1/1.5 \approx 0.67$ |
| $150\%$ supervisory target | $1.00$, the CTE $99\%$ level |
| $200\%$ internal target | $2/1.5 \approx 1.33$ |

Minimum capital required is reported every quarter in the [[Quarterly Return|quarterly return]] (OSFI's PC4 return, where it is total capital required divided by $1.5$), so its trend can be followed between annual filings.

## Analysing a change in the MCT ratio

Capital required is built from risk factors applied to the insurer's net claim liabilities and unexpired coverage, its invested assets and its other exposures. Growth, a riskier investment mix or less reinsurance raise capital required, and with it minimum capital required, and lower the ratio without any loss occurring.

A ratio can therefore fall because capital available fell (losses, dividends, market movements) or because minimum capital required rose (growth, risk mix, less reinsurance). The remedies differ, so splitting the change between the two is the first step.

> [!example]- What drove the decline in this insurer's MCT ratio? {Example}
> An insurer's MCT ratio fell from $188\%$ to $161\%$ over a year. Capital available went from $\$282$ million to $\$276$ million.
>
> > [!answer]-
> > - Minimum capital required at the start of the year was $\$282\text{M} / 1.88 = \$150.0\text{M}$.
> > - At the end of the year it was $\$276\text{M} / 1.61 = \$171.4\text{M}$, a rise of $14\%$.
> > - With minimum capital required held at $\$150.0\text{M}$, the fall in capital alone would give $\$276\text{M} / \$150.0\text{M} = 184\%$.
> > - The fall in capital available explains $4$ of the $27$ points, and the rise in minimum capital required explains the other $23$.
> > - The decline comes from growth or a change in risk profile, not from losses. The remedies are to moderate growth, buy more reinsurance (with [[Registered Reinsurance|registration]] or acceptable collateral, so the credit is granted), de-risk the investment portfolio or raise capital.
> > - OSFI expects the insurer's [[ORSA]] to be forward-looking, consistent with its strategic and business planning, so the question for management is whether the growth was planned and funded.

> [!trap] Using capital required as the MCT denominator
> Dividing capital available by the target-level requirement, the way LICAT divides by its Base Solvency Buffer, understates the MCT ratio by a third. Capital available of $240$ against capital required of $270$ is an MCT ratio of $240 / (270/1.5) = 133\%$, not $89\%$.
