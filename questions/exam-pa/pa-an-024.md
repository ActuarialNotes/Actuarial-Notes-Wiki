---
id: "pa-an-024"
exam: "Exam PA"
topic: "Offset Variable"
learning_objective: "Generalized Linear Models"
difficulty: hard
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Offset+Variable
  - Concepts/Dispersion+Parameter
  - Concepts/Generalized+Linear+Model
answer: "E"
points: 1
---

To keep the file small, a claims department summarizes its data before sending it for a severity model. Each row is one combination of rating variables, with the number of claims in the cell and their average severity. Some rows hold 1 claim and others hold more than 200. The actuary will fit a gamma GLM with a log link, with average severity as the response.

How should the number of claims in each row enter the model?

- A) As an offset of $\ln(\text{number of claims})$, so that larger cells have larger expected severities
- B) As a predictor, so that its coefficient measures how severity changes with cell size
- C) It should be left out, because average severity is already a per-claim figure
- D) As an offset of $\ln(\text{number of claims})$ together with a weight of 1 for every row
- E) As a weight, because an average of many claims varies less than one claim does

## Explanation

Each row's response is an average of $w_i$ claims, and an average of $w_i$ independent outcomes has $\frac{1}{w_i}$ times the variance of one outcome:

$$
\text{Var}(Y_i) = \frac{\phi\, V(\mu_i)}{w_i}
$$

The number of claims is the prior weight $w_i$. It changes how much each row counts in the fit and leaves its mean alone, which is right here: the expected severity of a claim does not depend on how many claims share its cell. The answer is **E**.

**Why not the others**

- **A** treats claim count like exposure in a frequency model. An offset changes the mean, so it would make the expected average severity proportional to the number of claims, which has no basis.
- **B** estimates an effect of cell size on severity. The cell size is an artifact of how the data were summarized, not a rating variable.
- **C** fits every row with equal weight, so a cell of 1 claim counts as much as a cell of 200, and the fit is pulled around by the noisiest rows.
- **D** keeps the wrong offset from A and still treats every row as equally reliable.
