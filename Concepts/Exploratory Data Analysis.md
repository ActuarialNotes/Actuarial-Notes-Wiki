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

> [!example]- Using a Box Plot to Detect Group Differences {Example}
> An actuary creates box plots of claim severity for four vehicle classes. Three boxes overlap substantially, but the "luxury" class has a noticeably higher median and wider IQR with several high outliers. What modeling decision might this suggest?
>
> > [!answer]-
> > The luxury class likely warrants a separate rating factor in the model (or a distinct coefficient). The high outliers suggest right-skewness; a **Gamma GLM with log link** may be more appropriate than ordinary linear regression. A log transformation of severity should also be considered for EDA plots to reduce the visual influence of extremes.
