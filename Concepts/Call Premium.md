---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:867dc04a457b03f71c0b6b60c61da67fd54227faf439673e3d653cb15fcd119e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Call Premium.md
---

The **call premium** is the amount by which the [[Call Price]] of a [[Callable Bond]] exceeds its [[Face Value]]:

> $$\text{Call Premium} = \text{Call Price} - \text{Face Value}$$

- It compensates the bondholder for giving up future coupon income if the bond is called early.
- The call premium typically declines as the call date approaches maturity, eventually reaching zero at maturity (where call price = face value).
- From the issuer's perspective, the call premium is a cost of the call option. Higher call premiums make bonds more attractive to investors but increase the issuer's redemption cost.

![[Media/Figures/Call_Premium.svg|340]]

> [!example]- Identifying the Call Premium {Example}
> A bond with $1{,}000$ face value is callable at $1{,}030$ after 2 years and at $1{,}015$ after 4 years.
>
> > [!answer]-
> > Call premium at year 2: $1030 - 1000 = 30$.
> > Call premium at year 4: $1015 - 1000 = 15$.
> > The declining call premium schedule gives the issuer an increasing financial incentive to delay calling, while protecting the investor if called early.
