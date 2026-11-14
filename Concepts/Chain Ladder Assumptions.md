---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:2aa0bc1bba58c72286eb7cd54e592e99e6a7609b6cee9930816b86ddfd91a8eb
  sources:
    - "Venter, Testing the Assumptions of Age-to-Age Factors (PCAS LXXXV, 1998), Implication 4, printed p.832 (PDF p.26), sha256:58523222aa33f1b8c82455818e8c2da1b8f24aee7d83badf8c88d2f71a638dcb — https://www.casact.org/sites/default/files/database/proceed_proceed98_980807.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Chain Ladder Assumptions.md
---
The **Chain Ladder Assumptions** are the conditions under which the [[Chain Ladder Method|chain ladder]]'s age-to-age factors give least-squares optimal reserves, meaning the minimum variance unbiased linear estimate of future emergence. [[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)|Venter (1998)]] restates [[Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994)|Mack's]] three assumptions for the incremental losses $q(w,d)$ and cumulative losses $c(w,d)$ of accident year $w$ at age $d$.

The expected emergence in the next period, given the data to date, is

> $$E[q(w,d+1) \mid \text{data to } w+d] = f(d)\,c(w,d)$$

- $f(d)$ is the *incremental* factor at age $d$, one less than the usual link ratio.

Its variance is

> $$\text{Var}[q(w,d+1) \mid \text{data to } w+d] = a[d,\,c(w,d)]$$

- $a[d,\,c(w,d)]$ is a function of the age and the losses to date.

## The three assumptions

1. **Proportionality.** Expected emergence is proportional to losses emerged to date: a line through the origin, with the same factor for every accident year. Plotting next-age losses against current-age losses for each accident year should show a roughly straight line through the origin.
2. **Independence.** $c(w,d)$ and $c(v,g)$ are independent unless $v = w$, so accident years are independent. A strong diagonal breaks it.
3. **Variance.** The variance function picks the estimator of $f(d)$:
    - Mack's $a = k(d)\,c(w,d)$, variance proportional to losses to date, gives the volume-weighted factor $\sum q/\sum c$.
    - $a = k(d)\,c(w,d)^2$ gives the simple average of the ratios.
    - A constant $a$ gives $\sum c\,q/\sum c^2$ ([[Mack Chain Ladder Model]]).

## Testable implications

The assumptions can't be tested directly, but six of their consequences can:

1. $f(d)$ is significant.
2. It beats the alternative emergence patterns: linear with constant, $f(d)c(w,d) + g(d)$; factor times parameter, $f(d)h(w)$; and with a calendar year term, $f(d)h(w)g(w+d)$.
3. The model is linear: no runs of same-signed [[Residual|residuals]] against $c(w,d)$.
4. The factor is stable: no such runs against time.
5. There is no correlation among columns ([[Development Factor Correlation Test]]).
6. There are no particularly high or low diagonals ([[Calendar Year Effect]]).

Residuals randomly scattered around zero, with no trend and no change in size, support the linearity and the variance assumption. The formal treatment of instability is the state-space model, which compares the instability of the observations around the current mean with the instability of the mean itself over time. It helps decide whether to use all the data or a weighted average that de-emphasizes older years.

## Testing the factor's significance

Regress $q(w,d+1)$ on $c(w,d)$ with a constant $a$ and a factor $b$. A factor is usually wanted at least twice its standard deviation (about a 4.5% chance for a Normal when the true value is zero), or 1.65 times (about 10%). In a cumulative-to-cumulative regression, test the factor's difference from $1$.

> [!example]- Is the 12–24 factor in this triangle significant, and what does the result imply? {Example}
> Cumulative paid at 12 months ($x$) and incremental paid from 12 to 24 months ($y$), in $\$000$, are:
>
> | AY | $x$ | $y$ |
> | :--- | ---: | ---: |
> | 1 | 1,000 | 2,100 |
> | 2 | 1,500 | 1,900 |
> | 3 | 2,000 | 2,300 |
> | 4 | 2,500 | 2,000 |
> | 5 | 3,000 | 2,200 |
>
> Fit $y = a + bx$ by least squares and test $a$ and $b$ against twice their standard deviations.
>
> > [!answer]-
> > - $\bar x = 2{,}000$ and $\bar y = 2{,}100$, so $S_{xx} = 2{,}500{,}000$ and $S_{xy} = 150{,}000$.
> > - $b = 150{,}000/2{,}500{,}000 = 0.060$ and $a = 2{,}100 - 0.060(2{,}000) = 1{,}980$.
> > - The residuals are $60, -170, 200, -130, 40$, so SSE $= 91{,}000$ and $s^2 = 91{,}000/3 = 30{,}333$.
> > - $\text{sd}(b) = \sqrt{30{,}333/2{,}500{,}000} = 0.110$.
> > - $\text{sd}(a) = \sqrt{30{,}333\left(\tfrac15 + \tfrac{2{,}000^2}{2{,}500{,}000}\right)} = 233.7$.
> > - The factor is only $0.060/0.110 = 0.5$ standard deviations from zero, so it is not significant. The constant is $1{,}980/233.7 = 8.5$ standard deviations, so it clearly is.
> > - The 12–24 emergence is a roughly constant amount, about $\$2.1$M per accident year, not proportional to what has emerged by 12 months. That fails implication 1 and points to the additive or Cape Cod pattern, once the triangle is on a common exposure and cost level.

## Alternative emergence patterns and comparing fits

In the parameterized [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] model, $h(w)$ is proportional to each year's ultimate, giving $2n - 2$ parameters for $n$ years. The [[Cape Cod Method|Cape Cod]] uses a single $h$, so it has as many parameters as the chain ladder. The additive chain ladder, whose $g(d)$ is the average loss emerged at age $d$, fits exactly as the Cape Cod does. Its expected emergence does not depend on losses to date, so an abnormally high loss to date is not multiplied through every future age as it is in the chain ladder.

Fits are compared on the sum of squared errors adjusted for $p$ parameters and $n$ observations. Venter's statistic is

> $$\text{Adjusted SSE} = \frac{\text{SSE}}{(n-p)^2}$$

A statistic that approximates the [[AIC]] is

> $$\text{AIC-type} = \text{SSE}\,e^{2p/n}$$

and one that ranks models as the [[BIC]] does is

> $$\text{BIC-type} = \text{SSE}\,n^{p/n}$$

The AIC-type statistic is the most permissive of extra parameters.

> [!example]- Does the chain ladder or the additive chain ladder fit this triangle better, and what reserves do they give? {Example}
> Incremental incurred losses, in $\$000$, are:
>
> | AY | Age 0 | Age 1 | Age 2 | Age 3 |
> | :--- | ---: | ---: | ---: | ---: |
> | 0 | 1,000 | 2,000 | 1,200 | 400 |
> | 1 | 1,600 | 2,100 | 1,100 | |
> | 2 | 700 | 1,900 | | |
> | 3 | 1,300 | | | |
>
> Fit both to the six increments at ages 1–3, the chain ladder's fitted increment being $f(d)$ times the actual previous cumulative, and compare the adjusted SSE.
>
> > [!answer]-
> > - The chain ladder's incremental factors are $f(0) = 6{,}000/3{,}300 = 1.8182$, $f(1) = 2{,}300/6{,}700 = 0.3433$ and $f(2) = 400/4{,}200 = 0.0952$.
> > - Its fitted increments are $1{,}818.2$, $2{,}909.1$ and $1{,}272.7$ at age 1, $1{,}029.9$ and $1{,}270.1$ at age 2, and $400.0$ at age 3, so its SSE is $1{,}139{,}059$.
> > - The additive model's $g(1) = 2{,}000$, $g(2) = 1{,}150$ and $g(3) = 400$ are the column averages. Its residuals are $0, 100, -100, 50, -50, 0$, so its SSE is $25{,}000$.
> > - Both have $p = 3$ parameters for $n = 6$ observations, so both divide by $(6 - 3)^2 = 9$: $126{,}562$ for the chain ladder and $2{,}778$ for the additive model.
> > - The additive pattern fits far better. Age-1 emergence is about $2{,}000$ whether a year started at $700$ or $1{,}600$, which the chain ladder's proportionality cannot reproduce.
> > - The chain ladder's reserve is $457 + 1{,}225 + 4{,}090 = 5{,}772$, and the additive model's is $400 + 1{,}550 + 3{,}550 = 5{,}500$.
> > - They differ most for AY 3, whose above-average $1{,}300$ the chain ladder multiplies through every future age.

## When the chain ladder fails

"If the chain ladder doesn't work, try Bornhuetter-Ferguson." Venter endorses this rule of thumb when "doesn't work" means *fails the assumptions of least-squares optimality* and "try" means *test the underlying assumptions of*. If emergence is stable, using only the last few diagonals only adds estimation error.
