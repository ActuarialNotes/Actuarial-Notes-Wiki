---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cd2b97323cd7f111ba152f127ab4d39f1a5663dd0fd59f4e961689bf80d11167
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mortality.md
---

**Mortality** is the incidence of death in a population, measured as a function of age by the annual mortality rate $q_x$ and the force of mortality $\mu_x$ (the [[Hazard Rate|hazard rate]] of the [[Survival Model|future lifetime]]), and varying also with sex, health, duration since underwriting (selection) and calendar year (mortality improvement). Mortality assumptions drive every [[Life Insurance|life insurance]] and [[Life Annuity|annuity]] value: higher mortality raises insurance costs and lowers annuity costs.

> $${}_tp_x = \exp\!\left(-\int_0^t \mu_{x+s}\,ds\right)$$

> $$\mu_x = A + Bc^x$$

> $$\mu^{*}_{x+s} = \mu_{x+s} + \theta$$

> $$q(x, t) = q(x, t-1)\,\big(1 - \phi(x, t)\big)$$

- The second block is **Makeham's law** ($A = 0$ gives Gompertz): an age-independent term plus a term rising exponentially with age. The Standard Ultimate Life Table used on FAM and ALTAM is Makeham with $A = 0.00022$, $B = 2.7\times10^{-6}$, $c = 1.124$, for which ${}_tp_x = \exp\!\big(-At - Bc^x(c^t - 1)/\ln c\big)$
- A typical **mortality curve** falls after high infant mortality, shows an accident hump in the late teens and twenties, then rises roughly exponentially through adult ages and decelerates at the oldest ages; **heterogeneity** (sex, smoking, socioeconomic group, select versus ultimate) makes a population a mix of such curves
- **Extra risk** for substandard lives is modelled by an **age rating** (use the table at $x + k$), a **constant addition** $\theta$ to the force (third block, so ${}_tp^*_x = e^{-\theta t}\,{}_tp_x$) or a **constant multiple** of the rate, $q^*_x = k\,q_x$; the fourth block is **mortality improvement**, with $\phi(x, t)$ the proportional fall in $q$ at age $x$ from year $t-1$ to $t$
- Lighter mortality than assumed hurts an annuity writer (**longevity risk**) and helps an insurer, so a company writing both has a partial natural offset; [[Life Table|table]] values and a [[Fractional Age Assumption|fractional age assumption]] fill in between integer ages

> [!example]- Survival under the Standard Ultimate Life Table {Example}
> Using Makeham's law with $A = 0.00022$, $B = 2.7\times10^{-6}$, $c = 1.124$, find $\mu_{60}$ and ${}_{10}p_{60}$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \mu_{60} &= 0.00022 + 2.7\times10^{-6}(1.124)^{60} \\
> >          &= 0.00022 + 0.0030015 \\
> >          &= 0.0032215 \\
> > \int_0^{10}\mu_{60+s}\,ds &= 0.00022(10) + \frac{0.0030015\,(1.124^{10} - 1)}{\ln 1.124} \\
> >                          &= 0.0022 + \frac{0.0030015(2.21857)}{0.116894} \\
> >                          &= 0.059167 \\
> > {}_{10}p_{60} &= e^{-0.059167} \\
> >               &= 0.94255
> > \end{align*}
> > $$
> > A 60-year-old has a $94.3\%$ chance of reaching 70, matching the SULT ratio $\ell_{70}/\ell_{60}$.

> [!example]- Two Ways to Load for Extra Risk {Example}
> Standard rates are $q_{60} = 0.010$ and $q_{61} = 0.011$. Find the probability that a substandard life aged 60 dies within two years (a) at $150\%$ of standard mortality and (b) with $0.005$ added to the force of mortality.
>
> > [!answer]-
> > Standard: ${}_2p_{60} = (0.990)(0.989) = 0.97911$.
> > $$
> > \begin{align*}
> > \text{(a)}\quad {}_2q^*_{60} &= 1 - (1 - 0.015)(1 - 0.0165) \\
> >                             &= 1 - 0.968748 \\
> >                             &= 0.031253 \\
> > \text{(b)}\quad {}_2q^*_{60} &= 1 - 0.97911\,e^{-0.005(2)} \\
> >                             &= 1 - 0.969368 \\
> >                             &= 0.030632
> > \end{align*}
> > $$
> > Both raise the two-year death probability from $0.02089$ to about $0.031$. The multiple scales with age, so it bites harder at older ages; the addition is the same at every age.

> [!example]- Cohort versus Period Survival with Improvement {Example}
> For calendar year 2026, $q(65) = 0.010$, $q(66) = 0.011$, $q(67) = 0.012$. Mortality improves by $\phi = 2\%$ a year at every age. Find the probability that a life aged 65 in 2026 survives three years, on the period table and on the cohort (diagonal) basis.
>
> > [!answer]-
> > The period basis uses the 2026 rates throughout: ${}_3p_{65} = (0.990)(0.989)(0.988) = 0.96736$. The cohort reaches 66 in 2027 and 67 in 2028:
> > $$
> > \begin{align*}
> > q(66, 2027) &= 0.011(0.98) \\
> >             &= 0.01078 \\
> > q(67, 2028) &= 0.012(0.98)^2 \\
> >             &= 0.011525 \\
> > {}_3p_{65} &= (0.990)(1 - 0.01078)(1 - 0.011525) \\
> >            &= 0.96804
> > \end{align*}
> > $$
> > The cohort death probability is $0.03196$ against $0.03264$ on the period table. Over a whole annuity the gap compounds, which is why ignoring improvement understates annuity values.

> [!tip]- How it appears on the exam
> - **FAM** (Mortality Models): given a parametric law (Gompertz, Makeham, de Moivre) or a life table, compute ${}_tp_x$, ${}_{t|}q_x$, $\mu_x$ and moments of $T_x$ and $K_x$, with UDD or constant force between integer ages.
> - **FAM** ("effect of changes in underlying assumptions"; "modelling extra risk"): recompute a premium or policy value after an age rating, a constant addition to $\mu$ or a multiple of $q$, often for a term insurance or endowment.
> - **ALTAM** ("features of typical mortality curves and heterogeneities"): describe the shape of a curve and the sources of heterogeneity and selection, and work with mortality improvement scales in annuity values, as written and calculation parts.
> - **ILA-101 / ILA-201** (mortality assumption development; "offsets between mortality and longevity risk"): explain how experience studies set the assumption and how insurance and annuity blocks offset, as written answers; **INV-201** lists mortality among risks that can only be partially hedged.

> [!warning]- Exam traps
> - **Adding to $q$ when the question adds to $\mu$.** A constant addition $\theta$ to the force multiplies survival by $e^{-\theta t}$; adding $\theta$ to each $q_x$ gives a slightly different (wrong) answer.
> - **Multiplying the force when the question multiplies the rate.** $150\%$ of $q_x$ is not $1.5\mu_x$: $1 - (1-q)^{1.5} \neq 1.5q$.
> - **Age rating in the wrong direction.** A substandard life aged $x$ rated up $k$ years uses $q_{x+k}$, and the age in every subsequent factor also shifts by $k$.
> - **Applying improvement along the period row.** A life ages as calendar time passes; use $q(x+t, Y+t)$, not $q(x+t, Y)$, or the improvement is ignored.
