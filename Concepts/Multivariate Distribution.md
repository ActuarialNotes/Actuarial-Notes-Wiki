---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:9bda6d86ad616cfdae09214feb6a454f63dae43e78f4b22a251506489e256830
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

A **multivariate distribution** describes the joint probabilistic behavior of two or more [[Random Variable]]s. For random variables $X_1, X_2, \ldots, X_n$, it is given by the [[Joint Probability Function]] in the discrete case or the [[Joint Probability Density Function]] in the continuous case.

> $$P(X = x,\; Y = y) = p(x, y)$$

- For two discrete variables, the joint probability function $p(x, y)$ gives the probability of every pair of values at once.
- **[[Marginal Probability Function]]s**: the distribution of each variable on its own, found by summing or integrating out the others.
- **[[Conditional Probability Function]]s**: the distribution of one variable given fixed values of the others.
- **[[Covariance]] and [[Correlation Coefficient]]**: measures of linear dependence between pairs of variables.
- If all variables are [[Independent Random Variables]], the joint distribution factors as the product of the marginals. Only under independence do the marginals rebuild the joint distribution, by multiplying.

> [!idea] The idea
> Knowing how each variable behaves on its own does not tell you how the variables move together. Two different joint distributions can share the same marginals, so the joint distribution has to list the probability of every combination of values. The marginals, the conditionals and the covariance can then all be read off it.

![[Media/Figures/Multivariate_Distribution.svg|340]]

## What one variable at a time can't tell you

A policyholder has an auto policy and a home policy with one insurer. Let $X$ be the number of auto claims next year (0 or 1) and $Y$ the number of home claims (0, 1 or 2). Their joint probability function is:

| | $Y=0$ | $Y=1$ | $Y=2$ |
|---|---|---|---|
| $X=0$ | 0.30 | 0.15 | 0.05 |
| $X=1$ | 0.20 | 0.20 | 0.10 |

On its own, $X$ is 0 or 1 with probability 0.50 each. On its own, $Y$ is 0, 1 or 2 with probabilities 0.50, 0.35 and 0.15. Now compare a second table with exactly the same marginals, built by multiplying them:

| | $Y=0$ | $Y=1$ | $Y=2$ |
|---|---|---|---|
| $X=0$ | 0.25 | 0.175 | 0.075 |
| $X=1$ | 0.25 | 0.175 | 0.075 |

In the second table, an auto claim tells you nothing about home claims. In the first table, the probability of no claims at all is 0.30 instead of 0.25, because a policyholder without auto claims tends to have no home claims either. The marginals are identical, but the multivariate distributions are not.

## Everything else is read off the joint distribution

Once the joint distribution is known, every other question about the pair is a sum over its cells.

- **An event about both variables.** The probability of at least two claims in total adds the cells with $x + y \ge 2$: $0.05 + 0.20 + 0.10 = 0.35$.
- **A marginal.** $P(Y = 2) = 0.05 + 0.10 = 0.15$ adds a column.
- **A conditional.** Given one auto claim, the row $(0.20, 0.20, 0.10)$ is divided by its total 0.50, so $P(Y = 2 \mid X = 1) = 0.20$.
- **A covariance.** $E[XY] = (1)(1)(0.20) + (1)(2)(0.10) = 0.40$, while $E[X]\,E[Y] = (0.50)(0.65) = 0.325$. The [[Covariance]] is $0.40 - 0.325 = 0.075$, so the two claim counts tend to move together.

For continuous variables the cells become a joint density $f(x, y)$, and every sum becomes a double integral over the region the event describes.

> $$P\big((X, Y) \in A\big) = \iint_A f(x, y)\, dx\, dy$$

## When the support is not a rectangle

A continuous joint density often lives on a triangle such as $0 < x < y < 1$. Suppose $f(x, y) = cx$ there. For each $y$, the inner integral runs over $x$ from 0 to $y$, not from 0 to 1.

> $$\int_0^1 \int_0^y cx \, dx\, dy = \frac{c}{6}$$

Setting the total to 1 gives $c = 6$.

> [!trap] A triangle integrated as a square
> Integrating $cx$ over the whole unit square gives $c/2$, so the wrong constant $c = 2$. Sketch the support first and let the inner limits depend on the outer variable.

A support that is not a rectangle also tells you the variables are dependent. Knowing $Y = 0.3$ forces $X < 0.3$, so $X$ carries information about $Y$.

## Counting several categories at once

Many multivariate distributions on Exam P count how $n$ items split among several categories. When each of $n$ independent trials falls into exactly one of $k$ categories with fixed probabilities $p_1, \ldots, p_k$ (summing to 1), the category counts $(N_1, \ldots, N_k)$ have a **multinomial distribution** (a trinomial for $k = 3$). The multinomial distribution is the multivariate extension of the [[Binomial Distribution|binomial]].

> $$P(N_1 = n_1, \ldots, N_k = n_k) = \frac{n!}{n_1! \cdots n_k!}\,p_1^{n_1} \cdots p_k^{n_k}$$

- where $n_1 + \cdots + n_k = n$
- The multinomial coefficient $n!/(n_1! \cdots n_k!)$ counts the orders in which those counts can occur. Each order has probability $p_1^{n_1} \cdots p_k^{n_k}$.

Suppose 10 independent claims are each auto, home or liability with probabilities 0.5, 0.3 and 0.2. The probability of 5 auto, 3 home and 2 liability claims is

> $$\frac{10!}{5!\,3!\,2!}(0.5)^5(0.3)^3(0.2)^2 = 0.08505$$

When items are drawn **without replacement** from a fixed group, each draw changes the shares left, so the trials are not independent. The counts then follow the multivariate [[Hypergeometric Distribution|hypergeometric]] distribution. With $m_i$ items of type $i$ in a group of $m$, and a sample of $n$:

> $$P(N_1 = n_1, \ldots, N_k = n_k) = \frac{\binom{m_1}{n_1} \cdots \binom{m_k}{n_k}}{\binom{m}{n}}$$

## On other exams

Exam 9 (ERM questions moved from Exam 7) describes the dependence between two lines' losses with a [[Copula|copula]]. A copula joins the two marginal distributions into one multivariate distribution. The independence copula $C(u, v) = uv$ is the product rule above, and other copulas add dependence, for example in the tails.

## Try it

> [!example]- Joint vs. Marginal Distribution {Example}
> $X$ and $Y$ each take values $\{0, 1\}$ with joint PMF: $P(0,0)=0.1$, $P(0,1)=0.4$, $P(1,0)=0.3$, $P(1,1)=0.2$. Find both marginals and decide whether $X$ and $Y$ are independent.
>
> > [!answer]-
> > **Plan:** add rows and columns for the marginals, then compare one cell with the product of its marginals.
> >
> > Marginal of $X$: $P(X=0) = 0.1+0.4 = 0.5$, $P(X=1) = 0.3+0.2 = 0.5$.
> > Marginal of $Y$: $P(Y=0) = 0.1+0.3 = 0.4$, $P(Y=1) = 0.4+0.2 = 0.6$.
> > Since $P(0,0) = 0.1 \neq P(X=0)P(Y=0) = 0.20$, $X$ and $Y$ are not independent.
> >
> > Why is one cell enough? Independence needs the product rule in every cell, so one failure settles it.

> [!example]- A constant on a triangle {Example}
> Two loss components have joint density $f(x, y) = cy$ for $0 < x < y < 1$. Find $c$ and the marginal density of $X$.
>
> > [!answer]-
> > **Plan:** integrate over the triangle with $x$ from 0 to $y$, then integrate $y$ out for the marginal of $X$.
> > $$
> > \begin{align*}
> > \int_0^1 \int_0^y cy\, dx\, dy &= \int_0^1 c y^2\, dy \\
> >                                &= \frac{c}{3}
> > \end{align*}
> > $$
> > So $c = 3$. For a fixed $x$, $y$ runs from $x$ to 1:
> > $$
> > \begin{align*}
> > f_X(x) &= \int_x^1 3y\, dy \\
> >        &= 1.5\,(1 - x^2), \quad 0 < x < 1
> > \end{align*}
> > $$
> > The limits for the marginal of $X$ are the other half of the same sketch: $y$ starts at the line $y = x$.

> [!example]- With or without replacement {Example}
> A claims file holds 12 claims: 5 auto, 4 home and 3 liability. An auditor draws 4 claims without replacement. Find the probability of 2 auto, 1 home and 1 liability claim, and compare it with the multinomial answer that treats each draw as independent.
>
> > [!answer]-
> > **Plan:** count the samples with the right make-up and divide by all samples, then redo it with fixed shares.
> > $$
> > \begin{align*}
> > P(2, 1, 1) &= \frac{\binom{5}{2}\binom{4}{1}\binom{3}{1}}{\binom{12}{4}} \\
> >            &= \frac{120}{495} \\
> >            &= 0.2424
> > \end{align*}
> > $$
> > The multinomial answer uses shares $5/12$, $4/12$ and $3/12$ on every draw:
> > $$
> > \begin{align*}
> > P(2, 1, 1) &= \frac{4!}{2!\,1!\,1!}\left(\frac{5}{12}\right)^2\left(\frac{4}{12}\right)\left(\frac{3}{12}\right) \\
> >            &= 0.1736
> > \end{align*}
> > $$
> > The two differ because removing a claim changes the shares for the next draw. The question says "without replacement", so 0.2424 is the answer.

> [!warning]- Exam traps
> - **Zero covariance read as independence.** Independence gives zero covariance, but zero covariance does not give independence, because covariance measures only the linear relationship. Show that the joint distribution equals the product of the marginals everywhere before treating the variables as independent.
> - **A triangular support integrated as a square.** For a density on $0 < x < y < 1$ the inner limits depend on the outer variable. With $f(x,y) = cx$, integrating over the triangle gives $c = 6$, while integrating over the unit square gives the wrong $c = 2$. A support that isn't a rectangle also means the variables cannot be independent.
> - **Multinomial for draws without replacement.** The multinomial needs independent trials with fixed probabilities. Drawing claims one after another from a fixed group changes the probabilities after each draw, so the counts are hypergeometric, not multinomial with each category's share as $p_i$.
> - **Marginals used to rebuild the joint.** Multiplying the marginals gives the joint distribution only for independent variables. For the auto and home claims above, it gives 0.25 for no claims instead of 0.30.
