---
id: "cas5-an-001"
exam: "Exam 5"
topic: "Close Year"
learning_objective: "Ratemaking"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Close+Year
  - Concepts/Severity
  - Concepts/Claims+Processing+Changes
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:bd09fcc7f43e71d0c3561ca0a6f97df641c5dfe91bdc5470833ba6a2e817dbc8
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.1 Severity, printed pp.7-8 (PDF 19-20); Ch.1 closed and re-opened claims, PDF p.15, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-5/cas5-an-001.md
---

An insurer measures average severity for its private passenger auto bodily injury book on a close-year basis: paid losses on the claims closed during a calendar year, divided by the number of claims closed during that year. During 2025 the claims department added adjusters and cleared a large backlog of small, uncomplicated claims. The cost of settling any given claim did not change.

Which statement best describes the 2025 close-year severity compared with 2024?

- A) It is unaffected, because a close-year cohort holds only settled claims and needs no development
- B) It rises, because the claims closed in 2025 are older and more mature than those closed in 2024
- C) It falls, and the decline measures a real drop in claim costs to reflect in the selected severity trend
- D) It falls, because the claims closed in 2025 are weighted toward small claims, a shift in mix rather than cost
- E) It is unaffected, because closed claim counts and the paid losses on them rise in the same proportion

## Explanation

Close-year severity divides the payments on the claims that **closed** in a year by the number of claims that closed in it. Werner & Modlin note that paid severity is often calculated exactly this way (paid losses on closed claims divided by closed claims), and that a change in severity can reflect a change in claims handling procedures as well as a change in loss cost.

Clearing a backlog of *small* claims adds many low-cost closures to 2025:

$$
\text{Close-year severity}_{2025} = \frac{\text{Paid on claims closed in 2025}}{\text{Claims closed in 2025}}
$$

The denominator grows by many claims while the numerator grows by only a little for each, so the average falls even though no individual claim became cheaper. The drop is a change in the **mix** of what closed, produced by a claims-processing change. The answer is **D**.

**Why not the others**

- **A** — it is true that a closed claim needs no further development (unless it reopens), but completeness is not the issue: which claims close in a year depends on how fast, and in what order, the claim department settles them.
- **B** — clearing a backlog does pull older claims into the year, but here the backlog was small, simple claims, so they pull the average down, not up.
- **C** — the stem says the cost of settling a given claim did not change; reading the drop as a negative severity trend mistakes a settlement-speed effect for a cost effect.
- **E** — the closed count and the paid losses do not rise in the same proportion: the added claims are smaller than average, which is exactly why the average moves.
