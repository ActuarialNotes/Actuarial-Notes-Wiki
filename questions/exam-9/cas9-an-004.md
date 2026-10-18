---
id: "cas9-an-004"
exam: "Exam 9"
topic: "Insurance Margin"
learning_objective: "Risk and Return"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Insurance+Margin
  - Concepts/Insurance+Leverage
  - Concepts/Return+on+Capital
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:015eb575b1e8ff898a0f9c9b2f3475208a7a1bce5ab1dc738c69d835fea2dda5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-9/cas9-an-004.md
---

In a one-period model with no expenses, taxes or investment income, a portfolio has expected loss $L$, premium $P$ and margin $M = P - L$, and is supported by assets $a$ funded by premium and investor capital $Q = a - P$.

Determine which of the following statements about the insurance margin are true.

- I. Holding expected loss and assets fixed, a higher required return on capital raises the margin and reduces the capital investors contribute.
- II. The margin as a percentage of premium equals one minus the loss ratio.
- III. Two portfolios with the same margin as a percentage of premium earn the same return on capital.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

- **I. True.** With $L$ and $a$ fixed, the premium that earns return $\iota$ is $P = (L + \iota a)/(1 + \iota) = L + \tfrac{\iota}{1+\iota}(a - L)$, which rises with $\iota$. A higher premium is a larger margin $M = P - L$, and since $a$ is fixed, more of the assets are funded by policyholders and less by investors: $Q = a - P$ falls.
- **II. True.** $M/P = (P - L)/P = 1 - L/P$, one minus the loss ratio.
- **III. False.** Return on capital is $M/Q = (M/P) \times (P/Q)$: margin ratio times premium-to-capital leverage. Two portfolios with the same margin ratio earn different returns if one needs more capital per dollar of premium. A catastrophe-exposed book needs a far higher margin ratio than a diversified one to earn the same return.

Statements I and II are true, so the answer is **B**.

**Why not the others**

- **A** — misses II, which follows straight from $M = P - L$; the margin ratio and the loss ratio are complements.
- **C** and **D** — include III, which treats the margin ratio as a measure of return and forgets the leverage term.
- **E** — would require all three to be true (or none of the listed sets to match), but III is false.
