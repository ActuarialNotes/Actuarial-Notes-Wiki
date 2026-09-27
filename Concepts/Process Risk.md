---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:19caec23c215f6e37e96275fdb471fc808279c6208a6f7c1f09ece046a696a89
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Process Risk.md
---

**Process risk** is the variability of actual outcomes around their expected value that would remain even if the model and its parameters were known exactly — the "random" part of a reserve's variability. Together with [[Parameter Risk|parameter risk]] it makes up the [[Prediction Error|prediction error]]. In [[LDF Curve-Fitting and Stochastic Reserving (Clark - 2003)|Clark (2003)]], the process variance of a reserve is its expected value times a constant variance-to-mean ratio $\sigma^2$.

> $$\mathrm{Var}_{\text{process}}(R) = \sigma^2 \sum \mu_{AY;x,y}$$

> $$\sigma^2 = \frac{1}{n-p}\sum_{AY,t}\frac{(c_{AY,t} - \hat\mu_{AY,t})^2}{\hat\mu_{AY,t}}$$

- $R$ is the reserve for a period or group of periods, $\mu_{AY;x,y}$ the expected incremental loss of each accident year between ages $x$ and $y$, and $c$ the actual increments. There are $n$ increments in the data and $p$ fitted parameters: $3$ for Clark's [[Cape Cod Method|Cape Cod]] method, or one ultimate per accident year plus $\omega$ and $\theta$ for his LDF method. The formula for $\sigma^2$ has the form of a chi-square statistic.
- **Where the ratio comes from.** Clark assumes each increment is [[Over-Dispersed Poisson Model|over-dispersed Poisson]]: a Poisson count times $\sigma^2$, so $E[c] = \mu$ and $\mathrm{Var}(c) = \sigma^2\mu$. The same $\sigma^2$ scales the normalized residuals $(c - \hat\mu)/\sqrt{\sigma^2\hat\mu}$ used to check the fit. The model treats $\sigma^2$ as fixed and known, which ignores the variance of the variance.
- **It adds across periods; parameter risk does not.** Increments are independent in the model, so the process variance of any group of periods is $\sigma^2$ times its expected total. The process CV of a reserve, $\sqrt{\sigma^2/R}$, therefore shrinks as the reserve grows. Parameter variance, $(\partial R)'\,\Sigma\,(\partial R)$, comes from parameters shared by every year, and does not diversify this way.
- **Total variance.** Clark adds the two, treating them as independent. In his example, parameter risk dominates: on the LDF method's reserve of $28{,}987{,}633$, the process standard deviation is $1{,}372{,}966$ against a parameter standard deviation of $4{,}688{,}826$. He notes that the Cape Cod method may carry somewhat more process variance than the LDF method but much less estimation error. The same split appears elsewhere: in Mack's standard error the $1/\hat C_{i,k}$ term is process variance (see [[Prediction Error]]), and the ODP bootstrap adds process noise to every future cell after resampling for parameter risk (see [[Stochastic Reserving]]).
- **Not model risk.** Changes in mix of business or in how claims are settled lie outside a model's assumptions. Clark calls these "model variance" ([[Model Risk|model risk]]); neither process nor parameter variance measures them.

> [!example]- Process Variance by Year and in Total {Example}
> A Clark Cape Cod fit gives reserves of $1{,}200$, $2{,}500$ and $4{,}300$ for three accident years (\$000s), with $\sigma^2 = 50$. The parameter standard deviation of the total reserve is $900$.
>
> Find the process standard deviation and CV for each year and for the total, and the total standard deviation.
>
> > [!answer]-
> > Each year's process variance is $\sigma^2$ times its reserve:
> >
> > | AY | Reserve | Process SD | Process CV |
> > |---|---|---|---|
> > | 1 | $1{,}200$ | $\sqrt{50 \times 1{,}200} = 244.9$ | $20.4\%$ |
> > | 2 | $2{,}500$ | $\sqrt{50 \times 2{,}500} = 353.6$ | $14.1\%$ |
> > | 3 | $4{,}300$ | $\sqrt{50 \times 4{,}300} = 463.7$ | $10.8\%$ |
> >
> > For the total, the process variances add:
> >
> > $$
> > \begin{align*}
> > \mathrm{Var}_{\text{process}} &= 50 \times 8{,}000 \\
> > &= 400{,}000 \\
> > \mathrm{SD}_{\text{process}} &= 632.5 \\
> > \mathrm{SD}_{\text{total}} &= \sqrt{400{,}000 + 900^2} \\
> > &= 1{,}100.0
> > \end{align*}
> > $$
> >
> > The total's process CV is $632.5/8{,}000 = 7.9\%$, below every single year's. Its process standard deviation is also well below the sum of the three, $1{,}062.2$, because independent increments partly offset one another. The total CV is $13.75\%$, and parameter variance is $810{,}000/1{,}210{,}000 = 67\%$ of the total variance. That is the pattern Clark reports: at the level of the whole reserve, parameter risk is the larger part.

> [!example]- Testing Next Year's Development Against Its Process Range {Example}
> A loglogistic growth curve $G(x) = x^{1.5}/(x^{1.5} + 40^{1.5})$ is fitted by Clark's LDF method, with $\sigma^2 = 30$. At year-end, two accident years are $24$ and $36$ months old, with estimated ultimates of $5{,}000$ and $6{,}000$.
>
> Forecast the development over the next calendar year and its process standard deviation. One year later, actual development is $1{,}400$. Is that surprising?
>
> > [!answer]-
> > The average ages move from $18$ to $30$ and from $30$ to $42$. The curve gives $G(18) = 0.2319$, $G(30) = 0.3938$ and $G(42) = 0.5183$:
> >
> > $$
> > \begin{align*}
> > \mu_1 &= 5{,}000 \times (0.3938 - 0.2319) \\
> > &= 809.5 \\
> > \mu_2 &= 6{,}000 \times (0.5183 - 0.3938) \\
> > &= 747.0 \\
> > \mu &= 1{,}556.5 \\
> > \mathrm{SD}_{\text{process}} &= \sqrt{30 \times 1{,}556.5} \\
> > &= 216.1
> > \end{align*}
> > $$
> >
> > The process CV is $13.9\%$. The actual development is $1{,}400$:
> >
> > $$
> > \begin{align*}
> > r &= \frac{1{,}400 - 1{,}556.5}{216.1} \\
> > &= -0.72
> > \end{align*}
> > $$
> >
> > That is within one process standard deviation, so it is not surprising. Adding parameter variance would widen the range further. This is why Clark forecasts calendar year development: unlike the ultimate reserve, it can be checked against actual emergence within a year.
