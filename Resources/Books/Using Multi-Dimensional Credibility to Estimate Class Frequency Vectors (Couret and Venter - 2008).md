---
Title: "Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation"
Authors: "Jose Couret and Gary Venter"
Publisher: "ASTIN Bulletin"
Year: "2008"
date: "2008"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:204648044d10d944758b2e0c55efd3906e2babef9462996dad1f0c8588a13438
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors (Couret and Venter - 2008).md
---
![[Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors (Couret and Venter - 2008) - Cover.svg]]

A paper estimating the vector of claim frequency by injury type for each class of US workers compensation insureds with multi-dimensional credibility. Its abstract notes that rising deductibles have made fairly high excess coverage commonplace, putting growing emphasis on estimating the percentage of loss excess of high deductibles, of which the frequency of loss by injury type is a key element. That fraction has historically been calculated for hazard groups rather than individual classes; testing a hold-out sample, the authors show that credibility estimation by class adds information to a widely used seven-hazard-group system. ASTIN Bulletin 38(1), 2008, pp. 73–85.

> [!info] On the syllabus
> - [[Exam 8 (CAS)|Exam 8]] — objectives A2–A4; the whole paper

## Classes, hazard groups and injury types
- The regression framework for credibility started with Hachemeister (1975); the paper applies a small portion of it to estimate vectors of relative frequency by injury type for classes of US workers compensation insureds.
- Credibility is non-parametric, but because it minimizes squared error it may be inappropriate for heavy-tailed distributions, where credibility on the logarithms is often suggested; loss frequencies are probably safely within the applicability of squared error.
- US [[Workers Compensation Classification|workers compensation classes]] are based on industry breakdowns, and in some cases occupations within industries; class rates vary by state, but usually not among the regions within a state.
- True [[Excess Insurance|excess coverage]] is newer and now a large part of the business, so rating bureaus, large insurers and reinsurers are investigating ways to improve the estimation of excess costs for class/state cells.
- Traditionally that estimation used a four-hazard-group breakout to estimate injury-type frequencies; hazard groups are collections of classes similar in their excess loss potential relative to total losses. Bureaus now use as many as nine, seven being the industry standard, and some insurers and reinsurers have tried individual class excess rates.
- The paper compares its class credibility approach with the seven-hazard-group frequency-only method and finds that it improves estimation.
- Injury types: fatal (F), permanent total (PT), major permanent partial (major), minor permanent partial (minor), temporary total (TT) and medical-only (med). An illustrative breakout relative to TT has frequencies 0.006, 0.006, 0.085, 0.37, 1.00 and 4.3 and severities 60, 125, 40, 4, 1.00 and 0.2.
- Excess losses above different retentions are driven by different mixes of injury types, so a good estimate of the class relative frequency vector is a key step in calculating excess loss potential; the paper estimates the vector of relativities of F, PT, major and minor to TT.

## 1 Development of the Credibility Procedure
- The serious injury types have low frequencies, so class claim counts are fairly unstable, but they are correlated: the physical circumstances producing fatal, permanent total and major permanent partial injuries are often similar, so a class with many major claims is likely to have a higher-than-average propensity to produce PT and fatal claims. [[Multi-Dimensional Credibility|Multi-dimensional credibility]] uses the correlations to improve the estimate of each element.
- Credibility is similar to regression — a linear model fit by minimizing squared errors — but it estimates the unobserved population mean of a group: a regression whose dependent variable is not observed, with a model postulated for how the observations arise from it. The approach applies the methods of Venter (1985).
- In the standard [[Bühlmann Credibility|Bühlmann]] approach, with hypothetical mean $\mu(\theta)$, process variance $v(\theta)$, [[Expected Value of Process Variance|expected process variance]] $v$ and [[Variance of Hypothetical Means|variance of the hypothetical means]] $a$, $\mu(\theta)$ is estimated by $zX^* + (1 - z)\mu$ with $z = n/(n + k)$ and $k = v/a$.
- For two estimators of $C$ with expected squared errors $s^2$ and $t^2$, the weight minimizing the expected squared error is $z = E(t^2)/[E(s^2) + E(t^2)]$: each estimator's weight is proportional to the reciprocal of its variance.
- The procedure is applied to ratios of claim counts to TT counts — $V$, $W$, $X$ and $Y$ for F, PT, major and minor — with class $i$'s hypothetical mean ratios $v_i$, $w_i$, $x_i$ and $y_i$. Each TT claim is an exposure that could produce a PT claim, so the observed ratio for class $i$ at time $t$, based on $m_{it}$ TT claims, is:

> $$W_{it} = w_i + \frac{1}{m_{it}} \sum_{j=1}^{m_{it}} \varepsilon_{jt}$$

- The innovations have mean zero and a standard deviation $\sigma_{W_i}$ that varies by class but not by time, so $\text{Var}(W_{it} \mid w_i) = \sigma^2_{W_i}/m_{it}$; for the class mean $W_i$ over all periods, weighted by $m_{it}$, $\text{Var}(W_i \mid w_i) = \sigma^2_{W_i}/m_i$.
- The estimate of $w_i$ is the linear combination of the class's sample means for all the injury types that minimizes the expected squared error across the classes of the hazard group, which becomes:

> $$\begin{aligned} Ew_i &+ b(V_i - EV_i) + c(W_i - EW_i) \\ &+ d(X_i - EX_i) + e(Y_i - EY_i) \end{aligned}$$

- If the class's own data gets zero credibility, the hazard group ratio is used; when only the class's own $W_i$ is used, $c$ is the traditional credibility factor $Z$.
- Setting the derivatives to zero gives four equations, written as one matrix equation (4), with $C$ the covariance matrix of the class's injury-type sample means:

> $$C \cdot \begin{pmatrix} b \\ c \\ d \\ e \end{pmatrix} = \begin{pmatrix} \text{Cov}(V_i, w_i) \\ \text{Cov}(W_i, w_i) \\ \text{Cov}(X_i, w_i) \\ \text{Cov}(Y_i, w_i) \end{pmatrix}$$

- The diagonal elements of $C$ for class $i$ are $\text{EPV}_V/m_i + \text{VHM}_V$, $\text{EPV}_W/m_i + \text{VHM}_W$, and so on. Because the observed ratios are the class-injury means plus independent random draws, $E[\text{Cov}(V_i, W_i \mid \lambda)] = 0$, so the off-diagonal elements are $\text{Cov}(v_i, w_i)$, estimated by the sample covariance $\sum (V_i - V)(W_i - W)\,m_i/m$; on the right-hand side $\text{Cov}(W_i, w_i) = \text{VHM}_W$.
- $\text{VHM}$ and $\text{EPV}$ are estimated with Dean's (2005) formulas (5) and (6); a negative VHM estimate is set to 0, since the EPV then accounts for all the observed variation:

> $$\widehat{\text{VHM}}_V = \frac{\sum_{i=1}^{R} m_i (V_i - V)^2 - (R - 1)\,\widehat{\text{EPV}}_V}{m - \frac{1}{m} \sum_{i=1}^{R} m_i^2}$$

> $$\widehat{\text{EPV}}_V = \frac{\sum_{i=1}^{R} \sum_{t=1}^{N} m_{it} (V_{it} - V_i)^2}{R(N - 1)}$$

- $\widehat{\text{EPV}}$ is not divided by the sum of the $m$'s: it is the process variance per unit of exposure, here the TT count.

## 2 Performance Testing
- Seven years of class data were available at various levels of maturity; the immature first report was discarded, and relativities calculated from the even reports (2, 4 and 6) were used to predict the [[Holdout Sample|hold-out sample]] of odd reports (3, 5 and 7). Holding out the last two years gave comparable results, but alternating years is more neutral to trend and loss development.
- Table A, the sum of squared prediction errors for the ratio of major permanent partial to TT claims over about 16,000 state-class combinations: 1,425.0 predicting by hazard group, 2,201.7 by raw even-year class data and 1,405.6 by the credibility procedure. Table B gives the totals for fatal, PT, major PP, minor PP and medical-only: the credibility procedure is lowest and raw class data highest for each.
- The reduction is modest. The procedure minimizes the expected deviation from the true class mean over the same period, while the test uses the odd years as a proxy for it; unknown covariates vary between years, a class code's portfolio of policies changes over time, and individual class-state ratios are quite volatile.
- Tests of CAPM met a similar measurement problem and grouped stocks into portfolios ranked by beta (Black, Jensen and Scholes). Ranked portfolios of state-class combinations show a significant improvement, using the [[Quintiles Test|quintiles test]] NCCI developed for testing its experience rating plan — a logical extension of Dorweiler's criteria (Gillam 1992); class relativities to the hazard group play the part of experience rating modifications.
- Table C, hazard group D, PT claims: the classes are grouped into quintiles by credibility-weighted relativity from the even years, with about equal TT claims in each, and each quintile's odd-year relativity to the hazard group (0.4951, 0.8634, 0.9861, 1.1269, 1.5215) is predicted three ways:
    - hazard group — 1.0000 for every quintile, too high for the first three and too low for the last two; sum of squared errors 0.5618
    - raw even-year class relativities — 0.3065 to 2.1547, a slope too steep because the odd years regress toward the mean; 0.7315
    - the multi-dimensional credibility procedure — 0.5648 to 1.4519; 0.0105
- Table D, the quintiles-test sums of squared errors for fatal, PT and major by hazard group: the results are similar for most combinations, the exception being hazard group A, which the test suggests is homogeneous. For major, raw class data gives surprisingly good estimates for the quintiles once the credibility procedure has defined them, but Table B shows raw class data does poorly for individual classes.
- In $R^2$ terms, the class relativities could be said to "explain" 98% of the between-quintiles variance.
- Figures 1 and 2: the predicted PT:TT and major:TT ratios by class are distributed around the hazard-group ratios, tightly in some hazard groups and widely in others; the later hazard groups have higher means and greater dispersion of classes about the mean.

## 3 Conclusions
- Individual class experience contains information relevant to future large loss relative frequency; a correlated credibility approach using the relationships among injury-type frequencies within each class can use it.

## References
- Black, Jensen and Scholes (1972); Bodie, Kane and Marcus (1999); Dean (2005); Dorweiler (1934); Gillam (1992); Hachemeister (1975); Harwayne (1966); Venter (1985)

## Sources
- [Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation (ASTIN Bulletin, 2008)](https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf) — the document, read from its text layer and, for the equations, tables and figures, its page images: title, authors, abstract, the three numbered sections, Tables A–D, Figures 1–2 and the references. The introduction runs untitled under the paper's repeated title, so its heading above is this page's. The first page's footer gives *Astin Bulletin* 38(1), 73–85 and "© 2008 by Astin Bulletin"
- [CAS Exam 8 Content Outline, Fall 2026 (v03, June 2026)](https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf) — the citation (Vol. 38, No. 1, May 2008, which the outline gives as pp. 72–85) and the assigned objectives
