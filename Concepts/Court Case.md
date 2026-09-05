---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:21e2bb437514163aeb270bfb38c30f1813a45d4cd936fb83a7866c30f59bff1f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Court Case.md
---

**A Court Case** — a judicial decision interpreting an insurance policy, a statute, or the law of negligence — is a source of Canadian insurance law in its own right. Legislation sets the framework; courts decide what its words mean in a dispute, and that meaning binds insurers until a higher court or the legislature changes it. A single appellate decision can move an entire industry's reserves.

- **Why decisions matter actuarially.** A ruling that widens a coverage, extends a limitation period, admits a new head of damage, or relaxes a [[Tort Threshold and Deductible|threshold]] applies to **claims that have already occurred**. The effect is therefore immediate on the reserve, not merely prospective on the rate — this is the single most important thing to say about case law on the exam.
- **Precedent and hierarchy.** A Supreme Court of Canada decision binds every court in the country; a provincial court of appeal binds courts in its province and is persuasive elsewhere. Quebec, as a **civil law** jurisdiction, works from the *Civil Code of Québec* rather than binding precedent, so a common-law decision is at most persuasive there.
- **Recurring subject matter** in Canadian insurance litigation: interpretation of coverage wordings (with ambiguity construed *contra proferentem*, against the drafter), the [[Duty to Defend]], the scope of the [[Duty of Good Faith]] and availability of [[Bad Faith Damages]] and [[Punitive Damages]], the [[Minor Injury Guideline|minor injury]] and [[Catastrophic Impairment|catastrophic impairment]] definitions, and the deductibility of [[Collateral Benefits]].
- **Reasonable expectations.** Where a wording is ambiguous, Canadian courts construe it to meet the reasonable expectations of the insured, which systematically resolves genuine ambiguity in the policyholder's favour and is why drafting matters so much.
- The interaction with legislation runs both ways: a decision the legislature dislikes is answered with an amendment, and each [[Automobile Insurance Reform|reform]] is partly a response to accumulated judicial interpretation.

> [!example]- A Decision Lands Mid-Reserve-Cycle {Example}
> In November, a provincial court of appeal holds that a category of chronic pain claims previously treated as minor injuries falls **outside** the [[Minor Injury Guideline|minor injury]] cap. The insurer has $4{,}200$ open accident benefit claims; the actuary estimates $18\%$ involve the affected category. Average incurred on a capped claim is $\$3{,}500$; on an uncapped non-catastrophic claim, $\$48{,}000$.
>
> What must the [[Appointed Actuary]] do at the December year end?
>
> > [!answer]-
> > **Recognise the effect in the current valuation.** The decision interprets the law as it always was — it is not a change in the law effective going forward — so the affected claims were *always* uncapped, and the liability existed at the valuation date. This is a **[[Subsequent Events|subsequent event]] providing evidence of conditions that existed at the balance sheet date**, which is precisely the category that requires adjustment rather than mere disclosure.
> >
> > Order of magnitude:
> >
> > $$\begin{align*}
> > \text{Affected claims} &= 0.18 \times 4{,}200 = 756 \\[4pt]
> > \text{Severity increase} &= \$48{,}000 - \$3{,}500 = \$44{,}500 \\[4pt]
> > \text{Indicated strengthening} &= 756 \times \$44{,}500 \\
> > &= \$33{,}642{,}000
> > \end{align*}$$
> >
> > What the actuary must then also do:
> >
> > - **Test the $18\%$ and the $\$48{,}000$.** Both are estimates made under pressure; the reserve is dominated by them, so the [[Materiality|materiality]] of the assumption warrants a sensitivity range, not a point.
> > - **Consider claims already closed.** If the decision reopens settled files, the exposure is larger than the open inventory suggests.
> > - **Reflect it in [[MCT]] and [[FCT]]**: a $\$34$ million strengthening moves capital available, and the adverse scenarios should now include further judicial erosion.
> > - **Reflect it in pricing.** The next filing must be at the post-decision cost level, or the inadequacy repeats in the new business.
> > - **Disclose it.** This is a material change in circumstances, reportable under [[Duty to Report]] if it threatens financial condition.
