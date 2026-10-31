---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:cf774ea9e04701fd14988c92280ad2f3ddb96a4e736c6bde11253f48cf6dafd4
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.15 pp.305-309 (PDF pp.317-321), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 §3 and §7, PDF pp.22-26, 31 incl. fn.6 and fn.12; Ch.3 §2.2 Formulas 3.1-3.5, PDF pp.58-63; Table L PDF p.84; ICRLL PDF pp.89-90; answers PDF pp.116-117, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Retrospective Rating.md
---

**Retrospective Rating** adjusts a policy's premium *after* the period, based on the insured's own losses during that period, within a guaranteed minimum and maximum. Unlike [[Experience Rating|experience rating]], which uses past years to price the coming one, a retro plan charges the insured for its own current-year experience.

> $$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$

> $$\text{Retro Premium} = \min\!\left(\max(R,\, R_{\min}),\, R_{\max}\right)$$

- **Basic premium (BP)** covers the insurer's non-LAE expenses, profit, and the **net insurance charge** — the cost of the maximum and minimum guarantees. It is expressed as a basic premium factor times standard premium.
- **Converted losses** $(L \times \text{LCF})$ are the insured's reported losses $L$, limited by any per-accident limit, multiplied by the **loss conversion factor**, which loads them for the ALAE not already in the losses plus ULAE.
- **Tax multiplier (TM)** grosses the whole thing up for premium taxes and related assessments.
- When the plan limits individual losses (a per-accident loss limitation), the insured pays for that limit too: its cost is either built into the table of insurance charges or, in some plans, computed as a separate additional charge.
- The **maximum** protects the insured against a bad year, the **minimum** protects the insurer against a good one. Together they define how much risk is actually transferred; a plan with a tight max/min band is close to guaranteed cost, a wide one close to self-insurance. The **net insurance charge** in the basic premium — the insurance charge for the maximum less the insurance savings for the minimum — is the price of that band; the charge and savings come from a table of values, expressed as a percentage of expected unlimited losses (deriving the table is beyond Werner's scope).
- Retro plans suit **large accounts** with credible volume, and they align incentives directly: every dollar of loss inside the band costs the insured $\text{LCF} \times \text{TM}$ dollars of premium. Conceptually a retro plan is close to self-insurance, except that its loss limits and its maximum and minimum leave some risk with the insurer.
- The share of expected loss below the per-accident limit, the part that enters ratable losses, is the limit's [[Loss Elimination Ratio]].

![[Media/Figures/Retrospective_Rating.svg|340]]

## The formula in full

Fisher et al. write the plan as $R = (B + cL) \times T$, with basic premium amount $B$, loss conversion factor $c$, ratable losses $L$ and tax multiplier $T = 1/(1 - \text{tax rate})$.

- **What $B$ holds.** The basic premium amount covers the charges that don't vary with actual losses: fixed expenses (underwriting, and commission if it is fixed or a percentage of guaranteed-cost premium), the expected **per-occurrence excess losses** if ratable losses are subject to a per-occurrence loss limit (sometimes kept separate as an *excess loss premium*, as in the NCCI and ISO plans), the expected **aggregate excess losses** for the maximum (the insurance charge), less a credit for the minimum (the savings), and the underwriting profit provision. The charges for per-occurrence and aggregate excess losses need $c$ applied to them, because $c$ is meant to apply to total losses.
- **The expense part of $B$** is $e - (c - 1)E$ as a percentage of guaranteed-cost premium, where $e$ is the expense ratio underlying the guaranteed-cost premium. That expense ratio already **reflects the premium discount** (expenses are a lower percentage of premium for large accounts), so in a retro plan the premium discount is implicit in the basic premium rather than a separate step. Setting the expected retro premium equal to $e + E$ gives
  $B = e - (c - 1)E + c\,[\phi(r_G) - \psi(r_H)]\,E$, with the charge $\phi$ and savings $\psi$ from [[Table M]].
- **No stated minimum.** Even with no minimum ratable loss there is still a minimum premium: with $L = 0$ the formula gives $B \times T$. So with no stated minimum, $H = BT$, the minimum entry ratio is $r_H = 0$, and the savings term is $\psi(0) = 0$.
- **Moving the per-occurrence limit.** The total expected loss always equals the expected per-occurrence excess losses, plus the expected aggregate excess losses (net of savings), plus the expected ratable losses. Raising the per-occurrence limit moves expected loss out of the per-occurrence excess charge in $B$ and into the expected ratable losses and the aggregate excess charge, dollar for dollar in total, and all of them carry the same $c$.
- **Balanced plans.** Under a balanced plan the expected premium is the same regardless of the retrospective policy provisions, such as the per-occurrence limit. The actual premium can still vary: it is lower only if actual losses come in lower than expected, and higher if they come in higher. Some US filed plans require this balance; Fisher et al. argue it does not make sense given the different risk transfer and capital needed, though the expected losses should still be balanced.
- **Per-occurrence limit and maximum overlap.** Capping each occurrence makes it less likely that ratable losses reach the maximum, so the two charges are not additive; the aggregate charge is priced on limited losses ([[Table L]], Table M$_D$, or the NCCI's [[Insurance Charge Reflecting Loss Limitation (ICRLL)|ICRLL]] procedure). The areas are drawn in a [[Lee Diagram]].

## The balance equations

Given the maximum premium $G$ and minimum premium $H$, the entry ratios and charges are solved from two equations (Fisher et al. derive them ignoring tax; with tax, divide the premiums by $T$):

> $$r_G - r_H = \frac{G - H}{c\,E\,T}$$

> $$\phi(r_H) - \phi(r_G) = \frac{(e + E) - H/T}{c\,E}$$

- They come from $G/T = B + c\,r_G E$, $H/T = B + c\,r_H E$, and the expected premium $e + E = B + c\,\mathrm{E}\{L\}$. One searches the Table M column for the pair of entry ratios that satisfies both.
- **With a per-occurrence limit**, the entry ratios and the charges are those of the limited losses: use the expected limited loss $\mathrm{E}\{A_D\}$ in place of $E$ in both denominators, while $e + E$ keeps the total expected loss. In table terms, $r_G - r_H = (G - H)/(c\,\mathrm{E}\{A_D\}\,T)$ and $\phi_D(r_H) - \phi_D(r_G) = (e + E - H/T)/(c\,\mathrm{E}\{A_D\})$.
- **With no minimum**, $r_H = 0$ and $\psi(r_H) = 0$. Then $G/T = e + E + cE\,\psi(r_G)$, so the balance equation reduces to $\psi(r_G) = \big(G/T - (E + e)\big)/(cE)$.
- **Finding the entry ratio in an ELG table.** The NCCI's 1998 Table M is published by Expected Loss Group. Choose the column from the expected loss times the state/hazard group relativity; the adjusted figure selects the column only, and the entry ratios and charges are applied to the unadjusted $E$ in the premium formulas.
- **Solving for $r_G$ with no minimum.** Since $\psi(r_G) = \phi(r_G) + r_G - 1$, the no-minimum balance equation fixes the value of $\phi(r_G) + r_G$. Search that ELG's column for the entry ratio $r_G$ whose $r_G + \phi(r_G)$ equals it; the loss at the maximum premium is then $r_G E$.

## Retrospective development

- Incurred loss retro plans are typically first evaluated 6 months after policy expiration (18 months of development) and annually thereafter. Losses at 18 months are usually far below ultimate, so the insured typically receives a partial **refund** at the first adjustment, and then pays **additional premium** as losses develop upward — which creates [[Credit Risk|credit risk]] for the insurer.
- To protect itself, the insurer can apply **loss development factors** to the losses in the retro formula, established up front when the plan is written. Under both the NCCI's and ISO's plans the provision for IBNR is made through factors applied to standard premium and then multiplied by the loss conversion factor and the tax multiplier, for the first three adjustments (NCCI) or the first four (ISO). The development premium brings early adjustments nearer the final premium, so less is refunded and later recouped.
- Fisher et al. give no formula for the provision itself. A development factor to ultimate $f$ takes reported limited losses $U/f$ to the ultimate limited loss $U$, so the future development of limited losses it provides for is $U(1 - 1/f)$.
- Paid loss plans are typically not given development factors, since they are meant to mimic a large deductible's cash flows.

> [!example]- Computing a Retrospective Premium {Example}
> A workers compensation policy has standard premium of $\$500{,}000$, basic premium $\$100{,}000$, loss conversion factor $1.10$, tax multiplier $1.03$, minimum retro premium $\$300{,}000$ and maximum $\$800{,}000$. Actual limited losses are $\$350{,}000$.
>
> Compute the retro premium.
>
> > [!answer]-
> > $$\begin{align*}
> > R &= \left(\$100{,}000 + \$350{,}000 \times 1.10\right) \times 1.03 \\
> > &= \left(\$100{,}000 + \$385{,}000\right) \times 1.03 \\
> > &= \$485{,}000 \times 1.03 \\
> > &= \$499{,}550
> > \end{align*}$$
> >
> > This lies between the $\$300{,}000$ minimum and the $\$800{,}000$ maximum, so the final premium is $\$499{,}550$ — slightly below the $\$500{,}000$ standard premium, reflecting losses close to but a little better than expected.

> [!example]- How the Band Changes the Risk Transfer {Example}
> Using the same plan parameters, compute the retro premium at limited losses of $\$100{,}000$, $\$350{,}000$ and $\$900{,}000$, and describe what the insured is actually buying.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Losses } \$100\text{K}: \; R &= (100 + 110) \times 1.03 = \$216{,}300 \\
> > &\Rightarrow \text{floored at } \$300{,}000 \\[6pt]
> > \text{Losses } \$350\text{K}: \; R &= \$499{,}550 \\[6pt]
> > \text{Losses } \$900\text{K}: \; R &= (100 + 990) \times 1.03 = \$1{,}122{,}700 \\
> > &\Rightarrow \text{capped at } \$800{,}000
> > \end{align*}$$
> >
> > Inside the band, each extra dollar of loss costs the insured
> >
> > $$1.10 \times 1.03 = \$1.133$$
> >
> > Outside it, nothing. So the insured is buying:
> >
> > - **Full retention** of losses between roughly $\$174$K and $\$615$K — the loss levels that map to the minimum and maximum, from $(100 + 1.10L)(1.03) = 300$ and $= 800$,
> > - **Insurance** above $\$615$K — the insurer absorbs the $\$322{,}700$ excess in the third scenario,
> > - and it **gives up** the benefit of results better than $\$174$K, which is what pays for that protection.
> >
> > The net insurance charge inside the basic premium is precisely the expected value of that asymmetry. Widen the max and the charge falls; tighten it and the plan converges to a guaranteed-cost policy at a guaranteed-cost price.
