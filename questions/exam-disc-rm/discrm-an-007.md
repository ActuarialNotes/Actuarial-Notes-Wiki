---
id: "discrm-an-007"
exam: "Exam DISC-RM"
topic: "Business Continuity Plan"
learning_objective: "3. Managing Business Continuity Risk"
difficulty: medium
type: multiple-choice
bloom: apply
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
  content_hash: sha256:f4d92cbb159c657a941de44d420eea17aa8da2b2059d2831a411e216b5dfd52c
  sources:
    - "NIST SP 800-34 Rev. 1, Contingency Planning Guide for Federal Information Systems (2010), §3.2.1 p.17 (PDF p.31): RTO shorter than MTD; reprocessing time added to RTO, sha256:476f04d4c60b0770c1ac8b2720551972074ce78e936a3e7a535048416111d0df — https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-34r1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-007.md
---

An insurer's business impact analysis sets a maximum tolerable downtime (MTD) of 72 hours for its policy billing process. Once the billing system is restored after an outage, the invoices the outage held up take about 12 hours to reprocess. What is the longest recovery time objective (RTO) for the billing system that keeps the process within its MTD?

- A) 48 hours
- B) 60 hours
- C) 72 hours
- D) 84 hours

## Explanation

Restoring the system does not end the disruption: the held-up work must still be reprocessed, so the RTO plus the reprocessing time must fit within the MTD.

$$
\begin{align*}
\text{RTO} &\le \text{MTD} - t_{\text{reprocess}} \\
&= 72 - 12 \\
&= \mathbf{60} \text{ hours}
\end{align*}
$$

The answer is **B**.

**Why not the others**

- **A** — 48 hours subtracts the reprocessing time twice; it is a valid but needlessly strict target, not the longest acceptable RTO.
- **C** — 72 hours sets the RTO equal to the MTD and ignores reprocessing, so the process would be out for 84 hours in all.
- **D** — 84 hours adds the reprocessing time instead of subtracting it, which accepts an intolerable outage.
