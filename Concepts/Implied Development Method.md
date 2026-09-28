---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6676868f3f49590082097f8b04611ed74e43dd38f4d85a91747cc2eb0f9fe3d2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Implied Development Method.md
---

**Implied Development Method** is Siewert's approach to the excess layer of a [[Large Deductible Policy|high deductible]] program: develop full coverage (unlimited) losses to ultimate, develop deductible (limited) losses to ultimate with factors for inflation-indexed limits, and take the ultimate excess losses as the difference. Excess development is implied by the two developments rather than measured on the thin excess data itself.

> $$\text{Ult}^{XS} = C_t \cdot \text{LDF}_t - C^L_t \cdot \text{LDF}^L_t$$

> $$\text{IBNR}^{XS} = \text{Ult}^{XS} - (C_t - C^L_t)$$

- **Symbols.** $C_t$ is unlimited reported loss at age $t$ and $C^L_t$ the loss limited to the deductible $L$. $\text{LDF}_t$ and $\text{LDF}^L_t$ are their [[Cumulative Development Factor|age-to-ultimate factors]]. Siewert applies the factors account by account, each at its own deductible, and sums the account ultimates. That reflects the program's deductible mix.
- **Consistency and indexing.**
  - The full coverage [[Tail Factor|tail]] must agree with the limited tails. Limited losses must never be developed beyond unlimited losses, nor a lower limit beyond a higher one.
  - Limits are indexed for inflation so experience years can be combined. At $10\%$ cost inflation, losses over a \$100,000 deductible one year match those over \$110,000 the next. Siewert's index of $1.095$ makes a current \$250,000 limit equivalent to \$228,311 a year earlier.
- **Strengths and weakness.** It gives an excess estimate at early maturities even when no excess losses have emerged. Limited factors are more stable than excess ones. Its by-product, ultimate deductible losses, feeds the service revenue asset: a loss multiplier on deductible losses, less known recoveries (see [[Deductible Recovery]]). Its weakness, in Siewert's words, is that its focus is misplaced: one would like to recognize excess development explicitly.
- **The alternatives Siewert compares it with.** $P$ is premium, $E$ the expected loss ratio, $\chi$ the per-occurrence charge and $O_t$ the observed loss.
  - The **[[Loss Ratio Method|loss ratio]] approach** sets excess losses at $P \cdot E \cdot \chi$ from pricing. It is practical for immature years but ignores emerging experience.
  - **Direct development** applies an [[Excess Loss Development Factor|excess loss development factor]] to reported excess losses. It is leveraged and volatile, and it gives nothing when nothing has emerged.
  - **Credibility weighting** takes $Z = 1/\text{LDF}_t$, giving the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] result $O_t + E(\text{LDF}_t - 1)/\text{LDF}_t$. It is stable and tied to pricing, but it ignores actual experience to the extent of the complement of credibility.
  - The implicit and explicit methods need not give the same reserve. Their underlying factors should balance, though, to the unlimited factor.
- See [[A Model for Reserving Workers Compensation High Deductibles (Siewert - 1996)|Siewert (1996)]], and [[Claims Development by Layer (Sahasrabuddhe - 2010)|Sahasrabuddhe (2010)]] for moving a pattern between layers.

> [!example]- Excess IBNR for Two Accounts with Different Deductibles {Example}
> At 36 months, one accident year of a workers compensation program has two accounts (\$000):
>
> | Account | Deductible | Unlimited reported | Limited reported |
> |---|---|---|---|
> | A | \$100,000 | $1{,}200$ | $900$ |
> | B | \$250,000 | $2{,}000$ | $1{,}750$ |
>
> The unlimited 36-to-ultimate factor is $1.300$. The limited factors are $1.080$ at \$100,000 and $1.150$ at \$250,000. Estimate each account's excess IBNR by implied development. Then find the service revenue asset for a loss multiplier of $8\%$, collected so far on reported deductible losses.
>
> > [!answer]-
> > **Account A:**
> >
> > $$
> > \begin{align*}
> > \text{Ult unlimited} &= 1{,}200 \times 1.300 \\
> > &= 1{,}560 \\
> > \text{Ult limited} &= 900 \times 1.080 \\
> > &= 972 \\
> > \text{Ult excess} &= 1{,}560 - 972 \\
> > &= 588 \\
> > \text{IBNR}^{XS} &= 588 - 300 \\
> > &= 288
> > \end{align*}
> > $$
> >
> > **Account B:**
> >
> > $$
> > \begin{align*}
> > \text{Ult unlimited} &= 2{,}000 \times 1.300 \\
> > &= 2{,}600 \\
> > \text{Ult limited} &= 1{,}750 \times 1.150 \\
> > &= 2{,}012.5 \\
> > \text{Ult excess} &= 2{,}600 - 2{,}012.5 \\
> > &= 587.5 \\
> > \text{IBNR}^{XS} &= 587.5 - 250 \\
> > &= 337.5
> > \end{align*}
> > $$
> >
> > Total excess IBNR is $625.5$, or \$625,500. The factors pass Siewert's consistency check, since $1.080 < 1.150 < 1.300$.
> >
> > The implied excess factors are $588/300 = 1.96$ for A and $587.5/250 = 2.35$ for B. The higher retention's excess layer develops more.
> >
> > **Service revenue.** The multiplier applies to the deductible losses still to emerge:
> >
> > $$
> > \begin{align*}
> > \text{Asset} &= 0.08 \times \big[(972 - 900) + (2{,}012.5 - 1{,}750)\big] \\
> > &= 0.08 \times 334.5 \\
> > &= 26.76
> > \end{align*}
> > $$
> >
> > That is an asset of \$26,760, built on the same ultimate deductible losses the excess estimate used.

> [!example]- Implied, Direct and Bornhuetter-Ferguson Compared {Example}
> At 24 months an accident year with a \$250,000 deductible has unlimited reported losses of $4{,}000$ and limited reported losses of $3{,}800$ (\$000). The factors to ultimate are $1.400$ unlimited and $1.250$ limited. They were derived with a 24-month relativity $R^L_{24} = 0.96$, and the expected excess ultimate from pricing is $800$.
>
> Estimate the excess IBNR by implied development, by direct development and by Bornhuetter-Ferguson. Explain why they differ.
>
> > [!answer]-
> > **Implied development:**
> >
> > $$
> > \begin{align*}
> > \text{Ult}^{XS} &= 4{,}000(1.400) - 3{,}800(1.250) \\
> > &= 5{,}600 - 4{,}750 \\
> > &= 850 \\
> > \text{IBNR}^{XS} &= 850 - 200 \\
> > &= 650
> > \end{align*}
> > $$
> >
> > **Direct development.** The excess factor that balances with these factors is:
> >
> > $$
> > \begin{align*}
> > \text{XSLDF}_{24} &= \frac{1.400 - 0.96(1.250)}{0.04} \\
> > &= 5.000 \\
> > \text{IBNR}^{XS} &= 200(5.000) - 200 \\
> > &= 800
> > \end{align*}
> > $$
> >
> > **Bornhuetter-Ferguson** with the pricing expectation:
> >
> > $$
> > \begin{align*}
> > \text{IBNR}^{XS} &= 800 \times (1 - 1/5.000) \\
> > &= 640
> > \end{align*}
> > $$
> >
> > The factors expect $4\%$ of reported losses above the deductible at 24 months, which is $160$. Actual excess emergence is $200$, $40$ more.
> >
> > - Direct development multiplies the extra $40$ by $5.0$, adding $200$ to the ultimate.
> > - Implied development sees it only as $40$ less limited loss, developed at $1.25$, adding $50$.
> > - Bornhuetter-Ferguson passes it through one for one, adding $40$.
> >
> > All three rest on the same balanced factors, as Siewert requires. They differ in how far they let an early, volatile emergence move the reserve.
