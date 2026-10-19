---
id: "astam-012"
exam: "Exam ASTAM"
topic: "Model Selection"
learning_objective: "Construction and Selection of Parametric Models"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Model+Selection
  - Concepts/BIC
  - Concepts/Hypothesis+Testing
  - Concepts/Pareto+Distribution
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Fisher+Information
points: 5
---

You are the actuary with the task of fitting a loss model to a set of 533 observed claims, over a two-year period, from a portfolio of liability insurance policies with very long tails. There is no censoring or truncation in the observed claims.

You are thinking of fitting a Burr XII model with distribution function of the form

$$F(x) = 1 - \left(\frac{\theta}{\theta + x^\gamma}\right)^\alpha, \quad x > 0,$$

where the parameters $\theta$, $\gamma$, $\alpha$ are all positive. Observe that the Pareto model is a special case of this model where the parameter $\gamma$ is fixed at 1.

You fitted both the Burr XII and the Pareto models to the data and the maximum likelihood estimates together with other useful statistics are given:

| Model | Parameters | Estimates (MLE) | Standard errors | Log-likelihood |
|---|---|---|---|---|
| Pareto | $\alpha$ | 1.1819 | 0.1115 | –3515.941 |
| | $\theta$ | 136.6418 | 21.1313 | |
| Burr XII | $\alpha$ | 1.1931 | 0.2019 | –3526.253 |
| | $\theta$ | 138.6682 | 36.5152 | |
| | $\gamma$ | 0.9956 | 0.0639 | |

## Part a

Briefly describe four steps you would follow to use the data to select a parametric loss model for the severity.

### Explanation
The following procedure would be typical for insurance loss data model selection:

- (i) Conduct preliminary investigation, such as histogram, summary statistics, of raw data;
- (ii) Construct empirical distributions (eg use Kaplan-Meier for truncated/censored data);
- (iii) Construct pictures such as $q$-$q$ or $p$-$p$ plots;
- (iv) Conduct hypothesis tests: Kolmogorov-Smirnoff test, chi-square goodness-of-fit test;
- (v) Calculate other criterion statistics such as SBC/BIC and AIC.

In addition, some other considerations to make include: (i) keep it simple if at all possible, and (ii) restrict the universe of potential models.

## Part b

Explain what the standard errors are in the table above, how these are to be used, and how they have been calculated.

### Explanation
The standard errors of the parameter estimates provide measure of the degree of accuracy of parameter estimates. Generally, it is preferred to have smaller standard errors. They can also be used for confidence intervals, the likely range of values of the parameter values. Standard errors can be evaluated based on the second derivative of the optimal value of the loglikelihood function, called the information matrix or the Hessian matrix.

## Part c

Conduct a hypothesis test to examine whether $\gamma = 1$ based on the model estimates in the Burr XII model.

### Explanation
To test the null $H_0\!: \gamma = 1$, one can approximate the test statistic:

$$\frac{\hat{\gamma} - 1}{se(\hat{\gamma})} = \frac{0.9956 - 1}{0.0638} = -0.06886$$

and if this is more than 2 (in absolute value, assuming two-sided test), then one can safely reject the null hypothesis. In this case, the test statistic is quite small so that we will not be able to reject the null hypothesis that the claims data may come from a Pareto.

## Part d

Calculate the Schwarz Bayesian Criterion (SBC) for each model. Explain what this criterion is used for and how you would choose between the Pareto and the Burr XII model based on this criterion.

### Explanation
There are several hypothesis tests that can be considered to examine the goodness-of-fit of the data to the model being investigated. However, these tests generally fail to account for the number of parameters and the sample size. Alternatively, you may use the SBC statistic defined by $\ell - (r/2)\log(n)$ where $\ell$ is the log of the likelihood at the maximum, $r$ is the number of parameters estimated, and $n$ is the sample size. Generally we prefer a model with a larger SBC score. For the Pareto model, we have

$$\text{SBC(Pareto)} = -3515.941 - (2/2)\log(533) = -3522.22,$$

while for the Burr XII model, we have

$$\text{SBC(Burr)} = -3526.253 - (3/2)\log(533) = -3535.67.$$

Because the Pareto yields a larger SBC score, we would prefer this model over the Burr model.

## Part e

Briefly summarize your findings whether the Pareto or the Burr XII is a better model to the data.

### Explanation
All the tests and criterion used indicate that the Pareto model is better than the Burr model for this data. The Pareto, with one fewer parameters, is also a more parsimonious model.
