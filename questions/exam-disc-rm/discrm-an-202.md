---
id: "discrm-an-202"
exam: "Exam DISC-RM"
topic: "Underwriting Policy"
learning_objective: "8. The Underwriting Function"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Underwriting+Policy
  - Concepts/Insurer+Goals+and+Constraints
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:60b599fa753b131e62e966838d478dd59eb9fde534fcaeb2bee95f1015b24805
  sources:
    - "NAIC Accounting Practices and Procedures Manual (Mar 2025, Indiana DOI copy), SSAP No. 71 ¶2, SSAP No. 71 ¶2, PDF p.525, sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "NAIC, IRIS Ratios Means and Medians (2025), P&C ratio 2 Net Premium to Surplus, 'Unusual if Equal to or Over' 300, P&C ratio 2 threshold 300, sha256:0cb14c7a1f73bee94056296833cce0b70659e23b43842df033819fb962fde0ba — https://content.naic.org/sites/default/files/publication-iris-means-median-2025.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-202.md
---

An insurer's underwriting policy caps net written premium at 3 times policyholders' surplus. Surplus is \$300 million, and it expects to renew \$820 million of net written premium next year. New business carries acquisition expenses of 25% of premium, charged against surplus when the business is written. Assuming surplus changes only by that expense, about how much new net premium can the insurer write and still meet the cap?

- A) \$20.0 million
- B) \$45.7 million
- C) \$64.0 million
- D) \$80.0 million

## Explanation

New premium $N$ adds to the premium side and reduces surplus by 25% of $N$, so the cap must hold after both effects:

$$
\begin{align*}
3(300 - 0.25N) &\ge 820 + N \\
900 - 820 &\ge N + 0.75N \\
N &\le \frac{80}{1.75} \\
&= 45.7
\end{align*}
$$

The answer is **B**, about \$45.7 million. Financial capacity is the constraint here: writing new business uses surplus as well as capacity.

**Why not the others**

- **A** — Multiplies the \$80 million of room by 25%, as if only the expense could be written.
- **C** — Divides the \$80 million by 1.25, applying the expense strain without the 3-to-1 leverage on the lost surplus.
- **D** — Ignores the expense strain on surplus entirely, taking the full \$80 million of room under the cap.
