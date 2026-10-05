---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:19f3e8ad53b25278479adf13c8a47c20aa2f23737a893df4adaa9f1c76b78568
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §3.3.2 Extensions of the Linear Model, 'Removing the Additive Assumption' (printed pp.87-90, PDF pp.97-100), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §5.6 Interactions PDF pp.65-67, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 5, PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Interaction.md
---

An **Interaction** between two predictors in a [[Generalized Linear Model]] exists when the effect of one predictor on the response depends on the level or value of the other — the combined effect is not simply the sum of each predictor's separate (main) effect.

> $$\eta = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \beta_3 (x_1 \times x_2)$$

- $\beta_3$ is the interaction coefficient: it measures how much the effect of $x_1$ on $\eta$ changes per unit increase in $x_2$ (and symmetrically for $x_2$ given $x_1$)
- If $\beta_3 = 0$, the two predictors act **additively** on the link scale — no interaction
- Interactions can occur between two [[Categorical Predictor|categorical predictors]] (the effect differs by combination of levels), a categorical and a continuous predictor (the slope differs by group), or two continuous predictors
- Interaction terms add to the [[Model Structure]] and are tested for significance via the [[Parameter Estimate Tables|parameter estimate table]] or a nested-model [[ANOVA]] (likelihood-ratio) test; unnecessary interactions increase the risk of overfitting. An interaction with a categorical predictor of more than two levels has several coefficients; test them jointly with the nested-model test, since the individual coefficients and their p-values depend on which level is the base
- **Hierarchical principle**: if an interaction is included, its main effects are included too, even if their p-values are not significant. $x_1 \times x_2$ is typically correlated with $x_1$ and $x_2$, so leaving the main effects out tends to alter the meaning of the interaction

![[Media/Figures/Interaction.svg|340]]

> [!example]- Interpreting an Interaction Coefficient {Example}
> A Poisson GLM for claim frequency includes vehicle age ($x_1$), an indicator for sports car ($x_2$), and their interaction, with $\hat{\beta}_1 = -0.02$, $\hat{\beta}_2 = 0.10$, $\hat{\beta}_3 = 0.03$. How does the effect of one additional year of vehicle age on log-frequency differ for sports cars versus non-sports cars?
>
> > [!answer]-
> > For non-sports cars ($x_2 = 0$), one more year of age changes $\eta$ by $\hat{\beta}_1 = -0.02$.
> > For sports cars ($x_2 = 1$), one more year of age changes $\eta$ by $\hat{\beta}_1 + \hat{\beta}_3 = -0.02 + 0.03 = 0.01$.
> > The interaction reverses the sign of the age effect for sports cars: frequency decreases with age for non-sports cars but slightly increases with age for sports cars.
