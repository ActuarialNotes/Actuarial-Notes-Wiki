---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:1f8c5338dc7511099c5afdb69640b5b30c213a7b271ed259ab28c219628b0d45
  sources:
    - "SOA, Tables for Exam C (Fall 2009), A.3.2.1 Gamma f, M(t) = (1 - theta t)^-alpha, E[X^k] (printed p.4, PDF p.9 page image, read 2026-11-06); A.3.3.1 Exponential f, F, M(t), VaR_p = -theta ln(1-p), TVaR_p = VaR_p + theta, E[X ^ x] = theta(1 - e^(-x/theta)); A.5.1.1 Lognormal E[X^k] = exp(k mu + k^2 sigma^2/2) (printed p.6, PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.8 The Gamma Distribution: Gamma(k+1)=k Gamma(k), Gamma(k+1)=k!; scale b, rate r=1/b, k=1 exponential; E(X)=bk, var(X)=b^2 k; skewness 2/sqrt k; MGF 1/(1-bt)^k, t<1/b; common-scale sum shape k1+k2 (HTML fetched 2026-11-06), sha256:24d8bfbac0c1cdc05848961605509fb8cc7f4182127be1ff73bf9be78fedfeb6 — https://www.randomservices.org/random/special/Gamma.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 14.3 The Gamma Distribution (Poisson process): T_n gamma with shape n; F_n^c(t) = sum_{k=0}^{n-1} e^{-rt}(rt)^k/k!; no closed form in general (HTML fetched 2026-11-06), sha256:bbea5da3e0577d07d2670905b5727657c25b044f8382e17cee3bdfdd723bbe16 — https://www.randomservices.org/random/poisson/Gamma.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.9 The Chi-Square Distribution: chi-square with n df = gamma shape n/2 scale 2 (HTML fetched 2026-11-06), sha256:f7b0f71fc588c1fe691b9de903b5aa28a70a68b8f4e659aa2adb6ca4abc831b3 — https://www.randomservices.org/random/special/ChiSquare.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 7.4 Bayesian Estimation: Poisson model with gamma prior shape k rate r: posterior gamma shape k + Y_n, rate r + n (i.e. scale theta/(1+n theta)) (HTML fetched 2026-11-06), sha256:96904b1fd4ab905bbffa62bd5cc0d965b3c969e543a983124e968718ed25d550 — https://www.randomservices.org/random/point/Bayes.html"
    - "Brunner, Exploring the hazard function of the gamma distribution, STA312 Fall 2023, U. Toronto, p.12: alpha=1 constant at lambda; alpha>1 increasing and bounded above by lambda; alpha<1 decreasing and bounded below by lambda, sha256:af161497b7e389ccd381754c64741ddf7ef2209e9702094ce9c08906a6572428 — https://utstat.utoronto.ca/~brunner/oldclass/312f23/lectures/312f23Hazardplots.pdf"
    - "Bassan, Kochar & Spizzichino, Some bivariate notions of IFR and DMRL and related properties, J. Appl. Prob. 39 (2002) 533-544, p.535 (PDF p.3): 'decreasing mean residual life (DMRL), which is implied by IFR', sha256:eb6dc52f07bbbd9498063da405611adb9a7921e1c8246657b9e9473f9d8af706 — https://web.pdx.edu/~kochar/Papers/d_papers/JAP2002.pdf"
    - "CAS, Exam Content Outline, Modern Actuarial Statistics II (MAS-II), 2026 (v06 2026_1_13), Domain A Introduction to Credibility tasks A1-A2 incl. Bayesian credibility, reading Tse (PDF p.2); Complete Text References: Tse chs 6.1-6.3, 7.1-7.4, 8.1-8.2, 9.1-9.2 (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents p.x (PDF p.12): 8 Bayesian approach, 8.2 Conjugate distributions, 8.2.1 The gamma-Poisson conjugate distribution, sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS, Exam Content Outline, Modern Actuarial Statistics I (MAS-I), 2026, Domain C Extended Linear Models task C2 (appropriate link function and distribution for the dependent variable for GLM), readings Dobson & Barnett, Hogg et al., James et al., Larsen (PDF p.5), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016), Tweedie Var[Y] = a[E(Y)]^p with Gamma distribution p = 2; link table Gamma - Inverse (PDF pp.2-3), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5 (2nd ed. 2020), §2.2: claim severity modelled as gamma (PDF p.15); Var(y) = phi V(mu), Table 1 gamma V(mu) = mu^2 (PDF p.17), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Wikipedia, Gamma distribution, Summation: same-scale sum; different scales refer to Mathai and Moschopoulos (HTML fetched 2026-11-06), sha256:19635342cbe90d2ea2f05e7db12b679da55b44860c0d812c8319ccba8c8f64ac — https://en.wikipedia.org/wiki/Gamma_distribution"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Gamma.md
---

![[Media/Figures/Gamma.svg|340]]

A **Gamma** distribution is a continuous distribution on $(0, \infty)$ with shape $\alpha > 0$ and scale $\theta > 0$. Its probability density function is

> $$f(x) = \frac{x^{\alpha-1}e^{-x/\theta}}{\theta^{\alpha}\,\Gamma(\alpha)}$$

- $x > 0$.
- $\Gamma(\alpha)$ is the gamma function, with $\Gamma(n) = (n-1)!$ for a positive integer $n$.

With $\alpha = 1$, it is the [[Exponential Distribution|exponential distribution]] with mean $\theta$. A density proportional to $x^{a}e^{-x/b}$ on $x > 0$ is a gamma distribution with $\alpha = a + 1$ and $\theta = b$.

> [!idea] The idea
> A gamma with whole-number shape $\alpha$ is the sum of $\alpha$ independent exponentials with mean $\theta$.

> [!example]- A loss has density $f(x) = c\,x^3e^{-x/2}$ for $x > 0$. What is $c$? {Example}
> - The power 3 gives $\alpha = 4$, and the exponent gives $\theta = 2$.
> - $\Gamma(4) = 3! = 6$.
> - $c = \frac{1}{2^4 \times 6} = \frac{1}{96}$.

![[Media/Gamma_distribution_pdf.svg|500]]

## Mean and variance

The mean and the variance of $X$ are

> $$E[X] = \alpha\theta$$

> $$\text{Var}(X) = \alpha\theta^2$$

Dividing the variance by the mean gives $\theta$, and then $\alpha = E[X]/\theta$.

> [!example]- A loss is gamma with mean 900 and variance 270,000. What are $\alpha$ and $\theta$? {Example}
> - $\theta = \frac{270{,}000}{900} = 300$.
> - $\alpha = \frac{900}{300} = 3$.

> [!trap] Scale or rate
> Some texts use the **rate** $\beta = 1/\theta$, with mean $\alpha/\beta$ and variance $\alpha/\beta^2$. A density with $e^{-0.01x}$ has scale 100, not 0.01.

## Sums of exponentials

If $X_1, \ldots, X_n$ are independent exponentials with mean $\theta$, then

> $$X_1 + X_2 + \cdots + X_n \sim \text{Gamma}(n, \theta)$$

Independent gammas with the same scale add the same way: their shapes add. The waiting time to the $n$th event of a [[Poisson Process|Poisson process]] with rate $\lambda$ is gamma with $\alpha = n$ and $\theta = 1/\lambda$.

> [!example]- A loss is the sum of three independent pieces, each exponential with mean 200. What are the mean and variance of the loss? {Example}
> - The loss is gamma with $\alpha = 3$ and $\theta = 200$.
> - $E[X] = 3 \times 200 = 600$.
> - $\text{Var}(X) = 3 \times 200^2 = 120{,}000$.

## Tail probabilities for a whole-number shape

When $\alpha$ is a positive integer, the probability that $X$ exceeds $x$ is

> $$P(X > x) = \sum_{k=0}^{\alpha-1} \frac{e^{-x/\theta}(x/\theta)^k}{k!}$$

$X$ exceeds $x$ exactly when fewer than $\alpha$ events of a Poisson process with rate $1/\theta$ have occurred by $x$. That count is [[Poisson Distribution|Poisson]] with mean $x/\theta$.

> [!example]- A loss is gamma with $\alpha = 3$ and $\theta = 300$. What is the probability that it exceeds 600? {Example}
> - $x/\theta = 2$, and the sum runs over $k = 0, 1, 2$.
>
> $$
> \begin{aligned}
> P(X > 600) &= e^{-2}\left(1 + 2 + \frac{2^2}{2}\right) \\
> &= 5e^{-2} \\
> &= 0.6767
> \end{aligned}
> $$

## Moment generating function

For every shape $\alpha > 0$, whole number or not, the moment generating function of $X$ is

> $$M_X(t) = (1 - \theta t)^{-\alpha}$$

- $t < 1/\theta$.

With $\alpha = 1$ it is the exponential's $(1 - \theta t)^{-1}$.

## Hazard rate and mean excess loss

The [[Hazard Rate|hazard rate]] $h(x) = f(x)/P(X > x)$ is constant at $1/\theta$ when $\alpha = 1$. A gamma with shape $\alpha > 1$ has an increasing hazard rate bounded above by $1/\theta$, and one with $\alpha < 1$ has a decreasing hazard rate bounded below by $1/\theta$. In both cases the hazard rate levels off at $1/\theta$ as $x$ grows. An increasing hazard rate implies a decreasing [[Mean Excess Loss|mean excess loss]], so for $\alpha > 1$ the mean excess loss falls as the threshold rises and approaches $\theta$.

## On later exams

MAS-II uses the gamma as the [[Conjugate Prior|conjugate prior]] for a Poisson mean. MAS-I uses it to model claim severity, which is positive and skewed right.
