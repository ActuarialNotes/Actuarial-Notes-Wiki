---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:2fb063db0e89921925f29378c698ac69a2cf7cee78784e70de82467520a8afc4
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §7.4.7 'How can we make multiple comparisons?' (repeated pairwise tests do not hold the overall level; Tukey for all pairs, Scheffé for all contrasts, Bonferroni for a pre-selected set), sha256:892f9bcd3cedeea1b5fef1abe94cabebd821262c7f8953965f4d36dff6a778d9 (HTML with the per-request Cloudflare challenge <script> removed) — https://www.itl.nist.gov/div898/handbook/prc/section4/prc47.htm"
    - "NIST/SEMATECH e-Handbook, §7.4.7.1 Tukey's method: exactly 1 - alpha for equal sample sizes, conservative for unequal; studentized range q = w/s; limits ybar_i - ybar_j ± (1/sqrt2) q(alpha; r, N-r) sigma_hat sqrt(2/n), sha256:32b171afa0472cdb878836b6686e71bd88d1dc45b80ab34d3ad1fa1ce55e43ae (Cloudflare <script> removed) — https://www.itl.nist.gov/div898/handbook/prc/section4/prc471.htm"
    - "NIST/SEMATECH e-Handbook, §7.4.7.2 Scheffé's method: contrast C = sum c_i mu_i, sum c_i = 0; s_C^2 = sigma_e^2 sum c_i^2/n_i; C_hat ± sqrt((r-1) F(alpha; r-1, N-r)) s_C; simultaneous coefficient exactly 1 - alpha, equal or unequal sizes; Tukey narrower when only pairwise comparisons are wanted, sha256:e588f8a8ce14072dc5b218945bd91575248143eb203bb3640070753d1809da8c (Cloudflare <script> removed) — https://www.itl.nist.gov/div898/handbook/prc/section4/prc472.htm"
    - "NIST/SEMATECH e-Handbook, §7.4.7.3 Bonferroni's method: pre-selected finite set, valid for equal and unequal sizes; inequality P(cap A_i) >= 1 - sum P(Abar_i); each interval at 1 - alpha/g; C_hat_i ± t(1 - alpha/(2g), N-r) s_C_i; Tukey has the edge for all pairs, Bonferroni may be better for a subset; better than Scheffé when the number of contrasts is about the number of factor levels; no method uniformly best, sha256:b697a7ab6254299c09af919a3884eee5e24df4f3b8663964e1a2236503986a2e (Cloudflare <script> removed) — https://www.itl.nist.gov/div898/handbook/prc/section4/prc473.htm"
    - "Penn State STAT 502 (online course notes), Lesson 2 §2.3: type I error inflation from 6 comparisons, alpha = 1 - 0.95^6 = 0.2649; Fisher's LSD 'does not control alpha over an entire set of pairwise comparisons (the experiment-wise error rate)'; Tukey, Bonferroni and Scheffé all use 'multiplier * SE'; Tukey narrowest for pairwise only; Bonferroni better when contrasts are about as many as factor levels, sha256:11e95ea340db05e0e123d2d754c7ded754417518042dcf9144d43d3efbc83f77 — https://online.stat.psu.edu/stat502/Lesson02.html"
    - "Penn State STAT 503 (online course notes), Lesson 3 §3.3: 'If the F-test rejects the null hypothesis at level alpha, then there exists at least one contrast which would be rejected using the Scheffé procedure at level alpha'; Fisher's LSD 'does not control the family error rate'; Bonferroni uses alpha/g per test; Tukey slightly narrower than Bonferroni for all pairs, sha256:4f7b13b1c49514b1d3de4cc9c84669687d416b6853ae562a1b322d7cdd3ad9a2 — https://online.stat.psu.edu/stat503/Lesson03.html"
    - "Levine, STAT 517 Lecture 24 (Purdue, Spring 2016; course reading Hogg, McKean & Craig), PDF pp.6-9: Scheffé interval 'works simultaneously for all linear combinations' sum k_j mu_j with multiplier sqrt(b d), d = F(alpha; b, b(a-1)) — the all-linear-combinations form the page gives as sqrt(k F(alpha; k, N-k)), sha256:f84259546359e3b92d9a0e6f2de41a7f4b445a3063739fdbefe1047f5a9214ae — https://www.stat.purdue.edu/~mlevins/docs/stat517/Lecture24_STAT517.pdf"
    - "CAS Exam MAS-I Tables (version 01/15/2018): t two-sided tail 0.02, df 18 = 2.552 (PDF p.16); F(5,18) upper 0.10 = 2.196 (PDF p.18); no studentized-range table anywhere in the 20-page handout, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Hogg, McKean & Craig, Introduction to Mathematical Statistics, 8th ed. (Global Edition) — publisher eBook preview, Contents PDF p.9: §9.4 'Multiple Comparisons' p.539 (body not in preview), sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99 — https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf"
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
