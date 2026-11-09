---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:ee025cc2b897bae24c601a5e7cd58c56d45608a27665842ae9f283a26642455a
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

The **Hat Matrix** is the $n \times n$ matrix $\mathbf{H}$ that turns the observed responses of a [[Linear Regression|linear regression]] into its [[Fitted Values|fitted values]]. It projects the response vector onto the space spanned by the columns of the [[Design Matrix|design matrix]] $\mathbf{X}$, and it is

> $$\mathbf{H} = \mathbf{X}(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T$$

Substituting the [[Ordinary Least Squares#Matrix form of the estimates|least squares estimate]] $\hat{\boldsymbol\beta} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$ into $\hat{\mathbf{y}} = \mathbf{X}\hat{\boldsymbol\beta}$ shows that the fitted values are

> $$\hat{\mathbf{y}} = \mathbf{H}\mathbf{y}$$

- $\mathbf{y}$ is the vector of observed responses.

Each fitted value is therefore row $i$ of $\mathbf{H}$ multiplied entry by entry with $\mathbf{y}$ and summed, $\hat{y}_i = \sum_{j} h_{ij}\, y_j$. The matrix $\mathbf{H}$ is symmetric, $\mathbf{H}^T = \mathbf{H}$, and idempotent, $\mathbf{H}\mathbf{H} = \mathbf{H}$. The [[Residual|residuals]] are $\mathbf{e} = (\mathbf{I} - \mathbf{H})\mathbf{y}$.

> [!example]- Row 1 of the hat matrix is $(0.8333, 0.3333, -0.1667)$, and the responses are $2$, $3$ and $5$. What are the fitted value and the residual of observation 1? {Example}
> - The fitted value is $\hat{y}_1 = 0.8333(2) + 0.3333(3) - 0.1667(5) = 1.8333$.
> - The residual is $e_1 = y_1 - \hat{y}_1 = 2 - 1.8333 = 0.1667$.

## Leverage

The leverage of observation $i$ is the diagonal entry $h_{ii}$ of $\mathbf{H}$. It measures how far the observation's predictor values are from those of the other observations, and so how strongly the observation can pull its own fitted value toward itself. In simple linear regression the leverage is

> $$h_{ii} = \frac{1}{n} + \frac{(x_i - \bar{x})^2}{\sum_{j=1}^{n} (x_j - \bar{x})^2}$$

- $\bar{x}$ is the mean of the predictor values.

The leverage depends only on the predictor values, not on $y_i$. It lies between $1/n$ and $1$, and the leverages sum to $p + 1$, the number of coefficients, so their average is $(p + 1)/n$. An observation whose leverage greatly exceeds $(p + 1)/n$ is a high-leverage point. The variance of its residual is $\sigma^2(1 - h_{ii})$, so a high-leverage point can have a small residual even when its response is unusual. An observation with both a high leverage and a large residual is influential, which [[Residual#Standardized residuals and Cook's distance|Cook's distance]] measures.

> [!example]- Severity is regressed on insured value for five risks with insured values 1, 2, 3, 4 and 10. What is the leverage of the last risk, and is it a high-leverage point? {Example}
> - The mean insured value is $\bar{x} = 20/5 = 4$.
> - The sum of squared deviations is $9 + 4 + 1 + 0 + 36 = 50$.
> - The leverage of the last risk is $\frac{1}{5} + \frac{(10 - 4)^2}{50}$, so $h_{55} = 0.20 + 0.72 = 0.92$.
> - The average leverage is $(p + 1)/n = 2/5 = 0.40$, and $0.92$ is more than twice that, so the last risk is a high-leverage point.

## Leave-one-out cross-validation

For a least squares fit, the error made in predicting observation $i$ from a fit without it is $e_i/(1 - h_{ii})$, so [[Cross-Validation|leave-one-out cross-validation]] needs only one fit. The leave-one-out estimate of the test mean squared error is

> $$\text{CV}_{(n)} = \frac{1}{n}\sum_{i=1}^{n} \left(\frac{y_i - \hat{y}_i}{1 - h_{ii}}\right)^2$$

> [!example]- Rural claims of 2 and 4 and urban claims of 7 and 9 are fitted with an intercept and an urban indicator. Each fitted value is its group's mean and each leverage is $0.5$. What is the leave-one-out cross-validation estimate? {Example}
> - The fitted values are 3, 3, 8 and 8, so the residuals are $-1$, $1$, $-1$ and $1$.
> - Each leave-one-out error is $\pm 1/(1 - 0.5) = \pm 2$.
> - The estimate is $\text{CV}_{(4)} = (4 + 4 + 4 + 4)/4 = 4$, four times the mean squared residual of 1.
