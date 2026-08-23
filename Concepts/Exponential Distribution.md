---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d2bfc9ea20a54d5e1a284bbb7dbaf18b7659436b318b528a36915c724757f087
  sources: []
  open_findings: 0
  log: .verify/Concepts/Exponential Distribution.md
---

The **Exponential Distribution** $X \sim \text{Exp}(\theta)$ is a continuous distribution on $(0, \infty)$ commonly used to model the time between events or the size of insurance losses.

> $$f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0$$
>
> $$\text{where } \theta > 0 = \text{mean (scale parameter)}$$

- $E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$
- Its defining property is **memorylessness**: $P(X > s + t \mid X > s) = P(X > t)$, making it the unique continuous distribution with no aging effect
- A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$. So $E[X \mid X > d] = d + \theta$ and $E[(X-d)_+] = \theta e^{-d/\theta}$ — the two identities most [[Deductible|deductible]] questions reduce to
- Capped at a [[Benefit Limit|limit]] $u$: $E[\min(X,u)] = \theta\left(1 - e^{-u/\theta}\right)$
- Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponential question is a tail probability
- Some texts parameterize by **rate** $\lambda = 1/\theta$, so $f(x) = \lambda e^{-\lambda x}$ and $E[X] = 1/\lambda$. Check which convention a problem uses before substituting

![[Media/Exponential_pdf.svg|500]]

![[Media/Figures/Exponential_Distribution.svg|340]]

> [!example]- Probability a Loss Exceeds the Deductible {Example}
> Ground-up losses follow $X \sim \text{Exp}(\theta = 500)$. A deductible of $d = 300$ applies. What proportion of losses result in a claim payment?
>
> > [!answer]-
> > A payment is triggered only when $X > 300$:
> > $$P(X > 300) = 1 - F(300) = e^{-300/500} = e^{-0.6} \approx 0.5488$$
> > About 54.9% of losses exceed the deductible and generate a payment.

> [!example]- Expected Payment per Loss vs. per Payment {Example}
> Losses are $X \sim \text{Exp}(\theta = 500)$ with a deductible $d = 300$. Find the average payment across **all** losses, and the average payment across only those losses that produce a payment.
>
> > [!answer]-
> > Averaged over all losses (zeros included):
> > $$
> > \begin{align*}
> > E[(X - 300)_+] &= \theta e^{-d/\theta} \\
> >                &= 500\,e^{-0.6} \\
> >                &\approx 274.4
> > \end{align*}
> > $$
> > Averaged over payments only, condition on $X > 300$ and use memorylessness — the excess is again $\text{Exp}(500)$:
> > $$E[X - 300 \mid X > 300] = \theta = 500$$
> > The two differ by the factor $P(X > 300) = e^{-0.6} \approx 0.5488$, since $274.4 = 0.5488 \times 500$. Read carefully whether a question asks *per loss* or *per payment* — it is the most common way to lose a mark on this material.

> [!example]- Combining a Deductible and a Limit {Example}
> Losses are $X \sim \text{Exp}(\theta = 1000)$. A policy pays the excess over a deductible of 200, capped at a maximum payment of 800. Find the expected payment per loss.
>
> > [!answer]-
> > The payment is $Y = \min\bigl((X-200)_+,\ 800\bigr)$, which pays out only for $200 < X < 1000$ and pays a flat 800 above that. Write it as a difference of two excess-loss terms:
> > $$
> > \begin{align*}
> > E[Y] &= E[(X-200)_+] - E[(X-1000)_+] \\
> >      &= 1000\,e^{-0.2} - 1000\,e^{-1.0} \\
> >      &= 818.73 - 367.88 \\
> >      &\approx 450.85
> > \end{align*}
> > $$
> > Layering as a difference of excess-loss expectations avoids splitting the integral into three pieces, and works for any severity distribution — not just the exponential.
