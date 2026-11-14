---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0cae270745618d63d4996dbdd8e46285ecb04c48067d0d1c59635599aa12af0b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Court Case.md
---
![[Media/Figures/Court_Case.svg|340]]

A **Court Case** is a judicial decision interpreting an insurance policy, a statute or the law of negligence, and it is a source of Canadian insurance law in its own right. Legislation sets the framework, and courts decide what its words mean in a dispute. That meaning binds insurers until a higher court or the legislature changes it.

A decision binds according to the court that made it:

1. A Supreme Court of Canada decision binds every court in the country.
2. A provincial court of appeal binds the courts in its province and is persuasive elsewhere.
3. In Quebec, a **civil law** jurisdiction, courts work from the *Civil Code of Québec* rather than binding precedent, so a common-law decision is at most persuasive there.

The interaction with legislation runs both ways. A decision the legislature dislikes is answered with an amendment, and each [[Automobile Insurance Reform|reform]] is partly a response to accumulated judicial interpretation.

## Effect on reserves

A ruling that widens a coverage, extends a limitation period, admits a new head of damage or relaxes a [[Tort Threshold and Deductible|threshold]] applies to claims that have already occurred. Its effect is therefore immediate on the reserve, and not only prospective on the rate. A single appellate decision can move an entire industry's reserves.

> [!example]- What must the Appointed Actuary do about this decision at the December year end? {Example}
> In November, a provincial court of appeal holds that a category of chronic pain claims previously treated as minor injuries falls outside the [[Minor Injury Guideline|minor injury]] cap. The insurer has $4{,}200$ open accident benefit claims, and the actuary estimates $18\%$ involve the affected category. Average incurred is $\$3{,}500$ on a capped claim and $\$48{,}000$ on an uncapped non-catastrophic claim.
>
> > [!answer]-
> > - The decision interprets the law as it always was, so the affected claims were always uncapped and the liability existed at the valuation date.
> > - It is a [[Subsequent Events|subsequent event]] providing evidence of conditions that existed at the balance sheet date, so the [[Appointed Actuary]] adjusts the valuation rather than only disclosing it.
> > - The affected claims number $0.18 \times 4{,}200 = 756$.
> > - Each one's severity rises by $\$48{,}000 - \$3{,}500 = \$44{,}500$.
> > - The indicated strengthening is $756 \times \$44{,}500 = \$33{,}642{,}000$.
> > - The reserve is dominated by the $18\%$ and the $\$48{,}000$, so the [[Materiality|materiality]] of those assumptions warrants a sensitivity range rather than a point.
> > - If the decision reopens settled files, the exposure is larger than the open inventory suggests.
> > - The strengthening moves capital available, so it is reflected in the [[MCT]] and the [[FCT]], whose adverse scenarios now include further judicial erosion.
> > - The next rate filing must be at the post-decision cost level, or the inadequacy repeats in new business.
> > - The change is material, and it is reportable under the [[Duty to Report]] if it threatens the insurer's financial condition.

## Interpretation of policy wordings

Ambiguity in a coverage wording is construed *contra proferentem*, against the drafter. Where a wording is ambiguous, Canadian courts also construe it to meet the **reasonable expectations** of the insured, which resolves genuine ambiguity in the policyholder's favour. That is why drafting matters so much.

Recurring subjects of Canadian insurance litigation are the interpretation of coverage wordings, the [[Duty to Defend]], the scope of the [[Duty of Good Faith]] and the availability of [[Bad Faith Damages]] and [[Punitive Damages]], the [[Minor Injury Guideline|minor injury]] and [[Catastrophic Impairment|catastrophic impairment]] definitions, and the deductibility of [[Collateral Benefits]].

> [!trap] Treating a decision as a prospective change
> A ruling is not a law change effective from its date. It says what the law always meant, so it reaches every open claim at the valuation date, and pricing the change into future rates alone leaves the reserve short.
