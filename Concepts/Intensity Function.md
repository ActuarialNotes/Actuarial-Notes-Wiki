---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:8868828b71ba6626bcb9a04b34e1f6ac9ed3fcf1991dff0e17f33de4b05c6364
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

An **Intensity Function** $\lambda(t)$ is the rate at which events occur at time $t$ in a [[Nonhomogeneous Poisson Process|nonhomogeneous Poisson process]]. Over a short interval of length $h$ starting at time $t$, the probability of one event is

> $$P(N(t + h) - N(t) = 1) = \lambda(t)\,h + o(h)$$

- $o(h)$ is a term that goes to 0 faster than $h$, so that $o(h)/h \to 0$ as $h \to 0$.

The probability of two or more events in the interval is $o(h)$. The intensity $\lambda(t)$ is a rate, measured in events per unit of time, and it can be greater than 1. The expected number of events in an interval $(a, b]$ is the area under the intensity function over the interval:

> $$m(b) - m(a) = \int_a^b \lambda(u)\,du$$

- $m(t) = \int_0^t \lambda(u)\,du$ is the mean value function.

The number of events in $(a, b]$ is Poisson with this mean. A constant intensity $\lambda(t) = \lambda$ gives $m(b) - m(a) = \lambda(b - a)$, the mean of an ordinary [[Poisson Process|Poisson process]].

> [!example]- Claims arrive as a nonhomogeneous Poisson process with intensity $\lambda(t) = 2t$ claims per month, where $t$ is in months. What is the probability of exactly one claim between months 1 and 2? {Example}
> - The expected number of claims in $(1, 2]$ is $\int_1^2 2u\,du = 4 - 1 = 3$.
> - The number of claims in $(1, 2]$ is Poisson with mean 3.
> - The probability of exactly one claim is $3e^{-3} = 0.1494$.

## Piecewise intensity functions

When the intensity function is defined in pieces, the integral is split at the points where the formula changes. If the formula changes at time $c$, with $a < c < b$, the expected number of events in $(a, b]$ is

> $$\int_a^b \lambda(u)\,du = \int_a^c \lambda(u)\,du + \int_c^b \lambda(u)\,du$$

> [!example]- During a six-month season, storms arrive as a nonhomogeneous Poisson process with intensity $\lambda(t) = t$ for $0 \le t \le 3$ and $\lambda(t) = 6 - t$ for $3 < t \le 6$, in storms per month. What is the probability of exactly two storms in months 3 and 4, the interval $(2, 4]$? {Example}
> - The formula changes at $t = 3$, so split the integral there.
> - $\int_2^3 u\,du = 4.5 - 2 = 2.5$ and $\int_3^4 (6 - u)\,du = 2.5$.
> - The number of storms in $(2, 4]$ is Poisson with mean $2.5 + 2.5 = 5$.
> - The probability of exactly two storms is $\frac{e^{-5}\,5^2}{2!} = 0.0842$.

## Event times given the number of events

Given $N(t) = n$, the $n$ event times are independent, and each has density $\lambda(s)/m(t)$ on $(0, t]$. Each event therefore falls in an interval $(a, b]$ within $(0, t]$ with probability

> $$\frac{m(b) - m(a)}{m(t)}$$

The number of the $n$ events that fall in $(a, b]$ is [[Binomial Distribution|binomial]] with $n$ trials and this probability. With a constant intensity the probability is $(b - a)/t$, as in [[Poisson Process#Conditioning on the number of events|conditioning on the number of events]] of a Poisson process.

> [!example]- With the storm-season intensity above, the season produced exactly 3 storms. What is the expected number that arrived in the first two months, and what is the probability that none did? {Example}
> - The expected number of storms in the season is $m(6) = \frac{1}{2} \times 6 \times 3 = 9$, the area of the triangle under $\lambda(t)$.
> - The expected number in the first two months is $m(2) = \int_0^2 u\,du = 2$.
> - Each storm arrived in the first two months with probability $\frac{2}{9}$.
> - The expected number in the first two months is $3 \times \frac{2}{9} = 0.667$.
> - The probability that none did is $\left(\frac{7}{9}\right)^3 = 0.4705$.

> [!trap] Reading the intensity as a probability
> The intensity is a number of events per unit of time, not a probability. With $\lambda(t) = 3$ claims per month, the probability of a claim in a short interval of $h$ months is about $3h$, and the expected number of claims in a month is 3.
