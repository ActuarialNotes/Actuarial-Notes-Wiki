---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:736efc01805bfc99d71272a9ec0191ca00dac0f02461152b3244e30a21dd76a3
  sources: []
  open_findings: 0
  log: .verify/Concepts/Credibility.md
---

**Credibility** $Z$ is the weight given to a body of observed experience when it is blended with a broader estimate — the [[Complement of Credibility|complement]] — to produce an estimate more accurate than either alone.

> $$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$

> $$Z = \sqrt{\frac{n}{n_{\text{full}}}} \qquad \text{(limited fluctuation)}$$

> $$Z = \frac{n}{n + K} \qquad \text{(Bühlmann)}$$

**Limited fluctuation (classical) credibility** asks how much data is needed for the observation to be stable within tolerance $k$ with probability $p$:

> $$n_{\text{full}} = \left(\frac{z_{(1+p)/2}}{k}\right)^{2}$$

- For pure **frequency** with Poisson claim counts, $p = 90\%$ and $k = \pm 5\%$ gives the standard $n_{\text{full}} = (1.645/0.05)^2 = 1{,}082$ claims. Adding severity variation raises the standard to $1{,}082 \times (1 + \text{CV}_S^2)$.
- Partial credibility uses the **square root rule**, $Z = \sqrt{n / n_{\text{full}}}$, capped at $1$ — a class with a quarter of the required claims gets $Z = 0.50$.

**Bühlmann (greatest accuracy) credibility** derives $Z$ from the variance structure rather than a tolerance:

- $K = \text{EPV}/\text{VHM}$ — expected value of the process variance over the variance of the hypothetical means. Credibility rises when risks genuinely differ from one another (large VHM) and falls when individual results are noisy (large EPV).
- Bühlmann has the better theoretical footing; limited fluctuation persists because it needs only a claim count, and $1{,}082$ is embedded in decades of filings.

Further points:

- Credibility governs the **homogeneity trade-off**: splitting a book finer improves [[Homogeneity|homogeneity]] but shrinks $n$ in each cell, lowering $Z$ and handing the answer to the complement.
- The choice of complement matters most exactly when $Z$ is low — which is when actuaries are most tempted to stop thinking about it.
- In reserving, credibility appears explicitly in the [[Bornhuetter-Ferguson Method|BF method]], where $Z = 1/\text{CDF}$: the reported portion of an accident year is its own experience and the unreported portion is priced from the a priori.

![[Media/Figures/Credibility.svg|340]]

> [!example]- Partial Credibility on a Class Relativity {Example}
> A workers compensation class has $75$ claims against a full-credibility standard of $1{,}082$. Its indicated relativity is $1.25$; the current (manual) relativity is $1.00$.
>
> Compute the credibility-weighted relativity.
>
> > [!answer]-
> > $$\begin{align*}
> > Z &= \sqrt{\frac{75}{1{,}082}} \\
> > &= \sqrt{0.0693} \\
> > &= 0.263
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{Weighted relativity} &= 0.263(1.25) + 0.737(1.00) \\
> > &= 1.066
> > \end{align*}$$
> >
> > The class's own data says it costs $25\%$ more than base; the credibility procedure moves only $6.6$ points of that into the rate. With $75$ claims, a $1.25$ indication is well within the range that random fluctuation alone could produce.
> >
> > Note the complement here is the *current* relativity, which embeds whatever was believed last year. Where the current relativity is itself stale, a better complement is the statewide or countrywide relativity for the same class — see [[Complement of Credibility]].

> [!example]- Limited Fluctuation vs. Bühlmann on the Same Risk {Example}
> A commercial account has $n = 400$ claims. The full credibility standard is $1{,}082$ claims. A Bühlmann analysis of the class estimates $\text{EPV} = 2{,}500$ and $\text{VHM} = 4$, giving $K = 625$.
>
> Compare the two credibility values and comment.
>
> > [!answer]-
> > $$\begin{align*}
> > Z_{\text{classical}} &= \sqrt{\frac{400}{1{,}082}} = 0.608 \\[6pt]
> > Z_{\text{Bühlmann}} &= \frac{400}{400 + 625} = 0.390
> > \end{align*}$$
> >
> > The classical rule gives this account $61\%$ weight; Bühlmann gives $39\%$.
> >
> > The difference is that Bühlmann asks a question the classical rule does not: **how different are the risks in this class from each other?** Here $K = 625$ is large because process variance dwarfs the between-risk variance — the risks are broadly alike and their individual results are noisy. In that situation an account's own experience says relatively little about its expected cost, however much of it there is, and it deserves less weight than a fixed claim-count standard implies.
> >
> > Where risks genuinely differ (large VHM, small $K$), Bühlmann gives **more** credibility than the classical rule. The classical standard cannot distinguish the two cases because it never looks at the class's variance structure.
