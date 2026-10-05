---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:a20aefadf33639d2ef883e620eab3bf173eb0c1bc3d28906588a02267a773184
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

A **residual** is the part of an observation a fitted model does not explain: the observed value minus the [[Fitted Values|fitted value]]. It is the sample stand-in for the unobservable error $\varepsilon_i$, and every [[Model Diagnostics|diagnostic]] — the [[Residual Plot]], the [[QQ Plot]], the residual [[Autocorrelation Function|ACF]] — asks whether the residuals still contain structure.

> $$e_i = y_i - \hat{y}_i$$

> $$r_i = \frac{e_i}{\hat\sigma\sqrt{1 - h_{ii}}}$$

**Linear regression.**

- $e_i$ is the **raw** residual. Even when the errors have constant variance the residuals do not: $\mathrm{Var}(e_i) = \sigma^2(1 - h_{ii})$, where $h_{ii}$ is the leverage from the [[Hat Matrix|hat matrix]]
- $r_i$ is the **standardized** (internally studentized) residual. The **externally studentized** residual uses $\hat\sigma_{(i)}$, estimated with observation $i$ left out, and follows a $t$ distribution with $n - p - 2$ degrees of freedom, where $p$ is the number of predictors ($p + 1$ coefficients with the intercept). Texts differ on which one they call "studentized"; either way, values beyond about $\pm 3$ flag an [[Outlier|outlier]]
- With an intercept, [[Ordinary Least Squares|OLS]] residuals sum to zero, and their squares sum to the [[Residual Sum of Squares]]

**Generalized linear models.** When the variance depends on the mean, raw residuals are not comparable across observations, so two scaled versions are used:

> $$r_i^{P} = \frac{y_i - \hat\mu_i}{\sqrt{V(\hat\mu_i)}}$$

> $$r_i^{D} = \operatorname{sign}(y_i - \hat\mu_i)\sqrt{d_i}$$

- The **Pearson residual** divides by the standard deviation implied by the [[Variance Function|variance function]] $V$. Its squares sum to the Pearson $\chi^2$ statistic, which divided by the residual degrees of freedom estimates the [[Dispersion Parameter|dispersion]]
- The **deviance residual** uses $d_i$, observation $i$'s contribution to the [[Deviance|deviance]], so its squares sum to $D$. For Poisson, $d_i = 2\left[y_i \ln(y_i/\hat\mu_i) - (y_i - \hat\mu_i)\right]$, with $y \ln y = 0$ at $y = 0$. Deviance residuals are adjusted for the shape of the assumed distribution, so if it is right they are approximately Normal with constant variance, and a QQ plot of them tests the choice for a continuous response such as a gamma severity. For a discrete response (Poisson, negative binomial) they fall in tight clusters and will likely not look Normal unless the data are highly aggregated; randomized quantile residuals or binned working residuals are used instead

**Linear mixed models.** The model's *conditional* errors $\boldsymbol\varepsilon = \mathbf{y} - \mathbf{X}\boldsymbol\beta - \mathbf{Z}\mathbf{b}$ have covariance $\mathbf{R}$, and its *marginal* errors $\mathbf{y} - \mathbf{X}\boldsymbol\beta = \mathbf{Z}\mathbf{b} + \boldsymbol\varepsilon$ have covariance $\mathbf{V} = \mathbf{Z}\mathbf{D}\mathbf{Z}^\top + \mathbf{R}$. Conditional residuals $\mathbf{y} - \mathbf{X}\hat{\boldsymbol\beta} - \mathbf{Z}\hat{\mathbf{b}}$ and marginal residuals $\mathbf{y} - \mathbf{X}\hat{\boldsymbol\beta}$ estimate them, but like OLS residuals they are computed from estimates, so their covariances only approximate $\mathbf{R}$ and $\mathbf{V}$. The [[Variance Components|variance components]] therefore imply a [[Covariance Structure|covariance structure]] that the residuals are checked against, and the [[Intraclass Correlation|intraclass correlation]] is the correlation between two marginal errors in the same group.

**Time series.** An [[ARIMA]] model's residuals are its one-step-ahead forecast errors, $\hat\varepsilon_t = y_t - \hat{y}_{t \mid t-1}$. If the model has captured the dependence they are [[White Noise|white noise]]: no spike in the [[Correlogram|correlogram]] of their ACF or [[Partial Autocorrelation Function|PACF]] outside $\pm 1.96/\sqrt{n}$, and a Ljung–Box statistic below its $\chi^2$ critical value. A spike that survives points to the AR or MA term that is missing.

> [!example]- Pearson and Deviance Residuals for Claim Counts {Example}
> A Poisson frequency GLM gives two policies the same fitted mean $\hat\mu = 1.2$. One had $3$ claims, the other none. Compute both residuals for each.
>
> > [!answer]-
> > For $y = 3$:
> > $$
> > \begin{align*}
> > r^P &= \frac{3 - 1.2}{\sqrt{1.2}} \\
> > &= 1.643 \\
> > d &= 2\left[3\ln\frac{3}{1.2} - (3 - 1.2)\right] \\
> > &= 1.898 \\
> > r^D &= +\sqrt{1.898} \\
> > &= 1.378
> > \end{align*}
> > $$
> > For $y = 0$: $r^P = -1.2/\sqrt{1.2} = -1.095$, and $d = 2(1.2) = 2.4$, so $r^D = -\sqrt{2.4} = -1.549$.
> >
> > The Pearson residuals are lopsided — a large positive value for a claim-heavy policy, a modest negative one for a claim-free policy — because a Poisson count is right-skewed. The deviance residuals pull the two toward symmetry. Even so, with individual policy counts every claim-free policy with the same fitted mean gets the same residual, so the residuals fall in tight clusters and will likely not look Normal on a QQ plot. For individual Poisson data, randomized quantile residuals or binned working residuals are the better check.

> [!example]- A Small Residual at a High-Leverage Point {Example}
> A regression has $\hat\sigma = 0.6$. Observation A has raw residual $e = 0.5$ and leverage $h = 0.20$; observation B has the same raw residual and $h = 0.92$. Standardize both.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > r_A &= \frac{0.5}{0.6\sqrt{0.80}} \\
> > &= 0.93 \\
> > r_B &= \frac{0.5}{0.6\sqrt{0.08}} \\
> > &= 2.95
> > \end{align*}
> > $$
> > Identical raw residuals, very different messages. B pulls the fit so hard toward itself that a residual of $0.5$ is nearly three standard deviations of what its position allows. Screening raw residuals alone would miss it.

> [!example]- The Error Covariance Implied by a Random Intercept {Example}
> Annual loss ratios for each policyholder are modelled with a random intercept, $\hat\sigma_b^2 = 40$ and $\hat\sigma^2 = 160$, independent conditional errors. Write the covariance matrix the model implies for one policyholder's three marginal errors, and their correlation.
>
> > [!answer]-
> > $$
> > \mathbf{V}_i = \sigma_b^2\mathbf{J} + \sigma^2\mathbf{I} = \begin{bmatrix} 200 & 40 & 40 \\ 40 & 200 & 40 \\ 40 & 40 & 200 \end{bmatrix}
> > $$
> > Here $\mathbf{J}$ is the $3 \times 3$ matrix of ones. Each variance is $40 + 160 = 200$ and every pair of years shares the policyholder's intercept, so the correlation is $40/200 = 0.20$ at every lag — compound symmetry. The fitted marginal residuals $\mathbf{y}_i - \mathbf{X}_i\hat{\boldsymbol\beta}$ only approximate this structure, because $\hat{\boldsymbol\beta}$ is estimated. The conditional residuals should look uncorrelated; if their correlation instead falls off with the gap between years, an AR(1) structure for $\mathbf{R}$ is the next model to try.
