---
id: "discia-an-025"
exam: "Exam DISC-IA"
topic: "Reinsurance Accounting"
learning_objective: "1. Introductory Insurance Accounting"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Reinsurance+Accounting
  - Concepts/Unpaid+Claims
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:4a3f560402482802bc5ccde04f1a65847133faeb1a2b6d81f8f4255e811dc42a
  sources:
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), SSAP No. 62R ¶31-32 (PDF pp.441-442), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-025.md
---

An insurer buys per-occurrence excess of loss reinsurance of \$1,000,000 excess of \$500,000 from an authorized reinsurer. At year end it has three open claims, none yet paid, with incurred losses of \$450,000, \$900,000 and \$1,800,000. Under SSAP No. 62R, how much reinsurance recoverable on unpaid losses does it net against its loss reserves?

- A) \$400,000
- B) \$1,000,000
- C) \$1,300,000
- D) \$1,400,000

## Explanation

For non-proportional reinsurance, a recoverable is recorded only when and to the extent incurred losses on the subject business exceed the attachment point, and never beyond the layer's limit.

$$
\begin{align*}
\text{Claim 1} &= 0 \\
\text{Claim 2} &= 900{,}000 - 500{,}000 \\
&= 400{,}000 \\
\text{Claim 3} &= \min(1{,}800{,}000 - 500{,}000,\ 1{,}000{,}000) \\
&= 1{,}000{,}000 \\
\text{Total} &= 1{,}400{,}000
\end{align*}
$$

The answer is **D**.

**Why not the others**

- **A** — counts only the second claim.
- **B** — counts only the third claim.
- **C** — counts only the third claim and ignores the \$1,000,000 limit of the layer.
