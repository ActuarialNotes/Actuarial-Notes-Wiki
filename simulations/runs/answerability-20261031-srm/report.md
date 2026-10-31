# Answerability: Exam SRM (SOA)

Run `answerability-20261031-srm` · 77 questions checked of 77 attempted · cost $5.56

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away, on the exam's syllabus or on a prerequisite exam's page | 49 | 64% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 6 | 8% |
| **Gap** — something the solution uses is taught on no page | 22 | 29% |

Requirements: 277 — tagged 212 (77%), linked 25 (9%), syllabus 2 (1%), prerequisite 0 (0%), elsewhere 7 (3%), missing 31 (11%)

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Undated (samples and the vault's own) | 77 | 49 | 6 | 22 (29%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### `Concepts/Boosting.md` — 2 question(s)

- `srm-068` (procedure): In boosting for regression trees, the residuals are initialized to the observed target values (r_i = y_i), before any trees are fit.
- `srm-069` (procedure): In boosting for regression trees, the fitted function starts at \hat{f}(x) = 0 and each residual is initially r_i = y_i.

### `Concepts/Clustering.md` — 2 question(s)

- `srm-002` (fact): Both K-means and hierarchical clustering assign every observation to a cluster, so outliers can heavily distort the results of either method; neither is robust to outliers.
- `srm-032` (fact): Clustering can be applied either to observations (rows) using the features, or to features (columns) using the observations, since the roles of rows and columns can be reversed in the algorithm.

### `Concepts/K-Means Clustering.md` — 2 question(s)

- `srm-059` (definition): The within-cluster variation of cluster C_k is W(C_k) = (1/\|C_k\|) times the sum over all pairs of observations in the cluster of their squared Euclidean distances, summed across features.
- `srm-059` (fact): A cluster's within-cluster variation (pairwise form) equals twice the sum of squared Euclidean distances of its observations from the cluster centroid.
- `srm-060` (fact): Setting the number of clusters equal to the number of observations overfits the data, since each observation becomes its own cluster and there are rarely that many true clusters.

### `Concepts/Linear Regression.md` — 2 question(s)

- `srm-023` (fact): If all data points lie exactly on a straight line, the least squares regression line is that line (residuals are zero).
- `srm-071` (fact): Omitting important variables leaves unexplained variation in the residuals, so the error variance estimate s^2 is inflated, which widens prediction intervals.

### `Concepts/Logistic Regression.md` — 2 question(s)

- `srm-042` (fact): The logit and probit functions are very similar in shape and give similar fitted results; they are not substantially different.
- `srm-067` (formula): The loglikelihood of a logistic regression (binary response) model is the sum over observations of ln(p_i) for successes and ln(1 - p_i) for failures, where p_i is the model's fitted success probability for that observation.
- `srm-067` (fact): When the indicator variable's coefficient is set to zero (null hypothesis beta_1 = 0), the model reduces to an intercept-only model with a single common fitted probability for all observations.

### **no page for Forecast Error Measures** — 1 question(s)

- `srm-055` (formula): The mean error (ME) is the average of the forecast errors: ME = (1/m) \sum e_t.

### **no page for Logit Function** — 1 question(s)

- `srm-014` (definition): The logit transformation, ln(p/(1-p)), is defined only for values strictly between 0 and 1.

### **no page for Mean Squared Error in Time Series Regression** — 1 question(s)

- `srm-058` (formula): For an AR(1) model fit to T observations, the mean square error is s^2 = the sum of squared deviations of the residuals from their average divided by (T - 3), which estimates Var(epsilon_t) = sigma^2.

### **no page for Population Regression Line** — 1 question(s)

- `srm-053` (definition): The equation Y = β0 + β1 X + ε defines the population regression line, the true relationship between X and Y, whose coefficients are unknown and estimated from data.

### **no page for Power Transformations** — 1 question(s)

- `srm-014` (fact): Power transformations of the dependent variable with power less than one, such as the square root, can reduce increasing variance of residuals.

### **no page for Prediction in Regression** — 1 question(s)

- `srm-056` (fact): Different candidate regression models generally produce different predictions for the same new observation, so predictions depend on the model chosen.

### `Concepts/AIC.md` — 1 question(s)

- `srm-070` (formula): For a linear regression with d predictors fitted to n observations, AIC = (1/n)(RSS + 2·d·σ̂²), where σ̂² is the estimated error variance.
- `srm-070` (procedure): When computing AIC to compare models, estimate σ̂² once from the full model containing all predictors (the square of its residual standard error) and use that same value for every candidate model.

### `Concepts/Autoregressive Model.md` — 1 question(s)

- `srm-058` (definition): The fitted value for an AR(1) model at time t is b0 + b1*y_{t-1}, and the residual e_t is the observed y_t minus this fitted value, defined for t = 2 through T.

### `Concepts/Decision Tree.md` — 1 question(s)

- `srm-029` (fact): Decision trees can be displayed graphically as a tree diagram, which makes them easy to read even for non-experts.

### `Concepts/Exponential Smoothing.md` — 1 question(s)

- `srm-046` (formula): Double exponential smoothing computes a second smoothed series by applying the smoothing recursion to the first smoothed series: s_t^(2) = (1-w) s_t^(1) + w s_{t-1}^(2).
- `srm-046` (formula): In double exponential smoothing the trend estimate is b_T = ((1-w)/w)(s_T^(1) - s_T^(2)).
- `srm-046` (formula): In double exponential smoothing the level (intercept) at time T is a_T = 2 s_T^(1) - s_T^(2).
- `srm-046` (formula): The double exponential smoothing forecast l steps ahead is the level plus the trend times l: ŷ_{T+l} = a_T + b_T · l.

### `Concepts/Generalized Linear Model.md` — 1 question(s)

- `srm-020` (fact): Removing observations or truncating/altering predicted values to force them into a range is inappropriate because it biases the model estimates rather than fixing the model form.

### `Concepts/Principal Components Analysis.md` — 1 question(s)

- `srm-005` (fact): The principal components give the low-dimensional linear surfaces (lines, planes, hyperplanes) that are closest to the observations, as measured by average squared Euclidean distance.

### `Concepts/Random Forest.md` — 1 question(s)

- `srm-041` (fact): With m of p predictors chosen at random at each split, the probability that a given predictor (such as the strongest) is not among those considered is (p - m)/p.

### `Concepts/Regression Tree.md` — 1 question(s)

- `srm-066` (fact): Successive splits on the same predictor along a path combine into an interval, such as a lower bound from a right branch and an upper bound from a later left branch.

### `Concepts/Variable Transformation.md` — 1 question(s)

- `srm-014` (procedure): When the dependent variable can be zero, add a constant (e.g. one) before taking the logarithm, since the log of zero is undefined (negative infinity).

## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

| Question | Pages that teach what it needs |
|---|---|
| `srm-003` | Sample Mean |
| `srm-004` | Sample Variance |
| `srm-019` | Chi-Square Goodness-of-Fit Test |
| `srm-037` | Loading Vector |
| `srm-039` | Polynomial Regression |
| `srm-an-003` | Similarity and Distance Measures |

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Regression Tree | 5 | To predict with a regression tree, start at the root and follow each split's co…; To draw a tree as a partition plot, a split on a predictor at a threshold is dr…; Splits made after an earlier split apply only within the region produced by tha… |
| ARCH Model | 1 | An ARCH(p) process with the sum of the γ coefficients less than 1 is stationary… |
| Chi-Square Goodness-of-Fit Test | 1 | The 95th percentile of the chi-square distribution with 3 degrees of freedom is… |
| Confidence Interval | 1 | A narrower prediction interval is more informative about the true value than a … |
| Logistic Regression | 1 | The linear probability model for a binary response has three main drawbacks: fi… |
| Ordinary Least Squares | 1 | To predict a response for a new value of the predictor, substitute it into the … |
| Overfitting | 1 | Test MSE is normally higher than training MSE for any model, so a test MSE abov… |

## Every question

<details><summary><code>srm-001</code> · answerable</summary>

Tagged pages: Hierarchical Clustering, Linkage, Clustering

| Item | Kind | Status | Where |
|---|---|---|---|
| Complete linkage defines the intercluster dissimilarity as the largest pairwise dissimilarity between an observation in one cluster and an … | definition | tagged | Linkage: “$$\text{complete: } \max_{i \in A,\, j \in B} d_{ij} \qquad \text{single: } \min_{i \in A,\, j \in …” |
| The Euclidean distance between two points is the square root of the sum of squared differences in their coordinates. | formula | linked | Similarity and Distance Measures: “$$d_{\text{Euc}}(\mathbf{u}, \mathbf{v}) = \sqrt{\sum_{j=1}^{p} (u_j - v_j)^2}$$” |

</details>

<details><summary><code>srm-002</code> · gap</summary>

Tagged pages: Clustering, K-Means Clustering, Hierarchical Clustering, Unsupervised Learning

| Item | Kind | Status | Where |
|---|---|---|---|
| K-means clustering requires the number of clusters K to be specified in advance, whereas hierarchical clustering does not; the dendrogram c… | fact | tagged | Clustering: “Requires $K$ prespecified; minimizes within-cluster variance” |
| Both K-means and hierarchical clustering assign every observation to a cluster, so outliers can heavily distort the results of either metho… | fact | missing |  |
| The K-means algorithm begins by randomly assigning each observation to one of K clusters (then iterates computing centroids and reassigning… | procedure | tagged | K-Means Clustering: “**Initialize**: randomly assign each observation to one of $K$ clusters” |

</details>

<details><summary><code>srm-003</code> · untagged</summary>

Tagged pages: Random Walk, Time Series Forecast, Time Series

| Item | Kind | Status | Where |
|---|---|---|---|
| A random walk model expresses the series as its initial value plus the cumulative sum of white noise terms, so y_t = y_{t-1} + c_t. | definition | tagged | Random Walk: “A **random walk** is the non-stationary series whose change at each step is [[White Noise\\|white no…” |
| An h-step ahead forecast from a random walk starts at the last observed value and adds the estimated mean of each future white noise term, … | procedure | tagged | Random Walk: “The **$h$-step forecast is the last observation**, $\hat Y_{t+h} = Y_t$, for every $h$ — and the fo…” |
| The white noise mean is estimated by the sample average of the observed increments, c-bar = (c_1 + ... + c_T)/T, and the sum of the increme… | formula | elsewhere | Sample Mean: “The **Sample Mean** $\bar{X}$ is the arithmetic average of a random sample and the standard estimat…” |
| The forecast error is the actual value minus the forecast, y_{T+h} - y-hat_{T+h}, which for a random walk equals the sum of actual future w… | definition | tagged | Time Series Forecast: “$$\hat{Y}_{t+h} \pm z_{1-\alpha/2}\,\sigma\sqrt{\textstyle\sum_{j=0}^{h-1}\psi_j^{2}}$$” |

</details>

<details><summary><code>srm-004</code> · untagged</summary>

Tagged pages: Random Walk, Time Series Forecast, Prediction Interval

| Item | Kind | Status | Where |
|---|---|---|---|
| A random walk model expresses y_t as y_0 plus the cumulative sum of white noise terms, so the first differences y_t - y_{t-1} equal the whi… | definition | tagged | Random Walk: “A **random walk** is the non-stationary series whose change at each step is [[White Noise\\|white no…” |
| The white noise standard deviation of a random walk is estimated by the sample standard deviation of the first differences, s_c^2 = sum (c_… | formula | elsewhere | Sample Variance: “$$S^2 = \frac{1}{n-1}\sum_{i=1}^{n}(X_i - \bar{X})^2$$” |
| The l-step-ahead forecast of a random walk has standard error s_c * sqrt(l), because the forecast error is a sum of l independent white noi… | formula | tagged | Time Series Forecast: “a [[Random Walk]] stays flat at the last value with an interval widening as $\sqrt{h}$” |

</details>

<details><summary><code>srm-005</code> · gap</summary>

Tagged pages: Principal Components Analysis, Unsupervised Learning

| Item | Kind | Status | Where |
|---|---|---|---|
| Principal component analysis (PCA) is an unsupervised technique that finds a low-dimensional representation of a dataset by projecting obse… | definition | tagged | Principal Components Analysis: “**Principal Components Analysis (PCA)** is an unsupervised [[Statistical Learning]] technique that …” |
| The principal components give the low-dimensional linear surfaces (lines, planes, hyperplanes) that are closest to the observations, as mea… | fact | missing |  |
| The first principal component is the direction (line) in p-dimensional space along which the observations vary the most and which is closes… | fact | linked | Principal Components Regression: “The first component is the direction along which the observations vary the most.” |
| PCA seeks a low-dimensional representation of the data that retains as much of the variation (variance) as possible. | fact | tagged | Principal Components Analysis: “**Principal Components Analysis (PCA)** is an unsupervised [[Statistical Learning]] technique that …” |
| PCA can be used for data visualization, since the first few principal component scores can be plotted to view observations in low dimension… | fact | tagged | Principal Components Analysis: “Used for **visualization** of high-dimensional data, and to derive a few features for a supervised …” |

</details>

<details><summary><code>srm-006</code> · answerable</summary>

Tagged pages: Proportion of Variance Explained, Principal Components Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| Principal components are ordered by variance explained, so the proportion of variance explained (PVE) by each successive principal componen… | fact | tagged | Proportion of Variance Explained: “PVE is **decreasing in $m$** by construction, and the cumulative curve rises to 1 at the last compo…” |
| The cumulative proportion of variance explained is non-decreasing as more principal components are added, reaching 1 when all components ar… | fact | tagged | Proportion of Variance Explained: “PVE is **decreasing in $m$** by construction, and the cumulative curve rises to 1 at the last compo…” |
| Using all principal components is not desirable; the goal is to use the fewest components that capture enough of the variance to understand… | fact | tagged | Proportion of Variance Explained: “The usual reading is off the [[Scree Plot]] or a cumulative-PVE target such as 90%” |
| A scree plot graphs the proportion of variance explained against the component number, and the number of principal components is chosen at … | procedure | linked | Scree Plot: “A **scree plot** graphs the eigenvalues (or the [[Proportion of Variance Explained]]) of a [[Princi…” |

</details>

<details><summary><code>srm-007</code> · answerable</summary>

Tagged pages: Link Function, Generalized Linear Model, Exponential Family, Logistic Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| A binary outcome (e.g., event occurs or not) is modeled in a GLM with a binomial (Bernoulli) response distribution, which corresponds to a … | fact | tagged | Logistic Regression: “**Logistic Regression** is the [[Generalized Linear Model]] for a binary response (with extensions …” |
| For a binary response, the link function should map the linear predictor to a mean between 0 and 1, so the identity (linear) link is unsuit… | fact | tagged | Logistic Regression: “First, the **fitted values are not probabilities** — the identity link is unbounded, so predictions…” |
| The logit link, g(μ) = ln(μ/(1−μ)), maps a probability in (0,1) to the real line, so its inverse (the logistic function) keeps predicted pr… | definition | tagged | Link Function: “\\| Logit \\| $\ln\!\frac{\mu}{1-\mu}$ \\| $\frac{e^\eta}{1+e^\eta}$ \\| Binomial (binary outcomes) \\|” |
| The normal distribution is suited to continuous, unbounded responses, not to binary outcomes. | fact | linked | Response Variable: “**Continuous, roughly symmetric, constant variance** — Normal with the identity link: ordinary [[Li…” |

</details>

<details><summary><code>srm-008</code> · answerable</summary>

Tagged pages: Variable Selection, Model Selection, Bias-Variance Tradeoff

| Item | Kind | Status | Where |
|---|---|---|---|
| Subset selection (e.g., forward, backward, best subset) is a procedure that fits a model using only a chosen subset of the available predic… | definition | tagged | Variable Selection: “Start with all predictors (needs $n > p$); at each step remove the least useful one; choose among t…” |
| Subset selection tends to remove irrelevant predictors, yielding a simpler model with fewer variables. | fact | tagged | Variable Selection: “Start with all predictors (needs $n > p$); at each step remove the least useful one” |
| A model with fewer predictors is easier to interpret. | fact | tagged | Variable Selection: “**Variable Selection** is the process of choosing which predictors to include in a model's [[Model …” |
| Removing irrelevant predictors reduces the variance of the fitted model, which can improve prediction accuracy. | fact | tagged | Variable Selection: “Selecting too few variables causes underfitting (high bias); selecting too many causes overfitting …” |

</details>

<details><summary><code>srm-009</code> · answerable</summary>

Tagged pages: Classification Tree, Gini Index, Decision Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| For a two-class node with class proportions p and 1-p, the Gini index is 2p(1-p) (in general, the sum over classes of p_k(1-p_k)). | formula | tagged | Classification Tree: “$$G = \sum_{k=1}^{K}\hat{p}_{mk}\left(1 - \hat{p}_{mk}\right)$$” |
| The entropy of a node is -sum over classes of p_k ln(p_k), where p_k is the proportion of observations in class k. | formula | tagged | Classification Tree: “$$D = -\sum_{k=1}^{K}\hat{p}_{mk}\ln\hat{p}_{mk}$$” |
| The total impurity (Gini or entropy) after a split is the weighted average of the node impurities, weighted by the number of observations i… | procedure | tagged | Classification Tree: “A split is scored by the observation-weighted impurity of its two children.” |
| When comparing splits, the split with the smaller total Gini index or entropy (lower impurity) is preferred. | fact | linked | Node Impurity: “The tree grows by choosing, at each step, the split that reduces it most.” |
| Classification errors for a split are counted by predicting the majority class in each node, so each node's errors equal the number of obse… | procedure | tagged | Classification Tree: “For two classes $G = 2\hat{p}(1-\hat{p})$ and $E = \min(\hat{p}, 1-\hat{p})$.” |

</details>

<details><summary><code>srm-010</code> · answerable</summary>

Tagged pages: Random Forest, Bagging, Hyperparameter

| Item | Kind | Status | Where |
|---|---|---|---|
| A random forest chooses a new random subset of predictors at each split of each tree, rather than one subset for the whole tree. | fact | tagged | Random Forest: “at *each split*, only a random subset of $m$ predictors is eligible.” |
| A random forest with the number of predictors considered at each split equal to the total number of predictors is equivalent to bagging. | fact | tagged | Random Forest: “$m = p$ **is** bagging — bagging is the special case, not a different algorithm” |
| Restricting each split to a random subset of predictors decorrelates the trees, so averaging them reduces variance more than bagging does, … | fact | tagged | Random Forest: “That decorrelates the trees, so averaging removes more variance than bagging can.” |

</details>

<details><summary><code>srm-011</code> · answerable</summary>

Tagged pages: Residual Sum of Squares, Linear Regression, Fitted Values

| Item | Kind | Status | Where |
|---|---|---|---|
| The sum of squared errors is SSE = Σ (y_i − f̂(x_i))², the sum over observations of squared differences between observed values and model p… | formula | tagged | Residual Sum of Squares: “The **Residual Sum of Squares (RSS)** (also called the **Sum of Squared Errors, SSE**) measures the…” |
| A residual is the observed response minus the fitted (predicted) value, e_i = y_i − f̂(x_i). | definition | linked | Residual: “A **residual** is the part of an observation a fitted model does not explain: the observed value mi…” |
| A sum of squared errors is a sum of squares and can never be negative. | fact | tagged | Residual Sum of Squares: “The **Residual Sum of Squares (RSS)** (also called the **Sum of Squared Errors, SSE**) measures the…” |

</details>

<details><summary><code>srm-012</code> · answerable</summary>

Tagged pages: Statistical Learning, Bias-Variance Tradeoff, Interpretability, Regularization, Bagging

| Item | Kind | Status | Where |
|---|---|---|---|
| Model flexibility is the ability of a method to fit a wide range of possible functional forms; a method restricted to a specific form (such… | definition | linked | Smoothing Spline: “Higher $df_\lambda$ means a more flexible fit, with lower bias and higher variance.” |
| Linear regression is a relatively inflexible (low flexibility) approach because it restricts the model to a linear form. | fact | tagged | Bias-Variance Tradeoff: “is error from the model being too rigid to represent the truth (a straight line through a curved re…” |
| The lasso is a constrained, less flexible version of linear regression: the penalty shrinks coefficients and selects a subset of variables,… | fact | tagged | Regularization: “**Lasso** ($\ell_1$) sets some coefficients exactly to zero, so it performs [[Variable Selection]] …” |
| Bagging, which averages many trees fit to bootstrap samples, is a more flexible approach than a single model and is not low flexibility. | fact | tagged | Bagging: “The trees are grown **deep and unpruned**: bagging handles the variance, so each tree is left to ha…” |
| There is a tradeoff between flexibility and interpretability: more flexible methods are generally harder to interpret, so no method is both… | fact | tagged | Statistical Learning: “**Prediction**: minimize test error; interpretability may be sacrificed” |

</details>

<details><summary><code>srm-013</code> · answerable</summary>

Tagged pages: Prediction Interval, Confidence Interval, Linear Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| A confidence interval in regression estimates the mean response E(y \| x) at a given x, reflecting only uncertainty in the estimated coeffi… | definition | tagged | Confidence Interval: “A **Confidence Interval** is a range computed from a sample that covers the unknown parameter with …” |
| A prediction interval in regression gives a range for an individual new observation y at a given x, and includes both the estimation uncert… | definition | tagged | Prediction Interval: “A **prediction interval** is a range that will contain a *future observation*, such as next quarter…” |
| The prediction interval is always at least as wide as the confidence interval at the same x and level, because its variance adds the error … | fact | tagged | Prediction Interval: “Both are centred on the fitted line, and because of the $(x_0 - \bar{x})^2$ term both are narrowest…” |

</details>

<details><summary><code>srm-014</code> · gap</summary>

Tagged pages: Variable Transformation, Heteroscedasticity, Ordinary Least Squares, Model Diagnostics

| Item | Kind | Status | Where |
|---|---|---|---|
| When residual variance increases with the fitted values (heteroscedasticity), transforming the dependent variable can make the variance mor… | fact | tagged | Heteroscedasticity: “Residual variances that are not constant over the triangle call for weighted least squares, with we…” |
| When the dependent variable can be zero, add a constant (e.g. one) before taking the logarithm, since the log of zero is undefined (negativ… | procedure | missing |  |
| Power transformations of the dependent variable with power less than one, such as the square root, can reduce increasing variance of residu… | fact | missing |  |
| The logit transformation, ln(p/(1-p)), is defined only for values strictly between 0 and 1. | definition | missing |  |

</details>

<details><summary><code>srm-015</code> · answerable</summary>

Tagged pages: K-Means Clustering, Clustering

| Item | Kind | Status | Where |
|---|---|---|---|
| In K-means clustering, each cluster's centroid is computed as the coordinate-wise mean of the data points currently assigned to that cluste… | procedure | tagged | K-Means Clustering: “2. **Update**: compute each cluster centroid as the mean of its assigned observations” |
| In each K-means iteration, after computing centroids, every observation is reassigned to the cluster whose centroid is nearest by Euclidean… | procedure | tagged | K-Means Clustering: “3. **Assign**: assign each observation to the nearest centroid (by Euclidean distance)” |
| The Euclidean distance between points (x1, y1) and (x2, y2) is sqrt((x1-x2)^2 + (y1-y2)^2). | formula | linked | Similarity and Distance Measures: “d_{\text{Euc}}(\mathbf{u}, \mathbf{v}) = \sqrt{\sum_{j=1}^{p} (u_j - v_j)^2}” |

</details>

<details><summary><code>srm-016</code> · answerable</summary>

Tagged pages: K-Means Clustering, Hierarchical Clustering, Clustering

| Item | Kind | Status | Where |
|---|---|---|---|
| K-means clustering begins by randomly assigning each observation to one of K clusters, then iterates by computing cluster centroids and rea… | procedure | tagged | K-Means Clustering: “1. **Initialize**: randomly assign each observation to one of $K$ clusters” |
| Because K-means starts from a random initial assignment, different runs on the same data can produce different clusterings, so results may … | fact | tagged | K-Means Clustering: “The algorithm is guaranteed to **converge** but may reach a **local minimum** — run multiple times …” |
| In K-means the number of clusters K is specified in advance and remains fixed across iterations, so the algorithm must be rerun if a differ… | fact | tagged | K-Means Clustering: “**K-Means Clustering** is a partition-based [[Clustering]] algorithm that partitions $n$ observatio…” |
| Agglomerative hierarchical clustering starts with each observation as its own cluster and successively fuses the closest pair of clusters, … | procedure | tagged | Hierarchical Clustering: “Agglomerative clustering starts with every observation in its own cluster and repeatedly fuses the …” |
| Hierarchical clustering is run once and produces a dendrogram; any number of clusters can be obtained by cutting the dendrogram at the appr… | fact | tagged | Hierarchical Clustering: “No $K$ is chosen in advance — the number of clusters is decided *afterwards* by choosing a height a…” |

</details>

<details><summary><code>srm-018</code> · answerable</summary>

Tagged pages: R-Squared, Residual Sum of Squares, Linear Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| The total sum of squares (TSS) is the sum of squared deviations of the observed responses from their mean, measuring total variability in t… | definition | tagged | Residual Sum of Squares: “$\text{SS}_{\text{Tot}} = \text{SS}_{\text{Reg}} + \text{RSS}$, where $\text{SS}_{\text{Tot}} = \su…” |
| The residual sum of squares (RSS) is the sum of squared residuals, the sum over observations of (y_i - fitted y_i)^2, measuring variability… | definition | tagged | Residual Sum of Squares: “measures the total unexplained variability in a regression model — the sum of squared differences b…” |
| The coefficient of determination is R^2 = 1 - RSS/TSS, the proportion of total variability explained by the regression. | formula | tagged | Linear Regression: “Fit is summarized by [[R-Squared]] $= 1 - \text{RSS}/\text{SS}_{\text{Tot}}$, with $\hat\sigma^2 = …” |

</details>

<details><summary><code>srm-019</code> · untagged</summary>

Tagged pages: Likelihood Ratio Test, Model Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| The likelihood ratio test statistic is twice the difference between the maximized log-likelihood of the larger (unrestricted) model and tha… | formula | tagged | Likelihood Ratio Test: “$$-2\ln\Lambda = 2\left[\ell(\hat\theta) - \ell(\hat\theta_0)\right] \ \dot\sim\ \chi^2_{r}$$” |
| Under the null hypothesis, the likelihood ratio statistic follows a chi-square distribution with degrees of freedom equal to the number of … | fact | tagged | Likelihood Ratio Test: “$r$ is the number of **restrictions** — the difference in free parameters between the full and redu…” |
| To test whether all slope coefficients are zero, compare the full model with the intercept-only model, ignoring intermediate models; reject… | procedure | tagged | Likelihood Ratio Test: “Reject $H_0$ (the reduced model) when $-2\ln\Lambda$ exceeds the upper-$\alpha$ point of $\chi^2_r$” |
| The 95th percentile of the chi-square distribution with 3 degrees of freedom is about 7.81. | fact | elsewhere | Chi-Square Goodness-of-Fit Test (collapsed): “the critical value is $\chi^2_{0.05,\,3} = 7.81$” |

</details>

<details><summary><code>srm-020</code> · gap</summary>

Tagged pages: Generalized Linear Model, Logistic Regression, Link Function

| Item | Kind | Status | Where |
|---|---|---|---|
| A simple linear model for a binary or probability response can produce predicted values below 0 or above 1, so it is unsuitable for modelin… | fact | tagged | Logistic Regression: “the identity link is unbounded, so predictions leave $[0,1]$” |
| The logit function, ln(p/(1-p)), is a link function that maps probabilities in (0,1) to the real line, so its inverse (the logistic functio… | definition | tagged | Logistic Regression: “the **logit** [[Link Function]] maps the probability $\pi \in (0,1)$ onto the whole real line, so t…” |
| The canonical link function for the Poisson distribution is the natural logarithm, which does not restrict predictions to the interval 0 to… | fact | tagged | Generalized Linear Model: “\\| Count \\| Poisson \\| Log: $g(\mu) = \ln\mu$ \\|” |
| Removing observations or truncating/altering predicted values to force them into a range is inappropriate because it biases the model estim… | fact | missing |  |

</details>

<details><summary><code>srm-021</code> · answerable</summary>

Tagged pages: Stationarity, Random Walk, Time Series

| Item | Kind | Status | Where |
|---|---|---|---|
| A time series is stationary in the mean if E(y_t) is constant over time, and stationary in the variance if Var(y_t) is constant over time; … | definition | tagged | Stationarity: “A [[Time Series]] is **(weakly) stationary** when its mean, variance and autocovariances do not dep…” |
| A random walk y_t = y_{t-1} + c_t equals the starting value plus the sum of the independent increments c_1,...,c_t. | fact | tagged | Random Walk: “$$Y_t = Y_{t-1} + \varepsilon_t = Y_0 + \sum_{i=1}^{t}\varepsilon_i$$” |
| For a random walk with increment mean μ_c and variance σ_c^2, E(y_t) = y_0 + t·μ_c. | formula | tagged | Random Walk: “A **random walk with drift**, $Y_t = \delta + Y_{t-1} + \varepsilon_t$, adds a linear trend of slop…” |
| For a random walk with increment variance σ_c^2 and independent increments, Var(y_t) = t·σ_c^2, which grows linearly in t when σ_c^2 > 0. | formula | tagged | Random Walk: “$$\mathrm{Var}(Y_t) = t\sigma^{2}, \qquad \mathrm{Corr}(Y_t, Y_{t+k}) = \sqrt{\frac{t}{t+k}}$$” |
| A random walk is nonstationary in the mean when the increment mean is nonzero, and nonstationary in the variance whenever the increment var… | fact | tagged | Random Walk: “A **random walk with drift**, $Y_t = \delta + Y_{t-1} + \varepsilon_t$, adds a linear trend of slop…” |

</details>

<details><summary><code>srm-022</code> · answerable</summary>

Tagged pages: Autoregressive Model, Stationarity, Time Series

| Item | Kind | Status | Where |
|---|---|---|---|
| An autoregressive model of order one, AR(1), has the form y_t = beta_0 + beta_1 y_{t-1} + epsilon_t, so the only predictor of y_t is the im… | definition | tagged | Autoregressive Model: “$$Y_t = c + \phi_1 Y_{t-1} + \cdots + \phi_p Y_{t-p} + \varepsilon_t$$” |
| An AR(1) model is stationary if and only if the absolute value of beta_1 is less than 1; the intercept beta_0 can be any value and does not… | fact | tagged | Autoregressive Model: “- [[Stationarity]] requires all roots of $\phi(B) = 0$ **outside** the unit circle; for AR(1) that …” |
| A white noise process is a series of independent, identically distributed (mean-zero) error terms with constant variance and no dependence … | definition | linked | White Noise: “**White noise** is a [[Time Series]] of uncorrelated, mean-zero, constant-variance terms.” |
| A random walk is a time series in which each value equals the previous value plus white noise, y_t = y_{t-1} + epsilon_t (with an optional … | definition | tagged | Stationarity: “An AR(1) $Y_t = \phi Y_{t-1} + \varepsilon_t$ is stationary exactly when $\lvert\phi\rvert < 1$; at…” |

</details>

<details><summary><code>srm-023</code> · gap</summary>

Tagged pages: Ordinary Least Squares, Linear Regression, Fitted Values

| Item | Kind | Status | Where |
|---|---|---|---|
| In simple linear regression by least squares, the slope estimate is b1 = Σ(xi − x̄)(yi − ȳ) / Σ(xi − x̄)² and the intercept is b0 = ȳ − b1·… | formula | tagged | Ordinary Least Squares: “$\hat\beta_1 = S_{xy}/S_{xx}$ and $\hat\beta_0 = \bar{y} - \hat\beta_1\bar{x}$, where $S_{xy} = \su…” |
| If all data points lie exactly on a straight line, the least squares regression line is that line (residuals are zero). | fact | missing |  |
| To predict a response for a new value of the predictor, substitute it into the fitted regression equation ŷ = b0 + b1x. | procedure | tagged | Ordinary Least Squares (collapsed): “\hat{y}_6 &= 9.37 + 0.61(6)” |

</details>

<details><summary><code>srm-024</code> · answerable</summary>

Tagged pages: R-Squared, F-Distribution, Residual Sum of Squares

| Item | Kind | Status | Where |
|---|---|---|---|
| The regression F statistic is F = [(TSS − RSS)/p] / [RSS/(n − p − 1)], where p is the number of predictors (excluding the intercept) and n … | formula | tagged | R-Squared: “So $F = \dfrac{(\text{SS}_\text{Tot} - \text{SS}_\text{Res})/p}{\text{SS}_\text{Res}/(n-p-1)}$” |
| R² = 1 − RSS/TSS, the proportion of total variability explained by the regression. | formula | tagged | Residual Sum of Squares: “[[R-Squared]] $= 1 - \text{RSS}/\text{SS}_{\text{Tot}}$” |
| R² and F depend only on the ratio RSS/TSS (together with n and p), so R² can be computed from F, n and p without knowing RSS or TSS individ… | fact | tagged | R-Squared: “and dividing the top and bottom by $\text{SS}_\text{Tot}$ gives $F = \dfrac{R^2/p}{(1 - R^2)/(n - p…” |

</details>

<details><summary><code>srm-025</code> · answerable</summary>

Tagged pages: Tree Pruning, Overfitting, Decision Tree, Bias-Variance Tradeoff

| Item | Kind | Status | Where |
|---|---|---|---|
| Recursive binary splitting is a greedy top-down method that fits the training data closely, so it can grow an overly complex tree that over… | fact | tagged | Decision Tree: “Decision trees are **highly interpretable** but have high variance — small data changes can produce…” |
| A decision tree with more splits is more complex, giving lower bias but higher variance; smaller trees have lower variance but higher bias. | fact | tagged | Tree Pruning: “Pruning is the single-tree answer to variance” |
| In cost complexity pruning, the tuning parameter alpha penalizes the number of terminal nodes; when alpha = 0 there is no penalty, so the s… | fact | tagged | Tree Pruning: “$\alpha = 0$ keeps the full tree; raising $\alpha$ makes leaves progressively too expensive, collap…” |

</details>

<details><summary><code>srm-026</code> · answerable</summary>

Tagged pages: Classification Tree, Decision Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| A classification tree partitions the predictor space into rectangular regions by recursive binary splits, each made with a single predictor… | fact | tagged | Decision Tree: “partitions the predictor space into rectangular regions by applying a sequence of binary splits, th…” |
| Each split of a tree divides one existing region into two parts, so a class pattern can be modeled with no error only if it can be built by… | fact | tagged | Decision Tree: “partitions the predictor space into rectangular regions by applying a sequence of binary splits, th…” |

</details>

<details><summary><code>srm-027</code> · answerable</summary>

Tagged pages: p-Value, Variable Selection, Hypothesis Testing, Linear Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| The p-value of a regression coefficient's t-test is the probability, under the null hypothesis that the coefficient is zero, of observing a… | definition | tagged | p-Value: “A **p-Value** is the probability, computed assuming the null hypothesis is true, of observing a tes…” |
| To test whether a predictor is significant in a linear regression, compare its coefficient's p-value to the significance level; if the p-va… | procedure | tagged | p-Value: “It converts any test statistic onto a common $0$–$1$ scale: reject $H_0$ when the p-value falls bel…” |

</details>

<details><summary><code>srm-029</code> · gap</summary>

Tagged pages: Decision Tree, Interpretability, Statistical Learning

| Item | Kind | Status | Where |
|---|---|---|---|
| Decision trees are easy to interpret because their splitting rules form simple if-then decision rules that can be followed directly. | fact | tagged | Decision Tree: “Decision trees are **highly interpretable** but have high variance — small data changes can produce…” |
| Decision trees can be displayed graphically as a tree diagram, which makes them easy to read even for non-experts. | fact | missing |  |
| Decision trees are generally considered easier to explain to people than linear regression models, and they may more closely mirror human d… | fact | tagged | Interpretability: “and that a small tree can be easier to follow than a large linear model” |

</details>

<details><summary><code>srm-030</code> · answerable</summary>

Tagged pages: Principal Components Analysis, Unsupervised Learning

| Item | Kind | Status | Where |
|---|---|---|---|
| Principal component loadings are not unique: each loading vector is determined only up to a sign flip. | fact | tagged | Principal Components Analysis: “$\boldsymbol{\phi}_m$ is the $m$-th **loading vector** (eigenvector of the covariance matrix $\math…” |
| PCA constrains each principal component's loading vector so that the sum of squares of its loadings equals one; without this constraint the… | fact | tagged | Principal Components Analysis: “$$\boldsymbol{\phi}_1 = \arg\max_{\\\|\boldsymbol{\phi}\\\|=1} \text{Var}(\mathbf{X}\boldsymbol{\phi}…” |
| With p variables and at least p observations, the p principal components together explain 100% of the total variance in the data. | fact | syllabus | Proportion of Variance Explained: “the cumulative curve rises to 1 at the last component, $m = \min(n-1, p)$” |

</details>

<details><summary><code>srm-031</code> · answerable</summary>

Tagged pages: Random Walk, Differencing, Stationarity, Time Series

| Item | Kind | Status | Where |
|---|---|---|---|
| A random walk is a nonstationary time series in which each observation equals the previous observation plus a white noise term, so its firs… | definition | tagged | Random Walk: “A **random walk** is the non-stationary series whose change at each step is [[White Noise\\|white no…” |
| A random walk exhibits a (apparent) trend in time and variability that increases over time, which shows up in a control chart of the series. | fact | tagged | Random Walk: “The variance grows **without bound** in $t$, so the series is not [[Stationarity\\|stationary]] and …” |
| Differencing a series (taking changes between consecutive observations) removes the trend and stabilizes the variance; if the differenced s… | procedure | tagged | Differencing: “**Differencing** replaces a [[Time Series]] by its period-to-period changes. It is the standard rou…” |
| For a random walk, the standard deviation of the original series exceeds that of the differenced series, because trend and growing variance… | fact | tagged | Random Walk: “The variance grows **without bound** in $t$, so the series is not [[Stationarity\\|stationary]] and …” |
| A white noise process is a sequence of uncorrelated random variables with constant mean (zero) and constant variance. | definition | linked | White Noise: “**White noise** is a [[Time Series]] of uncorrelated, mean-zero, constant-variance terms.” |

</details>

<details><summary><code>srm-032</code> · gap</summary>

Tagged pages: Clustering, Unsupervised Learning

| Item | Kind | Status | Where |
|---|---|---|---|
| Clustering is a set of techniques for finding homogeneous subgroups among observations (or features) in a data set, so that members of a gr… | definition | tagged | Clustering: “**Clustering** is an unsupervised [[Statistical Learning]] technique that groups observations into …” |
| Clustering is unsupervised learning because there is no response (target) variable, and it is often used in exploratory data analysis. | fact | tagged | Clustering: “There is no response variable $Y$ — the goal is to discover structure in $\mathbf{X}$.” |
| Clustering can be applied either to observations (rows) using the features, or to features (columns) using the observations, since the role… | fact | missing |  |

</details>

<details><summary><code>srm-033</code> · answerable</summary>

Tagged pages: Regression Tree, Decision Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| To predict with a regression tree, start at the root and follow each split's condition (true goes to one branch, false to the other) for th… | procedure | tagged | Regression Tree (collapsed): “Each prediction follows the splits to a leaf and returns that leaf's training mean.” |
| The predicted response for an observation in a regression tree is the value at its leaf, which is the mean response of the training observa… | fact | tagged | Regression Tree: “every observation that falls in region $R_j$ is predicted by the mean response $\hat{y}_{R_j}$ of t…” |
| Each internal node of a regression tree splits on a predictor and a cutoff (e.g. x < c), dividing observations into two branches based on w… | definition | tagged | Regression Tree: “a split on predictor $X_j$ at cutpoint $s$ sends $R_1(j,s) = \{X \mid X_j < s\}$ to one branch and …” |

</details>

<details><summary><code>srm-034</code> · answerable</summary>

Tagged pages: Hierarchical Clustering, K-Means Clustering, Linkage, Clustering

| Item | Kind | Status | Where |
|---|---|---|---|
| K-means clustering begins with a random initial assignment of observations to clusters and converges only to a local optimum, so different … | fact | tagged | K-Means Clustering: “The algorithm is guaranteed to **converge** but may reach a **local minimum** — run multiple times …” |
| Hierarchical clustering is deterministic: given the data, a linkage and a dissimilarity measure, it produces the same dendrogram, so cuttin… | fact | tagged | Hierarchical Clustering: “**Deterministic**: unlike [[K-Means Clustering]] there is no random initialization, so the same dat…” |
| Hierarchical clustering (cutting a dendrogram) and K-means use different algorithms, so for the same number of clusters they need not produ… | fact | tagged | Hierarchical Clustering: “No $K$ is chosen in advance — the number of clusters is decided *afterwards* by choosing a height a…” |

</details>

<details><summary><code>srm-035</code> · answerable</summary>

Tagged pages: Proportion of Variance Explained, Principal Components Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| A scree plot graphs the proportion of variance explained (or eigenvalue) by each principal component against the component number, in decre… | definition | tagged | Proportion of Variance Explained: “PVE is **decreasing in $m$** by construction, and the cumulative curve rises to 1 at the last compo…” |
| The cumulative proportion of variance explained by the first k principal components is the sum of the individual proportions of variance ex… | fact | tagged | Proportion of Variance Explained: “$$\text{cumulative: } \sum_{m=1}^{M}\mathrm{PVE}_m$$” |
| To choose the number of principal components needed to reach a target share of variance, add components in order of decreasing variance exp… | procedure | tagged | Proportion of Variance Explained: “Cumulative: 45%, 68.75%, **81.25%** — **three components** clear 80%, cutting eight variables to th…” |

</details>

<details><summary><code>srm-036</code> · answerable</summary>

Tagged pages: Hierarchical Clustering, Dendrogram, Clustering

| Item | Kind | Status | Where |
|---|---|---|---|
| Hierarchical clustering assigns every observation to a cluster, so extreme outliers are not left unassigned (unlike methods that allow nois… | fact | tagged | Clustering: “3. Repeat until all observations are in one cluster” |
| A dendrogram can be cut at different heights to obtain any desired number of clusters, so a single dendrogram yields clusterings with diffe… | fact | tagged | Hierarchical Clustering: “No $K$ is chosen in advance — the number of clusters is decided *afterwards* by choosing a height a…” |
| Clustering methods, including hierarchical clustering, have high variance and are not robust: small changes in the data or a different samp… | fact | tagged | Clustering: “Whether they would reappear in an independent sample is a hard question, so clusters used as [[Data…” |

</details>

<details><summary><code>srm-037</code> · untagged</summary>

Tagged pages: Principal Components Analysis, Unsupervised Learning

| Item | Kind | Status | Where |
|---|---|---|---|
| Principal component loading vectors are unique only up to a sign flip: flipping the signs of all loadings in a component yields an equivale… | fact | elsewhere | Loading Vector: “**Sign is arbitrary**: $\boldsymbol{\phi}_m$ and $-\boldsymbol{\phi}_m$ describe the same component…” |
| Flipping the sign of only some loadings in a component (not all of them) does not give an equivalent principal component loading vector, so… | fact | elsewhere | Loading Vector: “**Sign is arbitrary**: $\boldsymbol{\phi}_m$ and $-\boldsymbol{\phi}_m$ describe the same component…” |
| Whether variables are scaled to unit standard deviation before PCA changes the resulting loadings, so programs with different default scali… | fact | tagged | Principal Components Analysis: “PCA requires **standardizing** predictors (subtract mean, divide by SD) when variables are on diffe…” |

</details>

<details><summary><code>srm-038</code> · answerable</summary>

Tagged pages: Random Walk, Time Series, Stationarity

| Item | Kind | Status | Where |
|---|---|---|---|
| A linear trend in time model has the form y_t = β0 + β1 t + ε_t, where the deterministic trend is linear in t and the errors ε_t are white … | definition | linked | Deterministic and Stochastic Trend: “\text{deterministic: } Y_t = \alpha + \beta t + z_t, \quad z_t \text{ stationary}” |
| A random walk with drift is y_t = y_0 + μ_c t + u_t, where u_t is the cumulative sum of white noise terms, equivalent to y_t = y_{t-1} + μ_… | definition | tagged | Random Walk: “A **random walk with drift**, $Y_t = \delta + Y_{t-1} + \varepsilon_t$, adds a linear trend of slop…” |
| A random walk with drift and a linear trend in time model both have a linear trend component in expected value, differing only in the error… | fact | tagged | Random Walk: “A **random walk with drift**, $Y_t = \delta + Y_{t-1} + \varepsilon_t$, adds a linear trend of slop…” |

</details>

<details><summary><code>srm-039</code> · untagged</summary>

Tagged pages: Random Forest, Generalized Linear Model, Decision Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| A linear model (including a GLM) only needs to be linear in the coefficients, not in the predictors, so polynomial terms such as x and x^2 … | fact | elsewhere | Polynomial Regression: “**Polynomial Regression** extends [[Linear Regression]] to a non-linear relationship by adding powe…” |
| Linear models and GLMs assume (for ordinary least squares) constant variance of the response given the predictors (homoscedasticity), which… | fact | linked | Linear Regression: “The four assumptions — **linearity, independence, constant variance, normality of errors** — are ex…” |
| Decision trees and random forests handle nonlinear relationships but are not preferred merely because predictors are quantitative; they ten… | fact | linked | Regression Tree: “A single tree has high variance, however, and a linear model predicts better when the true relation…” |

</details>

<details><summary><code>srm-040</code> · answerable</summary>

Tagged pages: Clustering, Dendrogram, Hierarchical Clustering, K-Means Clustering

| Item | Kind | Status | Where |
|---|---|---|---|
| In a dendrogram, the height at which clusters fuse indicates dissimilarity: at the lowest height each observation is its own cluster, and c… | fact | tagged | Dendrogram: “Height is the only thing that means anything.** The lower two observations fuse, the more similar t…” |
| K-means clustering takes the number of clusters K as a pre-specified input and assigns observations to clusters by iteratively minimizing w… | procedure | tagged | K-Means Clustering: “1. **Initialize**: randomly assign each observation to one of $K$ clusters” |
| Hierarchical clustering produces nested clusters, so the clusters at a given number are tied to those already formed, whereas K-means perfo… | fact | tagged | Hierarchical Clustering: “**Deterministic**: unlike [[K-Means Clustering]] there is no random initialization, so the same dat…” |

</details>

<details><summary><code>srm-041</code> · gap</summary>

Tagged pages: Random Forest, Bagging, Hyperparameter

| Item | Kind | Status | Where |
|---|---|---|---|
| A random forest builds many trees on bootstrap samples, considering only a random subset of m of the p features at each split, which decorr… | definition | tagged | Random Forest: “A **random forest** is [[Bagging\\|bagged]] [[Decision Tree\\|trees]] with one extra step: at *each s…” |
| Bagging is the special case of a random forest with m = p, so every split considers all predictors; random forests proper use m < p. | fact | tagged | Random Forest: “$m = p$ **is** bagging — bagging is the special case, not a different algorithm” |
| With m of p predictors chosen at random at each split, the probability that a given predictor (such as the strongest) is not among those co… | fact | missing |  |
| Typical choices for the number of features per split in a random forest are m = sqrt(p) for classification and m = p/3 for regression, not … | fact | tagged | Random Forest: “$$m \approx \sqrt{p} \ \text{(classification)}, \qquad m \approx p/3 \ \text{(regression)}$$” |

</details>

<details><summary><code>srm-042</code> · gap</summary>

Tagged pages: Logistic Regression, Generalized Linear Model, Link Function, Heteroscedasticity

| Item | Kind | Status | Where |
|---|---|---|---|
| The linear probability model for a binary response has three main drawbacks: fitted values can fall outside [0,1] (poor fitted values), het… | fact | tagged | Logistic Regression (collapsed): “Why Not Ordinary Regression? {Example}” |
| Logistic and probit regression use a link function that maps the linear predictor into (0,1), which avoids the drawbacks of the linear prob… | fact | tagged | Logistic Regression: “the **logit** [[Link Function]] maps the probability $\pi \in (0,1)$ onto the whole real line, so t…” |
| The logit (logistic) function is π(z) = e^z / (1 + e^z). | formula | tagged | Logistic Regression: “$$\pi = \frac{e^{\eta}}{1 + e^{\eta}} = \frac{1}{1 + e^{-\eta}}$$” |
| The probit function is π(z) = Φ(z), where Φ is the standard normal cumulative distribution function. | formula | tagged | Link Function: “\\| Probit \\| $\Phi^{-1}(\mu)$ \\| $\Phi(\eta)$ \\| Binary outcomes \\|” |
| The logit and probit functions are very similar in shape and give similar fitted results; they are not substantially different. | fact | missing |  |

</details>

<details><summary><code>srm-043</code> · answerable</summary>

Tagged pages: Clustering, Unsupervised Learning, Principal Components Analysis, K-Means Clustering

| Item | Kind | Status | Where |
|---|---|---|---|
| Clustering is an unsupervised learning method that discovers structure in data by finding homogeneous subgroups among observations, without… | definition | tagged | Clustering: “**Clustering** is an unsupervised [[Statistical Learning]] technique that groups observations into …” |
| Principal components analysis, not clustering, is the unsupervised technique used to reduce the dimensionality of a dataset while retaining… | fact | tagged | Unsupervised Learning: “The two MAS-II syllabus methods: [[Principal Components Analysis]] (find a few directions that carr…” |
| K-means clustering requires the number of clusters K to be specified in advance. | fact | tagged | Clustering: “\\| **Partition-based** \\| [[K-Means Clustering]] \\| Requires $K$ prespecified; minimizes within-clu…” |

</details>

<details><summary><code>srm-044</code> · answerable</summary>

Tagged pages: Hypothesis Testing, F-Distribution, Linear Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| An intercept-only regression model (no predictors) has fitted values equal to the sample mean, so its residual sum of squares equals the to… | fact | linked | Residual Sum of Squares: “- For [[Decision Tree]] regression, RSS is the split criterion” |
| The F-statistic for comparing a restricted model to a larger model is F = [(RSS_restricted − RSS_full)/q] / [RSS_full/(n − p − 1)], where q… | formula | linked | R-Squared: “So $F = \dfrac{(\text{SS}_\text{Tot} - \text{SS}_\text{Res})/p}{\text{SS}_\text{Res}/(n-p-1)}$” |
| The F-statistic has numerator degrees of freedom equal to the number of added predictors (q) and denominator degrees of freedom equal to n … | fact | tagged | F-Distribution: “dropping $q$ of the $p$ predictors from a [[Linear Regression\\|linear regression]] fitted to $n$ ob…” |

</details>

<details><summary><code>srm-045</code> · answerable</summary>

Tagged pages: Generalized Linear Model, Link Function, Fitted Values

| Item | Kind | Status | Where |
|---|---|---|---|
| In a GLM with a log link, the expected response equals the exponential of the linear predictor (the inverse of the log link is exp). | fact | tagged | Link Function: “\\| Log \\| $\ln\mu$ \\| $e^\eta$ \\| Poisson (counts), Gamma (severity) \\|” |
| To compute a GLM prediction, sum the intercept and each coefficient multiplied by its predictor value, including an interaction term's coef… | procedure | tagged | Generalized Linear Model: “$$= \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$” |

</details>

<details><summary><code>srm-046</code> · gap</summary>

Tagged pages: Exponential Smoothing, Time Series Forecast, Time Series

| Item | Kind | Status | Where |
|---|---|---|---|
| Exponential smoothing recursion: s_t = (1-w) y_t + w s_{t-1}, where w is the smoothing weight on the prior smoothed value. | formula | tagged | Exponential Smoothing: “$$\hat{Y}_{t+1} = \alpha Y_t + (1-\alpha)\hat{Y}_t, \qquad 0 < \alpha < 1$$” |
| With simple exponential smoothing, the forecast for any future time is the current smoothed value s_T (a flat forecast regardless of horizo… | fact | tagged | Exponential Smoothing: “**Simple** smoothing has a flat $h$-step forecast — it assumes no trend, and is the optimal forecas…” |
| Double exponential smoothing computes a second smoothed series by applying the smoothing recursion to the first smoothed series: s_t^(2) = … | formula | missing |  |
| In double exponential smoothing the trend estimate is b_T = ((1-w)/w)(s_T^(1) - s_T^(2)). | formula | missing |  |
| In double exponential smoothing the level (intercept) at time T is a_T = 2 s_T^(1) - s_T^(2). | formula | missing |  |
| The double exponential smoothing forecast l steps ahead is the level plus the trend times l: ŷ_{T+l} = a_T + b_T · l. | formula | missing |  |

</details>

<details><summary><code>srm-048</code> · answerable</summary>

Tagged pages: Decision Tree, Regression Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| In a regression tree built by recursive binary splitting, each internal node tests a predictor against a threshold, and each split divides … | definition | tagged | Decision Tree: “A **Decision Tree** is a [[Statistical Learning]] method that partitions the predictor space into r…” |
| To draw a tree as a partition plot, a split on a predictor at a threshold is drawn as a line perpendicular to that predictor's axis (e.g., … | procedure | tagged | Regression Tree (collapsed): “ISLR sends $X_j < s$ to the left. An observation exactly at the cutpoint goes to the branch for $X_…” |
| Splits made after an earlier split apply only within the region produced by that branch, so a later split's line extends only across that s… | fact | tagged | Regression Tree (collapsed): “Any cutpoint between 4 and 6 gives the same split, and the urban indicator is considered again insi…” |

</details>

<details><summary><code>srm-049</code> · answerable</summary>

Tagged pages: Confidence Interval, Prediction Interval, Linear Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| A confidence interval for the response at a given set of predictors is an interval estimate of the expected value (mean response) E[y\|x], … | definition | tagged | Prediction Interval: “The confidence interval for the mean response $E(Y)$ at $x_0$ is $\hat{y}_0 \pm t_{\alpha/2,\,n-2}\…” |
| A prediction interval for the response at a given set of predictors is an interval for an individual new observation y, reflecting both est… | definition | tagged | Prediction Interval: “**A prediction interval** is a range that will contain a *future observation*, such as next quarter…” |
| As the sample size grows without bound, the estimation error in the fitted mean response goes to zero, so the width of the confidence inter… | fact | tagged | Confidence Interval: “Width shrinks like $1/\sqrt{n}$ and grows with confidence” |
| The width of a prediction interval does not shrink to zero as the sample size grows, because the irreducible error variance of a new observ… | fact | tagged | Prediction Interval: “The "$1 +$" is the new observation's own noise. It is why a prediction interval does not shrink to …” |
| For the same predictors and confidence level, a prediction interval is always wider than the confidence interval for the mean response, bec… | fact | tagged | Prediction Interval: “A prediction interval must also allow for the random shock the new observation will carry, so it is…” |

</details>

<details><summary><code>srm-050</code> · answerable</summary>

Tagged pages: Statistical Learning, Bias-Variance Tradeoff, Interpretability, Regularization, Bagging

| Item | Kind | Status | Where |
|---|---|---|---|
| Interpretability and flexibility trade off: more flexible statistical learning methods are generally harder to interpret, while simpler, le… | fact | tagged | Interpretability: “Interpretability is a property of the model” |
| When inference (understanding the relationship between predictors and response) is the goal, simpler and less flexible methods are preferre… | fact | tagged | Statistical Learning: “**Inference**: understand which predictors affect $Y$ and how; interpretability is essential” |
| The lasso is a relatively simple, less flexible method that yields an interpretable model by shrinking some coefficients to exactly zero (v… | fact | tagged | Regularization: “**Lasso** ($\ell_1$) sets some coefficients exactly to zero, so it performs [[Variable Selection]] …” |
| More flexible methods tend to overfit the training data, so greater flexibility does not guarantee better accuracy on unseen (test) data; t… | fact | tagged | Statistical Learning: “**Flexibility is not accuracy:** A more flexible method has lower bias but higher variance; on new …” |

</details>

<details><summary><code>srm-051</code> · answerable</summary>

Tagged pages: Regression Tree, Decision Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| To predict with a regression tree, start at the root and follow the split condition at each internal node (yes/no) according to the observa… | procedure | tagged | Regression Tree (collapsed): “Each prediction follows the splits to a leaf and returns that leaf's training mean.” |
| The predicted response for an observation in a regression tree is the value assigned to its leaf (the mean response of training observation… | fact | tagged | Regression Tree: “every observation that falls in region $R_j$ is predicted by the mean response $\hat{y}_{R_j}$ of t…” |
| In a regression tree, a predictor is only used for an observation if it appears in a split on that observation's path; splits in other bran… | fact | tagged | Regression Tree (collapsed): “Urban garaging adds $9.2 - 7.6 = 1.6$ thousand for vehicles under 5 years old and nothing for older…” |

</details>

<details><summary><code>srm-052</code> · answerable</summary>

Tagged pages: Pearson Residual, Model Diagnostics, Generalized Linear Model

| Item | Kind | Status | Where |
|---|---|---|---|
| A Pearson residual is the difference between the observed and fitted value divided by the estimated standard deviation of the response (a s… | definition | tagged | Pearson Residual: “**Pearson Residual** is an actual incremental loss minus its fitted value, divided by the standard …” |
| The sum of squared Pearson residuals gives the Pearson chi-square goodness-of-fit statistic for a generalized linear model. | fact | linked | Residual: “Its squares sum to the Pearson $\chi^2$ statistic, which divided by the residual degrees of freedom…” |
| Plotting Pearson residuals against candidate explanatory variables not in the model can reveal patterns indicating that adding those variab… | fact | tagged | Model Diagnostics: “a [[Residual Plot]] against the fitted values and against each predictor, where curvature means a m…” |
| Because Pearson residuals are standardized, unusually large residuals in absolute value flag outliers or unusual observations. | fact | linked | Residual: “either way, values beyond about $\pm 3$ flag an [[Outlier\\|outlier]]” |

</details>

<details><summary><code>srm-053</code> · gap</summary>

Tagged pages: Linear Regression, Ordinary Least Squares

| Item | Kind | Status | Where |
|---|---|---|---|
| In the simple linear regression model Y = β0 + β1 X + ε, the intercept β0 is the expected value of Y when X = 0, not the overall expected v… | definition | tagged | Linear Regression: “$\hat\beta_j$ is the change in $E[Y]$ per unit of $x_j$ **holding the other predictors fixed**” |
| In simple linear regression the slope β1 is the average change in Y associated with a one-unit increase in X. | definition | tagged | Linear Regression: “$\hat\beta_j$ is the change in $E[Y]$ per unit of $x_j$ **holding the other predictors fixed**” |
| The error term ε in the linear regression model is assumed to be independent of X, with mean zero. | fact | tagged | Linear Regression: “$$Y_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip} + \varepsilon_i, \qquad \varepsilon_i \s…” |
| The equation Y = β0 + β1 X + ε defines the population regression line, the true relationship between X and Y, whose coefficients are unknow… | definition | missing |  |
| The method of least squares estimates the regression coefficients by minimizing the residual sum of squares. | fact | tagged | Ordinary Least Squares: “**Ordinary least squares (OLS)** estimates the coefficients of a [[Linear Regression\\|linear regres…” |

</details>

<details><summary><code>srm-054</code> · answerable</summary>

Tagged pages: Variable Selection, p-Value, Hypothesis Testing, Linear Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| A predictor in a regression is statistically insignificant when its t-test p-value exceeds the chosen significance level, making it a candi… | fact | tagged | p-Value: “$$\text{reject } H_0 \iff p < \alpha$$” |
| In backward selection, remove only one insignificant predictor at a time, namely the one with the highest p-value, then refit the model and… | procedure | tagged | Variable Selection: “Start with all predictors (needs $n > p$); at each step remove the least useful one” |
| Removing a predictor changes the remaining coefficient estimates and p-values, so a variable that was insignificant may become significant … | fact | tagged | p-Value: “In [[Parameter Estimate Tables]] each coefficient's p-value tests $H_0: \beta_j = 0$ given the othe…” |

</details>

<details><summary><code>srm-055</code> · gap</summary>

Tagged pages: Random Walk, Time Series Forecast, Fitted Values

| Item | Kind | Status | Where |
|---|---|---|---|
| For a random walk with drift, the one-step forecast is the previous observation plus the estimated mean of the white noise (drift) term: \h… | formula | tagged | Random Walk: “\hat Y_{43} = Y_{40} + 3(1.4) = 218 + 4.2 = 222.2” |
| A one-step forecast residual (error) is the actual observation minus its one-step predicted value, and it is used to evaluate a model on a … | definition | tagged | Time Series Forecast: “Assess a forecast on a held-out tail of the series, not on the fitted data, using MAE, RMSE or MAPE” |
| The mean error (ME) is the average of the forecast errors: ME = (1/m) \sum e_t. | formula | missing |  |
| The mean square error (MSE) is the average of the squared forecast errors: MSE = (1/m) \sum e_t^2. | formula | syllabus | Model Validation: “\text{MSE}_{\text{val}} = \frac{1}{n_v}\sum_{i \in \text{val}}\left(y_i - \hat{f}(x_i)\right)^2” |

</details>

<details><summary><code>srm-056</code> · gap</summary>

Tagged pages: Prediction Interval, Fitted Values

| Item | Kind | Status | Where |
|---|---|---|---|
| Prediction with a fitted regression model assumes the new observation follows the same model (same relationship and error structure) as the… | fact | tagged | Prediction Interval: “The usual intervals assume the model is correct, its parameters are known and the errors are normal…” |
| Different candidate regression models generally produce different predictions for the same new observation, so predictions depend on the mo… | fact | missing |  |
| A prediction interval is a range expected to contain a new observation with a stated probability, and it is centered on the point predictio… | definition | tagged | Prediction Interval: “**A prediction interval** is a range that will contain a *future observation*, such as next quarter…” |
| A narrower prediction interval is more informative about the true value than a wider one, since it pins the value down more precisely. | fact | linked | Confidence Interval (collapsed): “but it is wide enough that the indicated relativity is far from precisely known.” |

</details>

<details><summary><code>srm-057</code> · answerable</summary>

Tagged pages: Regression Tree, Decision Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| A regression tree partitions the predictor space into regions via successive binary splits on predictor values; each end (terminal) node co… | definition | tagged | Regression Tree: “recursive binary splitting divides the predictor space into regions $R_1, \ldots, R_J$, and every o…” |
| The predicted response for an end node of a regression tree is the mean of the response values of the training observations that fall in th… | fact | tagged | Regression Tree: “every observation that falls in region $R_j$ is predicted by the mean response $\hat{y}_{R_j}$ of t…” |
| To find the observations in an end node, follow the tree's split conditions from the root, assigning each observation to the branch whose c… | procedure | tagged | Regression Tree: “a split on predictor $X_j$ at cutpoint $s$ sends $R_1(j,s) = \{X \mid X_j < s\}$ to one branch and …” |

</details>

<details><summary><code>srm-058</code> · gap</summary>

Tagged pages: Autoregressive Model, Time Series

| Item | Kind | Status | Where |
|---|---|---|---|
| In the approximate conditional least squares method for an AR(1) model, the slope estimate b1 is the lag-1 sample autocorrelation r1, the s… | formula | linked | Autocorrelation Function: “\hat{\rho}_k = \frac{\sum_{t=1}^{n-k}(y_t - \bar{y})(y_{t+k} - \bar{y})}{\sum_{t=1}^{n}(y_t - \bar{…” |
| In the approximate conditional least squares method for an AR(1) model, the intercept estimate is b0 = ybar(1 - b1), where ybar is the samp… | formula | tagged | Autoregressive Model: “**AR(1)**: $\mathrm{Corr}(Y_t, Y_{t-k}) = \phi^{k}$, mean $\mu = c/(1-\phi)$, variance $\sigma^2/(1…” |
| The fitted value for an AR(1) model at time t is b0 + b1*y_{t-1}, and the residual e_t is the observed y_t minus this fitted value, defined… | definition | missing |  |
| For an AR(1) model fit to T observations, the mean square error is s^2 = the sum of squared deviations of the residuals from their average … | formula | missing |  |

</details>

<details><summary><code>srm-059</code> · gap</summary>

Tagged pages: K-Means Clustering, Clustering

| Item | Kind | Status | Where |
|---|---|---|---|
| The within-cluster variation of cluster C_k is W(C_k) = (1/\|C_k\|) times the sum over all pairs of observations in the cluster of their sq… | definition | missing |  |
| A cluster's within-cluster variation (pairwise form) equals twice the sum of squared Euclidean distances of its observations from the clust… | fact | missing |  |
| A cluster centroid is the vector of feature-wise means of the observations assigned to the cluster. | definition | tagged | K-Means Clustering: “2. **Update**: compute each cluster centroid as the mean of its assigned observations” |
| The total within-cluster variation is the sum of the within-cluster variations over all K clusters, which K-means seeks to minimize. | definition | tagged | K-Means Clustering: “**K-Means Clustering** is a partition-based [[Clustering]] algorithm that partitions $n$ observatio…” |

</details>

<details><summary><code>srm-060</code> · gap</summary>

Tagged pages: K-Means Clustering, Clustering, Overfitting

| Item | Kind | Status | Where |
|---|---|---|---|
| Total within-cluster variation decreases as K increases and is minimized (equal to zero) when K equals the number of observations, so minim… | fact | tagged | K-Means Clustering: “**Choosing $K$**: use the **elbow method** (plot WCSS vs. $K$; look for an elbow where WCSS stops d…” |
| Setting the number of clusters equal to the number of observations overfits the data, since each observation becomes its own cluster and th… | fact | missing |  |
| There is no exact or single method for choosing the optimal number of clusters K in K-means; the choice is subjective. | fact | tagged | Clustering: “Each can change the clusters, so try several and keep the most useful and interpretable result.” |

</details>

<details><summary><code>srm-061</code> · answerable</summary>

Tagged pages: AIC, BIC, Variable Selection, Test Error

| Item | Kind | Status | Where |
|---|---|---|---|
| AIC and BIC do not directly estimate test error; they indirectly estimate it by adjusting the training error (e.g., RSS) with a penalty for… | fact | tagged | Test Error: “[[AIC]] and [[BIC]] instead adjust training error for complexity.” |
| AIC adds a penalty of 2d (times the error variance estimate) to the training error, while BIC adds a penalty of ln(n)·d (times the error va… | formula | tagged | AIC: “$$\text{AIC} = -2\ell(\hat{\boldsymbol{\beta}}) + 2p$$” |
| For models with the same number of predictors, AIC and BIC give the same ranking of models, so they select the same subset. | fact | tagged | BIC: “$$\text{BIC} = -2\ell(\hat{\boldsymbol{\beta}}) + p\ln(n)$$” |
| When ln(n) > 2 (n > 7), BIC penalizes additional predictors more heavily than AIC, so BIC selects a model with no more variables than AIC. | fact | tagged | BIC: “BIC tends to select **simpler models** than AIC for large $n$ since $\ln(n) > 2$ when $n > 7$” |

</details>

<details><summary><code>srm-062</code> · answerable</summary>

Tagged pages: Confidence Interval, Linear Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| A (1-α) confidence interval for a regression coefficient is the estimate ± t critical value (with n minus number of parameters degrees of f… | formula | tagged | Confidence Interval: “The general form is $\hat\theta \pm (\text{critical value}) \times \text{SE}(\hat\theta)$, where th…” |
| With a large number of observations (over about 100), the t distribution is approximately normal, so the 95% critical value is approximatel… | fact | linked | Student's t-Distribution: “The density is symmetric about 0 with heavier tails than the normal; as $n \to \infty$ it converges…” |

</details>

<details><summary><code>srm-063</code> · answerable</summary>

Tagged pages: Regression Tree, Decision Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| To predict with a regression tree, start at the root and at each internal node evaluate the split condition for the observation, following … | procedure | tagged | Regression Tree (collapsed): “Each prediction follows the splits to a leaf and returns that leaf's training mean.” |
| The predicted value for an observation in a regression tree is the value assigned to the terminal node (leaf) it lands in, which is the mea… | fact | tagged | Regression Tree: “A **regression tree** is a [[Decision Tree\\|decision tree]] for a quantitative [[Response Variable\…” |

</details>

<details><summary><code>srm-064</code> · answerable</summary>

Tagged pages: Autoregressive Model, Stationarity

| Item | Kind | Status | Where |
|---|---|---|---|
| A stationary AR(1) model is y_t = beta_0 + beta_1 y_{t-1} + epsilon_t, where the series has constant mean and variance and autocovariances … | definition | tagged | Autoregressive Model: “$$Y_t = c + \phi_1 Y_{t-1} + \cdots + \phi_p Y_{t-p} + \varepsilon_t$$” |
| An AR(1) process is stationary only if the absolute value of the slope coefficient is less than 1 (-1 < beta_1 < 1); beta_1 = 1 gives a non… | fact | tagged | Autoregressive Model: “[[Stationarity]] requires all roots of $\phi(B) = 0$ **outside** the unit circle; for AR(1) that is…” |

</details>

<details><summary><code>srm-066</code> · gap</summary>

Tagged pages: Regression Tree, Decision Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| To find the region for a leaf of a regression tree, take the intersection of all split conditions along the path from the root to that leaf. | procedure | tagged | Regression Tree (collapsed): “Each prediction follows the splits to a leaf and returns that leaf's training mean.” |
| In a regression tree diagram, the left branch of a split is the side where the stated inequality holds and the right branch is the compleme… | fact | tagged | Regression Tree (collapsed): “The boundary:** ISLR sends $X_j < s$ to the left. An observation exactly at the cutpoint goes to th…” |
| A region's definition includes only predictors that are split on along its path; a predictor that is not split on along that path imposes n… | fact | tagged | Regression Tree (collapsed): “Urban garaging adds $9.2 - 7.6 = 1.6$ thousand for vehicles under 5 years old and nothing for older…” |
| Successive splits on the same predictor along a path combine into an interval, such as a lower bound from a right branch and an upper bound… | fact | missing |  |

</details>

<details><summary><code>srm-067</code> · gap</summary>

Tagged pages: Likelihood Ratio Test, Logistic Regression, Hypothesis Testing

| Item | Kind | Status | Where |
|---|---|---|---|
| The loglikelihood of a logistic regression (binary response) model is the sum over observations of ln(p_i) for successes and ln(1 - p_i) fo… | formula | missing |  |
| The likelihood ratio test statistic equals twice the difference between the maximized loglikelihood of the full model and that of the restr… | formula | tagged | Likelihood Ratio Test: “$$-2\ln\Lambda = 2\left[\ell(\hat\theta) - \ell(\hat\theta_0)\right] \ \dot\sim\ \chi^2_{r}$$” |
| Under the null hypothesis, the likelihood ratio statistic follows a chi-square distribution with degrees of freedom equal to the difference… | fact | tagged | Likelihood Ratio Test: “$r$ is the number of **restrictions** — the difference in free parameters between the full and redu…” |
| Reject the null hypothesis at a given significance level if the test statistic exceeds the chi-square critical value for that level; the lo… | procedure | tagged | Likelihood Ratio Test: “Reject $H_0$ (the reduced model) when $-2\ln\Lambda$ exceeds the upper-$\alpha$ point of $\chi^2_r$” |
| When the indicator variable's coefficient is set to zero (null hypothesis beta_1 = 0), the model reduces to an intercept-only model with a … | fact | missing |  |

</details>

<details><summary><code>srm-068</code> · gap</summary>

Tagged pages: Boosting, Hyperparameter, Regression Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| In boosting for regression trees, the residuals are initialized to the observed target values (r_i = y_i), before any trees are fit. | procedure | missing |  |
| After fitting each tree f_b in boosting, the residuals are updated as r_i_new = r_i_old − λ·f_b(x_i), where λ is the shrinkage parameter. | formula | tagged | Boosting: “$$\hat{f}(x) \leftarrow \hat{f}(x) + \lambda \hat{f}^{b}(x), \qquad r_i \leftarrow r_i - \lambda \h…” |
| A regression tree with a single split predicts the same constant value for every observation falling in a given region, determined by wheth… | fact | tagged | Regression Tree: “every observation that falls in region $R_j$ is predicted by the mean response $\hat{y}_{R_j}$ of t…” |

</details>

<details><summary><code>srm-069</code> · gap</summary>

Tagged pages: Boosting, Hyperparameter, Regression Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| In boosting for regression trees, the fitted function starts at \hat{f}(x) = 0 and each residual is initially r_i = y_i. | procedure | missing |  |
| After fitting each tree b, boosting updates the model by \hat{f}(x) \leftarrow \hat{f}(x) + \lambda \hat{f}^b(x), where \lambda is the shri… | formula | tagged | Boosting: “$$\hat{f}(x) \leftarrow \hat{f}(x) + \lambda \hat{f}^{b}(x), \qquad r_i \leftarrow r_i - \lambda \h…” |
| A regression tree's prediction for an observation is the leaf value of the region its predictor values fall into, determined by applying th… | procedure | tagged | Regression Tree: “every observation that falls in region $R_j$ is predicted by the mean response $\hat{y}_{R_j}$ of t…” |

</details>

<details><summary><code>srm-070</code> · gap</summary>

Tagged pages: AIC, Model Selection, Residual Sum of Squares

| Item | Kind | Status | Where |
|---|---|---|---|
| For a linear regression with d predictors fitted to n observations, AIC = (1/n)(RSS + 2·d·σ̂²), where σ̂² is the estimated error variance. | formula | missing |  |
| When computing AIC to compare models, estimate σ̂² once from the full model containing all predictors (the square of its residual standard … | procedure | missing |  |
| The model with the smallest AIC is preferred when selecting among candidate models. | fact | tagged | AIC: “Lower AIC indicates a better model (better fit relative to complexity)” |
| The residual standard error is the square root of the estimated error variance, so squaring it gives σ̂². | definition | tagged | Residual Sum of Squares: “RSS is the numerator of the **residual variance** estimate: $\hat{\sigma}^2 = \text{RSS}/(n-p-1)$” |

</details>

<details><summary><code>srm-071</code> · gap</summary>

Tagged pages: Linear Regression, Bias, Model Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| Omitting important explanatory variables from a regression model (underspecification) generally biases the coefficient estimates of the rem… | fact | tagged | Bias: “In modelling, bias also arises from the *model* rather than the estimator — an omitted predictor, a…” |
| Omitting important variables leaves unexplained variation in the residuals, so the error variance estimate s^2 is inflated, which widens pr… | fact | missing |  |
| The total sum of squares depends only on the response values (their deviations from the mean), so it does not change with which explanatory… | fact | linked | Residual Sum of Squares: “**Decomposition**: $\text{SS}_{\text{Tot}} = \text{SS}_{\text{Reg}} + \text{RSS}$, where $\text{SS}…” |
| Underfitting occurs when a model is too simple to capture the true relationship in the data, such as when important variables are left out. | definition | linked | Bias-Variance Tradeoff: “**Underfitting** = high bias, low variance: training and test error are both high and close togethe…” |

</details>

<details><summary><code>srm-072</code> · answerable</summary>

Tagged pages: Logistic Regression, p-Value, Generalized Linear Model

| Item | Kind | Status | Where |
|---|---|---|---|
| A predictor in a regression model is statistically significant at level alpha if its p-value is less than alpha, in which case the null hyp… | fact | tagged | p-Value: “It converts any test statistic onto a common $0$–$1$ scale: reject $H_0$ when the p-value falls bel…” |
| The p-value of a coefficient test is the probability, under the null hypothesis that the coefficient is zero, of observing a test statistic… | definition | tagged | p-Value: “A **p-Value** is the probability, computed assuming the null hypothesis is true, of observing a tes…” |

</details>

<details><summary><code>srm-073</code> · answerable</summary>

Tagged pages: Tree Pruning, Cross-Validation, Overfitting, Regression Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| Cost complexity pruning selects the tuning parameter (and corresponding subtree size) by choosing the subtree that minimizes the cross-vali… | procedure | tagged | Tree Pruning: “The sequence of subtrees as $\alpha$ increases is **nested and finite**, so [[Cross-Validation]] ov…” |
| The optimal pruned tree size is read from the cross-validation (test) MSE curve at the tree size where it is lowest, rather than from the t… | fact | tagged | Cross-Validation: “Cross-validation is what turns the [[Bias-Variance Tradeoff]] into a decision: training error falls…” |

</details>

<details><summary><code>srm-074</code> · answerable</summary>

Tagged pages: Random Forest, Bagging, Hyperparameter

| Item | Kind | Status | Where |
|---|---|---|---|
| A random forest builds many decision trees on bootstrap samples and, at each split, considers only a random subset of m of the p predictors… | definition | tagged | Random Forest: “A **random forest** is [[Bagging\\|bagged]] [[Decision Tree\\|trees]] with one extra step: at *each s…” |
| The m candidate predictors in a random forest are sampled without replacement, so that exactly m distinct predictors are considered. | fact | tagged | Random Forest: “A **random forest** is [[Bagging\\|bagged]] [[Decision Tree\\|trees]] with one extra step: at *each s…” |
| In a random forest, a fresh random sample of m predictors is drawn at every split of every tree, not once per tree. | fact | tagged | Random Forest: “at *each split*, only a random subset of $m$ predictors is eligible.” |

</details>

<details><summary><code>srm-075</code> · answerable</summary>

Tagged pages: Exponential Family, Tweedie Distribution, Probability Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The Tweedie distribution has variance equal to the dispersion parameter times the mean raised to the power p, Var(Y) = phi * mu^p. | fact | tagged | Tweedie Distribution: “$$\text{Var}(Y) = \phi\,\mu^{p}, \qquad 1 < p < 2$$” |
| For 1 < p < 2, a Tweedie random variable is a compound Poisson sum of gamma random variables, so it has a point mass at zero equal to e^(-l… | fact | tagged | Tweedie Distribution: “For $1 < p < 2$ it is a compound Poisson–Gamma distribution: a Poisson number of Gamma-sized claims…” |
| The Tweedie distribution belongs to the exponential dispersion family (linear exponential family) of distributions used in generalized line… | fact | tagged | Exponential Family: “The **Exponential Family** is the class of distributions whose density can be written in a common e…” |
| The Poisson distribution is only a limiting case of the Tweedie distribution with 1 < p < 2 as p approaches 1, not a special case within th… | fact | tagged | Tweedie Distribution: “\\| $1$ \\| Poisson \\| Counts \\|” |

</details>

<details><summary><code>srm-076</code> · answerable</summary>

Tagged pages: Principal Components Analysis, Proportion of Variance Explained

| Item | Kind | Status | Where |
|---|---|---|---|
| PCA constructs principal components as linear combinations of the predictors, so it captures only linear relationships among the variables. | fact | tagged | Principal Components Analysis: “$\mathbf{z}_m = \mathbf{X}\boldsymbol{\phi}_m$ is the $m$-th **score vector** (principal component)” |
| Principal components are ordered so that the first component captures the largest share of variance in the data, and each later component c… | fact | tagged | Principal Components Analysis: “PCs are **orthogonal** — each successive PC captures the maximum remaining variance” |
| Later principal components, which explain little variance, are the ones that tend to reflect noise, while the first components capture the … | fact | linked | Scree Plot: “The name is geological: the steep face is the components that matter, the rubble at the base is noi…” |
| A loading is the coefficient of a variable in a principal component; a loading near zero means that variable contributes little to that com… | definition | linked | Principal Components Regression: “$\phi_{1m}, \dots, \phi_{pm}$ are the **loadings** of the $m$th component” |
| Principal components are derived features, not predictors, and a variable's small loading on one component does not mean the variable is un… | fact | linked | Principal Components Regression: “Every $Z_m$ is a linear combination of all $p$ original predictors, so the fitted model still uses …” |

</details>

<details><summary><code>srm-an-001</code> · answerable</summary>

Tagged pages: Model Validation, Cross-Validation, Bias-Variance Tradeoff, Test Error

| Item | Kind | Status | Where |
|---|---|---|---|
| The validation set approach randomly splits the data into a training set and a validation set, fits the model on the training set, and esti… | procedure | tagged | Test Error: “**Validation set:** fit on one part and score on the rest. Simple, but the estimate is variable and…” |
| Leave-one-out cross-validation fits the model n times, each time holding out one observation, and averages the n resulting errors; it invol… | procedure | tagged | Cross-Validation: “**$k$-fold**: split the data into $k$ equal parts, fit on $k-1$ and score on the held-out fold, the…” |
| Training on fewer observations tends to give a worse-fitting model, so the validation set approach, which fits on only part of the data, te… | fact | tagged | Test Error: “**Validation set:** fit on one part and score on the rest. Simple, but the estimate is variable and…” |
| LOOCV has low bias because each fit uses nearly all the data, but its fitted models are trained on almost identical data and their errors a… | fact | tagged | Cross-Validation: “**Leave-one-out** ($k = n$) is nearly unbiased but has high variance and is expensive” |
| k-fold cross-validation with a moderate k (such as 5 or 10) has somewhat more bias than LOOCV but lower variance, since its training sets o… | fact | tagged | Cross-Validation: “$k = 5$ or $10$ is the standard choice, a bias–variance compromise: each fit uses $(k-1)n/k$ observ…” |

</details>

<details><summary><code>srm-an-002</code> · answerable</summary>

Tagged pages: Train-Test Split, Test Error, Overfitting, Polynomial Regression, Bias-Variance Tradeoff

| Item | Kind | Status | Where |
|---|---|---|---|
| Training MSE decreases (or does not increase) as model flexibility increases, so it cannot be used to compare models of different flexibili… | fact | tagged | Test Error: “The **training error**, measured on the fitting data, is different: it falls automatically as the m…” |
| Test MSE is the mean squared error of a fitted model on held-out observations not used in fitting, and measures predictive performance on n… | definition | tagged | Test Error: “**Test error** is the average error a fitted model makes on observations that were not used to fit …” |
| As flexibility increases, test MSE typically follows a U-shape: it falls to a minimum and then rises, so the best model is the one with the… | fact | tagged | Test Error: “By the [[Bias-Variance Tradeoff\\|bias-variance tradeoff]], test error is U-shaped in flexibility: b…” |
| Overfitting occurs when a model fits noise specific to the training data, shown by training MSE continuing to fall while test MSE rises. | definition | tagged | Overfitting: “**Overfitting** is fitting a model so closely to its training data that it follows the noise in tha…” |
| Test MSE is normally higher than training MSE for any model, so a test MSE above training MSE alone does not indicate overfitting; a small … | fact | tagged | Overfitting (collapsed): “Training error below test error does not by itself mean the model overfits. Almost every model has …” |
| Underfitting occurs when a model is too inflexible to capture the true structure, giving high error on both training and test sets. | definition | tagged | Bias-Variance Tradeoff: “**Underfitting** = high bias, low variance: training and test error are both high and close togethe…” |
| Validation set approach: randomly split the data into a training set and a test (validation) set, fit candidate models on the training set,… | procedure | tagged | Train-Test Split: “ISLR's validation set approach (James et al., §5.1.1) splits the data in two, fits on one part and …” |

</details>

<details><summary><code>srm-an-003</code> · untagged</summary>

Tagged pages: K-Nearest Neighbors, Ordinary Least Squares, Statistical Learning

| Item | Kind | Status | Where |
|---|---|---|---|
| K-nearest neighbors regression predicts the response at a point x0 as the average of the responses of the K training observations nearest t… | formula | tagged | K-Nearest Neighbors: “**Regression:** $\hat{f}(x_0) = \frac{1}{K}\sum_{i \in \mathcal{N}_K(x_0)} y_i$” |
| With a single predictor, the Euclidean distance between a training point xi and a new point x0 is the absolute difference \|xi - x0\|. | definition | elsewhere | Similarity and Distance Measures: “$$d_{\text{Euc}}(\mathbf{u}, \mathbf{v}) = \sqrt{\sum_{j=1}^{p} (u_j - v_j)^2}$$” |
| To find the neighborhood in KNN, compute the distance from the new point to every training observation, rank them, and select the K smalles… | procedure | tagged | K-Nearest Neighbors: “$\mathcal{N}_K(x_0)$ is the **neighborhood** of the $K$ nearest training points to $x_0$” |
| KNN regression is non-parametric: it assumes no functional form for f, so its prediction is a local average and does not use a fitted globa… | fact | tagged | K-Nearest Neighbors: “KNN estimates **no parameters**: it keeps the training data and does its work at prediction time, f…” |

</details>

<details><summary><code>srm-an-004</code> · answerable</summary>

Tagged pages: Autocorrelation Function, Time Series, Correlogram

| Item | Kind | Status | Where |
|---|---|---|---|
| The lag k sample autocorrelation is r_k = sum_{t=k+1}^{T}(y_{t-k} - ybar)(y_t - ybar) divided by sum_{t=1}^{T}(y_t - ybar)^2, using the sin… | formula | tagged | Autocorrelation Function: “\hat{\rho}_k = \frac{\sum_{t=1}^{n-k}(y_t - \bar{y})(y_{t+k} - \bar{y})}{\sum_{t=1}^{n}(y_t - \bar{…” |
| The lag k autocorrelation measures the correlation between observations of a time series that are k periods apart. | definition | tagged | Autocorrelation Function: “The **autocorrelation function (ACF)** gives the correlation between a [[Time Series]] and itself $…” |
| In the lag k sample autocorrelation, the numerator sums only the T-k available pairs of observations while the denominator sums over all T … | fact | tagged | Autocorrelation Function: “\hat{\rho}_k = \frac{\sum_{t=1}^{n-k}(y_t - \bar{y})(y_{t+k} - \bar{y})}{\sum_{t=1}^{n}(y_t - \bar{…” |

</details>

<details><summary><code>srm-an-005</code> · answerable</summary>

Tagged pages: ARCH Model, Autocorrelation Function, Autoregressive Model, White Noise, Stationarity

| Item | Kind | Status | Where |
|---|---|---|---|
| If the sample autocorrelations of a fitted model's residuals all lie within the approximate ±2/√n bands, the residuals show no remaining se… | fact | tagged | Autocorrelation Function: “On residuals it is the [[White Noise]] check: all spikes inside the bands means the model has extra…” |
| Uncorrelated errors are not necessarily independent; autocorrelation in the squared residuals indicates dependence in the errors' variance … | fact | tagged | ARCH Model: “The shocks $\varepsilon_t$ are uncorrelated, so their [[Autocorrelation Function\\|autocorrelation f…” |
| An ARCH(p) model specifies the conditional variance of the error as a linear function of the p previous squared errors: σ_t² = ω + γ_1 ε_{t… | definition | tagged | ARCH Model: “$$\sigma_t^2 = \omega + \gamma_1\varepsilon_{t-1}^2 + \cdots + \gamma_p\varepsilon_{t-p}^2$$” |
| Bursts of large residuals of either sign separated by quiet stretches (volatility clustering), together with positively autocorrelated squa… | fact | tagged | ARCH Model: “It describes **volatility clustering**, the tendency of financial returns to have large moves, of e…” |
| An ARCH(p) process with the sum of the γ coefficients less than 1 is stationary with constant unconditional variance ω/(1 − Σγ_j), so chang… | fact | tagged | ARCH Model (collapsed): “An ARCH process is heteroskedastic only conditionally. Its unconditional variance is constant when …” |
| Sample autocorrelations of a stationary series die out quickly, whereas slowly decaying autocorrelations suggest non-stationarity that call… | fact | tagged | Autocorrelation Function: “Slow, near-linear decay signals non-stationarity and calls for [[Differencing]]” |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
