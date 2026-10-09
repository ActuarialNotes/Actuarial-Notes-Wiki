---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:f028b34cb04ca2dd3f8619bc454d075e1d483a573449ca14f551d4a537ab17c0
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 pp.95-98 (PDF pp.107-110), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.3 p.32 (PDF p.38); Ch.7 p.96 (PDF p.102), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Large Loss.md
---

**Large Losses** (shock losses) are individual claims big enough that including them at face value would distort an experience analysis — a single claim moving a class's indicated rate by more than the underlying cost level justifies.

> $$\text{Capped Loss} = \min(X, M)$$

> $$\text{Excess Load} = \frac{\text{Expected losses above } M}{\text{Expected losses below } M}$$

- The standard treatment has three steps: **cap** each claim at a threshold $M$ for the experience analysis, **compute** an excess load from a longer-term view of how often such losses occur, and **add it back**. The rate then covers the full expected cost without being hostage to whether a shock loss happened to occur in the experience period.
- Ideally the threshold is the point at which losses become extraordinary and their inclusion makes rates volatile. It may be the basic limit — and then the premium in a loss ratio indication must be put on a basic-limits basis too. Otherwise Werner sets it to balance including as many losses as possible against minimizing volatility: for example at the $99$th percentile of claim sizes, or at a percentage of losses; where the size-of-loss distribution varies a lot by policy (property), as a percentage of the amount of insurance rather than a fixed amount.
- The excess load is computed over a **long** period because large losses are rare — Werner's illustrations are $10$ years for a medium-sized homeowners insurer's large fire losses and $20$ for a small personal umbrella insurer — but not so long that older data has become irrelevant. Ideally the procedure is run on losses trended to future levels, since higher layers are subject to greater inflation.
- In **reserving** the parallel treatment applies: the actuary may exclude large claims from the initial projection, then add back a case-specific projection for the reported large claims and a smoothed provision for the IBNR portion of large claims (Friedland), or build the triangles on claims limited to, say, $\$500{,}000$ or $\$1$M per occurrence. Leaving a $\$2$M claim in an immature diagonal and multiplying it by a CDF of $4$ produces an $\$8$M estimate from one claim.
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
> Accident year $2024$ reported losses at $12$ months are $\$4{,}500{,}000$, including a single $\$1{,}500{,}000$ claim reserved at policy limits. The selected reported CDF at $12$ months is $3.20$, built on ordinary (non-large) claims. A smoothed provision for large claims not yet reported, from the long-term large-loss experience, is $\$700{,}000$.
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
