---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4471a73500163ec3f9a6b2b52452e2232edab1270f4ae74dd3539d32b8d879a2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Margin for Adverse Deviations.md
---

**A Margin for Adverse Deviations** (MfAD) is a provision added to a best-estimate assumption to allow for the possibility that experience is worse than expected. Under the pre-[[IFRS 17]] Canadian regime, MfADs on claims development, reinsurance recovery and interest rate were the mechanism by which conservatism entered [[Insurance Contract Liabilities|policy liabilities]]. They have been **replaced** by the [[Risk Adjustment for Non-Financial Risk|risk adjustment]], and the contrast between the two is regularly examined.

> $$\text{Policy liability}_{\text{old}} = \text{Best estimate} \times (1 + \text{MfADs})$$

- **The three MfADs** under the old CIA standards: **claims development** (a percentage load on the best estimate of unpaid claims), **reinsurance recovery** (a load reflecting the risk that ceded amounts are not collected), and **investment return rate** (a deduction from the discount rate). Each had a prescribed range within which the actuary selected.
- **What changed under IFRS 17:**
  - MfADs applied assumption by assumption, in ranges set by standards; the **risk adjustment** is a single, entity-specific amount for non-financial risk with a **disclosed confidence level**.
  - The reinsurance MfAD covered collectability; under IFRS 17 that is **non-performance risk** on the [[Reinsurance Contracts Held|reinsurance asset]] — a credit adjustment, explicitly *not* part of the risk adjustment.
  - The interest rate MfAD reduced the discount rate; under IFRS 17 the [[IFRS 17 Discount Rates|discount rate]] is market-consistent with **no** prudence in it, because financial risk is excluded from the risk adjustment.
- **Why the change was made.** Prescribed ranges made margins comparable but arbitrary, and mixing prudence into the discount rate confused financial and non-financial risk. Disclosing a confidence level makes an entity-specific margin comparable in a way a list of MfADs never was.
- **What was lost:** the old ranges gave a floor. A risk adjustment is the insurer's own judgement, and while the confidence-level disclosure constrains it, a low disclosed confidence level is permitted so long as it is disclosed.
- MfADs remain relevant on the exam as the **basis of comparison** — candidates are asked to explain what replaced them and why.

> [!example]- Old Margins Versus the New Risk Adjustment {Example}
> An insurer's best estimate of unpaid claims is $\$400$ million undiscounted, discounting at $4\%$ reduces it to $\$370$ million, and reinsurance recoverable is $\$90$ million.
>
> Under the old regime the actuary selected a claims development MfAD of $8\%$, a reinsurance MfAD of $2\%$, and an interest rate MfAD of $50$ basis points (which increases the discounted liability by $\$4$ million). Under IFRS 17 the actuary sets a risk adjustment at the $70\text{th}$ percentile, computed as $\$26$ million, with non-performance risk on the reinsurance asset of $\$1.5$ million.
>
> Compare.
>
> > [!answer]-
> > **Old regime, gross policy liability:**
> >
> > $$\begin{align*}
> > &= \$370\text{M} + 0.08(\$370\text{M}) + \$4\text{M} \\
> > &= \$370\text{M} + \$29.6\text{M} + \$4\text{M} \\
> > &= \$403.6\text{M}
> > \end{align*}$$
> >
> > with the reinsurance asset reduced by $0.02 \times \$90\text{M} = \$1.8\text{M}$ to $\$88.2$M.
> >
> > **IFRS 17:**
> >
> > $$\text{LIC} = \$370\text{M} + \$26\text{M} = \$396\text{M}$$
> >
> > with the reinsurance asset reduced by $\$1.5$M for non-performance risk (and increased by its own risk adjustment, ignored here for comparability).
> >
> > **The gross liability falls by $\$7.6$ million.** Two distinct reasons, and separating them is the point of the exercise:
> >
> > - **$\$4$ million** because the interest rate MfAD is gone — the IFRS 17 discount rate carries no prudence at all.
> > - **$\$3.6$ million** because the risk adjustment ($\$26$M) is smaller than the claims development MfAD ($\$29.6$M), reflecting the actuary's choice of the $70\text{th}$ percentile.
> >
> > **The disclosure difference is the larger point.** Under the old regime a reader saw "$8\%$ claims development MfAD" and could not tell what confidence that represented. Under IFRS 17 the reader sees "$70\text{th}$ percentile" and can compare directly with any other insurer — which is what the change was for.
