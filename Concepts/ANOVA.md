---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:908bd0462b953784e76d23242ea06527f00091f36649a86e8836b2811319c47a
  sources:
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.3.4 anova table (Table 2.2), §2.4.3 anova for simple regression, §2.6 one-way analysis of variance and Table 2.12 (df k-1 = 2, n-k = 17, total n-1 = 19), PDF pp.13-14, 18, 26-32, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.3.2 likelihood ratio tests and the (scaled) deviance, PDF pp.6-7, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 2 §2.6 ANOVA table: SS, df, MS, F = MSR/MSE; degrees of freedom add up, sha256:1e70ff328d0ed946e167ac2949a287f8b23c3ae7f407af884fe4c6e447a6be32 — https://online.stat.psu.edu/stat501/Lesson02.html"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.2.2 F-statistic (3.23)-(3.24), printed pp.75-77 (PDF pp.85-87); §3.3.1 F-test for a qualitative predictor's dummies, printed p.86, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 4 and 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/ANOVA.md
---

**Analysis of Variance (ANOVA)** is a statistical method for testing whether the means of two or more groups differ by partitioning total variability in the response into explained and unexplained components. Regression output prints the same partition as an **ANOVA table** for the fitted model, where it tests whether the predictors explain any of the response.

> **One-Way ANOVA F-Test:**
> $$F = \frac{\text{MSB}}{\text{MSW}}$$

> $$= \frac{\text{SS}_\text{Between}/(k-1)}{\text{SS}_\text{Within}/(N-k)} \sim F_{k-1,\, N-k}$$

**ANOVA table structure:**

| Source | SS | df | MS | F |
| :--- | :--- | :--- | :--- | :--- |
| Between groups | $\text{SS}_B$ | $k-1$ | $\text{MS}_B$ | $\text{MS}_B/\text{MS}_W$ |
| Within groups | $\text{SS}_W$ | $N-k$ | $\text{MS}_W$ | |
| Total | $\text{SS}_T$ | $N-1$ | | |

- $k$ = number of groups, $N$ = total observations
- $H_0$: all group means are equal; reject if $F > F_{\alpha, k-1, N-k}$
- ANOVA is a special case of a linear model: it is equivalent to a regression with indicator variables for group membership

**Regression ANOVA table** (fitted model with $p$ predictors and an intercept, $n$ observations):

| Source | SS | df | MS | F |
| :--- | :--- | :--- | :--- | :--- |
| Regression | $\text{SSR} = \sum(\hat y_i - \bar y)^2$ | $p$ | $\text{MSR} = \text{SSR}/p$ | $\text{MSR}/\text{MSE}$ |
| Residual (Error) | $\text{RSS} = \sum(y_i - \hat y_i)^2$ | $n-p-1$ | $\text{MSE} = \text{RSS}/(n-p-1)$ | |
| Total | $\text{SS}_\text{Tot} = \sum(y_i - \bar y)^2$ | $n-1$ | | |

- The sums of squares and the degrees of freedom both add up: $\text{SS}_\text{Tot} = \text{SSR} + \text{RSS}$ and $(n-1) = p + (n-p-1)$. MSE is $\hat\sigma^2$
- $F = \text{MSR}/\text{MSE} \sim F_{p,\, n-p-1}$ under $H_0: \beta_1 = \cdots = \beta_p = 0$ — the overall test that no predictor is related to the response. The one-way table above is the case where the predictors are the $k-1$ group indicators: Between is the Regression row ($p = k-1$), Within is the Residual row
- A **sequential** (hierarchical, Type I) table splits the Regression row into one row per predictor in the order it entered the model — $\text{SSR}(x_1)$, then $\text{SSR}(x_2 \mid x_1)$, and so on, each the drop in RSS from adding that term. The rows sum to SSR, and each row's $F$ is its MS over the full model's MSE. **Order matters**: a predictor's sequential SS is what it adds *after* the ones above it, which can differ greatly from what it explains alone
- **Analysis of Deviance** (the GLM analogue) compares nested [[Generalized Linear Model]]s by the change in [[Deviance]]. The change **scaled by the dispersion** $\phi$, $[D_{\text{small}} - D_{\text{big}}]/\phi$, is asymptotically $\chi^2$ with degrees of freedom equal to the number of added parameters. For Poisson and binomial $\phi = 1$, so the raw change in deviance is compared with $\chi^2$; when $\phi$ is estimated (Normal, Gamma), use the $F$ test $F = \dfrac{D_{\text{small}} - D_{\text{big}}}{(\text{number of added parameters}) \times \hat\phi_{\text{big}}}$ on (added parameters, $n - p_{\text{big}}$) df, with $p_{\text{big}}$ counting the intercept. For a Normal model the deviance is the RSS and this $F$ is exact

![[Media/Figures/ANOVA.svg|340]]

> [!example]- One-Way ANOVA for Claim Severity Across Territories {Example}
> An actuary tests whether mean claim severity differs across three territories using 30 claims (10 per territory). The ANOVA table shows $\text{SS}_B = 1{,}200$ and $\text{SS}_W = 5{,}400$. Test at $\alpha = 0.05$.
>
> > [!answer]-
> > $\text{MS}_B = 1{,}200/(3-1) = 600$; $\text{MS}_W = 5{,}400/(30-3) = 200$.
> > $F = 600/200 = 3.0$.
> > The critical value $F_{0.05, 2, 27} \approx 3.35$. Since $3.0 < 3.35$, **fail to reject $H_0$**; no significant difference in mean severity across territories at the 5% level.
