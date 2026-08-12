**Retrospective Rating** adjusts a policy's premium *after* the period, based on the insured's own losses during that period, within a guaranteed minimum and maximum. Unlike [[Experience Rating|experience rating]], which uses past years to price the coming one, a retro plan charges the insured for its own current-year experience.

> $$R = \left(\text{BP} + \text{CL} \times \text{LCF}\right) \times \text{TM}$$

> $$\text{Retro Premium} = \min\!\left(\max(R,\, R_{\min}),\, R_{\max}\right)$$

- **Basic premium (BP)** covers the insurer's non-LAE expenses, profit, and the **net insurance charge** — the cost of the maximum and minimum guarantees. It is expressed as a basic premium factor times standard premium.
- **Converted losses (CL × LCF)** are the insured's actual limited losses multiplied by the **loss conversion factor**, which loads them for loss adjustment expense.
- **Tax multiplier (TM)** grosses the whole thing up for premium taxes, licences, fees and assessments, which are payable on the premium actually collected.
- An **excess loss premium** is added when the plan limits individual claims: the insured pays a charge for the per-occurrence cap rather than bearing the whole of a large loss.
- The **maximum** protects the insured against a bad year, the **minimum** protects the insurer against a good one. Together they define how much risk is actually transferred; a plan with a tight max/min band is close to guaranteed cost, a wide one close to self-insurance. The **net insurance charge** in the basic premium is the price of that band, and is derived from Table M (insurance charges by entry ratio and risk size).
- Retro plans suit **large accounts** with credible volume, and they align incentives directly: every dollar of loss inside the band costs the insured $\text{LCF} \times \text{TM}$ dollars of premium. They also expose the insurer to credit risk, since additional premium is billed after the fact.

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
