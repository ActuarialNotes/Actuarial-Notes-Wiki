---
id: "astam-2025s-q2"
exam: "Exam ASTAM"
topic: "Panjer Recursion"
learning_objective: "Aggregate Models"
difficulty: medium
type: multi-part
year: 2025
session: Spring
wiki_link:
  - Concepts/Panjer+Recursion
  - Concepts/Aggregate+Loss+Model
  - Concepts/Poisson+Superposition
  - Concepts/Mixture+Distribution
  - Concepts/Stop-Loss+Reinsurance
  - Concepts/Frequency
points: 11
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:f0952f6e7ca744c3aeef9cf4f90aa7069cf847493a8c3b476651751ca49153c4
  sources:
    - "SOA Exam ASTAM Spring 2025 — exam questions, Q2, pp.4-5, sha256:6abc81ba7d868ecb7eb1a7a747b4558adcfc1794531dcef0ef95c6c8f82c33e6 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/exams/spring-2025-astam-exam.pdf"
    - "SOA Exam ASTAM Spring 2025 — model solutions and examiners' comments, Q2, pp.2-5, sha256:f651a9645c9b8ace921bb11d9def2e3655895a0fd6c563fe8777c43eb3f706e5 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/solutions/2025-spring-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2025s-q2.md
---

An insurance company is analyzing a portfolio of 10 independent auto insurance policies. Drivers are classified into two categories, "Urban Drivers" and "Rural Drivers".

You are given:

(i) The annual number of claims from an "Urban Driver" follows a Poisson distribution with mean 0.5, and the annual number of claims from a "Rural Driver" follows a Poisson distribution with mean 0.3.

(ii) Four policies are issued to "Urban Drivers" and six policies are issued to "Rural Drivers".

(iii) The following table shows the distribution of claims severity, $X$, for "Urban Drivers" and "Rural Drivers":

| Amount $x$ | $\Pr[X=x]$ "Urban Drivers" | $\Pr[X=x]$ "Rural Drivers" |
|---|---|---|
| 1 | 0.60 | 0.10 |
| 2 | 0.30 | 0.40 |
| 3 | 0.10 | 0.50 |

You are given that the aggregate annual claims for the portfolio, $S$, has a compound Poisson distribution with Poisson parameter $\lambda$ and associated single claim distribution $F_X$. Let $f_X$ denote the probability function of $F_X$.

## Part a (1 point)

Assume $N_1 \sim \text{Poisson}(\lambda_1)$ and $N_2 \sim \text{Poisson}(\lambda_2)$, and that $N_1$ and $N_2$ are independent.

Use probability generating functions to show that $N_1 + N_2 \sim \text{Poisson}(\lambda_1 + \lambda_2)$.

### Explanation

We have $N_1 \sim \text{Poi}(\lambda_1)$ and $N_2 \sim \text{Poi}(\lambda_2)$. Let $N = N_1 + N_2$.

$$
\begin{align*}
P_N(z) &= E\left[z^N\right] \\
       &= E\left[z^{N_1+N_2}\right] \\
&= E\left[z^{N_1} \times z^{N_2}\right] \\
&= E\left[z^{N_1}\right] E\left[z^{N_2}\right] \quad \text{by independence} \\
&= P_{N_1}(z)\, P_{N_2}(z) \\
&= \left(e^{\lambda_1(z-1)}\right)\left(e^{\lambda_2(z-1)}\right) \quad \text{(formula sheet)} \\
&= e^{(\lambda_1+\lambda_2)(z-1)} \Rightarrow N \sim \text{Poi}(\lambda_1+\lambda_2)
\end{align*}
$$

### Examiner Report

Examiners' Notes:

1. Read the question carefully. It asks to use PGF, not the probability distribution functions.
2. For full credit, candidates needed to provide a clear explanation of each step. Most candidates did not state that the second line was due to independence.
3. The underlining principle for this part is the one-on-one relationship between distributions and PGF functions. Hence you need prove that the PGF of (N1 + N2) is same as the PGF of a new Poisson distribution. So you lay out the PGF of (N1 + N2) using the definitive formula, then work it towards the distinctive expression of Poisson's PGF, and on the way you use (and say it clearly) the important condition of independence.

## Part b (2 points)

Calculate the mean and standard deviation of aggregate annual claims for an individual "Urban Driver" policy.

### Explanation

The aggregate claims from an individual Urban (U) policy, $S_u$, are compound Poisson (Co Poi) distributed, with Poisson parameter $\lambda_u = 0.5$, and with severity random variable $X_u$. From properties of Co Poi distributions, we have for the mean:

$$E[S_u] = \lambda_u E[X_u] = 0.5 \times 1.5 = 0.75$$

where $E[X_u] = 0.6 \times 1 + 0.3 \times 2 + 0.1 \times 3 = 1.5$.

And for the standard deviation, either:

$$
\begin{align*}
V[S_u] &= \lambda_u E\left[X_u^2\right] \\
E\left[X_u^2\right] &= 0.6 \times 1 + 0.3 \times 4 + 0.1 \times 9 \\
                    &= 2.7 \\
\Rightarrow V[S_u] &= 0.5 \times 2.7 \\
                   &= 1.35
\end{align*}
$$

$$\Rightarrow SD[S_u] = 1.1619$$

Or:

$$
\begin{align*}
V[S_u] &= E\big[V[S_u \mid N_u]\big] + V\big[E[S_u \mid N_u]\big] \\
&= E\big[N \times V[X_u]\big] + V\big[N \times E[X_u]\big] \\
&= \lambda_u V[X_u] + \lambda_u \left(E[X_u]\right)^2 \\
V[X_u] &= E\left[X_u^2\right] - \left(E[X_u]\right)^2 \\
       &= 2.7 - 1.5^2 \\
&= 0.45 \\
\Rightarrow V[S_u] &= 0.5 \times 0.45 + 0.5 \times 1.5^2 \\
&= 1.35 \\
\Rightarrow SD[S_u] &= 1.1619
\end{align*}
$$

### Examiner Report

Examiners' Notes:

1. Most candidates earned full credit for this part.
2. Read the question carefully. It is asking for results for one urban policy. It is not asking for the results for all four urban policies or for the entire portfolio.

## Part c (3 points)

(i) Calculate $\lambda$.

(ii) Show that $f_X(1) = 0.36$ to the nearest 0.01. You should calculate the value to the nearest 0.001.

(iii) Calculate $f_X(2)$ and $f_X(3)$.

### Explanation

(i) The total number of claims from Urban drivers is $\lambda_U = 4(0.5) = 2.0$. Similarly the total number of claims from Rural drivers is $\lambda_R = 6(0.3) = 1.8$. So the total number of claims from all drivers is Poisson with $\lambda = 3.8$.

(ii) The probability function for the merged portfolio is a weighted average of the individual severity distribution, with $\lambda_U$ and $\lambda_R$ acting as weights. So

$$f_X(1) = \frac{2(0.60) + 1.8(0.10)}{3.8} = 0.36316$$

(iii) Similarly:

$$f_X(2) = \frac{2(0.30) + 1.8(0.40)}{3.8} = 0.34737$$

$$f_X(3) = \frac{2(0.10) + 1.8(0.50)}{3.8} = 0.28947$$

$$\left(\text{or } f_X(3) = 1 - f_X(1) - f_X(2) = 0.28947\right)$$

### Examiner Report

Examiners' Notes:

1. Candidates did poorly on this part. Very few got part (a) correct with most determining that the $\lambda = 0.8$ which was the sum of the two $\lambda$. Part (i) is based on Part a), but from 4 U and 6 R polices.
2. To solve parts (ii) and (iii) correctly students need know that the severity of any individual claim in the portfolio is mixed distribution of the severities of U and R policies, with weights determined by the means of two original Poisson distributions that depict the frequency of Urban and Rural policies.
3. A common error is to use Poisson distribution to calculate the severity distribution.

## Part d (3 points)

(i) Calculate $\Pr[S = 0]$.

(ii) Calculate $\Pr[S = 2]$ using recursion or otherwise.

### Explanation

(i) The probability is $\Pr[N = 0] = e^{-3.8} = 0.022371$.

(ii) Let $g(s)$ denote the aggregate claim probability function, and $f(y)$ denote the claim severity probability function. For the Poisson distribution, the $a$, $b$ parameters are $a = 0$, $b = \lambda$, so that the recursion formula is

$$
\begin{align*}
g(s) &= \frac{\lambda}{s} \sum_{j=1}^{s} j f_X(j)\, g(s-j) \\
g(0) &= \Pr[N=0] = 0.02237 \\
g(1) &= \lambda f_X(1)\, g(0) \\
     &= 0.03087 \\
g(2) &= \frac{\lambda}{2}\big(f_X(1)\, g(1) + 2 f_X(2)\, g(0)\big) \\
     &= 0.05083
\end{align*}
$$

Or

Let $p_k = \Pr[N=k] = \dfrac{\lambda^k}{k!} e^{-\lambda}$ denote the Poisson probability function. Then

$$
\begin{align*}
g(2) &= p_1 f_X(2) + p_2 \big(f_X(1)\big)^2 \\
&= 0.08501(0.34737) + 0.16152(0.36316)^2 \\
&= 0.05083
\end{align*}
$$

### Examiner Report

Examiners' Notes:

1. Candidates did better on this part that on Part (c).
2. Most got Part (a) correct and about half earned most of all of the points for part (b).

## Part e (2 points)

Calculate the net stop-loss premium for the total annual claims for the portfolio with an aggregate deductible of 3.

### Explanation

The net premium for the stop loss is

$$
\begin{align*}
P &= \sum_{y=3}^{\infty} (y-3)\, g(y) = \sum_{y=3}^{\infty} y\, g(y) - 3 \sum_{y=3}^{\infty} g(y) \\
&= \sum_{y=0}^{\infty} y\, g(y) - \big(g(1) + 2g(2)\big) - 3\big(1 - (g(0) + g(1) + g(2))\big) \\
&= E[S] - E[S \wedge 3]
\end{align*}
$$

We have

$$
\begin{align*}
E[S] &= \lambda E[X] \\
E[X] &= f_X(1) + 2 f_X(2) + 3 f_X(3) \\
     &= 1.92631 \\
\Rightarrow E[S] &= 3.8 \times 1.92631 \\
                 &= 7.32
\end{align*}
$$

Or

$$E[S] = 6E[S_R] + 4E[S_U] = 4(0.75) + 6(0.72) = 7.32$$

$$
\begin{align*}
E[S \wedge 3] &= g(1) + 2g(2) + 3\big(1 - (g(0) + g(1) + g(2))\big) \\
&= 0.03087 + 2 \times 0.05083 + 3 \times 0.89593 \\
&= 2.82031
\end{align*}
$$

$$\Rightarrow P = 7.3200 - 2.8203 = 4.500$$

### Examiner Report

Examiners' Comment:

1. Most candidates knew that $P = E[S] - E[S \wedge 3]$.
2. Candidates struggled to calculate either of the values $E[S]$ or $E[S \wedge 3]$. The whole concept was that the information needed to calculate these values was available from prior parts but most candidates did not use these values.
