---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:0c9a69ec2f34e70a6056d2aee4d91fa2298782e6e000efb59a84437d40a052b3
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §2.2.2 PDF p.43 (U-shape, overfitting), §4.4.2 Table 4.7 PDF p.162, §5.1.3 PDF p.212, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §4.3-4.3.4 PDF pp.48-52; §7.2 PDF pp.86-87; §7.3-7.3.1 and Table 13, fn.17 PDF pp.93-95, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "ASB, ASOP No. 56 Modeling (Doc. 195, Dec 2019), §2.4 Hold-out Data, §2.12 Overfitting, §3.1, §3.6, sha256:f3e159300fde3ff3f9db4198eb6b0a660f182875b2cc47a2da92c2567b7bd799 — http://www.actuarialstandardsboard.org/wp-content/uploads/2020/01/asop056_195.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Training and Evaluation.md
---

**Model Training and Evaluation** is the process of fitting a predictive model on one part of the data and judging it on data it has not seen. Performance is measured with metrics suited to the target: prediction error and lift for a numeric target, and the confusion matrix, ROC curve and related rates for a yes/no target.

The available records are split into:

1. A **training** set, used to build the model.
2. Often a **validation** set, used to refine and compare candidates.
3. A **test** (holdout) set, kept back to estimate how the final model will perform on new business.

## Holding data out

If $\hat{f}$ is fitted on the training data only, its test mean squared error over the $n_{\text{test}}$ records of the test set is

> $$\text{MSE}_{\text{test}} = \frac{1}{n_{\text{test}}} \sum_{i \in \text{test}} \big(y_i - \hat{f}(x_i)\big)^2$$

- $y_i$ is the actual value of record $i$ and $\hat{f}(x_i)$ its prediction.

So the test MSE averages its squared errors over $n_{\text{test}}$ records it never saw. Training error keeps falling as a model gets more flexible, while error on new data falls and then rises, a U-shape. A model with small training error and large test error is [[Overfitting|overfitting]]: it has learned patterns in the training data that arose by chance (*ISLR*, §2.2). ASOP 56 defines overfitting the same way and defines hold-out data as data withheld while developing a predictive model so it can be validated later.

> [!example]- Which of these five models should be chosen, and how should its performance be reported? {Example}
> An analyst fits five severity models of increasing complexity on a training set and scores each on a validation set:
>
> | Model | 1 | 2 | 3 | 4 | 5 |
> | :--- | ---: | ---: | ---: | ---: | ---: |
> | Training MSE | 52.0 | 41.5 | 38.2 | 36.9 | 35.1 |
> | Validation MSE | 54.1 | 43.0 | 40.6 | 42.8 | 47.3 |
>
> > [!answer]-
> > - Training MSE falls with every step, as it always does.
> > - Validation MSE falls to Model 3 and then rises, so Models 4 and 5 are overfitting. They fit noise in the training data that does not carry over to new records.
> > - Choose Model 3.
> > - Its validation MSE of 40.6 is somewhat optimistic, because the validation set was used to pick it from five candidates. Its performance should be reported from the untouched test set, scored once.
> > - The chosen model can then be refit on all the data before it is used.

## Splitting the data

Goldburd et al. (CAS Monograph 5, §4.3) give 60/40 or 70/30 for train/test and 40/30/30 for train/validation/test. The split can be random or by time. An **out-of-time** test set, such as a later accident year, is especially important when one event, such as a windstorm, causes many losses, since a random split would put the same storm in both sets.

Every decision made by looking at the test set turns it into training data, and its result becomes optimistic. Goldburd et al. build all candidate models on the training data, compare them on the test set once at the end, and then refit the chosen model on all the data. [[Train-Test Split]] and [[Holdout Sample]] cover the split in detail.

## Cross-validation

In $k$-fold [[Cross-Validation|cross-validation]], the data are split into $k$ folds, and the model is fitted $k$ times leaving out one fold each time (*ISLR*, §5.1.3). The cross-validation estimate of test error is

> $$\text{CV}_{(k)} = \frac{1}{k} \sum_{j=1}^{k} \text{MSE}_j$$

- $\text{MSE}_j$ is the error on fold $j$ when it is the fold left out.

Cross-validation uses every record for testing, but it only gives an honest estimate if every modeling step, including variable selection, is repeated inside each fold. Because insurance GLM variables are usually chosen by hand, Goldburd et al. prefer a fixed holdout set and use cross-validation within the training data to tune choices such as the number of polynomial terms.

## Evaluating a numeric target

Besides MSE, insurance models are judged by [[Lift|lift]]: how well they separate the best risks from the worst on holdout data. Lift is relative, comparing one model with another.

- A [[Quantile Plot|quantile plot]] sorts records by predicted loss cost into equal-exposure buckets and compares actual with predicted in each, judged on accuracy, monotonicity and the spread between the first and last buckets.
- A [[Double Lift Chart|double lift chart]] compares two models directly.
- The [[Gini Index|Gini index]] summarizes the Lorenz curve.

## Evaluating a yes/no target

A [[Logistic Regression|logistic]] or [[Classification Tree|tree]] model gives a probability, and a **threshold** turns it into a decision. The four counts of true and false positives and negatives, $TP$, $FP$, $FN$ and $TN$, are the cells of the [[Confusion Matrix|confusion matrix]]. The share of flagged cases that are actually positive, the precision, is

> $$\text{Precision} = \frac{TP}{TP + FP}$$

The share of actual positives the model flags, the recall, is

> $$\text{Recall} = \frac{TP}{TP + FN}$$

Recall is also called sensitivity or the true positive rate. Lowering the threshold catches more true positives at the cost of more false positives. The ROC curve plots the true positive rate against the false positive rate across all thresholds. An area under it, [[AUROC]], of 0.5 is no better than chance and 1.0 is perfect. Goldburd et al. link it to the normalized Gini index in a footnote, by which AUROC is

> $$\text{AUROC} = 0.5 \times \text{normalized Gini} + 0.5$$

Accuracy, the share classified correctly, can mislead when one class is rare. *ISLR* (Table 4.7) lists precision, recall, specificity and the false positive rate as the measures to read alongside it.

> [!example]- What are this fraud model's accuracy, precision and recall at each threshold, and how do they compare with flagging nothing? {Example}
> Goldburd et al. (§7.3.1) test a claims fraud model on 813 holdout claims, 109 of them fraudulent. At a 50% threshold the model flags 70 claims, 39 of them fraudulent. At 25% it flags 178, 75 of them fraudulent.
>
> > [!answer]-
> > - There are $813 - 109 = 704$ legitimate claims.
> > - At 50%, $TP = 39$, $FN = 109 - 39 = 70$, $FP = 70 - 39 = 31$ and $TN = 704 - 31 = 673$.
> > - At 50%, accuracy is $(39 + 673)/813 = 0.876$, precision is $39/70 = 0.557$ and recall is $39/109 = 0.358$.
> > - At 25%, $TP = 75$, $FN = 34$, $FP = 103$ and $TN = 601$.
> > - At 25%, accuracy is $(75 + 601)/813 = 0.831$, precision is $75/178 = 0.421$ and recall is $75/109 = 0.688$.
> > - Flagging nothing would be right on all 704 legitimate claims, for an accuracy of $704 / 813 = 0.866$, higher than the 25% threshold achieves.
> > - Yet the 25% threshold catches 69% of fraud instead of none, so accuracy alone would pick a useless model. The choice of threshold weighs the cost of a missed fraud against the cost of investigating a legitimate claim, which is a business decision.

> [!trap] Swapping precision and recall
> Precision divides by everything *flagged* ($TP + FP$). Recall divides by everything *actually positive* ($TP + FN$). Swapping the denominators is the most common slip.
