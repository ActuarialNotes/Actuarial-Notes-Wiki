---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:7e6d1dab6c4500c9dc77f73e56e067f844cebf3f075e2418ecadd3134ae5ebba
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 11 pp.193-198 (PDF pp.205-210); Ch. 12 pp.223-235 (PDF pp.235-247), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 9 p.156 (PDF p.162), Ch. 10 p.174 (PDF p.180), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Complement of Credibility.md
---

![[Media/Figures/Complement_of_Credibility.svg|340]]

A **Complement of Credibility** is the related experience that receives the remaining weight, $1 - Z$, when the observed experience is not fully [[Credibility|credible]]. The credibility-weighted estimate is

> $$\text{Estimate} = Z \times \text{Observed Experience} + (1 - Z) \times \text{Complement}$$

- $Z$ is the credibility of the observed experience, or base statistic.
- $\text{Complement}$ is the complement's estimate of the same quantity, such as a pure premium, an indicated rate change or a relativity.

Indicated rate changes are weighted as changes, not as loss ratios. When $Z$ is low, for a small class, a new territory or an excess layer, the complement determines most of the answer and can be more important than the observed data. ASOP No. 25 asks that related experience have frequency, severity or other characteristics that may reasonably be expected to be similar to the subject experience, and that experience which does not, or cannot be adjusted to, meet that criterion not be used. Data from other states or other lines can therefore inform a new state's analysis but cannot be treated as fully credible for it.

> [!example]- A territory's experience indicates $+25\%$ with credibility $Z = 0.20$. The complement is the statewide indicated change, $+6\%$. What is the weighted change, and how much of it comes from the complement? {Example}
> - The weighted change is $5.0\% + 4.8\% = +9.8\%$, the complement taking $0.80$ of the weight.
> - Nearly half the answer, $4.8$ of the $9.8$ points, comes from the complement.
> - Had the complement been $+12\%$, the weighted change would be $+14.6\%$.

## Desirable qualities of a complement

Boor gives six desirable qualities of a complement of credibility, against which each candidate is judged:

1. **Accurate.** It has as low an error variance as possible around the future expected losses.
2. **Unbiased.** It is not routinely higher or lower than the observed experience, so the differences average to zero over time.
3. **Statistically independent** from the base statistic, or any error in the base statistic can be compounded.
4. **Available.** The data needed to compute it is readily obtainable.
5. **Easy to compute**, and easy to understand, which matters most when the actuary must justify it to a third party such as a regulator.
6. **Logically related** to the base statistic, so that its use is easy to support.

An unbiased complement varies randomly around the following year's losses but may not be close to them. An accurate one may be consistently higher or lower, but it is always close.

## Loss costs of a larger group

The loss costs of a larger group that includes the group being rated is the first of Boor's six first-dollar complements. A multi-state insurer may use all the states in a region for one state, or countrywide data. Built on more data, the complement has a lower process variance than the subject. The subject was split out because it is believed to differ from the larger group, so the complement is likely biased. It can include or exclude the subject experience. If it excludes it, it is likely independent. If it includes it, the subject must not dominate the group.

> [!example]- A state's indication could be weighted with a region in which the state is $50\%$ of the exposure, or with a countrywide book in which it is $3\%$. Which complement is better on independence and bias? {Example}
> - The region's loss costs are half the state's own experience, so they are not independent of the base indication.
> - The countrywide loss costs include the state's data, but only as a small share, so they are nearly independent.
> - Countrywide loss costs are readily available and easy to compute.
> - They may be biased if the state differs systematically from the countrywide experience.

The loss costs of a larger related group, a separate but similar group, are the second complement. A homeowners insurer may use the owners forms' contents experience for the condo form. The complement is generally biased, with unknown size and direction, but it excludes the subject experience, so on independence it may be a better choice than the first. A larger related group's experience can also be biased by different underwriting guidelines or rating.

## Rate change from the larger group

The third complement applies the larger group's indicated change to the subject's current loss cost, rather than using the larger group's loss cost directly:

> $$C = \text{Subject Current Loss Cost} \times \frac{\text{Larger Group Indicated Loss Cost}}{\text{Larger Group Current Loss Cost}}$$

Even when the subject and the larger group have different overall loss costs, this complement is largely unbiased, and when rate changes are small it is likely accurate over the long term. Its independence depends on the size of the subject relative to the larger group. For a state's rate change, the complement can be the countrywide indicated change.

> [!example]- The subject's current loss cost is $\$200$. The larger group's indicated loss cost is $\$330$ against a current average loss cost of $\$300$. What is the complement? {Example}
> - The larger group's indicated change factor is $330/300 = 1.10$.
> - The complement is $200 \times 1.10 = \$220$.

## Harwayne's method

Harwayne's method is used when the subject and the related experience have significantly different distributions. A prime application is a state's class complement from other states, whose cost levels differ because of the legal environment or population density. It builds the complement from the other states' data, adjusted to remove the overall differences between the states:

1. Calculate the subject state's average pure premium on its own class exposures.
2. Restate each other state's average pure premium at the subject state's class exposure distribution, by weighting that state's class pure premiums by the subject state's class exposures.
3. Divide the subject state's average by each restated average to get each other state's adjustment factor.
4. Multiply each other state's pure premium for the class by its adjustment factor.
5. Average the adjusted class pure premiums, weighted by each other state's exposures in that class.

The complement is unbiased because it adjusts for the distributional differences. It is reasonably accurate when there is enough multi-state data, and mostly independent because it uses other states' data. The data is usually available, but the computation is time-consuming and harder to explain. It suits a case where class distributions differ by state, and low volume does not make it inappropriate.

> [!example]- State X has 200 class 1 exposures at a pure premium of $\$3.00$ and 300 class 2 exposures at $\$5.00$. State Y has 400 class 1 exposures at $\$3.60$ and 200 class 2 exposures at $\$6.00$. State Z has 300 class 1 exposures at $\$2.50$ and 600 class 2 exposures at $\$4.00$. What is the Harwayne complement for class 1 in State X? {Example}
> - State X's average pure premium is $(200 \times 3.00 + 300 \times 5.00)/500 = \$4.20$.
> - On State X's exposures, State Y's average is $(200 \times 3.60 + 300 \times 6.00)/500 = \$5.04$.
> - On State X's exposures, State Z's average is $(200 \times 2.50 + 300 \times 4.00)/500 = \$3.40$.
> - The adjustment factors are $4.20/5.04 = 0.833$ for Y and $4.20/3.40 = 1.235$ for Z.
> - The adjusted class 1 pure premiums are $3.60 \times 0.833 = \$3.00$ for Y and $2.50 \times 1.235 = \$3.09$ for Z.
> - Weighted by class 1 exposures, the complement is $(400 \times 3.00 + 300 \times 3.09)/700 = \$3.04$.

## Trended present rates

Where there is no larger group, the current rates are the best available proxy for the indicated rate, after two adjustments. The current rates are restated to what was last indicated rather than what was implemented. They are also trended for the change in loss cost level since they were set, from the original target effective date of the current rates to the target effective date of the new rates. The complement is

> $$C = \text{Present Rate} \times (1 + t)^n \times \frac{1 + \text{Prior Indicated Change}}{1 + \text{Prior Implemented Change}}$$

- $t$ is the selected annual loss trend, often the one used in the latest rate level indication.
- $n$ is the number of years from the target effective date of the last review to the target effective date of the new rates.
- The last factor is the residual indication, the part of the prior indication that was not implemented.

The target effective date, not the actual one, is the trend-from date, because changes are not always implemented when planned and rates may stay in effect for shorter or longer than planned. For an indicated rate change factor in the loss ratio method, the complement is

> $$C = \frac{\text{Loss Trend Factor}}{\text{Premium Trend Factor}} \times \frac{1 + \text{Prior Indicated Change}}{1 + \text{Prior Implemented Change}} - 1$$

> [!example]- The present average rate is $\$200$ and the loss trend is $5\%$ a year. The last review indicated $+10\%$, with a target effective date of January 1, 2011. The change implemented was $+6\%$, effective February 1, 2011. The next change is proposed for January 1, 2013. What is the complement? {Example}
> - The trend period runs from the last review's target effective date, January 1, 2011, to January 1, 2013, two years.
> - The trend factor is $1.05^{2} = 1.1025$.
> - The residual indication is $1.10/1.06 = 1.0377$.
> - The complement is $200 \times 1.1025 \times 1.0377 = \$229$.

The accuracy of the complement depends on the process variance of the historical loss costs, so it is used mainly for indications with voluminous data. It is unbiased, since purely trended loss costs are unbiased. It may not be independent: a complement from a review on 2007–2010 data shares years with subject experience on 2008–2011. The data is readily available, and the approach is easily explained. It is mainly appropriate when there is no larger group's data, since a larger related group, where one exists, is less correlated with the company's own experience.

## Competitors' rates

A new or small company whose own data is too unreliable may use competitors' rates as a complement, on the reasoning that a competitor with many more exposures has less process error. Competitors' manual rates reflect not only their loss costs but also marketing considerations, judgment and the effects of the regulatory process, which can make them inaccurate. Competitors may have different underwriting and claim practices, mix of business and limits, which create a bias that may be hard to quantify. Their rates are independent of the company's data, but may be difficult or time-consuming to obtain. A similar competitor's rates bear a logical relationship to the subject and are generally accepted by regulators, so this complement is often the only viable alternative.

A competitor's rate change is a poor complement, because its filing reflects its own book and goals rather than the company's needed change. Trended present rates, Harwayne's method or a larger related group are better choices. The current rate as a complement is simpler and quicker to compute than Harwayne's method, with fewer opportunities for error, and its direct relationship to the subject makes it easy to explain to management and regulators.

## Complements for excess ratemaking

Excess layers have very few claims, so the complement is often more important than the subject experience. Actuaries predict the excess loss costs from the losses below the attachment point $A$. Boor gives four methods for a layer of limit $L$ above $A$. The first, increased limits analysis, is

> $$C = L_A \times \frac{\text{ILF}_{A+L} - \text{ILF}_A}{\text{ILF}_A}$$

- $L_A$ are the losses capped at the attachment point.
- $\text{ILF}_A$ and $\text{ILF}_{A+L}$ are the [[Increased Limits|increased limits factors]] at the attachment point and at the top of the layer.

It needs ground-up losses not capped anywhere below the attachment point. A subject size-of-loss distribution different from the one behind the ILFs biases it. Its error is the parameter error in the ILFs, which tends to be independent of the base statistic, and it is more logically related to the losses below the attachment point than to the layer.

> [!example]- The losses capped at $\$500{,}000$ are $\$2{,}000{,}000$, the ILF at $\$500{,}000$ is $2.50$ and the ILF at $\$750{,}000$ is $3.00$. What is the complement for the layer from $\$500{,}000$ to $\$750{,}000$? {Example}
> - The share of the capped losses that falls in the layer is $(3.00 - 2.50)/2.50 = 0.20$.
> - The complement is $2{,}000{,}000 \times 0.20 = \$400{,}000$.

Lower limits analysis uses losses capped at a lower limit $d$, often the basic limit, $L_d \times (\text{ILF}_{A+L} - \text{ILF}_A)/\text{ILF}_d$. With $\$1{,}500{,}000$ of losses capped at $\$250{,}000$ and an ILF of $1.75$ there, it gives $\$428{,}571$ for the same layer. Losses capped at the basic limit are coded for statistical reporting and can come from policies at every limit. Capping lower may make the estimate more stable, but differences in size-of-loss distributions are exacerbated, so it is likely more biased.

Limits analysis is used when losses capped at a single point are not available, as for a reinsurer facing policies written at many limits. Each policy limit $d$ is analyzed separately, and the complement is

> $$C = \text{LR} \times \sum_{d} P_d \times \frac{\text{ILF}_{\min(d,\, A+L)} - \text{ILF}_A}{\text{ILF}_d}$$

- $\text{LR}$ is the total limits expected loss ratio.
- $P_d$ is the total premium of the policies with limit $d$.
- Only limits above the attachment point contribute, since a limit at or below it has no losses in the layer.

Expected losses at a limit are the expected loss ratio times its premium, and the share of those losses that falls in the layer is the difference of the ILFs at the layer's upper and lower limits divided by the ILF at the policy limit. The method adds the assumption that the expected loss ratio does not vary by limit.

Fitted curves smooth the volatility of the data and extrapolate to higher limits, and the share of the curve's total losses that falls in the layer is applied to the total limits loss costs. The method tends to be less biased and more stable than the other three, and more accurate when the higher layers have few claims. It is less independent, the most complex to compute and the hardest to communicate.

## Complements in reserving and classification

In reserving, the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] method is a credibility weighting of the development method, with credibility $Z = 1/\text{CDF}$, and the expected claims method, which receives the complement $1 - Z$. The [[Cape Cod Method|Cape Cod]] technique differs chiefly in deriving the expected claim ratio from the reported claims experience rather than from an independent selection. External or industry data used as a complement may not be comparable with the company's own, because of differences in coverage, underwriting, claim and reserving practices, development patterns and mix of business, and it may need adjustment.

In classification ratemaking, the complement of an indicated relativity is often the current relativity, normalized so that its weighted average is $1.00$. When a GLM's estimate for a level is not credible, a competitor's factor, an industry benchmark or a blend of them can serve instead. New higher limits can likewise take industry or bureau ILFs, alone or credibility-weighted with the company's own.

> [!trap] Choosing the complement only for convenience
> The lower $Z$ is, the more the complement decides the answer, so it deserves the most scrutiny exactly when the data is thinnest. A complement that is convenient but biased, such as a region dominated by the state itself, carries its error straight into the rate.
