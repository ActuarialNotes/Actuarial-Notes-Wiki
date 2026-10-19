---
id: "astam-2024f-q3"
exam: "Exam ASTAM"
topic: "Aggregate Loss Model"
learning_objective: "Aggregate Models"
difficulty: medium
type: multi-part
year: 2024
session: Fall
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Loss+Elimination+Ratio
  - Concepts/Deductible
  - Concepts/Excess+of+Loss
  - Concepts/Inflation
  - Concepts/Normal+Approximation
points: 12
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:16aac18733f13fc7106f7b87dae099aa6867dc1008296cc095ad6968c2cf3f7b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2024f-q3.md
---

An insurance company sells one-year insurance policy on a risk with the following loss frequency distribution

| Number of losses | Probability |
|---|---|
| 0 | 0.5 |
| 1 | 0.3 |
| 2 | 0.1 |
| 3 | 0.1 |

You are also given the following information.

- The severity of each loss $X_j$ follows a lognormal distribution with parameters $\mu = 7$ and $\sigma = 0.5$.
- The number of losses and the amount of each loss are assumed to be mutually independent.
- The policy has an ordinary deductible of $d = 500$ per loss.
- $N^L$ denotes the number of loss events in a single year.
- $N^P$ denotes the number of payments in a single year.

## Part a (3 points)

(i) Calculate the expected value of the aggregate ground-up loss.

(ii) Calculate the standard deviation of the aggregate ground-up loss.

(iii) Explain briefly why the Normal Approximation would not be a good method of approximating the distribution of the aggregate ground-up loss for this policy.

### Explanation
(i) Let $X_j$, $N$, and $S$ denote the $j$th loss severity, the number of losses, and the aggregate loss, respectively. Then

$$\begin{align*}
E[X_j] &= e^{7 + .5^2/2} \\
&= 1242.65 \\
E[N] &= 0(0.5) + 1(0.3) + 2(0.1) + 3(0.1) \\
&= 0.8 \\
\Rightarrow E[S] &= 0.8 \times 1242.65 \\
&= 994.12
\end{align*}$$

(ii) We know that:

$$\mathrm{Var}[S] = \mathrm{E}\big[\mathrm{Var}[S|N]\big] + \mathrm{Var}\big[\mathrm{E}[S|N]\big]$$

where

$$\mathrm{Var}[S|N] = N\,\mathrm{Var}[X_j] = N\left(\left(e^{7+0.5^2/2}\right)^2\left(e^{0.5^2} - 1\right)\right) = 438{,}584.8N$$

$$\Rightarrow \mathrm{E}\big[\mathrm{Var}[S|N]\big] = 438{,}584.8(0.8) = 350{,}867.8$$

and

$$\begin{align*}
\mathrm{Var}\big[\mathrm{E}[S|N]\big] &= \mathrm{Var}\big[N\left(\mathrm{E}[X_j]\right)\big] \\
&= \left(\mathrm{E}[X_j]\right)^2\,\mathrm{Var}[N]
\end{align*}$$

$$\mathrm{Var}[N] = 1^2(0.3) + 2^2(0.1) + 3^2(0.1) - 0.8^2 = 0.96$$

$$\Rightarrow \mathrm{Var}\big[\mathrm{E}[S|N]\big] = 1242.6^2(0.96) = 1{,}482{,}407.5$$

$$\Rightarrow \mathrm{Var}[S] = 350{,}867.8 + 1{,}482{,}407.5 = 1{,}833{,}275.3 = 1354.0^2$$

(iii) We use the normal approximation when there are a substantial number of expected losses (typically >30), such that the central limit theorem becomes relevant.

In the example above, with an expected frequency of less than 1 loss, and with a positively skewed severity distribution, the compound distribution will also be substantially positively skewed, and the normal approximation will not provide a good fit.

### Examiner Report
Part A

Candidates did not do well. Most candidates understood how to calculate the mean and standard deviation of aggregate loss. However, the majority candidates didn't realize that they should work on ground-up losses and tried to solve a much harder question on aggregate payments after applying deductible. Candidates might have misread questions if they find that it takes extraordinarily longer time to solve than the assigned points.

## Part b (2 points)

Calculate the loss elimination ratio.

### Explanation
The expected amount of the $j$th loss that is not covered under the policy is

$$\begin{align*}
\mathrm{E}[X_j \wedge d] &= \mathrm{E}[X_j]\,\Phi\left(\frac{\log d - \mu - \sigma^2}{\sigma}\right) + d\left(1 - \Phi\left(\frac{\log d - \mu}{\sigma}\right)\right) \\
&= 1242.65\,\Phi(-2.071) + 500\big(1 - \Phi(-1.571)\big) \\
&= 494.79
\end{align*}$$

Note: The formula for $E[X_j \wedge d]$ is given in the formula sheet.

### Examiner Report
Part B

Candidates overall did well. Some candidates calculated the ratio of the expected insurance payment (rather than the expected loss eliminated by deductible) over the expected ground-up losses. If the candidate did part of the work in Part A, it would be very helpful to point out here for exam graders.

## Part c (2 points)

Let

$$I_j = \begin{cases} 0 & X_j \le d \\ 1 & X_j > d \end{cases} \qquad \text{and let } E[I_j] = v$$

so that $N^P = \sum_{j=1}^{N^L} I_j$ (where we define $N^P = 0$ when $N^L = 0$).

Prove that the PGF for $N^P$ is

$$P_{N^P}(z) = P_{N^L}(1 - v(1 - z)), \text{ where } v = 0.9419.$$

### Explanation
$$\mathrm{E}[I_j] = \Pr[X_j > d] = S(500) = 1 - F(500) = 1 - \Phi\left(\frac{\log(500) - 7}{0.5}\right) = 0.9419 = v$$

$$\begin{align*}
P_{N_P}(z) &= \mathrm{E}\left[z^{N_P}\right] \\
&= \mathrm{E}\left[\mathrm{E}\left[z^{N_P}|N_L\right]\right] \\
&= \mathrm{E}\left[\mathrm{E}\left[z^{I_1 + I_2 + \ldots + I_{N_L}}|N_L\right]\right] \\
&= \mathrm{E}\left[\left(\mathrm{E}\left[z^{I_j}\right]\right)^{N_L}\right] \quad (\text{as } I_j \text{ are iid}) \\
&= \mathrm{P}_{N_L}\left(\mathrm{E}\left[z^{I_j}\right]\right) \quad (\text{from definition of PGF})
\end{align*}$$

$$\mathrm{E}\left[z^{I_j}\right] = z^0(1 - v) + z^1v = 1 - v(1 - z)$$

$$\Rightarrow P_{N_P}(z) = P_{N_L}\big(1 - v(1 - z)\big)$$

### Examiner Report
Part C

Candidates did poorly in Part C. Candidates should understand important relations among basic concepts (i.e., the number of ground-up losses and the number of payments) rather than just remember the formulas.

## Part d (2 points)

(i) Calculate the probability that the aggregate payment from the coverage is 0.

(ii) Calculate the probability that there is exactly one payment made in a year.

### Explanation
Using PGFs:

$$\begin{align*}
P_{N_L}(z) &= 0.5z^0 + 0.3z + 0.1z^2 + 0.1z^3 \\
\Rightarrow P_{N_P}(z) &= 0.5 + 0.3\big(1 - v(1 - z)\big) + 0.1\big(1 - v(1 - z)\big)^2 + 0.1\big(1 - v(1 - z)\big)^3
\end{align*}$$

(i)

$$\begin{align*}
\Pr[S = 0] = \Pr[N_p = 0] &= P_{N_P}(0) \\
&= P_{N_L}(1 - v) \\
&= 0.5 + 0.3(1 - v) + 0.1(1 - v)^2 + 0.1(1 - v)^3 \\
&= 0.51779
\end{align*}$$

(ii)

$$\begin{align*}
\Pr[N_P = 1] &= P'_{N_P}(z = 0) \\
&= vP'_{N_L}(1 - v) \\
&= v\big(0.3 + 0.2(1 - v) + 0.3(1 - v)^2\big) \\
&= 0.29447
\end{align*}$$

OR

From first principles. Let $p_k = \Pr[N = k]$:

(i) $\Pr[S = 0] = p_0 + p_1(1 - v) + p_2(1 - v)^2 + p_3(1 - v)^3 = 0.51779$

(ii) $\Pr[N_p = 1] = p_1v + 2p_2v(1 - v) + 3p_3v(1 - v)^2 = 0.29447$

### Examiner Report
Part D

Candidates did fairly well. Most candidates understood how to solve the problem using the first principles, although some pieces were missed.

## Part e (3 points)

The insurer purchases an excess-of-loss reinsurance policy such that the insurer's own maximum payment on an individual claim is 2,000. The reinsurance premium is set at 120% of the expected annual reinsurance claim payments.

(i) Calculate the annual reinsurance premium for this policy.

(ii) The amount of each loss in the next year is expected to increase uniformly by 10% due to inflation, and all contract terms remain the same. As a result, the reinsurance premium for next year is expected to be increased by $h$.

Without further calculation, state with reasons whether $h$ is less than, equal to, or greater than 10%.

### Explanation
(i)

$$X_j^* = \begin{cases} X_j - 2500 & X_j > 2500 \quad \leftarrow 2500 \textit{ is insurer oayment plus deductible} \\ 0 & X_j \le 2500 \end{cases}$$

$$\mathrm{E}\left[X_j^*\right] = \mathrm{E}[X_j] - \left(\mathrm{E}[X_j \wedge 2500]\right)$$

$$\mathrm{E}[X_j \wedge 2500] = e^{\mu + \sigma^2/2}\,\Phi\left(\frac{\ln(2500) - \mu - \sigma^2}{\sigma}\right) + 2500\left(1 - \Phi\left(\frac{\ln(2500) - \mu}{\sigma}\right)\right) = 1210.91$$

$$\Rightarrow G = 1.2E[N]\Big(\mathrm{E}[X_j] - \left(\mathrm{E}[X_j \wedge 2500]\right)\Big) = 1.2(0.8)(1242.65 - 1210.91) = 30.472$$

OR

$$\begin{align*}
E\left[X_j^*\right] &= \int_{2500}^{\infty} x f(x)\,dx - 2500\big(1 - F(2500)\big) \\
&= e^{\mu + \sigma^2/2}\left(1 - \Phi\left(\frac{\ln(2500) - \mu - \sigma^2}{\sigma}\right)\right) - 2500\left(1 - \Phi\left(\frac{\ln(2500) - \mu}{\sigma}\right)\right) \\
&= 1242.65(0.12547) - 2500(0.04967) \\
&= 31.742
\end{align*}$$

$$\Rightarrow G = 1.2(0.8)31.742 = 30.472$$

(ii) From the definition of $X_j^*$, we see that if $X_j$ increases by 10%, but the 2500 limit stays the same, then $X_j^*$ will increase by more than 10%, so the premium will also increase by more than 10%.

OR

$E[X_j]$ will increase by 10%, but $E[X_j \wedge 2500]$ will increase by less than 10%. Effectively, the retention point has decreased in real terms, so the excess cost over the retention has increased in real terms.

### Examiner Report
Part E

Candidates did well. A common mistake is that the reinsurer covers losses above 2500 rather than 2000 due to the deductible.
