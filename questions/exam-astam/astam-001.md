---
id: "astam-001"
exam: "Exam ASTAM"
topic: "Chi-Square Goodness-of-Fit Test"
learning_objective: "Construction and Selection of Parametric Models"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Approximate+Confidence+Interval
  - Concepts/Poisson+Distribution
  - Concepts/Chi-Square+Goodness-of-Fit+Test
  - Concepts/Kolmogorov-Smirnov+Test
  - Concepts/Hypothesis+Testing
  - Concepts/Model+Selection
  - Concepts/Severity
points: 4
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cc5aed2285a0c59246f3ff3ede454a89b1a6241413eecf9efe285830fd2b7c79
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-001.md
---

Santiago Substandard Auto Company (SSAC) sells automobile insurance to drivers with bad driving records. Each policy only covers one automobile.

During 2021, SSAC had 10,000 policies. There were no deductibles, no upper limit, and no coinsurance, so that each policy covered 100% of all losses.

During 2021, the number of claims per insured automobile for SSAC was:

| Number of claims in 2021 | Number of Policies |
|---|---|
| 0 | 2400 |
| 1 | 3400 |
| 2 | 2400 |
| 3 | 1500 |
| 4 | 300 |

## Part a

First, assume that the claim frequency is distributed as a Poisson random variable with mean parameter $\lambda$. Calculate the 90% linear confidence interval for $\lambda$ based on the above data.

### Explanation

$$\hat{\lambda} = \bar{X} = \frac{3400 + (2)(2400) + (3)(1500) + (4)(300)}{10{,}000} = 1.39$$

$$Var[\hat{\lambda}] = \frac{\hat{\lambda}}{n} = \frac{1.39}{10{,}000} = 0.000139$$

$$\text{90\% CI: } 1.39 \pm 1.645\sqrt{0.000139} = (1.3706, 1.4094)$$

## Part b

Using the Chi-Square Test with a 99% significance level, SSAC wishes to use the data to test the following hypotheses:

- $H_0$: The data is from a Poisson distribution.
- $H_1$: The data is not from a Poisson distribution.

The data for 3 and 4 claims in 2021 are combined for this test.

- (i) Calculate the Chi-Square test statistic.
- (ii) Calculate the $p$-value for this test and state your conclusion with regard to the hypotheses.

### Explanation

Using $\hat{\lambda} = 1.39$ from (a):

| Number of Claims | Observed Number of Policies $(O_j)$ | Expected Number of Policies $E_j$ | $\dfrac{(E_j - O_j)^2}{E_j}$ |
|---|---|---|---|
| 0 | 2400 | $10{,}000e^{-1.39} = 2490.753$ | 3.307 |
| 1 | 3400 | $10{,}000e^{-1.39}(1.39) = 3462.147$ | 1.116 |
| 2 | 2400 | $10{,}000e^{-1.39}(1.39)^2/2 = 2406.192$ | 0.016 |
| 3+ | 1800 | $10{,}000 - 2490.753 - 3462.147 - 2406.192 = 1640.908$ | 15.425 |
| | | $\chi^2$ | **19.864** |

Degrees of freedom: $4 - 1 - 1 = 2$

The $p$-value is $\Pr\left[\chi^2_2 > 19.864\right] = 5\times 10^{-5}$. Since this is very small, it is extremely unlikely that this data came from the Poisson distribution with $\hat{\lambda} = 1.39$, and we reject the null hypothesis.

## Part c

You are given the following claim severity sample from 2021:

200  1000  5000  10,000  100,000

Using the Kolmogorov-Smirnov Test with a 95% significance level, SSAC uses this data to test the following hypotheses:

- $H_0$: The data is from a Pareto distribution with $\alpha = 4$ and $\theta = 75{,}000$.
- $H_1$: The data is not from a Pareto distribution with $\alpha = 4$ and $\theta = 75{,}000$.

- (i) Calculate the Kolmogorov-Smirnov Test statistic.
- (ii) You are given that the 5% critical value for the Kolmogorov-Smirnov test is approximately $\dfrac{1.36}{\sqrt{n}}$.

   State your conclusion.

### Explanation

The K-S test statistic calculations are:

| $x$ | $F_n(x^-)$ | $F_n(x)$ | $F^*(x) = 1 - \left(\dfrac{75{,}000}{75{,}000 + x}\right)^4$ | Absolute Value of Maximum Difference |
|---|---|---|---|---|
| 200 | 0 | 0.2 | $1 - \left(\dfrac{75{,}000}{75{,}200}\right)^4 = 0.01060$ | 0.18940 |
| 1000 | 0.2 | 0.4 | $1 - \left(\dfrac{75{,}000}{76{,}000}\right)^4 = 0.05160$ | 0.34840 |
| 5000 | 0.4 | 0.6 | $1 - \left(\dfrac{75{,}000}{80{,}000}\right)^4 = 0.22752$ | 0.37248 |
| 10,000 | 0.6 | 0.8 | $1 - \left(\dfrac{75{,}000}{85{,}000}\right)^4 = 0.39387$ | 0.40613 |
| 100,000 | 0.8 | 1.0 | $1 - \left(\dfrac{75{,}000}{175{,}000}\right)^4 = 0.96626$ | 0.16626 |

The test statistic D is the maximum absolute difference, i.e., $D = 0.40613$.

The critical value is $1.36/\sqrt{5} = 0.6082$. Since $D < 0.6082$, we do not reject $H_0$.

## Part d

In selecting a model, there are two important concepts. The first concept is known as parsimony while the second concept does not have a specific name.

- (i) State the principle of parsimony.
- (ii) State the second concept.
- (iii) Identify the score-based approach that is consistent with parsimony and state why it is consistent.

### Explanation

- (i) Depending on the purpose for which model is to be used, the simplest model that reflects reality is generally preferred.
- (ii) If you try enough models, one will look good, even if it is not.
- (iii) Choose the model with the highest $p$-value under the chi-square goodness-of-fit test. This is consistent with parsimony because the more complex tests have lesser degrees of freedom.
