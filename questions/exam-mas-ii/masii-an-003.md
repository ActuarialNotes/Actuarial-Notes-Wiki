---
id: "masii-an-003"
exam: "Exam MAS-II"
topic: "Risk Experience"
learning_objective: "Introduction to Credibility"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Risk+Experience
  - Concepts/Bühlmann+Credibility
  - Concepts/Expected+Value+of+Process+Variance
  - Concepts/Variance+of+Hypothetical+Means
answer: "C"
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5eb154528ece981893e86bf149614393eff3691e983cdc4872d06a363f7bdb6a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-003.md
---

A policyholder has four years of its own loss experience, with an average annual aggregate loss of 900. For the portfolio it belongs to, you are given:

- Collective (prior) mean annual aggregate loss: 600
- Expected value of the process variance of one year's aggregate loss: 120,000
- Variance of the hypothetical means: 10,000

Calculate the Bühlmann credibility estimate of this policyholder's expected annual aggregate loss.

- A) 600
- B) 623
- C) 675
- D) 700
- E) 825

## Explanation

Each year of the policyholder's experience is one observation, so $N = 4$:

$$
K = \frac{120{,}000}{10{,}000} = 12, \qquad Z = \frac{4}{4 + 12} = 0.25
$$

$$
\text{Estimate} = 0.25(900) + 0.75(600) = \mathbf{675}
$$

The answer is **C**.

**Why not the others**

- **A** — gives the policyholder's experience no weight. Under Bühlmann credibility $Z = N/(N+K)$ is positive for any $N > 0$ when VHM is positive.
- **B** — uses $N = 1$ ($Z = 1/13$), crediting only one year of the four-year record.
- **D** — uses $Z = N/K = 4/12$, dropping $N$ from the denominator.
- **E** — reverses the weights, applying $Z = 0.25$ to the collective mean and 0.75 to the policyholder's own experience.
