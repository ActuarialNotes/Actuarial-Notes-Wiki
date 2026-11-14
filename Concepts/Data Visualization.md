---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:05058b2cc9319c03bf2873718565ce80e669fdb16e1181689d8d0b20792007c8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Visualization.md
---

**Data Visualization** is showing quantitative information as a graph or a table, so that a reader can see the pattern the numbers hold. The right display depends on the message, the data and the audience, and the same chart can inform one reader and mislead another.

Tufte's **data-ink ratio**, the case for decluttering, is

> $$\text{Data-ink ratio} = \frac{\text{ink used to display the data}}{\text{total ink used in the graphic}}$$

Gridlines, borders, 3-D effects and redundant labels cost the reader attention and carry no data, so push the ratio up by removing what does not inform.

## Exploratory and explanatory graphics

[[Storytelling with Data (Knaflic - 2015)|Knaflic]] separates exploration from explanation. Exploration is looking at a hundred views to find the two that matter. Explanation shows those two to someone else. A model report is explanatory: the [[Exploratory Data Analysis|EDA]] plots that led somewhere belong in an appendix, and most belong nowhere.

[[Infovis and Statistical Graphics (Gelman and Unwin - 2012)|Gelman and Unwin]] make a related point. A graphic built to grab attention and one built to support statistical comparison make different trade-offs, and it is better to use two graphs than to cram both jobs into one.

## Tables and graphs

[[Show Me the Numbers (Few - 2012)|Few]] gives the choice between them. Use a table when the reader needs precise individual values, such as a model's coefficients. Use a graph when the message is in the *shape* of the data, such as a trend, a ranking or a comparison.

## Misleading charts

[[How Charts Lie (Cairo - 2020)|Cairo]] lists the ways a chart misleads: a bar chart whose axis does not start at zero, two series on dual axes, dubious or insufficient data, hidden uncertainty, and patterns that suggest a relationship the data do not support.

Bars encode value by *length*, so a bar chart's axis must start at zero. On a bar chart whose axis starts at $a$, a bar of value $v_1$ looks as many times as long as a bar of value $v_2$ as

> $$\text{Apparent ratio} = \frac{v_1 - a}{v_2 - a}$$

> [!example]- A bar chart's axis starts at $0.90$. How many times as tall is a bar of $1.05$ drawn as one of $0.95$? {Example}
> - The apparent ratio is $(1.05 - 0.90)/(0.95 - 0.90) = 0.15/0.05 = 3.0$.
> - The actual ratio is $1.05/0.95 = 1.105$.
> - The bar is drawn three times as tall, but $1.05$ is only about $10.5\%$ higher than $0.95$.
> - For small differences, plot the points instead, or show the differences from $1.00$ directly.

## Exhibits for a model report

For a predictive model, the exhibits that justify it to a business audience sort and aggregate the data to show **segmentation**: a [[Quantile Plot|lift (quantile) plot]], a [[Double Lift Chart|double lift chart]], and a Lorenz curve with its [[Gini Index|Gini index]]. Policy-level [[Residual Plot|residual plots]] and [[QQ Plot|QQ plots]] are working diagnostics, not the evidence.

> [!example]- What should replace these exhibits in a model report to underwriting management? {Example}
> The draft report includes a histogram of fitted values, a QQ plot of deviance residuals, and a table of $40$ coefficients with standard errors.
>
> > [!answer]-
> > - None of the three shows what management needs: whether the model separates good risks from bad on data it has not seen.
> > - A [[Quantile Plot|quantile (lift) plot]] on the [[Holdout Sample|holdout data]] shows actual loss cost rising from the best to the worst bucket.
> > - A [[Double Lift Chart|double lift chart]] against the current rating plan shows where the new model is more accurate.
> > - A short table of the few rating factors that drive the result gives their relativities in plain terms ("$+25\%$ for …").
> > - Each exhibit states which data set it was built on, and the residual diagnostics move to a technical appendix.
