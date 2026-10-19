---
id: "astam-2025f-q4"
exam: "Exam ASTAM"
topic: "Loss Elimination Ratio"
learning_objective: "Coverage Modifications"
difficulty: medium
type: multi-part
year: 2025
session: Fall
wiki_link:
  - Concepts/Loss+Elimination+Ratio
  - Concepts/Deductible
  - Concepts/Panjer+Recursion
  - Concepts/Poisson+Thinning
  - Concepts/Stop-Loss+Reinsurance
  - Concepts/Aggregate+Loss+Model
points: 11
---

For a health insurance policy, the number of losses in a year is distributed as a Poisson distribution with an expected number of losses equal to 1.

The ground-up loss severity distribution is given in the following table:

| Amount | Probability |
|---|---|
| 100 | 0.6 |
| 500 | 0.3 |
| 1000 | 0.1 |

Number of losses and loss severity are independent.

## Part a (3 points)

(i) Calculate the Loss Elimination Ratio (LER) with an ordinary deductible of 60.

(ii) Calculate the insurer's expected payment per loss with an ordinary deductible of 60.

(iii) Calculate the ordinary deductible that would be necessary to achieve a LER of 40%.

### Explanation

(i)

$$LER = \frac{E[X \wedge 60]}{E[X]} = \frac{60}{310} = \mathbf{0.1935}$$

(ii)

$$EPPL = E[X] - E[X \wedge 60] = \mathbf{250}$$

(iii) First, assume $d < 100$:

$$LER = 0.4 \Rightarrow \frac{d}{310} = 0.4 \Rightarrow d = 124 \text{ which contradicts the assumption.}$$

Now, assume $100 < d \le 500$:

$$LER = 0.4 \Rightarrow \frac{100 \times 0.6 + d \times 0.4}{310} \Rightarrow d = \mathbf{160}$$

### Examiner Report

Examiners' Comments

1. Overall, the grades for this question were very much lower than expected.
2. Part (a) was done reasonably well, with around half of the candidates achieving full credit. The LER is a common feature in ASTAM exams, and candidates are expected to be very familiar with the calculations.

## Part b (2 points)

(i) Describe the difference between an ordinary deductible and a franchise deductible.

(ii) Describe a type of insurance which might typically use a franchise deductible.

### Explanation

(i) Ordinary deductible, $d$:

The insured pays the full loss if it is less than $d$, and pays a flat amount of $d$ for losses greater than $d$. That is, let $X$ denote the loss, and $Y$ denote the amount covered by insurance, for an ordinary deductible $d$,

$$Y = \begin{cases} 0 & X \le d \\ X - d & X > d \end{cases}$$

Franchise deductible:

The insured pays the full loss if it is less than d, and the insurer pays the full loss if it is greater than d. That is,

$$Y = \begin{cases} 0 & X \le d \\ X & X > d \end{cases}$$

(ii) One example of a franchise deductible is short term disability income where the insured covers all losses if the they are disabled for less than the elimination period (such as 7 days) but if the disability extends longer than the elimination period, then the insurance covers all losses including the elimination period,

### Examiner Report

3. Part (b) was also fairly well, with more than half of the candidates correctly describing the ordinary and franchise deductible. Only a few candidates were able to provide a relevant example.

## Part c (4 points)

The insurer decides to impose an ordinary deductible on each claim that is the greater of 20% of the loss or 100. Let $S$ denote the aggregate claims paid after the deductible for each policy.

(i) Show that $\Pr[S = 0]$ is 0.67 to the nearest 0.01. You should calculate the value to the nearest 0.0001.

(ii) Using the recursive method, calculate $\Pr[S < 1000]$. (Hint: Work in units of 400.)

### Explanation

Loss frequency is represented by $N \sim \text{Poisson}(\lambda = 1)$. The claim per loss distribution is now

$$X^* = \begin{cases} 0 & \text{w.p. } 0.6 \\ 400 & \text{w.p. } 0.3 \\ 800 & \text{w.p. } 0.1 \end{cases}$$

(i) Let $p_k$ denote the probability function for the Poisson(1) loss frequency. Then

$$
\begin{align*}
\Pr[S = 0] &= p_0 + p_1(0.6) + p_2(0.6)^2 + \ldots \\
&= E\left[0.6^N\right] \\
&= P_N(0.6) \\
 &= e^{\lambda(0.6 - 1)} \\
&= \mathbf{0.67032}
\end{align*}
$$

where $P_N$ is the $\text{Poisson}(\lambda = 1)$ probability generating function.

Alternatively, let $N'$ denote the number of claims, where $N$ denotes losses. From the Poisson properties, $N' \sim \text{Poisson}(\lambda q)$ where $\lambda = 1$, and $q = \Pr[X^* > 0] = 0.4$. Then

$$\Pr[S = 0] = \Pr[N' = 0] = e^{-\lambda q} = e^{-0.4} = \mathbf{0.67032}$$

(ii) Work in units of 400, and apply the (a,b,0) recursion formula from the formula sheet. Let $f_j = \Pr[X^* = 400j]$ for $j = 0, 1, 2$, and let $g_s = \Pr[S = 400s]$ for $s = 0, 1, 2, \ldots$

For the Poisson distribution, $a = 0$, $b = \lambda$, so the recursion equation can be written

$$g_s = \sum_{j=1}^{\min(s,2)} \left(\frac{j}{s}\right) f_j\, g_{s-j} \quad \text{for } s = 1, 2, \ldots$$

$$
\begin{align*}
\Rightarrow g_1 &= f_1\, g_0 \\
                &= (0.3)(0.67032) \\
&= 0.20110 \\
g_2 &= f_1\, g_1 + f_2\, g_0 \\
&= \left(\frac{1}{2}(0.3)(0.20110) + (0.1)(0.67032)\right) \\
&= 0.09720
\end{align*}
$$

So $\Pr[S < 1000] = g_0 + g_1 + g_2 = \mathbf{0.96861}$

### Examiner Report

4. In part (c), candidates were asked to calculate the zero claim probability, and then to use recursion to calculate the probabilities associated with total claims being 400 or 800. Many candidates omitted this part. Many others were able to calculate the zero aggregate claim probability, but could not implement the recursion formula from the formula sheet, even though the application in this case was quite straightforward. Partial marks were awarded for candidates who recognized the correct formula, and made some attempt to use it. Many candidates omitted this part.

## Part d (2 points)

The insurer purchases stop-loss insurance with an aggregate deductible of 1000, based on claims paid by the insurer. Calculate the net premium for this coverage.

### Explanation

The net premium is

$$
\begin{align*}
P^{SL} &= E[S] - E[S \wedge 1000] \\
E[S] &= \lambda E\left[X^{**}\right] \\
     &= 1(400 \times 0.3 + 800 \times 0.1) \\
&= 200 \\
E[S \wedge 1000] &= 0g_0 + 400g_1 + 800g_2 + 1000\big(1 - (g_0 + g_1 + g_2)\big) \\
&= 400(0.20110) + 800(0.09720) + 1000(0.03139) \\
&= 189.58 \\
\Rightarrow P^{SL} &= \mathbf{10.42}
\end{align*}
$$

### Examiner Report

5. In part (d) candidates were expected to use the probabilities calculated in (c) to determine the stop loss premium. Candidates who did not calculate the correct probabilities in (c) were not penalized in (d) for using their incorrect values. Candidates who did not have any probabilities from (c) could gain partial credit by writing down the relevant formulas. Some candidates used arbitrarily chosen probabilities to calculate the net premium. If they explained their approach, and if their calculations were correct, they received full credit. Overall however, the points for this part were very low, with many candidates omitting it.
