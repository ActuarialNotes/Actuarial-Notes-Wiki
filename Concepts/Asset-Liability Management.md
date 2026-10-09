---
aliases:
  - Asset Liability
  - ALM
  - Asset-Liability
  - Asset-liability
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9c4d4be4095934ef2398df08c248392c7b21e9a0c6970a56f659732d94575b3a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Asset-Liability Management.md
---
**Asset-liability management** (ALM) is the practice of managing an institution's assets and liabilities together, so that the surplus between them meets its objectives under changing [[Interest Rate Risk|interest rates]], markets and policyholder or member behaviour. Insurers and pension plans hold assets to pay liabilities whose amount and timing are set by contracts and benefit formulas. ALM chooses and adjusts the assets, and sometimes the liabilities, so that the [[Asset-Liability Portfolio|asset-liability portfolio]] keeps its surplus within the institution's tolerance for risk.

> $$S = A - L$$

> $$\Delta S \approx -(D_A A - D_L L)\,\Delta i + \tfrac{1}{2}(C_A A - C_L L)(\Delta i)^2$$

> $$D_S = \frac{D_A A - D_L L}{S}$$

> $$h = \frac{D_A^{\text{hedge}} A^{\text{hedge}}}{D_L L}$$

- **Symbols:** $A$ and $L$ are the market or present values of the assets and liabilities, and $S$ is the surplus. $D_A$ and $D_L$ are their [[Modified Duration|modified durations]], $C_A$ and $C_L$ their [[Convexity|convexities]], and $\Delta i$ is a parallel change in rates. $D_S$ is the surplus duration. In a pension plan, $h$ is the hedge ratio: the share of the liability's interest rate sensitivity that the hedging assets cover.
- **The principles:** The liabilities come first, because their timing, size, guarantees, options and indexation decide what assets suit them. The aim is not to remove risk but to take the risks the institution chooses, in the amounts its capital and risk appetite allow, and to be paid for them. ALM works within constraints such as liquidity needs, regulatory capital, accounting results and tax.
- **Cash flow matching:** [[Cash Flow Matching|Cash flow matching]] buys assets whose cash flows equal the liability cash flows date by date. It removes [[Reinvestment Risk|reinvestment risk]] and [[Price Risk|price risk]] but is expensive and only possible for liabilities with known cash flows, such as payout annuities or retired lives.
- **Duration matching and immunization:** [[Duration Matching|Duration matching]] sets the assets' dollar duration equal to the liabilities', so the surplus is insensitive to a small parallel shift. [[Redington Immunization|Redington immunization]] adds that the assets' convexity exceed the liabilities', and [[Immunization|immunization]] has to be rebalanced as time passes and rates move. Key rate durations extend the idea to shifts that aren't parallel.
- **Options on both sides:** Many liabilities contain [[Embedded Option|embedded options]], such as surrender and lapse rights, guaranteed rates and minimum benefits, and many assets do too, such as a [[Callable Bond|callable bond]] or a mortgage-backed security. Their cash flows change with rates, so ALM uses effective durations and scenario projections in place of fixed cash flows. A run on short-term puttable liabilities is the classic ALM failure, because it turns a mismatch into a liquidity crisis.
- **Projection and testing:** Insurers project asset and liability cash flows together under many interest rate scenarios to test whether the assets, with reinvestment, will cover the liabilities. This is the work behind [[Asset Adequacy Analysis|asset adequacy analysis]] and the cash flow projections in pricing and reserving. Portfolios are often segmented by product line, so each segment's assets reflect its liabilities.
- **Surplus at risk:** Surplus at risk is a quantile of the fall in surplus, or a pension plan's funded status, over a horizon, from a stochastic model of assets and liabilities. It measures risk on the balance sheet that matters, rather than asset volatility alone.
- **Liability-driven investing:** A [[Defined Benefit Plan|defined benefit plan]] splits its assets into a hedging portfolio of long bonds or swaps that moves with the liabilities, and a return-seeking portfolio for growth. A glide path raises the hedge ratio as the funded status improves, so gains are locked in, and a liability-responsive allocation sets the mix by the funded status rather than a fixed policy.

> [!example]- An Insurer's Surplus Under a Rate Shock {Example}
> An insurer has assets of \$1,000 million with modified duration 6 and convexity 50, and liabilities of \$900 million with modified duration 8 and convexity 80. Estimate the change in surplus for rate moves of $+1\%$ and $-1\%$, and find the asset duration that matches the liabilities' dollar duration.
>
> > [!answer]-
> > For $\Delta i = -0.01$:
> > $$
> > \begin{align*}
> > \Delta A &= 1{,}000(6)(0.01) + \tfrac{1}{2}(1{,}000)(50)(0.0001) \\
> > &= 62.5 \\
> > \Delta L &= 900(8)(0.01) + \tfrac{1}{2}(900)(80)(0.0001) \\
> > &= 75.6 \\
> > \Delta S &= 62.5 - 75.6 \\
> > &= -13.1
> > \end{align*}
> > $$
> > The same steps with $\Delta i = +0.01$ give $\Delta A = -57.5$, $\Delta L = -68.4$ and $\Delta S = +10.9$. The surplus falls when rates fall, because the liabilities' dollar duration of 7,200 exceeds the assets' 6,000. The surplus duration is $(6{,}000 - 7{,}200)/100 = -12$.
> > $$
> > \begin{align*}
> > D_A^{*} &= \frac{900 \times 8}{1{,}000} \\
> > &= 7.2
> > \end{align*}
> > $$
> > Lengthening the assets to a duration of 7.2 matches the dollar durations. Because the assets exceed the liabilities, the assets need a shorter duration than the liabilities' 8 to do it.

> [!example]- Raising a Pension Plan's Hedge Ratio {Example}
> A pension plan has liabilities of \$500 million with duration 14. Of its assets, \$200 million is in bonds with duration 10 and the rest in equities, treated as having no rate sensitivity. The sponsor wants a hedge ratio of 60%, using bonds with duration 20. Find the current hedge ratio, the amount to move from equities, and the effect of a 1% fall in rates on the funded status before and after, to first order.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > h &= \frac{200 \times 10}{500 \times 14} \\
> > &= 28.6\% \\
> > \text{Extra dollar duration} &= 0.60(7{,}000) - 2{,}000 \\
> > &= 2{,}200 \\
> > \text{Amount to move} &= 2{,}200 / 20 \\
> > &= 110
> > \end{align*}
> > $$
> > A 1% fall in rates raises the liabilities by about \$70 million. Before the change the bonds gain \$20 million and the funded status falls by \$50 million. After moving \$110 million into the long bonds, the hedging assets gain $4{,}200 \times 0.01 = 42$, and the funded status falls by only \$28 million. The plan gives up some expected return from equities for that stability.

> [!tip]- How it appears on the exam
> - **CP-321:** The asset adequacy section asks candidates to understand the principles of ALM, evaluate techniques for mismatched assets and liabilities, and describe cash flow projections and the interactions between asset and liability cash flows.
> - **CP-351:** The objectives ask candidates to explain the principles of ALM, describe ALM risks and the embedded options in insurance and pension contracts, and draw lessons from ALM failures. Expect written answers built on a case, with duration or cash flow calculations in support.
> - **RET-201:** The objective asks for strategies and techniques of asset/liability management for a pension plan, such as hedge ratios, liability-driven investing and glide paths, and for advice to a sponsor on mitigating investment risk.

> [!warning]- Exam traps
> - **Durations, not dollar durations:** When assets and liabilities differ in size, matching the durations doesn't protect the surplus. It is the dollar durations, $D_A A$ and $D_L L$, that must match.
> - **Too little convexity:** Redington immunization needs the assets' convexity to exceed the liabilities'. Matching duration with less convex assets leaves the surplus losing on any rate move.
> - **Fixed cash flows for optional liabilities:** Surrenders, lapses and guarantees change the liability cash flows as rates move. Using their scheduled cash flows understates the duration risk, so effective durations and scenario projections are needed.
> - **Hedge ratio direction:** The hedge ratio is the hedging assets' dollar duration divided by the liabilities'. Inverting it, or using market values without durations, gives a ratio that doesn't measure interest rate protection.
