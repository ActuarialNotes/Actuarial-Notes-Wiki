---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c6b6d6b6e97e4f031d9b4c8b07364375c34b1fb55ecf99968429cc3ce1211652
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bivariate Data Exploration.md
---

**Bivariate data exploration** examines two variables at a time, most often each predictor against the target and pairs of predictors against each other, to see whether and how they are related before a model is fitted. The plot and the summary depend on the [[Data Types|types]] of the two variables, and what the exploration finds shapes the model: which predictors to keep, which need a transformation, and which pairs are redundant. It follows [[Univariate Plot|univariate exploration]] in [[Exploratory Data Analysis|exploratory data analysis]].

> $$r = \frac{\sum_{i}(x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i}(x_i - \bar{x})^2\,\sum_{i}(y_i - \bar{y})^2}}$$

> $$\hat{p}_{j \mid i} = \frac{n_{ij}}{n_{i\cdot}}$$

| Pair of variables | Plot | Summary |
|---|---|---|
| Numeric and numeric | [[Scatter Plot]] with a smoother | [[Correlation]] $r$ |
| Categorical and numeric | One [[Box Plot]] per level, side by side | Mean or median by level |
| Categorical and categorical | Two-way table, stacked or filled bar chart, mosaic plot | Row proportions |

- **Symbols:** $r$ is the sample correlation of $n$ pairs $(x_i, y_i)$. In a two-way table, $n_{ij}$ is the count (or exposure) in row $i$ and column $j$, $n_{i\cdot}$ is the row total, and $\hat{p}_{j \mid i}$ is the share of row $i$ in column $j$, such as the lapse rate of one payment plan.
- **Reading each display:** A scatter plot shows the direction, form and strength of a relationship and any points far from the cloud. Box plots by level compare centres and spreads across groups. A mosaic plot draws each row as a column of tiles whose width is the row's share of the data and whose heights are its row proportions, so each tile's area is its cell's share of the total. A binary target against a numeric predictor is easiest to read as the event rate by band of the predictor.
- **Against the target and between predictors:** Plots of the target against a predictor show whether the predictor carries signal and in what shape; a curve suggests a [[Variable Transformation|transformation]] or binning. Plots of predictors against each other find near duplicates, whose high correlation would make a GLM's coefficients unstable, and sparse combinations of levels.
- **Its limits:** A bivariate pattern can be produced by a third variable, so a predictor that looks strong on its own may add nothing once others are in the model, and a weak-looking one may matter jointly. Frequency and severity should be compared as rates per unit of [[Earned Exposure|exposure]] or per claim, not as raw counts or totals, or a group looks worse simply because it is larger.

> [!example]- Lapse Rate by Payment Plan {Example}
> At renewal, 10,000 auto policies are classified by payment plan, and 990 of them lapsed.
>
> | Payment plan | Policies | Lapsed |
> |---|---|---|
> | Monthly, automatic withdrawal | 6,000 | 540 |
> | Monthly, card or cheque | 2,500 | 375 |
> | Annual | 1,500 | 75 |
>
> Compute the lapse rate of each plan, describe the mosaic plot, and say what the table suggests for a lapse model.
>
> > [!answer]-
> > Each lapse rate is a row proportion, $\hat{p}_{\text{lapse} \mid i} = n_{i,\text{lapse}}/n_{i\cdot}$.
> > $$
> > \begin{align*}
> > \text{Automatic} &= \frac{540}{6{,}000} \\
> > &= 9\% \\
> > \text{Card or cheque} &= \frac{375}{2{,}500} \\
> > &= 15\% \\
> > \text{Annual} &= \frac{75}{1{,}500} \\
> > &= 5\%
> > \end{align*}
> > $$
> > The overall rate is $990/10{,}000 = 9.9\%$. In the mosaic plot the three columns are 60%, 25% and 15% of the width, and the lapse tiles are 9%, 15% and 5% of their heights, so the eye sees at once that the card-or-cheque column, a quarter of the width, has the tallest lapse tile. Payment plan is clearly related to lapse and belongs in the model, as a categorical predictor with three levels. Whether it causes lapse, or marks customers who were already less committed, the table cannot say.

> [!example]- One Claim Drives the Correlation {Example}
> Six collision claims have vehicle values $x$ of 10, 15, 20, 25, 30 and 80 and severities $y$ of 5, 3, 6, 4, 5 and 13, both in thousands. Compute the correlation with and without the last claim.
>
> > [!answer]-
> > With all six claims, $\bar{x} = 30$ and $\bar{y} = 6$, and the sums of squares and cross-products are $\sum(x_i - \bar{x})(y_i - \bar{y}) = 425$, $\sum(x_i - \bar{x})^2 = 3{,}250$ and $\sum(y_i - \bar{y})^2 = 64$.
> > $$
> > \begin{align*}
> > r_6 &= \frac{425}{\sqrt{3{,}250 \times 64}} \\
> > &= \frac{425}{456.07} \\
> > &= 0.932
> > \end{align*}
> > $$
> > Without the last claim, $\bar{x} = 20$ and $\bar{y} = 4.6$, and the three sums are 5, 250 and 5.2.
> > $$
> > \begin{align*}
> > r_5 &= \frac{5}{\sqrt{250 \times 5.2}} \\
> > &= \frac{5}{36.06} \\
> > &= 0.139
> > \end{align*}
> > $$
> > A single expensive vehicle turns a weak relationship into an apparently strong one. The scatter plot shows this at a glance, while the correlation alone does not. A log scale for both values, or a check of the correlation without the point, shows how much of the relationship rests on one claim.

> [!tip]- How it appears on the exam
> - **PA** asks candidates to apply bivariate data exploration techniques, in written tasks on a data set described in the exam. A task may give a scatter plot, box plots by level or a two-way table and ask what it shows about a predictor's relationship with the target, or ask which display suits a given pair of variables.
> - **What follows from it:** Tasks then ask what to do with the finding: transform or bin a predictor, combine sparse levels, drop one of two highly correlated predictors, or keep a variable whose relationship is non-linear.
> - **Graph principles:** Choosing an appropriate display and reading it correctly also fall under PA's objective on the key principles of constructing graphs ([[Data Visualization]]).

> [!warning]- Exam traps
> - **Correlation is linear:** A correlation near zero rules out a straight-line relationship only. A U-shaped effect, such as driver age on frequency, can have $r \approx 0$ and still be a strong predictor.
> - **One point can make the correlation:** A single extreme observation can create or destroy a correlation. A plot of the data, made before $r$ is quoted, shows whether one point is doing the work.
> - **Counts instead of rates:** A territory with more claims may simply have more cars. The comparison should use claims per unit of exposure, and lapses per policy, rather than totals.
> - **Column proportions for row questions:** Lapse rates are compared across payment plans by dividing by the plan (row) totals. Dividing by the lapse (column) total gives each plan's share of lapses, which mostly reflects the plan's size.
> - **Bivariate is not multivariate:** A predictor that is strong alone may be explained by another predictor, as when a territory effect comes from the territory's mix of young drivers. The model, not the pair of variables, decides what each predictor adds.
