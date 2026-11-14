---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:68254a76ca0aa69b3e973d1b2e870104460483dc3adbb8a4ddd703617b04e0dc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Credit Risk Margin.md
---
![[Media/Figures/Credit_Risk_Margin.svg|340]]

The **Credit Risk Margin** is the [[MCT]] component covering the risk that a counterparty fails to pay. Factors are applied to each exposure according to the counterparty's type and credit quality.

The counterparties it charges for are:

1. bond issuers;
2. mortgage borrowers;
3. derivative counterparties;
4. agents and brokers holding premium;
5. reinsurers, the counterparty distinctive to an insurer.

## Bond credit risk

Bond credit risk is factor-based by rating and term. Government of Canada bonds attract essentially nothing, and corporate bonds attract more as their ratings fall. Together with the [[Market Risk Margin|market risk margin]], this is why insurers' bond portfolios skew to high grade.

## Reinsurance recoverables

Reinsurance recoverables are a credit exposure, and often the largest single one. An insurer that has ceded heavily has replaced insurance risk with credit risk against its reinsurers, and the MCT charges for it. The net capital benefit of reinsurance is the reduction in the [[Insurance Risk Margin|insurance risk margin]] **less** the credit charge it creates.

[[Registered Reinsurance|Registration]] and collateral change the charge. Cessions to unregistered reinsurers attract no capital credit at all unless collateralised. Even for a registered reinsurer, the recoverable carries a credit factor reflecting the reinsurer's rating.

> [!example]- Does this quota share save capital, and at what cost? {Example}
> An insurer cedes $\$150$ million of claim liabilities under a quota share, which reduces its insurance risk margin by $\$27$ million. The reinsurer is registered and A-rated, with a credit factor of $3\%$ on the recoverable. Ceded premium is $\$42$ million against expected recoveries with a present value of $\$36$ million.
>
> > [!answer]-
> > - The credit risk margin rises by $0.03 \times \$150\text{M} = \$4.5$ million.
> > - The net reduction in capital required is $\$27\text{M} - \$4.5\text{M} = \$22.5$ million.
> > - Minimum capital required is capital required divided by $1.5$, so an insurer at the $150\%$ [[Supervisory Target Capital Ratio|supervisory target]] holds capital equal to its capital required.
> > - At that target, the treaty releases $\$22.5$ million of capital.
> > - The economic cost of the reinsurance is $\$42\text{M} - \$36\text{M} = \$6$ million.
> > - The insurer pays $\$6\text{M} / \$22.5\text{M} = 26.7\%$ for the released capital.
> > - If the MCT ratio is comfortably above the [[Internal Target Capital Ratio|internal target]], $26.7\%$ is expensive. If the ratio is near target and the alternative is a rights issue or curtailed growth, it is cheap.
> > - The calculation leaves out the tail risk the reinsurance removes, which is worth more than its expected-value cost, so the $\$6$ million is also the price of not bearing the extreme outcomes.

## Concentration

The factors are applied exposure by exposure, so an insurer with $80\%$ of its recoverables from one reinsurer gets the same total charge as one with the exposure spread across eight. The formula does not see the concentration, so [[ORSA]] and [[Concentration Risk|concentration risk]] management must.

Under [[IFRS 17]], the accounting parallel is the allowance for non-performance risk on the [[Reinsurance Contracts Held|reinsurance asset]]. It measures the same economic exposure for a different purpose, and the two should take a consistent view of counterparty quality.

> [!trap] Counting only the insurance risk saved by reinsurance
> Ceding $\$150$ million at a $3\%$ factor adds $\$4.5$ million of credit risk margin. The capital saved is the drop in the insurance risk margin less that charge.
