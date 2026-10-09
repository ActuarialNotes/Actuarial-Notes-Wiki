---
syllabus:
  source_url: "https://www.soa.org/globalassets/assets/files/edu/2022/2022-01-atpa-learning-objectives.pdf"
  sitting: ""
  source_sha256: 16d5e74841e90fdb61402248cb585dc8d7a3ceedbf678341478145a9e2fb4410
  extracted_at: 2026-10-05
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:85ae4ebed29a2b719ba91233cf1add24502fe4f929370f66f2a3f1c9fb7f7724
  sources:
    - "SOA, current syllabus PDF for ATPA, all pages, sha256:16d5e74841e90fdb61402248cb585dc8d7a3ceedbf678341478145a9e2fb4410 — https://www.soa.org/globalassets/assets/files/edu/2022/2022-01-atpa-learning-objectives.pdf"
    - "SOA exam study-materials page, read 2026-10-09: links this syllabus PDF as the current edition"
  open_findings: 0
  open_critical: 0
  log: .verify/Exam ATPA (SOA).md
---

<div class="exam-nav"
     data-current="ATPA|Advanced Topics in Predictive Analytics">
</div>

# Exam ATPA
The Advanced Topics in Predictive Analytics course provides candidates with the ability to employ selected analytics techniques to solve business problems and effectively communicate the solution. After learning this material from e-Learning modules, candidates are given a take-home assessment requiring analysis of a data set in the context of a business problem and submission of a report. The report/assessment will be graded on a pre-set schedule.

> [!question]- About the exam
>
> A thorough knowledge of probability (as covered in Exam P), mathematical statistics (as covered in VEE Mathematical Statistics), and selected models and methods for analyzing data (as covered in Exams SRM and PA) is assumed.
>
> The learning objectives and outcomes provided on the following pages follow the four modules of the e-Learning support provided. The ranges of weights shown in the Learning Objectives below are intended to apply to the large majority of exams administered. On occasion, the weights of topics on an individual exam may fall outside the published range. Candidates should also recognize that tasks often cover multiple learning objectives, including some weight for communication and ethics in many tasks.

## Learning Objectives

> [!example]- Ethical Foundations {5–10%}
> The Candidate will be able to work with [[Data|data]] and models in an [[Ethical|ethical]] and [[Responsible Manner|responsible manner]].
>
> 1. Apply a general [[Ethical|ethical]] framework for working with [[Data|data]] and models.
> 2. Discuss and comply with relevant [[Standard|standards]] of practice.
> 3. Discuss and comply with relevant [[Regulation|regulations]] that apply to working with [[Data|data]] and models.

> [!example]- Working with Data {20–30%}
> The Candidate will be able to understand basic [[Database|database]] calculations and [[Manipulation|manipulations]] and prepare [[Data|data]] for [[Predictive Analytics|predictive modeling]] applications.
>
> 1. Understand the basic [[Structure|structure]] of a [[Data Pipeline|data pipeline]], including being able to perform the following tasks:
>    - Evaluate the [[Quality|quality]] of appropriate [[Data|data]] sources for a problem
>    - Explain the [[Difference|difference]] between a [[Database|database]], [[Data Warehouse|data lake]], and [[Data Warehouse|data warehouse]]
>    - Describe how different [[Tidy Data|data structures]] can be used in different [[Analytical|analytical]] tasks.
> 2. Explain the basics concepts of [[Database|database]] management, in [[Particular|particular]], [[Extract|extract]], [[Transform|transform]], and [[Load|load]] ([[ETL]]) operations. Demonstrate these [[Skill|skills]] by performing the following:
>    - [[Extract Data|Extract data]] from various [[Data Pipeline|file structures]]
>    - [[Subset]], aggregate, summarize, and [[Otherwise Modify Data|otherwise modify data]] for specific [[Exploratory|exploratory]] or [[Modeling|modeling]] purposes
>    - Create [[Data Pipeline|data sets]] as a [[Final Product|final product]] of extracting and [[Transforming Data|transforming data]] that can be used in a [[Predictive|predictive]] model.
> 3. Assess the [[Accuracy|accuracy]] and [[Quality|quality]] of [[Data|data]].
>    - Describe how [[Data Quality|data collection practices]] and assumptions [[Affect Data Quality|affect data quality]].
>    - Validate the [[Data|data]] for [[Data Quality|internal consistency]].
> 4. Explain the terminology and [[Structure|structure]] of [[Relational Database|relational databases]] and be able to use [[Common|common]] keys between [[Collection|collections]] of [[Data|data]] to [[Merge|merge]] information from [[Multiple|multiple]] sources.
> 5. [[Clean]] and organize [[Data|data]] by performing each of the following:
>    - Check for [[Outlier|outliers]], both [[Univariate|univariate]] and [[Multivariate|multivariate]]
>    - [[Missing Data|Handle missing data]] (including understanding the types of missing [[Data|data]]) by selecting the appropriate [[Action|action]] from [[Deletion|deletion]] of the [[Record|record]], [[Missing Data|imputation]], and adding a missing value [[Flag|flag]].
> 6. Detect possible [[Biases Introduced|biases introduced]] when [[Data Pipeline|preparing data]] for a [[Predictive|predictive]] model.

> [!example]- Advanced Predictive Analytics Models {30–45%}
> The Candidate will fit a [[Variety|variety]] of models and select one appropriate to the [[Circumstance|circumstances]] and intended use.
>
> 1. Explain the importance of model [[Accuracy|accuracy]].
> 2. Explain, fit, evaluate, and make [[Prediction|predictions]] with each of the following models:
>    - [[Additive]] models
>    - [[Linear Mixed|Linear mixed]] models
>    - [[Neural Network|Neural networks]].
> 3. Apply [[Bayesian]] techniques to [[Predictive|predictive]] models.
> 4. Compare model results with those from [[Linear|linear]] and [[Tree-Based|tree-based]] methods.
> 5. Explain the [[Benefit|benefits]] of and demonstrate the combination of [[Multiple|multiple]] models via [[Stacking|stacking]] and [[Blending|blending]].
> 6. Select and justify a [[Modeling|modeling]] approach based on [[Accuracy|accuracy]], [[Explainability|explainability]], [[Stability|stability]], [[Analytical Effort|analytical effort]], [[Computational Efficiency|computational efficiency]], and [[Table Importability|table importability]], taking into [[Account|account]] the [[Business Context|business context]] of the problem.
> 7. Recognize and mitigate the [[Effect|effect]] of:
>    - Starting with [[Variable Selection|too many variables]]
>    - [[Repeated]] use of [[Train-test-validate Set|train/test/validate sets]]
>    - Model [[Bias|bias]], including [[Fairness|fairness]] concepts and [[Proxy Discrimination|proxy discrimination]].

> [!example]- Model Explainability and Communication {25–35%}
> The Candidate will be able to effectively communicate the results of applying [[Predictive Analytics|predictive analytics]], including the relationship between model [[Input|input]] and [[Output|output]], to solve a [[Business|business]] problem.
>
> 1. Understand [[Aspect|aspects]] of [[Explainability|explainability]], in [[Particular|particular]]:
>    - The [[Connection|connection]] between [[Ethics|ethics]] and [[Explainability|explainability]]
>    - [[Suitability]], [[Interpretability|decomposability]], [[Interpretability|algorithmic transparency]], and [[Interpretability|post-hoc interpretability]]
>    - The [[Difference|difference]] between [[Explainability|explainability]] and [[Interpretability|interpretability]]
>    - When a [[Lack|lack]] of [[Explainability|explainability]] may be [[Acceptable|acceptable]].
> 2. Communicate and justify a [[Recommended Analytics|recommended analytics]] solution, including use as appropriate of:
>    - [[Variable Importance|Variable importance plots]]
>    - Partial [[Partial Dependence Plot|dependence plots]]
>    - [[Partial Dependence Plot|Individual conditional expectation plots]]
>    - [[Shapley Value|Shapley values]]
>    - [[Lift]] and [[Lift|gain charts]].
> 3. Explain why a model is predicting certain [[Value|values]] for certain [[Record|records]].
> 4. Perform [[Data|data]] and model [[Model Governance|governance]] and develop model [[Documentation|documentation]] in an [[Ethical Context|ethical context]].
> 5. Communicate in a [[Clear|clear]] and [[Straightforward Manner|straightforward manner]] using [[Common Language|common language]] that is appropriate for the intended [[Audience|audience]].
> 6. [[Structure]] a [[Report|report]] in an [[Effective Manner While|effective manner while]] following [[Standard|standards]] of practice for actuarial [[Communication|communication]].

## Source Material
> [!answer]- Source Material
>
> - [[Advanced Topics in Predictive Analytics e-Learning Modules (SOA)|e-Learning Modules]]
>      - All required resources are embedded in the e-Learning modules.
