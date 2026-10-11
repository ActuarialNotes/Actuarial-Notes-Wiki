---
id: "cas7-an-002"
exam: "Exam 7"
topic: "Premium Reserve"
learning_objective: "Estimation of Claims Liabilities"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Premium+Reserve
  - Concepts/Retrospective+Premium+Reserve
  - Concepts/Retrospective+Rating
answer: "A"
points: 1
---

An actuary estimating the premium asset on retrospectively rated policies compares two first-adjustment PDLD ratios (premium booked through 27 months divided by loss reported through 18 months):

- The empirical ratio averages 1.46 over all policy quarters, but it has trended upward over the most recent quarters, which are well above 1.46.
- The formula ratio, computed from the average basic premium factor, loss conversion factor, tax multiplier, maximum, minimum and per-accident limitation of the plans currently being sold, is 1.43.

Which of the following is the most likely explanation for the upward trend in the recent empirical ratios?

- A) Better loss experience has kept more of each policy's loss within the retro maximum and the per-accident limitation
- B) The plans now being sold have more liberal parameters, such as higher maximums and per-accident limitations
- C) Worse loss experience has pushed more of each policy's loss above the retro maximum
- D) Upward development in high loss layers, with return premium in lower layers, distorts the recent quarters
- E) The plans now being sold assume a higher expected loss ratio, spreading the basic premium over more loss

## Explanation

The PDLD ratio at the first adjustment is

$$
\frac{P_1}{L_1} = \frac{BP \times TM}{L_1} + \frac{CL_1}{L_1} \times LCF \times TM
$$

The formula ratio uses the parameters currently being sold, and it is *not* elevated (1.43), so a change in the parameters sold does not explain the trend. What the formula cannot see is a change in actual loss experience. If losses improve, through chance or a known change such as workers compensation reform, a larger portion of loss falls within the retro maximum and the per-accident limitation, so each dollar of loss produces more additional premium. The answer is **A**.

**Why not the others**

- **B** — more liberal parameters would raise the formula ratio too, since it is computed from the parameters currently sold. It has not risen.
- **C** — worse experience puts more loss outside the maximum, lowering the capping ratio $CL/L$ and the PDLD ratio. That moves the ratio the wrong way.
- **D** — upward development in high layers with return premium in lower layers is why *incremental* ratios after the first adjustment fluctuate, even turning negative on a single quarter. It pushes ratios down, and it does not produce a steady upward trend at the first adjustment.
- **E** — a parameter change again, so the formula ratio would show it. A higher expected loss ratio would also lower the basic premium term, not raise it.
