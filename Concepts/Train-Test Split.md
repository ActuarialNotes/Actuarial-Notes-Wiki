---
aliases:
  - Train-test-validate Set
  - Training Data
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6c68c366df9282802df90f48b90d9c86ed60d1b26c96b1c2e94e1a0c9a5b8469
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Train-Test Split.md
---
A **train-test split** divides the available data into disjoint parts that do different jobs. The **training data** fit the model's parameters, a **validation set** compares candidate models and tunes their [[Hyperparameter|hyperparameters]], and a **test set** estimates, once, the [[Test Error|test error]] of the model finally chosen. Each part can judge a step only if that step has never seen it, so every reuse of a held-out set to make a decision turns it, gradually, into training data.

> $$\mathcal{D} = \mathcal{D}_{\text{train}} \cup \mathcal{D}_{\text{val}} \cup \mathcal{D}_{\text{test}}$$

> $$\widehat{\text{Err}} = \frac{1}{n_{\text{test}}}\sum_{i \in \mathcal{D}_{\text{test}}} L\left(y_i, \hat{f}_{\text{train}}(x_i)\right)$$

> $$E\left[\min_k \widehat{\text{Err}}_k\right] \leq \min_k \text{Err}_k$$

- **Symbols:** The three sets in the first block share no observations. $\hat{f}_{\text{train}}$ is fitted to the training data only, and $L$ is the loss: squared error for a numeric response, [[Deviance|deviance]] for a GLM, or the misclassification rate for a classifier. In the third block, $\text{Err}_k$ is the true test error of candidate model $k$ and $\widehat{\text{Err}}_k$ is its estimate on one shared held-out set.
- **The jobs:** ISLR's validation set approach (James et al., §5.1.1) splits the data in two, fits on one part and scores on the other. Tuning and model choice can instead use [[Cross-Validation|$k$-fold cross-validation]] inside the training data, which leaves the test set free for the last step. A [[Holdout Sample|holdout sample]] that has been used to choose between models has become a validation set, and its error for the winner is no longer an unbiased estimate.
- **Why reuse leaks:** Each estimate is unbiased for its own model, but the smallest of many noisy estimates is biased downward, which is the third block. The bias grows with the number of comparisons and with the noise in each estimate. Re-tuning after each look at the test set, adding a feature because the test error improved, or dropping one because it worsened all fit the model to that particular sample, so the final test error is optimistic.
- **Making the split:** The split is random but done at the right unit, so that one policy's renewals or one claim's transactions do not fall on both sides. A rare outcome calls for sampling within each class (stratifying), so every set holds enough events. When conditions drift over time, an out-of-time test set (the latest year) also checks stability. After selection, the model is usually refitted on the training and validation data together before it is used.

> [!example]- The Optimism of the Best Validation Score {Example}
> An analyst compares ten candidate frequency models on one validation set. Unknown to the analyst, all ten have the same true test MSE of 400. Each validation MSE equals the true value plus an independent error with standard deviation 12. The expected maximum of ten independent standard normal variables is 1.539. What validation MSE should the analyst expect to report for the chosen model, and what would a fresh test set show?
>
> > [!answer]-
> > The analyst keeps the model with the smallest validation MSE, and the smallest of ten draws sits about 1.539 standard deviations below their common mean.
> > $$
> > \begin{align*}
> > E\left[\min_k \widehat{\text{Err}}_k\right] &= 400 - 1.539(12) \\
> > &= 400 - 18.5 \\
> > &= 381.5
> > \end{align*}
> > $$
> > The reported error understates the truth by $18.5$, or $4.6\%$, although no model is better than any other. A fresh test set, used once, would show about 400 for the chosen model. With 100 candidates the expected maximum rises to 2.508 and the reported error falls to about 369.9. In practice the errors of models scored on the same set are correlated, which reduces this bias but does not remove it.

> [!example]- Auditing a Modelling Workflow {Example}
> An actuary builds a lapse model from 100,000 policy-year records, covering 40,000 policies observed for two or three years each, as follows:
>
> 1. Standardize every predictor with means and standard deviations computed from all 100,000 rows.
> 2. Split the rows at random into 60% training, 20% validation and 20% test.
> 3. Fit 40 gradient-boosting settings on the training data and keep the best on the validation set.
> 4. Score the test set, add two features after seeing the result, refit, and score the test set again.
> 5. Report the second test score as the model's expected performance.
>
> Identify the problems and how to fix them.
>
> > [!answer]-
> > - **Step 1:** The means and standard deviations include the test rows, so a little test information enters the fit. They should be computed from the training rows and applied unchanged to the other sets.
> > - **Step 2:** A split by row puts the same policy's years in different sets, so the model is tested partly on policies it has already seen. The split should be made by policy (about 24,000, 8,000 and 8,000 policies), keeping each policy's years together.
> > - **Step 3:** This is the validation set's job. The winner's validation error is optimistic, and that is why it is not the number to report.
> > - **Steps 4 and 5:** The second look at the test set made it a validation set, so the reported score is optimistic. An honest estimate needs data the process has not used: a new test set, or the next year's policies as an out-of-time test.

> [!tip]- How it appears on the exam
> - **SRM** asks how decision trees are fit to training data and pruned, and it compares the training-versus-test (validation set) approach with $k$-fold and leave-one-out cross-validation. Multiple-choice statements test which set each step may use and why the validation set estimate is variable and tends to overstate the test error.
> - **PA** expects a written description of how the data were split, which set each exhibit was built on, and why the final comparison uses held-out data.
> - **ATPA** asks candidates to recognize and mitigate the effect of repeated use of train/test/validate sets, in the take-home assessment, whose report describes how the candidate's own data were split and used.

> [!warning]- Exam traps
> - **Tuning on the test set:** Choosing a hyperparameter or a model by test error and then reporting that error as unbiased overstates the model's accuracy. Once the test set has chosen anything, a different set must report the result.
> - **Preprocessing on all the data:** Scaling, imputing, binning by the response or screening variables on the full data set lets the held-out rows influence the model. Every step that learns from the data must be fitted on the training data alone.
> - **Splitting the wrong unit:** A random split by row leaks when rows are linked, such as renewals of one policy or payments on one claim. The split is made on the unit that is independent.
> - **Small validation sets:** A validation estimate from a few hundred records is noisy, which makes the optimism of the best score larger. Cross-validation reduces the noise by averaging over folds.
