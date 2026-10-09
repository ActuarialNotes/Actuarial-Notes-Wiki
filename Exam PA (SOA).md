---
syllabus:
  source_url: "https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-exam-pa-syllabus.pdf"
  sitting: "October 2026"
  source_sha256: 1f1c46424d78ac04c297bf6c121bf9d03aec7d451560335cc9e07c7c533a4d84
  extracted_at: 2026-10-05
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:7a2bbc4649000e14492991ab29287860131dad803ad7de915af21235f1d1814d
  sources:
    - "SOA, October 2026 syllabus PDF for PA, all pages, sha256:1f1c46424d78ac04c297bf6c121bf9d03aec7d451560335cc9e07c7c533a4d84 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-exam-pa-syllabus.pdf"
    - "SOA exam study-materials page, read 2026-10-09: links this syllabus PDF as the current edition"
  open_findings: 0
  open_critical: 0
  log: .verify/Exam PA (SOA).md
---

<div class="exam-nav"
     data-current="PA|Predictive Analytics">
</div>

# Exam PA
The Predictive Analytics exam is administered as a three hour and thirty-minute exam requiring analysis of data in the context of a business problem and submission of written responses to specified tasks. There is no scheduled break for candidates. Candidates will have access to a computer equipped with Microsoft Word and Microsoft Excel.1 Note that starting with the April 2023 administration, R and RStudio will NOT be available. Written responses will be submitted electronically via Microsoft Word. For additional details, please refer to the Exam PA home page.

> [!question]- About the exam
>
> Exam PA assumes knowledge of probability, mathematical statistics, and selected analytical techniques as covered in Exam P (Probability), VEE Mathematical Statistics, and Exam SRM (Statistics for Risk Modeling).
>
> Please check the Updates section on this exam's home page for any changes to the exam or syllabus.
>
> The learning objectives and outcomes provided on the following pages follow the five modules of the e-Learning support provided. There is an additional module that is an Introduction to R. That knowledge is not part of the learning objectives for the course, but is needed to be able to work with the material in the other modules. The ranges of weights shown in the Learning Objectives below are intended to apply to the large majority of exams administered. On occasion, the weights of topics on an individual exam may fall outside the published range. Candidates should also recognize that tasks often cover multiple learning objectives, including some weight for communication in most tasks.
>
> 1 The Prometric computers will have the 2016 versions of Microsoft Word and Excel.

## Learning Objectives

> [!example]- Predictive Analytics Problem Definition {10–20%}
> The Candidate will be able to identify the [[Business|business]] problem, how the available [[Data|data]] relates to possible analyses, and use the information to propose an appropriate [[Modeling|modeling]] approach.
>
> 1. Assess whether [[Descriptive|descriptive]], [[Predictive|predictive]], and [[Prescriptive Analytics Apply|prescriptive analytics applies]] to a [[Business|business]] problem.
> 2. Describe the characteristics of [[Predictive Analytics|predictive modeling]] problems.
> 3. Explain the concepts of [[Bias|bias]], [[Variance|variance]], model [[Complexity|complexity]], and the [[Bias-Variance Tradeoff|bias-variance trade-off]].
> 4. Translate a [[Vague Question|vague question]] into one that can be analyzed with [[Statistics|statistics]] and [[Predictive Analytics|predictive analytics]] to solve a [[Business|business]] problem.
> 5. Consider factors such as available [[Data|data]] and [[Technology|technology]], significance of [[Business|business]] impact, and implementation [[Challenge|challenges]] to define the problem.
> 6. Assess what additional information or [[Next|next]] steps would improve the [[Ability|ability]] to apply [[Predictive Analytics|predictive analytics]] to a [[Business|business]] problem.

> [!example]- Data Exploration and Visualization {20–30%}
> The Candidate will be able to work with various [[Data|data]] types, understand [[Principle|principles]] of [[Data|data]] design, and construct a [[Variety|variety]] of [[Data Visualization|common visualizations]] for [[Exploratory Data Analysis|exploring data]].
>
> 1. Identify [[Structured|structured]] and [[Unstructured Data|unstructured data]] types.
> 2. Identify the types of [[Variable|variables]] and terminology used in [[Predictive Analytics|predictive modeling]].
> 3. Evaluate [[Data Design|effective data]] design with [[Respect|respect]] to time [[Frame|frame]], [[Sampling|sampling]], and [[Data Design|granularity]].
> 4. Apply the key [[Principle|principles]] of constructing [[Graph|graphs]].
> 5. Apply [[Univariate Plot|univariate data exploration]] techniques.
> 6. Apply [[Bivariate Data Exploration|bivariate data exploration]] techniques.

> [!example]- Data Transformations and Unsupervised Learning Techniques {10–20%}
> The Candidate will be able to [[Transform Data|transform data]], including application of [[Unsupervised Learning|unsupervised learning]] techniques, to improve [[Predictive Analytics|predictive modeling]] outcomes.
>
> 1. Create [[Feature|features]] from [[Feature Engineering|existing data]] that may [[Add|add]] value.
> 2. Apply [[Principal Component|principal components]] analysis to [[Transform Data|transform data]].
> 3. Apply [[K-mean|K-means]] and [[Hierarchical Clustering|hierarchical clustering]] to [[Transform Data|transform data]].

> [!example]- Generalized Linear Models {25–35%}
> The Candidate will be able to select and validate a [[Generalized Linear|generalized linear]] model ([[Generalized Linear Model|GLM]]) and apply related [[Modeling|modeling]] concepts as appropriate for a given [[Business|business]] problem.
>
> 1. Select and validate a [[Generalized Linear Model|GLM]] as appropriate for a [[Business|business]] problem.
> 2. Apply [[Offset|offsets]] and [[Weight|weights]] as appropriate.
> 3. Interpret model [[Coefficient|coefficients]], including interaction terms.
> 4. Select appropriate [[Hyperparameter|hyperparameters]] for [[Regularization|regularized regression]].

> [!example]- Tree-Based Models {10–20%}
> The Candidate will be able to apply [[Tree-Based|tree-based]] models as appropriate for a [[Business|business]] problem.
>
> 1. Construct, [[Prune|prune]], and validate [[Regression|regression]] and [[Classification Tree|classification trees]].
> 2. Apply [[Bagging|bagging]] and [[Random Forest|random forests]] as appropriate.
> 3. Apply [[Boosting|boosting]] as appropriate.

## Source Material
> [!answer]- Source Material
>
> - [[Regression Modeling with Actuarial and Financial Applications (Frees - 2010)|Regression Modeling with Actuarial and Financial Applications, Edward W. Frees, 2010, New York: Cambridge. ISBN: 978-0-521-13596-2. Note that while Chapters 7-9 are covered in Exam SRM, these models will not be covered in this exam.]]
>      - Chapter 1 – Background only
>      - Chapter 2 – Sections 1-8
>      - Chapter 3 – Sections 1-5
>      - Chapter 5 – Sections 1-7
>      - Chapter 6 – Sections 1-3
>      - Chapter 11 – Sections 1-6
>      - Chapter 12 – Sections 1-4
>      - Chapter 13 – Sections 1-6
> - [[An Introduction to Statistical Learning (James et al. - 2021)|An Introduction to Statistical Learning, with Applications in R, James, Witten, Hastie, Tibshirani, 2013, New York: Springer. There is now a second edition, 2021. PDFs of both editions can be obtained via links found here: https://www.statlearning.com. The material used on this exam is virtually unchanged and so either version may be used. The following table indicates the relevant sections from the two editions.]]
>      - First Edition: Chapter 2 – Sections 1-3; Chapter 3 – Sections 1-6; Chapter 4 – Sections 1-3 and parts of 6 (referenced in Module 6, not on SRM); Chapter 5 – Sections 1 and 3 (excluding 5.3.4); Chapter 6 – Sections 1-7; Chapter 8 – Sections 1-3; Chapter 10 – Sections 1-6
>      - Second Edition: Chapter 2 – Sections 1-3; Chapter 3 – Sections 1-6; Chapter 4 – Sections 1-3 and parts of 6 (referenced in Module 6, not on SRM); Chapter 5 – Sections 1 and 3 (excluding 5.3.4); Chapter 6 – Sections 1-5; Chapter 8 – Sections 1-3 (excluding 8.2.4, 8.2.5, and 8.3.5; Chapter 12 – Sections 1-2, 4-5 (excluding 12.5.2)
> - [[R for Everyone (Lander - 2017)|R for Everyone, 2nd ed. Lander, 2017, Boston: Addison-Wesley, ISBN 978-0-13-454692-6.]]
>      - Chapters 1-10, 14, 26 and 28
> - [[Data Visualization - A Practical Introduction (Healy - 2018)|Data Visualization: A Practical Introduction, Healy, 2018, Princeton University Press, ISBN 978-0-691-18162-2. This book may be available as web pages at http://socviz.co/. Note that this version can be viewed only on the web, there is no PDF version to download. The author has indicated that at some point the web version may be discontinued]]
>      - Chapters 1-4
