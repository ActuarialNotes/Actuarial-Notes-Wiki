---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:15083bcdf0695bc74678bf542750e4ca6446c945ac5298d71c57fa151352f893
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Margin for Adverse Deviations.md
---

![[Media/Figures/Margin_for_Adverse_Deviations.svg|340]]

A **Margin for Adverse Deviations** (MfAD) is a provision added to a best-estimate assumption to allow for the possibility that experience is worse than expected. Under the pre-[[IFRS 17]] Canadian regime, MfADs were the mechanism by which conservatism entered [[Insurance Contract Liabilities|policy liabilities]], and they have been replaced by the [[Risk Adjustment for Non-Financial Risk|risk adjustment]].

The old CIA standards set three MfADs, each with a prescribed range within which the actuary selected:

1. **Claims development**, a percentage load on the best estimate of unpaid claims.
2. **Reinsurance recovery**, a load reflecting the risk that ceded amounts are not collected.
3. **Investment return rate**, a deduction from the discount rate.

With these margins, the policy liability under the old regime is

> $$\text{Policy liability}_{\text{old}} = \text{Best estimate} \times (1 + \text{MfADs})$$

MfADs remain on the exam as the basis of comparison: candidates are asked to explain what replaced them and why.

## MfADs compared with the IFRS 17 risk adjustment

| | MfADs (old regime) | IFRS 17 |
| :--- | :--- | :--- |
| Non-financial risk | Applied assumption by assumption, in ranges set by standards | One entity-specific risk adjustment with a disclosed confidence level |
| Reinsurance collectability | Reinsurance recovery MfAD | Non-performance risk on the reinsurance asset ([[Reinsurance Contracts Held]]), a credit adjustment outside the risk adjustment |
| Interest rate | MfAD reduced the discount rate | Market-consistent discount rate ([[IFRS 17 Discount Rates]]) with no prudence in it, because financial risk is excluded from the risk adjustment |

The change was made because prescribed ranges made margins comparable but arbitrary, and mixing prudence into the discount rate confused financial and non-financial risk. Disclosing a confidence level makes an entity-specific margin comparable in a way a list of MfADs never was. What was lost is the floor the old ranges gave. A risk adjustment is the insurer's own judgement, and a low confidence level is permitted so long as it is disclosed.

> [!example]- How does this insurer's gross liability for unpaid claims change from the old regime to IFRS 17, and why? {Example}
> An insurer's best estimate of unpaid claims is $\$400$ million undiscounted, and discounting at $4\%$ reduces it to $\$370$ million. Reinsurance recoverable is $\$90$ million.
>
> | | Old regime | IFRS 17 |
> | :--- | :--- | :--- |
> | Claims margin | Claims development MfAD of $8\%$ | Risk adjustment at the 70th percentile, $\$26$ million |
> | Interest rate | MfAD of 50 basis points, adding $\$4$ million | None |
> | Reinsurance | MfAD of $2\%$ | Non-performance risk of $\$1.5$ million |
>
> > [!answer]-
> > - The claims development MfAD is $0.08 \times \$370\text{M} = \$29.6\text{M}$.
> > - The old gross policy liability is $\$370\text{M} + \$29.6\text{M} + \$4\text{M} = \$403.6\text{M}$.
> > - The old reinsurance asset is reduced by $0.02 \times \$90\text{M} = \$1.8\text{M}$, to $\$88.2\text{M}$.
> > - The IFRS 17 liability for incurred claims is $\$370\text{M} + \$26\text{M} = \$396\text{M}$, and the reinsurance asset is reduced by $\$1.5\text{M}$ (its own risk adjustment is ignored here for comparability).
> > - The gross liability falls by $\$7.6$ million.
> > - $\$4$ million of the fall is the interest rate MfAD, gone because the IFRS 17 discount rate carries no prudence.
> > - $\$3.6$ million is the risk adjustment ($\$26$M) being smaller than the claims development MfAD ($\$29.6$M), from the actuary's choice of the 70th percentile.
> > - A reader of the old figures saw an "$8\%$ claims development MfAD" and could not tell what confidence it represented. A reader of the IFRS 17 figures sees "70th percentile" and can compare it with any other insurer.

> [!trap] Putting the reinsurance margin in the risk adjustment
> The old reinsurance MfAD covered collectability. Under IFRS 17 that risk is non-performance risk, a credit adjustment to the reinsurance asset, and it is explicitly not part of the risk adjustment.
