---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:295b8d4adbe63cce258fac15a3e4fab583ef7682e4df07fa1cd60a04c2c6653e
  sources:
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §10, PDF pp.14-18, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §3.8-3.9, §7.2-7.2.4, PDF pp.43-44, 86-90, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15, PDF pp.301-305, 319, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rating Plan.md
---

A **Rating Plan** is the complete specification of how an insurer prices a line. It comprises the base rates, the [[Rating Variable|rating variables]] and their [[Rating Factors|factors]], the [[Rating Algorithm|rating algorithm]] and its rules, and the individual risk rating plans ([[Experience Rating|experience]], [[Schedule Rating|schedule]] and [[Retrospective Rating|retrospective]]) that modify the manual premium for a particular insured.

A policy's manual premium is

> $$\text{Manual Premium} = \text{Exposure} \times \text{Base Rate} \times \prod_k f_k$$

- $f_k$ is the policy's rating factor for rating variable $k$.

Experience and schedule rating then modify the manual premium, and the standard premium is

> $$\text{Standard Premium} = \text{Manual Premium} \times M \times (1 + S)$$

- $M$ is the experience modification.
- $S$ is the net schedule modification.

Retrospective or large-deductible terms then act on standard premium ([[Commercial Lines Rating]]).

> [!example]- What is this policy's standard premium? {Example}
> A policy has 50 exposures at a base rate of $\$400$, rating factors of $1.10$ and $0.90$, an experience modification of $0.85$ and a net schedule credit of 5%.
>
> > [!answer]-
> > - The manual premium is $50 \times 400 \times 1.10 \times 0.90 = \$19{,}800$.
> > - A 5% credit is $S = -0.05$, so $1 + S = 0.95$.
> > - The standard premium is $19{,}800 \times 0.85 \times 0.95 = \$15{,}988.50$.

## From a model to a rating plan

A [[Generalized Linear Model|GLM]] predicts loss cost, but a rating plan must be implementable ([[Model Implementation]]). Classification must be clear and unambiguous, and every variable must be obtainable and verifiable at quote. Factors are rounded, capped or smoothed. Any factor the model did not see, such as a new discount, has to be reconciled with the variables it overlaps. The change is checked for dislocation and off-balanced to the target rate level. Between rebuilds, the model is refreshed on newer data (Goldburd et al., §3.8–3.9).

## Testing an experience rating plan

The manual loss ratio is losses divided by manual premium. The standard loss ratio is losses divided by standard premium, so it is

> $$\text{Standard LR} = \frac{\text{Manual LR}}{M}$$

The quintiles test ranks risks by mod and forms five groups. A sound plan passes on two counts:

1. The *manual* loss ratio should rise with the mod, showing the plan *identifies* differences.
2. The *standard* (modified) loss ratio should be flat, showing the plan *corrects* for them.

Standard loss ratios falling as the mod rises mean too much credibility. Rising means too little.

The efficiency test compares plans by the share of the manual loss ratios' variance that the plan leaves in the standard loss ratios. Its statistic is

> $$\text{Efficiency} = \frac{\mathrm{Var}(\text{Standard LR})}{\mathrm{Var}(\text{Manual LR})}$$

- The variances are taken across the groups, and the plan with the lower value is better.

> [!example]- Which of these three experience rating plans is best? {Example}
> Risks are grouped into quintiles by mod. The manual loss ratios by quintile are $0.48$, $0.57$, $0.65$, $0.72$ and $0.83$. The average mods by quintile under three candidate plans are:
>
> | Plan | Q1 | Q2 | Q3 | Q4 | Q5 |
> | :--- | ---: | ---: | ---: | ---: | ---: |
> | A | 0.75 | 0.88 | 1.00 | 1.12 | 1.30 |
> | B | 0.60 | 0.80 | 1.00 | 1.22 | 1.50 |
> | C | 0.92 | 0.96 | 1.00 | 1.04 | 1.10 |
>
> > [!answer]-
> > - Dividing each manual loss ratio by the mod, Plan A's standard loss ratios are $0.640$, $0.648$, $0.650$, $0.643$ and $0.638$, which are flat.
> > - Plan B's are $0.800$, $0.713$, $0.650$, $0.590$ and $0.553$, which fall.
> > - Plan C's are $0.522$, $0.594$, $0.650$, $0.692$ and $0.755$, which rise.
> > - The sample variance of the manual loss ratios is $0.01815$.
> > - The efficiency statistics are $0.000024/0.01815 = 0.001$ for A, $0.009676/0.01815 = 0.533$ for B and $0.008013/0.01815 = 0.442$ for C.
> > - Plan B over-corrects: past good risks now run the *worst* loss ratios, so its credibility is too high.
> > - Plan C under-corrects: good risks remain more profitable, so its credibility is too low.
> > - Either flaw leaves some risks more attractive to write than others, which defeats the purpose of the plan. Plan A is best.

A [[Loss Sensitive Rating|loss-sensitive plan]] is assessed differently: whether expected losses balance, whether the insurance charges are adequate, what credit risk it carries, and what incentives it creates.

## Testing a classification plan

A proposed classification plan is measured by its lift over the current one on a [[Holdout Sample|holdout]], using [[Quantile Plot|quantile plots]], [[Double Lift Chart|double lift charts]], the [[Gini Index|Gini index]] and loss ratio charts ([[Model Fit]]). A loss ratio chart sorts policies by predicted loss cost divided by current premium. If the current plan were perfect, every bucket would have the same loss ratio.

> [!example]- What does this loss ratio chart say about the current rating plan? {Example}
> A proposed class plan scores the holdout policies. Sorted into equal-premium quintiles by predicted loss ratio under current rates, the actual loss ratios are 54%, 60%, 65%, 71% and 80%.
>
> > [!answer]-
> > - The average loss ratio is 66%, so an accurate current plan would put every quintile near 66%.
> > - Quintile 5 runs at $80/66 = 1.21$ times the average, so the current plan undercharges it by about 21%.
> > - Quintile 1 runs at $54/66 = 0.82$ times the average, so the current plan overcharges it by about 18%.
> > - A competitor with the better plan would take the Q1 business and leave Q5 behind.
> > - Implementing the new plan would move Q5 up and Q1 down, subject to capping and an off-balance to the overall rate level.

> [!trap] Reading the standard loss ratio trend backwards
> When risks are ranked by mod, standard loss ratios that fall as the mod rises mean the plan gives too much credibility, because the high-mod risks are now overcharged. Rising standard loss ratios mean too little credibility.
