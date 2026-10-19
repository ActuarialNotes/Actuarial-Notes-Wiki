---
id: "astam-018"
exam: "Exam ASTAM"
topic: "BIC"
learning_objective: "Construction and Selection of Parametric Models"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/BIC
  - Concepts/Likelihood+Ratio+Test
  - Concepts/Chi-Square+Goodness-of-Fit+Test
  - Concepts/Hypothesis+Testing
  - Concepts/Frequency
  - Concepts/Maximum+Likelihood+Estimation
points: 5
---

A claims study examines the frequency of automobile claims among 400 policies. An actuarial assistant has fit several frequency models (including Zero-Modified distributions) to the claims data using Maximum Likelihood Estimation. Summarized results are shown below.

| | Poisson | ZM Poisson | Geometric | ZM Geometric | Neg Binomial | ZM Neg Binomial |
|---|---|---|---|---|---|---|
| **Parameters** | 1 | 2 | 1 | 2 | 2 | 3 |
| **$p_0$** | | 0.5625 | | 0.5625 | | 0.5625 |
| **$\lambda$** | 0.6175 | 0.7339 | | | | |
| **$r$** | | | | | 2.1894 | 0.4963 |
| **$\beta$** | | | 0.6175 | 0.4114 | 0.2853 | 0.5715 |
| **Log-Likelihood function** | -427.8 | -426.2 | -430.2 | -423.2 | -424.5 | -423.1 |
| **SBC Statistic** | -430.8 | -432.2 | -433.2 | -429.2 | -430.5 | -432.0 |
| **$\chi^2$ Statistic** | 6.07 | 3.29 | 14.53 | 1.26 | 5.15 | 1.14 |
| **$\chi^2$ Degrees of Freedom** | 2 | 1 | 3 | 1 | 1 | 1 |
| **$\chi^2$ P-value** | | | | | | |

## Part a

Describe how the SBC statistic is calculated and verify the calculation of the SBC for the Negative Binomial model.

### Explanation

The SBC = the maximum value of the Log Likelihood function less the log of the sample size times one half the number of parameters.

The Neg Binomial has two parameters therefore

$$
SBC = l(\theta) - \frac{2}{2}\ln 400 = -424.5 - 5.99 = 30.49
$$

## Part b

Perform a Likelihood ratio test to compare the ZM Poisson to the Poisson.

$H_0$: population is a Poisson

$H_1$: population is a ZM Poison

### Explanation

$$
\begin{align*}
T &= 2\ln(L_1) - 2\ln(L_0) \\
&= 2(-426.2 + 427.8) \\
&= 3.2
\end{align*}
$$

If $H_1$ is true then the test stat follows a Chi-Squared with 1 degree of freedom. We have $T = 3.2 < 3.841 = \chi^2_{0.95}$ and therefore we do not reject $H_0$.

## Part c

Give ranges for the $\chi^2$ test p-values for each model.

### Explanation

| | Poisson | ZM Poisson | Geometric | ZM Geometric | Neg Binomial | ZM Neg Binomial |
|---|---|---|---|---|---|---|
| $\chi^2$ Statistic | 6.07 | 3.29 | 14.53 | 1.26 | 5.15 | 1.14 |
| $\chi^2$ Degrees of Freedom | 2 | 1 | 3 | 1 | 1 | 1 |
| $\chi^2$ P-value | 2.5%-5% | 5-10% | <0.5% | 10-90% | 1-2.5% | 10-90% |

## Part d

What other criteria could be used to select a potential model?

### Explanation

Possible answers

- Graphing
- Experience with similar populations
- Likelihood ratio test between similar models
- Simplicity to program/use/explain

The Kolmogorov Smirnov test is meant for continuous distribution so not applicable

## Part e

Using the above scores and any other criteria, pick a preferred model and justify your choice.

### Explanation

Possible choices

- Geometric based on SBC, simplicity
- ZM Neg Binomial based on likelihood, Chi-squared test
