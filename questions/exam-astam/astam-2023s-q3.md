---
id: "astam-2023s-q3"
exam: "Exam ASTAM"
topic: "Bühlmann-Straub Credibility"
learning_objective: "Credibility"
difficulty: medium
type: multi-part
year: 2023
session: Spring
wiki_link:
  - Concepts/Bühlmann-Straub+Credibility
  - Concepts/Empirical+Bayes+Credibility
  - Concepts/Bayesian+Estimation
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Credibility
points: 11
---

You are given that, under nonparametric empirical Bayes parameter estimation for the Bühlmann-Straub credibility model, $X_{ij}$ denotes the claim frequency from risk group $i$ in year $j$, and

$$
\mathrm{Var}\left[X_{ij} \mid \theta_i\right] = \frac{v(\theta_i)}{m_{ij}}.
$$

## Part a (2 points)

- (i) Interpret the $m_{ij}$ term.
- (ii) Interpret $\theta_i$.

### Explanation
**(i)** The $m_{i,j}$ term is a measure of exposure, or volume of data, associated with $X_{ij}$ – that is, associated with from risk group $i$ in year $j$. It is assumed to be known.

**(ii)** The $\theta_i$ term represents the unknown risk factors associated with risk group $i$. It may be interpreted in a Bayesian sense as the unknown parameter vector of an underlying distribution. It is treated as a random variable in the Bühlmann-Straub model.

### Examiner Report
The descriptions in (a) are more comprehensive than was required for full credit. For (i) it was sufficient to say that $m_{i,j}$ is a measure of volume or exposure for policyholder (or risk group) i in year j. For (ii) it is sufficient to say that $\theta_i$ is a random risk parameter associated with risk group/policyholder i. Explanations needed to be coherent and correct. Only the best candidates were able to give a correct and coherent interpretation of both parameters.

## Part b (3 points)

An insurer issues auto insurance policies through two different brokers, Broker A and Broker B. Claim frequency data from the last three years is given in the following table. There were no policies issued through Broker B in Year 1.

| Risk Group | | Year 1 | Year 2 | Year 3 | Total |
|---|---|---|---|---|---|
| Broker A | Number of Claims | 39 | 28 | 15 | **82** |
| | Number of Policies | 200 | 150 | 180 | **530** |
| Broker B | Number of Claims | n/a | 16 | 23 | **39** |
| | Number of Policies | n/a | 50 | 60 | **110** |

Assume first that the insurer models the claim frequency for the two groups using Bühlmann-Straub credibility, with nonparametric empirical Bayes parameter estimation.

- (i) Show that $\hat{v}$ is 0.5 to the nearest 0.1. You should calculate the value to the nearest 0.001.
- (ii) Show that $\hat{a}$ is 0.017 to the nearest 0.001. You should calculate the value to the nearest 0.0001.

### Explanation
**(i)** From the formula sheet:

$$
\hat{v} = \frac{\sum_{i=1}^{r}\sum_{j=1}^{n_i} m_{ij}\left(X_{ij} - \bar{X}_i\right)^2}{\sum_{i=1}^{r}(n_i - 1)}
$$

where

$$
X_{1,1} = \frac{39}{200} = 0.195;\quad X_{1,2} = 0.18667;\quad X_{1,3} = 0.0833;\quad X_{2,2} = 0.320;\quad X_{2,3} = 0.3833
$$

$$
\bar{X}_1 = \frac{82}{530} = 0.15472;\quad \bar{X}_2 = \frac{39}{110} = 0.35454;\quad n_1 = 3;\quad n_2 = 2
$$

$$
\begin{align*}
\sum_{j=1}^{3} m_{1,j}\left(X_{1,j} - \bar{X}_1\right)^2 &= 200(0.195 - 0.15472)^2 + 150(0.18667 - 0.15472)^2 \\
&\quad + 180(0.08333 - 0.15472)^2 \\
&= 1.39487 \\
\sum_{j=2}^{3} m_{2,j}\left(X_{2,j} - \bar{X}_2\right)^2 &= 50(0.32 - 0.35454)^2 + 60(0.38333 - 0.35454)^2 \\
&= 0.109394 \\
\Rightarrow \hat{v} &= \frac{1.50427}{3} \\
                    &= 0.5014
\end{align*}
$$

**(ii)** From the formula sheet

$$
\hat{a} = \frac{\sum_{i=1}^{r} m_i\left(\bar{X}_i - \bar{X}\right)^2 - \hat{v}(r-1)}{m - \frac{1}{m}\sum_{i=1}^{r} m_i^2}
$$

$$
m_1 = 530;\quad m_2 = 110;\quad m = 640;\quad \bar{X} = \frac{82 + 39}{530 + 110} = 0.18906
$$

$$
\begin{align*}
\Rightarrow \hat{a} &= \frac{530(0.15472 - 0.18906)^2 + 110(0.35454 - 0.18906)^2 - 0.5014}{640 - \left(\dfrac{530^2 + 110^2}{640}\right)} \\
&= \frac{3.13608}{182.1875} \\
 &= 0.017213
\end{align*}
$$

### Examiner Report
Part (b) was omitted by a significant minority of candidates, but those who attempted it generally achieved the majority of the available points.

## Part c (3 points)

Calculate the Bühlmann-Straub credibility estimate of the expected claim frequency for an individual policy issued through Broker B in Year 4.

### Explanation
$$
P = Z_2\bar{X}_2 + (1 - Z_2)\hat{\mu}
$$

$$
Z_2 = \frac{m_2}{m_2 + \hat{v}/\hat{a}} = 0.7906;\quad Z_1 = \frac{m_1}{m_1 + \hat{v}/\hat{a}} = 0.9479
$$

From the formula sheet:

$$
\hat{\mu} = \frac{\sum_{i=1}^{2} Z_i\bar{X}_i}{\sum_{i=1}^{2} Z_i} = 0.24559
$$

$$
\Rightarrow P = 0.7906 \times 0.35455 + 0.2094 \times 0.24559 = 0.33173
$$

### Examiner Report
In part (c) the majority of the candidates mistakenly used $\bar{X}$ as the estimate of $\hat{\mu}$ for part (c). (It is possible that candidates were confusing the Buhlmann and Buhlmann-Straub credibility models.) Partial credit was given to candidates making this mistake.

## Part d (3 points)

Now assume that the insurer models the claim frequency for each group using a Poisson distribution. You are given the following information:

- The Poisson parameter for each broker is estimated by maximum likelihood, based on the data above.
- In year 4 it is assumed that for a randomly selected policy, there is a 75% probability that the policy was issued through Broker A, and a 25% probability that the policy was issued through Broker B.
- A randomly selected policy had two claims in Year 2 and two claims in Year 3.

(i) Show that the posterior probability that this policy was issued through Broker B is 0.86 to the nearest 0.01. You should calculate the value to the nearest 0.001.

(ii) Calculate the Bayesian estimate of the expected claim frequency for this policy in year 4.

### Explanation
Let $\pi(A \mid \underline{X})$ and $\pi(B \mid \underline{X})$ denote the posterior probabilities for Broker A and B, given a claims history $\underline{X} = (2, 2)$.

**(i)**

$$
\hat{\lambda}_A = \frac{82}{530} = 0.15472;\quad \hat{\lambda}_B = \frac{39}{110} = 0.35454
$$

$$
\pi(A \mid \underline{X}) = \frac{p(\underline{X} \mid A)\,\pi(A)}{p(\underline{X})};\quad \pi(B \mid \underline{X}) = \frac{p(\underline{X} \mid B)\,\pi(B)}{p(\underline{X})}
$$

where $\pi(A) = 0.75$; $\pi(B) = 0.25$

$$
\begin{align*}
p(\underline{X} \mid A)\,\pi(A) &= \left(\frac{\hat{\lambda}_A^2 e^{-\hat{\lambda}_A}}{2}\right)^2 \times 0.75 \\
&= 0.00010513 \times 0.75 \\
                                &= 7.8844 \times 10^{-5} \\
p(\underline{X} \mid B)\,\pi(B) &= \left(\frac{\hat{\lambda}_B^2 e^{-\hat{\lambda}_B}}{2}\right)^2 \times 0.25 \\
&= 0.0019439 \times 0.25 \\
                                &= 4.8597 \times 10^{-4} \\
\Rightarrow \pi(B \mid \underline{X}) &= \frac{4.8597 \times 10^{-4}}{7.8844 \times 10^{-5} + 4.8597 \times 10^{-4}} \\
                                      &= 0.8604
\end{align*}
$$

**(ii)**

$$
\begin{align*}
P &= (1 - 0.8604)\hat{\lambda}_A + 0.8604\,\hat{\lambda}_B \\
&= 0.32665
\end{align*}
$$

### Examiner Report
Most candidates attempting part (d) did relatively well, earning most or all of the available points, though many candidates omitted this part.
