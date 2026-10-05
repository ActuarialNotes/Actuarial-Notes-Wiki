---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:856c698197db340d2cf4faeb28fb21da7cebd802bd28a0e99d563f0f4c42a890
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, Def. & Prop. 1.2 p.4 (rate (or intensity) function, mean-value function m, increments Poisson with mean ∫λ), Example 1.3 p.4 (λ(t) = 2t), Example 1.7 p.6 (first-event survival exp(−∫λ), λ as force of mortality µ, 'which is why λ is also called the intensity function'), Fact 1.13 and §1.4.3 pp.9, 14 (thinning), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Huang, STAT 253/317 (U. Chicago, 2021) Lecture 11 slides, following Ross, Introduction to Probability Models ch.5, slide p.10 Definition 5.4a (Ross's o(h) form: P(N(t+h) − N(t) = 1) = λ(t)h + o(h), P(≥ 2) = o(h)), sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'Non-homogeneous Poisson Processes' (rate function, mean function, T_1 density r(t)e^{-m(t)}, failure rate), sha256:ab27d84736959d91325dc48823d4e0df83bead12355c73830a28dc427de16aaf — https://www.randomservices.org/random/poisson/Nonhomogeneous.html"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'Poisson Processes on General Spaces', 'The Distribution of the Random Points' (given N(A) = n the points are independent, each distributed as μ restricted to A; N(B) given N(A) = n binomial(n, μ(B)/μ(A))), applied with μ = m, sha256:cdc957a1fb433c343ee4654af5350259baf15fcc37acbb4acf2c5a50077b6567 — https://www.randomservices.org/random/poisson/General.html"
    - "Sigman, 'Non-stationary Poisson processes and Compound (batch) Poisson processes', Columbia IEOR 4404 notes (2013), §1.1 The non-stationary case: Thinning, PDF pp.1-2, sha256:91ae1398bbf6f852a48bac75670d19e25cc6369d31f0cb1579627d1c09b80dd4 — http://www.columbia.edu/~ks20/4404-Sigman/4404-Notes-NSP.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
