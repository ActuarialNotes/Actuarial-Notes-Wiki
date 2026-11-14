---
aliases:
  - Dependence Plot
  - Individual Conditional Expectation Plot
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c4b5faf95d0b1abbbf7b6913a2c247bd5aa6d4aff48085c0e2a7d12dbaae0578
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Partial Dependence Plot.md
---
A **Partial Dependence Plot** (PDP) shows how a fitted model's prediction changes on average as one or two features are varied, while every other feature keeps the values it has in the data. An **individual conditional expectation** (ICE) plot draws one curve per record instead, and the PDP is the average of those curves.

For a fitted model $\hat{f}$ and the plotted feature (or pair of features) at value $x_S$, record $i$'s ICE curve is

> $$\hat{f}^{(i)}_S(x_S) = \hat{f}\big(x_S, \mathbf{x}_{C,i}\big)$$

- $\mathbf{x}_{C,i}$ holds record $i$'s actual values of all the other features.

The PDP averages the ICE curves of the $n$ records in the data, so it is

> $$\hat{f}_S(x_S) = \frac{1}{n}\sum_{i=1}^{n} \hat{f}\big(x_S, \mathbf{x}_{C,i}\big)$$

Each curve is drawn by moving $x_S$ across a grid of values. The PDP is an average of the model's predictions over every record's other features. Putting the average of the other features into the model gives a different curve whenever the model is nonlinear or has interactions.

> [!example]- What are the ICE curves and the PDP for distance in this model, and what do the curves show? {Example}
> A frequency model, written in closed form so that it can be checked by hand, predicts $\hat{f} = 4 + 0.4m + 0.3\,m\,u + 3y$ claims per 100 car-years. Here $m$ is annual distance in thousands of km, $u = 1$ for an urban territory and $y = 1$ for a driver under 25. The data hold three records:
>
> | Record | Territory | Driver |
> | :--- | :--- | :--- |
> | 1 | Rural | Not young |
> | 2 | Urban | Not young |
> | 3 | Urban | Young |
>
> > [!answer]-
> > - Each ICE curve keeps the record's own $u$ and $y$ and moves $m$. At $m = 10$, record 2 gives $4 + 4 + 3 + 0 = 11.0$.
> > - The PDP is the average of the three curves, so at $m = 10$ it is $\tfrac{1}{3}(8.0 + 11.0 + 14.0) = 11.0$.
> >
> > | $m$ | Record 1 | Record 2 | Record 3 | PDP |
> > | ---: | ---: | ---: | ---: | ---: |
> > | 5 | 6.0 | 7.5 | 10.5 | 8.0 |
> > | 10 | 8.0 | 11.0 | 14.0 | 11.0 |
> > | 15 | 10.0 | 14.5 | 17.5 | 14.0 |
> > | 20 | 12.0 | 18.0 | 21.0 | 17.0 |
> >
> > - The PDP rises by 0.6 per thousand km, which is $0.4 + 0.3 \times \tfrac{2}{3}$, but no record has that slope. Record 1 rises by 0.4, and records 2 and 3 rise by 0.7.
> > - Records 2 and 3 are parallel, 3.0 apart, because the young-driver effect is simply added on.
> > - Record 1 is flatter, so the curves fan out. Distance matters more in urban territories, an interaction the PDP alone hides.

## Reading ICE curves

When the ICE curves are parallel, the feature has the same effect on every record apart from a shift, and the PDP summarizes it well. When the curves fan out or cross, the effect depends on other features, which is an [[Interaction|interaction]] that the PDP averages away. A centred ICE plot subtracts each curve's value at a reference point, so that differences in shape are easier to see.

These plots are read beside a [[Variable Importance|variable importance]] plot, which ranks the variables but gives no direction. The PDP gives the direction and shape of each effect, and the ICE curves show whether that shape holds for every record.

## Additive models

For a model with no interaction involving $x_S$, such as a GLM with an identity link and no interaction terms, every ICE curve is the fitted effect plus a constant, and the PDP shows the fitted effect itself. With a log link the curves are proportional rather than parallel, and the PDP is proportional to the fitted relativity curve.

## Correlated features

The average pairs each grid value with every record's other features, including combinations that never occur together, such as a brand-new vehicle with 300,000 km on its odometer. Where features are strongly correlated, part of the PDP describes the model's extrapolation rather than its fit to real records. Grid values with few records behind them, usually at the ends of the range, also show the model extrapolating, so the ends of a PDP deserve less weight than its middle. A rug of the data's values plotted along the axis shows where the records actually are.

A rising PDP shows that the model's prediction rises with the feature, not that the feature causes losses.

> [!trap] Reading a flat PDP as an unimportant feature
> A flat PDP can hide strong effects that cancel. A litigation model's PDP for report lag is flat at 20%, while its ICE curves at lags of 0, 30 and 60 days are 20, 26 and 32 for injury claims and 20, 14 and 8 for property-only claims, in equal numbers. Check the ICE curves, or a two-way partial dependence plot of lag and claim type, before concluding that a variable does nothing.
