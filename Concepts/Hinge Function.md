---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1326c6bbc11c19ae2043f548028cf1b59fe27e94062f7c051d792dc14db06750
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hinge Function.md
---

A **Hinge Function** is an engineered [[Generalized Linear Model|GLM]] feature that is zero up to a knot $c$ and grows linearly past it, $h(x, c) = \max(0, x - c)$. A set of hinges at several knots lets a GLM fit a continuous, piecewise-linear effect of a numeric variable on the linear predictor, where **step functions** fit a piecewise-constant one.

> $$h(x, c) = \max(0,\ x - c)$$

> $$s(x, c) = \begin{cases} 1 & x \geq c \\ 0 & x < c \end{cases}$$

> $$\eta = \beta_0 + \beta_1 x + \sum_{j} \beta_{c_j}\, h(x, c_j)$$

- $x$ is the numeric feature, and $x$ itself is the hinge with its knot at $0$. The linear predictor $\eta$ has slope $\beta_1$ below the first knot, and each coefficient $\beta_{c_j}$ is the **change in slope** at knot $c_j$. With a log link, each segment changes the relativity by a constant percentage per unit of $x$. A step function $s(x, c)$ instead shifts $\eta$ by its coefficient at $c$. The hinge is sometimes written $(x - c)_+$.
- **Letting the data pick the knots.** Chalk et al. create many candidates (one per value, or about 25 equally spaced per feature, or at percentiles) and let the LASSO or elastic net select them by [[Cross-Validation|cross-validation]] ([[Regularization]]). Knots chosen by eye after looking at the data are slow and may chase noise. The LASSO also shrinks the kept coefficients, so refitting the selected hinges without penalty (hard-thresholding, the relaxed LASSO) can fit better. On aircraft age, hinges at $4$ and $28$ captured the shape; from $50$ candidates the selected model kept age and seven hinges.
- **MARS** (multivariate adaptive regression splines) is a decision tree built from hinges (linear splines): it adds, stepwise, whichever hinge most improves the training fit. With its pruning turned off, its hinges become candidates for the LASSO. Because MARS looks at the target to place knots, the hinges must be built separately within each fold ([[Data Leakage]]). A shuffled random feature shows when MARS has started generating hinges from noise.
- **Step or hinge?**
  - *Edges.* Steps are flat beyond the last threshold; hinges keep sloping and can extrapolate to extreme rates. Holding hinge values constant beyond, say, the 99th percentile limits this.
  - *Customer journey.* Hinges give prices that change smoothly with age at each renewal; steps give flat stretches and jumps.
  - *Discontinuities and ordinal features.* Steps suit a genuine jump, and cumulative steps suit ordinal categories.
  - *Machine learning.* Steps are what tree models split on; hinges generalize the ReLU units of neural networks.
- **The fused LASSO.** A penalty on differences between neighbouring coefficients, $\lambda_2 \sum |\beta_i - \beta_{i-1}|$, keeps effects for nearby values similar. Step functions under the ordinary LASSO penalty are the fused LASSO with $\lambda_1 = 0$.
- On the aviation case study, starting from steps, hinges or MARS hinges gave cross-validation pseudo-R² of $0.150$, $0.149$ and $0.150$, with $67$, $77$ and $63$ features kept. Binning (many parameters, discontinuities) and polynomials (erratic at the edges) are the alternatives Goldburd et al. list.

> [!example]- Driver Age with Two Hinges {Example}
> A log-link frequency GLM for private auto uses driver age $x$ with hinges at $25$ and $60$:
>
> $$\eta = -1.20 - 0.080x + 0.070\,h(x, 25) + 0.030\,h(x, 60)$$
>
> (a) State the slope of $\eta$ in each age range. (b) Find the predicted frequency at ages $20$, $40$ and $80$, and the age 20 and age 80 relativities to age 40.
>
> > [!answer]-
> > **(a)** Below $25$: $-0.080$. From $25$ to $60$: $-0.080 + 0.070 = -0.010$. Above $60$: $-0.010 + 0.030 = +0.020$.
> >
> > **(b)**
> >
> > $$
> > \begin{align*}
> > \eta(20) &= -1.20 - 0.080(20) \\
> > &= -2.80 \\[4pt]
> > \eta(40) &= -1.20 - 3.20 + 0.070(15) \\
> > &= -3.35 \\[4pt]
> > \eta(80) &= -1.20 - 6.40 + 0.070(55) + 0.030(20) \\
> > &= -3.15
> > \end{align*}
> > $$
> >
> > The frequencies are $e^{-2.80} = 0.0608$, $e^{-3.35} = 0.0351$ and $e^{-3.15} = 0.0429$.
> >
> > $$
> > \begin{align*}
> > R_{20} &= e^{-2.80 - (-3.35)} \\
> > &= e^{0.55} \\
> > &= 1.733 \\[4pt]
> > R_{80} &= e^{-3.15 - (-3.35)} \\
> > &= e^{0.20} \\
> > &= 1.221
> > \end{align*}
> > $$
> >
> > Three coefficients give a U-shape, falling steeply to $25$, flattening, and turning up after $60$, with no jumps at any birthday. Step functions would need many more parameters to trace the same slopes.

> [!example]- The Last Hinge versus the Last Step {Example}
> Two candidate annual-mileage effects for a log-link model agree up to $10{,}000$ miles. Model S ends with a step at $10{,}000$ with coefficient $0.30$. Model H ends with a hinge at $10{,}000$ with coefficient $0.00002$ per mile. Compare the relativity to $10{,}000$ miles at $30{,}000$ and $100{,}000$ declared miles, and suggest a fix for Model H.
>
> > [!answer]-
> > Model S applies $e^{0.30} = 1.350$ at every mileage above $10{,}000$.
> >
> > $$
> > \begin{align*}
> > R_H(30{,}000) &= e^{0.00002 \times 20{,}000} \\
> > &= e^{0.40} \\
> > &= 1.492 \\[4pt]
> > R_H(100{,}000) &= e^{0.00002 \times 90{,}000} \\
> > &= e^{1.80} \\
> > &= 6.050
> > \end{align*}
> > $$
> >
> > The step is flat at the edge of the data, so a $100{,}000$-mile declaration pays the same as $11{,}000$. The hinge keeps sloping and charges six times the $10{,}000$-mile rate, extrapolated from almost no data. A common fix is to cap the hinge feature at a high percentile of the data, say $40{,}000$ miles, which caps the relativity at $e^{0.00002 \times 30{,}000} = e^{0.60} = 1.822$. Which edge behaviour is right is a pricing judgment, not a statistical one.
