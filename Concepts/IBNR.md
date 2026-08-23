---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:65122a094818ffa6352fe431085ef5b14d20e7d9f76b3bc315e5296607f35f84
  sources: []
  open_findings: 0
  log: .verify/Concepts/IBNR.md
---

**IBNR** is the provision for claim cost that has been incurred but is not yet in the reported figures. In its **broad** sense — the one used in a reserve analysis — it is the gap between ultimate losses and reported losses, and it has two distinct components.

> $$\text{IBNR} = \text{Ultimate} - \text{Reported}$$

> $$\text{IBNR} = \underbrace{\text{Pure IBNR}}_{\text{unreported claims}} + \underbrace{\text{IBNER}}_{\text{development on known claims}}$$

- **Pure IBNR** (narrow IBNR) covers claims that have occurred but are unknown to the insurer. It is a function of the **reporting pattern** and is largest at immature ages and in [[Long Tail Lines|long-tail lines]].
- **IBNER** — incurred but not enough reported — is expected development on claims already in the case reserves. It is a function of **case reserving practice** and can be negative where reserves are set conservatively.
- Splitting the two requires a [[Claim Count Triangle|claim count triangle]]: develop counts to ultimate, subtract reported counts to get unreported claims, and value them at an expected severity. Pure IBNR falls out; IBNER is the remainder.
- The split matters when the two components move in different directions. A book that strengthens case reserves (IBNER falls) while reporting slows (pure IBNR rises) shows little change in total IBNR while both drivers have shifted materially.
- Every reserving method is a way of estimating IBNR. The [[Chain Ladder Method|chain ladder]] gets it by scaling reported losses; the [[Bornhuetter-Ferguson Method|BF]] method by applying the unreported percentage to an a priori; the [[Expected Loss Method|expected claims]] technique by subtracting reported from an a priori ultimate.
- **A claims-made book has no pure IBNR** by construction — every claim in a [[Report Year|report year]] is already reported — so its IBNR is entirely IBNER.

![[Media/Figures/IBNR.svg|340]]

> [!example]- Calculating IBNR {Example}
> An accident year has estimated ultimate losses of $\$1{,}200{,}000$, paid losses of $\$500{,}000$ and case reserves of $\$300{,}000$.
>
> Compute reported losses, IBNR and total unpaid claims.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Reported} &= \$500{,}000 + \$300{,}000 = \$800{,}000 \\[4pt]
> > \text{IBNR} &= \$1{,}200{,}000 - \$800{,}000 = \$400{,}000 \\[4pt]
> > \text{Unpaid} &= \text{Case} + \text{IBNR} \\
> > &= \$300{,}000 + \$400{,}000 = \$700{,}000
> > \end{align*}$$
> >
> > Check against the other definition of unpaid: $\$1{,}200{,}000 - \$500{,}000 = \$700{,}000 \;\checkmark$.
> >
> > Note that IBNR is a **balance**, not a claim-level amount: no individual claim has IBNR attached to it, which is why it is estimated in aggregate and why it cannot be verified against a claim file.

> [!example]- Splitting Pure IBNR from IBNER {Example}
> AY 2023 at $24$ months: reported losses $\$4{,}000{,}000$ on $500$ reported claims; ultimate losses estimated at $\$5{,}400{,}000$ and ultimate counts at $560$. Unreported claims are expected to average $\$8{,}000$ each.
>
> Split the IBNR.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Total IBNR} &= \$5{,}400{,}000 - \$4{,}000{,}000 \\
> > &= \$1{,}400{,}000 \\[6pt]
> > \text{Unreported claims} &= 560 - 500 = 60 \\[4pt]
> > \text{Pure IBNR} &= 60 \times \$8{,}000 = \$480{,}000 \\[4pt]
> > \text{IBNER} &= \$1{,}400{,}000 - \$480{,}000 = \$920{,}000
> > \end{align*}$$
> >
> > Two thirds of the IBNR is expected development on claims the insurer **already knows about**. That is a statement about case reserve adequacy: the $500$ reported claims carry case reserves the actuary expects to be $\$920{,}000$ short.
> >
> > This is worth surfacing to claims management, and it is worth checking against the average case outstanding diagnostic. If case adequacy has been stable and IBNER is consistently this large, the case reserving philosophy is systematically low — not wrong, necessarily, but a fact the reserve analysis has to keep re-estimating and one that makes reported development factors large.
> >
> > Note also that the $\$8{,}000$ expected severity on unreported claims is usually **below** the average reported severity, because late-reported claims tend to be smaller — using the book's overall average would overstate pure IBNR.
