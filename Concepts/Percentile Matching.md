---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bfcaafbb34b4605940ba09cf5243e26ca2d9e078bd13a54bba73eeb8c2ed489f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Percentile Matching.md
---

**Percentile Matching** estimates the parameters of a model by making its [[Percentile|percentiles]] equal the corresponding percentiles of the data: with $p$ unknown parameters, choose $p$ percentile levels $g_1, \ldots, g_p$ and solve the $p$ equations below. It is the percentile analogue of the [[Method of Moments]] and works even when the model's moments do not exist.

> $$F(\hat\pi_{g_k} \mid \theta) = g_k, \quad k = 1, \ldots, p$$

> $$\hat\pi_g = (1 - h)\,x_{(j)} + h\,x_{(j+1)}$$

> $$j = \lfloor (n+1)g \rfloor, \qquad h = (n+1)g - j$$

- $\hat\pi_g$ is the **smoothed empirical percentile**: locate position $(n+1)g$ among the [[Order Statistics|order statistics]] $x_{(1)} \le \cdots \le x_{(n)}$ and interpolate linearly between the neighbouring observations. For $n = 11$ and $g = 0.4$, the position is $4.8$, so $\hat\pi_{0.4} = 0.2\,x_{(4)} + 0.8\,x_{(5)}$.
- Distributions with a closed-form inverse CDF — exponential, [[Weibull Distribution|Weibull]], [[Pareto Distribution|Pareto]], loglogistic — give equations that can be solved by hand; the general case $F^{-1}(g \mid \theta) = \hat\pi_g$ may need a numerical solver.
- **Choices matter.** Different percentile levels give different estimates, and the method uses only a few points of the sample. [[Maximum Likelihood Estimation|Maximum likelihood]] uses the data more efficiently and is generally preferred; percentile matching and moments give quick, explainable estimates and starting values for the MLE search.
- Because percentiles always exist, the method can fit heavy-tailed severity models such as a Pareto with $\alpha \le 1$, where the moment equations have no solution (see [[Tail Weight]]).

> [!example]- Exponential Fit to the Sample Median {Example}
> Ten claims are observed: $120, 180, 260, 330, 410, 560, 720, 980, 1{,}600, 2{,}400$. Fit an [[Exponential Distribution|exponential]] distribution by matching the smoothed empirical median.
>
> > [!answer]-
> > The position is $(10 + 1)(0.5) = 5.5$, halfway between $x_{(5)} = 410$ and $x_{(6)} = 560$, so $\hat\pi_{0.5} = 485$. Match the exponential median:
> >
> > $$
> > \begin{align*}
> > 1 - e^{-485/\theta} &= 0.5 \\
> > \hat\theta &= \frac{485}{\ln 2} \\
> >   &= 699.7
> > \end{align*}
> > $$
> >
> > The fitted mean severity is about \$700, below the sample mean of \$756 — the median match ignores how far out the two largest claims sit.

> [!example]- Weibull Fit to the Quartiles {Example}
> Eleven losses are observed: $54, 95, 140, 190, 230, 310, 380, 450, 620, 840, 1{,}300$. Fit a Weibull, $F(x) = 1 - e^{-(x/\theta)^{\tau}}$, by matching the 25th and 75th smoothed empirical percentiles.
>
> > [!answer]-
> > With $n + 1 = 12$, the positions are $3$ and $9$, so $\hat\pi_{0.25} = 140$ and $\hat\pi_{0.75} = 620$. Each equation becomes $(x/\theta)^{\tau} = -\ln(1 - g)$:
> >
> > $$
> > \begin{align*}
> > (140/\theta)^{\tau} &= -\ln 0.75 \\
> >   &= 0.28768 \\
> > (620/\theta)^{\tau} &= -\ln 0.25 \\
> >   &= 1.38629
> > \end{align*}
> > $$
> >
> > Dividing the second by the first eliminates $\theta$:
> >
> > $$
> > \begin{align*}
> > \left(\frac{620}{140}\right)^{\tau} &= 4.81884 \\
> > \hat\tau &= \frac{\ln 4.81884}{\ln 4.42857} \\
> >   &= \frac{1.57253}{1.48808} \\
> >   &= 1.0568 \\
> > \hat\theta &= \frac{620}{1.38629^{1/1.0568}} \\
> >   &= 455.2
> > \end{align*}
> > $$
> >
> > The fitted Weibull passes exactly through both quartiles; its shape $\hat\tau \approx 1.06$ is close to the exponential case $\tau = 1$.
