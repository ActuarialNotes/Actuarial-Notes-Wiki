---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:73e080ada64af464d9137e95b1230f7d6c48d4559d1f49b09a33bd81d651b7fd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Facultative Reinsurance.md
---

**Facultative Reinsurance** is reinsurance negotiated for a **single risk** — one policy or one location. The cedant offers the risk, and the reinsurer underwrites and prices it on its own and is free to accept or decline. The cover is documented in a *facultative certificate* and is either **pro rata** (a share of the policy) or **excess** (a layer above the cedant's retention).

> $$\text{Casualty XS share} = \frac{\text{ILF}\big(\min(PL,\, AP + Lim)\big) - \text{ILF}(AP)}{\text{ILF}(PL)}$$

> $$\text{Property XS share} = G\!\left(\frac{AP + Lim}{IV}\right) - G\!\left(\frac{AP}{IV}\right)$$

- $PL$ is the policy limit, $AP$ the cedant's retention (the certificate's attachment), $Lim$ the certificate limit and $IV$ the property's insured value. [[Increased Limits|ILFs]] are ratios of [[Limited Expected Value|limited expected values]]. $G$ is a property [[Exposure Curves|exposure curve]]: the share of expected loss below a given percentage of insured value. The share multiplies the policy's expected loss to give the certificate's [[Loss Cost|loss cost]].
- **Uses.** A risk too large for treaty capacity; a class or hazard the treaties exclude; an unusual risk the cedant wants a second opinion on; or protecting treaty results, since facultative cessions usually *inure* to the treaties and shrink what they see.
- **Pricing** is exposure rating of the individual risk plus underwriting judgment about it. There is no portfolio experience to rate. Clark treats facultative pricing as a variation on the treaty techniques rather than a separate method.
- **Selection runs against the reinsurer.** The cedant chooses which risks to offer, so a facultative account tends to be worse than the cedant's average. That is why the reinsurer underwrites every certificate. It also costs more to administer per premium dollar than a [[Treaty Reinsurance|treaty]].
- Pro rata facultative works like a one-policy [[Quota Share]]. Excess facultative works like a one-policy [[Excess of Loss]] layer. See [[Types of Reinsurance]].

> [!example]- Pricing a Casualty Excess Certificate with ILFs {Example}
> A general liability policy has a $\$5$ million limit, premium $\$200{,}000$ and an expected loss and ALAE ratio of $65\%$ (ALAE pro rata with loss). The cedant keeps the first $\$1$ million and buys a facultative certificate for $\$4$M xs $\$1$M. Loss-only ILFs are $\text{ILF}(1\text{M}) = 1.60$ and $\text{ILF}(5\text{M}) = 2.10$. The reinsurer allows a $20\%$ ceding commission. Find the certificate's premium, expected loss and the reinsurer's net premium.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Share} &= \frac{2.10 - 1.60}{2.10} \\
> > &= 0.2381
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Fac premium} &= 0.2381 \times \$200{,}000 \\
> > &= \$47{,}619
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Expected loss} &= 0.65 \times \$47{,}619 \\
> > &= \$30{,}952
> > \end{align*}
> > $$
> >
> > The reinsurer keeps $0.80 \times \$47{,}619 = \$38{,}095$ after commission.
> >
> > The certificate carries $80\%$ of the policy limit but only $23.8\%$ of its expected loss, because most liability losses are settled well below $\$1$ million. Premium is split in the same proportion as expected loss, so the certificate runs at the policy's own $65\%$ loss ratio. That holds only if the ILFs fit this risk.

> [!example]- Property Certificate: Pro Rata or Excess? {Example}
> A $\$10$ million building has premium $\$40{,}000$ and an expected loss ratio of $50\%$. The cedant keeps $\$2$ million. Compare the reinsurer's expected loss under (a) an $80\%$ pro rata certificate and (b) an $\$8$M xs $\$2$M excess certificate. An illustrative exposure curve gives $G(0.2) = 0.49$ and $G(1.0) = 0.93$.
>
> > [!answer]-
> > Expected loss on the building: $0.50 \times \$40{,}000 = \$20{,}000$.
> >
> > **(a) Pro rata 80%:** $0.80 \times \$20{,}000 = \$16{,}000$.
> >
> > **(b) Excess** — the layer runs from $2/10 = 20\%$ to $10/10 = 100\%$ of insured value:
> >
> > $$
> > \begin{align*}
> > \text{Share} &= G(1.0) - G(0.2) \\
> > &= 0.93 - 0.49 \\
> > &= 0.44
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Expected loss} &= 0.44 \times \$20{,}000 \\
> > &= \$8{,}800
> > \end{align*}
> > $$
> >
> > Both certificates cover the same $\$8$ million of value, but the pro rata one cedes $80\%$ of every partial loss while the excess one pays only on losses above $\$2$ million. Most property losses are partial, so the excess certificate carries a little over half the expected loss. The curve's remaining $7\%$ above $G(1.0)$ reflects exposure beyond insured value (e.g. business interruption), which neither certificate covers.
