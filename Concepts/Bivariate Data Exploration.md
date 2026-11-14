---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e7e101a41b8d6d19742ebbb31fc33a59ccb2de1b2a04b143d9bcf480fbe64bed
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bivariate Data Exploration.md
---
**Bivariate Data Exploration** is the examination of two variables at a time, most often each predictor against the target and pairs of predictors against each other, to see whether and how they are related before a model is fitted. It follows [[Univariate Plot|univariate exploration]] in [[Exploratory Data Analysis|exploratory data analysis]].

The plot and the summary depend on the [[Data Types|types]] of the two variables:

| Pair of variables | Plot | Summary |
|---|---|---|
| Numeric and numeric | [[Scatter Plot]] with a smoother | [[Correlation]] $r$ |
| Categorical and numeric | One [[Box Plot]] per level, side by side | Mean or median by level |
| Categorical and categorical | Two-way table, stacked or filled bar chart, mosaic plot | Row proportions |

A scatter plot shows the direction, form and strength of a relationship and any points far from the cloud. Box plots by level compare centres and spreads across groups. A binary target against a numeric predictor is easiest to read as the event rate by band of the predictor.

What the exploration finds shapes the model. Plots of the target against a predictor show whether the predictor carries signal and in what shape, and a curve suggests a [[Variable Transformation|transformation]] or binning. Plots of predictors against each other find near duplicates, whose high correlation would make a GLM's coefficients unstable, and sparse combinations of levels.

## Correlation of two numeric variables

The sample correlation of $n$ pairs $(x_i, y_i)$ is

> $$r = \frac{\sum_{i}(x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i}(x_i - \bar{x})^2\,\sum_{i}(y_i - \bar{y})^2}}$$

- $\bar{x}$ and $\bar{y}$ are the sample means of the $x_i$ and the $y_i$.

A single extreme observation can create or destroy a correlation, so the data are plotted before $r$ is quoted.

> [!example]- How much of the correlation between vehicle value and severity rests on the last of these six claims? {Example}
> Six collision claims have these vehicle values $x$ and severities $y$, both in thousands:
>
> | Claim | 1 | 2 | 3 | 4 | 5 | 6 |
> | :--- | ---: | ---: | ---: | ---: | ---: | ---: |
> | $x$ | 10 | 15 | 20 | 25 | 30 | 80 |
> | $y$ | 5 | 3 | 6 | 4 | 5 | 13 |
>
> > [!answer]-
> > - With all six claims, $\bar{x} = 30$ and $\bar{y} = 6$.
> > - The cross-product sum is $425$, and the sums of squares are $3{,}250$ for $x$ and $64$ for $y$.
> > - The correlation is $r_6 = 425/\sqrt{3{,}250 \times 64} = 425/456.07 = 0.932$.
> > - Without the last claim, $\bar{x} = 20$ and $\bar{y} = 4.6$, and the three sums are $5$, $250$ and $5.2$.
> > - The correlation is then $r_5 = 5/\sqrt{250 \times 5.2} = 5/36.06 = 0.139$.
> > - One expensive vehicle turns a weak relationship into an apparently strong one. The scatter plot shows this at a glance, while the correlation alone does not.

## Row proportions in a two-way table

In a two-way table of two categorical variables, the share of row $i$ in column $j$ is

> $$\hat{p}_{j \mid i} = \frac{n_{ij}}{n_{i\cdot}}$$

- $n_{ij}$ is the count (or exposure) in row $i$ and column $j$.
- $n_{i\cdot}$ is the row total.

Rates are compared across rows by dividing by the row totals. Dividing by a column total gives each row's share of that column, which mostly reflects the row's size. A mosaic plot draws each row as a column of tiles whose width is the row's share of the data and whose heights are its row proportions, so each tile's area is its cell's share of the total.

> [!example]- What are the lapse rates of these three payment plans, and what do they suggest for a lapse model? {Example}
> At renewal, 10,000 auto policies are classified by payment plan, and 990 of them lapsed.
>
> | Payment plan | Policies | Lapsed |
> |---|---|---|
> | Monthly, automatic withdrawal | 6,000 | 540 |
> | Monthly, card or cheque | 2,500 | 375 |
> | Annual | 1,500 | 75 |
>
> > [!answer]-
> > - Each lapse rate is a row proportion, the lapses divided by the plan's policies.
> > - The rates are $540/6{,}000 = 9\%$ for automatic withdrawal, $375/2{,}500 = 15\%$ for card or cheque and $75/1{,}500 = 5\%$ for annual.
> > - The overall rate is $990/10{,}000 = 9.9\%$.
> > - In the mosaic plot the columns are 60%, 25% and 15% of the width, and the card-or-cheque column has the tallest lapse tile.
> > - Payment plan is clearly related to lapse and belongs in the model, as a categorical predictor with three levels. Whether it causes lapse, or marks customers who were already less committed, the table cannot say.

## Limits of bivariate exploration

A bivariate pattern can be produced by a third variable. A predictor that looks strong on its own may add nothing once others are in the model, as when a territory effect comes from the territory's mix of young drivers, and a weak-looking one may matter jointly. Frequency and severity are compared as rates per unit of [[Earned Exposure|exposure]] or per claim, not as raw counts or totals, or a group looks worse simply because it is larger.

> [!trap] Reading a correlation near zero as no relationship
> Correlation measures a straight-line relationship only. A U-shaped effect, such as driver age on frequency, can have $r \approx 0$ and still be a strong predictor. The scatter plot shows the curve.
