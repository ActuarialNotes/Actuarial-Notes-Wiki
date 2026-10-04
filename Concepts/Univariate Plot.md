---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:01fbf9d2198b0fc9e0e0a7c29b9c65f3ee370abca000a806708a12b2de61c47d
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.14 'Histogram' (definition, count and density normalisations, questions answered), sha256:5dd49706cfe4151a32e35dcae8bf63d421ba68685abf7473588776c7830f065a — https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.7 'Box Plot' (basic box plot; 'Box plots with fences'), sha256:545e917efab8aae10425dd289461c519de359120fd39d6dc94efa8c324e1f783 — https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.5.16 'Kolmogorov-Smirnov Goodness-of-Fit Test' (ECDF definition), sha256:2202a8f4db6dc914c738745ac9f02af75ec55eda274db29280de5c5a5d127c0d — https://www.itl.nist.gov/div898/handbook/eda/section3/eda35g.htm"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §6 'Order Statistics' (sample quantiles and alternatives, IQR, fences, five-number summary, boxplot, empirical CDF), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §1 'Introduction' (type and level of measurement: continuous/discrete, nominal, ordinal), sha256:0af72fbf0202413525cae99e696cfa70014a803d6c5ac7a7dcafd1577742414f — https://www.randomservices.org/random/sample/Introduction.html"
    - "Larsen, 'Generalized Linear Models', CAS Study Note (rev. 6/29/2016), pp.1-2 ('QQ and Box Plots…', 'Tweedie Distributions'), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §2.3.5 lab (hist(), pairs(), summary() incl. counts per category for qualitative variables), printed pp.50-52 (PDF pp.61-63), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C Extended Linear Models, tasks 5 and 9, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Univariate Plot.md
---

A **Univariate Plot** displays the distribution of **one** variable at a time — its centre, spread, shape, and outliers — without reference to any other variable. Univariate plots are the first step of [[Exploratory Data Analysis]]: they are what tells you which response distribution and which transformations a model can plausibly use.

> $$\text{one variable} \ \longrightarrow \ \text{shape, centre, spread, outliers}$$

| Plot | Shows | Best at |
| :--- | :--- | :--- |
| [[Histogram]] | Binned counts | Overall shape, multimodality |
| [[Box Plot]] | Five-number summary | Outliers, comparing groups |
| Dot plot / strip plot | Every observation | Small samples, ties |
| Empirical CDF | $\hat{F}(x) = \frac{1}{n}\#\{x_i \le x\}$ | Quantiles, no binning choice |
| [[QQ Plot]] | Sample vs theoretical quantiles | Tail behaviour, distributional fit |
| Bar chart | Category counts | Rare levels of a [[Categorical Predictor]] |

- For a **continuous** variable, start with a [[Histogram]] for shape and a [[Box Plot]] for outliers; for a **categorical** variable, a bar chart of level frequencies is the univariate plot, and it is how thin levels get found before they blow up a GLM's standard errors
- The empirical CDF is the one univariate plot with **no tuning choice** — no bin width, no whisker rule — so it is the honest check when a histogram's shape looks bin-dependent
- Univariate plots of the *response* narrow the choice of distribution and [[Link Function]]; univariate plots of each *predictor* find skew, spikes at zero, and impossible values before they contaminate the fit
- They cannot show relationships: a variable can look perfectly well behaved on its own and still be badly related to the response, which is what a [[Scatter Plot]] and the diagnostic plots are for
- Plot exposures too, not just losses — a univariate plot of exposure by level shows where the data is thin enough that a fitted coefficient will be unstable

![[Media/Figures/Univariate_Plot.svg|340]]

> [!example]- Choosing Plots for a New Data Set {Example}
> An actuary receives a data set with claim count (integer, mostly zero), claim severity (positive, right-skewed), and territory (12 levels). Which univariate plot fits each?
>
> > [!answer]-
> > - **Claim count**: a bar chart of the counts $0, 1, 2, \ldots$ — a histogram of a variable that is $85\%$ zeros just shows one bar. Compare the sample mean and variance while you are there; variance $\gg$ mean means overdispersion, so [[Negative Binomial Distribution|negative binomial]] rather than plain [[Poisson Regression]].
> > - **Severity**: a [[Histogram]] of $\ln(\text{severity})$ plus a [[Box Plot]] on the raw scale, so the shape and the outliers are both visible.
> > - **Territory**: a bar chart of exposure by level, to find levels with too little data to fit their own coefficient.

> [!example]- When the Histogram and the Box Plot Disagree {Example}
> A box plot of a variable looks symmetric with no outliers, but the histogram shows two clear humps. Which is telling the truth?
>
> > [!answer]-
> > Both — they measure different things. The five numbers behind a box plot ($\min, Q_1, Q_2, Q_3, \max$) are identical for a symmetric unimodal sample and a symmetric **bimodal** one, so a box plot simply cannot show two humps. The histogram is right about the shape, and the two modes usually mean a missing [[Categorical Predictor|categorical variable]] (two classes of risk mixed in one column) that should be split out.
