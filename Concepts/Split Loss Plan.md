---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0540cb8b9a562cc859bb4f7a2af6ef2e89fa7553d8da6fa13b0e4e87aed67797
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Split Loss Plan.md
---

A **Split Loss Plan** is an [[Experience Rating|experience rating]] plan that splits each claim at a split point into a **primary** part (up to the split) and an **excess** part (above it). Each part is compared with its own expected value and given its own [[Credibility|credibility]], and the primary part ordinarily gets much more weight than the excess. The NCCI workers compensation experience rating plan is the standard example.

> $$A_p = \sum_i \min(X_i,\ s)$$

> $$A_e = \sum_i \max(X_i - s,\ 0)$$

> $$M = 1 + Z_p\,\frac{A_p - E_p}{E} + Z_e\,\frac{A_e - E_e}{E}$$

> $$M = \frac{A_p + wA_e + (1 - w)E_e + B}{E + B}$$

- $X_i$ are the risk's claims, $s$ the split point, $A_p$ and $A_e$ its actual primary and excess losses, $E_p$ and $E_e$ their expected values with $E = E_p + E_e$, and $Z_p$ and $Z_e$ their credibilities. The third formula rearranges $M = [Z_pA_p + (1 - Z_p)E_p + Z_eA_e + (1 - Z_e)E_e]/E$, a separate credibility weighting for each layer. The fourth is NCCI's equivalent form, with an excess loss **weighting factor** $w$ and a **ballast** $B$; matching terms gives $Z_p = E/(E + B)$ and $Z_e = wE/(E + B)$, so $w = Z_e/Z_p$.
- **Primary means frequency, excess means severity.** With a low split point, primary losses are capped from above, so actual primary losses can only exceed expected if there were more claims than expected — not because of one large claim. The excess layer can only run well over its expected value if claims were more severe than expected.
- **Why primary losses get more weight.** Loss distributions are skewed with heavy tails, so the most predictive estimate would credibility-weight something like the log of the loss amount. A split plan approximates that linearly: a compromise between simplicity and precision. For workers compensation it has proved empirically better than a total or limited loss plan. It separates claim count uncertainty — the parameter risk, driven by many small medical-only and temporary total claims — from severity uncertainty — the process risk, driven by relatively few but influential major permanent partial, permanent total and fatal claims.
- A plan that simply caps each claim at a maximum single loss is the limiting case $Z_e = 0$: only the capped losses count. Split plans still use minimum and maximum mods, and their credibilities still grow with the size of the risk ([[Individual Risk Rating]]).

> [!example]- Computing a Split-Plan Mod {Example}
> A risk has expected losses of $E = \$120{,}000$: $E_p = \$48{,}000$ primary and $E_e = \$72{,}000$ excess of a $\$10{,}000$ split point. The plan's credibilities for a risk of this size are $Z_p = 0.60$ and $Z_e = 0.15$. The experience period's claims are $\$2{,}500$, $\$4{,}000$, $\$7{,}500$, $\$9{,}000$, $\$12{,}000$, $\$15{,}000$, $\$25{,}000$ and $\$60{,}000$.
>
> 1. Split the losses and compute the mod.
> 2. Find the ballast and weighting factor that give the same mod in NCCI's form, and confirm it.
>
> > [!answer]-
> > **1.** Each claim contributes at most $\$10{,}000$ to primary; the rest is excess.
> >
> > $$
> > \begin{align*}
> > A_p &= 2{,}500 + 4{,}000 + 7{,}500 + 9{,}000 + 4(10{,}000) \\
> > &= 63{,}000 \\[4pt]
> > A_e &= 2{,}000 + 5{,}000 + 15{,}000 + 50{,}000 \\
> > &= 72{,}000 \\[6pt]
> > M &= 1 + 0.60\,\frac{63{,}000 - 48{,}000}{120{,}000} + 0.15\,\frac{72{,}000 - 72{,}000}{120{,}000} \\
> > &= 1 + 0.075 + 0 \\
> > &= 1.075
> > \end{align*}
> > $$
> >
> > **2.** From $Z_p = E/(E + B)$ and $w = Z_e/Z_p$:
> >
> > $$
> > \begin{align*}
> > B &= \frac{120{,}000(1 - 0.60)}{0.60} \\
> > &= 80{,}000 \\[4pt]
> > w &= \frac{0.15}{0.60} \\
> > &= 0.25 \\[6pt]
> > M &= \frac{63{,}000 + 0.25(72{,}000) + 0.75(72{,}000) + 80{,}000}{120{,}000 + 80{,}000} \\
> > &= \frac{215{,}000}{200{,}000} \\
> > &= 1.075
> > \end{align*}
> > $$
> >
> > The whole $7.5\%$ debit comes from the primary layer. Excess losses came in exactly as expected; primary losses ran $\$15{,}000$ over, which means more claims than a risk of this size should have.

> [!example]- Same Total Loss, Different Mods {Example}
> Two risks have the expectations and credibilities of the previous example, and each reports $\$135{,}000$ of losses. Risk A had many moderate claims: $A_p = \$90{,}000$ and $A_e = \$45{,}000$. Risk B had one very large claim: $A_p = \$40{,}000$ and $A_e = \$95{,}000$.
>
> Compute both mods under the split plan and under a total-loss plan with $Z = 0.30$, and explain which plan better reflects future loss potential.
>
> > [!answer]-
> > **Split plan:**
> >
> > $$
> > \begin{align*}
> > M_A &= 1 + 0.60\,\frac{42{,}000}{120{,}000} + 0.15\,\frac{-27{,}000}{120{,}000} \\
> > &= 1 + 0.2100 - 0.03375 \\
> > &= 1.176 \\[6pt]
> > M_B &= 1 + 0.60\,\frac{-8{,}000}{120{,}000} + 0.15\,\frac{23{,}000}{120{,}000} \\
> > &= 1 - 0.0400 + 0.02875 \\
> > &= 0.989
> > \end{align*}
> > $$
> >
> > **Total-loss plan** — the same for both:
> >
> > $$
> > \begin{align*}
> > M &= 1 + 0.30\,\frac{135{,}000 - 120{,}000}{120{,}000} \\
> > &= 1.0375
> > \end{align*}
> > $$
> >
> > The total-loss plan treats the two risks as identical. The split plan debits Risk A by $17.6\%$, because primary losses $\$42{,}000$ over expected can only come from too many claims: a frequency difference, the parameter risk that says something about the risk itself. It gives Risk B a small credit, because B's overrun is one severe claim in the excess layer: severity, the process risk, which says much less about next year. Weighting the primary layer heavily lets the mod respond to the first and largely discount the second.
