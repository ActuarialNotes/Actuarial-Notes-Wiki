**Variable importance** ranks predictors in a [[Tree Ensemble]] by how much they contribute across all the trees, restoring some of the interpretability a single [[Decision Tree]] has and an ensemble of hundreds does not.

> $$\mathrm{Imp}(X_j) = \frac{1}{B}\sum_{b=1}^{B}\ \sum_{\text{splits on } X_j \text{ in tree } b} \Delta\,\text{impurity}$$

- **Impurity-based**: total reduction in [[Residual Sum of Squares]] (regression) or [[Gini Index]] (classification) summed over every split on $X_j$, averaged over the trees
- **Permutation-based**: shuffle $X_j$ in the [[Out-of-Bag Error|out-of-bag]] data and measure how far accuracy falls. Slower, but not biased toward high-cardinality predictors the way impurity importance is
- Importance says a variable **matters**, not *which way* it pushes the prediction — direction and shape need a partial dependence plot
- **Correlated predictors split the credit** between them, so either can look unimportant on its own; drop one and the other's importance jumps
- Usually reported rescaled so the largest is 100

![[Media/Figures/Variable_Importance.svg|340]]

> [!example]- Reading an Importance Table {Example}
> A random forest fraud model reports importances: prior claims 100, claim amount 71, days-to-report 64, territory 12, policy age 9, gender 2. Two analysts disagree — one wants to drop everything below 15, the other says the territory effect is real. Who is right?
>
> > [!answer]-
> > Neither, on this evidence alone. The top three carry most of the signal, but a low importance can mean a variable is genuinely weak **or** that a correlated stronger variable is absorbing its credit — territory and claim amount may well overlap.
> > Test it: drop territory, refit, and compare [[Out-of-Bag Error|OOB]] error. If the error is unchanged the variable is redundant; if it rises, the importance score was masking a real contribution.
