---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:aee783601e4e85e3fa12af5516c60879419713d0967f9901bda4e4a53867ef74
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §3.1.1 Random Variables (X is a function from the sample space to the real numbers), sha256:6a9473e3232fdf089177daacdbdeadad2d6f0e451217ed4c7d23e26c7973e356 — https://www.probabilitycourse.com/chapter3/3_1_1_random_variables.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.1.0 Continuous Random Variables and their Distributions (Definition: continuous CDF; jumps correspond to P(X=x) > 0), sha256:5f1f5c3c515c0359a39754877a2f9ca95282110a471881b79d249ad828e3d140 — https://www.probabilitycourse.com/chapter4/4_1_0_continuous_random_vars_distributions.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.3.1 Mixed Random Variables (neither discrete nor continuous; jump points with P(Y=y) > 0), sha256:7ecb17fdb2f5962b0bb95a80845ebef502c08988f765e647d4cf08e56894b640 — https://www.probabilitycourse.com/chapter4/4_3_1_mixed.php"
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 4a: Discrete Random Variables, definition of a discrete random variable (PDF p.2), cdf definition (PDF p.3), sha256:ff2a10e7ef1c0f5ef300ed8f73864d365ca5adcdf9775d1c4a6f356ee7687b5d — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class04-prep-a.pdf"
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 5b: Continuous Random Variables, definition of a continuous random variable (PDF p.2), sha256:3b4e14112eca532d9d03de273fdc40d27e6cf241681aabf012a49837640c2e5b — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class05-prep-b.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Definition 1.1 (discrete: finite or countably infinite), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Distribution and Quantile Functions, §2.7 Distribution and Quantile Functions: F(x^-) = P(X < x); f(x) = F(x) - F(x^-) (discrete), g(x) = F(x) - F(x^-) on a mixed distribution's discrete part; quantile of order p: P(X < x) <= p <= P(X <= x); F^{-1}(p) the smallest quantile, sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html"
    - "Mixed Random Variables | Examples, §4.3.1 Mixed Random Variables: jump amount = P(Y = y); int c(y) dy + sum P(Y = y_k) = 1; EY = int y c(y) dy + sum y_k P(Y = y_k), sha256:3fc8d9207e5b1f961e1bc6b3a00414064dc3326a37c9b30c8c8a105c33312fc6 — https://www.probabilitycourse.com/chapter4/4_3_1_mixed.php"
    - "Definitions and Basic Properties, §3.1 Definitions and Basic Properties: change of variables theorem (discrete and continuous), additive property, mixed-distribution definition E(X) = sum_D x g(x) + int_C x h(x) dx, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "9. Expected Value as an Integral, §3.9 Expected Value as an Integral, The Change of Variables Theorem E[g(X)] = int_S g(x) dP(x), sha256:13db7b0f6f791843abcef65cf16e1214b8e745e3f9eeac74e01cc96fa3a032bc — https://www.randomservices.org/random/expect/Integral.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Random Variable.md
---

A **Random Variable** $X$ is a function that assigns a real number to each outcome in a [[Sample Space]] $S$, enabling numerical analysis of random experiments.

> $$X : S \to \mathbb{R}$$

- $X$ is **discrete** if its possible values form a finite or countably infinite set, and **continuous** if its probabilities come from a density, $P(a \le X \le b) = \int_a^b f(x)\,dx$ — so its CDF has no jumps and every single value has probability 0. See [[Discrete Random Variable]] and [[Continuous Random Variable]].
- The two classes do not cover every case. A payment under a [[Deductible]], $Y = (X - d)_+$ with $X$ continuous, takes a continuum of values yet puts probability $P(X \le d) > 0$ on the single value 0: it is a **mixed** random variable, neither discrete nor continuous (see [[Payment Random Variable]]).
- They are fully characterized by their probability distribution, which describes how probability is spread across their possible values

![[Media/Figures/Random_Variable.svg|340]]

### Point masses and mixed expectations

A jump in the CDF at $x$ — $F(x)$ greater than its left-hand limit $F(x^-) = P(X < x)$ — is a point mass: the single value $x$ has probability equal to the size of the jump.

> $$P(X = x) = F(x) - F(x^-)$$

- For a mixed random variable with point masses at $x_1, x_2, \ldots$ and density $f$ on its continuous part, take each mass point at its probability and integrate over the rest: $E[g(X)]$ is the sum of $g(x_i)\,P(X = x_i)$ plus the integral of $g(x) f(x)$ over the continuous portion.

> $$E[g(X)] = \sum_i g(x_i)\,P(X = x_i) + \int g(x)\,f(x)\,dx$$

- Here $f$ integrates to $1 - \sum_i P(X = x_i)$, not to 1. With $g(x) = x$ this gives the mean, and with $g(x) = x^2$ the second moment for the variance.

> [!example]- Defining a Random Variable for Coin Flips {Example}
> Two fair coins are flipped. Define a random variable $X$ as the number of heads. List the values $X$ can take and their probabilities.
>
> > [!answer]-
> > The sample space is $S = \{HH, HT, TH, TT\}$, each with probability $1/4$. The random variable $X$ maps:
> > $$X(TT) = 0,\quad X(HT) = X(TH) = 1,\quad X(HH) = 2$$
> > So the distribution is $P(X=0)=\tfrac{1}{4}$, $P(X=1)=\tfrac{1}{2}$, $P(X=2)=\tfrac{1}{4}$.
