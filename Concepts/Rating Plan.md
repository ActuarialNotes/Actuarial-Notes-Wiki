---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:f7a88cf0e2b7afb91f32c91bc10a435acf4242b3ed287e19f6c4a34dbbb900d5
  sources:
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §10, PDF pp.14-18, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §3.8-3.9, §7.2-7.2.4, PDF pp.43-44, 86-90, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15, PDF pp.301-305, 319, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rating Plan.md
---

**Rating Plan** is the complete specification of how an insurer prices a line. It comprises the base rates, the [[Rating Variable|rating variables]] and their [[Rating Factors|factors]], the [[Rating Algorithm|rating algorithm]] and its rules, and the individual risk rating plans ([[Experience Rating|experience]], [[Schedule Rating|schedule]] and [[Retrospective Rating|retrospective]]) that modify the manual premium for a particular insured.

> $$\text{Manual Premium} = \text{Exposure} \times \text{Base Rate} \times \prod_k f_k$$

> $$\text{Standard Premium} = \text{Manual Premium} \times M \times (1 + S)$$

- $f_k$ are the rating factors, $M$ the experience modification and $S$ the net schedule modification. Retrospective or large-deductible terms then act on standard premium ([[Commercial Lines Rating]]).
- **From model to plan.** A [[Generalized Linear Model|GLM]] predicts loss cost, but a rating plan must be implementable ([[Model Implementation]]). Classification must be clear and unambiguous, and every variable must be obtainable and verifiable at quote. Factors are rounded, capped or smoothed. Any factor the model did not see, such as a new discount, has to be reconciled with the variables it overlaps. The change is checked for dislocation and off-balanced to the target rate level. Between rebuilds, the model is refreshed on newer data (Goldburd et al., §3.8–3.9).
- **Assessing a classification plan.** Measure the proposed plan's lift over the current one on a [[Holdout Sample|holdout]], using [[Quantile Plot|quantile plots]], [[Double Lift Chart|double lift charts]], the [[Gini Index|Gini index]] and **loss ratio charts**. A loss ratio chart sorts policies by predicted loss cost divided by current premium; if the current plan were perfect, every bucket would have the same loss ratio. See [[Model Fit]].
- **Assessing an experience rating plan: the quintiles test.** Rank risks by mod and form five groups. The *manual* loss ratio should rise with the mod, showing the plan *identifies* differences. The *standard* (modified) loss ratio should be flat, showing the plan *corrects* for them. Standard loss ratios falling as the mod rises mean too much credibility; rising means too little. The **efficiency test** compares $\mathrm{Var}(\text{standard LR}) / \mathrm{Var}(\text{manual LR})$ across plans, and the lower value is better.
- A [[Loss Sensitive Rating|loss-sensitive plan]] is assessed differently: whether expected losses balance, whether the insurance charges are adequate, what credit risk it carries, and what incentives it creates.

> [!example]- Quintiles Test of Three Experience Rating Plans {Example}
> Risks are grouped into quintiles by mod. Manual loss ratios by quintile are $0.48$, $0.57$, $0.65$, $0.72$ and $0.83$. The average mods by quintile under three candidate plans are:
>
> - Plan A: $0.75$, $0.88$, $1.00$, $1.12$, $1.30$
> - Plan B: $0.60$, $0.80$, $1.00$, $1.22$, $1.50$
> - Plan C: $0.92$, $0.96$, $1.00$, $1.04$, $1.10$
>
> Evaluate each plan.
>
> > [!answer]-
> > The standard loss ratio is the manual loss ratio divided by the mod:
> >
> > - A: $0.640$, $0.648$, $0.650$, $0.643$, $0.638$ — flat.
> > - B: $0.800$, $0.713$, $0.650$, $0.590$, $0.553$ — falling.
> > - C: $0.522$, $0.594$, $0.650$, $0.692$, $0.755$ — rising.
> >
> > The sample variance of the manual loss ratios is $0.01815$, which gives:
> >
> > $$
> > \begin{align*}
> > \text{Efficiency}_A &= \frac{0.000024}{0.01815} \\
> > &= 0.001 \\[4pt]
> > \text{Efficiency}_B &= \frac{0.009676}{0.01815} \\
> > &= 0.533 \\[4pt]
> > \text{Efficiency}_C &= \frac{0.008013}{0.01815} \\
> > &= 0.442
> > \end{align*}
> > $$
> >
> > Plan A is best. Plan B over-corrects: past good risks now run the *worst* loss ratios, so its credibility is too high. Plan C under-corrects: good risks remain more profitable, so its credibility is too low. Either flaw leaves some risks more attractive to write than others, which defeats the purpose of the plan.

> [!example]- Reading a Loss Ratio Chart {Example}
> A proposed class plan scores the holdout policies. Sorted into equal-premium quintiles by predicted loss ratio under current rates, the actual loss ratios are $54\%$, $60\%$, $65\%$, $71\%$ and $80\%$. What does this say about the current plan?
>
> > [!answer]-
> > The average is $66\%$. If the current plan were accurate, every quintile would sit near $66\%$. Instead:
> >
> > $$
> > \begin{align*}
> > \text{Q5} &= \frac{80\%}{66\%} \\
> > &= 1.21 \\[4pt]
> > \text{Q1} &= \frac{54\%}{66\%} \\
> > &= 0.82
> > \end{align*}
> > $$
> >
> > The proposed plan finds risks the current plan undercharges by about $21\%$, and others it overcharges by about $18\%$. A competitor with the better plan would take the Q1 business and leave Q5 behind. Implementing the new plan would move Q5 up and Q1 down, subject to capping and an off-balance to the overall rate level.
