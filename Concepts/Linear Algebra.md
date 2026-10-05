---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:35d07cc955b1f1497328af33ec2f63d3268401b02aeb02a8f839a4e7a8b29c32
  sources:
    - "Margalit & Rabinoff, Interactive Linear Algebra (Georgia Tech), §3.5 'Matrix Inverses': det of a 2x2 matrix = ad - bc; invertible iff det != 0, sha256:3f21c6a9af68bf9b0e8d4ad7751a264e7777340451dc48284db01f019c0f0a4b — https://textbooks.math.gatech.edu/ila/matrix-inverses.html"
    - "Margalit & Rabinoff, Interactive Linear Algebra (Georgia Tech), §4.1 invertibility property: square A invertible iff det(A) != 0; 2x2 formula, sha256:00e719a0b116a6335b4f77553e51006ef6e8b22fd9fdbd8e60da57d1d7a7cb92 — https://textbooks.math.gatech.edu/ila/determinants-definitions-properties.html"
    - "Margalit & Rabinoff, Interactive Linear Algebra (Georgia Tech), §5.1 definition of eigenvector/eigenvalue (nonzero v, Av = lambda v); invertible matrix theorem (Ax = b unique solution), sha256:b7899f71f7f7e69a33669e66740ddfe94cfe3c7bc45374366ebccd0c746d4c14 — https://textbooks.math.gatech.edu/ila/eigenvectors.html"
    - "Margalit & Rabinoff, Interactive Linear Algebra (Georgia Tech), §5.2 characteristic polynomial det(A - lambda I), sha256:41e36c3fc7ce21f84faeeb3d7c091b402d0151bd510f1856e694ac6b7efed446 — https://textbooks.math.gatech.edu/ila/characteristic-polynomial.html"
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 5 §5.4 transpose, identity, inverse, least squares estimates (X'X)^-1 X'Y, linear dependence, sha256:c7eb1ac675fffa3493ca7644a47f8a36e96fa53d301d2f8191c7ac4ca82edec6 — https://online.stat.psu.edu/stat501/Lesson05.html"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.2 iteratively re-weighted least squares (X'WX)^-1 X'Wz, PDF pp.4-5, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Penn State STAT 505 Applied Multivariate Statistical Analysis, Lesson 11 'Principal Components Analysis' §11.1-11.2, sha256:d22a772c700092d6dc59747e12ccab12ce7c3bc2a858aabc0b60a85b7554e55a — https://online.stat.psu.edu/stat505/Lesson11.html"
    - "CAS Exam MAS-II Content Outline 2026, 'Assumed Knowledge' (linear algebra at the level of an undergraduate regression prerequisite), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Linear Algebra.md
---

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

![[Media/Figures/Linear_Algebra.svg|340]]

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
