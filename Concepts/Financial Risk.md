---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e8f56e6c35a46d36f1517ac2dc5d95baaa64308de95d024a199de3c9651031df
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Risk.md
---

**Financial Risk** is the risk that an [[Insurer|insurer's]] economic value or earnings fall because of movements in financial markets or the failure of a financial counterparty — [[Interest Rate Risk|interest rates]], equity prices, credit spreads and exchange rates, [[Credit Risk|defaults]], and the inability to sell assets or raise cash when it is needed (liquidity). It sits beside [[Insurance Risk|insurance risk]] and [[Operational Risk|operational risk]] in an insurer's [[Risk Taxonomies|risk taxonomy]].

> $$\frac{\Delta S}{S} = \frac{A}{S}\cdot\frac{\Delta A}{A} - \frac{L}{S}\cdot\frac{\Delta L}{L}$$

- $A$, $L$ and $S = A - L$ are the market values of assets, liabilities and surplus. The identity is why financial risk matters so much to an insurer: a small percentage move in assets or liabilities becomes a large percentage move in surplus, magnified by the leverage ratios $A/S$ and $L/S$ that its [[Capital Structure]] sets.
- **Components.** *Market risk* — [[Interest Rate Risk|interest rate]], equity, spread and currency risk; *credit risk* — bond issuers, [[Reinsurance Credit Risk|reinsurers]], agents and brokers, derivative counterparties; *liquidity risk* — being forced to sell assets at a loss to pay claims.
- **Both sides of the balance sheet.** Financial risk is measured on surplus, not on assets alone. A bond portfolio that loses value when rates rise is partly offset by loss reserves whose present value also falls, and claim inflation moves the liabilities themselves.
- **Measuring it.** A [[Risk Measure]] — standard deviation, VaR, TVaR, expected policyholder deficit — is applied to the distribution of surplus change, usually produced by an economic scenario generator run jointly with insurance risk inside the insurer's [[Risk Modeling|risk model]]. The two interact: a catastrophe can force asset sales into a falling market, and inflation raises claim costs and interest rates together.
- **Why it is managed.** In a frictionless market shareholders could diversify financial risk themselves; [[Insurance Market Imperfections]] make it costly for the insurer to bear, which is the case for [[Financial Risk Management]] and for charging a [[Cost of Capital]] on the capital it consumes.

> [!example]- Leverage Turns an Asset Shock into a Surplus Shock {Example}
> An insurer has assets of $\$1{,}000$M, liabilities of $\$800$M and surplus of $\$200$M. The assets have modified duration $5$ and the liabilities $3$.
>
> Find the percentage change in surplus if (a) assets fall $5\%$ in an equity and credit sell-off with liabilities unchanged, and (b) all yields rise by $1\%$.
>
> > [!answer]-
> > **(a)** $\Delta A = -0.05 \times \$1{,}000\text{M} = -\$50\text{M}$, so $\Delta S / S = -50/200 = -25\%$.
> >
> > **(b)** Using $\Delta X \approx -D \cdot \Delta y \cdot X$ on each side:
> >
> > $$
> > \begin{align*}
> > \Delta A &\approx -(5)(0.01)(\$1{,}000\text{M}) \\
> > &= -\$50\text{M} \\
> > \Delta L &\approx -(3)(0.01)(\$800\text{M}) \\
> > &= -\$24\text{M} \\
> > \Delta S &= -50 - (-24) \\
> > &= -\$26\text{M}
> > \end{align*}
> > $$
> >
> > $\Delta S / S = -26/200 = -13\%$. A $5\%$ fall in assets costs a quarter of surplus, and even a partly matched book loses $13\%$ on a one-point rate move because the asset dollar duration ($5{,}000$) exceeds the liability dollar duration ($2{,}400$).

> [!example]- Same VaR, Different Tails {Example}
> One-year losses ($\$$M) on two investment portfolios:
>
> - **X** (high yield): $0$ w.p. $0.90$; $5$ w.p. $0.06$; $20$ w.p. $0.03$; $60$ w.p. $0.01$.
> - **Y** (investment grade): $0$ w.p. $0.90$; $5$ w.p. $0.06$; $8$ w.p. $0.04$.
>
> Compare the expected loss, $\text{VaR}_{0.95}$ and $\text{TVaR}_{0.95}$.
>
> > [!answer]-
> > **VaR.** For both, $F(0) = 0.90 < 0.95$ and $F(5) = 0.96 \geq 0.95$, so $\text{VaR}_{0.95} = 5$.
> >
> > **TVaR** averages the worst $5\%$ of outcomes. The mass at $5$ extends $0.96 - 0.95 = 0.01$ beyond the $95$th percentile, so $0.01$ of the tail sits at $5$:
> >
> > $$
> > \begin{align*}
> > \text{TVaR}_X &= \frac{0.01(5) + 0.03(20) + 0.01(60)}{0.05} \\
> > &= \frac{1.25}{0.05} \\
> > &= 25 \\
> > \text{TVaR}_Y &= \frac{0.01(5) + 0.04(8)}{0.05} \\
> > &= \frac{0.37}{0.05} \\
> > &= 7.4
> > \end{align*}
> > $$
> >
> > Expected losses are $E[X] = 0.3 + 0.6 + 0.6 = 1.5$ and $E[Y] = 0.3 + 0.32 = 0.62$.
> >
> > VaR calls the two portfolios equally risky; TVaR shows X's tail is more than three times as severe. A capital model built on VaR would let the insurer swap Y for X without holding any more capital.
