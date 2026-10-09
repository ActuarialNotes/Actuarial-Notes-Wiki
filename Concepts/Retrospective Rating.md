---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:fbadda2f5cd763309d7f87f2cd132fc457d4dc8a8cb42dac209b95002106d32d
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.15 pp.305-309 (PDF pp.317-321), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
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

![[Media/Figures/Retrospective_Rating.svg|340]]

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
