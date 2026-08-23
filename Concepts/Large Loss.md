---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dec205a207136cf24e055cd21d9f83dd5f7b9cee4021c32aa57d188b46db4e28
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Large Loss.md
---

**Large Losses** (shock losses) are individual claims big enough that including them at face value would distort an experience analysis — a single claim moving a class's indicated rate by more than the underlying cost level justifies.

> $$\text{Capped Loss} = \min(X, M)$$

> $$\text{Excess Load} = \frac{\text{Expected losses above } M}{\text{Expected losses below } M}$$

- The standard treatment has three steps: **cap** each claim at a threshold $M$ for the experience analysis, **compute** an excess load from a wider base (more years, more states, industry data), and **add it back**. The rate then covers the full expected cost without being hostage to whether a shock loss happened to occur in the experience period.
- The threshold is a trade-off. A low cap removes too much real experience and makes the analysis depend heavily on the excess load; a high cap leaves the volatility in. Werner's guidance is to set $M$ where the credibility gained by capping outweighs the data lost.
- The excess load must be computed over a **long** period — a decade or more — precisely because large losses are rare. Using the same five years for both the capped experience and the excess load defeats the purpose.
- Where [[Increased Limits|ILFs]] exist, the load follows directly from them:

> $$\text{Excess Load} = \frac{\text{ILF}(U)}{\text{ILF}(M)} - 1$$

- In **reserving** the parallel treatment applies: pull large claims out of the triangle, develop the remainder with factors undistorted by shock losses, and reserve the large claims individually or with their own (much longer) pattern. Leaving a $\$2$M claim in an immature diagonal and multiplying it by a CDF of $4$ produces an $\$8$M estimate from one claim.
- Distinguish a large loss from a [[Catastrophe Loss|catastrophe]]: a large loss is one claim of unusual size, a catastrophe is many claims from one event. Both are excluded from base experience, but the loads are built differently.

![[Media/Figures/Large_Loss.svg|340]]

> [!example]- Capping and Loading {Example}
> A general liability class has a $\$500{,}000$ per-occurrence cap. Over five years the class produced $\$14{,}000{,}000$ of losses on $20{,}000$ exposures, including one claim that settled at $\$1{,}200{,}000$ and another at $\$800{,}000$. Ten years of wider data show that losses above $\$500{,}000$ have averaged $8\%$ of capped losses.
>
> Compute the pure premium.
>
> > [!answer]-
> > Cap the two large claims, removing the excess:
> >
> > $$\begin{align*}
> > \text{Excess removed} &= (\$1{,}200{,}000 - \$500{,}000) \\
> > &\quad + (\$800{,}000 - \$500{,}000) \\
> > &= \$1{,}000{,}000 \\[4pt]
> > \text{Capped losses} &= \$14{,}000{,}000 - \$1{,}000{,}000 \\
> > &= \$13{,}000{,}000
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{Capped PP} &= \frac{\$13{,}000{,}000}{20{,}000} = \$650 \\[4pt]
> > \text{Loaded PP} &= \$650 \times 1.08 = \$702
> > \end{align*}$$
> >
> > The uncapped figure would have been $\$14{,}000{,}000/20{,}000 = \$700$ — close to the answer here, but only by coincidence. Had the five years contained *no* claim over $\$500{,}000$, the uncapped pure premium would have been $\$600$ and the class would have been under-priced by $17\%$; had it contained a $\$5$M claim, over-priced by a similar margin. Capping removes that dependence on luck.

> [!example]- A Shock Loss in an Immature Triangle {Example}
> Accident year $2024$ reported losses at $12$ months are $\$4{,}500{,}000$, including a single $\$1{,}500{,}000$ claim reserved at policy limits. The selected reported CDF at $12$ months is $3.20$. Historical non-large-loss experience suggests $\$3{,}000{,}000$ of ordinary losses develop to about $\$9{,}600{,}000$.
>
> Estimate ultimate losses correctly.
>
> > [!answer]-
> > **Wrong:** develop everything.
> >
> > $$\$4{,}500{,}000 \times 3.20 = \$14{,}400{,}000$$
> >
> > This assumes the $\$1.5$M claim will grow to $\$4.8$M — impossible, since it is already at policy limits, and unjustified in any case because the CDF was built on ordinary claims.
> >
> > **Right:** separate the two.
> >
> > $$\begin{align*}
> > \text{Ordinary} &= \$3{,}000{,}000 \times 3.20 = \$9{,}600{,}000 \\
> > \text{Large claim} &= \$1{,}500{,}000 \text{ (at limits, no development)} \\[4pt]
> > \text{Expected additional large losses} &\approx \$700{,}000 \\[4pt]
> > \text{Ultimate} &= \$9{,}600{,}000 + \$1{,}500{,}000 + \$700{,}000 \\
> > &= \$11{,}800{,}000
> > \end{align*}$$
> >
> > The provision for *additional* large claims not yet reported is essential — removing the known shock loss without adding an expected-large-loss load leaves the estimate short. The two errors are opposite in sign, and doing neither adjustment is not a safe middle ground.
