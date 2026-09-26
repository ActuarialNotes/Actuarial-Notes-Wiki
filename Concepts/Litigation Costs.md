---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6dca90eba30a9acaa630fc1ae03b4cb70d6712392527f87ee509bfdd81e18bf5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Litigation Costs.md
---

**Litigation Costs** are the costs of resolving liability claims through the civil justice system over and above the compensation that reaches the injured party: the insurer's defence and cost-containment spending, the plaintiff's own attorney fees, coverage disputes between insurer and policyholder, and the extra-contractual exposure created when a claim is mishandled.

> $$\text{Loss \& LAE} = \text{Indemnity} + \text{DCC} + \text{AO}$$
>
> $$\text{Net to claimant} = (1 - c) \times \text{Indemnity} - E$$

- $c$ is the plaintiff attorney's contingency share (typically around one-third, taken from the gross recovery) and $E$ the case expenses counsel recovers from the award. DCC and AO are the two statutory classes of loss adjustment expense.
- **The statutory split (SSAP No. 55).** *Defense and cost containment* (DCC) covers defence, litigation and medical cost containment, whether in-house or external: surveillance, litigation management, experts, and attorney fees incurred under a [[Duty to Defend|duty to defend]]. *Adjusting and other* (AO) is the rest of LAE, and it expressly includes **attorney fees to determine coverage — including litigation between the insurer and its policyholder** — and the expense of claims-related lawsuits such as extra-contractual obligation and bad-faith suits. Coverage litigation is therefore AO, not DCC: a classic trap. The split parallels [[Allocated Loss Adjustment Expense|ALAE]] and [[Unallocated Loss Adjustment Expenses ULAE|ULAE]] but is not identical to it.
- **Plaintiff-side costs.** Under the *American rule* each party pays its own lawyers, so a contingency fee comes out of the award and settlements are grossed up to leave the claimant whole. Fee-shifting statutes reverse this; Florida's one-way attorney-fee statute for insureds suing their insurers — repealed for most insurance disputes in 2023 — made even small disputed claims expensive to contest.
- **Extra-contractual obligations (ECO) and excess-of-policy-limits (XPL) losses** — bad-faith and failure-to-settle judgments — sit outside the policy limit and outside the rate. SSAP No. 55 requires insurers to disclose the amount and number of ECO and bad-faith claims paid.
- **Trends pushing costs up:** higher attorney involvement, litigation funding and advertising, longer times to trial, [[Nuclear Verdicts]] raising settlement values, [[Class Action]] defence (costly whatever the outcome), and decades of coverage litigation over [[Latent Liability|latent]] exposures such as [[Asbestos]].
- **Actuarial handling.** [[Schedule P]] triangles include DCC, which correlates with loss, but exclude AO, which does not. DCC accrues through the life of a lawsuit, so it develops on its own pattern; reinsurance treaties differ on whether DCC and ECO sit within the limit, pro rata in addition to it, or outside cover. See [[Tort Law]] and [[Tort Litigation]].

> [!example]- Where the Settlement Dollar Goes {Example}
> A bodily injury claim settles for $\$900{,}000$. The plaintiff's lawyer takes one-third of the recovery and is reimbursed $\$30{,}000$ of case expenses. The insurer spent $\$110{,}000$ on defence counsel and $\$30{,}000$ on experts, plus $\$25{,}000$ on coverage counsel in a declaratory judgment action against its own insured.
>
> Classify the insurer's costs and find the share of its outlay that reaches the claimant.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{DCC} &= \$110{,}000 + \$30{,}000 \\
> > &= \$140{,}000 \\[4pt]
> > \text{AO} &= \$25{,}000 \\[4pt]
> > \text{Insurer outlay} &= \$900{,}000 + \$140{,}000 + \$25{,}000 \\
> > &= \$1{,}065{,}000 \\[4pt]
> > \text{Net to claimant} &= \tfrac{2}{3} \times \$900{,}000 - \$30{,}000 \\
> > &= \$570{,}000 \\[4pt]
> > \text{Share} &= \frac{\$570{,}000}{\$1{,}065{,}000} \\
> > &= 53.5\%
> > \end{align*}
> > $$
> >
> > Nearly half of what the insurer pays — $\$495{,}000$ — is consumed by lawyers and experts on both sides. The coverage-counsel fee is AO even though it is litigation, because it concerns *whether* the policy applies, not the defence of the claim.

> [!example]- Classifying Claim Expenses for the Annual Statement {Example}
> Classify each item as indemnity, DCC or AO: (1) outside defence counsel defending the insured; (2) staff counsel defending the insured; (3) an accident-reconstruction expert; (4) an independent adjuster's fee; (5) surveillance of the claimant; (6) counsel litigating coverage against the policyholder; (7) defending a bad-faith suit brought by the policyholder.
>
> > [!answer]-
> > - **DCC:** (1), (2) — DCC applies whether defence is internal or external — (3) and (5).
> > - **AO:** (4) adjusting fees, (6) coverage determination, and (7) the expense of a claims-related bad-faith suit.
> > - **Indemnity:** none of these; any bad-faith *award* is a separate extra-contractual loss.
> >
> > The classification matters beyond bookkeeping: items (1), (2), (3) and (5) enter the Schedule P loss-and-DCC triangles and are developed with losses, while (4), (6) and (7) are reserved outside them. Misclassifying coverage litigation as DCC distorts the DCC development pattern exactly when coverage disputes are rising.
