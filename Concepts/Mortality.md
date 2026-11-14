---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:896ca1217910bac894afe37a5d8e5bc39a91e4b82d22b04842645126758d1981
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

**Mortality** is the incidence of death in a population, measured as a function of age by the annual mortality rate $q_x$ and the force of mortality $\mu_x$, the [[Hazard Rate|hazard rate]] of the [[Survival Model|future lifetime]]. It varies also with sex, health, duration since underwriting (selection) and calendar year (mortality improvement).

The probability that a life aged $x$ survives $t$ years is

> $${}_tp_x = \exp\!\left(-\int_0^t \mu_{x+s}\,ds\right)$$

- $\mu_{x+s}$ is the force of mortality at age $x + s$.

The probability of death within $t$ years is ${}_tq_x = 1 - {}_tp_x$, and over one year $q_x = 1 - p_x$. Under a constant force of mortality $\mu$, ${}_tp_x = e^{-\mu t}$, so $q_x = 1 - e^{-\mu}$.

> [!example]- The force of mortality is a constant 0.02. What is the probability that a life dies within 5 years? {Example}
> - ${}_5p_x = e^{-0.02(5)} = e^{-0.1} = 0.904837$.
> - ${}_5q_x = 1 - 0.904837 = 0.095163$.

Mortality assumptions drive every [[Life Insurance|life insurance]] and [[Life Annuity|annuity]] value: higher mortality raises insurance costs and lowers annuity costs. Lighter mortality than assumed hurts an annuity writer (**longevity risk**) and helps an insurer, so a company writing both has a partial natural offset. [[Life Table|Table]] values and a [[Fractional Age Assumption|fractional age assumption]] fill in between integer ages.

## The mortality curve

A typical mortality curve falls after high infant mortality, shows an accident hump in the late teens and twenties, then rises roughly exponentially through adult ages. Heterogeneity (sex, smoking, socioeconomic group, select versus ultimate) makes a population a mix of such curves.

## Makeham's law and Gompertz's law

**Makeham's law** models the force of mortality as an age-independent term plus a term rising exponentially with age:

> $$\mu_x = A + Bc^x$$

- $A$ is the age-independent (accident) term, and $Bc^x$ is the term that rises with age.

Under Makeham's law the survival probability is

> $${}_tp_x = \exp\!\left(-At - \frac{B}{\ln c}\,c^x(c^t - 1)\right)$$

With $A = 0$ it is **Gompertz's law**, $\mu_x = Bc^x$. The Standard Ultimate Life Table used on FAM and ALTAM is Makeham with $A = 0.00022$, $B = 2.7\times10^{-6}$, $c = 1.124$.

> [!example]- Under the Standard Ultimate Life Table's Makeham law, what are $\mu_{60}$ and ${}_{10}p_{60}$? {Example}
> - $Bc^{60} = 2.7\times10^{-6}(1.124)^{60} = 0.0030015$.
> - $\mu_{60} = 0.00022 + 0.0030015 = 0.0032215$.
> - The integral of the force over 10 years is $0.00022(10) + 0.0030015(1.124^{10} - 1)/\ln 1.124$.
> - That is $0.0022 + 0.0030015(2.21857)/0.116894 = 0.059167$.
> - ${}_{10}p_{60} = e^{-0.059167} = 0.94255$, matching the table's ratio $\ell_{70}/\ell_{60}$.

## Extra risk

Mortality for a substandard life is modelled from the standard table in one of three ways:

1. An **age rating**: a life aged $x$ rated up $k$ years uses the table at $x + k$, and every later age shifts by $k$ too.
2. A **constant addition** $\theta$ to the force of mortality, $\mu^{*}_{x+s} = \mu_{x+s} + \theta$.
3. A **constant multiple** of the rate, $q^*_x = k\,q_x$.

A constant addition to the force multiplies survival by an exponential factor:

> $${}_tp^*_x = e^{-\theta t}\,{}_tp_x$$

Multiplying the force by $k$ instead raises the survival probability to the power $k$.

> [!example]- Standard rates are $q_{60} = 0.010$ and $q_{61} = 0.011$. What is the two-year death probability at 150% of standard rates, and with 0.005 added to the force? {Example}
> - Standard survival is ${}_2p_{60} = (0.990)(0.989) = 0.97911$.
> - At 150%, the rates are 0.015 and 0.0165, so ${}_2q^*_{60} = 1 - (0.985)(0.9835) = 0.031253$.
> - With 0.005 added to the force, ${}_2q^*_{60} = 1 - 0.97911\,e^{-0.005(2)} = 0.030632$.
> - Both raise the two-year death probability from 0.02089 to about 0.031.

## Mortality improvement

Mortality improvement is the fall in mortality rates from one calendar year to the next. The rate at age $x$ in year $t$ is

> $$q(x, t) = q(x, t-1)\,\big(1 - \phi(x, t)\big)$$

- $\phi(x, t)$ is the proportional fall in $q$ at age $x$ from year $t-1$ to $t$.

A life ages as calendar time passes, so its survival uses the rates along the diagonal, $q(x+t, Y+t)$, not the period row $q(x+t, Y)$.

> [!example]- What is the probability that a life aged 65 in 2026 survives three years, on the period table and on the cohort basis? {Example}
> For calendar year 2026, $q(65) = 0.010$, $q(66) = 0.011$ and $q(67) = 0.012$. Mortality improves by $\phi = 2\%$ a year at every age.
>
> > [!answer]-
> > - The period basis uses the 2026 rates throughout: ${}_3p_{65} = (0.990)(0.989)(0.988) = 0.96736$.
> > - The cohort reaches 66 in 2027, so $q(66, 2027) = 0.011(0.98) = 0.01078$.
> > - It reaches 67 in 2028, so $q(67, 2028) = 0.012(0.98)^2 = 0.011525$.
> > - On the cohort basis, ${}_3p_{65} = (0.990)(0.98922)(0.988475) = 0.96804$.
> > - The cohort death probability is 0.03196, against 0.03264 on the period table.

> [!trap] Adding to $q$ when the question adds to $\mu$
> A constant addition $\theta$ to the force multiplies survival by $e^{-\theta t}$. Adding $\theta$ to each $q_x$ gives a slightly different, wrong answer. In the same way, $150\%$ of $q_x$ is not $1.5\mu_x$, because $1 - (1-q)^{1.5} \neq 1.5q$.
