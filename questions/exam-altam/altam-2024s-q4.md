---
id: "altam-2024s-q4"
exam: "Exam ALTAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Survival Models for Contingent Cash Flows"
difficulty: hard
type: multi-part
year: 2024
session: Spring
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Transition+Intensity
  - Concepts/Multiple+State+Model
  - Concepts/Estimator
  - Concepts/Approximate+Confidence+Interval
  - Concepts/Long-Term+Care+Insurance
points: 9
---

An insurer is analyzing its long term care insurance data. The objective of the study is to estimate transition intensities for the underlying multiple state model illustrated in the following diagram.

*(Figure: four states — State 0, State 1, State 2 and State 3 — with arrows from State 0 to State 1, State 1 to State 0, State 0 to State 2, State 1 to State 2 and State 2 to State 3.)*

Transition intensities are assumed to be constant over each year of age.

Let $T_x^{(j)}$ denote the total observed waiting time in State $j$ for lives between ages $x$ and $x + 1$, and let $D_x^{ij}$ denote the total number of transitions from State $i$ to State $j$ by lives between ages $x$ and $x + 1$.

## Part a (2 points)

At the start of the two-year observation period, a person age 70.2 is in State 0. At age 71.1 she transitions to State 1, and at age 71.4 she transitions back to State 0. At age 71.9 she transitions to State 2, where she remains until the end of the observation period.

(i) Determine the person's contribution to $T_{70}^{(j)}$ and $T_{71}^{(j)}$ for $j = 0, 1, 2$.

(ii) Write down the person's contribution to $D_{70}^{ij}$ and $D_{71}^{ij}$ for $i, j = 0, 1, 2$, where $i \ne j$.

### Explanation
**(i)**

- Between ages 70 and 71: 0.8 year in State 0
- Between ages 71 and 72: 0.1 year in State 0, then 0.3 year in State 1, then 0.5 year in State 0, then 0.1 year in State 2.

So the contributions are: 0.8 year to $T_{70}^{(0)}$, and 0 year to $T_{70}^{(1)}$ and $T_{70}^{(2)}$

0.6 year to $T_{71}^{(0)}$, 0.3 year to $T_{71}^{(1)}$, and 0.1 year to $T_{71}^{(2)}$

**(ii)** There is a contribution of $+1$ to $D_{71}^{01}$, $D_{71}^{10}$ and $D_{71}^{02}$ (as these are the transitions observed). There are no contributions to any other $D_{71}^{ij}$, nor to any $D_{70}^{ij}$.

### Examiner Report
In general, this question was not well done.

Part a) was well done, but still required careful reading. In particular, years of age had to be considered separately and the person was 70.2 at the beginning of the observation period. Also, all required values, even if zero in this particular case, had to be determined.

## Part b (4 points)

For a given age $x$:

(i) Write down the log-likelihood function for estimating the transition intensities $\mu_x^{ij}$, in terms of $T_x^{(j)}$ and $D_x^{ij}$ for $i, j = 0, 1, 2, 3$ and $i \ne j$.

(ii) Derive the formula for the maximum likelihood estimator of $\mu_x^{01}$.

(iii) State with reasons whether the maximum likelihood estimators, $\hat{\mu}_x^{0j}$, are dependent or independent for different $j$.

(iv) Derive a formula for the standard deviation of the maximum likelihood estimator, $\hat{\mu}_x^{01}$.

### Explanation
**(i)** The likelihood function for all possible transitions during an integer age $x$ is

$$
\begin{align*}
L = {} & \exp\left\{-T_x^{(0)}\left(\mu_x^{01} + \mu_x^{02}\right) - T_x^{(1)}\left(\mu_x^{10} + \mu_x^{12}\right) - T_x^{(2)}\left(\mu_x^{23}\right)\right\} \\
& \times \left\{\left(\mu_x^{01}\right)^{D_x^{01}}\left(\mu_x^{02}\right)^{D_x^{02}}\left(\mu_x^{10}\right)^{D_x^{10}}\left(\mu_x^{12}\right)^{D_x^{12}}\left(\mu_x^{23}\right)^{D_x^{23}}\right\}
\end{align*}
$$

$$
\begin{align*}
\Rightarrow l = \log(L) = {} & -T_x^{(0)}\left(\mu_x^{01} + \mu_x^{02}\right) - T_x^{(1)}\left(\mu_x^{10} + \mu_x^{12}\right) - T_x^{(2)}\left(\mu_x^{23}\right) \\
& + D_x^{01}\log\mu_x^{01} + D_x^{02}\log\mu_x^{02} + D_x^{10}\log\mu_x^{10} + D_x^{12}\log\mu_x^{12} + D_x^{23}\log\mu_x^{23}
\end{align*}
$$

OR

$$l = \sum_{i=0}^{3}\left(-T_x^{(i)}\mu_x^{i\bullet} + \sum_{\substack{j=0 \\ j \ne i}}^{3} D_x^{ij}\log\mu_x^{ij}\right)$$

**(ii)**

$$\frac{\partial l}{\partial \mu_x^{01}} = -T_x^{(0)} + \frac{D_x^{01}}{\mu_x^{01}}$$

$$\frac{\partial l}{\partial \mu_x^{01}} = 0 \Rightarrow \hat{\mu}_x^{01} = \frac{D_x^{01}}{T_x^{(0)}}$$

**(iii)** They are independent (for different $j$) because all the cross derivatives with respect to $\mu_x^{ij}$ are 0.

**(iv)** Because the estimators are independent, there are no covariances. The asymptotic variance of the estimator is

$$Var\left(\hat{\mu}_x^{01}\right) \approx -\left(\mathrm{E}\left[\frac{\partial^2 l}{\partial\left(\mu_x^{01}\right)^2}\right]\right)^{-1} = \left(\frac{\mathrm{E}\left[D_x^{01}\right]}{\left(\mu_x^{01}\right)^2}\right)^{-1} = \frac{\left(\mu_x^{01}\right)^2}{\mathrm{E}\left[D_x^{01}\right]}$$

$$\Rightarrow \mathrm{SD}\left(\hat{\mu}_x^{01}\right) \approx \frac{\mu_x^{01}}{\sqrt{\mathrm{E}\left[D_x^{01}\right]}}$$

OR if we substitute observed for expected $D_x^{01}$, and $\hat{\mu}_x^{01}$ for $\mu_x^{01}$, we get

$$\mathrm{SD}\left(\hat{\mu}_x^{01}\right) \approx \frac{\hat{\mu}_x^{01}}{\sqrt{D_x^{01}}} = \frac{D_x^{01}/T_x^{(0)}}{\sqrt{D_x^{01}}} = \frac{\sqrt{D_x^{01}}}{T_x^{(0)}}$$

Or if we substitute partially, as follows, we get

$$Var\left(\hat{\mu}_x^{01}\right) \approx \frac{\left(\mu_x^{01}\right)^2}{\mathrm{E}\left[D_x^{01}\right]} \approx \frac{\mu_x^{01} \times D_x^{01}/T_x^{(0)}}{D_x^{01}} = \frac{\mu_x^{01}}{T_x^{(0)}} \Rightarrow \mathrm{SD}\left(\hat{\mu}_x^{01}\right) \approx \sqrt{\frac{\mu_x^{01}}{T_x^{(0)}}}$$

### Examiner Report
Part b) was not well done at all. Some candidates failed to appreciate the fact that all this part was for the general case, not for the specifics given in part a). In i), this meant that all possible transitions, not just those observed in a), had to be accounted for. In ii), ideally, the estimator was derived from first principles, but partial marks were given for writing down the right expression for the estimator. In iii), very few candidates came up with a valid justification. In iv), as in ii), ideally, the formula was derived from first principles, but partial marks were given for writing down the right expression for the standard deviation.

## Part c (3 points)

You are given the following aggregated information from the study.

| $x$ | $T_x^{(0)}$ | $T_x^{(1)}$ | $T_x^{(2)}$ | $D_x^{01}$ | $D_x^{10}$ | $D_x^{02}$ | $D_x^{12}$ | $D_x^{23}$ |
|---|---|---|---|---|---|---|---|---|
| 70 | 3214.0 | 632.4 | 317.3 | 150 | 42 | 40 | 15 | 20 |
| 71 | 3019.7 | 640.4 | 350.7 | 170 | 40 | 55 | 16 | 30 |

(i) Show that $\hat{\mu}_{70}^{0\bullet} + \hat{\mu}_{71}^{0\bullet}$ is 0.13 to the nearest 0.01. You should calculate the value to the nearest 0.001.

(ii) Calculate ${}_2\hat{p}_{70}^{\overline{00}}$, i.e. the maximum likelihood estimate of ${}_2p_{70}^{\overline{00}}$.

(iii) Calculate an approximate 95% linear confidence interval for $\mu_{70}^{0\bullet} + \mu_{71}^{0\bullet}$.

(iv) Calculate an approximate 95% confidence interval for ${}_2p_{70}^{\overline{00}}$.

### Explanation
**(i)**

$$\hat{\mu}_x^{0\bullet} = \hat{\mu}_x^{01} + \hat{\mu}_x^{02}$$

$$\hat{\mu}_{70}^{01} = \frac{D_{70}^{01}}{T_{70}^{(0)}} = \frac{150}{3214.0} = 0.046671 \qquad \hat{\mu}_{70}^{02} = \frac{D_{70}^{02}}{T_{70}^{(0)}} = \frac{40}{3214.0} = 0.012446$$

$$\hat{\mu}_{70}^{0\bullet} = \hat{\mu}_{70}^{01} + \hat{\mu}_{70}^{02} = 0.046671 + 0.012446 = 0.059116$$

$$\hat{\mu}_{71}^{01} = \frac{D_{71}^{01}}{T_{71}^{(0)}} = \frac{170}{3019.7} = 0.056297 \qquad \hat{\mu}_{71}^{02} = \frac{D_{71}^{02}}{T_{71}^{(0)}} = \frac{55}{3019.7} = 0.018214$$

$$\hat{\mu}_{71}^{0\bullet} = \hat{\mu}_{71}^{01} + \hat{\mu}_{71}^{02} = 0.056297 + 0.018214 = 0.074511$$

$$\hat{\mu}_{70}^{0\bullet} + \hat{\mu}_{71}^{0\bullet} = 0.059116 + 0.074511 = 0.133627 \approx 0.13$$

**(ii)**

$${}_2\hat{p}_{70}^{\overline{00}} = \exp\left\{-\left(\hat{\mu}_{70}^{0\bullet} + \hat{\mu}_{71}^{0\bullet}\right)\right\} = \exp\{-0.133627\} = 0.874916$$

**(iii)** An approximate 95% confidence interval for $\mu_{70}^{0\bullet} + \mu_{71}^{0\bullet}$ is given by

$$\left(\hat{\mu}_{70}^{0\bullet} + \hat{\mu}_{71}^{0\bullet}\right) \pm 1.96\,\mathrm{sd}\left(\hat{\mu}_{70}^{0\bullet} + \hat{\mu}_{71}^{0\bullet}\right)$$

Because of the independence of the estimators,

$$
\begin{align*}
\mathrm{Var}\left(\hat{\mu}_{70}^{0\bullet} + \hat{\mu}_{71}^{0\bullet}\right) &= Var\left(\hat{\mu}_{70}^{01}\right) + Var\left(\hat{\mu}_{70}^{02}\right) + Var\left(\hat{\mu}_{71}^{01}\right) + Var\left(\hat{\mu}_{71}^{02}\right) \\
&\approx \frac{D_{70}^{01}}{\left(T_{70}^{(0)}\right)^2} + \frac{D_{70}^{02}}{\left(T_{70}^{(0)}\right)^2} + \frac{D_{71}^{01}}{\left(T_{71}^{(0)}\right)^2} + \frac{D_{71}^{02}}{\left(T_{71}^{(0)}\right)^2} \\
&= \frac{150}{(3214.0)^2} + \frac{40}{(3214.0)^2} + \frac{170}{(3019.7)^2} + \frac{55}{(3019.7)^2} \\
&= 0.000014521 + 0.000003872 + 0.000018643 + 0.000006032 \\
&= 0.000043068
\end{align*}
$$

(See Examiners' Notes below for alternatives)

Therefore, the confidence interval is given by

$$0.133627 \pm 1.96 \times \sqrt{0.000043068} \approx 0.133627 + 1.96 \times 0.006563$$

$$(0.120764,\ 0.146490)$$

**(iv)** An approximate 95% confidence interval for ${}_2p_{70}^{\overline{00}}$ is given by

$$\left(\exp\{-0.146490\},\ \exp\{-0.120764\}\right) = (0.863734,\ 0.886243)$$

### Examiner Report
For (c) (iii), here are the alternate calculations for the variance.

Using the formula without substitution,

$$
\begin{align*}
\mathrm{Var}\left(\hat{\mu}_{70}^{0\bullet} + \hat{\mu}_{71}^{0\bullet}\right) &= Var\left(\hat{\mu}_{70}^{01}\right) + Var\left(\hat{\mu}_{70}^{02}\right) + Var\left(\hat{\mu}_{71}^{01}\right) + Var\left(\hat{\mu}_{71}^{02}\right) \\
&\approx \frac{\left(\mu_{70}^{01}\right)^2}{\mathrm{E}\left[D_{70}^{01}\right]} + \frac{\left(\mu_{70}^{02}\right)^2}{\mathrm{E}\left[D_{70}^{02}\right]} + \frac{\left(\mu_{71}^{01}\right)^2}{\mathrm{E}\left[D_{71}^{01}\right]} + \frac{\left(\mu_{71}^{02}\right)^2}{\mathrm{E}\left[D_{71}^{02}\right]} \\
&\approx \frac{\left(\hat{\mu}_{70}^{01}\right)^2}{D_{70}^{01}} + \frac{\left(\hat{\mu}_{70}^{02}\right)^2}{D_{70}^{02}} + \frac{\left(\hat{\mu}_{71}^{01}\right)^2}{D_{71}^{01}} + \frac{\left(\hat{\mu}_{71}^{02}\right)^2}{D_{71}^{02}} \\
&= \frac{(0.046671)^2}{150} + \frac{(0.012446)^2}{40} + \frac{(0.056297)^2}{170} + \frac{(0.018214)^2}{55} \\
&= 0.000043068
\end{align*}
$$

Using the formula with partial substitution,

$$
\begin{align*}
\mathrm{Var}\left(\hat{\mu}_{70}^{0\bullet} + \hat{\mu}_{71}^{0\bullet}\right) &= Var\left(\hat{\mu}_{70}^{01}\right) + Var\left(\hat{\mu}_{70}^{02}\right) + Var\left(\hat{\mu}_{71}^{01}\right) + Var\left(\hat{\mu}_{71}^{02}\right) \\
&\approx \frac{\hat{\mu}_{70}^{01}}{T_{70}^{(0)}} + \frac{\hat{\mu}_{70}^{02}}{T_{70}^{(0)}} + \frac{\hat{\mu}_{71}^{01}}{T_{71}^{(0)}} + \frac{\hat{\mu}_{71}^{02}}{T_{71}^{(0)}} \\
&= \frac{0.046671}{3214.0} + \frac{0.012446}{3214.0} + \frac{0.056297}{3019.7} + \frac{0.018214}{3019.7} \\
&= 0.000043068
\end{align*}
$$

Part c) was done somewhat better than b) and was an application of the theoretical results from part b) to the information provided. In i), candidates had to apply the result from b) ii). In ii), the key was to know which function of the sum in i) gave the required probability. In iii), candidates had to apply the combination of the answers to b) iii) and b) iv) to generate the required confidence interval. In iv), the same transformation that led from i) to ii) also led from iii) to iv), except that the lower bound in iii) led to the upper bound in iv).
