---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:5c08fda881f138d2315c937687172005ad912012d886a25114997f20aa952eac
  sources:
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.10 'Exploratory data analysis', §10.1 (iterative cycle; not a formal process; data quality even when questions are given; data cleaning one application), §10.2 (questions focus attention; variation and covariation), §10.3.1-10.3.2 (typical/rare values, clusters; zero-coded missing values), §10.6 (pattern questions; model residuals), sha256:ab13c323616810e786eb9f6298ed5d4b9bc50d1cebfb753d2725f91684553432 — https://r4ds.hadley.nz/EDA.html"
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.3 'Data transformation', §3.6 'Case study: aggregates and sample size' (include a count n() with any aggregation), sha256:7ecfc380d9ba22575657e2e0ea5b16d9a2c7a235f5cfd2a3ad860bf6bbf745de — https://r4ds.hadley.nz/data-transform.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.1.1 'What is EDA?' (maximize insight, uncover structure, extract important variables, detect outliers, test assumptions, parsimonious models), sha256:1aa8c4089849fbf4c43ba538bb9ed78242705be264effef6aab35c147829d962 — https://www.itl.nist.gov/div898/handbook/eda/section1/eda11.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.1.4 'What are the EDA Goals?' ('the analyst also must know what is not in the data'), sha256:504d5258ba94ba60109d44b1aca96413c8659e46a5f704c783536130e8b2535c — https://www.itl.nist.gov/div898/handbook/eda/section1/eda14.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.1.2 'How does EDA differ from classical data analysis?', sha256:6d130be1b0d566e62f73cd4b143f73058aeec63b1da1b35f11ff51787649bb98 — https://www.itl.nist.gov/div898/handbook/eda/section1/eda12.htm"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C task 9 'Interpret exploratory data analysis plots for various data types', PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "SOA Exam PA syllabus, October 2026, Topic 2 'Data Exploration and Visualization' learning objective ('construct a variety of common visualizations for exploring data'), PDF p.2, sha256:1f1c46424d78ac04c297bf6c121bf9d03aec7d451560335cc9e07c7c533a4d84 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-exam-pa-syllabus.pdf"
    - "CAS PCPA Exam & Project Content Outline v.8 (updated 9.9.2026), Domain A 'Dealing with Data' ('evaluate the data set and manipulate it so it can be used in a predictive analytics model'), tasks A1-A4, PDF pp.3-4, sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exploratory Data Analysis.md
---

![[Media/Figures/Exploratory_Data_Analysis.svg|340]]

**Exploratory Data Analysis** (EDA) is the initial investigation of a data set through summaries and plots, made before any model is built, to find its patterns and problems and to generate questions about it. Its purpose is to form hypotheses, not to confirm conclusions. An exploration proceeds in four steps:

1. Examine the variation within each variable: its typical, rare and unusual values. Plot the distribution of each variable, with a [[Histogram|histogram]] for a numeric field and a bar chart for a categorical field, and check whether the values meet expectations.
2. Examine the covariation between variables: whether two or more tend to vary together.
3. Treat each pattern found as a question to check, not as a conclusion.
4. Fit a model only after the exploration has shown the data's shape and problems.

Examining each variable's distribution doubles as a [[Data Quality|data quality]] check. An impossible value, a zero standing in for a missing value or a duplicated record is found by looking at the data before anything is built on it.

> [!example]- An analyst receives a claims file with paid amount, accident date, report date, vehicle class and driver age, and is asked to build a severity model. What should the first round of exploration look at? {Example}
> - A histogram of paid amounts, and of their logarithm, shows the shape of severity.
> - A bar chart of claims by vehicle class shows which classes have little data.
> - Checking the values finds problems: a report date before its accident date, a driver aged 0, or a duplicated claim.
> - Box plots of paid amount by vehicle class and a scatter plot against driver age then show the covariation.
> - The model is fitted only after these checks.

## Variation within a variable

The plot of a single variable depends on its [[Data Types|data type]]. A [[Histogram|histogram]] shows the shape of a numeric variable's distribution. For a heavily right-skewed positive variable, such as claim severity, a histogram of the logarithm spreads out the bulk of the data so that the shape is visible. A bar chart shows how often each level of a categorical variable occurs. A [[Box Plot|box plot]] displays a variable's median, first and third quartiles, and outliers.

## Covariation between variables

Side-by-side box plots, one for each level of a categorical variable, compare a numeric variable such as severity across the levels. Levels with nearly identical boxes and medians can be grouped into a single level of a [[Categorical Predictor|categorical predictor]], while a clearly shifted box suggests a separate level. A [[Scatter Plot|scatter plot]] shows the relationship between two numeric variables. A correlation matrix gives the pairwise [[Correlation|correlations]] among numeric predictors and is used to screen for strongly related, collinear pairs. It captures only linear relationships, and only between pairs.

> [!example]- Side-by-side box plots of severity for four vehicle classes show medians of 3.0, 3.1, 3.2 and 6.8 thousand, with the first three boxes overlapping almost completely. How should vehicle class enter the model? {Example}
> - The first three classes have nearly identical boxes and medians, so the data do not distinguish them.
> - They can be grouped into one level.
> - The fourth class's box is clearly shifted upward, so it should be a separate level.

## Patterns as hypotheses

A pattern seen in an exploratory plot is a hypothesis, not a conclusion or a rating relativity, and it must be checked before it is acted on. Two checks apply to most patterns:

1. A difference in a group statistic, such as a median, may arise by chance when the group has few observations, so check the group's count.
2. An apparent effect of one variable may be explained by a third variable, such as coverage mix or policy limits, so check whether the pattern holds within subgroups.

> [!example]- In a box plot of severity by territory, territory 7 has a median twice that of every other territory, but it has only 12 claims. What should the analyst conclude? {Example}
> - A median of 12 claims can differ by chance, so the difference may not be real.
> - Territory 7 may also have a different coverage mix or limits, which could explain the difference.
> - The pattern is a hypothesis to test with more data, or within subgroups, not a relativity to price.

> [!trap] Treating an exploratory pattern as a conclusion
> A plot made while exploring shows where to look, not what is true. A pattern resting on a few records, or one that disappears within subgroups, was not a real effect of the variable.
