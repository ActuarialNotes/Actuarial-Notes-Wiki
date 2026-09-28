---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:52832958cbc7094124ab9c0a2379e11605c32d15ccf145c8f4ba68beca8254b5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Heteroscedasticity.md
---

**Heteroscedasticity** is non-constant variance among a model's [[Residual|residuals]]. In a reserving model it usually means the residuals of some development periods are more variable than those of others. The [[ODP Bootstrap Model|ODP bootstrap]] assumes the opposite, homoscedasticity: that the standardized [[Pearson Residual|Pearson residuals]] are independent and identically distributed, which is what allows a residual from one cell to be applied to any other. [[Using the ODP Bootstrap Model (Shapland - 2016)|Shapland (2016)]] corrects for it with hetero-adjustment factors by group of development periods.

> $$h_i = \frac{\mathrm{stdev}\left(\bigcup_{1}^{j} r^{H}_{w,d}\right)}{\mathrm{stdev}\left(\bigcup_{i} r^{H}_{w,d}\right)}$$

> $$r^{iH}_{w,d} = r^{H}_{w,d} \times h_i$$

> $$q^{i*}(w,d) = \frac{r^{*}}{h_i}\sqrt{m_{w,d}} + m_{w,d}$$

- The development periods are split into groups $1, \dots, j$ whose residuals have similar variances. $h_i$ is group $i$'s hetero-adjustment factor: the standard deviation of all the residuals over that of group $i$'s. Multiplied by $h_i$, every group's residuals have the same standard deviation, so the adjusted residuals can be sampled freely as one pool. Dividing a sampled $r^*$ by the $h_i$ of the cell being simulated puts that group's variance back. The factors also scale the future process variance by development period.
- **Detecting it.** A [[Residual Plot|residual graph]] by development period shows it: the residuals in some periods spread wider than in others. Shapland adds graphs of the standard deviation and range relativities by period to suggest groups, then tests the groups with the normality statistics and the [[AIC]] and [[BIC]]. There are fewer residuals in the later development periods, so the credibility of an apparent difference in variance has to be weighed, especially near the tail.
- **Three options** (Shapland's Section 4.6):
  - *Stratified sampling* draws each group's residuals only from that group. It is simple, but a small group limits the variability of the outcomes.
  - *Hetero-adjustment factors*, as above.
  - *Non-constant scale parameters*, one for each group: $\phi_i = \sum_{i}\big(\sqrt{N/(N-p)}\; r_{w,d}\big)^2 / n_i$ over the $n_i$ residuals of group $i$, with $h_i = \sqrt{\phi}/\sqrt{\phi_i}$. This is a bit more theoretically sound, but in practice the two sets of factors are very close.
- **They are parameters.** The factors reduce the degrees of freedom, which changes $\phi$ and the degrees-of-freedom factor, and a model that is already over-parameterized gets worse. For the Taylor and Ashe data, nine groups gave a normality P-value of $14.3\%$, worse than no groups, while the AIC and BIC rose significantly. A [[Generalized Linear Model|GLM]] bootstrap, with fewer parameters, calendar trends and a choice of error distribution, may remove the problem instead.
- **Venter's version.** [[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)|Venter (1998)]] makes the variance of the next increment an explicit assumption, $\mathrm{Var}[q(w,d+1)] = a[d, c(w,d)]$ given the data to date (see [[Chain Ladder Assumptions]]). Its form decides which factor is the least-squares optimum. Variance proportional to $c(w,d)$ gives the volume-weighted average, proportional to $c(w,d)^2$ the simple average of the ratios, and constant variance an unweighted regression. Residual variances that are not constant over the triangle call for weighted least squares, with weights inversely proportional to the variance.

> [!example]- Hetero-Adjustment Factors for Two Groups {Example}
> An ODP bootstrap's standardized residuals, grouped by development period:
>
> - Periods 1–2: $1.9$, $-2.3$, $0.8$, $-1.6$, $2.5$, $-0.5$, $-1.2$
> - Periods 3–5: $0.5$, $-0.4$, $0.7$, $-0.6$, $0.3$
>
> Compute the hetero-adjustment factors, using standard deviations with an $n - 1$ divisor. Then find the pseudo value when the largest adjusted residual is sampled for a period-4 cell with fitted value $m = 150$.
>
> > [!answer]-
> > The standard deviations are $1.8265$ for periods 1–2, $0.5701$ for periods 3–5 and $1.3944$ for all twelve residuals together.
> >
> > $$
> > \begin{align*}
> > h_1 &= \frac{1.3944}{1.8265} \\
> > &= 0.7634 \\
> > h_2 &= \frac{1.3944}{0.5701} \\
> > &= 2.4460
> > \end{align*}
> > $$
> >
> > The early residuals are shrunk and the late ones stretched: $2.5 \times 0.7634 = 1.909$ and $0.7 \times 2.4460 = 1.712$. Each group now has a standard deviation of $1.3944$.
> >
> > The largest adjusted residual is $1.909$. Sampled for a period-4 cell, it is divided by that group's factor:
> >
> > $$
> > \begin{align*}
> > q^{*} &= \frac{1.909}{2.4460}\sqrt{150} + 150 \\
> > &= 0.780 \times 12.247 + 150 \\
> > &= 159.6
> > \end{align*}
> > $$
> >
> > Without the adjustment, the raw $2.5$ would have given $2.5\sqrt{150} + 150 = 180.6$. That is a period-4 value far more volatile than any period-4 residual in the data supports. The adjustment lets the whole pool be sampled while keeping the late periods quiet.

> [!example]- Non-Constant Scale Parameters {Example}
> A $5 \times 5$ paid triangle has $N = 15$ cells and $p = 9$ parameters. Its unscaled Pearson residuals are, apart from the two zero corners:
>
> - Group A, periods 1–2: $1.10$, $-0.95$, $0.40$, $-1.30$, $0.85$, $-0.70$, $1.20$, $-0.60$
> - Group B, periods 3–4: $0.35$, $-0.25$, $0.30$, $-0.20$, $0.15$
>
> Compute $\phi$, the group scale parameters and the hetero-adjustment factors. Then find the process standard deviation of a future cell in group B with mean $80$.
>
> > [!answer]-
> > The sums of squares are $6.975$ for group A and $0.3375$ for group B, and $N/(N-p) = 15/6 = 2.5$.
> >
> > $$
> > \begin{align*}
> > \phi &= \frac{6.975 + 0.3375}{15 - 9} \\
> > &= 1.2188 \\
> > \phi_A &= \frac{2.5 \times 6.975}{8} \\
> > &= 2.1797 \\
> > \phi_B &= \frac{2.5 \times 0.3375}{5} \\
> > &= 0.1688
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > h_A &= \sqrt{1.2188/2.1797} \\
> > &= 0.748 \\
> > h_B &= \sqrt{1.2188/0.1688} \\
> > &= 2.687
> > \end{align*}
> > $$
> >
> > The standard-deviation factors of the first option, applied to the same residuals, are $0.782$ and $2.789$. They are close, as Shapland says, but not identical: the standard deviation is taken about the group mean, while $\phi_i$ uses the raw squares.
> >
> > **Process variance** for the group B cell uses $\phi_B$:
> >
> > $$
> > \begin{align*}
> > \mathrm{SD} &= \sqrt{0.1688 \times 80} \\
> > &= 3.67
> > \end{align*}
> > $$
> >
> > A single $\phi$ would have given $\sqrt{1.2188 \times 80} = 9.87$, overstating the late periods' volatility by a factor of $2.7$. The group-A cells go the other way.
