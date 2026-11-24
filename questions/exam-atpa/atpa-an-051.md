---
id: "atpa-an-051"
exam: "Exam ATPA"
topic: "Model Governance"
learning_objective: "Model Explainability and Communication"
difficulty: hard
type: multi-part
bloom: create
wiki_link:
  - Concepts/Model+Governance
  - Concepts/Actuarial+Communication
  - Concepts/Explainability
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:428f4225c4145e9009a7b8cc98e7dce918410be8df5edf1355b264921d89d9c4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-051.md
---

A U.S. personal auto insurer has approved a GBM to replace the GLM behind its filed rates. You are the actuary responsible for the model's documentation.

## Part a (1 point)
Under ASOP No. 56, what standard of detail should the model's documentation meet?

- A) Enough detail that a regulator with no modelling background could rebuild the model unaided
- B) Enough detail to support the model's lift, with methods and assumptions left to the developer
- C) Enough detail that another qualified actuary could assess the reasonableness of the work
- D) Enough detail that the developer could rerun the model, kept in the developer's own files

### Answer
C

### Explanation
ASOP No. 56 §3.7 asks that documentation let another qualified actuary assess the reasonableness of the work. ASOP No. 41 sets the same kind of standard for an actuarial report: another actuary qualified in the same practice area could make an objective appraisal of it.

- **A** sets the bar at a reader with no modelling background. A business summary is written for that reader, but the documentation is held to a qualified actuary's appraisal.
- **B** leaves out what the appraisal needs: the methods, procedures, assumptions and data.
- **D** keeps the work reproducible only for its author, in files no reviewer can reach, which fails both independent review and the actuary-to-actuary standard.

## Part b (1 point)
Draft an outline of the model's documentation. For each section, say in a line what it contains and why it is there.

### Explanation
A full-credit outline covers most of these points, each with its reason:

1. **Purpose, use and limitations.** The model sets filed personal auto rates; uses beyond that need their own review. Documented so the model is not adopted for another purpose unreviewed.
2. **Data.** Sources, the period covered and the information date, adjustments, quality checks, and reliance on any department that supplied data (ASOP No. 23). Needed so another actuary can appraise the inputs.
3. **Method.** Target and exposure, distribution and link, offsets, hyperparameters, and the validation design. Each modelling decision recorded with its reason and the alternatives rejected, including how variables were selected.
4. **Performance on holdout data.** Quantile plots, lift and a double lift chart against the current GLM, measured on data the model was not fit to.
5. **Explainability.** A variable importance plot to rank the variables, partial dependence and ICE plots for the direction and shape of each effect, and Shapley values for individual quotes, so each rating variable can be justified to the regulator and a quote to a policyholder.
6. **Fairness.** Tests for proxy discrimination across groups, since a model that cannot be explained cannot be fully checked for it.
7. **Governance.** The model's owner, its risk rating and place in the inventory, the independent review and who approved it, version control and the change log, and the monitoring plan with the measures and thresholds that trigger a re-review.
8. **Uncertainty and responsibility.** How stable the results are, what the model cannot see, and the responsible actuary, available for questions.

**Sample answer.** (1) Purpose: filed auto rating only; limits on other uses. (2) Data: policy and claim data through the information date, the claims department's extract relied on and the checks made on it. (3) Method: Tweedie target per car-year, log link, hyperparameters, variables kept and dropped with reasons. (4) Holdout performance: decile plots, lift and a double lift chart against the current GLM. (5) Explainability: importance ranking, PDP and ICE for each rating variable, Shapley values for sample quotes. (6) Fairness: proxy-discrimination tests by group. (7) Governance: owner, high risk rating, independent reviewer and approver, version log, quarterly monitoring of predicted against actual loss costs. (8) Uncertainty, limitations and the responsible actuary.

A partial-credit outline lists sections without the reasons, or omits the holdout performance, the explainability exhibits or the governance section.
