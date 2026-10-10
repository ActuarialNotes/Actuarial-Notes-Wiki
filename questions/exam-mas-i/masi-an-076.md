---
id: "masi-an-076"
exam: "Exam MAS-I"
topic: "Coverage Modifications"
learning_objective: "Statistics"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Coverage+Modifications
  - Concepts/Inflation
  - Concepts/Exponential+Distribution
  - Concepts/Deductible
  - Concepts/Payment+Random+Variable
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a05907d37ff4fd2c847baa49ab6c21b4b4d15941e88686fb34417541cf537a74
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-076.md
---

Ground-up losses are exponential with mean 2,000. A policy has an ordinary deductible of 500 and a maximum covered loss of 10,000, with no coinsurance. Next year all losses will be 10% larger, and the deductible and maximum covered loss will not change.

How will the expected payment per loss and the expected payment per payment change?

- A) Both rise by exactly 10%, because every loss rises by 10%
- B) Per loss rises by less than 10%; per payment rises by more than 10%
- C) Per loss rises by more than 10%; per payment rises by exactly 10%
- D) Both rise by less than 10%, because the maximum covered loss caps the payments
- E) Per loss rises by more than 10%; per payment rises by less than 10%

## Explanation

For an exponential with mean $\theta$, $E[X \wedge x] = \theta(1 - e^{-x/\theta})$, so with deductible $d$ and maximum covered loss $u$:

$$
\begin{align*}
E[Y^L] &= \theta\left(e^{-d/\theta} - e^{-u/\theta}\right) \\
E[Y^P] &= \frac{E[Y^L]}{e^{-d/\theta}} \\
&= \theta\left(1 - e^{-(u - d)/\theta}\right)
\end{align*}
$$

Inflation turns $\theta = 2{,}000$ into $\theta = 2{,}200$:

| | $\theta = 2{,}000$ | $\theta = 2{,}200$ | Change |
| :--- | :---: | :---: | :---: |
| $E[Y^P]$ | 1,982.70 | 2,170.69 | +9.5% |
| $E[Y^L]$ | 1,544.13 | 1,729.39 | +12.0% |

Two effects are at work. Per payment, the excess over the deductible is exponential (memoryless) and would grow by exactly 10%, but the fixed cap of $u - d = 9{,}500$ on each payment trims that to 9.5%. Per loss, the probability of a payment also rises, from $e^{-0.25} = 0.7788$ to $e^{-500/2{,}200} = 0.7967$, so the per-loss cost grows by 1.095 × 1.023 - 1 = 12.0%. The answer is **E**.

**Why not the others**

- **A** — ignores that the policy terms are fixed in dollars; only a policy with no deductible and no limit passes inflation through at exactly 10%.
- **B** — reverses the two effects: more losses piercing the deductible pushes the *per-loss* cost up, not down.
- **C** — applies memorylessness but forgets the maximum covered loss, which caps each payment at 9,500; without the cap the per-payment cost would rise exactly 10%.
- **D** — sees the cap but misses the leveraging effect of the fixed deductible, which more than offsets it per loss.
