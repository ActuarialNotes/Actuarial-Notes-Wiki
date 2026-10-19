---
id: "astam-023"
exam: "Exam ASTAM"
topic: "Bühlmann Credibility"
learning_objective: "Credibility"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Bühlmann+Credibility
  - Concepts/Empirical+Bayes+Credibility
  - Concepts/Expected+Value+of+Process+Variance
  - Concepts/Variance+of+Hypothetical+Means
  - Concepts/Poisson+Distribution
points: 6
---

In a Bühlmann credibility model, you are given that for a portfolio of short-term insurance contracts, the number of claims $X_1, \ldots, X_T$, conditional on $\Theta$, are independent and identically distributed with

hypothetical mean: $\mu(\Theta) = E\left[X_t \mid \Theta\right]$

and

process variance: $\nu(\Theta) = Var\left[X_t \mid \Theta\right]$

Denote the structural parameters by $\mu$ = *pure premium*, $v$ = *expected process variance*, and $a$ = *variance of the hypothetical mean*.

## Part a

Prove that the unconditional variance of $X_t$ is the sum of the expected process variance and the variance of the hypothetical mean, that is,

$$
Var\left[X_t\right] = \nu + a.
$$

### Explanation

First, we note that

$$
\begin{align*}
\mu &= E\left[X_t\right] \\
    &= E\left[E\left[X_t \mid \Theta\right]\right] \\
    &= E[\mu(\Theta)] \\
\nu &= E\left[Var\left[X_t \mid \Theta\right]\right] \\
    &= E[\nu(\Theta)] \\
a &= Var\left[E\left[X_t \mid \Theta\right]\right] \\
  &= Var[\mu(\Theta)]
\end{align*}
$$

From the unconditional variance formula, we have

$$
Var\left[X_t\right] = E\left[Var\left[X_t \mid \Theta\right]\right] + Var\left[E\left[X_t \mid \Theta\right]\right] = \nu + a = \mu + a
$$

## Part b

In the context above, give an expression for the Bühlmann credibility factor $Z$ for the number of claims for a policy observed for $T$ years.

### Explanation

The Bühlmann credibility factor is given by

$$
Z = \frac{T}{T + k} \quad \text{where } k = \frac{E\left[Var\left[X_t \mid \Theta\right]\right]}{Var\left[E\left[X_t \mid \Theta\right]\right]} = \frac{\nu}{a}
$$

## Part c

An insurance company analyzes its portfolio of insurance policies using the Bühlmann credibility model to estimate claim frequency. It assumes that claim frequency for a particular policy, conditional on the mean parameter $\lambda$, is Poisson.

Show that the following equations are true:

(i) $\mu = E[\lambda]$

(ii) $Var\left[X_t\right] = E[\lambda] + Var[\lambda]$

(iii) $a = Var\left[X_t\right] - E\left[X_t\right]$

### Explanation

Here we are given that $X_t \mid \Theta$ is Poisson with mean and variance $E\left[X_t \mid \Theta\right] = Var\left[X_t \mid \Theta\right] = \lambda$. Thus, we have

(i) $\mu = E\left[E\left[X_t \mid \Theta\right]\right] = E[\lambda]$

(ii) $Var\left[X_t\right] = E\left[Var\left[X_t \mid \Theta\right]\right] + Var\left[E\left[X_t \mid \Theta\right]\right] = E[\lambda] + Var[\lambda]$

(iii) $a = Var\left[X_t\right] - E[\lambda] = Var\left[X_t\right] - E\left[X_t\right]$

## Part d

You are given the following claim frequencies for the insurance company's portfolio with one year experience for each policyholder:

| Number of claims | Number of policyholders |
|---|---|
| 0 | 8,416 |
| 1 | 1,427 |
| 2 | 153 |
| 3 | 3 |
| 4 | 1 |
| Total | 10,000 |

Calculate estimates for the structural parameters $\mu$, $\nu$, and $a$.

### Explanation

An unbiased estimate for the sample mean is

$$
\hat{\mu} = \frac{0(8416) + 1(1427) + 2(153) + 3(3) + 4(1)}{10000} = 0.1746
$$

and an unbiased estimate for the sample variance is

$$
\frac{(0 - 0.1746)^2(8416) + (1 - 0.1746)^2(1427) + \ldots + (4 - 0.1746)^2(1)}{10000 - 1} = 0.1777
$$

so that

$\hat{\nu} = 0.1746$ and $\hat{a} = 0.1777 - 0.1746 = 0.0031$.

## Part e

Calculate the estimated Bühlmann credibility factor $Z$. Use it to calculate the estimated credibility premium for the number of claims for each policyholder.

### Explanation

The estimated Bühlmann credibility factor is given by

$$
\hat{Z} = \frac{1}{1 + \left(\hat{\nu}/\hat{a}\right)} = \frac{1}{1 + \left(\frac{0.1746}{0.0031}\right)} = 0.01745
$$

The estimated credibility premium for the number of claims for each policyholder is therefore

$0.01745 X_1 + 0.98255(0.1745)$, where $X_1$, depending on the policyholder, is $0, 1, \ldots, 4$.

## Part f

Explain why only one year's experience per policyholder is needed to estimate Bühlmann credibility factors.

### Explanation

Note that in the case of Poisson, we have $\nu = \mu$ identically, so that only one year's experience per policyholder is needed.
