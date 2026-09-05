---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:30ff3641f37799bb3c9f1caad33bff578ed56449281ade1be89bdce75a58e191
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Commutations.md
---

**A Commutation** is the termination of an existing reinsurance contract by agreement, in which the reinsurer pays the cedant a lump sum and is thereby **released from all future obligations** under the contract. The recoverable asset disappears from the cedant's balance sheet and the underlying liability returns to it in full.

> $$\text{Commutation price} \approx \text{PV(expected future recoveries)} \pm \text{negotiation}$$

- **Why a cedant commutes:** to eliminate credit exposure to a deteriorating reinsurer; to obtain cash now rather than recoveries over decades; to end a dispute; to simplify a run-off; or because the reinsurer offers a price above the cedant's own valuation.
- **Why a reinsurer commutes:** to close a book and release the capital supporting it; to cap exposure to adverse development; to exit a line or a jurisdiction; and to convert an uncertain long-tail obligation into a known payment.
- **The pricing is a present-value negotiation** between two parties with different views of ultimate losses, different discount rates and different risk appetites. A commutation happens precisely where those views differ enough to create a zone of agreement — the cedant's minimum acceptable price being below the reinsurer's maximum.
- **Accounting and capital effects are immediate.** The [[Reinsurance Contracts Held|reinsurance asset]] is derecognised, cash is received, and the difference goes through profit or loss. The gross liability is unchanged, so **[[Capital Required]] rises** — commutation reverses the capital credit the reinsurance was providing.
- **The risk transferred back is real.** After commutation the cedant carries the full tail, including the possibility of adverse development it had previously ceded. A commutation that looks favourable on the expected value can be badly unfavourable in the tail.
- **[[Risk Transfer]] considerations attach.** A commutation negotiated on terms that effectively unwind a contract retroactively, or one accompanied by a replacement arrangement that returns the risk, invites scrutiny about whether risk was ever genuinely transferred.

> [!example]- Should the Cedant Commute? {Example}
> A cedant holds a $\$60$ million recoverable from a reinsurer, expected to be paid over $12$ years. The cedant's discount rate is $4\%$, giving a present value of $\$41$ million. The reinsurer offers $\$36$ million in cash now. The reinsurer's financial strength rating has been downgraded twice in two years, and the cedant assesses a $15\%$ probability of the reinsurer failing before the recoveries are paid, with an expected recovery of $50\%$ in that event.
>
> Evaluate.
>
> > [!answer]-
> > **Expected present value allowing for default:**
> >
> > $$\begin{align*}
> > \text{EPV} &= 0.85(\$41\text{M}) + 0.15(0.50 \times \$41\text{M}) \\
> > &= \$34.85\text{M} + \$3.08\text{M} \\
> > &= \$37.9\text{M}
> > \end{align*}$$
> >
> > **The offer of $\$36$ million is $\$1.9$ million below** the credit-adjusted expected value — so on expectation alone, decline.
> >
> > **But the expected value is not the whole decision:**
> >
> > - **Variance.** The alternative to $\$36$ million certain is a distribution with a $15\%$ chance of recovering roughly $\$20$ million. A cedant unable to absorb that outcome should pay for the certainty.
> > - **The default probability is an estimate.** Two downgrades in two years suggests deterioration, and the $15\%$ could easily be $25\%$ — at which point the EPV falls to $\$35.9$ million and the offer is fair.
> > - **Capital.** Commuting removes the recoverable, so [[Capital Required]] rises and the [[MCT]] ratio falls. Against that, an uncollateralised recoverable from a deteriorating reinsurer already attracts an unfavourable [[Credit Risk Margin|credit risk]] charge, so the capital swing is smaller than it first appears.
> > - **Adverse development.** After commuting, all future deterioration on the underlying claims is the cedant's. If the book is long-tail liability with genuine tail uncertainty, that transfer back is worth more than $\$1.9$ million.
> >
> > **A defensible conclusion:** negotiate toward $\$38$–$\$40$ million; commute if the credit assessment is deteriorating or the cedant cannot bear the default scenario; decline if the reinsurer stabilises and the tail risk is what the cedant most wants to keep ceded.
