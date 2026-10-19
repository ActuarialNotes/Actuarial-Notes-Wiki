---
id: "astam-2024s-q5"
exam: "Exam ASTAM"
topic: "Bühlmann Credibility"
learning_objective: "Credibility"
difficulty: medium
type: multi-part
year: 2024
session: Spring
wiki_link:
  - Concepts/Bühlmann+Credibility
  - Concepts/Bayesian+Estimation
  - Concepts/Credibility
  - Concepts/Expected+Value+of+Process+Variance
points: 12
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bc94cf1c0328490d667cbb5bb267b725630d2f43dc2c71e12333820c2d3d61e7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2024s-q5.md
---

A company sells three classes of policies, A, B, and C, in equal numbers. The per-policy aggregate loss distributions for policies in each class, for one exposure period, are as follows:

| Policy Class | Loss Amount 0 | Loss Amount 100 | Loss Amount 500 |
|---|---|---|---|
| A | 0.90 | 0.07 | 0.03 |
| B | 0.50 | 0.30 | 0.20 |
| C | 0.30 | 0.33 | 0.37 |

## Part a (2 points)

Show that the expected value of the hypothetical means is 120 to the nearest 10. You should calculate the value to the nearest 0.1.

### Explanation
Let $M$ denote the mean loss for a randomly selected policy, and let $M_Y$ denote the mean loss from a policy given that the policy is from class $Y$, $Y \in \{A, B, C\}$. Note that each class is equally likely for a policy drawn at random.

$$\begin{align*}
M_A &= (0)(0.9) + (100)(0.07) + (500)(0.03) \\
&= 22 \\
M_B &= (0)(0.5) + (100)(0.3) + (500)(0.2) \\
&= 130 \\
M_C &= (0)(0.3) + (100)(0.33) + (500)(0.37) \\
&= 218 \\
\mu = E[M] &= \frac{22 + 130 + 218}{3} \\
&= 123.33
\end{align*}$$

### Examiner Report
a) Candidates did very well on this part, and most earned full credit

## Part b (2 points)

Show that the expected value of the process variance, $v$, is 30,700 to the nearest 100. You should calculate the value to the nearest 1.

### Explanation
Let $V$ denote the variance of loss for a policy drawn at random, and let $V_Y$ denote the variance for a policy given that the policy class is $Y$.

$$\begin{align*}
V_A &= (0)^2(0.9) + (100)^2(0.07) + (500)^2(0.03) - 22^2 \\
&= 7716 \\
V_B &= (0)^2(0.5) + (100)^2(0.3) + (500)^2(0.2) - 130^2 \\
&= 36{,}100 \\
V_C &= (0)^2(0.3) + (100)^2(0.33) + (500)^2(0.37) - 218^2 \\
&= 48{,}276
\end{align*}$$

$$E[V] = v = \frac{7{,}716 + 36{,}100 + 48{,}276}{3} = 30{,}697.33$$

### Examiner Report
b) Candidates did very well on this part, and many earned full credit

## Part c (2 points)

Show that the variance of the hypothetical means, $a$, is 6400 to the nearest 100. You should calculate the value to the nearest 1.

### Explanation
$$\begin{align*}
a = Var[M] &= E[M^2] - E[M]^2 \\
&= \frac{22^2 + 130^2 + 218^2}{3} - 123.33^2 \\
&= 21636 - 123.33^2 \\
&= 6{,}425.71
\end{align*}$$

### Examiner Report
c) Candidates did well on this part. A few candidates did not know how to interpret a and used an incorrect or overly complicated formula to calculate variance.

## Part d (2 points)

A policy is chosen at random and is observed to have losses of 500 in the first exposure period, 100 in the second exposure period, and 100 in the third exposure period.

Determine the Bühlmann credibility estimate of the net premium for the policy's fourth exposure period.

### Explanation
$$\bar X_i = \frac{500 + 100 + 100}{3} = 233.33$$

$$Z = \frac{n}{n + \frac{v}{a}} = \frac{3}{3 + \frac{30{,}697.33}{6{,}425.71}} = \frac{3}{3 + 4.77727} = 0.3857$$

The credibility premium is

$$\begin{align*}
\Rightarrow P^{cred} &= Z\bar X_i + (1 - Z)\mu \\
&= 0.3857(233.33) + 0.6143(123.33) \\
&= 165.77
\end{align*}$$

### Examiner Report
d) Candidates did well on this part; the most common error was not completing the final step with the premium calculation.

## Part e (2 points)

Calculate the Bayesian estimate of the net premium for the policy's fourth exposure period.

### Explanation
The posterior probabilities for each policy class are as follows. $K$ is a constant of proportionality.

$$\begin{align*}
\pi(A) &= \frac{1}{3}\Big(\big(p(500|\text{class } A) \times p(100|\text{class } A)^2\big)K \\
&= \frac{0.03 \times 0.07^2 \times K}{3} \\
&= 0.000049K \\
\pi(B) &= \frac{0.20 \times 0.30^2 \times K}{3} \\
&= 0.00600K \\
\pi(C) &= \frac{0.37 \times 0.33^2 \times K}{3} \\
&= 0.013431K
\end{align*}$$

$$\pi(A) + \pi(B) + \pi(C) = 1 \Rightarrow K = 51.3347$$

$$\Rightarrow \pi(A) = 0.002515; \quad \pi(B) = 0.308008; \quad \pi(C) = 0.689476$$

$$\Rightarrow P^{Bayes} = 0.002515(22) + 0.308008(130) + 0.689476(218) = 190.40$$

### Examiner Report
e) Many candidates struggled with or omitted this part and had difficulty interpreting the Bayesian estimate. The most common error was not calculating the correct posterior probability.

## Part f (2 points)

(i) Suppose that $v$ increases while $a$ stays the same. Explain why the resulting change in the Bühlmann credibility factor (that is, increase, decrease, or stay the same) is reasonable.

(ii) Suppose that $a$ increases while $v$ stays the same. Explain why the resulting change in the Bühlmann credibility factor is reasonable.

(iii) Suppose that the number of years of data increases, while $a$ and $v$ remain the same. Explain why the resulting change in the Bühlmann credibility factor is reasonable.

### Explanation
(i) When $v$ increases, $Z$ decreases. This is reasonable, because a larger process variance indicates more uncertainty in the data from the individual risk, and therefore less credibility assigned to the individual risk.

(ii) When $a$ increases, $Z$ also increases. This is reasonable because a larger $a$ indicates more uncertainty in the collective estimate of the mean, indicating that we should place less weight on the collective and more weight on the individual risk experience.

(iii) When the number of years, $n$, increases, $Z$ also increases. This is reasonable, as more data from the individual risks indicates more information, which allows a higher credibility for the individual risks relative to the collective.

### Examiner Report
f) Most candidates were able to correctly identify the direction of the impacts to the credibility factor but were unable to explain why. Solely referencing the formula for z was not sufficient justification for why the change was reasonable.

In general, candidates should remember to show their work; simply stating that a calculation was done in Excel or their calculator without explanation is not considered showing work. Please remember that both the work and the answer is graded and partial credit can only be given for work shown. For questions 2 through 6, only the work on the written paper is graded. Work done in Excel is not reviewed.
