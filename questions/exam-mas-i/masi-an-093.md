---
id: "masi-an-093"
exam: "Exam MAS-I"
topic: "Model Structure"
learning_objective: "Extended Linear Models"
difficulty: easy
type: multi-part
bloom: understand
wiki_link:
  - Concepts/Model+Structure
  - Concepts/Link+Function
  - Concepts/Poisson+Regression
  - Concepts/Logistic+Regression
  - Concepts/Gamma
  - Concepts/Tweedie+Distribution
  - Concepts/Response+Variable
points: 4
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a443b6822532995d729a870dc92458a43d8f871c023c3e51d492c366ac4ffa78
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-093.md
---

A personal auto insurer is building four GLMs from the same policy file. For each response described below, choose the response distribution and link that best match the behaviour of the data. An option may be used more than once or not at all.

## Part a (1 point)
Loss cost per policy: about 92% of policies have no loss, and the rest have a positive, right-skewed loss amount.

- A) Poisson, log link
- B) Gamma, log link
- C) Binomial, logit link
- D) Tweedie with power $p$ between 1 and 2, log link
- E) Normal, identity link

### Answer
D

### Explanation
A response with a point mass at zero and a continuous, skewed positive part is the compound Poisson-gamma, the Tweedie distribution with $p$ between 1 and 2; the log link keeps fitted loss costs positive and multiplicative. **B** cannot handle the zeros (a Gamma has no mass at zero), **A** is for integer counts, and **E** would ignore both the spike and the skew.

## Part b (1 point)
Whether each policy renews at its next term (yes or no).

- A) Poisson, log link
- B) Gamma, log link
- C) Binomial, logit link
- D) Tweedie with power $p$ between 1 and 2, log link
- E) Normal, identity link

### Answer
C

### Explanation
A yes/no outcome is Bernoulli (binomial with one trial); the logit link maps the probability onto the whole real line, so fitted probabilities stay between 0 and 1. **E** (a linear probability model) can give fitted values outside $[0, 1]$, and **A** treats the outcome as a count that could exceed 1.

## Part c (1 point)
The number of claims each policy reports during its term, with terms of different lengths.

- A) Poisson, log link
- B) Gamma, log link
- C) Binomial, logit link
- D) Tweedie with power $p$ between 1 and 2, log link
- E) Normal, identity link

### Answer
A

### Explanation
Non-negative integer counts are modelled with a Poisson response; the log link makes rating factors multiplicative and lets the different term lengths enter as an offset of $\ln(\text{exposure})$. **C** would need a fixed maximum number of claims, and **B** and **D** are for amounts, not counts.

## Part d (1 point)
The average size of the claims of each policy that had at least one claim: always positive, right-skewed, with a standard deviation roughly proportional to the mean.

- A) Poisson, log link
- B) Gamma, log link
- C) Binomial, logit link
- D) Tweedie with power $p$ between 1 and 2, log link
- E) Normal, identity link

### Answer
B

### Explanation
Positive, skewed amounts whose standard deviation grows in proportion to the mean have variance $\phi\mu^2$, the Gamma variance function; the log link gives multiplicative relativities. Because only policies with a claim are in this data set there are no zeros, so **D**'s point mass at zero is unnecessary, and **E** assumes a constant variance and allows negative fitted values. (Average severities should also carry the claim count as a prior weight.)
