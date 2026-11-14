---
aliases:
  - Train-test-validate Set
  - Training Data
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:ea5977a5e0bc466998f41b3d0ebca1f3cd143dc834e4a04a2874370dacf07677
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §4.3-4.3.3 printed pp.38-41 (training set, test/holdout set; train/validation/test split; out-of-time split by year; common-event leakage across a random split; a test set used too often becomes a training set), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer, 2021; CAS-hosted copy), §5.1.1 printed pp.198-200 (validation set approach; variable; overestimates test error); §6.2.3 printed p.250 (refit on all observations after tuning), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Google Machine Learning Crash Course, Dividing the original dataset, 'Training, validation, and test sets' (three subsets; validation and test sets 'wear out' with repeated use), sha256:82e44998b3e67d1a6e2332261f17d2d63b58d0d34b9a346858983692e90e835a — https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets"
    - "scikit-learn User Guide, 3.1 Cross-validation, §3.1 (test set leaks when hyperparameters are tuned on it; StratifiedKFold; GroupKFold keeps a group out of both sides; TimeSeriesSplit), sha256:78d7587fa92ba3b3e480c9d841b50fedc14ac29d571ccb319d4068235154f0e2 — https://scikit-learn.org/stable/modules/cross_validation.html"
    - "scikit-learn User Guide, 12. Common pitfalls, §12.2 Data leakage (split before any preprocessing; never fit on test data), sha256:21fac11c181ab35624dcf8673f0475d403d4f6ecf0f9bead01a573d7642b515c — https://scikit-learn.org/stable/common_pitfalls.html"
    - "SOA, Exam SRM syllabus, January 2027, outcomes 1d and 4a, pp.2,4, sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf"
    - "SOA, ATPA learning objectives (Jan 2022), outcome (g), p.3; assessment description, sha256:16d5e74841e90fdb61402248cb585dc8d7a3ceedbf678341478145a9e2fb4410 — https://www.soa.org/globalassets/assets/files/edu/2022/2022-01-atpa-learning-objectives.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Train-Test Split.md
---

A **Train-Test Split** divides the available data into disjoint parts that do different jobs:

1. The **training data** fit the model's parameters.
2. A **validation set** compares candidate models and tunes their [[Hyperparameter|hyperparameters]].
3. A **test set** estimates, once, the [[Test Error|test error]] of the model finally chosen.

Each part can judge a step only if that step has never seen it, so every reuse of a held-out set to make a decision turns it, gradually, into training data.

The test error of the model fitted to the training data is estimated by

> $$\widehat{\text{Err}} = \frac{1}{n_{\text{test}}}\sum_{i \in \mathcal{D}_{\text{test}}} L\left(y_i, \hat{f}_{\text{train}}(x_i)\right)$$

- $\mathcal{D}_{\text{test}}$ is the test set and $n_{\text{test}}$ the number of observations in it.
- $\hat{f}_{\text{train}}$ is fitted to the training data only.
- $L$ is the loss: squared error for a numeric response, [[Deviance|deviance]] for a GLM, or the misclassification rate for a classifier.

## The validation set approach

ISLR's validation set approach (James et al., §5.1.1) splits the data in two, fits on one part and scores on the other. The split is random, so different splits give different estimates, and a model fitted to only part of the data tends to overstate the test error. Tuning and model choice can instead use [[Cross-Validation|$k$-fold cross-validation]] inside the training data, which leaves the test set free for the last step. After selection, the model is usually refitted on the training and validation data together before it is used.

## Optimism from reusing a held-out set

A [[Holdout Sample|holdout sample]] that has been used to choose between models has become a validation set, and its error for the winner is no longer an unbiased estimate. When several candidates are scored on one shared held-out set,

> $$E\left[\min_k \widehat{\text{Err}}_k\right] \leq \min_k \text{Err}_k$$

- $\text{Err}_k$ is the true test error of candidate model $k$.
- $\widehat{\text{Err}}_k$ is its estimate on the shared held-out set.

Each estimate is unbiased for its own model, but the smallest of many noisy estimates is biased downward. The bias grows with the number of comparisons and with the noise in each estimate. Re-tuning after each look at the test set, adding a feature because the test error improved, or dropping one because it worsened all fit the model to that particular sample, so the final test error is optimistic.

> [!example]- What validation MSE should this analyst expect to report for the chosen model? {Example}
> An analyst compares ten candidate frequency models on one validation set. Unknown to the analyst, all ten have the same true test MSE of 400. Each validation MSE equals the true value plus an independent error with standard deviation 12. The expected maximum of ten independent standard normal variables is 1.539.
>
> > [!answer]-
> > - The analyst keeps the model with the smallest validation MSE, and the smallest of ten draws sits about 1.539 standard deviations below their common mean.
> > - The expected reported MSE is $400 - 1.539(12) = 400 - 18.5 = 381.5$.
> > - The reported error understates the truth by $18.5$, or $4.6\%$, although no model is better than any other.
> > - A fresh test set, used once, would show about 400 for the chosen model.

## Making the split

The split is random but done at the right unit, so that one policy's renewals or one claim's transactions do not fall on both sides. A rare outcome calls for sampling within each class (stratifying), so every set holds enough events. When conditions drift over time, an out-of-time test set (the latest year) also checks stability. Every step that learns from the data, such as scaling, imputing or screening variables, must be fitted on the training data alone and applied unchanged to the other sets.

> [!trap] Tuning on the test set
> Choosing a hyperparameter or a model by test error and then reporting that error as unbiased overstates the model's accuracy. Once the test set has chosen anything, a different set must report the result.
