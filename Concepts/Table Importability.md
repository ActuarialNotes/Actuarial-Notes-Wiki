---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c12a236685f05dcc2c95e209d2bfb08206079c56c090782cd1ed3c392f98e431
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Table Importability.md
---

**Table Importability** is whether a model's output can be expressed as rating tables, a base rate and a table of relativities for each rating variable, that an insurer's existing rating or policy administration system can import and apply. A [[Generalized Linear Model]] with a log link is table-importable by construction, while a [[Boosting|gradient boosting machine]] generally is not, because its prediction is a sum of hundreds of trees whose splits interact. The ATPA outline lists it among the criteria for choosing a model, alongside accuracy, [[Explainability|explainability]], stability, analytical effort and computational efficiency.

> $$\hat{\mu}(\mathbf{x}) = B \times \prod_{j=1}^{p} R_j(x_j)$$

> $$R_j(\ell) = e^{\beta_{j\ell}}$$

- **Symbols:** $B = e^{\beta_0}$ is the base rate, the prediction for a risk at every variable's base level, and $R_j(\ell)$ is the relativity for level $\ell$ of rating variable $j$, which a log-link GLM gives as $e^{\beta_{j\ell}}$. An interaction term is handled the same way, as a two-way table with one relativity for each pair of levels.
- **Why it matters:** A [[Rating Algorithm|rating algorithm]] made of tables can be loaded into the existing rating engine, filed in a rate manual that a regulator can review, and checked by hand. A model that is not table-importable has to be scored by new software in production, which adds IT cost, delay and a new source of [[Model Risk|model risk]].
- **Between the extremes:** A boosted model of single-split trees with a log link is additive on the log scale, so each variable's contributions form a one-way table, and trees with two splits give two-way tables. A deeper GBM can be approximated by tables, for example by fitting a GLM to its predictions or by using it to find the interactions worth adding to a GLM, at a cost in accuracy that can be measured on hold-out data.

> [!example]- From GLM Coefficients to Rating Tables {Example}
> A log-link pure premium GLM has an intercept of 6.2146 and coefficients of 0.1823 for territory 2, 0.4700 for a young driver (aged 16–24) and $-0.1054$ for vehicle group 3. Express the model as tables, price a risk with all three characteristics, and explain why a GBM of 1,500 trees, each with five splits, could not be loaded the same way.
>
> > [!answer]-
> > Each coefficient becomes an entry in a table by exponentiation.
> > $$
> > \begin{align*}
> > B &= e^{6.2146} \\
> > &= 500.00 \\
> > R_{\text{terr}}(2) &= e^{0.1823} \\
> > &= 1.20 \\
> > R_{\text{age}}(\text{young}) &= e^{0.4700} \\
> > &= 1.60 \\
> > R_{\text{veh}}(3) &= e^{-0.1054} \\
> > &= 0.90
> > \end{align*}
> > $$
> > The premium is $500.00 \times 1.20 \times 1.60 \times 0.90 = 864.00$, or $\$864$, and the rating engine needs only the base rate and three one-way tables to reproduce it. In the GBM, five splits can involve up to five different variables, so a risk's prediction depends on combinations of up to five variables at once, summed over 1,500 trees. No small set of one-way or two-way tables reproduces that, and a table of every combination would be far too large to file or review, so the GBM would have to be scored by its own software.

> [!tip]- How it appears on the exam
> - **ATPA** asks candidates to select and justify a modeling approach based on accuracy, explainability, stability, analytical effort, computational efficiency and table importability, taking the business context into account. A justification can note that a GLM's output loads straight into the existing rating system, while a more accurate GBM would need new software to deploy.

> [!warning]- Exam traps
> - **Importable is not interpretable:** A GLM with many interaction terms can still be imported as tables while being hard to understand. The two criteria are judged separately.
> - **The business context decides its weight:** A model that will never set a filed rate, such as a claims-triage or marketing model, may not need to be table-importable at all. Giving the criterion heavy weight there argues against a model for the wrong reason.
