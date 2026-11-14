---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ca6d4d89cb51cdacf287c359a82e88122348f95b35a5f36cc14f90b2178c2f67
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Commutations.md
---

![[Media/Figures/Commutations.svg|340]]

A **Commutation** is the termination of an existing reinsurance contract by agreement, in which the reinsurer pays the cedant a lump sum and is released from all future obligations under the contract. The recoverable asset leaves the cedant's balance sheet, and the underlying liability returns to it in full.

Each party values the contract by discounting the recoveries it expects, so the commutation price is approximately

> $$\text{Commutation price} \approx \text{PV(expected future recoveries)}$$

- $\text{PV(expected future recoveries)}$ is the present value of what the reinsurer is expected to pay the cedant under the contract.

The two parties hold different views of ultimate losses, different discount rates and different risk appetites, so the price is negotiated. A commutation happens where those views differ enough that the cedant's minimum acceptable price is below the reinsurer's maximum.

> [!example]- Should this cedant accept the reinsurer's commutation offer? {Example}
> A cedant holds a $\$60$ million recoverable from a reinsurer, expected to be paid over $12$ years. At the cedant's $4\%$ discount rate its present value is $\$41$ million. The reinsurer offers $\$36$ million in cash now. The reinsurer has been downgraded twice in two years, and the cedant assesses a $15\%$ probability that it fails before the recoveries are paid, with $50\%$ recovered in that event.
>
> > [!answer]-
> > - If the reinsurer survives, with probability $0.85$, the cedant receives the full $\$41$ million, worth $0.85 \times \$41\text{M} = \$34.85\text{M}$.
> > - If it fails, with probability $0.15$, the cedant receives half, worth $0.15 \times 0.50 \times \$41\text{M} = \$3.08\text{M}$.
> > - Allowing for default, the expected present value is $\$34.85\text{M} + \$3.08\text{M} = \$37.9\text{M}$.
> > - The offer of $\$36$ million is $\$1.9$ million below that, so on expected value alone the cedant would decline.
> > - The alternative to $\$36$ million certain is a $15\%$ chance of recovering only about $\$20$ million. A cedant that cannot absorb that outcome should pay for the certainty.
> > - The default probability is an estimate. At $25\%$ the expected present value falls to $\$35.9$ million, and the offer is fair.
> > - Commuting raises [[Capital Required]] and lowers the [[MCT]] ratio. A recoverable from a deteriorating reinsurer already attracts a [[Credit Risk Margin|credit risk]] charge, so the capital swing is smaller than it first appears.
> > - After commuting, all adverse development on a long-tail book is the cedant's.
> > - A defensible conclusion is to negotiate toward $\$38$ to $\$40$ million, commute if the reinsurer's credit keeps deteriorating or the cedant cannot bear the default scenario, and decline if the reinsurer stabilises.

## Reasons to commute

A cedant commutes to eliminate its credit exposure to a deteriorating reinsurer, to obtain cash now rather than recoveries over decades, to end a dispute, to simplify a run-off, or because the reinsurer offers more than the cedant's own valuation.

A reinsurer commutes to close a book and release the capital supporting it, to cap its exposure to adverse development, to exit a line or a jurisdiction, or to convert an uncertain long-tail obligation into a known payment.

## Accounting and capital effects

The effects are immediate. The [[Reinsurance Contracts Held|reinsurance asset]] is derecognised, cash is received, and the difference goes through profit or loss. The gross liability is unchanged, so [[Capital Required]] rises, because the capital credit the reinsurance provided is gone.

[[Risk Transfer]] questions attach too. A commutation on terms that unwind a contract retroactively, or one accompanied by a replacement arrangement that returns the risk, invites scrutiny of whether risk was ever transferred.

> [!trap] Judging a commutation on expected value alone
> After commutation the cedant carries the full tail, including the adverse development it had ceded. A price at or above the expected present value can still be a bad trade if the book's tail is what the cedant most needs protection from.
