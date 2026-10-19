---
id: "astam-2025s-q5"
exam: "Exam ASTAM"
topic: "Bornhuetter-Ferguson Method"
learning_objective: "Reserving and Pricing for Short-Term Insurance Coverages"
difficulty: medium
type: multi-part
year: 2025
session: Spring
wiki_link:
  - Concepts/Bornhuetter-Ferguson+Method
  - Concepts/Chain+Ladder+Method
  - Concepts/Unpaid+Claims
  - Concepts/Credibility
  - Concepts/Expected+Loss+Method
points: 11
---

You are calculating outstanding claim reserves for your company's portfolio of short-term insurance contracts.

You are given the following cumulative claims run-off triangle.

| Accident Year $i$ | Development Year $j$ = 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| 0 | 660 | 1155 | 1403 | 1568 |
| 1 | 792 | 1304 | 1650 | |
| 2 | 825 | 1568 | | |
| 3 | 941 | | | |

## Part a (2 points)

Show that the estimated outstanding claims for Accident Year (AY) 3, using the chain ladder method, are 1370 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation

The outstanding claims for AY 3 are $\hat{C}_{3,3} - C_{3,0}$.

$$\hat{C}_{3,3} = C_{3,0}(f_0 \times f_1 \times f_2)$$

$$
\begin{align*}
(f_0 \times f_1 \times f_2) = \lambda_0 &= \left(\frac{1155 + 1304 + 1568}{660 + 792 + 825}\right)\left(\frac{1403 + 1650}{1155 + 1304}\right)\left(\frac{1568}{1650}\right) \\
&= (1.7686)(1.2416)(1.1176) \\
&= 2.4540
\end{align*}
$$

$$\hat{C}_{3,3} - C_{3,0} = 941(2.4540 - 1) = 1368.2$$

### Examiner Report

Examiners' Comments: Part (a) done very well. The most common mistake was to calculate the estimated ultimate claims but fail to subtract out the claims that have already been paid in order to get to the OCR.

## Part b (3 points)

You are given the following notation and assumptions for the Bornhuetter-Ferguson (BF) method.

Given parameters $\mu_i,\ i = 0, 1, \cdots, I$ and $\beta_j,\ j = 0, 1, 2, \cdots, J$, where $\beta_J = 1$:

BF Assumption (1):

$$E\left[C_{i,0}\right] = \beta_0 \mu_i$$

$$E\left[C_{i,j+1} \mid C_{i,0}, C_{i,1}, \cdots, C_{i,j}\right] = C_{i,j} + \left(\beta_{j+1} - \beta_j\right)\mu_i$$

BF Assumption (2): $C_{i,j}$ and $C_{l,k}$ are independent for $i \ne l$, and for all $j$, $k$.

(i) Show using iteration that $E\left[C_{i,J} \mid C_{i,j}\right] = C_{i,j} + \left(1 - \beta_j\right)\mu_i$.

(ii) Show that $E\left[C_{i,j}\right] = \beta_j \mu_i$.

(Hint: Use induction.)

### Explanation

(i) We have that $E[C_{i,j+1} \mid C_{i,j}] = C_{i,j} + (\beta_{j+1} - \beta_j)\mu_i$. So

$$
\begin{align*}
E[C_{i,J} \mid C_{i,J-1}] &= C_{i,J-1} + (\beta_J - \beta_{J-1})\mu_i \\
&= C_{i,J-1} + (1 - \beta_{J-1})\mu_i
\end{align*}
$$

$$
\begin{align*}
\Rightarrow E[C_{i,J} \mid C_{i,J-2}] &= E\big[E[C_{i,J} \mid C_{i,J-1}] \mid C_{i,J-2}\big] \\
&= E[C_{i,J-1} \mid C_{i,J-2}] + (1 - \beta_{J-1})\mu_i \\
&= C_{i,J-2} + (\beta_{J-1} - \beta_{J-2})\mu_i + (1 - \beta_{J-1})\mu_i \\
&= C_{i,J-2} + (1 - \beta_{J-2})\mu_i
\end{align*}
$$

Continuing similarly...

$$
\begin{align*}
\Rightarrow E[C_{i,J} \mid C_{i,j}] &= E[C_{i,j+1} \mid C_{i,j}] + (1 - \beta_{j+1})\mu_i \\
&= C_{i,j} + (\beta_{j+1} - \beta_j)\mu_i + (1 - \beta_{j+1})\mu_i \\
&= C_{i,j} + (1 - \beta_j)\mu_i
\end{align*}
$$

Alternative solution: (iterating forwards instead of backwards)

$$E[C_{i,j+1} \mid C_{i,j}] = C_{i,j} + (\beta_{j+1} - \beta_j)\mu_i \quad \text{(from BF (1))}$$

$$E[C_{i,j+2} \mid C_{i,j+1}] = C_{i,j+1} + (\beta_{j+2} - \beta_{j+1})\mu_i \quad \text{(also from BF (1))}$$

$$
\begin{align*}
E[C_{i,j+2} \mid C_{i,j}] &= E\big[E[C_{i,j+2} \mid C_{i,j+1}] \mid C_{i,j}\big] \\
&= E\big[C_{i,j+1} + (\beta_{j+2} - \beta_{j+1})\mu_i \mid C_{i,j}\big] \\
&= E[C_{i,j+1} \mid C_{i,j}] + (\beta_{j+2} - \beta_{j+1})\mu_i \\
&= C_{i,j} + (\beta_{j+1} - \beta_j)\mu_i + (\beta_{j+2} - \beta_{j+1})\mu_i \\
&= C_{i,j} + (\beta_{j+2} - \beta_j)\mu_i
\end{align*}
$$

And applying this idea iteratively yields

$$
\begin{align*}
E[C_{i,J} \mid C_{i,j}] &= C_{i,j} + (\beta_J - \beta_j)\mu_i \\
&= C_{i,j} + (1 - \beta_j)\mu_i \quad \text{since we are given that } \beta_J{=}1
\end{align*}
$$

(ii) By induction:

We have that the result is true for $j = 0$ from BF assumption (1). We are required to show that if the result is true for $j$, it must also be true for $j + 1$.

Let $E[C_{i,j}] = \beta_j \mu_i$ (inductive assumption)

$$
\begin{align*}
\Rightarrow E[C_{i,j+1}] &= E\big[E[C_{i,j+1} \mid C_{i,j}]\big] \\
                         &= E\big[C_{i,j} + (\beta_{j+1} - \beta_j)\mu_i\big] \\
&= E[C_{i,j}] + (\beta_{j+1} - \beta_j)\mu_i \\
&= \beta_j \mu_i + (\beta_{j+1} - \beta_j)\mu_i \\
&= \beta_{j+1}\mu_i \quad \text{as required}
\end{align*}
$$

### Examiner Report

Examiners' Comments: Many candidates made little or no attempt to do part (b). However, the candidates who attempted this part were generally able to get much of the credit. The most common error to show the iteration used. In part (b)(ii), many candidates attempted a proof by induction, but failed to give the base case and/or induction steps.

## Part c (3 points)

You are given the following additional information.

(i) The estimated values of the $\beta_j$ parameters are $\hat{\beta}_j = \dfrac{1}{\hat{\lambda}_j}$.

(ii) The BF estimate of ultimate cumulative claims from AY $i$, given $C_{i,j}$, is $\tilde{C}_{i,J} = C_{i,j} + \big(1 - \hat{\beta}_j\big)\mu_i$.

(iii) $\hat{C}_{i,J}$ is the chain ladder estimate of ultimate cumulative claims for AY $i$.

(i) Derive the following formula for the estimated cumulative claims using the BF method:

$$\tilde{C}_{i,J} = \hat{\beta}_j\, \hat{C}_{i,J} + \big(1 - \hat{\beta}_j\big)\mu_i$$

(ii) Explain how the BF estimate of cumulative claims can be interpreted as a credibility estimate.

### Explanation

(i) We have

$$
\begin{align*}
\tilde{C}_{i,J} &= E[C_{i,J} \mid C_{i,j}] \\
                &= C_{i,j} + (1 - \beta_j)\mu_i \\
\hat{C}_{i,J} &= \hat{\lambda}_j\, C_{i,j} \Rightarrow C_{i,j} {=} \beta_j \hat{C}_{i,J} \\
\Rightarrow \tilde{C}_{i,J} &= \beta_j \hat{C}_{i,J} + (1 - \beta_j)\mu_i
\end{align*}
$$

(ii) A credibility estimate is a weighted average of an estimate based on data directly from the risk, and an estimate based on external sources.

The BF is just such a linear weighted average:

- $\hat{C}_{i,J}$, is the estimate based on the data alone;
- $\mu_i$, which is the estimate based on external sources (i.e. loss ratio); and
- $\beta_j$, is the credibility factor.

### Examiner Report

Examiners' Comments: Part (c) was done fairly well. For (c)(i), candidates seemed to generally understand the concepts, and the most common error was to fail to justify the steps used. Candidates did a good job of explaining the credibility formula in (c)(ii), though many candidates lost some credit due to incomplete or inadequate explanations.

## Part d (2 points)

You are also given:

(i) For each AY $i$, $\mu_i$ is based on a loss ratio of 90%.

(ii) The earned premiums for AY 3 are 2400.

Calculate the BF estimate of the outstanding claims for AY 3.

### Explanation

We have $\mu_3 = (0.9)(2400) = 2160$.

The BF estimate of outstanding claims for AY 3 is $\tilde{C}_{3,3} - C_{3,0}$,

$$
\begin{align*}
\tilde{C}_{3,3} &= C_{3,0} + \big(1 - \hat{\beta}_0\big)\mu_3 \\
\Rightarrow \tilde{C}_{3,3} - C_{3,0} &= \big(1 - \hat{\beta}_0\big)\mu_3 \\
                                      &= \left(1 - \frac{1}{\lambda_0}\right)\mu_3 \\
&= \left(1 - \frac{1}{2.4540}\right) 2160 \\
 &= 1279.8
\end{align*}
$$

**Alternative solution**: Using the "credibility" formula from the previous part, the estimated ultimate claims are:

$$\tilde{C}_{3,3} = \hat{\beta}_0 \hat{C}_{3,3} + \big(1 - \hat{\beta}_0\big)\mu_3$$

$$\tilde{C}_{3,3} = \frac{1}{2.4540}(2309.21) + \left(1 - \frac{1}{2.4540}\right) 2160 = 2220.8$$

so that the estimated outstanding claims reserve is

$$\tilde{C}_{3,3} - C_{3,0} = 2220.84 - 941 = 1279.8$$

### Examiner Report

Examiners' Comments: Part (d) was generally done well; candidates used both approaches in roughly equal numbers; either was fine. A large number of candidates (perhaps as many as half) calculated the estimated ultimate claims instead of the OCR. On a related note, some candidates used the credibility formula incorrectly, mixing ultimate claims for one method with OCR for the other method.

## Part e (1 point)

Write down one advantage and one disadvantage of using the BF method over the chain ladder method.

### Explanation

Advantage: The Chain Ladder bases the outstanding claims estimate for AY3 entirely on the data from the first development year; here, that's about 40% of the total. If the claims payment system is not stable, the Chain Ladder approach may be misleading – e.g. if the claims are processed faster in AY3, the Chain Ladder estimate will overstate the outstanding claims for that AY in the early development years.

Some other advantages from the Brown and Lennox text (mostly related to the above; any of these would get full credit):

- BF method is more stable than CL.
- BF allows the inclusion of other data sources.

Disadvantage: The BF estimate is highly dependent on the external estimate of losses, in this case based on a 90% loss ratio. If the premiums are too low, then the loss ratio will be too low, leading to an underestimate of outstanding claims in the early development years.

### Examiner Report

Examiners' Comments: Part (e) was well done, with most candidates correctly identifying the main points. Some of the explanations were imprecise (such as describing the estimate derived from the expected loss ratio method as "arbitrary"), which led to minor deductions.
