---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:ed7806dd19ad1d0c33f0ebf0bbcd7ddea07d1edf244a4c952afcd174cefe1129
  sources:
    - "Frees et al., Loss Data Analytics (open text), ch.4 Model Selection and Estimation: §4.1.1.3 smoothed empirical quantile (1-h)X_(j) + hX_(j+1), j = floor((n+1)q), h = (n+1)q - j (Example 4.1.3); §4.1.3.1 moments not available when they do not exist, percentile matching as the alternative; §4.1.3.2 Example 4.1.10 Pareto quantile theta((1-q)^(-1/alpha) - 1), numerical routine required, no analytic solution; Example 4.1.11 loglogistic by ratio of the two equations, n = 11, q = 0.4 gives 0.2 X_(4) + 0.8 X_(5); estimates vary with percentiles chosen; MLE more efficient, moments/percentile matching easier to explain and give starting values, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list PDF p.6: Tse §12.1 assigned, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, printed Contents (PDF pp.10-13): §12.1 Methods of moments and percentile matching (contents only), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Percentile Matching.md
---

**Percentile Matching** estimates the parameters of a model by making its [[Percentile|percentiles]] equal the corresponding percentiles of the data: with $p$ unknown parameters, choose $p$ percentile levels $g_1, \ldots, g_p$ and solve the $p$ equations below. It is the percentile analogue of the [[Method of Moments]] and works even when the model's moments do not exist.

> $$F(\hat\pi_{g_k} \mid \theta) = g_k, \quad k = 1, \ldots, p$$

> $$\hat\pi_g = (1 - h)\,x_{(j)} + h\,x_{(j+1)}$$

> $$j = \lfloor (n+1)g \rfloor, \qquad h = (n+1)g - j$$

- $\hat\pi_g$ is the **smoothed empirical percentile**: locate position $(n+1)g$ among the [[Order Statistics|order statistics]] $x_{(1)} \le \cdots \le x_{(n)}$ and interpolate linearly between the neighbouring observations. For $n = 11$ and $g = 0.4$, the position is $4.8$, so $\hat\pi_{0.4} = 0.2\,x_{(4)} + 0.8\,x_{(5)}$.
- The exponential, [[Weibull Distribution|Weibull]] and loglogistic give equations that can be solved by hand: for the two-parameter ones, dividing one equation by the other eliminates $\theta$. A closed-form inverse CDF is not enough on its own — the two-parameter [[Pareto Distribution|Pareto]] has $F^{-1}(g) = \theta\big((1 - g)^{-1/\alpha} - 1\big)$, yet its two percentile equations have no analytic solution and need a numerical solver, as does the general case $F^{-1}(g \mid \theta) = \hat\pi_g$.
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
