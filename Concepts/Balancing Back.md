---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:26ec109776029998acb5227ec3974a2181a8c7c74b563b5f16daa6a675b492fb
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 9 pp.161-167 (PDF pp.173-179) and Ch. 14 pp.274-284 (PDF pp.286-296); printed = PDF - 12, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "SOA Exam ASTAM syllabus, October 2026, Topic 6 outcome e (p.5) and Resources (p.6), sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf"
    - "Brown & Lennox, Introduction to Ratemaking and Loss Reserving for P&C Insurance, 5th ed. (ACTEX 2022), publisher's sample pages, printed Table of Contents pp.v-vi (PDF pp.6-7), sha256:186d9239f5c102f1077ad1c229ec03d6dfeae209d5c4bf36728641582c4c451e — https://www.actexmadriver.com/samples/Intro_to_Ratemaking_06092022_sample.pdf"
    - "SOA Exam ASTAM Spring 2025 model solutions, Q3(c)(iii) and (d), pp.8-9, sha256:f651a9645c9b8ace921bb11d9def2e3655895a0fd6c563fe8777c43eb3f706e5 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/solutions/2025-spring-astam-solutions.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Balancing Back.md
---

**Balancing Back** is the adjustment to the base rate that keeps the overall rate level where the ratemaking analysis put it when the risk classification differentials (the relativities) change. Brown & Lennox (section 4.8.3) call it balancing back, and Werner & Modlin call the same correction an off-balance factor. The analysis that produces the new relativities is [[Classification Ratemaking|classification ratemaking]].

The base rate $B$ is the rate charged to the base class, whose relativity is 1.00. Each exposure in class $i$ pays $B\,r_i$, so the book's premium is $B \sum_i w_i r_i$. New relativities applied to the current mix of business change that sum, so balancing back sets the new base rate so that premium moves by exactly the overall change:

> $$\sum_i w_i\, B_{\text{new}}\, r_i^{\text{new}} = (1 + \Delta) \sum_i w_i\, B_{\text{old}}\, r_i^{\text{old}}$$

- $r_i^{\text{old}}$ and $r_i^{\text{new}}$ are the relativity of class $i$ before and after the change.
- $w_i$ is the exposure in class $i$, the exposures expected when the new rates apply. Both sums use the same weights.
- $\Delta$ is the overall rate change from the [[Overall Rate Level Indication|overall rate level indication]].

Solving for the new base rate gives

> $$B_{\text{new}} = B_{\text{old}} \times (1 + \Delta) \times \text{OBF}$$

where the off-balance factor is

> $$\text{OBF} = \frac{\sum_i w_i\, r_i^{\text{old}}}{\sum_i w_i\, r_i^{\text{new}}}$$

OBF, the off-balance factor, is the average relativity before the change divided by the average relativity after it. Raising the relativities of large or high-rated classes raises that sum, and the base rate must fall in the same proportion if the overall change is to stay at $\Delta$. When the new relativities raise the average, the factor is below 1 and the base rate falls.

Since $w_i\,r_i^{\text{old}}$ is proportional to class $i$'s premium at current rates, OBF is also the reciprocal of the relativity changes $r_i^{\text{new}}/r_i^{\text{old}}$ averaged with premium at current rates as the weights. Weighting the relativities themselves by premium counts each class's old relativity twice and gives the wrong factor.

The rate change a class sees is

> $$(1 + \Delta)\,\text{OBF}\,\frac{r_i^{\text{new}}}{r_i^{\text{old}}} - 1$$

A class's rate change is $(1 + \Delta)\,\text{OBF}\,r_i^{\text{new}}/r_i^{\text{old}} - 1$. The base class's relativity stays at 1.00, but its rate still changes, because the base rate carries the off-balance.

> [!example]- What is the new base rate, and the change in each territory's rate? {Example}
> An auto insurer's base rate is $\$600$, and suburban territory is the base class. The overall rate level is not to change.
>
> | Territory | Exposures | Current relativity | New relativity |
> | :--- | ---: | ---: | ---: |
> | Urban | 2,000 | 1.40 | 1.55 |
> | Suburban | 5,000 | 1.00 | 1.00 |
> | Rural | 3,000 | 0.80 | 0.75 |
>
> > [!answer]-
> > - At the current relativities, $\sum_i w_i r_i^{\text{old}} = 2{,}800 + 5{,}000 + 2{,}400 = 10{,}200$.
> > - At the new relativities, $\sum_i w_i r_i^{\text{new}} = 3{,}100 + 5{,}000 + 2{,}250 = 10{,}350$.
> > - $\Delta = 0$, so $B_{\text{new}} = 600 \times 10{,}200/10{,}350 = \$591.30$.
> > - Urban's rate rises from $\$840$ to $591.30 \times 1.55 = \$916.52$, which is 9.1%.
> > - Suburban's falls from $\$600$ to $\$591.30$, which is 1.4%, even though its relativity did not change.
> > - Rural's falls from $\$480$ to $591.30 \times 0.75 = \$443.48$, which is 7.6%.
> > - Total premium stays at $\$6.12$ million.

## Where the new relativities come from

Under the [[Loss Ratio Method|loss ratio method]], a class's indicated relativity is its current relativity times its loss ratio divided by the base class's loss ratio, with premiums at current rates. Under the [[Pure Premium Method|pure premium method]], it is the class pure premium divided by the base class pure premium. Either way, the overall change $\Delta$ is set separately, and balancing back reconciles the two.

When other rating variables also apply, each class's exposures are first multiplied by their average relativity for those other variables, so that the factor measures only this variable's effect on the average premium. When the indicated relativities are capped, or weighted with the current ones by credibility, the off-balance factor uses the selected relativities, because those are the ones that will be charged.

> [!example]- What are the indicated relativities by the loss ratio method, and each class's new rate? {Example}
> A book has three classes, with A as the base class. The current base rate is $\$400$, and the indicated overall change is +5%.
>
> | Class | Exposures | Current relativity | Premium at current rates | Losses |
> | :--- | ---: | ---: | ---: | ---: |
> | A | 6,000 | 1.00 | 2,400,000 | 1,440,000 |
> | B | 3,000 | 1.25 | 1,500,000 | 990,000 |
> | C | 1,000 | 1.60 | 640,000 | 480,000 |
>
> > [!answer]-
> > - The loss ratios are 0.600, 0.660 and 0.750.
> > - Relative to class A, the new relativities are $1.25(0.660/0.600) = 1.375$ for B and $1.60(0.750/0.600) = 2.000$ for C.
> > - $\sum_i w_i r_i^{\text{old}} = 11{,}350$ and $\sum_i w_i r_i^{\text{new}} = 12{,}125$, so $\text{OBF} = 0.93608$.
> > - $B_{\text{new}} = 400(1.05)(0.93608) = \$393.15$, a change of $-1.7\%$ for class A.
> > - Class B's rate is $393.15 \times 1.375 = \$540.58$, a change of $+8.1\%$.
> > - Class C's rate is $393.15 \times 2.000 = \$786.30$, a change of $+22.9\%$.
> > - Together they raise premium by 5%, from $\$4{,}540{,}000$ to about $\$4{,}767{,}000$.

> [!trap] Applying the overall change without balancing back
> Applying the overall change to the old base rate and then using the new relativities double-counts. In the second example it raises premium by $1.05 \times 12{,}125/11{,}350 - 1 = 12.2\%$ instead of 5%.
