---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:523edca5c7891019d0f77216022b21fc2a29e861df0e94ab78f73634f31be01f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Surrogate Model.md
---

A **Surrogate Model** is an interpretable model — for pricing, a [[Generalized Linear Model|GLM]] — trained to approximate the predictions of a **black-box model** such as a gradient [[Boosting|boosting]] machine (GBM). More broadly, the black box's predictions are used to check and improve the GLM: which features matter, the shapes of nonlinear effects, and the interactions the GLM has missed.

> $$\Delta_j = \text{perf} - \text{perf}_{\,x_j\ \text{permuted}}$$

> $$\text{FI}_j = 100 \times \frac{\Delta_j}{\max_m \Delta_m}$$

> $$\text{PD}(v) = \frac{\sum_i \hat{f}(\mathbf{x}_i \mid x_{ij} = v)}{\sum_i \hat{f}(\mathbf{x}_i \mid x_{ij} = v_0)}$$

> $$I_{AB} = pl_A + pl_B - pl_{AB}$$

- **Permutation feature importance** ([[Variable Importance]]). $\Delta_j$ is the loss of performance, measured on held-out data, when the column of feature $j$ is randomly shuffled and everything else is left as it was, and $\text{FI}_j$ rescales it so the most important feature scores $100$. It needs only predictions, so it is model-agnostic. Caveats: permuting one of several correlated features creates impossible records (a jet engine with a horsepower rating); it measures importance *in the trained model*; and it counts the feature's interactions too.
- **Partial dependence.** $\text{PD}(v)$ sets feature $j$ to $v$ for every record and compares total predictions against a reference value $v_0$. For a GLM without interactions it reproduces the relativity exactly. For a black box it is a global average weighted by the predictions, and the record-level ratios can vary widely.
- **Interaction screen.** $pl_A$ and $pl_B$ are the performance losses from permuting $A$ and $B$ separately, and $pl_{AB}$ the loss from permuting them together. Two features with no interactions give $I_{AB} = 0$. A positive value means they interact with each other or with a common third feature, and the top-ranked pairs are then inspected graphically.
- **Using the black box.**
  - *Surrogate GLM for nonlinear effects.* Train a good ML model, extract the shapes of its nonlinear effects, and use them to fit the GLM.
  - *Variable selection.* Compare GLM and GBM importance rankings for a feature that matters much more to the black box. In the aviation study, the number of aircraft registered to the owner ranked third in the GBM but eleventh or twelfth in the GLM.
  - *Nonlinear effects.* Compare partial dependence plots. Where they part, add step functions or [[Hinge Function|hinges]] in that range.
  - *Interactions.* Divide black-box predictions by GLM predictions and fit a [[Decision Tree|decision tree]] to the ratio. Then enter the leaf IDs as a feature in a penalized GLM, with the GLM's predictions as an offset ([[Two-Stage Model]]). In the aviation study this raised the GLM's cross-validation [[Pseudo R-Squared|pseudo-R²]] to $0.156$, against the GBM's $0.165$.
- **Beware the black box's variance.** A GBM is in effect a phenomenally complicated GLM, with countless step functions and interactions, and its gap between training and cross-validation performance can be wide. Importance is computed on each cross-validation model's held-out fold. Patterns imported into the GLM need their variance monitored, along with the mix of business written after the new rates. Random forests, GBMs and neural networks tend to keep every feature in some small role, which is why their *importance* is compared rather than their feature lists.

> [!example]- Permutation Importance on a Validation Fold {Example}
> A GBM scores validation pseudo-R² $0.150$. Permuting one feature at a time gives $0.090$ for territory, $0.126$ for vehicle age, $0.144$ for credit tier and $0.151$ for garaging type. Compute each feature's permutation importance and interpret the garaging result.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \Delta_{\text{territory}} &= 0.150 - 0.090 \\
> > &= 0.060 \\[4pt]
> > \Delta_{\text{veh age}} &= 0.150 - 0.126 \\
> > &= 0.024 \\[4pt]
> > \Delta_{\text{credit}} &= 0.150 - 0.144 \\
> > &= 0.006 \\[4pt]
> > \Delta_{\text{garaging}} &= 0.150 - 0.151 \\
> > &= -0.001
> > \end{align*}
> > $$
> >
> > Rescaled to the largest, the importances are $100$, $40$, $10$ and about $-2$. Territory dominates. A slightly negative importance means shuffling garaging did no harm. The model may not use it, or the result may be noise or come from impossible permuted records. It is a candidate for removal, but check the same feature in the GLM before dropping it. Both models' importances should be averaged across all the cross-validation folds, not read from one.

> [!example]- Screening for an Interaction {Example}
> Permutation losses in validation pseudo-R² are:
>
> - Region alone $0.040$, aircraft age alone $0.025$, both together $0.050$
> - Engine type alone $0.010$, seats alone $0.030$, both together $0.040$
>
> Which pair is a candidate interaction?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > I_{\text{region, age}} &= 0.040 + 0.025 - 0.050 \\
> > &= 0.015 \\[4pt]
> > I_{\text{engine, seats}} &= 0.010 + 0.030 - 0.040 \\
> > &= 0
> > \end{align*}
> > $$
> >
> > Region × aircraft age is the candidate. Each separate permutation also destroyed the shared interaction, so the separate losses double-count it by $0.015$. Engine type and seats act independently. The next step is to plot actual-over-predicted by age band for the two regions, and if the pattern is real, add the interaction to the GLM and confirm it improves cross-validation performance.

> [!example]- Partial Dependence Is a Weighted Average {Example}
> A GBM's predictions for three policies with the number of registered aircraft set to $1$ are $0.010$, $0.004$ and $0.002$, and with it set to $10$ they are $0.011$, $0.006$ and $0.004$. Find the partial dependence ratio for $10$ against $1$, and compare it with the average of the policy-level ratios.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{PD}(10) &= \frac{0.011 + 0.006 + 0.004}{0.010 + 0.004 + 0.002} \\
> > &= \frac{0.021}{0.016} \\
> > &= 1.313
> > \end{align*}
> > $$
> >
> > The policy-level ratios are $1.10$, $1.50$ and $2.00$, averaging $1.533$. Partial dependence sums predictions, so it weights each policy by its predicted frequency, and the riskiest policy, with the smallest ratio, pulls it down. A GLM without interactions would give the same ratio for every policy. The spread here shows the black box has built the feature into interactions, so one global relativity can mislead for individual segments.
