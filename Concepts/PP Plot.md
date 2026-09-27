---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:eea32334a496c0e82dff455e181445d38dc018a71f25b83d873fd8de7449db6f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/PP Plot.md
---

**PP Plot** (p-p plot) is a graphical test of whether a stochastic reserving model predicts the *distribution* of outcomes correctly. Each of $n$ triangles is fitted with its outcome held back, and the [[Percentile|percentile]] of the actual outcome within the model's predictive distribution is recorded. The sorted percentiles are plotted against the values expected if they were uniform. [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]] calls a model "validated" when the plot stays inside the Kolmogorov-Smirnov band.

> $$e_i = 100 \cdot \frac{i}{n+1}, \quad i = 1, \dots, n$$

> $$D = \max_i \left| p_i - f_i \right|, \quad f_i = 100 \cdot \frac{i}{n}$$

> $$\text{Reject uniformity at } 5\% \text{ if } D > \frac{136}{\sqrt{n}}$$

- $p_1 \leq \dots \leq p_n$ are the predicted percentiles of the outcomes, on a 0–100 scale. $e_i$, the expected value of the $i$-th of $n$ sorted uniform percentiles, goes on the horizontal axis, and $p_i$ on the vertical. A model that predicts well gives a plot along the $45^\circ$ line.
- The **Kolmogorov-Smirnov (KS) test** measures the gap against $f_i = 100\,i/n$, an approximation to $e_i$. The band is drawn $136/\sqrt{n}$ above and below the $45^\circ$ line; it is $19.2$ for one line's $50$ triangles and $9.6$ for all $200$.
- **The percentile of an outcome.** For a model with a simulated predictive distribution, such as an [[Markov Chain Monte Carlo|MCMC]] model, the percentile is the share of simulated outcomes at or below the actual one. For the Mack model, Meyers fits a [[Lognormal Distribution|lognormal]] with Mack's mean and standard deviation.
- **Why uniform.** If the model is right, each outcome is a random draw from its predictive distribution, so its percentile is [[Uniform Continuous Distribution|uniform]] on $(0, 100)$. One percentile says little: the 86th is not unusual. Many percentiles together make uniformity testable.
- **A histogram** of the percentiles is the most visual test, with bars that should be level. It fluctuates too much to judge by eye unless $n$ is very large, and the p-p plot with KS bands adds a significance test. The Anderson-Darling test is more sensitive in the tails. Meyers found almost every model failed it, so he kept the KS test.
- **Reading the shape** (Meyers' Figure 3.1):
    - **Slanted "S"** (flat at both ends, steep through the middle): too many outcomes in the high and low percentiles, so the predicted distribution is **too light in the tails**. The histogram is U-shaped.
    - **Slanted backward "S"** (steep at both ends, flat through the middle): too many outcomes in the middle percentiles, so the predicted distribution is **too heavy in the tails**. The histogram peaks in the middle.
    - **Below the $45^\circ$ line throughout**: outcomes pile into the low percentiles, so the model predicts results that are **too high** (biased high). The mirror image, above the line, would mean predictions too low.
- **What it can and cannot see.** The test judges a model's "reputation" across many insurers' triangles, not one insurer's reserve. It looks only at the total of the last column of the lower triangle. Meyers adds $\widehat{elpd}_{test}$, which scores the whole [[Holdout Sample|holdout]] lower triangle, as a second retrospective test.

The combined p-p plots Meyers reports ($n = 200$, critical value $9.6$):

| Model | Data | $D$ | Pattern |
|---|---|---|---|
| Mack | incurred | $15.4$ | light tails |
| Mack | paid | $23.1$ | biased high |
| Bootstrap ODP | paid | $24.1$ | biased high |
| CRC | paid | $25.5$ | biased high |
| CRC | incurred | $11.9$ | light tails |
| SCC | paid | $20.8$ | fails |
| SCC | incurred | $23.2$ | fails |
| CSR | paid | $3.1$ | passes |
| CAY | incurred | $10.8$ | improved, still outside |
| IPI | paid | $8.7$ | passes |
| IPI | incurred | $9.4$ | passes |

See the [[Mack Chain Ladder Model|Mack]], [[ODP Bootstrap Model|bootstrap ODP]], [[Cross Classified Model|CRC]], [[Changing Settlement Rate Model|CSR]] and [[Correlated Accident Year Model|CAY]] pages for each model. SCC is Meyers' [[Stochastic Cape Cod Model|stochastic Cape Cod model]] and IPI his [[Integrated Paid and Incurred Model|integrated paid and incurred model]].

> [!example]- Placing One Outcome on the Plot {Example}
> For Meyers' illustrative incurred triangle, the Mack model gives a total ultimate of $38{,}914$ with standard deviation $1{,}057$. The actual total turned out to be $40{,}061$.
>
> (a) Find the outcome's predicted percentile, using a lognormal with the same mean and standard deviation.
>
> (b) Among the $200$ triangles tested, this percentile ranks $172$nd from the bottom. Where does it plot, and what does it contribute to $D$?
>
> > [!answer]-
> > **(a)** Match the lognormal's moments:
> >
> > $$
> > \begin{align*}
> > \sigma^2 &= \ln\!\left(1 + \left(\tfrac{1{,}057}{38{,}914}\right)^2\right) \\
> > &= 0.000738 \\
> > \mu &= \ln 38{,}914 - \tfrac{1}{2}(0.000738) \\
> > &= 10.56874 \\
> > z &= \frac{\ln 40{,}061 - 10.56874}{0.02716} \\
> > &= 1.083
> > \end{align*}
> > $$
> >
> > $\Phi(1.083) = 0.861$, so the outcome is at the $86$th percentile. Meyers reports $86.03$.
> >
> > **(b)** The point sits at the expected percentile on the horizontal axis and the predicted one on the vertical:
> >
> > $$
> > \begin{align*}
> > e_{172} &= 100 \cdot \frac{172}{201} \\
> > &= 85.57 \\
> > f_{172} &= 100 \cdot \frac{172}{200} \\
> > &= 86.00
> > \end{align*}
> > $$
> >
> > It plots at $(85.6,\ 86.0)$, on the $45^\circ$ line. Its KS gap is $|86.03 - 86.00| = 0.03$. One outcome is never evidence against a model; only the pattern of all $200$ is.

> [!example]- A Light Tail That Passes {Example}
> A model is validated on $16$ triangles. The sorted outcome percentiles are
>
> $2,\ 4,\ 5,\ 6,\ 8,\ 9,\ 12,\ 30,\ 55,\ 78,\ 90,\ 93,\ 95,\ 96,\ 98,\ 99$
>
> Apply the KS test at $5\%$ and describe the plot's shape.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Critical value} &= \frac{136}{\sqrt{16}} \\
> > &= 34.0
> > \end{align*}
> > $$
> >
> > | $i$ | $p_i$ | $f_i = 100\,i/16$ | $\lvert p_i - f_i \rvert$ |
> > |---|---|---|---|
> > | $5$ | $8$ | $31.25$ | $23.25$ |
> > | $6$ | $9$ | $37.50$ | $28.50$ |
> > | $7$ | $12$ | $43.75$ | $31.75$ |
> > | $8$ | $30$ | $50.00$ | $20.00$ |
> > | $11$ | $90$ | $68.75$ | $21.25$ |
> >
> > The other gaps are smaller, so $D = 31.75 < 34.0$ and uniformity is **not rejected**.
> >
> > The shape still warns. Seven outcomes are at or below the $12$th percentile and six at or above the $90$th, where a uniform would put about two in each. The plot hugs the bottom, climbs steeply through the middle and flattens near the top. That is the slanted "S" of a model **too light in the tails**. Meyers saw exactly this with Mack on incurred data: three of four lines stayed inside their bands of $19.2$, but pooling all $200$ triangles took the plot outside $9.6$. A small sample can hide a real misfit, so pool across lines before concluding.
