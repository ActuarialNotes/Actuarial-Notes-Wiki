---
id: "discia-an-232"
exam: "Exam DISC-IA"
topic: "Compensatory Damages"
learning_objective: "15. Insurance Law Part 2"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Compensatory+Damages
  - Concepts/Negligence
answer: "A"
points: 1
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:491be8ef61292a7350e0ea3cae75e52455b3c1ae56e42af77c328afa926dc98d
  sources:
    - "Cornell LII Wex, \"compensatory damages\", whole entry, sha256:92774229ad1d9384ec8fcb5661d421edc88df5736e2e901f042c3cf93c07a4d5 — https://www.law.cornell.edu/wex/compensatory_damages"
    - "Cornell LII Wex, \"comparative negligence\", whole entry, sha256:2f19566fa7f19db3c57ce3d0147aeaeebb7535d5e7d45ea9e111281973b8a240 — https://www.law.cornell.edu/wex/comparative_negligence"
    - "PPG Industries v. Transamerica, 20 Cal. 4th 310 (1999) (Caselaw Access Project), public-policy discussion of insuring punitive damages, sha256:ef2c38bf2ecf125988034d0e1094372fb85140e3e5deb61d5912f8b7b556536d — https://static.case.law/cal-4th/20/cases/0310-01.json"
  open_findings: 1
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-232.md
---

In a tort suit in a pure comparative negligence state, the jury assesses the plaintiff's special damages at \$80,000 and general damages at \$120,000, finds the plaintiff 25% at fault, and also awards \$100,000 of punitive damages against the defendant. The state prohibits insuring punitive damages. The defendant's liability insurer covers the compensatory award, with ample limits. How much does the insurer pay?

- A) \$150,000
- B) \$200,000
- C) \$225,000
- D) \$250,000

## Explanation

Comparative fault reduces the compensatory award by the plaintiff's share, and the punitive damages fall on the insured because the state does not allow them to be insured:

$$
\begin{align*}
D &= 80{,}000 + 120{,}000 \\
&= 200{,}000 \\
\text{Paid} &= (1 - 0.25)(200{,}000) \\
&= \mathbf{150{,}000}
\end{align*}
$$

- **B** forgets the reduction for the plaintiff's own fault.
- **C** reduces everything, punitive damages included, and has the insurer pay the punitive share, $\text{Paid} = 0.75\,(300{,}000)$.
- **D** adds the punitive damages to the reduced compensatory award, ignoring the public policy bar on insuring them.
