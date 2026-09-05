---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:baf0f9e218db9e8b3eddc8cd2f7258e35d1cf60fac8cd1877c1e03784b4d809b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Contract Liabilities.md
---

**Reinsurance Contract Liabilities** are the obligations of an insurer under reinsurance contracts it has **issued** — that is, the liabilities of an assuming reinsurer, or of a primary insurer that assumes business inwards. Under [[IFRS 17]] they are measured exactly like any other insurance contract issued: [[Liability for Remaining Coverage|LRC]] plus [[Liability for Incurred Claims|LIC]], with [[Fulfilment Cash Flows|fulfilment cash flows]], a [[Risk Adjustment for Non-Financial Risk|risk adjustment]], and a [[Contractual Service Margin|CSM]] where the [[General Measurement Model|GMM]] applies.

- **Do not confuse the two directions.** *Reinsurance contracts held* ([[Reinsurance Contracts Held]]) are an **asset** — reinsurance bought. *Reinsurance contract liabilities* are what an insurer owes on reinsurance **sold**. The measurement rules differ in several respects, and the distinction is examined regularly.
- **Assumed reinsurance is measured as insurance issued.** There is no separate model: the assuming entity applies the same LRC/LIC framework, the same onerous test, and the same presentation as it would to direct business.
- **[[Premium Allocation Approach|PAA]] eligibility must be assessed on its own terms.** A treaty's coverage period — often one underwriting year, sometimes longer — determines eligibility, and the long claim payout of assumed excess-of-loss business affects the **LIC** rather than the model choice.
- **Reporting lag is the assuming reinsurer's defining problem.** Cedant reports arrive quarterly or later, so at any valuation date a material part of the exposure is not yet reported by the cedant, let alone by the underlying claimant. Estimation is therefore heavily dependent on **exposure-based** methods and cedant-supplied data of variable quality.
- **Data quality and its consequences.** Where cedant data are late, incomplete or inconsistent, the [[Standards of Practice]] require the actuary to say so and to consider whether the data are sufficient for the purpose — this is one of the clearest practical applications of the data-quality standard.
- **Higher uncertainty means a higher [[Risk Adjustment for Non-Financial Risk|risk adjustment]]**, and a reinsurer's disclosed confidence level is typically above a primary insurer's for exactly this reason.

> [!example]- Both Directions on One Balance Sheet {Example}
> An insurer writes direct business, cedes $25\%$ of it under a quota share, and also assumes reinsurance from other insurers. At year end: gross direct LIC $\$300$ million; reinsurance recoverable on that LIC $\$75$ million; LIC on assumed business $\$110$ million.
>
> Present the balance sheet items.
>
> > [!answer]-
> > Three separate figures, and **none of them are netted**:
> >
> > - **Insurance contract liabilities: $\$410$ million** — the gross direct LIC of $\$300$M *plus* the assumed LIC of $\$110$M. Assumed reinsurance is insurance issued, so it belongs with the direct liabilities, not with the reinsurance asset.
> > - **Reinsurance contract assets: $\$75$ million** (plus its risk adjustment, less non-performance risk) — reinsurance **held**, presented on the asset side.
> >
> > The single most common error is to combine the $\$110$M of assumed business with the $\$75$M recoverable because both are labelled "reinsurance." They point in opposite directions: one is an obligation the insurer owes, the other a recovery it expects.
> >
> > **The test that resolves it every time:** *am I the one who pays, or the one who gets paid?* Assumed business — the insurer pays a cedant — is a liability. Ceded business — a reinsurer pays this insurer — is an asset.
