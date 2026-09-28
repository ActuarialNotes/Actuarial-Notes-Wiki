---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:67bdc7e2f3128c1f9967162cb7794e771f6b4b91018493e0a652ee9938bce46e
  sources:
    - "SOA, Tables for Exam C (Fall 2009), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; A.1 Introduction printed p.1 (PDF p.6), A.2.3.1 Pareto printed p.3 (PDF p.8), A.3.2.1 Gamma printed p.4 (PDF p.9), A.3.3.1 Exponential printed p.6 (PDF p.11), A.6.1.2 beta printed p.8 (PDF p.13)"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.2 p.207 (PDF p.215) and 7.2 pp.296, 300 (PDF pp.304, 308), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Exam P Sample Solutions (Aug 2026 revision), Q390 (PDF p.109) and Q507 (PDF pp.139-140), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
  open_findings: 1
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
- The sum of $n$ independent $\text{Exp}(\theta)$ variables follows $\text{Gamma}(n, \theta)$
- $\Gamma(\alpha) = (\alpha-1)!$ for integer $\alpha$, and $\Gamma(\alpha+1) = \alpha\,\Gamma(\alpha)$ in general — so the density is elementary whenever $\alpha$ is a whole number
- For **integer** $\alpha$ the CDF has a closed form via the [[Poisson Distribution|Poisson]] link (integrating the density by parts $\alpha$ times):

> $$P(X > x) = \sum_{k=0}^{\alpha-1} \frac{e^{-x/\theta}(x/\theta)^k}{k!}$$

- Some texts parameterize by **rate** $\beta = 1/\theta$, giving $E[X] = \alpha/\beta$. Read which one a problem uses before substituting.

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
> > So $X \sim \text{Gamma}(2, 400)$. This ratio trick — variance over mean gives the scale — works for any scale family and is faster than solving the two equations simultaneously.
