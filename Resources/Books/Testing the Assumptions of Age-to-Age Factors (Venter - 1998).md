---
Title: "Testing the Assumptions of Age-to-Age Factors"
Authors: "Gary G. Venter"
Publisher: "Casualty Actuarial Society"
Year: "1998"
date: "1998"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/database/proceed_proceed98_980807.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fcce942073cad999b2ede8424e9df9eb792369d3104463384ab19e5fe31c7d2c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Testing the Assumptions of Age-to-Age Factors (Venter - 1998).md
---
![[Testing the Assumptions of Age-to-Age Factors (Venter - 1998) - Cover.svg]]

Gary Venter's paper introduces tests of the assumptions under which age-to-age factors applied to cumulative losses produce least-squares optimal reserve estimates. Most of the tests derive from regression diagnostic methods, and failures of various tests lead to specific alternative methods of loss development. It restates Thomas Mack's three chain ladder assumptions, draws six testable implications from them and tests each one, working an excess casualty reinsurance triangle through chain ladder, Bornhuetter-Ferguson, Cape Cod and additive alternatives. It appeared in the Proceedings of the Casualty Actuarial Society, Volume LXXXV (1998), pp. 807–847; the CAS has since issued two errata.

> [!info] On the syllabus
> - [[Exam 7 (CAS)|Exam 7]] — objectives A2, A6 and A12; the whole paper, including errata and updated errata.

## Introduction
- In "Measuring the Variability of Chain Ladder Reserve Estimates" Thomas Mack presented the assumptions needed for the typical age-to-age factor method of loss development, the [[Chain Ladder Method|chain ladder]], to be least-squares optimal, and introduced several tests of them; this paper summarizes his results, introduces other tests, and addresses what to do when the assumptions fail.
- Most of the assumptions, if they fail in a particular way, imply least-squares optimality for some alternative method.

## Preliminaries
- Losses of accident year $w$ at the end of that year are at age 0, and the first accident year is year 0; losses may be paid or incurred, and only development that fills out the triangle is considered — development beyond the observed data is not addressed.
- Notation
    - $c(w,d)$ is the cumulative loss of accident year $w$ as of age $d$, $c(w,\infty)$ the total loss when the end of the triangle is reached, and $q(w,d)$ the incremental loss from $d-1$ to $d$; $f(d)$ is the factor applied to $c(w,d)$ to estimate $q(w,d+1)$, and $F(d)$ the factor applied to $c(w,d)$ to estimate $c(w,\infty)$.
- Assumptions
    - Mack's three assumptions, restated to predict incremental losses: (1) $E[q(w,d+1) \mid \text{data to } w+d] = f(d)\,c(w,d)$ — a linear relationship with no constant term, applied to the cumulative data rather than to an estimated ultimate as in the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] method; (2) unless $v = w$, $c(w,d)$ and $c(v,g)$ are independent, which a strong diagonal would violate; (3) $\text{Var}[q(w,d+1) \mid \text{data to } w+d] = a[d, c(w,d)]$ ([[Chain Ladder Assumptions]]).
    - Some function $a(\cdot,\cdot)$ will almost always accord with the observations, so the issue with the third assumption is not its validity but its implications for the estimation procedure.
- Results (Mack)
    - With $a[d,c(w,d)] = k(d)\,c(w,d)$, the chain ladder gives the minimum variance unbiased linear estimator of future emergence, $F(d)\,c(w,d)$, where $F(d) = [1+f(d)][1+f(d+1)]\cdots$ and $f(d) = \sum_w q(w,d+1)/\sum_w c(w,d)$ over the accident years available in both columns.
    - A modified chain ladder that uses only the last $n$ diagonals is one alternative to test if Mack's assumptions fail; when they all hold, using only part of the data reduces the accuracy of the estimation.
- Extension
    - In general the minimum variance unbiased $f(d)$ minimizes $\sum_w [f(d)c(w,d) - q(w,d+1)]^2\,k(d)/a[d,c(w,d)]$ — weighted least squares, weights inversely proportional to the variance; $a = k(d)c(w,d)^2$ gives the average of the individual ratios $q(w,d+1)/c(w,d)$, and $a = k(d)$ gives the unweighted regression coefficient $\sum_w c(w,d)q(w,d+1)/\sum_w c(w,d)^2$.
- Discussion
    - If emergence were a constant plus a percent of emergence to date, a factor plus constant development method would be indicated; if the next incremental emergence were proportional to ultimate rather than to emerged to date, a Bornhuetter-Ferguson type approach.
    - To test the assumption, the development method that follows from each alternative is fitted and a goodness-of-fit measure applied — a test of the emergence pattern the losses are subject to, not just of estimation methods.

## Testable Implications of Assumptions
- A hypothesis can never be fully verified — verification is attempted falsification (Popper); assumptions (1)–(3) are not directly testable, but they have testable implications, and the chain ladder's optimality cannot be shown for a triangle that fails one.
- The implications: 1. significance of factor $f(d)$; 2. superiority of the factor assumption to alternative emergence patterns — linear with constant, $f(d)c(w,d) + g(d)$; factor times parameter, $f(d)h(w)$; and including a calendar year effect, $f(d)h(w)g(w+d)$; 3. linearity of the model, from residuals as a function of $c(w,d)$; 4. stability of the factor, from residuals as a function of time; 5. no correlation among columns; 6. no particularly high or low diagonals.

## Testing Loss Emergence—Implications 1 & 2
- The first four implications test assumption (1), using the standard diagnostic tests for weighted least-squares regression.
- Implication 1: Significance of Factors
    - A factor is usually required to be at least twice its standard deviation in absolute value to be regarded as [[Statistical Significance|significantly]] different from zero — about a 4.5% chance for a normal distribution when the true factor is zero, and a level of comfort rather than a strict test; many analysts accept 1.65 times (about 10%).
    - Many development triangles fail this test, and for them the chain ladder is not optimal; in a cumulative-to-cumulative regression it is the difference of the factor from unity that must be tested, which is equivalent.
- Implication 2: Superiority to Alternative Emergence Patterns
    - Fits are compared by the sum of squared errors adjusted for the number of parameters $p$ out of $n$ observations: the paper uses $\text{SSE}/(n-p)^2$; multiplying the SSE by $e^{2p/n}$ approximates the [[AIC]], and by $n^{p/n}$ ranks models as the [[BIC]] does.
    - With 45 observations, adding a fifth parameter to a four-parameter model needs about a 5%, 4½% and almost 9% improvement in SSE under the three adjustments.
- Alternative Emergence Pattern 1: Linear with Constant
    - The constant term is often significant from age 0 to 1, especially for highly variable, slowly reporting lines such as excess reinsurance, and often more so than the factor; the triangle should then be normalized for exposure and cost levels, and a purely additive method could be more appropriate.
- Alternative Emergence Pattern 2: Factor Times Parameter
    - The parameterized BF model forecasts emergence as a lag factor times an accident-year parameter, $E[q(w,d+1) \mid \text{data}] = f(d)h(w)$, with $h(w)$ proportional to the expected ultimate; for $n$ accident years it has $2n-2$ parameters, twice the chain ladder's.
    - Stanard's simulation generated losses by this emergence pattern, and the chain ladder gave substantially larger estimation errors than his BF-type methods.
    - The [[Cape Cod Method|Cape Cod]] (CC) sets a single $h$ for all accident years and so has the same number of parameters as the chain ladder, but needs a relatively stable level of loss exposure, adjusted for known exposure and price level differences.
    - The BF often has too many parameters, leaving the last years to find their levels from sparse information; reduced-parameter BF models use a trend line through the $h$'s, groups of years, credibility or exponential smoothing.
- Alternative Emergence Patterns Example
    - On an excess casualty reinsurance triangle (Table 1), regressing incremental losses on previous cumulative losses (Table 2) shows the constants usually significant and the factors never, so the chain ladder assumptions are not supported by the data.
    - The BF is fitted by iterative least squares, starting from the chain ladder's implied $f(d)$ and alternating $h(w) = \sum_d f(d)q(w,d)/\sum_d f(d)^2$ with $f(d) = \sum_w h(w)q(w,d)/\sum_w h(w)^2$ until convergence (Table 3); weighted versions apply when the variances are proportional to $f(d)^p h(w)^q$.
    - Over 45 observations the adjusted SSE is 81,169 for the BF against 157,902 for the chain ladder, and 75,409 for the CC ($h = 22{,}001$); the unadjusted SSE is 59M for the BF against 98M for the CC, and the BIC favours the CC while the AIC favours the BF.
    - The additive chain ladder, whose terms are the average loss emerged at each age (Table 6), fits exactly as well as the CC: both estimate each age's loss level with a single value.
    - An intermediate BF-CC pattern with nine effective parameters (Table 7) has adjusted SSE 52,360, the best approach tried, supporting emergence as a percent of ultimate with not all years and ages at different levels.
- Alternative Emergence Patterns-Summary
    - If the BF emergence pattern holds, the chain ladder applies factors to the random component of emerged losses and so increases the estimation error; the CC and additive chain ladder assume that good and bad years have the same expected future dollar development.
    - Which emergence pattern holds for a triangle is an empirical issue, tested by fitting the methods and comparing the significance of the parameters and the adjusted sum of squared residuals.

## Residual Analysis—Testing Implications 3 & 4
- Implication 3: Test of Linearity—Residuals as Function of Previous
    - [[Residual|Residuals]] that run first positive, then negative, then positive when plotted against the previous cumulative loss indicate a non-linear process given a linear fit; the check can be made for each age.
- Implication 4: Test of Stability—Residuals Over Time
    - A similar pattern against time may indicate unstable factors; stable factors should be estimated from all the accident years, and a weighted average favouring recent years (such as the last five diagonals) used only with a good reason, since otherwise it increases estimation errors.
    - Berquist and Sherman test for instability through changes in the [[Settlement Rate|settlement rate]] and adjust the triangle to the latest pattern, which should still be tested for stability.
    - A five-term moving average of 2nd-to-3rd factors from a large triangle (Exhibit 3, Figure 4) moves between about 1.1 and 1.8 — changes in the level around which factors fluctuate argue for recent diagonals, while large fluctuations around a fixed level argue for using all the data; state-space models give the formal treatment.

## Independence—Testing Implications 5 & 6
- Mack's second assumption requires the columns of incremental losses to be independent except within an accident year; he developed a correlation test and a high-low diagonal test to check for dependencies.
- Implication 5: Correlation of Development Factors
    - Another [[Development Factor Correlation Test|correlation test]] computes the sample [[Correlation Coefficient|correlation]] for every pair of columns, over the first $n$ elements where $n$ is the length of the shorter column, and counts how many are significant at, say, the 10% level; for Table 1 the first two columns of factors correlate at $-25\%$ (Table 8).
    - $T = r[(n-2)/(1-r^2)]^{1/2}$ is treated as $t$-distributed with $n-2$ degrees of freedom; here $T = -0.63$, not significant even at the 10% level (the test is two-tailed per the 2020 erratum below).
    - With $m$ pairs of columns, the number significant at 10% is binomial in $m$ and 0.1, with standard deviation $0.3m^{1/2}$; more than $0.1m + m^{1/2}$ significant correlations would strongly suggest actual correlation, in which case $E[XY] = E[X]E[Y] + \text{Cov}(X,Y)$ can correct the product of development factors.
- Implication 6: Significantly High or Low Diagonals
    - Mack's test counts high and low factors on each diagonal; this paper proposes using regression to see whether diagonal dummy variables are significant, a test that also provides alternatives if the chain ladder is rejected ([[Calendar Year Effect]]).
    - A multiplicative diagonal effect scales every cell of a diagonal $w + d$ — for example $q(w,d) = 1.1 f(d)h(w)$ on $w + d = 7$ — while additive diagonal effects are estimated by regressing the strung-out incremental triangle on the previous cumulative losses by age and on dummy columns picking out the diagonals.
    - Knowledge of company operations helps decide whether a diagonal effect is permanent or temporary, particularly in the last few diagonals; tests of chain ladder against BF should include the diagonal terms.
    - Diagonal effects can also be treated as inflation (Taylor), $E[q(w,d+1) \mid \text{data}] = f(d)g(w+d)$ with $g$ the cumulative claims inflation since the first accident year, or $(1+j)^{w+d}$ for a constant rate; with constant age, accident-year and calendar-year trends the calendar trend $j$ cannot be separated, so it may be better to keep the calendar-year trend and drop the accident-year one ([[Separation Method]]).
    - Modelling the reinsurance triangle as just $6{,}756(0.7785)^d$ gives an adjusted sum of squares of 57,527 with two parameters; calendar year trend accounts for inflation between loss occurrence and settlement, and testing for diagonal effects shows whether it is influencing a triangle.

## Conclusion
- The first test is the significance of the cumulative-to-incremental factors at each age, equivalent to testing whether the cumulative-to-cumulative factors differ significantly from unity; failing it means future emergence is not proportional to past emergence — it may be a constant amount, or proportional to ultimate as in the BF.
- Passing it, an additive component may still improve the fit, the BF pattern may still fit better, and reduced-parameter BF models may perform better; a significant additive component suggests converting the triangle to on-level loss ratios.
- If emergence is stable, using only the last $n$ diagonals leads to higher estimation errors on average.
- "If the chain ladder doesn't work, try Bornhuetter-Ferguson" is reasonable when "doesn't work" means fails the assumptions of least-squares optimality and "try" means test the underlying assumptions of.

## Exhibit 1 Comparative Fits
- Actual and fitted incremental losses, with percentage errors, for the chain ladder, the CC, the BF-CC and the additive model with multiplicative diagonals and accident years.

## Exhibit 2 Summary of Parameters
- The fitted parameters of the BF, the CC, the additive chain ladder and the BF-CC.

## Exhibit 3 2nd to 3rd Factors from Large Triangle
- The factors plotted with their five-term moving average in Figure 4.

## Appendix Diagonal Effects in BF Models
- Because the CC is the additive chain ladder, it can be estimated as one multiple regression of the 45 incremental losses on age and diagonal dummies; on the reinsurance triangle the first three diagonals and the last diagonal were lower than the others, and the first two ages and the last four were not significantly different, leaving five age and two diagonal parameters and an adjusted sum of squared residuals of 49,673.4 (Table 9).
- If age effects dominate with occasional distortion by diagonal effects, including the diagonal dummies gives better estimates of the age terms, which — but not the diagonal effects — are used in forecasting.
- Refitting the diagonals as multiplicative factors, $q(w,d) = f(d)g(w+d)$, by iterating between the $f$'s and $g$'s gives 49,034.8 (Table 10); adding a factor for accident years 3 and 4, with the 4th age term the average of the 3rd and 5th, gives 44,700.9 (Table 11) — almost twice as good as the BF, which was almost twice as good as the chain ladder.

## Errata
- p. 833, Implication 5 (Errata, Version 1.0, January 31, 2020, prepared by the Exam 7 Syllabus Committee): since correlations can be positive or negative, the significance test is two-tailed — $r$ is significant at the 10% level if $|T|$ exceeds the $t$-statistic for 0.95 (not 0.9) at $n-2$ degrees of freedom.
- p. 823, Table 3 "BF Parameters" (Erratum approved by the Exam 7 Content Outline Committee on 4/22/2026): the two $f(d)$ rows are exchanged — the first-round $f(d)$ are 0.162, 0.197, 0.204, 0.147, 0.115, 0.082, 0.037, 0.030, 0.015, 0.009 and the final $f(d)$ 0.106, 0.231, 0.209, 0.155, 0.117, 0.083, 0.038, 0.032, 0.018, 0.011 — and the first-round $h(w)$ for year 3 is 28,365, not 26,365.

## Related readings
- [[Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994)]] — the paper whose three assumptions and tests this one summarizes before adding its own.

## Sources
- [Testing the Assumptions of Age-to-Age Factors (PCAS LXXXV, 1998)](https://www.casact.org/sites/default/files/database/proceed_proceed98_980807.pdf) — the document: title, abstract, section headings, the text of every section, the tables, exhibits and appendix (the CAS serves identical bytes at [7_Venter_Factors.pdf](https://www.casact.org/sites/default/files/2021-03/7_Venter_Factors.pdf))
- [Errata to Testing the Assumptions of Age-to-Age Factors, Version 1.0, January 31, 2020](https://forum.casact.org/article/164288-testing-the-assumptions-of-age-to-age-factors/attachment/351760.pdf) — the correction to p. 833
- [Erratum, approved 4/22/2026](https://forum.casact.org/article/164288-testing-the-assumptions-of-age-to-age-factors/attachment/351759.pdf) — the correction to Table 3, p. 823
- [CAS Forum article page](https://forum.casact.org/article/164288-testing-the-assumptions-of-age-to-age-factors) — the page the content outline links, listing the paper with its 2020 and 2026 errata
- [CAS Exam 7 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf) — the citation and the assigned scope
