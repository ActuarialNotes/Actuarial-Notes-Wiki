---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8e099e5563e09e722e6d7324267eade1fc177bdb284fb2668089f4140f082bb5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/IFRS 17 Discount Rates.md
---

![[Media/Figures/IFRS_17_Discount_Rates.svg|340]]

**IFRS 17 Discount Rates** are the rates used to convert insurance cash flows to present value under [[IFRS 17]]. They must be consistent with observable current market prices for instruments with similar characteristics, and they must reflect:

1. The time value of money.
2. The characteristics of the cash flows.
3. The liquidity characteristics of the insurance contracts.

They must not reflect factors that do not affect the insurance cash flows, notably the insurer's own credit standing or the performance of its investment portfolio.

## Bottom-up and top-down construction

IFRS 17 permits two methods of constructing the curve. The bottom-up method starts from a liquid risk-free yield curve and adds an illiquidity premium reflecting how illiquid the insurance liability is, so its rate is

> $$r_{\text{IFRS 17}} = r_{\text{risk-free}} + \text{Illiquidity premium}$$

- $r_{\text{risk-free}}$ is the yield on the liquid risk-free curve at the liability's duration.

The top-down method starts from the yield on an actual or reference asset portfolio and removes the components not relevant to the liability: expected and unexpected credit losses, and any market risk premium not reflecting liquidity.

The two methods need not reconcile, and IFRS 17 expressly does not require them to. The illiquidity premium is the hardest judgement in either method, and it is where two insurers' curves most differ.

> [!example]- What discount rate does each method give, and why do they differ? {Example}
> The risk-free curve at the liability's duration yields $3.4\%$. The insurer's supporting bond portfolio yields $4.9\%$, made up of $0.35\%$ expected credit loss, $0.45\%$ unexpected credit risk premium, and the remainder liquidity and term. The insurer assesses the illiquidity premium appropriate to its claim liabilities at $0.5\%$.
>
> > [!answer]-
> > - Bottom-up, the rate is $3.4\% + 0.5\% = 3.9\%$.
> > - Top-down, the expected and unexpected credit risk come out of the asset yield, so the rate is $4.9\% - 0.35\% - 0.45\% = 4.1\%$.
> > - The liquidity and term component in the assets is $4.9\% - 3.4\% - 0.35\% - 0.45\% = 0.7\%$, against the $0.5\%$ the insurer assessed for its liabilities. That is the $20$ basis point gap.
> > - The insurer's assets are less liquid than the liabilities they support, and the top-down rate carries that extra illiquidity into the liability measurement.
> > - Either rate is permissible, provided the method is applied consistently and disclosed.
> > - On a $\$500$ million liability with a duration of three years, $20$ basis points is about $500 \times 3 \times 0.002 = \$3$ million. With a duration of eight years it would be about $\$8$ million, so liability duration determines how much attention the curve deserves.

## Current rates and locked-in rates

The liability is measured at current rates each period. The exception is [[Contractual Service Margin|CSM]] accretion, which uses the rate locked in at initial recognition.

## Presentation of discount effects

The unwind of discount and the effect of changes in discount rates are [[Insurance Finance Income or Expenses]], not [[Insurance Service Expenses]]. This keeps the [[Insurance Service Result]] free of interest-rate noise.

The [[Other Comprehensive Income Option|OCI option]] lets an insurer put the effect of discount rate changes in OCI rather than profit or loss, with the locked-in-rate portion staying in profit. Combined with fair-value-through-OCI assets, it reduces accounting mismatch. The choice is irrevocable, by portfolio.

## Canadian practice

Canadian practice is shaped by CIA guidance on constructing the curve and on the illiquidity premium. Canadian P&C liabilities are relatively short, so the discount effect is a few percent of the liability, against far more for a life insurer.

> [!trap] Discounting at the asset portfolio's yield
> The insurer's investment performance does not affect the insurance cash flows, so the rate cannot be the portfolio yield. Top-down starts there but removes the expected and unexpected credit risk before the rate is used.
