**Case Adequacy** is how close case reserves sit to the eventual settlement cost of the claims they are set on. A *change* in adequacy over calendar time is one of the two distortions ([[Settlement Rate|settlement rate]] is the other) that make historical development factors misleading.

> $$\text{Avg Case Outstanding} = \frac{\text{Case Reserves}}{\text{Open Claim Counts}}$$

> $$\text{Adequacy ratio} = \frac{\text{Case reserve at valuation}}{\text{Eventual settlement value}}$$

- **The diagnostic is average case outstanding per open claim**, compared *down each column* of the triangle. It should grow at roughly the severity trend. A jump concentrated on one **diagonal**, appearing at every maturity at once, is a change in reserving practice, not in claim cost.
- **Strengthening** raises reported losses immediately, so recent age-to-age factors fall (more of the ultimate is already booked). Applying historical factors — built under weaker reserving — to a strengthened diagonal **over-states** ultimate, because the strengthening is developed a second time.
- **Weakening** does the reverse and understates ultimate, which is the more dangerous direction: the reserves are inadequate and the method that is supposed to catch it is biased in the same direction.
- **Paid data is immune**, so a divergence between paid and reported chain ladder estimates is the corroborating evidence. Rising average case outstanding *and* reported ultimates running above paid ultimates together confirm a strengthening.
- The remedy is the [[Berquist-Sherman Method|Berquist-Sherman]] case adjustment: restate historical average case outstanding to the current adequacy level using a selected severity trend, rebuild the reported triangle, and select factors from the restated history.
- Adequacy also affects the a priori methods indirectly: the [[Cape Cod Method|Cape Cod]] ELR is computed from reported losses, so a strengthening inflates it and the distortion enters twice.

![[Media/Figures/Case_Adequacy.svg|340]]

> [!example]- Detecting a Shift {Example}
> Average case outstanding per open claim:
>
> | AY | 12 mo | 24 mo | 36 mo |
> |---|---|---|---|
> | $2020$ | $\$5{,}200$ | $\$8{,}000$ | $\$12{,}000$ |
> | $2021$ | $\$5{,}500$ | $\$8{,}400$ | $\$18{,}100$ |
> | $2022$ | $\$5{,}700$ | $\$14{,}000$ | |
> | $2023$ | $\$9{,}400$ | | |
>
> What happened, and when?
>
> > [!answer]-
> > Read down the columns:
> >
> > - $12$ months: $5{,}200 \to 5{,}500 \to 5{,}700$ (about $+4.7\%$ a year), then $\$9{,}400$ — a $+65\%$ jump.
> > - $24$ months: $8{,}000 \to 8{,}400$ ($+5.0\%$), then $\$14{,}000$ — $+67\%$.
> > - $36$ months: $12{,}000$, then $\$18{,}100$ — $+51\%$.
> >
> > Every jump is on the **latest diagonal**, the year ending $12/31/2023$, and all are of similar magnitude. This is a case reserve **strengthening** during calendar $2023$, of roughly $55$–$65\%$ over and above the $\approx 5\%$ severity trend.
> >
> > Confirming evidence to look for: reported chain ladder ultimates now exceeding paid chain ladder ultimates, and a stable disposal rate (which would rule out a settlement-speed explanation).
> >
> > Selecting reported development factors from this triangle unadjusted would over-state ultimate losses substantially — the strengthened diagonal would be multiplied by factors built for a book that reserved $60\%$ lighter.

> [!example]- Quantifying the Bias {Example}
> A reported triangle's $24$–$36$ factor has historically been $1.30$. Case reserves were strengthened $25\%$ at the end of $2024$. AY 2023, at $24$ months on $12/31/2024$, shows paid $\$3{,}000{,}000$ and case reserves $\$2{,}500{,}000$.
>
> Estimate the size of the bias if the historical factor is used unadjusted.
>
> > [!answer]-
> > **Unadjusted:**
> >
> > $$(\$3{,}000{,}000 + \$2{,}500{,}000) \times 1.30 = \$7{,}150{,}000$$
> >
> > Under the old reserving basis, the same claims would have carried case reserves of about
> >
> > $$\frac{\$2{,}500{,}000}{1.25} = \$2{,}000{,}000$$
> >
> > so reported would have been $\$5{,}000{,}000$ — which is the level the $1.30$ factor was calibrated to:
> >
> > $$\$5{,}000{,}000 \times 1.30 = \$6{,}500{,}000$$
> >
> > The unadjusted estimate is $\$650{,}000$ (**$10\%$**) too high. The strengthening added $\$500{,}000$ to reported losses, and the factor then developed that $\$500{,}000$ by a further $30\%$ as though it were newly emerged loss rather than a re-estimate of claims already counted.
> >
> > The Berquist-Sherman restatement fixes the *factor* rather than the diagonal: the strengthened reserves stay in the estimate (they are the claims department's current best view), but the development applied to them is re-derived from a consistently-restated history.
