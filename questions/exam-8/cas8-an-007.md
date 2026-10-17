---
id: "cas8-an-007"
exam: "Exam 8"
topic: "Line of Business"
learning_objective: "Excess, Deductible, and Individual Risk Rating"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Line+of+Business
  - Concepts/Large+Deductible+Policy
  - Concepts/Loss+Sensitive+Rating
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e23dbb1ed547d5a81ce8e8395772f46538c1937b5490378540092e230b637f28
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-8/cas8-an-007.md
---

An insured has large deductible policies on two lines of business: workers compensation with a \$250,000 per-occurrence deductible, and auto liability with a \$100,000 per-occurrence deductible. It also buys clash coverage that sets a single retention of \$300,000 on the sum of retained losses from one occurrence that affects both lines.

One of its drivers causes an at-fault accident that injures the driver (a workers compensation loss of \$260,000) and a third party (an auto liability loss of \$140,000).

Calculate the insured's total retained loss from this occurrence, in thousands.

- A) 100
- B) 250
- C) 300
- D) 350
- E) 400

## Explanation

Fisher et al. (Chapter 2, Section 6) describe clash coverage: an insured with exposures under more than one loss-sensitive plan limits what it retains from a single occurrence that hits retentions on several lines of business.

Without the clash coverage, each line's deductible applies separately:

$$
\begin{align*}
\text{Retained} &= \min(260, 250) + \min(140, 100) \\
&= 250 + 100 \\
&= 350
\end{align*}
$$

The clash coverage caps the sum at 300:

$$
\begin{align*}
\text{Retained} &= \min(350, 300) \\
&= \mathbf{300}
\end{align*}
$$

The answer is **C**. The insurer pays the other 100.

**Why not the others**

- **A** (100) is what the insurer pays, not what the insured keeps.
- **B** (250) applies only the larger deductible, as if one deductible covered the whole occurrence.
- **D** (350) ignores the clash coverage and applies each line's deductible on its own.
- **E** (400) is the whole ground-up loss, as if no deductible capped either line.
