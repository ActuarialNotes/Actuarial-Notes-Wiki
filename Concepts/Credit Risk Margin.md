---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d249693ce26b4fe3536b03e7818f1be3876005a42591e81728b2f0a01d739349
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Credit Risk Margin.md
---

**The Credit Risk Margin** is the [[MCT]] component covering the risk that a counterparty fails to pay: bond issuers, mortgage borrowers, derivative counterparties, agents and brokers holding premium, and — distinctively for an insurer — **reinsurers**. Factors are applied to exposures by counterparty type and credit quality.

- **Reinsurance recoverables are a credit exposure**, and often the largest single one. An insurer that has ceded heavily has replaced insurance risk with credit risk against its reinsurers, and the MCT charges for it — so the net capital benefit of reinsurance is the reduction in the [[Insurance Risk Margin|insurance risk margin]] **less** the credit charge it creates.
- **[[Registered Reinsurance|Registration]] and collateral change the charge.** Cessions to unregistered reinsurers attract no capital credit at all unless collateralised; even for registered reinsurers, the recoverable carries a credit factor reflecting the reinsurer's rating.
- **Bond credit risk** is factor-based by rating and term. Government of Canada bonds attract essentially nothing; corporate bonds attract more as ratings fall, which — combined with the [[Market Risk Margin|market risk margin]] — is why insurers' bond portfolios skew to high grade.
- **Concentration matters beyond the formula.** The factors are applied exposure by exposure, so an insurer with $80\%$ of its recoverables from one reinsurer gets the same total charge as one with the exposure spread across eight. The formula does not see the concentration; [[ORSA]] and [[Concentration Risk]] management must.
- **Under [[IFRS 17]], the accounting parallel is the non-performance risk** allowance on the [[Reinsurance Contracts Held|reinsurance asset]] — the same economic exposure, measured for a different purpose, and the two should be consistent in their view of counterparty quality.

> [!example]- Does the Reinsurance Actually Save Capital? {Example}
> An insurer cedes $\$150$ million of claim liabilities under a quota share. This reduces the insurance risk margin by $\$27$ million. The reinsurer is registered and A-rated, attracting a credit factor of $3\%$ on the recoverable. Ceded premium is $\$42$ million against expected recoveries with a present value of $\$36$ million.
>
> Assess the capital and economic effect.
>
> > [!answer]-
> > **Capital effect:**
> >
> > $$\begin{align*}
> > \text{Insurance risk reduction} &= -\$27\text{M} \\
> > \text{Credit risk added} &= +0.03(\$150\text{M}) = +\$4.5\text{M} \\[4pt]
> > \text{Net reduction in capital required} &= \$22.5\text{M}
> > \end{align*}$$
> >
> > **Effect on the buffer:**
> >
> > $$1.5 \times \$22.5\text{M} = \$33.75\text{M} \text{ of buffer released}$$
> >
> > **Economic cost of the reinsurance:**
> >
> > $$\$42\text{M} - \$36\text{M} = \$6\text{M}$$
> >
> > **Return on the capital released**, ignoring the risk-reduction benefit itself:
> >
> > $$\frac{\$6\text{M}}{\$33.75\text{M}} = 17.8\%$$
> >
> > So the insurer is paying an effective $17.8\%$ for the released capital. Whether that is worth it depends entirely on the **marginal value of capital to this insurer**: if the [[MCT]] ratio is comfortably above the [[Internal Target Capital Ratio|internal target]], $17.8\%$ is expensive and the treaty is being bought for the wrong reason. If the ratio is near target and the alternative is a rights issue or curtailed growth, it is cheap.
> >
> > **What the calculation leaves out**, and must be added to the decision: the reinsurance also removes **tail risk**, which is worth more than its expected-value cost — that is the whole point of buying it. The $\$6$ million is not purely a capital-efficiency payment; it is also the price of not bearing the extreme outcomes, and a comparison that ignores that will always make reinsurance look overpriced.
