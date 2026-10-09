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
  content_hash: sha256:176eb5cf12270e03c4677a6964ed159224c4ab38137b6bad8f57ea2b2dcb4630
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Interpretability.md
---
**Interpretability** is the degree to which a person can understand how a model turns its inputs into its outputs. Lipton ("The Mythos of Model Interpretability", 2016) divides it into **transparency**, an understanding of how the model itself works, and **post-hoc interpretability**, information extracted from a fitted model without explaining its inner workings. Transparency is judged at three levels: the whole model (simulatability), its parts (decomposability) and its training algorithm (algorithmic transparency). Interpretability is a property of the model, while [[Explainability|explainability]] concerns justifying the model's outputs to an audience.

> $$g(\mu) = \beta_0 + \beta_1 x_1 + \cdots + \beta_p x_p$$

> $$\hat{f}(\mathbf{x}) = \sum_{b=1}^{B} \lambda\, \hat{f}^{b}(\mathbf{x})$$

- **Symbols:** The first block is a [[Generalized Linear Model]] with [[Link Function|link]] $g$, mean $\mu$ and coefficients $\beta_j$. The second is a [[Boosting|boosted]] model, the sum of $B$ small trees $\hat{f}^{b}$, each shrunk by the learning rate $\lambda$; these two models are the worked contrast on this page.
- **Transparency:** A model is *simulatable* when a person can take in the whole model and work out a prediction by hand in reasonable time. It is *decomposable* when each input, parameter and calculation has an intuitive meaning of its own, as each $e^{\beta_j}$ of a log-link GLM is a rating relativity. It has *algorithmic transparency* when its training procedure is understood well enough to say what the fit will be and why, as maximum likelihood is understood for a GLM.
- **Post-hoc interpretability:** Lipton lists four kinds of post-hoc explanation: text explanations, visualizations such as [[Partial Dependence Plot|partial dependence plots]], local explanations of one prediction such as [[Shapley Value|Shapley values]], and explanation by example, which shows the training records most like the one being explained. These describe what the model does, and they leave its mechanism as hidden as it was.
- **Suitability:** The ATPA outline lists "suitability" beside decomposability, algorithmic transparency and post-hoc interpretability. In Lipton's taxonomy the property in that position is simulatability, described above.

> [!example]- A GLM and a GBM Under Lipton's Taxonomy {Example}
> A frequency GLM with a log link has $\ln\hat{\mu} = -2.30 + 0.47\,x_Y + 0.22\,x_U$, where $x_Y = 1$ for a driver under 25 and $x_U = 1$ for an urban territory. A competing GBM uses the same two variables and 20 others in 800 trees of depth 4 with $\lambda = 0.05$. Compute the GLM's prediction for a young urban driver by hand, then compare the two models on simulatability, decomposability and algorithmic transparency, and say what the GBM needs instead.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \hat{\mu} &= e^{-2.30 + 0.47 + 0.22} \\
> > &= e^{-1.61} \\
> > &= 0.200
> > \end{align*}
> > $$
> > The same prediction reads as a base frequency of $e^{-2.30} = 0.1003$ times relativities of $e^{0.47} = 1.600$ for age and $e^{0.22} = 1.246$ for territory.
> >
> > | Property | GLM | GBM |
> > | :--- | :--- | :--- |
> > | Simulatability | Yes: one line by hand | No: 800 trees to trace |
> > | Decomposability | Yes: each $e^{\beta_j}$ is a relativity | No: one split means little alone |
> > | Algorithmic transparency | Yes: maximum likelihood | Partly: greedy fit, tuned settings |
> >
> > The GBM's fit depends on its learning rate, depth, number of trees and any random subsampling, and no single parameter says what age does to the prediction. It therefore relies on post-hoc interpretability: a variable importance plot to rank the 22 variables, partial dependence and ICE plots for the shape of each effect, and Shapley values for individual quotes. The GBM may well predict better, and the comparison is the trade between that accuracy and the GLM's transparency.

> [!example]- Classifying Six Explanations {Example}
> A pricing team produces six explanations of its models. Classify each as transparency (and which level) or as post-hoc interpretability (and which kind).
>
> 1. The team draws a decision tree with four leaves that an underwriter can follow by hand.
> 2. The team tabulates the GLM's relativities, one for each level of each rating variable.
> 3. The team notes that the GLM's coefficients are maximum likelihood estimates, with standard errors and deviance tests.
> 4. The team plots the partial dependence of a GBM's prediction on driver age.
> 5. The team computes Shapley values for one declined homeowners application.
> 6. The team reports that a claim was flagged because it most resembles three past claims found to be fraudulent.
>
> > [!answer]-
> > 1. **Simulatability:** The whole model can be followed for any record in a few seconds.
> > 2. **Decomposability:** Each parameter has a meaning of its own as a relativity.
> > 3. **Algorithmic transparency:** It explains how the fit is produced and what its properties are.
> > 4. **Post-hoc, visualization:** It shows the model's average response to age without revealing how the trees produce it.
> > 5. **Post-hoc, local explanation:** It explains one prediction rather than the model as a whole.
> > 6. **Post-hoc, explanation by example:** It justifies the output by pointing to similar records rather than to the model's mechanism.

> [!tip]- How it appears on the exam
> - **ATPA** asks candidates, in its Model Explainability and Communication section, to understand suitability, decomposability, algorithmic transparency and post-hoc interpretability, and the difference between explainability and interpretability. A task can ask which of these properties a proposed model has, or which post-hoc tools would make a less transparent model usable for its business purpose.
> - **Comparing models:** The models section asks candidates to compare results with those of linear and tree-based methods. The first example shows the shape of that comparison: the more flexible model may predict better, while the GLM is more transparent.

> [!warning]- Exam traps
> - **Linear is not automatically interpretable:** Lipton points out that a linear model with hundreds of engineered features or interaction terms is neither simulatable nor decomposable, and that a small tree can be easier to follow than a large linear model. An answer that calls every GLM interpretable and every tree ensemble opaque misses this point.
> - **Post-hoc is not transparency:** A partial dependence plot or a Shapley value approximates what a model does, and it can look plausible while averaging away an interaction or extrapolating to records that never occur. It makes an opaque model easier to use, but it does not make the model transparent.
> - **Meaningful inputs:** Decomposability needs inputs that a person understands. A coefficient on a principal component or on a heavily transformed variable (see [[Feature Engineering]]) has no intuitive meaning, even inside a linear model.
> - **Keep the two words apart:** The terms are used loosely in practice. When a question asks for the difference, interpretability describes the model's mechanics and explainability describes communicating its outputs to an audience.
