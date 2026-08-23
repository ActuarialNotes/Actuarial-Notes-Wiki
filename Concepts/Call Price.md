---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:71350d2cb5117618c291b3750105fb0f2fc9176c6c19a76ad473c7c05a78a6a1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Call Price.md
---

The **call price** is the price at which an issuer may redeem a [[Callable Bond]] before maturity on a specified call date. The call price is typically set at or above [[Face Value]] to compensate the bondholder for the loss of future coupon income.

- The difference between the call price and the face value is the **[[Call Premium]]**:

> $$\text{Call Premium} = \text{Call Price} - \text{Face Value}$$

- In bond pricing problems, the call price replaces the [[Redemption Value]] $C$ in the bond formula when the issuer is assumed to call the bond:

> $$P_{\text{call}} = Fr \cdot a_{\overline{n_c}|j} + C_{\text{call}} \cdot v^{n_c}$$

- Where $n_c$ is the number of periods until the call date.

![[Media/Figures/Call_Price.svg|340]]

> [!example]- Bond Priced to a Call {Example}
> A $1{,}000$ face bond with 8% annual coupons can be called in 3 years at $1{,}050$. Find the price to yield 6%.
>
> > [!answer]-
> > $P = 80 \cdot a_{\overline{3}|6\%} + 1050(1.06)^{-3} = 80(2.6730) + 1050(0.8396) = 213.84 + 881.58 = 1095.42$
