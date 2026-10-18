---
id: "cas6c-an-020"
exam: "Exam 6C"
topic: "Base Solvency Buffer"
learning_objective: "Canadian Financial Reporting, Solvency, and Professional Responsibility"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Base+Solvency+Buffer
  - Concepts/MCT
  - Concepts/Capital+Required
  - Concepts/Capital+Available
  - Concepts/Supervisory+Target+Capital+Ratio
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8877d932d96a5a549f942318257ecf3dc0b9ef4f003da421ee273ad1fb1d2224
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-6c/cas6c-an-020.md
---

An analyst who has worked only with OSFI's Life Insurance Capital Adequacy Test (LICAT) reviews a federally regulated P&C insurer:

- Capital available: 300
- Sum of the MCT capital requirements at the target level for insurance, market, credit and operational risk, less the diversification credit: 330

Treating the 330 the way LICAT treats its Base Solvency Buffer, the analyst divides 300 by 330, gets 91%, and concludes the insurer is below OSFI's minimum.

Which assessment is correct?

- A) The MCT ratio is 136%: above the 100% minimum, but below the 150% supervisory target
- B) The MCT ratio is 136%: above the supervisory target, which is the same 100% as LICAT's
- C) The MCT ratio is 91%: below the 100% minimum, as the analyst concluded
- D) The MCT ratio is 91%: above the 90% minimum that LICAT applies to its Total Ratio
- E) The MCT ratio is 205%: comfortably above the 150% supervisory target

## Explanation

In LICAT, the Base Solvency Buffer is the target-level capital requirement (net of credits, multiplied by a scalar of 1.0), and it is the denominator of the Total Ratio. The supervisory target Total Ratio is 100% and the minimum is 90%.

The MCT has no Base Solvency Buffer. Its guideline (section 1.1) divides the target-level requirements, less the diversification credit, **by 1.5** to get the *minimum* capital required. The MCT ratio is capital available over that minimum:

$$
\begin{aligned}
\text{Minimum capital required} &= \frac{330}{1.5} \\
&= 220 \\
\text{MCT ratio} &= \frac{300}{220} \\
&= 136.4\%
\end{aligned}
$$

Federally regulated P&C insurers must hold at least 100%, and OSFI's supervisory target is 150%. The insurer meets the minimum but is below the target. The answer is **A**.

**Why not the others**

- **B** — brings in LICAT's 100% supervisory target. The MCT's supervisory target is 150%.
- **C** — the analyst's error: using the target-level requirement as the denominator, as LICAT does with its Base Solvency Buffer, without dividing by 1.5.
- **D** — makes the same denominator error, then judges the result against LICAT's 90% minimum Total Ratio, a threshold that does not apply to a P&C insurer.
- **E** — divides by 1.5 twice (300 × 1.5 / 220), overstating the ratio.
