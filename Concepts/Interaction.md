---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:3a58bbcaaf304fbd6d79edf5a93e8c3779a13ed68566b8d80b6f0519b3aa4ee4
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §3.3.1 printed p.86 (PDF p.96); §3.3.2 'Removing the Additive Assumption' printed pp.87-90 (PDF pp.97-100), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2.1 nested F-test PDF pp.75-76, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C description and tasks 1-9, PDF p.5; reading list PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Rodriguez, Lecture Notes on Generalized Linear Models (Princeton), Ch.2 Linear Models for Continuous Data, two-factor model with interaction, PDF pp.40-41 (R-1, C-1 and (R-1)(C-1) dummies; interaction dummies as products of row and column dummies; a dummy dropped for an empty cell, three rather than four interaction terms; F-test for the interaction on three d.f.), sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "Goldburd, Khare, Tevet & Guller, CAS Monograph 5, 2nd ed., §6.1.3 printed p.64 (comparison valid only on identical datasets), §6.2.1 printed pp.64-65 (nested model = subset of the predictors of a larger model; F-statistic with numerator d.f. = # of added parameters, eq.17), §6.2.2 printed p.66 (non-nested: one does not contain a subset of the variables of the other), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Interaction.md
---

An **Interaction** between two predictors in a [[Generalized Linear Model]] exists when the effect of one predictor on the response depends on the level or value of the other — the combined effect is not simply the sum of each predictor's separate (main) effect.

> $$\eta = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \beta_3 (x_1 \times x_2)$$

- $\beta_3$ is the interaction coefficient: it measures how much the effect of $x_1$ on $\eta$ changes per unit increase in $x_2$ (and symmetrically for $x_2$ given $x_1$)
- If $\beta_3 = 0$, the two predictors act **additively** on the link scale — no interaction
- Interactions can occur between two [[Categorical Predictor|categorical predictors]] (the effect differs by combination of levels), a categorical and a continuous predictor (the slope differs by group), or two continuous predictors
- **Counting an interaction's parameters.** Between two categorical predictors with $k$ and $m$ levels, the interaction is coded by the products of the two factors' indicator variables. With a base level for each factor, a k-level factor crossed with an m-level factor adds (k - 1)(m - 1) interaction parameters, on top of the $k - 1$ and $m - 1$ of the main effects. That count is the degrees of freedom of the nested-model test of the interaction (one fewer for each product column that has to be dropped because its cell of the table is empty)
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
