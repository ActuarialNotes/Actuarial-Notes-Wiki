---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:856c698197db340d2cf4faeb28fb21da7cebd802bd28a0e99d563f0f4c42a890
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Intensity Function.md
---

The **Intensity Function** $\lambda(t)$ is the instantaneous event rate of a [[Nonhomogeneous Poisson Process]]: at time $t$ the probability of one event in a short interval of length $h$ is approximately $\lambda(t)\,h$. Its integral, the **mean value function** $m(t)$, is the expected number of events by time $t$.

> $$m(t) = \int_0^t \lambda(s)\, ds$$

> $$N(t+s) - N(s) \sim \text{Poi}\big(m(t+s) - m(s)\big)$$

- Formally (Ross): $P\big(N(t+h) - N(t) = 1\big) = \lambda(t)h + o(h)$ and $P\big(N(t+h) - N(t) \geq 2\big) = o(h)$. $\lambda(t)$ is a **rate**, in events per unit time, not a probability — it can exceed $1$.
- A constant intensity $\lambda(t) = \lambda$ gives $m(t) = \lambda t$ and the ordinary [[Poisson Process]]. Expected counts are **areas under the intensity curve**, so a question giving $\lambda(t)$ piecewise is an integration exercise.
- The first event time has survival function $e^{-m(t)}$, so $\lambda(t)$ is exactly the [[Hazard Rate]] of the first arrival — the same mathematics as a [[Survival Model]] with force of mortality $\mu(t)$.
- Given $N(t) = n$, the $n$ event times are independent with density $\lambda(s)/m(t)$ on $(0, t)$. The number falling in $(a, b]$ is therefore binomial with $p = \big(m(b) - m(a)\big)/m(t)$.
- If $\lambda(t) \leq \lambda$ for all $t$, the process can be built by [[Poisson Thinning|thinning]] a rate-$\lambda$ process, keeping an event at time $t$ with probability $\lambda(t)/\lambda$.
- Uses: seasonal catastrophe arrivals, exposure growing through a policy year, claim reporting that tails off after the accident date.

> [!example]- A Triangular Storm Season {Example}
> During a six-month season, storms arrive with intensity $\lambda(t) = t$ for $0 \leq t \leq 3$ and $\lambda(t) = 6 - t$ for $3 \leq t \leq 6$ ($t$ in months, storms per month).
>
> (a) Find the expected number of storms in the season. (b) Find the probability of no storm in month 1. (c) Find the probability of exactly two storms in months 3 and 4 ($2 < t \leq 4$).
>
> > [!answer]-
> > (a) $m(6)$ is the area of a triangle with base $6$ and height $3$: $\tfrac{1}{2}(6)(3) = 9$ storms.
> >
> > (b) $m(1) = \int_0^1 s\,ds = 0.5$, so $P(N(1) = 0) = e^{-0.5} = 0.6065$.
> >
> > (c) Integrate over the window, splitting at the peak:
> >
> > $$
> > \begin{align*}
> > m(4) - m(2) &= \int_2^3 s\,ds + \int_3^4 (6 - s)\,ds \\
> > &= 2.5 + 2.5 \\
> > &= 5
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > P\big(N(4) - N(2) = 2\big) &= \frac{e^{-5}\,5^2}{2!} \\
> > &= 0.0842
> > \end{align*}
> > $$
> >
> > The two peak months carry $5$ of the season's $9$ expected storms.

> [!example]- Where the Season's Storms Fell {Example}
> Using the same intensity, the season produced exactly $3$ storms. Find the expected number that arrived in the first two months, and the probability that none did.
>
> > [!answer]-
> > Given $N(6) = 3$, each storm independently falls in $(0, 2]$ with probability
> >
> > $$
> > \begin{align*}
> > p &= \frac{m(2)}{m(6)} \\
> > &= \frac{2}{9}
> > \end{align*}
> > $$
> >
> > The expected number is $3 \times 2/9 = 0.667$, and $P(\text{none}) = (7/9)^3 = 0.4705$. Note that the first two months are a third of the season but carry only $2/9$ of its intensity.
