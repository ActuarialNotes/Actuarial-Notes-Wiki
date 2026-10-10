---
id: "discda-an-008"
exam: "Exam DISC-DA"
topic: "Statistical Plan"
learning_objective: "2. Collecting Data for Insurer Models"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Statistical+Plan
  - Concepts/Insurer+Operational+Data
  - Concepts/External+Data
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:030fa972eb984f5036344c2307567d3087bde8739e81aa772e21e1d848f4520d
  sources:
    - "NAIC, Statistical Handbook of Data Available to Insurance Regulators (2012), as hosted by the Alaska Division of Insurance, §1.4 pooled data and statistical agents; §1.6 statistical plans, PDF pp.14-15, sha256:b2929917f42e54e41b4904be523f776f28c21c482933613eca3432982b7561ca — https://www.commerce.Alaska.gov/web/Portals/11/Pub/INS_StatisticalHandbookDataInsurance%20Regulators.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, May 2016), App. D Workers Compensation Indication, PDF pp.394-398: advisory loss costs from industry data; companies apply their own expense, profit and deviation factors, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, May 2016), Ch.3 Statistical Plans, printed p.45 (PDF p.57), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-008.md
---

A small insurer plans to start writing commercial auto in a state where it has never written the line, so it has no premium or loss history there. Which source best supports its initial loss costs by class and territory?

- A) Its own operational data from other states, treated as fully credible for the new state
- B) Advisory loss costs built from statistical plan data, limited to the fields the plan codes
- C) Rates set by the statistical agent, which the insurer must file unchanged
- D) A telematics vendor's driving scores, which make class and territory data unnecessary

## Explanation

Insurers report premium, exposure and losses to a statistical agent under a statistical plan, coded the same way by every reporting company. An advisory organization pools those data into loss costs by class and territory, which a company may adopt or adjust. That gives a new entrant, whose own data are absent or thin, a starting point, with the limit that only the characteristics the plan codes are available. The answer is **B**.

**Why not the others**

- **A** — data from other states can inform the analysis, but treating it as fully credible for a different state's classes and territories ignores how they differ.
- **C** — a statistical agent compiles data; it does not set the insurer's rates, and advisory loss costs may be adjusted before the insurer files its own.
- **D** — a telematics score is external data that may add to a rating plan, but it does not supply loss costs by class and territory.
