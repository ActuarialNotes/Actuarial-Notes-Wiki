---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:0c2860148656b913579e524fe35a2249da36c7b51e2db61597188ead25ad132d
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 12 pp.223-231 (PDF pp.235-243), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 9 p.156 (PDF p.162), Ch. 10 p.174 (PDF p.180), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Complement of Credibility.md
---

**Complement of Credibility** is the estimate that receives the weight $(1-Z)$ when observed experience receives [[Credibility|credibility]] $Z$. When $Z$ is low — a small class, a new territory, an excess layer — the complement, not the data, determines the answer.

> $$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$

**Boor's desirable qualities of a complement.** It should be (1) **accurate** — as low an error variance as possible around the future expected losses; (2) **unbiased** — not routinely higher or lower than the observed experience; (3) **statistically independent** from the base statistic, or any error in the base statistic can be compounded; (4) **available** — the data needed to compute it readily obtainable; (5) **easy to compute** — easy to perform and understand, which matters most when the actuary must justify it to a third party such as a regulator; and (6) **logically related** to the base statistic, so that its use is easy to support.

**Werner & Modlin's six first-dollar complements:**

1. **Loss costs of a larger group that includes the group being rated** — e.g. all states in the region for the state under review. It can be built to include or exclude the subject experience; if included, the subject must not dominate the group.
2. **Loss costs of a larger related group** — a *separate* but similar group, e.g. owners-form contents experience for the condo form. It is generally biased, but because it does not contain the subject experience it may be a better choice than method 1 on independence.
3. **Rate change from the larger group applied to present rates** — the larger group's indicated change applied to the subject's current loss cost, rather than the larger group's loss costs used directly.
4. **Harwayne's method** — other states' data adjusted to remove the overall differences between states before it is used, so that a state with a higher cost level does not import that level into the class complement.
5. **Trended present rates** — the current rate adjusted to what was last *indicated* rather than implemented, and trended from the original target effective date of the current rates to that of the new rates. The trend applied is an annual loss trend, often the one used in the latest rate level indication, because the change in loss cost level since the current rates were set comes from monetary inflation, distributional shifts, safety advances and the like.
6. **Competitors' rates** — used by a new or small company whose own data is too unreliable, on the reasoning that a competitor with many more exposures has less process error. Competitors' manual rates reflect not only their loss costs but also marketing considerations, judgment and the effects of the regulatory process, all of which can make them inaccurate. Competitors may also have different underwriting and claim practices, which creates a bias that may be difficult to quantify. The rates are independent of the company's own data, but they may be difficult or time-consuming to obtain. A similar competitor's rates bear a logical relationship to the subject and are generally accepted by regulators, so this complement is often the only viable alternative (Werner & Modlin, Ch. 12).

**Excess (increased-limits) complements.** Excess layers have very few claims, so the complement is often more important than the subject experience, and actuaries predict the excess loss costs from losses below the attachment point. Werner & Modlin (Ch. 12) give Boor's four methods:

- **Increased limits analysis.** The losses capped at the attachment point are multiplied by the ILF at the top of the layer minus the ILF at the attachment point, divided by the ILF at the attachment point. It needs ground-up losses that have not been capped anywhere below the attachment point, so a policy whose limit is below the attachment point cannot supply them. The subject's size-of-loss distribution may differ from the one behind the ILFs, which biases it; its error is the parameter error in the selected ILFs, which tends to be independent of the base statistic; and it is more logically related to the losses below the attachment point than to the layer.
- **Lower limits analysis.** The same calculation with losses capped at a limit below the attachment point, often the basic limit: the losses capped at the lower limit are multiplied by the ILF at the top of the layer minus the ILF at the attachment point, divided by the ILF at the lower limit. Increased limits analysis is the special case where the lower limit is the attachment point. Losses capped at the basic limit can be taken from policies at every limit, and insurers usually code them for statistical reporting. Capping lower may make the estimate more stable, but differences in size-of-loss distributions are exacerbated, so it is likely more biased, and it is related to the lower-limit losses rather than to the losses in the layer.
- **Limits analysis.** Used when losses capped at a single point are not available, as for a reinsurer without the full loss distribution facing policies written at many limits. Each policy limit is analysed separately. Premium at a limit times the expected loss ratio estimates the expected losses of the policies at that limit, and an ILF ratio takes the share of those losses that falls in the layer. The complement is the total limits expected loss ratio times the sum, over the policy limits, of the total premium at each limit times that limit's share. A limit at or below the attachment point contributes nothing to the layer. For a limit inside the layer the share is the ILF at the limit minus the ILF at the attachment point, divided by the ILF at the limit. For a limit above the top of the layer the share is the ILF at the top of the layer minus the ILF at the attachment point, divided by the ILF at the limit. It adds the assumption that the expected loss ratio does not vary by limit.
- **Fitted curves.** A curve fitted to the data smooths its volatility and extrapolates to higher limits, and the share of the curve's total losses that falls in the layer is applied to the total limits loss costs. It tends to be less biased and more stable than the other three, and more accurate when the higher layers have few claims, but it is less independent, the most complex to compute and harder to communicate.

Further points:

- The loss costs of a larger related group may be biased. Method 3 mitigates this by transferring the larger group's indicated *change* rather than its loss cost, so even when the subject and the larger group have different overall loss costs the complement is largely unbiased; its independence depends on how large the subject is relative to the larger group.
- ASOP No. 25, as Werner quotes it, requires related experience whose frequency, severity or other determinable characteristics may reasonably be expected to be similar to the subject experience; related experience that does not, or cannot be adjusted to, meet that criterion should not be used. Trended present rates are the worked case: the current rate is brought forward for [[Loss Trend|loss trend]] before it is blended.
- In reserving, the [[Bornhuetter-Ferguson Method|BF]] method is a credibility weighting of the development method (credibility $Z = 1/\text{CDF}$) with the expected claims method, which receives the complement $(1-Z)$; the [[Cape Cod Method|Cape Cod]] technique differs from BF chiefly in deriving the expected claim ratio from the reported claims experience rather than from an independent, often judgmental selection.

![[Media/Figures/Complement_of_Credibility.svg|340]]

> [!example]- The Complement Drives a Low-Credibility Indication {Example}
> A territory's experience indicates a rate change of $+25\%$ but earns only $Z = 0.20$. The complement is the statewide indicated change applied to the territory's present rates (method 3): $+6\%$.
>
> Compute the weighted change, and assess how much the answer depends on the complement.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Weighted} &= 0.20(25\%) + 0.80(6\%) \\
> > &= 5.0\% + 4.8\% \\
> > &= +9.8\%
> > \end{align*}$$
> >
> > Nearly half the answer ($4.8$ of $9.8$ points) comes from the complement, and the result moves $0.8$ points for every point the complement moves: had the complement been $+12\%$, the result would be $+14.6\%$.
> >
> > This is Werner's point that the complement can often be more important than the observed data: with low credibility, most of the rate is driven by the complement. Method 3 suits the case because it transfers the statewide *change* rather than the statewide loss cost, so it stays largely unbiased even if the territory's cost level differs from the state's; the territory being a small part of the state keeps it largely independent too.

> [!example]- Harwayne's Method {Example}
> Class 1 in State X has thin data. States Y and Z write the same two classes but have different overall cost levels and different class mixes:
>
> | State | Class | Exposures | Losses | Pure premium |
> |---|---|---|---|---|
> | X | 1 | $200$ | $\$600$ | $\$3.00$ |
> | X | 2 | $300$ | $\$1{,}500$ | $\$5.00$ |
> | Y | 1 | $400$ | $\$1{,}440$ | $\$3.60$ |
> | Y | 2 | $200$ | $\$1{,}200$ | $\$6.00$ |
> | Z | 1 | $300$ | $\$750$ | $\$2.50$ |
> | Z | 2 | $600$ | $\$2{,}400$ | $\$4.00$ |
>
> Compute the Harwayne complement for class 1 in State X.
>
> > [!answer]-
> > **Step 1 — State X's average pure premium:**
> >
> > $$L_X = \frac{200(3.00) + 300(5.00)}{500} = \$4.20$$
> >
> > **Step 2 — Y's and Z's average pure premiums on State X's class mix** (X's exposures, each state's own class pure premiums):
> >
> > $$\begin{align*}
> > \hat{L}_Y &= \frac{200(3.60) + 300(6.00)}{500} = \$5.04 \\[4pt]
> > \hat{L}_Z &= \frac{200(2.50) + 300(4.00)}{500} = \$3.40
> > \end{align*}$$
> >
> > **Step 3 — adjustment factors, applied to each state's class 1 pure premium:**
> >
> > $$\begin{align*}
> > F_Y &= \frac{4.20}{5.04} = 0.833, & \hat{L}_{1,Y} &= 3.60(0.833) = \$3.00 \\[4pt]
> > F_Z &= \frac{4.20}{3.40} = 1.235, & \hat{L}_{1,Z} &= 2.50(1.235) = \$3.09
> > \end{align*}$$
> >
> > **Step 4 — combine, weighted by each state's class 1 exposures:**
> >
> > $$C = \frac{400(3.00) + 300(3.09)}{400 + 300} = \$3.04$$
> >
> > Step 2 is the step that makes this Harwayne's method. State Y's *own* average is $\$2{,}640 / 600 = \$4.40$, but that figure carries Y's class mix, which is heavier in the cheap class 1 than X's. Scaling by it ($3.60 \times 4.20/4.40 = \$3.44$) would treat part of a mix difference as a level difference. Re-weighting both states to X's exposure distribution leaves only the difference in cost level — legal environment, population density — for the factor to remove.
> >
> > Werner's evaluation: the complement is unbiased because it adjusts for the distributional differences, reasonably accurate when there is enough multi-state data, and mostly independent because it uses other states' data; the data is usually available, but the computation is time-consuming and harder to explain.
