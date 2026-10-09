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
  content_hash: sha256:41a1232cdc76b1420d0f59cacfef5063faa68bea9f15450291360622be7a908f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Regulatory Capital.md
---
**Regulatory capital** is the capital a supervisor requires an insurer to hold, measured by a prescribed formula, together with the capital the supervisor will count against that requirement. The two are compared as a ratio, and falling below set levels of the ratio triggers supervisory action. The main frameworks are the NAIC's [[Risk-Based Capital|risk-based capital]] in the U.S., Canada's LICAT for life insurers and [[MCT]] for P&C insurers, the EU's [[Solvency II]], and the IAIS's Insurance Capital Standard (ICS) for international groups.

> $$\text{Capital ratio} = \frac{\text{Available capital}}{\text{Required capital}}$$

> $$\text{RBC}_{\text{life}} = C_0 + C_{4a} + \sqrt{Q}$$

> $$Q = (C_{1o} + C_{3a})^2 + (C_{1cs} + C_{3c})^2 + C_2^2 + C_{3b}^2 + C_{4b}^2$$

- **Symbols:** Available capital is what the framework counts as able to absorb losses, and required capital is the formula's amount. In the U.S. life formula, $C_0$ is affiliate risk and $C_1$ is asset risk, split into $C_{1o}$ for bonds and other assets and $C_{1cs}$ for unaffiliated common stock. $C_2$ is insurance risk, $C_3$ is interest rate ($C_{3a}$), health credit ($C_{3b}$) and market ($C_{3c}$) risk, and $C_4$ is business risk, with $C_{4b}$ for health administrative expenses.
- **The two halves:** Available capital starts from the balance sheet and removes what would not absorb a loss, such as goodwill. The U.S. calls it total adjusted capital (TAC), the MCT [[Capital Available|capital available]] and Solvency II own funds. Required capital is built from charges for each risk, usually factors applied to assets, liabilities and premiums, or the result of a stress at a stated confidence level.
- **Aggregation:** Most formulas add some charges in full and combine the rest by a square root, which assumes the main risks are independent or correlated by a set matrix. The square root is a [[Diversification Credit|diversification credit]]: reducing one large charge lowers the total by less, because the others still dominate. See [[Risk Diversification]].
- **U.S. RBC:** The NAIC has separate formulas for life, P&C and health insurers. The ratio is TAC divided by the authorized control level (ACL), which is half the formula's result. Action levels fall at ratios of 200% (company action), 150% (regulatory action), 100% (authorized control) and 70% (mandatory control), with a trend test just above 200%.
- **Canada:** OSFI's LICAT compares available capital, plus a surplus allowance and eligible deposits, with a base solvency buffer of risk charges, credits and a 1.05 scalar. It sets supervisory target ratios for total and core capital. The P&C test is the [[MCT]], whose [[Base Solvency Buffer|base solvency buffer]] is 1.5 times [[Capital Required|capital required]] against a [[Supervisory Target Capital Ratio|supervisory target]] of 150%.
- **Solvency II and the ICS:** Solvency II's solvency capital requirement is calibrated to a one-year 99.5% value at risk on a market-consistent balance sheet, and an approved internal model may replace the standard formula. The ICS applies the same kind of calibration to internationally active insurance groups, on a market-adjusted valuation.
- **Regulatory against economic capital:** The formula is the supervisor's floor, set for every insurer alike. [[Economic Capital|Economic capital]] is the insurer's own estimate, and through the [[ORSA]] the insurer sets an [[Internal Target Capital Ratio|internal target]] above the regulatory one. CFE-101 compares these with accounting measures, [[Embedded Value|embedded value]] and EVA as measures for decisions.
- **Managing the ratio:** An insurer raises the ratio by adding capital, retaining earnings or cutting dividends, or lowers the requirement through [[Reinsurance|reinsurance]], a safer asset mix or a change of business mix. Each lever has a cost, such as ceded margin, lower investment return or forgone growth, so capital management weighs the ratio against return.

> [!example]- A Life Insurer's RBC Ratio and a Quota Share {Example}
> A U.S. life insurer's RBC components, in \$ millions and illustrative, are $C_0 = 10$, $C_{1o} = 120$, $C_{1cs} = 40$, $C_2 = 90$, $C_{3a} = 60$, $C_{3b} = 5$, $C_{4a} = 25$, with $C_{3c} = C_{4b} = 0$. Its TAC is \$230 million.
>
> (a) Find the RBC ratio and the action level.
>
> (b) A quota share cedes half the mortality risk, which halves $C_2$. Ignoring its effect on TAC and on other charges, find the new ratio.
>
> > [!answer]-
> > **(a)** The interest rate charge combines with the asset charge before squaring.
> > $$
> > \begin{align*}
> > Q &= 180^2 + 40^2 + 90^2 + 5^2 \\
> > &= 42{,}125 \\
> > \text{RBC} &= 10 + 25 + \sqrt{42{,}125} \\
> > &= 35 + 205.24 \\
> > &= 240.24 \\
> > \text{ACL} &= 0.5 \times 240.24 \\
> > &= 120.12 \\
> > \text{Ratio} &= 230 / 120.12 \\
> > &= 191.5\%
> > \end{align*}
> > $$
> > The ratio is between 150% and 200%, which is the company action level. The insurer must file a plan to restore its capital.
> >
> > **(b)** With $C_2 = 45$:
> > $$
> > \begin{align*}
> > Q &= 180^2 + 40^2 + 45^2 + 5^2 \\
> > &= 36{,}050 \\
> > \text{RBC} &= 35 + \sqrt{36{,}050} \\
> > &= 35 + 189.87 \\
> > &= 224.87 \\
> > \text{ACL} &= 0.5 \times 224.87 \\
> > &= 112.43 \\
> > \text{Ratio} &= 230 / 112.43 \\
> > &= 204.6\%
> > \end{align*}
> > $$
> > Halving a \$90 million charge cut the RBC by only \$15.4 million, because the square root lets the larger asset and interest rate charges dominate. The reinsurance lifts the ratio above 200%, but the margin ceded and the reinsurer's credit risk are costs the insurer has to weigh against it.

> [!tip]- How it appears on the exam
> - **ILA-201I:** Candidates explain and calculate regulatory capital under international frameworks, such as LICAT, Solvency II and the ICS, and compare their valuation bases, calibrations and ratios.
> - **ILA-201U:** Candidates explain and calculate required capital under the U.S. framework, which is the life RBC formula and its action levels, and apply the methods of financial capital management.
> - **GH-201U:** Candidates evaluate a health insurer's capital needs using RBC, and the use of reinsurance to reduce capital strain, as in the example.
> - **CP-321:** Required capital is one of the projections, alongside premiums, claims, expenses and liabilities, that the manual rate objective asks candidates to evaluate.
> - **CFE-101:** Candidates compare regulatory capital requirements with economic capital, embedded value, EVA and accounting measures as inputs to decisions.

> [!warning]- Exam traps
> - **ACL, not the formula total:** The U.S. ratio divides TAC by the authorized control level, which is half the post-covariance RBC. Dividing by the full RBC halves the ratio and puts the insurer two action levels too low.
> - **Combining before squaring:** In the life formula, $C_{1o}$ and $C_{3a}$ are added before squaring, because asset and interest rate risk are treated as moving together. Squaring them separately understates the requirement.
> - **Proportional thinking:** Under a square-root aggregation, halving one charge doesn't halve its effect on the total. The saving depends on how large that charge is relative to the others.
> - **Mixing frameworks' ratios:** A 150% MCT ratio, a 200% RBC ratio and a 100% LICAT total ratio are each set against a different denominator. Comparing the percentages across frameworks says nothing about which insurer holds more capital.
