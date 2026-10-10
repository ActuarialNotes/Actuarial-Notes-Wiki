**Model training and evaluation** is the process of fitting a predictive model on one part of the data and judging it on data it has not seen. The available records are split into a **training** set used to build the model, often a **validation** set used to refine and compare candidates, and a **test** (holdout) set kept back to estimate how the final model will perform on new business. Performance is measured with metrics suited to the target: prediction error and lift for a numeric target, and the confusion matrix, ROC curve and related rates for a yes/no target.

> $$\text{MSE}_{\text{test}} = \frac{1}{n_{\text{test}}} \sum_{i \in \text{test}} \big(y_i - \hat{f}(x_i)\big)^2$$

> $$\text{CV}_{(k)} = \frac{1}{k} \sum_{j=1}^{k} \text{MSE}_j$$

> $$\text{Precision} = \frac{TP}{TP + FP}$$

> $$\text{Recall} = \frac{TP}{TP + FN}$$

> $$\text{AUROC} = 0.5 \times \text{normalized Gini} + 0.5$$

- **Symbols:** $\hat{f}$ is fitted on the training data only, and the test MSE averages its squared errors over $n_{\text{test}}$ records it never saw. In $k$-fold [[Cross-Validation|cross-validation]], the data are split into $k$ folds, the model is fitted $k$ times leaving out one fold each time, and $\text{MSE}_j$ is the error on the fold left out (*ISLR*, §5.1.3). $TP$, $FP$, $FN$ and $TN$ are the four cells of the [[Confusion Matrix|confusion matrix]]. Recall is also called sensitivity or the true positive rate. The last block is Goldburd et al.'s footnote linking [[AUROC]] to the normalized [[Gini Index|Gini index]].
- **Why hold data out:** Training error keeps falling as a model gets more flexible, while error on new data falls and then rises, a U-shape. A model with small training error and large test error is [[Overfitting|overfitting]]: it has learned patterns in the training data that arose by chance (*ISLR*, §2.2). ASOP 56 defines overfitting the same way and defines hold-out data as data withheld while developing a predictive model so it can be validated later.
- **Typical splits:** Goldburd et al. (CAS Monograph 5, §4.3) give 60/40 or 70/30 for train/test and 40/30/30 for train/validation/test. The split can be random or by time; an **out-of-time** test set, such as a later accident year, is especially important when one event, such as a windstorm, causes many losses, since a random split would put the same storm in both sets.
- **Use the test set sparingly:** Every decision made by looking at the test set turns it into training data, and its result becomes optimistic. Goldburd et al. build all candidate models on the training data, compare them on the test set once at the end, and then refit the chosen model on all the data. See [[Train-Test Split]] and [[Holdout Sample]].
- **Cross-validation's limits in insurance:** Cross-validation uses every record for testing, but it only gives an honest estimate if every modeling step, including variable selection, is repeated inside each fold. Because insurance GLM variables are usually chosen by hand, Goldburd et al. prefer a fixed holdout set and use cross-validation within the training data to tune choices such as the number of polynomial terms.
- **Numeric targets:** Besides MSE, insurance models are judged by [[Lift|lift]]: how well they separate the best risks from the worst on holdout data. A [[Quantile Plot|quantile plot]] sorts records by predicted loss cost into equal-exposure buckets and compares actual with predicted in each, judged on accuracy, monotonicity and the spread between the first and last buckets. A [[Double Lift Chart|double lift chart]] compares two models directly, and the Gini index summarizes the Lorenz curve. Lift is relative: it compares one model with another.
- **Yes/no targets:** A [[Logistic Regression|logistic]] or [[Classification Tree|tree]] model gives a probability; a **threshold** turns it into a decision. Lowering the threshold catches more true positives at the cost of more false positives. The ROC curve plots the true positive rate against the false positive rate across all thresholds. An area under it (AUROC) of 0.5 is no better than chance and 1.0 is perfect. Accuracy, the share classified correctly, can mislead when one class is rare, and *ISLR* (Table 4.7) lists precision, recall, specificity and the false positive rate as the measures to read alongside it.

> [!example]- A Claims Fraud Model at Two Thresholds {Example}
> Goldburd et al. (§7.3.1) test a claims fraud model on 813 holdout claims, 109 of them fraudulent. At a 50% threshold the model flags 70 claims, 39 of them fraudulent. At 25% it flags 178, 75 of them fraudulent. Compute accuracy, precision and recall at each threshold, and compare with flagging nothing.
>
> > [!answer]-
> > At 50%: $TP = 39$, $FN = 109 - 39 = 70$, $FP = 70 - 39 = 31$, $TN = 704 - 31 = 673$. At 25%: $TP = 75$, $FN = 34$, $FP = 103$, $TN = 601$.
> > $$
> > \begin{align*}
> > \text{Accuracy}_{50} &= \frac{39 + 673}{813} \\
> > &= 0.876 \\
> > \text{Precision}_{50} &= \frac{39}{70} \\
> > &= 0.557 \\
> > \text{Recall}_{50} &= \frac{39}{109} \\
> > &= 0.358 \\
> > \text{Accuracy}_{25} &= \frac{75 + 601}{813} \\
> > &= 0.831 \\
> > \text{Precision}_{25} &= \frac{75}{178} \\
> > &= 0.421 \\
> > \text{Recall}_{25} &= \frac{75}{109} \\
> > &= 0.688
> > \end{align*}
> > $$
> > Flagging nothing would be right on all 704 legitimate claims, for an accuracy of $704 / 813 = 0.866$, **higher** than the 25% threshold achieves. Yet the 25% threshold catches 69% of fraud instead of none. Accuracy alone would pick a useless model; the choice of threshold weighs the cost of a missed fraud against the cost of investigating a legitimate claim, which is a business decision.

> [!example]- Choosing Model Complexity on a Validation Set {Example}
> An analyst fits five severity models of increasing complexity on a training set and scores each on a validation set:
>
> | Model | 1 | 2 | 3 | 4 | 5 |
> | :--- | ---: | ---: | ---: | ---: | ---: |
> | Training MSE | 52.0 | 41.5 | 38.2 | 36.9 | 35.1 |
> | Validation MSE | 54.1 | 43.0 | 40.6 | 42.8 | 47.3 |
>
> Which model should be chosen, what is happening to Models 4 and 5, and how should the chosen model's performance be reported?
>
> > [!answer]-
> > Training MSE falls with every step, as it always does. Validation MSE falls to **Model 3** and then rises: Models 4 and 5 are overfitting, fitting noise in the training data that does not carry over to new records. Choose Model 3. Its validation MSE of 40.6 is somewhat optimistic, because the validation set was used to pick it from five candidates, so its performance should be reported from the untouched test set, scored once. The chosen model can then be refit on all the data before it is used.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Section 7.3 covers predictive model training and evaluation. Questions describe a data split or an evaluation and ask what went wrong (testing on training data, reusing the test set, a random split across one catastrophe), or which model to choose from training and validation results.
> - Calculation questions give a confusion matrix, or the counts to build one, and ask for accuracy, precision, recall, specificity or the false positive rate, or how they move when the threshold changes.
> - Interpretation questions describe a lift chart or ROC curve and ask which model is better or what an AUROC of 0.5 means.

> [!warning]- Exam traps
> - **Precision vs. recall:** Precision divides by everything *flagged* ($TP + FP$); recall divides by everything *actually positive* ($TP + FN$). Swapping the denominators is the most common slip.
> - **Accuracy on a rare class:** With 13% fraud, a model that flags nothing is 87% accurate. Never judge a classifier for a rare event on accuracy alone.
> - **Training error as evidence:** A lower training error does not mean a better model; more complexity always lowers it. Compare on data the model has not seen.
> - **A test set used to choose:** Once the test set has picked among models, its error for the winner is no longer an unbiased estimate. Choose on validation data or by cross-validation inside the training set.
