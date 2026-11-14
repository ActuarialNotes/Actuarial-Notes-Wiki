---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:964761d8283f6f8ae273b95dfceb0f0780338f6dabd99b1b1c3cdfc0cd1ee9da
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Asset Classification.md
---
**Financial Asset Classification** was the rule, under CICA Handbook section 3855 (from fiscal years beginning on or after October 1, 2006) and then IAS 39, that put every financial asset an insurer held into one category. The category decided both the asset's balance-sheet value and whether its gains and losses went to [[Net Income|net income]] or to [[Comprehensive Income|other comprehensive income]] (OCI). IFRS 9's categories have replaced these rules.

Each asset was carried at its amortized cost (AC), under the effective interest method, or at its fair value (FV):

| Category | Who qualifies | Carried at | Changes in market value go to |
| :--- | :--- | :--- | :--- |
| Held to maturity (HTM) | Fixed or determinable payments, a fixed maturity, and the positive intention and ability to hold to maturity | AC | Nowhere |
| Available for sale (AFS) | The residual category | FV | OCI |
| Held for trading (HFT) | Bought to sell in the near term, or designated so on initial recognition under the fair value option | FV | Net income |
| Loans and receivables | | AC | Nowhere |

The international name for the held-for-trading category is *fair value through profit or loss*. For a bond held to maturity or available for sale, net income is

> $$\text{NI}_{\text{HTM, AFS}} = \text{Coupons} + \Delta\text{AC}$$

For a bond held for trading, it is

> $$\text{NI}_{\text{HFT}} = \text{Coupons} + \Delta\text{FV}$$

For a bond available for sale, OCI is

> $$\text{OCI}_{\text{AFS}} = \Delta(\text{FV} - \text{AC})$$

The gap $\text{FV} - \text{AC}$ accumulates in accumulated OCI and is transferred to net income when the asset is sold.

> [!example]- What are this insurer's year-end balance-sheet values, net income, OCI and accumulated OCI? {Example}
> A tax-exempt insurer holds three [[Bonds|bonds]] (\$000s):
>
> | Bond | Class | AC, start | FV, start | Coupon | AC, end | FV, end |
> | :--- | :--- | ---: | ---: | ---: | ---: | ---: |
> | A | HTM | 4,000 | 4,150 | 180 | 3,960 | 3,900 |
> | B | AFS | 6,000 | 5,800 | 240 | 6,030 | 6,250 |
> | C | HFT | 2,500 | 2,560 | 110 | 2,480 | 2,450 |
>
> > [!answer]-
> > - A is carried at AC, $3{,}960$. B and C are carried at FV, $6{,}250$ and $2{,}450$.
> > - A's net income is $180 + (3{,}960 - 4{,}000) = 140$.
> > - B's net income is $240 + (6{,}030 - 6{,}000) = 270$.
> > - C's net income is $110 + (2{,}450 - 2{,}560) = 0$, so the total net income is $410$.
> > - OCI comes from B alone: $(6{,}250 - 6{,}030) - (5{,}800 - 6{,}000) = 220 + 200 = 420$.
> > - Accumulated OCI at year end is B's $\text{FV} - \text{AC} = 220$. Last year's unrealized loss of $200$ has reversed and become a gain.
> > - A's market value fell $250$ and none of it appears anywhere, while C's coupon was entirely offset by its fall in value. Comprehensive income is $410 + 420 = 830$.

## Held to maturity and tainting

HTM gives stability: net income and asset values do not move with market values. The price is **tainting**. Selling more than an insignificant amount before maturity, for reasons within the insurer's control, forces the whole HTM portfolio into AFS, and the category cannot be used again for two years. That reduces flexibility to rebalance or redeploy the portfolio, and the CIA called it a major impediment to using the category.

## OSFI's conditions on the fair value option

OSFI's Guideline D-10 narrowed the fair value option CICA 3855 allowed. The option could be used only if either:

1. consistent with a documented risk management strategy, it eliminates or significantly reduces an **accounting mismatch** from measuring assets and liabilities on different bases, or
2. a group of financial instruments is managed on a fair value basis under a documented risk management strategy, and significant financial risks are eliminated or significantly reduced.

In both cases the fair values had to be reliable. OSFI counted policy liabilities among the liabilities and financial instruments these tests look at.

## Classification and the policy liabilities

For a Canadian P&C insurer the classification moved the liabilities too. Under the Standards of Practice (paragraph 2240.01), the discount rate is the investment return expected on the assets supporting the policy liabilities. The portfolio yield is the rate that reproduces those assets' book value, which the CIA noted "may be the market value, the amortized value, or such other value consistent with Canadian generally accepted accounting principles". So when market rates fall:

- With HTM backing, the book yield on amortized cost does not move with market rates, so the assets, liabilities, net income and OCI all stay put.
- With AFS backing, the assets rise, through OCI. The portfolio yield falls, so the liabilities, [[Margin for Adverse Deviations|PfADs]] included, rise through net income. Net income falls, OCI rises, and the effect on equity depends on the matching.
- With HFT or fair-value-option backing, both movements go through net income, and the net depends on the matching.

> [!example]- If market yields fall from 5% to 4%, how do net income, OCI and equity change under each classification? {Example}
> An insurer's undiscounted claim liabilities of $10{,}000$ are paid $5{,}000$, $3{,}000$ and $2{,}000$ at the ends of the next three years. The MfADs are $5\%$ for claims development and $0.5\%$ for investment return. The supporting bond portfolio, bought at a $5\%$ yield, pays $3{,}000$, $3{,}000$ and $5{,}000$ at the same dates. The actuary discounts at the portfolio's book yield. Ignore tax, and classify the whole portfolio (i) HTM, (ii) AFS or (iii) HFT.
>
> > [!answer]-
> > - At $5\%$, the liabilities' present value is $9{,}210.7$. Discounting at $4.5\%$ gives $9{,}284.5$, and the claims PfAD adds $0.05 \times 9{,}210.7 = 460.5$, so the liabilities are $9{,}745.0$.
> > - At $4\%$, the present value is $9{,}359.4$. Discounting at $3.5\%$ gives $9{,}435.3$, and the claims PfAD adds $468.0$, so the liabilities are $9{,}903.3$, a rise of $158.3$.
> > - The bonds' value moves from $9{,}897.4$ at $5\%$ to $10{,}103.3$ at $4\%$, a rise of $205.8$.
> > - Under HTM, the bonds stay at amortized cost, the book yield is still $5\%$ and the liabilities do not move. Net income, OCI and equity are unchanged.
> > - Under AFS, the bonds' gain of $205.8$ goes to OCI, and the liabilities' rise of $158.3$ comes out of net income. Equity rises $47.5$, but the insurer reports a loss in a period when its economic position improved. This is the income mismatch the CIA's 2007 note warned of.
> > - Under HFT, both movements meet in net income, which rises $47.5$, and OCI is unchanged.
> > - The $47.5$ is the duration mismatch. The bonds' Macaulay duration of about $2.15$ is longer than the liabilities' $1.67$, so a rate fall lifts them more. The classification decides only where that result appears.

## Classification under IFRS 9 and IFRS 17

IFRS 9 changed both sides of this link:

- The 2023 quarterly return's summary of investments (page 40.08) has columns for FVTPL, FVOCI, fair value hedges, cash flow hedges, the fair value option (assets designated as FVTPL) and amortized cost, with expected-credit-loss provisions in three stages.
- OCI on FVOCI bonds may later be reclassified to net income, but OCI on FVOCI equities never is (page 20.42 of the core return).
- OSFI's *IFRS 9 Financial Instruments and Disclosures* guideline replaced D-10. For a financial asset, the fair value option is now an irrevocable designation at initial recognition, allowed where it eliminates or significantly reduces an accounting mismatch (IFRS 9, paragraph 4.1.5).
- Under IFRS 17, [[IFRS 17 Discount Rates|discount rates]] no longer depend on the assets supporting the liabilities, so a classification no longer moves the liabilities. An insurer can instead put the liability's rate effect in OCI with the [[Other Comprehensive Income Option]].

> [!trap] Reading an AFS loss as an economic loss
> Backed by AFS bonds, a fall in rates raises the liabilities through net income while the bonds' gain goes to OCI. Net income can show a loss when equity has risen, so judge the result by comprehensive income.
