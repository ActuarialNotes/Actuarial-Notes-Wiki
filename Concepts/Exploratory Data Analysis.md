---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:68bcd1d00bd4ba0796f5bf66574bd0d6d3513ee0725e684377311fe57d8bf532
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.1.1 'What is EDA?', sha256:47f8a33abaed0922021846f17e816d673d7ce695064c6981716d441a63207580 — https://www.itl.nist.gov/div898/handbook/eda/section1/eda11.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.1.2 'How does EDA differ from classical data analysis?', sha256:41e20f106ae18b182b99d1d61001e0f1c8a69a32fa4f294082f615c1fbd77f12 — https://www.itl.nist.gov/div898/handbook/eda/section1/eda12.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.14 'Histogram' (definition, count and density normalisations, questions answered), sha256:5dd49706cfe4151a32e35dcae8bf63d421ba68685abf7473588776c7830f065a — https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.7 'Box Plot' (basic box plot; 'Box plots with fences'), sha256:545e917efab8aae10425dd289461c519de359120fd39d6dc94efa8c324e1f783 — https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.26 'Scatter Plot', sha256:3232379f988c0b0a21dc0591503b480263e3ff7eb0190c9c2a622ddb09a4b9f9 — https://www.itl.nist.gov/div898/handbook/eda/section3/scatterp.htm"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §3.3.3 'Collinearity' (correlation matrix of the predictors), printed p.102 (PDF p.112); §3.3.3 log Y for heteroscedasticity, printed p.96 (PDF p.106); §2.3.5 lab summary(), printed pp.51-52 (PDF pp.62-63), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Larsen, 'Generalized Linear Models', CAS Study Note (rev. 6/29/2016), pp.1-2 ('QQ and Box Plots…', 'Tweedie Distributions'), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C Extended Linear Models, tasks 5 and 9, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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

![[Media/Figures/Exploratory_Data_Analysis.svg|340]]

> [!example]- Using a Box Plot to Detect Group Differences {Example}
> An actuary creates box plots of claim severity for four vehicle classes. Three boxes overlap substantially, but the "luxury" class has a noticeably higher median and wider IQR with several high outliers. What modeling decision might this suggest?
>
> > [!answer]-
> > The luxury class likely warrants a separate rating factor in the model (or a distinct coefficient). The high outliers suggest right-skewness; a **Gamma GLM with log link** may be more appropriate than ordinary linear regression. A log transformation of severity should also be considered for EDA plots to reduce the visual influence of extremes.
