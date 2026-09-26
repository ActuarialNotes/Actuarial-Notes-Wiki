---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:69a5de16e467e750dbb3f11432873426a748dcbcd322b8eb147b3fa17a75e5cd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/TRIA.md
---

**TRIA** — the Terrorism Risk Insurance Act of 2002, as extended — creates the federal Terrorism Risk Insurance Program, under which the U.S. Treasury shares the insured losses from a **certified act of terrorism** with commercial property and casualty insurers, in exchange for requiring those insurers to **make terrorism coverage available**. It is a federal backstop with no premium in advance: the government's share is paid after an event and partly recouped afterwards.

> $$D_i = 0.20 \times \text{DEP}_i$$

> $$\text{Federal payment}_i = 0.80 \times (L_i - D_i)^+$$

- **Symbols.** $D_i$ is insurer $i$'s deductible, $\text{DEP}_i$ its direct earned premium in TRIA-eligible lines for the **prior** calendar year, and $L_i$ its insured losses from certified acts in the year; $(x)^+ = \max(x, 0)$. Above its deductible the insurer keeps a $20\%$ co-share.
- **Triggers and cap.** No federal payment is made unless industry insured losses from certified acts in the year exceed the **$\$200$ million program trigger**. Payments stop at a **$\$100$ billion annual cap**; an insurer that has met its deductible is not liable for losses above the cap either.
- **Certification.** The Secretary of the Treasury, in consultation with the Secretary of Homeland Security and the Attorney General, certifies an act as terrorism; an act causing $\$5$ million or less of property and casualty losses cannot be certified. Domestic terrorism has qualified since the 2007 extension removed the original requirement of a foreign actor.
- **Make-available requirement.** In covered lines, insurers must offer terrorism coverage on terms not materially different from the policy's other coverage, and disclose its premium; the policyholder may decline it. Covered lines are commercial property and casualty lines, including workers' compensation; personal lines, medical malpractice, commercial auto, surety and reinsurance are among those excluded.
- **Recoupment.** If insurers' uncompensated losses (deductibles plus co-shares) fall short of the **insurance marketplace aggregate retention amount** — since 2020, the average of total insurer deductibles over the prior three years — Treasury **must** recoup its payments up to the shortfall, collecting $140\%$ of that amount through surcharges on commercial policies. Above the retention, recoupment is discretionary.
- **Status and rationale.** Extended in 2005, 2007, 2015 and 2019; the 2019 reauthorization runs the program to **December 31, 2027**, and a further reauthorization was moving through Congress in 2026. Each extension shifted more risk to insurers (the federal share has fallen from $90\%$ to $80\%$). Terrorism is hard to insure privately: frequency is not estimable from history, losses can be enormous and concentrated, and the risk responds to government policy. After 2001 reinsurers withdrew capacity, and the program exists to keep commercial coverage available. Compare [[Catastrophe Risk]] and [[Government and Industry Insurance Programs]].

> [!example]- Splitting a Certified Loss {Example}
> A certified attack causes $\$6$ billion of industry insured losses. One insurer, with $\$2.5$ billion of prior-year direct earned premium in eligible lines, has $\$1.2$ billion of insured losses. Find the federal payment and the insurer's retained loss.
>
> > [!answer]-
> > Industry losses exceed the $\$200$ million trigger, so the program responds.
> >
> > $$
> > \begin{align*}
> > D &= 0.20 \times \$2.5\text{B} \\
> > &= \$500\text{M} \\[4pt]
> > \text{Federal payment} &= 0.80 \times (\$1{,}200\text{M} - \$500\text{M}) \\
> > &= \$560\text{M} \\[4pt]
> > \text{Retained} &= \$500\text{M} + 0.20 \times \$700\text{M} \\
> > &= \$640\text{M}
> > \end{align*}
> > $$
> >
> > The insurer keeps $53\%$ of its loss. Its deductible is a fifth of a year's premium — which is why terrorism accumulation, not the federal share, drives its reinsurance and capital needs.

> [!example]- Is the Federal Share Really Federal? {Example}
> Continue the event above. Across all insurers, federal payments total $\$1.8$ billion and insurers' uncompensated losses total $\$4.2$ billion. Suppose the insurance marketplace aggregate retention amount for the year is $\$50$ billion. How much must be recouped?
>
> > [!answer]-
> > Uncompensated losses fall short of the retention by $\$50\text{B} - \$4.2\text{B} = \$45.8$ billion, which exceeds the $\$1.8$ billion Treasury paid, so the whole payment is subject to mandatory recoupment:
> >
> > $$
> > \begin{align*}
> > \text{Surcharges collected} &= 1.40 \times \$1.8\text{B} \\
> > &= \$2.52\text{B}
> > \end{align*}
> > $$
> >
> > For an event of this size the federal payment is effectively a **loan** to the industry, repaid by commercial policyholders with a $40\%$ loading. Treasury bears losses permanently only in an event large enough that insurers' retained losses exceed the marketplace retention. TRIA is therefore two things at once: liquidity for moderate events, and genuine federal risk-bearing for extreme ones.
