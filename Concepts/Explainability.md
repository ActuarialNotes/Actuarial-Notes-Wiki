---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:311e6c6eaf39fbe34d3d54500b4107e386fa8be7c0c194dcbf6631a6c59505f6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Explainability.md
---

**Explainability** is the ability to explain why a model produces the outputs it does, in terms that a particular stakeholder, such as a regulator, an underwriter or a policyholder, can understand and act on. A [[Generalized Linear Model]] explains itself through its relativities, while a [[Boosting|gradient boosting machine]] or a [[Neural Network|neural network]] has to be explained after fitting, with tools such as [[Variable Importance|variable importance]], [[Partial Dependence Plot|partial dependence plots]] and [[Shapley Value|Shapley values]]. It differs from [[Interpretability|interpretability]], which describes how far a person can follow the model's own mechanics, while explainability describes whether its outputs can be justified to an audience.

> $$\hat{f}(\mathbf{x}) = \phi_0 + \sum_{j=1}^{p} \phi_j(\mathbf{x})$$

| Question the audience asks | Scope | Tool |
| :--- | :--- | :--- |
| Which variables drive the model? | Whole model | Variable importance |
| How does the prediction move with one variable? | Whole model | Partial dependence plot |
| Does that movement differ by record? | Each record | ICE curves |
| Why did this record get this prediction? | One record | Shapley values |
| How well does the model rank risks? | Whole model | Lift and gain charts |

- **Symbols:** In the block above, $\hat{f}(\mathbf{x})$ is the model's prediction for record $\mathbf{x}$, $\phi_0$ is the average prediction over the data, and $\phi_j(\mathbf{x})$ is the part of the difference attributed to predictor $j$. A GLM with an identity link gives these contributions directly as $\beta_j(x_j - \bar{x}_j)$, and for a tree ensemble they are computed as Shapley values.
- **Global and local:** The block is a local explanation, of one prediction, which is usually what a policyholder or an adjuster needs. A global explanation describes the model across the whole portfolio, such as which variables matter most and the shape of each effect.
- **Why actuaries need it:** Regulators reviewing a rate filing expect the effect of each rating variable to be justified, and underwriters and claims staff act on a model's output only when they trust it. Standards of practice point the same way: in the U.S., ASOP No. 41 asks that an [[Actuarial Communication|actuarial communication]] be clear and appropriate to its intended users, and [[ASOP 56 - Modeling (ASB - 2019)|ASOP No. 56]] asks an actuary who uses or relies on a model to understand it, including its limitations.
- **Ethics and fairness:** An explanation is how a modeler finds out that a variable is standing in for a protected characteristic, so a model that cannot be explained cannot be fully checked for [[Proxy Discrimination|proxy discrimination]]. [[Bias in Actuarial Practice]] describes accuracy, fairness and explainability as three goals that pull against each other, and a more complex model usually gains the first at some cost to the other two.
- **When less is acceptable:** A model that is hard to explain can be acceptable when a single prediction carries little at stake, when a person reviews each output before acting, or when the model only ranks work, as a fraud score that orders claims for investigators does. It is much harder to accept when the output sets a filed rate or decides whether a person is offered coverage, because the insurer must then be able to justify each result to the regulator and to the customer.

> [!example]- Turning Shapley Values into a Plain-Language Explanation {Example}
> A boosted claim-frequency model predicts 0.135 claims a year for a driver, against an average prediction of 0.080 over the portfolio. The Shapley values for this driver are $+0.040$ for being under 25, $+0.020$ for an urban territory and $-0.005$ for a car with a collision-avoidance system. Check that the values account for the whole prediction, then write the explanation an underwriter could give the customer.
>
> > [!answer]-
> > The Shapley values and the average prediction must add up to the prediction.
> > $$
> > \begin{align*}
> > \phi_0 + \textstyle\sum_j \phi_j &= 0.080 + 0.040 + 0.020 - 0.005 \\
> > &= 0.135
> > \end{align*}
> > $$
> > Nothing is left unexplained. A plain-language version reads: "We expect 0.135 claims a year on your policy, against 0.080 for an average driver we insure. Being under 25 adds 0.040, and keeping the car in the city adds 0.020. The car's collision-avoidance system takes off 0.005." The explanation names each reason for the difference in the customer's terms, and it describes what the model does without claiming that each factor causes claims.

> [!example]- When Can a Hard-to-Explain Model Be Used? {Example}
> An insurer has two proposals. In the first, a GBM would replace the personal auto GLM whose relativities are filed with the regulator, cutting hold-out deviance by 3%. In the second, a GBM would order the queue of incoming claims for the special investigation unit, whose investigators decide every case themselves. Which use needs more explainability, and what would make each acceptable?
>
> > [!answer]-
> > The rating model needs far more, because its output is a filed premium whose every rating variable the regulator reviews. The GBM would need partial dependence plots for every variable, Shapley values for individual quotes, fairness tests and probably a translation into rating tables (see [[Table Importability]]), and a 3% gain may not justify that work.
> >
> > The triage model can accept less, because it only ranks claims, a person makes each decision with the file in hand, and a poor ranking costs investigators' time rather than setting a wrong price. Its outputs still need testing across groups, because an unfair ranking would send some groups' claims for investigation more often than others'.

> [!tip]- How it appears on the exam
> - **ATPA** gives its Model Explainability and Communication section 25–35% of the weight and assesses it through a take-home report on a data set and a business problem. Its first objective asks candidates to understand the aspects of explainability: its connection to ethics, the difference between explainability and interpretability, and when a lack of explainability may be acceptable.
> - **Model choice:** The Advanced Predictive Analytics Models section asks candidates to select and justify a model by accuracy, explainability, stability, analytical effort, computational efficiency and table importability. Explainability is therefore weighed against accuracy in the business context, not treated as a requirement on its own.
> - **Explaining records:** Candidates are expected to explain why a model predicts certain values for certain records, with the tools in the table above, in language that suits the intended audience.

> [!warning]- Exam traps
> - **Not a synonym for interpretability:** A question about the difference expects the two to be kept apart. Interpretability concerns the model's mechanics and explainability concerns justifying its outputs to an audience, so writing them as synonyms answers neither half.
> - **Importance is not direction:** A variable importance plot says how much a variable matters and nothing about which way it moves the prediction. The direction and the shape of the effect come from a partial dependence plot or from Shapley values.
> - **The model, not the world:** A large Shapley value or a steep partial dependence curve describes what the model does with a variable. It does not show that the variable causes losses, and a variable can carry a large effect because it stands in for something else.
> - **The audience decides:** A SHAP summary plot explains a model to a modeler, not to a policyholder. Handing a technical chart to a non-technical reader leaves that reader without an explanation.
