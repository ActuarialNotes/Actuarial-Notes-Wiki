---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:9bf5eb2c4e8bfae95d437ceb90cb3db815d12467f565cfcea9540c4ce19d8b4e
  sources:
    - "SOA, Tables for Exam C (Fall 2009), A.2.3.1 Pareto printed p.3 (PDF p.8, page image), A.3.2.1 Gamma printed p.4 (PDF p.9, page image), A.6.1.2 beta printed p.8 (PDF p.13), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Pishro-Nik, 4.2.4 Gamma Distribution: integral of x^{alpha-1}e^{-lambda x} over (0,inf) = Gamma(alpha)/lambda^alpha, Gamma(alpha,lambda) PDF integrating to 1 (HTML fetched 2026-10-30), sha256:9e53a37b3665363206e1bd3e0befdf07703b4c70e17da404ee85aee95afb7640 — https://www.probabilitycourse.com/chapter4/4_2_4_Gamma_distribution.php"
    - "Siegrist, 5.8 The Gamma Distribution: MGF 1/(1 - bt)^k for t < 1/b; X1 + X2 gamma with shape k1 + k2 and scale b for independent gammas with common scale b (HTML fetched 2026-10-30) — https://www.randomservices.org/random/special/Gamma.html"
    - "SOA, Tables for Exam C (Fall 2009), A.3.2.1 Gamma M(t) = (1 - theta t)^-alpha, t < 1/theta (PDF p.9); A.3.3.1 Exponential M(t) = (1 - theta t)^-1 and A.5.1.1 Lognormal E[(X ^ x)^k] = exp(k mu + k^2 sigma^2/2) Phi((ln x - mu - k sigma^2)/sigma) + x^k[1 - F(x)] (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Brunner, Exploring the hazard function of the gamma distribution, STA312 Fall 2023, U. Toronto (CC BY-SA), p.12: alpha=1 constant at lambda; alpha>1 increasing and bounded above by lambda; alpha<1 decreasing and bounded below by lambda, sha256:af161497b7e389ccd381754c64741ddf7ef2209e9702094ce9c08906a6572428 — https://utstat.utoronto.ca/~brunner/oldclass/312f23/lectures/312f23Hazardplots.pdf"
    - "Bassan, Kochar & Spizzichino, Some bivariate notions of IFR and DMRL and related properties, J. Appl. Prob. 39 (2002) 533-544, p.535: 'decreasing mean residual life (DMRL), which is implied by IFR', sha256:eb6dc52f07bbbd9498063da405611adb9a7921e1c8246657b9e9473f9d8af706 — https://web.pdx.edu/~kochar/Papers/d_papers/JAP2002.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Gamma.md
---

The **Gamma Distribution** $X \sim \text{Gamma}(\alpha, \theta)$ is a continuous distribution on $(0, \infty)$ with shape $\alpha > 0$ and scale $\theta > 0$. It generalizes the [[Exponential Distribution|exponential]] and models skewed loss severities, aggregate claims and waiting times.

> $$f(x) = \frac{x^{\alpha-1}\,e^{-x/\theta}}{\theta^{\alpha}\,\Gamma(\alpha)}, \quad x > 0$$

> $$E[X] = \alpha\theta$$

> $$\text{Var}(X) = \alpha\theta^2$$

- $\Gamma(\alpha)$ is the gamma function. $\Gamma(\alpha) = (\alpha-1)!$ for integer $\alpha$, and $\Gamma(\alpha+1) = \alpha\,\Gamma(\alpha)$ in general.
- The [[Coefficient of Variation|coefficient of variation]] is $CV = 1/\sqrt{\alpha}$. It depends on the shape alone.
- Special cases: exponential ($\alpha = 1$) and [[Chi-Squared Distribution|chi-squared]] ($\alpha = n/2$, $\theta = 2$).

> [!idea] The idea
> A gamma with whole-number shape $\alpha$ is the sum of $\alpha$ independent exponentials with mean $\theta$, such as the wait for the $\alpha$-th claim. Adding pieces makes the total larger and less skewed, so the mean and the variance both grow with $\alpha$ while the CV falls like $1/\sqrt{\alpha}$. Other shapes fill in between the whole numbers.

![[Media/Gamma_distribution_pdf.svg|500]]

![[Media/Figures/Gamma.svg|340]]

## Three exponential pieces

A loss is the sum of three independent pieces, each exponential with mean 200. What does the total look like?

The total has mean $3 \times 200 = 600$ and variance $3 \times 200^2 = 120{,}000$, because independent variances add. The total is $\text{Gamma}(3, 200)$.

- The sum of $n$ independent $\text{Exp}(\theta)$ variables follows $\text{Gamma}(n, \theta)$.
- More generally, independent gammas with a common scale add to a gamma with the same scale and shape equal to the sum of the shapes. Independent $\text{Gamma}(1.5, \theta)$ and $\text{Gamma}(2.5, \theta)$ add to $\text{Gamma}(4, \theta)$.

> $$\sum X_i \sim \text{Gamma}\Big(\sum \alpha_i,\ \theta\Big)$$

The moment generating function shows why. It is the same expression for every shape $\alpha > 0$, whole number or not, and a product of these with a common $\theta$ adds the exponents.

> $$M_X(t) = E\left[e^{tX}\right] = (1 - \theta t)^{-\alpha}, \quad t < \frac{1}{\theta}$$

- The exponential's $1/(1 - \theta t)$ is the case $\alpha = 1$.
- The result needs the scales to match. Gammas with different scales do not add to a gamma.

## The density and its constant

For the running example, $\Gamma(3) = 2! = 2$, so the density is $x^2 e^{-x/200}/(2 \cdot 200^3)$.

The constant comes from one integral, which every gamma question can lean on.

> $$\int_0^\infty x^{\alpha-1}e^{-x/\theta}\,dx = \theta^{\alpha}\,\Gamma(\alpha)$$

This identity also recognises a gamma from its kernel. A density known only up to a constant, $f(x) = c\,x^{a}e^{-x/b}$ for $x > 0$, is $\text{Gamma}(\alpha = a + 1,\ \theta = b)$. Match it to the kernel $x^{\alpha-1}e^{-x/\theta}$.

- The moments then come straight from $E[X] = \alpha\theta$ and $\text{Var}(X) = \alpha\theta^2$.
- The constant need not be computed. It can only be $c = 1/(\theta^{\alpha}\Gamma(\alpha))$.

## Tail probabilities for a whole-number shape

What is the probability that the loss exceeds 600?

Think of the three pieces as waits between events of a [[Poisson Process|Poisson process]] with one event per 200. The total exceeds 600 exactly when fewer than 3 events have happened by 600. That count is [[Poisson Distribution|Poisson]] with mean $600/200 = 3$.

> $$P(X > x) = \sum_{k=0}^{\alpha-1} \frac{e^{-x/\theta}(x/\theta)^k}{k!}$$

| $x$ | $x/\theta$ | $P(X > x)$ |
|---|---|---|
| 200 | 1 | 0.9197 |
| 600 | 3 | 0.4232 |
| 1,000 | 5 | 0.1247 |

- At $x = 600$, the sum is $e^{-3}(1 + 3 + 4.5) = 8.5\,e^{-3} \approx 0.4232$.
- The same formula follows from integrating the density by parts $\alpha$ times. The Poisson reading saves that work.
- The formula holds only for **integer** $\alpha$. For other shapes the CDF has no closed form.

## Recovering the parameters

A question may give the mean and the variance instead of $\alpha$ and $\theta$. Dividing the variance by the mean strips out $\alpha$.

> $$\theta = \frac{\text{Var}(X)}{E[X]}$$

- For the running example, $120{,}000/600 = 200$, and then $\alpha = 600/200 = 3$.
- This ratio trick belongs to the gamma, including the exponential. For a uniform on $(0, \theta)$, variance over mean is $\theta/6$.

> [!trap] Scale or rate
> Some texts parameterize by **rate** $\beta = 1/\theta$, giving $E[X] = \alpha/\beta$. Read which one a problem uses before substituting. A density written with $e^{-0.01x}$ has scale 100, not 0.01.

## How the tail behaves

The [[Hazard Rate|hazard rate]] $h(x) = f(x)/S(x)$ measures how likely $X$ is to fall just past $x$, given that it exceeds $x$.

- With $\alpha = 1$, the hazard rate is constant at $1/\theta$. That is the exponential.
- A gamma with shape $\alpha > 1$ has an increasing hazard rate bounded above by $1/\theta$. The running example's hazard rises from about 0.0004 at $x = 100$ toward $1/200 = 0.005$.
- A gamma with shape $\alpha < 1$ has a decreasing hazard rate bounded below by $1/\theta$.
- An increasing hazard rate implies a decreasing [[Mean Excess Loss|mean excess loss]]. So for $\alpha > 1$ the expected excess over a threshold falls as the threshold rises.

## On other exams

The gamma comes back on later exams in two roles.

- **MAS-II** uses it as the [[Conjugate Prior|conjugate prior]] for a Poisson mean. With a $\text{Gamma}(\alpha, \theta)$ prior and $n$ observed counts totalling $\sum x_i$, the posterior is $\text{Gamma}\big(\alpha + \sum x_i,\ \theta/(1 + n\theta)\big)$. See [[Bayesian Credibility]].
- **MAS-I** uses it as a severity distribution in generalized linear models. Its variance is proportional to the square of its mean, $\text{Var}(X) = \mu^2/\alpha$. See [[Exponential Family]].

## Try it

> [!example]- Mean and Variance of Claim Severity {Example}
> Individual losses follow $\text{Gamma}(\alpha = 4, \theta = 250)$. Find $E[X]$, $\text{Var}(X)$, and the coefficient of variation.
>
> > [!answer]-
> > **Plan:** apply the moment formulas, then divide the standard deviation by the mean.
> > $$E[X] = \alpha\theta = 4 \times 250 = 1{,}000$$
> > $$\text{Var}(X) = \alpha\theta^2 = 4 \times 250^2 = 250{,}000$$
> > $$CV = \frac{\sqrt{250{,}000}}{1{,}000} = 0.50$$
> > The CV is $1/\sqrt{4}$, whatever the scale.

> [!example]- A Density Known up to a Constant {Example}
> A loss has density $f(x) = c\,x^{3}e^{-x/2}$ for $x > 0$. Find $E[X]$ and $\text{Var}(X)$.
>
> > [!answer]-
> > **Plan:** match the density to the gamma kernel $x^{\alpha - 1}e^{-x/\theta}$.
> >
> > The power is $3 = \alpha - 1$, so $\alpha = 4$, and $\theta = 2$. The loss is $\text{Gamma}(4, 2)$.
> > $$E[X] = 4 \times 2 = 8$$
> > $$\text{Var}(X) = 4 \times 2^2 = 16$$
> > The constant is $c = 1/(2^4 \cdot 3!) = 1/96$, but the moments never needed it.

> [!example]- From Moments to a Tail Probability {Example}
> A loss severity is gamma with mean 900 and variance 270,000. Find the probability that a loss exceeds 600.
>
> > [!answer]-
> > **Plan:** recover $\theta$ and $\alpha$ from the moments, then use the Poisson sum for a whole-number shape.
> > $$
> > \begin{align*}
> > \theta &= \frac{270{,}000}{900} = 300 \\
> > \alpha &= \frac{900}{300} = 3
> > \end{align*}
> > $$
> > With $x/\theta = 600/300 = 2$:
> > $$
> > \begin{align*}
> > P(X > 600) &= e^{-2}\left(1 + 2 + \frac{2^2}{2}\right) \\
> >            &= 5e^{-2} \\
> >            &\approx 0.677
> > \end{align*}
> > $$
> > "The loss exceeds 600" is the same event as "fewer than 3 events of a rate-1/300 Poisson process by 600". That count is Poisson with mean 2.

> [!warning]- Exam traps
> - **Scale or rate.** $e^{-x/\theta}$ has scale $\theta$, and $e^{-\beta x}$ has rate $\beta$. Reading a scale as a rate gives a mean of $\alpha/\theta$ instead of $\alpha\theta$.
> - **Off by one in the shape.** The kernel $x^{a}e^{-x/b}$ has shape $a + 1$, not $a$.
> - **Adding gammas with different scales.** Shapes add only when the scales match.
> - **The Poisson sum for a fractional shape.** The finite sum for $P(X > x)$ needs a whole-number $\alpha$.
> - **Stopping the Poisson sum one term late.** $P(X > x)$ sums $k = 0$ to $\alpha - 1$, the counts that fall short of $\alpha$.
