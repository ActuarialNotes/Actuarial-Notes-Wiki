---
id: "astam-2023f-q1"
exam: "Exam ASTAM"
topic: "Deductible"
learning_objective: "Coverage Modifications"
difficulty: medium
type: multi-part
year: 2023
session: Fall
wiki_link:
  - Concepts/Deductible
  - Concepts/Inflation
  - Concepts/Pareto+Distribution
  - Concepts/Policy+Limit
  - Concepts/Severity+Discretization
  - Concepts/Aggregate+Loss+Model
  - Concepts/Continuous+Random+Variable
points: 11
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7b467ddac1337c2b7c4a834df9118261ae0e5f04a4860bc70b42f5be1c65e19b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2023f-q1.md
---

An insurance company sells a 1-year insurance policy covering dental costs. In 2023, the policy has no deductible and no policy limit.

The number of dental visits is assumed to follow a Poisson distribution with an expected value of 1.9. The cost of each dental visit is assumed to follow a Pareto distribution with parameters of $\alpha = 4$ and $\theta = 900$. The number of dental visits and cost of each dental visit are assumed to be mutually independent.

## Part a (2 points)

Let $S$ represent the aggregate payments in 2023 under this policy.

- (i) Show that $E[S] = 570$.
- (ii) Calculate the standard deviation of $S$.

### Explanation
**(i)**

$$
E[S] = \lambda E[X] = 1.9\left(\frac{900}{3}\right) = 570
$$

**(ii)**

$$
V[S] = V[X]E[N] + V[N](E[X])^2 = \left(\frac{900}{3}\right)^2\left(\frac{4}{2}\right)(1.9) + (1.9)(300)^2 = 513{,}000 = 716.24^2
$$

Or because it is Poisson:

$$
V[S] = \lambda E\left[X^2\right] = 1.9\left(\frac{2 \times 900^2}{3 \times 2}\right) = 513{,}000 = 716.24^2
$$

### Examiner Report
Overall, the candidates did very well on this question.

For Part a, virtually all candidates earned full credit.

## Part b (1 point)

In 2024, the cost of each dental visit is expected to increase uniformly by 20% due to inflation. The number of dental visits is assumed to have the same distribution in 2024 as in 2023.

Explain why the distribution of the cost of each dental visit in 2024 is Pareto, with parameters $\alpha = 4$ and $\theta = 1080$.

### Explanation
With 20% inflation, the distribution of individual claims for 2024 will be adjusted by a factor of 1.2. Because Pareto is a scale family with scale parameter $\theta$, the distribution of individual claims in 2024 will also have a Pareto with parameters $\alpha = 4$ and adjusted scale parameter $\theta = 1080$.

### Examiner Report
For Part b, many candidates earned full credit by using the distribution function to prove the relationship or by pointing out that theta is a scale parameter so it is multiplied by 1.2. Full credit or no credit was given for other approaches or not even mentioning alpha. The question asks for an explanation. Quite a few candidates did not provide an explanation but merely repeated what was given.

## Part c (4 points)

The insurer is considering imposing an ordinary deductible per dental visit, $d$, that would result in the insurer's expected aggregate payments being the same in 2024 as in 2023.

- (i) Show that $d = 70$ to the nearest 10. You should calculate the value to the nearest 0.1.
- (ii) Calculate the expected number of claim payments if the deductible in (c)(i) is applied, assuming that the number of dental visits is not affected by the deductible.
- (iii) Briefly describe 2 ways in which the introduction of a deductible might impact policyholder behavior.

### Explanation
**(i)** $X \sim \text{Pareto}\left(\alpha = 4,\ \theta^* = 1080\right)$

$$
\lambda E\left[(X - d)^+\right] = 570 \Rightarrow E\left[(X - d)^+\right] = \frac{570}{1.9} = 300
$$

$$
\begin{align*}
E\left[(X - d)^+\right] &= \Pr[X > d]\,E[X - d \mid X > d] \\
&= \left(\frac{\theta^*}{\theta^* + d}\right)^4\frac{\theta^* + d}{3} \quad \text{(formula sheet)} \\
\Rightarrow \left(\frac{(\theta^*)^4}{(\theta^* + d)^3}\right) &= 900 \qquad \text{where } \theta^* \text{ is } 1080 \\
\Rightarrow \theta^* + d = 1147.7 &\Rightarrow d = 67.67
\end{align*}
$$

*Or*

$$
\begin{align*}
300 = E\left[(X - d)^+\right] &= E[X] - E[X \wedge d] \\
&= \frac{\theta^*}{3} - \frac{\theta^*}{3}\left(1 - \left(\frac{\theta^*}{\theta^* + d}\right)^3\right) \quad \text{(formula sheet)} \\
&= \left(\frac{(\theta^*)^4}{3(\theta^* + d)^3}\right)
\end{align*}
$$

**(ii)**

$$
N^* \sim \text{Poisson}\left(\lambda\Pr[X > d]\right)
$$

$$
E\left[N^*\right] = 1.9\left(\frac{1080}{1080 + 67.67}\right)^4 = 1.4898
$$

**(iii)** The deductible might affect policyholder behavior.

- Policyholders may not wish to go through the trouble of making a claim for amounts just slightly above the deductible.
- Policyholders may go to the dentist less, now that each visit costs them the deductible. That could mean that each visit is more costly, on average.
- Policyholder may discontinue policy or look for other policies in the market.

### Examiner Report
Part c i, most candidates received full points. Proving that the deductible of 70 is very close to the correct deductible received minimal credit.

Part c ii, most candidates earned full credit.

Part c iii, many candidates treated the deductible as an annual deductible instead of a deductible per visit. Also, candidates did not discuss policyholder behavior but implications of adding a deductible in other ways. These candidates did not receive credit for either of these approaches.

## Part d (2 points)

The insurer is instead considering imposing an ordinary deductible of 50 along with a maximum covered loss of $L$ on each claim payment in 2024. Calculate the value of $L$ that would result in the insurer's expected aggregate payments to the insurer being the same in 2024 as in 2023.

### Explanation
Now $E[X \wedge L] - E[X \wedge 50] = 300$

$$
\begin{align*}
&\Rightarrow \frac{1080}{3}\left(1 - \left(\frac{1080}{1080 + L}\right)^3\right) - \frac{1080}{3}\left(1 - \left(\frac{1080}{1080 + 50}\right)^3\right) = 300 \\
&\Rightarrow \left(\frac{1080}{1130}\right)^3 - \left(\frac{1080}{1080 + L}\right)^3 = \frac{900}{1080} \\
&\Rightarrow 1080 + L = 3165.6 \\
&\Rightarrow L = 2085.6
\end{align*}
$$

Notes: The maximum insured loss using this notation is L-50=2035.6. Either answer was given full credit.

### Examiner Report
Part d and e, this part was well answered by well-prepared candidates.

## Part e (1 point)

The insurer wants to estimate the aggregate loss distribution by discretizing the 2023 severity distribution, using the Method of Rounding with a span of 100.

Determine the probability that is assigned to a claim severity of 0.

### Explanation
Discretizing the 2023 severity distribution with $h = 100$, the probability is

$$
f_0 = \Pr[X \le 50] = 1 - \left(\frac{900}{950}\right)^4 = 0.19448
$$

## Part f (1 point)

Calculate $f_S(0)$.

### Explanation
For the discretized loss distribution we have

$$
\begin{align*}
\Pr[S = 0] &= \Pr[N = 0] + \Pr[N = 1]f_0 + \Pr[N = 2]f_0^2 + \dots \\
&= E_N\left[f_0^N\right] \\
 &= P_N(f_0) \qquad (P_N \text{ is the p.g.f}) \\
&= e^{\lambda(f_0 - 1)} \\
 &= 0.21643
\end{align*}
$$

Or

$$
\begin{align*}
f_S(0) &= Pr[N=0] + Pr[N=1]\Pr[X=0] + Pr[N=2](\Pr[X=0])^2 + Pr[N=3](\Pr[X=0])^3 + \dots \\
&= e^{-1.9} + \frac{e^{-1.9}(1.9)}{1!}(0.19448) + \frac{e^{-1.9}(1.9)^2}{2!}(0.19448)^2 + \frac{e^{-1.9}(1.9)^3}{3!}(0.19448)^3 + \dots \\
&= 0.14957 + 0.05527 + 0.01021 + 0.00125 + 0.00012 + 0.00001 + 0 \\
 &= 0.21643
\end{align*}
$$

### Examiner Report
Part f, this part was not as well done as the other calculation questions.
