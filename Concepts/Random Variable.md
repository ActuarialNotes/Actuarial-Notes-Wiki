---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:9aea690a52bcbab9c38326791f7a408f5f94bd2f8181a6592fb14ae1895adc60
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §3.1.1 Random Variables (X is a function from the sample space to the real numbers), sha256:6a9473e3232fdf089177daacdbdeadad2d6f0e451217ed4c7d23e26c7973e356 — https://www.probabilitycourse.com/chapter3/3_1_1_random_variables.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.1.0 Continuous Random Variables and their Distributions (Definition: continuous CDF; jumps correspond to P(X=x) > 0), sha256:5f1f5c3c515c0359a39754877a2f9ca95282110a471881b79d249ad828e3d140 — https://www.probabilitycourse.com/chapter4/4_1_0_continuous_random_vars_distributions.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.3.1 Mixed Random Variables (neither discrete nor continuous; jump points with P(Y=y) > 0), sha256:7ecb17fdb2f5962b0bb95a80845ebef502c08988f765e647d4cf08e56894b640 — https://www.probabilitycourse.com/chapter4/4_3_1_mixed.php"
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 4a: Discrete Random Variables, definition of a discrete random variable (PDF p.2), cdf definition (PDF p.3), sha256:ff2a10e7ef1c0f5ef300ed8f73864d365ca5adcdf9775d1c4a6f356ee7687b5d — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class04-prep-a.pdf"
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 5b: Continuous Random Variables, definition of a continuous random variable (PDF p.2), sha256:3b4e14112eca532d9d03de273fdc40d27e6cf241681aabf012a49837640c2e5b — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class05-prep-b.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Definition 1.1 (discrete: finite or countably infinite), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
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

> [!example]- Defining a Random Variable for Coin Flips {Example}
> Two fair coins are flipped. Define a random variable $X$ as the number of heads. List the values $X$ can take and their probabilities.
>
> > [!answer]-
> > The sample space is $S = \{HH, HT, TH, TT\}$, each with probability $1/4$. The random variable $X$ maps:
> > $$X(TT) = 0,\quad X(HT) = X(TH) = 1,\quad X(HH) = 2$$
> > So the distribution is $P(X=0)=\tfrac{1}{4}$, $P(X=1)=\tfrac{1}{2}$, $P(X=2)=\tfrac{1}{4}$.
