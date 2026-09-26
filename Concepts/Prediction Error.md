---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5e384f8a8bd9184bb8ad30566cf97084fe021b7b28ac3a918a360231cc405176
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Prediction Error.md
---

**Prediction error** of a reserve is the root mean squared error of the estimate $\hat R$ as a forecast of the unpaid amount $R$ that will actually be paid. It measures how far the outcome is likely to land from the estimate, combining the randomness of future payments (process risk) with the error in the estimated parameters ([[Parameter Risk|parameter risk]]).

> $$\mathrm{PE}(\hat R) = \sqrt{E\big[(R - \hat R)^2\big]}$$

> $$E\big[(R - \hat R)^2\big] = \underbrace{\mathrm{Var}(R)}_{\text{process}} + \underbrace{E\big[(\hat R - E[R])^2\big]}_{\text{parameter}}$$

- The split holds because the future payments are independent of the data that produced $\hat R$. Mack calls $\mathrm{PE}$ the **standard error** of the reserve, and bootstrap output labels it the same way. Dividing it by the mean gives the [[Coefficient of Variation|coefficient of variation]].
- **Mack (1993, 1994)** gives it for the [[Chain Ladder Method|chain ladder]] without assuming any distribution. For accident year $i$ of $I$, with cumulative losses $C_{i,k}$ and volume-weighted factors $\hat f_k$:

> $$\widehat{\mathrm{mse}}(\hat R_i) = \hat C_{i,I}^{2} \sum_{k=I+1-i}^{I-1} \frac{\hat\sigma_k^{2}}{\hat f_k^{2}}\; w_{i,k}$$

> $$w_{i,k} = \frac{1}{\hat C_{i,k}} + \frac{1}{\sum_{j=1}^{I-k} C_{j,k}}$$

> $$\hat\sigma_k^{2} = \frac{1}{I-k-1}\sum_{j=1}^{I-k} C_{j,k}\left(\frac{C_{j,k+1}}{C_{j,k}} - \hat f_k\right)^{2}$$

- Here $\hat C_{i,k}$ is the actual diagonal value at $k = I+1-i$ and the projected value beyond it. In $w_{i,k}$, the $1/\hat C_{i,k}$ term is **process** variance and the $1/\sum C_{j,k}$ term is **estimation** (parameter) variance. The last $\hat\sigma_{I-1}^2$ cannot be estimated, so Mack extrapolates it as $\min\!\big(\hat\sigma_{I-2}^4/\hat\sigma_{I-3}^2,\ \hat\sigma_{I-3}^2,\ \hat\sigma_{I-2}^2\big)$.
- **The formula rests on three assumptions**: expected development proportional to $C_{i,k}$ with factor $f_k$; independent accident years; and $\mathrm{Var}(C_{i,k+1} \mid C_{i,k}) = C_{i,k}\,\sigma_k^2$. Testing them is part of [[Data Diagnostic Analysis|data diagnostics]].
- **The total's error is not the root sum of squares.** Every year is projected with the same $\hat f_k$, so their parameter errors are positively correlated, and Mack adds a covariance term for each pair of years.
- Other models get the same two parts by different routes. Clark uses $\sigma^2 R$ for process variance and the information matrix for parameter variance; the ODP bootstrap gets both by simulation (see [[Stochastic Reserving]]). A mean and a prediction error are turned into percentiles in [[Unpaid Claim Distribution]].

> [!example]- Mack Standard Error for One Accident Year {Example}
> Cumulative paid losses (\$000s):
>
> | AY | 12 | 24 | 36 | 48 |
> |---|---|---|---|---|
> | 1 | $1{,}000$ | $2{,}000$ | $2{,}360$ | $2{,}478$ |
> | 2 | $1{,}200$ | $2{,}300$ | $2{,}800$ | |
> | 3 | $1{,}100$ | $2{,}300$ | | |
> | 4 | $1{,}300$ | | | |
>
> Compute the chain ladder reserve for AY 3 and its Mack prediction error.
>
> > [!answer]-
> > **Factors:** $\hat f_1 = 6{,}600/3{,}300 = 2.000$, $\hat f_2 = 5{,}160/4{,}300 = 1.200$ and $\hat f_3 = 2{,}478/2{,}360 = 1.050$.
> >
> > **Variance parameters.** The individual ratios are $2.000, 1.917, 2.091$ and then $1.180, 1.217$:
> >
> > $$
> > \begin{align*}
> > \hat\sigma_1^2 &= \tfrac{1}{2}\left[0 + 8.333 + 9.091\right] \\
> > &= 8.712 \\
> > \hat\sigma_2^2 &= 0.800 + 0.696 \\
> > &= 1.496 \\
> > \hat\sigma_3^2 &= \min(1.496^2/8.712,\ 8.712,\ 1.496) \\
> > &= 0.257
> > \end{align*}
> > $$
> >
> > **Projection:** $\hat C_{3,3} = 2{,}300 \times 1.2 = 2{,}760$ and $\hat C_{3,4} = 2{,}760 \times 1.05 = 2{,}898$, so $\hat R_3 = 598$.
> >
> > **Mean squared error**, where $\hat\sigma_2^2/\hat f_2^2 = 1.0386$ and $\hat\sigma_3^2/\hat f_3^2 = 0.2329$:
> >
> > $$
> > \begin{align*}
> > k = 2: &\quad 1.0386\left(\tfrac{1}{2{,}300} + \tfrac{1}{4{,}300}\right) \\
> > &= 0.0006931 \\
> > k = 3: &\quad 0.2329\left(\tfrac{1}{2{,}760} + \tfrac{1}{2{,}360}\right) \\
> > &= 0.0001831 \\
> > \widehat{\mathrm{mse}} &= 2{,}898^2 \times 0.0008762 \\
> > &= 7{,}359 \\
> > \mathrm{PE} &= \sqrt{7{,}359} \\
> > &= 85.8
> > \end{align*}
> > $$
> >
> > The reserve is $598 \pm 86$ thousand, a CoV of $14.3\%$. Of the $7{,}359$, process variance is $4{,}501$ and parameter variance $2{,}857$. So almost $40\%$ of the uncertainty comes from having only two or three years with which to estimate each factor.

> [!example]- Prediction Error of the Total Reserve {Example}
> For the same triangle the reserves and Mack standard errors by year are: AY 2 $140 \pm 39.65$, AY 3 $598 \pm 85.78$, AY 4 $1{,}976 \pm 183.86$. Mack's covariance terms sum to $10{,}043$.
>
> Find the prediction error of the total reserve of $2{,}714$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \sum_i \widehat{\mathrm{mse}}_i &= 39.65^2 + 85.78^2 + 183.86^2 \\
> > &= 42{,}735 \\
> > \widehat{\mathrm{mse}}(\hat R) &= 42{,}735 + 10{,}043 \\
> > &= 52{,}777 \\
> > \mathrm{PE}(\hat R) &= 229.7
> > \end{align*}
> > $$
> >
> > A CoV of $8.5\%$. Treating the years as independent would give $\sqrt{42{,}735} = 206.7$ and understate the error by $10\%$. Adding the standard errors would give $309.3$, as if the years were perfectly correlated. The truth lies between because only the parameter error is shared across years; the process error is not.
> >
> > The pattern by year is also a useful check. The standard error rises toward the recent years ($39.6 \to 183.9$) while the CoV falls ($28\% \to 9\%$), which is the shape [[Reasonableness Testing|reasonableness tests]] of reserve distributions expect.
