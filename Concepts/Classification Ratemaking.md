---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ef17a0c755a3521e32371bcfd7c6afde31b0ec1445338af4516b686985b34b7a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Classification Ratemaking.md
---

**Classification Ratemaking** is the segmentation of a book into rating classes and the derivation of **relativities** — the factors by which each class's rate differs from the base class — so that each risk pays according to its own expected cost.

> $$\text{Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$

> $$\text{Rate}_i = \text{Base Rate} \times \prod_k R_{i,k}$$

**Why classify at all.** In a competitive market an insurer that charges one average rate to a heterogeneous group loses the better risks to competitors that price them properly, and retains the worse ones — the **adverse selection spiral**. Classification is what keeps the pool viable, and [[Principles of Ratemaking|Principle 3]] requires the rate to reflect the individual risk transfer.

**Werner's criteria for a rating variable:**

- **Actuarial** — statistically significant, accurate, [[Homogeneity|homogeneous]] within class, and [[Credibility|credible]].
- **Operational** — objective, inexpensive to obtain and verify, not manipulable by the insured.
- **Social** — privacy, causality, controllability and affordability; these are where public and regulatory objections arise.
- **Legal** — some variables are prohibited outright in some jurisdictions.

**Univariate vs. multivariate.**

- A **univariate** (one-way) pure premium or loss ratio analysis attributes to a variable the effect of everything correlated with it. If young drivers also drive older cars, a one-way age relativity contains part of the vehicle-age effect, and rating both double-counts.
- **Minimum bias** procedures were the historical bridge; modern practice uses a [[Generalized Linear Model|GLM]], which estimates all variables simultaneously and reports each net of the others.
- The loss ratio method for relativities has an advantage over the pure premium method: because its denominator is premium, it is already adjusted for the *other* rating variables in force, so it measures the residual effect.

**Off-balance.** Relativity changes almost always change the average rate. The base rate must be adjusted so that the combined effect equals the intended [[Overall Rate Level Indication|overall indication]] — see [[Rate Change]].

![[Media/Figures/Classification_Ratemaking.svg|340]]

> [!example]- Class Relativity from Pure Premiums {Example}
> Base class: $10{,}000$ exposures, $\$2{,}000{,}000$ losses. Class A: $5{,}000$ exposures, $\$1{,}500{,}000$ losses. The target loss ratio is $60\%$.
>
> Compute the relativity and the class rates.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{PP}_{\text{base}} &= \frac{\$2{,}000{,}000}{10{,}000} = \$200 \\[4pt]
> > \text{PP}_{A} &= \frac{\$1{,}500{,}000}{5{,}000} = \$300 \\[6pt]
> > \text{Relativity}_A &= \frac{\$300}{\$200} = 1.50
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{Base rate} &= \frac{\$200}{0.60} = \$333.33 \\[4pt]
> > \text{Class A rate} &= \$333.33 \times 1.50 = \$500.00
> > \end{align*}$$
> >
> > Two checks before this becomes a filing: is Class A's $5{,}000$ exposures enough to be credible at $1.50$, and is the difference *caused* by the class variable or by something correlated with it that is also being rated?

> [!example]- Univariate Analysis Double-Counts {Example}
> An insurer rates on two variables. One-way pure premiums:
>
> | | Pure premium | Relativity |
> |---|---|---|
> | Youthful driver | $\$900$ | $1.80$ |
> | Adult driver | $\$500$ | $1.00$ |
> | Old vehicle | $\$780$ | $1.56$ |
> | New vehicle | $\$500$ | $1.00$ |
>
> A GLM run on the same data gives a youthful relativity of $1.55$ and an old-vehicle relativity of $1.20$. Explain the gap and its consequence.
>
> > [!answer]-
> > The two variables are **correlated**: youthful drivers disproportionately drive old vehicles. The one-way youthful figure therefore contains part of the old-vehicle effect, and the one-way old-vehicle figure contains part of the youthful effect. Each is right about its own cell and wrong about the variable's own contribution.
> >
> > Rating a youthful driver in an old vehicle:
> >
> > $$\begin{align*}
> > \text{Univariate} &= 1.80 \times 1.56 = 2.81 \\
> > \text{GLM} &= 1.55 \times 1.20 = 1.86
> > \end{align*}$$
> >
> > The univariate structure over-charges that cell by $51\%$ — and, because the relativities are balanced back to the overall level, correspondingly under-charges adult drivers in new vehicles.
> >
> > The market consequence is predictable: a competitor using the multivariate result quotes the youthful/old-vehicle segment far cheaper and takes it, while sending its own adult/new-vehicle business here. The insurer keeps exactly the risks it has under-priced. Multivariate methods are not a refinement; on a correlated book they are a competitive necessity.
