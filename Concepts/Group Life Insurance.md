---
aliases:
  - Group Life
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:37e522fa5db99adba9f4421ed60b51fcb225a51fd4639f7a4e035d0ad6ee6224
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Group Life Insurance.md
---

**Group Life Insurance** is insurance that pays a death benefit when a covered member of a group dies, under one master contract issued to the [[Plan Sponsor|plan sponsor]], usually an employer. Almost all of it is yearly renewable [[Term Life Insurance|term insurance]] with no savings element, priced as a monthly rate per \$1,000 of insurance that depends on the ages and sexes of the members.

The monthly rate per \$1,000 for a member in age and sex cell $x$ is

> $$r_x = \frac{1{,}000\,q_x}{12\,(1 - \ell)}$$

- $q_x$ is the annual probability of death for a member in cell $x$.
- $\ell$ is the loading for expenses, risk and profit, as a share of premium.

The group's monthly premium, with $B_i$ the amount of insurance on member $i$, is

> $$P = \sum_{i} r_{x(i)} \times \frac{B_i}{1{,}000}$$

- $x(i)$ is the age and sex cell of member $i$.

The premium is charged on the amount of insurance, so the group's average rate is weighted by volume, not by headcount. Older members often have larger amounts as well as higher rates, so they carry much of the premium.

> [!example]- What are this group's monthly premium and average life rate? {Example}
> An employer provides basic life equal to two times salary, and accidental death and dismemberment (AD&D) for the same amounts at \$0.03 per \$1,000 a month. With illustrative monthly rates per \$1,000, the volume of insurance by age band is:
>
> | Age band | Volume (\$000) | Rate per \$1,000 |
> | :--- | ---: | ---: |
> | Under 35 | 12,000 | 0.08 |
> | 35 to 44 | 18,000 | 0.12 |
> | 45 to 54 | 15,000 | 0.25 |
> | 55 to 64 | 9,000 | 0.55 |
>
> > [!answer]-
> > - The volume is already in thousands, so each band's premium is its volume times its rate: \$960, \$2,160, \$3,750 and \$4,950.
> > - The life premium is $960 + 2{,}160 + 3{,}750 + 4{,}950 = \$11{,}820$ a month.
> > - The total volume is \$54,000 thousand, so the average life rate is $11{,}820/54{,}000 = \$0.2189$ per \$1,000.
> > - The AD&D premium is $0.03 \times 54{,}000 = \$1{,}620$ a month.
> > - The group pays $11{,}820 + 1{,}620 = \$13{,}440$ a month.
> > - The 55 to 64 band holds 17% of the volume but pays 42% of the life premium, so the average rate rises quickly as the workforce ages, even with no change in the rate table.

## Experience rating at renewal

For larger groups the rate also depends on the group's own claims. With $r$ the manual rate, the renewal rate is

> $$r' = Z\,\frac{A}{E}\,r + (1 - Z)\,r$$

- $A$ and $E$ are the group's actual and expected claims over the experience period.
- $Z$ is the [[Credibility|credibility]] given to the group's experience.

Deaths are rare, so a group needs far more members for its life experience to be credible than for its medical experience. Giving full weight to a bad year for a mid-sized group overreacts to one or two deaths.

> [!example]- What is this group's renewal rate? {Example}
> A group has \$200 million of group life in force. Its manual claim cost is \$0.24 per \$1,000 a month, and the manual rate, with a 20% loading, is \$0.30. Over the last 36 months its claims were \$2,400,000. Its experience is given an illustrative credibility of 35%.
>
> > [!answer]-
> > - Expected claims over the period are $0.24 \times 200{,}000 \times 36 = \$1{,}728{,}000$.
> > - The ratio of actual to expected claims is $2{,}400{,}000/1{,}728{,}000 = 1.3889$.
> > - The credibility-weighted claim cost is $0.24 \times (0.35 \times 1.3889 + 0.65) = \$0.2727$ per \$1,000.
> > - With the 20% loading, the renewal rate is $0.2727/0.80 = \$0.341$ per \$1,000, a 13.6% increase.
> > - The group's claims were 39% above expected, but at 35% credibility only part of that passes into the rate.

## Benefit provisions

The amount of insurance is usually a flat sum or a multiple of salary, such as one or two times annual earnings, and may differ by class of employee. Amounts up to a limit are issued without evidence of insurability, and amounts above it need medical evidence. Optional supplemental life paid by the employee invites [[Adverse Selection|adverse selection]], so it carries tighter evidence rules.

Accidental death and dismemberment (AD&D) pays a principal sum if the member dies from an accident, and a scheduled share of it for the loss of a limb or sight. It pays in addition to the basic life benefit and is usually rated per \$1,000 without regard to age.

Dependent life pays small amounts on the death of a spouse or child, often as a flat schedule. It is a convenience for the member and a minor part of the cost.

Under waiver of premium, a member who becomes totally disabled keeps the life coverage without paying premiums while disabled. The insurer holds a reserve for the expected death benefits of disabled members, valued with disability termination rates like a disabled life [[Claim Reserve|claim reserve]].

Under conversion and portability, a member who leaves the group may convert the coverage to an individual policy without evidence of insurability. Those who convert are often in poor health, so converted lives have high [[Mortality|mortality]], and the excess cost is charged back to the group plan.

## Risks to the insurer

A group's claims swing widely from year to year, and one large claim can exceed several years of premium. Many members working at one site expose the insurer to a single catastrophe. For both reasons, group life writers buy catastrophe reinsurance and pool claims above a set amount.

> [!trap] Monthly rates against annual claims
> Group life rates are usually quoted per \$1,000 per month. Applying a monthly rate to annual claims, or the reverse, puts the answer off by a factor of 12. In the renewal example, expected claims over 36 months use the monthly claim cost times 36.
