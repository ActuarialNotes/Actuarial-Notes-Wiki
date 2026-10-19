---
id: "astam-2023s-q6"
exam: "Exam ASTAM"
topic: "Chain Ladder Method"
learning_objective: "Reserving and Pricing for Short-Term Insurance Coverages"
difficulty: medium
type: multi-part
year: 2023
session: Spring
wiki_link:
  - Concepts/Chain+Ladder+Method
  - Concepts/Over-Dispersed+Poisson+Model
  - Concepts/Unpaid+Claims
  - Concepts/Poisson+Distribution
  - Concepts/Approximate+Confidence+Interval
points: 11
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:382ddea213dc139aa196d5b16b390d1a5d72ed9138e58900fbd6acb2d832ff2a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2023s-q6.md
---

## Part a (2 points)

- (i) Describe the purpose of Outstanding Claim Reserves (OCR).
- (ii) Write down three reasons why there might be a delay between a loss event and the claim settlement.

### Explanation
**(i)** Outstanding Claims Reserves are used to provide for insured losses that have occurred, but which have not been fully settled.

**(ii)** Reasons include:

- Delays in reporting the claim – some claims are reported soon after the loss event (eg auto), bit some may be reported much later, if the damage is not apparent until then (eg medical malpractice).
- Delays in processing the claim – insurer needs to validate the facts, assess the loss, investigate potential recoveries from other parties or from salvage.
- Legal proceedings or disputes about the claim – legal disputes usually involve assignment of responsibility for a loss, or the appropriate amount of loss.

### Examiner Report
Parts (a) and (b) were done well, with many candidates achieving maximum points.

## Part b (2 points)

You are given the following data on cumulative claims, $C_{i,j}$, for accident year (AY) $i$, $i = 0, 1, \dots, 4$, and development year (DY) $j$, $j = 0, 1, \dots, 4$.

| Accident Year $i$ | DY 0 | DY 1 | DY 2 | DY 3 | DY 4 |
|---|---|---|---|---|---|
| 0 | 100 | 120 | 135 | 145 | 158 |
| 1 | 135 | 168 | 190 | 210 | |
| 2 | 175 | 210 | 225 | | |
| 3 | 212 | 265 | | | |
| 4 | 260 | | | | |

Let $X_{i,j}$ denote the incremental claims for AY $i$ in DY $j$.

Use the chain ladder method to calculate the projected incremental claims $\hat{X}_{2,3}$ and $\hat{X}_{2,4}$.

### Explanation
$$
\begin{align*}
\hat{f}_2 &= \frac{355}{325} \\
&= 1.09231 \\
\hat{C}_{2,3} &= 225(1.09231) \\
&= 245.77 \\
\hat{X}_{23} &= 245.8 - 225 \\
&= 20.77 \\
\hat{f}_3 &= \frac{158}{145} \\
&= 1.08966 \\
\hat{C}_{2,4} &= 245.8(1.08966) \\
&= 267.80 \\
\hat{X}_{24} &= 267.8 - 245.8 \\
&= 22.03
\end{align*}
$$

### Examiner Report
Parts (a) and (b) were done well, with many candidates achieving maximum points.

## Part c (3 points)

The Poisson model for outstanding claims assumes that $X_{i,j}$ are independent random variables, with

$$
X_{i,j} \sim \text{Poisson}\left(\mu_i\gamma_j\right), \text{ where } \mu_i > 0,\ \gamma_j > 0, \text{ and } \sum_{j=0}^{4}\gamma_j = 1.
$$

- (i) Show that for any given $i$, $j$, $E\left[C_{i,j}\right] = \mu_i\sum_{k=0}^{j}\gamma_k$ under this model.
- (ii) Interpret the $\mu_i$ parameters.
- (iii) Interpret the $\gamma_j$ parameters.

### Explanation
**(i)**

$$
X_{i,j} \sim \text{Poi}\left(\mu_i\gamma_j\right) \Rightarrow \mathrm{E}\left[X_{i,j}\right] = \mu_i\gamma_j
$$

$$
C_{i,j} = \sum_{k=0}^{j} X_{i,k} \Rightarrow \mathrm{E}\left[C_{i,j}\right] = \sum_{k=0}^{j}\mathrm{E}\left[X_{i,k}\right] = \sum_{k=0}^{j}\mu_i\gamma_k = \mu_i\sum_{k=0}^{j}\gamma_k
$$

**(ii)** Note that the total claims for AY $i$ are $C_{i,4}$, where

$$
\mathrm{E}\left[C_{i,4}\right] = \mu_i\sum_{k=0}^{4}\gamma_k = \mu_i.
$$

Hence, $\mu_i$ represents the expected total claims cost from AY $i$.

**(iii)** Note that the claims paid in DY $j$, arising in AY $i$, are $X_{i,j}$, where $\mathrm{E}\left[X_{i,j}\right] = \mu_i\gamma_j$, and the $\gamma_j$'s sum to 1.0. Hence, $\gamma_j$ represents the expected proportion of the ultimate cumulative claims cost that is paid in DY $j$, for any AY.

### Examiner Report
Around 1/3 of candidates omitted all or most of parts (c), (d) and (e), indicating that they had mastered the deterministic chain ladder material, but not the extension to stochastic models. Of those who attempted (c) and (d), many scored highly, though very few achieved maximum points. Note that the explanations given in the part (b) and (c) solutions above were not required for full credit.

## Part d (3 points)

You are given that the chain ladder method generates the same estimate of projected claims as the Poisson model, with maximum likelihood estimation.

- (i) Use the values in (b) to show that $\hat{\gamma}_3 = 0.0776$ and $\hat{\gamma}_4 = 0.0823$.
- (ii) Calculate the estimated standard deviation of the expected outstanding claims for AY 2.
- (iii) Using a normal approximation, calculate a 95% confidence interval for the expected outstanding claims for AY 2.

### Explanation
**(i)** The MLE of $\mathrm{E}\left[X_{2,3}\right]$ is $\hat{\mu}_2\hat{\gamma}_3$, which is given to be equal to the chain ladder estimate $\hat{X}_{2,3}$. So, from (b), we have $\hat{\mu}_2\hat{\gamma}_3 = 20.77$.

Similarly, we have

$$
\begin{align*}
\hat{C}_{2,4} = \hat{\mu}_2 = 267.80 \text{ (from (b))} &\Rightarrow \hat{\gamma}_3 = \frac{20.77}{267.80} = 0.07756 \\
\hat{X}_{2,4} = \hat{\mu}_2\hat{\gamma}_4 = 22.03 &\Rightarrow \hat{\gamma}_4 = \frac{22.03}{267.80} = 0.08226
\end{align*}
$$

**(ii)** The sum of Poisson RVs is also Poisson, with parameter equal to the sum of the individual Poisson parameters. The outstanding claims for AY 2 are

$$
X_{2,3} + X_{2,4} \sim Poi\left(\mu_2(\gamma_3 + \gamma_4)\right)
$$

$$
\Rightarrow SD\left[X_{2,3} + X_{2,4}\right] \approx \sqrt{\hat{\mu}_2\left(\hat{\gamma}_3 + \hat{\gamma}_4\right)} \approx \sqrt{20.77 + 22.03} = 6.542
$$

**(iii)** The approximate 95% CI is

$$
42.80 \pm 1.96(6.542) = [29.98,\ 55.62]
$$

## Part e (1 point)

Your colleague notes that:

"The chain ladder estimate gives the same outstanding claims estimate as the Poisson model, so that the chain ladder model is the same as the Poisson model."

Critique your colleague's remarks.

### Explanation
The Poisson model provides a distributional model, which can be used for (eg) confidence intervals and probabilistic inference, and which involves strong assumptions about the distribution and independence of incremental claims in different years. The chain ladder model is a deterministic projection that provides no information on the distribution of outcomes, and which involves much weaker assumptions.

### Examiner Report
Even fewer identified the main difference between the Poisson and Chain ladder models for part (e).
