**Principal Components Analysis (PCA)** is an unsupervised [[Statistical Learning]] technique that finds a low-dimensional representation of a high-dimensional dataset by identifying the directions (**principal components**) of maximum variance.

> **First principal component** — the direction $\mathbf{z}_1 = \mathbf{X}\boldsymbol{\phi}_1$ that maximizes $\text{Var}(\mathbf{z}_1)$:
> $$\boldsymbol{\phi}_1 = \arg\max_{\|\boldsymbol{\phi}\|=1} \text{Var}(\mathbf{X}\boldsymbol{\phi})$$
>
> **Proportion of variance explained by PC $m$:**
> $$\text{PVE}_m = \frac{\lambda_m}{\sum_{j=1}^p \lambda_j}$$

- $\boldsymbol{\phi}_m$ is the $m$-th **loading vector** (eigenvector of the covariance matrix $\mathbf{S}$ with eigenvalue $\lambda_m$)
- $\mathbf{z}_m = \mathbf{X}\boldsymbol{\phi}_m$ is the $m$-th **score vector** (principal component)
- PCs are **orthogonal** — each successive PC captures the maximum remaining variance
- **Scree plot**: plot of $\lambda_m$ vs. $m$; an "elbow" suggests how many PCs to retain
- PCA requires **standardizing** predictors (subtract mean, divide by SD) when variables are on different scales
- Used for **dimensionality reduction** before fitting models, and for **visualization** of high-dimensional data

> [!example]- Computing the First Principal Component {Example}
> Two standardized predictors $X_1$ (vehicle age) and $X_2$ (driver age) have covariance matrix $\mathbf{S} = \begin{pmatrix}1 & 0.6\\0.6 & 1\end{pmatrix}$. The first eigenvector is $\boldsymbol{\phi}_1 = (0.707, 0.707)^\top$ with eigenvalue $\lambda_1 = 1.6$. What proportion of variance does PC1 explain?
>
> > [!answer]-
> > Total variance $= \lambda_1 + \lambda_2 = 1.6 + 0.4 = 2.0$ (sum of eigenvalues = trace of $\mathbf{S} = 1+1 = 2$).
> > $$\text{PVE}_1 = \frac{1.6}{2.0} = 0.80$$
> > The first principal component explains **80%** of the total variance. $z_{1i} = 0.707 x_{1i} + 0.707 x_{2i}$ is the average of the two standardized predictors.
