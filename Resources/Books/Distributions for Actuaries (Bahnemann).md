---
Title: "Distributions for Actuaries"
Authors: "David Bahnemann"
Publisher: "Casualty Actuarial Society"
Year: "2015"
date: "2015"
Type: "Monograph"
Code: "CAS Monograph No. 2"
ISBN: "978-0-9624762-9-7"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a03030159cc679e256273aab23a94018746010fb06c8ee823a9ff595e0f20bd7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Distributions for Actuaries (Bahnemann).md
---
![[Distributions for Actuaries (Bahnemann) - Cover.svg]]

A brief exposition of the standard probability distributions, and their fundamental applications, commonly encountered by property/casualty actuaries. Its focus is the use of parametric distributions fitted to empirical claim data to solve standard actuarial problems: creating increased limit factors, pricing deductibles and evaluating the effect of aggregate limits. After a review of probability and statistics, it introduces the common claim-size, claim-count and aggregate loss distributions, then takes up excess claims and layers of insurance (Chapter 5), which Chapter 6 applies to deductibles and limits. It is the second monograph in the CAS Monograph Series.

> [!info] On the syllabus
> - [[Exam 8 (CAS)|Exam 8]] — objectives B1–B3; Chapters 5 and 6, including errata; it is highly recommended that candidates read the entire monograph, as the material in Chapters 1–4 will be assumed to be familiar

## 1 Introduction
- 1.1 Probability Spaces
- 1.2 [[Random Variable|Random Variables]] and Probability Distributions
- 1.3 [[Expected Value|Mathematical Expectation]]
- 1.4 [[Random Sample|Random Samples]]
- 1.5 Fitting Distributions
- 1.6 Problems

## 2 Claim Size
- 2.1 Claim-Size Random Variables
- 2.2 [[Limited Expected Value|Limited Moments]]
- 2.3 [[Gamma|Gamma Distributions]]
- 2.4 [[Lognormal Distribution|Lognormal Distributions]]
- 2.5 Pareto Distributions
- 2.6 Estimation with Modified Data
- 2.7 [[Transformations of Random Variables|Transformations]]
- 2.8 [[Inflation|Inflation Effects]]
- 2.9 Problems

## 3 Claim Counts
- 3.1 An Elementary Claim Process
- 3.2 [[Poisson Process|Poisson Claim Processes]]
- 3.3 Parameter Uncertainty
- 3.4 [[Negative Binomial Distribution|Negative Binomial Distributions]]
- 3.5 Claim Contagion
- 3.6 Portfolio Claims
- 3.7 Problems

## 4 Aggregate Claims
- 4.1 A Discrete Example
- 4.2 [[Aggregate Loss Model|Aggregate Distribution Properties]]
- 4.3 Approximation by Matching Moments
- 4.4 Recursion
- 4.5 Fourier Approximation
- 4.6 Discontinuities
- 4.7 Simulation
- 4.8 Problems

## 5 Excess Claims
- The chapter studies claims larger than a fixed positive amount, those that penetrate an excess layer. Their distributions are critical to quantifying deductibles and to pricing successive layers of coverage above a first-dollar, or primary, layer.
- 5.1 Excess Claim Size
    - Under an underlying limit $a$ (a deductible, or the limit of the primary policy beneath an umbrella or excess policy), the insurer pays $Y = 0$ if $X \leq a$ and $Y = X - a$ otherwise, with $E[Y] = E[X] - E[X;a]$ (5.1).
    - Insurers do not always see, and are not usually interested in, claims with $Y = 0$, so the more useful variable is $X_a = X - a$, defined only for $X > a$: the excess of $X$ over the limit $a$, or $X$ truncated from below and shifted by $a$ (5.2). Its distribution is obtained conditionally from that of $X$ (5.3), and its mean is the [[Excess Severity|excess severity]] (5.4):
        > $$E[X_a] = \frac{E[X] - E[X;a]}{1 - F_X(a)}$$
    - Its second and third moments (5.5)–(5.6), and its limited expected value $E[X_a;l] = \left(E[X;a+l] - E[X;a]\right)/(1 - F_X(a))$ (5.7), are combinations of the [[Limited Expected Value|limited moments]] of $X$.
    - An exponential $X_a$ has the same distribution as $X$, so a deductible or underlying coverage does not change the claim-size distribution (Example 5.1). A Pareto $(\alpha, \beta)$ gives a Pareto $(\alpha,\ d + \beta)$ excess variable, whose mean $(d + \beta)/(\alpha - 1)$ increases linearly with $d$ (Example 5.2).
    - Example 5.3 fits a lognormal by minimum chi-square to 300 claims that were censored by a \$50,000 policy limit and then subjected to a \$1,500 straight deductible, giving $(\mu, \sigma) = (8.67593,\ 1.18109)$ and an estimated 43 claims eliminated by the deductible. The errata correct its table (3 claims in the 40,001–45,000 group and 15 in the 45,001–48,500 group), $n_{10} = 15$, and the cell index $k = 0, 1, \ldots, 9$.
- 5.2 Excess Severity
    - $E[X_a]$ is called the mean excess claim size at $a$, or the excess severity at $a$ (also, illogically for loss distributions, the mean residual life). As a function of the limit it is written $e(x)$ (5.8):
        > $$e_X(x) = \frac{E[X] - E[X;x]}{1 - F_X(x)}$$
    - Its behaviour for large $x$ is characteristic of a parametric family: constant for the exponential, an increasing linear function for the Pareto with $\alpha > 1$, increasing without bound for the lognormal, decreasing toward a horizontal asymptote for the gamma, and like $a/x^b$ for the Weibull (Figure 5.1).
    - The shape of the sample excess severity function $e_n(x)$ may suggest a family: nearly linear with positive slope, a Pareto; nearly constant for large $x$, a gamma or exponential; between these extremes, a lognormal or Weibull. The shape appears only at large $x$, so the data must contain enough large claims.
    - Example 5.4 fits a Pareto $(\alpha, \beta) = (4.88599;\ 4{,}696.22)$ by equating a least-squares line through $e_n(x)$ ($R^2 = 0.9823$) with $(x + \beta)/(\alpha - 1)$, cautioning that the slope is sensitive to the largest claims. In Example 5.5 the gamma's $e(x)$ tracks the sample better than the lognormal's.
- 5.3 Layers of Coverage
    - Claims decreased by an underlying limit or attachment point $a$ and then limited by a layer limit or width $l$ belong to the [[Layer of Insurance|layer of coverage]] $(a,\ a + l]$. A claim penetrates the layer when $x > a$. With $a > 0$ it is an excess layer; with $a = 0$ its claims are first-dollar, or ground-up. A layer of coverage is conceptually different from an interval of claims.
    - With a straight deductible the deductible is applied after the policy limit, so the insured layer is $(a,\ l]$, of width $l - a$. Example 5.6 splits four claims under a \$3,000 limit and \$100 deductible into a deductible layer (350), the insured layer (5,100) and an uninsured layer above 3,000 (1,000).
    - The layer claim size $X_{a,l}$ is $X - a$ up to $l$ (5.9)–(5.10), and its moments are the limited moments of $X_a$ (5.11)–(5.13):
        > $$E[X_{a,l}] = \frac{E[X;a+l] - E[X;a]}{1 - F_X(a)}$$
    - Limits decrease the variability of a claim process, measured by the [[Coefficient of Variation|coefficient of variation]] $CV[X] = SD[X]/E[X]$ (5.14). For a lognormal $(5.9809,\ 1.800)$ the CV falls from 4.9531 ground-up to 2.9858 excess of 3,000, and to 0.6452 in the layer 5,000 excess of 3,000 (Example 5.8).
- 5.4 Excess Claim Counts
    - If the distribution of $X$ is unchanged over time, the number of claims excess of $a$ is binomial $(k, p)$ given $k$ ground-up claims, with $p = 1 - F_X(a)$. For every ground-up count $N$ (5.15)–(5.18):
        > $$E[N_a] = p\,E[N]$$
        > $$Var[N_a] = p^2\,Var[N] + p(1 - p)\,E[N]$$
    - A Poisson $(\lambda)$ ground-up count gives a Poisson $(p\lambda)$ excess count — [[Poisson Thinning]] — and a negative binomial $(\alpha, \nu)$ gives a negative binomial $(\alpha,\ p\nu)$. In Example 5.9, 15 expected ground-up claims give 1.9536 claims excess of 3,000.
- 5.5 Inflation Effects
    - A uniform trend factor $\tau = 1 + r$ on ground-up claims changes the excess claim size by the effective trend factor (5.19), the excess claim count by (5.20), and the aggregate excess loss by (5.21):
        > $$\tilde{\tau}_N = \frac{1 - F_X(a/\tau_X)}{1 - F_X(a)}$$
        > $$\tilde{\tau}_S = \tau_X\,\frac{E[X] - E[X;a/\tau_X]}{E[X] - E[X;a]}$$
    - $\tau_X > 1$ implies $\tilde{\tau}_N \geq 1$ and $\tilde{\tau}_S \geq \tau_X$: a fixed underlying limit magnifies, or leverages, the claim-size trend on the aggregate excess loss ([[Inflation]]). The excess count can rise faster or slower than the claim-size trend.
    - For a Pareto $(2;\ 3{,}000)$ with 10% inflation and a 5,000 retention, the excess severity rises 3.75% but the severity of the layer (5,000; 9,000] only 1.27%, illustrating the damping effect of an upper limit (Example 5.10). The excess count rises 12.41% (Example 5.11), and the aggregate excess loss 16.6% from claim-size inflation alone, or 22.46% with 5% growth in the ground-up count (Example 5.12).
- 5.6 Aggregate Layer Claims
    - The [[Aggregate Loss Model|aggregate loss]] $S$ for a layer $(a,\ a + l]$ is built from $N_a$ and $X_{a,l}$. With $E[N] = \lambda$ and contagion parameter $\gamma$, so that $Var[N] = \lambda + \gamma\lambda^2$, its mean (5.22) and variance (5.23) are:
        > $$E[S] = \lambda\left(E[X;a+l] - E[X;a]\right)$$
        > $$Var[S] = \lambda\left(E[X^2;a+l] - E[X^2;a]\right) - 2aE[S] + \gamma\left(E[S]\right)^2$$
    - Its skewness follows from (5.24). For the layer 5,000 excess of 3,000 with $\lambda = 15$ and the lognormal of Example 5.8, $E[S] = 5{,}775$, $Var[S] = 24{,}178{,}800$ and the skewness is 0.92816 (Example 5.13).
    - When the expected layer claim count is small — often the case for small portfolios or large single policies — the layer aggregate distribution has jumps of substantial size at the lower end, at the smaller multiples of the layer limit. That complicates approximating it with a continuous model such as the shifted gamma, though such models can still give reasonable results for the long tail.
- 5.7 Problems

## 6 Limits and Deductibles
- The chapter applies the claim-count, claim-size and aggregate-loss distributions to pricing policies with deductible options and with per-claim and aggregate limits.
- 6.1 Premium Concepts
    - The claim amount $Y$ is the indemnity plus [[Allocated Loss Adjustment Expense|allocated loss adjustment expense]], as limited by policy conditions. Unallocated loss adjustment expenses are usually treated as general expenses. The policy expected loss $E[N]E[Y]$ is loaded for general expenses, [[Underwriting Profit|underwriting profit]] and a risk charge for process risk and parameter risk.
    - With $m$ exposure units and claim frequency $\varphi$, $m\varphi = E[N]$ (6.1). The [[Pure Premium|pure premium]] is frequency times severity (6.2), the expected aggregate claim amount per unit of exposure:
        > $$p = \varphi\,E[Y]$$
    - With [[Variable Expenses|variable expense]], profit and risk loads a fraction $v$ of premium and [[Fixed Expenses|fixed expense]] $f$ per exposure unit, the rate per unit exposure is $R = (p + f)/(1 - v)$ (6.4). When $f = 0$, $\psi = 1/(1 - v)$ is the loss-cost multiplier and $P = \psi E[N]E[Y]$ (6.7), the loading the rest of the chapter assumes.
- 6.2 Increased Limit Factors
    - The [[Increased Limits|increased limit factor]] is $I(l) = P_l/P_b$ for a policy limit $l$ and basic limit $b$ (6.8); with a loss-cost multiplier, $I(l) = E_l[Y]/E_b[Y]$ (6.9).
    - When the limit applies to indemnity plus ALAE, $I(l) = E[X_t;l]/E[X_t;b]$ (6.10). When it applies only to indemnity, as is usual, ALAE is added as an average per-claim amount $\varepsilon$ (6.12) or as a fixed multiple $u$ of indemnity (6.14), combined in the general policy severity (6.15). ISO treats ALAE additively, like $\varepsilon$, and unallocated expense multiplicatively, like $1 + u$.
        > $$E_l[Y] = \left(E[X;l] + \varepsilon\right)(1 + u)$$
    - For a lognormal $(7.000,\ 2.400)$ with a 100,000 basic limit, $I(1{,}000{,}000)$ is 1.5812 with $\varepsilon = 2{,}200$ and 1.7249 with $u = 20\%$ (Example 6.3, Table 6.1).
    - Excess layer pricing: the pure premium for a layer $(a,\ a + l]$ is $p_{a,l} = \varphi\left(1 - F_{X_t}(a)\right)E_{a,l}[Y]$. When the total claim is subject to the layer limits, the layer factor is a difference of two ground-up factors, the layer formula (6.17):
        > $$P = P_b\left(I(a + l) - I(a)\right)$$
    - The layer formula is widely used even where not strictly appropriate. With ALAE added as $\varepsilon$, it drops the ALAE load from the excess premium entirely (6.19), consistent with the primary insurer paying all ALAE; with ALAE as $1 + u$, it preserves the load exactly (6.20). Premiums for successive million-dollar layers above 1,000,000 are 428, 201, 121 and 82 (Example 6.4, Table 6.2).
    - Consistency: a set of increased limit factors is consistent if $I''(x) < 0$ for all limits $x$. Every set based on (6.15) with a positive and continuous claim-size density is consistent, and consistent factors give decreasing layer premiums for layers of constant width as the attachment point rises. The errata delete the factor $(1 + u)$ from the derivatives:
        > $$I'(x) = \frac{1 - F_X(x)}{E[X;b] + \varepsilon}$$
- 6.3 Risk Load
    - Expected-value factors have generally been thought inadequate for high limits or attachment points without a charge for process risk. A [[Risk Loads|risk load]] $\rho(l)$, increasing in $l$, is added to the policy severity, giving risk-loaded factors (6.21)–(6.22):
        > $$I(l) = \frac{\left(E[X;l] + \varepsilon\right)(1 + u) + \rho(l)}{\left(E[X;b] + \varepsilon\right)(1 + u) + \rho(b)}$$
    - Miccolis suggested in 1977 a process risk load that is a constant multiple $k$ of the variance of the policy aggregate indemnity loss $S$, an approach ISO adopted in the early 1980s (6.23), with $\delta = Var[N]/E[N] - 1$ ($\delta = 0$ for a Poisson count):
        > $$\rho(l) = k\,\frac{Var[S]}{E[N]} = k\left(E[X^2;l] + \delta\left(E[X;l]\right)^2\right)$$
    - By the mid-1980s ISO had changed to the standard deviation, $\rho(l) = k'\sqrt{E[X^2;l] + \delta(E[X;l])^2}$ (6.24). ISO actuaries cited several reasons: risk-loaded factors based on (6.23) and (6.24) with thick-tailed Pareto claim sizes were sometimes inconsistent, and a risk load in dollars seemed preferable to one in dollars squared. ISO's 1991 method, based on Meyers, adds parameter risk and returns to the variance for process risk.
    - With $k' = 0.0277$ and $\delta = 0$, $I(1{,}000{,}000)$ rises from 1.7249 to 1.8074, and the risk-loaded factors raise premium 6.0% on the portfolio's mix of limits (Example 6.5, Table 6.3).
    - Both approaches are incompatible with the layer formula: under the variance method the layer's own risk load is $\rho_{a,l} = \rho(a + l) - \rho(a) - 2ka\left(E[X;a+l] - E[X;a]\right)$, less than the $\rho(a + l) - \rho(a)$ the layer formula ascribes. Pricing the layer with unloaded factors and then adding its own risk load is probably too cumbersome to be widely adopted, and is used more by reinsurers providing excess-of-loss coverage. The errata delete the factor $(1 - F_X(a))$ from the layer risk load's denominator.
- 6.4 Aggregate Limits
    - An [[Aggregate Limit|aggregate limit]] $L$ is the maximum paid during the policy term for all claims combined, where the per-claim limit $l$ is the maximum on a single claim. The policy expected loss is $E[S_l;L]$, with unlimited aggregate mean $E[S_l] = E[N]E[X;l]$ (6.25).
    - It is often more efficient and accurate to compute the loss eliminated by the limit and subtract it from (6.25), integrating an approximation of the aggregate distribution from Chapter 4 numerically (6.26), or simulating:
        > $$E[S_l] - E[S_l;L] = \int_L^{\infty} (s - L)\,dF_S(s)$$
    - With ALAE loaded by $1 + u$, the factor for per-claim limit $l$ and aggregate limit $L$ is $I(l, L) = E[S_l;L]/(E[N]E[X;b])$ (6.27).
    - Example 6.6 (a lognormal $(7.600,\ 2.400)$ after the errata, $E[N] = 1.20$, $\gamma = 0.100$, basic limit 500,000): a 3,000,000 aggregate limit over a 2,000,000 per-claim limit eliminates 91 of 34,006, so $I(2\text{M}, 3\text{M}) = 1.2998$ against $I(2\text{M}) = 1.3033$ (Table 6.4).
- 6.5 Deductibles
    - A [[Deductible|deductible]] decreases the policy claim count by eliminating small claims, may encourage the policyholder to prevent or limit claims, and lowers premium. Credits are calculated with the limited pure premium and the [[Loss Elimination Ratio|loss elimination ratio]]. ALAE is assumed not to be included in the deductible or policy limit.
    - Straight deductible: claims net of it, $X_d = X - d$ for $X > d$ (6.28), are excess claims. The basic-limit pure premium $p_b = \varphi\left(E[X;b] + \varepsilon\right)(1 + u)$ (6.29) is reduced by a deductible credit factor, $p_{d,b} = p_b(1 - C(d))$ (6.30). $C(d)$ is the ratio of the pure premium eliminated to that of the layer $[0, b]$, a loss elimination ratio (6.33):
        > $$C(d) = \frac{E[X;d] + F_X(d)\,\varepsilon}{E[X;b] + \varepsilon}$$
    - For a higher limit, $P_{d,l} = P_b\left(I(l) - C(d)\right)$ (6.34). For six straight deductibles (as the errata correct the count), $C(2{,}000) = 0.1249$, and the frequency falls to 0.000201 as the severity rises to 23,291 (Example 6.7).
    - Franchise deductible: claims of $d$ or less are eliminated and larger claims paid in full, $X_d = X$ for $X > d$. Its credit (6.36) is smaller than the straight deductible's, $C(2{,}000) = 0.0347$ (Example 6.8):
        > $$C(d) = \frac{E[X;d] - d(1 - F_X(d)) + F_X(d)\,\varepsilon}{E[X;b] + \varepsilon}$$
    - Diminishing (disappearing) deductible: the deductible declines linearly from $d$ at $X = d$ to 0 at $X = D$ (6.37)–(6.39), with credit factor (6.40). It eliminates an amount between the franchise and straight deductibles (Example 6.9, Table 6.7).
    - Deductibles and inflation: claims net of a straight deductible behave like excess claims, so the deductible magnifies a uniform trend, $0 < r \leq \tilde{r}$ (6.41)–(6.42). An upper policy limit $b$ damps the effect (6.43) and can prevent the inequality. For a Pareto $(2;\ 8{,}000)$ with $d = 500$ and a 5% trend, the effective trend is 5.3% with unlimited claims but 2.2% with a 5,000 limit (Example 6.10, where the errata correct $E[X;5{,}000]$ to 3,077).
- 6.6 Problems

## Appendix
- A.1 Distribution Approximation
- A.2 Answers to Selected Problems
- A.3 References

## Sources
- [Distributions for Actuaries (Casualty Actuarial Society, 2015)](https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf) — the document at the address the content outline links: the back cover and Preface (lead), the title and copyright pages (print and electronic ISBNs), the Foreword (the second monograph in the CAS Monograph Series), the contents (every chapter and section) and the text of Chapters 5 and 6
- [CAS Exam 8 Content Outline, Fall 2026 (v03, June 2026)](https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf) — the citation (CAS Monograph #2) and the assigned scope: Chapters 5 and 6, including errata, with Chapters 1–4 assumed familiar
- [Distributions for Actuaries: Errata (Casualty Actuarial Society)](https://www.casact.org/sites/default/files/2021-03/8_Bahnemann_Errata.pdf) — the corrections noted above: Example 5.3's table, cell count and index (p. 145); the consistency derivatives and the positive-density condition in Section 6.2 (p. 170); the layer risk-load formula (p. 173); "claim-count variable $N$" (p. 174) and Example 6.6's $\mu = 7.600$; "3,000,000" (p. 175); "six straight" deductible options (p. 177); $E[X;5{,}000] = 3{,}077$ in Example 6.10 and $\psi$ for $\gamma$ in Problem 6.1(d) (p. 182); NORM.DIST in equation (A.3) (p. 189); and 4.3114 in the Problem 6.10 answer (p. 199)
