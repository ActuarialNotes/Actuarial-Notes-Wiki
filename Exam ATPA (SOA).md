---
syllabus:
  source_url: "https://www.soa.org/globalassets/assets/files/edu/2022/2022-01-atpa-learning-objectives.pdf"
  sitting: ""
  source_sha256: 16d5e74841e90fdb61402248cb585dc8d7a3ceedbf678341478145a9e2fb4410
  extracted_at: 2026-10-05
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:4083d1b0c452bcb9dfc67ce7f785d0c7f9ddff8f839cb25d1e109cb06dd789c3
  sources:
    - "SOA, current syllabus PDF for ATPA, all pages, sha256:16d5e74841e90fdb61402248cb585dc8d7a3ceedbf678341478145a9e2fb4410 — https://www.soa.org/globalassets/assets/files/edu/2022/2022-01-atpa-learning-objectives.pdf"
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
> The Candidate will be able to work with data and models in an ethical and responsible manner.
>
> 1. Apply a general ethical framework for working with data and models.
>    - *Key concepts:* [[Data Ethics]]
> 2. Discuss and comply with relevant [[Actuarial Standards of Practice|standards of practice]].
> 3. Discuss and comply with relevant regulations that apply to working with data and models.
>    - *Key concepts:* [[Data Ethics]]

> [!example]- Working with Data {20–30%}
> The Candidate will be able to understand basic database calculations and manipulations and prepare data for [[Predictive Analytics|predictive modeling]] applications.
>
> 1. Understand the basic structure of a [[Data Pipeline|data pipeline]], including being able to perform the following tasks:
>    - Evaluate the quality of appropriate [[Data Quality|data sources]] for a problem
>    - Explain the difference between a database, [[Data Warehouse|data lake]], and [[Data Warehouse|data warehouse]]
>    - Describe how different [[Tidy Data|data structures]] can be used in different analytical tasks.
> 2. Explain the basics concepts of database management, in particular, extract, transform, and load (ETL) operations. Demonstrate these skills by performing the following:
>    - Extract data from various [[Data Pipeline|file structures]]
>    - Subset, aggregate, summarize, and otherwise modify data for specific exploratory or modeling purposes
>    - Create [[Data Pipeline|data sets]] as a final product of extracting and transforming data that can be used in a predictive model.
> 3. Assess the accuracy and quality of data.
>    - Describe how [[Data Quality|data collection practices]] and assumptions affect [[Data Quality|data quality]].
>    - Validate the data for [[Data Quality|internal consistency]].
> 4. Explain the terminology and structure of [[Relational Database|relational databases]] and be able to use common keys between collections of data to merge information from multiple sources.
> 5. Clean and organize data by performing each of the following:
>    - Check for [[Outlier|outliers]], both univariate and multivariate
>    - [[Missing Data|Handle missing data]] (including understanding the types of [[Missing Data|missing data]]) by selecting the appropriate action from deletion of the record, [[Missing Data|imputation]], and adding a missing value flag.
> 6. Detect possible biases introduced when [[Data Pipeline|preparing data]] for a predictive model.

> [!example]- Advanced Predictive Analytics Models {30–45%}
> The Candidate will fit a variety of models and select one appropriate to the circumstances and intended use.
>
> 1. Explain the importance of model accuracy.
>    - *Key concepts:* [[Predictive Accuracy]]
> 2. Explain, fit, evaluate, and make predictions with each of the following models:
>    - Additive models
>    - [[Linear Mixed Model|Linear mixed models]]
>    - [[Neural Network|Neural networks]].
> 3. Apply [[Bayesian]] techniques to predictive models.
> 4. Compare model results with those from linear and [[Decision Tree|tree-based]] methods.
> 5. Explain the benefits of and demonstrate the combination of multiple models via [[Stacking|stacking]] and blending.
> 6. Select and justify a modeling approach based on accuracy, [[Explainability|explainability]], stability, analytical effort, computational efficiency, and [[Table Importability|table importability]], taking into account the business context of the problem.
> 7. Recognize and mitigate the effect of:
>    - Starting with [[Variable Selection|too many variables]]
>    - Repeated use of [[Train-test-validate Set|train/test/validate sets]]
>    - Model [[Bias|bias]], including fairness concepts and [[Proxy Discrimination|proxy discrimination]].

> [!example]- Model Explainability and Communication {25–35%}
> The Candidate will be able to effectively communicate the results of applying [[Predictive Analytics|predictive analytics]], including the relationship between model input and output, to solve a business problem.
>
> 1. Understand aspects of [[Explainability|explainability]], in particular:
>    - The connection between ethics and [[Explainability|explainability]]
>    - Suitability, [[Interpretability|decomposability]], [[Interpretability|algorithmic transparency]], and [[Interpretability|post-hoc interpretability]]
>    - The difference between [[Explainability|explainability]] and [[Interpretability|interpretability]]
>    - When a lack of [[Explainability|explainability]] may be acceptable.
> 2. Communicate and justify a recommended analytics solution, including use as appropriate of:
>    - [[Variable Importance|Variable importance plots]]
>    - [[Partial Dependence Plot|Partial dependence plots]]
>    - [[Partial Dependence Plot|Individual conditional expectation plots]]
>    - [[Shapley Value|Shapley values]]
>    - [[Lift]] and [[Lift|gain charts]].
> 3. Explain why a model is predicting certain values for certain records.
>    - *Key concepts:* [[Explainability]]
> 4. Perform data and [[Model Governance|model governance]] and develop model documentation in an ethical context.
> 5. Communicate in a clear and straightforward manner using common language that is appropriate for the intended audience.
>    - *Key concepts:* [[Actuarial Communication]]
> 6. Structure a report in an effective manner while following [[Actuarial Standards of Practice|standards of practice]] for [[Actuarial Communication|actuarial communication]].

## Source Material
> [!answer]- Source Material
>
> - [[Advanced Topics in Predictive Analytics e-Learning Modules (SOA)|e-Learning Modules]]
>      - All required resources are embedded in the e-Learning modules.
