---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:da329cb4cbbdfddfa62deff98f20e65721eed5c3917639a052a931bd037aad7d
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.3.3 item 5 'High Leverage Points', leverage statistic eq (3.37), 1/n <= h_i <= 1, average (p+1)/n, printed pp.98-99 (PDF pp.108-109); §5.1.2 LOOCV shortcut eq (5.2) printed p.202 (PDF p.211), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 11 §11.2 hat matrix H = X(X'X)^-1 X', yhat_i = sum_j h_ij y_j, sum of h_ii = number of parameters, 2p/n and 3p/n flags; §11.3-11.5 studentized residuals, deleted residuals, Cook's distance, sha256:6229ca1803f9d152028893131b323ac3ebdff7b49733518cc14a77a87200dbb9 — https://online.stat.psu.edu/stat501/Lesson11.html"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.9.1-2.9.2: yhat = Hy, r = (I-H)y, var(r_i) = (1-h_ii) sigma², 1/n <= h_ii for models with a constant, simple-regression h_ii, standardized residual, PDF pp.49-50, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.3 'Logit Models for Binary Data', §3.8 weighted hat matrix W^1/2 X(X'WX)^-1 X'W^1/2 and GLM leverages, PDF p.48, sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf"
    - "Margalit & Rabinoff, Interactive Linear Algebra (Georgia Tech), §6.3 'Orthogonal Projection': A(A'A)^-1 A' projects onto Col(A); projection matrices satisfy B² = B and are similar to diag(1..1,0..0), sha256:5f55c3eedb52811df75c7706a17fc29be54903cda310167a12acd631835425e2 — https://textbooks.math.gatech.edu/ila/projections.html"
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
