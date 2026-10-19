---
id: "astam-2025f-q6"
exam: "Exam ASTAM"
topic: "Aggregate Loss Model"
learning_objective: "Aggregate Models"
difficulty: medium
type: multi-part
year: 2025
session: Fall
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Normal+Approximation
  - Concepts/Lognormal+Distribution
  - Concepts/Risk+Measure
  - Concepts/Severity+Discretization
  - Concepts/Negative+Binomial+Distribution
points: 9
---

Claims from an insurance portfolio have a compound distribution. The primary distribution is negative binomial, with parameters $r = 5$ and $\beta = 3$. The secondary distribution is gamma with parameters $\alpha = 0.035$ and $\theta = 36{,}000$.

## Part a (2 points)

(i) Show that the mean of the aggregate distribution is 19,000 to the nearest 1,000. You should calculate the value to the nearest 10.

(ii) Show that the standard deviation of the aggregate distribution is 28,000 to the nearest 1,000. You should calculate the value to the nearest 10.

### Explanation

(i)

$$E[S] = E[N]E[Y_j]$$

$$E[N] = r\beta = 15; \qquad E[Y_j] = \alpha\theta = 1260$$

$$\Rightarrow E[S] = 15(1260) = \mathbf{18{,}900}$$

(ii)

$$V[S] = E[N]V[Y_j] + V[N]E[Y_j]^2$$

$$V[Y_j] = \alpha\theta^2 = 45{,}360{,}000; \qquad V[N] = r\beta(1 + \beta) = 60$$

$$\Rightarrow V[S] = 775{,}656{,}000 \Rightarrow SD[S] = \mathbf{27{,}850.60}$$

### Examiner Report

Examiners' Comments

1. The examiners expected candidates to find this question to be one of the easiest on the exam. Matching moments of distributions is an elementary exercise in introductory statistics, and all of the formulas required for the moments, and for the Expected Shortfall (ES) calculations were provided in the formula sheet. However, most candidates struggled with all parts of this question other than (a) and (b)(i). Candidates were not familiar with the formulas on the formula sheet, and only a minority were able to fit a lognormal distribution using the first two moments of S.
2. Part (a) and part (b)(i) were done well by almost all candidates who attempted them.

## Part b (2 points)

The insurer first estimates the aggregate distribution using a Normal approximation.

(i) Calculate the 95% Value at Risk (VaR) of the aggregate claims using the Normal approximation.

(ii) Calculate the 95% Expected Shortfall of the aggregate claims using the Normal approximation.

### Explanation

(i) $S \approx Z$, say, where $Z \sim N(\mu, \sigma^2)$ with $\mu = 18{,}900$, $\sigma = 27{,}850.60$

$VaR_{95\%}[Z] = Q$, say, where $\Pr[Z \le Q] = 0.95$

$$\Rightarrow \Phi\left(\frac{Q - \mu}{\sigma}\right) = 0.95 \Rightarrow \frac{Q - \mu}{\sigma} = 1.64485 \qquad \big(\text{Excel: NORM.S.INV(0.95)}\big)$$

$$\Rightarrow Q = \mu + 1.64485\sigma = \mathbf{64{,}710.16}$$

(ii) From the formula sheet

$$ES_{95\%}(Z) = \mu + \frac{\sigma}{(1 - 0.95)}\phi(z_{0.95})$$

where $\phi$ is the standard normal pdf and $z_\alpha = \Phi^{-1}(\alpha)$

$$
\begin{align*}
\Rightarrow z_{0.95} &= 1.64485 \\
\Rightarrow \phi(z_{0.95}) &= 0.103136 \qquad \text{(Excel: NORM.S.DIST(1.64485,FALSE))} \\
\Rightarrow ES_{95\%}(Z) &= 18{,}900 + \frac{27850.6}{0.05}(0.103136) \\
                         &= \mathbf{76{,}347.8}
\end{align*}
$$

### Examiner Report

3. Part (b)(ii) required candidates to apply the ES formula from the Normal distribution section of the formula sheet. Most candidates identified the correct formula, but did not know the meaning of the $\phi$ term, even though it is defined on the formula sheet as the pdf of the N(0,1) distribution. Familiarity with the formula sheet is an important part of the preparation for this exam.

## Part c (3 points)

The insurer then estimates the aggregate distribution using a lognormal approximation, with parameters $\mu^*$ and $\sigma^*$ fitted by matching moments.

(i) Show that $\sigma^* = 1.1$ to the nearest 0.1. You should calculate the value to the nearest 0.001.

(ii) Calculate the 95% Value at Risk (VaR) of the aggregate claims using the lognormal approximation.

(iii) Calculate the 95% Expected Shortfall of the aggregate claims using the lognormal approximation.

### Explanation

(i) Now we assume $S \approx W$ where $W \sim \text{LogN}(\mu^*, \sigma^*)$. We find $\mu^*$ and $\sigma^*$ by matching two moments of $S$ to two moments of $L$. From the formula sheet we have:

$$E[W] = e^{\mu^* + (\sigma^*)^2/2} = 18{,}900 \Rightarrow \mu^* + (\sigma^*)^2/2 = \ln(18900) = 9.84692$$

$$E\left[W^2\right] = e^{2\mu^* + 2(\sigma^*)^2} = V[S] + E[S]^2 = 1{,}132{,}866{,}000 \Rightarrow 2\mu^* + 2(\sigma^*)^2 = 20.84801$$

$$
\begin{align*}
\Rightarrow (\sigma^*)^2 &= 20.84801 - 2(9.84692) \\
                         &= 1.15418 \\
\Rightarrow \sigma^* &= \mathbf{1.074329}
\end{align*}
$$

(ii) We need Q such that $\Pr[W \le Q] = 0.95$, which means we first need to find $\mu^*$.

We know that $\mu^* + (\sigma^*)^2 = 9.84692 \Rightarrow \mu^* = 9.84692 - 1.15418/2 = 9.2699$. So we have

$$
\begin{align*}
\Pr[W \le Q] = 0.95 &\Rightarrow \Phi\left(\frac{\log Q - \mu^*}{\sigma^*}\right) = 0.95 \\
&\Rightarrow \frac{\log Q - \mu^*}{\sigma^*} = 1.64485 \\
&\Rightarrow Q = \exp(\mu^* + 1.64485\sigma^*) = \mathbf{62{,}127.2}
\end{align*}
$$

(iii) From the formula sheet:

$$
\begin{align*}
ES_{95\%}(W) &= \frac{E[W]}{0.05}\Phi\left(z_{0.05} + \sigma^*\right) \\
             &= \frac{18900}{0.05}\Phi(-1.64485 + 1.07433) \\
&= \mathbf{107{,}412.8}
\end{align*}
$$

### Examiner Report

4. Part (c)(i) required candidates to find the two lognormal parameters given the distribution mean and variance. The formulas for the lognormal moments are given on the formula sheet. Nevertheless, only a minority of candidates were able to solve for $\sigma^*$. Candidates who were not able to do so could have used given value of $\sigma^*$ to find $\mu^*$ for parts (c)(ii) and (c)(iii), but very few did so.
5. Although the solution above uses E[W] and E[W<sup>2</sup>] to find $\sigma^*$, it is also quite straightforward to find it using E[W] and Var[W].
6. A common mistake in (c)(i) was to assume that the mean of the lognormal distribution is $e^{\mu^*}$. In some contexts, the lognormal distribution may be parameterized in this way, but in this exam we always use the more common parameterization, such that the mean is $e^{\mu^* + (\sigma^*)^2/2}$, which is the version given in the formula sheet, and which is the parametrization of the distribution of $e^Z$, where $Z \sim N(\mu, \sigma^2)$.
7. Many candidates who attempted part (c)(iii) made the error of using $z_{0.95} = 1.64485$ in the formula instead of $z_{0.05} = -1.64485$.

## Part d (2 points)

(i) State with reasons which of these two approximations is expected to give a more accurate approximation of the 95% Expected Shortfall in this case.

(ii) Explain briefly how a more accurate estimate of the Expected Shortfall could be determined based on a discretized severity (secondary) distribution.

### Explanation

(i) The Central Limit Theorem states that the aggregate distribution will converge to a normal distribution as the expected claim frequency increases. In this case we only have 15 expected claims, which is low for applying the Normal Approximation.

We see that the aggregate loss distribution is positively skewed (the mean is less than the standard deviation, even though the distribution is bounded below by 0), but the normal distribution has 0 skewness. This means that the normal distribution will underestimate the right tail probabilities of the aggregate claims.

The lognormal distribution is positively skewed, and is therefore likely to give a better approximation in the tail.

The lognormal estimate of the ES is also significantly larger than the normal approximation, so selecting the lognormal would be a safe side assumption.

(ii) If we discretize the severity distribution, i.e. approximate the gamma distribution with a discrete distribution, then we can use recursions (or Fast Fourier transforms) to determine an approximate full probability distribution for $S$. This method allows for fast calculation and very good accuracy when the discretization is sufficiently fine.

### Examiner Report

8. Part (d)(i) was not done well. It is important to have some understanding of when the normal distribution is likely to be an adequate approximation, and when it is not. Luckily, the central limit theorem helps with that – when we aggregate a sufficiently large number of independent random variables, then the normal distribution will become increasingly accurate. Here though, we have a small number of expected losses, together with a positively skewed distribution, and an instruction that the insurer is particularly interested in the right tail. The lognormal approximation is positively skewed, and the ES value is significantly larger than the ES estimated using the normal distribution. Both facts point to the lognormal likely being a more appropriate approximating distribution in this case.

   Note that full credit for this part did not require the level of explanation given in the model above. It was sufficient for a candidate to note that the underlying distribution is positively skewed, and hence that the right tail risk measure estimated with the lognormal distribution, which is also positively skewed, is likely to be more accurate than the normal distribution, which is not.
9. In practice, neither of these approximations will be very accurate. The point of part (d)(ii) was for candidates to show that they understand that the process of discretizing the severity distribution, and then using recursions (or fast Fourier transforms) to construct an a discretized aggregate distribution is another approach to approximating the underlying aggregate distribution. Very few candidates made this connection.
