---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:8d0053a85086bbc8a21ca1710bd84b5eb6a5b9f53e0ce6c22625b3af9b734c17
  sources:
    - "Orloff & Bloom, MIT OCW 18.05 (Spring 2022), Reading 7a: Joint Distributions, Independence, §3.1 joint pmf, §3.2 joint pdf total probability 1, §3.7-3.8 marginals by summing/integrating, §4 independence and Ex. 12 (a zero cell cannot be a product of nonzero marginals) pp.2-10, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf"
    - "Orloff & Bloom, MIT OCW 18.05 (Spring 2022), Reading 7b: Covariance and Correlation, Property 6 and Warning: the converse is false (p.1); covariance measures linear relationship (p.4), sha256:71f8a7b5f3b2233de2e8722ec1372f5704195efc2a6fb72c50c8ef505f92c4dc — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-b.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), Multinomial Distribution: joint PMF with multinomial coefficient; each Y_i ~ Binomial(n, p_i), HTML fetched 2026-11-06, sha256:eee1779c2c22be3a73f51f9149c846395c8ba2cbe8609433afd865b3c9a50e2e — https://www.randomservices.org/random/bernoulli/Multinomial.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), The Multivariate Hypergeometric Distribution: sampling without replacement: product of binomials over C(m,n); with replacement the types form multinomial trials with p_i = m_i/m, HTML fetched 2026-11-06, sha256:ce429ccb0682c9be25603fb52bab837daa32b2910c2aeba0603daf193a8cf978 — https://www.randomservices.org/random/urn/MultiHypergeometric.html"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 3 Multivariate Random Variables (23-30%), learning objective and outcomes a-i (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, Domain D (Brehm et al.) task 5 'Select models to manage diverse risks and evaluate correlations of risks' (PDF p.6) and Brehm chapters 1-5 (PDF p.7), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS Exam 7 Spring 2015, Q21 (copulas to express correlation from joint loss distributions, booklet PDF p.25; sample answers PDF pp.82-83), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf"
    - "Wikipedia, Copula (statistics): Sklar's theorem (joint distribution = copula of the marginals) and the independence copula C(u,v) = uv, HTML fetched 2026-11-06, sha256:0e663c458baaef81b2713afb34d7f77eca2f8bd460043883f22cc02b2d51c556 — https://en.wikipedia.org/wiki/Copula_(statistics)"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multivariate Distribution.md
---

![[Media/Figures/Multivariate_Distribution.svg|340]]

A **Multivariate Distribution** is the distribution of two or more [[Random Variable|random variables]] taken together. For two discrete random variables $X$ and $Y$, it is given by the [[Joint Probability Function|joint probability function]]

> $$f(x, y) = P(X = x, Y = y)$$

- $f(x, y)$ is the probability that $X = x$ and $Y = y$ at the same time.

For continuous random variables, $f(x, y)$ is the [[Joint Probability Density Function|joint density]], and a probability is a double integral of it.

> [!idea] The idea
> The distributions of $X$ and $Y$ on their own don't determine how the two move together.

The [[Marginal Probability Function|marginal]] and [[Conditional Probability Function|conditional]] distributions and the [[Covariance|covariance]] can all be read off the joint distribution. The joint distribution can be rebuilt from the marginals only when $X$ and $Y$ are [[Independent Random Variables|independent]].

> [!example]- $X$ and $Y$ are each 0 or 1 with probability 0.5. What is $P(X = 0, Y = 0)$ if $Y = X$, and if $X$ and $Y$ are independent? {Example}
> - If $Y = X$, both are 0 exactly when $X = 0$, so $P(X = 0, Y = 0) = 0.5$.
> - If $X$ and $Y$ are independent, the probabilities multiply: $(0.5)(0.5) = 0.25$.
> - The marginals are the same in both cases, but the joint distributions are not.

## The multinomial distribution

Suppose each of $n$ independent trials falls into exactly one of $k$ categories, with probabilities $p_1, \ldots, p_k$ that add to 1. The counts $N_1, \ldots, N_k$ in the categories have a **multinomial distribution**:

> $$
> \begin{aligned}
> & P(N_1 = n_1, \ldots, N_k = n_k) \\
> & = \frac{n!}{n_1! \cdots n_k!}\,p_1^{n_1} \cdots p_k^{n_k}
> \end{aligned}
> $$

- $n_1 + \cdots + n_k = n$.

The multinomial distribution extends the [[Binomial Distribution|binomial distribution]] to more than two categories. On its own, each count $N_i$ is binomial with $n$ trials and probability $p_i$.

> [!example]- Each of 10 independent claims is auto, home or liability with probabilities 0.5, 0.3 and 0.2. What is the probability of 5 auto, 3 home and 2 liability claims? {Example}
> - The number of orders of 5 auto, 3 home and 2 liability claims is $\frac{10!}{5!\,3!\,2!} = 2{,}520$.
> - Each order has the same probability:
>
> $$(0.5)^5 (0.3)^3 (0.2)^2 = 0.00003375$$
>
> - The probability is $2{,}520 \times 0.00003375 = 0.08505$.

## The multivariate hypergeometric distribution

When $n$ items are drawn without replacement from a group of $m$, of which $m_i$ are of type $i$, the counts of each type follow the multivariate [[Hypergeometric Distribution|hypergeometric distribution]]:

> $$
> \begin{aligned}
> & P(N_1 = n_1, \ldots, N_k = n_k) \\
> & = \frac{\binom{m_1}{n_1} \cdots \binom{m_k}{n_k}}{\binom{m}{n}}
> \end{aligned}
> $$

- $n_1 + \cdots + n_k = n$ and $m_1 + \cdots + m_k = m$.

> [!example]- A file holds 12 claims: 5 auto, 4 home and 3 liability. An auditor draws 4 without replacement. What is the probability of 2 auto, 1 home and 1 liability claim? {Example}
> - The number of samples with that make-up is $\binom{5}{2}\binom{4}{1}\binom{3}{1} = 120$.
> - The number of samples of 4 is $\binom{12}{4} = 495$.
> - The probability is $\frac{120}{495} = 0.2424$.

> [!trap] Multinomial for draws without replacement
> The multinomial needs independent trials with fixed probabilities. Drawing from a fixed group changes the probabilities after each draw. In the auditor's example, using the shares $\frac{5}{12}$, $\frac{4}{12}$ and $\frac{3}{12}$ as multinomial probabilities gives 0.1736 instead of 0.2424.
