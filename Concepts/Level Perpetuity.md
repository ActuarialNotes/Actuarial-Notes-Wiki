---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c6b01c6664aef8623f691057623b81da14502db20cea569fb975a07e6ec400b6
  sources: []
  open_findings: 0
  log: .verify/Concepts/Level Perpetuity.md
---

A **level perpetuity** is a [[Perpetuity]] with equal payments at every period, continuing forever. The present value of a perpetuity-immediate (payments at end of period) paying $1$ per period at rate $i$:

> $$a_{\overline{\infty}|} = \frac{1}{i}$$

- For a perpetuity-due (payments at start of period):

> $$\ddot{a}_{\overline{\infty}|} = \frac{1}{d}$$

> $$= \frac{1+i}{i}$$

- The present value formula follows from the limit of the finite annuity as $n \to \infty$, since $v^n \to 0$.
- Level perpetuities model preferred stock dividends, ground rents, and endowments.

![[Media/Figures/Level_Perpetuity.svg|340]]

> [!example]- Endowment Fund {Example}
> A university endowment must pay $50{,}000$ annually (end of year) forever. At $5\%$ effective annual interest, how large must the endowment be?
>
> > [!answer]-
> > $$\text{PV} = \frac{50{,}000}{0.05} = 1{,}000{,}000$$
