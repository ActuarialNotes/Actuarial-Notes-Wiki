---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:29a603d30216f0c4e7fee17cf5301978142c107d79ce093278042b8a6235d606
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pearson Residual.md
---

A **Pearson Residual** is an actual incremental loss minus its fitted value, divided by the standard deviation the model implies for that cell. For the [[Over-Dispersed Poisson Model|over-dispersed Poisson]] model the divisor is $\sqrt{m}$. In the [[ODP Bootstrap Model|ODP bootstrap]] these are the residuals that are resampled.

The unscaled Pearson residual of the cell for accident period $w$ and development age $d$ is

> $$r_{w,d} = \frac{q(w,d) - m_{w,d}}{\sqrt{m_{w,d}^{z}}}$$

- $q(w,d)$ is the actual incremental loss.
- $m_{w,d}$ is the fitted incremental loss.
- $z = 1$ for the ODP.

England and Verrall (1999) considered the deviance, Pearson and Anscombe residuals. The Pearson residuals are preferred because they are calculated consistently with the scale parameter. Dividing by $\sqrt{m}$ also makes them "exposure independent" (Shapland's Section 4.7.1). [[Residual]] and [[Deviance Residual]] cover the other kinds.

The scale parameter is

> $$\phi = \frac{\sum r_{w,d}^2}{N - p}$$

- $N$ is the number of incremental cells.
- $p$ is the number of parameters, which is $2n - 1$ for an $n \times n$ triangle (per Shapland's errata).

## Scaled and standardized residuals

[[Using the ODP Bootstrap Model (Shapland - 2016)|Shapland (2016)]] defines three versions of the residual: unscaled (his 3.16), scaled and standardized. England and Verrall (2002) multiplied by a degrees-of-freedom factor to include the over-dispersion, so the scaled residual (3.20) is

> $$r^{S}_{w,d} = r_{w,d} \times \sqrt{\frac{N}{N - p}}$$

Pinheiro et al. noted that this does not create standardized residuals, which is what makes sure they all have the same variance. The hat-matrix factor does, and it replaces and improves on the degrees-of-freedom factor. The standardized residual (3.24) is

> $$r^{H}_{w,d} = r_{w,d} \times \sqrt{\frac{1}{1 - H_{i,i}}}$$

- $H_{i,i}$ is the cell's diagonal element of the [[Hat Matrix|hat matrix]] $H = X(X^{T}WX)^{-1}X^{T}W$.
- $X$ is the [[Design Matrix|design matrix]] and $W$ the diagonal matrix of fitted values.

$\phi$ is still calculated from the unscaled residuals, though $\sum (r^{H})^2/N$ approximates it.

Each corner cell of the triangle has a parameter of its own, so it is fitted exactly. Its residual is zero, and its $H_{i,i} = 1$. It is left out of the pool that is resampled.

## Residuals in the bootstrap

In the bootstrap, a sampled residual $r^*$ makes a pseudo value $q^*(w,d) = r^* \sqrt{m_{w,d}} + m_{w,d}$. For a negative fitted value both formulas use $\sqrt{|m_{w,d}|}$.

The residuals are assumed independent and identically distributed, which is what [[Heteroscedasticity|heteroscedasticity]] violates; they need not be normal.

> [!example]- What are this cell's three residuals, and what pseudo value does the standardized one make in cell $(3,1)$? {Example}
> A $4 \times 4$ triangle of incremental losses ($\$000$s) has actual $q(2,2) = 700$ and fitted $m_{2,2} = 657.85$ under the ODP model. The cell's hat-matrix diagonal is $H = 0.558$. Cell $(3,1)$ has fitted value $1{,}158.8$.
>
> > [!answer]-
> > - The unscaled residual is $r_{2,2} = 42.15/\sqrt{657.85}$, which is $42.15/25.649 = 1.643$.
> > - The triangle has $N = 10$ cells and $p = 2(4) - 1 = 7$ parameters.
> > - The scaled residual is $r^{S}_{2,2} = 1.643 \times \sqrt{10/3}$, which is $1.643 \times 1.8257 = 3.000$.
> > - The standardized residual is $r^{H}_{2,2} = 1.643 \times \sqrt{1/0.442}$, which is $1.643 \times 1.5042 = 2.472$.
> > - The degrees-of-freedom factor inflates every residual by the same $1.826$. The hat-matrix factor is specific to the cell: it is larger for a cell with more leverage over its own fitted value.
> > - Resampled into cell $(3,1)$, $q^*(3,1) = 2.472\sqrt{1{,}158.8} + 1{,}158.8$, which is $84.1 + 1{,}158.8 = 1{,}242.9$.

> [!trap] Using the sampled cell's own deviation
> The residual moves the pseudo value by $r^*$ of the *receiving* cell's standard deviations. In the example, $2.472 \times \sqrt{1{,}158.8} = 84.1$, not the $42.15$ seen in cell $(2,2)$.
