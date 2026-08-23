---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:732a75db70161e27a67d215d87d808e5b3d20dac148c54f46b7b1313aae5da82
  sources: []
  open_findings: 0
  log: .verify/Concepts/Net Losses.md
---

**Net Losses** are what the insurer ultimately bears: gross losses less every recovery — reinsurance cessions, [[Salvage and Subrogation|salvage and subrogation]], and [[Deductible Recovery|deductible recoveries]].

> $$\text{Net} = \text{Gross} - \text{Ceded} - \text{S\&S} - \text{Deductible Recoveries}$$

> $$\text{Net Ultimate} = \text{Gross Ultimate} - \text{Ceded Ultimate} - \text{Recovery Ultimate}$$

- Net is the figure that matters for **capital, solvency and the insurer's own results**, and it is the basis on which retained profitability is measured.
- It should be **derived, not developed**. Each component — gross, ceded, S&S, deductible recoveries — has its own emergence pattern, so each is projected separately and the net figure falls out of the subtraction. Developing a net triangle directly embeds whatever reinsurance structure was in force in each historical year.
- Net experience is **smoother than gross** because reinsurance truncates the volatility. That makes net data look more [[Credibility|credible]] than it is: the smoothing is bought, and its price is the net cost of reinsurance.
- Net loss ratios must be compared against **net** premium. Gross losses over net premium — or the reverse — misstates the ratio by the whole cost of the reinsurance programme.
- Net figures depend on recoveries actually **arriving**. Reinsurer insolvency, coverage disputes, and an insolvent large-deductible insured all convert an assumed recovery into a retained loss, so a net estimate carries credit risk that a gross estimate does not.

![[Media/Figures/Net_Losses.svg|340]]

> [!example]- Building the Net Figure {Example}
> Gross incurred losses $\$1{,}000{,}000$; excess-of-loss reinsurance recoverable $\$150{,}000$; salvage on total-loss vehicles $\$30{,}000$; subrogation from an at-fault third party $\$20{,}000$.
>
> Compute net losses.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Net} &= \$1{,}000{,}000 - \$150{,}000 \\
> > &\quad - \$30{,}000 - \$20{,}000 \\
> > &= \$800{,}000
> > \end{align*}$$
> >
> > The insurer paid claimants $\$1{,}000{,}000$ and will end up bearing $\$800{,}000$ — provided all three recoveries are collected. The $\$150{,}000$ reinsurance recoverable in particular is an asset on the balance sheet, not a reduction of the claim liability: if the reinsurer fails, the insurer still owes the policyholder.

> [!example]- Deriving Net Rather Than Developing It {Example}
> AY 2023 at $24$ months: gross reported $\$8{,}000{,}000$ with a gross CDF of $1.35$; ceded reported $\$1{,}500{,}000$ with a ceded CDF of $1.90$; S&S reported $\$240{,}000$ with an S&S CDF of $1.45$.
>
> Compute the net ultimate, and compare with developing the net diagonal at the gross factor.
>
> > [!answer]-
> > **Component by component:**
> >
> > $$\begin{align*}
> > \text{Gross ultimate} &= \$8{,}000{,}000 \times 1.35 = \$10{,}800{,}000 \\
> > \text{Ceded ultimate} &= \$1{,}500{,}000 \times 1.90 = \$2{,}850{,}000 \\
> > \text{S\&S ultimate} &= \$240{,}000 \times 1.45 = \$348{,}000 \\[4pt]
> > \text{Net ultimate} &= \$10{,}800{,}000 - \$2{,}850{,}000 - \$348{,}000 \\
> > &= \$7{,}602{,}000
> > \end{align*}$$
> >
> > **Developing net directly** at the gross factor:
> >
> > $$(\$8{,}000{,}000 - \$1{,}500{,}000 - \$240{,}000) \times 1.35 = \$8{,}451{,}000$$
> >
> > The shortcut is $\$849{,}000$ — over $11\%$ — too high, and the error is systematic rather than random: both the ceded layer and the recoveries develop *faster* than gross, so netting first and developing at the gross factor always under-credits them.
> >
> > This is the practical argument for the component approach. It costs three triangles instead of one, and it is the difference between an $11\%$ error and none.
