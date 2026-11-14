---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7befc84aff73efa8782bc48660eee7a16488e0c0f32682fc8512af6f2f31750b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Adverse Selection.md
---

![[Media/Figures/Adverse_Selection.svg|340]]

**Adverse Selection** is the tendency for those who know they are worse-than-average risks to buy more insurance, and better-than-average risks to buy less, when the insurer cannot distinguish between them. It arises from information asymmetry, because the buyer knows their own risk better than the seller.

An insurer that cannot tell its risks apart charges the average expected loss. Priced at that average, a voluntary market unravels in a spiral:

1. The price is set at the population average.
2. Low risks find the price poor value and leave.
3. The remaining pool is worse, so the price rises.
4. More of the remaining low risks leave, and the cycle repeats.

The end point is a market serving only the worst risks at a price only they will pay.

> [!example]- What happens to this voluntary insurance market? {Example}
> A population of $10{,}000$ has two equal groups: low risks with expected loss $\$200$ and high risks with expected loss $\$1{,}000$. The insurer cannot tell them apart and charges the average. Buyers purchase only if the premium is at most $1.3$ times their own expected loss.
>
> > [!answer]-
> > - The average expected loss is $\tfrac{1}{2}(\$200) + \tfrac{1}{2}(\$1{,}000) = \$600$.
> > - Low risks will pay at most $1.3 \times \$200 = \$260$, so they do not buy.
> > - High risks will pay up to $1.3 \times \$1{,}000 = \$1{,}300$, so they buy.
> > - The pool is now all high risks, so the required premium is $\$1{,}000$, which high risks still pay.
> > - The market settles as a market for high risks at a high price, and half the population is uninsured.

## Defences against adverse selection

1. **Risk classification**: price each risk to its expected loss, so nobody is overcharged ([[Risk Classification Restrictions|risk classification]]).
2. **Underwriting**: medical or inspection requirements, waiting periods and pre-existing condition exclusions.
3. **Compulsion**: mandatory purchase removes the choice to leave.
4. **Group pooling**: pool by group rather than by individual.

In the example above, classification charges $\$200$ and $\$1{,}000$, both groups buy, and everyone is insured. Compulsion at $\$600$ also insures everyone, but each low risk subsidises a high risk by $\$400$.

Adverse selection is the principal justification for compulsory government programs. [[Employment Insurance]], [[Health Care Insurance]] and [[Workers Compensation Insurance]] are universal because a voluntary version would attract only the high risks. It also explains why [[Flood Insurance|flood]] has historically been unwritable, since only those in the floodplain want it.

## Adverse selection from rating restrictions

Every classification restriction reintroduces adverse selection by forcing a single price across risks the insurer knows differ. The cost is quantified in [[Risk Classification Restrictions]], and it is the standard argument against banning a predictive variable.

> [!trap] Confusing adverse selection with moral hazard
> Adverse selection is about *who buys*, a selection effect present before the contract. [[Moral Hazard]] is about how the insured behaves *after* being insured. Name the effect by when it acts: before the contract or after it.
