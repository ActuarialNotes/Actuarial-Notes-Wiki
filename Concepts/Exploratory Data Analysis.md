---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:74a174ef6353665d260441bafee19696a471e6ebdb1583d185166a7043e76195
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

**Exploratory Data Analysis (EDA)** is an approach to analyzing datasets by summarizing their main characteristics — often visually — before formal modeling. EDA helps identify patterns, anomalies, and appropriate model structures.

**Common EDA techniques:**

| Plot / Summary | Purpose |
| :--- | :--- |
| **Histogram** | Visualize the shape and spread of a univariate distribution |
| **Box plot** | Display median, quartiles, and outliers; compare groups |
| **Scatter plot** | Examine relationship between two continuous variables |
| **Bar chart** | Display frequencies for categorical variables |
| **[[QQ Plot]]** | Compare a distribution to a theoretical reference |
| **Correlation matrix** | Identify linear relationships among predictors |
| **Summary statistics** | Mean, median, SD, min, max, quantiles |

- EDA is an iterative, open-ended process — unlike confirmatory analysis, there are no fixed hypotheses
- For **categorical predictors**: bar charts and frequency tables reveal imbalance or rare categories
- For **continuous predictors**: histograms and scatter plots reveal skewness, outliers, and non-linear relationships with the response
- **Log transforms** of skewed positive variables (claim sizes, exposures) are common in actuarial EDA
- EDA informs feature engineering, transformation choices, and the selection of an appropriate [[Generalized Linear Model]] family and [[Link Function]]

**Planning an exploration:**

- **An iterative cycle:** EDA is not a fixed procedure. The analyst generates questions about the data, searches for answers by visualizing, transforming and modelling it, and uses what is learned to refine the questions or ask new ones. Each question focuses attention on one part of the data set and decides which graph, summary or transformation to make next
- **Two questions are always useful:** what *variation* occurs within each variable (its typical values, rare values, clusters and unusual values), and what *covariation* occurs between variables (whether two or more tend to vary together). [[Exploratory Data Visualization]] and [[Types of Plots]] cover the plots that answer each
- **Data quality comes first:** Even when the analysis's main questions are set in advance, EDA is needed to check whether the data meet expectations. Data cleaning is one application of it: an impossible value, a zero standing in for a missing value, or a duplicated record is found by looking ([[Data Validation]], [[Data Issues]])
- **Goals:** The NIST handbook lists what EDA is for: to maximize insight into a data set, uncover its structure, extract the important variables, detect outliers and anomalies, test the assumptions a model will rely on, and develop parsimonious models. The analyst also needs to know what is *not* in the data
- **Patterns lead to questions:** When a plot shows a pattern, ask whether it could be chance, how to describe the relationship and how strong it is, what other variable might affect it, and whether it holds within subgroups. A model can then remove a strong known relationship so that subtler ones show in the residuals
- **Summaries alongside plots:** [[Summary Statistics]] such as counts, means, quantiles and the share of missing values support the plots, and every group summary should carry its count, so that a striking average resting on a few records is recognised

![[Media/Figures/Exploratory_Data_Analysis.svg|340]]

> [!example]- Using a Box Plot to Detect Group Differences {Example}
> An actuary creates box plots of claim severity for four vehicle classes. Three boxes overlap substantially, but the "luxury" class has a noticeably higher median and wider IQR with several high outliers. What modeling decision might this suggest?
>
> > [!answer]-
> > The luxury class likely warrants a separate rating factor in the model (or a distinct coefficient). The high outliers suggest right-skewness; a **Gamma GLM with log link** may be more appropriate than ordinary linear regression. A log transformation of severity should also be considered for EDA plots to reduce the visual influence of extremes.

> [!example]- Planning the First Questions for a Claims Data Set {Example}
> An analyst receives a commercial auto claims file of 80,000 claims for a severity model, with paid amount, accident date, report date, vehicle class, driver age and state. Frame the first round of exploration.
>
> > [!answer]-
> > Start with variation, one variable at a time: a histogram of paid amounts (and of their logarithm), a bar chart of vehicle class and state with counts, the range of driver ages, and the share of missing values in each field. Check the data's expectations as it goes: no report date before its accident date, no driver aged 0, no duplicated claim numbers.
> >
> > Then covariation: box plots of paid amount by vehicle class and by state, a scatter plot of paid amount against driver age, and a line chart of claim counts by accident month to see whether the volume shifts. Each answer suggests the next question: a state with unusually high severity leads to checking how many claims it has and whether one large loss drives it.

> [!tip]- How it appears on the exam
> - **DISC-DA** opens its topic on analyzing data with visualizations with planning an effective data exploration and data exploration fundamentals. Application questions describe a data set and a business question and ask what to explore first, which question about variation or covariation a plot answers, or what a finding implies for the next step.
> - **MAS-I** asks candidates to interpret EDA plots for different data types, and **PA** and **PCPA** ask for the exploration of a data set before it is modelled.

> [!warning]- Exam traps
> - **EDA has no fixed script:** An answer that runs a set checklist and stops misses that each finding should generate the next question.
> - **Exploration is not confirmation:** A pattern found while exploring is a hypothesis. It still has to be tested, and a relationship that disappears within subgroups was driven by something else.
> - **Cleaning is part of EDA:** Data problems, such as missing values coded as zero, are found by exploring the data, not only by validation rules written in advance.

