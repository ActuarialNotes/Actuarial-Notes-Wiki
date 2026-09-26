---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ec5403b37fe16bf206d6e377cbbf9f139acf746604df57d6c5a0a962d37922c4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Nested and Crossed Factors.md
---

**Nested and crossed factors** describe how two grouping factors in a [[Linear Mixed Model]] relate to each other. Factor $B$ is **nested** in factor $A$ when every level of $B$ occurs within exactly one level of $A$, as with adjusters within claim offices or vehicles within policies. $A$ and $B$ are **crossed** when a level of one occurs with several levels of the other, as with territories observed in every accident year.

> $$\text{Nested: } y_{ijk} = \beta_0 + a_i + b_{j(i)} + \varepsilon_{ijk}$$
>
> $$\text{Crossed: } y_{ijk} = \beta_0 + a_i + c_j + \varepsilon_{ijk}$$

- $a_i \sim N(0, \sigma_a^2)$, $b_{j(i)} \sim N(0, \sigma_b^2)$ (read "level $j$ within level $i$") and $c_j \sim N(0, \sigma_c^2)$. All are independent of each other and of the residual $\varepsilon_{ijk} \sim N(0, \sigma^2)$. Each grouping factor costs one [[Variance Components|variance component]].
- **The test.** Ask whether "level 7" of $B$ means the same thing under every level of $A$. Adjuster 7 in Toronto and adjuster 7 in Calgary are different people, so adjuster is nested in office. Accident year 2022 is the same year for every territory, so year and territory are crossed.
- **What each implies for correlation.** Let $\sigma_T^2$ be the total variance. In a nested ([[Hierarchical Model|hierarchical]]) model, two claims from the same adjuster share $a_i + b_{j(i)}$, with correlation $(\sigma_a^2 + \sigma_b^2)/\sigma_T^2$. Two claims from the same office but different adjusters share only $a_i$: $\sigma_a^2/\sigma_T^2$. In a crossed model, observations sharing only a territory have correlation $\sigma_a^2/\sigma_T^2$, and those sharing only a year have $\sigma_c^2/\sigma_T^2$. Each is an [[Intraclass Correlation|intraclass correlation]]. The crossed [[Covariance Structure|covariance structure]] is no longer block-diagonal by any one factor.
- **Coding.** The software has to be told which design it is. In R's `lme4`, `(1 | office/adjuster)` expands to `(1 | office) + (1 | office:adjuster)`, while `(1 | territory) + (1 | year)` specifies crossed effects. A common error: inner IDs are recycled across groups (an "adjuster 7" in every office) and the model is written as if crossed. The software then pools different people into one level. Give each inner unit a unique ID, or state the nesting explicitly.
- Crossed designs are why a mixed model is not always a simple multilevel tree: [[Random Intercept and Slope|random intercepts]] can come from two unrelated classifications at once, and each is shrunk toward the mean on its own.

> [!example]- Nested or Crossed? {Example}
> Classify each design:
> 1. Vehicles on multi-vehicle auto policies, with a random effect for policy and one for vehicle.
> 2. Loss ratios for $200$ territories in each of $10$ accident years, with random effects for territory and for year.
> 3. Claim closing times, each claim handled by one adjuster, each adjuster working in one of $12$ offices.
>
> > [!answer]-
> > 1. **Nested.** A vehicle belongs to exactly one policy.
> > 2. **Crossed.** Every territory appears in every year, and a year's shock (a hail season, a burst of inflation) hits all territories at once. Territory effects and year effects are separate and additive.
> > 3. **Nested, three levels:** claims within adjusters within offices. Adjuster IDs must be unique across offices, or the nesting must be declared.

> [!example]- Correlations in a Three-Level Claims Model {Example}
> A model of log claim-closing time has these variance components: office $\sigma_a^2 = 0.04$, adjuster within office $\sigma_b^2 = 0.06$, and residual $\sigma^2 = 0.30$. Find the correlation between two claims (a) with the same adjuster, (b) from the same office but different adjusters, and (c) from different offices.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \sigma_T^2 &= 0.04 + 0.06 + 0.30 \\
> > &= 0.40 \\
> > \rho_{\text{same adjuster}} &= \frac{0.04 + 0.06}{0.40} \\
> > &= 0.25 \\
> > \rho_{\text{same office}} &= \frac{0.04}{0.40} \\
> > &= 0.10
> > \end{align*}
> > $$
> > (c) Claims from different offices share no random effect, so their correlation is $0$.
> >
> > Most of the clustering is at the adjuster level. Dropping the adjuster factor would understate the dependence among a desk's claims by more than half.

> [!example]- Correlations When Territory and Year Are Crossed {Example}
> A crossed model of territory loss ratios has territory variance $0.012$, accident-year variance $0.008$ and residual variance $0.020$. Find the correlation between two observations that share (a) only a territory, and (b) only an accident year.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \sigma_T^2 &= 0.012 + 0.008 + 0.020 \\
> > &= 0.040 \\
> > \rho_{\text{territory}} &= \frac{0.012}{0.040} \\
> > &= 0.30 \\
> > \rho_{\text{year}} &= \frac{0.008}{0.040} \\
> > &= 0.20
> > \end{align*}
> > $$
> > Two territories in the same accident year are correlated through the common year shock, even though neither territory is nested in the other. A nested specification could not represent that.
