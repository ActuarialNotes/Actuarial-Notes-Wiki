---
id: "astam-2026s-q3"
exam: "Exam ASTAM"
topic: "Aggregate Loss Model"
learning_objective: "Aggregate Models"
difficulty: medium
type: multi-part
year: 2026
session: Spring
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Normal+Approximation
  - Concepts/Portfolio+Percentile+Principle
  - Concepts/Profit+Margin
  - Concepts/Severity+Discretization
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8166a008aae960f538851a0b1aa2ef316bd5a9a3fda5bcc839efb6a420868863
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2026s-q3.md
---

For a medical insurance policy, the number of claims follows a Poisson distribution with $\lambda = 2$. The amount of each claim follows an exponential distribution with $\theta = 1000$. Let $S$ denote the aggregate claims random variable for an individual policy.

## Part a (2 points)

(i) Calculate $E[S]$.

(ii) Calculate the standard deviation of $S$.

### Explanation
(i) $$E[S] = E[N]E[X] = (2)(1000) = 2000$$

(ii)

$$\begin{align*}
V[S] &= E[N]V(X) + V[N]\left(E[X]\right)^2 \\
&= \lambda\theta^2 + \lambda\theta^2 \\
 &= 2(2)\left(\theta^2\right) \\
\Rightarrow SD[S] &= 2\theta = 2000
\end{align*}$$

(Or: $V[S] = \lambda E\left[X^2\right] = 2\left(2\theta^2\right) = 4\theta^2$)

## Part b (1 point)

During 2025, the company expects to issue 10,000 independent policies. Let $S_P$ denote the random variable representing the total claims for the portfolio.

Using the normal approximation, show that the 95th percentile of $S_P$ is 20,330,000 to the nearest 10,000. You should calculate the value to the nearest 1000.

### Explanation
Let $S_P$ denote the aggregate claims over the whole portfolio. Then

$$\begin{align*}
E[S_P] &= (10{,}000)(2000) \\
       &= 20{,}000{,}000 \\
V[S_P] &= (10{,}000)(4{,}000{,}000) \\
       &= (200{,}000)^2 \\
S_P &\approx \mathrm{N}\left(\mu = 20{,}000{,}000,\ \sigma^2 = (200{,}000)^2\right) \\
\Rightarrow Q_{0.95}\left(S_P\right) &\approx \mu + 1.64485\sigma = 20{,}328{,}971
\end{align*}$$

### Examiner Report
Almost all candidates earned full credit for (a), and most also earned full credit for (b).

## Part c (2.5 points)

You are given the following assumptions used for calculating premiums.

- The total claims for the portfolio are assumed to be equal to the 95th percentile of $S_P$, as calculated in (b) above.
- Commissions are 8% of the gross premiums.
- Marginal expenses are 12% of the gross premiums.
- Fixed expenses during 2025 will be 300,000 to cover the 10,000 policies.
- The target profit margin, based on the above assumptions, is 5% of the gross premiums.

(i) Show that the gross premium rate per policy is 2,750 to the nearest 10. You should calculate the value to the nearest 1.

(ii) Calculate the expected profit per policy.

### Explanation
(i) Let $G$ denote the gross premium for an individual policy. From the information given, we know that over the whole portfolio, premiums minus claims at the 95th percentile minus expenses = 5% of gross premiums, that is, for a portfolio of $n = 10{,}000$ policies:

$$\begin{align*}
nG - (0.08)nG - 0.12nG - Q_{0.95}\left(S_P\right) - 300{,}000 &= 0.05nG \\
\Rightarrow G = \frac{Q_{0.95}\left(S_P\right) + 300{,}000}{10{,}000\left(0.8 - 0.05\right)} &= \frac{20{,}628{,}971}{7500} \\
&= 2750.53
\end{align*}$$

(ii) The expected profit over the whole portfolio is

$$(10{,}000)(0.8G) - E\left[S_P\right] - 300{,}000 = 1{,}704{,}200$$

$\Rightarrow$ Expected profit per policy $= 170.42$

### Examiner Report
1. Almost all candidates calculated the premium correct but virtually no candidate correctly calculated the expected profit.
2. The expected profit includes both the 5% of explicit profit but also the profit expected from using the 95th percentile of claims as opposed to the expected value of claims. The term "expected" signals that the claims are included at their expected value, not at the quantile value used as a margin in the premium calculation.

## Part d (1.5 points)

In order to do additional analysis, the company uses a discretized severity distribution. Two methods of discretizing the severity distribution are (i) the method of rounding (mass dispersal) and (ii) local moment matching.

List one advantage and one disadvantage of each method.

### Explanation
**Method of rounding/mass dispersal:**

Advantage:

- The method is intuitive and easy to implement

Disadvantage:

- The moments of the discretized distribution will not match the moments of the original distribution.

**Method of local moment matching:**

Advantage:

- Greater accuracy for a given value of $h$ when used to approximate a compound distribution, compared with the method of rounding.

Disadvantage (one required)

- Far more complex calculation of probabilities.
- Formulas are not intuitive.
- For $p \ge 2$ the discretized "probabilities" may be negative.

### Examiner Report
1. The question asks for the advantages and disadvantages and not a description of the methods. No credit was given for the description of the methods.
2. The Examiners' are looking for evidence of understanding, rather than just doing a key word search. Candidates are encouraged to explain advantages and disadvantages in their own words (but briefly). The verbal questions are an opportunity for candidates to demonstrate their knowledge to the Examiners.

## Part e (3 points)

Let $Y^d$ denote the discretized severity random variable, let $h = 400$ denote the discretization step size, and let $f_k = \Pr\left[Y^d = kh\right]$ for $k = 0, 1, 2, 3 \ldots$

(i) Calculate $f_1$ to 4 decimal places using the method of rounding.

(ii) Calculate $f_1$ to 4 decimal places using the method of local moment matching, using one moment.

### Explanation
(i) $$f_1 = F(400 + 200) - F(400 - 200) = 0.451188 - 0.181269 = 0.26992$$

(ii)

$$\begin{align*}
f_1 &= \frac{2E[X \wedge 400] - E[X \wedge 0] - E[X \wedge 800]}{400} \\
&= \frac{2\left(2000\left[1 - e^{-\frac{400}{1000}}\right]\right) - 2000\left[1 - e^{-\frac{0}{1000}}\right] - 2000\left[1 - e^{-\frac{800}{1000}}\right]}{400} \\
&= \frac{2(329.68) - 0 - 550.67}{400} \\
&= 0.27172
\end{align*}$$

### Examiner Report
1. The formulas for the method of local moment matching and for $E[X \wedge x]$ for the exponential distribution are given in the formula sheet.
2. Candidates who attempted this part generally did well. The most common error was assuming that $E[X \wedge 0]$ is $E[X]$. In fact, $E[X \wedge 0] = E\left[\min(X, 0)\right] = 0$.
