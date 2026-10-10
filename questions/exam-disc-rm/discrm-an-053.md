---
id: "discrm-an-053"
exam: "Exam DISC-RM"
topic: "Business Continuity Plan"
learning_objective: "3. Managing Business Continuity Risk"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Business+Continuity+Plan
  - Concepts/Business+Continuity+Management
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:735c2a67d65f872114206fd29012da240c17c889f518279efcb967f25cca81bb
  sources:
    - "NIST SP 800-34 Rev. 1, Contingency Planning Guide for Federal Information Systems (2010), §3.4.2 pp.21-22 (PDF p.36): site types, cost and readiness, sha256:476f04d4c60b0770c1ac8b2720551972074ce78e936a3e7a535048416111d0df — https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-34r1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-053.md
---

A business impact analysis sets a recovery time objective of 24 hours for an insurer's policy administration system. With illustrative figures, four alternate-site options are available: a cold site that recovers in about 10 days for \$20,000 a year; a warm site that recovers in about 48 hours for \$70,000 a year; a hot site that recovers in about 4 hours for \$200,000 a year; and a mirrored site that recovers almost at once for \$500,000 a year. Which option should the plan adopt?

- A) The cold site
- B) The hot site
- C) The warm site
- D) The mirrored site

## Explanation

A strategy must first meet the recovery objective, and then cost decides among those that do. Only the hot site (4 hours) and the mirrored site (near zero) recover within 24 hours, and the hot site meets the objective at less than half the cost. The answer is **B**.

**Why not the others**

- **A** — The cold site is the cheapest, but at about 10 days it misses the 24-hour RTO by a wide margin.
- **C** — The warm site's 48 hours also misses the RTO; a cheaper strategy that fails the objective fails business continuity's test.
- **D** — The mirrored site meets the RTO, but it pays \$300,000 a year more for availability the business impact analysis did not ask for.
