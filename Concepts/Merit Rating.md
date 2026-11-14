---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:a2e75ae8173d3bd6f1835329f61b4dc0f88854f93d4560fa2f43827a8ae5058d
  sources:
    - "W. J. Hazam, Discussion of Bailey & Simon, An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car, PCAS XLVII (1960), pp.150-152, PDF pp.1-3, sha256:48b8d420ffd358904509532447e15d50df0d5b1756c2026f81e8d058a02f09e4 — https://www.casact.org/sites/default/files/database/proceed_proceed60_60150.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Merit Rating.md
---

**Merit Rating** is [[Experience Rating|experience rating]] of a single private passenger car by placing it in a class according to the number of full years since its most recent accident (or since the insured became licensed). Bailey and Simon used the Canadian merit rating plan's experience to measure the credibility $Z$ of one car's experience.

With $Z$ the credibility, the experience rating modification is

> $$\text{Modification} = ZR + (1 - Z)$$

- $R$ is the ratio of the risk's past experience to the average of all risks.

Setting the modification equal to a group's subsequent experience relative to all risks, and $R$ equal to its past experience relative to all risks, the formula can be solved for the credibility. For accident-free risks $R = 0$, so the credibility equals $1 -$ Modification. The modification is the group's relative claim frequency, its claim frequency divided by the claim frequency of all risks. So the credibility of an accident-free group is

> $$Z = 1 - \frac{\text{frequency of the accident-free group}}{\text{frequency of all risks}}$$

> [!idea] The idea
> Where accident-free drivers land between the average frequency (a worthless record) and zero (a fully credible one) says how much the record is worth.

An accident-free group running at 90% of the average frequency means one car's clean record earns 10% credibility.

## The Canadian merit rating classes

In the Canadian plan the merit ratings A, X, Y and B correspond to three or more, two, one and no years since the most recent accident. The classes are cumulative:

- A + X + Y is the experience for one or more accident-free years, and gives the credibility of a one-year experience period.
- A + X is the experience for two or more accident-free years, and gives the credibility of a two-year period.
- A alone gives the credibility of a three-year period.

A group's claims and its premium are the sums over the classes it includes. Earned premiums are converted to a common rate basis by the relationship in the rate structure that A:X:Y:B = 65:80:90:100. Dividing a class's earned premium at present rates by its merit factor relative to B puts it at B rates. Claim frequency is the number of claims incurred per $\$1{,}000$ of premium at B rates. Each group's relative claim frequency is its frequency divided by the frequency of the total of all classes, class B included.

Relative credibility is the credibility for a two- or three-year experience period divided by the credibility for one year.

> [!example]- What is the credibility of one, two and three accident-free years, and what are the relative credibilities? {Example}
> A merit rating plan uses the Canadian relativities A:X:Y:B = 65:80:90:100. A year's data:
>
> | Class | Earned premium at present rates | Claims incurred |
> | :--- | ---: | ---: |
> | A | 6,500,000 | 3,000 |
> | X | 800,000 | 520 |
> | Y | 900,000 | 650 |
> | B | 1,500,000 | 1,400 |
>
> > [!answer]-
> > - At B rates the premiums are A $10{,}000{,}000$, X $1{,}000{,}000$, Y $1{,}000{,}000$ and B $1{,}500{,}000$, a total of $13{,}500{,}000$.
> > - Claims per $\$1{,}000$ of premium at B rates are $5{,}570/13{,}500 = 0.4126$ for all risks.
> > - They are $4{,}170/12{,}000 = 0.3475$ for A + X + Y, $3{,}520/11{,}000 = 0.3200$ for A + X and $3{,}000/10{,}000 = 0.3000$ for A.
> > - The one-year credibility is $Z_1 = 1 - 0.3475/0.4126 = 0.158$.
> > - The two-year credibility is $Z_2 = 1 - 0.3200/0.4126 = 0.224$.
> > - The three-year credibility is $Z_3 = 1 - 0.3000/0.4126 = 0.273$.
> > - The relative credibilities are $0.224/0.158 = 1.42$ for two years and $0.273/0.158 = 1.73$ for three.

## Premium as the exposure base

Bailey and Simon calculate relative claim frequency on the basis of premium rather than car years. This avoids the maldistribution created by having higher claim frequency territories produce more X, Y and B risks and also produce higher territorial premiums. With car years as the base, the X, Y and B classes would be concentrated in the high-frequency territories, and their claim frequencies would differ from the A class's partly because of territory, not merit alone.

In his discussion of the paper, Hazam points out that a premium base eliminates maldistribution only if two conditions hold:

1. High frequency territories must also be high premium territories.
2. The territorial differentials must be proper.

Hazam still judges that premium, although not perfect, is an improvement over exposure as a base for this type of study. Failure of either assumption does not change the qualitative conclusions, but may alter somewhat the relative frequencies and the credibilities computed from them.

## Credibility and years of experience

If an individual insured's chance for an accident remained constant from one year to the next, and no risks left or entered the class, the credibilities for experience periods of one, two and three years would vary approximately in proportion to the number of years. The relative credibilities would then be about 2 and 3.

Bailey and Simon found relative credibilities for two and three years much less than 2.00 and 3.00. Risks entering and leaving the class explain this only partly. It can be fully accounted for only if an individual insured's chance for an accident changes from time to time within a year and from one year to the next, or if the risk distribution of individual insureds is markedly skewed by accident proneness. Adding a second year to one year's experience increased the credibility by roughly two-fifths, and a third year by one-sixth of its two-year value. These are the shifting risk parameters that Mahler tests for ([[Risk Experience]]).

If the variation of individual insureds' chances for an accident were the same within each class, the credibility would vary approximately in proportion to the class's average claim frequency. The more narrowly defined classes had lower credibility relative to their frequency, because there is less variation of individual hazards within them. Credibility for experience rating depends not only on the volume of data but also on the amount of variation of individual hazards within the class ([[Rating Class]]).

## Risks with a claim

With Poisson claim counts at class frequency $m$, a fraction $e^{-m}$ of the risks had no claim last year. The risks with no claim contribute none of the claims, so the relative claim frequency of the risks with one or more claims (class B) is

> $$R = \frac{1}{1 - e^{-m}}$$

For any claim count distribution it is $R = 1/(1 - \Pr(N = 0))$. Their credibility then follows from $\text{Modification} = ZR + (1 - Z)$.

> [!example]- What credibility does one year's experience of these cars carry? {Example}
> A class's claim frequency is 0.08 per car, and claim counts are Poisson. Cars with one or more claims last year (class B) go on to have 1.45 times the class's average claim frequency.
>
> > [!answer]-
> > - The relative frequency of the cars with a claim is $R = 1/(1 - e^{-0.08}) = 13.007$.
> > - Solving $1.45 = 13.007Z + (1 - Z)$ gives $Z = 0.45/12.007 = 0.037$.
> > - Only about 7.7% of the cars had a claim, and they produced all of the class's claims, which is why $R$ is so large.

A [[Bonus-Malus System|bonus-malus system]] also prices a car by its claim record, but it moves the policyholder between premium levels by fixed transition rules. Bailey and Simon read the credibility of the record off how the merit classes go on to perform.

> [!trap] Using premium at present rates instead of at B rates
> Divide each class's premium by its merit factor before computing frequencies. Otherwise the A class's discount lowers its premium and inflates its frequency. In the example, A's frequency on premium at present rates would be $3{,}000/6{,}500 = 0.4615$ per $\$1{,}000$, against $0.3000$ at B rates.
