---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a9836eb14145ac25df7de069c8f4b3ea3a1b603ffcb913067fc850e6197a8ad7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Visualization.md
---

**Data Visualization** is showing quantitative information as a graph or a table, so that a reader can see the pattern the numbers hold. Choosing the display is a modelling decision like any other: the right one depends on the message, the data and the audience. The same chart can inform one reader and mislead another.

> $$\text{Data-ink ratio} = \frac{\text{ink used to display the data}}{\text{total ink used in the graphic}}$$

- The data-ink ratio (Tufte's term) is the case for **decluttering**. Gridlines, borders, 3-D effects and redundant labels cost the reader attention and carry no data, so push the ratio up by removing what does not inform
- **Exploratory vs. explanatory** ([[Storytelling with Data (Knaflic - 2015)|Knaflic]]): exploration is looking at a hundred views to find the two that matter. Explanation shows those two to someone else. A model report is explanatory: the [[Exploratory Data Analysis|EDA]] plots that led somewhere belong in an appendix, and most belong nowhere
- **Table or graph?** ([[Show Me the Numbers (Few - 2012)|Few]]): use a table when the reader needs precise individual values, such as a model's coefficients. Use a graph when the message is in the *shape* of the data — a trend, a ranking, a comparison
- **How charts mislead** ([[How Charts Lie (Cairo - 2020)|Cairo]]): a bar chart whose axis does not start at zero, two series on dual axes, dubious or insufficient data, hidden uncertainty, and patterns that suggest a relationship the data do not support
- **Different goals** ([[Infovis and Statistical Graphics (Gelman and Unwin - 2012)|Gelman and Unwin]]): a graphic built to grab attention and one built to support statistical comparison make different trade-offs, and it is better to use two graphs than to cram both jobs into one
- For a predictive model, the exhibits that justify it to a business audience sort and aggregate the data to show **segmentation**: a [[Quantile Plot|lift (quantile) plot]], a [[Double Lift Chart|double lift chart]], a Lorenz curve with its [[Gini Index|Gini index]]. Policy-level [[Residual Plot|residual plots]] and [[QQ Plot|QQ plots]] are working diagnostics, not the evidence

> [!example]- A Truncated Axis {Example}
> A bar chart shows two territory relativities, $0.95$ and $1.05$, with the vertical axis starting at $0.90$. How much bigger does the second bar look than the first, and how much bigger is it actually?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Apparent ratio} &= \frac{1.05 - 0.90}{0.95 - 0.90} \\
> > &= \frac{0.15}{0.05} = 3.0 \\
> > \text{Actual ratio} &= \frac{1.05}{0.95} \\
> > &= 1.105
> > \end{align*}
> > $$
> > The bar is drawn **three times** as tall, but the relativity is only about $10.5\%$ higher. Bars encode value by *length*, so a bar chart's axis must start at zero. For small differences, plot the points instead, or show the differences from $1.00$ directly.

> [!example]- Choosing Exhibits for a Non-Technical Audience {Example}
> A candidate's model report to underwriting management includes a histogram of fitted values, a QQ plot of deviance residuals, and a table of $40$ coefficients with standard errors. What should replace them?
>
> > [!answer]-
> > None of the three shows the one thing management needs: **whether the model separates good risks from bad on data it has not seen**. Replace them with:
> >
> > - a [[Quantile Plot|quantile (lift) plot]] on the [[Holdout Sample|hold-out data]], showing actual loss cost rising from the best to the worst bucket;
> > - a [[Double Lift Chart|double lift chart]] against the current rating plan, showing where the new model is more accurate;
> > - a short table of the few rating factors that drive the result, with their relativities in plain terms ("$+25\%$ for …").
> >
> > State which data set each exhibit was built on. The residual diagnostics belong in a technical appendix.
