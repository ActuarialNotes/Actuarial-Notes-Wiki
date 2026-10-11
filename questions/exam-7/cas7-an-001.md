---
id: "cas7-an-001"
exam: "Exam 7"
topic: "Premium Reserve"
learning_objective: "Estimation of Claims Liabilities"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Premium+Reserve
  - Concepts/Retrospective+Premium+Reserve
  - Concepts/Retrospective+Rating
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-11
  last_checked_by: agent:validate-v1
  content_hash: sha256:310dc4e494ecda3ebd9287dd1841b0397fd920a8873f8ae504a936db12f7a32b
  sources:
    - "Teng and Perkins, Estimating the Premium Asset on Retrospectively Rated Policies (PCAS LXXXIII, 1996, pp.611-647), PDF pp.8 (PDLD after last adjustment zero), 11-13 (CPDLD weighting, ultimate = booked from prior adjustment + CPDLD x future loss; asset = ultimate - booked at valuation; interim booking), sha256:30efb7917ebbc6361393f76652a21d97e1915032f94667699904248d1bd900f1 — https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-7/cas7-an-001.md
---

An insurer estimates the premium asset on its retrospectively rated workers compensation policies with the PDLD method. The policy effective quarters below have had their first retro adjustment but not their second. Retro adjustments are made annually, and the plans allow at most four adjustments.

- Selected PDLD ratios: 0.80 for the second adjustment period, 0.60 for the third and 0.40 for the fourth.
- Share of expected ultimate loss emerging in each period: 12% in the second, 6% in the third, 2% in the fourth, and 5% after the fourth adjustment.
- Expected loss still to emerge on these quarters: \$40 million.
- Premium booked from the first retro adjustment: \$150 million.
- Premium booked as of the evaluation date: \$147 million, after some interim return premium.

Calculate the premium asset for these quarters, in \$ millions.

- A) Less than 21.0
- B) At least 21.0, but less than 24.0
- C) At least 24.0, but less than 26.0
- D) At least 26.0, but less than 29.0
- E) At least 29.0

## Explanation

The cumulative PDLD ratio after the first adjustment is the average of the later PDLD ratios, weighted by the share of loss emerging in each period. The loss that emerges after the last adjustment brings in no premium, so it enters the denominator with a PDLD ratio of zero:

$$
\begin{align*}
\text{CPDLD}_2 &= \frac{0.80(12\%) + 0.60(6\%) + 0.40(2\%) + 0(5\%)}{12\% + 6\% + 2\% + 5\%} \\
&= \frac{0.140}{0.25} \\
&= 0.56
\end{align*}
$$

Expected future premium is the CPDLD ratio times the loss still to emerge. Expected ultimate premium adds it to the premium booked from the prior retro adjustment, and the premium asset is ultimate premium less premium booked to date:

$$
\begin{align*}
\text{Ultimate premium} &= 150 + 0.56(40) \\
&= 172.4 \\
\text{Premium asset} &= 172.4 - 147 \\
&= \mathbf{25.4}
\end{align*}
$$

The answer is **C**.

**Why not the others**

- **A** (19.4) subtracts the interim return premium from the future premium instead of measuring the asset against what is booked today: 22.4 - (150 - 147) = 19.4.
- **B** (22.4) builds ultimate premium on the premium booked today (147) instead of the premium booked from the first retro adjustment, so the 3 of interim return premium is never recovered in the asset.
- **D** (27.0) uses the simple average of the three PDLD ratios (0.60), ignoring that most of the remaining loss emerges in the second period and that the loss after the fourth adjustment earns no premium.
- **E** (31.0) leaves the 5% emerging after the last adjustment out of the denominator ($\text{CPDLD} = 0.70$). The \$40 million still to emerge includes that loss, and it generates no premium.
