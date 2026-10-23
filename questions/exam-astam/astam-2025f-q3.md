---
id: "astam-2025f-q3"
exam: "Exam ASTAM"
topic: "Generalized Extreme Value Distribution"
learning_objective: "Severity Models"
difficulty: hard
type: multi-part
year: 2025
session: Fall
wiki_link:
  - Concepts/Generalized+Extreme+Value+Distribution
  - Concepts/Uniform+Continuous+Distribution
  - Concepts/Mean+Excess+Loss
  - Concepts/Weibull+Distribution
points: 9
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:f7e46908a0f056df89df7b2199909b83198a631f1ad3a6d4c4e1f59cb9e3eaf3
  sources:
    - "SOA Exam ASTAM Fall 2025 — exam questions, Q3, p.8, sha256:82e9e32cfe70c47f3cba084117198396bf78398428322502889c33d163417254 — https://www.soa.org/globalassets/assets/files/edu/2025/fall/exams/2025-fall-astam-exam.pdf"
    - "SOA Exam ASTAM Fall 2025 — model solutions and examiners' comments, Q3, pp.5-7, sha256:b575524316d2938cec3a30d74109c217e79c4d353b125e489e84e73fe6c44b0a — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2025-11-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2025f-q3.md
---

The loss severity random variable $X$ has a Uniform distribution on the interval $[a, b]$. We denote this by $X \sim \text{Unif}(a, b)$.

You are given that the survival function of $X$ is $S_X(x) = \dfrac{b - x}{b - a}, \quad a < x < b$.

Let $Y = X - d \mid X > d$ denote the excess loss random variable where $0 \le a \le d < b$.

## Part a (2 points)

Show that $Y \sim \text{Unif}(0, b - d)$.

### Explanation

$$
\begin{align*}
S_Y(y) &= \Pr[X - d > y \mid X > d] \\
       &= \frac{S_X(y + d)}{S_X(d)} \quad \text{for } y \le b - d \\
&= \left(\frac{b - (y + d)}{b - a}\right)\left(\frac{b - a}{b - d}\right) \\
 &= \frac{(b - d) - y}{(b - d)}
\end{align*}
$$

$$\Rightarrow Y \sim U(0, b - d)$$

### Examiner Report

Examiners' Comments

1. Overall, this question was not high scoring, though around 10% of candidates did very well.
2. The examiners expected strong performance on the first part, which was intended to be a relatively simple conditional distribution calculation, similar to problems seen in introductory courses in probability and statistics. In fact, part (a) was done very poorly or not at all by most candidates. Many candidates tried to find E[Y], which was not relevant to the question; a distribution is uniquely defined by, e.g. its survival function, or distribution function, or pdf, but not by its mean or variance.
3. The result in part (a) could be derived using the distribution or density function, instead of the survival function, but the survival function approach is the shortest and simplest, which is why the examiners set the question up in terms of S(x). Candidates who tried to derive the result using pdf's often failed to specify bounds appropriately, i.e. proving that Y was uniformly distributed on some interval of length b-d, rather than specifically on 0 to b-d.

## Part b (3 points)

Now let $a = 0$, $b = 10$, and $d = 2$.

Let $H_\xi$ denote the Generalized Extreme Value distribution with parameter $\xi$. You are given that $Y$ is in the MDA of $H_\xi$ with $\xi = -1$. Derive the normalizing sequences, $c_n$ and $d_n$, for the limiting extreme value distribution of $Y$.

### Explanation

Now $d = 2$ so $Y \sim U(0, 8) \Rightarrow F_Y(y) = \dfrac{y}{8}$, $0 < y \le 8$. Let $H(y)$ denote the d.f of the GEV distribution with $\xi = -1$, i.e. $H(y) = \exp\big(-(1 - y)\big)$ (for $y > 1$) (as printed). Then we can use either of two approaches:

Either:

$$\lim_{n \to \infty} F_n(c_n y + d_n) = H(y)$$

Now $F_n(y) = \Pr\big[\max(Y_1, Y_2, \ldots, Y_n) \le y\big] = \left(\dfrac{y}{8}\right)^n$

$$\Rightarrow \lim_{n \to \infty} F_n(c_n y + d_n) = \lim_{n \to \infty} \left(\frac{c_n y + d_n}{8}\right)^n = \lim_{n \to \infty} \left(1 + \frac{n c_n y + n(d_n - 8)}{8n}\right)^n$$

$$\text{So } \lim_{n \to \infty} F_n(c_n y + d_n) = H(y) \iff \exp\left(\frac{n c_n y + n(d_n - 8)}{8}\right) = \exp\big(-(1 - y)\big)$$

Equate terms in $y$ in the exponents:

$$\frac{n c_n y}{8} = y \Rightarrow c_n = \frac{8}{n}; \qquad \frac{n(d_n - 8)}{8} = -1 \Rightarrow d_n = 8\left(1 - \tfrac{1}{n}\right)$$

Or:

$$\lim_{n \to \infty} n S(c_n y + d_n) = -\log H(y) = -\log e^{-(1 - y)} = 1 - y \quad (\text{for } y > 1) \text{ (as printed)}$$

$$\text{Now } \lim_{n \to \infty} n S(c_n y + d_n) = n\left(1 - \frac{c_n y + d_n}{8}\right)$$

$$\text{So } \lim_{n \to \infty} n S(c_n y + d_n) = -\log H(y) \Rightarrow n\left(1 - \frac{c_n y + d_n}{8}\right) = 1 - y$$

Equate terms in $y^1$ and $y^0$:

$$-\frac{n c_n}{8} = -1 \Rightarrow c_n = \frac{8}{n}$$

$$n\left(1 - \frac{d_n}{8}\right) = 1 \Rightarrow d_n = 8\left(1 - \frac{1}{n}\right)$$

### Examiner Report

4. Part (b) was done well by most candidates who attempted it. However, some candidates failed to show sufficient work for a derivation question. In particular, many candidates wrote down equations for $c_n$ and $d_n$, but gave little or no derivation.

## Part c (2 points)

Let $Y_1, Y_2, \ldots, Y_n$ be independent and identically distributed random variables such that $Y_j \sim \text{Unif}(0, 8)$ for $j = 1, 2, \cdots, n$, and let $M_n = \max\{Y_1, Y_2, \cdots, Y_n\}$.

(i) Calculate $\Pr[M_{10} \le 7]$ directly.

(ii) Estimate $\Pr[M_{10} \le 7]$ using the limiting extreme value distribution.

### Explanation

(i)

$$\Pr[M_{10} \le 7] = \left(\frac{7}{8}\right)^{10} = \mathbf{0.26308}$$

(ii)

$$\Pr[M_{10} \le 7] \approx \Pr\left[\frac{M_{10} - d_{10}}{c_{10}} \le \frac{7 - d_{10}}{c_{10}}\right]$$

$$c_{10} = \frac{8}{10} = 0.8 \qquad \text{and} \qquad d_{10} = 8\left(1 - \frac{1}{10}\right) = 7.2$$

$$\Rightarrow \frac{7 - d_{10}}{c_{10}} = -\frac{0.2}{0.8} = -0.25$$

$$\Rightarrow \Pr[M_{10} \le 7] \approx \Pr\left[H_{\xi=-1} \le -0.25\right] = e^{-1.25} = \mathbf{0.28651}$$

### Examiner Report

5. Part (c)(i) was done well by most candidates who attempted it. Part (c)(ii) was more mixed, though most candidates who attempted this part received at least partial credit. If incorrect values for $c_n$ and $d_n$ taken from the previous part were used, candidates did not lose additional credit.

   Again, many candidates did not show sufficient work to receive full credit.

   A minority of candidates used incorrect distributions for their approximations, such as the normal distribution.
6. Some candidates' answers in part (c) were clearly unreasonable - typically in this case a probability that is not in [0, 1]. A candidate who writes down an impossible value and does not comment that they know it is impossible will generally receive less partial credit than a candidate who gives the same answer, but understands and comments on the fact that it cannot be correct.

## Part d (2 points)

(i) State with reasons whether $Y$ is in the MDA of the Fréchet, Gumbel, or Weibull Extreme Value (EV) distribution.

(ii) Describe one key difference between the Weibull EV distribution and the Gumbel distribution.

### Explanation

(i) As $\xi < 0$, the GEV is the EV Weibull distribution.

(ii) Weibull is bounded above. Gumbel is unbounded above.

### Examiner Report

7. Part (d) was done well by those who attempted it, though in (d)(ii) a significant number of candidates just mentioned parameter values or numbers of parameters in the distributions. Other candidates wrongly proposed that one distribution has all of its moments while the other does not. In fact, both distributions have all finite moments. In the context of extreme value theory, the fact that one distribution is right bounded while the other is unbounded is particularly significant.
