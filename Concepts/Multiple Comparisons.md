---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:8b0839cd4e6c1fb7baee07b46cf7e37e08d5e90958423654645f6f5e0a71e927
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

**Multiple Comparisons** is the testing of several hypotheses about group means, or the building of several [[Confidence Interval|confidence intervals]] for them, at once while holding the family-wise error rate at a chosen $\alpha$. Its procedures are used after an [[ANOVA]] $F$ test to find which means differ. The family-wise error rate is

> $$\text{FWER} = P(\text{at least one true } H_0 \text{ in the family is rejected})$$

If $g$ independent tests are each run at level $\alpha$, the family-wise error rate is $1 - (1 - \alpha)^g$, which grows quickly with $g$.

> [!example]- An actuary tests 10 candidate rating variables, each at significance level 0.05. If none of them affects losses and the tests are independent, what is the probability that at least one variable is found significant? {Example}
> - Each test fails to reject a true $H_0$ with probability 0.95.
> - The probability that all 10 tests fail to reject is $0.95^{10} = 0.599$.
> - The family-wise error rate is $1 - 0.599 = 0.401$.

## Contrasts of group means

In a one-way ANOVA with $k$ groups, group $i$ has $n_i$ observations and sample mean $\bar{y}_i$, the total number of observations is $N = n_1 + \cdots + n_k$, and $\hat{\sigma}^2$ is the mean squared error on $N - k$ degrees of freedom. A contrast is a combination of the group means

> $$\psi = \sum_{i=1}^{k} a_i \mu_i$$

- The coefficients $a_i$ satisfy $a_1 + \cdots + a_k = 0$.

A pairwise difference $\mu_i - \mu_j$ is the simplest contrast. The contrast is estimated by $\hat{\psi} = \sum a_i \bar{y}_i$, whose standard error is

> $$\text{SE}(\hat{\psi}) = \sqrt{\hat{\sigma}^2 \sum_{i=1}^{k} \frac{a_i^2}{n_i}}$$

For one contrast on its own, the confidence interval is $\hat{\psi} \pm t_{\alpha/2,\,N-k}\,\text{SE}(\hat{\psi})$. The three methods below keep this form and replace the $t$ value with a larger multiplier.

## Bonferroni method

For $g$ contrasts chosen before the data are seen, the Bonferroni method builds each interval at level $\alpha/g$:

> $$\hat{\psi} \pm t_{\alpha/(2g),\,N-k}\,\text{SE}(\hat{\psi})$$

- $t_{\alpha/(2g),\,N-k}$ is the upper $\alpha/(2g)$ point of the [[Student's t-Distribution|$t$ distribution]], which has two-sided tail area $\alpha/g$.

The Bonferroni inequality guarantees that all $g$ intervals hold together with probability at least $1 - \alpha$, whether or not the comparisons are independent and whether or not the group sizes are equal.

> [!example]- Six territories have 4 claims each, and the ANOVA gives $\hat{\sigma}^2 = 2.25$ on 18 degrees of freedom. Before seeing the data, the actuary planned to compare territories B to F with territory A at 90% family confidence. The differences from A are 1.1, 3.8, $-0.6$, 2.9 and 0.8. Which territories differ from A by the Bonferroni method? {Example}
> - For a pairwise difference, $\sum a_i^2 / n_i = 1/4 + 1/4$, so $\text{SE}(\hat{\psi}) = \sqrt{2.25 \times 0.5} = 1.061$.
> - There are $g = 5$ comparisons, so each interval uses two-sided tail area $0.10/5 = 0.02$, and the $t$ table with 18 degrees of freedom gives 2.552.
> - The half-width is $2.552 \times 1.061 = 2.71$.
> - Territories C (3.8) and E (2.9) differ from A by more than 2.71.

## Scheffé method

For all contrasts at once, including contrasts chosen after looking at the data, the Scheffé method uses the interval

> $$\hat{\psi} \pm \sqrt{(k - 1)\,F_{\alpha,\,k-1,\,N-k}}\;\text{SE}(\hat{\psi})$$

- $F_{\alpha,\,k-1,\,N-k}$ is the upper $\alpha$ point of the [[F-Distribution|$F$ distribution]] with $k - 1$ and $N - k$ degrees of freedom.

The family confidence is exactly $1 - \alpha$ over every contrast. If the ANOVA $F$ test rejects at level $\alpha$, at least one contrast is significant by the Scheffé method.

> [!example]- For the six territories above, with 90% family confidence, which territories differ from A by the Scheffé method? {Example}
> - With $k = 6$ groups and 18 degrees of freedom, $F_{0.10,5,18} = 2.196$.
> - The multiplier is $\sqrt{5 \times 2.196} = 3.314$, so the half-width is $3.314 \times 1.061 = 3.51$.
> - Only territory C (3.8) differs from A by more than 3.51.

## Tukey method

For all pairwise differences when every group has the same size $n$, the Tukey method uses the interval

> $$\bar{y}_i - \bar{y}_j \pm q_{\alpha,\,k,\,N-k} \sqrt{\frac{\hat{\sigma}^2}{n}}$$

- $q_{\alpha,\,k,\,N-k}$ is the upper $\alpha$ point of the studentized range distribution, the distribution of the range of $k$ independent normal values divided by an independent estimate of their standard deviation.

The family confidence is exactly $1 - \alpha$ over all pairwise differences.

> [!example]- Four groups have 6 observations each, with means 10.2, 11.0, 12.5 and 9.8, and $\hat{\sigma}^2 = 1.5$ on 20 degrees of freedom. With $q_{0.05,4,20} = 3.958$, which pairs differ at 95% family confidence? {Example}
> - The half-width is $3.958 \sqrt{1.5 / 6} = 3.958 \times 0.5 = 1.979$.
> - Group 3 differs from group 1 by $12.5 - 10.2 = 2.3$ and from group 4 by $12.5 - 9.8 = 2.7$, both more than 1.979.
> - Every other difference is at most $12.5 - 11.0 = 1.5$.
> - Only the pairs of group 3 with groups 1 and 4 differ.

## Choosing a method

A comparison chosen after looking at the data, such as the largest difference of means, is in effect the largest of all the pairwise comparisons. An ordinary interval for it understates the error rate, so it needs a method that covers all pairs or all contrasts.

| Family of comparisons | Method with the narrowest intervals |
| --- | --- |
| A few contrasts chosen in advance | Bonferroni |
| All pairwise differences, equal group sizes | Tukey, which is exact, while Bonferroni is conservative and Scheffé is widest |
| Any contrasts, including contrasts that are not pairwise or are chosen after the data | Scheffé |

> [!trap] Running an ordinary $t$ test on every pair
> Running an ordinary $t$ test at level $\alpha$ on each pair of means after a significant $F$ test does not hold the family-wise error rate at $\alpha$. With 6 groups there are 15 pairs, and the chance of at least one false difference is far above $\alpha$.
