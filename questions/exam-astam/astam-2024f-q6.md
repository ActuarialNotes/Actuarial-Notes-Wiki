---
id: "astam-2024f-q6"
exam: "Exam ASTAM"
topic: "Mack Chain Ladder Model"
learning_objective: "Reserving and Pricing for Short-Term Insurance Coverages"
difficulty: hard
type: multi-part
year: 2024
session: Fall
wiki_link:
  - Concepts/Mack+Chain+Ladder+Model
  - Concepts/Chain+Ladder+Method
  - Concepts/Bornhuetter-Ferguson+Method
  - Concepts/Unpaid+Claims
  - Concepts/Short+Tail+Insurance
  - Concepts/Prediction+Error
points: 11
---

You are analyzing a run-off triangle of aggregate claims. The development factors are:

| DY, j | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|
| $f_j$ | 3.0982 | 1.4436 | 1.1955 | 1.0874 | 1.0360 | 1.0186 | 1.0056 | 1.0000 |

## Part a (2 points)

(i) State with reasons whether this business is long tailed or short tailed.

(ii) You are given that the most recent cumulative claims data for Accident Year (AY) 6 is $C_{6,1} = 9{,}182$.

Show that the estimated outstanding claims for AY 6 total 9,100 to the nearest 100, using the Chain Ladder method. You should calculate the value to the nearest 1.

### Explanation
(i) The business is short-tailed, as around 98% of claims are settled within 4 years, and all claims are settled within around 6 years.

(ii)

$$\begin{align*}
\widehat{C}_{6,7} &= 9182\left(\prod_{j=1}^{7} f_j\right) \\
&= 9182(1.99147) \\
&= 18{,}285.7 \\
\widehat{R}_6 &= \widehat{C}_{6,7} - 9{,}182 \\
&= 9103.7
\end{align*}$$

### Examiner Report
Part A

Even though many candidates technically knew the definitions of short-tailed and long-tailed insurance, they applied the examples in the textbook dogmatically to decide that the business was long-tailed, instead of applying own their judgment. The calculation in part (ii) was well answered by most candidates.

## Part b (2 points)

(i) The Earned Premium in AY 6 is 18,000 and the expected loss ratio at issue is 0.85. Show that the estimated outstanding claims for AY6 using the Bornhuetter-Ferguson method is 7,600 to the nearest 100. You should calculate the value to the nearest 1.

(ii) Describe one advantage and one disadvantage of the Bornhuetter-Ferguson method compared with the Chain Ladder method.

### Explanation
(i)

$$\widetilde{C}_{6,7} = \widehat{\beta}_1\widehat{C}_{6,7} + \left(1 - \widehat{\beta}_1\right)\mu_6$$

$$\widehat{C}_{6,7} = 18{,}285.7 \text{ (from (a))}$$

$$\widehat{\beta}_1 = \frac{1}{\widehat{\lambda}_1} = \frac{1}{1.99147} = 0.502141$$

$$\mu_6 = 0.85(18{,}000) = 16{,}200$$

$$\Rightarrow \widetilde{C}_{6,7} = 0.502141(18{,}285.7) + 0.497849(16{,}200) = 16{,}799$$

$$\Rightarrow \widetilde{R}_{6,7} = 16{,}799 - 9{,}182 = 7{,}617$$

(ii) Advantage: Less weight placed on very early claims information, i.e. from the latest accident years.

Disadvantage: The value for $\mu$ is rather arbitrary. Using the loss ratio method, if the premiums are too low, then the OCR will also be too low.

### Examiner Report
Part B

The calculation part was well answered by most candidates. Many candidates offered valid alternatives solutions. For part (ii), many candidates were able to provide an advantage. For the disadvantage, many did not clearly make the point that is arbitrary.

## Part c (3 points)

You are given the following four assumptions for Mack's model.

- (A1) $C_{i,j}$ and $C_{l,k}$ are independent for $i \ne l$ and for all $j, k$.
- (A2) For a given accident year (AY) $i$, $\{C_{i,j}\}_{j=0,1,2\ldots}$ is a Markov Chain.
- (A3) There exist $f_j$ such that $\mathrm{E}\left[C_{i,j+1} \mid C_{i,j}\right] = f_j\,C_{i,j}$.
- (A4) There exist $\sigma_j^2$ such that $\mathrm{Var}\left[C_{i,j+1} \mid C_{i,j}\right] = \sigma_j^2\,C_{i,j}$.

(i) Explain briefly how these assumptions differ from the Chain Ladder assumptions.

(ii) Show that under Mack's model

$$\mathrm{Var}\left[C_{i,j+2} \mid C_{i,j}\right] = C_{i,j}\left(\sigma_{j+1}^2 f_j + f_{j+1}^2\sigma_j^2\right)$$

### Explanation
(i) A1. and A3. are the same as the Chain Ladder assumptions;. A2. and A4 are specific to the Mack Model.

(ii) We have that $\mathrm{E}\left[C_{i,j+1} \mid C_{i,j}\right] = f_j\,C_{i,j}$ (A3) and $\mathrm{Var}\left[C_{i,j+1} \mid C_{i,j}\right] = \sigma_j^2\,C_{i,j}$ (A4).

For $C_{i,j+2}$ we condition on $C_{i,j+1}$ (as well as $C_{i,j}$) and then use (A3) and (A4), for the moments of $C_{i,j+2}$ given $C_{i,j+1}$.

(Note that given $C_{i,j+1}$, we gain no extra information from $C_{i,j}$ because the process is Markov (A2). )

That is

$$\mathrm{Var}\left[C_{i,j+2} \mid C_{i,j}\right] = \mathrm{E}\Big[\mathrm{Var}\left[C_{i,j+2} \mid C_{i,j+1}, C_{i,j}\right]\Big] + \mathrm{Var}\Big[\mathrm{E}\left[C_{i,j+2} \mid C_{i,j+1}, C_{i,j}\right]\Big]$$

$$\begin{align*}
\text{Now } \mathrm{Var}\left[C_{i,j+2} \mid C_{i,j+1}, C_{i,j}\right] &= \sigma_{j+1}^2 C_{i,j+1} && \text{(A4)} \\
\text{and } \mathrm{E}\left[C_{i,j+2} \mid C_{i,j+1}, C_{i,j}\right] &= f_{j+1}C_{i,j+1} && \text{(A3)}
\end{align*}$$

$$\begin{align*}
\text{So } E\Big[\mathrm{Var}\left[C_{i,j+2} \mid C_{i,j+1}, C_{i,j}\right]\Big] &= E\left[\sigma_{j+1}^2 C_{i,j+1} \mid C_{i,j}\right] \\
&= \sigma_{j+1}^2 f_j C_{i,j} && \text{(A3)} \\
\text{and } \mathrm{Var}\Big[E\left[C_{i,j+2} \mid C_{i,j+1}, C_{i,j}\right]\Big] &= Var\left[f_{j+1}C_{i,j+1} \mid C_{i,j}\right] \\
&= f_{j+1}^2\sigma_j^2 C_{i,j} && \text{(A4)}
\end{align*}$$

$$\begin{align*}
\Rightarrow \mathrm{Var}\left[C_{i,j+2} \mid C_{i,j}\right] &= \sigma_{j+1}^2 f_j C_{i,j} + f_{j+1}^2\sigma_j^2 C_{i,j} \\
&= C_{i,j}\left(\sigma_{j+1}^2 f_j + f_{j+1}^2\sigma_j^2\right)
\end{align*}$$

### Examiner Report
Part C

Many candidates scored well here. More candidates were comfortable with the chain ladder assumptions than with the Mack model assumptions. Only the best candidates could complete the proof, which came directly from the source material.

## Part d (2 points)

Your colleague has fitted Mack's model to the runoff triangle in (a), using the R ChainLadder package. The results are summarized in the graphs below. Note that there are 26 residual values shown in each of the lower four residual plots.

![R plots for Mack Model fit to Question 6 data, six panels. Top left, Mack Chain Ladder Results: a bar per accident year 0 to 7, Latest (dark) and Forecast (light) amounts with error bars, the forecast share and the error bars largest for AYs 6 and 7. Top right, Chain ladder developments by origin period: cumulative amount against development year 0 to 7, one curve per accident year. Middle left: standardised residuals against fitted value (about 6,000 to 15,000); the red smoother rises from about -1 to just above 0 near 11,000 and falls slightly below 0 at the high end. Middle right: residuals against accident year 0 to 6; the smoother sits near -0.4 for AYs 0 to 2 and rises to about 1.5 by AY 6. Bottom left: residuals against calendar year 0 to 6; the smoother rises from below -1.5 at CY 0 to about 0.5 at CY 6. Bottom right: residuals against development year 0 to 5; the smoother is flat at 0. In all four residual plots the residuals lie between about -1.5 and 1.7.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/astam-2024f-q6-mack-plots.png)

(i) State with reasons whether the graphs show that the data are consistent with the Mack Model assumptions.

(ii) Explain briefly how the Mack Model estimates of outstanding claims compare with the chain ladder estimates.

### Explanation
(i)

- If the Mack Model assumptions are valid, the residuals should be independent and approximately N(0,1) distributed.
  - There are 26 residuals, so we would expect around 16% of them, i.e. around 4, to be greater than 1.0 in absolute value (as $\Phi(1.0) = 0.84$).
  - The residuals plots show that around 10 of the residuals are less than –1.0 or greater than 1.0, which is very unlikely if the residuals are N(0,1) distributed.
  - This is evidence that the data are not consistent with the model.
- On the other hand, all the residuals are within 2 standard deviations of the mean, which is consistent with the expectation that only 0.05(26)=0.3 residuals would have absolute value greater than 2.
- There appears to be an increasing trend of residuals by AY and CY, indicating that the observed values are systematically higher than the fitted values for later AYs, and also for later CYs. This points to a possible calendar year effect, which is inconsistent with the model assumptions.
- There is no systematic residual trend by DY, indicating that the Markov assumption is OK.

(ii) They are the same., (assuming that the development factors are estimated the same way, i.e. minimum variance).

### Examiner Report
Part D

Few candidates could interpret the residual graphs. Many candidates made general comments, but failed to refer to a specific graph. Graders were flexible in awarding points for different interpretations of the plots in part (i). For part (ii) it is sufficient to note that the estimates are the same (no need to include the comment in parentheses).

## Part e (2 points)

(i) You note from the R output that the sum of the Mean Square Errors of Prediction (MSEP) over all the AYs is $1428^2$, and that the total MSEP is $1547^2$.

Your colleague says that this must be an error, as the model assumption A1 states that each AY is independent. Critique this comment.

(ii) Another colleague notes that the Bornhuetter-Ferguson estimate of the final cumulative claims for AY6 (from (b) above) lies outside the AY6 whiskers in the top left plot. State with reasons which estimate you would recommend to the insurer.

### Explanation
(i) The AY's are only conditionally independent, conditional on knowing the $f_j$ and $\sigma_j$ parameters.

The total MSEP is the sum of the process variance and the (squared) estimation error. The process variance is additive by AY.

The estimation error involves uncertainty in the estimated $\hat C_{i,J}$ values, i.e. uncertainty from parameter estimation. Since the parameters are the same for each AY, these errors are not independent, and the total MSEP must allow for the contribution of covariances between AYs in the estimation error.

(ii) I would recommend the Mack Model estimate because

1. It is fully empirical, that is, it involves no subjective inputs, unlike B-F where the $\mu$ parameter is subjective.
2. It is higher than the B-F estimate, so is a more safe-side selection.

Reasons for not using Mack:

1. The output shows that the data may not comply with the MM assumptions.

### Examiner Report
Part E

For part (i), few candidates grasped the main point, which was dependency through parameter uncertainty.

For part (ii), either answer was acceptable if justified. Many candidates were able to make and justify their recommendations.
