---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5655451e99425e68e9cfe08bc5755fa2a7a00eeb37fdce1c9ffb6afcc7f54db7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Litigation Costs.md
---

**Litigation Costs** are the costs of resolving liability claims through the civil justice system over and above the compensation that reaches the injured party. They include the insurer's defence and cost-containment spending, the plaintiff's own attorney fees, coverage disputes between insurer and policyholder, and the extra-contractual exposure created when a claim is mishandled.

The insurer's cost of a claim is

> $$\text{Loss and LAE} = \text{Indemnity} + \text{DCC} + \text{AO}$$

- $\text{Indemnity}$ is the amount paid to the claimant.
- $\text{DCC}$ and $\text{AO}$ are the two statutory classes of loss adjustment expense, defined below.

## The statutory split under SSAP No. 55

*Defense and cost containment* (DCC) covers defence, litigation and medical cost containment, whether in-house or external: surveillance, litigation management, experts, and attorney fees incurred under a [[Duty to Defend|duty to defend]].

*Adjusting and other* (AO) is the rest of LAE. It expressly includes attorney fees to determine coverage, including litigation between the insurer and its policyholder, and the expense of claims-related lawsuits such as extra-contractual obligation and bad-faith suits. Coverage litigation is therefore AO, not DCC. The split parallels [[Allocated Loss Adjustment Expense|ALAE]] and [[Unallocated Loss Adjustment Expenses ULAE|ULAE]] but is not identical to it.

> [!example]- Is each of these claim expenses indemnity, DCC or AO? {Example}
> 1. Outside defence counsel defending the insured.
> 2. Staff counsel defending the insured.
> 3. An accident-reconstruction expert.
> 4. An independent adjuster's fee.
> 5. Surveillance of the claimant.
> 6. Counsel litigating coverage against the policyholder.
> 7. Defending a bad-faith suit brought by the policyholder.
>
> > [!answer]-
> > - Items 1, 2, 3 and 5 are DCC. DCC applies whether the defence is internal or external.
> > - Items 4, 6 and 7 are AO: an adjusting fee, coverage determination, and the expense of a claims-related bad-faith suit.
> > - None is indemnity. Any bad-faith award is a separate extra-contractual loss.
> > - Items 1, 2, 3 and 5 enter the Schedule P loss-and-DCC triangles and are developed with losses, while 4, 6 and 7 are reserved outside them.

[[Schedule P]] triangles include DCC, which correlates with loss, but exclude AO, which does not. DCC accrues through the life of a lawsuit, so it develops on its own pattern. Reinsurance treaties differ on whether DCC and ECO sit within the limit, pro rata in addition to it, or outside cover.

## Plaintiff-side costs

Under the *American rule* each party pays its own lawyers, so a contingency fee comes out of the award and settlements are grossed up to leave the claimant whole. The amount that reaches the claimant is

> $$\text{Net to claimant} = (1 - c) \times \text{Indemnity} - E$$

- $c$ is the plaintiff attorney's contingency share, typically around one-third, taken from the gross recovery.
- $E$ is the case expenses counsel recovers from the award.

Fee-shifting statutes reverse the American rule. Florida's one-way attorney-fee statute for insureds suing their insurers, repealed for most insurance disputes in 2023, made even small disputed claims expensive to contest.

> [!example]- What share of the insurer's outlay on this claim reaches the claimant? {Example}
> A bodily injury claim settles for $\$900{,}000$. The plaintiff's lawyer takes one-third of the recovery and is reimbursed $\$30{,}000$ of case expenses. The insurer spent $\$110{,}000$ on defence counsel and $\$30{,}000$ on experts, plus $\$25{,}000$ on coverage counsel in a declaratory judgment action against its own insured.
>
> > [!answer]-
> > - Defence counsel and experts are DCC, $\$110{,}000 + \$30{,}000 = \$140{,}000$.
> > - The coverage-counsel fee is AO, $\$25{,}000$, because it concerns whether the policy applies, not the defence of the claim.
> > - The insurer's outlay is $\$900{,}000 + \$140{,}000 + \$25{,}000 = \$1{,}065{,}000$.
> > - The claimant nets $\tfrac{2}{3} \times \$900{,}000 - \$30{,}000 = \$570{,}000$.
> > - The share reaching the claimant is $\$570{,}000/\$1{,}065{,}000 = 53.5\%$, so $\$495{,}000$ goes to lawyers and experts on both sides.

## Extra-contractual obligations

Extra-contractual obligations (ECO) and excess-of-policy-limits (XPL) losses are bad-faith and failure-to-settle judgments. They sit outside the policy limit and outside the rate. SSAP No. 55 requires insurers to disclose the amount and number of ECO and bad-faith claims paid.

## Trends in litigation costs

Costs are pushed up by higher attorney involvement, litigation funding and advertising, longer times to trial, [[Nuclear Verdicts|nuclear verdicts]] raising settlement values, [[Class Action|class action]] defence (costly whatever the outcome), and decades of coverage litigation over [[Latent Liability|latent]] exposures such as [[Asbestos|asbestos]]. See also [[Tort Law]] and [[Tort Litigation]].

> [!trap] Coverage litigation classified as DCC
> Attorney fees to determine coverage, including a suit against the insurer's own policyholder, are AO, even though they are litigation. Misclassifying them as DCC distorts the DCC development pattern exactly when coverage disputes are rising.
