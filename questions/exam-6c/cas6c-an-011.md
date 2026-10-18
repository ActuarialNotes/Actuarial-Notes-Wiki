---
id: "cas6c-an-011"
exam: "Exam 6C"
topic: "Loss Component"
learning_objective: "Canadian Financial Reporting, Solvency, and Professional Responsibility"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Loss+Component
  - Concepts/Onerous+Contract
  - Concepts/Contractual+Service+Margin
  - Concepts/Liability+for+Remaining+Coverage
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7e67a13ed2f5c8717ec5503d53c05323d123ce41f5fada71fa439eacbbcf96a0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-6c/cas6c-an-011.md
---

A group of contracts measured under the general measurement approach is onerous at initial recognition: its fulfilment cash flows are a net outflow of 300. At the next reporting date, estimates of future cash flows relating to **future service** improve by 500. No other changes occur, and ignore any release of the loss component between the two dates.

What are the loss component and the CSM after the change?

- A) Loss component 300; CSM 0
- B) Loss component 0; CSM 200
- C) Loss component 0; CSM 500
- D) Loss component 300; CSM 500
- E) Loss component 0; CSM 0, with the full 500 recognized in profit or loss

## Explanation

At initial recognition the CSM is floored at zero. The 300 net outflow is recognized as a loss in profit or loss and held as a **loss component (LC)** of the liability for remaining coverage (CIA educational note on the LRC, section 4.8).

Under IFRS 17.50(b), a subsequent *decrease* in fulfilment cash flows relating to future service is allocated "solely to the loss component until that component is reduced to zero." The educational note adds that once the LC is reduced to zero, "a CSM is established or re-established."

$$
\begin{aligned}
\text{To the LC (a reversal of loss in profit or loss)} &= 300 \\
\text{To a new CSM} &= 500 - 300 = 200
\end{aligned}
$$

The answer is **B**.

**Why not the others**

- **A** — treats the LC as permanent. Favourable changes for future service reverse it first.
- **C** — sends the whole improvement to a new CSM, skipping the reversal of the 300 loss already recognized.
- **D** — keeps the LC and also creates a CSM. A group cannot carry both: a CSM exists only once the LC is reduced to zero.
- **E** — recognizes the whole 500 immediately. Only the 300 that reverses the earlier loss reaches profit or loss. The remaining 200 is unearned profit, deferred in the CSM.
