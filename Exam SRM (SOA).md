---
syllabus:
  source_url: "https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf"
  sitting: "January 2027"
  source_sha256: 2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af
  extracted_at: 2026-10-05
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dbefbf93e57b9d2473417e8e4307754e26e29fb7d4e94a6d66749046f6d8ce34
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Exam SRM (SOA).md
---

<div class="exam-nav"
     data-current="SRM|Statistics for Risk Modeling">
</div>

# Exam SRM
The Statistics for Risk Modeling exam is a three and one-half hour exam that consists of 35 multiple-choice questions and is administered as a computer-based test (CBT). For additional details, please refer to Exam Rules.

> [!question]- About the exam
>
> The goal of the syllabus for this examination is to provide an understanding of the basics of several important analytic methods. This exam is a prerequisite for the Predictive Analytics exam, which will go deeper into each of the covered techniques.
>
> A thorough knowledge of calculus, probability (as covered in the P Exam) and mathematical statistics (as covered in the VEE Mathematical Statistics) is assumed.
>
> The following learning objectives are presented with the understanding that candidates are allowed to use specified calculators on the exam.
>
> A variety of tables is available below for the candidate and will be provided to the candidate at the examination. These include values for the standard normal distribution, t distribution and chi-square distribution. This information will be available as a pdf for the CBT exam candidates found under an Exhibit button during the exam. Paper/pencil candidates will receive a hard copy of the table(s). Since the table(s) will be included with the examination no matter which format is taken, candidates will not be allowed to bring copies of the tables into the examination room.
>
> Please check the Updates section on this exam's home page for any changes to the exam or syllabus.
>
> In the learning outcomes, weights have been provided to indicate the relative emphasis on different sections. The ranges of weights shown are intended to apply to the large majority of exams administered. On occasion, the weights of topics on an individual exam may fall outside the published range. Candidates should also recognize that some questions may cover multiple learning outcomes.
>
> For this exam, ability to solve problems using the R programming language will not be assumed. However, questions may present R output for interpretation.
>
> Each multiple-choice problem includes five answer choices identified by the letters A, B, C, D, and E, only one of which is correct. Answers for some questions have been rounded.
>
> As part of the computer-based testing process, a few pilot questions will be randomly placed in the exam (both paper and pencil and computer-based forms). These pilot questions are included to judge their effectiveness for future exams, but they will NOT be used in the scoring of this exam. All other questions will be considered in the scoring. All unanswered questions are scored incorrect. Therefore, candidates should answer every question on the exam. There is no set requirement for the distribution of correct answers for the multiple-choice preliminary examinations. It is possible that a particular answer choice could appear many times on an examination or not at all. Candidates are advised to answer each question to the best of their ability, independently from how they have answered other questions on the exam.
>
> Since the CBT exam will be offered over a period of a few days, each candidate will receive a test form composed of questions selected from a pool of questions. Statistical scaling methods are used to ensure within reasonable and practical limits that, during the same testing period of a few days, all forms of the test
>
> are comparable in content and passing criteria. The methodology that has been adopted is used by many credentialing programs that give multiple forms of an exam.
>
> Unofficial pass/fail results will be sent within one hour to the email address you used to schedule your appointment.

The learning objectives below are transcribed from the January 2027 [syllabus](https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf) the SOA publishes, word for word; the SOA lists its outcomes a), b), c), numbered 1, 2, 3 here.

## Learning Objectives

> [!example]- Basics of Statistical Learning {5–10%}
> The Candidate will understand key concepts of [[Statistical Learning|statistical learning]].
>
> 1. Define terms used to [[Classify|classify]] the types of [[Modeling|modeling]] problems and methods, including [[Supervised|supervised]] versus [[Unsupervised Learning|unsupervised learning]] and [[Regression|regression]] versus [[Classification|classification]].
> 2. Compare the [[Common|common]] methods of assessing model [[Accuracy|accuracy]].
> 3. Understand how the [[Bias-Variance Tradeoff|bias-variance tradeoff]] impacts the selection of [[Statistical Learning|statistical learning]] methods.
> 4. Understand [[Cross-Validation|resampling]] methods used for model [[Model Validation|validation]], including
>    - [[Training]] set vs. test set approach
>    - [[Cross-Validation|k-fold cross-validation]]
>    - [[Cross-Validation|Leave-one-out cross-validation]]

> [!example]- Linear Models {40–50%}
> The Candidate will understand key concepts concerning [[Generalized Linear|generalized linear]] models.
>
> 1. Compare model assumptions for [[Ordinary|ordinary]] least [[Square|squares]] and [[Generalized Linear|generalized linear]] models.
> 2. Identify the [[Member|members]] of the [[Exponential Family|exponential family]] of [[Distribution|distributions]] and [[Link Function|corresponding link]] functions.
> 3. Apply the [[Business Context|business context]] of a problem to interpret [[Parameter|parameters]].
> 4. Interpret [[Model Diagnostics|diagnostic tests]] of model fit and assumption checking, using
>    - [[Graphical]] methods
>    - [[Quantitative]] methods
> 5. Select an [[Appropriate|appropriate]] model, considering
>    - [[Distribution|Distributions]] and [[Link|link]] functions
>    - [[Variable Transformation|Variable transformations]] and interactions
>    - t and F [[Test|tests]]
>    - [[AIC]] and [[BIC]]
>    - [[Likelihood]] ratio test
> 6. Calculate and interpret [[Fitted Values|predicted values]], and [[Confidence Interval|confidence]] and [[Prediction Interval|prediction intervals]].
> 7. Understand how approaches may [[Differ Compared|differ compared]] to using an [[Ordinary|ordinary]] least [[Square|squares]] model, including
>    - [[Regularization|Regularized regression]] ([[Regularization|lasso]], [[Regularization|ridge regression]])
>    - [[K-Nearest Neighbors|K-nearest neighbors]]

> [!example]- Time Series Models {10–15%}
> The Candidate will understand key concepts concerning [[Time Series|regression-based time series]] models.
>
> 1. Define the concepts and [[Component|components]] of [[Time Series|stochastic time series processes]], including [[Random Walk|random walks]], [[Stationarity|stationarity]], and [[Autocorrelation Function|autocorrelation]].
> 2. Describe specific time [[Series|series]] models, including, [[Exponential Smoothing|exponential smoothing]], [[Autoregressive|autoregressive]], and [[ARCH Model|autoregressive conditionally heteroskedastic]] models.
> 3. Calculate and interpret [[Fitted Values|predicted values]] and [[Confidence Interval|confidence intervals]].

> [!example]- Decision Trees {20–25%}
> The Candidate will understand key concepts concerning [[Decision Tree|decision tree]] models.
>
> 1. Describe the construction of [[Decision Tree|decision trees]], including
>    - How they are optimally fit to [[Train-Test Split|training data]]
>    - How they are [[Pruned|pruned]] to mitigate [[Overfitting|overfitting]]
> 2. [[Predict]] outcomes using
>    - [[Classification Tree|Classification trees]]
>    - [[Regression Tree|Regression trees]]
> 3. Describe [[Bagging|bagging]], [[Boosting|boosting]], and [[Random Forest|random forests]] and the [[Hyperparameter|hyperparameters]] used to control them.
> 4. Compare [[Decision Tree|decision trees]] to [[Linear|linear]] models including uses and [[Relative|relative]] strengths.

> [!example]- Unsupervised Learning Techniques {10–15%}
> The Candidate will understand key concepts concerning [[Principal Component|principal component]] and [[Cluster|cluster]] analysis.
>
> 1. Define [[Principal Component|principal components]], including how they are calculated.
> 2. Interpret the results of a [[Principal Component|principal components]] analysis, considering [[Loading|loading]] factors and [[Proportion|proportion]] of [[Variance Explained|variance explained]].
> 3. Describe and compare the [[Algorithm|algorithms]] for:
>    - [[K-Means Clustering|K-means clustering]]
>    - [[Hierarchical Clustering|Hierarchical clustering]]
> 4. Explain methods for deciding the [[Number|number]] of [[Cluster|clusters]].

## Source Material
> [!answer]- Source Material
>
> - [[Regression Modeling with Actuarial and Financial Applications (Frees - 2010)|Regression Modeling with Actuarial and Financial Applications, Edward W. Frees, 2010, New York: Cambridge. ISBN: 978-0521135962.]]
>      - Chapter 1 – Background only
>      - Chapter 2 – Sections 1-8
>      - Chapter 3 – Sections 1-5
>      - Chapter 5 – Sections 1-7
>      - Chapter 6 – Sections 1-3
>      - Chapter 7 – Sections 1-6
>      - Chapter 8 – Sections 1-4
>      - Chapter 9 – Sections 1-5
>      - Chapter 11 – Sections 1-6
>      - Chapter 12 – Sections 1-4
>      - Chapter 13 – Sections 1-6
> - [[An Introduction to Statistical Learning (James et al. - 2021)|An Introduction to Statistical Learning, with Applications in R Second Edition, James, Witten, Hastie, Tibshirani, New York: Springer. A PDF of the text can be obtained via the link found here: https://www.statlearning.com. Scroll to the bottom of the page and click on the box labeled “2nd Edition of ISLR with R.”]]
>      - Chapter 2 – Sections 1-3
>      - Chapter 3 – Sections 1-6
>      - Chapter 5 – Sections 1 and 3 (excluding 5.3.4)
>      - Chapter 6 – Sections 1-5
>      - Chapter 8 – Sections 1-3 (excluding 8.2.4, 8.2.5, and 8.3.5)
>      - Chapter 12 – Sections 1-2, 4-5 (excluding 12.5.2)
