---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:da329cb4cbbdfddfa62deff98f20e65721eed5c3917639a052a931bd037aad7d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hat Matrix.md
---

The **hat matrix** $\mathbf{H}$ is the $n \times n$ matrix that turns the observed responses into the [[Ordinary Least Squares]] [[Fitted Values|fitted values]] — it "puts the hat on $\mathbf{y}$". Its diagonal entries $h_{ii}$ are the **leverages**: how far each observation's predictor values sit from the rest, and so how hard it can pull the fitted surface toward itself.

> $$\mathbf{H} = \mathbf{X}(\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top$$

> $$\hat{\mathbf{y}} = \mathbf{H}\mathbf{y}$$

- $\mathbf{X}$ is the $n \times (p+1)$ [[Design Matrix|design matrix]]. Substituting $\hat{\boldsymbol\beta} = (\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y}$ into $\hat{\mathbf{y}} = \mathbf{X}\hat{\boldsymbol\beta}$ gives the second block
- **It is a projection**: symmetric ($\mathbf{H}^\top = \mathbf{H}$) and idempotent ($\mathbf{H}^2 = \mathbf{H}$), projecting $\mathbf{y}$ onto the column space of $\mathbf{X}$. The [[Residual|residuals]] are the complementary projection, $\mathbf{e} = (\mathbf{I} - \mathbf{H})\mathbf{y}$, which is why they are orthogonal to every column of $\mathbf{X}$
- **Its trace counts the parameters**: $\sum_i h_{ii} = \operatorname{tr}(\mathbf{H}) = p + 1$, so the average leverage is $(p+1)/n$. With an intercept, $1/n \le h_{ii} \le 1$; a common flag for high leverage is $h_{ii} > 2(p+1)/n$
- In simple regression, $h_{ii} = \dfrac{1}{n} + \dfrac{(x_i - \bar{x})^2}{S_{xx}}$: leverage grows with the squared distance from $\bar{x}$ and does not depend on $y_i$ at all
- **Leverage shrinks residuals**: $\mathrm{Var}(e_i) = \sigma^2(1 - h_{ii})$. A high-leverage point drags the fit toward itself, so its raw residual looks small. Studentized residuals divide by $\sqrt{1 - h_{ii}}$ to correct for this, and Cook's distance combines leverage with residual size to measure influence ([[Model Diagnostics]])
- For OLS the leave-one-out prediction error needs no refit — it is $e_i/(1 - h_{ii})$ — so [[Cross-Validation|leave-one-out cross-validation]] comes from a single fit. A [[Generalized Linear Model]] has an analogous hat matrix built from the working weights of its fitting algorithm, which supplies GLM leverages

> [!example]- Leverage of a Large Commercial Risk {Example}
> Claim severity is regressed on insured value (in $\$100{,}000$s) for five risks with $x = 1, 2, 3, 4, 10$. Find the leverage of each risk and decide whether the last one is a high-leverage point.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar{x} &= \frac{20}{5} \\
> > &= 4 \\
> > S_{xx} &= (-3)^2 + (-2)^2 + (-1)^2 + 0^2 + 6^2 \\
> > &= 50 \\
> > h_{55} &= \frac{1}{5} + \frac{(10 - 4)^2}{50} \\
> > &= 0.20 + 0.72 \\
> > &= 0.92
> > \end{align*}
> > $$
> > The same formula gives $h_{11} = 0.38$, $h_{22} = 0.28$, $h_{33} = 0.22$ and $h_{44} = 0.20$. The five sum to $2.00 = p + 1$, as they must.
> >
> > The flag is $2(p+1)/n = 2(2)/5 = 0.80$, and $0.92$ exceeds it. Since $\mathrm{Var}(e_5) = 0.08\,\sigma^2$, the fitted line has to pass almost through the large risk: its raw residual will be small even if its severity is recorded wrongly, and it largely decides the slope on its own.

> [!example]- The Hat Matrix of a Two-Group Model {Example}
> Rural claims of $2$ and $4$ and urban claims of $7$ and $9$ (in $\$000$) are fitted with an intercept and an urban indicator, so $(\mathbf{X}^\top\mathbf{X})^{-1} = \begin{bmatrix} 0.5 & -0.5 \\ -0.5 & 1 \end{bmatrix}$. Find $\mathbf{H}$, the fitted values, and the leave-one-out cross-validation error.
>
> > [!answer]-
> > Multiplying out $\mathbf{X}(\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top$:
> > $$
> > \mathbf{H} = \begin{bmatrix} 0.5 & 0.5 & 0 & 0 \\ 0.5 & 0.5 & 0 & 0 \\ 0 & 0 & 0.5 & 0.5 \\ 0 & 0 & 0.5 & 0.5 \end{bmatrix}
> > $$
> > So $\hat{\mathbf{y}} = \mathbf{H}\mathbf{y} = (3, 3, 8, 8)$ — each fitted value is its group's mean — and $\mathbf{e} = (-1, 1, -1, 1)$. The trace is $2$, the number of parameters, and each $2 \times 2$ block of $0.5$s squares to itself, so $\mathbf{H}^2 = \mathbf{H}$.
> >
> > Every $h_{ii} = 0.5$, so each leave-one-out error is $e_i/(1 - 0.5) = \pm 2$. Check the first: without the claim of $2$, the rural mean is $4$, and $2 - 4 = -2$.
> > $$
> > \begin{align*}
> > \text{CV}_{(n)} &= \frac{1}{4}\sum_{i=1}^{4}\left(\frac{e_i}{1 - h_{ii}}\right)^2 \\
> > &= \frac{4 + 4 + 4 + 4}{4} \\
> > &= 4
> > \end{align*}
> > $$
> > The in-sample mean squared residual is $1$, so here the training error understates the error on unseen claims by a factor of $4$.
