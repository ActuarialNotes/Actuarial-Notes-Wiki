---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8be7f9d64a76a71cf6dd47992dedc84542e6a82b5b08bd6a16d197fbaaaef3f2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/FCT.md
---
![[Media/Figures/FCT.svg|340]]

**Financial Condition Testing (FCT)** is the [[Appointed Actuary]]'s annual examination of an insurer's financial condition under a base scenario and a range of plausible adverse scenarios, reported to the board and available to [[OSFI]]. It replaced Dynamic Capital Adequacy Testing (DCAT) in 2020 and broadened it, adding explicit solvency scenarios and [[Reverse Stress Testing|reverse stress testing]].

The actuary opines that the insurer's financial condition is **satisfactory** if, over the forecast period, it meets both tests:

1. Under the base scenario, it meets the [[Supervisory Target Capital Ratio|supervisory target]].
2. Under every adverse scenario examined, it meets the minimum capital requirement.

Failing either, the financial condition is not satisfactory and the report must say so.

> [!example]- Is this insurer's financial condition satisfactory? {Example}
> The supervisory target is $150\%$ and the minimum is $100\%$. The insurer's forecast MCT ratios over the three-year forecast period are:
>
> | Scenario | Year 1 | Year 2 | Year 3 |
> | :--- | ---: | ---: | ---: |
> | Base | 178% | 172% | 169% |
> | Adverse 1: catastrophe | 178% | 118% | 124% |
> | Adverse 2: reserve deterioration and rate suppression | 178% | 141% | 96% |
> | Adverse 3: equity market decline | 178% | 147% | 151% |
>
> > [!answer]-
> > - The base scenario passes, because every year exceeds the $150\%$ supervisory target. Its downward trend deserves comment in its own right.
> > - Adverse 1 and Adverse 3 pass, because both stay above the $100\%$ minimum. Falling below the target in an adverse scenario is what the buffer between $150\%$ and $100\%$ is for.
> > - Adverse 2 reaches $96\%$ in year 3, below the minimum, so it fails.
> > - The financial condition is **not satisfactory**, and the report sets out the scenario's drivers, the corrective actions that would restore the position and what they cost, and how the scenario's severity was calibrated.
> > - If management does not act on a projected breach of the minimum, the [[Duty to Report]] under the [[Insurance Companies Act]] applies: to the directors, and if necessary to OSFI.

## Going-concern and solvency scenarios

Going-concern scenarios test whether the insurer can continue operating. Solvency scenarios test whether it can meet its obligations even if it must wind up. The solvency scenarios are the addition FCT made to DCAT, and they ask whether policyholders will be paid.

## Risk categories

The actuary considers these risk categories and selects the scenarios that most threaten this insurer:

1. Insurance risk (frequency and severity).
2. Pricing.
3. Misestimation of [[Insurance Contract Liabilities|policy liabilities]].
4. Deterioration of asset values and investment return.
5. Expense.
6. [[Reinsurance]] failure.
7. Government and political risk.
8. Off-balance-sheet exposures.
9. Related-party risk.

## Ripple effects and management action

An adverse scenario does not stop at its first impact. Its [[Ripple Effect|ripple effects]] are modelled too: a catastrophe triggers reinstatement premium, reinsurance market hardening, rating pressure and higher borrowing costs.

The report shows each scenario's effect before and after realistic management responses. It distinguishes routine management action from the corrective action that would be needed if the scenario materialised.

## FCT and ORSA

The [[ORSA]] is management's process for determining how much capital is needed. FCT is the actuary's testing of whether the financial condition holds under adversity. Both go to the board, and only FCT carries an actuarial opinion.

> [!trap] Holding adverse scenarios to the supervisory target
> The supervisory target applies to the base scenario only. An adverse scenario passes if it stays above the minimum, so a ratio of $118\%$ under a catastrophe is not a failure.
