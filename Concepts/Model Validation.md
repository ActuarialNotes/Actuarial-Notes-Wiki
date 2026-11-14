---
aliases:
  - Validation
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:a4acccb32d215f04cee0839c710482bd91056f5c5ef37eaf679289476e5933fe
  sources:
    - "ASB, ASOP No. 56, Modeling (Dec 2019), §3.6 and §3.6.2 a-e, pp.14-15 (model output validation reasonably represents what is modeled; historical actual results, hold-out data, statistical tests, variations on key assumptions, alternative models), sha256:fba1fcec717852b4ce7611104841f39659e94cbe46f4dfb7d621b2cbf8e41f33 — https://www.actuarialstandardsboard.org/wp-content/uploads/2020/01/asop056_195-1.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer, 2021; CAS-hosted copy), §2.2.1 printed pp.29-33; §5.1.1-5.1.4 printed pp.198-206 (validation set approach variable and overestimates test error; LOOCV less bias, costly; k-fold average); §6.2.3 printed p.250, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Olswang, 'Validating a Liability Model', SOA Financial Reporting Section monograph (1999), pp.1-2 (static validation: model in-force position at the valuation date vs actual - policy counts, units, face amount, premiums, reserves; dynamic validation: model revenue account vs actual, backward and forward; ratio model/actual), sha256:ab688018c75191522f9588c2409b60421386b50a9cf7051e02e9838a6bd28a86 — https://www.soa.org/globalassets/assets/library/monographs/50th-anniversary/financial-reporting-section/1999/january/m-as99-1_viii.pdf"
    - "scikit-learn User Guide, 3.1 Cross-validation, §3.1 (nested cross-validation; test set leaks when used to tune), sha256:78d7587fa92ba3b3e480c9d841b50fedc14ac29d571ccb319d4068235154f0e2 — https://scikit-learn.org/stable/modules/cross_validation.html"
    - "SOA, Exam SRM syllabus, January 2027, outcomes 1b-1d, p.2, sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf"
    - "SOA, CP-312 Model Development and Governance syllabus, Nov 2026/Mar 2027, p.1 (case study provided with the examination); outcomes 1c, 2b; Topic 3 Model Governance, sha256:7c62bff559da90773de77ad707816992f3d41dd083df0e96d78aa8b67d34e757 — https://www.soa.org/globalassets/assets/files/edu/2026/cp-312/2026-2027-cp-312-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Validation.md
---

**Model Validation** is the testing of whether a model's output reasonably represents what is being modelled, using evidence the model was not built from: data held out of the fit, historical actual results, independent calculations or alternative models. It is a core control of [[Model Governance|model governance]], and ASOP 56 lists it among the steps for mitigating [[Model Risk|model risk]].

[[ASOP 56 - Modeling (ASB - 2019)|ASOP 56]] §3.6.2 lists the tools: testing against historical actual results, hold-out data, statistical tests of the output, variations on key assumptions and comparison with alternative models.

## Validation error in statistical learning

In statistical learning, validation means estimating **test** error rather than training error. The model $\hat{f}$ is fitted on the training data only and scored on the $n_v$ held-out ([[Holdout Sample|hold-out]]) observations, so its validation mean squared error is

> $$\text{MSE}_{\text{val}} = \frac{1}{n_v}\sum_{i \in \text{val}}\left(y_i - \hat{f}(x_i)\right)^2$$

- $y_i$ is the actual response and $\hat{f}(x_i)$ the prediction for held-out observation $i$.

Training error always falls as flexibility rises, while validation error turns up once the model starts fitting noise. Validation locates the bottom of that U-shape, the balance point of the [[Bias-Variance Tradeoff|bias-variance tradeoff]], for instance to choose a [[Hyperparameter|hyperparameter]]. Between two models, the one with the smaller validation error is preferred.

> [!example]- Which of these two severity models should be chosen? {Example}
> Two models for claim severity (in thousands) are fit on a training set. Model A has training MSE $1.9$ and model B, more flexible, $0.8$. On five held-out policies they predict:
>
> | Actual | Model A | Model B |
> | ---: | ---: | ---: |
> | 12 | 11 | 12.5 |
> | 15 | 16 | 14 |
> | 9 | 10 | 7 |
> | 20 | 18 | 22 |
> | 14 | 15 | 13 |
>
> > [!answer]-
> > - Model A's validation MSE is $(1 + 1 + 1 + 4 + 1)/5 = 1.60$.
> > - Model B's validation MSE is $(0.25 + 1 + 4 + 4 + 1)/5 = 2.05$.
> > - B wins on training error but loses on the hold-out: it is overfitting, so choose A.

## Cross-validation

[[Cross-Validation|$k$-fold cross-validation]] splits the data into $k$ folds, fits the model on $k-1$ of them and scores it on the held-out fold, in turn for each fold. Its estimate of test error is

> $$\text{CV}_{(k)} = \frac{1}{k}\sum_{j=1}^{k} \text{MSE}_j$$

- $\text{MSE}_j$ is the validation MSE on fold $j$ of the model fitted to the other folds.

Leave-one-out cross-validation is the case $k = n$, holding out one observation each time. Each fold's error uses only the prediction for the observations left out of that fold's fit.

> [!example]- Model A's five-fold fold MSEs are $1.8$, $1.4$, $2.1$, $1.6$ and $1.7$. What is its cross-validation estimate of test error? {Example}
> - $\text{CV}_{(5)} = (1.8 + 1.4 + 2.1 + 1.6 + 1.7)/5 = 1.72$.
> - It uses all the data five times, so it is a steadier estimate than one 5-point hold-out.

## Validating an actuarial projection model

In actuarial cash-flow modelling (CP-312), validation means reconciling the model to the in-force, the financial statements and past experience. *Static* validation checks that the model's starting point (policy counts, face amounts, reserves) reconciles to the administration and valuation systems. *Dynamic* validation runs the model over a past period and compares projected cash flows with actual through the actual-to-expected ratio,

> $$\text{A/E} = \frac{\text{actual experience}}{\text{model-expected experience}}$$

A ratio near 1 indicates a good fit, and $\text{A/E} > 1$ means actual exceeded expected, so for claims the model is light. Both checks sit beside [[Reasonableness Testing|reasonableness checks]], [[Model Benchmarking|benchmarking]] and sensitivity tests.

> [!example]- Does this life insurer's projection model pass static and dynamic validation? {Example}
> The model's starting reserves (millions) are compared with the valuation system's, with a tolerance of $\pm 0.5\%$. Started three years back, the model's projected death claims are compared with actual.
>
> | Static | Model | Valuation system |
> | :--- | ---: | ---: |
> | Term | 412.6 | 413.1 |
> | UL | 1,208.4 | 1,231.0 |
> | Annuity | 856.2 | 855.0 |
>
> | Dynamic | Year 1 | Year 2 | Year 3 |
> | :--- | ---: | ---: | ---: |
> | Projected | 48.0 | 50.1 | 51.9 |
> | Actual | 52.8 | 49.6 | 57.1 |
>
> > [!answer]-
> > - The static differences are Term $-0.12\%$, UL $(1{,}208.4 - 1{,}231.0)/1{,}231.0 = -1.84\%$ and Annuity $+0.14\%$.
> > - UL fails the tolerance, so its cells (missing policies, account values, riders) must be reconciled before the model is used.
> > - The dynamic A/E by year is $1.100$, $0.990$ and $1.100$.
> > - In total, $\text{A/E} = 159.5/150.0 = 1.063$, so claims ran $6.3\%$ above the model, in two of three years.
> > - The mortality assumption is the first thing to investigate.

> [!trap] Choosing the model with the lowest training error
> More flexible models always fit the training data better. Only error on data not used in the fit measures prediction, so compare models on validation or cross-validation error.
