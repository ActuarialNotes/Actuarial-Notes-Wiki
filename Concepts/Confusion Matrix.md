A **confusion matrix** cross-tabulates predicted class against actual class for a classifier, and is the table every classification metric is computed from.

> $$\begin{array}{c|cc} & \text{Actual} + & \text{Actual} - \\ \hline \text{Pred} + & TP & FP \\ \text{Pred} - & FN & TN \end{array}$$

| Metric | Formula | Reads as |
| :--- | :--- | :--- |
| Accuracy | $\dfrac{TP + TN}{n}$ | overall correct |
| **Sensitivity** (recall, TPR) | $\dfrac{TP}{TP + FN}$ | of the actual positives, how many were caught |
| **Specificity** (TNR) | $\dfrac{TN}{TN + FP}$ | of the actual negatives, how many were left alone |
| Precision (PPV) | $\dfrac{TP}{TP + FP}$ | of the flagged, how many were right |
| False positive rate | $1 - \text{specificity}$ | the $x$-axis of the ROC curve |

- The matrix depends on the **threshold** applied to the predicted probability; moving it trades sensitivity against specificity. [[AUROC]] summarizes every threshold at once
- **Accuracy misleads under class imbalance.** With 1% fraud, predicting "never fraud" scores 99% accuracy and catches nothing — sensitivity is 0
- The two errors rarely cost the same: a missed fraud and a wrongly investigated honest claim have different price tags, and the threshold should reflect that rather than defaulting to 0.5
- Sensitivity/specificity are read **down the actual columns**; precision reads **across the predicted row** — the usual place to slip

![[Media/Figures/Confusion_Matrix.svg|340]]

> [!example]- Scoring a Fraud Model {Example}
> On 1,000 claims, 60 are fraudulent. A model flags 90 claims, of which 45 are truly fraudulent. Build the matrix and compute accuracy, sensitivity, specificity and precision.
>
> > [!answer]-
> > $TP = 45$, $FP = 90 - 45 = 45$, $FN = 60 - 45 = 15$, $TN = 1000 - 45 - 45 - 15 = 895$.
> > $$\text{Accuracy} = \frac{45 + 895}{1000} = 94.0\%$$
> > $$\text{Sensitivity} = \frac{45}{60} = 75.0\% \qquad \text{Specificity} = \frac{895}{940} = 95.2\%$$
> > $$\text{Precision} = \frac{45}{90} = 50.0\%$$
> > Note that flagging nothing would score 94.0% accuracy too — identical accuracy, zero sensitivity. Accuracy alone would not have separated the two models.
