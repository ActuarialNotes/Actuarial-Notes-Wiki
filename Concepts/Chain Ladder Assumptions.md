---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b59ee82a76499c7db8434dc46456f161518f63844f285114ca0b0e17d3b90d57
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Chain Ladder Assumptions.md
---

**Chain Ladder Assumptions** are the conditions under which the [[Chain Ladder Method|chain ladder]]'s age-to-age factors give least-squares optimal reserves, meaning the minimum variance unbiased linear estimate of future emergence. [[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)|Venter (1998)]] restates [[Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994)|Mack's]] three assumptions for incremental losses $q(w,d)$ and cumulative losses $c(w,d)$:

> $$E[q(w,d+1) \mid \text{data to } w+d] = f(d)\,c(w,d)$$
>
> $$\text{Var}[q(w,d+1) \mid \text{data to } w+d] = a[d,\,c(w,d)]$$

- **The three assumptions.** The first says expected emergence is proportional to losses emerged to date: a line through the origin, with the same factor for every accident year. The second, independence, says $c(w,d)$ and $c(v,g)$ are independent unless $v = w$; a strong diagonal breaks it. The third, the variance function, picks the estimator. Mack's $a = k(d)\,c(w,d)$ gives the volume-weighted factor $\sum q/\sum c$. $a = k(d)\,c(w,d)^2$ gives the simple average of the ratios. A constant $a$ gives $\sum c\,q/\sum c^2$ ([[Mack Chain Ladder Model]]). Here $f(d)$ is the *incremental* factor, one less than the usual link ratio.
- **Six testable implications.** The assumptions can't be tested directly, but these consequences can:
    1. $f(d)$ is significant.
    2. It beats the alternative emergence patterns: linear with constant, $f(d)c(w,d) + g(d)$; factor times parameter, $f(d)h(w)$; and with a calendar year term, $f(d)h(w)g(w+d)$.
    3. The model is linear: no runs of same-signed [[Residual|residuals]] against $c(w,d)$.
    4. The factor is stable: no such runs against time.
    5. There is no correlation among columns ([[Development Factor Correlation Test]]).
    6. There are no particularly high or low diagonals ([[Calendar Year Effect]]).
- **Significance.** Regress $q(w,d+1)$ on $c(w,d)$ with a constant $a$ and a factor $b$. A factor is usually wanted at least twice its standard deviation (about a 4.5% chance for a Normal when the true value is zero), or 1.65 times (about 10%). In a cumulative-to-cumulative regression, test the factor's difference from $1$.
- **The alternatives.** In the parameterized [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] model, $h(w)$ is proportional to each year's ultimate, giving $2n - 2$ parameters for $n$ years. The [[Cape Cod Method|Cape Cod]] uses a single $h$, so it has as many parameters as the chain ladder. The additive chain ladder, whose $g(d)$ is the average loss emerged at age $d$, fits exactly as the Cape Cod does.
- **Comparing fits.** Use the sum of squared errors adjusted for $p$ parameters and $n$ observations. Venter's statistic is the first; the second approximates the [[AIC]] and the third ranks models as the [[BIC]] does:

> $$\text{Adjusted SSE} = \frac{\text{SSE}}{(n-p)^2}$$
>
> $$\text{AIC-type} = \text{SSE}\,e^{2p/n}$$
>
> $$\text{BIC-type} = \text{SSE}\,n^{p/n}$$

- **The rule of thumb.** "If the chain ladder doesn't work, try Bornhuetter-Ferguson." Venter endorses it when "doesn't work" means *fails the assumptions of least-squares optimality* and "try" means *test the underlying assumptions of*. If emergence is stable, using only the last few diagonals only adds estimation error.

> [!example]- Is the 12–24 Factor Significant? {Example}
> Cumulative paid at 12 months ($x$) and incremental paid from 12 to 24 months ($y$), in \$000:
>
> | AY | $x$ | $y$ |
> |---|---|---|
> | $1$ | $1{,}000$ | $2{,}100$ |
> | $2$ | $1{,}500$ | $1{,}900$ |
> | $3$ | $2{,}000$ | $2{,}300$ |
> | $4$ | $2{,}500$ | $2{,}000$ |
> | $5$ | $3{,}000$ | $2{,}200$ |
>
> Fit $y = a + bx$ by least squares. Test $a$ and $b$ against twice their standard deviations, and say what the result implies.
>
> > [!answer]-
> > Here $\bar x = 2{,}000$ and $\bar y = 2{,}100$.
> >
> > $$
> > \begin{align*}
> > S_{xx} &= 2{,}500{,}000 \\
> > S_{xy} &= 150{,}000 \\
> > b &= 150{,}000/2{,}500{,}000 \\
> > &= 0.060 \\
> > a &= 2{,}100 - 0.060(2{,}000) \\
> > &= 1{,}980
> > \end{align*}
> > $$
> >
> > The residuals are $60, -170, 200, -130, 40$, so SSE $= 91{,}000$ and $s^2 = 91{,}000/3 = 30{,}333$.
> >
> > $$
> > \begin{align*}
> > \text{sd}(b) &= \sqrt{30{,}333/2{,}500{,}000} \\
> > &= 0.110 \\
> > \text{sd}(a) &= \sqrt{30{,}333\left(\tfrac15 + \tfrac{2{,}000^2}{2{,}500{,}000}\right)} \\
> > &= 233.7
> > \end{align*}
> > $$
> >
> > The factor is only $0.060/0.110 = 0.5$ standard deviations from zero, so it is **not significant**. The constant is $1{,}980/233.7 = 8.5$ standard deviations, so it clearly is.
> >
> > The 12–24 emergence is not proportional to what has emerged by 12 months. It looks like a roughly constant amount, about \$2.1M per accident year. That fails implication 1 and points to the additive or Cape Cod emergence pattern. The triangle should first be put on a common exposure and cost level so that a constant amount makes sense.

> [!example]- Chain Ladder Against the Additive Pattern {Example}
> Incremental incurred losses (\$000):
>
> | AY | Age 0 | Age 1 | Age 2 | Age 3 |
> |---|---|---|---|---|
> | $0$ | $1{,}000$ | $2{,}000$ | $1{,}200$ | $400$ |
> | $1$ | $1{,}600$ | $2{,}100$ | $1{,}100$ | |
> | $2$ | $700$ | $1{,}900$ | | |
> | $3$ | $1{,}300$ | | | |
>
> Fit the chain ladder, with fitted increment $f(d) \times$ the actual previous cumulative, and the additive chain ladder to the six increments at ages 1–3. Compare the adjusted SSE, and the reserves.
>
> > [!answer]-
> > **Chain ladder.** The incremental factors are $f(0) = 6{,}000/3{,}300 = 1.8182$, $f(1) = 2{,}300/6{,}700 = 0.3433$ and $f(2) = 400/4{,}200 = 0.0952$.
> >
> > | Cell | Actual | Fitted | Residual |
> > |---|---|---|---|
> > | AY 0, age 1 | $2{,}000$ | $1{,}818.2$ | $181.8$ |
> > | AY 1, age 1 | $2{,}100$ | $2{,}909.1$ | $-809.1$ |
> > | AY 2, age 1 | $1{,}900$ | $1{,}272.7$ | $627.3$ |
> > | AY 0, age 2 | $1{,}200$ | $1{,}029.9$ | $170.1$ |
> > | AY 1, age 2 | $1{,}100$ | $1{,}270.1$ | $-170.1$ |
> > | AY 0, age 3 | $400$ | $400.0$ | $0$ |
> >
> > The SSE is $1{,}139{,}059$.
> >
> > **Additive.** $g(1) = 2{,}000$, $g(2) = 1{,}150$ and $g(3) = 400$ are the column averages. The residuals are $0, 100, -100, 50, -50, 0$, so the SSE is $25{,}000$.
> >
> > Both models have $p = 3$ parameters for $n = 6$ observations, so both divide by $(6 - 3)^2 = 9$:
> >
> > $$
> > \begin{align*}
> > \text{Chain ladder} &= 1{,}139{,}059/9 \\
> > &= 126{,}562 \\
> > \text{Additive} &= 25{,}000/9 \\
> > &= 2{,}778
> > \end{align*}
> > $$
> >
> > The additive pattern fits far better. Age-1 emergence is about $2{,}000$ whether a year started at $700$ or $1{,}600$, which the chain ladder's proportionality cannot reproduce.
> >
> > **Reserves.** The chain ladder gives $457 + 1{,}225 + 4{,}090 = 5{,}772$. The additive method gives $400 + 1{,}550 + 3{,}550 = 5{,}500$. The two differ most for AY 3, whose above-average $1{,}300$ the chain ladder multiplies through every future age.

> [!example]- Which Parameter Penalty? Venter's Reinsurance Triangle {Example}
> [[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)|Venter]] fits three models to the $n = 45$ incremental losses of an excess casualty reinsurance triangle with ten accident years:
>
> - Bornhuetter-Ferguson: $p = 18$, SSE $\approx 59.172$M.
> - Cape Cod: $p = 9$, SSE $\approx 97.730$M.
> - Chain ladder: $p = 9$, SSE $\approx 204.641$M.
>
> Rank them under each of the three adjustments.
>
> > [!answer]-
> > The multipliers are $1/(n-p)^2$ with $(45-18)^2 = 729$ and $(45-9)^2 = 1{,}296$; $e^{2p/n}$, which is $e^{0.8} = 2.2255$ and $e^{0.4} = 1.4918$; and $n^{p/n}$, which is $45^{0.4} = 4.58443$ and $45^{0.2} = 2.14113$.
> >
> > | Model | $p$ | SSE | $\text{SSE}/(n-p)^2$ | $\text{SSE}\,e^{2p/n}$ | $\text{SSE}\,n^{p/n}$ |
> > |---|---|---|---|---|---|
> > | BF | $18$ | $59.172$M | $81{,}169$ | $131.7$M | $271.3$M |
> > | CC | $9$ | $97.730$M | $75{,}409$ | $145.8$M | $209.3$M |
> > | CL | $9$ | $204.641$M | $157{,}902$ | $305.3$M | $438.2$M |
> >
> > The chain ladder is last every time; its SSE is over twice the Cape Cod's with the same parameter count. The Cape Cod wins under $(n-p)^2$ and the BIC, and the Bornhuetter-Ferguson under the AIC, the most permissive of extra parameters. The data favour emergence as a percentage of ultimate over the chain ladder's proportionality, but which BF variant to use is a judgement the statistics inform without deciding.
