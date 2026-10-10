---
id: "discrm-an-009"
exam: "Exam DISC-RM"
topic: "Business Continuity Plan"
learning_objective: "3. Managing Business Continuity Risk"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Business+Continuity+Plan
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:92322a8674955729482116bd1974fa72e656328e9cfadc200da7571bdc765f22
  sources:
    - "NIST SP 800-34 Rev. 1, Contingency Planning Guide for Federal Information Systems (2010), §3.5.3 (PDF p.43): tabletop discussion-only; functional to full-scale, sha256:476f04d4c60b0770c1ac8b2720551972074ce78e936a3e7a535048416111d0df — https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-34r1.pdf"
    - "Ready.gov (FEMA), Ready Business Business Continuity Plan template, p.3 orientation, tabletop, full-scale; p.3 maintenance, sha256:9945e3bb8bb0d45507e97de3d6f31a1b5a9bc90d454e95b8b8731b975bef259b — https://www.ready.gov/sites/default/files/2020-03/business-continuity-plan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-009.md
---

A business continuity coordinator wants to confirm that the company's order system will actually fail over to its alternate data center and run there, with staff carrying out their recovery roles as they would in a real outage. Which kind of exercise fits this purpose?

- A) An orientation session that walks new team members through the plan
- B) A tabletop exercise in which the team discusses its response to a scenario
- C) A review that updates the plan's contact lists and vendor details
- D) A full-scale exercise that fails the system over to the alternate site

## Explanation

Only a functional exercise, and in full scale one that exercises every element of the plan, has people perform their duties and moves the system to the alternate site. That is what shows whether the failover actually works. The answer is **D**.

**Why not the others**

- **A** — Orientation introduces team members to their roles; nothing is tested.
- **B** — A tabletop exercise is discussion only and deploys no equipment, so it checks roles and decisions but cannot show that the failover works.
- **C** — Updating contact lists is plan maintenance, not an exercise.
