---
id: "fams-061"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Normal+Approximation
  - Concepts/Negative+Binomial+Distribution
  - Concepts/Uniform+Continuous+Distribution
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:08ea62479f48573f2db71cf8a46d6a7deab7d3f5f2c65280c54b279e6a10260b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-061.md
---

For an aggregate loss distribution $S$:

(i) The number of claims has a negative binomial distribution with $r = 16$ and $\beta = 6$.

(ii) The claim amounts are uniformly distributed on the interval (0, 8).

(iii) The number of claims and claim amounts are mutually independent.

Calculate the premium such that the probability that aggregate losses will exceed the premium is 5% using the normal approximation for aggregate losses.

- A) 500
- B) 520
- C) 540
- D) 560
- E) 580

## Explanation

We have the following table:

| Item | Dist | $E(\ )$ | $Var(\ )$ |
|---|---|---|---|
| Number claims | $NB(16,6)$ | $16(6) = 96$ | $16(6)(7) = 672$ |
| Claims amounts | $U(0,8)$ | $(8-0)/2 = 4$ | $(8-0)^2/12 = 5.33$ |
| Aggregate | | $4(96) = 384$ | $96(5.33) + 672(4^2) = 11{,}264$ |

$$\begin{align*}
\text{Premium} &= E(S) + 1.645\sqrt{Var(S)} \\
&= 384 + 1.645\sqrt{11{,}264} \\
&= 559
\end{align*}$$

The answer is **D**.
