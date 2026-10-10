---
id: "masi-an-041"
exam: "Exam MAS-I"
topic: "Mixture Distribution"
learning_objective: "Statistics"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Mixture+Distribution
  - Concepts/Exponential+Distribution
  - Concepts/Variance+for+Conditional+and+Marginal+Distributions
  - Concepts/Linear+Combinations+of+Random+Variables
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:919b43d26b49e734ef656cf88604241954a24cea0fcbe83e446d265e870bb4f3
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008), MAS-I reading, Mixing Method, Example 1.16 and Fact 1.17: probabilities and moments mix linearly, the variance does not (mixed second moment minus squared mixed mean), PDF p.10, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.3.3.1 exponential E[X^k] = theta^k k!, PDF p.12, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-041.md
---

A book of business has two equally large classes of policy. In class 1, claim sizes are exponential with mean 100; in class 2, exponential with mean 1,000. Let $X$ be the size of a claim from a policy chosen at random from the book, and let $X_1$ and $X_2$ be independent exponential random variables with means 100 and 1,000.

Determine which of the following statements are true.

- I. $P(X > 500) = 0.5\,e^{-5} + 0.5\,e^{-0.5}$
- II. $\text{Var}(X) = 0.5\,(100^2) + 0.5\,(1{,}000^2)$
- III. $X$ has the same distribution as $\tfrac{1}{2}X_1 + \tfrac{1}{2}X_2$

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

$X$ is a 50/50 mixture: first a class is chosen, then a claim is drawn from that class's exponential. Its density, CDF and survival function are the weighted averages of the components'.

**I is true.** A probability is linear in the density, so it mixes with the class weights:

$$
P(X > 500) = 0.5\,e^{-500/100} + 0.5\,e^{-500/1{,}000} = 0.5\,e^{-5} + 0.5\,e^{-0.5} = 0.3066
$$

**II is false.** Variance is not linear in the density. Mix the raw moments, then subtract:

$$
E[X] = 0.5(100) + 0.5(1{,}000) = 550
$$

$$
E[X^2] = 0.5\,(2 \cdot 100^2) + 0.5\,(2 \cdot 1{,}000^2) = 1{,}010{,}000
$$

$$
\text{Var}(X) = 1{,}010{,}000 - 550^2 = 707{,}500
$$

Averaging the component variances gives 505,000, short by the variance between the class means, $\text{Var}(E[X \mid \text{class}]) = 0.5 \times 0.5 \times (1{,}000 - 100)^2 = 202{,}500$.

**III is false.** $\tfrac{1}{2}X_1 + \tfrac{1}{2}X_2$ is a *weighted sum*: every claim is half of a class-1 draw plus half of a class-2 draw. It has the same mean, 550, but variance $\tfrac{1}{4}(100^2) + \tfrac{1}{4}(1{,}000^2) = 252{,}500$, and it is not a mixture of the two exponentials. Mixing weights the *densities*, not the random variables.

Only I is true, so the answer is **A**.

**Why not the others**

- **B** — includes II, which averages the variances and drops the spread between the class means (the second term of the law of total variance).
- **C** — includes III, which confuses mixing distributions with adding scaled random variables.
- **D** — includes both errors and rejects I, the one quantity that does mix linearly.
- **E** — would require I to be false; a survival probability is exactly the kind of quantity that mixes with the weights.
