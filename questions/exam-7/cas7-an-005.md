---
id: "cas7-an-005"
exam: "Exam 7"
topic: "Range of Indications"
learning_objective: "Estimation of Claims Liabilities"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Range+of+Indications
  - Concepts/Bootstrap
  - Concepts/Unpaid+Claim+Distribution
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-11
  last_checked_by: agent:validate-v1
  content_hash: sha256:2c68b0540d6b1860b4ea40818bc22badfed7f44a328cece73e1bc4aeeea541a0
  sources:
    - "Shapland, CAS Monograph 4 (2016), Section 6, p. 46 incl. footnotes 61-62 (PDF 54) and Figures 6.2-6.3, p. 47 (PDF 55), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-7/cas7-an-005.md
---

An actuary runs four ODP bootstrap models on the same book and weights them by accident year to obtain a best estimate of the unpaid claim distribution, as in Shapland (2016). The mean unpaid claims and the weights are:

| Accident year | Paid CL | Incurred CL | Paid BF | Incurred BF |
|---|---|---|---|---|
| 1: mean | 40 | 44 | 46 | 41 |
| 1: weight | 50% | 50% | 0% | 0% |
| 2: mean | 150 | 160 | 130 | 140 |
| 2: weight | 25% | 25% | 25% | 25% |
| 3: mean | 620 | 680 | 500 | 540 |
| 3: weight | 0% | 0% | 50% | 50% |

Following Shapland, the **weighted range** uses, for each accident year, only the models given weight in that year, and the **modeled range** is derived from the means of all the models used. Determine the weighted range and the modeled range of total unpaid claims for all accident years combined.

- A) Weighted range 670 to 744; modeled range 676 to 884
- B) Weighted range 676 to 721; modeled range 676 to 884
- C) Weighted range 670 to 744; modeled range 670 to 886
- D) Weighted range 670 to 886; modeled range 676 to 884
- E) Weighted range 676 to 884; modeled range 670 to 744

## Explanation

**Weighted range.** For each accident year take the lowest and highest mean among the models given weight in that year, then add the years:

- Year 1 (Paid CL, Incurred CL): 40 to 44
- Year 2 (all four): 130 to 160
- Year 3 (Paid BF, Incurred BF): 500 to 540

$$
\begin{align*}
\text{Low} &= 40 + 130 + 500 \\
&= 670 \\
\text{High} &= 44 + 160 + 540 \\
&= 744
\end{align*}
$$

**Modeled range.** Every model is given weight in some year, so all four are used (Shapland counts a model as used if it is given at least some weight for any accident year). Each model's total mean unpaid is

$$
\begin{align*}
\text{Paid CL} &= 40 + 150 + 620 \\
&= 810 \\
\text{Incurred CL} &= 44 + 160 + 680 \\
&= 884 \\
\text{Paid BF} &= 46 + 130 + 500 \\
&= 676 \\
\text{Incurred BF} &= 41 + 140 + 540 \\
&= 721
\end{align*}
$$

so the modeled range is **676 to 884**, the parallel of a deterministic range across methods. Shapland's Figure 6.3 builds its total the same way: the modeled range of 4,099 to 5,650 runs from the lowest model total (paid BF) to the highest (incurred GLM), while the weighted range's totals add up the accident-year minimums and maximums.

The weighted best estimate is 42 + 145 + 520 = 707 (each year's weighted mean), inside both ranges. The weighted range is narrower because it ignores, year by year, models the actuary gave no weight to, which makes it the more representative view of the uncertainty in the actuarial central estimate. The answer is **A**.

**Why not the others**

- **B** — 676 to 721 is the range of the totals of the two models weighted in the latest year only. The weighted range is built year by year, using the models weighted in *each* year.
- **C** — 670 to 886 adds each year's lowest and highest mean across all four models. That pairs one model's low year with another model's low year, a combination no model produces; the modeled range runs between model totals.
- **D** — 670 to 886 as the weighted range ignores the weights, letting year 1's paid BF and year 3's incurred CL, both given no weight, set its ends.
- **E** — swaps the two definitions.
