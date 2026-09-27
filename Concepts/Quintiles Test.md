---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:26db7db890c903c7f076eb21883424330d0e963ea1964f0731fd3de7c6118a21
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Quintiles Test.md
---

The **Quintiles Test** checks whether an [[Experience Rating|experience rating]] plan does its two jobs — *identifying* differences between otherwise similar risks and *adjusting* for them. Risks are ranked by mod and collapsed into five groups, and each group's manual and standard (modified) loss ratios are compared. The **efficiency test** turns the comparison into a statistic: the variance of the standard loss ratios divided by the variance of the manual loss ratios, lower being better.

> $$\bar{M}_g = \frac{\sum_{i \in g} P_i M_i}{\sum_{i \in g} P_i}$$

> $$\text{Manual LR}_g = \frac{\sum_{i \in g} L_i}{\sum_{i \in g} P_i}$$

> $$\text{Standard LR}_g = \frac{\text{Manual LR}_g}{\bar{M}_g}$$

> $$\text{Efficiency} = \frac{\text{Var}(\text{Standard LR}_g)}{\text{Var}(\text{Manual LR}_g)}$$

- $P_i$ is risk $i$'s manual premium (before experience rating), $M_i$ its mod, $L_i$ its losses, and $g$ one of the five groups. $\bar{M}_g$ is the premium-weighted average mod, so the standard loss ratio is losses over standard premium ($\text{mod} \times \text{manual premium}$, ignoring any schedule mod). The variances are sample variances across the five groups.
- **Identifying differences:** the manual loss ratios should rise distinctly with the average mod — the lowest mods going to the risks with the lowest manual loss ratios.
- **Adjusting for them:** the standard loss ratios should be much less dispersed and show no discernible trend. A *downward* trend (standard loss ratios falling as mods rise) means the plan gives too much credibility to the risks' own experience; an *upward* trend means too little.
- **Why a trend matters.** An experience rating plan is meant to increase equity and enhance market competition by making all risks equally desirable to write. If high-mod risks end up with the lowest loss ratios, they are overcharged and more profitable than credit-mod risks; if they keep the highest loss ratios, the reverse. The plan with the lower efficiency statistic makes risks of differing experience more equally desirable, and is the better plan.
- Paul Dorweiler described a more general version of the test in 1934; Robbin Gillam described the test statistic as a "quintiles test" in 1992. See also [[Individual Risk Rating]] and [[Rating Plan]].

> [!example]- Running the Quintiles Test {Example}
> Ten experience-rated risks, sorted by mod (premium and loss in \$000):
>
> | Risk | A | B | C | D | E | F | G | H | I | J |
> |---|---|---|---|---|---|---|---|---|---|---|
> | Manual premium | 1,000 | 1,200 | 900 | 1,100 | 1,000 | 1,050 | 950 | 1,000 | 1,100 | 900 |
> | Loss | 560 | 720 | 630 | 800 | 810 | 870 | 900 | 1,000 | 1,250 | 1,110 |
> | Mod | 0.70 | 0.76 | 0.84 | 0.88 | 0.95 | 1.00 | 1.06 | 1.10 | 1.22 | 1.30 |
>
> Group the risks into quintiles, compute each group's average mod, manual loss ratio and standard loss ratio, and evaluate the plan.
>
> > [!answer]-
> > For the first group, A and B:
> >
> > $$
> > \begin{align*}
> > \bar{M} &= \frac{1{,}000(0.70) + 1{,}200(0.76)}{2{,}200} \\
> > &= \frac{1{,}612}{2{,}200} \\
> > &= 0.733 \\[4pt]
> > \text{Manual LR} &= \frac{560 + 720}{2{,}200} \\
> > &= 0.582 \\[4pt]
> > \text{Standard LR} &= \frac{1{,}280}{1{,}612} \\
> > &= 0.794
> > \end{align*}
> > $$
> >
> > All five groups:
> >
> > | Group | Manual premium | Loss | Avg mod | Manual LR | Standard LR |
> > |---|---|---|---|---|---|
> > | A–B | 2,200 | 1,280 | 0.733 | 0.582 | 0.794 |
> > | C–D | 2,000 | 1,430 | 0.862 | 0.715 | 0.829 |
> > | E–F | 2,050 | 1,680 | 0.976 | 0.820 | 0.840 |
> > | G–H | 1,950 | 1,900 | 1.081 | 0.974 | 0.902 |
> > | I–J | 2,000 | 2,360 | 1.256 | 1.180 | 0.939 |
> >
> > The manual loss ratios rise steadily from $0.582$ to $1.180$, so the plan **identifies** differences between the risks. But the standard loss ratios still rise, from $0.794$ to $0.939$: the plan **does not fully adjust** for them. It gives too little credibility to the risks' own experience. The credit-mod risks still get too little credit and stay the most profitable to write, while the debit-mod risks remain undercharged.

> [!example]- Efficiency Test Between Two Plans {Example}
> For the same ten risks, a second plan with more responsive mods produces group average mods of $0.687$, $0.843$, $0.966$, $1.136$ and $1.387$. Using the manual loss ratios from the previous example, compute each plan's efficiency test statistic and say which plan is better.
>
> > [!answer]-
> > Plan 2's standard loss ratios are the manual loss ratios divided by its average mods:
> >
> > $$
> > \begin{align*}
> > \frac{0.582}{0.687} &= 0.847 \\[2pt]
> > \frac{0.715}{0.843} &= 0.848 \\[2pt]
> > \frac{0.820}{0.966} &= 0.849 \\[2pt]
> > \frac{0.974}{1.136} &= 0.857 \\[2pt]
> > \frac{1.180}{1.387} &= 0.851
> > \end{align*}
> > $$
> >
> > The sample variances across the five groups are $0.0538$ for the manual loss ratios, $0.00343$ for Plan 1's standard loss ratios and $0.0000158$ for Plan 2's:
> >
> > $$
> > \begin{align*}
> > \text{Efficiency}_1 &= \frac{0.00343}{0.0538} \\
> > &= 0.064 \\[4pt]
> > \text{Efficiency}_2 &= \frac{0.0000158}{0.0538} \\
> > &= 0.0003
> > \end{align*}
> > $$
> >
> > Plan 2 has the lower statistic, and its standard loss ratios show no discernible trend, so it is the better plan: it leaves risks of differing past experience about equally desirable to write.

> [!example]- Diagnosing an Over-Credible Plan {Example}
> A plan's standard loss ratios, from the lowest-mod quintile to the highest, are $1.06$, $1.02$, $0.99$, $0.96$ and $0.93$, while the manual loss ratios rise steeply. Diagnose the plan and explain why the result is undesirable.
>
> > [!answer]-
> > The plan identifies risk differences — the manual loss ratios rise with the mod — but over-adjusts for them. The standard loss ratios *fall* as the mods rise, so the plan gives **too much credibility** to the risks' own experience.
> >
> > - The risks with the best past experience get more credit than their experience predicts, so their premium is cut so far that they now run the *highest* loss ratios.
> > - The worst past risks are penalized too much and now run the lowest loss ratios. They pay more than is equitable.
> > - Debit-mod risks have become the most profitable to write, which works against enhancing market competition by making all risks equally desirable.
> >
> > The fix is to lower the credibility (smaller $Z$ at each size) until the standard loss ratios show no trend. The efficiency statistic would fall as that happens.
