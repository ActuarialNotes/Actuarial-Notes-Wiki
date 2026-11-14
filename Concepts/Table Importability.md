---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ac06976998ba3351d8b12d1ca8f7b66b87ea0a1b7097e7df7e1f163e9a09642a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Table Importability.md
---

**Table Importability** is whether a model's output can be expressed as rating tables, a base rate and a table of relativities for each rating variable, that an insurer's existing rating or policy administration system can import and apply. The ATPA outline lists it among the criteria for choosing a model, alongside accuracy, [[Explainability|explainability]], stability, analytical effort and computational efficiency.

A table-importable model with $p$ rating variables predicts, for a risk with levels $\mathbf{x} = (x_1, \dots, x_p)$,

> $$\hat{\mu}(\mathbf{x}) = B \times \prod_{j=1}^{p} R_j(x_j)$$

- $B$ is the base rate, the prediction for a risk at every variable's base level.
- $R_j(x_j)$ is the relativity for level $x_j$ of rating variable $j$.

A [[Generalized Linear Model]] with a log link is table-importable by construction. Its base rate is $B = e^{\beta_0}$, and the relativity for level $\ell$ of variable $j$ is

> $$R_j(\ell) = e^{\beta_{j\ell}}$$

- $\beta_0$ is the intercept and $\beta_{j\ell}$ is the coefficient for level $\ell$ of variable $j$.

An interaction term is handled the same way, as a two-way table with one relativity for each pair of levels.

> [!example]- What are this GLM's rating tables, and what is the premium for a risk with all three characteristics? {Example}
> A log-link pure premium GLM has an intercept of 6.2146 and these coefficients:
>
> | Level | Coefficient |
> | :--- | ---: |
> | Territory 2 | 0.1823 |
> | Young driver (aged 16–24) | 0.4700 |
> | Vehicle group 3 | $-0.1054$ |
>
> > [!answer]-
> > - The base rate is $B = e^{6.2146} = 500.00$.
> > - The territory relativity is $e^{0.1823} = 1.20$.
> > - The young-driver relativity is $e^{0.4700} = 1.60$.
> > - The vehicle-group relativity is $e^{-0.1054} = 0.90$.
> > - The rating engine needs only the base rate and three one-way tables.
> > - **The premium is $500.00 \times 1.20 \times 1.60 \times 0.90 = \$864$.**

## Why table importability matters

A [[Rating Algorithm|rating algorithm]] made of tables can be loaded into the existing rating engine, filed in a rate manual that a regulator can review, and checked by hand. A model that is not table-importable has to be scored by new software in production, which adds IT cost, delay and a new source of [[Model Risk|model risk]].

How much the criterion weighs depends on the business context. A model that will never set a filed rate, such as a claims-triage or marketing model, may not need to be table-importable at all.

## Gradient boosting machines

A [[Boosting|gradient boosting machine]] generally is not table-importable, because its prediction is a sum of hundreds of trees whose splits interact. In a GBM of 1,500 trees, each with five splits, a tree can involve up to five different variables, so a risk's prediction depends on combinations of up to five variables at once. No small set of one-way or two-way tables reproduces that, and a table of every combination would be far too large to file or review.

Between the extremes, a boosted model of single-split trees with a log link is additive on the log scale, so each variable's contributions form a one-way table, and trees with two splits give two-way tables. A deeper GBM can be approximated by tables, for example by fitting a GLM to its predictions or by using it to find the interactions worth adding to a GLM, at a cost in accuracy that can be measured on hold-out data.

> [!trap] Table-importable is not the same as interpretable
> A GLM with many interaction terms can still be imported as tables while being hard to understand. The two criteria are judged separately.
