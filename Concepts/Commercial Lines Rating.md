**Commercial Lines Rating** is the set of mechanisms that move a commercial risk's price away from the class manual rate toward its own expected cost. Commercial risks vary enormously within any class and the larger ones have enough volume for their own experience to carry [[Credibility|credibility]], so the manual rate is a starting point rather than an answer.

> $$\text{Standard Premium} = \text{Manual Premium} \times M_{\text{exp}} \times (1 + \text{schedule mods})$$

The mechanisms, in increasing order of how much risk the insured retains:

- **[[Experience Rating]]** — a statistical modification from the insured's own past losses, weighted by credibility. Prospective.
- **[[Schedule Rating]]** — judgmental debits and credits for risk characteristics the classification system misses. Prospective, and capped by filing.
- **[[Retrospective Rating]]** — the current policy's premium recalculated after the fact from its own losses, inside a minimum/maximum band.
- **Large deductible and [[Self-Insured Retention|self-insured retention]] programmes** — the insured funds losses below a substantial retention directly; the insurer provides excess coverage, claims services and, in a large-deductible plan, the statutory paper.

Further points:

- **Loss rating** replaces the manual rate entirely for very large accounts: the rate is built from the account's own developed and trended loss experience rather than from a class rate at all. It is the limiting case of experience rating at $Z = 1$.
- **Composite rating** simplifies administration for complex accounts by applying a single rate to one exposure base in place of many class rates — with an audit at expiry.
- The mechanisms **stack in a defined order**, and the [[Rating Algorithm|rating algorithm]] must specify it. Manual → schedule and experience mods → standard premium → premium discount (for size) → retro adjustment or deductible credit.
- Each step transfers more risk back to the insured, and each therefore reduces the insurer's [[Profit and Contingency Provision|risk charge]] — but increases credit exposure, since the insured owes money after the loss.

![[Media/Figures/Commercial_Lines_Rating.svg|340]]

> [!example]- Building Standard Premium {Example}
> A commercial auto risk has a manual premium of $\$50{,}000$, an experience modification of $1.15$, and schedule credits totalling $-5\%$.
>
> Compute the standard premium.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Experience-modified} &= \$50{,}000 \times 1.15 = \$57{,}500 \\[4pt]
> > \text{Standard premium} &= \$57{,}500 \times 0.95 = \$54{,}625
> > \end{align*}$$
> >
> > The insured pays $9.25\%$ above manual: its losses have run worse than the class average ($+15\%$), partially offset by favourable risk characteristics an underwriter has documented ($-5\%$).
> >
> > If this account then enters a retro plan, $\$54{,}625$ is the **standard premium** on which the basic premium factor, the minimum and the maximum are all computed.

> [!example]- Choosing a Rating Mechanism by Account Size {Example}
> Recommend a rating approach for three workers compensation accounts: (a) $\$40{,}000$ of manual premium, (b) $\$600{,}000$, (c) $\$8{,}000{,}000$.
>
> > [!answer]-
> > **(a) $\$40{,}000$ — manual plus schedule rating.** Too small to be experience rated meaningfully: at this size credibility is near zero, so a mod would sit close to $1.0$ whatever the record. Schedule rating gives the underwriter a way to reflect genuine risk differences prospectively.
> >
> > **(b) $\$600{,}000$ — experience rating, possibly with a small deductible.** Enough volume for partial credibility, so the mod carries real information. A retro plan is possible but the account may not want the cash-flow uncertainty, and at this size the net insurance charge for a tight band is expensive relative to the risk transferred.
> >
> > **(c) $\$8{,}000{,}000$ — retro plan or large deductible.** The account's own experience is essentially fully credible, so it is paying its own losses either way; the only questions are cash flow, collateral and who handles the claims. A large-deductible programme at, say, $\$500{,}000$ per occurrence leaves the insurer providing excess coverage, claims services and statutory compliance, while the account funds its own working-layer losses and captures the investment income on them.
> >
> > The progression is the general rule: **the larger the account, the less insurance it actually buys**, and the more the transaction becomes services plus catastrophe protection.
