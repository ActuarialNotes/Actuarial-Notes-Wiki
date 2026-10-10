---
id: "masi-an-039"
exam: "Exam MAS-I"
topic: "Random Variable"
learning_objective: "Statistics"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Random+Variable
  - Concepts/Discrete+Random+Variable
  - Concepts/Continuous+Random+Variable
  - Concepts/Payment+Random+Variable
  - Concepts/Deductible
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:09bcb34821f803698b9710c5a8c1cff458ce7fde5a69ccaf1a71341e55fbed38
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-039.md
---

A policy's ground-up loss $X$ is exponentially distributed with mean 1,000, and the policy has an ordinary deductible of 250.

Which of the following random variables is neither discrete nor continuous?

- A) The payment per loss, $(X - 250)_+$
- B) The number of losses the policy has in a year
- C) The ground-up loss $X$
- D) The payment per payment, $X - 250$ given $X > 250$
- E) The average of five independent ground-up losses

## Explanation

A continuous random variable gives probability 0 to every single value; a discrete one takes only countably many values. The payment per loss is

$$
(X - 250)_+ = \begin{cases} 0, & X \le 250 \\ X - 250, & X > 250 \end{cases}
$$

It takes every value in $(0, \infty)$, so it is not discrete, but it puts probability $P(X \le 250) = 1 - e^{-0.25} = 0.2212$ on the single value 0, so it is not continuous. Its CDF jumps by 0.2212 at 0 and rises smoothly after — a **mixed** random variable. The answer is **A**.

**Why not the others**

- **B** — a claim count takes the values 0, 1, 2, and so on: a countable set, so it is discrete.
- **C** — the exponential loss has a density and no point masses; it is continuous.
- **D** — conditioning on $X > 250$ removes the zero payments. By memorylessness, $X - 250$ given $X > 250$ is again exponential with mean 1,000 — continuous. Excluding the losses below the deductible is what separates the per-payment variable from the per-loss one.
- **E** — an average of independent continuous losses is continuous (here gamma); averaging does not create a point mass.
