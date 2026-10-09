---
aliases:
  - Dependence Plot
  - Individual Conditional Expectation Plot
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2c282880597fac9c2ba464d5f5931f23d357351aeb090db6ce1f703aa3ef1d8d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Partial Dependence Plot.md
---
A **Partial Dependence Plot** (PDP) shows how a fitted model's prediction changes on average as one or two features are varied, while every other feature keeps the values it has in the data. Friedman (2001) introduced it to read the shape of a [[Boosting|gradient boosting]] model's effects. An **individual conditional expectation** (ICE) plot, from Goldstein et al. (2015), draws one curve per record instead, and the PDP is the average of those curves.

> $$\hat{f}^{(i)}_S(x_S) = \hat{f}\big(x_S, \mathbf{x}_{C,i}\big)$$

> $$\hat{f}_S(x_S) = \frac{1}{n}\sum_{i=1}^{n} \hat{f}\big(x_S, \mathbf{x}_{C,i}\big)$$

- **Symbols:** $x_S$ is the value of the plotted feature (or pair of features), $\mathbf{x}_{C,i}$ holds record $i$'s actual values of all the other features, and $n$ is the number of records. The first block is record $i$'s ICE curve, the model's prediction for that record as $x_S$ moves across a grid, and the second block averages the $n$ ICE curves into the PDP.
- **What ICE reveals:** When the ICE curves are parallel, the feature has the same effect on every record apart from a shift, and the PDP summarizes it well. When the curves fan out or cross, the effect depends on other features, which is an [[Interaction|interaction]] that the PDP averages away. A centred ICE plot subtracts each curve's value at a reference point, so that differences in shape are easier to see.
- **Additive models:** For a model with no interaction involving $x_S$, such as a GLM with an identity link and no interaction terms, every ICE curve is the fitted effect plus a constant, and the PDP shows the fitted effect itself. With a log link the curves are proportional rather than parallel, and the PDP is proportional to the fitted relativity curve.
- **Correlated features:** The average pairs each grid value with every record's other features, including combinations that never occur together, such as a brand-new vehicle with 300,000 km on its odometer. Where features are strongly correlated, part of the PDP describes the model's extrapolation rather than its fit to real records.

> [!example]- ICE Curves That Fan Out {Example}
> A frequency model, written in closed form so that it can be checked by hand, predicts $\hat{f} = 4 + 0.4m + 0.3\,m\,u + 3y$ claims per 100 car-years, where $m$ is annual distance in thousands of km, $u = 1$ for an urban territory and $y = 1$ for a driver under 25. The data hold three records: record 1 is rural and not young, record 2 is urban and not young, and record 3 is urban and young. Compute the ICE curves and the PDP for distance at $m = 5, 10, 15, 20$, and say what the curves show.
>
> > [!answer]-
> > Each ICE curve keeps the record's own $u$ and $y$ and moves $m$. At $m = 10$, record 2 gives $4 + 4 + 3 + 0 = 11.0$, and the PDP is the average of the three curves.
> > $$
> > \begin{align*}
> > \hat{f}_S(10) &= \tfrac{1}{3}(8.0 + 11.0 + 14.0) \\
> > &= 11.0
> > \end{align*}
> > $$
> >
> > | $m$ | Record 1 | Record 2 | Record 3 | PDP |
> > | ---: | ---: | ---: | ---: | ---: |
> > | 5 | 6.0 | 7.5 | 10.5 | 8.0 |
> > | 10 | 8.0 | 11.0 | 14.0 | 11.0 |
> > | 15 | 10.0 | 14.5 | 17.5 | 14.0 |
> > | 20 | 12.0 | 18.0 | 21.0 | 17.0 |
> >
> > The PDP rises by 0.6 per thousand km, which is $0.4 + 0.3 \times \tfrac{2}{3}$, but no record has that slope. Record 1 rises by 0.4, and records 2 and 3 rise by 0.7. Records 2 and 3 are parallel, 3.0 apart, because the young-driver effect is simply added on. Record 1 is flatter, so the curves fan out, which reveals that distance matters more in urban territories, an interaction the PDP alone hides.

> [!example]- A Flat PDP for an Important Feature {Example}
> A model predicts the probability (%) that a claim will be litigated. Variable importance ranks report lag highly, but its PDP is flat at 20%. The data hold equal numbers of injury and property-only claims, and the ICE curves at lags of 0, 30 and 60 days are 20, 26 and 32 for an injury claim and 20, 14 and 8 for a property-only claim. Explain the flat PDP and say what should go in the report.
>
> > [!answer]-
> > The PDP averages the two curves with equal weight.
> > $$
> > \begin{align*}
> > \hat{f}_S(0) &= \tfrac{1}{2}(20 + 20) \\
> > &= 20 \\
> > \hat{f}_S(30) &= \tfrac{1}{2}(26 + 14) \\
> > &= 20 \\
> > \hat{f}_S(60) &= \tfrac{1}{2}(32 + 8) \\
> > &= 20
> > \end{align*}
> > $$
> > Report lag has a strong effect in opposite directions: a long lag raises the predicted probability for injury claims and lowers it for property-only claims, and the two cancel in the average. The report should show the ICE curves, or a two-way partial dependence plot of lag and claim type, because the one-way PDP suggests wrongly that report lag does nothing.

> [!tip]- How it appears on the exam
> - **ATPA** lists partial dependence plots and individual conditional expectation plots among the tools for communicating and justifying a recommended model. A task can give the plots for a fitted model and ask what they show about a variable's effect, or ask which plot to put in a report for a stated audience and why.
> - **Reading them together:** These plots are read beside a [[Variable Importance|variable importance]] plot, which ranks the variables but gives no direction. The PDP gives the direction and shape of each effect, and the ICE curves show whether that shape holds for every record.

> [!warning]- Exam traps
> - **An average of predictions:** The PDP averages the model's predictions over every record's other features. Putting the average of the other features into the model gives a different curve whenever the model is nonlinear or has interactions.
> - **Flat does not mean unimportant:** A flat PDP can hide strong effects that cancel, as in the second example. Check the ICE curves before concluding that a variable does nothing.
> - **Not causal:** A rising PDP shows that the model's prediction rises with the feature, not that the feature causes losses. With correlated features the curve also reflects combinations the model never saw in training.
> - **Thin ends:** Grid values with few records behind them, usually at the ends of the range, show the model extrapolating, so the ends of a PDP deserve less weight than its middle. Plotting a rug of the data's values along the axis shows where the records actually are.
