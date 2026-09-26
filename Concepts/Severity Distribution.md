---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9ccc3f3f2b4cecc2f02966fa9383baa55f44ce9f8cfd07f169f9915dc77a4cc4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Severity Distribution.md
---

**A severity distribution** is the probability distribution of the size $X$ of a single loss or claim, given that one happens. It is described by its CDF $F(x) = P(X \le x)$ or its density $f(x)$. Paired with a claim-count distribution, it prices anything that depends on how large claims are: deductibles, limits, excess layers and [[Exposure Curves|exposure curves]].

> $$E[X \wedge u] = \int_0^u \big[1 - F(x)\big]\,dx$$

> $$G(d) = \frac{E[X \wedge d]}{E[X]}$$

- $E[X \wedge u]$ is the [[Limited Expected Value|limited expected value]], the expected loss capped at $u$. A layer's expected cost is the difference of two of these, so this integral is how the severity distribution turns into [[Expected Loss|expected losses by layer]] and [[Increased Limits|increased limits factors]].
- **Families.** The [[Exponential Distribution|exponential]] and [[Gamma|gamma]] are light-tailed. The [[Lognormal Distribution|lognormal]], the Pareto and mixed exponentials are heavy-tailed, and those are the ones used for excess layers, where the tail decides the answer. Parameters are fitted by [[Maximum Likelihood Estimation|maximum likelihood]]. The fit must allow for [[Truncation|truncation]] by deductibles and [[Censoring|censoring]] at policy limits.
- **Exposure curves (Exam 9).** Property losses grow with the size of the risk, so they are expressed as a fraction $X \in [0,1]$ of the risk's maximum possible loss or sum insured. $G(d)$ is then the share of expected loss kept below a deductible of $d$. It rises from $G(0) = 0$ to $G(1) = 1$ and is concave. The curve and the distribution determine each other: $E[X] = 1/G'(0)$, and $1 - F(d) = G'(d)/G'(0)$ for $d < 1$.
- **The MBBEFD class.** Bernegger's MBBEFD distributions give such curves in closed form. The one-parameter subfamily with $c = 1.5, 2, 3, 4$ reproduces the Swiss Re Y1–Y4 curves, and $c = 5$ reproduces the Lloyd's industrial curve.
- **Inflation** multiplies the scale parameter: if losses rise by $r$, then $\theta$ becomes $\theta(1+r)$. The excess layers grow faster than $r$, which is leveraged trend ([[Inflation]]).

> [!example]- Fitting Severity to Deductible Data {Example}
> Four claims are reported under a $\$1{,}000$ deductible, with ground-up sizes $\$1{,}500$, $\$2{,}500$, $\$4{,}000$ and $\$7{,}000$. Losses below $\$1{,}000$ are never reported.
>
> Fit an exponential by maximum likelihood.
>
> > [!answer]-
> > Each observation is left-truncated at $1{,}000$, so its likelihood is $f(x_i) / [1 - F(1000)]$:
> >
> > $$
> > \begin{align*}
> > L(\theta) &= \prod_{i=1}^{4} \frac{\theta^{-1} e^{-x_i/\theta}}{e^{-1000/\theta}} \\
> > &= \theta^{-4}\,e^{-(500 + 1500 + 3000 + 6000)/\theta} \\
> > &= \theta^{-4}\,e^{-11{,}000/\theta}
> > \end{align*}
> > $$
> >
> > Setting $\frac{d}{d\theta}\ln L = -4/\theta + 11{,}000/\theta^2$ to zero gives $\hat\theta = 11{,}000/4 = 2{,}750$, the mean excess over the deductible.
> >
> > Ignoring the truncation gives $\hat\theta = 15{,}000/4 = 3{,}750$, which overstates severity by $36\%$. The fitted curve also says the four reports stand for $4 / e^{-1000/2750} = 5.75$ ground-up losses. Frequency needs the same correction as severity.

> [!example]- An Exposure Curve from a Destruction-Rate Distribution {Example}
> For a class of property risks, the loss as a fraction of MPL has survival function $1 - F(x) = (1 - x)^3$ on $[0, 1]$. One risk has an MPL of $\$10{,}000{,}000$, premium of $\$50{,}000$ and an expected loss ratio of $60\%$.
>
> Derive the exposure curve and find the expected loss in a $\$3$M excess of $\$2$M per-risk layer.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[X \wedge d] &= \int_0^d (1 - x)^3\,dx \\
> > &= \frac{1 - (1 - d)^4}{4} \\[4pt]
> > G(d) &= 1 - (1 - d)^4
> > \end{align*}
> > $$
> >
> > The layer runs from $d = 0.2$ to $d = 0.5$ of MPL. Expected loss is $0.60 \times 50{,}000 = \$30{,}000$.
> >
> > $$
> > \begin{align*}
> > G(0.5) - G(0.2) &= 0.9375 - 0.5904 \\
> > &= 0.3471 \\[4pt]
> > \text{Layer loss} &= 0.3471 \times 30{,}000 \\
> > &= \$10{,}413
> > \end{align*}
> > $$
> >
> > The cedant keeps $0.5904 \times 30{,}000 = \$17{,}712$ below $\$2$M, and $\$1{,}875$ lies above $\$5$M. Recovering the distribution from the curve: $G'(d) = 4(1 - d)^3$, so $E[X] = 1/G'(0) = 0.25$ and $G'(d)/G'(0) = (1 - d)^3$. That matches the survival function we started from.
