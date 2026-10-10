---
aliases:
  - Group Life
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:caef5fef12e7ffc07b5c460859970de4481e8aa74ea470c9f140419135a03166
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Group Life Insurance.md
---
**Group Life Insurance** pays a death benefit when a covered member of a group dies, under one master contract issued to the [[Plan Sponsor|plan sponsor]], usually an employer. Almost all of it is yearly renewable [[Term Life Insurance|term insurance]] with no savings element, priced as a monthly rate per \$1,000 of insurance that depends on the ages and sexes of the members, and for larger groups on their own claims. Common additions are accidental death and dismemberment (AD&D), dependent life, waiver of premium on disability, and the right to convert to an individual policy on leaving the group.

> $$r_x = \frac{1{,}000\,q_x}{12\,(1 - \ell)}$$

> $$P = \sum_{i} r_{x(i)} \times \frac{B_i}{1{,}000}$$

> $$r' = Z\,\frac{A}{E}\,r + (1 - Z)\,r$$

- **Symbols:** $q_x$ is the annual probability of death for a member in age and sex cell $x$, $\ell$ is the loading for expenses, risk and profit as a share of premium, and $r_x$ is the resulting monthly rate per \$1,000. $B_i$ is member $i$'s amount of insurance, so $P$ is the group's monthly premium. In the renewal formula, $r$ is the manual rate, $A$ and $E$ are the group's actual and expected claims over the experience period, and $Z$ is the [[Credibility|credibility]] given to its experience.
- **Benefit schedules:** The amount is usually a flat sum or a multiple of salary, such as one or two times annual earnings, and may differ by class of employee. Amounts up to a limit are issued without evidence of insurability, and amounts above it need medical evidence. Optional supplemental life paid by the employee invites [[Adverse Selection|adverse selection]], so it carries tighter evidence rules.
- **AD&D:** Accidental death and dismemberment pays a principal sum if the member dies from an accident, and a scheduled share of it for the loss of a limb or sight. It pays in addition to the basic life benefit and is usually rated per \$1,000 without regard to age.
- **Dependent life:** Small amounts are paid on the death of a spouse or child, often as a flat schedule. They are a convenience for the member and a minor part of the cost.
- **Waiver of premium:** A member who becomes totally disabled keeps the life coverage without paying premiums while disabled. The insurer holds a reserve for the expected death benefits of disabled members, valued with disability termination rates like a disabled life [[Claim Reserve|claim reserve]].
- **Conversion and portability:** A member who leaves the group may convert the coverage to an individual policy without evidence of insurability. Those who convert are often in poor health, so converted lives have high [[Mortality|mortality]], and the excess cost is charged back to the group plan.
- **Risks:** Deaths are rare, so a group's claims swing widely from year to year, and one large claim can exceed several years of premium. Many members working at one site expose the insurer to a single catastrophe, which is why group life writers buy catastrophe reinsurance and pool claims above a set amount.

> [!example]- Monthly Premium for a Small Group {Example}
> An employer provides basic life equal to two times salary. With illustrative monthly rates per \$1,000, the volume of insurance by age band is:
>
> | Age band | Volume (\$000) | Rate per \$1,000 |
> |---|---|---|
> | Under 35 | 12,000 | 0.08 |
> | 35 to 44 | 18,000 | 0.12 |
> | 45 to 54 | 15,000 | 0.25 |
> | 55 to 64 | 9,000 | 0.55 |
>
> AD&D for the same amounts is \$0.03 per \$1,000 a month. Find the monthly premium and the average life rate.
>
> > [!answer]-
> > The volume in the table is already in thousands, so each band's premium is its volume times its rate.
> > $$
> > \begin{align*}
> > P_{\text{life}} &= 960 + 2{,}160 + 3{,}750 + 4{,}950 \\
> > &= 11{,}820 \\
> > \bar{r} &= \frac{11{,}820}{54{,}000} \\
> > &= 0.2189 \\
> > P_{\text{AD\&D}} &= 0.03 \times 54{,}000 \\
> > &= 1{,}620
> > \end{align*}
> > $$
> > The group pays \$13,440 a month. The 55 to 64 band holds only 17% of the volume but pays 42% of the life premium, so the average rate rises quickly as the workforce ages, even with no change in the rate table.

> [!example]- Renewal With Partial Credibility {Example}
> A group has \$200 million of group life in force. Its manual claim cost is \$0.24 per \$1,000 a month and the manual rate, with a 20% loading, is \$0.30. Over the last 36 months, claims were \$2,400,000. With an illustrative credibility of 35%, find the renewal rate.
>
> > [!answer]-
> > Expected claims over the period use the manual claim cost.
> > $$
> > \begin{align*}
> > E &= 0.24 \times 200{,}000 \times 36 \\
> > &= 1{,}728{,}000 \\
> > \frac{A}{E} &= \frac{2{,}400{,}000}{1{,}728{,}000} \\
> > &= 1.3889 \\
> > c' &= 0.24\,\big(0.35(1.3889) + 0.65\big) \\
> > &= 0.2727 \\
> > r' &= \frac{0.2727}{0.80} \\
> > &= 0.3408
> > \end{align*}
> > $$
> > The renewal rate is \$0.341 per \$1,000, a 13.6% increase. The group's claims were 39% above expected, but at 35% credibility only part of that passes into the rate, because a few deaths in a group this size say little about its true mortality.

> [!tip]- How it appears on the exam
> - **GH-101 plan provisions:** Questions ask candidates to describe the group life contract and its additions, such as AD&D, dependent life, waiver of premium and conversion, and to evaluate the moral hazard and the financial and legal risks each creates.
> - **GH-101 manual rates:** Group life is one of the contracts the manual rate objectives cover. A question builds the premium from a rate table and a census, or sets a renewal rate by blending the group's experience with the manual rate.

> [!warning]- Exam traps
> - **Monthly versus annual rates:** Group life rates are usually quoted per \$1,000 per month. Applying a monthly rate to annual claims, or the reverse, puts the answer off by a factor of 12.
> - **Volume, not headcount:** The premium is charged on the amount of insurance, so the average rate is weighted by volume. Averaging the rates over members gives too little weight to older, highly paid members with large amounts.
> - **Low credibility:** Mortality is a low-frequency risk, so a group needs far more members for its life experience to be credible than for its medical experience. Giving full weight to a bad year for a mid-sized group overreacts to one or two deaths.
> - **AD&D is not age-rated:** AD&D pays only on accidental death or injury and is usually rated without regard to age. Applying the age-based life table to AD&D volume overstates its cost.
