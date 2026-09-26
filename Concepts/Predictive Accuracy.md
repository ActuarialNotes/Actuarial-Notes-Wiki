---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:08636fff41a72467fcf1258b2eb51631a5db84681ff1e9689b2188f62353c151
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Predictive Accuracy.md
---

**Predictive accuracy** is how well a model's predictions agree with outcomes it was *not* fitted to. It is measured on a [[Holdout Sample|holdout sample]] or by [[Cross-Validation|cross-validation]], along three separate axes. **Calibration**: are the predicted levels right? **Discrimination**: does the model rank low risks below high risks? And, for a classifier, **classification**: how often is it right at a chosen threshold?

> $$\text{Test MSE} = \frac{1}{m}\sum_{i \in \text{holdout}}\left(y_i - \hat{f}(x_i)\right)^{2}$$
>
> $$\text{Gini} = 2\,\text{AUROC} - 1$$

- **Overall error.** [[Test Error|Test MSE]] or holdout [[Deviance|deviance]] for a numeric response, and the test error rate for a classifier. Each is a single number that mixes calibration and ranking. $m$ is the number of holdout observations.
- **Discrimination.** Three measures, all of which depend only on the *order* of the predictions, so multiplying every prediction by a constant leaves them unchanged:
  - [[Lift]]: the response rate in the top-scored fraction divided by the overall rate
  - [[AUROC]]: the probability that a random positive is scored above a random negative
  - the [[Gini Index|Gini index]]: $2\,\text{AUROC} - 1$ for a binary classifier; for a rating model, twice the area between the Lorenz curve and the line of equality
- **Classification at a threshold.** The [[Confusion Matrix|confusion matrix]] and the rates read from it: accuracy, sensitivity, specificity and precision. Moving the threshold moves all of them. The ROC curve traces every threshold at once.
- **Pictures that show calibration and compare models.** The [[Quantile Plot|quantile plot]] sorts holdout data by predicted value into equal-exposure buckets and compares actual with predicted, so it shows ranking *and* calibration. The [[Double Lift Chart|double lift chart]] sorts on the *ratio* of two models' predictions, showing which model is right where they disagree.
- **Rules for every measure.** Compute it on holdout data, since on training data the more flexible model always wins. Compare models on the same data. Match the measure to the use: ranking for underwriting selection or fraud triage, calibration for setting a rate level.

> [!example]- Scoring Ten Claims Three Ways {Example}
> A fraud model scores ten holdout claims. The three fraudulent claims score $0.92$, $0.74$ and $0.48$. The seven legitimate claims score $0.81$, $0.55$, $0.40$, $0.33$, $0.21$, $0.15$ and $0.08$. Compute (a) the confusion matrix at threshold $0.5$, (b) the AUROC and Gini, and (c) the lift in the top $20\%$.
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
> > \text{Gini} &= 2(0.857) - 1 \\
> > &= 0.714
> > \end{align*}
> > $$
> > (c) The top $20\%$ is the two highest scores, $0.92$ and $0.81$, of which one is fraud:
> > $$
> > \begin{align*}
> > \text{Lift} &= \frac{1/2}{3/10} \\
> > &= 1.67
> > \end{align*}
> > $$
> > The model ranks well (AUROC $0.857$). But at a $0.5$ threshold half the claims sent for investigation are legitimate. Which number matters depends on what the investigators can handle.

> [!example]- Same Gini, Different Calibration {Example}
> Model B's predictions are exactly $1.10$ times Model A's. Sorted into four equal-exposure buckets of a holdout set, the actual pure premiums are $200$, $300$, $450$ and $650$. Model A predicts $220$, $310$, $430$ and $640$. Compare the models.
>
> > [!answer]-
> > Model B predicts $242$, $341$, $473$ and $704$. Its predictions put every risk in the same order as A's, so the two have **identical Gini, AUROC and lift**. Even the spread from the top bucket to the bottom is the same: $640/220 = 704/242 = 2.91$.
> >
> > The quantile plot separates them. The actual-to-predicted ratios are:
> > - Model A: $0.91$, $0.97$, $1.05$, $1.02$, averaging $400/400 = 1.00$
> > - Model B: $0.83$, $0.88$, $0.95$, $0.92$, averaging $400/440 = 0.91$
> >
> > B over-predicts by about $10\%$ everywhere. For tiering risks the two are interchangeable. For setting the rate level, B would overcharge the whole book, and no ranking measure could have shown it.
