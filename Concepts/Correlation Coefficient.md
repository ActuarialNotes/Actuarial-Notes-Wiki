---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:75e324c152292ab33ab3880ff300600a6a332098bcbe8ff4300a6a15ff6cc656
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Lemma 5.3 covariance properties incl. bilinearity; eq. 5.21 Var(aX+bY); correlation definition, -1<=rho<=1, rho=+-1 linear, rho(-X,Y)=-rho(X,Y), rho(aX+b,cY+d)=rho(X,Y) for a,c>0; independent implies uncorrelated, converse fails; pairwise uncorrelated sums, sha256:10ac40b763d78b0fa19a116594da71769bf417b59a1714be707c7c410991a7fb — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.5 Covariance and Correlation: Events (cov and cor of indicators), var(X+Y), var(X-Y), cor = +-1 iff linear with that slope sign, uniform X and Y = X^2 uncorrelated, sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL), Ex. 6.3.17(a)-(c) and 6.3.18(a)-(c) printed p.281 (PDF p.289); Def. 7.1 p.286 (PDF p.294); Thm 7.1 and sum of two exponentials (PDF pp.299-301); Examples 7.5-7.6 (PDF p.302); Thms 9.4 and 9.6 (PDF pp.351, 365); continuity correction (PDF p.340), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, Fall 2026 content outline: C. FRM (Cummins Capital), D.5 'Select models to manage diverse risks and evaluate correlations of risks', sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS Exam 7 Content Outline, Fall 2026, Fall 2026 content outline: task 'Test assumptions underlying reserving models'; reading Mack - Chain Ladder (Mack 1994), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf"
    - "Mack, Measuring the Variability of Chain Ladder Reserve Estimates (1994), Appendix G, Testing for Correlations between Subsequent Development Factors, PDF p.55, sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Correlation Coefficient.md
---

The **Correlation Coefficient** $\rho(X, Y)$ measures the strength and direction of the linear relationship between two [[Random Variable|random variables]] on a fixed scale from $-1$ to $1$. The correlation coefficient is the [[Covariance]] divided by the product of the two [[Standard Deviation|standard deviations]].

> $$\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X\,\sigma_Y}$$

- where $\sigma_X = \sqrt{\text{Var}(X)}$ and $\sigma_Y = \sqrt{\text{Var}(Y)}$.
- $-1 \le \rho \le 1$. The value $\rho = \pm 1$ occurs exactly when $Y = a + bX$ for constants $a$ and $b \ne 0$, with the sign of $b$.
- $\rho = 0$ means uncorrelated, which is weaker than [[Independent Random Variables|independent]].
- It is also called Pearson's correlation. See [[Correlation]] and [[Covariance and Correlation Coefficient]].

> [!idea] The idea
> Covariance mixes strength with units. Measuring one loss in dollars instead of thousands multiplies the covariance by 1,000 without changing the relationship. Dividing by both standard deviations cancels the units, so the correlation coefficient depends only on how closely the pairs follow a straight line.

![[Media/Figures/Correlation_Coefficient.svg|340]]

## How strong is the link between two policies?

A policyholder holds an auto policy and a home policy. Let $X$ be the number of auto claims in a year and $Y$ the number of home claims.

| $X$ \ $Y$ | 0 | 1 | 2 | Total |
|---|---|---|---|---|
| 0 | 0.36 | 0.18 | 0.06 | 0.60 |
| 1 | 0.10 | 0.20 | 0.10 | 0.40 |
| Total | 0.46 | 0.38 | 0.16 | 1 |

The [[Covariance]] page works out $\text{Cov}(X, Y) = 0.12$, $\text{Var}(X) = 0.24$ and $\text{Var}(Y) = 0.53$. The covariance alone doesn't say whether 0.12 is a strong link. Dividing by the standard deviations does.

> $$\rho(X, Y) = \frac{0.12}{\sqrt{0.24}\,\sqrt{0.53}} = \frac{0.12}{(0.490)(0.728)} \approx 0.336$$

A correlation of about 0.34 is a moderate positive link. Claims on the two policies tend to come together, but far from in lockstep.

> [!trap] Variances in the denominator
> The denominator is the product of standard deviations, not variances. Dividing by $(0.24)(0.53)$ gives 0.94, which overstates the link almost threefold.

## Why units don't matter

Suppose each auto claim costs 10 (thousand) and each home claim costs 5. The costs are $10X$ and $5Y$.

| Pair | Covariance | Correlation |
|---|---|---|
| $X$, $Y$ | 0.12 | 0.336 |
| $10X$, $5Y$ | 6 | 0.336 |
| $X$, $-Y$ | $-0.12$ | $-0.336$ |

Rescaling multiplied the covariance by 50, and the standard deviations by 10 and 5. The factors cancel. Reversing the direction of one variable flips the sign only.

> $$\rho(aX + b,\ cY + d) = \pm\,\rho(X, Y)$$

- The sign is $+$ when $a$ and $c$ have the same sign, and $-$ when they differ.
- Constants $b$ and $d$ never matter.

## Getting back to covariance

Exam questions often give a correlation and two variances, then ask for the variance of a total. Solve the definition for the covariance first.

> $$\text{Cov}(X, Y) = \rho\,\sigma_X\,\sigma_Y$$

For the two policies, $2\,\text{Cov}(X, Y) = 2(0.336)(0.490)(0.728) = 0.24$. The total claim count then has variance $0.24 + 0.53 + 0.24 = 1.01$. See [[Moments for Linear Combinations]].

## Why the correlation coefficient is bounded

Standardize both variables so each has variance 1. The variance of their sum or difference can't be negative.

> $$\text{Var}\!\left(\frac{X}{\sigma_X} \pm \frac{Y}{\sigma_Y}\right) = 2 \pm 2\rho \ge 0$$

The $+$ case gives $\rho \ge -1$ and the $-$ case gives $\rho \le 1$. The variance is 0 only when the combination is a constant, which is exactly the case where $Y$ is a linear function of $X$. An answer outside $[-1, 1]$ is always an arithmetic error.

## Two events

For indicators of events $A$ and $B$, each variance is $p(1 - p)$. In the table, let $A$ be "an auto claim" and $B$ be "at least one home claim". Then $P(A) = 0.40$, $P(B) = 0.54$ and $P(A \cap B) = 0.30$.

> $$\rho(I_A, I_B) = \frac{P(A \cap B) - P(A)\,P(B)}{\sqrt{P(A)[1 - P(A)]\;P(B)[1 - P(B)]}}$$

Here $\rho = 0.084 / \sqrt{(0.24)(0.2484)} \approx 0.344$. Run backwards, the same formula turns a given correlation into $P(A \cap B)$.

## Zero correlation

Let $X$ take the values $-1$, $0$ and $1$ with equal probability, and let $Y = X^2$. The covariance is 0, so $\rho = 0$. But $Y$ is a function of $X$. The correlation coefficient measures only the straight-line part of a relationship.

## On other exams

- On CAS Exam 9, correlation measures diversification. A portfolio holding weights $w_1$ and $w_2$ of two assets has the return variance below. The lower the correlation, the smaller the last term, and the more the two assets offset each other.

> $$\sigma_P^2 = w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + 2w_1w_2\,\rho\,\sigma_1\sigma_2$$

- On CAS Exam 7, the correlation between development factors of adjacent periods tests a chain-ladder assumption. See [[Development Factor Correlation Test]].

## Try it

> [!example]- Correlation from the moments {Example}
> Losses $X$ and $Y$ have $\text{Cov}(X, Y) = -8$, $\text{Var}(X) = 16$ and $\text{Var}(Y) = 25$. Find $\rho(X, Y)$.
>
> > [!answer]-
> > **Plan:** divide the covariance by the product of the standard deviations.
> > $$\rho = \frac{-8}{(4)(5)} = -0.4$$
> > A large $X$ tends to come with a small $Y$, and the link is moderate.

> [!example]- Variance of a total from a correlation {Example}
> Annual personal auto claims $A$ and commercial auto claims $B$ have $\text{Var}(A) = 400$, $\text{Var}(B) = 900$ and correlation 0.5. Find $\text{Var}(A + B)$.
>
> > [!answer]-
> > **Plan:** turn the correlation into a covariance, then add.
> > $$
> > \begin{align*}
> > \text{Cov}(A, B) &= (0.5)(20)(30) \\
> > &= 300 \\
> > \text{Var}(A + B) &= 400 + 900 + 2(300) \\
> > &= 1{,}900
> > \end{align*}
> > $$

> [!example]- Rescaled and reversed {Example}
> Losses $X$ and $Y$ have correlation 0.6. A reinsurer's cash flows are $U = 1000X - 50$ and $V = 200 - 2Y$. Find $\rho(U, V)$.
>
> > [!answer]-
> > **Plan:** constants drop out, and only the signs of the multipliers matter.
> > The multipliers are $1000$ and $-2$, which have opposite signs. So $\rho(U, V) = -0.6$.

> [!example]- Both policies claim {Example}
> The probability of an auto claim is 0.20 and the probability of a home claim is 0.10. Neither policy has more than one claim. The correlation between the two claim counts is 0.25. Find the probability that both policies have a claim.
>
> > [!answer]-
> > **Plan:** each count is an indicator, so solve the two-event formula for $P(A \cap B)$.
> > $$
> > \begin{align*}
> > \text{Cov}(I_A, I_B) &= 0.25\sqrt{(0.2)(0.8)(0.1)(0.9)} \\
> > &= 0.25(0.4)(0.3) \\
> > &= 0.03 \\
> > P(A \cap B) &= (0.2)(0.1) + 0.03 \\
> > &= 0.05
> > \end{align*}
> > $$
> > Why more than 0.02? Positive correlation makes joint claims more likely than independence would.

> [!warning]- Exam traps
> - **Variances in the denominator.** Use $\sigma_X\sigma_Y$, not $\text{Var}(X)\text{Var}(Y)$.
> - **Losing the sign under rescaling.** A negative multiplier on one variable flips the sign of $\rho$. Constants never change it.
> - **Reading $\rho = 0$ as independence.** Uncorrelated variables can be fully dependent.
> - **Accepting $|\rho| > 1$.** That answer always signals an arithmetic slip.
