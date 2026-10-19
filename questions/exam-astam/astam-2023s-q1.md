---
id: "astam-2023s-q1"
exam: "Exam ASTAM"
topic: "Aggregate Loss Model"
learning_objective: "Aggregate Models"
difficulty: medium
type: multi-part
year: 2023
session: Spring
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Convolution
  - Concepts/Deductible
  - Concepts/Stop-Loss+Reinsurance
  - Concepts/Policy+Limit
points: 12
---

You are the actuary for an insurance company that writes one year insurance coverage on a risk with the following frequency and severity distributions.

| Number of Losses | Probability |
|---|---|
| 0 | 0.20 |
| 1 | 0.25 |
| 2 | 0.40 |
| 3 | 0.15 |

| Amount of Loss | Probability |
|---|---|
| 100 | 0.50 |
| 200 | 0.40 |
| 500 | 0.10 |

Let $S$ denote the aggregate losses in a year for this risk.

## Part a (2 points)

Calculate the probability that $S \le 350$.

### Explanation
Let $N$ denote the claim frequency and $Y_j$ denote the $j$-th claim amount.

$$
\begin{align*}
\Pr[S \le 350] &= \Pr[N=0] + \Pr[N=1]\Pr[Y_1 \le 350] \\
&\quad + \Pr[N=2]\Pr[Y_1+Y_2 \le 350] \\
&\quad + \Pr[N=3]\Pr[Y_1+Y_2+Y_3 \le 350] \\
&= 0.20 + 0.25(0.9) + 0.4\left(0.5^2 + 2(0.5)(0.4)\right) + 0.15\left(0.5^3\right) \\
&= 0.70375
\end{align*}
$$

### Examiner Report
Candidates performed well on this question. The average score was the highest of the exam.

Some candidates just wrote down answers without showing work and stated that the work was done in Excel. If the answer was correct, the candidate received partial credit. Even when using Excel, candidates are required to show their working on their answer sheets. Note that the examiners do not have access to the candidates' Excel workbooks.

(a) Overall candidates did well on this part of the question, with around 50% achieving maximum credit. For those who did not, a common mistake was to calculate the expected value and the variance for the random variable S and use the normal distribution to estimate the probability. However, the distribution is not even approximately normal and there is no reason to think that it should be so.

Other common errors were to omit the probability that S = 0 or to forget that the probability that two claims where one is for 100 and the other is for 200 could occur in two different ways.

## Part b (1 point)

For each policy, the premium is set at 1.15 times the expected annual claim payments.

Calculate the premium for a policy with no policy modifications.

### Explanation
$$
\begin{align*}
\mathrm{E}[N] &= 0(0.2) + 1(0.25) + 2(0.4) + 3(0.15) \\
              &= 1.5 \\
\mathrm{E}[Y_j] &= 100(0.5) + 200(0.4) + 500(0.1) \\
                &= 180 \\
\mathrm{E}[S] &= \mathrm{E}[N]\,\mathrm{E}[Y_j] \\
              &= 270 \\
P &= 1.15\,\mathrm{E}[S] \\
  &= 310.5
\end{align*}
$$

### Examiner Report
(b) and (c) Candidates did exceptionally well on these parts with the majority getting full credit.

## Part c (2 points)

Show that the premium for a policy with an ordinary deductible of 100 per loss is 140 to the nearest 10. You should calculate the premium to the nearest 1.

### Explanation
Let $Y_j^* = Y_j - 100$. Then

$$
\begin{align*}
\mathrm{E}\left[Y_j^*\right] &= \mathrm{E}[(Y_j - 100)_+] \\
&= 0(0.5) + 100(0.4) + 400(0.1) \\
                             &= 80 \\
P &= 1.15\,\mathrm{E}[N]\,\mathrm{E}\left[Y_j^*\right] \\
  &= 138
\end{align*}
$$

## Part d (3 points)

Calculate the premium for a policy with an aggregate deductible of 100 per insured for each year.

### Explanation
$$
S^* = \begin{cases} 0 & \text{if } S = 0 \\ S - 100 & \text{if } S > 0 \end{cases}
$$

$$
\begin{align*}
\mathrm{E}[S^*] &= \mathrm{E}[S] - \mathrm{E}[S \wedge 100] \\
&= 270 - [(0)(0.2) + (100)(0.8)] \\
&= 270 - 80 = 190 \\
\Rightarrow P &= 1.15(190) = 218.5
\end{align*}
$$

### Examiner Report
(d) Candidates performed acceptably on this part of the question. Quite a few candidates attempted to calculate all possible values of (S – 100) from 0 to 1400 and assign probabilities to each value. While a few candidates were able to complete this calculation, most candidates made an error and received only partial credit.

## Part e (4 points)

The insurer plans to buy stop-loss reinsurance for a policy which has no coverage modifications.

- (i) (3 points) Calculate the expected annual reinsurance payment with a stop-loss deductible of 1000.
- (ii) (1 point) Explain why the insurer would prefer to use stop-loss coverage rather than setting a policy limit of 1000.

### Explanation
Let $S^R$ denote the reinsurer's claims.

**(i)**

$$
S^R = (S - 1000)^+ = \begin{cases} 0 & \text{if } S \le 1000 \\ (S - 1000) & \text{if } S > 1000 \end{cases}
$$

The only way that aggregate claims exceed 1000 is if there are 3 claims, and at least 2 of them are equal to 500. So

$$
\begin{align*}
\mathrm{E}\left[S^R\right] &= \Pr[N=3]\big\{100\Pr[Y_1+Y_2+Y_3 = 1100] \\
&\qquad + 200\Pr[Y_1+Y_2+Y_3 = 1200] \\
&\qquad + 500\Pr[Y_1+Y_2+Y_3 = 1500]\big\} \\
&= (0.15)\left\{100\left(3(0.1^2)(0.5)\right) + 200\left(3(0.1^2)(0.4)\right) + 500\left(0.1^3\right)\right\} \\
&= 0.660
\end{align*}
$$

**(ii)** Stop Loss insurance protects the insurer in the same way that the policy limit does, but the policy limit may discourage some potential policyholders.

### Examiner Report
(e) (i) Overall, very few candidates got the correct answer; most candidates omitted this part. Many candidates who attempted the problem tried to use E(S) – E(S^1000), but this was not generally a feasible calculation.

The approach shown above demonstrates a first principles understanding of Stop Loss insurance and is relatively easy to calculate. Candidates who used this approach generally got the right answer. The most common mistakes was to forget the factors of 3 in th first two terms, allowing for different combinations of claims. These candidates still received the majority of the points for this part of the question.

(ii) While most candidates attempted this part, very few provided a coherent, relevant explanation.
