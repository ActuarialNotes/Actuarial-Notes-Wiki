---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:b223350635f6abe31e33576bf6b71fa618b03da08c1f87643a47c090ed8014a3
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §3.1.1 pp.61-62 (PDF 71-72: e_i = y_i - y-hat_i, RSS = e_1^2 + ... + e_n^2, eq. 3.3); §3.2 p.71 (PDF 81: 'p distinct predictors'); eq. 3.24 p.77 (PDF 87: n - p - 1 df); §3.3.3 items 4-5 pp.97-99 (PDF 107-109: studentized residual = e_i over its estimated standard error, |r| > 3 possible outlier; average leverage (p+1)/n), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018; MAS-I reading) — publisher preview: §2.2.1 p.23 (PDF 40: residual Y - theta-hat; Poisson approximate standardized residual (Y - theta-hat)/sqrt(theta-hat)), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "Shalizi, CMU 36-401 Modern Regression (Fall 2015), Lecture 20 'Outliers and Influential Points', §3 eqs. 23-29 PDF pp.10-12 (Var[e_i] = sigma^2 (1 - H_ii); r_i = e_i/(sigma-hat sqrt(1 - H_ii)) 'standardized or studentized'), §4.1-4.2 eqs. 32-37 PDF pp.12-13 (externally studentized t_i = e_i/(sigma-hat_(-i) sqrt(1 - H_ii)) ~ t_{n-p-2}, p predictors with p + 1 coordinates; naming varies), sha256:9c64986b7180e09c42899a5c904b88db69c16c1b7a7f099b7cc14834f30ad850 — https://www.stat.cmu.edu/~cshalizi/mreg/15/lectures/20/lecture-20.pdf"
    - "Penn State STAT 501, Lesson 11 'Influential Points', §11.3-11.4 (internally studentized = Minitab's 'standardized'; externally studentized ~ t with (n-1) - p df, p = coefficients incl. intercept, n = 21, p = 2 -> 18 df; |r| > 3), sha256:6229ca1803f9d152028893131b323ac3ebdff7b49733518cc14a77a87200dbb9 — https://online.stat.psu.edu/stat501/Lesson11"
    - "Shedden, 'Fitting and inference for linear models using least squares' (U. Michigan regression notes, Oct 2021), slides 12 and 60 (residuals sum to zero when X includes an intercept), sha256:a5bd6e211288d845a8edd8e3c541920708ca811800460599c1484e7f9a6b2f7a — https://dept.stat.lsa.umich.edu/~kshedden/Courses/Regression_Notes/least-squares.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5, 2025 revision), §6.3 and §6.3.1 pp.67-69 (PDF 77-79: raw residual's variance depends on its mean; deviance residual squared = the record's contribution to the unscaled deviance, signed as y - mu; adjusted for the distribution's shape, approximately normal with constant variance if the distribution is right; gamma severity q-q plot, Figure 16; 'Discrete Distributions': Poisson/negative binomial deviance residuals cluster in tight groups and will likely not be normal, randomized quantile or binned working residuals instead, aggregation smooths it out), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "statsmodels 0.15 documentation, GLMResults.resid_pearson: Pearson residuals = (endog - mu)/sqrt(VAR(mu)), VAR the family's variance function, sha256:a88ec9a98794d3c906c89c6c4b33107e34c78c23e4dc287d3caba054520a9882 — https://www.statsmodels.org/stable/generated/statsmodels.genmod.generalized_linear_model.GLMResults.resid_pearson.html"
    - "Rodriguez, GLM lecture notes (Princeton), ch.3 'Logit Models for Binary Data' §3.8.1 PDF p.47 (Pearson residual = (y - mu-hat) over the SD of the observation; its square is the observation's contribution to Pearson's chi-squared; approximately normal with grouped data, not with individual data), sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf"
    - "Rodriguez, GLM lecture notes, ch.4 'Poisson Models for Count Data' §4.2.2 PDF pp.7-8 (Poisson deviance D = 2 sum{y log(y/mu-hat) - (y - mu-hat)}; Pearson chi^2 = sum (y - mu-hat)^2/mu-hat), sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf"
    - "Rodriguez, 'Models for Count Data With Overdispersion' (GLM notes addendum, rev. Oct 2022), §1 PDF p.2 (phi-hat = Pearson chi^2/(n - p)), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf"
    - "Rodriguez, 'Models for Longitudinal and Clustered Data' (GLM notes, rev. Dec 2012), PDF p.4 (random intercept: cov(Y_ij, Y_ij') = sigma_a^2, var = sigma_a^2 + sigma_e^2, intra-class correlation sigma_a^2/(sigma_a^2 + sigma_e^2)), sha256:59a9530438fb4812feeabbb9abdc8eb89551e1f8d457cd8e18faf77601e40ce3 — https://grodri.github.io/glms/notes/c8.pdf"
    - "Loy & Hofmann, 'HLMdiag: A Suite of Diagnostics for Hierarchical Linear Models in R', J. Stat. Softw. 56(5) (2014), §1.1 p.3 (y_i ~ N(X_i beta, sigma^2 V_i), V_i = I + Z_i D Z_i^T), §2 p.4 (conditional eps_i = y_i - X_i beta - Z_i b_i; marginal zeta_i = y_i - X_i beta = Z_i b_i + eps_i, defined on the true parameters) and §2.1 p.7 (LS level-1 residuals have VAR = sigma_i^2 (1 - h_i)), sha256:9617af122fc354147433f01e5db23d77526c052d3e46bb025e5be1641fe1b39d — https://www.jstatsoft.org/index.php/jss/article/view/v056i05/v56i05.pdf"
    - "R nlme documentation, corCompSymm ('compound symmetry structure corresponding to uniform correlation'), sha256:d229d15f46db9742d692df9a9cef108cc9a079aedfd5783be98b6e79d41ce5bd — https://stat.ethz.ch/R-manual/R-devel/library/nlme/html/corCompSymm.html; and corAR1 ('autocorrelation structure of order 1'), sha256:af0b691e42714aa1b79fac208a272a50b1ff3781a81a312eb2ef77678ca3e847 — https://stat.ethz.ch/R-manual/R-devel/library/nlme/html/corAR1.html"
    - "Penn State STAT 510, Lesson 3 'Identifying and Estimating ARIMA models', §3.1 diagnostics (residual ACF non-significant for a good model; Box-Pierce (Ljung) tests) and Appendix 'Standardized Residuals' (x_t - E(x_t | x_{t-1}, ...), the one-step prediction error), sha256:6c42884601a4af7581fc2047d4b89f77ab0428abbf19fc42567869f308acaca8 — https://online.stat.psu.edu/stat510/Lesson03"
    - "NIST/SEMATECH e-Handbook of Statistical Methods: §6.4.4.8 Box-Jenkins Model Diagnostics (residuals should be white noise), sha256:ff0ab766733c55c42ca81dee412017451b38592283cca0f634c6b0ea6a9886a3 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc448.htm; §6.4.4.8.1 Box-Ljung Test (reject if Q > chi^2_{1-alpha, h}), sha256:8036ceab7b51d1c34619b736b1fc1262352d4027b398ecfaab4accc850f07bbf — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc4481.htm; §1.3.3.1 Autocorrelation Plot (randomness bands +/- z_{1-alpha/2}/sqrt(N)), sha256:51a1bd95926ded552f07ab1de7f8af1b64013fea48d960e3f525af8874be93c7 — https://www.itl.nist.gov/div898/handbook/eda/section3/autocopl.htm"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 7-8 and readings (PDF p.5), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain B 'Linear Mixed Models' (reading West) and Domain D 'Time Series with Constant Variance' (reading Cowpertwait), PDF pp.2-3, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Residual.md
---

A **Residual** is the difference between an observed response and the [[Fitted Values|fitted value]] a model gives it. The residual of observation $i$ is

> $$e_i = y_i - \hat{y}_i$$

- $y_i$ is the observed response, and $\hat{y}_i$ is its fitted value.

A residual is the observable estimate of the model's error $\varepsilon_i$. In a [[Ordinary Least Squares|least squares]] fit with an intercept the residuals sum to zero, and the sum of their squares is the [[Residual Sum of Squares|residual sum of squares]]. Every [[Model Diagnostics|model diagnostic]], such as the [[Residual Plot|residual plot]] and the [[QQ Plot|QQ plot]], looks for structure left in the residuals.

> [!example]- A fitted line is $\hat{y} = 2.3 + 0.5x$. An observation has $x = 4$ and $y = 3.9$. What is its residual? {Example}
> - The fitted value is $2.3 + 0.5(4) = 4.3$.
> - The residual is $3.9 - 4.3 = -0.4$. It is negative because the observation lies below the fitted line.

## Standardized residuals and Cook's distance

In linear regression the variance of the residual $e_i$ is $\sigma^2(1 - h_{ii})$, where $h_{ii}$ is the [[Hat Matrix#Leverage|leverage]] of observation $i$. The standardized residual divides each residual by its estimated standard deviation:

> $$r_i = \frac{e_i}{\hat\sigma \sqrt{1 - h_{ii}}}$$

- $\hat\sigma^2 = \text{RSS}/(n - p - 1)$ is the estimate of the error variance.

The studentized residual uses an estimate of $\sigma$ computed without observation $i$. A standardized or studentized residual greater than 3 in absolute value flags a possible [[Outlier|outlier]]. Cook's distance measures the influence of observation $i$ by combining its standardized residual with its leverage:

> $$D_i = \frac{r_i^2}{p + 1} \cdot \frac{h_{ii}}{1 - h_{ii}}$$

- $p + 1$ is the number of coefficients including the intercept, which is 2 in simple linear regression.

An observation with $D_i$ greater than 1 is usually treated as influential.

> [!example]- A simple linear regression has $\hat\sigma = 0.6$. Observations A and B both have residual $0.5$, with leverages $0.20$ and $0.92$. What are their standardized residuals and Cook's distances? {Example}
> - For A, $r_A = 0.5/(0.6\sqrt{0.80}) = 0.93$, and $D_A = \frac{0.93^2}{2} \cdot \frac{0.20}{0.80} = 0.11$.
> - For B, $r_B = 0.5/(0.6\sqrt{0.08}) = 2.95$, and $D_B = \frac{2.95^2}{2} \cdot \frac{0.92}{0.08} = 49.9$.
> - The raw residuals are equal, but B's leverage pulls the fit toward it, so its residual is large relative to its standard deviation and B is highly influential.

## Pearson and deviance residuals

In a [[Generalized Linear Model|generalized linear model]] the variance of the response depends on its mean, so raw residuals are not comparable across observations. The Pearson residual divides the raw residual by the standard deviation the model assumes:

> $$r_i^{P} = \frac{y_i - \hat\mu_i}{\sqrt{V(\hat\mu_i)}}$$

- $\hat\mu_i$ is the fitted mean, and $V$ is the [[Variance Function|variance function]].

The sum of the squared Pearson residuals is the Pearson $\chi^2$ statistic, and dividing it by the residual degrees of freedom estimates the [[Dispersion Parameter|dispersion parameter]] $\phi$. Because Pearson residuals are standardized, one that is large in absolute value flags an unusual observation. The [[Deviance Residual|deviance residual]] is

> $$r_i^{D} = \text{sign}(y_i - \hat\mu_i)\sqrt{d_i}$$

- $d_i$ is observation $i$'s contribution to the [[Deviance|deviance]], so the squared deviance residuals sum to $D$.

For a Poisson model, observation $i$'s contribution to the deviance is

> $$d_i = 2\left[y_i \ln\frac{y_i}{\hat\mu_i} - (y_i - \hat\mu_i)\right]$$

- The term $y_i \ln(y_i/\hat\mu_i)$ is taken as 0 when $y_i = 0$.

If the model's distribution is right, the deviance residuals of a continuous response are close to normal, so a QQ plot of them that follows the reference line shows no departure from the assumed distribution.

> [!example]- A Poisson model gives two policies the fitted mean 1.2. One had 3 claims and the other none. What are their Pearson and deviance residuals? {Example}
> - For $y = 3$, $r^P = (3 - 1.2)/\sqrt{1.2} = 1.643$.
> - For $y = 3$, $d = 2[3 \ln(3/1.2) - 1.8] = 1.898$, so $r^D = \sqrt{1.898} = 1.378$.
> - For $y = 0$, $r^P = -1.2/\sqrt{1.2} = -1.095$.
> - For $y = 0$, $d = 2(1.2) = 2.4$, so $r^D = -\sqrt{2.4} = -1.549$.

## Residuals of a linear mixed model

In a [[Linear Mixed Model|linear mixed model]] $\mathbf{y} = \mathbf{X}\boldsymbol\beta + \mathbf{Z}\mathbf{b} + \boldsymbol\varepsilon$, the conditional errors $\boldsymbol\varepsilon$ have covariance matrix $\mathbf{R}$, and the marginal errors $\mathbf{Z}\mathbf{b} + \boldsymbol\varepsilon$ have covariance matrix

> $$\mathbf{V} = \mathbf{Z}\mathbf{D}\mathbf{Z}^T + \mathbf{R}$$

- $\mathbf{Z}$ is the design matrix of the [[Random Effects|random effects]] $\mathbf{b}$, and $\mathbf{D}$ is their covariance matrix.

The marginal residuals $\mathbf{y} - \mathbf{X}\hat{\boldsymbol\beta}$ and the conditional residuals $\mathbf{y} - \mathbf{X}\hat{\boldsymbol\beta} - \mathbf{Z}\hat{\mathbf{b}}$ are checked against this [[Covariance Structure|covariance structure]]. With one random intercept per subject, $\mathbf{Z}_i$ is a column of ones and $\mathbf{D}$ is the between-subject variance $\sigma_b^2$.

> [!example]- A random-intercept model has $\sigma_b^2 = 40$ and independent conditional errors with $\sigma^2 = 160$. What covariance matrix does it imply for one subject's three marginal errors, and what is their correlation? {Example}
> - $\mathbf{Z}_i \mathbf{D} \mathbf{Z}_i^T$ is $40$ in every entry, and $\mathbf{R}_i = 160\,\mathbf{I}$.
>
> $$\mathbf{V}_i = \begin{bmatrix} 200 & 40 & 40 \\ 40 & 200 & 40 \\ 40 & 40 & 200 \end{bmatrix}$$
>
> - The [[Intraclass Correlation|intraclass correlation]] between any two errors of the subject is $40/200 = 0.20$.

## Residuals of a time series model

The residuals of a time series model such as an [[ARIMA]] model are its one-step-ahead forecast errors:

> $$e_t = y_t - \hat{y}_{t \mid t-1}$$

- $\hat{y}_{t \mid t-1}$ is the forecast of $y_t$ made from the observations up to time $t - 1$.

If the model has captured the dependence in the series, its residuals are [[White Noise|white noise]], and no autocorrelation of the residuals in the [[Correlogram|correlogram]] lies outside $\pm 1.96/\sqrt{n}$.

> [!example]- The residuals of a model fitted to 100 observations have lag-3 autocorrelation 0.25 and no other large autocorrelation. Are they white noise? {Example}
> - The bounds are $\pm 1.96/\sqrt{100} = \pm 0.196$.
> - The lag-3 autocorrelation of 0.25 lies outside the bounds, so the residuals are not white noise.
> - The model has missed dependence at lag 3.
