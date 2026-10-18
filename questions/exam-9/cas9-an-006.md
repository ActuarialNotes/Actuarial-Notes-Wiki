---
id: "cas9-an-006"
exam: "Exam 9"
topic: "Insurance Profitability"
learning_objective: "Risk and Return"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Insurance+Profitability
  - Concepts/Insurance+Leverage
  - Concepts/Insurance+Margin
  - Concepts/Return+on+Capital
answer: "E"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:535ff4fe8f7c386ed3419fcc3f33f9ba27309fbab45b53f54af695cfb51faa88
  sources:
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market, arXiv:2008.12427v1 (2020), Notation p.6 (premium = expected loss + margin; assets = premium + equity), §3.1 p.8 (M = P - S, Q = a - P), eq.(18) p.19 and §6.1 p.22 (return = margin/equity), p.26 (loss ratio, premium-to-surplus leverage), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), Domains A-D tasks pp.3-6 and text references pp.7-8, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-9/cas9-an-006.md
---

A book of business has premium of 100, expected loss of 94 and allocated capital of 50, in a one-period model with no expenses, taxes or investment income. Management's target return on capital is 15%. Premium and expected loss cannot change.

Using the decomposition of return into margin ratio and leverage, calculate the premium-to-capital leverage the book would need to earn the target return.

- A) 0.40
- B) 0.71
- C) 2.00
- D) 2.35
- E) 2.50

## Explanation

Return on capital decomposes as

$$
\frac{M}{Q} = \frac{M}{P} \times \frac{P}{Q}
$$

The margin is $M = 100 - 94 = 6$, a margin ratio of 6%. Today the leverage is $P/Q = 100/50 = 2.0$ and the return is $\iota = 6\% \times 2.0 = 12\%$, short of target. With the margin ratio fixed, the leverage that earns 15% is

$$
\frac{P}{Q} = \frac{0.15}{0.06} = \mathbf{2.50}
$$

that is, capital of $Q = 100 / 2.5 = 40$. The answer is **E**.

Whether running the book at 2.5 times leverage is acceptable is a separate question: 40 of capital absorbs less adverse deviation than 50, so the higher return is bought with more risk of exhausting capital.

**Why not the others**

- **A** — 0.40 is capital to premium, $Q/P$ — the reciprocal of leverage.
- **B** — 0.71 is premium to *assets*, $P/(P + Q) = 100/140$, not premium to capital.
- **C** — 2.00 is the current leverage, which earns only 12%.
- **D** — 2.35 is expected loss to capital, $L/Q = 94/40$, using losses rather than premium as the volume measure.
