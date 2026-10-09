---
aliases:
  - Individual Data
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:975b7c497d65705434efe28b079b4a3eef36012bcbfbdd1e5c0e5e264995c16e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Grouped Data.md
---

**Grouped Data** record each observation only by the interval it fell in: the data are the boundaries $c_0 < c_1 < \cdots < c_k$ and the number of observations $n_j$ in each interval $(c_{j-1}, c_j]$. **Individual data**, by contrast, record the exact value of each observation. Either kind is complete when no observation is [[Truncation|truncated]] or [[Censoring|censored]], and [[Maximum Likelihood Estimation|maximum likelihood]] handles grouped data by giving each interval the probability that the model assigns to it.

> $$L(\theta) = \prod_{j=1}^{k}\big[F(c_j \mid \theta) - F(c_{j-1} \mid \theta)\big]^{n_j}$$

> $$L(\theta) = \prod_{i=1}^{n} f(x_i \mid \theta)$$

> $$f_n(x) = \frac{n_j}{n\,(c_j - c_{j-1})}, \quad c_{j-1} \le x < c_j$$

> $$F_n(x) = F_n(c_{j-1}) + (x - c_{j-1})\,f_n(x)$$

- **Symbols:** Following Klugman, Panjer & Willmot (*Loss Models*, chapter 11), $n = \sum n_j$ is the sample size and $F(x \mid \theta)$ is the model's distribution function. An open last interval has $c_k = \infty$ and $F(\infty \mid \theta) = 1$, so it contributes $S(c_{k-1} \mid \theta)^{n_k}$. The second block is the likelihood for individual data, in which each exact value contributes its density.
- **What grouping costs:** Grouped data say nothing about where in its interval each value fell, so the grouped-data estimate has a larger variance than the individual-data estimate from the same losses. Grouping is a form of interval censoring, and claims reported only by size band are the usual source.
- **Closed forms:** The grouped likelihood usually has to be maximised numerically. With only two groups, the maximum sets $F(c_1 \mid \theta) = n_1/n$ for any one-parameter model. For the [[Exponential Distribution|exponential]] with equally spaced boundaries, every term is a power of $p = e^{-h/\theta}$, where $h$ is the spacing, and the maximum has a closed form.
- **Histogram and ogive:** The [[Histogram|histogram]] $f_n$ is constant on each interval, with total area 1. The ogive $F_n$, its integral, joins the empirical distribution function at the boundaries with straight lines, which assumes that the observations are spread evenly within each interval. These are the grouped-data counterparts of the [[Empirical Distribution|empirical distribution]], and neither is defined on an open last interval.

> [!example]- Exponential Fit to Claims Counted by Size Band {Example}
> A claims system reports 100 claims only by size band: 60 at or below \$1,000, 25 between \$1,000 and \$2,000, and 15 above \$2,000. Fit an exponential distribution with mean $\theta$ by maximum likelihood.
>
> > [!answer]-
> > Write $p = e^{-1{,}000/\theta}$, so that the three intervals have probabilities $1 - p$, $p - p^2 = p(1 - p)$ and $p^2$.
> > $$
> > \begin{align*}
> > L &= (1 - p)^{60}\,\big[p(1 - p)\big]^{25}\,\big(p^2\big)^{15} \\
> > &= (1 - p)^{85}\,p^{55}
> > \end{align*}
> > $$
> > Setting the derivative of $85\ln(1 - p) + 55\ln p$ to 0 gives $p = 55/140$.
> > $$
> > \begin{align*}
> > \hat p &= 0.39286 \\
> > \hat\theta &= \frac{-1{,}000}{\ln 0.39286} \\
> > &= \frac{1{,}000}{0.93431} \\
> > &= 1{,}070.31
> > \end{align*}
> > $$
> > The fitted model puts 60.7%, 23.9% and 15.4% of claims in the three bands, close to the observed 60%, 25% and 15%. Had the 100 claim amounts been recorded individually, the estimate would simply be their average, which these counts do not reveal.

> [!example]- Ogive and Histogram from Grouped Claims {Example}
> One hundred claims are grouped as follows: 30 in $(0, 500]$, 35 in $(500, 1{,}000]$, 25 in $(1{,}000, 2{,}500]$ and 10 in $(2{,}500, 5{,}000]$. Find the histogram value $f_{100}(800)$, the ogive value $F_{100}(800)$, and the ogive's estimate of the probability that a claim exceeds 1,500.
>
> > [!answer]-
> > At the boundaries the empirical distribution function is $F_{100}(500) = 0.30$, $F_{100}(1{,}000) = 0.65$ and $F_{100}(2{,}500) = 0.90$.
> > $$
> > \begin{align*}
> > f_{100}(800) &= \frac{35}{100(500)} \\
> > &= 0.0007 \\
> > F_{100}(800) &= 0.30 + 300(0.0007) \\
> > &= 0.51 \\
> > F_{100}(1{,}500) &= 0.65 + \frac{500}{1{,}500}(0.25) \\
> > &= 0.7333
> > \end{align*}
> > $$
> > The estimate of $\Pr(X > 1{,}500)$ is $1 - 0.7333 = 0.2667$. It rests on the assumption that the 25 claims in the third band are spread evenly across it, which is the assumption the ogive always makes.

> [!tip]- How it appears on the exam
> - **FAM** asks candidates to estimate severity and frequency parameters by maximum likelihood for complete individual data, complete grouped data, and truncated or censored data. A grouped-data question gives boundaries and counts and asks for the estimate of a one-parameter model whose likelihood reduces to a closed form.
> - **Individual data:** With exact values, the same objective becomes the standard likelihood $\prod f(x_i \mid \theta)$, which gives familiar closed forms such as $\hat\theta = \bar{x}$ for the exponential.
> - **Mixed records:** A question can combine individual values, grouped counts and censored claims in one likelihood. Each record contributes its own term, so the parts are written separately and multiplied.

> [!warning]- Exam traps
> - **Density instead of probability:** A grouped observation contributes the probability of its interval, $F(c_j) - F(c_{j-1})$. Using the density at the interval's midpoint treats the data as individual and gives a different estimate.
> - **The open last interval:** An interval with no upper bound contributes the survival function $S(c_{k-1})$. Leaving it out of the likelihood discards the largest claims and pulls the estimate of a mean downward.
> - **Dividing by the width:** The histogram divides each count by $n$ times the interval's width. With unequal widths, using $n_j/n$ as the height makes wide intervals look far more likely than they are.
> - **Ogive between boundaries:** The ogive equals the empirical distribution function only at the boundaries. Between them it is an interpolation, so it is not the observed proportion of claims below $x$.
