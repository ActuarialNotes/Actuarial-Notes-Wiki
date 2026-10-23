---
id: "astam-2023s-q4"
exam: "Exam ASTAM"
topic: "Risk Measure"
learning_objective: "Severity Models"
difficulty: medium
type: multi-part
year: 2023
session: Spring
wiki_link:
  - Concepts/Risk+Measure
  - Concepts/Generalized+Pareto+Distribution
  - Concepts/Mean+Excess+Loss
  - Concepts/Empirical+Distribution
  - Concepts/Tail+Weight
points: 9
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:dafa0e171845ce040e228b9085c4503a66326a8fe97d0310ef005ae1d2d9d937
  sources:
    - "SOA Exam ASTAM Spring 2023 (April 26, 2023), question booklet, Q4, pp.7-8, sha256:fc23b48a1dbfd1d9c85380d5a3605927ba53d90641d5dcba1ab238bf3e02abaf — https://www.soa.org/globalassets/assets/files/edu/2023/spring/exams/spring-2023-exam-astam.pdf"
    - "SOA ASTAM April 2023 Model Solutions, Q4, pp.10-11, sha256:ac32f8885c3d0e8456bb4edec83c8bf8a89243d21bd6ddaa232842c22d3640a3 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/solutions/spring-2023-solutions-astam.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2023s-q4.md
---

A company is modeling the severity of flood losses. The following table shows the largest 20 values from a sample of 750 observations in decreasing order, with their ranks.

| Rank | 750 | 749 | 748 | 747 | 746 | 745 | 744 | 743 | 742 | 741 |
|---|---|---|---|---|---|---|---|---|---|---|
| Loss | 28,250 | 14,782 | 12,427 | 9,676 | 7,005 | 4,322 | 4,057 | 3,773 | 3,504 | 3,123 |

| Rank | 740 | 739 | 738 | 737 | 736 | 735 | 734 | 733 | 732 | 731 |
|---|---|---|---|---|---|---|---|---|---|---|
| Loss | 2,924 | 2,780 | 2,656 | 2,483 | 2,441 | 2,357 | 2,067 | 2,045 | 2,008 | 1,977 |

For convenience, you are also given that the total of the largest 10 losses is 90,919.

## Part a (3 points)

- (i) Estimate the 98.4% Value at Risk (VaR) of the losses, using the smoothed empirical method.
- (ii) Estimate the 98.4% Expected Shortfall of the losses.
- (iii) Calculate the empirical Mean Excess Loss, $\hat{e}(x)$, at $x = 3{,}000$.

### Explanation
Note that $98.4\%(751) = 738.984$ belongs to $(738, 739)$. Let $X_{(k)}$ denote the $k$-th smallest flood loss value.

**(i)** Using the smoothed empirical method

$$
\hat{Q}_{98.4\%} = 0.016\left(X_{(738)}\right) + 0.984\left(X_{(739)}\right) = 2778
$$

**(ii)**

$$
\widehat{ES}_{98.4\%} = \frac{X_{(739)} + \dots + X_{(750)}}{12} = \frac{90919 + 2924 + 2780}{12} = 8052
$$

**(iii)**

$$
\hat{e}(3000) = \left(\text{ave of all values} > 3000\right) - 3000 = \frac{90919}{10} - 3000 = 6091.9
$$

### Examiner Report
Performance on part (a) was very mixed. Many candidates lost a small amount of credit for using the raw quantile estimate instead of the smoothed value. Some candidates stated that their calculations were done in Excel. For maximum credit, they needed to write down on their answer sheets the formulas used.

## Part b (1 point)

The actuary decides to estimate the risk measures using the Generalized Pareto Distribution (GPD) for the excess loss distribution. She has created the following plot of the empirical mean excess loss function. (The last five points are excluded).

![Scatter plot of the empirical mean excess loss (vertical axis, 0 to above 15,000) against the threshold (horizontal axis, 0 to above 8,000). The points fall gently from about 1,600 at threshold 0 to a minimum near a threshold of 1,300 to 1,500, rise very steeply to about 8,000 at a threshold a little above 2,000, then keep rising more slowly and roughly in a straight line to about 19,000 at a threshold above 8,000.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/astam-2023s-q4-mean-excess.png)

The actuary proposes a threshold of $d = 2{,}100$ for fitting the GPD. Her colleague points out that there is a gradient change at 1,500. He states that this would be a better threshold because it provides more data to fit the GPD.

Critique the colleague's suggestion.

### Explanation
We expect the distribution of excess loss, $(X - d \mid X > d)$ to converge to the GPD as $d \to \infty$. This means that the MEL function should converge to the MEL of the GPD, (i.e. a straight line) as the excess loss threshold increases. Thus, we are looking for the *ultimate* gradient of the MEL, which is clearly not represented by the shape change at around 1500.

### Examiner Report
Around 50% of candidates understood the key point in (b), that it is the gradient in the tail that matters.

## Part c (3 points)

The MLE estimators with $d = 2{,}100$ are $\hat{\xi} = 0.68$ and $\hat{\beta} = 2{,}000$.

- (i) Show that the 98.4% VaR of the loss using the fitted GPD is 2,700 to the nearest 100. You should calculate the value to the nearest 1.
- (ii) Calculate the 98.4% Expected Shortfall (ES) using the fitted GPD.

### Explanation
**(i)**

$$
Q_\alpha = d + \frac{\beta}{\xi}\left(\left(\frac{S_X(d)}{1 - \alpha}\right)^{\xi} - 1\right) \quad \text{(formula sheet)}
$$

$$
d = 2100;\quad \alpha = 0.984;\quad S_X(d) \approx \frac{16}{750}
$$

$$
\Rightarrow \hat{Q}_\alpha = 2100 + \frac{2000}{0.68}\left(\left(\frac{16/750}{0.016}\right)^{0.68} - 1\right) = 2735
$$

**(ii)**

$$
ES_\alpha = \frac{1}{1 - \xi}\left(Q_\alpha + \beta - \xi d\right) \quad \text{(formula sheet)}
$$

$$
\Rightarrow \widehat{ES}_\alpha = \frac{1}{0.32}\left(2735 + 2000 - 0.68(2100)\right) = 10{,}334
$$

### Examiner Report
Part (c) was done well by those who attempted it. The main error was misunderstanding the role of SX(d) in the quantile formula.

## Part d (2 points)

- (i) Explain why the VaR estimates in part (a) and in part (c) are similar, while the Expected Shortfall estimates are quite different.
- (ii) Recommend which Expected Shortfall estimate the company should use for assessing its potential risk. Justify your answer.

### Explanation
The VaR estimates are similar, at around 2700. We see from the MEL plot that this is close to the point where the distribution starts to exhibit its tail GPD behaviour; the stretching out of the tail beyond the threshold does not have much effect this close to the threshold, so the empirical VaR will be close to the GPD.

The ES estimates are very different, (8052 compared with 10334). The MEL plot has a positive right tail gradient, indicating a very fat-tailed distribution. It is common with fat-tailed distributions for the empirical tail ES to be less than the GPD estimate.

The empirical estimate is limited by the size of the largest 1 or 2 observations. Occasionally these will be jumbo values (i.e. very rare very very large losses) but more often they will not be.

The GPD estimate uses the GPD extrapolation beyond the observed data, and so will always allow for the jumbo losses. Since the ES is an average from the entire right tail of the loss distribution, the impact of the jumbo losses is often significant. So the recommended indicator should be the GPD estimate.

### Examiner Report
The solution for part (d) shown above is far more detailed than would be required for maximum credit. The key points are that the VaR may not be much affected by the tail of a fat-tailed distribution, so GPD estimate is often close to the empirical, but the ES uses the whole tail of the distribution, which includes the very rare, very large claims, and therefore will commonly be greater than empirical (unless the empirical data includes a very rare jumbo claim). Many candidates omitted this part.
