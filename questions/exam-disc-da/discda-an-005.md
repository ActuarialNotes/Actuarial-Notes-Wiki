---
id: "discda-an-005"
exam: "Exam DISC-DA"
topic: "Insurer Operational Data"
learning_objective: "2. Collecting Data for Insurer Models"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Insurer+Operational+Data
  - Concepts/Written+Premium
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:ccf93c27e83f9edf4040817821408e9578ca39c10b1db3ef31f8afb4a944600e
  sources:
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, May 2016), Ch.3 Policy Database, printed pp.38-39 (PDF pp.50-51): cancellation record reverses the unearned portion (Policy B: -0.25 exposure, -$150), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-005.md
---

On January 1, 2025 an insurer writes an annual personal auto policy covering one car for \$1,200 (1.00 car-year). The insured cancels on October 1, 2025. Premium and exposure are earned evenly by month, and the policy database records transactions rather than overwriting records. Which records does the database hold for this policy?

- A) One record of 0.75 car-years and \$900, replacing the original record
- B) Two records: +1.00 car-year and +\$1,200, then -0.75 and -\$900
- C) Two records: +1.00 car-year and +\$1,200, then -0.25 and -\$300
- D) Two records: +1.00 car-year and +\$1,200, then -0.25 and -\$1,200

## Explanation

A transactional policy database keeps the original record and adds a cancellation record that reverses the **unearned** part of the term. The policy ran 9 of its 12 months, so 3 months, a quarter of the term, are reversed:

$$
\begin{align*}
\text{Exposure reversed} &= 0.25 \times 1.00 \\
&= 0.25 \\
\text{Premium reversed} &= 0.25 \times 1{,}200 \\
&= 300
\end{align*}
$$

The two records net to 0.75 car-years and \$900. The answer is **C**.

**Why not the others**

- **A** — this is the net result, but a transactional database does not overwrite the issue record; it adds a cancellation record.
- **B** — this reverses the part of the term that was earned (9 months) rather than the part that was not, netting the policy to 0.25 car-years.
- **D** — this prorates the exposure but reverses the whole premium, leaving the policy with 0.75 car-years and no premium.
