---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:08142055264e17ebab914f713797abe0d6aae6dd8bc52586e2fd4cc420f2be49
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/External Auditor.md
---
![[Media/Figures/External_Auditor.svg|340]]

An **External Auditor** is the independent accounting firm appointed to audit an insurer's financial statements and express an opinion on whether they present fairly, in all material respects, the insurer's financial position and results. For an insurer, the auditor's largest single area of judgement is the [[Insurance Contract Liabilities|insurance contract liabilities]], which the [[Appointed Actuary]] values.

The auditor and the Appointed Actuary rely on each other, and neither substitutes its judgement for the other's:

| | External auditor | Appointed Actuary |
| :--- | :--- | :--- |
| Gives an opinion on | the financial statements as a whole | the liabilities specifically |
| Relies on the other for | the valuation and the [[Appointed Actuary's Report]] supporting it | the audit work on the accounting data and the reconciliation of claims data to the general ledger |
| Role in the valuation | tests its reasonableness without re-performing it, often with its own actuarial specialists | performs it, without deferring to the auditor's comfort |

A clean audit opinion does not imply an unqualified actuarial opinion, or the reverse.

## Communication between the actuary and the auditor

The [[Standards of Practice]] and auditing standards both contemplate direct communication between actuary and auditor about scope, materiality, data, methods and significant judgements. Where their [[Materiality|materiality]] thresholds differ, that difference should be discussed early rather than discovered late.

## Areas of disagreement under IFRS 17

The judgemental areas [[IFRS 17]] created are where the two can genuinely disagree:

1. The confidence level of the [[Risk Adjustment for Non-Financial Risk|risk adjustment]].
2. The [[IFRS 17 Discount Rates|discount rate]] and illiquidity premium.
3. Identifying [[Onerous Contract|onerous groups]].
4. [[Risk Transfer|Risk transfer]] on a reinsurance contract.

A disagreement in these areas is a matter for the audit committee, not for private resolution. Both the actuary and the auditor report to the audit committee. A board that hears them separately and never together loses the most useful signal available: whether they agree.

> [!example]- How should this disagreement over the risk adjustment be resolved? {Example}
> The Appointed Actuary has set the risk adjustment at the $75\text{th}$ percentile, giving $\$32$ million. The auditor's actuarial specialists accept the $75\text{th}$ percentile but calculate the corresponding amount as $\$41$ million. They argue the actuary's liability distribution understates tail variability on a long-tail liability book.
>
> > [!answer]-
> > - Both accept the confidence level, so the disagreement is about the shape of the distribution.
> > - The two examine the tail jointly: a lognormal with a modest coefficient of variation gives a very different $75\text{th}$ percentile from a heavier-tailed fit.
> > - A distribution built only from process variance understates the uncertainty, because the parameters are estimated too. If the actuary's model omits parameter uncertainty, the auditor is right.
> > - The diversification benefit taken across lines moves the number substantially and must be disclosed anyway.
> > - Peers' disclosed confidence levels are not decisive, but a figure well below peers on a longer-tail book will be questioned.
> > - If the actuary's analysis withstands the challenge, the $\$32$ million stands and the reasoning is documented in the Appointed Actuary's Report. If it does not, the actuary revises, which is proper practice.
> > - If neither moves, the matter goes to the audit committee with both positions set out. The auditor decides whether the statements are materially misstated, and the actuary decides what to opine on.
> > - The $\$9$ million difference may be within the auditor's materiality, in which case both opinions can be clean and the disagreement is disclosed.

> [!trap] Relying on the auditor's comfort
> "The auditors are satisfied" is not a basis for an actuarial conclusion. The Appointed Actuary's opinion rests on the actuary's own valuation.
