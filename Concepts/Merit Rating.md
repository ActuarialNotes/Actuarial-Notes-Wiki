---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:c18277345ccb0d005a0ebaf7402747f364eac4a3533a3ec61c53c5a64d7bade0
  sources:
    - "W. J. Hazam, Discussion of Bailey & Simon, An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car, PCAS XLVII (1960), pp.150-152, PDF pp.1-3, sha256:48b8d420ffd358904509532447e15d50df0d5b1756c2026f81e8d058a02f09e4 — https://www.casact.org/sites/default/files/database/proceed_proceed60_60150.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Merit Rating.md
---

**Merit Rating** is [[Experience Rating|experience rating]] of a single private passenger car by placing it in a class according to the number of full years since its most recent accident (or since the insured became licensed). Bailey and Simon used the Canadian merit rating plan's experience to measure the credibility $Z$ of one car's experience.

> $$\text{Modification} = ZR + (1 - Z)$$

> $$Z_{\text{accident-free}} = 1 - \frac{\text{frequency of the accident-free group}}{\text{frequency of all risks}}$$

- In the experience rating formula, $Z$ is the credibility and $R$ is the ratio of the risk's past experience to the average of all risks. Setting the modification equal to the group's subsequent experience relative to all risks, and $R$ equal to its past experience relative to all risks, the formula can be solved for the credibility.
- **Accident-free risks.** For accident-free risks $R = 0$, so the credibility equals $1 -$ Modification. The modification is the group's relative claim frequency: the group's claim frequency divided by the claim frequency of all risks. So the credibility of an accident-free group is $1$ minus its relative claim frequency.
- **The classes.** In the Canadian plan the merit ratings A, X, Y and B correspond to three or more, two, one and no years since the most recent accident. The classes are cumulative. A + X is the experience for two or more accident-free years, and A + X + Y is the experience for one or more accident-free years. A group's claims and its premium are the sums over the classes it includes.
- **Experience periods.** A + X + Y gives the credibility of a one-year experience period, A + X of a two-year period and A of a three-year period.
- **Working the data.** Earned premiums are converted to a common rate basis by use of the relationship in the rate structure that A:X:Y:B = 65:80:90:100. Dividing a class's earned premium at present rates by its merit factor relative to B puts it at B rates. Claim frequency is the number of claims incurred per \$1,000 of premium at B rates. Each group's relative claim frequency is its frequency divided by the frequency of the total of all classes.
- **Premium, not car years, as the exposure base.** Bailey and Simon calculate relative claim frequency on the basis of premium rather than car years. This avoids the maldistribution created by having higher claim frequency territories produce more X, Y and B risks and also produce higher territorial premiums. With car years as the base, the X, Y and B classes would be concentrated in the high-frequency territories. Their claim frequencies would then differ from the A class's partly because of territory, not merit alone.
- **What the premium base assumes.** Bailey and Simon's reason for premium rests on the higher claim frequency territories also producing the higher territorial premiums. Where they do not, premium would not remove that distortion.
- **Hazam's two conditions.** In his discussion of the paper, Hazam points out that a premium base eliminates maldistribution only if two conditions hold. First, high frequency territories must also be high premium territories. Second, the territorial differentials must be proper. If the territorial differentials are not proper, the premium base does not eliminate the maldistribution. Hazam still judges that premium, although not perfect, is an improvement over exposure as a base for this type of study, and that failure of either assumption does not change the qualitative conclusions but may alter somewhat the relative frequencies and the credibilities computed from them.
- **Credibility and years of experience.** Relative credibility is the credibility for a two- or three-year experience period divided by the credibility for one year. If an individual insured's chance for an accident remained constant from one year to the next, and no risks left or entered the class, the credibilities for experience periods of one, two and three years would vary approximately in proportion to the number of years. The relative credibilities would then be about 2 and 3.
- **What Bailey and Simon found.** The relative credibilities for two and three years were much less than 2.00 and 3.00. Risks entering and leaving the class explain this only partly. It can be fully accounted for only if an individual insured's chance for an accident changes from time to time within a year and from one year to the next, or if the risk distribution of individual insureds is markedly skewed by accident proneness. Adding a second year to one year's experience increased the credibility by roughly two-fifths, and a third year by one-sixth of its two-year value — the shifting risk parameters that Mahler tests for ([[Risk Experience]]).
- **Credibility and the class plan.** If the variation of individual insureds' chances for an accident were the same within each class, the credibility would vary approximately in proportion to the class's average claim frequency. The more narrowly defined classes had lower credibility relative to their frequency, because there is less variation of individual hazards within them. Credibility for experience rating depends not only on the volume of data but also on the amount of variation of individual hazards within the class ([[Rating Class]]).
- **Risks with a claim (Appendix II).** With Poisson claim counts at class frequency $m$, a fraction $e^{-m}$ of the risks had no claim last year. So the risks with one or more claims (class B) average $m/(1 - e^{-m})$ claims, and their relative claim frequency is $R = 1/(1 - e^{-m})$. In general, the relative frequency of the risks with at least one claim is $R = 1/(1 - \Pr(N = 0))$, because the risks with no claim contribute none of the claims. Their credibility then follows from $\text{Modification} = ZR + (1 - Z)$.
- Compared with a [[Bonus-Malus System]]: both price a car by its claim record, but a bonus-malus system moves the policyholder between premium levels by fixed transition rules, while Bailey and Simon read the credibility of the record off how the merit classes go on to perform.

> [!idea] The idea
> If the record were worthless, accident-free drivers would go on to have the same claim frequency as everyone else; if it were fully credible, they would have none. Where they actually land between those two says how much the record is worth: an accident-free group running at 90% of the average frequency means one car's clean record earns 10% credibility. The record adds less than proportionally with each extra year partly because risks enter and leave the class, and otherwise only if drivers' accident chances change over time or accident proneness is markedly skewed.

> [!example]- Credibility of One, Two and Three Accident-Free Years {Example}
> A merit rating plan uses the Canadian relativities A:X:Y:B = 65:80:90:100. A year's data:
>
> | Class | Earned premium at present rates | Claims incurred |
> |---|---|---|
> | A | 6,500,000 | 3,000 |
> | X | 800,000 | 520 |
> | Y | 900,000 | 650 |
> | B | 1,500,000 | 1,400 |
>
> Find the credibility of one, two and three years of a car's accident-free experience, and the relative credibilities.
>
> > [!answer]-
> > Put every premium at B rates, then compare each cumulative group's frequency with the total's; each group is accident-free, so $Z = 1 -$ its relative frequency.
> >
> > First, premium at B rates (premium divided by the merit factor): A $10{,}000{,}000$, X $1{,}000{,}000$, Y $1{,}000{,}000$, B $1{,}500{,}000$, total $13{,}500{,}000$.
> >
> > Next, claims per \$1,000 of premium at B rates, for each cumulative group:
> >
> > $$
> > \begin{align*}
> > \text{All risks} &= \frac{5{,}570}{13{,}500} = 0.4126 \\[4pt]
> > \text{A + X + Y} &= \frac{4{,}170}{12{,}000} = 0.3475 \\[4pt]
> > \text{A + X} &= \frac{3{,}520}{11{,}000} = 0.3200 \\[4pt]
> > \text{A} &= \frac{3{,}000}{10{,}000} = 0.3000
> > \end{align*}
> > $$
> >
> > Then the credibilities, one minus each group's relative frequency:
> >
> > $$
> > \begin{align*}
> > Z_1 &= 1 - \frac{0.3475}{0.4126} = 0.158 \\[4pt]
> > Z_2 &= 1 - \frac{0.3200}{0.4126} = 0.224 \\[4pt]
> > Z_3 &= 1 - \frac{0.3000}{0.4126} = 0.273
> > \end{align*}
> > $$
> >
> > The relative credibilities are $0.224/0.158 = 1.42$ for two years and $0.273/0.158 = 1.73$ for three.
> >
> > *Why not 2 and 3?* That would require each driver's accident chance to stay constant and the class to keep the same members. Relative credibilities well short of 2 and 3 say the hazards shift over time.

> [!example]- Credibility of the Risks with a Claim Last Year {Example}
> A class's claim frequency is $0.08$ per car, and claim counts are Poisson. Cars with one or more claims last year (class B) go on to have $1.45$ times the class's average claim frequency. What credibility does one year's experience carry?
>
> > [!answer]-
> > For class B, $R$ is not zero: find how many claims those risks averaged last year relative to everyone, then solve the modification formula for $Z$.
> >
> > $$
> > \begin{align*}
> > R &= \frac{1}{1 - e^{-0.08}} = 13.007 \\[6pt]
> > 1.45 &= 13.007Z + (1 - Z) \\[4pt]
> > Z &= \frac{0.45}{12.007} = 0.037
> > \end{align*}
> > $$
> >
> > The B risks averaged $0.08/(1 - e^{-0.08}) = 1.04$ claims last year — thirteen times the class average — yet go on to only $45\%$ more claims than average.
> >
> > *Why such a large $R$?* Only about $7.7\%$ of the cars had a claim, and they produced all of the class's claims.

> [!tip]- How it appears on the exam
> - **Exam 8** sets a Bailey and Simon question most years: a table of merit classes with car years, earned premium and claims, asking for the credibility of one, two or three accident-free years and the relative credibilities.
> - The calculation is paired with a written part: *explain* why premium rather than car years is the exposure base, or *state* the assumptions that make premium the better base.
> - A twist asks for the credibility or the modification of the risks with a claim, using $R = 1/(1 - \Pr(N = 0))$ from a Poisson (or another) claim count distribution.
> - A *describe* or *explain* part asks what relative credibilities well below 2 and 3 say about whether risk parameters shift.

> [!warning]- Exam traps
> - **Premium at present rates is not at B rates.** Divide each class's premium by its merit factor before computing frequencies; otherwise the A class's discount lowers its premium and inflates its frequency.
> - **Classes are cumulative.** The two-year credibility uses A + X, not X alone; sum claims and premiums across the classes before dividing.
> - **The denominator is all risks**, including class B, not the base class or the accident-free classes.
> - **The modification is not the credibility.** For an accident-free group $Z = 1 -$ relative frequency; for the risks with a claim, solve $\text{Mod} = ZR + (1 - Z)$ with $R = 1/(1 - \Pr(N=0))$.
