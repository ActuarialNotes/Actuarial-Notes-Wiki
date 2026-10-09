---
aliases:
  - Modelling Extra Risk
  - Age Rating
  - Constant Addition
  - Constant Multiple
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:97538086f3213447a4285e40dcad0ac6a7a96bf898512a8f17cea2d31661bd9f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Extra Risk.md
---
**Extra Risk** is mortality heavier than the standard basis, carried by a life who does not meet the insurer's standard [[Underwriting|underwriting]] criteria because of a medical impairment, a hazardous occupation or a dangerous pastime. Instead of building a separate table for such a substandard life, the insurer adjusts the standard table in one of the three ways set out in Dickson, Hardy & Waters (AMLCR, chapter 6): an age rating, a constant addition to the [[Hazard Rate|force of mortality]], or a constant multiple of the rate of mortality.

> $$\text{Age rating: } {}_tp^{*}_x = {}_tp_{x+k}$$

> $$\text{Constant addition: } \mu^{*}_{x+t} = \mu_{x+t} + \theta$$

> $${}_tp^{*}_x = e^{-\theta t}\,{}_tp_x$$

> $$\text{Constant multiple: } q^{*}_{x+j} = \lambda\,q_{x+j}$$

- **Symbols:** An asterisk marks a function of the substandard life. $k$ is the number of years of the age rating, $\theta > 0$ is the extra force of mortality, and $\lambda > 1$ is the multiple. Under a multiple, survival over several years is the product ${}_np^{*}_x = \prod_{j=0}^{n-1}\left(1 - \lambda\,q_{x+j}\right)$.
- **Age rating:** The life aged $x$ is priced as a standard life aged $x + k$, so every age in the calculation shifts by $k$. Its appeal is that premiums and policy values come straight from the existing tables.
- **Constant addition:** The extra force is the same at every age, which suits a risk unrelated to age, such as a dangerous occupation. Because ${}_tp^{*}_x = e^{-\theta t}\,{}_tp_x$, a substandard annuity value at rate $i$ equals the standard value at rate $j$, where $1 + j = (1+i)e^{\theta}$. Insurance values then follow from $A^{*}_x = 1 - d\,\ddot{a}^{*}_x$, using the original rate of discount $d$.
- **Constant multiple:** The extra mortality is proportional to the standard rate, so it grows steeply with age, which suits a medical impairment. The multiple applies to $q$ rather than to $\mu$, and it needs $\lambda\,q_{x+j} \le 1$ at every age used.

> [!example]- Five-Year Death Probability Three Ways {Example}
> A substandard life aged 50 is insured for five years. On the SULT, $q_{50}$ to $q_{54}$ are $0.001209$, $0.001331$, $0.001469$, $0.001623$ and $0.001797$, ${}_5p_{50} = 0.992593$ and ${}_5p_{55} = 0.987613$. Find ${}_5q^{*}_{50}$ under (a) an age rating of 5 years, (b) a constant addition of $\theta = 0.001$ to the force of mortality, and (c) a multiple of $\lambda = 1.5$ on the rate of mortality.
>
> > [!answer]-
> > The standard probability is ${}_5q_{50} = 0.007407$.
> > $$
> > \begin{align*}
> > \text{(a)}\quad {}_5q^{*}_{50} &= 1 - {}_5p_{55} \\
> > &= 0.012387 \\
> > \text{(b)}\quad {}_5q^{*}_{50} &= 1 - e^{-0.005}(0.992593) \\
> > &= 1 - 0.987642 \\
> > &= 0.012358 \\
> > \text{(c)}\quad {}_5q^{*}_{50} &= 1 - \prod_{j=0}^{4}\left(1 - 1.5\,q_{50+j}\right) \\
> > &= 1 - 0.988906 \\
> > &= 0.011094
> > \end{align*}
> > $$
> > All three raise the five-year death probability by about half or more. They part company at older ages: at 80, the one-year probability is $0.032658$ on the standard table, $0.057665$ with the age rating, $0.033625$ with the addition and $0.048987$ with the multiple. The addition adds about $0.001$ at every age, while the other two methods add more as the life ages.

> [!example]- Whole Life Premium under a Constant Addition {Example}
> A life aged 50 is subject to the SULT force of mortality plus $\theta = \ln(1.06/1.05) = 0.009479$. Find the net annual premium for a fully discrete whole life insurance of \$100,000 at $i = 5\%$, given that on the SULT $\ddot{a}_{50} = 15.1511$ at $6\%$. Compare it with the standard premium of \$1,111.99 and with a 5-year age rating, for which $A_{55} = 0.23524$ and $\ddot{a}_{55} = 16.0599$ at $5\%$.
>
> > [!answer]-
> > Since $1.05\,e^{\theta} = 1.06$, the substandard annuity at $5\%$ is the standard annuity at $6\%$.
> > $$
> > \begin{align*}
> > \ddot{a}^{*}_{50} &= 15.1511 \\
> > A^{*}_{50} &= 1 - \tfrac{0.05}{1.05}(15.1511) \\
> > &= 0.278519 \\
> > P^{*} &= \frac{100{,}000(0.278519)}{15.1511} \\
> > &= 1{,}838.28 \\
> > P_{\text{age}+5} &= \frac{100{,}000(0.23524)}{16.0599} \\
> > &= 1{,}464.77
> > \end{align*}
> > $$
> > The extra force of about $0.0095$ raises the premium by $65\%$, much more than a 5-year age rating does. At age 50 the standard force is only about $0.0012$, so the addition multiplies the mortality of the early policy years many times over.

> [!tip]- How it appears on the exam
> - **FAM** gives a standard table, such as the SULT, and one of the three adjustments, then asks for a survival probability, a premium or a policy value for the substandard life, for example on a term or whole life insurance.
> - **Interest adjustment:** A question can choose $\theta$ so that $(1+i)e^{\theta}$ is a rate at which annuity values are given, and it then expects the candidate to value the substandard annuity at that rate.
> - **Assumption changes:** The same work answers FAM's objective on the effect of a change in the mortality assumption, by comparing the substandard premium or policy value with the standard one.

> [!warning]- Exam traps
> - **Adding to $q$:** A constant addition to the force gives $p^{*}_x = e^{-\theta}p_x$, not $1 - (q_x + \theta)$. With $q_x = 0.02$ and $\theta = 0.01$, the correct value is $0.970249$ rather than $0.97$, and the gap compounds over a policy term.
> - **Multiplying $\mu$:** A multiple of the rate means $q^{*} = \lambda q$. Using $\lambda\mu$ instead gives $1 - p^{\lambda}$, which is smaller than $\lambda q$.
> - **Insurance at the adjusted rate:** The rate $j$ applies to annuity values only. The standard $A_{50}$ at $6\%$ is $1 - \tfrac{0.06}{1.06}(15.1511) = 0.142391$, about half the correct $A^{*}_{50} = 0.278519$, because insurance values need the original $d$.
> - **Partial age rating:** An age rating shifts every age in the calculation, including the annuity used for premiums and the ages in later policy values. Shifting only the insurance factor mixes two different lives.
