---
id: "cas5-an-013"
exam: "Exam 5"
topic: "Large Loss"
learning_objective: "Estimating Claim Liabilities (Reserving)"
difficulty: hard
type: multi-part
bloom: evaluate
wiki_link:
  - Concepts/Large+Loss
  - Concepts/Chain+Ladder+Method
  - Concepts/Cumulative+Development+Factor
  - Concepts/Ultimate+Loss
points: 3
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:43aee0327adf685985c64416f3118dcfa79d8e4b89e7cee6cc0ade5e8c0519ca
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-5/cas5-an-013.md
---

An actuary is estimating ultimate claims for accident year 2025 of a commercial general liability book, evaluated at 12 months. Information as of December 31, 2025:

- Reported claims: \$3,600,000, including one claim of \$1,200,000 reported in November and already reserved at the policy limit.
- Selected reported cumulative development factor from 12 months to ultimate: 2.80, selected from triangles from which all claims over \$500,000 were removed.
- A provision for large claims not yet reported, based on the book's long-term large-claim experience: \$400,000.

## Part a (1 point)
Calculate the estimate of ultimate claims obtained by developing the reported claims other than the large claim, then adding back the large claim at its reported value and the provision for unreported large claims. Give your answer to the nearest dollar.

### Answer
8320000

### Explanation
$$
\begin{align*}
\text{Ordinary reported} &= 3{,}600{,}000 - 1{,}200{,}000 \\
&= 2{,}400{,}000 \\
\text{Ordinary ultimate} &= 2{,}400{,}000 \times 2.80 \\
&= 6{,}720{,}000 \\[4pt]
\text{Ultimate} &= 6{,}720{,}000 + 1{,}200{,}000 + 400{,}000 \\
&= \mathbf{8{,}320{,}000}
\end{align*}
$$

**Common wrong entries**

- **10,080,000** — developing all reported claims, \$3,600,000 times 2.80, which the question did not ask for (and part b weighs).
- **7,920,000** — leaving out the provision for unreported large claims.

## Part b (1 point)
A colleague computes the unadjusted chain ladder estimate, \$3,600,000 × 2.80 = \$10,080,000, and proposes booking it. Which estimate of ultimate claims is most appropriate, and why?

- A) 6,720,000, because large claims are removed from the analysis entirely
- B) 7,920,000, because the 2.80 factor already provides for unreported claims of every size
- C) 8,320,000, because the 2.80 factor reflects only claims under \$500,000
- D) 10,080,000, because the large claim is part of the accident year's reported claims
- E) 10,480,000, because large claims develop like any other and still need the provision

### Answer
C

### Explanation
The development factor was selected from triangles with all claims over \$500,000 removed, so it describes how *ordinary* claims develop and should be applied only to ordinary claims. The large claim is already reserved at the policy limit, so it cannot grow by a factor of 2.80; it is added back at its reported value. Because the factor contains no development of large claims, large claims not yet reported need their own provision. That gives 8,320,000, answer **C**.

**Why not the others**

- **A** — removing a large claim from the development data is not the same as removing it from the estimate; the insurer still owes it.
- **B** — the factor was built without claims over \$500,000, so it provides only for unreported *ordinary* claims; leaving out the provision understates ultimate.
- **D** — multiplying a claim reserved at the policy limit by 2.80 projects it to \$3,360,000, more than the policy can pay, and applies an ordinary-claim pattern to a claim it was not built from.
- **E** — develops the large claim and then also adds the provision, combining the error in **D** with the provision.

## Part c (1 point)
Explain why booking the colleague's estimate would not be a sound way to be conservative, and describe how your treatment of the large claim would change if it were **not** reserved at the policy limit.

### Explanation
A full-credit answer makes these points:

1. The unadjusted chain ladder is a biased estimate, not a cautious one. Developing one claim that reached \$1,200,000 at 12 months by an ordinary-claim factor adds \$2,160,000 that no reasonable projection of that claim supports, so the result reflects the method's failure rather than a judgment about uncertainty. Any margin for adverse deviation should be set explicitly and separately from the central estimate.
2. The same mechanism makes the estimate unstable: a single early large claim moves the chain ladder by the CDF times its size, so next year's estimate would swing as the claim settles.
3. If the claim were not at the policy limit, it should still be projected separately rather than by the 2.80 factor, using a claim-specific review (for example the claims department's assessment of its likely settlement value) or development factors derived from large claims, capped at the policy limit.

**Sample answer.** The \$10.08 million estimate is not conservative but wrong: it develops one claim, already at its policy limit, as if it were an ordinary claim at 12 months, adding about \$2.2 million that cannot be paid, and it will swing as that one claim settles. Prudence belongs in an explicit margin, not in a biased method. If the claim were below the limit, I would still keep it out of the ordinary development and project it on its own, from a claim-specific review or large-claim development, never above the policy limit, and keep the separate provision for large claims not yet reported.
