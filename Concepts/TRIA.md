---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:63732db0f3a05cea2f7a67944db7f675ea13d411b9e0ffb1c9b0f95ca5435197
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/TRIA.md
---
**TRIA** is the Terrorism Risk Insurance Act of 2002, as extended. It creates the federal Terrorism Risk Insurance Program, under which the U.S. Treasury shares the insured losses from a **certified act of terrorism** with commercial property and casualty insurers, in exchange for requiring those insurers to **make terrorism coverage available**.

The program charges no premium in advance. The government's share is paid after an event and partly recouped afterwards. Each insurer first retains a deductible, and the deductible of insurer $i$ is

> $$D_i = 0.20 \times \text{DEP}_i$$

- $\text{DEP}_i$ is the insurer's direct earned premium in TRIA-eligible lines for the **prior** calendar year.

Above its deductible the insurer keeps a $20\%$ co-share, so the federal payment to insurer $i$ is

> $$\text{Federal payment}_i = 0.80 \times (L_i - D_i)^+$$

- $L_i$ is the insurer's insured losses from certified acts in the year.
- $(x)^+ = \max(x, 0)$.

No federal payment is made unless industry insured losses from certified acts in the year exceed the **$\$200$ million program trigger**. Payments stop at a **$\$100$ billion annual cap**. An insurer that has met its deductible is not liable for losses above the cap either.

> [!example]- What is the federal payment to this insurer, and what loss does it retain? {Example}
> A certified attack causes $\$6$ billion of industry insured losses. One insurer, with $\$2.5$ billion of prior-year direct earned premium in eligible lines, has $\$1.2$ billion of insured losses.
>
> > [!answer]-
> > - Industry losses exceed the $\$200$ million trigger, so the program responds.
> > - The deductible is $0.20 \times \$2{,}500\text{M} = \$500\text{M}$.
> > - The federal payment is $0.80 \times (\$1{,}200\text{M} - \$500\text{M}) = \$560\text{M}$.
> > - The insurer retains its deductible plus its co-share, $\$500\text{M} + 0.20 \times \$700\text{M} = \$640\text{M}$, which is $53\%$ of its loss.

## Certification

The Secretary of the Treasury, in consultation with the Secretary of Homeland Security and the Attorney General, certifies an act as terrorism. An act causing $\$5$ million or less of property and casualty losses cannot be certified. Domestic terrorism has qualified since the 2007 extension removed the original requirement of a foreign actor.

## The make-available requirement

In covered lines, insurers must offer terrorism coverage on terms not materially different from the policy's other coverage, and disclose its premium. The policyholder may decline it. Covered lines are commercial property and casualty lines, including workers' compensation. Personal lines, medical malpractice, commercial auto, surety and reinsurance are among those excluded.

## Recoupment

Insurers' uncompensated losses are their deductibles plus their co-shares. If these fall short of the **insurance marketplace aggregate retention amount**, Treasury **must** recoup its payments up to the shortfall. Since 2020 the retention amount has been the average of total insurer deductibles over the prior three years. The mandatory recoupment is collected through surcharges on commercial policies, and the amount collected is

> $$\text{Surcharges} = 1.40 \times \text{Mandatory recoupment}$$

Above the retention, recoupment is discretionary.

> [!example]- How much must be recouped after this event, and how much is collected in surcharges? {Example}
> Across all insurers, federal payments total $\$1.8$ billion and insurers' uncompensated losses total $\$4.2$ billion. The insurance marketplace aggregate retention amount for the year is $\$50$ billion.
>
> > [!answer]-
> > - Uncompensated losses fall short of the retention by $\$50\text{B} - \$4.2\text{B} = \$45.8\text{B}$.
> > - The shortfall exceeds the $\$1.8$ billion Treasury paid, so the whole payment is subject to mandatory recoupment.
> > - The surcharges collected are $1.40 \times \$1.8\text{B} = \$2.52\text{B}$.
> > - For an event of this size the federal payment works as a loan to the industry, repaid by commercial policyholders with a $40\%$ loading.

Treasury bears losses permanently only in an event large enough that insurers' retained losses exceed the marketplace retention.

## Why the program exists

Terrorism is hard to insure privately. Its frequency cannot be estimated from history, its losses can be enormous and concentrated, and the risk responds to government policy. After 2001 reinsurers withdrew capacity, and the program exists to keep commercial coverage available. Compare [[Catastrophe Risk]] and [[Government and Industry Insurance Programs]].

The act was extended in 2005, 2007, 2015 and 2019. The 2019 reauthorization runs the program to **December 31, 2027**. Each extension shifted more risk to insurers, and the federal share has fallen from $90\%$ to $80\%$.

> [!trap] Applying the federal share from the first dollar
> The federal share applies only to losses above the deductible. An insurer with $\$400$ million of prior-year premium and $\$150$ million of losses has an $\$80$ million deductible, so the federal payment is $0.80 \times \$70\text{M} = \$56\text{M}$, not $0.80 \times \$150\text{M} = \$120\text{M}$.
