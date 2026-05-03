---
id: p-089
topic: Multivariate Random Variables
subtopic: Conditional Probability Function
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - conditional-expectation
  - geometric-distribution
wiki_link: Concepts/Conditional+Probability+Function
answer: E
points: 1
---

Let $N_1$ and $N_2$ represent the numbers of claims submitted to a life insurance company in April and May, respectively. The joint probability function of $N_1$ and $N_2$ is
$$p(n_1, n_2) = \begin{cases} \frac{3}{4} \left(\frac{1}{4}\right)^{n_1-1} e^{-n_1} (1 - e^{-n_1})^{n_2-1}, & n_1=1,2,3,\dots \text{ and } n_2=1,2,3,\dots \\ 0, & \text{otherwise.} \end{cases}$$

Calculate the expected number of claims that will be submitted to the company in May, given that exactly 2 claims were submitted in April.

- A) $\frac{3}{16}(e^2-1)$
- B) $\frac{3}{16}e^2$
- C) $\frac{3e}{4-e}$
- D) $e^2-1$
- E) $e^2$

## Explanation

We need to find the conditional expectation $E[N_2 \mid N_1 = 2]$.
The conditional probability function of $N_2$ given $N_1 = 2$ is proportional to $p(2, n_2)$:
$$p(n_2 \mid N_1 = 2) \propto p(2, n_2) = \frac{3}{4} \left(\frac{1}{4}\right)^1 e^{-2} (1 - e^{-2})^{n_2-1} = c(1 - e^{-2})^{n_2-1}$$
where $c$ is a constant with respect to $n_2$.

This implies that $N_2 \mid N_1=2$ follows a geometric distribution where the probability of "failure" is $1 - e^{-2}$, so the probability of "success" is $p = e^{-2}$. (This is the version of the geometric distribution modeling the number of trials until the first success, starting at $n_2 = 1$).

The expected value of a geometric random variable starting at 1 is $\frac{1}{p}$.
Therefore, $E[N_2 \mid N_1=2] = \frac{1}{e^{-2}} = e^2$.
