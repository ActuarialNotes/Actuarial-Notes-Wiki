---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:abc57fcec715b0667a8874e2f96e05bf430d6df06ce7522daf55f8608e6997c8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Asset Classification.md
---

**Financial Asset Classification** was the rule, under CICA Handbook section 3855 (from fiscal years beginning on or after October 1, 2006) and then IAS 39, that put every financial asset an insurer held into one category. The category decided both the asset's balance-sheet value and whether its gains and losses went to [[Net Income|net income]] or to [[Comprehensive Income|other comprehensive income]] (OCI). For a Canadian P&C insurer the choice moved the liabilities too, because policy liabilities were discounted at the yield on the assets supporting them. The rules are off the current syllabus: IFRS 9's categories replaced them.

> $$\text{NI}_{\text{HTM, AFS}} = \text{Coupons} + \Delta\text{AC}$$
>
> $$\text{NI}_{\text{HFT}} = \text{Coupons} + \Delta\text{FV}$$
>
> $$\text{OCI}_{\text{AFS}} = \Delta(\text{FV} - \text{AC})$$

- **The categories**, with AC the amortized cost (effective interest method) and FV the fair value:
  - **Held to maturity (HTM)**: fixed or determinable payments, a fixed maturity, and the positive intention and ability to hold to maturity. Carried at AC.
  - **Available for sale (AFS)**: the residual category. Carried at FV, but net income sees only coupons and the change in AC. The gap $\text{FV} - \text{AC}$ accumulates in OCI (accumulated OCI), and is transferred to net income when the asset is sold.
  - **Held for trading (HFT)**: bought to sell in the near term, or designated so on initial recognition under the **fair value option**. Carried at FV, with every gain and loss in net income. The international name for the category is *fair value through profit or loss*.
  - **Loans and receivables**: carried at AC.
- **Held to maturity, and tainting.** HTM gives stability: net income and asset values do not move with market values. The price is **tainting**. Selling more than an insignificant amount before maturity, for reasons within the insurer's control, forces the whole HTM portfolio into AFS, and the category cannot be used again for two years. That reduces flexibility to rebalance or redeploy the portfolio, and the CIA called it a major impediment to using the category.
- **OSFI's conditions on the fair value option** (Guideline D-10) narrowed what CICA 3855 allowed. The option could be used only if either:
  - consistent with a documented risk management strategy, it eliminates or significantly reduces an **accounting mismatch** from measuring assets and liabilities on different bases; or
  - a group of financial instruments is managed on a fair value basis under a documented risk management strategy, and **significant financial risks are eliminated or significantly reduced**.
  - In both cases the fair values had to be reliable. OSFI counted policy liabilities among the liabilities and financial instruments these tests look at.
- **The liability side.** Under the Standards of Practice (paragraph 2240.01), the discount rate is the investment return expected on the assets supporting the policy liabilities. The portfolio yield is the rate that reproduces those assets' **book value**, which the CIA noted "may be the market value, the amortized value, or such other value consistent with Canadian generally accepted accounting principles". So when market rates fall:
  - **HTM backing**: the book yield on amortized cost does not move with market rates, so the assets, liabilities, net income and OCI all stay put.
  - **AFS backing**: the assets rise, through OCI. The portfolio yield falls, so the liabilities ([[Margin for Adverse Deviations|PfADs]] included) rise, through net income. Net income falls, OCI rises, and the effect on equity depends on the matching.
  - **HFT or fair-value-option backing**: both movements go through net income, and the net depends on the matching.
- **What replaced it.** IFRS 9 changed both sides of this link:
  - The 2023 quarterly return's summary of investments (page 40.08) has columns for FVTPL, FVOCI, fair value hedges, cash flow hedges, the fair value option (assets designated as FVTPL) and amortized cost, with expected-credit-loss provisions in three stages.
  - OCI on FVOCI bonds may later be reclassified to net income, but OCI on FVOCI equities never is (page 20.42 of the core return).
  - OSFI's *IFRS 9 Financial Instruments and Disclosures* guideline replaced D-10. For a financial asset, the fair value option is now an irrevocable designation at initial recognition, allowed where it eliminates or significantly reduces an accounting mismatch (IFRS 9, paragraph 4.1.5).
  - Under IFRS 17, [[IFRS 17 Discount Rates|discount rates]] no longer depend on the assets supporting the liabilities, so a classification no longer moves the liabilities. An insurer can instead put the liability's rate effect in OCI with the [[Other Comprehensive Income Option]].

> [!example]- Three Bonds Through One Year {Example}
> A tax-exempt insurer holds three [[Bonds|bonds]] (\$000s):
>
> | Bond | Class | AC, start | FV, start | Coupon | AC, end | FV, end |
> |---|---|---|---|---|---|---|
> | A | HTM | 4,000 | 4,150 | 180 | 3,960 | 3,900 |
> | B | AFS | 6,000 | 5,800 | 240 | 6,030 | 6,250 |
> | C | HFT | 2,500 | 2,560 | 110 | 2,480 | 2,450 |
>
> Find each bond's balance-sheet value at year end, the year's net income and OCI, and the accumulated OCI at year end.
>
> > [!answer]-
> > **Balance-sheet values:** A at AC, $3{,}960$; B at FV, $6{,}250$; C at FV, $2{,}450$.
> >
> > **Net income:**
> >
> > $$
> > \begin{align*}
> > \text{A} &= 180 + (3{,}960 - 4{,}000) \\
> > &= 140 \\
> > \text{B} &= 240 + (6{,}030 - 6{,}000) \\
> > &= 270 \\
> > \text{C} &= 110 + (2{,}450 - 2{,}560) \\
> > &= 0 \\
> > \text{Total} &= 410
> > \end{align*}
> > $$
> >
> > **OCI**, from B alone:
> >
> > $$
> > \begin{align*}
> > \text{OCI} &= (6{,}250 - 6{,}030) - (5{,}800 - 6{,}000) \\
> > &= 220 + 200 \\
> > &= 420
> > \end{align*}
> > $$
> >
> > Accumulated OCI at year end is B's $\text{FV} - \text{AC} = 220$: last year's unrealized loss of $200$ has reversed and become a gain.
> >
> > **Notice** that A's market value fell $250$ and none of it appears anywhere, while C's coupon was entirely offset by its fall in value. Comprehensive income is $410 + 420 = 830$.

> [!example]- A Rate Drop Under Each Classification {Example}
> An insurer's undiscounted claim liabilities of $10{,}000$ are paid $5{,}000$, $3{,}000$ and $2{,}000$ at the ends of the next three years. The MfADs are $5\%$ for claims development and $0.5\%$ for investment return. The supporting bond portfolio, bought at a $5\%$ yield, pays $3{,}000$, $3{,}000$ and $5{,}000$ at the same dates.
>
> At the valuation date, market yields fall from $5\%$ to $4\%$. The actuary discounts at the portfolio's book yield. Ignoring tax, find the change in net income, OCI and equity if the whole portfolio is classified (i) HTM, (ii) AFS, (iii) HFT.
>
> > [!answer]-
> > **Liabilities at each rate**, as the PV plus the investment-return PfAD plus the claims PfAD:
> >
> > $$
> > \begin{align*}
> > \text{APV at } 5\% &= 9{,}210.7 + (9{,}284.5 - 9{,}210.7) + 0.05(9{,}210.7) \\
> > &= 9{,}284.5 + 460.5 \\
> > &= 9{,}745.0 \\
> > \text{APV at } 4\% &= 9{,}359.4 + (9{,}435.3 - 9{,}359.4) + 0.05(9{,}359.4) \\
> > &= 9{,}435.3 + 468.0 \\
> > &= 9{,}903.3
> > \end{align*}
> > $$
> >
> > The liabilities rise by $158.3$. The bonds' value moves from $9{,}897.4$ at $5\%$ to $10{,}103.3$ at $4\%$, a rise of $205.9$.
> >
> > | Class | $\Delta$ Net income | $\Delta$ OCI | $\Delta$ Equity |
> > |---|---|---|---|
> > | (i) HTM | 0 | 0 | 0 |
> > | (ii) AFS | $-158.3$ | $+205.9$ | $+47.6$ |
> > | (iii) HFT | $+47.6$ | 0 | $+47.6$ |
> >
> > - **HTM:** the bonds stay at amortized cost, so the book yield is still $5\%$ and the liabilities do not move. Nothing is reported at all, even though at market rates the bonds gained $47.6$ more than the liabilities.
> > - **AFS:** the bonds' gain goes to OCI, but the lower book yield raises the liabilities through net income. The insurer reports a **loss of $158.3$** in a period when its economic position improved. This is the income mismatch the CIA's 2007 note warned of.
> > - **HFT:** both movements meet in net income, which shows the true $47.6$.
> >
> > The $47.6$ is the duration mismatch: the bonds (Macaulay duration about $2.15$) are longer than the liabilities (about $1.67$), so a rate fall lifts them more. The classification decides only **where** that result appears, and HTM decides that it appears nowhere.
