---
id: "cas9-an-005"
exam: "Exam 9"
topic: "Insurance Leverage"
learning_objective: "Risk and Return"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Insurance+Leverage
  - Concepts/Insurance+Margin
  - Concepts/Return+on+Capital
  - Concepts/Insurance+Profitability
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c4fd0008ae37d8c56b40bf5c957e363b18f6ba615066e162337227dfdcc29e95
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-9/cas9-an-005.md
---

An insurer prices two lines in a one-period model with no expenses, taxes or investment income. Capital has been allocated to each line.

| | Line A (personal auto) | Line B (property catastrophe) |
|---|---|---|
| Premium | 100 | 50 |
| Expected loss | 92 | 30 |
| Allocated capital | 40 | 160 |

Which of the following conclusions is best supported?

- A) Line B is the more profitable line, because its margin ratio of 40% is five times line A's margin ratio of 8%.
- B) Line B earns the higher return on capital, because it produces the larger margin in dollars, 20 against 8.
- C) The returns cannot be ranked from these figures, because return depends on the assets supporting each line, which are not given.
- D) Line A earns the higher return on capital, because its premium-to-capital leverage more than offsets its thinner margin ratio.
- E) Line B earns the higher return on capital, because return equals the margin ratio divided by premium-to-capital leverage.

## Explanation

Return on capital is the margin ratio times premium-to-capital leverage:

$$
\frac{M}{Q} = \frac{M}{P} \times \frac{P}{Q}
$$

- Line A: $M = 100 - 92 = 8$, margin ratio 8%, leverage $P/Q = 100/40 = 2.5$, return $\iota = 8\% \times 2.5 = \mathbf{20\%}$.
- Line B: $M = 50 - 30 = 20$, margin ratio 40%, leverage $P/Q = 50/160 = 0.3125$, return $\iota = 40\% \times 0.3125 = \mathbf{12.5\%}$.

Line A's thin margin is levered 2.5 times; line B's fat margin is spread over capital more than three times its premium. The answer is **D**.

**Why not the others**

- **A** — a margin ratio alone measures profit per dollar of premium, not per dollar of capital; a catastrophe line's low loss ratio is largely the price of the capital its tail consumes.
- **B** — dollars of margin say nothing about return until divided by the capital that earns them: 20 on 160 is less than 8 on 40.
- **C** — the assets are known: each line's assets are its premium plus its capital (140 and 210), and return needs only margin and capital anyway.
- **E** — inverts the leverage term; dividing by leverage gives 3.2% for A and 128% for B, which is not a return on anything.
