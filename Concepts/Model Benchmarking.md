---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:01b6b8ce8fb9bbc4983b9a71003d836e554da2844698b08f2d3d0e347169d155
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §5.1 p.46 (PDF 56, on-level premium for a loss ratio target); §7.2-7.2.4 pp.76-81 (PDF 86-91), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), Ch.7 intro, §7.2-7.2.4, §3.9, PDF pp.44, 85-90, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., §3.6-3.7.1, PDF pp.32-33, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Benchmarking.md
---

**Model Benchmarking** is the evaluation of a candidate rating model against a **benchmark**, usually the current rating plan, but possibly a prior model, a simpler model, or a bureau or competitor plan. Both are scored on the same holdout data, and the question is which one better predicts actual loss costs, segment by segment.

The [[Double Lift Chart|double lift chart]] compares the two directly. It sorts the [[Holdout Sample|holdout]] records on the ratio of the two predictions, which for record $i$ is

> $$\text{Sort ratio}_i = \frac{\hat{\mu}_i^{\text{model}}}{\hat{\mu}_i^{\text{benchmark}}}$$

- $\hat{\mu}_i^{\text{model}}$ and $\hat{\mu}_i^{\text{benchmark}}$ are the model's and the benchmark's predicted loss costs for record $i$.

Sorting on the ratio and grouping into equal-exposure quantiles $q$ isolates the risks on which the two disagree most. Each approach's percent error in quantile $q$ is

> $$\text{Error}_q = \frac{\text{Predicted}_q}{\text{Actual}_q} - 1$$

- $\text{Predicted}_q$ is the approach's average predicted loss cost in quantile $q$, divided by its overall average.
- $\text{Actual}_q$ is the actual loss cost in quantile $q$, divided by its overall average.

The winner has the flatter error line, centred on zero. Because each quantity is divided by its overall average, the chart shows relative loss costs, not dollar levels.

> [!example]- Which approach wins on this double lift chart, and where is the current plan exposed? {Example}
> Holdout records are sorted by the model's loss cost divided by the current plan's into five equal-exposure quintiles. Relative to each overall average:
>
> | Quintile | Model | Current plan | Actual |
> | :--- | ---: | ---: | ---: |
> | Q1 | 0.78 | 0.98 | 0.82 |
> | Q2 | 0.90 | 1.00 | 0.91 |
> | Q3 | 1.00 | 1.00 | 0.99 |
> | Q4 | 1.10 | 1.01 | 1.08 |
> | Q5 | 1.22 | 1.01 | 1.20 |
>
> > [!answer]-
> > - The model's errors are $-4.9\%$, $-1.1\%$, $+1.0\%$, $+1.9\%$ and $+1.7\%$.
> > - The current plan's errors are $+19.5\%$, $+9.9\%$, $+1.0\%$, $-6.5\%$ and $-15.8\%$. For Q1, $0.98/0.82 - 1 = +19.5\%$.
> > - The model's errors stay within $5\%$, while the plan's tilt from $+20\%$ to $-16\%$, so the model wins.
> > - The current plan overcharges Q1 by about 20%, so a competitor with a better plan will quote those risks lower and win them. It undercharges Q5 by about 16%, and those risks will stay.

## Benchmarking and adverse selection

[[Lift]] only means something relative to an alternative. The [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)|GLM monograph]] frames it as a model's ability to prevent [[Adverse Selection|adverse selection]]. A model that beats the current plan finds the risks the plan overcharges, which competitors can take away, and the ones it undercharges, which the insurer keeps.

## Tools for benchmarking

Benchmarking runs on scored records only, so the benchmark can be proprietary or not a GLM at all: a manual, a consultant's plan or a competitor's filing. For the same reason, these tools suit the final choice between complete models, unlike [[Deviance|deviance]] or [[AIC]], and can be read by people who aren't modellers. They always use holdout data, with the benchmark's premium at current rate level.

| Tool | How it is built | What it cannot show |
| :--- | :--- | :--- |
| Simple [[Quantile Plot]] | Sorted on one approach's own predictions, judged on accuracy, monotonicity and the spread between the first and last quantiles | Compares two approaches only through a separate plot for each |
| Double lift chart | Sorted on the ratio of the two approaches' predictions | Dollar levels, since each quantity is divided by its overall average |
| Loss ratio chart | Sorted on predicted loss cost divided by current premium | How closely the model's own predictions match actual losses |
| [[Gini Index]] | One number for each approach on the same data | The profitability of a rating plan, only its ability to differentiate the best and worst risks |

Benchmarking is one step in evaluating a model. The model may then be **recalibrated**, meaning refitted on newer data between full rebuilds, and taken into [[Model Implementation|implementation]].

## The loss ratio chart

The **loss ratio chart** sorts holdout policies on the model's predicted loss cost divided by current premium, groups them into quantiles and plots the actual loss ratio in each. A loss ratio needs [[On Level Premium|on-level premium]] wherever rates have changed over the experience period, or the chart mixes rate levels. A flat actual loss ratio means the plan already prices every segment, and a rising one measures its inequity. The chart shows how well the model separates the plan's low and high loss ratio segments. The monograph's point in its favour is that it is simpler to understand and explain than quantile plots and double lift charts.

> [!example]- What does this loss ratio chart say about the current plan? {Example}
> Holdout policies are sorted by the model's predicted loss cost divided by current premium into five equal-exposure quintiles. The actual loss ratios at current rates are $48\%$, $57\%$, $63\%$, $70\%$ and $82\%$, against $64\%$ overall.
>
> > [!answer]-
> > - If the current plan priced every segment correctly, the line would be flat at the overall $64\%$.
> > - The line rises steadily, so the model sorts out mispricing the plan cannot see.
> > - Moving Q1 to $64\%$ takes $48/64 - 1 = -25\%$, and moving Q5 takes $82/64 - 1 = +28\%$.
> > - Implementing the model in full would move some premiums by more than a quarter, a dislocation the implementation plan must manage.
