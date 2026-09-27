---
Title: "LDF Curve-Fitting and Stochastic Reserving: A Maximum Likelihood Approach"
Authors: "David R. Clark"
Publisher: "Casualty Actuarial Society"
Year: "2003"
date: "2003"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/7_Clark.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2a450bc676045585ab8b8d915131e3958556558cda7cb5eafc648c88676e6309
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/LDF Curve-Fitting and Stochastic Reserving (Clark - 2003).md
---
![[LDF Curve-Fitting and Stochastic Reserving (Clark - 2003) - Cover.svg]]

A paper applying maximum likelihood estimation to model the distribution of loss development from data in the common triangle format. The model estimates future loss emergence and the variability around that estimate, and shows how an exposure base supplementing the triangle reduces that variability; practical issues of estimation error and extrapolation are also discussed. Its author, David R. Clark of American Re-Insurance, wrote it for the CAS 2003 Reserves Call Paper Program under the alternative title *How to Increase Reserve Variability with Less Data*.

> [!info] On the syllabus
> - [[Exam 7 (CAS)|Exam 7]] — objectives A2–A3, A6–A8 and A11; the whole paper.

## Introduction
- The paper focuses on one statistical model of the loss reserving process, using [[Maximum Likelihood Estimation|maximum likelihood estimation]] with the common Loss Development Factor and [[Cape Cod Method|Cape Cod]] techniques; most of it is a practical example of using the techniques and interpreting the output.
- The primary objective is a tool describing loss emergence (reporting or payment) in simple mathematical terms, as a guide to selecting carried reserves; a model can become one key indication, but should never be expected to replace a knowledgeable analyst.
- The secondary objective is a means of estimating the range of possible outcomes around the "expected" reserve, a range due to both random "process" variance and uncertainty in the estimate of the expected value.
- A statistical loss reserving model therefore has two key elements: the expected amount of loss to emerge in some time period, and the distribution of actual emergence around that expected value.

## 1 Expected Loss Emergence
- Expected emergence comes from an estimate of the ultimate loss by year and an estimate of the emergence pattern; the pattern moves from 0 to 100% and is described with the form of a cumulative distribution function, without implying any probabilistic model — a [[Growth Curve|growth curve]] $G(x) = 1/LDF_x$, the cumulative percent reported (or paid) as of time $x$.
- The time index $x$ is the time from the "average" accident date to the evaluation date; Appendix B gives the details for different exposure periods.
- Two curve forms, each with a scale $\theta$ and a shape $\omega$ ("warp"): the loglogistic, familiar as Sherman's "inverse power" curve and treated as the benchmark result, and the Weibull, which will generally give a smaller [[Tail Factor|tail factor]]:

> $$G(x \mid \omega,\theta) = \frac{x^{\omega}}{x^{\omega}+\theta^{\omega}}$$

> $$G(x \mid \omega,\theta) = 1-\exp\!\left(-(x/\theta)^{\omega}\right)$$

- The curves assume expected emergence moves from 0% to 100% in a strictly increasing pattern; the model still works if some actual points decrease, but a line with real expected negative development (such as significant salvage recoveries) needs a different model.
- Parameterized curves simplify estimation to two parameters, accept data not strictly from a triangle with evenly spaced evaluation dates, and give a smooth pattern that does not follow every random movement in the historical [[Age to Age Factor|age-to-age factors]].
- The expected incremental loss $\mu_{AY;x,y}$ between ages $x$ and $y$ comes from one of two methods: Method #1, "Cape Cod", with three parameters ($ELR$, $\omega$, $\theta$), which assumes a known relationship between the years' expected ultimates identified by an [[Exposure Base|exposure base]] (usually on-level premium); or Method #2, "LDF", with $n+2$ parameters, which assumes each accident year's ultimate is independent of the others:

> $$\mu_{AY;x,y} = \text{Premium}_{AY}\cdot ELR\cdot\left[G(y)-G(x)\right]$$

> $$\mu_{AY;x,y} = ULT_{AY}\cdot\left[G(y)-G(x)\right]$$

- Method #1 will generally be preferred: a ten-year triangle gives the model 55 data points, against which the Cape Cod method estimates 3 parameters and the LDF method 12, so overparameterization is a real problem for the LDF method.
- The Cape Cod method may have somewhat higher estimated process variance but will usually produce a significantly smaller estimation error — the value of the information in the exposure base, and the point of the paper's ironic subtitle.

## 2 The Distribution of Actual Loss Emergence and Maximum Likelihood
- Maximum likelihood gives both the "best" parameters and the variance around the expected value, estimated in two pieces: [[Process Risk|process variance]] (the "random" amount) and [[Parameter Risk|parameter variance]] (the uncertainty in the estimator).
- 2.1 Process Variance
    - The loss in any period is assumed to have a constant ratio of variance to mean, $\sigma^2 \approx \frac{1}{n-p}\sum \frac{(c_{AY,t}-\mu_{AY,t})^2}{\mu_{AY,t}}$ over $n$ data points and $p$ parameters — recognizably a chi-square error term; the assumption is tested by the residuals in the example.
    - The actual incremental emergence $c$ is further assumed to follow an [[Over-Dispersed Poisson Model|over-dispersed Poisson]] distribution — a [[Poisson Distribution|Poisson]] random variable times the scale factor $\sigma^2$, so that $E[c] = \lambda\sigma^2 = \mu$ and $Var(c) = \lambda\sigma^4 = \mu\sigma^2$.
    - The scaling factor lets the model match the first and second moments of any distribution, and maximum likelihood exactly produces the LDF and Cape Cod estimates of ultimate, so the results come in a format familiar to reserving actuaries.
    - The discretized distribution loses little precision because $\sigma^2$ is generally small compared to the mean, and it allows a mass point at zero for increments with no change in loss.
    - The method is intended to produce the mean and variance of the distribution of reserves; having them, one is free to switch to a different distribution form in other applications.
- 2.2 The Likelihood Function – Finding the "Best" Parameters
    - With $\sigma^2$ assumed known, maximizing the loglikelihood is equivalent to maximizing $\ell = \sum_i c_i\ln(\mu_i) - \mu_i$, and the estimators set the first derivatives with respect to $ELR$ (or each $ULT_i$), $\theta$ and $\omega$ to zero.
    - For the Cape Cod model the MLE of $ELR$ is the "Cape Cod" ultimate, $\sum c_{i,t} \big/ \sum P_i\,[G(x_t)-G(x_{t-1})]$; for the LDF model each $ULT_i$ is the "LDF ultimate", $\sum_t c_{i,t} \big/ \sum_t [G(x_t)-G(x_{t-1})]$; either way the problem reduces to the two parameters $\theta$ and $\omega$.
    - The loglikelihood never takes the logarithm of the actual incremental development, so the model works even if some increments are zero or negative.
- 2.3 Parameter Variance
    - The variance in the parameter estimates comes from the Rao-Cramér approximation using the second-derivative information matrix — the "Delta Method" — with the covariance matrix $\Sigma$ the inverse of the [[Fisher Information|information matrix]]: $3\times3$ for the Cape Cod method (one ELR for all accident years) and $(n+2)\times(n+2)$ for the LDF method.
    - Strictly this is the variance in the estimate of the parameter, the parameter itself having no variance; "parameter variance" is kept as shorthand.
- 2.4 The Variance of the Reserves
    - The variance of the reserves is broken into the process variance and the estimation error (loosely "parameter variance"): for a reserve $R$ over a period or group of periods, the process variance is $\sigma^2\sum\mu_{AY;x,y}$ and the parameter variance is $Var(E[R]) = (\partial R)'\,\Sigma\,(\partial R)$, with $\partial R$ the vector of the reserve's derivatives with respect to the parameters.
    - Under the Cape Cod method $R = \sum \text{Premium}_i\cdot ELR\cdot(G(y_i)-G(x_i))$, and the derivatives with respect to $ELR$, $\theta$ and $\omega$ follow directly; for the LDF method, set $\text{Premium}_i = 1$ and $ELR = ULT_i$.
    - For both curve forms every derivative is calculated analytically (Appendix A), without numerical approximation.

## 3 Key Assumptions of this Model
- Incremental losses are independent and identically distributed: independence — one period not affecting the surrounding periods — is tenuous and is tested with residual analysis (a change in loss inflation can correlate periods positively, a large settlement replacing a stream of later payments negatively); identical distribution assumes the same emergence pattern for all accident years, a gross simplification that a parsimonious model requires.
- The variance/mean scale parameter $\sigma^2$ is fixed and known: estimating it with the other parameters makes the mathematics intractable, so the results are "quasi-likelihood estimators" (McCullagh and Nelder), in effect ignoring the variance on the variance.
- Variance estimates are based on an approximation to the Rao-Cramér lower bound, exact only for linear functions and computed from the "observed" rather than the "expected" information matrix, because the true parameters are unknown.
- Together these imply potential for more variability in future loss emergence than the model produces; that should not lead anyone to disregard the results, but the sources of variability that can and cannot be measured should be kept distinct.

## 4 A Practical Example
- 4.1 The LDF Method
    - The triangle is from Mack's 1993 paper, with accident years 1991–2000 added, and is better arranged as a table of incremental values with "From" and "To" ages than as a [[Development Triangle|triangle]]; the table can also hold just the latest three diagonals (55 rows collapse to 27) or a latest diagonal at 9 months rather than 12.
    - The sum of the fitted values equals the sum of the actual incremental dollars; the fitted loglogistic parameters are $\omega = 1.434294$ and $\theta = 48.6249$, found by iteration.
    - $\sigma^2 = 65{,}029$, with 43 degrees of freedom (55 data points less 12 parameters), is best thought of as the process variance-to-mean ratio: the process variance of any part of the reserve is that part times 65,029.
    - Normalized residuals $r = (c - \hat\mu)/\sqrt{\sigma^2\hat\mu}$ are plotted against increment age and against expected incremental loss (a check on the constant variance/mean ratio), and can be plotted against accident year or calendar year; the desired outcome is always random scatter around zero ([[Residual Plot|residual plots]]).
    - The loglogistic curve says only 77.24% of ultimate has emerged after ten years, so extrapolation is used cautiously: truncating the pattern at 240 months gives a total reserve of 28,987,633, with a process standard deviation of 1,372,966 (a CV of about 4.7%).
    - A Weibull fit ($\theta = 48.88453$, $\omega = 1.296906$) gives a tail factor of 1.0525 instead of 1.2946 and a reserve of 21,214,761 — a difference that highlights the danger of a purely mechanical extrapolation formula.
    - Parameter variance is much more significant than process variance (a total standard deviation of 4,885,707, a CV of 16.9%), chiefly because 55 data points are not sufficient to estimate 12 parameters: estimating each year's ultimate independently fits what may be just noise, which indicates a high level of uncertainty in the chain-ladder LDF method in general.
- 4.2 The Cape Cod Method
    - The triangle is supplemented by an exposure base believed proportional to expected ultimate losses — [[On-Leveling|on-level]] premium, so that a constant ELR across years is reasonable; a further refinement adjusts for loss trend net of exposure trend, and original loss projections, estimated claim counts or a judgmentally selected index can serve.
    - With premium assumed to be 10,000,000 in 1991 and to increase by 400,000 a year, the fitted loglogistic parameters are $\omega = 1.447634$ and $\theta = 48.0205$.
    - A graph of estimated ultimate loss ratios by year tests the constant-ELR assumption; an increasing or decreasing pattern would raise a concern of bias in the reserve.
    - Reserves, truncated at 240 months, work much like the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] formula — premium times ELR times the growth still to come — and total 29,707,484.
    - $\sigma^2 = 61{,}577$ (52 degrees of freedom), and the total standard deviation falls from 4,885,707 to 3,422,547 (a CV of 11.5%), mostly in 1999 and 2000; the variance is cut in half because the Cape Cod method uses more information, the on-level premium by year.
- 4.3 Other Calculations Possible with this Model
    - 4.3.1 Variance of the Prospective Losses
        - For a prospective period with 14,000,000 of premium, expected loss is 8,369,200 at the 59.78% ELR; process variance alone gives a CV of 8.6%, and adding the ELR's variance of 0.002421 (a standard deviation of 4.92%) gives a total CV of 11.9%, to compare with other prospective pricing tools.
    - 4.3.2 Calendar Year Development
        - Development in the next [[Calendar Year|calendar year]] is the difference in the growth function over the next 12 months times the estimated ultimate: 5,448,182 in the LDF example, with a standard deviation of 870,798 — an estimate testable against actual development one year later.
    - 4.3.3 Variability in Discounted Reserves
        - Appropriate only for paid data; at a 6.0% rate the discounted Cape Cod reserve of 23,454,641 has a CV of 10.5% against 11.5% undiscounted, because the tail of the payout curve has the greatest parameter variance and also receives the deepest discount ([[Loss Reserve Discounting|discounting]]).

## 5 Comments and Conclusion
- 5.1 Comments
    - Abandon your triangles: the model works most logically from the tabular format, and all that is needed is a consistent aggregation of losses evaluated at more than one date.
    - The CV goes with the mean: strictly, the model's standard deviation is around the maximum likelihood estimate, so it does not carry over to a different carried reserve; practically, the CV around a selected reserve must also be a selection, for which the model's output is a reasonable basis.
    - Changes in mix of business and in the process of settling claims lie outside the model's assumptions and might better be labelled "model variance" ([[Model Risk|model risk]]).
    - Other curve forms can be used; the loglogistic and Weibull were chosen because they move smoothly from 0% to 100%, often closely match the data and have analytic first and second derivatives, and applying them to the average evaluation age is one way of improving the fit at immature ages.
- 5.2 Conclusion
    - Maximum likelihood estimates both the expected development pattern and the variance around the reserve, and the over-dispersed Poisson is a convenient link to the LDF and Cape Cod estimates already common among reserving actuaries.
    - In practical examples the parameter variance is generally larger than the process variance, so the most pressing need is not more sophisticated models but more complete data; supplementing the triangle with accident year exposure information is a good step.

## References
- Ten works, among them England and Verrall (PCAS 2001), Halliwell (PCAS 1996), Klugman et al.'s *Loss Models*, Mack's 1991 and 1993 ASTIN Bulletin papers, McCullagh and Nelder's *Generalized Linear Models*, Sherman (PCAS 1984) and Zehnwirth (CAS Forum 1994).

## Appendix A: Derivatives of the Loglikelihood Function
- The loglikelihood for the over-dispersed Poisson is proportional to $\ell = \sum c_{i,t}\ln(\mu_{i,t})-\mu_{i,t}$ with $\mu_{i,t} = ELR\cdot P_i\cdot[G(x_t)-G(x_{t-1})]$; its first and second derivatives with respect to $ELR$, $\omega$ and $\theta$ complete the information matrix, and the constant scale factor $\sigma^2$ is applied to the final covariance matrix instead.
- For the LDF method the same formulas apply with $ELR$ replaced by $ULT_i$ and $P_i$ by 1.
- For the Weibull, $\theta$ is approximately the 63.2nd percentile ($LDF_\theta \approx 1.582$); for the loglogistic ("inverse power" LDFs), $\theta$ is the median ($LDF_\theta = 2.000$); the first and second derivatives of each $G(x)$ with respect to $\omega$ and $\theta$ are given in closed form.

## Appendix B: Adjustments for Different Exposure Periods
- The percent-of-ultimate curve $G^*(x)$ is a function of the average accident date of the period being developed and applies to the portion of the period already earned: 9 months into an accident year, $G^*(4.5)$ is the percent of ultimate of the 9-month period, and the accident year's is $(9/12)\cdot G^*(4.5)$.
- Two calculations are needed — the percent of the period that is exposed, $Expos(t)$, and the average accident date of the earned portion given the age $t$ from inception, $AvgAge(t)$ — each given for [[Accident Year|accident years]] and [[Policy Year|policy years]]; for accident years, $Expos(t) = \min(t/12, 1)$ and $AvgAge(t) = \max(t-6, t/2)$:

> $$G_{AY\text{ or }PY}(t \mid \omega,\theta) = Expos(t)\cdot G^*\!\left(AvgAge(t) \mid \omega,\theta\right)$$

## Appendix C: Variance in Discounted Reserves
- The reserve is a sum of increments of each accident year's ultimate; discounted at a constant rate $i$, with $v = 1/(1+i)$, it is approximated by discounting each increment from its midpoint, because for the loglogistic and Weibull curves the moment generating function (which the $x = 0$, $y = \infty$ case leads to) is intractable:

> $$R_d \approx \sum_{AY}\sum_{k=1}^{y-x} ULT_{AY}\cdot v^{k-1/2}\cdot\left(G(x+k)-G(x+k-1)\right)$$

- Process variance multiplies each increment's variance by $v^{2k-1}$; parameter variance uses $(\partial R_d)'\,\Sigma\,(\partial R_d)$; the two are added, as for the full-value reserve, on the assumption that they are independent.

## Sources
- [LDF Curve-Fitting and Stochastic Reserving: A Maximum Likelihood Approach (Clark, CAS, 2003)](https://www.casact.org/sites/default/files/2021-03/7_Clark.pdf) — the document, a 52-page scan with an OCR text layer, its formulas and tables read from the page images: the title page and abstract (author, American Re-Insurance, the 2003 Reserves Call Paper Program), the outline of sections, the text of Sections 1–5, the references and Appendices A–C; the last page is blank
- [CAS Exam 7 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf) — the citation (Casualty Actuarial Society Forum, Fall 2003) and the assigned scope
