---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:433e8bdd0db7dd2b9dce1e38c20f5a3a2ea25a7e78bd928d8ded7aa1e7816b09
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p.94 (PDF p.106); Ch. 7 pp.129-130, 137, 139 (PDF pp.141-142, 149, 151); Ch. 8 p.143 (PDF p.155), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Permissible Loss Ratio.md
---

**Permissible Loss Ratio** (PLR, or target loss ratio) is the share of premium available to pay losses once every other cost has been provided for. It is the benchmark against which a projected loss ratio is judged in the [[Loss Ratio Method]].

Werner & Modlin define two permissible loss ratios, both with LAE included in losses:

> $$\text{PLR} = 1 - V - F\% - Q_T \quad \text{(total permissible loss ratio)}$$

> $$\text{VPLR} = 1 - V - Q_T \quad \text{(variable permissible loss ratio)}$$

> $$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{\text{VPLR}} - 1$$

- $V$ is the [[Variable Expenses|variable expense]] ratio, $Q_T$ the target [[Underwriting Profit|underwriting profit]] provision, and $F\%$ the [[Fixed Expenses|fixed expense]] ratio. The **PLR** is the share of each premium dollar intended for loss and LAE; the **VPLR** is the share intended for loss, LAE *and* fixed expenses. The loss ratio indication compares the projected loss & LAE ratio plus the fixed expense ratio to the VPLR — **fixed expenses sit in the numerator with the losses**, because they are assumed to be the same for each risk rather than a percentage of premium, and so do not scale with the rate being solved for.
- If *all* expenses are treated as variable, the VPLR and the PLR are the same, and the indication is simply:

> $$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio}}{\text{PLR}} - 1$$

  This is the **all variable expense method**. It reproduces the fixed-expense result only for the average risk — Werner & Modlin's $\$20$ fixed expense is exactly $8\%$ of the $\$250$ average premium — and undercharges risks with below-average premium while overcharging those above it. Mixing the two conventions — subtracting $F\%$ in the denominator *and* adding it in the numerator — double-counts fixed expenses.
- The PLR is the complement of the target combined ratio: a $70\%$ PLR with a $25\%$ total expense ratio implies a target combined ratio of $95\%$ and a $5\%$ underwriting profit.
- A higher variable expense ratio **lowers** the PLR, leaving less room for losses. Insurers with cheap distribution can run higher loss ratios profitably — which is why a loss ratio comparison across companies with different channels says little about relative pricing discipline.
- Where the losses and premium are not already net of non-proportional [[Reinsurance|reinsurance]], its net cost (cost of the reinsurance minus expected recoveries) may be included as an expense item in the indication.

![[Media/Figures/Permissible_Loss_Ratio.svg|340]]

> [!example]- Computing the PLR and the Indication {Example}
> An insurer's provisions: variable expenses $22\%$ of premium, fixed expenses $8\%$ of premium, target underwriting profit $5\%$. The projected loss and LAE ratio is $60\%$.
>
> Compute the indicated rate change with fixed expenses in the numerator, and check it against the all variable expense method.
>
> > [!answer]-
> > **Fixed expenses in the numerator** — against the VPLR:
> >
> > $$\begin{align*}
> > \text{VPLR} &= 1 - 0.22 - 0.05 = 0.73 \\[6pt]
> > \text{Indicated factor} &= \frac{0.60 + 0.08}{0.73} \\
> > &= \frac{0.68}{0.73} \\
> > &= 0.9315
> > \end{align*}$$
> >
> > an indicated change of $-6.8\%$.
> >
> > **All variable expense method** — against the total PLR:
> >
> > $$\begin{align*}
> > \text{PLR} &= 1 - 0.22 - 0.08 - 0.05 = 0.65 \\[4pt]
> > \text{Indicated factor} &= \frac{0.60}{0.65} = 0.9231
> > \end{align*}$$
> >
> > an indicated change of $-7.7\%$.
> >
> > The two differ by about a point because the fixed expense ratio was measured at the *current* premium level; when rates change, the fixed dollars per exposure stay put while the all variable method lets them move with premium. The fixed-expense form is the one to use whenever the rate change is material.
> >
> > The error to avoid entirely is $\dfrac{0.60 + 0.08}{0.65} = 1.046$ — a $+4.6\%$ indication from charging fixed expenses twice, which flips the sign of the answer.

> [!example]- Reading Adequacy from the PLR {Example}
> Three books, each with a projected loss and LAE ratio of $68\%$ and a target underwriting profit of $5\%$:
>
> | Book | Variable expenses | Fixed expense ratio |
> |---|---|---|
> | Independent agency | $27\%$ | $9\%$ |
> | Captive agency | $20\%$ | $11\%$ |
> | Direct | $9\%$ | $16\%$ |
>
> Which are adequately rated?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Agency: } \frac{0.68 + 0.09}{1 - 0.27 - 0.05} &= \frac{0.77}{0.68} = 1.132 \Rightarrow +13.2\% \\[6pt]
> > \text{Captive: } \frac{0.68 + 0.11}{1 - 0.20 - 0.05} &= \frac{0.79}{0.75} = 1.053 \Rightarrow +5.3\% \\[6pt]
> > \text{Direct: } \frac{0.68 + 0.16}{1 - 0.09 - 0.05} &= \frac{0.84}{0.86} = 0.977 \Rightarrow -2.3\%
> > \end{align*}$$
> >
> > Identical loss ratios, three different answers. The direct book can sustain a $68\%$ loss ratio and still return its target profit; the agency book needs a $13\%$ rate increase to reach the same place.
> >
> > The wider lesson: a loss ratio is meaningless as a measure of pricing adequacy without the expense structure behind it. This is also why the direct writer can quote below the agency writer on identical risks without under-pricing — and why the agency book will lose its best risks first.
