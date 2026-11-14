---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:30c9f821a9546b127ddaf41766e83ada0a47ae06d5fe908cb8d74b57846ecb76
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Solvency II.md
---

![[Media/Figures/Solvency_II.svg|340]]

**Solvency II** is the European Union's risk-based solvency regime for insurers, in force since 2016. It is more explicitly principles-based than the Canadian framework, uses a market-consistent balance sheet, and permits approved **internal models** in place of the standard formula.

An insurer's Solvency II ratio is

> $$\text{Solvency ratio} = \frac{\text{Own funds}}{\text{SCR}}$$

- $\text{Own funds}$ is the insurer's capital, measured on the market-consistent balance sheet.
- $\text{SCR}$ is the **Solvency Capital Requirement**.

## The three pillars

Solvency II is built on three pillars:

1. **Pillar 1**, quantitative requirements: technical provisions, the Solvency Capital Requirement and the Minimum Capital Requirement.
2. **Pillar 2**, governance and supervisory review, including the [[ORSA]], which Canada adopted.
3. **Pillar 3**, disclosure and reporting.

## Capital requirements

The SCR is calibrated to a $99.5\%$ VaR over one year. It is the capital needed so that the probability of ruin in a year is $0.5\%$. The **Minimum Capital Requirement** (MCR) is a lower floor, and its breach triggers the most severe intervention.

The [[MCT]] states its calibration on a different measure. Its capital requirements are set at a target level of $99\%$ of the expected shortfall (CTE $99\%$) over one year, including a terminal provision, and then divided by $1.5$ to give minimum capital required.

## Technical provisions

Technical provisions are a **best estimate plus a risk margin**. The risk margin is computed by a prescribed **cost of capital** method at a specified rate. [[IFRS 17]]'s [[Risk Adjustment for Non-Financial Risk|risk adjustment]], by contrast, is entity-specific, with a disclosed confidence level and no prescribed method.

## Internal models

Internal models may replace the standard formula for all or part of the SCR, subject to supervisory approval and stringent use, validation and documentation tests. Canada's MCT does not permit a general internal model for P&C insurers, which is the largest structural difference between the regimes.

## Comparison with the MCT

Both regimes are risk-based, three-pillar frameworks with an ORSA and public disclosure. They differ as follows:

| | Solvency II | MCT |
| :--- | :--- | :--- |
| Measurement | Market-consistent throughout | Factor-based |
| Calibration | $99.5\%$ one-year VaR | CTE $99\%$ at the target level, divided by $1.5$ |
| Internal models | Permitted | Not permitted |
| Supervision | National supervisors coordinated by EIOPA | Federal-provincial split ([[Federal-Provincial Jurisdiction]]) |

Both descend from the same international work, the IAIS Insurance Core Principles and the emerging global capital standard.

> [!example]- Which regulator is tougher, given an MCT ratio of $195\%$ and a Solvency II ratio of $148\%$ for the same insurer? {Example}
> - The denominators measure different things. The SCR is a $99.5\%$ one-year VaR, and the MCT's minimum capital required is [[Capital Required]] at CTE $99\%$ divided by $1.5$.
> - A $148\%$ Solvency II ratio means own funds are $1.48$ times a $99.5\%$ VaR.
> - A $195\%$ MCT ratio means capital available is $1.95 / 1.5 = 1.3$ times capital required at CTE $99\%$.
> - The numerators differ too. Own funds are measured on a market-consistent balance sheet with a prescribed cost-of-capital risk margin, and [[Capital Available]] starts from IFRS equity with regulatory deductions.
> - Each ratio can be read only against its own regime's thresholds and against peers in that jurisdiction. $195\%$ is comfortable against a $150\%$ supervisory target, and $148\%$ is adequate against the $100\%$ SCR requirement, with less headroom than the Canadian figure suggests.
> - The two ratios are not evidence about which regulator is tougher.

> [!trap] Comparing the two ratios directly
> A Solvency II ratio and an MCT ratio have different numerators and denominators, so a higher MCT ratio does not mean more capital. Compare each against its own regime's thresholds.
