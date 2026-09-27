---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:44064f6287d265d5a9d2febb30994c218a896783d7a2c1af8117b45f828a6a6c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Least Squares Development Method.md
---

**Least squares development** estimates a later value $y$ of an accident year's losses from its current value $x$ with a straight line $L(x) = a + bx$, fitted by least squares to the $(x, y)$ pairs of earlier accident years. [[Loss Development Using Credibility (Brosius - 1993)|Brosius (1993)]] shows that this line is, apart from sampling error, the best linear approximation to the Bayesian estimate $E(Y \mid X = x)$. It is a credibility method for development that is useful when the data are thin and random fluctuations are severe.

> $$L(x) = a + bx$$

> $$b = \frac{\overline{xy} - \bar{x}\,\bar{y}}{\overline{x^2} - \bar{x}^2}$$

> $$a = \bar{y} - b\,\bar{x}$$

- Bars are averages over the prior years, so $\overline{xy}$ is the mean of the products and $\overline{x^2}$ the mean of the squares; these are the [[Ordinary Least Squares|ordinary least squares]] coefficients. $x$ and $y$ can be losses, claim counts or loss ratios.
- **Three familiar methods are special cases.** $b = 0$ is the budgeted loss method, $L(x) = k$, as in the [[Expected Loss Method|expected loss method]]. $a = 0$ is the link ratio method, $L(x) = cx$, as in the [[Chain Ladder Method|chain ladder]]. $b = 1$ is [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]], $L(x) = a + x$. Least squares lets the data choose $b$ rather than fixing it, and Brosius notes that BF's fixed $b = 1$ is a real limitation when losses develop downward.
- **It is a credibility weighting.** With $c = \bar{y}/\bar{x}$ as the link ratio and $Z = b/c$, the fit is $L(x) = Z\,(cx) + (1 - Z)\,\bar{y}$, a [[Credibility|credibility]] blend of the link ratio estimate and the budgeted loss. Brosius's Development Formula 2 gives the theoretical weight $Z = VHM/(VHM + EVPV)$. Here the [[Expected Value of Process Variance|EVPV]], $E[\mathrm{Var}(X \mid Y)]$, measures noise in the reporting process, and the [[Variance of Hypothetical Means|VHM]], $\mathrm{Var}(E[X \mid Y])$, measures noise in loss occurrence. Formula 1 is the distribution-free form, $L(x) = (x - E X)\,\mathrm{Cov}(X,Y)/\mathrm{Var}(X) + E Y$ (see [[Bühlmann Credibility]]).
- **Cautions.** If $a < 0$, the estimate is negative for small $x$, so substitute the link ratio method. If $b < 0$, the estimate falls as $x$ rises, so substitute the budgeted loss method. The method assumes every year shares one pair of loss and reporting distributions, so it suits random fluctuation rather than systematic change. Put years on a constant-dollar basis for [[Inflation|inflation]], and divide by premium or another exposure when the book grows, before fitting. When the book has changed (a new coverage or tort reform), estimate EVPV and VHM from selected means and standard deviations instead.
- **In a triangle**, Brosius develops the most mature years first. He then uses their projected ultimates as the $y$ values for fitting successively less mature years, so $Z$ rises and $a$ falls as the years mature.

> [!example]- Fitting the Line and Reading It as Credibility {Example}
> Incurred losses (\$000s) for five accident years at $15$ months ($x$) and $27$ months ($y$):
>
> | AY | $x$ | $y$ |
> |---|---|---|
> | 1 | $20$ | $30$ |
> | 2 | $35$ | $44$ |
> | 3 | $15$ | $26$ |
> | 4 | $45$ | $49$ |
> | 5 | $30$ | $42$ |
>
> The current year has $x = 40$. Estimate its $27$-month value by least squares, and compare the link ratio, budgeted loss and BF estimates.
>
> > [!answer]-
> > The averages are $\bar{x} = 29$, $\bar{y} = 38.2$ and $\overline{x^2} = 955$, and $\overline{xy} = 5{,}995/5 = 1{,}199$:
> >
> > $$
> > \begin{align*}
> > b &= \frac{1{,}199 - 29(38.2)}{955 - 29^2} \\
> > &= \frac{91.2}{114} \\
> > &= 0.8 \\
> > a &= 38.2 - 0.8(29) \\
> > &= 15.0 \\
> > L(40) &= 15.0 + 0.8(40) \\
> > &= 47.0
> > \end{align*}
> > $$
> >
> > **As credibility.** The link ratio is $c = 38.2/29 = 1.3172$, so $Z = 0.8/1.3172 = 0.607$:
> >
> > $$
> > \begin{align*}
> > L(40) &= 0.607(1.3172 \times 40) + 0.393(38.2) \\
> > &= 0.607(52.69) + 0.393(38.2) \\
> > &= 47.0
> > \end{align*}
> > $$
> >
> > **The alternatives:**
> >
> > | Method | Estimate |
> > |---|---|
> > | Budgeted loss, $\bar{y}$ | $38.2$ |
> > | Least squares | $47.0$ |
> > | BF, $40 + (38.2 - 29)$ | $49.2$ |
> > | Link ratio, $c = \bar{y}/\bar{x}$ | $52.7$ |
> > | Link ratio, average of $y/x$ | $55.8$ |
> >
> > The five link ratios run from $1.089$ to $1.733$, too noisy to trust fully. Least squares gives $61\%$ weight to the link ratio estimate and $39\%$ to the budgeted loss. A slope below $1$ says a high $15$-month value partly reflects noise and will not all carry through to $27$ months.

> [!example]- Working Back Through a Loss Ratio Triangle {Example}
> Reported loss ratios, with $36$ months taken as ultimate:
>
> | AY | $12$ mo | $24$ mo | $36$ mo |
> |---|---|---|---|
> | 1 | $0.20$ | $0.45$ | $0.60$ |
> | 2 | $0.30$ | $0.50$ | $0.62$ |
> | 3 | $0.10$ | $0.40$ | $0.55$ |
> | 4 | $0.25$ | $0.48$ | |
> | 5 | $0.18$ | | |
>
> Estimate the ultimate loss ratios for AY 4 and AY 5 by least squares, developing the more mature year first.
>
> > [!answer]-
> > **AY 4 (24 months to ultimate), fitted on AY 1–3.** Here $\bar{x} = 0.45$, $\bar{y} = 0.59$, $\overline{x^2} = 0.204167$ and $\overline{xy} = 0.266667$:
> >
> > $$
> > \begin{align*}
> > b &= \frac{0.266667 - 0.45(0.59)}{0.204167 - 0.45^2} \\
> > &= \frac{0.001167}{0.001667} \\
> > &= 0.700 \\
> > a &= 0.59 - 0.700(0.45) \\
> > &= 0.275 \\
> > y_4 &= 0.275 + 0.700(0.48) \\
> > &= 0.611
> > \end{align*}
> > $$
> >
> > **AY 5 (12 months to ultimate), fitted on AY 1–4.** AY 4's projected $0.611$ joins the data. Now $\bar{x} = 0.2125$, $\bar{y} = 0.59525$, $\overline{x^2} = 0.050625$ and $\overline{xy} = 0.128438$:
> >
> > $$
> > \begin{align*}
> > b &= \frac{0.128438 - 0.2125(0.59525)}{0.050625 - 0.2125^2} \\
> > &= \frac{0.001947}{0.005469} \\
> > &= 0.356 \\
> > a &= 0.59525 - 0.356(0.2125) \\
> > &= 0.5196 \\
> > y_5 &= 0.5196 + 0.356(0.18) \\
> > &= 0.584
> > \end{align*}
> > $$
> >
> > The credibility of the link ratio estimate is $Z = b/c$: $0.700/1.311 = 0.53$ at $24$ months and $0.356/2.801 = 0.13$ at $12$ months. The immature year's ultimate rests mostly on the budgeted loss ratio $\bar{y} = 0.595$. Multiplying each ultimate loss ratio by its earned premium gives the ultimate losses.

> [!example]- Bayesian Credibility After a Change in Coverage {Example}
> A state introduces a tort reform. Before it, ultimate losses of $\$50$M were expected; pricing expects a $30\%$ saving, so $E(Y) = \$35$M with $\sigma(Y) = \$7$M. Under the new regime, $60\%$ of ultimate is expected to be reported by year-end, with $\sigma(X/Y) = 10\%$. Reported losses at year-end are $\$18$M.
>
> Why is least squares unsuitable here? Estimate the ultimate by Brosius's credibility formula.
>
> > [!answer]-
> > Least squares and the link ratio method both assume that past years share the current year's loss and reporting distributions. The reform broke that, so the prior years' $(x, y)$ pairs say little about this one. Instead, estimate the two variances directly, assuming (as Brosius does) that the mean and standard deviation of $X/Y$ do not depend on $Y$:
> >
> > $$
> > \begin{align*}
> > VHM &= \mathrm{Var}(0.6\,Y) \\
> > &= (0.6 \times 7)^2 \\
> > &= 17.64 \\
> > EVPV &= E\left[(0.10)^2\,Y^2\right] \\
> > &= 0.01\,(7^2 + 35^2) \\
> > &= 12.74 \\
> > Z &= \frac{17.64}{17.64 + 12.74} \\
> > &= 0.581 \\
> > L(18) &= 0.581\left(\frac{18}{0.6}\right) + 0.419(35) \\
> > &= 32.1
> > \end{align*}
> > $$
> >
> > The estimate of $\$32.1$M lies between the link ratio estimate ($\$30$M) and the budgeted loss ($\$35$M). It sits just above BF, $18 + 0.4 \times 35 = \$32.0$M: the implied slope $Z/d = 0.968$ is just under BF's $1$, so slightly less weight goes to the low reported amount.
