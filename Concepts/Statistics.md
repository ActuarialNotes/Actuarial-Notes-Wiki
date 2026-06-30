**Statistics** is the discipline of collecting, summarizing, and drawing inferences about a population from sample data. A **statistic** is any quantity computed from a sample; the most fundamental are the **sample mean** $\bar{X}$ and **sample variance** $S^2$, which estimate the population mean $\mu$ and variance $\sigma^2$.

> $$\bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$$
>
> $$S^2 = \frac{1}{n-1}\sum_{i=1}^n (X_i - \bar{X})^2$$

- Dividing $S^2$ by $n-1$ (rather than $n$) makes it an [[Unbiasedness|unbiased]] estimator of $\sigma^2$
- Every statistic has its own [[Sampling Distribution]], which quantifies how it varies from sample to sample
- **Descriptive** statistics summarize data (mean, variance, quantiles); **inferential** statistics generalize to the population via estimation (e.g. [[Maximum Likelihood Estimation]]) and [[Hypothesis Testing]]
- Statistics builds on [[Probability]]: a probability model for the data is assumed, then its parameters are estimated and tested
- Actuaries use statistics to model claim frequency and severity, set premiums, and quantify reserve uncertainty

> [!example]- Estimating the Mean and Variance of Claim Sizes {Example}
> Five reported claims (in \$$1{,}000$s) are $4, 6, 7, 9, 9$. Estimate the mean and variance of the claim-size distribution.
>
> > [!answer]-
> > $$\bar{X} = \frac{4+6+7+9+9}{5} = \frac{35}{5} = 7$$
> > Sum of squared deviations: $(4-7)^2 + (6-7)^2 + (7-7)^2 + (9-7)^2 + (9-7)^2 = 9 + 1 + 0 + 4 + 4 = 18$.
> > $$S^2 = \frac{18}{5-1} = 4.5$$
> > The estimated mean claim is \$$7{,}000$ with sample variance $4.5$ (in $\$1{,}000^2$ units).

> [!example]- Standard Error of the Sample Mean {Example}
> Using the sample above ($n = 5$, $S^2 = 4.5$), estimate the standard error of $\bar{X}$.
>
> > [!answer]-
> > The standard error estimates the standard deviation of the [[Sampling Distribution]] of $\bar{X}$:
> > $$\text{SE}(\bar{X}) = \frac{S}{\sqrt{n}} = \frac{\sqrt{4.5}}{\sqrt{5}} = \frac{2.121}{2.236} \approx 0.949$$
> > So the mean claim estimate of \$$7{,}000$ carries a standard error of about \$$949$.
