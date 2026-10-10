---
id: "discrm-an-008"
exam: "Exam DISC-RM"
topic: "Business Continuity Plan"
learning_objective: "3. Managing Business Continuity Risk"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Business+Continuity+Plan
  - Concepts/Business+Continuity+Management
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c768a2c378d063f7de51b99c3f603adbf53ccfed262ce550e5dcefe3b04fd26d
  sources:
    - "NIST SP 800-34 Rev. 1, Contingency Planning Guide for Federal Information Systems (2010), §3.2.1 p.17 (PDF p.31): RPO definition, not part of MTD, sha256:476f04d4c60b0770c1ac8b2720551972074ce78e936a3e7a535048416111d0df — https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-34r1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-008.md
---

A claims department backs up its claim files every night at midnight. Its business continuity plan restores the claims system at a warm site within 20 hours, against a recovery time objective (RTO) of 24 hours, and its business impact analysis sets a recovery point objective (RPO) of 2 hours. Which statement best describes the plan?

- A) It meets both objectives, because the system is restored in less than 24 hours.
- B) It meets the RPO but not the RTO, because a warm site cannot restore a system within a day.
- C) It meets the RTO but not the RPO: a failure late in the day could lose nearly a day of data.
- D) It meets neither objective, because nightly backups also slow the restoration down.

## Explanation

The **RTO** is about how fast service returns: 20 hours is within 24, so it is met. The **RPO** is about how much data may be lost: with backups only at midnight, a failure just before the next backup loses almost 24 hours of claim files, far more than the 2 hours allowed. Backups or replication would have to run at least every 2 hours. The answer is **C**.

**Why not the others**

- **A** — Meeting the RTO says nothing about data loss; the two objectives are measured separately.
- **B** — The plan's warm site restores the system in 20 hours, within the RTO; the failure is in the backup interval, not the site.
- **D** — The backup schedule decides how much data is lost, not how quickly the system is restored, so the RTO is still met.
