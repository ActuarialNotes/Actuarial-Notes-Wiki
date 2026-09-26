---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4b464fe899d1f819c646b53b1b86755197ee78556971262fcc3c8ab104d3cf0d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Benchmarking.md
---

**Model Benchmarking** evaluates a candidate rating model against a **benchmark**, usually the current rating plan, but possibly a prior model, a simpler model, or a bureau or competitor plan. Both are scored on the same holdout data, and the question is which one better predicts actual loss costs, segment by segment.

> $$\text{Sort ratio}_i = \frac{\hat{\mu}_i^{\text{model}}}{\hat{\mu}_i^{\text{benchmark}}}$$

> $$\text{Error}_q = \frac{\text{Predicted}_q}{\text{Actual}_q} - 1$$

- $\hat{\mu}_i$ is each approach's predicted loss cost for record $i$. Sorting on the ratio and grouping into equal-exposure quantiles $q$ isolates the risks on which the two **disagree most**; this is the [[Double Lift Chart|double lift chart]]. $\text{Error}_q$ is each approach's percent error in quantile $q$. The winner has the flatter error line, centred on zero.
- **Why it matters.** [[Lift]] only means something relative to an alternative. The [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)|GLM monograph]] frames it as a model's ability to prevent [[Adverse Selection|adverse selection]]. A model that beats the current plan finds the risks the plan overcharges, which competitors can take away, and the ones it undercharges, which the insurer keeps.
- **Only predictions are needed.** Benchmarking runs on scored records, so the benchmark can be proprietary or not a GLM at all: a manual, a consultant's plan, a competitor's filing. For the same reason, these tools (unlike [[Deviance]] or [[AIC]]) suit the final choice between complete models and can be read by people who aren't modellers.
- **Toolkit.** Always use [[Holdout Sample|holdout]] data, with the benchmark's premium at current rate level.
  - A [[Quantile Plot|simple quantile plot]] for each approach, judged on accuracy, monotonicity and the spread between the first and last quantiles.
  - The double lift chart.
  - The **loss ratio chart**: sort on predicted loss cost divided by current premium. A flat actual loss ratio means the plan already prices every segment; a rising one measures its inequity.
  - The [[Gini Index|Gini index]] of each approach on the same data.
- **Where it sits (Exam 8).** Benchmarking is one step in evaluating a model. The model may then be **recalibrated**, meaning refitted on newer data between full rebuilds, and taken into [[Model Implementation|implementation]].

> [!example]- Double Lift Chart Against the Current Plan {Example}
> Holdout records are sorted by (model loss cost) $\div$ (current-plan loss cost) into five equal-exposure quintiles. Relative to each overall average:
>
> - Q1: model $0.78$, current plan $0.98$, actual $0.82$
> - Q2: model $0.90$, current plan $1.00$, actual $0.91$
> - Q3: model $1.00$, current plan $1.00$, actual $0.99$
> - Q4: model $1.10$, current plan $1.01$, actual $1.08$
> - Q5: model $1.22$, current plan $1.01$, actual $1.20$
>
> Which approach wins, and what is the current plan's exposure?
>
> > [!answer]-
> > Percent errors by quintile:
> >
> > - **Model:** $-4.9\%$, $-1.1\%$, $+1.0\%$, $+1.9\%$, $+1.7\%$
> > - **Current plan:** $+19.5\%$, $+9.9\%$, $+1.0\%$, $-6.5\%$, $-15.8\%$
> >
> > For Q1, the plan's error is $0.98/0.82 - 1 = +19.5\%$. The model's errors stay within $5\%$, while the plan's tilt from $+20\%$ to $-16\%$. **The model wins.**
> >
> > In the extremes the two disagree most, and the actuals side with the model. The current plan overcharges Q1 by about 20%, so a competitor with a better plan will quote those risks lower and win them. It undercharges Q5 by about 16%, and those risks will stay.

> [!example]- Reading a Loss Ratio Chart {Example}
> Holdout policies are sorted by (model predicted loss cost) $\div$ (current premium) into five equal-exposure quintiles. The actual loss ratios at current rates are $48\%$, $57\%$, $63\%$, $70\%$ and $82\%$, against $64\%$ overall. What does this say about the current plan?
>
> > [!answer]-
> > If the current plan priced every segment correctly, the line would be **flat** at the overall $64\%$. Instead it rises steadily, so the model sorts out mispricing the plan cannot see. Moving each quintile to $64\%$ would take roughly:
> >
> > $$
> > \begin{align*}
> > \text{Q1} &: \tfrac{48}{64} - 1 = -25\% \\
> > \text{Q5} &: \tfrac{82}{64} - 1 = +28\%
> > \end{align*}
> > $$
> >
> > The chart makes the case for the new model in the currency every stakeholder reads, the loss ratio. It also shows that implementing the model in full would move some premiums by more than a quarter, which is a dislocation the implementation plan must manage.
