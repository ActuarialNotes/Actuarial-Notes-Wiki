---
id: "discia-an-422"
exam: "Exam DISC-IA"
topic: "HO-3 Property Conditions"
learning_objective: "5. Homeowners Property Coverage"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/HO-3+Property+Conditions
  - Concepts/Replacement+Cost
  - Concepts/Actual+Cash+Value
  - Concepts/Insurance+to+Value
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:e72d75da3e161f0309e772f1cb91f24c394aaad5bdf01cb1bc4083614cff684c
  sources:
    - "ISO Homeowners 3 – Special Form HO 00 03 05 11 (Maine Bureau of Insurance copy), Conditions D.2.b, p.15, sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-422.md
---
A house with a full replacement cost of \$500,000 is insured under an HO-3 (HO 00 03 05 11) for \$300,000 with a \$1,000 deductible. Hail damages the roof; replacement costs \$40,000, and the damaged roof's actual cash value is \$25,000. The roof has been replaced. How much does the insurer pay?

- A) \$23,000
- B) \$24,000
- C) \$29,000
- D) \$39,000

## Explanation

The insurance is 60% of replacement cost, below 80%, so the insurer pays the **greater** of the actual cash value and the proportion of the replacement cost that the insurance bears to 80% of the building's replacement cost:

$$
\begin{align*}
\frac{I}{0.8\,\text{RC}} &= \frac{300{,}000}{400{,}000} \\
&= 0.75 \\
\text{Paid} &= \max(25{,}000,\ 0.75 \times 40{,}000) - 1{,}000 \\
&= 29{,}000
\end{align*}
$$

The answer is **C**.

**Why not the others**

- **A** uses the ratio of insurance to the full replacement cost, 60%, instead of to 80% of it.
- **B** pays the actual cash value, which applies only when it is greater than the proportional amount.
- **D** pays full replacement cost, which requires insurance of at least 80% of replacement cost.
