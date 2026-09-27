---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:adfebac17c7345b570b483e5394f34fde8dcbb74eac5a065b297a5e9aaa62d5e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Shifting Risk Parameters.md
---

**Shifting Risk Parameters** describe a risk whose underlying loss potential changes over time, so that its experience in different years comes from different distributions rather than from one fixed distribution. The further back a year lies, the less it says about the risk today, so [[Credibility|credibility]] must weight each year of experience by its age as well as by its volume.

> $$F = \sum_{i=1}^{N} Z_i X_i + \left(1 - \sum_{i=1}^{N} Z_i\right) M$$

> $$\rho(k) = \frac{\tau^2 + C(k)}{\tau^2 + C(0)}$$

> $$Z = \frac{\tau^2 + C(\Delta)}{\tau^2 + C(0)} = \rho(\Delta)$$

- **Notation (Mahler).** $X_i$ is the risk's result in year $i$ of the $N$ years used (year $N$ the latest), $M$ the grand mean and $F$ the estimate. $\tau^2$ is the variance between risks. $C(k)$ is the covariance between one risk's results $k$ years apart, and $C(0) = \delta^2 + \zeta^2$ is the within variance: process variance $\delta^2$ plus $\zeta^2$, the variance due to the parameters shifting. $\rho(k)$ is then the correlation of a risk's results $k$ years apart. The last block is the least squares credibility for a single year of data used $\Delta$ years before the year being estimated.
- **How it shows up.** If the parameters were constant, the correlation between two years of a risk's experience would not depend on how far apart they are. When they shift, $C(k)$ and $\rho(k)$ fall as $k$ grows. Mahler tests this two ways: a chi-squared test that a risk's results in separate periods share one mean, and the average correlation between years grouped by their separation. In his baseball data the correlation falls from about $0.65$ at one year apart to nothing significant after about ten years, and shifting accounts for about 69% of the variance of an observation.
- **Consequences for credibility.** Older years deserve substantially less credibility than recent ones. Giving several years equal weight does worse than using one or two, and the optimal credibility does not rise as years are added. In Mahler's data the least squares weight on the latest year settles near 56%, earlier years get much less, and about 25–35% stays on the grand mean, so adding years does not carry the data towards full credibility. The weights can be declining by design — weight $Z$ on the latest year and $1 - Z$ on the previous estimate is [[Exponential Smoothing|exponential smoothing]], with weights $Z(1-Z)^j$ — or solved from the covariance structure (see [[Credibility Criteria]]).
- **Delay matters.** Because $C(\Delta)$ falls as $\Delta$ grows, a lag before data can be used in [[Experience Rating|experience rating]] lowers the optimal credibility and raises the squared error. For Mahler's National League data with one year of experience, the least squares credibility falls from 68% with a one-year gap to 51% with a two-year gap. The more the parameters shift, the more it matters to minimise the delay.
- **Two separate questions.** Whether risks differ from one another ($\tau^2 > 0$) decides whether experience rating is worthwhile at all. Whether each risk's parameters shift decides how its years should be combined. Mahler's teams show both.

> [!example]- Testing an Account and a Book for Shifting Parameters {Example}
> A large workers compensation account with stable payroll had these claim counts in five consecutive two-year periods: $130$, $112$, $95$, $78$, $85$.
>
> 1. Assuming Poisson claim counts, test at the 1% level whether the account's expected frequency has been constant. ($\chi^2_{0.99,\,4} = 13.28$.)
> 2. Across the book of large accounts, the average correlation between an account's relative loss ratios $k$ years apart is $0.62, 0.50, 0.41, 0.30, 0.18, 0.08$ for $k = 1, \dots, 6$. A 95% band around zero is $\pm 0.10$. What does this say about experience rating these accounts?
> 3. The plan's latest usable year of data is two years before the rating year. What least squares credibility should a single year receive, and how does that compare with a one-year gap?
>
> > [!answer]-
> > **1.** The mean is $500 / 5 = 100$ claims per period.
> >
> > $$
> > \begin{align*}
> > \chi^2 &= \frac{30^2 + 12^2 + 5^2 + 22^2 + 15^2}{100} \\
> > &= \frac{900 + 144 + 25 + 484 + 225}{100} \\
> > &= 17.78
> > \end{align*}
> > $$
> >
> > With $5 - 1 = 4$ degrees of freedom, $17.78 > 13.28$, so reject a constant mean. The account's frequency has shifted over time, not just fluctuated.
> >
> > **2.** The correlations at one to four years apart are far outside $\pm 0.10$, so an account's recent experience does predict its future, and experience rating is worthwhile. They also fall steadily with separation. That is the signature of shifting parameters: with constant parameters they would be roughly flat. By six years apart the correlation is not significant, so experience older than about five years adds little, and recent years should carry most of the weight.
> >
> > **3.** The single-year least squares credibility equals the correlation at the lag, and the minimum squared error is $1 - \rho(\Delta)^2$ times the error of ignoring the data:
> >
> > $$
> > \begin{align*}
> > Z_{\Delta = 2} &= \rho(2) \\
> > &= 0.50 \\[4pt]
> > Z_{\Delta = 1} &= \rho(1) \\
> > &= 0.62 \\[4pt]
> > 1 - \rho(2)^2 &= 0.75 \\[4pt]
> > 1 - \rho(1)^2 &= 0.6156
> > \end{align*}
> > $$
> >
> > The extra year of delay cuts the credibility from 62% to 50%, and the remaining error rises from about 62% to 75% of the error of ignoring the data.

> [!example]- Declining Weights Versus Equal Weights {Example}
> A risk's relative loss ratios (actual over class-expected, adjusted for trend and development) for its three most recent years, oldest first, are $0.90$, $1.00$ and $1.45$. The class average is $1.00$. Three plans estimate next year's relative loss ratio:
>
> - **Plan A:** total credibility 60%, spread equally over the three years.
> - **Plan B:** 55% on the latest year, 10% on each of the two before it, 25% on the class average.
> - **Plan C:** each year, 60% on the newest year and 40% on the previous estimate, starting from $1.00$ before the first of the three years.
>
> 1. Compute each plan's estimate.
> 2. What weight does Plan C give each year and the starting value?
> 3. If risk parameters shift over time, which plan would you expect to predict best?
>
> > [!answer]-
> > **1.**
> >
> > $$
> > \begin{align*}
> > A &= 0.20(0.90 + 1.00 + 1.45) + 0.40(1.00) \\
> > &= 0.67 + 0.40 \\
> > &= 1.070 \\[4pt]
> > B &= 0.10(0.90) + 0.10(1.00) + 0.55(1.45) + 0.25 \\
> > &= 0.09 + 0.10 + 0.7975 + 0.25 \\
> > &= 1.2375
> > \end{align*}
> > $$
> >
> > Plan C updates once a year:
> >
> > $$
> > \begin{align*}
> > F_1 &= 0.6(0.90) + 0.4(1.00) \\
> > &= 0.940 \\[4pt]
> > F_2 &= 0.6(1.00) + 0.4(0.940) \\
> > &= 0.976 \\[4pt]
> > F_3 &= 0.6(1.45) + 0.4(0.976) \\
> > &= 1.2604
> > \end{align*}
> > $$
> >
> > **2.** The weights decline geometrically: $0.60$ on the latest year, $0.60(0.40) = 0.24$ on the year before, $0.60(0.40)^2 = 0.096$ on the oldest, and $(0.40)^3 = 0.064$ on the starting value. They sum to $1$, and $0.60(1.45) + 0.24(1.00) + 0.096(0.90) + 0.064(1.00) = 1.2604$.
> >
> > **3.** The latest year best reflects the risk's current loss potential. Plan A gives the year two back the same weight as the latest, so its $1.07$ mostly describes the risk as it was. Plans B and C both decline with age. Mahler found least squares weights of Plan B's shape — about 55% on the latest year, a little on the next two, about 25% on the grand mean — and that equal weights beyond one or two years did worse. Plan C, once running, puts almost no weight on the class average, and Mahler found that dropping the grand mean raised squared errors. So Plan B is the natural choice.
