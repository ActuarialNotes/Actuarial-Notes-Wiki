---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:429f917c539a852cbbe4b1b362dc3e413f5874f07cbdfccb89ff2f347c45d867
  sources:
    - "SOA Tables for Exam FAM (2024-10), Standard Ultimate Life Table pp.20-21; Makeham's law formula p.22, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
    - "SOA Exam FAM-L tables Excel workbook (2022-10), sheet 'Select and Ult', cells A4:B6 (A = 0.00022, B = 2.7E-6, c = 1.124), sha256:ed9eb9c1d1ce26e050d26cb59d44fa3e03ab4d7595d5485e9cad9687e63b800d — https://www.soa.org/globalassets/assets/files/edu/2022/2022-10-exam-fam-l-tables-excel-workbook.xlsx"
    - "SOA Exam FAM syllabus, October 2026, Topics 8-10 learning outcomes pp.6-7; Readings p.8 (AMLCR chapters), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
    - "SOA Exam ALTAM syllabus, October 2026, Topic 1 p.2, Topic 3 p.3; Resources p.7 (AMLCR chapters), sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf"
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, 2001, author's posted text), §2.2 pp.39-44 (PDF 49-54: force of mortality, tpx = exp(-int mu), uniform, exponential, Weibull, Gompertz-Makeham, infant mortality); §3.2 pp.62-66 (PDF 72-76: UDD tqx = t qx and mu = q/(1-tq), constant force tpx = px^t, complete = curtate + 1/2, no simple model fits a whole life table); §4.1 pp.99-103 (PDF 109-113: term, pure endowment nEx = v^n npx, endowment = term + pure endowment, deferred = nEx A_{x+n}, d ä + A = 1); §4.2 pp.110-111 (PDF 120-121: Abar = (i/delta) A under UDD); §5.1 p.127 (PDF 137: i/i(m) on the term part only, pure endowment independent of m), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "Wikipedia, Gompertz–Makeham law of mortality, lead; Mathematical formulation (Makeham term: accidents); Moments and life expectancy (closed form via the incomplete gamma function); Empirical patterns (infancy, exponential adult rise, late-life deceleration disputed), sha256:733b8c31a2e23560f0cbdc79f2513b978cd24af03be1357dbdbef4fff13ee072 — https://en.wikipedia.org/wiki/Gompertz%E2%80%93Makeham_law_of_mortality"
    - "Remund, Camarda & Riffe, A cause-of-death decomposition of the young adult mortality hump, MPIDR WP 2017-007, abstract p.2 (traffic and other accidents as contributors to the hump), p.3 (hump between childhood and adulthood), sha256:fcb9343e78e623e0d5354a4f633af93ed28baf19faf432419e2646f145a3f3c0 — https://www.demogr.mpg.de/papers/working/wp-2017-007.pdf"
    - "Wikipedia, Life expectancy, factors (tobacco smoking, income), Sex differences, sha256:9a7c01424cd83a26d7c72aebb6d8789b6b168c64428b3c98649bb4a2e6320650 — https://en.wikipedia.org/wiki/Life_expectancy"
    - "29 CFR 4044.53 Mortality assumptions (LII), (c)(2)(ii)-(iii) cumulative and annual mortality improvement factors, sha256:59ba2c7b84f75b2de7b1453b01685a55862b6c91a7d8acdfc4e2a6a29990dc5e — https://www.law.cornell.edu/cfr/text/29/4044.53"
    - "SOA ILA-201U syllabus 2026-2027, p.5 (offsets between mortality and longevity risk), sha256:daa04ce74955f3f9410aa18ae501d020420272b16de1fe550a788bf89c1d4e87 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-201u/2026-2027-ila-201u-syllabus.pdf"
    - "SOA INV-201 syllabus 2026-2027, p.7 (risks that can only be partially hedged, including mortality), sha256:8b5d280585ae9d0e35943729f861ac13ada7462be850c328da93645b7bbd9bc1 — https://www.soa.org/globalassets/assets/files/edu/2026/inv-201/2026-2027-inv-201-syllabus.pdf"
    - "SOA ILA-101 syllabus 2026-2027, p.3 (mortality, lapse ... assumptions and methods for their development), sha256:6494067f4d7faee58407e441df609030bb743fd6678f122159d3287d00217e49 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-101/2026-2027-ila-101-syllabus.pdf"
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
- A typical **mortality curve** falls after high infant mortality, shows an accident hump in the late teens and twenties, then rises roughly exponentially through adult ages; **heterogeneity** (sex, smoking, socioeconomic group, select versus ultimate) makes a population a mix of such curves
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
