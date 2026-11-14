---
aliases:
  - Required Capital
  - Capital Requirement
  - Capital Need
  - Financial Capital
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e846876599e0cdf4e57cf1ac0cd57c995bd4f966969e5fc6ea2e07f752c50df7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Regulatory Capital.md
---

**Regulatory Capital** is the capital a supervisor requires an insurer to hold, measured by a prescribed formula, together with the capital the supervisor will count against that requirement. The main frameworks are the NAIC's [[Risk-Based Capital|risk-based capital]] in the U.S., Canada's LICAT for life insurers and [[MCT]] for P&C insurers, the EU's [[Solvency II]], and the IAIS's Insurance Capital Standard (ICS) for international groups.

The two are compared as a ratio, which is

> $$\text{Capital ratio} = \frac{\text{Available capital}}{\text{Required capital}}$$

- Available capital is what the framework counts as able to absorb losses.
- Required capital is the formula's amount.

Falling below set levels of the ratio triggers supervisory action. Each framework sets its ratio against a different denominator, so a 150% MCT ratio and a 200% RBC ratio say nothing about which insurer holds more capital.

## Available and required capital

Available capital starts from the balance sheet and removes what would not absorb a loss, such as goodwill. The U.S. calls it total adjusted capital (TAC), the MCT [[Capital Available|capital available]] and Solvency II own funds. Required capital is built from charges for each risk, usually factors applied to assets, liabilities and premiums, or the result of a stress at a stated confidence level.

## Aggregation of risk charges

Most formulas add some charges in full and combine the rest by a square root, which assumes the main risks are independent or correlated by a set matrix. The square root is a [[Diversification Credit|diversification credit]]. Reducing one large charge lowers the total by less than the reduction, because the others still dominate. Under a square-root aggregation, the saving from cutting one charge depends on how large that charge is relative to the others. See [[Risk Diversification|risk diversification]].

## U.S. risk-based capital

The NAIC has separate formulas for life, P&C and health insurers. The life formula is

> $$\text{RBC}_{\text{life}} = C_0 + C_{4a} + \sqrt{Q}$$

- $C_0$ is affiliate risk.
- $C_{4a}$ is business risk.

The term under the square root is

> $$Q = (C_{1o} + C_{3a})^2 + (C_{1cs} + C_{3c})^2 + C_2^2 + C_{3b}^2 + C_{4b}^2$$

- $C_{1o}$ is asset risk for bonds and other assets, and $C_{1cs}$ is asset risk for unaffiliated common stock.
- $C_2$ is insurance risk.
- $C_{3a}$, $C_{3b}$ and $C_{3c}$ are interest rate, health credit and market risk.
- $C_{4b}$ is business risk for health administrative expenses.

$C_{1o}$ and $C_{3a}$ are added before squaring, because asset and interest rate risk are treated as moving together. Squaring them separately understates the requirement.

The RBC ratio is TAC divided by the authorized control level (ACL), which is half the formula's result. Action levels fall at ratios of 200% (company action), 150% (regulatory action), 100% (authorized control) and 70% (mandatory control), with a trend test just above 200%.

> [!example]- What is this life insurer's RBC ratio, and what does a quota share ceding half its mortality risk do to it? {Example}
> A U.S. life insurer's TAC is $\$230$ million. Its RBC components, in $\$$ millions and illustrative, are:
>
> | $C_0$ | $C_{1o}$ | $C_{1cs}$ | $C_2$ | $C_{3a}$ | $C_{3b}$ | $C_{4a}$ |
> | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
> | 10 | 120 | 40 | 90 | 60 | 5 | 25 |
>
> $C_{3c}$ and $C_{4b}$ are zero. The quota share halves $C_2$. Ignore its effect on TAC and on other charges.
>
> > [!answer]-
> > - The interest rate charge combines with the asset charge before squaring, so $Q = 180^2 + 40^2 + 90^2 + 5^2 = 42{,}125$.
> > - The RBC is $10 + 25 + \sqrt{42{,}125} = 35 + 205.24 = 240.24$.
> > - The ACL is $0.5 \times 240.24 = 120.12$, and the ratio is $230/120.12 = 191.5\%$.
> > - The ratio is between 150% and 200%, the company action level, so the insurer must file a plan to restore its capital.
> > - With $C_2 = 45$, $Q = 180^2 + 40^2 + 45^2 + 5^2 = 36{,}050$ and the RBC is $35 + 189.87 = 224.87$.
> > - The ACL is $112.43$, and the ratio rises to $230/112.43 = 204.6\%$.
> > - Halving a $\$90$ million charge cut the RBC by only $\$15.4$ million, because the larger asset and interest rate charges dominate. The margin ceded and the reinsurer's credit risk are costs to weigh against the higher ratio.

## Canada

OSFI's LICAT compares available capital, plus a surplus allowance and eligible deposits, with a base solvency buffer of risk charges, credits and a 1.05 scalar. It sets supervisory target ratios for total and core capital. The P&C test is the [[MCT]], whose [[Base Solvency Buffer|base solvency buffer]] is 1.5 times [[Capital Required|capital required]], against a [[Supervisory Target Capital Ratio|supervisory target]] of 150%.

## Solvency II and the ICS

Solvency II's solvency capital requirement is calibrated to a one-year 99.5% value at risk on a market-consistent balance sheet, and an approved internal model may replace the standard formula. The ICS applies the same kind of calibration to internationally active insurance groups, on a market-adjusted valuation.

## Regulatory and economic capital

The formula is the supervisor's floor, set for every insurer alike. [[Economic Capital|Economic capital]] is the insurer's own estimate, and through the [[ORSA]] the insurer sets an [[Internal Target Capital Ratio|internal target]] above the regulatory one. Both are compared with accounting measures, [[Embedded Value|embedded value]] and EVA as measures for decisions.

## Managing the capital ratio

An insurer raises the ratio by adding capital, retaining earnings or cutting dividends. It lowers the requirement through [[Reinsurance|reinsurance]], a safer asset mix or a change of business mix. Each lever has a cost, such as ceded margin, lower investment return or forgone growth, so capital management weighs the ratio against return.

> [!trap] Dividing by the full RBC instead of the ACL
> The U.S. ratio divides TAC by the authorized control level, which is half the post-covariance RBC. Dividing by the full RBC halves the ratio and puts the insurer two action levels too low.
