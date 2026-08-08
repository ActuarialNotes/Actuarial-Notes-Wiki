**Supervised learning** fits a model to predict a labelled response $Y$ from predictors $X$. Every observation in the training data carries the answer, so the fit can be scored against it — the defining contrast with [[Unsupervised Learning]].

> $$Y = f(X) + \varepsilon, \qquad \hat{f} = \arg\min_{f}\ \sum_{i=1}^{n} L\!\left(y_i, f(x_i)\right)$$

- **Regression** predicts a numeric $Y$ (pure premium, severity) and is scored by [[Residual Sum of Squares|squared error]]; **classification** predicts a class (fraud / not) and is scored by error rate, [[AUROC]] or the [[Confusion Matrix]]
- Syllabus methods: [[K-Nearest Neighbors]], [[Decision Tree]]s, [[Tree Ensemble]]s ([[Bagging]], [[Random Forest]], [[Boosting]]), [[Neural Network]]s and the [[Generalized Linear Model]]
- The goal is **test** error, not training error — flexible methods drive training error to zero and generalize badly ([[Bias-Variance Tradeoff]])
- Test error is estimated by a held-out set or by [[Cross-Validation]]
- **Parametric** methods assume a form for $f$ and estimate a few coefficients; **non-parametric** ones (KNN, trees) let the data set the shape, needing far more of it

![[Media/Figures/Supervised_Learning.svg|340]]

> [!example]- Which Task Is This? {Example}
> Classify each: (a) predicting a policy's expected claim count next year; (b) flagging claims likely to be fraudulent, given past investigated claims; (c) grouping 68 territories into five rating regions from their loss characteristics.
>
> > [!answer]-
> > **(a)** Supervised **regression** — the response is a count and history supplies it.
> > **(b)** Supervised **classification** — the investigated claims carry a fraud/no-fraud label.
> > **(c)** **Unsupervised** — there is no "correct region" label to fit against; this is [[Clustering]].
