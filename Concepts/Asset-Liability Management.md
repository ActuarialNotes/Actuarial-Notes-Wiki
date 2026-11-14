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
  content_hash: sha256:56a6bd1880ee3f2fa541972983c246e7c995f005f0e0f93a7ddaf593ca12f3c8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Asset-Liability Management.md
---
**Asset-Liability Management** (ALM) is the practice of managing an institution's assets and liabilities together, so that the surplus between them meets its objectives under changing [[Interest Rate Risk|interest rates]], markets and policyholder or member behaviour. It chooses and adjusts the assets, and sometimes the liabilities, so that the [[Asset-Liability Portfolio|asset-liability portfolio]] keeps its surplus within the institution's tolerance for risk.

The surplus is

> $$S = A - L$$

- $A$ and $L$ are the market or present values of the assets and the liabilities.

Insurers and pension plans hold assets to pay liabilities whose amount and timing are set by contracts and benefit formulas. The liabilities come first, because their timing, size, guarantees, options and indexation decide what assets suit them. ALM takes the risks the institution chooses, in the amounts its capital and risk appetite allow, and seeks to be paid for them. It works within constraints such as liquidity needs, regulatory capital, accounting results and tax.

## Cash flow matching

[[Cash Flow Matching|Cash flow matching]] buys assets whose cash flows equal the liability cash flows date by date. It removes [[Reinvestment Risk|reinvestment risk]] and [[Price Risk|price risk]]. It is expensive, and only possible for liabilities with known cash flows, such as payout annuities or retired lives.

## Duration matching and immunization

For a parallel change $\Delta i$ in interest rates, the change in surplus is approximately

> $$\Delta S \approx -(D_A A - D_L L)\,\Delta i + \tfrac{1}{2}(C_A A - C_L L)(\Delta i)^2$$

- $D_A$ and $D_L$ are the [[Modified Duration|modified durations]] of the assets and the liabilities.
- $C_A$ and $C_L$ are their [[Convexity|convexities]].

The surplus duration is

> $$D_S = \frac{D_A A - D_L L}{S}$$

[[Duration Matching|Duration matching]] sets the assets' dollar duration $D_A A$ equal to the liabilities' dollar duration $D_L L$, so the surplus is insensitive to a small parallel shift. [[Redington Immunization|Redington immunization]] adds that the assets' convexity exceed the liabilities', and [[Immunization|immunization]] has to be rebalanced as time passes and rates move. Matching duration with less convex assets leaves the surplus losing on any rate move. Key rate durations extend the idea to shifts that aren't parallel.

> [!example]- How does this insurer's surplus move if rates change by 1%, and what asset duration matches the liabilities' dollar duration? {Example}
> An insurer has assets of \$1,000 million with modified duration 6 and convexity 50, and liabilities of \$900 million with modified duration 8 and convexity 80.
>
> > [!answer]-
> > - For a fall in rates, $\Delta i = -0.01$. The assets' duration term is $1{,}000(6)(0.01) = 60$ and their convexity term is $\tfrac{1}{2}(1{,}000)(50)(0.0001) = 2.5$, so $\Delta A = 62.5$.
> > - The liabilities' terms are $900(8)(0.01) = 72$ and $\tfrac{1}{2}(900)(80)(0.0001) = 3.6$, so $\Delta L = 75.6$.
> > - The surplus changes by $62.5 - 75.6 = -13.1$, a fall of \$13.1 million.
> > - For a rise, $\Delta i = +0.01$, the duration terms change sign and the convexity terms don't: $\Delta A = -57.5$, $\Delta L = -68.4$ and $\Delta S = +10.9$.
> > - The surplus falls when rates fall because the liabilities' dollar duration of 7,200 exceeds the assets' 6,000. The surplus duration is $(6{,}000 - 7{,}200)/100 = -12$.
> > - Matching the dollar durations needs $D_A = 900 \times 8 / 1{,}000 = 7.2$. The assets exceed the liabilities, so a duration shorter than the liabilities' 8 is enough.

## Embedded options

Many liabilities contain [[Embedded Option|embedded options]], such as surrender and lapse rights, guaranteed rates and minimum benefits. Many assets do too, such as a [[Callable Bond|callable bond]] or a mortgage-backed security. Their cash flows change with rates, so ALM uses effective durations and scenario projections in place of fixed cash flows. Using the scheduled cash flows of optional liabilities understates the duration risk. A run on short-term puttable liabilities is the classic ALM failure, because it turns a mismatch into a liquidity crisis.

## Cash flow projection and surplus at risk

Insurers project asset and liability cash flows together under many interest rate scenarios to test whether the assets, with reinvestment, will cover the liabilities. This is the work behind [[Asset Adequacy Analysis|asset adequacy analysis]] and the cash flow projections in pricing and reserving. Portfolios are often segmented by product line, so each segment's assets reflect its liabilities.

Surplus at risk is a quantile of the fall in surplus, or in a pension plan's funded status, over a horizon, from a stochastic model of assets and liabilities. It measures risk on the balance sheet that matters, rather than asset volatility alone.

## Liability-driven investing

A [[Defined Benefit Plan|defined benefit plan]] that uses liability-driven investing splits its assets into a hedging portfolio of long bonds or swaps that moves with the liabilities, and a return-seeking portfolio for growth. The hedge ratio, the share of the liability's interest rate sensitivity that the hedging portfolio covers, is

> $$h = \frac{D_A^{\text{hedge}} A^{\text{hedge}}}{D_L L}$$

- $A^{\text{hedge}}$ and $D_A^{\text{hedge}}$ are the value and duration of the hedging portfolio.

A glide path raises the hedge ratio as the funded status improves, so gains are locked in. A liability-responsive allocation sets the mix by the funded status rather than by a fixed policy.

> [!example]- How much must this plan move into long bonds for a 60% hedge ratio, and how does that protect its funded status? {Example}
> A pension plan has liabilities of \$500 million with duration 14. Of its assets, \$200 million is in bonds with duration 10 and the rest in equities, treated as having no rate sensitivity. The sponsor wants a hedge ratio of 60%, using bonds with duration 20.
>
> > [!answer]-
> > - The liabilities' dollar duration is $500 \times 14 = 7{,}000$ and the bonds' is $200 \times 10 = 2{,}000$, so $h = 2{,}000/7{,}000 = 28.6\%$.
> > - A 60% hedge ratio needs $0.60 \times 7{,}000 = 4{,}200$, which is $2{,}200$ more.
> > - At duration 20, that takes $2{,}200/20 = \$110$ million moved from equities into the long bonds.
> > - A 1% fall in rates raises the liabilities by about \$70 million. Before the move the bonds gain \$20 million, so the funded status falls by \$50 million.
> > - After the move the hedging assets gain $4{,}200 \times 0.01 = \$42$ million, so the funded status falls by only \$28 million. The plan gives up some expected return from equities for that stability.

> [!trap] Matching durations instead of dollar durations
> When assets and liabilities differ in size, giving them the same duration doesn't protect the surplus. It is the dollar durations, $D_A A$ and $D_L L$, that must match. In the insurer above, an asset duration of 8 would overshoot, and 7.2 is the match.
