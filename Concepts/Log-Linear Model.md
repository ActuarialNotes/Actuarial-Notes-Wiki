---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5141262add99796efc85f0c3bbc95832930eaef4a3836f510da37f292f1fcd3d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Log-Linear Model.md
---

A **Log-Linear Model** for a contingency table treats each cell count as Poisson and models the log of its expected count as a sum of row, column and [[Interaction|interaction]] effects. It is [[Poisson Regression]] applied to cross-classified counts, and its terms correspond to independence and association between the classifying variables.

> $$\ln \mu_{ij} = \eta + \alpha_i + \beta_j$$

> $$\ln \mu_{ij} = \eta + \alpha_i + \beta_j + (\alpha\beta)_{ij}$$

> $$\hat\mu_{ij} = \frac{y_{i\cdot}\,y_{\cdot j}}{n}$$

- $\mu_{ij}$ is the expected count in row $i$, column $j$ of an $I \times J$ table, and $y_{i\cdot}$, $y_{\cdot j}$ and $n$ are the row totals, column totals and grand total. The first block is the **additive** model, which corresponds to **independence**, $\pi_{ij} = \pi_{i\cdot}\pi_{\cdot j}$. Its fitted counts are the third block. The second block is the **saturated** model, which reproduces every count.
- **Sampling scheme doesn't matter.** The counts may be independent Poisson, multinomial with $n$ fixed, or product multinomial (binomial) with one margin fixed. Conditioning Poisson counts on their total gives the multinomial, and a model that includes those margins reproduces them exactly. So the Poisson log-linear fit gives the same fitted values and tests in each case.
- **Testing independence.** The [[Deviance]] of the additive model, $D = 2\sum y_{ij}\ln(y_{ij}/\hat\mu_{ij})$, is approximately $\chi^2$ with $(I-1)(J-1)$ degrees of freedom. Pearson's $X^2 = \sum (y_{ij} - \hat\mu_{ij})^2/\hat\mu_{ij}$ is the traditional alternative.
- **Three-way tables.** Terms are added hierarchically. $A + B + C$ is complete independence, and $AB + C$ means $A$ and $B$ are associated but jointly independent of $C$. $AB + AC$ and $AB + AC + BC$ allow more association, and $ABC$ is saturated. Nested models are compared by the drop in deviance ([[Likelihood Ratio Test]]).
- When one classifying variable is really a response, the log-linear model can stand in for a [[Logistic Regression|logistic]] or [[Multinomial Logistic Regression|multinomial logit]] model for it. It needs a parameter for each predictor group (so the group totals are reproduced), a main effect for the response, and response × predictor interactions. The logit coefficients are then differences of those interaction terms: main effects in the logit model become interactions in the log-linear one.
- On MAS-I this is Dobson & Barnett Chapter 9 (§§9.3–9.7: contingency tables, their probability models and log-linear models).

> [!example]- Is Litigation Independent of Claim Size? {Example}
> $600$ closed bodily-injury claims are cross-classified:
>
> | | Large | Not large | Total |
> | :--- | ---: | ---: | ---: |
> | Litigated | 24 | 76 | 100 |
> | Not litigated | 66 | 434 | 500 |
> | Total | 90 | 510 | 600 |
>
> Fit the independence log-linear model and test it at the $5\%$ level.
>
> > [!answer]-
> > Expected counts are row total × column total ÷ $600$: $15$, $85$, $75$ and $425$.
> >
> > $$
> > \begin{align*}
> > D &= 2\Big[24\ln\tfrac{24}{15} + 76\ln\tfrac{76}{85} + 66\ln\tfrac{66}{75} + 434\ln\tfrac{434}{425}\Big] \\
> > &= 2\,[11.280 - 8.506 - 8.437 + 9.095] \\
> > &= 6.86
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > X^2 &= \frac{9^2}{15} + \frac{9^2}{85} + \frac{9^2}{75} + \frac{9^2}{425} \\
> > &= 5.400 + 0.953 + 1.080 + 0.191 \\
> > &= 7.62
> > \end{align*}
> > $$
> >
> > With $(2-1)(2-1) = 1$ degree of freedom the $5\%$ critical value is $3.841$. Both statistics exceed it, so independence is rejected: litigation and claim size are associated.

> [!example]- Reading the Coefficients {Example}
> For the same table, use reference-cell coding (not litigated, not large). Find $\eta$, $\alpha_{\text{lit}}$ and $\beta_{\text{large}}$ in the independence model, and the interaction term $(\alpha\beta)$ in the saturated model.
>
> > [!answer]-
> > Under independence, every fitted count is a product of margins, so each coefficient is a log ratio of margins:
> >
> > $$
> > \begin{align*}
> > \eta &= \ln\frac{500 \times 510}{600} = \ln 425 = 6.052 \\[4pt]
> > \alpha_{\text{lit}} &= \ln\frac{100}{500} = -1.609 \\[4pt]
> > \beta_{\text{large}} &= \ln\frac{90}{510} = -1.735
> > \end{align*}
> > $$
> >
> > Check: $e^{6.052 - 1.609 - 1.735} = e^{2.708} = 15$, the expected count for litigated and large.
> >
> > The saturated model fits each cell exactly. With reference-cell coding, its interaction is the log odds ratio of the table:
> >
> > $$
> > \begin{align*}
> > (\alpha\beta) &= \ln\frac{24 \times 434}{76 \times 66} \\
> > &= \ln 2.077 \\
> > &= 0.731
> > \end{align*}
> > $$
> >
> > The odds of a large claim are about twice as high when the claim is litigated. Dropping this one term is exactly the $1$-df deviance test of the previous example ($D = 6.86$).
