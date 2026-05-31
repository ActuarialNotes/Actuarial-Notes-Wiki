The **Mean Square Error (MSE)** of an estimator $\hat{\theta}$ measures its **overall accuracy** by combining both variance (spread) and bias (systematic error):

> $$\text{MSE}(\hat{\theta})$$
>
> $$= E\!\left[(\hat{\theta} - \theta)^2\right] = \text{Var}(\hat{\theta}) + \left(\text{Bias}(\hat{\theta})\right)^2$$
>
> $$\text{where } \text{Bias}(\hat{\theta}) = E[\hat{\theta}] - \theta$$

- For an **[[Unbiasedness|unbiased]]** estimator, $\text{MSE}(\hat{\theta}) = \text{Var}(\hat{\theta})$
- **Bias–variance trade-off**: a slightly biased estimator can have lower MSE than an unbiased one if its variance is sufficiently reduced
- The **root mean square error (RMSE)** $= \sqrt{\text{MSE}}$ is in the same units as $\theta$
- In actuarial credibility, the [[Credibility Theory|credibility estimator]] is chosen to minimize MSE

> [!example]- MSE of a Biased Estimator {Example}
> For $X_i \stackrel{\text{iid}}{\sim} N(\mu, \sigma^2)$, compare the MSE of $S^2 = \frac{1}{n-1}\sum(X_i-\bar{X})^2$ (unbiased) and $\hat{\sigma}^2 = \frac{1}{n}\sum(X_i-\bar{X})^2$ (biased MLE).
>
> > [!answer]-
> > $E[S^2] = \sigma^2$ so $\text{Bias}(S^2) = 0$ and $\text{MSE}(S^2) = \text{Var}(S^2) = \dfrac{2\sigma^4}{n-1}$.
> >
> > $E[\hat{\sigma}^2] = \frac{n-1}{n}\sigma^2$ so $\text{Bias}(\hat{\sigma}^2) = -\frac{\sigma^2}{n}$ and
> > $$\text{MSE}(\hat{\sigma}^2) = \frac{2(n-1)\sigma^4}{n^2} + \frac{\sigma^4}{n^2} = \frac{(2n-1)\sigma^4}{n^2}$$
> > For $n > 1$, $\text{MSE}(\hat{\sigma}^2) < \text{MSE}(S^2)$, so the biased MLE has smaller MSE despite being biased.
