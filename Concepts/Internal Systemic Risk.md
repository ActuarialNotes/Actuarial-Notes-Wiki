---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6953e371b71994ea302b5880a3449b78b085b9d7ee4211e9ccaeddaa5cc4df25
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Internal Systemic Risk.md
---

**Internal Systemic Risk** is the uncertainty that arises because the actuarial valuation models are an imperfect representation of the insurance process. It is risk internal to the valuation process itself, also called model specification risk. In [[A Framework for Assessing Risk Margins (Marshall et al. - 2008)|Marshall et al. (2008)]] it is one of the three sources of uncertainty behind a [[Risk Margin|risk margin]]. Stochastic models fitted to the data cannot see it, so it is assessed by scoring the modelling infrastructure on a balanced scorecard and mapping the score to a [[Coefficient of Variation|CoV]].

## Sources of internal systemic risk

Internal systemic risk has three sources, each with its own risk indicators:

- **Specification error** is the inability to build a model fully representative of the insurance process. Indicators include the number of independent models, whether claim or payment types are modelled separately, the range of results, reasonableness checks, goodness of fit, subjective adjustments, monitoring, the ability to detect trends, and the sophistication of the superimposed inflation analysis.
- **Parameter selection error** arises because the model cannot adequately measure all the predictors of claim cost outcomes, or trends in them. Indicators include whether the best predictors have been identified, whether they are stable over time, and whether those used lead rather than lag claim costs.
- **Data error** comes from poor or unavailable data, or inadequate knowledge of the portfolio, including its pricing, underwriting and claims processes. Indicators include knowledge of past processes, information from the business, reconciliations, robust data processes, and past revisions of data.

## The balanced scorecard

Each risk indicator of a valuation class is scored, and the class's score is the weighted average

> $$\bar s = \frac{\sum_r v_r\,s_r}{\sum_r v_r}$$

- $s_r$ is risk indicator $r$'s score from $1$ to $5$ ($5$ is best practice).
- $v_r$ is the indicator's weight, which reflects how much it matters for that class.

Each indicator is scored against best practice even where best practice is not possible for the portfolio, since it is easy to be defensive about one's own models. The scoring is of the approach actually used for the central estimate.

A CoV scale maps $\bar s$ to the class's CoV. The scale comes from judgement, supported by hindsight analysis of past model performance. Marshall et al. suggest the minimum CoV for a "perfect" model is unlikely to be much less than $5\%$. For a single aggregated model with limited data, few predictors and heavy subjective adjustment, $20\%$ or more is readily justifiable and may be the largest source of uncertainty. Their example scale is not linear, and is higher for long-tail classes.

> [!example]- What is this class's internal systemic risk CoV, and what does improving its superimposed inflation analysis to a score of 4 do? {Example}
> A long-tail liability class is scored on six indicators:
>
> | Source | Indicator | Score | Weight |
> | :--- | :--- | ---: | ---: |
> | Specification | Number of independent models used | 3 | 5 |
> | Specification | Checks made on reasonableness of results | 4 | 4 |
> | Specification | Superimposed inflation analysis | 2 | 6 |
> | Parameter selection | Value of predictors used | 3 | 5 |
> | Data | Reconciliations and quality control | 5 | 3 |
> | Data | Past mis-estimation from data revision | 4 | 2 |
>
> The CoV scale for this class (the paper's example scale for its long-tail CTP class) is $11.5\%$ for scores of $3.0$ to $3.5$ and $9.5\%$ for $3.5$ to $4.0$.
>
> > [!answer]-
> > - The weighted scores sum to $15 + 16 + 12 + 15 + 15 + 8 = 81$, and the weights to $25$.
> > - The class's score is $\bar s = 81/25 = 3.24$, in the $3.0$ to $3.5$ band, so the CoV is $11.5\%$.
> > - Scoring the [[Superimposed Inflation|superimposed inflation]] indicator $4$ adds $2 \times 6 = 12$ to the numerator, so $\bar s = 93/25 = 3.72$.
> > - That moves the class into the next band and cuts the CoV to $9.5\%$.
> > - A heavily weighted indicator scored poorly is where better analysis pays off most.

## Combining valuation classes

Internal systemic risk is uncorrelated with [[Independent Risk|independent]] and [[External Systemic Risk|external systemic risk]]. It is correlated between valuation classes, through the "same actuary" effect and template models, and between outstanding claim and premium liabilities where the premium liability method uses outstanding claim results. The internal systemic risk CoV of a group of classes is

> $$\mathrm{CoV}_{\text{int}} = \frac{\sqrt{\sum_i\sum_j \rho_{ij}\,(w_i c_i)(w_j c_j)}}{\sum_i w_i}$$

- $c_i$ is class $i$'s internal systemic risk CoV.
- $w_i$ is class $i$'s share of the central estimate.
- $\rho_{ij}$ is the correlation between classes $i$ and $j$, with $\rho_{ii} = 1$.

> [!example]- What is the combined internal systemic risk CoV of these two classes, and how does it compare with nil and full correlation? {Example}
> Liability makes up $60\%$ of outstanding claims, with an internal systemic risk CoV of $9\%$, and property $40\%$, with $6\%$. The same actuary values both with similar methods, and the correlation is set in the medium band at $50\%$.
>
> > [!answer]-
> > - The weighted CoVs are $0.6 \times 9\% = 5.4\%$ and $0.4 \times 6\% = 2.4\%$.
> > - The squared CoV is $0.054^2 + 0.024^2 + 2(0.5)(0.054)(0.024) = 0.002916 + 0.000576 + 0.001296 = 0.004788$.
> > - The combined CoV is $\sqrt{0.004788} = 6.92\%$.
> > - With nil correlation the CoV would be $\sqrt{0.003492} = 5.91\%$. With full correlation it would be $5.4\% + 2.4\% = 7.8\%$.
> > - The shared actuary and methods keep most of the diversification from appearing, since a flaw in the approach would hit both classes at once.
