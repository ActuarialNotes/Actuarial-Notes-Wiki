---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e0a6f0b1f1c844f3e07f532b11426e6e3733470ee9968e5f44405dfc2eade41b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/IFRS 17 Discount Rates.md
---

**IFRS 17 Discount Rates** are the rates used to convert insurance cash flows to present value. They must reflect the **time value of money, the characteristics of the cash flows, and the liquidity characteristics of the insurance contracts** — and they must be **consistent with observable current market prices** for instruments with similar characteristics. They must **not** reflect factors that do not affect the insurance cash flows, notably the insurer's own credit standing or the performance of its investment portfolio.

> $$r_{\text{IFRS 17}} = r_{\text{risk-free}} + \text{Illiquidity premium}$$

- **Two permitted construction methods**, and candidates should be able to describe both:
  - **Bottom-up** — start from a liquid risk-free yield curve and **add an illiquidity premium** reflecting how illiquid the insurance liability is.
  - **Top-down** — start from the yield on an actual or reference asset portfolio and **remove** the components not relevant to the liability: expected and unexpected credit losses, and any market risk premium not reflecting liquidity.
- **The two need not reconcile**, and IFRS 17 expressly does not require them to. In practice the illiquidity premium is the hardest judgement in either direction, and it is where two insurers' curves most differ.
- **Current, not locked in — with one exception.** The liability is measured at current rates each period. The exception is [[Contractual Service Margin|CSM]] accretion, which uses the rate **locked in at initial recognition**.
- **Where the effects go.** The **unwind** of discount and the effect of **changes in discount rates** are [[Insurance Finance Income or Expenses]], not [[Insurance Service Expenses]]. This is what keeps the [[Insurance Service Result]] free of interest-rate noise, and it is the single most important presentation consequence of discounting.
- **The [[Other Comprehensive Income Option|OCI option]]** lets an insurer put the effect of discount rate *changes* in OCI rather than profit or loss, with the locked-in-rate portion staying in profit. Combined with fair-value-through-OCI assets, this reduces accounting mismatch — but it is an irrevocable choice by portfolio.
- **Canadian practice** is shaped by CIA guidance on constructing the curve and on the illiquidity premium, and by the fact that Canadian P&C liabilities are relatively short — so the discount effect is a few percent of the liability, against far more for a life insurer.

> [!example]- Bottom-Up Versus Top-Down {Example}
> The risk-free curve at the liability's duration yields $3.4\%$. The insurer's supporting bond portfolio yields $4.9\%$, comprising $0.35\%$ expected credit loss, $0.45\%$ unexpected credit risk premium, and the remainder liquidity and term. The insurer assesses the illiquidity premium appropriate to its claim liabilities at $0.5\%$.
>
> Compute the rate under each method and explain the gap.
>
> > [!answer]-
> > **Bottom-up:**
> >
> > $$\begin{align*}
> > r &= 3.4\% + 0.5\% \\
> > &= 3.9\%
> > \end{align*}$$
> >
> > **Top-down:** remove from the asset yield the components that do not belong in a liability discount rate — expected and unexpected credit risk:
> >
> > $$\begin{align*}
> > r &= 4.9\% - 0.35\% - 0.45\% \\
> > &= 4.1\%
> > \end{align*}$$
> >
> > **The $20$ basis point gap** is the difference between the illiquidity premium the insurer *assessed* for its liabilities ($0.5\%$) and the liquidity-plus-term component *embedded in its assets* ($4.9\% - 3.4\% - 0.35\% - 0.45\% = 0.7\%$).
> >
> > IFRS 17 does not require reconciliation, so either rate is permissible provided the method is applied consistently and disclosed. But the gap is worth explaining internally: the insurer's assets are *less* liquid than the liabilities they support, and the top-down rate carries that extra illiquidity into the liability measurement.
> >
> > **The magnitude matters.** On a $\$500$ million liability with a duration of three years, $20$ basis points is roughly $\$3$ million — small enough to be a judgement rather than a misstatement, large enough that the method choice must be disclosed. On a long-tail book with a duration of eight years, the same $20$ points would be four times as consequential, which is why liability duration determines how much attention the curve deserves.
