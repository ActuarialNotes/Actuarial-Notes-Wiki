---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:7ef4d4e45230e978a352d5ac14c16b6b6f6415732cc23b181a59fc5ee5abc326
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 4.7 and Thm 4.2 (PDF p.173), Thm 6.8 (V(X+Y)=V(X)+V(Y) for independent X, Y), Ex. 6.2.23 (PDF p.275), Ex. 6.3.17 (PDF p.289), Thms 9.4 and 9.6 (PDF pp.351, 365), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q248 (Cov = 0 yet dependent, PDF p.73), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Covariance and Correlation (Cov = E[XY]-EX EY; independent implies uncorrelated, converse not necessarily true), web page as fetched 2026-09-28, sha256:330faf8fb05f924926ce40a5e577b79910d97ec946263f40c64bf5e1277a9f82 — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 2.5 Independence: if {X_i} is independent then {g_i(X_i)} is independent; the Bernoulli indicator sequence is exchangeable (permuting does not change the probability), HTML fetched 2026-10-30, sha256:5f47788c1c3a1a7a6b7b916b9d339bb59184c723dc6d2ccd05fd1a11639054c9 — https://www.randomservices.org/random/prob/Independence.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence: f_{X|A}(x) = f_X(x)/P(A) on A, conditional expectation as the integral against f_{X|A}; independent X, Y have f_XY = f_X f_Y and E[g(X)h(Y)] = E[g(X)]E[h(Y)], HTML fetched 2026-10-30, sha256:b9e764e0b2adb7b888334dd58ee563d47c9c6cd66bd666fa4fa24c7d5e3b32a4 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.1.1 Joint PMF: P((X,Y) in A) = sum of P_XY over (A cap R_XY); R_XY taken as R_X x R_Y with some P_XY zero; marginal PMF eq. (5.1), HTML fetched 2026-10-30, sha256:eeadad2f381a4b909be811c27c4f8b6e9e85b96678a9fa9a25bf57ade8bfbabf — https://www.probabilitycourse.com/chapter5/5_1_1_joint_pmf.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 11.5 The Multinomial Distribution: each sequence with outcome i occurring j_i times has probability p_1^{j_1}...p_k^{j_k}, the number of such sequences is the multinomial coefficient; generalizes Bernoulli trials (k = 2); Y_i is binomial with parameters n and p_i, HTML fetched 2026-10-30, sha256:eee1779c2c22be3a73f51f9149c846395c8ba2cbe8609433afd865b3c9a50e2e — https://www.randomservices.org/random/bernoulli/Multinomial.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Independent Random Variables.md
---

[[Random Variable]]s $X$ and $Y$ are **Independent** if knowledge of one provides no information about the other. Formally, for all values $x$ and $y$, the joint distribution factors into the product of the marginals.

> $$F(x, y) = F_X(x) \cdot F_Y(y)$$

> $$f(x,y) = f_X(x)\cdot f_Y(y)$$

- Independence implies [[Covariance]] is zero ($\text{Cov}(X,Y) = 0$), though the converse is not always true
- For independent random variables: $E[XY] = E[X]\,E[Y]$ and $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$
- The [[Central Limit Theorem]] applies to sums of independent and identically distributed (i.i.d.) random variables
- If $X$ and $Y$ are independent, so are $g(X)$ and $h(Y)$ for any functions $g$ and $h$; hence $E[g(X)\,h(Y)] = E[g(X)]\,E[h(Y)]$, for example $E[X^2 Y^2] = E[X^2]\,E[Y^2]$.
- **A sum of i.i.d. discrete variables by patterns.** To find $P(X_1 + \cdots + X_n = s)$, list every pattern of individual values that adds to $s$. By independence one assignment of a pattern to the individuals has probability equal to the product of the PMF values; multiply it by the number of ways to assign those values to the individuals, a binomial or multinomial coefficient: $\binom{n}{1}$ for one variable at a value and the rest at 0, $\binom{n}{2}$ for two at one value and the rest at 0.

![[Media/Figures/Independent_Random_Variables.svg|340]]

> [!example]- Verifying Independence {Example}
> $X$ and $Y$ have joint density $f(x,y) = 2$ for $0 < x < y < 1$ (and 0 elsewhere). Are $X$ and $Y$ independent?
>
> > [!answer]-
> > The marginal densities are $f_X(x) = 2(1-x)$ and $f_Y(y) = 2y$. Their product is $4y(1-x)$, but $f(x,y) = 2 \neq 4y(1-x)$ in general, so **$X$ and $Y$ are not independent**.

> [!example]- Total Claims from Three Policies {Example}
> Three policies have independent claim counts with common PMF $p(0) = 0.5$, $p(1) = 0.3$, $p(2) = 0.2$. Find the probability that the total is 2.
>
> > [!answer]-
> > The patterns adding to 2 are one policy at 2 with the others at 0, and two policies at 1 with the third at 0. Each can be assigned in $\binom{3}{1} = 3$ ways:
> > $$
> > \begin{align*}
> > P(S = 2) &= 3(0.2)(0.5)^2 + 3(0.3)^2(0.5) \\
> >          &= 0.150 + 0.135 \\
> >          &= 0.285
> > \end{align*}
> > $$
