**Linear Algebra** is the study of vectors, matrices, and linear transformations. It is the computational backbone of regression, the [[Generalized Linear Model]], and [[Principal Components Analysis]]: data is stored in a design matrix and model fitting reduces to matrix operations.

> $$A\mathbf{x} = \mathbf{b}$$

- A **matrix** $A$ of size $m \times n$ maps a vector $\mathbf{x} \in \mathbb{R}^n$ to $A\mathbf{x} \in \mathbb{R}^m$; the system above has a unique solution when $A$ is square and **invertible**
- The **transpose** $A^\top$ swaps rows and columns; the **inverse** $A^{-1}$ satisfies $A A^{-1} = I$, the identity matrix
- $A$ is invertible iff $\det(A) \neq 0$ (equivalently, full **rank**); for a $2\times 2$ matrix with entries $a, b, c, d$ the determinant is $ad - bc$

**Least-squares regression (normal equations).** Fitting $\mathbf{y} = X\boldsymbol{\beta} + \boldsymbol{\varepsilon}$ by minimizing the [[Residual Sum of Squares]] gives the ordinary least-squares estimate:

> $$\hat{\boldsymbol{\beta}} = \left(X^\top X\right)^{-1} X^\top \mathbf{y}$$

- $X$ is the **design matrix** (one row per observation, one column per predictor plus an intercept); this formula underlies linear regression and the iteratively re-weighted version used to fit a [[Generalized Linear Model]]

**Eigenvalues and eigenvectors.** A nonzero vector $\mathbf{v}$ is an **eigenvector** of a square matrix $A$ with **eigenvalue** $\lambda$ when:

> $$A\mathbf{v} = \lambda\mathbf{v}$$

- Eigenvalues solve the **characteristic equation** $\det(A - \lambda I) = 0$
- The eigenvectors of a covariance matrix are the **principal components** in [[Principal Components Analysis]], and each eigenvalue is the variance explained along its component

> [!example]- Least-Squares Slope for Two Data Points {Example}
> Fit $y = \beta x$ (no intercept) by least squares to the points $(x, y) = (1, 2)$ and $(2, 3)$. Find $\hat{\beta}$.
>
> > [!answer]-
> > Here $X = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$ and $\mathbf{y} = \begin{bmatrix} 2 \\ 3 \end{bmatrix}$, so $X^\top X$ and $X^\top \mathbf{y}$ are scalars:
> > $$
> > \begin{align*}
> > \hat{\beta} &= \frac{X^\top \mathbf{y}}{X^\top X} = \frac{(1)(2) + (2)(3)}{(1)^2 + (2)^2} \\
> >   &= \frac{8}{5} \\
> >   &= 1.6
> > \end{align*}
> > $$
> > The best-fit slope through the origin is $\hat{\beta} = 1.6$.

> [!example]- Eigenvalues of a 2×2 Covariance Matrix {Example}
> A standardized two-variable dataset has covariance matrix $\Sigma = \begin{bmatrix} 1 & 0.6 \\ 0.6 & 1 \end{bmatrix}$. Find its eigenvalues (the variances captured by the two principal components).
>
> > [!answer]-
> > Solve $\det(\Sigma - \lambda I) = 0$:
> > $$
> > \begin{align*}
> > (1 - \lambda)^2 - 0.6^2 &= 0 \\
> > 1 - \lambda &= \pm 0.6 \\
> > \lambda &= 1.6 \ \text{ or } \ 0.4
> > \end{align*}
> > $$
> > The first principal component explains $1.6 / (1.6 + 0.4) = 80\%$ of the total variance.
