---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:640c78a0be51750ed3b6b2dd9ca2385dd23b5283da3b7a6d2bcc5f828adb4fb4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Revenue.md
---

**Insurance Revenue** is the [[IFRS 17]] top line: the consideration an insurer becomes entitled to in exchange for **services provided in the period**. It replaces written and earned premium on the face of the income statement, and it deliberately **excludes any investment or deposit component** — amounts the insurer would repay to the policyholder regardless of whether an insured event occurs.

> $$\text{Insurance Revenue} = \text{Expected claims and expenses} + \text{RA released} + \text{CSM released} + \text{Acquisition amortisation}$$

- **Under the [[Premium Allocation Approach|PAA]]**, revenue is the premium allocated to the period — normally on a time basis, or on the basis of expected claim release where risk is not spread evenly. This is close to the old earned premium, so a Canadian P&C insurer's revenue line looks familiar.
- **Under the [[General Measurement Model|GMM]]** it is built up from the components released in the period: expected claims and expenses, the [[Risk Adjustment for Non-Financial Risk|risk adjustment]] released as risk expires, the [[Contractual Service Margin|CSM]] released for services provided, and the amortisation of [[Insurance Acquisition Cash Flows|acquisition cash flows]].
- **Revenue is not premium.** The differences that most often surprise: deposit components are excluded, [[Reinsurance Contracts Held|ceded premium]] is **not** deducted from revenue (it appears separately), and a group with a [[Loss Component]] recognises revenue on only the non-onerous portion of the [[Liability for Remaining Coverage|LRC]].
- **Reinsurance held is presented separately**, never netted. The income statement shows insurance revenue, insurance service expenses, and then the net expense (or income) from reinsurance contracts held as its own line.
- **Comparability improved, at a cost.** Insurance revenue is intended to be comparable with revenue reported by non-insurance businesses — an explicit IASB objective — but it broke the continuity of decades of premium-based analysis, which is why insurers disclose written premium as a supplementary measure.

> [!example]- From Written Premium to Insurance Revenue {Example}
> A PAA insurer writes $\$300$ million of premium in the year, of which $\$170$ million is earned. It cedes $\$55$ million of premium to reinsurers, $\$32$ million of which relates to coverage received in the year. One group is onerous, with a loss component releasing $\$6$ million against expected claims of $\$40$ million in the year.
>
> What is insurance revenue?
>
> > [!answer]-
> > Start from earned premium and adjust:
> >
> > - **Written premium of $\$300$M is not revenue.** Only the portion relating to coverage provided is.
> > - **Ceded premium is not deducted.** The $\$55$M appears in the separate reinsurance line, not against revenue. Netting it would be the classic error.
> > - **The loss component reduces revenue.** Revenue is recognised only on the non-onerous portion of the LRC, so the $\$6$M released against the loss component is excluded.
> >
> > $$\begin{align*}
> > \text{Insurance revenue} &= \$170\text{M} - \$6\text{M} \\
> > &= \$164\text{M}
> > \end{align*}$$
> >
> > Separately, the income statement shows **net expense from reinsurance contracts held** of $\$32$ million (the ceded premium relating to coverage received) less amounts recoverable — a single net line, not spread through revenue and expenses.
> >
> > **The reconciliation an analyst needs:** written $\$300$M → earned $\$170$M → revenue $\$164$M, with $\$55$M of ceded premium and $\$6$M of loss component release explained separately. An insurer that reports only the $\$164$M has told the reader almost nothing about volume, which is exactly why written premium survives as a supplementary disclosure.
