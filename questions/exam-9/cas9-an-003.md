---
id: "cas9-an-003"
exam: "Exam 9"
topic: "Insurance Pricing"
learning_objective: "Risk and Return"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Insurance+Pricing
  - Concepts/Insurance+Margin
  - Concepts/Return+on+Capital
  - Concepts/Risk+Loads
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:335424c551a5ac4e68924ea1e1ba8bd30e5cf9b290e54c0b2352df57946ff2d2
  sources:
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market, arXiv:2008.12427v1 (2020), Notation p.6 (premium = expected loss + margin; assets = premium + equity), §3.1 p.8 (M = P - S, Q = a - P), eq.(18) p.19 and §6.1 p.22 (return = margin/equity), p.26 (loss ratio, premium-to-surplus leverage), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), Domains A-D tasks pp.3-6 and text references pp.7-8, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-9/cas9-an-003.md
---

A one-period portfolio has expected loss of 60. Its capital standard requires total assets of 160 at inception, funded by the premium collected plus the capital investors contribute. Investors require an expected return of 15% on the capital they contribute. Ignore expenses, taxes and investment income.

Calculate the premium for the portfolio.

- A) 69.00
- B) 73.04
- C) 75.00
- D) 80.87
- E) 84.00

## Explanation

Premium is expected loss plus margin, and assets are premium plus capital:

$$
P = L + M, \qquad a = P + Q
$$

The margin must earn the required return on the capital, $M = \iota Q = \iota (a - P)$. Substituting:

$$
P = L + \iota (a - P) \quad\Longrightarrow\quad P = \frac{L + \iota a}{1 + \iota} = \frac{60 + 0.15(160)}{1.15} = \mathbf{73.04}
$$

Check: margin $M = 13.04$, capital $Q = 160 - 73.04 = 86.96$, and the return is $M/Q = 13.04 / 86.96 = 15\%$. The answer is **B**.

**Why not the others**

- **A** — 69.00 is a 15% load on expected loss, $L(1 + \iota)$: the return is owed on capital, not on losses.
- **C** — 75.00 charges 15% on $a - L = 100$, forgetting that the margin itself is part of the premium, so investors only contribute $a - P$, not $a - L$.
- **D** — 80.87 adds $\iota a / (1+\iota)$, the discount factor applied to all assets rather than to the assets above expected loss.
- **E** — 84.00 charges the 15% return on all 160 of assets, including the part policyholders fund themselves.
