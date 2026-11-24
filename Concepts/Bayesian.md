---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5284bbe64098a21bd05f91f9db659546a5ab3b3b26f4f7a06e7c6be884e52fc3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bayesian.md
---

**Bayesian** probability interprets probability as a degree of belief about uncertain propositions, updated as new evidence arrives. This contrasts with the frequentist view, which treats probability as a long-run frequency rather than a belief to be updated.

Starting from a prior $P(H)$ for a hypothesis $H$, the belief after observing evidence $E$, the posterior $P(H \mid E)$, follows from [[Bayes Theorem|Bayes' theorem]] and is

> $$P(H \mid E) = \frac{P(E \mid H)\, P(H)}{P(E)}$$

- $P(E \mid H)$ is the likelihood, the [[Conditional Probability|conditional probability]] of the evidence if $H$ is true.
- $P(E) = \sum_i P(E \mid H_i)\,P(H_i)$ is the marginal probability of the evidence, from the law of total probability over all competing hypotheses $H_i$.

The prior encodes initial belief, and the likelihood reweights it by how well each hypothesis explains the evidence. A hypothesis under which the evidence has probability 0 has posterior probability 0, however large its prior.

> [!example]- What is the probability that a person who tests positive has the disease? {Example}
> A disease affects 1% of the population. A diagnostic test has 95% sensitivity (true positive rate) and a 5% false positive rate. A randomly selected person tests positive.
>
> > [!answer]-
> > - Let $H$ be "has the disease" and $E$ be "tests positive", so $P(H) = 0.01$, $P(E \mid H) = 0.95$ and $P(E \mid H^c) = 0.05$.
> > - The marginal probability of a positive test is $P(E) = 0.95(0.01) + 0.05(0.99) = 0.059$.
> > - The posterior is $P(H \mid E) = 0.95(0.01)/0.059 = 0.161$.
> > - Despite the positive test, there is only about a 16.1% chance the person has the disease, because the disease is rare.

## Bayesian predictive models

In a Bayesian predictive model the parameters $\theta$ are given a prior distribution $p(\theta)$, and the data $y$ update it into the [[Posterior Distribution|posterior distribution]]

> $$p(\theta \mid y) \propto p(y \mid \theta)\,p(\theta)$$

- $p(y \mid \theta)$ is the likelihood of the data under the model.

A prediction for a new record uses the [[Predictive Distribution|predictive distribution]], which averages the model's predictions over the posterior. The prediction therefore carries the uncertainty in the parameters as well as the randomness of the outcome. For most models the posterior has no closed form, and it is sampled by [[Markov Chain Monte Carlo|Markov chain Monte Carlo]].

## Priors as regularization

Suppose a regression has normal errors with variance $\sigma^2$, and each slope coefficient $\beta_j$ is given an independent normal prior with mean 0 and variance $\tau^2$. The most probable coefficients under the posterior minimize

> $$\text{RSS} + \frac{\sigma^2}{\tau^2}\sum_{j=1}^{p}\beta_j^{2}$$

This is [[Regularization#Ridge regression|ridge regression]] with $\lambda = \sigma^2/\tau^2$. A smaller prior variance $\tau^2$ shrinks the coefficients further toward 0. A Laplace prior with mean 0 gives [[Regularization#The lasso|the lasso]] in the same way.

> [!example]- What ridge penalty $\lambda$ does this prior give? {Example}
> A regression's errors have standard deviation 20, and each slope coefficient has a normal prior with mean 0 and standard deviation 10.
>
> > [!answer]-
> > - The error variance is $\sigma^2 = 20^2 = 400$ and the prior variance is $\tau^2 = 10^2 = 100$.
> > - The penalty is $\lambda = 400/100 = 4$.

## Hierarchical priors

A [[Hierarchical Model#Bayesian hierarchical model|Bayesian hierarchical model]] gives each group's effect a prior centred on the overall mean. A group's estimate is then pulled toward that mean, and the less data the group has, the further it is pulled. Suppose a group mean has a normal prior with mean $m$ and variance $\tau^2$, and the group has $n$ observations with known variance $\sigma^2$ and average $\bar{y}$. The posterior mean of the group is

> $$Z\bar{y} + (1 - Z)\,m$$

> $$Z = \frac{n}{n + \sigma^2/\tau^2}$$

- $Z$ is the weight given to the group's own data.

This is [[Bühlmann Credibility|credibility]] and the [[Random Effects#Shrinkage of random effects|shrinkage of random effects]] in Bayesian form.

> [!example]- What is the posterior mean severity for this territory? {Example}
> Severity across territories has a normal prior with mean 500 and variance 2,500. A territory has 20 claims averaging 600, and the variance of one claim is 40,000.
>
> > [!answer]-
> > - The ratio of variances is $\sigma^2/\tau^2 = 40{,}000/2{,}500 = 16$.
> > - The weight is $Z = 20/(20 + 16) = 0.556$.
> > - The posterior mean is $0.556(600) + 0.444(500) = 555.6$.
> > - The territory's own average of 600 is pulled a little under halfway back toward 500.
