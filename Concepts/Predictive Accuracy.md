---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:9c6a8f50cd13fc3a93de90a718e1af233756b8deec09167fa6c44eab329e6577
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §§1-4, pp.1-12 (whole note), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted, §4.4.2 pp.148-152 (Tables 4.4-4.7, Fig. 4.8) and §8.1.2 pp.336-338 (eqs 8.6-8.7); §2.2 pp.30, 37 (test MSE, test error rate), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Predictive Accuracy.md
---

**Predictive accuracy** is how well a model's predictions agree with outcomes it was *not* fitted to. It is measured on a [[Holdout Sample|holdout sample]] or by [[Cross-Validation|cross-validation]], along three separate axes. **Calibration**: are the predicted levels right? **Discrimination**: does the model rank low risks below high risks? And, for a classifier, **classification**: how often is it right at a chosen threshold?

> $$\text{Test MSE} = \frac{1}{m}\sum_{i \in \text{holdout}}\left(y_i - \hat{f}(x_i)\right)^{2}$$
>
> $$\text{AUROC} = 0.5 \times \text{normalized Gini} + 0.5$$

- **Overall error.** [[Test Error|Test MSE]] or holdout [[Deviance|deviance]] for a numeric response, and the test error rate for a classifier. Each is a single number that mixes calibration and ranking. $m$ is the number of holdout observations.
- **Discrimination.** Three measures, all of which depend only on the *order* of the predictions, so multiplying every prediction by a constant leaves them unchanged:
  - [[Lift]]: the vertical distance between the actual results in the first and last quantiles of a quantile plot, usually measured as their ratio
  - [[AUROC]]: the probability that a random positive is scored above a random negative
  - the [[Gini Index|Gini index]]: twice the area between the Lorenz curve and the line of equality. The normalized Gini is the model's Gini divided by that of a perfect model, and it gives the AUROC by the formula above, so the two are not separate validation metrics
- **Classification at a threshold.** The [[Confusion Matrix|confusion matrix]] and the rates read from it: accuracy, sensitivity, specificity and precision. Moving the threshold moves all of them. The ROC curve traces every threshold at once.
- **Pictures that show calibration and compare models.** The [[Quantile Plot|quantile plot]] sorts holdout data by predicted value into equal-exposure buckets and compares actual with predicted, so it shows ranking *and* calibration. The [[Double Lift Chart|double lift chart]] sorts on the *ratio* of two models' predictions, showing which model is right where they disagree.
- **Rules for every measure.** Compute it on holdout data, since on training data the more flexible model always wins. Compare models on the same data. Match the measure to the use: ranking for underwriting selection or fraud triage, calibration for setting a rate level.

> [!example]- Scoring Ten Claims Two Ways {Example}
> A fraud model scores ten holdout claims. The three fraudulent claims score $0.92$, $0.74$ and $0.48$. The seven legitimate claims score $0.81$, $0.55$, $0.40$, $0.33$, $0.21$, $0.15$ and $0.08$. Compute (a) the confusion matrix at threshold $0.5$ and (b) the AUROC and normalized Gini.
>
> > [!answer]-
> > (a) Four claims score above $0.5$: two fraudulent ($0.92$, $0.74$) and two legitimate ($0.81$, $0.55$). So $TP = 2$, $FP = 2$, $FN = 1$ and $TN = 5$. Sensitivity is $2/3 = 66.7\%$, specificity $5/7 = 71.4\%$ and precision $2/4 = 50\%$.
> >
> > (b) Count the fraud–legitimate pairs in which the fraudulent claim scores higher. $0.92$ beats all $7$, $0.74$ beats $6$ and $0.48$ beats $5$:
> > $$
> > \begin{align*}
> > \text{AUROC} &= \frac{7 + 6 + 5}{3 \times 7} \\
> > &= \frac{18}{21} \\
> > &= 0.857 \\
> > \text{normalized Gini} &= 2(0.857) - 1 \\
> > &= 0.714
> > \end{align*}
> > $$
> > The model ranks well (AUROC $0.857$). But at a $0.5$ threshold half the claims sent for investigation are legitimate. Which number matters depends on what the investigators can handle.

> [!example]- Same Gini, Different Calibration {Example}
> Model B's predictions are exactly $1.10$ times Model A's. Sorted into four equal-exposure buckets of a holdout set, the actual pure premiums are $200$, $300$, $450$ and $650$. Model A predicts $220$, $310$, $430$ and $640$. Compare the models.
>
> > [!answer]-
> > Model B predicts $242$, $341$, $473$ and $704$. Its predictions put every risk in the same order as A's, so they sort the holdout set into the same buckets and the two have **identical Gini and lift**. Even the spread from the top bucket to the bottom is the same: $640/220 = 704/242 = 2.91$.
> >
> > The quantile plot separates them. The actual-to-predicted ratios are:
> > - Model A: $0.91$, $0.97$, $1.05$, $1.02$, averaging $400/400 = 1.00$
> > - Model B: $0.83$, $0.88$, $0.95$, $0.92$, averaging $400/440 = 0.91$
> >
> > B over-predicts by about $10\%$ everywhere. For tiering risks the two are interchangeable. For setting the rate level, B would overcharge the whole book, and no ranking measure could have shown it.
