---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:661f19dd251fefb7d337dcc7b6fc64bdab5525418877c18c000868ae6ba0e830
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 11 pp.193-198 (PDF pp.205-210); Ch. 12 pp.223-235 (PDF pp.235-247), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 9 p.156 (PDF p.162), Ch. 10 p.174 (PDF p.180), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Complement of Credibility.md
---

![[Media/Figures/Complement_of_Credibility.svg|340]]

A **Complement of Credibility** is the estimate that receives the weight $1 - Z$ when observed experience receives [[Credibility|credibility]] $Z$. The credibility-weighted estimate is

> $$U = Z D + (1 - Z) M$$

- $D$ is the observed experience.
- $M$ is the complement of credibility.

When $Z$ is low (a small class, a new territory, an excess layer) the complement, not the data, determines the answer.

> [!example]- A territory's experience indicates a rate change of $+25\%$ but earns only $Z = 0.20$. The complement is the statewide indicated change applied to the territory's present rates, $+6\%$. What is the credibility-weighted change, and how much of it comes from the complement? {Example}
> - The weighted change is $0.20(25\%) + 0.80(6\%) = 5.0\% + 4.8\% = +9.8\%$.
> - Nearly half the answer, $4.8$ of $9.8$ points, comes from the complement.
> - The result moves $0.8$ points for every point the complement moves: a complement of $+12\%$ would give $+14.6\%$.

> [!idea] The idea
> With low credibility, most of the rate is driven by the complement, so the complement can be more important than the observed data.

## Desirable qualities of a complement

Boor lists six desirable qualities of a complement. It should be:

1. **Accurate**: as low an error variance as possible around the future expected losses.
2. **Unbiased**: not routinely higher or lower than the observed experience.
3. **Statistically independent** from the base statistic, or any error in the base statistic can be compounded.
4. **Available**: the data needed to compute it is readily obtainable.
5. **Easy to compute**: easy to perform and understand, which matters most when the actuary must justify it to a third party such as a regulator.
6. **Logically related** to the base statistic, so that its use is easy to support.

## First-dollar complements

Werner & Modlin give six first-dollar complements:

1. **Loss costs of a larger group that includes the group being rated**, such as all states in the region for the state under review. It can be built to include or exclude the subject experience. If included, the subject must not dominate the group.
2. **Loss costs of a larger related group**, a *separate* but similar group, such as owners-form contents experience for the condo form. It is generally biased, but because it does not contain the subject experience it may be a better choice than method 1 on independence.
3. **Rate change from the larger group applied to present rates**: the larger group's indicated change applied to the subject's current loss cost, rather than the larger group's loss costs used directly.
4. **Harwayne's method**: other states' data adjusted to remove the overall differences between states before it is used, so that a state with a higher cost level does not import that level into the class complement.
5. **Trended present rates**: the current rate adjusted to what was last *indicated* rather than implemented, and trended from the original target effective date of the current rates to that of the new rates. The trend applied is an annual loss trend, often the one used in the latest rate level indication, because the change in loss cost level since the current rates were set comes from monetary inflation, distributional shifts, safety advances and the like.
6. **Competitors' rates**, used by a new or small company whose own data is too unreliable, on the reasoning that a competitor with many more exposures has less process error. Competitors' manual rates reflect not only their loss costs but also marketing considerations, judgment and the effects of the regulatory process, all of which can make them inaccurate. Competitors may also have different underwriting and claim practices, which creates a bias that may be difficult to quantify. The rates are independent of the company's own data, but they may be difficult or time-consuming to obtain. A similar competitor's rates bear a logical relationship to the subject and are generally accepted by regulators, so this complement is often the only viable alternative (Werner & Modlin, Ch. 12).

The loss costs of a larger related group may be biased. Method 3 mitigates this by transferring the larger group's indicated *change* rather than its loss cost, so even when the subject and the larger group have different overall loss costs the complement is largely unbiased. Its independence depends on how large the subject is relative to the larger group.

ASOP No. 25, as Werner quotes it, requires related experience whose frequency, severity or other determinable characteristics may reasonably be expected to be similar to the subject experience. Related experience that does not, or cannot be adjusted to, meet that criterion should not be used. Trended present rates are the worked case: the current rate is brought forward for [[Loss Trend|loss trend]] before it is blended.

## Harwayne's method

Harwayne's method adjusts each other state's class pure premium by the ratio of the subject state's average pure premium to that state's average pure premium on the subject state's class mix:

> $$F_j = \frac{L_X}{\hat{L}_j}$$

- $L_X$ is the subject state's average pure premium.
- $\hat{L}_j$ is state $j$'s average pure premium using the subject state's exposures and state $j$'s class pure premiums.

The complement is the exposure-weighted average of the adjusted class pure premiums. Werner's evaluation: the complement is unbiased because it adjusts for the distributional differences, reasonably accurate when there is enough multi-state data, and mostly independent because it uses other states' data. The data is usually available, but the computation is time-consuming and harder to explain.

> [!example]- Class 1 in State X has thin data. What is the Harwayne complement for class 1 in State X, from the data below? {Example}
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
> - State X's average pure premium is $L_X = [200(3.00) + 300(5.00)]/500 = \$4.20$.
> - On State X's class mix, Y's average is $[200(3.60) + 300(6.00)]/500 = \$5.04$ and Z's is $[200(2.50) + 300(4.00)]/500 = \$3.40$.
> - The factors are $F_Y = 4.20/5.04 = 0.833$ and $F_Z = 4.20/3.40 = 1.235$.
> - The adjusted class 1 pure premiums are $3.60(0.833) = \$3.00$ and $2.50(1.235) = \$3.09$.
> - Weighted by class 1 exposures, the complement is $[400(3.00) + 300(3.09)]/700 = \$3.04$.

> [!trap] Scaling by a state's own average
> State Y's *own* average is $\$2{,}640 / 600 = \$4.40$, but that figure carries Y's class mix, which is heavier in the cheap class 1 than X's. Scaling by it ($3.60 \times 4.20/4.40 = \$3.44$) treats part of a mix difference as a level difference. Re-weight each state to the subject state's exposures first.

## Excess complements

Excess layers have very few claims, so the complement is often more important than the subject experience, and actuaries predict the excess loss costs from losses below the attachment point. For a layer from the attachment point $A$ to $A + L$, the increased limits analysis complement is

> $$M = L_A \times \frac{\text{ILF}_{A+L} - \text{ILF}_A}{\text{ILF}_A}$$

- $L_A$ is the losses capped at the attachment point.
- $\text{ILF}_A$ and $\text{ILF}_{A+L}$ are the increased limits factors at the attachment point and at the top of the layer.

> [!example]- Losses capped at a $\$500{,}000$ attachment point total $\$3{,}000{,}000$. The ILF is $1.40$ at $\$500{,}000$ and $1.60$ at $\$1{,}000{,}000$. What is the increased limits analysis complement for the layer from $\$500{,}000$ to $\$1{,}000{,}000$? {Example}
> - The layer's share relative to the capped losses is $(1.60 - 1.40)/1.40 = 0.1429$.
> - The complement is $3{,}000{,}000 \times 0.1429 = \$428{,}571$.

Werner & Modlin (Ch. 12) give Boor's four methods:

1. **Increased limits analysis.** The losses capped at the attachment point are multiplied by the ILF at the top of the layer minus the ILF at the attachment point, divided by the ILF at the attachment point. It needs ground-up losses that have not been capped anywhere below the attachment point, so a policy whose limit is below the attachment point cannot supply them. The subject's size-of-loss distribution may differ from the one behind the ILFs, which biases it. Its error is the parameter error in the selected ILFs, which tends to be independent of the base statistic, and it is more logically related to the losses below the attachment point than to the layer.
2. **Lower limits analysis.** The same calculation with losses capped at a limit below the attachment point, often the basic limit: the losses capped at the lower limit are multiplied by the ILF at the top of the layer minus the ILF at the attachment point, divided by the ILF at the lower limit. Increased limits analysis is the special case where the lower limit is the attachment point. Losses capped at the basic limit can be taken from policies at every limit at or above it, and insurers usually code them for statistical reporting. Capping lower may make the estimate more stable, but differences in size-of-loss distributions are exacerbated, so it is likely more biased, and it is related to the lower-limit losses rather than to the losses in the layer.
3. **Limits analysis.** Used when losses capped at a single point are not available, as for a reinsurer without the full loss distribution facing policies written at many limits. Each policy limit is analysed separately. Premium at a limit times the expected loss ratio estimates the expected losses of the policies at that limit, and an ILF ratio takes the share of those losses that falls in the layer. The complement is the total limits expected loss ratio times the sum, over the policy limits, of the total premium at each limit times that limit's share. A limit at or below the attachment point contributes nothing to the layer. For a limit inside the layer the share is the ILF at the limit minus the ILF at the attachment point, divided by the ILF at the limit. For a limit above the top of the layer the share is the ILF at the top of the layer minus the ILF at the attachment point, divided by the ILF at the limit. It adds the assumption that the expected loss ratio does not vary by limit.
4. **Fitted curves.** A curve fitted to the data smooths its volatility and extrapolates to higher limits, and the share of the curve's total losses that falls in the layer is applied to the total limits loss costs. It tends to be less biased and more stable than the other three, and more accurate when the higher layers have few claims, but it is less independent, the most complex to compute and harder to communicate.

## Complement in reserving

In reserving, the [[Bornhuetter-Ferguson Method|BF]] method is a credibility weighting of the development method (credibility $Z = 1/\text{CDF}$) with the expected claims method, which receives the complement $1 - Z$. The [[Cape Cod Method|Cape Cod]] technique differs from BF chiefly in deriving the expected claim ratio from the reported claims experience rather than from an independent, often judgmental selection.

> [!example]- An accident year has a cumulative development factor of $2.5$ to ultimate. What weight does the Bornhuetter-Ferguson method give the expected claims method? {Example}
> - The development method gets credibility $Z = 1/2.5 = 0.40$.
> - The expected claims method gets the complement, $1 - 0.40 = 0.60$.
