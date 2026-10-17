---
id: "cas8-an-009"
exam: "Exam 8"
topic: "Insurance Policy"
learning_objective: "Excess, Deductible, and Individual Risk Rating"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Insurance+Policy
  - Concepts/Retrospective+Rating
  - Concepts/Loss+Sensitive+Rating
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d49bed2fa7c6e9f61b9f4aff932ab7f93ca5375bcefe682f413116831b65b12e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-8/cas8-an-009.md
---

A one-year workers compensation policy is written on an incurred loss retrospective rating plan:

- Basic premium: \$40,000
- Loss conversion factor: 1.10
- Tax multiplier: 1.05
- Minimum retrospective premium: \$120,000
- Maximum retrospective premium: \$300,000
- Deposit premium paid at inception: \$200,000

Ratable losses are \$60,000 at the first adjustment, six months after the policy expires, and \$150,000 at the second adjustment, one year later.

Calculate the additional premium the insured pays at the second adjustment.

- A) Less than 70,000
- B) At least 70,000, but less than 82,000
- C) At least 82,000, but less than 90,000
- D) At least 90,000, but less than 100,000
- E) At least 100,000

## Explanation

Fisher et al. (Chapter 2) give the retrospective premium as $(B + cL) \times T$, bounded by the plan's minimum and maximum. For incurred loss plans, losses are typically first evaluated six months after the policy expires and then annually.

At the first adjustment the formula falls below the minimum:

$$
\begin{align*}
(40{,}000 + 1.10 \times 60{,}000) \times 1.05 &= 111{,}300 \\
\text{Retro premium}_1 &= \max(111{,}300,\ 120{,}000) \\
&= 120{,}000
\end{align*}
$$

so the insured gets back 80,000 of its 200,000 deposit. At the second adjustment:

$$
\begin{align*}
\text{Retro premium}_2 &= (40{,}000 + 1.10 \times 150{,}000) \times 1.05 \\
&= 215{,}250 \\
\text{Additional premium} &= 215{,}250 - 120{,}000 \\
&= \mathbf{95{,}250}
\end{align*}
$$

The answer is **D**.

**Why not the others**

- **A** (15,250) compares the new retro premium with the deposit, forgetting that the first adjustment already returned premium to the insured.
- **B** (79,500) leaves out the loss conversion factor, so the LAE that varies with losses is never charged.
- **C** (85,000) leaves out the tax multiplier.
- **E** (103,950) ignores the minimum at the first adjustment and measures from 111,300, which was never charged.
