---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ec7fce30debeadb69014c4eba0f4093f6ccf2360c87eadab93df01887b926541
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Least Squares Development Method.md
---
The **Least Squares Development Method** estimates a later value $y$ of an accident year's losses from its current value $x$ with a straight line $L(x) = a + bx$, fitted by least squares to the $(x, y)$ pairs of earlier accident years. [[Loss Development Using Credibility (Brosius - 1993)|Brosius (1993)]] shows that this line is, apart from sampling error, the best linear approximation to the Bayesian estimate $E(Y \mid X = x)$. It is a credibility method for development that is useful when the data are thin and random fluctuations are severe. The fitted line is

> $$L(x) = a + bx$$

- $a$ is the intercept and $b$ the slope.

The [[Ordinary Least Squares|ordinary least squares]] slope is

> $$b = \frac{\overline{xy} - \bar{x}\,\bar{y}}{\overline{x^2} - \bar{x}^2}$$

- Bars are averages over the prior years, so $\overline{xy}$ is the mean of the products and $\overline{x^2}$ the mean of the squares.

and the intercept is

> $$a = \bar{y} - b\,\bar{x}$$

The line passes through the point of means $(\bar{x}, \bar{y})$. The values $x$ and $y$ can be losses, claim counts or loss ratios. A loss ratio estimate is multiplied by its earned premium to give the losses.

> [!example]- What is the current year's 27-month value by least squares? {Example}
> Incurred losses ($\$000$s) for five accident years at 15 months ($x$) and 27 months ($y$) are below. The current year has $x = 40$.
>
> | AY | $x$ | $y$ |
> | :--- | ---: | ---: |
> | 1 | 20 | 30 |
> | 2 | 35 | 44 |
> | 3 | 15 | 26 |
> | 4 | 45 | 49 |
> | 5 | 30 | 42 |
>
> > [!answer]-
> > - The averages are $\bar{x} = 29$, $\bar{y} = 38.2$, $\overline{x^2} = 955$ and $\overline{xy} = 5{,}995/5 = 1{,}199$.
> > - The slope is $b = \dfrac{1{,}199 - 29 \times 38.2}{955 - 29^2} = \dfrac{91.2}{114} = 0.8$.
> > - The intercept is $a = 38.2 - 0.8 \times 29 = 15.0$.
> > - The estimate is $L(40) = 15.0 + 0.8 \times 40 = 47.0$, or $\$47{,}000$.

## Special cases

Three familiar methods fix one of the line's parameters. $b = 0$ is the budgeted loss method, $L(x) = k$, as in the [[Expected Loss Method|expected loss method]]. $a = 0$ is the link ratio method, $L(x) = cx$, as in the [[Chain Ladder Method|chain ladder]]. $b = 1$ is the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] method, $L(x) = a + x$. Least squares lets the data choose $b$ rather than fixing it, and Brosius notes that BF's fixed $b = 1$ is a real limitation when losses develop downward.

## Least squares as credibility

The least squares estimate is a [[Credibility|credibility]] blend of the link ratio estimate and the budgeted loss:

> $$L(x) = Z\,(cx) + (1 - Z)\,\bar{y}$$

- $c = \bar{y}/\bar{x}$ is the link ratio.
- $Z = b/c$ is the credibility of the link ratio estimate.

Brosius's Development Formula 2 gives the theoretical weight as

> $$Z = \frac{VHM}{VHM + EVPV}$$

- $EVPV = E[\mathrm{Var}(X \mid Y)]$ is the [[Expected Value of Process Variance|expected value of process variance]], which measures noise in the reporting process.
- $VHM = \mathrm{Var}(E[X \mid Y])$ is the [[Variance of Hypothetical Means|variance of hypothetical means]], which measures noise in loss occurrence.

Formula 1 is the distribution-free form, $L(x) = (x - E X)\,\mathrm{Cov}(X,Y)/\mathrm{Var}(X) + E Y$, the [[Bühlmann Credibility|Bühlmann credibility]] estimate.

> [!example]- In the 27-month example, what credibility does least squares give the link ratio estimate? {Example}
> - The link ratio is $c = 38.2/29 = 1.3172$.
> - The credibility is $Z = 0.8/1.3172 = 0.607$.
> - The link ratio estimate is $1.3172 \times 40 = 52.69$, and the budgeted loss is $38.2$.
> - The blend is $0.607 \times 52.69 + 0.393 \times 38.2 = 47.0$, the least squares estimate.
> - The five link ratios $y/x$ run from $1.089$ to $1.733$, too noisy to trust fully, so the link ratio estimate gets $61\%$ of the weight.

## Cautions

If $a < 0$, the estimate is negative for small $x$, so substitute the link ratio method. If $b < 0$, the estimate falls as $x$ rises, so substitute the budgeted loss method. The method assumes every year shares one pair of loss and reporting distributions, so it suits random fluctuation rather than systematic change. Before fitting, put years on a constant-dollar basis for [[Inflation|inflation]], and divide by premium or another exposure when the book grows.

## Development in a triangle

Brosius develops the most mature years first. He then uses their projected ultimates as the $y$ values for fitting successively less mature years, so $Z$ rises and $a$ falls as the years mature.

> [!example]- What are the ultimate loss ratios of AY 4 and AY 5 by least squares? {Example}
> Reported loss ratios are below, with 36 months taken as ultimate.
>
> | AY | 12 mo | 24 mo | 36 mo |
> | :--- | ---: | ---: | ---: |
> | 1 | 0.20 | 0.45 | 0.60 |
> | 2 | 0.30 | 0.50 | 0.62 |
> | 3 | 0.10 | 0.40 | 0.55 |
> | 4 | 0.25 | 0.48 | |
> | 5 | 0.18 | | |
>
> > [!answer]-
> > - AY 4 is developed first, from 24 months to ultimate, on AY 1 to 3: $\bar{x} = 0.45$, $\bar{y} = 0.59$, $\overline{x^2} = 0.204167$ and $\overline{xy} = 0.266667$.
> > - The slope is $b = 0.001167/0.001667 = 0.700$ and the intercept $a = 0.59 - 0.700 \times 0.45 = 0.275$.
> > - AY 4's ultimate loss ratio is $0.275 + 0.700 \times 0.48 = 0.611$.
> > - AY 5 is developed from 12 months to ultimate on AY 1 to 4, with AY 4's projected $0.611$ as its $y$: $\bar{x} = 0.2125$, $\bar{y} = 0.59525$, $\overline{x^2} = 0.050625$ and $\overline{xy} = 0.128438$.
> > - The slope is $b = 0.001947/0.005469 = 0.356$ and the intercept $a = 0.59525 - 0.356 \times 0.2125 = 0.5196$.
> > - AY 5's ultimate loss ratio is $0.5196 + 0.356 \times 0.18 = 0.584$.
> > - The credibility $Z = b/c$ is $0.700/1.311 = 0.53$ at 24 months and $0.356/2.801 = 0.13$ at 12 months, so the immature year rests mostly on the budgeted loss ratio $0.595$.

## A changed book

When the book has changed, through a new coverage or a tort reform, the prior years' $(x, y)$ pairs say little about the current year. EVPV and VHM are then estimated from selected means and standard deviations instead, and the estimate of ultimate from reported loss $x$ is

> $$L(x) = Z\,\frac{x}{d} + (1 - Z)\,E(Y)$$

- $d$ is the expected share of ultimate reported, so $x/d$ is the link ratio estimate.
- $E(Y)$ is the prior expected ultimate loss.

Assuming, as Brosius does, that the mean and standard deviation of $X/Y$ do not depend on $Y$, the two variances are $VHM = d^2\,\mathrm{Var}(Y)$ and $EVPV = \mathrm{Var}(X/Y)\left[\mathrm{Var}(Y) + E(Y)^2\right]$.

> [!example]- What is the ultimate after this tort reform by Brosius's credibility formula? {Example}
> A state introduces a tort reform. Before it, ultimate losses of $\$50$M were expected. Pricing expects a $30\%$ saving, so $E(Y) = \$35$M with $\sigma(Y) = \$7$M. Under the new regime, $60\%$ of ultimate is expected to be reported by year-end, with $\sigma(X/Y) = 10\%$. Reported losses at year-end are $\$18$M.
>
> > [!answer]-
> > - Least squares is unsuitable, because the reform changed the loss distribution that past years shared.
> > - $VHM = (0.6 \times 7)^2 = 17.64$.
> > - $EVPV = 0.10^2 \times (7^2 + 35^2) = 12.74$.
> > - $Z = 17.64/(17.64 + 12.74) = 0.581$.
> > - $L(18) = 0.581 \times (18/0.6) + 0.419 \times 35 = \$32.1$M.
> > - The estimate lies between the link ratio estimate ($\$30$M) and the budgeted loss ($\$35$M), just above BF's $18 + 0.4 \times 35 = \$32.0$M, because the implied slope $Z/d = 0.968$ is just under BF's 1.

> [!trap] Squaring the mean instead of averaging the squares
> $\overline{x^2}$ is the mean of the squared values, not the square of the mean. In the 27-month example $\overline{x^2} = 955$ while $\bar{x}^2 = 841$. Using 841 for $\overline{x^2}$ makes the slope's denominator zero.
