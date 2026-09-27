---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0162823afe88d7adb1e46cb4533dc16e35be9618397e6cc9e4c64a48bddbeb01
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pearson Residual.md
---

**Pearson Residual** is an actual incremental loss minus its fitted value, divided by the standard deviation the model implies for that cell. For the [[Over-Dispersed Poisson Model|over-dispersed Poisson]] model the divisor is $\sqrt{m}$. In the [[ODP Bootstrap Model|ODP bootstrap]] these are the residuals that are resampled, and [[Using the ODP Bootstrap Model (Shapland - 2016)|Shapland (2016)]] defines three versions of them: unscaled, scaled and standardized.

> $$r_{w,d} = \frac{q(w,d) - m_{w,d}}{\sqrt{m_{w,d}^{z}}}$$

> $$r^{S}_{w,d} = r_{w,d} \times \sqrt{\frac{N}{N - p}}$$

> $$r^{H}_{w,d} = r_{w,d} \times \sqrt{\frac{1}{1 - H_{i,i}}}$$

- $q(w,d)$ is the actual and $m_{w,d}$ the fitted incremental loss, and $z = 1$ for the ODP. $N$ is the number of incremental cells, and $p$ the number of parameters, which is $2n - 1$ for an $n \times n$ triangle (per Shapland's errata). $H_{i,i}$ is the cell's diagonal element of the [[Hat Matrix|hat matrix]] $H = X(X^{T}WX)^{-1}X^{T}W$, where $X$ is the [[Design Matrix|design matrix]] and $W$ the diagonal matrix of fitted values.
- **Why Pearson.** England and Verrall (1999) considered the deviance, Pearson and Anscombe residuals; the Pearson residuals are preferred because they are calculated consistently with the scale parameter, $\phi = \sum r_{w,d}^2/(N - p)$. Dividing by $\sqrt{m}$ also makes them "exposure independent" (Shapland's Section 4.7.1). (See [[Residual]] and [[Deviance Residual]] for the other kinds.)
- **The three versions.** The *unscaled* residual (Shapland's 3.16) gives $\phi$. England and Verrall (2002) multiplied by the degrees-of-freedom factor $\sqrt{N/(N-p)}$ to include the over-dispersion, which gives the *scaled* residual (3.20). Pinheiro et al. noted that this does not create standardized residuals, which is what makes sure they all have the same variance. The hat-matrix factor does, and it replaces and improves on the degrees-of-freedom factor, giving the *standardized* residual (3.24). $\phi$ is still calculated from the unscaled residuals, though $\sum (r^{H})^2/N$ approximates it.
- **Zero residuals are dropped.** Each corner cell of the triangle has a parameter of its own, so it is fitted exactly. Its residual is zero, and its $H_{i,i} = 1$. It is left out of the pool that is resampled.
- **In the bootstrap**, a sampled residual $r^*$ makes a pseudo value $q^*(w,d) = r^* \sqrt{m_{w,d}} + m_{w,d}$. For a negative fitted value both formulas use $\sqrt{|m_{w,d}|}$. The residuals are assumed independent and identically distributed, which is what [[Heteroscedasticity|heteroscedasticity]] violates; they need not be normal.

> [!example]- Unscaled, Scaled and Standardized Residuals for One Cell {Example}
> A $4 \times 4$ triangle of incremental losses (\$000s) has actual $q(2,2) = 700$ and fitted $m_{2,2} = 657.85$ under the ODP model. The cell's hat-matrix diagonal is $H = 0.558$. Compute its three residuals. If the standardized residual is then sampled for cell $(3,1)$, whose fitted value is $1{,}158.8$, what pseudo value results?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > r_{2,2} &= \frac{700 - 657.85}{\sqrt{657.85}} \\
> > &= \frac{42.15}{25.649} \\
> > &= 1.643
> > \end{align*}
> > $$
> >
> > The triangle has $N = 10$ cells and $p = 2(4) - 1 = 7$ parameters:
> >
> > $$
> > \begin{align*}
> > r^{S}_{2,2} &= 1.643 \times \sqrt{\tfrac{10}{3}} \\
> > &= 1.643 \times 1.8257 \\
> > &= 3.000 \\
> > r^{H}_{2,2} &= 1.643 \times \sqrt{\tfrac{1}{1 - 0.558}} \\
> > &= 1.643 \times 1.5042 \\
> > &= 2.472
> > \end{align*}
> > $$
> >
> > The degrees-of-freedom factor inflates every residual by the same $1.826$. The hat-matrix factor, $1.504$ here, is specific to the cell: it is larger for a cell with more leverage over its own fitted value.
> >
> > **Resampled into cell $(3,1)$:**
> >
> > $$
> > \begin{align*}
> > q^*(3,1) &= 2.472\sqrt{1{,}158.8} + 1{,}158.8 \\
> > &= 84.1 + 1{,}158.8 \\
> > &= 1{,}242.9
> > \end{align*}
> > $$
> >
> > The residual moves the value by $2.472$ of *that* cell's standard deviations, $\sqrt{1{,}158.8} = 34.0$, not by the $42.15$ seen in cell $(2,2)$.

> [!example]- The Hat Matrix Adjustment Across a Triangle {Example}
> The same $4 \times 4$ ODP fit has these unscaled residuals $r$ and hat-matrix diagonals $H$, computed from $X$ (one column for each $\alpha_w$ and each cumulative $\beta_d$) and $W = \mathrm{diag}(m)$:
>
> | Cell | $r$ | $H$ |
> |---|---|---|
> | $(1,1)$ | $-0.694$ | $0.696$ |
> | $(2,1)$ | $-0.569$ | $0.712$ |
> | $(3,1)$ | $1.211$ | $0.760$ |
> | $(4,1)$ | $0$ | $1$ |
> | $(1,2)$ | $-0.038$ | $0.537$ |
> | $(2,2)$ | $1.643$ | $0.558$ |
> | $(3,2)$ | $-1.579$ | $0.591$ |
> | $(1,3)$ | $1.389$ | $0.554$ |
> | $(2,3)$ | $-1.328$ | $0.592$ |
> | $(1,4)$ | $0$ | $1$ |
>
> Find the standardized residuals that go into the sampling pool, and compare $\sum (r^H)^2/N$ with $\phi$.
>
> > [!answer]-
> > The $H$ values sum to $7.000$, the number of parameters, as the trace of a hat matrix must. The two corners have $H = 1$: each is fitted exactly by its own parameter, its factor $1/\sqrt{1 - H}$ is undefined, and its zero residual is excluded from the pool.
> >
> > The other eight are $r^H = r/\sqrt{1 - H}$. For example, $r^H_{1,1} = -0.694/\sqrt{0.304} = -1.26$. The table carries three decimals, computed before rounding:
> >
> > | Cell | $r^H$ |
> > |---|---|
> > | $(1,1)$ | $-1.260$ |
> > | $(2,1)$ | $-1.059$ |
> > | $(3,1)$ | $2.471$ |
> > | $(1,2)$ | $-0.055$ |
> > | $(2,2)$ | $2.472$ |
> > | $(3,2)$ | $-2.471$ |
> > | $(1,3)$ | $2.079$ |
> > | $(2,3)$ | $-2.079$ |
> >
> > $$
> > \begin{align*}
> > \phi &= \frac{\sum r^2}{N - p} \\
> > &= \frac{11.160}{3} \\
> > &= 3.720 \\
> > \phi^{H} &= \frac{\sum (r^{H})^2}{N} \\
> > &= \frac{29.675}{10} \\
> > &= 2.967
> > \end{align*}
> > $$
> >
> > The standardized residuals are much larger than the unscaled ones, because a small triangle's fit absorbs most of each cell's deviation. Shapland keeps $\phi$ from the unscaled residuals; $\phi^H$ is only an approximation to it, and on a triangle this small the two differ noticeably.
