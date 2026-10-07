---
aliases:
  - Validation
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:128e9e5e8223dc6a3ea87473251d69ee9b087a1d29c5b8c78f90839a1910151e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Validation.md
---
**Model Validation** is the testing of whether a model's output reasonably represents what is being modelled, using evidence the model was not built from: data held out of the fit, historical actual results, independent calculations or alternative models. In statistical learning it means estimating **test** error rather than training error; in actuarial cash-flow modelling it means reconciling the model to the in-force, the financial statements and past experience. It is a core control of [[Model Governance|model governance]] and the main defence against [[Model Risk|model risk]].

> $$\text{MSE}_{\text{val}} = \frac{1}{n_v}\sum_{i \in \text{val}}\left(y_i - \hat{f}(x_i)\right)^2$$

> $$\text{A/E} = \frac{\text{actual experience}}{\text{model-expected experience}}$$

- $\hat{f}$ is fitted on the training data only and scored on the $n_v$ held-out ([[Holdout Sample|hold-out]]) observations. [[Cross-Validation|$k$-fold cross-validation]] averages this over $k$ rotating folds, $\text{CV}_{(k)} = \frac{1}{k}\sum_j \text{MSE}_j$; leave-one-out is $k = n$
- Training error always falls as flexibility rises, while validation error turns up once the model starts fitting noise: the U-shape of the [[Bias-Variance Tradeoff|bias-variance tradeoff]] that validation is used to locate, for instance to choose a [[Hyperparameter|hyperparameter]]
- **Actuarial models (CP-312):** *static* validation checks that the model's starting point (policy counts, face amounts, reserves) reconciles to the administration and valuation systems; *dynamic* validation runs the model over a past period and compares projected cash flows with actual (A/E). Both sit beside [[Reasonableness Testing|reasonableness checks]], [[Model Benchmarking|benchmarking]] and sensitivity tests
- [[ASOP 56 - Modeling (ASB - 2019)|ASOP 56]] §3.6.2 lists the tools: testing against historical actual results, hold-out data, statistical tests of the output, variations on key assumptions and comparison with alternative models

> [!example]- Choosing a Model on Hold-Out Data {Example}
> Two models for claim severity (in thousands) are fit on a training set. Model A has training MSE $1.9$ and model B, more flexible, $0.8$. On five held-out policies with actual values $12, 15, 9, 20, 14$, A predicts $11, 16, 10, 18, 15$ and B predicts $12.5, 14, 7, 22, 13$. Which model should be chosen? Then estimate A's test error from 5-fold fold MSEs $1.8, 1.4, 2.1, 1.6, 1.7$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{MSE}_A &= \frac{1 + 1 + 1 + 4 + 1}{5} \\
> > &= 1.60
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \text{MSE}_B &= \frac{0.25 + 1 + 4 + 4 + 1}{5} \\
> > &= 2.05
> > \end{align*}
> > $$
> > B wins on training error but loses on the hold-out: it is overfitting, so choose A. Using all the data five times, $\text{CV}_{(5)} = (1.8 + 1.4 + 2.1 + 1.6 + 1.7)/5 = 1.72$, a steadier estimate than one 5-point hold-out.

> [!example]- Static and Dynamic Validation of a Projection Model {Example}
> A life insurer validates its projection model. **Static:** model starting reserves (millions) are Term $412.6$, UL $1{,}208.4$, Annuity $856.2$ against the valuation system's $413.1$, $1{,}231.0$ and $855.0$; the tolerance is $\pm 0.5\%$. **Dynamic:** started three years back, the model projected death claims of $48.0$, $50.1$, $51.9$ against actual $52.8$, $49.6$, $57.1$. Assess both.
>
> > [!answer]-
> > Static differences: Term $-0.12\%$, UL $(1{,}208.4 - 1{,}231.0)/1{,}231.0 = -1.84\%$, Annuity $+0.14\%$. UL fails the tolerance; the UL cells (missing policies, account values, riders) must be reconciled before the model is used.
> >
> > Dynamic A/E by year: $1.100$, $0.990$, $1.100$.
> > $$
> > \begin{align*}
> > \text{A/E}_{\text{total}} &= \frac{52.8 + 49.6 + 57.1}{48.0 + 50.1 + 51.9} \\
> > &= \frac{159.5}{150.0} \\
> > &= 1.063
> > \end{align*}
> > $$
> > Claims ran $6.3\%$ above the model, in two of three years: the mortality assumption, not random noise in one year, is the first thing to investigate.

> [!tip]- How it appears on the exam
> - **SRM** asks to compare the validation set approach, $k$-fold and leave-one-out cross-validation: computing a CV estimate from fold errors, and explaining their bias and variance (LOOCV nearly unbiased but high variance and costly; validation set variable and pessimistic).
> - SRM pairs validation with training versus test error and the [[Bias-Variance Tradeoff|bias-variance tradeoff]]: which model a validation curve selects and why the training curve cannot.
> - **CP-312** asks to describe, apply and evaluate validation techniques for cash-flow and other financial models (static and dynamic validation, back-testing, sensitivity tests, independent review) and to place validation in a model governance framework; mostly written answers on a case.

> [!warning]- Exam traps
> - Choosing the model with the lowest training error. More flexible models always fit the training data better; only error on data not used in the fit measures prediction.
> - Tuning a model on the test set and then reporting that test error as unbiased. Once the hold-out has chosen the model it is no longer independent; a separate test set or nested cross-validation is needed.
> - Calling a model validated because its starting reserves reconcile: static validation shows the model starts in the right place, not that its projections behave like experience.
> - Reading A/E the wrong way up: $\text{A/E} > 1$ means actual exceeded expected, so for claims the model is light.
