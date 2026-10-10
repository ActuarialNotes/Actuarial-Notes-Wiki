---
id: "discrm-an-055"
exam: "Exam DISC-RM"
topic: "Organizational Resilience"
learning_objective: "3. Managing Business Continuity Risk"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Organizational+Resilience
  - Concepts/Business+Continuity+Management
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5653ec2a39d7a4be6c68326e5b3e1c746a86620fc1d5c07472f20f5c46819802
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-055.md
---

A regional insurer outsources first notice of loss for all its auto claims to a single vendor. After a ransomware attack takes the vendor offline for nine days during a hailstorm, claims pile up and complaints to the regulator rise. Which response would most improve the insurer's resilience to a similar event?

- A) Buy more business income insurance to replace the profit lost during an outage
- B) Add penalty clauses to the vendor contract for any future outage
- C) Stop testing its continuity plan, since the vendor is responsible for the outage
- D) Add a second vendor and a small in-house intake team as a backup

## Explanation

The weakness was a **single point of failure**. A second vendor and an in-house team are buffers that let the insurer absorb the next outage and keep serving customers. The answer is **D**.

**Why not the others**

- **A** — Insurance replaces lost profit but does not take claims or satisfy customers and regulators; it absorbs cost, not disruption.
- **B** — Penalty clauses may compensate the insurer afterwards, but the claims still go unreported while the vendor is down.
- **C** — The insurer remains responsible to its customers whoever causes the outage, and testing is what keeps a plan working.
