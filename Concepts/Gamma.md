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

The **Gamma Distribution** $X \sim \text{Gamma}(\alpha, \theta)$ is a flexible continuous distribution on $(0, \infty)$ generalizing the exponential, used to model skewed loss severities and aggregate claims.

> $$f(x) = \frac{x^{\alpha-1}\,e^{-x/\theta}}{\theta^{\alpha}\,\Gamma(\alpha)}$$
>
> $$x > 0$$
>
> $$\text{where } \alpha > 0 = \text{shape},\; \theta > 0 = \text{scale}$$

- $E[X] = \alpha\theta$, $\text{Var}(X) = \alpha\theta^2$, and coefficient of variation $CV = 1/\sqrt{\alpha}$
- Special cases: exponential ($\alpha = 1$) and chi-squared ($\alpha = n/2$, $\theta = 2$)
- **Moment generating function.** The gamma MGF is $M(t) = (1 - \theta t)^{-\alpha}$ for $t < 1/\theta$, for every shape $\alpha > 0$, whole number or not; the exponential's $1/(1 - \theta t)$ is the case $\alpha = 1$.

> $$M_X(t) = E\left[e^{tX}\right] = (1 - \theta t)^{-\alpha}, \qquad t < \frac{1}{\theta}$$

- **Sums with a common scale.** The sum of independent gamma random variables sharing a common scale parameter is gamma with the same scale and shape equal to the sum of the shapes: if $X_i \sim \text{Gamma}(\alpha_i, \theta)$ are independent, $\sum X_i \sim \text{Gamma}(\sum \alpha_i, \theta)$, because the product of the MGFs is $(1 - \theta t)^{-\sum \alpha_i}$. For instance, independent $\text{Gamma}(1.5, \theta)$ and $\text{Gamma}(2.5, \theta)$ add to $\text{Gamma}(4, \theta)$. The result needs the scales to match.
- In particular, the sum of $n$ independent $\text{Exp}(\theta)$ variables follows $\text{Gamma}(n, \theta)$
- $\Gamma(\alpha) = (\alpha-1)!$ for integer $\alpha$, and $\Gamma(\alpha+1) = \alpha\,\Gamma(\alpha)$ in general — so the density is elementary whenever $\alpha$ is a whole number
- For **integer** $\alpha$ the CDF has a closed form via the [[Poisson Distribution|Poisson]] link (integrating the density by parts $\alpha$ times):

> $$P(X > x) = \sum_{k=0}^{\alpha-1} \frac{e^{-x/\theta}(x/\theta)^k}{k!}$$

- Some texts parameterize by **rate** $\beta = 1/\theta$, giving $E[X] = \alpha/\beta$. Read which one a problem uses before substituting.
- **[[Hazard Rate]] and tail.** The hazard rate $h(x) = f(x)/S(x)$ is constant at $1/\theta$ when $\alpha = 1$ (the exponential). A gamma with shape $\alpha > 1$ has an increasing hazard rate bounded above by $1/\theta$, and one with $\alpha < 1$ a decreasing hazard rate bounded below by $1/\theta$. An increasing hazard rate implies a decreasing [[Mean Excess Loss|mean excess loss]], so for $\alpha > 1$ the expected excess over a threshold falls as the threshold rises.
- **Recognising a gamma from its kernel.** A density known only up to a constant, $f(x) = c\,x^{a}e^{-x/b}$ for $x > 0$, is $\text{Gamma}(\alpha = a + 1,\ \theta = b)$: match it to the kernel $x^{\alpha-1}e^{-x/\theta}$. Its moments then come straight from $E[X] = \alpha\theta$ and $\text{Var}(X) = \alpha\theta^2$, and the constant need not be computed, since it can only be $c = 1/(\theta^{\alpha}\Gamma(\alpha))$:

> $$\int_0^\infty x^{\alpha-1}e^{-x/\theta}\,dx = \theta^{\alpha}\,\Gamma(\alpha)$$

- For instance, $f(x) = c\,x^{3}e^{-x/2}$ on $x > 0$ is $\text{Gamma}(4, 2)$, so $E[X] = 8$ and $\text{Var}(X) = 16$ (and $c = 1/(2^4 \cdot 3!) = 1/96$, never needed)

![[Media/Gamma_distribution_pdf.svg|500]]

![[Media/Figures/Gamma.svg|340]]

> [!example]- Mean and Variance of Aggregate Claim Severity {Example}
> Individual losses follow $\text{Gamma}(\alpha = 4, \theta = 250)$. Find $E[X]$, $\text{Var}(X)$, and the coefficient of variation.
>
> > [!answer]-
> > $$E[X] = \alpha\theta = 4 \times 250 = 1{,}000$$
> > $$\text{Var}(X) = \alpha\theta^2 = 4 \times 250^2 = 250{,}000$$
> > $$CV = \frac{\sqrt{250{,}000}}{1{,}000} = \frac{500}{1{,}000} = 0.50$$

> [!example]- Waiting Time for the Third Claim {Example}
> Claims arrive in a Poisson process at 2 per year, so the waiting time to the 3rd claim is $T \sim \text{Gamma}(\alpha = 3, \theta = 0.5)$ years. Find $P(T > 1)$.
>
> > [!answer]-
> > With integer $\alpha = 3$ and $x/\theta = 1/0.5 = 2$:
> > $$
> > \begin{align*}
> > P(T > 1) &= \sum_{k=0}^{2} \frac{e^{-2}\,2^k}{k!} \\
> >          &= e^{-2}\left(1 + 2 + 2\right) \\
> >          &= 5e^{-2} \\
> >          &\approx 0.677
> > \end{align*}
> > $$
> > The identity is just a restatement: "the 3rd claim has not arrived by time 1" is the same event as "at most 2 claims occurred in $[0,1]$," and that count is $\text{Poisson}(2)$. Recognizing this saves integrating $x^2e^{-2x}$ by parts twice.

> [!example]- Finding Gamma Parameters from Mean and Variance {Example}
> A severity distribution is known to be gamma with mean 800 and variance 320,000. Find $\alpha$ and $\theta$.
>
> > [!answer]-
> > Divide the variance by the mean to strip out $\alpha$:
> > $$
> > \begin{align*}
> > \frac{\text{Var}(X)}{E[X]} &= \frac{\alpha\theta^2}{\alpha\theta} = \theta \\
> > \theta &= \frac{320{,}000}{800} = 400
> > \end{align*}
> > $$
> > Then back-substitute:
> > $$\alpha = \frac{E[X]}{\theta} = \frac{800}{400} = 2$$
> > So $X \sim \text{Gamma}(2, 400)$. The ratio trick — variance over mean gives the scale — is a property of the gamma (exponential included), where $\alpha\theta^2/(\alpha\theta) = \theta$ whatever $\alpha$ is. It does not carry over to other scale families: for a uniform on $(0, \theta)$, variance over mean is $(\theta^2/12)/(\theta/2) = \theta/6$.
