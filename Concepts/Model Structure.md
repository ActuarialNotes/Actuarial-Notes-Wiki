**Model Structure** is the specific set of terms included in an [[Extended Linear Model]]'s linear predictor — which predictors, transformations, and [[Interaction|interactions]] appear — as distinct from the choice of response distribution or [[Link Function]].

> $$\eta = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \beta_3 (x_1 \times x_2) + \beta_4 x_1^2 + \cdots$$

- Model structure decisions include: which [[Categorical Predictor|predictors]] to include, whether to add [[Interaction|interaction terms]], and whether to band or transform (e.g., polynomial terms for) continuous variables — this is the focus of **[[Variable Selection]]**
- A model can have the correct distribution and link but the wrong structure (e.g., a missing interaction); structure adequacy is checked with a [[Residual Plot]] or a [[Marginal Model Plot]]
- Adding structure (more terms) always improves in-sample fit but risks overfitting; [[AIC]] and [[BIC]] penalize unnecessary complexity when comparing structures
- Two models with the same response distribution and link but different structure are compared using **[[ANOVA]] (analysis of deviance)** if one is nested within the other

> [!example]- Comparing Two Candidate Model Structures {Example}
> An actuary fits a Poisson GLM for claim frequency two ways: Model 1 uses main effects for territory and vehicle age only ([[AIC]] $= 4{,}102$). Model 2 adds a territory $\times$ vehicle age interaction ([[AIC]] $= 4{,}085$). Which model structure is preferred?
>
> > [!answer]-
> > Lower AIC indicates a better trade-off between fit and complexity. Since Model 2's AIC ($4{,}085$) is lower than Model 1's ($4{,}102$), the richer model structure — including the territory $\times$ vehicle age **[[Interaction]]** — is preferred, provided the interaction terms are also individually significant in the [[Parameter Estimate Tables|parameter estimate table]].
