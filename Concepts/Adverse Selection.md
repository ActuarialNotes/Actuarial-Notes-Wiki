---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6bf647678305afedf26f628410ad0de8bc833181d3fefd0e18d339f1a800f789
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Adverse Selection.md
---

**Adverse Selection** is the tendency for those who know they are worse-than-average risks to buy more insurance, and better-than-average risks to buy less, when the insurer cannot distinguish between them. It arises from **information asymmetry** — the buyer knows their own risk better than the seller — and it is the mechanism that unravels a voluntary insurance market priced at an average rate.

> $$\text{Price} = E[\text{Loss} \mid \text{purchase}] \; > \; E[\text{Loss} \mid \text{population}]$$

- **The death spiral.** Price at the population average; low risks find the price poor value and leave; the remaining pool is worse, so the price rises; more of the remaining low risks leave; repeat. The endpoint is a market serving only the worst risks at a price only they will pay.
- **Defences:** [[Risk Classification Restrictions|risk classification]] (price to the risk, so nobody is overcharged), underwriting and medical or inspection requirements, waiting periods and pre-existing condition exclusions, **compulsion** (mandatory purchase removes the choice to leave), and **pooling by group** rather than individual.
- **Regulation can cause it.** Every classification restriction reintroduces adverse selection by forcing a single price across risks the insurer knows differ — the cost quantified in [[Risk Classification Restrictions]]. This is the standard argument against banning a predictive variable.
- **Distinguish from [[Moral Hazard]].** Adverse selection is about *who buys* — a selection effect present before the contract. Moral hazard is about *how the insured behaves after* being insured. Confusing them is a common exam error.
- Adverse selection is the principal justification for **compulsory** government programs: [[Employment Insurance]], [[Health Care Insurance]] and [[Workers Compensation Insurance]] are all universal precisely because a voluntary version would attract only the high risks. It also explains why [[Flood Insurance|flood]] has historically been unwritable — only those in the floodplain want it.

> [!example]- Unravelling a Voluntary Pool {Example}
> A population of $10{,}000$ has two equal groups: low risks with expected loss $\$200$ and high risks with expected loss $\$1{,}000$. The insurer cannot tell them apart and charges the average. Buyers purchase only if the premium is at most $1.3$ times their own expected loss.
>
> Trace the market.
>
> > [!answer]-
> > **Round 1.** Average expected loss is
> >
> > $$\tfrac{1}{2}(\$200) + \tfrac{1}{2}(\$1{,}000) = \$600$$
> >
> > Low risks will pay at most $1.3(\$200) = \$260$, so they do not buy. High risks will pay up to $1.3(\$1{,}000) = \$1{,}300$, so they do.
> >
> > **Round 2.** The pool is now entirely high risks, so the required premium is $\$1{,}000$. High risks still buy at $\$1{,}000$, so the market stabilises — but only as a market for high risks at a high price. Half the population is uninsured, and the pooling benefit of insurance has been destroyed.
> >
> > **What restores the market:**
> >
> > - **Classification.** Charge $\$200$ and $\$1{,}000$ respectively; both groups buy; everyone is insured. This is the efficiency argument for risk-based pricing.
> > - **Compulsion.** Require purchase at $\$600$; both groups buy; low risks subsidise high risks by $\$400$ each. Everyone is insured, but the cross-subsidy is real and should be stated as such.
> > - **Do nothing** and accept that half the population is uninsured.
> >
> > Every Canadian government insurance program in Section B is an instance of the second option, adopted because the first was politically or practically unavailable.
