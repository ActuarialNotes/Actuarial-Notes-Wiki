---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:318e4dfa1228d6e3e1aeb961b5b30de60c8762092756435e7724838bbef38fc8
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §3.1.1 Random Variables (a random variable X is a function from the sample space to the real numbers), sha256:6a9473e3232fdf089177daacdbdeadad2d6f0e451217ed4c7d23e26c7973e356 — https://www.probabilitycourse.com/chapter3/3_1_1_random_variables.php"
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 4a: Discrete Random Variables, §2 definition (PDF p.2), cdf definition (PDF p.3), §2.8 Properties of the cdf (PDF pp.5-6), sha256:ff2a10e7ef1c0f5ef300ed8f73864d365ca5adcdf9775d1c4a6f356ee7687b5d — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class04-prep-a.pdf"
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 5b: Continuous Random Variables, definition of a continuous random variable (PDF p.2), pdf values greater than 1 (PDF p.4), sha256:3b4e14112eca532d9d03de273fdc40d27e6cf241681aabf012a49837640c2e5b — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class05-prep-b.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Definition 1.1 (PDF p.26), Definition 1.2 (PDF p.27), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes a, e, f and Topic 3 learning outcomes a-e, g (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Random Variable.md
---

A **Random Variable** $X$ is a function that assigns a real number to each outcome in a [[Sample Space]] $S$, enabling numerical analysis of random experiments.

> $$X : S \to \mathbb{R}$$

- Random variables are classified as discrete (countable range of outcomes) or continuous (uncountable range of outcomes)
- They are fully characterized by their probability distribution, which describes how probability is spread across their possible values

![[Media/Figures/Random_Variable.svg|340]]

> [!example]- Defining a Random Variable for Coin Flips {Example}
> Two fair coins are flipped. Define a random variable $X$ as the number of heads. List the values $X$ can take and their probabilities.
>
> > [!answer]-
> > The sample space is $S = \{HH, HT, TH, TT\}$, each with probability $1/4$. The random variable $X$ maps:
> > $$X(TT) = 0,\quad X(HT) = X(TH) = 1,\quad X(HH) = 2$$
> > So the distribution is $P(X=0)=\tfrac{1}{4}$, $P(X=1)=\tfrac{1}{2}$, $P(X=2)=\tfrac{1}{4}$.
