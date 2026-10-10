---
id: "discrm-an-410"
exam: "Exam DISC-RM"
topic: "Personal Auto Underwriting"
learning_objective: "11. Underwriting Other Types of Coverage"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Personal+Auto+Underwriting
  - Concepts/Generalized+Linear+Model
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:70f0ee2bee03fe8f62dbf75fb6e8b5a0501179b808c437f10368d6ae1ce88bbe
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating (CAS Monograph 5, 2nd ed.), pp.4-5 (PDF pp.14-15), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-410.md
---

An auto insurer uses a multiplicative rating plan, and one minor violation carries a relativity of 1.10. Driver X's premium before the violation is \$1,000, and driver Y's is \$2,000. Each gets one minor violation. How do their premiums change?

- A) Each pays \$100 more, because a violation carries the same fixed dollar surcharge for everyone
- B) X pays \$100 more and Y \$200 more, as the surcharge scales each premium
- C) Each pays \$200 more, because the surcharge is set by the higher-premium driver
- D) Neither premium changes until the violation leads to a suspension of the driver's license

## Explanation

In a multiplicative plan every relativity scales the whole premium, so a 1.10 relativity adds 10% to whatever the driver was paying: \$100 for X and \$200 for Y. This is one of the reasons insurers prefer multiplicative plans, since a fixed-dollar surcharge would mean very different things to a \$1,000 and a \$10,000 premium. The answer is **B**.

**Why not the others**

- **A** — Describes an additive plan, not a multiplicative one.
- **C** — Each driver's premium is computed from that driver's own factors, not from another driver's.
- **D** — A driving record affects price directly; a suspension matters for cancellation, not for whether a violation is rated.
