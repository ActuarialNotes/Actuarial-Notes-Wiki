---
id: "discrm-an-025"
exam: "Exam DISC-RM"
topic: "Risk Identification"
learning_objective: "2. Identifying Risk"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Risk+Identification
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:44ffa89d1b67ee111e3e7fd056a9aa0043d50ade5a436f5cb19c56a1c5dbe8c5
  sources:
    - "OpenStax, Introductory Statistics 2e, 3.1 Terminology (complement), 3.1, sha256:607b0a643b9fb445888e09402f99831ee9cb824cc79b9eb2e9e4c64757a0248c — https://openstax.org/books/introductory-statistics-2e/pages/3-1-terminology"
    - "OpenStax, Introductory Statistics 2e, 3.2 Independent and Mutually Exclusive Events, 3.2, sha256:1c82fbba86b7ff243d51b939a5e9d6f6e98ee8a862e8c03a962179ff8e12fb00 — https://openstax.org/books/introductory-statistics-2e/pages/3-2-independent-and-mutually-exclusive-events"
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), p.112 identification by committee, sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-025.md
---

A risk manager forms a team to identify a company's exposures. Working alone, the risk manager would find a particular dependence on one supplier with probability 0.6, the purchasing director with probability 0.3, and the plant manager with probability 0.25. If each member misses the exposure independently of the others, what is the probability that at least one of them finds it?

- A) 0.045
- B) 0.21
- C) 0.60
- D) 0.79

## Explanation

The team misses the exposure only if every member misses it:

$$
\begin{align*}
P(\text{found}) &= 1 - (1 - 0.6)(1 - 0.3)(1 - 0.25) \\
&= 1 - (0.4)(0.7)(0.75) \\
&= 1 - 0.21 \\
&= \mathbf{0.79}
\end{align*}
$$

The answer is **D**. The gain over the risk manager's 0.6 comes from members who see the business differently, which is why identification is done by a team.

**Why not the others**

- **A** — 0.045 is $(0.6)(0.3)(0.25)$, the probability that *all three* find it.
- **B** — 0.21 is the probability that all three miss it, the complement of the answer.
- **C** — 0.60 is the best individual's chance, which ignores what the other members add.
