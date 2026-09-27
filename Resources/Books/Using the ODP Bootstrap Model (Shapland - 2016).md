---
Title: "Using the ODP Bootstrap Model: A Practitioner's Guide"
Authors: "Mark R. Shapland"
Publisher: "Casualty Actuarial Society"
Year: "2016"
date: "2016"
Type: "Monograph"
Code: "CAS Monograph No. 4"
ISBN: "978-0-9968897-5-9"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ed523a0b3c05d832de8457cad50289afa0ca4cffc747fd3585d1fb34eb2acec6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Using the ODP Bootstrap Model (Shapland - 2016).md
---
![[Using the ODP Bootstrap Model (Shapland - 2016) - Cover.svg]]

A practitioner's guide to the over-dispersed Poisson (ODP) bootstrap model, which estimates a distribution of possible outcomes for unpaid claims. It gathers the evolutionary changes from different papers into a complete ODP bootstrap modeling framework using a standard notation, generalizes it into a more flexible GLM bootstrap, describes the adjustments needed for practical use, and addresses the diagnostic testing of the model's assumptions and ways to combine or credibility weight its results with other models into a "best estimate" of the distribution. It is number 4 in the CAS Monograph Series; in lieu of technical appendices, companion Excel workbooks illustrate the calculations.

> [!info] On the syllabus
> - [[Exam 7 (CAS)|Exam 7]] — objectives A1, A9–A11 and A13; CAS Monograph #4, including errata; the supplementary modeling files linked on pages 61–62 will aid in understanding of the method's application.

## 1 Introduction
- Bradley Efron (1979) is most often associated with expanding [[Bootstrap|bootstrapping]] into statistics: taking one available sample and using it to arrive at many others through resampling.
- The most commonly cited reserving examples — England and Verrall (1999; 2002), Pinheiro et al. (2003) and Kirschner et al. (2008) — combine the bootstrap with a basic [[Chain Ladder Method|chain ladder]] model in which the incremental losses are modeled as over-dispersed Poisson random variables; the monograph calls this the [[ODP Bootstrap Model|ODP bootstrap]].
- The goal of the ODP bootstrap model is to generate a distribution of possible outcomes, rather than a point estimate.
- Actuaries are moving towards estimating an [[Unpaid Claim Distribution|unpaid claim distribution]], encouraged by ASOP 43's definition of the actuarial central estimate, the SEC, the rating agencies' dynamic risk models, companies' internal risk management, the [[Solvency II]] regime and the International Financial Accounting Standards.
- 1.1 Objectives
    - To give more practical detail on the [[Generalized Linear Model|Generalized Linear Model]], of which the ODP bootstrap model is a specific form: a GLM can be tailored to "fit" the statistical features found in the data, where a static method forces the data to fit the method.
    - To show how the framework can be used in practice, making practical adjustments for common data issues, with the diagnosis of its assumptions informing how much weight, if any, to give the model in relation to other models.
    - [[Model Risk|Model risk]] — the risk that the chosen model is not the one that generates future losses — is very real, and weighting or combining multiple models is a very practical way of addressing it, as actuaries already do with deterministic methods.

## 2 Notation
- The notation is that of the CAS Working Party on Quantifying Variability in Reserve Estimates (2005): loss data is a two-dimensional array (w, d) of accident period w ("when") and development age d ("delay"), available as an upper triangle for w = 1, 2, …, n and d = 1, 2, …, n − w + 1, with the diagonal w + d = k the accounting period.
- c(w, d) is the cumulative and q(w, d) the incremental loss of [[Accident Year|accident year]] w at age d; U(w) is the ultimate and R(w) the future development; f(d) and F(d) are factors relating to age d; e(w, d) is a random fluctuation; and x* is a randomly sampled value of x.

## 3 The Bootstrap Model
- The monograph focuses on the ODP bootstrap model, which reproduces the basic chain ladder, whose two key assumptions are that each accident year has the same development factor and that each accident year has a parameter representing its relative level — its latest cumulative value.
- Assuming instead that the accident years are completely [[Homogeneity|homogeneous]] would replace the latest values with column averages; the basic chain ladder treats them as not homogeneous, and the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] and [[Cape Cod Method|Cape Cod]] methods are a "blend" of the two extremes.
- 3.1 Origins of Bootstrapping
    - The earliest stochastic model for the actuarial array of cumulative development data is attributed to Kremer (1982), and the earliest discussion of bootstrapping is in Ashe (1986).
- 3.2 The Over-Dispersed Poisson Model
    - Renshaw and Verrall (1994) modeled the incremental claims q(w, d) directly as the response of a GLM with a log link and an [[Over-Dispersed Poisson Model|over-dispersed Poisson]] error distribution; England and Verrall (1999) showed that a specific form of the model is identical to the volume weighted chain ladder, and bootstrapped it by sampling the residuals with replacement.
    - The power z sets the error distribution — 0 for Normal, 1 for Poisson, 2 for gamma, 3 for inverse Gaussian — and the scale parameter φ is estimated in the fitting while the variance is set proportional to the mean ("over-dispersed" Poisson for z = 1).
    - With the Poisson error the fitted incremental values equal those derived from volume-weighted average development factors, by dividing the latest cumulative diagonal backwards; the monograph calls this the "simplified GLM" or "ODP Bootstrap", and it bridges to the deterministic framework.
    - England and Verrall (1999) note the deviance, Pearson and Anscombe residuals could all be used, but the [[Pearson Residual|Pearson residuals]] are the most desirable, being calculated consistently with the scale parameter; sampling them with replacement assumes they are independent and identically distributed, but not normal ("semi-parametric").
    - Each sample triangle is cumulated, and new average development factors are calculated and applied to give a point estimate; England and Verrall (2002) add process variance by treating each future incremental value as a [[Gamma|gamma]] with mean m and variance φm, giving a distribution of possible outcomes that incorporates process and parameter variance.
    - Pinheiro et al. (2001; 2003) replace the degrees of freedom adjustment factor with a [[Hat Matrix|hat matrix]] adjustment factor, giving standardized Pearson residuals, and exclude the zero-value residuals in the corners of the triangle from the sampling.
    - The model is parameterized by formulas 3.5–3.7 (with 3.5 as corrected by the errata):

> $$\mathrm{Var}[q(w,d)] = \phi\, E[q(w,d)]^{z} = \phi\, m_{w,d}^{z}$$

> $$\ln m_{w,d} = \eta_{w,d} = c + \alpha_w + \beta_d$$

- 3.3 Variations on the ODP Model
    - Focusing on the claim payment stream measures the variability of the cash flows, but the case reserves contain valuable information about potential future payments.
    - 3.3.1 Bootstrapping the Incurred Loss Triangle
        - A model of incurred data gives possible outcomes of the [[IBNR]], not of the unpaid; the random payment pattern of a paid model run in parallel can convert each iteration's incurred ultimates to a payment stream, or the ODP bootstrap can be applied to the Munich chain ladder model (Liu and Verrall 2010).
    - 3.3.2 Bootstrapping the Bornhuetter-Ferguson and Cape Cod models
        - The most recent accident years can show more variance than expected, because more development factors extrapolate their sampled values; working the Bornhuetter-Ferguson or generalized Cape Cod method into the model — a priori loss ratios simulated from a distribution, or the Cape Cod algorithm applied to every iteration — helps alleviate this.
- 3.4 The GLM Bootstrap Model
    - The chain ladder does not measure or adjust for [[Calendar Year Effect|calendar-year effects]] and, many would argue, over-fits the data; the "GLM Bootstrap" returns to the GLM framework and specifies only as many parameters as needed, including calendar-year trend parameters.
    - Only a parameter for every accident year and every development year, with a Poisson error distribution, exactly replicates the volume weighted average development factors.
    - Its drawbacks are that the GLM must be solved for each iteration and that the model is no longer directly explainable by development factors; it can also model shapes other than triangles, and its last development parameter can continue past the triangle to give a tail.

## 4 Practical Issues
- 4.1 Negative Incremental Values
    - The log link needs positive incremental values; a modified link (ln q for q > 0, 0 for q = 0 and −ln|q| for q < 0) leaves a negative development-column total as the only problem, and for that every incremental value is shifted by the largest negative ψ before fitting and the fitted values shifted back.
    - In the ODP bootstrap the residual and resampling formulas take the square root of the absolute value of the fitted incremental value.
    - 4.1.1 Negative Values During Simulation
        - A gamma needs positive parameters, so a negative future mean m is simulated either as −Gamma(|m|, φ|m|), which is skewed to the left, or as Gamma(|m|, φ|m|) + 2m, which keeps the mean m and the right skew.
        - Negative incremental values early in a resampled triangle can produce extremely large development factors and extreme iterations; the options are to remove those iterations, to recalibrate the model, or to limit incremental values to a minimum of zero.
- 4.2 Non-Zero Sum of Residuals
    - The standardized residuals should in theory have a mean of zero, but their average is usually non-zero; if a zero average is desired, a single constant can be added to all non-zero residuals.
- 4.3 Using an L-Year Weighted Average
    - The GLM bootstrap is fitted to the most recent L + 1 diagonals only, a trapezoid; the ODP bootstrap uses L-year average factors and residuals for the most recent L + 1 diagonals, but still resamples a whole triangle so that cumulative values can be calculated.
- 4.4 Missing Values
    - Missing values affect the development factors, the fitted triangle (if on the latest diagonal), the residuals and the degrees of freedom; they can be estimated from the surrounding values, or excluded from the factors with no corresponding residual.
- 4.5 Outliers
    - [[Outlier|Outliers]] can be removed and treated like missing values, or excluded from the factors and the residuals while the incremental value is still resampled; a significant number of them may mean the model is not a good fit — or only that the residuals are skewed, which the simulation reflects.
- 4.6 Heteroscedasticity
    - The model assumes the standardized Pearson residuals are independent and identically distributed (homoscedasticity); residuals that are more variable in some development periods than in others are [[Heteroscedasticity|heteroscedastic]].
    - The three options are stratified sampling within groups of development periods, hetero-adjustment factors that bring each group's residuals to a common standard deviation, and a different scale parameter for each group; the factors are new parameters, which affect the degrees of freedom.
- 4.7 Heteroecthesious Data
    - The basic model requires a symmetrical shape and homoecthesious data (similar exposures); heteroecthesious data — incomplete or uneven exposures — arises most often at interim evaluation dates.
    - 4.7.1 Partial First Development Period Data
        - The Pearson residuals are already "exposure independent", so only the projection is adjusted: the latest accident year's future incremental values are reduced to remove the exposure beyond the evaluation date.
    - 4.7.2 Partial Last Calendar Period Data
        - The last diagonal can be annualized for fitting, and de-annualized in each sample triangle before interpolated development factors project its future values.
- 4.8 Exposure Adjustment
    - Where exposures have changed dramatically, dividing the claim data by each accident year's exposures — pure premium development — may improve the fit; the results are multiplied back by the exposures after the process variance step.
- 4.9 Tail Factors
    - A [[Tail Factor|tail factor]] can be made stochastic by assuming it follows a distribution; a rough rule of thumb for its standard deviation is 50% or less of the tail factor minus one.
- 4.10 Fitting a Distribution to ODP Bootstrap Residuals
    - A 10 × 10 triangle gives only 53 residuals, so sampling from a distribution fitted to the residuals — parametric bootstrapping — is one way to overcome a lack of extreme residuals.

## 5 Diagnostics
- Diagnostic tests are designed to test the model's assumptions, to gauge the quality of its fit and to guide the adjustment of its parameters; the objective is not to find the one best model but a set of reasonable models.
- 5.1 Residual Graphs
    - [[Residual Plot|Residual graphs]] by development, accident and calendar period, and against the fitted incremental loss, test the assumption that the residuals are independent and identically distributed; for the Taylor and Ashe (1983) data the development-period graph reveals potential heteroscedasticity.
    - Graphs of the standard deviation and range relativities by development period help group the periods into "hetero" groups.
- 5.2 Normality Test
    - The model does not need normal residuals, but a normality plot, its P-value (above 5.0% passes) and R² help compare parameter sets; the [[AIC]] and [[BIC]] add a penalty for additional parameters, a smaller value indicating residuals that fit a normal distribution more closely.
- 5.3 Outliers
    - A [[Box Plot|box-whisker plot]] shows the inter-quartile range and median of the residuals, with whiskers to the largest values within three times the inter-quartile range; values beyond the whiskers may be considered outliers, and removing them calls for extreme caution.
- 5.4 Parameter Adjustment
    - Flat average lines in the residual graphs reflect a parameter for every accident and development period, a strong indication of over-parameterization; starting from a "basic" GLM bootstrap with one accident, one development and one calendar parameter, a good fit to the Taylor and Ashe data needs only five accident, three development and no calendar parameters.
    - A parameter is statistically significant if the absolute value of its t-statistic is greater than 2.
- 5.5 Model Results
    - 5.5.1 Estimated-Unpaid Results
        - Standard errors should increase from the oldest to the most recent accident years, the total's exceeding any single year's; [[Coefficient of Variation|coefficients of variation]] should generally decrease, the total's being less than any single year's.
        - A coefficient of variation rising again in the most recent years reflects parameter uncertainty overpowering process uncertainty, or a model overestimating the uncertainty — in which case a Bornhuetter-Ferguson or Cape Cod model may be needed; implausible minimum or maximum iterations call for a review of the assumptions.
    - 5.5.2 Mean, Standard Deviation and CoV of Incremental Values
        - The same statistics for every incremental value help locate the source of coefficient of variation issues in the estimated unpaid results.

## 6 Using Multiple Models
- Models can be combined by running them with the same random variables and weighting each iteration's incremental values, or with independent random variables and using the weights to randomly select a model for each iteration by accident year — a weighted "mixture" of models.
- Weighting stochastic models gives an actuarial best estimate of a distribution, which can be "shifted" additively (keeping the exact shape and width) or multiplicatively (keeping the shape but adjusting the width).
- For Schedule P, Part A, eight models — paid and incurred chain ladder, Bornhuetter-Ferguson, Cape Cod and GLM bootstrap — are weighted by accident year; the means of the models used give a "modeled range", and the models given weight in each year a "weighted range" ([[Range of Indications|range of indications]]).
- 6.1 Additional Useful Output
    - Normal, lognormal and gamma distributions fitted to the total unpaid distribution smooth its percentiles, and the Tail Value at Risk is the average of all simulated values equal to or greater than the percentile value.
- 6.2 Estimated Cash Flow Results
    - By calendar year the standard errors and coefficients of variation move in opposite directions from those by accident year: the final payments should be the smallest, yet relatively most uncertain.
- 6.3 Estimated Ultimate Loss Ratio Results
    - The loss ratios use all simulated values, past and future, so they show the variability from day one until all claims are paid, and inform pricing risk.
- 6.4 Estimated Unpaid Claim Runoff Results
    - The runoff of the total unpaid distribution by future calendar year is used in calculating [[Risk Margin|risk margins]] by the [[Cost of Capital|cost of capital]] method.
- 6.5 Distribution Graphs
    - A histogram of the total unpaid in 100 equal buckets, smoothed by a kernel density function, and a summary of the eight model distributions with their means.
- 6.6 Correlation
    - Aggregating segments needs a [[Correlation|correlation]] of their results: location mapping (synchronized bootstrapping) samples every segment's residuals at the same locations, preserving their correlation but requiring triangles of the same size; re-sorting (Iman-Conover or copulas) allows different shapes, sizes and correlation assumptions.
    - Correlations measured from residuals tend to be close to zero, and contagion between lines is not well measured this way, so the assumption can be changed by actuarial judgment.

## 7 Model Testing
- Testing of stochastic unpaid claim models is still in its infancy; the General Insurance Reserving Oversight Committee's papers for the GIRO conference (2007; 2008) compared the Mack and ODP bootstrap distributions with the "true" percentiles of artificial data sets built to satisfy each model's assumptions.
- 7.1 Bootstrap Model Results
    - In 30,000 simulated 10 × 10 data sets the "true" outcome exceeded the ODP bootstrap's 99th percentile about 2.6–3.1% of the time, and the [[Mack Chain Ladder Model|Mack]] method's about 8–13%: the ODP bootstrap performed better, though both under-predict the extremes.
- 7.2 Future Testing
    - The next step is testing against realistic data, which the CAS Loss Simulation Model Working Party (2011) model creates from the claim transaction level up.

## 8 Future Research
- Suggested areas include testing with realistic data, the adjustments' effect on predictive power, other extensions (the Munich chain ladder, Berquist-Sherman, claim counts and severities, deviance or Anscombe residuals), Bayesian weights for combining models, enterprise risk management, Solvency II and accounting standards, and the correlation matrix.

## 9 Conclusions
- The ODP bootstrap model should not be assumed to suit every data set, but the ODP and GLM bootstrap "toolsets" can become part of the actuary's regular estimation of unpaid claim liabilities, letting the actuary "fit" the model to the data.

## Supplementary Materials
- The companion files are in a zip file on casact.org: Model Instructions.pdf; the primary bootstrap modeling files (Industry Data, Bootstrap Models, Best Estimate, Aggregate Estimate and Correlation Ranks); and simple example files illustrating the GLM framework and ODP bootstrap for 3 × 3 and 6 × 6 triangles, and the GLM bootstrap with an outlier, a three-year average and reduced sets of parameters.

## Appendix A—Schedule P, Part A Results
- Results for Homeowners/Farmowners: each model's estimated unpaid, the model weights, the weighted best estimate and its tables.

## Appendix B—Schedule P, Part B Results
- The same results for Private Passenger Auto Liability.

## Appendix C—Schedule P, Part C Results
- The same results for Commercial Auto Liability.

## Appendix D—Aggregate Results
- The correlated aggregate of Parts A, B and C, using the correlation calculated from the paid data after adjustment for heteroscedasticity.

## Appendix E—GLM Bootstrap Results
- Results of the GLM bootstrap model for the Taylor and Ashe (1983) data, as illustrated in Figures 5.9 through 5.12.

## Errata
- Contents page and page 23: the title of Section 4.3 should be "Using an L-Year Weighted Average", to be consistent with the notation used in the section (printed as "Using an N-Year Weighted Average").
- Page 8, formula 3.5: a z parameter was left out; the variance should read Var[q(w, d)] = φE[q(w, d)]^z = φm^z.
- Page 12, the paragraph at the top of the page and footnote 16: the number of parameters p should be 2 × n − 1 (printed as 2 × (n − 1)).

## Related readings
- [[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)]] — cited in Section 5.3 for further diagnostic tests, and listed in the References

## Sources
- [Using the ODP Bootstrap Model: A Practitioner's Guide (Casualty Actuarial Society, 2016)](https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf) — the document: cover, abstract, copyright page and ISBNs, contents, Sections 1–9, the Supplementary Materials pages, the appendix titles and the References
- [Errata (Mark Shapland)](https://www.casact.org/sites/default/files/2021-02/Errata-ODP-Bootstrap-Monograph_4.pdf) — the three corrections under Errata
- [CAS Exam 7 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf) — the citation and the assigned scope
