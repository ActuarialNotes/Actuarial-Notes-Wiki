---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:1826490ce5967444947e953b0de3e4f8525a2e1e2b3bd7406471f726a82b0125
  sources:
    - "Rodriguez, GLM lecture notes (Princeton), ch.5 Log-Linear Models for Contingency Tables, sha256:b98785861711e5e1355ef6f0f2d60e0f655b512c68dc73f295953527563444d2 — https://grodri.github.io/glms/notes/c5.pdf, sec.5.1 two-dimensional tables (independence as product of margins, fitted counts from row/column totals, deviance chi-square on (I-1)(J-1) d.f., Pearson's chi-squared as the traditional test, Poisson additive model equivalent to multinomial/product-binomial schemes) (PDF pp.1-8); secs.5.2.3-5.2.4 complete and block independence (PDF pp.12-13); Rodriguez, GLM lecture notes (Princeton), ch.6 Multinomial Response Models, sha256:f559d07ae73bdf381de5c19a9f0621419c635e5c6495c0135af940ae36807cbb — https://grodri.github.io/glms/notes/c6.pdf, sec.6.2.5 The Equivalent Log-Linear Model (parameter per group reproduces denominators, main effect per response category, main effects become interactions, logit parameters as differences) (PDF pp.6-7); Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018; MAS-I reading) — publisher eBook preview, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf, printed contents Ch.9 (9.3 contingency tables, 9.4 probability models: Poisson, multinomial, product multinomial; 9.5 log-linear models; 9.6 inference; 9.7 numerical examples) (PDF pp.11-12); CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), readings table (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf: Dobson & Barnett Chapters 1-9 excluding 6.3.3, 6.7, 6.8, 7.9 (Ch.9 wholly assigned)"
    - "Rodriguez, GLM notes Ch.5 Log-Linear Models, §5.2.5 Partial Independence PDF p.14 (SE + SP: E and P conditionally independent given S, Pr{E,P|S} = Pr{E|S}Pr{P|S}; associated in a two-way crosstab through common dependency on S), sha256:b98785861711e5e1355ef6f0f2d60e0f655b512c68dc73f295953527563444d2 — https://grodri.github.io/glms/notes/c5.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Log-Linear Model.md
---

A **Log-Linear Model** is a [[Poisson Regression|Poisson regression]] for the counts in a contingency table, in which the logarithm of each cell's expected count is a sum of effects of the classifying variables and their [[Interaction|interactions]]. In a table with $I$ rows and $J$ columns, the independence model for the expected count $\mu_{ij}$ in row $i$ and column $j$ is

> $$\ln \mu_{ij} = \beta_0 + \alpha_i + \gamma_j$$

- $\beta_0$ is the intercept.
- $\alpha_i$ is the effect of row $i$ and $\gamma_j$ is the effect of column $j$, each set to 0 at a reference level.

This model has $I + J - 1$ parameters. It says the row and column variables are independent, and its fitted count in each cell is

> $$\hat\mu_{ij} = \frac{y_{i\cdot}\, y_{\cdot j}}{n}$$

- $y_{i\cdot}$ is the total of row $i$ and $y_{\cdot j}$ is the total of column $j$.
- $n$ is the grand total of the observed counts $y_{ij}$.

The cell counts may be independent Poisson variables, or multinomial with the grand total fixed. Conditioning independent Poisson counts on their total gives the multinomial distribution, so the Poisson log-linear model gives the same fitted counts and tests under either.

> [!example]- 600 closed claims are classified by whether they were litigated and whether they were large. What are the fitted counts under the independence model? {Example}
> The observed counts are:
>
> | | Large | Not large | Total |
> | :--- | ---: | ---: | ---: |
> | Litigated | 24 | 76 | 100 |
> | Not litigated | 66 | 434 | 500 |
> | Total | 90 | 510 | 600 |
>
> - Each fitted count is the row total times the column total, divided by 600.
> - The litigated row gets $100 \times 90/600 = 15$ and $100 \times 510/600 = 85$.
> - The not-litigated row gets $500 \times 90/600 = 75$ and $500 \times 510/600 = 425$.

## Testing a log-linear model

The [[Deviance|deviance]] of a log-linear model measures its lack of fit against the saturated model, which has one parameter per cell and deviance 0. The deviance is

> $$D = 2 \sum_{i,j} y_{ij} \ln\!\left(\frac{y_{ij}}{\hat\mu_{ij}}\right)$$

and Pearson's chi-square statistic is

> $$X^2 = \sum_{i,j} \frac{(y_{ij} - \hat\mu_{ij})^2}{\hat\mu_{ij}}$$

Each is approximately [[Chi-Squared Distribution|chi-squared]] with degrees of freedom equal to the number of cells less the number of parameters. For the independence model this is $IJ - (I + J - 1) = (I-1)(J-1)$. A statistic below the critical value means the model fits.

> [!example]- In the claims table above, is litigation independent of claim size at the $5\%$ significance level? {Example}
> - The deviance is $2(11.280 - 8.506 - 8.437 + 9.095) = 6.86$.
> - Each cell differs from its fitted count by 9, so $X^2 = \frac{81}{15} + \frac{81}{85} + \frac{81}{75} + \frac{81}{425} = 7.62$.
> - There are $(2-1)(2-1) = 1$ degree of freedom, with critical value $3.841$.
> - Both statistics exceed $3.841$, so independence is rejected. Litigation and claim size are associated.

## The saturated model

Adding the interaction gives the saturated model, which reproduces every count exactly:

> $$\ln \mu_{ij} = \beta_0 + \alpha_i + \gamma_j + (\alpha\gamma)_{ij}$$

- $(\alpha\gamma)_{ij}$ is the interaction of row $i$ and column $j$, set to 0 when either is at its reference level.

Each cell's fitted value is the sum of the parameters that apply to it, so with two binary variables each of the four cells has its own mean.

> [!example]- In the claims table, with "not litigated" and "not large" as the reference levels, what is the interaction term of the saturated model? {Example}
> - The reference cell gives $\beta_0 = \ln 434$.
> - The litigated, not-large cell gives $\alpha_{\text{lit}} = \ln(76/434)$, and the not-litigated, large cell gives $\gamma_{\text{large}} = \ln(66/434)$.
> - The litigated, large cell gives $\ln 24 = \beta_0 + \alpha_{\text{lit}} + \gamma_{\text{large}} + (\alpha\gamma)$.
> - Solving, $(\alpha\gamma) = \ln\frac{24 \times 434}{76 \times 66} = \ln 2.077 = 0.731$, the log of the odds ratio of the table.

## Three-way tables

With three classifying variables $A$, $B$ and $C$, terms are added hierarchically, and each model says which variables are independent:

| Model | Meaning |
| :--- | :--- |
| $A + B + C$ | All three variables are mutually independent. |
| $AB + C$ | $A$ and $B$ are associated, and the pair $(A, B)$ is independent of $C$. |
| $AB + BC$ | $A$ and $C$ are independent given $B$. |
| $AB + AC + BC$ | Each pair is associated, with no three-factor interaction. |
| $ABC$ | The saturated model. |

Two nested models are compared by the drop in deviance, which is chi-squared with degrees of freedom equal to the difference in their degrees of freedom ([[Likelihood Ratio Test|likelihood ratio test]]).

> [!example]- A $2 \times 2 \times 3$ table of $A$, $B$ and $C$ gives deviance $14.0$ on 6 degrees of freedom for $AB + C$ and $4.1$ on 4 degrees of freedom for $AB + BC$. Which model should be chosen at the $5\%$ significance level, and what does it say? {Example}
> - $AB + C$ does not fit, because $14.0$ exceeds the critical value $12.592$ for 6 degrees of freedom.
> - Adding $BC$ lowers the deviance by $9.9$ on 2 degrees of freedom, above the critical value $5.991$, so $BC$ is kept.
> - $AB + BC$ fits, because $4.1$ is below the critical value $9.488$ for 4 degrees of freedom.
> - Under $AB + BC$, $A$ and $C$ are independent given $B$.
