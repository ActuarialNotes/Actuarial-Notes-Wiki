---
id: "masi-an-038"
exam: "Exam MAS-I"
topic: "Covariance"
learning_objective: "Statistics"
difficulty: medium
type: multi-part
bloom: analyze
wiki_link:
  - Concepts/Covariance
  - Concepts/Independent+Random+Variables
  - Concepts/Deductible
  - Concepts/Uniform+Continuous+Distribution
points: 4
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:bb0f18994de9cd0e20380732ce0bf3aad070f96748ee9ac05e25c155081848d8
  sources:
    - "Siegrist, Probability, Mathematical Statistics, Stochastic Processes (randomservices.org), ch.4 Covariance and Correlation, independent implies uncorrelated; the converse fails (functionally related yet uncorrelated); variance of a sum, sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-038.md
---

For each pair of random variables below, determine the sign of $\text{Cov}(X, Y)$. An option may be used more than once or not at all.

## Part a (1 point)
A reserve's forecast error $X$ is uniformly distributed on $(-100, 100)$, and $Y = X^2$ is the squared error.

- A) Positive
- B) Negative
- C) Zero
- D) Cannot be determined from the information given

### Answer
C

### Explanation
$X$ is symmetric about 0, so $E[X] = 0$ and $E[XY] = E[X^3] = 0$:

$$
\text{Cov}(X, Y) = E[X^3] - E[X]\,E[X^2] = 0 - 0 = 0
$$

Yet $Y$ is a function of $X$, so the two are as dependent as can be. Covariance measures only *linear* association; a U-shaped relationship has none. **A** and **B** read a sign into a relationship that rises on one side of 0 and falls on the other; **D** forgets that the full distribution is given.

## Part b (1 point)
A ground-up loss is exponential with mean 1,000 and is subject to a deductible of 500. $X = \min(\text{loss}, 500)$ is the part the insured retains, and $Y = \max(\text{loss} - 500, 0)$ is the part the insurer pays.

- A) Positive
- B) Negative
- C) Zero
- D) Cannot be determined from the information given

### Answer
A

### Explanation
Whenever $Y > 0$ the loss exceeded 500, so $X = 500$ exactly. Hence $E[XY] = 500\,E[Y]$ and

$$
\text{Cov}(X, Y) = 500\,E[Y] - E[X]\,E[Y] = E[Y]\big(500 - E[X]\big)
$$

$E[Y] > 0$, and $E[X] < 500$ because the retained part is below 500 whenever the loss is, so the covariance is positive (about 64,600 here). Both pieces rise with the loss — a large loss fills the insured's layer *and* reaches the insurer's. **B** treats the split as if the two shares traded off against each other, which they would only for a fixed total; **C** treats the two layers as unrelated.

## Part c (1 point)
Of 20 independent policies, $X$ is the number with no claim in the year and $Y$ is the number with at least one claim.

- A) Positive
- B) Negative
- C) Zero
- D) Cannot be determined from the information given

### Answer
B

### Explanation
Every policy is in exactly one group, so $Y = 20 - X$ and

$$
\text{Cov}(X, Y) = \text{Cov}(X, 20 - X) = -\text{Var}(X) < 0
$$

(as long as the claim probability is strictly between 0 and 1). The independence of the *policies* says nothing about the two *counts*, which are tied together by the fixed total — so **C** is wrong, and **D** is wrong because the constraint alone fixes the sign.

## Part d (1 point)
$X$ and $Y$ are the claim amounts from two related policies, and all that is known is that they are not independent.

- A) Positive
- B) Negative
- C) Zero
- D) Cannot be determined from the information given

### Answer
D

### Explanation
Independence implies zero covariance, but dependence does not imply any particular sign — or even a nonzero covariance, as part (a) shows. Dependent pairs can have positive, negative or zero covariance, so without more information the sign is undetermined. **A** assumes that "related" claims move together; **C** confuses the two directions of the implication between independence and zero covariance.
