---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a1f32c4782eb28851814e1469bbe57aaa55907bb9eba99f1a1d8e9e6a0dfcc7d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cape Cod Method.md
---

**Cape Cod Method** (Stanard-Bühlmann) is the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] technique with the a priori loss ratio **derived from the data itself** rather than supplied externally. The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium across all years.

> $$\text{ELR} = \frac{\sum_i C_i}{\sum_i \text{EP}_i \times \tfrac{1}{\text{CDF}_i}}$$

> $$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$

- **Used-up premium** $\text{EP}_i / \text{CDF}_i$ is the share of each year's premium "exposed" to the losses reported so far. Weighting by it puts each accident year on a common maturity footing, so an immature year contributes little to the ELR estimate — as it should, having reported little.
- Once the ELR is in hand, the IBNR formula is identical to BF. The whole difference between the two methods is **where the a priori comes from**: BF imports it, Cape Cod estimates it.
- That makes Cape Cod the right choice when **no credible external ELR exists** — a new programme, a book whose pricing history is unreliable — and it removes the single largest source of BF error. The cost is that the estimate is no longer independent of the data: a systematically distorted triangle now corrupts the a priori as well as the development.
- Premium **must be on level** and losses must be trended to a common cost level before the ELR is computed, or the derived ratio blends years written at different rate levels and different cost levels into one number. This is Cape Cod's most-missed requirement.
- Cape Cod converges to the [[Chain Ladder Method|chain ladder]] as cohorts mature and to the [[Expected Loss Method|expected claims]] technique for very immature ones — the same limiting behaviour as BF.
- A **decay-weighted** variant (generalized Cape Cod) weights recent years more heavily in the ELR estimate, recognizing that the loss ratio level genuinely drifts.
- **Patrik's chapter, Exam 7's reading before Friedland (2022), adds** (not on the current outline), for reinsurance:
  - **Exposure base.** The premium is each year's earned **risk pure premium**: the treaty premium net of reinsurance commissions, brokerage fees and internal expenses, adjusted to remove rate-level differences between years. Commissions and brokerage are easy to net out, being coded by contract. Internal expenses are harder, and if they cannot be netted out they can be left in, since only a relative exposure base is needed.
  - **Against the chain ladder.** The ELR comes from the overall reported experience rather than from judgment, though each year's IBNR then depends heavily on its rate-level adjusted premium. As long as those rate-relativity adjustments are reasonably accurate, Stanard-Bühlmann gives more accurate estimates than the chain ladder for the recent, immature years and overall.
  - **Credibility IBNR.** When the rate-level adjustments are not fully trusted, the two estimates are weighted together: more weight on Stanard-Bühlmann for green years, where the chain ladder estimate has high variance, and more on the chain ladder for older years, where the cumulative rate-level adjustments are trusted less. With report lag $\text{Rlag}_k$ and a credibility factor $0 \le CF \le 1$, the weight on the chain ladder is $Z_k = CF \times \text{Rlag}_k$, and $\text{IBNR}_k = Z_k \cdot \text{IBNR}^{CL}_k + (1 - Z_k) \cdot \text{IBNR}^{SB}_k$.

![[Media/Figures/Cape_Cod_Method.svg|340]]

> [!example]- Deriving the ELR and the Reserve {Example}
> Three accident years, with on-level earned premium and reported losses ($000s):
>
> | AY | Maturity | EP | Reported | CDF | $\%$ reported |
> |---|---|---|---|---|---|
> | $2022$ | $36$ mo | $7{,}000$ | $1{,}750$ | $1.084$ | $92.3\%$ |
> | $2023$ | $24$ mo | $6{,}500$ | $2{,}600$ | $1.265$ | $79.1\%$ |
> | $2024$ | $12$ mo | $6{,}000$ | $2{,}850$ | $1.898$ | $52.7\%$ |
>
> Compute the Cape Cod ELR and total IBNR.
>
> > [!answer]-
> > **Used-up premium:**
> >
> > $$\begin{align*}
> > 2022: \; 7{,}000 \times 0.923 &= 6{,}461 \\
> > 2023: \; 6{,}500 \times 0.791 &= 5{,}142 \\
> > 2024: \; 6{,}000 \times 0.527 &= 3{,}162 \\[4pt]
> > \text{Total} &= 14{,}764
> > \end{align*}$$
> >
> > **ELR:**
> >
> > $$\text{ELR} = \frac{1{,}750 + 2{,}600 + 2{,}850}{14{,}764} = \frac{7{,}200}{14{,}764} = 48.8\%$$
> >
> > **IBNR by year** ($\text{ELR} \times \text{EP} \times \%$ unreported):
> >
> > | AY | $\%$ unreported | IBNR |
> > |---|---|---|
> > | $2022$ | $7.7\%$ | $0.488 \times 7{,}000 \times 0.077 = 263$ |
> > | $2023$ | $20.9\%$ | $0.488 \times 6{,}500 \times 0.209 = 662$ |
> > | $2024$ | $47.3\%$ | $0.488 \times 6{,}000 \times 0.473 = 1{,}384$ |
> > | **Total** | | $\$2{,}309$K |
> >
> > Note how the used-up premium weights the years. AY 2022 is mature, so its used-up premium is nearly its full premium and it *dominates* the ELR estimate. The immature AY 2024 contributes only $3{,}162$ of the $14{,}764$ denominator despite having $6{,}000$ of premium.

> [!example]- When Cape Cod Beats BF, and When It Does Not {Example}
> Two situations: (a) a five-year-old commercial programme whose pricing indications have never been reconciled to results; (b) a book that changed its case reserving philosophy two years ago, strengthening reserves across all open years.
>
> Which method suits each?
>
> > [!answer]-
> > **(a) Cape Cod.** With no reliable external ELR, a BF estimate would rest on an a priori nobody can defend. Cape Cod derives the loss ratio from the programme's own emergence, weighted properly by maturity, and removes the guess entirely.
> >
> > **(b) BF — or neither, until the triangle is fixed.** The case strengthening has inflated reported losses on every year at once. Cape Cod computes its ELR *from those inflated losses*, so the strengthening enters the estimate twice: once through the reported losses in the numerator of each year's ultimate, and again through an ELR that is now too high.
> >
> > BF with an externally derived ELR — from pricing, adjusted for [[Rate Level Change|rate level]] and trend — is insulated from that particular contamination, because its a priori never touches the distorted triangle.
> >
> > The general principle: **Cape Cod's strength is independence from external judgment; its weakness is dependence on the data.** When the data is the thing that is wrong, an external a priori is worth more than a self-consistent one. The proper fix in (b) is a [[Berquist-Sherman Method|Berquist-Sherman]] restatement before either method is run.
