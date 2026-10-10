---
id: "discda-an-007"
exam: "Exam DISC-DA"
topic: "Insurer Operational Data"
learning_objective: "2. Collecting Data for Insurer Models"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Insurer+Operational+Data
  - Concepts/Case+Reserves
  - Concepts/Calendar+Year
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:26fe2f565e613ef84aa7c9c6bd8ee08211b113aa082110de69e3663d938ca859
  sources:
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, May 2016), Ch.3 Data Aggregation, printed p.43 (PDF p.55): CY reported = paid + change in case reserves during the year, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-007.md
---

A homeowners claim occurs on December 2, 2024 and is reported on December 10, 2024, when a case reserve of \$20,000 is set. On February 1, 2025 the insurer pays \$5,000 and lowers the reserve to \$12,000. On August 15, 2025 it pays \$14,000 and closes the claim. By how much does this claim change calendar year 2025 reported losses, which are the payments made in 2025 plus the change in case reserves during 2025?

- A) A decrease of \$1,000
- B) An increase of \$19,000
- C) An increase of \$31,000
- D) An increase of \$39,000

## Explanation

In 2025 the claim has two payments, and its reserve goes from \$20,000 at the start of the year to \$0 at the end.

$$
\begin{align*}
\text{Paid in 2025} &= 5{,}000 + 14{,}000 \\
&= 19{,}000 \\
\text{Change in case} &= 0 - 20{,}000 \\
&= -20{,}000 \\
\text{CY 2025 reported} &= 19{,}000 - 20{,}000 \\
&= -1{,}000
\end{align*}
$$

The claim settled for \$1,000 less than the reserve held at the end of 2024, so it **lowers** calendar year 2025 reported losses by \$1,000. The answer is **A**.

**Why not the others**

- **B** — \$19,000 counts the 2025 payments but ignores the release of the reserve. It is the accident year 2024 reported loss at the end of 2025, a different aggregation.
- **C** — \$31,000 adds the reserve *balance* after the first payment (\$12,000) to the payments, instead of the change in reserves over the year.
- **D** — \$39,000 adds the opening reserve instead of subtracting its release.
