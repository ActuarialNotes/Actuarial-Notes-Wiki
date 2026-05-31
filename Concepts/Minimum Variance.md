**Minimum Variance** is a criterion for comparing estimators: among all estimators in a given class (typically unbiased), the one with the **smallest variance** is preferred, as it produces estimates closest to the true parameter on average.

> **Cramér–Rao Lower Bound (CRLB):** For any unbiased estimator $\hat{\theta}$,
> $$\text{Var}(\hat{\theta}) \geq \frac{1}{I(\theta)}$$
>
> $$= \frac{1}{n \cdot I_1(\theta)}$$
>
> $$\text{where } I_1(\theta) = E\!\left[\left(\frac{\partial}{\partial\theta}\ln f(X \mid \theta)\right)^2\right] \text{ is the Fisher information}$$

- An unbiased estimator that **achieves** the CRLB is called **efficient**
- The **UMVUE** (Uniformly Minimum Variance Unbiased Estimator) achieves minimum variance simultaneously for all $\theta$ within the class of unbiased estimators
- By the Lehmann–Scheffé theorem, an unbiased function of a **complete sufficient statistic** is the UMVUE
- [[Maximum Likelihood Estimation|MLEs]] are **asymptotically efficient**: their variance approaches the CRLB as $n \to \infty$

> [!example]- Cramér–Rao Bound for the Exponential Mean {Example}
> For $X_i \stackrel{\text{iid}}{\sim} \text{Exp}(\theta)$, find the Cramér–Rao lower bound on the variance of any unbiased estimator of $\theta$.
>
> > [!answer]-
> > $f(x|\theta) = \frac{1}{\theta}e^{-x/\theta}$, so $\ln f = -\ln\theta - x/\theta$.
> > $\frac{\partial}{\partial\theta}\ln f = -\frac{1}{\theta} + \frac{x}{\theta^2}$.
> > $I_1(\theta) = \text{Var}\!\left(\frac{X-\theta}{\theta^2}\right) = \frac{\theta^2}{\theta^4} = \frac{1}{\theta^2}$.
> > CRLB $= \dfrac{\theta^2}{n}$. Since $\text{Var}(\bar{X}) = \theta^2/n$, the sample mean $\bar{X}$ is efficient.
