---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:ad2d8b6c011047978ae681ee90084a264648e8cc1b404c2c05e67cb89076575b
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 p.99 (PDF p.111), Ch.7 p.137 (PDF p.149), Appendix B pp.B-3, B-8 (PDF pp.361, 366), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.4 p.44 (PDF p.50), Ch.7 p.96 (PDF p.102), Ch.14 pp.330-332 (PDF pp.336-338), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Net of Reinsurance.md
---

**Net of Reinsurance** describes premium, losses or unpaid claims measured after cessions to reinsurers — the amount the primary insurer actually retains.

> $$\text{Net} = \text{Gross} - \text{Ceded}$$

> $$\text{Net Loss Ratio} = \frac{\text{Gross Losses} - \text{Ceded Losses}}{\text{Gross Premium} - \text{Ceded Premium}}$$

- Gross, [[Ceded Losses|ceded]] and [[Net Losses|net]] must each be internally consistent: net losses belong over net premium. Mixing bases — gross losses over net premium is the classic error — overstates the loss ratio. A first check on the data is that net losses and net premium are no greater than gross.
- Ratemaking was historically done on a direct basis, but some analyses are now performed net. Werner gives two treatments of **non-proportional** reinsurance: reduce the projected losses by the expected recoveries and the premium by the amount ceded, or include the *net cost of reinsurance* — the cost of the reinsurance minus the expected recoveries — as an expense item in the indication, alongside the other [[Expense Provisions|expense provisions]]. Proportional reinsurance cedes premium and losses in the same proportion and may need no explicit treatment.
- Rating net directly is defensible only when the reinsurance structure is stable, because the net experience embeds the treaty terms of each historical year. A change in attachment point makes prior net years non-comparable, while gross years remain usable.
- Net experience is **less volatile** than gross — excess-of-loss reinsurance caps exactly the [[Large Loss|large losses]] that drive volatility — so net development patterns are frequently at or below gross ones, and a net tail factor larger than the gross one is generally not reasonable.
- On the reserving side, the [[Reinsurance Recovery|ceded triangle]] develops differently from the gross one: cessions attach to the large, slow, litigated claims, so ceded patterns are longer-tailed and thinner. Friedland does not prescribe one route: some actuaries analyze gross and ceded and derive net, others analyze gross and net, depending on data availability, the reinsurance programme and preference. What she requires is that gross, ceded and net stay consistent — in the data, in the judgments and in the selections — with net IBNR generally no greater than gross IBNR.

![[Media/Figures/Net_of_Reinsurance.svg|340]]

> [!example]- Gross, Ceded and Net Loss Ratios {Example}
> An insurer writes $\$2{,}000{,}000$ of gross earned premium and cedes $10\%$ ($\$200{,}000$) under a $\$500{,}000$ excess of $\$250{,}000$ treaty. Gross incurred losses are $\$1{,}300{,}000$, of which $\$150{,}000$ is recovered from the reinsurer.
>
> Compute the gross, ceded and net loss ratios, and comment on the treaty's result.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Gross LR} &= \frac{\$1{,}300{,}000}{\$2{,}000{,}000} = 65.0\% \\[6pt]
> > \text{Ceded LR} &= \frac{\$150{,}000}{\$200{,}000} = 75.0\% \\[6pt]
> > \text{Net LR} &= \frac{\$1{,}150{,}000}{\$1{,}800{,}000} = 63.9\%
> > \end{align*}$$
> >
> > The net loss ratio ($63.9\%$) is below the gross ($65.0\%$) precisely because the **ceded** loss ratio ($75.0\%$) is above it: the treaty removed a slice of business worse than the book average, so what remains looks better. The cedant paid $\$200{,}000$ and recovered $\$150{,}000$ of loss plus the volatility protection; the reinsurer's own margin on the year is thin.
> >
> > One year proves nothing either way. An excess treaty is *expected* to run a low ceded loss ratio in most years and a very high one occasionally, so the treaty is evaluated over a full cycle — and the cedant's true cost is the multi-year net cost of reinsurance (ceded premium less expected ceded losses), not any single year's recovery.

> [!example]- Loading the Net Cost of Reinsurance into an Indication {Example}
> A commercial property indication is built gross: projected loss and ALAE ratio $58\%$, fixed expense ratio $6\%$, variable expense ratio $22\%$, target underwriting profit $5\%$. The insurer cedes $\$3{,}000{,}000$ of premium against $\$2{,}100{,}000$ of expected ceded losses, on a gross earned premium base of $\$40{,}000{,}000$.
>
> Calculate the indicated rate change with and without the reinsurance cost.
>
> > [!answer]-
> > Without the reinsurance load:
> >
> > $$\begin{align*}
> > \text{Indicated factor} &= \frac{0.58 + 0.06}{1 - 0.22 - 0.05} \\
> > &= \frac{0.64}{0.73} \\
> > &= 0.877
> > \end{align*}$$
> >
> > an indicated change of $-12.3\%$.
> >
> > The net cost of reinsurance is ceded premium less expected ceded losses:
> >
> > $$\begin{align*}
> > \text{Net cost} &= \$3{,}000{,}000 - \$2{,}100{,}000 \\
> > &= \$900{,}000 \\[4pt]
> > \text{as a ratio} &= \frac{\$900{,}000}{\$40{,}000{,}000} \\
> > &= 2.25\%
> > \end{align*}$$
> >
> > Treating it as a fixed cost in the numerator:
> >
> > $$\begin{align*}
> > \text{Indicated factor} &= \frac{0.58 + 0.06 + 0.0225}{0.73} \\
> > &= \frac{0.6625}{0.73} \\
> > &= 0.908
> > \end{align*}$$
> >
> > an indicated change of $-9.2\%$. Ignoring the net cost of reinsurance would have given away three points of rate that the insurer needs to pay for its own protection.
