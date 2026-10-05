---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2fb063db0e89921925f29378c698ac69a2cf7cee78784e70de82467520a8afc4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multiple Comparisons.md
---

**Multiple Comparisons** are procedures for testing several hypotheses about group means, or building several [[Confidence Interval|confidence intervals]] for them, at once while holding the **family-wise error rate** (FWER) at a chosen $\alpha$. The FWER is the probability of making at least one [[Type I Error]] anywhere in the family. They are used after an [[ANOVA]] F test to find which means differ.

> $$\text{FWER} = P(\text{at least one true } H_0 \text{ is rejected})$$

> $$C = \sum_{i=1}^{k} c_i\,\mu_i, \quad \sum_{i=1}^{k} c_i = 0$$

> $$s_{\hat{C}}^2 = \hat\sigma^2 \sum_{i=1}^{k} \frac{c_i^2}{n_i}$$

- $C$ is a **contrast** of the $k$ group means, estimated by $\hat{C} = \sum c_i \bar{y}_i$; a pairwise difference $\mu_i - \mu_j$ is the simplest one. $n_i$ is group $i$'s size, $N = \sum n_i$, and $\hat\sigma^2$ is the ANOVA's mean squared error on $N - k$ degrees of freedom.
- **Why a family needs its own procedure:** $g$ independent tests each at level $\alpha$ have $\text{FWER} = 1 - (1 - \alpha)^g$. Six tests at 5% give $1 - 0.95^6 = 0.265$.
- The three procedures below share the form $\hat{C} \pm (\text{multiplier}) \times s_{\hat{C}}$ and differ in the multiplier. Choose by the family you need: none is narrowest in every case.

**Bonferroni** covers $g$ comparisons chosen in advance:

> $$\hat{C}_i \pm t_{\alpha/(2g),\,N - k}\; s_{\hat{C}_i}$$

- Each interval is built at confidence $1 - \alpha/g$ (each test at level $\alpha/g$). The **Bonferroni inequality**, $P\left(\bigcap_{i=1}^{g} A_i\right) \geq 1 - \sum_{i=1}^{g} P(\bar{A}_i)$, then guarantees that all $g$ intervals hold together with probability at least $1 - \alpha$.
- It works for equal or unequal group sizes and for any pre-chosen linear combinations. It is narrower than Scheffé when only a few comparisons are wanted, about as many as there are groups, and can be narrower than Tukey when only some of the pairs are wanted.

**Scheffé** covers every contrast at once, including ones chosen after looking at the data:

> $$\hat{C} \pm \sqrt{(k - 1)\,F_{\alpha;\,k - 1,\,N - k}}\; s_{\hat{C}}$$

- The simultaneous confidence is exactly $1 - \alpha$ over the infinitely many contrasts. It matches the ANOVA [[F-Distribution|F test]]: if the F test rejects at level $\alpha$, at least one contrast is significant by Scheffé's criterion.
- For all linear combinations $\sum c_i\mu_i$, not only contrasts, the multiplier is $\sqrt{k\,F_{\alpha;\,k,\,N - k}}$: $k$ replaces $k - 1$ in both places.

**Tukey** covers all pairwise differences when the groups have equal size $n$:

> $$\bar{y}_i - \bar{y}_j \pm q_{\alpha;\,k,\,N - k}\;\hat\sigma\sqrt{\frac{1}{n}}$$

- $q$ is a percentile of the **studentized range**: the range of $k$ independent normal values divided by an independent estimate of their standard deviation. Coverage is exactly $1 - \alpha$ for equal sizes and conservative for unequal sizes. When all pairwise differences are wanted, Tukey gives narrower intervals than Bonferroni or Scheffé.
- The CAS MAS-I tables include the t and F tables that Bonferroni and Scheffé need, but no studentized-range table.
- Running ordinary t-tests on every pair after a significant F test (Fisher's LSD) does not control the FWER.

> [!example]- Testing Ten Rating Variables {Example}
> An actuary tests 10 candidate rating variables, each with its own test at the 5% level. Suppose none of them affects losses and the tests are independent. Find the probability of at least one false finding, and the per-test level that keeps the FWER at or below 5% by Bonferroni.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{FWER} &= 1 - 0.95^{10} \\
> > &= 0.401
> > \end{align*}
> > $$
> >
> > There is about a 40% chance that at least one useless variable looks significant. Bonferroni tests each variable at $0.05/10 = 0.005$. Then the FWER is at most $10 \times 0.005 = 0.05$, whether or not the tests are independent.

> [!example]- Comparing Five Territories With a Base Territory {Example}
> Mean claim severities (\$000s) are compared across six territories with $n = 4$ claims each, so $N = 24$ and the ANOVA has $\hat\sigma^2 = 2.25$ on 18 df. Before seeing the data, the actuary planned 5 comparisons: territories B to F each against base territory A, with 90% family confidence. The observed differences from A are B $1.1$, C $3.8$, D $-0.6$, E $2.9$ and F $0.8$. Which differ from A by Bonferroni, and which by Scheffé?
>
> > [!answer]-
> > For a pairwise difference, $\sum c_i^2/n_i = 1/4 + 1/4$:
> >
> > $$
> > \begin{align*}
> > s_{\hat{C}} &= \sqrt{2.25\left(\tfrac{1}{4} + \tfrac{1}{4}\right)} \\
> > &= 1.061
> > \end{align*}
> > $$
> >
> > **Bonferroni:** each two-sided interval uses area $0.10/5 = 0.02$. The CAS t table (two-sided tail area $0.02$, $df = 18$) gives $2.552$:
> >
> > $$
> > \begin{align*}
> > \text{half-width} &= 2.552(1.061) \\
> > &= 2.71
> > \end{align*}
> > $$
> >
> > **Scheffé:** the CAS F table gives $F_{0.10;\,5,\,18} = 2.196$:
> >
> > $$
> > \begin{align*}
> > \text{half-width} &= \sqrt{5(2.196)}\,(1.061) \\
> > &= 3.314(1.061) \\
> > &= 3.51
> > \end{align*}
> > $$
> >
> > Bonferroni finds C ($3.8$) and E ($2.9$) different from A; Scheffé finds only C. For 5 planned comparisons Bonferroni is narrower. Scheffé pays for covering every contrast, which is what you need only if the comparisons are chosen after looking at the data.
