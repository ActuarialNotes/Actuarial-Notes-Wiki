---
id: "astam-015"
exam: "Exam ASTAM"
topic: "Panjer Recursion"
learning_objective: "Aggregate Models"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Creating+New+Distributions
  - Concepts/Deductible
  - Concepts/Coverage+Modifications
  - Concepts/Negative+Binomial+Distribution
  - Concepts/Severity+Discretization
  - Concepts/Panjer+Recursion
  - Concepts/Continuous+Random+Variable
points: 0
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-25
  last_checked_by: agent:validate-v1
  content_hash: sha256:4fab420e53e8a8a8d0e0b32d7b046a6ba85a4aff0b0796441bd2463886c1135c
  sources:
    - "SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q15, p.20, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf"
    - "SOA ASTAM Solutions to Sample Questions, Q15, pp.29-30, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-015.md
---

The ground-up loss severity random variable for a liability insurance risk is denoted $Y$. Conditioning on $\Lambda = \lambda$, $Y$ follows an exponential distribution with mean $1/\lambda$, and $\Lambda$ is gamma distributed with $\alpha = 4$, and $\theta = 0.002$.

The number of losses has a negative binomial distribution with parameters $r = 2$ and $\beta = 1.5$.

Suppose that an ordinary deductible of 100 is applied to each individual loss.

## Part a

Show that the unconditional distribution function of the ground-up loss is

$$F_Y(y) = 1 - \left(\frac{500}{500 + y}\right)^4, \qquad y \ge 0.$$

### Explanation
$$
\begin{align*}
\Pr\left[Y > y\right] &= \int_0^\infty \Pr\left[Y > y \mid \Lambda = \lambda\right] f_\Lambda(\lambda)\, d\lambda \\
&= \int_0^\infty e^{-y\lambda} \frac{\lambda^{\alpha-1} e^{-\lambda/\theta}}{\theta^\alpha \Gamma(\alpha)}\, d\lambda
\end{align*}
$$

Let $\tau = \theta^{-1}$ -- this will just make the derivation less messy;

$$\Pr\left[Y > y\right] = \int_0^\infty \frac{\lambda^{\alpha-1} e^{-\lambda(\tau + y)} \tau^\alpha}{\Gamma(\alpha)}\, d\lambda = \int_0^\infty \frac{\lambda^{\alpha-1} e^{-\lambda(\tau + y)} (\tau + y)^\alpha}{\Gamma(\alpha)}\, d\lambda \left(\frac{\tau}{\tau + y}\right)^\alpha$$

$$\Pr\left[Y > y\right] = \left(\frac{\tau}{\tau + y}\right)^\alpha = \left(\frac{500}{500 + y}\right)^4 \Rightarrow F_Y(y) = 1 - \left(\frac{500}{500 + y}\right)^4.$$

In the penultimate line, we multiply and divide by $(\tau + y)^\alpha$ so that the integrand is the pdf of a gamma distribution, which must integrate to 1.0.

## Part b

Show that the distribution for the number of payments is negative binomial with $r = 2$, and $\beta^* = 0.72$ to the nearest 0.01. You should calculate the value to the nearest 0.001

### Explanation
Let $N$ denote the number of loss events, and $N^*$ the number of payments.

Let $q = \Pr\left[Y_j > 100\right] = \left(\dfrac{500}{600}\right)^4$

Let $I_j = \begin{cases} 1 & \text{if } Y_j > 100 \\ 0 & \text{otherwise} \end{cases}$

The probability generating function of $N^*$ is

$$
\begin{align*}
P_{N^*}(z) &= \sum_{n=0}^{\infty} \sum_{k=0}^{\infty} \Pr\left[N = n\right] \Pr\left[N^* = k \mid N = n\right] z^k \\
&= \sum_{n=0}^{\infty} \Pr\left[N = n\right] \left(\sum_{k=0}^{n} \Pr\left[I_1 + I_2 + \cdots + I_n = k\right] z^k\right) \\
&= \sum_{n=0}^{\infty} \Pr\left[N = n\right] \left(P_I(z)\right)^n \\
 &= P_N\left(P_I(z)\right)
\end{align*}
$$

as the PGF of a sum of independent random variables is the product of their PGFs. The $I_j$ indicator variables are Binomial$(1, q)$ distributed, so

$$
\begin{align*}
P_I(z) &= (1 + q(z - 1)) \\
P_N(z) &= \left(1 - \beta(z - 1)\right)^{-r} \\
\Rightarrow P_{N^*}(z) &= \left(1 - \beta\left(1 + q(z - 1) - 1\right)\right)^{-r} \\
&= \left(1 - \beta q(z - 1)\right)^{-r}
\end{align*}
$$

Which shows that the number of payments also has a negative binomial distribution, with the same $r$ parameter, and with $\beta^* = \beta q = 0.72338$.

## Part c

Show that the distribution of the amount paid per payment $Y^P$ is given by

$$F_{Y^P}(y) = 1 - \left(\frac{600}{600 + y}\right)^4, \qquad y \ge 0.$$

### Explanation
From the distribution function, we know that $Y$ has a Pareto distribution with parameters $\alpha = 4$, $\theta = 500$.

$$Y^P = Y - 100 \mid Y > 100$$

$$
\begin{align*}
\Pr\left[Y^P > y\right] &= \Pr\left[Y > 100 + y \mid Y > 100\right] \\
                        &= \frac{\Pr\left[Y > 100 + y\right]}{\Pr\left[Y > 100\right]} \\
&= \left(\frac{\theta}{\theta + 100 + y}\right)^\alpha \left(\frac{\theta + 100}{\theta}\right)^\alpha \\
&= \left(\frac{600}{600 + y}\right)^4
\end{align*}
$$

## Part d

Using the method of rounding, with a span of $h = 50$, calculate the first three values of the probability function of the discretized distribution for $Y^P$.

### Explanation
Let $K$ denote the discretized random variable associated with $Y^P$, using a step size of 50, so that $\Pr\left[K = k\right]$ is an approximation for the probability that the claim size is $50k$. Let $f_j$ denote the probability function for $K$, then

$$
\begin{align*}
f_0 &= \Pr\left[K = 0\right] \\
    &= \Pr\left[Y^P \le 25\right] \\
&= 1 - \left(\frac{600}{625}\right)^4 \\
&= 0.15065 \\
f_1 &= \Pr\left[K = 1\right] \\
    &= \Pr\left[25 < Y^P \le 75\right] \\
&= \left(\frac{600}{625}\right)^4 - \left(\frac{600}{675}\right)^4 \\
&= 0.22505 \\
f_2 &= \Pr\left[K = 2\right] \\
    &= \Pr\left[75 < Y^P \le 125\right] \\
&= \left(\frac{600}{675}\right)^4 - \left(\frac{600}{725}\right)^4 \\
&= 0.15521
\end{align*}
$$

## Part e

Use the recursive formula, with the discretized probabilities from (d), to estimate the probability that aggregate payments are less than or equal to 100.

### Explanation
The number of payments has a negative binomial distribution with parameters $r = 2$, $\beta^* = 0.72338$

$$a = \frac{\beta^*}{1 + \beta^*} = 0.419745; \qquad b = \frac{(r - 1)\beta^*}{1 + \beta^*} = 0.419745$$

Let $g_k$ denote the aggregate payment probability function (in units of 50).

$$
\begin{align*}
g_0 &= P_{N^*}(f_0) \\
    &= \left(1 - \beta^*\left(f_0 - 1\right)\right)^{-2} \\
&= 0.38369 \\
g_1 &= \frac{(a + b) f_1 g_0}{1 - a f_0} \\
&= 0.07738 \\
g_2 &= \frac{\left(a + \frac{b}{2}\right) f_1 g_1 + \left(a + \frac{2b}{2}\right) f_2 g_0}{1 - a f_0} \\
&= 0.06507
\end{align*}
$$

$$\Rightarrow \Pr\left[S \le 100\right] \approx 0.38369 + 0.07738 + 0.06507 = 0.52614.$$
