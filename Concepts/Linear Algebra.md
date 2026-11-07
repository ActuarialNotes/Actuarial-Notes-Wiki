---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:f78225b314096e9eb2d62dd3e94d0a554c30020d97fbf2a84cc468b6722d42f4
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

![[Media/Figures/Linear_Algebra.svg|340]]

**Linear Algebra** is the branch of mathematics that studies vectors, matrices and the linear operations on them. In regression it writes the model for all $n$ observations as one equation, $\mathbf{y} = \mathbf{X}\boldsymbol\beta + \boldsymbol\varepsilon$, where $\mathbf{X}$ is the [[Design Matrix|design matrix]].

The product of an $m \times q$ matrix $\mathbf{A}$ and a $q \times r$ matrix $\mathbf{B}$ is the $m \times r$ matrix $\mathbf{A}\mathbf{B}$ whose entry in row $i$ and column $j$ is

> $$(\mathbf{A}\mathbf{B})_{ij} = \sum_{k=1}^{q} a_{ik}\, b_{kj}$$

- $a_{ik}$ is the entry of $\mathbf{A}$ in row $i$ and column $k$, and $b_{kj}$ is the entry of $\mathbf{B}$ in row $k$ and column $j$.
- The number of columns of $\mathbf{A}$ must equal the number of rows of $\mathbf{B}$.

> [!example]- A design matrix has rows $(1, 2)$, $(1, 5)$ and $(1, 8)$, and the estimated coefficients are $\hat\beta_0 = 1.0$ and $\hat\beta_1 = 0.5$. What are the fitted values $\mathbf{X}\hat{\boldsymbol\beta}$? {Example}
> - $\mathbf{X}$ is $3 \times 2$ and $\hat{\boldsymbol\beta}$ is $2 \times 1$, so the product is a $3 \times 1$ vector.
> - Each entry is a row of $\mathbf{X}$ multiplied entry by entry with $\hat{\boldsymbol\beta}$ and summed: $1(1.0) + 2(0.5) = 2.0$, $1(1.0) + 5(0.5) = 3.5$ and $1(1.0) + 8(0.5) = 5.0$.
> - The fitted values are $2.0$, $3.5$ and $5.0$.

## The matrix $\mathbf{X}^T\mathbf{X}$

The transpose $\mathbf{X}^T$ has the rows of $\mathbf{X}$ as its columns. The entry of $\mathbf{X}^T\mathbf{X}$ in row $j$ and column $k$ is

> $$(\mathbf{X}^T\mathbf{X})_{jk} = \sum_{i=1}^{n} x_{ij}\, x_{ik}$$

- $x_{ij}$ is the entry of $\mathbf{X}$ for observation $i$ in column $j$.

A diagonal entry $(\mathbf{X}^T\mathbf{X})_{jj}$ is the sum of squares of column $j$. For the intercept column, whose entries are all 1, it is the number of observations $n$, and the off-diagonal entries in that row are the column sums of the other columns.

> [!example]- The design matrix has rows $(1, 1)$, $(1, 2)$ and $(1, 3)$. What is $\mathbf{X}^T\mathbf{X}$? {Example}
> - The intercept column's sum of squares is $1 + 1 + 1 = 3$, the number of observations.
> - The second column's sum of squares is $1 + 4 + 9 = 14$.
> - The off-diagonal entry is the sum of products of the two columns, $1 + 2 + 3 = 6$.
> - So $\mathbf{X}^T\mathbf{X}$ has rows $(3, 6)$ and $(6, 14)$.

## The inverse of a matrix

The inverse of a square matrix $\mathbf{A}$ is the matrix $\mathbf{A}^{-1}$ with $\mathbf{A}\mathbf{A}^{-1} = \mathbf{I}$, the identity matrix. It exists only when the determinant of $\mathbf{A}$ is not zero. The inverse of a $2 \times 2$ matrix is

> $$\begin{bmatrix} a & b \\ c & d \end{bmatrix}^{-1} = \frac{1}{ad - bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$$

- $ad - bc$ is the determinant, and $ad - bc \ne 0$.

> [!example]- What is the inverse of the matrix with rows $(3, 6)$ and $(6, 14)$? {Example}
> - The determinant is $3(14) - 6(6) = 6$.
> - Swapping the diagonal entries and changing the sign of the off-diagonal entries gives rows $(14, -6)$ and $(-6, 3)$.
> - The inverse is $\frac{1}{6}$ times that matrix, with rows $(2.3333, -1)$ and $(-1, 0.5)$.

## Eigenvalues and eigenvectors

A nonzero vector $\mathbf{v}$ is an eigenvector of a square matrix $\mathbf{A}$, with eigenvalue $\lambda$, when

> $$\mathbf{A}\mathbf{v} = \lambda \mathbf{v}$$

The eigenvalues are the solutions of $\det(\mathbf{A} - \lambda \mathbf{I}) = 0$. The eigenvectors of a covariance matrix are the directions of the [[Principal Components Analysis|principal components]], and each eigenvalue is the variance along its component.

> [!example]- Two standardized variables have the covariance matrix with rows $(1, 0.6)$ and $(0.6, 1)$. What are its eigenvalues, and what share of the total variance does the first principal component explain? {Example}
> - The eigenvalues solve $(1 - \lambda)^2 - 0.6^2 = 0$, so $1 - \lambda = \pm 0.6$.
> - The eigenvalues are $1.6$ and $0.4$.
> - The first principal component explains $1.6/(1.6 + 0.4) = 80\%$ of the total variance.
