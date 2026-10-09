---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:c2b1b9eba6295ca6506f461b75c9c6a59a6d2fbcaf71ac425c49f16e03c2fcf4
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, preamble (ICA ss. 515(1), 608(1)); §1.1.1, §1.1.2 (target-level requirements less diversification credit, divided by 1.5; MCT ratio = capital available / minimum capital required); §1.2.1 (100% minimum, 150% supervisory target, internal target); §4.2.1, §4.3.3.2, sha256:34c28477cae162661beec2d0b80b23314746df6b488fe6b959fe0606177fc60e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI, Life Insurance Capital Adequacy Test (2025), Chapter 1, §1.1.1 (Total Ratio formula), §1.1.5 (Base Solvency Buffer, CTE 99% target level, scalar 1.0), §1.2 (90% minimum, 100% supervisory target Total Ratio), sha256:1ef353a982c35e3129b6d39fd7d2fcc445a97cf408970ff1cf8f4feb86051cec — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/life-insurance-capital-adequacy-test-2025-chapter-1-overview-general-requirements"
    - "OSFI, MCT Minimum Capital Test - 2024 PC4 Quarterly Return (workbook), document title; line 'Minimum Capital (Margin) Required (line 115 / 1.5)', sha256:110223b6b834ae5c488e79405c00d2076f4a8a86542d0505cb6a6c516658167c — https://www.osfi-bsif.gc.ca/sites/default/files/documents/mct24-rtrn_english-french-en.xlsx"
    - "OSFI Guideline E-19, Own Risk and Solvency Assessment (2017), PDF p.7 (forward-looking, consistent with strategic and business planning, planning horizon), sha256:394df077823ea98813707cbe29527fcca2dbfdd1b76278c094aacd41e04b446e — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_ORSA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Base Solvency Buffer.md
---

**The Base Solvency Buffer** (BSB) is the denominator of the capital ratios in OSFI's **Life Insurance Capital Adequacy Test** (LICAT), the capital guideline for life insurers. It is **not a term of the [[MCT]]**. For the P&C insurers the MCT covers, the ratio's denominator is **minimum capital required**: [[Capital Required]] at the target level, **divided by $1.5$**. An insurer meets the minimum standard when [[Capital Available]] equals minimum capital required, an MCT ratio of $100\%$.

> $$\text{Minimum Capital Required} = \frac{\text{Capital Required}}{1.5} \qquad \text{MCT Ratio} = \frac{\text{Capital Available}}{\text{Minimum Capital Required}}$$

- **Why divide by $1.5$.** The MCT sets its capital requirements directly at a target confidence level: $99\%$ of the expected shortfall (CTE $99\%$) over a one-year horizon, including a terminal provision. Those target-level requirements, less the [[Diversification Credit]], are then divided by $1.5$ to give the minimum. Capital required is the target; the minimum is two-thirds of it.
- **The thresholds are fractions of the target.** At the $100\%$ minimum an insurer holds $1/1.5 \approx 0.67$ times capital required. At the $150\%$ [[Supervisory Target Capital Ratio|supervisory target]] it holds exactly capital required, the CTE $99\%$ level. At a $200\%$ [[Internal Target Capital Ratio|internal target]], $2/1.5 \approx 1.33$ times.
- **Every change in the risk profile moves it.** Capital required is built from risk factors applied to the insurer's net claim liabilities and unexpired coverage, its invested assets and its other exposures. Growth, a riskier investment mix or less reinsurance all raise capital required, and therefore minimum capital required, and lower the ratio without any loss occurring.
- **Reading a falling ratio requires decomposing it.** A ratio can fall because capital available fell (losses, dividends, market movements) or because minimum capital required rose (growth, risk mix, less reinsurance). The remedies differ entirely, so the decomposition is the first analytical step.
- Minimum capital required is reported every quarter in the [[Quarterly Return]] (OSFI's PC4 return, where it is total capital required divided by $1.5$), so the trend can be followed rather than a single annual snapshot.
- **In LICAT,** the Base Solvency Buffer is the sum of the aggregate capital requirements net of credits for each geographic region, multiplied by a scalar of $1.0$ (the 2025 guideline). Like the MCT's, its requirements are set at a target level aimed at CTE $99\%$ over one year including a terminal provision. The Total Ratio divides Available Capital, the Surplus Allowance and Eligible Deposits by the Base Solvency Buffer; the supervisory target Total Ratio is $100\%$ and the minimum $90\%$.

> [!example]- Decomposing a Ratio Decline {Example}
> An insurer's MCT ratio fell from $188\%$ to $161\%$ over a year. Capital available went from $\$282$ million to $\$276$ million.
>
> Determine what drove the decline.
>
> > [!answer]-
> > **Back out minimum capital required (MCR) in each year:**
> >
> > $$\begin{align*}
> > \text{MCR}_{\text{open}} &= \frac{\$282\text{M}}{1.88} = \$150.0\text{M} \\[6pt]
> > \text{MCR}_{\text{close}} &= \frac{\$276\text{M}}{1.61} = \$171.4\text{M}
> > \end{align*}$$
> >
> > Capital required at the target level is $1.5$ times these: $\$225.0$M opening and $\$257.1$M closing.
> >
> > **Attribute the $27$-point fall.** Holding minimum capital required at its opening level, the capital decline alone would give:
> >
> > $$\frac{\$276\text{M}}{\$150.0\text{M}} = 184\%$$
> >
> > So capital available explains $4$ points, and the rise in minimum capital required explains the remaining $23$.
> >
> > **Minimum capital required rose $14\%$**, so capital required rose $14\%$: from growth, a change in business or asset mix, or less reinsurance. **This is a growth or risk-profile story, not a loss story.**
> >
> > **Why that matters for the response.** Had the decline been driven by losses, the remedies would be pricing, reserving and expense action. Because it is driven by capital required, the effective remedies are different: moderate growth, buy more reinsurance (with attention to [[Registered Reinsurance|registration]] or acceptable collateral, so the credit is actually granted), de-risk the investment portfolio, or raise capital to fund the expansion.
> >
> > **The question to ask management** is whether the growth was planned and funded. OSFI expects an insurer's [[ORSA]] to be forward-looking, consistent with its strategic and business planning, and to contemplate the potential adverse capital impacts over its planning horizon.
