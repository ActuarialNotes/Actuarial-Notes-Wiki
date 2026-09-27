---
Title: "An Example of Credibility and Shifting Risk Parameters"
Authors: "Howard C. Mahler"
Publisher: "Casualty Actuarial Society"
Year: "1990"
date: "1990"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/8_Mahler.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c0fd9e2c6da7501c5a5e99d8e5a64c2423e32b1f0ef209d6c0324dbcc545bf7e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/An Example of Credibility and Shifting Risk Parameters (Mahler - 1990).md
---
![[An Example of Credibility and Shifting Risk Parameters (Mahler - 1990) - Cover.svg]]

Uses the won-lost records of baseball teams to examine and illustrate credibility concepts, in an example analogous to experience rating in insurance. Written as supplementary reading for students of credibility theory, it illustrates a situation where shifting parameters over time have a very significant impact, examines three criteria for selecting the optimal credibility — least squares, limited fluctuation and Meyers/Dorweiler — and shows that the mean squared error is a second order polynomial in the credibilities, with coefficients set by the covariance structure of the data. Published in PCAS LXXVII (1990), pp. 225–282, with Appendices A–G following on pp. 283–308.

> [!info] On the syllabus
> - [[Exam 8 (CAS)|Exam 8]] — objectives A2 and A4; candidates will not be tested on the Appendices.

## 1 Introduction
- The won-lost record of baseball teams serves as an illustrative example analogous to [[Experience Rating|experience rating]]; the mathematical derivations are confined to the appendices.
- The paper goes from the simplest case to the more general, and its particular interest is the effect of [[Shifting Risk Parameters|shifting risk parameters over time]] on credibilities and experience rating.

## 2 Credibility and Experience Rating
- Experience rating and [[Merit Rating|merit rating]] modify an individual insured's rate above or below average, using its observed loss experience to help predict its future loss experience:

> $$\text{New Estimate} = \text{Data} \times Z + \text{Prior Estimate} \times (1 - Z)$$

- For most plans the prior estimate is the class average, but in theory it could be a previous estimate of this insured's relative loss potential; the paper treats both. $Z$ is the [[Credibility|credibility]] and $1 - Z$ the [[Complement of Credibility|complement of credibility]].
- 2.1 Shifting Parameters Over Time
    - The paper deals with one aspect of experience rating plans — how best to combine the different years of past data — restating the author's earlier conclusion that when there are shifting parameters over time, older years of data should be given substantially less credibility than more recent years, and there may be only a minimal gain in efficiency from using additional years.

## 3 The Data Sets
- Two very similar data sets: the losing percentages of the eight National League and eight American League teams for each season from 1901 to 1960 (Tables 1 and 2), each team playing about 150 games a year.
- 3.1 Advantages of this Data
    - Unlike insurance data, the set of risks (teams) is constant over the whole period; the loss data are readily available, accurate and final, with no reporting errors or [[Loss Development|loss development]]; and every risk is of roughly equal size, so the dependence of credibility on size of risk can be ignored.

## 4 Analysis of the General Structure of Data
- 4.1 Is There an Inherent Difference Between Teams?
    - The fundamental question for experience rating. If every team's results came from one distribution, a binomial with a 50% chance of losing over about 9,000 games would give a standard deviation of 0.5% in losing percentage, so about 95% of teams would average between 49% and 51%.
    - Only 3 of the 16 teams do (Table 3), and the largest deviation from the grand mean is 15 standard deviations, so the teams actually differ and a team's past experience carries useful information about its future — there is an advantage to experience rating.
- 4.2 Shifting Parameters Over Time
    - A different question: whether a given team's results in different years come from the same distribution. They do not — the underlying parameters of the risk process shift over time. Two tests are demonstrated, both applicable to insurance data.
    - A chi-squared [[Hypothesis Testing|test]] on each risk's games lost in twelve five-year segments against a constant mean rejects a constant mean for every one of the 16 risks (Table 4) — each has less than a 0.2% chance that its segments share one mean.
    - The [[Correlation|correlation]] between the risks' results for pairs of years, averaged by the number of years between them (Table 5), falls from 0.651 (NL) and 0.633 (AL) at one year apart to no significant correlation (a 95% band of about ±0.10) at about ten years. Correlations that depend on the separation mean the parameters shift; the significant correlation between nearby years means recent years can be usefully employed to predict the future.

## 5 Statement of the Problem
- Estimate $X$, a risk's expected losing percentage, as a weighted average of estimates $Y_i$ — here a single year of the risk's past data or the grand mean of 50% — with no subjective information, a situation analogous to prospective experience rating rather than [[Schedule Rating|schedule rating]]:

> $$X = \sum_{i=1}^{n} Z_i Y_i$$

- Since every estimator compared is unbiased, the choice between methods turns on other features. In the two-estimate case $X = Z \cdot Y_1 + (1 - Z) \cdot Y_2$; the usual terminology tempts one to treat the two weights differently, but the mathematical situation is symmetric.

## 6 Simple Solutions to the Problem
- 6.1 Every Risk is Average
    - Predict the grand mean of 50% for every risk — the past data get zero credibility; a useful base case.
- 6.2 The Most Recent Year Repeats
    - Predict that each risk's most recent year repeats — 100% credibility for the latest year.
- 6.3 Credibility Weight the Most Recent Year and the Grand Mean
    - Weight $Z$ on the latest year and $1 - Z$ on the grand mean. Since $Z = 0$ and $Z = 1$ are special cases, the proper choice of $Z$ does at least as well as either, whatever the criterion.
- 6.4 Determining the Credibility
    - The "best" credibility is set by an objective criterion: [[Bühlmann Credibility|Bühlmann]]/Bayesian or classical/[[Limited Fluctuation Credibility|limited fluctuation]] methods predict which credibility will optimise it, and retrospective tests show which would have optimised it in the past.
- 6.5 Equal Weight to the N Most Recent Years of Data
    - Weight $Z/N$ on each of the $N$ most recent years and $1 - Z$ on the grand mean; with $N = 1$ this is the previous method.

## 7 Criteria to Decide Between Solutions
- Three [[Credibility Criteria|criteria]] that can be applied in general, not just to this example.
- 7.1 Least Squared Error
    - The smaller the [[Mean Square Error|mean squared error]] of the predictions against the actual observed results, the better; the Bühlmann/Bayesian credibility methods are least squares methods.
- 7.2 Small Chance of Large Errors
    - The smaller the probability that the observed result will be more than a certain percent different from the predicted result, the better — related to classical credibility, whose full credibility criterion gives probability $P$ that the departure from expected is no more than $k$ percent. It is stated against the observation because the inherent loss potential, which varies over time, cannot be observed directly.
- 7.3 Meyers/Dorweiler
    - Taken from Glenn Meyers, who based it on Paul Dorweiler: the closer to zero the correlation between the ratio of actual to predicted losing percentage and the ratio of predicted to overall average losing percentage, the better. The correlation is measured with Kendall's $\tau$.

## 8 The Criteria Applied to the Simple Solutions
- 8.1 The Two Base Cases
    - With $Z = 0$ the mean squared errors are .0091 (NL) and .0095 (AL); with $Z = 1$, .0059 and .0068. The estimate is in error by more than 20% 29.0% and 31.4% of the time at $Z = 0$, and 19.1% and 22.0% at $Z = 1$. The Kendall $\tau$ correlations are .48 and .46 as $Z$ approaches zero, and −.24 and −.27 at $Z = 1$.
- 8.2 Applying Credibility to the Latest Year of Data
    - Mean squared error is a minimum for $Z$ between 60% and 70% (Table 6); the second criterion puts the optimum between 50% and 80% but does not distinguish sharply (Table 7); the third puts it near 70% (Table 8).
- 8.3 Applying Credibility to the Latest N Years of Data
    - Contrary to most actuarial uses of credibility, the optimal credibilities do not increase as more years of data are used, and using more than one or two years does an inferior job under the first criterion — to be expected, since with shifting parameters older data given equal weight eventually worsen the estimate.
    - The third criterion cannot distinguish between values of $N$: for each $N$ some $Z$ gives zero correlation. Kendall's $\tau$ yields a confidence interval for the credibility — 63% ± 13% for ten years of NL data.
- 8.4 Comparison of the Results of the Three Criteria
    - The optimal credibilities (Table 9) are the centres of interval estimates and differ between the NL and AL data sets and the same data reversed in time. For $N = 10$ they average 63%, 55% and 65% under the three criteria, and any credibility between 50% and 70% performs reasonably well under all three.
    - In most applications, credibilities that differ somewhat from optimal perform reasonably well, and the choice between them has a relatively small practical impact.
- 8.5 Putting the Reduction in Squared Error in Context
    - For the NL data and one year, the optimal 68% credibility cuts the mean squared error to .0049 from .0059 (data relied on totally) or .0091 (data ignored) — 83% of its previous value, against a best possible reduction to 75% when combining two estimates.
- 8.6 Effect of Delay in Receiving Data
    - Because correlation falls with distance in time, a delay before the data can be used makes the estimate less accurate: the minimum squared error rises with the delay (Table 10), especially from a one-year to a two-year gap — the latter more common in insurance — and the optimal least squares credibility falls (Table 11; for NL with one year of data, from 68% to 51%).

## 9 More General Solutions
- 9.1 Combine Previous Estimate and Most Recent Data
    - Weight $Z$ on the latest year of data and $1 - Z$ on the previous estimate, seeded with the grand mean. The years of data receive geometrically decreasing weights — with $Z = 60\%$, 60%, 24%, 9.6%, 3.84% … — which is single [[Exponential Smoothing|exponential smoothing]], a weighted least squares fit of a horizontal line.
- 9.2 More General Varying Weights
    - Weights $Z_i$ that depend on how far in the past the data $X_i$ are, with the grand mean $M$ used for years not available; optimal weights become hard to determine as more years are used, and many weight vectors are close to optimal:

> $$F = \sum Z_i X_i + \left(1 - \sum Z_i\right) M$$

## 10 The Criteria Applied to the More General Solutions
- 10.1 Geometrically Decreasing Weights
    - Least squares optima are all close to 55% (Table 12), with no significant reduction in squared error beyond applying credibility to the latest year; credibilities between 40% and 80% perform well under limited fluctuation (Table 13); under Meyers/Dorweiler the optima are close to zero, 5% to 10% (Table 14).
- 10.2 More General Varying Weights
    - Solving numerically for the least squares weights on the most recent $N$ years puts most of the credibility on the most recent year; the complement assigned to the grand mean is about 25% to 35%, decreasing as $N$ increases.

## 11 Equations for Least Squares Credibilities
- 11.1 The Covariance Structure
    - The variance of the data splits into the variance between risks, $\tau^2$, and the variance within risks, $\delta^2 + \zeta^2$ — [[Expected Value of Process Variance|process variance]] $\delta^2$ plus the variance due to shifting parameters over time, $\zeta^2$. The within covariance $C(k)$ between a risk's data $k$ years apart decreases as the years are further apart and is relatively close to zero after about 6 years (Table 15).
- 11.2 Matrix Equations for Least Squares Credibilities
    - The expected squared error between observation and prediction is a second order polynomial in the $Z_i$ — the fundamental result for analysing least squares credibility — where $\Delta$ is the time between the latest year of data used and the year being estimated:

> $$\begin{aligned} V(Z) = {} & \sum_{i=1}^{N}\sum_{j=1}^{N} Z_i Z_j \left(\tau^2 + C(|i-j|)\right) \\ & - 2\sum_{i=1}^{N} Z_i \left(\tau^2 + C(N + \Delta - i)\right) \\ & + \tau^2 + C(0) \end{aligned}$$

- Differentiating gives $N$ linear equations in $N$ unknowns (equation 11.3), solved for $\Delta = 1$ in Table 16: the credibility on the most recent year quickly converges to about 56%, the weights on less recent years are much smaller, do not decline monotonically and are sometimes negative.

> $$\sum_{j=1}^{N} Z_j\left(\tau^2 + C(|i-j|)\right) = \tau^2 + C(N + \Delta - i), \quad i = 1, \dots, N$$

- Equal weights $Z/N$ give the least squares credibility of equation 11.4 (Table 17).
- 11.3 Placing No Weight on the Grand Mean
    - Constraining the credibilities to sum to one, so each risk is estimated from its own past data alone, gives $N + 1$ linear equations with a Lagrange multiplier (equations 11.5–11.7; Table 18).
- 11.4 Mean Squared Errors
    - Squared errors with the Table 16 credibilities decline until $N = 6$, the point of diminishing returns; equal weights do worse, and giving the grand mean no weight gives substantially greater squared errors, the gap narrowing as the number of years increases (Table 19).
- 11.5 Validity of Results
    - The credibilities from the equations are comparable to those determined empirically, so they are an appropriate means of estimating least squares credibilities for this example; how well they apply elsewhere depends on the covariance structure of that data set.

## 12 Miscellaneous
- 12.1 Contrasting the Meyers/Dorweiler Criterion vs. the Other Criteria
    - Least squares and limited fluctuation are concerned with eliminating large errors; Meyers/Dorweiler is concerned with the pattern of the errors, so large errors are no problem as long as no pattern relates them to the experience rating modifications. A four-risk example shows the criteria preferring opposite situations — a warning against relying on any single criterion without understanding what it tests.
- 12.2 A Ratemaking Example
    - Five annual [[Loss Ratio|loss ratios]] combined into a rate level indication three years from the latest data: with an assumed covariance structure, equations 11.6 and 11.7 give optimal weights of 11.6%, 13.4%, 17.3%, 23.8% and 33.9%, oldest to most recent, close to Walters' 10%, 15%, 20%, 25% and 30%. For illustration only — a real application must estimate the covariance matrix, which shifting parameters, varying data volume and uncertain trend and development all affect.
- 12.3 Baseball Example vs. Typical Insurance Applications
    - Credibility is typically used to set relativities — a class or territory against the overall rate level, an individual risk against an average in experience rating — so the result depends on the other risks making up the average; in baseball the average is a known constant, .500, and one team's loss is another's win.
- 12.4 Estimates in Balance
    - Because each year's credibility is the same for every team and the grand mean is the same for all years, the estimates average to the grand mean.
- 12.5 Choice of a Prediction Method
    - The author recommends avoiding many years of data unless they substantially improve accuracy. For $\Delta = 1$, 55% on the most recent year, 10% on each of the next two and 25% on the grand mean works well: on the NL data (Tables 20 and 21) the mean squared error is .0046, with a 14% chance of an error over 20% and a Meyers/Dorweiler correlation of .02.

## 13 Conclusions
- Baseball data provide a useful way to examine and illustrate credibility concepts, and the methods apply to insurance, but further work is needed for any specific practical situation.
- When shifting parameters over time are an important phenomenon, older years of data should be given substantially less credibility than more recent years, and the more significant the phenomenon, the more important it is to minimise the delay in receiving the data.
- Least squares, limited fluctuation and Meyers/Dorweiler can each be useful; the first two are closely related, while the third can give substantially different results.
- The mean squared error can generally be written as a second order polynomial in the credibilities, with coefficients from the covariance structure, giving linear equations for the least squares credibilities.

## Appendix A Some Relevant Features of Baseball
- The elements that affect a team's quality — players, coaches and field manager, owners and management — all shift over time, and the paper likens them to a workers compensation risk's workers, plant manager and corporate management.

## Appendix B Meyers/Dorweiler Criterion and Kendall's Tau
- If an experience rating plan works properly, an insurer should be equally willing to write debit and credit risks, so the correlation between the experience modification and the modified loss ratio should be zero; the appendix defines Kendall's $\tau$ from the number of inversions in the ranks and gives its variance.

## Appendix C Matrix Equations for Least Squares Credibility
- Derives equations 11.2, 11.3, 11.4 and 11.7 by writing the squared error as a second order polynomial in the credibilities and setting its partial derivatives to zero.

## Appendix D Covariance Structure
- Splits the variance of an observation into the variance between risks, the process variance and the variance due to shifting parameters over time — about 13.5%, 17.5% and 69.0% of the total for the NL data — and shows by scrambling the data that the covariance pattern is not due to chance.

## Appendix E Putting the Reduction in Squared Error in Context
- With one year of data and the grand mean, the optimal credibility is $1 - V(1)/2V(0)$ from the squared errors $V(0)$ and $V(1)$ of the two base cases, and credibility can cut the squared error to no less than 75% of the smaller of them.

## Appendix F Squared Errors
- Checks the squared error formula against the observed squared errors for two years of data (Table F1), and derives the behaviour of equal weights in the absence of shifting parameters over time.

## Appendix G The Second Criterion and Limited Fluctuation Credibility
- Shows the second criterion is closely related to limited fluctuation credibility: the smaller the chance that the estimate differs greatly from the true inherent loss potential, the smaller the chance it differs greatly from the observation.

## Sources
- [An Example of Credibility and Shifting Risk Parameters (Mahler, PCAS 1990)](https://www.casact.org/sites/default/files/2021-03/8_Mahler.pdf) — the document, an OCR'd scan (84 pages, printed pp. 225–308) read from its page images: abstract, sections 1–13 with their subsections, tables and conclusions, and the appendix titles and opening statements
- [CAS Exam 8 Content Outline, Fall 2026 (v03, June 2026)](https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf) — the citation (PCAS LXXVII, 1990, pp. 225–282), the assigned objectives and the exclusion of the appendices
