---
id: "astam-2023f-q4"
exam: "Exam ASTAM"
topic: "Bayesian Credibility"
learning_objective: "Credibility"
difficulty: medium
type: multi-part
year: 2023
session: Fall
wiki_link:
  - Concepts/Bayesian+Credibility
  - Concepts/Bayesian+Estimation
  - Concepts/Conjugate+Prior
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Credibility
points: 10
---

For a portfolio of $m$ independent policies, the number of claims in a year for the $i^{th}$ policy, denoted $I_i$, is a Bernoulli random variable with parameter $q$.

Let $n$ denote the total observed number of claims from the portfolio in one year so that $n = \sum_{i=1}^{m} I_i$.

## Part a (3 points)

- (i) Write down the likelihood function in terms of $q$, $n$, and $m$.
- (ii) Show that the maximum likelihood estimate of $q$ is the sample mean, $\hat{q} = \dfrac{n}{m}$.

### Explanation
**(i)**

$$
L(q) = \prod_{i=1}^{m} q^{I_i}(1 - q)^{1 - I_i} = q^n(1 - q)^{m - n}
$$

**(ii)**

$$
l(q) = n\ln q + (m - n)\ln(1 - q)
$$

Take the derivative of $l(q)$ with respect to $q$

$$
l'(q) = \frac{n}{q} - \frac{m - n}{1 - q}
$$

Set equal to zero for MLEs

$$
\frac{n}{\hat{q}} = \frac{m - n}{1 - \hat{q}} \Rightarrow n - \hat{q}n = \hat{q}m - \hat{q}n \Rightarrow \hat{q} = \frac{n}{m}
$$

### Examiner Report
Overall, this question was poorly done.

Most candidates understand the MLE concept and wrote down the derivative of likelihood function and stated that it should equal to zero, even if the likelihood function wasn't correct written. Most common error was to mix up Binomial probability mass function with the likelihood.

## Part b (2 points)

An actuary decides to use a Bayesian approach to model the heterogeneity of the policies. They decide to use the Beta$(2, \beta)$ distribution, with the following density function, as the prior distribution for $q$:

$$
\pi(q) = \beta(\beta + 1)\,q\,(1 - q)^{\beta - 1} \quad \text{where} \quad 0 \le q \le 1;\ \beta > 0
$$

Show that the posterior distribution of $q$ is Beta$(n + 2,\ m + \beta - n)$.

### Explanation
The posterior distribution of $q$ is proportional to the product of the prior density function and the likelihood:

$$
\begin{align*}
\pi_{q|\mathbf{x}}(q) &\propto L(q)\,\pi(q) = \left(q^n(1 - q)^{m - n}\right)\left(\beta(\beta + 1)q(1 - q)^{\beta - 1}\right) \\
&\propto q^{n+1}(1 - q)^{m - n + \beta - 1}
\end{align*}
$$

This is the kernel of a Beta distribution with parameters $n + 2$ and $m - n + \beta$, as required.

### Examiner Report
Most candidates simply wrote down the Beta posterior distribution which is given in the question, instead of proving it, even though the question was asking to "show".

## Part c (2 points)

The Bayes estimate of $q$ under the squared error loss function can be expressed in credibility form as $Z \times \text{sample mean} + (1 - Z) \times \text{prior mean}$.

Show that $Z = \dfrac{m}{m + \beta + 2}$.

### Explanation
The sample mean is $n/m$, the prior mean is $2/(2 + \beta)$, and the Bayes estimate of $q$ under the squared error loss function is the posterior mean of $q$, that is

$$
\begin{align*}
\frac{n + 2}{m + \beta + 2} &= Z\left(\frac{n}{m}\right) + (1 - Z)\frac{2}{\beta + 2} \\
\Rightarrow \frac{m(n + 2)}{m + \beta + 2} &= Zn + \frac{2m}{\beta + 2} - Zm\left(\frac{2}{\beta + 2}\right) && \text{multiply by } m \\
\Rightarrow \frac{m(n + 2)(\beta + 2) - 2m(m + \beta + 2)}{m + \beta + 2} &= Z\big(n(\beta + 2) - 2m\big) && \text{multiply by } (\beta + 2) \text{ and re-arrange} \\
\Rightarrow \left(\frac{m}{m + \beta + 2}\right)\left(\frac{(n + 2)(\beta + 2) - 2(m + \beta + 2)}{n(\beta + 2) - 2m}\right) &= Z && \text{divide by } n(\beta + 2) - 2m \text{ and re-arrange} \\
\Rightarrow \left(\frac{m}{m + \beta + 2}\right)\left(\frac{n(\beta + 2) - 2m}{n(\beta + 2) - 2m}\right) &= Z \\
\Rightarrow \left(\frac{m}{m + \beta + 2}\right) &= Z
\end{align*}
$$

### Examiner Report
For Part (c), using the clue from the question itself, e.g. part (b) the posterior beta mean, and clue from part (c) squared loss function, the credibility factor Z could be solved fairly easily. Unfortunately, the clues from question were ignored by most candidates. A common approach was to calculate from the general form of credibility function (Z=1/(1+v/a)). This approach is do-able but it took too much exam time and almost all of the candidates tried this approach had failed to prove the solution.

## Part d (3 points)

The actuary uses the above Bayesian approach and distributions to analyze two portfolios, A and B, described in the following table:

| Portfolio | Number of policies | Number of claims | $\beta$ |
|---|---|---|---|
| A | 100 | 20 | 20 |
| B | 100 | 10 | 10 |

- (i) For each portfolio, calculate the credibility factor $Z$.
- (ii) For each portfolio, calculate the Bayes estimate of $q$.
- (iii) Interpret the impact of the value of $\beta$ on the credibility factor.

### Explanation
**(i)** We have:

$$
Z_A = \frac{100}{100 + 20 + 2} = 0.820 \qquad Z_B = \frac{100}{100 + 10 + 2} = 0.893
$$

**(ii)** The Bayes estimates are:

$$
\begin{align*}
\tilde{q}_A &= \frac{22}{100 + 20 + 2} \\
            &= 0.180 \\
\text{or: } & 0.820(20/100) + 0.180(2/22) = 0.180 \\
\tilde{q}_B &= \frac{12}{100 + 10 + 2} \\
            &= 0.107 \\
\text{or: } & 0.893(10/100) + 0.107(2/12) = 0.107
\end{align*}
$$

**(iii)** Higher values of $\beta$ generate lower values for the credibility factor. This means less weight is placed on the estimate from the risk itself, and more weight is placed on the prior estimate. A higher $\beta$ indicates more confidence in the prior estimate.

A lower value of $\beta$ means that the prior estimate of $q$ is higher. If we expect a relatively high claim rate, then it makes sense that the credibility factor applied to experience will also be higher.

### Examiner Report
For Part (d), most of the candidates did well on this part, if they remembered the formula correctly.
