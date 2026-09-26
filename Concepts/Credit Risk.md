---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:99d02b0566eb71a359ebe3468265584e8d3a046ab15221aa651955ec6b34c098
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Credit Risk.md
---

**Credit Risk** is the risk of loss because a counterparty fails to pay what it owes (**default**) or because its credit quality deteriorates, lowering the value of the claim before any default occurs. An insurer's credit exposures are its bonds and loans, structured securities, [[Reinsurance Credit Risk|reinsurance recoverables]], premium receivables from agents and brokers, and derivative counterparties.

> $$E[\text{Credit loss}] = PD \times LGD \times EAD$$

- $PD$ is the probability of default over the horizon, $LGD = 1 - \text{recovery rate}$ the share of the exposure lost if default occurs, and $EAD$ the exposure at default, net of any collateral.
- **Spreads pay for more than expected loss.** The annual expected loss on a bond is roughly $PD \times LGD$, but observed credit spreads are several times larger: investors are also paid for defaults that cluster in recessions (systematic risk), for illiquidity, and for downgrade risk.
- **Prepayment** is the opposite behaviour by a borrower — paying back early, usually when rates fall — and is grouped with default because it also changes the cash flows the insurer receives; see [[Prepayment Risk]].
- **Loss before default.** A downgrade widens the spread and cuts the price by about $-D \times \Delta s$ for spread duration $D$. [[Credit Rating Migration]] matrices model movements between grades, so a portfolio's credit risk includes mark-to-market loss, not only default.
- **Correlation is the portfolio risk.** Defaults cluster, so the loss distribution of a credit portfolio is skewed with a heavy tail whose size is set by **default correlation**. This is the central lesson of [[Structured Finance]]: senior tranches of pooled credit are safe only while defaults stay close to independent, and their losses fall in exactly the economic states where investors are worst off.
- **Managing it.** Diversification and concentration limits by issuer, sector and reinsurer ([[Concentration Risk]]); rating floors; collateral; credit derivatives. Regulators charge capital for it — the U.S. [[Risk-Based Capital]] formula and, in Canada, the [[Credit Risk Margin]] of the [[MCT]]. Together with [[Interest Rate Risk]] it is the main [[Financial Risk|financial risk]] of a bond portfolio.

> [!example]- Expected Loss versus Spread on a Corporate Bond {Example}
> An insurer holds $\$50$M of BBB corporate bonds. The one-year probability of default is $0.25\%$, the expected recovery $40\%$, and the bonds yield $1.30\%$ over Treasuries. Compare the expected credit loss with the spread earned.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[\text{loss}] &= 0.0025 \times 0.60 \times \$50\text{M} \\
> > &= \$75{,}000 \\
> > \text{Spread income} &= 0.0130 \times \$50\text{M} \\
> > &= \$650{,}000
> > \end{align*}
> > $$
> >
> > The expected loss is $0.15\%$ a year, so $\$575{,}000$ of the spread is compensation for bearing credit risk — systematic default, downgrade and illiquidity — rather than for expected default. Booking the full spread as profit overstates the portfolio's risk-adjusted return.

> [!example]- Default Correlation and the Joint Tail {Example}
> Two counterparties each have a one-year default probability of $5\%$. Find the probability that both default if defaults are (a) independent, (b) correlated with default correlation $0.2$. Also find the distribution of the number of defaults.
>
> > [!answer]-
> > For two default indicators with common probability $p$ and correlation $\rho$, $P(\text{both}) = p^2 + \rho\,p(1-p)$.
> >
> > $$
> > \begin{align*}
> > P_{\text{indep}}(\text{both}) &= 0.05^2 \\
> > &= 0.25\% \\
> > P_{\rho}(\text{both}) &= 0.0025 + 0.2(0.05)(0.95) \\
> > &= 1.20\%
> > \end{align*}
> > $$
> >
> > Number of defaults:
> >
> > - Independent: $0$ w.p. $90.25\%$, $1$ w.p. $9.50\%$, $2$ w.p. $0.25\%$
> > - Correlated: $0$ w.p. $91.2\%$, $1$ w.p. $7.6\%$, $2$ w.p. $1.2\%$
> >
> > The expected number of defaults is $0.10$ in both cases, but the chance of losing both counterparties is almost five times higher. Expected loss is blind to correlation; the tail — what capital, a senior tranche, or a two-reinsurer panel is exposed to — is not.
