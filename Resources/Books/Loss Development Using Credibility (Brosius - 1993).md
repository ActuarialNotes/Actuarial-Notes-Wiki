---
Title: "Loss Development Using Credibility"
Authors: "Eric Brosius"
Publisher: "Casualty Actuarial Society"
Year: "1993"
date: "1993"
Type: "Study Note"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6ec678eac5eda628a74b181aafec612d5a7fbebf5963d33901d4394cfbd60bd2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Loss Development Using Credibility (Brosius - 1993).md
---
![[Loss Development Using Credibility (Brosius - 1993) - Cover.svg]]

A study note describing a method that applies credibility directly to the loss development process: least squares development. Real data is subject to both random fluctuations and systematic distortions, so developed losses are often weighted with a prior estimate; this method requires little more data than the link ratio method, is almost as easy to use, and responds more gracefully when the data is thin and random fluctuations are severe. Eric Brosius's paper, dated March 30, 1993, gives both a practical guide to the method and its theoretical base in Bayesian credibility, and works out a complete example.

> [!info] On the syllabus
> - [[Exam 7 (CAS)|Exam 7]] — objectives A1–A3, A6 and A11; the whole study note.

## Introduction
- The method of [[Least Squares Development Method|least squares development]] is worth considering whenever random year-to-year fluctuations in loss experience are significant; the paper provides a practical guide to its use and a discussion of its theoretical underpinnings.
- It was proposed by Simon, in his 1957 discussion of a paper by Tapley, for automobile bodily injury reserves, and Clarke has used it to develop reinsurance losses; both justify it on practical grounds, while DeVylder and Robbin apply credibility to loss development from a slightly different direction.
- The paper tests the method against several loss models, develops credibility formulas similar to Bühlmann's for the best linear approximation to the Bayesian estimate, and then examines practical implications and limitations.

## How the method works—an example
- Table 1 (State AA, Line BB, losses limited to \$10,000 per occurrence) is so thin that the 15–27 month link ratios run from 1.050 to 2.746; with $x$ the 15-month value and $y$ the 27-month value, the task is an estimate $L(x)$ of $y$ given $x$.
- The link ratio method estimates $L(x) = cx$ with a selected link ratio $c$ — a line through the origin ([[Chain Ladder Method|chain ladder]]).
- The budgeted loss (or "pegged") method sets $L(x) = k$ whatever $x$ may be — a horizontal line; $k$ may be an average of past $y$ values or earned premium times an expected loss ratio ([[Expected Loss Method|expected loss method]]).
- The least squares method fits $L(x) = a + bx$ to the points $(x, y)$ by least squares:

> $$b = \frac{\overline{xy}-\bar{x}\,\bar{y}}{\overline{x^2}-\bar{x}^2}$$

> $$a = \bar{y} - b\bar{x}$$

- For accident years 1985–1990, $L(x) = 0.968x + 6{,}023$, and the 1991 estimate is $0.968(40{,}490) + 6{,}023 = 45{,}217$.
- The fit includes the budgeted loss method ($b = 0$, when $x$ and $y$ are uncorrelated) and the link ratio method ($a = 0$, most obviously when the observed link ratios are all equal) as special cases; at heart it is a [[Credibility|credibility]] weighting system whose weights are determined by the properties of the loss and loss reporting distributions.
- The [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] method is a third special case, $L(x) = a + x$; it always has $b = 1$, a real limitation, and Salzmann warns against using it when losses develop downward.
- Potential problems in parameter estimation: a significant change in the nature of the loss experience, or sampling error in a stable book, can give values of $a$ and $b$ that do not reflect its true character; if $a < 0$ one might substitute the link ratio method, and if $b < 0$ the budgeted loss method.

## Hugh White's question
- In his review of the Bornhuetter-Ferguson paper, Hugh White asks what to do when the reported proportion of expected losses for the current accident year is 8% higher than it should be: reduce the bulk reserve correspondingly, leave it at the same percentage of expected losses, or increase it in proportion to actual over expected reported.
- The three answers are the budgeted loss, Bornhuetter-Ferguson and link ratio methods respectively; they lie on a continuum that includes the other options implied by $L(x) = a + bx$, and each can be correct in the right circumstances.
- The credibility formulas the paper develops are analytical tools for choosing among them, supplementing rather than replacing informed judgment.

## Loss and loss reporting distributions—using models to test the method
- The method is tested on theoretical claim count models — $Y$ the claims incurred in a year, $X$ those reported by year end — with $Q(x) = E(Y \mid X = x)$ the expected total and $R(x) = Q(x) - x$ the expected number outstanding; the techniques also apply to incurred losses or claim severity.
- A simple model ($Y$ is 0 or 1 with equal probability; a claim has a 50% chance of report by year end): [[Bayes Theorem]] gives $Q(x) = (2/3)x + 1/3$, compatible with neither the link ratio, the budgeted loss nor the Bornhuetter-Ferguson method, but compatible with least squares.
- A Poisson-Binomial example (Poisson $Y$ with mean 4, each claim reported by year end with probability 1/2, independently): $Q(x) = x + 2$, so the expected number outstanding does not depend on the number already reported; the short way splits $Y$ into two independent Poisson processes with mean 2 ([[Poisson Thinning|Poisson thinning]]).
- No link ratio reproduces $Q(x)$: the unbiased $c = 2$ (also Salzmann's "iceberg technique") has a mean squared error of 4, the minimum-MSE $c = 5/3$ is biased low with MSE 10/3, and $c = E(Y/X \mid X \ne 0) \approx 2.153$ is biased high with MSE about 4.752, against 2 for $Q(x)$.
- In the general Poisson-Binomial case, $Q(x) = x + \mu(1-d)$ and $R(x) = \mu(1-d)$: the Bornhuetter-Ferguson estimate — White's second answer — is optimal.
- In the Negative Binomial-Binomial case, $R(x)$ is an increasing linear function of $x$ ($Q(x) = (4/3)x + 4/3$ when $r = 4$ and $d = p = 1/2$); the [[Negative Binomial Distribution|negative binomial]]'s extra variance means less confidence in the prior estimate and a larger $b$.
- The fixed prior case ($Y$ sure to equal $k$) gives $Q(x) = k$, White's first answer; the fixed reporting case (a fixed proportion $d$ always reported) gives $Q(x) = x/d$, the link ratio method and White's third answer.
- A non-linear example ($Y$ uniform on $\{2, 3, 4, 5, 6\}$, $d = 1/2$) gives an $R(x)$ that is neither linear nor monotonic; its low variance for $Y$ probably reflects management psychology better than reality.
- The method of Bayesian development: given estimated distributions of $Y$ and $X \mid Y$, Bayesian estimates of ultimate claim costs can be produced, approximated to any accuracy and tested for sensitivity to the distributions chosen.

## The linear approximation (Bayesian credibility)
- A pure Bayesian estimate needs a good deal of knowledge about the loss and loss reporting processes, so the paper follows Bühlmann in using the best linear approximation to it — less accurate, but simpler to compute, easier to explain and less dependent on the underlying distributions ([[Bühlmann Credibility]]).
- Development Formula 1: given $Y$ describing ultimate losses and $X$ reported losses, the linear function minimizing $E_X([Q(X) - L(X)]^2)$ is

> $$L(x) = (x - E(X))\,\frac{Cov(X,Y)}{Var(X)} + E(Y)$$

- This answers White's question: if $Cov(X,Y) < Var(X)$ a large reported amount should decrease the reserve, if they are equal it should not affect the reserve, and if $Cov(X,Y) > Var(X)$ it should increase the reserve.

## Practical application of the first formula—least-squares development
- With a series of past years assumed to share a common $Y$ and $X$, estimating the covariance, variance and means from the data turns Formula 1 into the least squares procedure: but for sampling error, least squares gives the best linear approximation to the Bayesian estimate, regardless of the distributions of $X$ and $Y$.
- On Table 2's data, $L(x) \approx 0.969x + 2.344$ against the true $Q(x) = x + 2$, with an MSE of about 2.081 — better than the best link ratio estimate.
- Even when the method works perfectly the fit need not show a high correlation, because $Var_X(Y \mid X)$ is not zero.
- A simulation test of least-squares development: over 20 trials of seven years each (Table 4), least squares beats the link ratio method with $c = \bar{Y}/\bar{X}$ in the great majority of cases (average MSE 3.658 against 6.384); its poorer results show negative coefficients, and the link ratio method is biased (an average ratio of 2.122 against the unbiased 2.000).
- When is least-squares development appropriate? When random chance, rather than systematic shifts in the book of business, is the primary cause of fluctuations; known distortions should be corrected first — a constant-dollar basis for [[Inflation|inflation]], division by an exposure measure for a growing book, or techniques such as those of [[Berquist-Sherman Method|Berquist and Sherman]].

## A credibility form of the development formula
- Following Bühlmann, $L$ is expressed through the [[Expected Value of Process Variance|expected value of the process variance]], $EVPV = E_Y(Var(X \mid Y))$ — variability from the loss reporting process — and the [[Variance of Hypothetical Means|variance of the hypothetical means]], $VHM = Var_Y(E(X \mid Y))$ — variability from the loss occurrence process.
- Development Formula 2: if $E(X \mid Y = y) = dy$ for some $d \neq 0$, then $L$ is a credibility weighting of the link ratio estimate $x/d$ with the budgeted loss estimate $E(Y)$:

> $$L(x) = Z\,\frac{x}{d} + (1-Z)\,E(Y)$$

> $$Z = \frac{VHM}{VHM + EVPV}$$

- $EVPV = 0$ gives full weight to the link ratio estimate (the fixed reporting case) and $VHM = 0$ gives $L(x) = E(Y)$ (the fixed prior case); in the Poisson-Binomial case $Z = d$, and $Z = d$ whenever least squares coincides with Bornhuetter-Ferguson, while the Negative Binomial-Binomial case has a larger $VHM$ and gives the link ratio estimate more weight.
- For Table 1, $d = \bar{x}/\bar{y} = 0.798$ and $Z = bd = 0.773$: the least squares estimate gives weight 0.773 to the link ratio estimate (link ratio $d^{-1} = 1.253$) and 0.227 to the budgeted loss estimate.
- A different application of Bayesian credibility: when the assumption of stable loss and reporting distributions fails — personal auto losses in a state that has just instituted a strict verbal tort threshold — $EVPV$ and $VHM$ can be estimated from selected means and standard deviations of the loss $Y$ and the reporting ratio $X/Y$; the example's estimate of \$9.5 million lies between the link ratio estimate of \$8 million and the budgeted loss of \$12 million, slightly above Bornhuetter-Ferguson's \$9 million, and is not extremely sensitive to the selections.

## The caseload effect
- Formula 2 assumes the expected number of claims reported is proportional to the number incurred; but since a claim is more likely to be reported in a timely fashion when the caseload is low, the development ratio $E(X \mid Y = y)/y$ may be a decreasing function of $y$ — the [[Caseload Effect|caseload effect]].
- Assuming instead $E(X \mid Y = y) = dy + x_0$ gives the decreasing development ratio $d + x_0/y$, and $x_0 = 0$ recovers Formula 2; Development Formula 3 follows:

> $$L(x) = Z\,\frac{x - x_0}{d} + (1-Z)\,E(Y)$$

- The least squares method can therefore make sense even where the development ratio varies with the caseload, and the values of $x_0$ and $d$ are not needed to apply it.

## A final example
- Table 6 (State CC, Line DD, total limits losses) gives earned premium and reported losses at 12 to 60 months for accident years 1985–1991; because of significant growth in volume, losses are divided by premium to give a triangle of reported loss ratios.
- Following Clarke, the most mature years are developed first and their results used for successively less mature years; assuming an additional 10% of development from 60 months to ultimate gives ultimate loss ratios of 0.219, 0.594 and 0.580 for 1985–1987.
- For 1988, the fit of ultimate on 48-month loss ratios gives $b = 1.301$, $a = 0.020$ and an ultimate loss ratio of $0.020 + 1.301(0.160) = 0.229$ — a weighted average of the link ratio estimate $(1.360)(0.160) = 0.218$ and the budgeted loss estimate 0.464 with $Z = b/c = 0.957$; when $a$ comes out negative, set $Z = 1$ and use a simple link ratio estimate.
- Working back to 1989–1991 (Table 9), $Z$ increases steadily as years mature while $c$ and $a$ decrease — patterns that cross-check the work; the ultimate loss ratios times earned premium give the ultimate losses (Table 10).
- The procedure uses only commonly available data, is less fragile than the link ratio method, and presents the analysis in a tabular form that exposes its assumptions.

## Conclusion
- Least squares development is practically useful and justifiable on theoretical grounds: when random fluctuations are severe it tends to produce more reasonable estimates of ultimate loss than the link ratio method, without requiring much additional data.
- It is no panacea: significant exposure changes or other shifts in the loss history need correcting, and it is subject to the sampling errors present whenever parameters are estimated from data.
- It can be most helpful for small states or lines subject to serious fluctuations, especially when earned premium can adjust past losses to a level consistent with the current year, and it gives a framework for understanding the more traditional development methods and the relationships between them.

## Appendix—Proof of Development Formulas 2 and 3
- Since $E(X \mid Y = y) = dy$, $VHM = d^2 Var(Y)$ and $Cov(X,Y) = d\,Var(Y) = VHM/d$; with $Var(X) = VHM + EVPV$, Formula 1 becomes Formula 2.
- For Formula 3, $W = X - x_0$ shares a common $EVPV$ and $VHM$ with $X$, so Formula 2 applies to $W$ and $Y$.

## Sources
- [Loss Development Using Credibility (Brosius, CAS, 1993)](https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf) — the document, a 19-page scan with an OCR text layer, read from the page images: the title page (author, dated March 30, 1993), the abstract, every heading and the text, formulas and tables under it
- [CAS Exam 7 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf) — the citation (CAS Study Note, March 1993) and the assigned scope
