---
aliases:
  - Decomposability
  - Algorithmic Transparency
  - Post-Hoc Interpretability
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:33cd16d651270b285bcb4d4ac26d935b59be6ba6ecb36a14d867d110c1721735
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Interpretability.md
---
**Interpretability** is the degree to which a person can understand how a model turns its inputs into its outputs. Interpretability is a property of the model, while [[Explainability|explainability]] concerns justifying the model's outputs to an audience.

Lipton ("The Mythos of Model Interpretability", 2016) divides interpretability into two kinds:

1. **Transparency**, an understanding of how the model itself works, judged at three levels:
   - A model is **simulatable** when a person can take in the whole model and work out a prediction by hand in reasonable time.
   - It is **decomposable** when each input, parameter and calculation has an intuitive meaning of its own, as each $e^{\beta_j}$ of a log-link GLM is a rating relativity.
   - It has **algorithmic transparency** when its training procedure is understood well enough to say what the fit will be and why, as maximum likelihood is understood for a GLM.
2. **Post-hoc interpretability**, information extracted from a fitted model without explaining its inner workings. Lipton lists four kinds: text explanations, visualizations such as [[Partial Dependence Plot|partial dependence plots]], local explanations of one prediction such as [[Shapley Value|Shapley values]], and explanation by example, which shows the training records most like the one being explained.

The ATPA outline lists "suitability" beside decomposability, algorithmic transparency and post-hoc interpretability. In Lipton's taxonomy the property in that position is simulatability.

Decomposability needs inputs that a person understands. A coefficient on a principal component or on a heavily transformed variable (a product of [[Feature Engineering|feature engineering]]) has no intuitive meaning, even inside a linear model.

A post-hoc explanation describes what the model does and leaves its mechanism as hidden as it was. A partial dependence plot or a Shapley value approximates the model, and it can look plausible while averaging away an interaction or extrapolating to records that never occur. It makes an opaque model easier to use, but it does not make the model transparent.

> [!example]- How does each of these six explanations fit Lipton's taxonomy? {Example}
> A pricing team produces six explanations of its models.
>
> 1. A decision tree with four leaves that an underwriter can follow by hand.
> 2. A table of the GLM's relativities, one for each level of each rating variable.
> 3. A note that the GLM's coefficients are maximum likelihood estimates, with standard errors and deviance tests.
> 4. A plot of the partial dependence of a GBM's prediction on driver age.
> 5. Shapley values for one declined homeowners application.
> 6. A report that a claim was flagged because it most resembles three past claims found to be fraudulent.
>
> > [!answer]-
> > - The tree is **simulatable**, because the whole model can be followed for any record in a few seconds.
> > - The relativities are **decomposable**, because each parameter has a meaning of its own.
> > - The note on maximum likelihood is **algorithmic transparency**, because it explains how the fit is produced and what its properties are.
> > - The partial dependence plot is a **post-hoc visualization**, because it shows the model's average response to age without revealing how the trees produce it.
> > - The Shapley values are a **post-hoc local explanation**, because they explain one prediction rather than the model as a whole.
> > - The report is **post-hoc explanation by example**, because it justifies the output by pointing to similar records rather than to the model's mechanism.

## Interpretability and flexibility

A more flexible model may predict better, while a less flexible one such as a GLM is more transparent, so choosing between them trades accuracy against interpretability. A [[Generalized Linear Model]] with [[Link Function|link]] $g$ relates the mean $\mu$ to the predictors by

> $$g(\mu) = \beta_0 + \beta_1 x_1 + \cdots + \beta_p x_p$$

- $\beta_j$ is the coefficient of predictor $x_j$.

A [[Boosting|boosted]] model's prediction is

> $$\hat{f}(\mathbf{x}) = \sum_{b=1}^{B} \lambda\, \hat{f}^{b}(\mathbf{x})$$

- $B$ is the number of small trees.
- $\hat{f}^{b}$ is the $b$th tree.
- $\lambda$ is the learning rate, which shrinks each tree.

> [!example]- What is the GLM's prediction for a young urban driver, and how do the two models compare on transparency? {Example}
> A frequency GLM with a log link has $\ln\hat{\mu} = -2.30 + 0.47\,x_Y + 0.22\,x_U$, where $x_Y = 1$ for a driver under 25 and $x_U = 1$ for an urban territory. A competing GBM uses the same two variables and 20 others in 800 trees of depth 4 with $\lambda = 0.05$.
>
> > [!answer]-
> > - The GLM's prediction is $\hat{\mu} = e^{-2.30 + 0.47 + 0.22} = e^{-1.61} = 0.200$.
> > - The same prediction reads as a base frequency of $e^{-2.30} = 0.1003$ times relativities of $e^{0.47} = 1.600$ for age and $e^{0.22} = 1.246$ for territory.
> > - The GLM is simulatable (one line by hand), decomposable (each $e^{\beta_j}$ is a relativity) and algorithmically transparent (maximum likelihood).
> > - The GBM is not simulatable (800 trees to trace) and not decomposable (one split means little alone). It is only partly algorithmically transparent, because its fit depends on its learning rate, depth, number of trees and any random subsampling.
> > - The GBM therefore relies on post-hoc interpretability: a variable importance plot to rank the 22 variables, partial dependence and ICE plots for the shape of each effect, and Shapley values for individual quotes.
> > - The GBM may well predict better, and the choice is the trade between that accuracy and the GLM's transparency.

> [!trap] Calling every linear model interpretable
> Lipton points out that a linear model with hundreds of engineered features or interaction terms is neither simulatable nor decomposable, and that a small tree can be easier to follow than a large linear model. An answer that calls every GLM interpretable and every tree ensemble opaque misses this point.
