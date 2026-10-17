---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:f3ce7de4c028a7026d8d522ca8685d8b73a54f5953a4be84e817ed0856641b4b
  sources:
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §1-10, Ch.2 §1, §5, PDF pp.8-18, 21-29, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15, PDF pp.301-303, 312, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Bailey & Simon, An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (PCAS XLVI, 1959), conclusion (2), PDF p.3, sha256:3e44bb5b3d17e96aaae61b27b0d72889043c44feb049a3ca3444095101f456e2 — https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Individual Risk Rating.md
---

**Individual Risk Rating** is the adjustment of one insured's premium away from the manual (class) rate, to reflect that risk's own characteristics or its own loss experience. It works either *prospectively*, through [[Experience Rating|experience]] and [[Schedule Rating|schedule rating]], or *after the policy period*, through [[Retrospective Rating|retrospective rating]] and other [[Loss Sensitive Rating|loss-sensitive plans]].

> $$\text{Standard Premium} = \text{Manual Premium} \times M$$

> $$M = Z\,\frac{A}{E} + (1 - Z) = \frac{A + K}{E + K}$$

- $A$ is the risk's actual (usually capped) losses — its [[Risk Experience|own experience]]. $E$ is the losses expected for a risk of its [[Rating Class|class]] and size. $Z = E/(E + K)$ is the credibility, where $K$ is the [[Bühlmann Credibility|Bühlmann]] ratio of expected process variance to variance of the hypothetical means, in units of expected loss. As the study note requires, $Z$ lies between 0 and 1 and never falls as $E$ grows, while $Z/E$ falls — so a loss of a given size moves a large risk's mod less than a small one's.
- **Why rate individually.** No class is perfectly [[Homogeneity|homogeneous]]: experience rating picks up the variance of the hypothetical means *within* a class. It improves equity, strengthens the incentive for loss control, and makes more risks acceptable to write. A mod is a prospective estimate of loss potential, not a charge-back for past losses. Bailey and Simon found that the more refined the class plan, the less credibility individual experience deserves.
- **The spectrum by size.** Manual rating → schedule and experience modification → retrospective rating or large deductibles → loss rating and self-insurance. Each step moves more of the risk, and more of the premium's sensitivity to actual losses, onto the insured ([[Commercial Lines Rating]]).
- **Design features.** A maximum single loss or a primary/excess split (the NCCI plan weights primary losses more heavily, since they signal frequency), minimum and maximum mods, the experience period, and rules against double-counting a feature through both a schedule credit and the mod.
- **Plan balance.** If the mods actually written average below $1.00$, manual rates must be loaded by an off-balance factor. Whether mods separate risks correctly is tested with the quintiles and efficiency tests — see [[Rating Plan]].

> [!example]- Credibility Grows with Size {Example}
> A plan uses $Z = E/(E + K)$ with $K = \$50{,}000$. Two risks in the same class both ran at $70\%$ of expected losses: a small risk with $E = \$10{,}000$ and $A = \$7{,}000$, and a large risk with $E = \$500{,}000$ and $A = \$350{,}000$. Compute both mods.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > M_{\text{small}} &= \frac{7{,}000 + 50{,}000}{10{,}000 + 50{,}000} \\
> > &= 0.950 \\[6pt]
> > M_{\text{large}} &= \frac{350{,}000 + 50{,}000}{500{,}000 + 50{,}000} \\
> > &= 0.727
> > \end{align*}
> > $$
> >
> > The credibilities are $Z = 10/60 = 0.167$ and $Z = 500/550 = 0.909$. The same relative experience earns the small risk a $5\%$ credit and the large one a $27\%$ credit. The small risk's good year is mostly noise, whereas the large risk's volume makes its record a genuine signal about its hazard.

> [!example]- The Experience Rating Off-Balance {Example}
> Class rates are set so that total manual premium of $\$10$M equals the required premium. On the business actually written, $\$4$M of manual premium is below the eligibility threshold and unrated. $\$5$M carries credit mods averaging $0.85$, and $\$1$M carries debit mods averaging $1.15$. What happens to collected premium, and what is the fix?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar{M} &= \frac{4.0(1.00) + 5.0(0.85) + 1.0(1.15)}{10.0} \\
> > &= \frac{9.40}{10.0} \\
> > &= 0.94 \\[6pt]
> > \text{Off-balance factor} &= \frac{1}{0.94} \\
> > &= 1.064
> > \end{align*}
> > $$
> >
> > The book collects $\$9.4$M against a $\$10$M need, which is a $6\%$ shortfall that no individual mod reveals. The manual rates must be loaded by $6.4\%$ so the plan collects the required premium. Mods can average below $1.00$ when debit-mod risks leave for competitors or the residual market, or because of plan features that discount some losses. The off-balance has to be measured and reflected in each rate review.
