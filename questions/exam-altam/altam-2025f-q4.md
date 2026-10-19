---
id: "altam-2025f-q4"
exam: "Exam ALTAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Survival Models for Contingent Cash Flows"
difficulty: medium
type: multi-part
year: 2025
session: Fall
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Mortality
  - Concepts/Estimator
  - Concepts/Approximate+Confidence+Interval
  - Concepts/Hypothesis+Testing
points: 10
---

An insurer is analyzing its mortality experience, using the Alive-Dead model, assuming the force of mortality $\mu_x$ is constant within the age range $[x, x+1)$. There are $n$ independent lives in the group.

Let $t_j$ denote the waiting time in $[x, x+1)$ for the $j$-th life in the group, and let $\delta_j = 1$ if the $j$-th life died in $[x, x+1)$, $\delta_j = 0$ otherwise.

You are given that the contribution of the $j$-th life to the likelihood function for $\mu_x$ may be written as $f_j\left(t_j, \delta_j\right) = e^{-t_j\mu_x}\left(\mu_x\right)^{\delta_j}$.

## Part a (5 points)

(i) Briefly describe the circumstances under which $t_j < 1$ and $\delta_j = 0$ for the $j$-th life.

(ii) Write down the equation for log-likelihood function for $\mu_x$ in terms of $t_j$ and $\delta_j$, $j = 1, 2, \cdots, n$.

(iii) Show that the maximum likelihood estimator for $\mu_x$ is $\hat{\mu}_x = \dfrac{d_x}{E_x^c}$, where $E_x^c$ and $d_x$ are functions you should specify.

(iv) Show that $\text{Var}\left[\hat{\mu}_x\right] \approx \dfrac{d_x}{\left(E_x^c\right)^2}$.

### Explanation
**(i)** If $t_j < 1$ and $\delta_j = 0$, then the $j$-th life was between ages $x$ and $x+1$ for some period of the mortality study, but not for the whole year of age, and they did not die whilst in the study – either they entered observation after age $x$ (e.g. bought a policy), or they left observation, but did not die (e.g. surrendered their policy) before age $x+1$.

**(ii)** Let $L$ denote the likelihood function, and let $l$ denote the log-likelihood function.

$$L\left(\mu_x\right) = \prod_{j=1}^n f_{x_j}\left(t_j, \delta_j\right) \;\Rightarrow\; l\left(\mu_x\right) = \sum_{j=1}^n \log\left(f_{x,j}\left(t_j, \delta_j\right)\right) = \sum_{j=1}^n \left(-t_j\mu_x + \delta_j\log\left(\mu_x\right)\right)$$

$$\Rightarrow l\left(\mu_x\right) = -\left(\sum_{j=1}^n t_j\right)\mu_x + \left(\sum_{j=1}^n \delta_j\right)\log\left(\mu_x\right)$$

**(iii)** We find the MLE by differentiating $l(\mu)$ and setting it equal to 0. Let $E_x^c = \sum_{j=1}^n t_j$ and let $d_x = \sum_{j=1}^n \delta_j$. Then we have

$$l\left(\mu_x\right) = -E_x^c\,\mu_x + d_x\log\left(\mu_x\right) \;\Rightarrow\; l'\left(\mu_x\right) = -E_x^c + \frac{d_x}{\mu_x}$$

$$\Rightarrow l'\left(\hat{\mu}_x\right) = 0 \Leftrightarrow \hat{\mu}_x = \frac{d_x}{E_x^c}$$

**(iv)** We estimate the asymptotic variance of the MLE by differentiating $l\left(\mu_x\right)$ twice, and using $Var\left[\hat{\mu}_x\right] \approx -\dfrac{1}{l''\left(\hat{\mu}_x\right)}$. From (a)(iii) we have

$$l'\left(\mu_x\right) = -E_x^c + \frac{d_x}{\mu_x} \;\Rightarrow\; l''\left(\mu_x\right) = -\frac{d_x}{\mu_x^2} \;\Rightarrow\; -\frac{1}{l''\left(\hat{\mu}_x\right)} = \frac{\hat{\mu}_x^2}{d_x}$$

$$\Rightarrow Var\left[\hat{\mu}_x\right] \approx \frac{d_x^2}{\left(E_x^c\right)^2} \times \frac{1}{d_x} = \frac{d_x}{\left(E_x^c\right)^2}$$

### Examiner Report
1. Generally, candidates knew how to estimate forces of mortality from the data, but most were not able to derive the MLE.
2. Many candidates omitted this question entirely. This is an important part of the syllabus, and the derivations are relatively intuitive and are quite short.
3. In this question candidates were given the form of the individual joint probability function for the j-th life. In past exam papers, candidates were expected to know or construct this.
4. Some candidates lost points by not reading the question carefully, particularly in (a)(ii) and (iii). It is very good practice in this exam to read each question several times as you work through it, to ensure that you are answering the question asked as fully as possible, using the information given.
5. In part (a)(i), most candidates earned most of the credit, but many did not answer the full question. The question asked about a single individual with $t_j < 1$ and $\delta_j = 0$. Many candidates suggested that this individual both died and didn't die in the age year x to x+1. Others only explained one of the two variables, not both.
6. Part (a)(ii) was done reasonably well. In (a)(ii) the question asked for the log-likelihood function for the data from a set of n lives. Some candidates lost points by using only one life, not all n lives.
7. Part (a)(iii) was done reasonably well by those who attempted it. For full credit, candidates were required to define $E_x^c$ and $d_x$ explicitly, as instructed in the question.
8. Part (a)(iv) was skipped by most candidates. Those who made a substantive attempt generally earned full points.

## Part b (1 point)

The following data have been collected for age 65 for two different policy lines. Assume all lives are independent.

| $x$ | Line A: $E_x^c$ | Line A: $d_x$ | Line B: $E_x^c$ | Line B: $d_x$ |
|---|---|---|---|---|
| 65 | 150,150 | 1,550 | 18,070 | 132 |

(i) Calculate $\hat{\mu}_{65}$ for each line.

(ii) Estimate the standard deviation of $\hat{\mu}_{65}$ for each line.

### Explanation
Let $\sigma_A^2$ denote the approximate variance of $\hat{\mu}_x^A$, and similarly for Line B. Then

$$\hat{\mu}_{65}^A = \frac{1550}{150150} = 0.01032; \qquad \sigma_A^2 \approx \frac{1550}{150150^2} = 6.875 \times 10^{-8} = 0.00026^2$$

$$\hat{\mu}_{65}^B = \frac{132}{18070} = 0.00730; \qquad \sigma_B^2 \approx \frac{132}{18070^2} = 4.043 \times 10^{-7} = 0.00064^2$$

### Examiner Report
9. Part (b) was a gift to candidates. Almost all (who did not omit the question) earned the full point. A few lost a fraction of a point by only calculating the variance when the question asked for the standard deviation.

## Part c (2 points)

Show that the age 65 forces of mortality for the two lines are significantly different from each other, at a 95% confidence level.

### Explanation
From asymptotic MLE properties, $\hat{\mu}_{65}^A - \hat{\mu}_{65}^B$ is approximately Normally distributed, with variance equal to the sum of the individual MLE variances.

We approximate this variance by $\sigma_A^2 + \sigma_B^2 = 4.3 \times 10^{-7} = 0.00069^2$. Hence, a 95% CI for $\mu_{65}^A - \mu_{65}^B$ is

$$\left(\left(\hat{\mu}_x^A - \hat{\mu}_x^B\right) \pm 1.95(0.00069)\right) = (0.0017,\ 0.0044).$$

As this CI does not contain 0, at the 95% confidence level the null hypothesis of equal forces is rejected.

### Examiner Report
10. Part (c) was omitted by many candidates. Most candidates who attempted it used an intuitive heuristic, calculating confidence intervals for both estimates, and checking for overlap. This approach earned substantial partial credit. For full credit, candidates needed to use the (estimated) variance of the difference between the random variables to assess whether the difference is significantly different to zero.

## Part d (2 points)

Write down three possible reasons why the mortality experience of the two lines might be significantly different from each other.

### Explanation
Some possible answers:

1. Different business lines and self selection: We expect purchasers of life insurance to have heavier mortality than purchasers of annuities or other contracts with significant survivor benefits. Line A might be data from whole life insurance policyholders, and line B could be annuity purchasers.
2. Different underwriting standards – for example, Line B might be more strictly underwritten to include only 'preferred lives' i.e. lives with low mortality risk based on standard rating factors (smoking, health history, family health history), while Line A might be 'Normal' lives with higher mortality.
3. Different populations by geography – mortality varies by country and even by intra-national regions.
4. Different populations by socio-economic status. Higher income/socio-economic status is associated with lower mortality. So, for example, Line B could be more commonly purchased by higher income policyholders (perhaps an investment type product with a high minimum premium) compared with Line A, leading to lower mortality experience.

### Examiner Report
11. Part (d) was done well by those who did not skip it.
