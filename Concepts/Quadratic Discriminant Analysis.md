**Quadratic Discriminant Analysis** (QDA) is a classifier that assumes the predictors in each class $k$ are multivariate normal with their own mean vector $\boldsymbol\mu_k$ **and their own covariance matrix** $\boldsymbol\Sigma_k$. It plugs estimates of these and the class priors into [[Bayes Theorem]] and assigns an observation to the class whose **discriminant function** $\delta_k(\mathbf{x})$ is largest.

> $$\mathbf{X} \mid Y = k \;\sim\; N(\boldsymbol\mu_k,\ \boldsymbol\Sigma_k)$$

> $$\delta_k(\mathbf{x}) = -\tfrac{1}{2}(\mathbf{x} - \boldsymbol\mu_k)^\top \boldsymbol\Sigma_k^{-1} (\mathbf{x} - \boldsymbol\mu_k) - \tfrac{1}{2}\ln|\boldsymbol\Sigma_k| + \ln \pi_k$$

> $$\delta_k(x) = -\frac{(x - \mu_k)^2}{2\sigma_k^2} - \ln\sigma_k + \ln\pi_k \quad (p = 1)$$

- $\pi_k$ is the prior probability of class $k$, $|\boldsymbol\Sigma_k|$ is the determinant of its covariance matrix, and $p$ is the number of predictors. In practice $\boldsymbol\mu_k$, $\boldsymbol\Sigma_k$ and $\pi_k$ are replaced by training-data estimates.
- $\mathbf{x}$ enters $\delta_k$ **quadratically**, hence the name, so the boundary between two classes is a quadratic curve or surface. When $p = 1$ it can cut the line at two points, so a class with a larger variance can claim *both* tails.
- **Bias–variance.** Each class needs its own $p(p+1)/2$ covariance parameters, or $Kp(p+1)/2$ in all. A model with one covariance matrix shared by every class (linear discriminant analysis, LDA) has a linear boundary and far lower variance. QDA is preferred when the training set is large or a common covariance is clearly untenable; with few observations the shared-covariance model is usually the better bet ([[Bias-Variance Tradeoff]]).
- [[Naive Bayes]] with normal predictors is QDA with each $\boldsymbol\Sigma_k$ restricted to be **diagonal** (predictors independent within a class).
- **Exam scope.** The 2026 MAS-I outline assigns ISLR §§4.1–4.4 but says the *linear* discriminant analysis portion of §4.4 will not be tested. QDA (§4.4.3) and naive Bayes (§4.4.4) are on the syllabus, and LDA appears here only as QDA's point of comparison.

> [!example]- Classifying Claims by Log-Severity {Example}
> Attritional claims have log-severity $N(8,\ 0.5^2)$ and make up $90\%$ of claims. Complex claims have log-severity $N(9,\ 1.5^2)$ and make up $10\%$. Use QDA to classify claims with log-severity $8.5$ and $6.0$.
>
> > [!answer]-
> > At $x = 8.5$:
> >
> > $$
> > \begin{align*}
> > \delta_{\text{A}} &= -\frac{(0.5)^2}{2(0.25)} - \ln 0.5 + \ln 0.9 \\
> > &= -0.5 + 0.693 - 0.105 \\
> > &= 0.088 \\[4pt]
> > \delta_{\text{C}} &= -\frac{(0.5)^2}{2(2.25)} - \ln 1.5 + \ln 0.1 \\
> > &= -0.056 - 0.405 - 2.303 \\
> > &= -2.764
> > \end{align*}
> > $$
> >
> > At $x = 6.0$:
> >
> > $$
> > \begin{align*}
> > \delta_{\text{A}} &= -\frac{(-2)^2}{0.5} + 0.693 - 0.105 \\
> > &= -7.412 \\[4pt]
> > \delta_{\text{C}} &= -\frac{(-3)^2}{4.5} - 0.405 - 2.303 \\
> > &= -4.708
> > \end{align*}
> > $$
> >
> > The $8.5$ claim is **attritional** and the $6.0$ claim is **complex**. Setting $\delta_{\text{A}} = \delta_{\text{C}}$ gives the boundary points $x = 6.46$ and $x = 9.29$. Claims below $6.46$ or above $9.29$ are classed as complex, because the wider complex-claim distribution puts more density in both tails. A rule with a single linear cut-point could not do this.

> [!example]- Counting Covariance Parameters {Example}
> A model classifies policies into $K = 3$ classes using $p = 10$ predictors. How many covariance parameters does QDA estimate, compared with a model that shares one covariance matrix across the classes?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{One matrix} &= \frac{p(p+1)}{2} \\
> > &= \frac{10(11)}{2} = 55 \\[4pt]
> > \text{QDA} &= K\,\frac{p(p+1)}{2} \\
> > &= 3(55) = 165
> > \end{align*}
> > $$
> >
> > Both models also estimate $Kp = 30$ means and $K - 1 = 2$ free priors. QDA's extra $110$ parameters buy flexibility (quadratic boundaries) at the cost of variance. Unless the training set is large or the classes clearly differ in spread, the extra variance can outweigh the reduction in bias.
