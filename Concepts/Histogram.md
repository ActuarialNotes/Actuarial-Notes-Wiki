---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4f644d7247bb036b1c71ce3770c8fe02f446cf374d5d3ebddfaaf2758abea829
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Histogram.md
---

A **Histogram** is an [[Exploratory Data Analysis]] display of a single continuous variable: the range is cut into bins of equal width and a bar is drawn over each bin whose area is proportional to the number of observations falling in it. It is the sample's picture of the underlying [[Probability Density Function (PDF)|density]].

> $$\text{bar height} = \frac{n_j}{n \cdot w} \quad \text{(density scale)}$$

> $$n_j = \#\{i : x_i \in \text{bin } j\}, \qquad w = \text{bin width}$$

- On the **density scale** the bars have total area $1$, so the histogram can be overlaid directly on a fitted density; on the **count scale** the height is simply $n_j$
- **Bin width is the whole game**: too wide and real structure (a second mode, a spike at zero) disappears; too narrow and sampling noise looks like structure
- The shape read off a histogram drives the modelling choice — right skew with a long tail points to [[Gamma]] or [[Lognormal Distribution|lognormal]] severity, a spike at zero plus a right-skewed remainder points to the [[Tweedie Distribution]]
- Unlike a [[Box Plot]], a histogram reveals **multimodality**; unlike a [[QQ Plot]], it is poor at judging tails, because the extreme bins hold few observations
- Applied to a discrete count variable it becomes a bar chart of the [[Probability Mass Function (PMF)|PMF]] — useful for spotting overdispersion before fitting a [[Poisson Regression]]
- Taking $\log$ of a positive skewed variable before plotting usually turns an uninformative spike-and-tail into a readable, near-symmetric shape

![[Media/Figures/Histogram.svg|340]]

> [!example]- Reading a Severity Histogram {Example}
> A histogram of $500$ claim amounts has a tall first bar covering $[0, 2{,}000)$, steadily shorter bars out to $20{,}000$, and a handful of observations past $50{,}000$. The bin width is $2{,}000$ and the first bin holds $180$ claims. What is the density-scale height of the first bar, and what does the shape suggest?
>
> > [!answer]-
> > $$\text{height} = \frac{n_1}{n \cdot w} = \frac{180}{500 \times 2{,}000} = 1.8 \times 10^{-4}$$
> > Equivalently, $36\%$ of the claims fall in the first bin. The long right tail with no left tail is **strong right skew**, so a Normal-response model is inappropriate; fit severity with a [[Gamma]] or lognormal [[Generalized Linear Model]], or model $\ln(\text{severity})$.

> [!example]- Choosing a Bin Width {Example}
> An actuary plots $n = 64$ observations of a continuous variable using $4$ bins, then again using $32$ bins. The first looks like a single smooth hump; the second looks like a comb of spikes. Which is right?
>
> > [!answer]-
> > Neither — both are artifacts of the bin choice. A common starting rule is $k \approx \sqrt{n} = 8$ bins (or Sturges' $k \approx 1 + \log_2 n = 7$). With $64$ observations, $4$ bins over-smooths away any second mode and $32$ bins leaves about two observations per bin, so the "spikes" are pure sampling noise. Plot several widths and only trust features that survive all of them.
