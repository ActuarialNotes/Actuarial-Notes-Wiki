---
id: "discrm-an-467"
exam: "Exam DISC-RM"
topic: "Holistic Risk Treatment"
learning_objective: "4. Treating Risk"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Holistic+Risk+Treatment
  - Concepts/Enterprise+Risk+Management
  - Concepts/Risk+Treatment
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:f838136603e38bbbe7643a8f6a5190eb81bd2bb06c4b5d20433925914bab07c1
  sources:
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), p.105 (PDF p.7) life/annuity natural hedge, sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-467.md
---
An insurer sells both life insurance and annuities to similar customers. If its customers live longer than expected, the life block gains and the annuity block loses by a similar amount; if they die sooner, the reverse happens. The two product managers each propose buying reinsurance against their own block's mortality risk. Which treatment best reflects treating the risk holistically?

- A) Buy both reinsurance programs, since each block is exposed on its own
- B) Reinsure only the annuity block, since its potential loss is the larger
- C) Stop selling annuities, to avoid longevity risk altogether
- D) Retain the offsetting risk and treat only any net exposure left over

## Explanation

The two blocks are a **natural hedge**: their results move in opposite directions when mortality changes, so the insurer's net mortality risk is small. The CAS's 2003 ERM overview uses this case to show that hedging each product separately "would be cost inefficient and entirely unnecessary." Holistic treatment looks at the net position and treats only what remains above the company's tolerance. The answer is **D**.

**Why not the others**

- **A** — This is the silo view: each manager sees an exposure, but together the purchases pay to remove risk the portfolio has already offset.
- **B** — Reinsuring one side breaks the hedge, leaving the life block's exposure unhedged.
- **C** — Avoiding annuities removes the very business that offsets the life block's mortality risk.
