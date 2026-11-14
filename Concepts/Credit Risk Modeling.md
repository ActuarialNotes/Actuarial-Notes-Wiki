---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7b729c253adec85f3ab1beac3fca8962f666594e9236b8837504e3a8e15aaefb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Credit Risk Modeling.md
---

**Credit Risk Modeling** is the quantitative measurement of [[Credit Risk|default risk]] for a single borrower and for a portfolio of borrowers. Structural models explain default by the firm's balance sheet, reduced-form models treat default as a random event with a [[Hazard Rate|hazard rate]], and portfolio models add the correlation between borrowers' defaults.

## Structural models

In Merton's model, the firm's assets $V$ follow a geometric Brownian motion with volatility $\sigma$, and its debt is one zero-coupon bond with face $D$ due at time $T$. The shareholders receive $\max(V_T - D, 0)$, so equity is a [[European Option|European call]] on the assets, priced by [[Black-Scholes Model|Black-Scholes]]. The value of the equity today is

> $$E_0 = V_0\,N(d_1) - D\,e^{-rT}N(d_2)$$

- $V_0$ is the value of the assets today.
- $r$ is the risk-free force of interest.
- $N$ is the standard normal distribution function.

where $d_2$ is

> $$d_2 = \frac{\ln(V_0/D) + (r - \tfrac{1}{2}\sigma^2)T}{\sigma\sqrt{T}}$$

and $d_1$ is

> $$d_1 = d_2 + \sigma\sqrt{T}$$

The debt is worth $V_0 - E_0$, which is a risk-free bond less a put on the assets. The risk-neutral probability of default is $N(-d_2)$.

Replacing $r$ by the assets' real-world drift $\mu$ in $d_2$ gives the distance to default, $DD$. It is the number of standard deviations the assets sit above the default point, and the real-world default probability is $N(-DD)$. Commercial versions such as Moody's KMV infer $V_0$ and $\sigma$ from the equity price and its volatility, and map $DD$ to default frequencies observed in data rather than to the normal distribution.

> [!example]- What are this firm's equity value, credit spread and default probabilities? {Example}
> A firm has assets worth 100 with volatility 20% and a single zero-coupon debt of face 70 due in one year. The risk-free force of interest is 4%, and the assets' expected return is 9%.
>
> > [!answer]-
> > - $\ln(100/70) = 0.3567$ and $r - \tfrac{1}{2}\sigma^2 = 0.04 - 0.02 = 0.02$, so $d_2 = 0.3767/0.20 = 1.8834$.
> > - $d_1 = 1.8834 + 0.20 = 2.0834$.
> > - $N(d_1) = 0.98139$ and $N(d_2) = 0.97018$, and $70e^{-0.04} = 67.255$.
> > - The equity is worth $E_0 = 98.139 - 67.255(0.97018) = 32.89$.
> > - The debt is worth $100 - 32.89 = 67.11$.
> > - The debt's yield is $\ln(70/67.11) = 4.216\%$, a credit spread of about 22 basis points.
> > - The risk-neutral probability of default is $N(-1.8834) = 2.98\%$.
> > - With the drift of 9%, $DD = (0.3567 + 0.07)/0.20 = 2.1334$, and the real-world probability of default is $N(-2.1334) = 1.64\%$.
> > - The real-world probability is lower than the risk-neutral one because investors demand a premium for bearing default risk.
> > - A 22-basis-point spread is small for a firm with a 1.6% default probability, which shows the model's tendency to understate short-term spreads.

## Reduced-form models

In a reduced-form model, default arrives at the first jump of a Poisson process with intensity $\lambda$, the hazard rate, which may vary over time or with the economy. With a constant $\lambda$, the probability that the firm survives to time $t$ is

> $$S(t) = e^{-\lambda t}$$

This is the survival function of an [[Exponential Distribution|exponential]] lifetime. A holder who receives a fraction $R$ of value on default needs a credit spread of about

> $$s \approx \lambda\,(1 - R)$$

- $R$ is the recovery rate, so $1 - R$ is the loss given default.

A hazard rate can therefore be implied from a spread or a credit default swap premium, by dividing by $1 - R$, and used to price other claims on the same firm. A probability implied from a market price is risk-neutral.

> [!example]- A five-year bond trades at a spread of 180 basis points with 40% recovery. What is the probability its issuer defaults within five years? {Example}
> - The implied hazard rate is $\lambda = 0.0180/(1 - 0.40) = 3.0\%$.
> - The five-year survival probability is $S(5) = e^{-0.15} = 0.8607$.
> - The probability of default within five years is $1 - 0.8607 = 13.93\%$.
> - This is a risk-neutral probability, since it comes from a market price, so it is higher than the issuer's historical default rate by the risk premium in the spread.

Structural models link default to the balance sheet and explain why equity and credit move together. With continuous asset paths, they give spreads near zero at short terms, well below those observed. Reduced-form models fit market spreads at every term, but they say nothing about why the firm defaults.

## Portfolio models

In the one-factor Gaussian (Vasicek) model, borrower $i$ defaults when $\sqrt{\rho}\,Z + \sqrt{1-\rho}\,\varepsilon_i < N^{-1}(p)$. The common factor $Z$ and the idiosyncratic $\varepsilon_i$ are independent standard normals, $p$ is each borrower's default probability and $\rho$ is the asset correlation. Given $Z = z$, defaults are independent, each with probability

> $$p(z) = N\!\left(\frac{N^{-1}(p) - \sqrt{\rho}\,z}{\sqrt{1 - \rho}}\right)$$

In a large pool, the loss rate is $p(z) \times LGD$, where $LGD$ is the loss given default. Setting $z = -N^{-1}(\alpha)$ gives the loss at confidence level $\alpha$. This is the Vasicek formula behind the Basel internal ratings-based capital charge.

Expected loss is $p \times LGD$ per unit of exposure whatever the correlation, but $\rho$ sets the tail. With $\rho = 0$ a large pool's loss is almost certain to equal its expected loss, while a higher $\rho$ makes years of many defaults more likely. The same model, as the Gaussian copula, priced the [[Structured Finance|tranches]] of CDOs.

> [!example]- What are this portfolio's loss at the 99.9% confidence level and its expected loss? {Example}
> An insurer holds a $\$500$ million portfolio of many small loans. Each has a one-year default probability of 2%, an $LGD$ of 45% and an asset correlation of 0.15.
>
> > [!answer]-
> > - $N^{-1}(0.02) = -2.0537$ and $N^{-1}(0.999) = 3.0902$.
> > - The numerator is $-2.0537 + \sqrt{0.15}(3.0902) = -0.8569$, and dividing by $\sqrt{0.85}$ gives $-0.9294$.
> > - The default rate at 99.9% is $N(-0.9294) = 17.63\%$.
> > - The loss at 99.9% is $500 \times 0.45 \times 0.1763 = \$39.67$ million.
> > - The expected loss is $500 \times 0.45 \times 0.02 = \$4.50$ million.
> > - The 1-in-1,000 loss is almost nine times the expected loss. The unexpected loss of about $\$35.2$ million is what [[Economic Capital|economic capital]] must cover, and it comes from the correlation.

## Rating-based models

[[Credit Rating Migration|Rating migration]] matrices give the probabilities of moving between rating grades over a year. They add downgrade losses to default losses, which matters for an insurer that marks bonds to market or holds capital by NAIC designation.

> [!trap] Risk-neutral and real-world default probabilities
> $N(-d_2)$ with the risk-free rate, and a probability implied from a spread, are pricing probabilities. A real-world default probability uses the asset drift $\mu$ in the distance to default, and the two differ by the risk premium.
