---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:39ddc0073d5e6fc3d2815d6b561d2655b119ceae45bcc8919485fb938cc5c152
  sources:
    - "Orloff & Bloom, MIT OCW 18.05 (Spring 2022), Reading 7a: Joint Distributions, Independence, §4 Definition: independent iff joint cdf = product of marginal cdfs, equivalently pmf/pdf products; Ex. 12 cell-by-cell check pp.9-10, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf"
    - "Orloff & Bloom, MIT OCW 18.05 (Spring 2022), Reading 7b: Covariance and Correlation, Property 5 Var(X+Y) = Var X + Var Y + 2Cov; Property 6 and Warning: converse false (p.1), sha256:71f8a7b5f3b2233de2e8722ec1372f5704195efc2a6fb72c50c8ef505f92c4dc — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-b.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 4.4 (PDF p.151); Def. 4.7 and Thm 4.2 density factorisation (PDF p.173); Thm 6.8 Var(X+Y) = V(X)+V(Y) for independent X, Y (PDF p.267), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence: f_X|Y = f_XY/f_Y; E[X|Y=y], Var(X|Y=y); independence gives f_X|Y = f_X, E[XY] = EX EY and E[g(X)h(Y)] = E[g(X)]E[h(Y)], HTML fetched 2026-11-06, sha256:5d697207bda40aa9ff1ce9a59db1231fe112d2fd061fed5ce08921d8c889c03a — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 2.5 Independence: functions g_i(X_i) of independent variables are independent; the indicator sequence is exchangeable, HTML fetched 2026-11-06, sha256:5f47788c1c3a1a7a6b7b916b9d339bb59184c723dc6d2ccd05fd1a11639054c9 — https://www.randomservices.org/random/prob/Independence.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), The Poisson Distribution: independent Poisson N, M with parameters a, b: N + M is Poisson(a + b), HTML fetched 2026-11-06, sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "SOA Exam FAM syllabus, February 2027, Topic 2 Severity, Frequency, and Aggregate Models, outcomes e-k (PDF p.3), sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
    - "SOA Exam ALTAM syllabus, October 2026, Topic 3 Joint Life Insurance and Annuities, outcomes a-b (independence or dependence of future lifetimes) (PDF p.3), sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, Domain D (Brehm et al.) task 5 'Select models to manage diverse risks and evaluate correlations of risks' (PDF p.6) and Brehm chapters 1-5 (PDF p.7), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Wikipedia, Copula (statistics): Sklar's theorem (joint distribution = copula of the marginals) and the independence copula C(u,v) = uv, HTML fetched 2026-11-06, sha256:0e663c458baaef81b2713afb34d7f77eca2f8bd460043883f22cc02b2d51c556 — https://en.wikipedia.org/wiki/Copula_(statistics)"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 3 outcomes g-i (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Independent Random Variables.md
---

![[Media/Figures/Independent_Random_Variables.svg|340]]

**Independent Random Variables** are [[Random Variable|random variables]] for which the value of one gives no information about the value of the other. Random variables $X$ and $Y$ are independent when, for every $x$ and $y$, their joint probability function or joint density is

> $$f(x, y) = f_X(x)\,f_Y(y)$$

- $f_X(x)$ and $f_Y(y)$ are the [[Marginal Probability Function|marginal]] probability functions or densities of $X$ and $Y$.

Equivalently, the [[Joint Cumulative Distribution Function|joint CDF]] is $F(x, y) = F_X(x)\,F_Y(y)$. Then the probability that a condition on $X$ and a condition on $Y$ both hold is the product of their probabilities, such as $P(X \le 1)\,P(Y > 2)$.

> [!idea] The idea
> One pair of values whose joint probability is not the product of its marginals proves dependence, but independence needs the product in every pair.

> [!example]- $X$ and $Y$ are the numbers of auto and home claims, with the joint probability function below. Are $X$ and $Y$ independent? {Example}
> The joint probability function:
>
> | | $Y = 0$ | $Y = 1$ | $Y = 2$ |
> | --- | --- | --- | --- |
> | $X = 0$ | 0.30 | 0.15 | 0.05 |
> | $X = 1$ | 0.20 | 0.20 | 0.10 |
>
> - Adding the first row gives $f_X(0) = 0.50$, and adding the first column gives $f_Y(0) = 0.50$.
> - The product is $(0.50)(0.50) = 0.25$, but $f(0, 0) = 0.30$.
> - One pair fails the product rule, so $X$ and $Y$ are not independent.

## Independence from a joint density

The variables of a joint probability function or density are independent when its support is a rectangle and it factors into a function of $x$ times a function of $y$. Each factor is then proportional to a marginal.

> [!example]- Are $X$ and $Y$ independent if $f(x, y) = 6e^{-2x-3y}$ for $x, y > 0$? And if $f(x, y) = 2$ for $0 < x < y < 1$? {Example}
> - $6e^{-2x-3y} = 2e^{-2x} \cdot 3e^{-3y}$ on the rectangle $x, y > 0$, so $X$ and $Y$ are independent exponentials.
> - $f(x, y) = 2$ looks constant, but its support is a triangle.
> - Knowing $Y = 0.3$ forces $X < 0.3$, so these $X$ and $Y$ are not independent.

## Expected value of a product

For independent $X$ and $Y$, the expected value of their product is

> $$E[XY] = E[X]\,E[Y]$$

More generally, $g(X)$ and $h(Y)$ are independent for any functions $g$ and $h$. So $E[X^2 Y^2] = E[X^2]\,E[Y^2]$.

> [!example]- A loss $X$ is exponential with mean 2, and an independent factor $Y$ is uniform on $(1, 1.2)$. What are $E[XY]$ and $E[X^2 Y^2]$? {Example}
> - $E[X] = 2$ and $E[Y] = 1.1$, so $E[XY] = 2.2$.
> - $E[X^2] = 2 \times 2^2 = 8$.
> - $E[Y^2]$ is $\frac{1.2^3 - 1}{3(0.2)} = 1.2133$.
> - $E[X^2 Y^2] = 8 \times 1.2133 = 9.707$.

## Variance of a sum

The [[Covariance|covariance]] of independent random variables is 0, so the variance of their sum is

> $$\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$$

The variance of $X - Y$ is the same sum. Variances add, but standard deviations don't. The general rule is on [[Linear Combinations of Random Variables]].

> [!example]- Independent losses $X$ and $Y$ have standard deviations 3 and 4. What is the standard deviation of $X + Y$? {Example}
> - The variances are 9 and 16, and they add to 25.
> - The standard deviation of $X + Y$ is $\sqrt{25} = 5$, not $3 + 4 = 7$.

> [!trap] Zero covariance is not independence
> Let $X$ be $-1$, 0 or 1 with probability $\frac{1}{3}$ each, and let $Y = X^2$. Then $E[X] = 0$ and $E[XY] = E[X^3] = 0$, so $\text{Cov}(X, Y) = 0$. Yet $P(X = 0, Y = 0) = \frac{1}{3}$, while $P(X = 0)\,P(Y = 0) = \frac{1}{9}$.
