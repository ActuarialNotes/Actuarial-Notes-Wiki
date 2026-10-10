---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1a05791126203afacdb818d00d356fb597b7ef37dc1df4c508fb177463493b1a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Credit Risk Modeling.md
---

**Credit Risk Modeling** is the quantitative measurement of [[Credit Risk|default risk]] for a single borrower and for a portfolio of borrowers. **Structural models**, led by Merton's, explain default as the firm's asset value falling below its debt; **reduced-form models** treat default as the first jump of a process with a [[Hazard Rate|hazard rate]] and calibrate that rate to credit spreads; and **portfolio models**, such as the one-factor Gaussian (Vasicek) model, add default correlation to give the distribution of losses across many names.

> $$E_0 = V_0\,N(d_1) - D\,e^{-rT}N(d_2)$$

> $$d_2 = \frac{\ln(V_0/D) + (r - \tfrac{1}{2}\sigma^2)T}{\sigma\sqrt{T}}$$

> $$d_1 = d_2 + \sigma\sqrt{T}$$

> $$S(t) = e^{-\lambda t}$$

> $$s \approx \lambda\,(1 - R)$$

> $$p(z) = N\!\left(\frac{N^{-1}(p) - \sqrt{\rho}\,z}{\sqrt{1 - \rho}}\right)$$

- **Merton's model:** The firm's assets $V$ follow a geometric Brownian motion with volatility $\sigma$, and its debt is one zero-coupon bond with face $D$ due at $T$. The shareholders receive $\max(V_T - D, 0)$, so equity is a [[European Option|European call]] on the assets, priced by [[Black-Scholes Model|Black-Scholes]]. The debt is worth $V_0 - E_0$, which is a risk-free bond less a put on the assets. The risk-neutral probability of default is $N(-d_2)$.
- **Distance to default:** Replacing $r$ by the assets' real-world drift $\mu$ in $d_2$ gives the distance to default, $DD$, the number of standard deviations the assets sit above the default point, and the real-world default probability is $N(-DD)$. Commercial versions such as Moody's KMV map $DD$ to default frequencies observed in data rather than the normal distribution, and infer $V_0$ and $\sigma$ from the equity price and its volatility.
- **Reduced-form models:** Default arrives at the first jump of a Poisson process with intensity $\lambda$, which may vary over time or with the economy. With constant $\lambda$, the survival probability is $S(t) = e^{-\lambda t}$, as in an [[Exponential Distribution|exponential]] lifetime. A holder who receives a fraction $R$ of value on default needs a spread of about $\lambda(1 - R)$, so a hazard rate can be implied from a spread or a credit default swap premium and used to price other claims on the same firm.
- **Comparing the two:** Structural models link default to the balance sheet and explain why equity and credit move together, but with continuous asset paths they give spreads near zero at short terms, well below those observed. Reduced-form models fit market spreads at every term, but they say nothing about why the firm defaults.
- **Portfolio models:** In the one-factor Gaussian model, each borrower defaults when $\sqrt{\rho}\,Z + \sqrt{1-\rho}\,\varepsilon_i < N^{-1}(p)$, with a common factor $Z$ and an idiosyncratic $\varepsilon_i$, both standard normal. Conditional on $Z = z$, defaults are independent with probability $p(z)$. In a large pool, the loss rate is $p(z) \times LGD$, and setting $z = -N^{-1}(\alpha)$ gives the loss at confidence $\alpha$; this is the Vasicek formula behind the Basel internal ratings-based capital charge.
- **Default correlation:** The parameter $\rho$ is the asset correlation. It barely moves expected loss, but it sets the tail: with $\rho = 0$ a large pool's loss is almost certain to equal its expected loss, while a higher $\rho$ makes years of many defaults more likely. The same model, as the Gaussian copula, priced the [[Structured Finance|tranches]] of CDOs.
- **Rating-based models:** [[Credit Rating Migration|Rating migration]] matrices give the probabilities of moving between grades over a year. They add downgrade losses to default losses, which matters for an insurer that marks bonds to market or holds capital by NAIC designation.

> [!example]- Merton Default Probability and Spread {Example}
> A firm has assets worth 100 with volatility 20% and a single zero-coupon debt of face 70 due in one year. The risk-free force of interest is 4%, and the assets' expected return is 9%. Find the value of the equity and the debt, the credit spread, the risk-neutral probability of default, and the real-world distance to default.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > d_2 &= \frac{\ln(100/70) + 0.04 - 0.02}{0.20} \\
> > &= 1.8834 \\
> > d_1 &= 1.8834 + 0.20 \\
> > &= 2.0834 \\
> > E_0 &= 100(0.98139) - 70e^{-0.04}(0.97018) \\
> > &= 32.89 \\
> > D_0 &= 100 - 32.89 \\
> > &= 67.11
> > \end{align*}
> > $$
> > The debt's yield is $\ln(70/67.11) = 4.216\%$, a spread of about 22 basis points, and the risk-neutral probability of default is $N(-1.8834) = 2.98\%$. With the real-world drift:
> > $$
> > \begin{align*}
> > DD &= \frac{\ln(100/70) + 0.09 - 0.02}{0.20} \\
> > &= 2.1334 \\
> > PD &= N(-2.1334) \\
> > &= 1.64\%
> > \end{align*}
> > $$
> > The real-world probability is lower than the risk-neutral one because investors demand a premium for bearing default risk. The 22-basis-point spread is small for a firm with a 1.6% default probability, which illustrates the model's tendency to understate short-term spreads.

> [!example]- Hazard Rate Implied by a Spread {Example}
> A five-year BB bond trades at a spread of 180 basis points, and the market assumes a 40% recovery. Find the implied hazard rate and the probability that the issuer defaults within five years.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \lambda &= \frac{0.0180}{1 - 0.40} \\
> > &= 3.0\% \\
> > S(5) &= e^{-0.030 \times 5} \\
> > &= 0.8607 \\
> > P(\tau \le 5) &= 1 - 0.8607 \\
> > &= 13.93\%
> > \end{align*}
> > $$
> > This is a risk-neutral probability, since it comes from a market price. Historical BB default rates are lower, and the gap is the risk premium in the spread.

> [!example]- Vasicek Loss at the 99.9th Percentile {Example}
> An insurer holds a \$500 million portfolio of many small loans, each with a one-year default probability of 2%, an LGD of 45% and an asset correlation of 0.15. Find the default rate and loss at the 99.9% confidence level, and compare them with the expected loss.
>
> > [!answer]-
> > Use $N^{-1}(0.02) = -2.0537$ and $N^{-1}(0.999) = 3.0902$.
> > $$
> > \begin{align*}
> > p_{99.9} &= N\!\left(\frac{-2.0537 + \sqrt{0.15}(3.0902)}{\sqrt{0.85}}\right) \\
> > &= N(-0.9294) \\
> > &= 17.63\% \\
> > L_{99.9} &= 500 \times 0.45 \times 0.1763 \\
> > &= 39.67 \\
> > EL &= 500 \times 0.45 \times 0.02 \\
> > &= 4.50
> > \end{align*}
> > $$
> > In millions, the 1-in-1,000 loss is \$39.7 million, almost nine times the expected loss of \$4.5 million. The unexpected loss of about \$35.2 million is what [[Economic Capital|economic capital]] must cover, and it comes entirely from the correlation: with $\rho = 0$ a large pool would lose close to \$4.5 million every year.

> [!tip]- How it appears on the exam
> - **INV-101:** Learning outcome 3c asks the candidate to understand, evaluate and apply credit risk modeling techniques, from chapter 12 of Hardy and Saunders's *Quantitative Enterprise Risk Management* and chapters 3 and 5 of Duffie and Singleton. Outcomes 3a and 3b, from Bouteille and Coogan-Pushner, cover credit analysis and the measurement of default risk.
> - **Calculations:** Questions ask for a Merton default probability, equity value or spread from given asset value, debt and volatility; for a hazard rate implied by a spread and recovery, with survival probabilities; or for a portfolio loss quantile under the one-factor model.
> - **Written answers:** Questions ask candidates to compare structural and reduced-form models, to explain why Merton spreads are too low at short terms, or to describe how default correlation changes a portfolio's or a tranche's loss distribution.

> [!warning]- Exam traps
> - **Risk-neutral versus real-world:** $N(-d_2)$ with the risk-free rate is a pricing probability. Real-world default probabilities use the asset drift $\mu$ in the distance to default, and those from spreads are risk-neutral too, so the two differ by a risk premium.
> - **Spread uses LGD:** The hazard rate is the spread divided by $1 - R$, not by $R$, and not the spread itself. Ignoring recovery understates $\lambda$ by the factor $1 - R$.
> - **Sign of the factor:** In the Vasicek formula, the stressed default rate uses $+\sqrt{\rho}\,N^{-1}(\alpha)$ in the numerator. Using a minus sign gives a default rate below the average, the best case rather than the worst.
> - **Correlation is not in expected loss:** Expected loss is $p \times LGD \times EAD$ whatever the correlation. Correlation changes only the shape of the distribution, so it matters for capital, tail measures and senior tranches, not for the mean.
