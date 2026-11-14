---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5ed77a61a76da709818f3057776f3824d32c559939459af54b272437ca6c21e3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Contract Liabilities.md
---

![[Media/Figures/Reinsurance_Contract_Liabilities.svg|340]]

**Reinsurance Contract Liabilities** are the obligations of an insurer under reinsurance contracts it has **issued**: the liabilities of an assuming reinsurer, or of a primary insurer that assumes business inwards. Under [[IFRS 17]] they are measured like any other insurance contract issued, so their carrying amount is

> $$\text{Reinsurance contract liabilities} = \text{LRC} + \text{LIC}$$

- $\text{LRC}$ is the [[Liability for Remaining Coverage|liability for remaining coverage]].
- $\text{LIC}$ is the [[Liability for Incurred Claims|liability for incurred claims]].

Both are built from [[Fulfilment Cash Flows|fulfilment cash flows]] and a [[Risk Adjustment for Non-Financial Risk|risk adjustment]], with a [[Contractual Service Margin|CSM]] where the [[General Measurement Model|GMM]] applies. There is no separate model for assumed reinsurance. The assuming entity applies the same LRC and LIC framework, the same [[Onerous Contract|onerous]] test and the same presentation as it would to direct business.

## Reinsurance issued and reinsurance held

Reinsurance contracts issued and [[Reinsurance Contracts Held|reinsurance contracts held]] are measured and presented differently:

| | Reinsurance contracts issued | Reinsurance contracts held |
| :--- | :--- | :--- |
| What it is | Reinsurance sold (assumed) | Reinsurance bought (ceded) |
| Who pays claims | This insurer pays a cedant | A reinsurer pays this insurer |
| Balance sheet | A liability, with insurance contracts issued | A separate asset |

> [!example]- What does this insurer's balance sheet show for these amounts? {Example}
> An insurer writes direct business, cedes $25\%$ of it under a quota share, and also assumes reinsurance from other insurers. At year end:
>
> | Item | Amount |
> | :--- | ---: |
> | Gross LIC on direct business | $\$300$ million |
> | Reinsurance recoverable on that LIC | $\$75$ million |
> | LIC on assumed business | $\$110$ million |
>
> > [!answer]-
> > - Assumed reinsurance is insurance issued, so its LIC sits with the direct liabilities.
> > - Insurance contract liabilities are $\$300\text{M} + \$110\text{M} = \$410$ million.
> > - The recoverable is reinsurance held, so it is a reinsurance contract asset of $\$75$ million, plus its risk adjustment and less non-performance risk.
> > - None of the three amounts is netted against another, so the balance sheet shows $\$410$ million of liabilities and a $\$75$ million asset.

## Measuring assumed reinsurance

[[Premium Allocation Approach|PAA]] eligibility is assessed on the treaty's own terms. Its coverage period, often one underwriting year and sometimes longer, decides eligibility. The long claim payout of assumed excess-of-loss business affects the LIC, not the choice of model.

Reporting lag is the assuming reinsurer's defining problem. Cedant reports arrive quarterly or later, so at any valuation date a material part of the exposure has not yet been reported by the cedant, let alone by the underlying claimant. Estimates therefore rely heavily on exposure-based methods and on cedant-supplied data of variable quality. Where those data are late, incomplete or inconsistent, the [[Standards of Practice]] require the actuary to say so and to consider whether the data are sufficient for the purpose.

The greater uncertainty calls for a higher risk adjustment, so a reinsurer's disclosed confidence level is typically above a primary insurer's.

> [!trap] Netting assumed business against reinsurance recoverables
> Both carry the word "reinsurance", but they point in opposite directions. Ask who pays. Assumed business, where this insurer pays a cedant, is a liability. Ceded business, where a reinsurer pays this insurer, is an asset.
