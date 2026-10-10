---
id: "discda-an-001"
exam: "Exam DISC-DA"
topic: "Data Analytics"
learning_objective: "1. Planning an Insurer Data Modeling Project"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Data+Analytics
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:aa7928ffdb503eb28f399ebe52b30326e475525b4179a8972e24a9162d554fa9
  sources:
    - "Harvard Business School Online, Business Insights blog, 4 Types of Data Analytics, 'Key Types of Data Analytics' (descriptive: what happened; diagnostic: why did this happen; predictive: what might happen; prescriptive: what should we do next), sha256:bf1c1ea414e003a7ab9801d8655a2b59ad54fb050dd451d2ba3aeec312c3d7b0 — https://online.hbs.edu/blog/post/types-of-data-analysis"
    - "IBM Think, What is prescriptive analytics?, four key types of data analytics; prescriptive builds on descriptive and predictive and takes into account constraints, objectives and tradeoffs, sha256:a6b3fcc1956a59ff154ddc25f22dcd029cca7f30de11c59d74f7d814e197e0ea — https://www.ibm.com/think/topics/prescriptive-analytics"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-001.md
---

A personal auto insurer's fraud model already gives every open claim a probability of being fraudulent. The special investigations unit can examine only 40 claims a week, and each investigation costs about \$1,500. The claims director asks for a tool that combines the scores, the investigation cost and the unit's capacity to choose which claims to refer each week. Which type of analytics is the requested tool?

- A) Predictive analytics, because it relies on the fraud model's probability scores
- B) Prescriptive analytics, because it recommends an action from predictions, costs and a capacity limit
- C) Diagnostic analytics, because it explains why some claims score higher than others
- D) Descriptive analytics, because it summarizes the open claims on hand each week

## Explanation

The tool does not estimate anything new: the probabilities already exist. It takes those predictions, adds the cost of an investigation and the constraint of 40 claims a week, and recommends what to do with each claim. Turning predictions, costs and constraints into a recommended action is **prescriptive** analytics. The answer is **B**.

**Why not the others**

- **A** — the fraud score itself is predictive, but the tool's job is the decision built on the score. Calling it predictive stops at the input.
- **C** — diagnostic analytics explains why something happened, such as why fraud referrals rose last quarter. Nothing here explains a past result.
- **D** — descriptive analytics reports what happened, such as the count of open claims. The tool chooses actions, which a summary does not.
