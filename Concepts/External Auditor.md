---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6bedebcd3cbad43ff43a7e4e94a93c3f24ffaa3298f2b88d8524a18e2a7bde35
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/External Auditor.md
---

**The External Auditor** is the independent accounting firm appointed to audit an insurer's financial statements and express an opinion on whether they present fairly, in all material respects, the insurer's financial position and results. For an insurer the auditor's largest single area of judgement is the **[[Insurance Contract Liabilities]]** — which the [[Appointed Actuary]] values.

- **The relationship is one of reliance, in both directions.** The auditor relies on the actuary's valuation and on the [[Appointed Actuary's Report]] supporting it; the actuary relies on the auditor's work on the underlying accounting data and on the reconciliation of claims data to the general ledger.
- **Neither may substitute the other's judgement.** The auditor does not re-perform the valuation but tests its reasonableness — often engaging its own actuarial specialists to do so. The actuary does not defer the valuation to the auditor's comfort. "The auditors are satisfied" is not a basis for an actuarial conclusion.
- **Professional communication is expected.** The [[Standards of Practice]] and auditing standards both contemplate direct communication between actuary and auditor about scope, materiality, data, methods and significant judgements. Where their [[Materiality]] thresholds differ, that difference should be discussed rather than discovered.
- **Where they can genuinely disagree:** the [[Risk Adjustment for Non-Financial Risk|risk adjustment]]'s confidence level, the [[IFRS 17 Discount Rates|discount rate]] and illiquidity premium, [[Onerous Contract|onerous group]] identification, and [[Risk Transfer]] on a reinsurance contract. These are the judgemental areas [[IFRS 17]] created, and disagreement in them is a matter for the audit committee, not for private resolution.
- **The audit committee is where the two meet.** Both the actuary and the auditor report to it, and a board that hears them separately and never together loses the most useful signal available — whether they agree.
- **The auditor's opinion is on the statements as a whole**; the actuary's is on the liabilities specifically. A clean audit opinion does not imply an unqualified actuarial opinion, or the reverse.

> [!example]- When the Auditor and the Actuary Disagree {Example}
> The Appointed Actuary has set the [[Risk Adjustment for Non-Financial Risk|risk adjustment]] at the $75\text{th}$ percentile, giving $\$32$ million. The auditor's actuarial specialists consider the $75\text{th}$ percentile reasonable but calculate the corresponding amount as $\$41$ million, arguing the actuary's liability distribution understates tail variability on a long-tail liability book.
>
> How should this be resolved?
>
> > [!answer]-
> > **The disagreement is not about the confidence level — both accept the $75\text{th}$ percentile. It is about the shape of the distribution**, and identifying that is most of the resolution.
> >
> > **What to examine, jointly:**
> >
> > 1. **The distribution's tail.** A lognormal with a modest coefficient of variation gives a very different $75\text{th}$ percentile from a heavier-tailed fit. On long-tail liability, the heavier assumption is usually better supported.
> > 2. **Parameter versus process uncertainty.** A distribution built only from process variance (claim-level randomness) understates the true uncertainty, because the *parameters* are estimated too. If the actuary's model omits parameter uncertainty, the auditor is right.
> > 3. **Diversification.** How much benefit is taken across lines, and at what level it is recognised, moves the number substantially and must be disclosed anyway.
> > 4. **Benchmarking.** What confidence levels and risk adjustment ratios are peers disclosing for similar books? Not decisive, but a $\$32$ million figure well below peers on a longer-tail book is a question that will be asked.
> >
> > **How it should be resolved procedurally.** If the actuary's analysis withstands the challenge, the actuary's number stands and the reasoning is documented in the [[Appointed Actuary's Report]]. If it does not, the actuary revises — and revising in response to good technical challenge is proper practice, not capitulation.
> >
> > **If neither moves,** the matter goes to the **audit committee** with both positions set out. The auditor decides whether $\$32$ million is materially misstated for its opinion; the actuary decides what to opine on. Those are separate decisions, and a $\$9$ million difference on a book of this size may well be within the auditor's materiality even though the actuary's estimate is unchanged — in which case both opinions can be clean and the disagreement is simply disclosed and moves on.
