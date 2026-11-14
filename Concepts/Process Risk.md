---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d821b0d00f298fa887c789c446145e2b4920649bbf84ee6793acd74b5387989d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Process Risk.md
---

**Process Risk** is the variability of actual outcomes around their expected value that would remain even if the model and its parameters were known exactly. It comes from the randomness of the insurance loss process itself, and together with [[Parameter Risk|parameter risk]] it makes up the [[Prediction Error|prediction error]].

In [[LDF Curve-Fitting and Stochastic Reserving (Clark - 2003)|Clark (2003)]], the process variance of a reserve $R$ is its expected value times a constant variance-to-mean ratio $\sigma^2$:

> $$\mathrm{Var}_{\text{process}}(R) = \sigma^2 \sum \mu_{AY;x,y}$$

- $\mu_{AY;x,y}$ is the expected incremental loss of an accident year $AY$ between ages $x$ and $y$, summed over the accident years and periods in $R$.

The expected increments sum to the reserve, so the process variance is $\sigma^2 R$ and the process standard deviation is $\sqrt{\sigma^2 R}$. The same holds for prospective losses: their process variance is $\sigma^2$ times the expected losses.

## Estimating the variance-to-mean ratio

Clark assumes each increment is [[Over-Dispersed Poisson Model|over-dispersed Poisson]], a Poisson count times $\sigma^2$, so an increment $c$ with mean $\mu$ has $E[c] = \mu$ and $\mathrm{Var}(c) = \sigma^2\mu$. From the $n$ increments in the data, the ratio is estimated as

> $$\sigma^2 = \frac{1}{n-p}\sum_{AY,t}\frac{(c_{AY,t} - \hat\mu_{AY,t})^2}{\hat\mu_{AY,t}}$$

- $c_{AY,t}$ is the actual incremental loss of accident year $AY$ in development period $t$.
- $\hat\mu_{AY,t}$ is its fitted expected value.
- $p$ is the number of fitted parameters: 3 for Clark's [[Cape Cod Method|Cape Cod]] method, or one ultimate per accident year plus $\omega$ and $\theta$ for his LDF method.

The formula has the form of a chi-square statistic. The same $\sigma^2$ scales the normalized residuals used to check the fit:

> $$r_{AY,t} = \frac{c_{AY,t} - \hat\mu_{AY,t}}{\sqrt{\sigma^2\,\hat\mu_{AY,t}}}$$

The model treats $\sigma^2$ as fixed and known, which ignores the variance of the variance.

## Process risk across periods

The increments are independent in the model, so the process variance of any group of periods is $\sigma^2$ times its expected total. The process coefficient of variation of a reserve, $\sqrt{\sigma^2/R}$, therefore shrinks as the reserve grows, and process risk diversifies with volume. Parameter variance, $(\partial R)'\,\Sigma\,(\partial R)$, comes from parameters shared by every year, and it does not diversify this way: a larger book does not reduce it.

## Total variance

Clark adds process and parameter variance, treating them as independent, so the total variance of the reserve is

> $$\mathrm{Var}_{\text{total}}(R) = \mathrm{Var}_{\text{process}}(R) + \mathrm{Var}_{\text{parameter}}(R)$$

In Clark's example, parameter risk dominates. On the LDF method's reserve of $28{,}987{,}633$, the process standard deviation is $1{,}372{,}966$ and the parameter standard deviation is $4{,}688{,}826$. He notes that the Cape Cod method may carry somewhat more process variance than the LDF method, but much less estimation error.

The same split appears in other models. In Mack's standard error the $1/\hat C_{i,k}$ term is process variance ([[Prediction Error]]), and the ODP bootstrap adds process noise to every future cell after resampling for parameter risk ([[Stochastic Reserving]]).

Neither process nor parameter variance measures [[Model Risk|model risk]]. Changes in the mix of business or in how claims are settled lie outside a model's assumptions, and Clark calls their effect model variance.

> [!example]- What are the process and total standard deviations of this Cape Cod reserve, in total and by accident year? {Example}
> A Clark Cape Cod fit with $\sigma^2 = 50$ gives these reserves (\$000s). The parameter standard deviation of the total reserve is $900$.
>
> | Accident year | Reserve |
> | :--- | ---: |
> | 1 | 1,200 |
> | 2 | 2,500 |
> | 3 | 4,300 |
> | Total | 8,000 |
>
> > [!answer]-
> > - Each year's process standard deviation is $\sqrt{50 \times R}$: $244.9$, $353.6$ and $463.7$, process CVs of $20.4\%$, $14.1\%$ and $10.8\%$.
> > - For the total, the process variances add: $50 \times 8{,}000 = 400{,}000$, so the process standard deviation is $632.5$.
> > - The total's process CV is $632.5/8{,}000 = 7.9\%$, below every single year's.
> > - The total variance is $400{,}000 + 900^2 = 1{,}210{,}000$, so the total standard deviation is $1{,}100.0$, a CV of $13.75\%$.
> > - Parameter variance is $810{,}000/1{,}210{,}000 = 67\%$ of the total variance, the pattern Clark reports for a whole reserve.

> [!trap] Adding process standard deviations
> Process variances add across years, but process standard deviations do not. In the example the three years' standard deviations sum to $1{,}062.2$, while the total's is $632.5$. Add the variances, then take the square root.
