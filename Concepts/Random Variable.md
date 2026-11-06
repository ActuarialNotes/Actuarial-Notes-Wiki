---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:4cb0ca4d6d5d4151f23e03c0ee4099a3e378a97c5da756c8aedc8a8329b61de9
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §3.1.1 Random Variables: X: S -> R; range, sha256:b32e2b938c896a7fd05d6e213fb7a8442da6c352279ab627e62ef6d093e8a46b — https://www.probabilitycourse.com/chapter3/3_1_1_random_variables.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 1.1 p.18 (PDF p.26): discrete = finite or countably infinite sample space, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 5b, Definition of a continuous random variable by a pdf (PDF p.2), sha256:3b4e14112eca532d9d03de273fdc40d27e6cf241681aabf012a49837640c2e5b — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class05-prep-b.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §4.1.0: continuous CDF has no jumps; P(X=x)=0; < and <= agree, sha256:c2345faca7920d0c2971d4cc039c129b803ecb6d3f121ea89683da5cab5ece5b — https://www.probabilitycourse.com/chapter4/4_1_0_continuous_random_vars_distributions.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §3.2.1 CDF: F_X(x)=P(X<=x), defined for discrete, continuous and mixed; discrete CDF a staircase, jump = P(X=x), sha256:ddcdb7ea63d9e918e1d8e69af197212e089af8cf665730306927c861bd3f5f6f — https://www.probabilitycourse.com/chapter3/3_2_1_cdf.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §4.3.1 Mixed random variables: neither discrete nor continuous; jump = P(Y=y); int c + sum P(Y=y_k)=1; EY = int y c(y) dy + sum y_k P(Y=y_k), sha256:2abab6d01f448078588fa3991835c49223be0e6c433904a165147ddf6a2dd0d7 — https://www.probabilitycourse.com/chapter4/4_3_1_mixed.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 2.7 Distribution and quantile functions: F increasing, right-continuous, F(x^-)=P(X<x), limits 0 and 1; right-tail function; quantiles, sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.1 Expected value: definitions (discrete, continuous, mixed), may not exist, change of variables, increasing property P(X<=Y)=1, symmetry -> E(X)=a, independence E(XY)=E(X)E(Y), E(X|A) via conditional density, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), §2.2 p.60 (PDF p.68): f(x) is not the probability of x; f(3/4)=3/2 > 1 cannot be a probability, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam C tables (Loss Models 3rd ed. Appendix A excerpts), A.2.3.1 Pareto (E[X^k] for -1<k<alpha, no M(t)) PDF p.8; A.3.2.1 Gamma (M(t)=(1-theta t)^-alpha, t<1/theta; E[X^k]) PDF p.9; A.3.3.1 Exponential (M(t), E[X^k]=theta^k k!, E[X^x]=theta(1-e^{-x/theta})) and A.5.1.1 Lognormal (E[X^k]=exp(k mu + k^2 sigma^2/2), no M(t)) PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA, Exam P syllabus, November 2026, Topic 2 Univariate Random Variables, LOs a)-f) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "CAS, Exam MAS-I Content Outline (2026), Domain A tasks 1-3 (Poisson processes; expected values, variances; limited expected value) p.3; Domain B tasks 1, 5, 6, 9 (sample mean and variance; frequency and severity; aggregate; censoring and truncation) p.4, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "SOA, Exam FAM syllabus, February 2027, Topic 1 coverage modifications (p.2); Topic 2 severity moments, existence of moments, aggregate mean and variance (p.3); Topic 9 present value random variables, means and variances, notation for their expected values (p.7); Topic 10 future loss random variable, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
    - "SOA, Exam ALTAM syllabus, October 2026, Topic 2 a): state-dependent insurance and annuity present value random variables and their expected values (p.3), sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Random Variable.md
---

A **Random Variable** $X$ is a function that assigns a real number to each outcome in a [[Sample Space]] $S$, so that the outcomes of a random experiment can be analysed as numbers.

> $$X : S \to \mathbb{R}$$

- $X$ is **discrete** if its possible values form a finite or countably infinite set. See [[Discrete Random Variable]].
- $X$ is **continuous** if its probabilities come from a density, $P(a \le X \le b) = \int_a^b f(x)\,dx$. Its CDF then has no jumps, and every single value has probability 0. See [[Continuous Random Variable]].
- The two classes do not cover every case. A payment under a [[Deductible]], $Y = (X - d)_+$ with $X$ continuous, takes a continuum of values yet puts probability $P(X \le d) > 0$ on the single value 0: it is a **mixed** random variable, neither discrete nor continuous (see [[Payment Random Variable]]).
- A random variable is fully characterized by its probability distribution, which describes how probability is spread across its possible values.

> [!idea] The idea
> You can't average "heads" and "tails", but you can average numbers. A random variable assigns a number to each outcome, such as the number of claims or the size of a payment, so that probabilities, means and variances can be calculated.

![[Media/Figures/Random_Variable.svg|340]]

## One loss, several random variables

A policy covers one loss $X$, uniform on $(0, 1000)$. The policy has a deductible of 200 and pays at most 500. The outcome is the loss that happens. Each random variable below reads a different number off that same outcome.

| Loss $X$ | Over deductible $(X - 200)_+$ | Paid $Y$ |
|---|---|---|
| 150 | 0 | 0 |
| 450 | 250 | 250 |
| 900 | 700 | 500 |

- The paid amount is the excess over the deductible, capped at the limit: $Y = \min\big((X - 200)_+,\ 500\big)$.
- One sample space carries many random variables. The ground-up loss and the insurer's payment are defined on the same outcomes, but they have different distributions.

## Discrete, continuous or mixed?

A random variable is classified by how its probability is spread, not by the values it can take.

- The number of claims in a year is **discrete**. Its values are 0, 1, 2, and each carries its own probability.
- The loss $X$ is **continuous**. Any single loss amount, such as exactly 450, has probability 0.
- The payment $Y$ is **mixed**. It takes every value between 0 and 500, yet two single values carry probability. $Y = 0$ whenever $X \le 200$, with probability 0.2. $Y = 500$ whenever $X \ge 700$, with probability 0.3.

> [!trap] Filling an interval is not enough
> "Its values fill an interval, so it is continuous" is wrong for a payment. $Y$ fills $[0, 500]$ yet has masses at both ends. Check the CDF for jumps instead of looking at the range of values.

## Reading point masses off the CDF

The CDF $F(x) = P(X \le x)$ shows a point mass as a jump. The CDF jumps at $x$ when $F(x)$ is greater than its left-hand limit $F(x^-) = P(X < x)$. The single value $x$ then has probability equal to the size of the jump.

> $$P(X = x) = F(x) - F(x^-)$$

For the payment $Y$:

| $y$ | $F_Y(y^-)$ | $F_Y(y)$ | Mass at $y$ |
|---|---|---|---|
| 0 | 0 | 0.2 | 0.2 |
| 250 | 0.45 | 0.45 | 0 |
| 500 | 0.7 | 1 | 0.3 |

- Between the jumps, $F_Y$ rises smoothly at the rate $\frac{1}{1000}$. That smooth part is the density of $Y$.
- At a jump, $P(Y \le 500) = 1$ but $P(Y < 500) = 0.7$. The two differ by exactly the mass.

## The mean of a mixed random variable

A mixed random variable needs both tools at once. Each point mass is weighted like a discrete value, and the continuous part is integrated like a density.

> $$E[g(X)] = \sum_i g(x_i)\,P(X = x_i) + \int g(x)\,f(x)\,dx$$

- Here the density $f$ integrates to $1 - \sum_i P(X = x_i)$, not to 1. For $Y$ it integrates to $1 - 0.2 - 0.3 = 0.5$.
- With $g(x) = x$ the formula gives the mean, and with $g(x) = x^2$ it gives the second moment, which the variance needs.

For the payment $Y$, the mass at 0 adds nothing, the mass at 500 adds $500 \times 0.3 = 150$, and the continuous part adds the integral.

> $$
> \begin{align*}
> E[Y] &= 500(0.3) + \int_{200}^{700} \frac{x - 200}{1000}\,dx \\
>      &= 150 + 125 \\
>      &= 275
> \end{align*}
> $$

The mass at the limit carries more of the mean than the whole continuous part does.

## On other exams

- **MAS-I** gives a CDF in pieces with jumps. The point masses are read off the jumps, and $E[Y]$ adds the masses to the integral over the continuous part, as above.
- **FAM** and **ALTAM** treat a present value as a random variable on the future lifetime. The present value of an insurance $Z$, of an annuity $Y$, or a policy's loss is often defined piecewise, and the question asks for its expected value or another moment.

## Try it

> [!example]- Defining a Random Variable for Coin Flips {Example}
> Two fair coins are flipped. Define a random variable $X$ as the number of heads. List the values $X$ can take and their probabilities.
>
> > [!answer]-
> > **Plan:** list the outcomes, map each to its number of heads, then add the probabilities of outcomes that share a value.
> >
> > The sample space is $S = \{HH, HT, TH, TT\}$, and each outcome has probability $1/4$. The random variable $X$ maps the outcomes to numbers:
> > $$X(TT) = 0,\quad X(HT) = X(TH) = 1,\quad X(HH) = 2$$
> > So the distribution is $P(X=0)=\tfrac{1}{4}$, $P(X=1)=\tfrac{1}{2}$, $P(X=2)=\tfrac{1}{4}$.
> >
> > Why is $P(X = 1)$ twice the others? Two outcomes map to the value 1.

> [!example]- A policy limit {Example}
> A loss $X$ is exponential with mean 1,000. The policy pays $Y = \min(X, 1500)$. Classify $Y$, and find $P(Y = 1500)$ and $E[Y]$.
>
> > [!answer]-
> > **Plan:** look for a value that a whole range of losses maps to, then add its mass to the integral.
> >
> > Every loss above 1,500 pays exactly 1,500, so $Y$ has a mass there. Below 1,500 it follows the loss's density. $Y$ is mixed.
> > $$P(Y = 1500) = P(X > 1500) = e^{-1.5} \approx 0.2231$$
> > $$
> > \begin{align*}
> > E[Y] &= \int_0^{1500} x\,\frac{e^{-x/1000}}{1000}\,dx + 1500\,e^{-1.5} \\
> >      &= 1000\left(1 - e^{-1.5}\right) \\
> >      &\approx 776.87
> > \end{align*}
> > $$
> > The mean of the capped payment is below the mean loss of 1,000, because every loss above the limit is cut back to it.

> [!example]- A CDF with jumps {Example}
> A payment $Y$ has CDF $F(y) = 0$ for $y < 0$, $F(y) = 0.4 + 0.001y$ for $0 \le y < 400$, and $F(y) = 1$ for $y \ge 400$. Find the point masses, $P(Y < 400)$ and $E[Y]$.
>
> > [!answer]-
> > **Plan:** read each jump as a mass, then integrate the density between the jumps.
> >
> > - At 0, $F$ jumps from 0 to 0.4, so $P(Y = 0) = 0.4$.
> > - At 400, $F$ jumps from $0.4 + 0.4 = 0.8$ to 1, so $P(Y = 400) = 0.2$.
> > - $P(Y < 400) = F(400^-) = 0.8$.
> >
> > The density between the jumps is $0.001$, which integrates to $0.4$. The masses and the density together account for $0.4 + 0.2 + 0.4 = 1$.
> > $$
> > \begin{align*}
> > E[Y] &= 400(0.2) + \int_0^{400} 0.001\,y\,dy \\
> >      &= 80 + 80 \\
> >      &= 160
> > \end{align*}
> > $$

> [!warning]- Exam traps
> - **Dropping a point mass.** Integrating $y\,f(y)$ over the continuous part of a mixed variable and stopping there misses the point masses. On a payment capped at a limit, the mass at the limit can carry more of the mean than the integral does. Add $\sum_i g(x_i)\,P(X = x_i)$.
> - **$\le$ versus $<$ at a jump.** At a point mass, $P(X \le x) = F(x)$ but $P(X < x) = F(x^-)$. The two differ by the size of the jump. Using $F(x^-)$ for an event that includes $x$ gives an answer short by exactly the mass.
> - **Classifying by the range.** A payment $(X - d)_+$ takes every value from 0 up yet has a mass at 0. It is mixed, not continuous.
> - **A density is not a probability.** A density value can exceed 1, as a uniform on $(0, 0.5)$ has density 2. Only the integral of a density over an interval is a probability.
