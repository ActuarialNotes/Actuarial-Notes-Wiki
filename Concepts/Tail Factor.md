---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:01e2d0f8812767826482a4065c1827c52ee275fe9f9c2b97c640dc4e5bfa3a46
  sources: []
  open_findings: 0
  log: .verify/Concepts/Tail Factor.md
---

**Tail Factor** is the development factor applied beyond the last maturity observable in the triangle — the estimate of all emergence that will occur after the data runs out.

> $$\text{CDF}_{\text{last age} \to \text{ult}} = f_{\text{last observed}} \times \text{Tail}$$

- The tail is the one factor with **no data behind it**, and in [[Long Tail Lines|long-tail lines]] it is often the single largest assumption in the analysis. A triangle that runs ten years still misses decades of workers compensation medical payments.
- Methods for selecting one:
  - **Industry benchmarks** — published patterns (ISO, NCCI, Schedule P aggregates) for the same line, adjusted for differences in limits, mix and case reserving.
  - **Curve fitting** — fit an exponential or inverse-power curve to the observed age-to-age factors and extrapolate the decay. The inverse power curve gives a heavier tail than the exponential and is the more common choice in casualty.
  - **Bondy method** — set the tail equal to the last observed age-to-age factor (or a multiple of it), on the reasoning that development decays geometrically.
  - **Paid-to-reported convergence** — reported losses must eventually equal paid, so the ratio of the two at the oldest maturities implies how much paid development remains.
  - **Judgment**, documented, informed by the settlement characteristics of the line.
- The tail on a **paid** triangle is larger than on a **reported** one, since case reserves have already anticipated much of the reported development.
- A tail of exactly $1.000$ is itself an assumption — that development is complete — and it is the wrong one for any casualty line. Understating the tail is a classic source of reserve deficiency, especially with latent exposures (asbestos, environmental, abuse claims).
- Because the tail multiplies the *oldest* accident years — the ones with the most dollars already reported — a small change in it moves a large reserve. Sensitivity testing the tail is not optional in a long-tail analysis.

![[Media/Figures/Tail_Factor.svg|340]]

> [!example]- Tail Selection Moves the Reserve {Example}
> The last observable age is $120$ months, with $\$2{,}000{,}000$ reported. Two tail estimates are under consideration: $1.030$ and $1.050$.
>
> Quantify the difference.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Tail } 1.030: \; \text{Ultimate} &= \$2{,}060{,}000, \; \text{IBNR} = \$60{,}000 \\
> > \text{Tail } 1.050: \; \text{Ultimate} &= \$2{,}100{,}000, \; \text{IBNR} = \$100{,}000
> > \end{align*}$$
> >
> > Two points of tail is $\$40{,}000$ on this year — a $67\%$ difference in its IBNR.
> >
> > And the tail applies to **every** open accident year, not just the oldest. Across ten years of a mature book with $\$20$M reported beyond $120$ months, the same two-point difference is $\$400{,}000$ of reserve, arrived at by judgment alone.

> [!example]- Fitting a Tail by Curve Extrapolation {Example}
> Observed age-to-age factors for a workers compensation reported triangle:
>
> | Interval | Factor |
> |---|---|
> | $72$–$84$ | $1.040$ |
> | $84$–$96$ | $1.028$ |
> | $96$–$108$ | $1.020$ |
> | $108$–$120$ | $1.014$ |
>
> Estimate the tail beyond $120$ months.
>
> > [!answer]-
> > Work with the **excess** over $1.0$, which is what decays: $0.040$, $0.028$, $0.020$, $0.014$. Successive ratios are
> >
> > $$\frac{0.028}{0.040} = 0.70 \qquad \frac{0.020}{0.028} = 0.71 \qquad \frac{0.014}{0.020} = 0.70$$
> >
> > A clean geometric decay at $r = 0.70$. Extrapolating from the last excess of $0.014$:
> >
> > $$\begin{align*}
> > \text{Total remaining excess} &= 0.014 \times \frac{0.70}{1 - 0.70} \\
> > &= 0.014 \times 2.333 \\
> > &= 0.0327
> > \end{align*}$$
> >
> > $$\text{Tail} \approx 1.033$$
> >
> > The **Bondy** shortcut — take the tail as the last observed factor, $1.014$ — gives a materially smaller answer, because it captures only one further period rather than the whole infinite remainder.
> >
> > Two cautions. An exponential fit assumes the decay rate holds forever; an **inverse power curve**, which decays more slowly, would give a heavier tail and is the more conservative choice for a line with latent exposure. And the fit describes the *observed* pattern — if the last diagonals contain a case strengthening, the fitted decay inherits it.
