---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9d379eaeefc8cbbcddab0e2c8d148090e33dbab8a36c87bb67782338ac9fff3d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mack Chain Ladder Model.md
---

**Mack Chain Ladder Model** is the distribution-free stochastic model that [[Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994)|Mack (1994)]] shows the [[Chain Ladder Method|chain ladder method]] implicitly assumes, together with the standard error of chain ladder reserves that follows from it. For cumulative claims $C_{ik}$ of accident year $i$ at development year $k$ in an $I \times I$ triangle, with accident years independent:

> $$E(C_{i,k+1} \mid C_{i1}, \dots, C_{ik}) = C_{ik}\,f_k$$
>
> $$\text{Var}(C_{i,k+1} \mid C_{i1}, \dots, C_{ik}) = C_{ik}\,\alpha_k^2$$

- **Where the three assumptions come from.** The chain ladder uses one factor per age for every accident year and projects from the latest amount alone (the mean assumption); it ignores any dependence between accident years (independence); and it weights the individual factors by $C_{jk}$, which gives the [[Minimum Variance|minimum-variance]] unbiased average only if the variance is proportional to $C_{jk}$. None holds for every triangle — see [[Chain Ladder Assumptions]], [[Calendar Year Effect]] and [[Development Factor Correlation Test]].
- **Estimators.** $\hat f_k = \sum_j C_{j,k+1} / \sum_j C_{jk}$ is [[Unbiasedness|unbiased]]. For $k \le I-2$, $\alpha_k^2$ is estimated without bias by the first formula below. The last one, $\hat\alpha_{I-1}^2$, is $0$ if development is finished; otherwise Mack extrapolates it, for instance by the second formula:

> $$\hat\alpha_k^2 = \frac{1}{I-k-1}\sum_{j=1}^{I-k} C_{jk}\left(\frac{C_{j,k+1}}{C_{jk}} - \hat f_k\right)^2$$
>
> $$\hat\alpha_{I-1}^2 = \min\left(\frac{\hat\alpha_{I-2}^4}{\hat\alpha_{I-3}^2},\ \hat\alpha_{I-3}^2,\ \hat\alpha_{I-2}^2\right)$$

- **Standard error of one year's reserve.** The [[Mean Square Error|mean squared error]] of $\hat R_i = \hat C_{iI} - C_{i,I+1-i}$ is taken conditional on the observed triangle. Its square root, estimated below, is the same for the reserve as for the ultimate. In the bracket, the $1/\hat C_{ik}$ term estimates the future random variation ([[Process Risk|process]]) and the $1/\sum C_{jk}$ term the error in the $\hat f_k$ ([[Parameter Risk|estimation]]). $\hat C_{ik}$ is the triangle completed by the chain ladder, with $\hat C_{i,I+1-i} = C_{i,I+1-i}$.

> $$
> \begin{aligned}
> \text{s.e.}(\hat R_i)^2 &= \hat C_{iI}^2 \sum_{k=I+1-i}^{I-1} \frac{\hat\alpha_k^2}{\hat f_k^2} \\
> &\quad \times \left(\frac{1}{\hat C_{ik}} + \frac{1}{\sum_{j=1}^{I-k} C_{jk}}\right)
> \end{aligned}
> $$

- **Standard error of the total.** The $\hat R_i$ are positively correlated because they share the $\hat f_k$, so their squared standard errors do not simply add:

> $$
> \begin{aligned}
> \text{s.e.}(\hat R)^2 &= \sum_{i=2}^{I}\Bigg\{\text{s.e.}(\hat R_i)^2 + \hat C_{iI}\sum_{j=i+1}^{I}\hat C_{jI} \\
> &\qquad \times \sum_{k=I+1-i}^{I-1}\frac{2\hat\alpha_k^2/\hat f_k^2}{\sum_{n=1}^{I-k} C_{nk}}\Bigg\}
> \end{aligned}
> $$

- **Confidence limits.** When the volume is large, a [[Normal Distribution|Normal]] approximation gives $\hat R_i \pm z\,\text{s.e.}$. When $\text{s.e.}(\hat R_i)$ exceeds about $50\%$ of $\hat R_i$, Mack recommends a [[Lognormal Distribution|Lognormal]] with the same mean and variance. That fit has $\sigma_i^2 = \ln\!\big(1 + \text{s.e.}^2/\hat R_i^2\big)$, and its $z$-[[Percentile|percentile]] is $\hat R_i\exp(z\sigma_i - \sigma_i^2/2)$. Adding $C_{i,I+1-i}$ turns reserve limits into limits for the ultimate.
- **Allocating a total percentile.** To give the total a chosen percentile, Mack sets that percentile of $\hat R$ and finds the one $z$ at which the accident years' Lognormal percentiles add up to it. Every year then sits at the same confidence level.

> [!example]- Estimating the Factors and Their Variances From a Paid Triangle {Example}
> Cumulative paid claims (\$000):
>
> | AY | $k=1$ | $k=2$ | $k=3$ | $k=4$ |
> |---|---|---|---|---|
> | $1$ | $1{,}000$ | $2{,}500$ | $3{,}000$ | $3{,}150$ |
> | $2$ | $1{,}500$ | $2{,}400$ | $3{,}120$ | |
> | $3$ | $800$ | $2{,}400$ | | |
> | $4$ | $1{,}200$ | | | |
>
> Development is not believed finished at $k = 4$, but no tail is projected. Estimate $\hat f_k$ and $\hat\alpha_k^2$ for $k = 1, 2, 3$, and the chain ladder reserves.
>
> > [!answer]-
> > The individual factors are $2.5, 1.6, 3.0$ for $k=1$; $1.2, 1.3$ for $k=2$; and $1.05$ for $k=3$.
> >
> > $$
> > \begin{align*}
> > \hat f_1 &= \frac{2{,}500 + 2{,}400 + 2{,}400}{1{,}000 + 1{,}500 + 800} \\
> > &= \frac{7{,}300}{3{,}300} \\
> > &= 2.21212 \\
> > \hat f_2 &= \frac{3{,}000 + 3{,}120}{2{,}500 + 2{,}400} \\
> > &= 1.24898 \\
> > \hat f_3 &= \frac{3{,}150}{3{,}000} \\
> > &= 1.05000
> > \end{align*}
> > $$
> >
> > $\hat\alpha_1^2$ has $I - k - 1 = 2$ degrees of freedom and $\hat\alpha_2^2$ has $1$:
> >
> > $$
> > \begin{align*}
> > \hat\alpha_1^2 &= \tfrac{1}{2}\big[1{,}000(0.28788)^2 + 1{,}500(0.61212)^2 \\
> > &\qquad + 800(0.78788)^2\big] \\
> > &= \tfrac{1}{2}(82.87 + 562.04 + 496.60) \\
> > &= 570.76 \\
> > \hat\alpha_2^2 &= 2{,}500(0.04898)^2 + 2{,}400(0.05102)^2 \\
> > &= 5.997 + 6.247 \\
> > &= 12.245
> > \end{align*}
> > $$
> >
> > $\hat\alpha_3^2$ cannot be estimated from one factor, so it is extrapolated:
> >
> > $$
> > \begin{align*}
> > \hat\alpha_3^2 &= \min\left(\frac{12.245^2}{570.76},\ 570.76,\ 12.245\right) \\
> > &= 0.2627
> > \end{align*}
> > $$
> >
> > Completing the triangle gives ultimates $3{,}276.0$ for AY 2, $3{,}147.4$ for AY 3 and $3{,}481.2$ for AY 4. The reserves are $\hat R_2 = 156.0$, $\hat R_3 = 747.4$ and $\hat R_4 = 2{,}281.2$, a total of $3{,}184.7$.
> >
> > $\hat\alpha_k^2$ falls fast with $k$ because the early factors scatter widely ($1.6$ to $3.0$) around $\hat f_1$ and the later ones barely at all.

> [!example]- Standard Error of One Year and of the Total {Example}
> Continue the triangle above. Compute $\text{s.e.}(\hat R_4)$, split it into its process and estimation parts, and compute $\text{s.e.}(\hat R)$ for all years combined. Take $\text{s.e.}(\hat R_2)^2 = 1{,}672$ and $\text{s.e.}(\hat R_3)^2 = 49{,}844$ as given.
>
> > [!answer]-
> > AY 4 is at $k = 1$, so the sum runs over $k = 1, 2, 3$, with $\hat C_{41} = 1{,}200$, $\hat C_{42} = 2{,}654.5$ and $\hat C_{43} = 3{,}315.5$:
> >
> > | $k$ | $\hat\alpha_k^2/\hat f_k^2$ | $1/\hat C_{4k}$ | $1/\sum_j C_{jk}$ | Term |
> > |---|---|---|---|---|
> > | $1$ | $116.64$ | $1/1{,}200$ | $1/3{,}300$ | $0.132541$ |
> > | $2$ | $7.850$ | $1/2{,}654.5$ | $1/4{,}900$ | $0.004559$ |
> > | $3$ | $0.2383$ | $1/3{,}315.5$ | $1/3{,}000$ | $0.000151$ |
> > | Sum | | | | $0.137252$ |
> >
> > $$
> > \begin{align*}
> > \text{s.e.}(\hat R_4)^2 &= 3{,}481.25^2 \times 0.137252 \\
> > &\approx 1{,}663{,}360 \\
> > \text{s.e.}(\hat R_4) &= 1{,}289.7
> > \end{align*}
> > $$
> >
> > That is $56.5\%$ of $\hat R_4$. Summing only the $1/\hat C_{4k}$ parts gives the process standard deviation, $1{,}102$; the $1/\sum C_{jk}$ parts give the estimation standard deviation, $670$ ($1{,}102^2 + 670^2 \approx 1{,}289.7^2$). Almost all of it arises at $k = 1$, the widely scattered first factor applied to one year's $1{,}200$.
> >
> > **The total.** The cross terms use $2\hat\alpha_k^2/\hat f_k^2 \div \sum_n C_{nk}$, which is $0.0032039$ for $k=2$ and $0.00015885$ for $k=3$:
> >
> > $$
> > \begin{align*}
> > i = 2&: \ 3{,}276.0 \times 6{,}628.68 \times 0.00015885 \\
> > &= 3{,}450 \\
> > i = 3&: \ 3{,}147.43 \times 3{,}481.25 \times 0.0033628 \\
> > &= 36{,}846
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{s.e.}(\hat R)^2 &= 1{,}672 + 49{,}844 + 1{,}663{,}360 \\
> > &\quad + 3{,}450 + 36{,}846 \\
> > &= 1{,}714{,}876 + 40{,}296 \\
> > &= 1{,}755{,}172 \\
> > \text{s.e.}(\hat R) &= 1{,}324.8
> > \end{align*}
> > $$
> >
> > That is $41.6\%$ of the $3{,}184.7$ total. Treating the years as independent would have given $\sqrt{1{,}714{,}876} = 1{,}309.5$; the shared factors add the covariance.

> [!example]- Normal Versus Lognormal Confidence Limits {Example}
> From the example above, $\hat R_4 = 2{,}281.2$ with $\text{s.e.} = 1{,}289.7$ and $C_{41} = 1{,}200$. Find the 10th and 90th percentiles of $R_4$ under a Normal and under a Lognormal approximation ($z_{0.90} = 1.28$). Then give the lognormal interval for the ultimate.
>
> > [!answer]-
> > **Normal:**
> >
> > $$
> > \begin{align*}
> > 2{,}281.2 \pm 1.28 \times 1{,}289.7 &= 2{,}281.2 \pm 1{,}650.8 \\
> > &= (630.4,\ 3{,}932.0)
> > \end{align*}
> > $$
> >
> > **Lognormal:** the coefficient of variation is $1{,}289.7/2{,}281.2 = 0.5654$.
> >
> > $$
> > \begin{align*}
> > \sigma^2 &= \ln(1 + 0.5654^2) \\
> > &= 0.2774 \\
> > \sigma &= 0.5267 \\
> > \text{90th} &= 2{,}281.2\,e^{1.28(0.5267) - 0.2774/2} \\
> > &= 2{,}281.2\,e^{0.5355} \\
> > &\approx 3{,}897 \\
> > \text{10th} &= 2{,}281.2\,e^{-1.28(0.5267) - 0.2774/2} \\
> > &= 2{,}281.2\,e^{-0.8129} \\
> > &\approx 1{,}012
> > \end{align*}
> > $$
> >
> > The Lognormal interval $(1{,}012,\ 3{,}897)$ sits higher at the bottom than the Normal one. At the top it is slightly *lower*, which is Mack's point that neither approximation's 90th percentile is always the larger one.
> >
> > With the standard error above $50\%$ of the reserve, Mack's advice is the Lognormal. A symmetric Normal 95% interval, $\hat R_4 \pm 2\,\text{s.e.}$, would already have a negative lower limit, $-298$.
> >
> > Shifting by the $1{,}200$ already paid gives an 80% interval for AY 4's ultimate of $(2{,}212,\ 5{,}097)$.
