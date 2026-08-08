**Cross-Validation** estimates how well a model predicts **new** data by repeatedly holding part of the sample out of the fit and scoring the model on it. It measures test error directly, rather than penalizing complexity indirectly as [[AIC]] and [[BIC]] do.

> $$\text{CV}_{(k)} = \frac{1}{k}\sum_{j=1}^{k} \text{MSE}_j$$

> $$\text{CV}_{(n)} = \frac{1}{n}\sum_{i=1}^{n}\left(\frac{y_i - \hat{y}_i}{1 - h_{ii}}\right)^{2} \qquad \text{(LOOCV, linear model)}$$

- **$k$-fold**: split the data into $k$ equal parts, fit on $k-1$ and score on the held-out fold, then rotate. $k = 5$ or $10$ is the standard compromise between bias and computation
- **Leave-one-out** ($k = n$) is nearly unbiased but has high variance and is expensive — except in a linear model, where the shortcut above gets it from a single fit using the leverages $h_{ii}$
- Cross-validation is what turns the [[Bias-Variance Tradeoff]] into a decision: training error falls monotonically with complexity, while CV error is U-shaped, and its minimum marks the right model size
- It compares **non-nested** models freely (a GLM against a tree, different link functions, different sets of predictors) where a [[Likelihood Ratio Test]] cannot
- Every step that touches the response — [[Variable Selection]], banding a variable by its indicated relativities, tuning a penalty — must sit **inside** the fold, or the held-out data has already influenced the fit and the CV error is optimistic
- With time-ordered data, random folds leak the future into the past; use a rolling-origin split, and for grouped data (repeated policies) hold out whole groups

![[Media/Figures/Cross-Validation.svg|340]]

> [!example]- Choosing Model Complexity by CV Error {Example}
> Five candidate models give training MSE of $520, 410, 350, 320, 305$ and 10-fold CV MSE of $530, 430, 395, 415, 470$. Which model should be selected?
>
> > [!answer]-
> > **Model 3.** Training error keeps falling as terms are added — it always does — but CV error bottoms out at $395$ and rises afterwards. Models 4 and 5 are fitting noise: the gap between training ($305$) and CV error ($470$) for model 5 is the overfitting made visible.

> [!example]- Leaking the Response into the Folds {Example}
> An analyst screens $200$ candidate predictors on the full data set, keeps the $10$ with the strongest correlation to the response, then runs 10-fold CV on a model using those $10$. Why is the resulting error too low?
>
> > [!answer]-
> > The screening step used **every** observation, including the ones later held out, so the selected predictors are already tuned to the whole sample — the held-out folds are not new data. The correct procedure repeats the screening **inside each fold**, selecting from the $200$ using only that fold's training rows. Done properly, the CV error is typically much higher, and often the ten "strong" predictors turn out to be noise.
