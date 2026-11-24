---
id: "atpa-an-033"
exam: "Exam ATPA"
topic: "Bayesian"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Bayesian
  - Concepts/Bayes+Theorem
  - Concepts/Predictive+Accuracy
answer: "0.281"
points: 1
---

In a block of homeowners claims, 4% are fraudulent. A fraud model flags 75% of fraudulent claims and 8% of legitimate claims.

Calculate the probability that a flagged claim is fraudulent. Give your answer to three decimal places.

## Explanation

Let $H$ be "the claim is fraudulent" and $E$ be "the model flags the claim". The prior is $P(H) = 0.04$, and the likelihoods are $P(E \mid H) = 0.75$ and $P(E \mid H^c) = 0.08$.

The marginal probability of a flag is

$$
P(E) = 0.75(0.04) + 0.08(0.96) = 0.0300 + 0.0768 = 0.1068
$$

The posterior is

$$
P(H \mid E) = \frac{0.0300}{0.1068} = \mathbf{0.281}
$$

Fraud is rare, so most flags come from the much larger pool of legitimate claims. This posterior is the model's precision on this block: only about 28% of the claims sent for investigation are fraudulent.

**Common wrong entries**

- **0.750** — the likelihood $P(E \mid H)$, read as if it were the posterior $P(H \mid E)$.
- **0.040** — the prior, unchanged by the evidence.
- **0.904** — compares the flag rates alone, 0.75/(0.75 + 0.08), leaving the prior out.
