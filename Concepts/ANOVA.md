**Analysis of Variance (ANOVA)** is a statistical method for testing whether the means of two or more groups differ by partitioning total variability in the response into explained and unexplained components.

> **One-Way ANOVA F-Test:**
> $$F = \frac{\text{MSB}}{\text{MSW}} = \frac{\text{SS}_\text{Between}/(k-1)}{\text{SS}_\text{Within}/(N-k)} \sim F_{k-1,\, N-k}$$

**ANOVA table structure:**

| Source | SS | df | MS | F |
| :--- | :--- | :--- | :--- | :--- |
| Between groups | $\text{SS}_B$ | $k-1$ | $\text{MS}_B$ | $\text{MS}_B/\text{MS}_W$ |
| Within groups | $\text{SS}_W$ | $N-k$ | $\text{MS}_W$ | |
| Total | $\text{SS}_T$ | $N-1$ | | |

- $k$ = number of groups, $N$ = total observations
- $H_0$: all group means are equal; reject if $F > F_{\alpha, k-1, N-k}$
- **Analysis of Deviance** (the GLM analogue) compares nested [[Generalized Linear Model]]s by the change in [[Deviance]], which follows a $\chi^2$ distribution asymptotically
- ANOVA is a special case of a linear model: it is equivalent to a regression with indicator variables for group membership

> [!example]- One-Way ANOVA for Claim Severity Across Territories {Example}
> An actuary tests whether mean claim severity differs across three territories using 30 claims (10 per territory). The ANOVA table shows $\text{SS}_B = 1{,}200$ and $\text{SS}_W = 5{,}400$. Test at $\alpha = 0.05$.
>
> > [!answer]-
> > $\text{MS}_B = 1{,}200/(3-1) = 600$; $\text{MS}_W = 5{,}400/(30-3) = 200$.
> > $F = 600/200 = 3.0$.
> > The critical value $F_{0.05, 2, 27} \approx 3.35$. Since $3.0 < 3.35$, **fail to reject $H_0$**; no significant difference in mean severity across territories at the 5% level.
