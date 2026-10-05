---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:e23b42c1929d7e03ab90df566c9cc8c337c44bd95cdc54058baef71a83ba7b3b
  sources:
    - "CAS Exam MAS-I Tables, Appendix A.3.2.3 Weibull (theta, tau): f(x) = tau (x/theta)^tau e^-(x/theta)^tau / x, F(x) = 1 - e^-(x/theta)^tau, E[X^k] = theta^k Gamma(1 + k/tau) for k > -tau, E[(X^x)^k] = theta^k Gamma(1+k/tau) Gamma[1+k/tau; (x/theta)^tau] + x^k e^-(x/theta)^tau, mode theta((tau-1)/tau)^(1/tau) for tau > 1 else 0, PDF p.12; A.1 incomplete gamma Gamma(alpha; x) = (1/Gamma(alpha)) int_0^x t^(alpha-1) e^-t dt, PDF p.8, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §4 Special Distributions, 'Weibull' page: quantile F^-1(p) = b[-ln(1-p)]^(1/k); failure rate R(t) = k t^(k-1)/b^k, decreasing for k<1, constant for k=1, increasing for k>1; shape 1 = exponential with scale b; Z^k standard exponential; minimum of n iid Weibull(k, b) is Weibull(k, b/n^(1/k)), sha256:d673ebeb4242d5daa56d213fd6245374f7ead872173ad01ad58e5e74ee4bc57f — https://www.randomservices.org/random/special/Weibull.html"
    - "Frees et al., Loss Data Analytics (open text), Ch 3 'Modeling Loss Severity': §3.2.3 Weibull Distribution (hazard decreasing for shape < 1, constant for 1, increasing for > 1), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, printed Contents p.viii (PDF p.10): §2.2.3 Weibull distribution p.51, sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Weibull Distribution.md
---

The **Weibull Distribution** $X \sim \text{Weibull}(\theta, \tau)$ is a continuous distribution on $(0, \infty)$ with scale $\theta > 0$ and shape $\tau > 0$. It generalises the [[Exponential Distribution|exponential]] ($\tau = 1$) and is used for claim severities and for lifetimes whose [[Hazard Rate|hazard rate]] rises or falls with age.

> $$f(x) = \frac{\tau\,(x/\theta)^{\tau}\,e^{-(x/\theta)^{\tau}}}{x}, \quad x > 0$$

> $$F(x) = 1 - e^{-(x/\theta)^{\tau}}$$

> $$E[X^k] = \theta^k\,\Gamma\!\left(1 + \frac{k}{\tau}\right), \quad k > -\tau$$

> $$\text{Var}(X) = \theta^2\left[\Gamma\!\left(1 + \tfrac{2}{\tau}\right) - \Gamma\!\left(1 + \tfrac{1}{\tau}\right)^{2}\right]$$

> $$h(x) = \frac{\tau\,x^{\tau - 1}}{\theta^{\tau}}$$

> $$\begin{aligned} E[X \wedge x] &= \theta\,\Gamma\!\left(1 + \tfrac{1}{\tau}\right)\Gamma\!\left[1 + \tfrac{1}{\tau};\ \left(\tfrac{x}{\theta}\right)^{\tau}\right] \\ &\quad + x\,e^{-(x/\theta)^{\tau}} \end{aligned}$$

- This is the parameterization of the CAS MAS-I tables. The mean is $E[X] = \theta\,\Gamma(1 + 1/\tau)$; the mode is $\theta\left(\frac{\tau - 1}{\tau}\right)^{1/\tau}$ for $\tau > 1$, else 0.
- **Hazard rate:** decreasing for $\tau < 1$, constant $1/\theta$ for $\tau = 1$ (the exponential with mean $\theta$), increasing for $\tau > 1$. This flexibility is why it is a standard lifetime model in reliability. The survival function is $S(x) = e^{-(x/\theta)^{\tau}}$, so the cumulative hazard is $(x/\theta)^{\tau}$.
- **Link to the exponential:** $(X/\theta)^{\tau}$ has the exponential distribution with mean 1. Inverting $F$ gives the [[Inversion Method|inversion]] formula $x = \theta\left[-\ln(1 - u)\right]^{1/\tau}$.
- **[[Limited Expected Value]]** (last block, as the tables give it): $\Gamma(\alpha; y) = \frac{1}{\Gamma(\alpha)}\int_0^y t^{\alpha - 1}e^{-t}\,dt$ is the incomplete gamma function — the [[Gamma]] CDF with shape $\alpha$ and scale 1.
- **Minimum of a sample:** if $X_1, \ldots, X_n$ are independent $\text{Weibull}(\theta, \tau)$, then $P(\min > x) = e^{-n(x/\theta)^{\tau}}$, so the minimum is $\text{Weibull}(\theta n^{-1/\tau}, \tau)$ — the lifetime of a series [[System Reliability|system]] of identical components.
- On MAS-I it appears as a claim-severity model (Tse §2.2.3), in hazard-rate and survival calculations, in [[Order Statistics|order statistics]] and in simulation by inversion.

> [!example]- A Heavy-Tailed Weibull Severity {Example}
> Liability losses follow a Weibull distribution with $\theta = 2{,}000$ and $\tau = 0.5$.
>
> (a) Find the probability that a loss exceeds 5,000.
>
> (b) Find the mean and standard deviation of a loss.
>
> (c) Find the hazard rate at 500 and at 5,000, and say what they show.
>
> > [!answer]-
> > (a) $(5{,}000/2{,}000)^{0.5} = 1.5811$, so
> >
> > $$
> > \begin{align*}
> > P(X > 5{,}000) &= e^{-1.5811} \\
> > &= 0.2057
> > \end{align*}
> > $$
> >
> > (b) With $1/\tau = 2$, $\Gamma(3) = 2$ and $\Gamma(5) = 24$:
> >
> > $$
> > \begin{align*}
> > E[X] &= 2{,}000\,\Gamma(3) \\
> > &= 4{,}000 \\
> > \text{Var}(X) &= 2{,}000^2\left[\Gamma(5) - \Gamma(3)^2\right] \\
> > &= 4{,}000{,}000\,(24 - 4) \\
> > &= 80{,}000{,}000
> > \end{align*}
> > $$
> >
> > The standard deviation is $\sqrt{80{,}000{,}000} \approx 8{,}944$, more than twice the mean.
> >
> > (c) $h(x) = 0.5\,x^{-0.5}/2{,}000^{0.5}$:
> >
> > $$
> > \begin{align*}
> > h(500) &= \frac{0.5}{\sqrt{500}\sqrt{2{,}000}} \\
> > &= 0.000500 \\
> > h(5{,}000) &= \frac{0.5}{\sqrt{5{,}000}\sqrt{2{,}000}} \\
> > &= 0.000158
> > \end{align*}
> > $$
> >
> > With $\tau < 1$ the hazard rate falls as the loss grows: the chance that a loss which has reached $x$ ends within the next unit is lower at 5,000 than at 500 — the mark of a heavy tail.

> [!example]- Lifetime of a Series System {Example}
> A sprinkler controller fails if any of its 4 independent sensors fails. Each sensor's lifetime in years is Weibull with $\theta = 10$ and $\tau = 2$. Find the probability that the controller is still working after 3 years, and its expected lifetime.
>
> > [!answer]-
> > The controller's lifetime $T$ is the minimum of the four sensor lifetimes:
> >
> > $$
> > \begin{align*}
> > P(T > t) &= \left[e^{-(t/10)^2}\right]^4 \\
> > &= e^{-4(t/10)^2} \\
> > &= e^{-(t/5)^2}
> > \end{align*}
> > $$
> >
> > So $T$ is Weibull with $\theta = 5$, $\tau = 2$. Then $P(T > 3) = e^{-0.36} = 0.6977$, and
> >
> > $$
> > \begin{align*}
> > E[T] &= 5\,\Gamma(1.5) \\
> > &= 5(0.8862) \\
> > &= 4.43
> > \end{align*}
> > $$
> >
> > A single sensor survives 3 years with probability $e^{-0.09} = 0.914$ and lasts $8.86$ years on average; four in series halve the expected lifetime, since $4^{-1/2} = \frac{1}{2}$.
