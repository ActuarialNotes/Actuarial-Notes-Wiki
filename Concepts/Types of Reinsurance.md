---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1723c80b337fa7ef3855d8429639f9b7b421a8dd56714e203d3c7120585ead30
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Types of Reinsurance.md
---

**Types of Reinsurance** are classified on two independent axes: how the cover is **placed** — [[Treaty Reinsurance|treaty]] (a whole portfolio, ceded automatically) or [[Facultative Reinsurance|facultative]] (one risk, underwritten on its own) — and how losses are **shared** — *proportional* (the reinsurer takes the same share of premium and of loss) or *non-proportional* (the reinsurer pays only the part of a loss above a retention).

> $$\text{Ceded}_{\text{QS}} = a\,X$$

> $$\text{Ceded}_{\text{SS}} = \frac{\min\left(\max(V - R,\,0),\; N R\right)}{V}\,X$$

> $$\text{Ceded}_{\text{XS}} = \min\left(\max(X - R,\,0),\; L\right)$$

> $$\text{Ceded}_{\text{Agg}} = \min\left(\max(S - A,\,0),\; L_A\right)$$

- $X$ is one loss (on a risk, a policy or an occurrence); $a$ the quota share cession; $V$ the risk's insured value; $R$ the retention (the retained *line* for surplus share); $N$ the number of lines; $L$ the layer limit; $S$ the aggregate loss for the period; $A$ and $L_A$ the aggregate retention and limit.
- **Proportional:** [[Quota Share]] (the same percentage of every policy) and [[Surplus Share]] (a percentage that rises with the risk's size), each with a ceding commission for the cedant's expenses. **Non-proportional:** [[Excess of Loss]] per risk, per occurrence (casualty, including high [[Clash Cover|clash]] layers, and property [[Catastrophe Loss|catastrophe]]), and [[Aggregate Excess of Loss]] (stop loss, or an aggregate deductible on a layer).
- **The two axes cross.** A treaty can be quota share, surplus share or excess; a facultative certificate can be pro rata or excess. Order matters too: surplus share, facultative and per-risk covers normally *inure* to the catastrophe cover, which applies to what the cedant has left.
- **Function (Exam 7).** Capacity to write larger risks than surplus supports; stabilisation of results; catastrophe protection; surplus relief, since a proportional cession's ceding commission recovers acquisition cost on the unearned premium; access to the reinsurer's underwriting expertise; and a way out of a line.
- **Loss cost (Exam 9).** Proportional contracts are priced as a loss ratio on ceded premium; excess contracts as a [[Loss Cost|loss cost]] on subject premium, from experience and exposure rating; aggregate contracts need the full aggregate loss distribution. [[Reinsurance Contract Provisions]] then change the result — see [[Reinsurance Pricing]].
- **Statements and reserves (Exams 6C, 7).** Proportional cessions scale with gross and develop like it. Excess cessions carry little premium but sit on large, late-reported claims, so estimate gross and ceded separately ([[Reinsurance Reserving]]). In Canada, under [[IFRS 17]], every type is a [[Reinsurance Contracts Held|reinsurance contract held]], a separate asset never netted against gross. A commission that does not depend on claims reduces the premium paid; one that varies with claims (sliding scale, profit commission) is part of expected recoveries. [[MCT]] credit depends on [[Registered Reinsurance|registered]] or [[Unregistered Reinsurance|unregistered]] status. A structure that fails [[Risk Transfer]] is [[Deposit Accounting|deposit-accounted]].

> [!example]- One Fire Loss Under Three Treaty Types {Example}
> A commercial property with insured value $\$2{,}000{,}000$ suffers a fire. Compute the ceded amount for a loss of (i) $\$600{,}000$ and (ii) $\$100{,}000$ under each of: (a) a $30\%$ quota share; (b) a surplus share with a $\$250{,}000$ line and $6$ lines; (c) a $\$750{,}000$ xs $\$250{,}000$ per-risk excess.
>
> > [!answer]-
> > **Surplus share cession** for this risk (capacity $6 \times \$250\text{K} = \$1{,}500\text{K}$):
> >
> > $$
> > \begin{align*}
> > s &= \frac{\min(2{,}000 - 250,\ 1{,}500)}{2{,}000} \\
> > &= \frac{1{,}500}{2{,}000} \\
> > &= 75\%
> > \end{align*}
> > $$
> >
> > **(i) Loss of $\$600{,}000$:**
> >
> > - Quota share: $0.30 \times \$600\text{K} = \$180\text{K}$.
> > - Surplus share: $0.75 \times \$600\text{K} = \$450\text{K}$. The cedant keeps $25\%$ — its $12.5\%$ line plus the $12.5\%$ of value above the treaty's capacity, unless it buys facultative cover for that top slice.
> > - Excess: $\min(\max(600 - 250, 0), 750) = \$350\text{K}$.
> >
> > **(ii) Loss of $\$100{,}000$:**
> >
> > - Quota share: $\$30\text{K}$.
> > - Surplus share: $0.75 \times \$100\text{K} = \$75\text{K}$.
> > - Excess: $\$0$, since the loss is below the retention.
> >
> > The small loss is the telling case: surplus share is **not** excess insurance. Once the risk's share is fixed by its size, the reinsurer pays that share of every loss on it, however small. Only the excess treaty cedes nothing below $\$250{,}000$.

> [!example]- Matching the Type to the Need {Example}
> Recommend a type of reinsurance for each cedant: (1) a fast-growing regional insurer whose premium-to-surplus ratio is above its target; (2) a commercial property writer with a few very large buildings in a book of small ones; (3) a coastal homeowners writer whose modelled 1-in-250 hurricane loss exceeds its risk tolerance; (4) a writer worried about a year of many medium-sized losses, none large enough to reach a per-risk layer; (5) an insurer asked to write one unusual chemical plant that its treaties exclude.
>
> > [!answer]-
> > 1. **Quota share.** It cedes premium and unearned premium, and the ceding commission recovers the acquisition cost already paid, so net premium falls and surplus rises: surplus relief and capacity.
> > 2. **Surplus share** (or a per-risk excess). The surplus share cedes a large percentage of the large risks and none of the small ones, which evens out the net amount at risk per building.
> > 3. **Catastrophe excess of loss** per occurrence, sized to the modelled loss, with [[Reinstatements]] so a second event is also covered.
> > 4. **Aggregate excess of loss** (stop loss), which responds to the year's total. The attachment must be reachable, or the contract fails risk transfer.
> > 5. **Facultative**, pro rata or excess, underwritten by the reinsurer on that plant alone.
