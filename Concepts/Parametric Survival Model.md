---
aliases:
  - Parametric Survival
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:15daaf789a9eeb69d3f10e8de38433be4339f767b8f48691fdb3dbc7e2136f8e
  sources:
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, 2001, author's posted text), §2.2 pp.39-44 (PDF 49-54: force of mortality, tpx = exp(-int mu), uniform, exponential, Weibull, Gompertz-Makeham, infant mortality); §3.2 pp.62-66 (PDF 72-76: UDD tqx = t qx and mu = q/(1-tq), constant force tpx = px^t, complete = curtate + 1/2, no simple model fits a whole life table); §4.1 pp.99-103 (PDF 109-113: term, pure endowment nEx = v^n npx, endowment = term + pure endowment, deferred = nEx A_{x+n}, d ä + A = 1); §4.2 pp.110-111 (PDF 120-121: Abar = (i/delta) A under UDD); §5.1 p.127 (PDF 137: i/i(m) on the term part only, pure endowment independent of m), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "SOA Tables for Exam FAM (2024-10), Standard Ultimate Life Table pp.20-21; Makeham's law formula p.22, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
    - "SOA Exam FAM-L tables Excel workbook (2022-10), sheet 'Select and Ult', cells A4:B6 (A = 0.00022, B = 2.7E-6, c = 1.124), sha256:ed9eb9c1d1ce26e050d26cb59d44fa3e03ab4d7595d5485e9cad9687e63b800d — https://www.soa.org/globalassets/assets/files/edu/2022/2022-10-exam-fam-l-tables-excel-workbook.xlsx"
    - "Wikipedia, Gompertz–Makeham law of mortality, lead; Mathematical formulation (Makeham term: accidents); Moments and life expectancy (closed form via the incomplete gamma function); Empirical patterns (infancy, exponential adult rise, late-life deceleration disputed), sha256:733b8c31a2e23560f0cbdc79f2513b978cd24af03be1357dbdbef4fff13ee072 — https://en.wikipedia.org/wiki/Gompertz%E2%80%93Makeham_law_of_mortality"
    - "SOA Exam FAM syllabus, October 2026, Topics 8-10 learning outcomes pp.6-7; Readings p.8 (AMLCR chapters), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
    - "SOA Exam FAM-L sample solutions (2024-10), Q4.12 p.23 (Cov(Z1,Z2) = -E[Z1]E[Z2]), Q4.19 p.26, Q6.3-6.4 p.35 (second moments, variances), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Parametric Survival Model.md
---

A **Parametric Survival Model** specifies the distribution of the [[Future Lifetime Random Variable|future lifetime]] $T_x$ by a formula with a few parameters, usually a law for the [[Hazard Rate|force of mortality]] $\mu_x$. Every survival probability and moment then follows by integration. The probability that a life aged $x$ survives $t$ years is

> $${}_tp_x = \exp\left(-\int_0^t \mu_{x+s}\,ds\right)$$

- $\mu_{x+s}$ is the force of mortality at age $x + s$.

The probability that the life dies between ages $x + a$ and $x + b$ is ${}_ap_x - {}_bp_x$. A [[Life Table|life table]] is the nonparametric alternative, listing $\ell_x$ or $q_x$ at integer ages. A law generates a table through $\ell_{x+t} = \ell_x\,{}_tp_x$, and a table can be fitted by a law.

A law is smooth, needs few parameters and extrapolates to the oldest ages, where data are thin. No simple law fits the whole human [[Mortality|mortality]] curve, with its infant mortality and its accident hump in early adulthood, so tables are used where accuracy at every age matters.

## Constant force of mortality

The exponential model has a constant force $\mu$ at every age, so the survival probability is

> $${}_tp_x = e^{-\mu t}$$

The survival probability does not depend on $x$. $T_x$ has an [[Exponential Distribution|exponential distribution]] with $\mathring{e}_x = 1/\mu$ and $\text{Var}(T_x) = 1/\mu^2$.

## De Moivre's law

De Moivre's law has $\mu_x = 1/(\omega - x)$ for $x < \omega$, so the survival probability is

> $${}_tp_x = \frac{\omega - x - t}{\omega - x}$$

- $\omega$ is the limiting age.

$T_x$ is [[Uniform Continuous Distribution|uniform]] on $(0, \omega - x)$, so $\mathring{e}_x = (\omega - x)/2$ and $\text{Var}(T_x) = (\omega - x)^2/12$.

> [!example]- For a life aged 40, how do de Moivre's law with $\omega = 100$ and a constant force $\mu = 1/30$ compare? {Example}
> - Under de Moivre's law $T_{40}$ is uniform on $(0, 60)$, so $\mathring{e}_{40} = 60/2 = 30$.
> - Under the constant force $T_{40}$ is exponential, so $\mathring{e}_{40} = 1/\mu = 30$.
> - The survival probabilities to age 70 are ${}_{30}p_{40} = 30/60 = 0.5$ under de Moivre's law and $e^{-1} = 0.3679$ under the constant force.
> - The variances are $60^2/12 = 300$ under de Moivre's law and $30^2 = 900$ under the constant force.
> - The means agree, but the exponential model kills more lives early and lets some live without limit, so its variance is three times as large.

## Gompertz's and Makeham's laws

Makeham's law gives the force of mortality as

> $$\mu_x = A + Bc^x$$

- $A$ is an age-independent risk, such as accidents.
- $Bc^x$ is a risk that grows exponentially with age.

Gompertz's law is Makeham's with $A = 0$. Integrating Makeham's force gives the survival probability

> $${}_tp_x = \exp\left(-At - \frac{Bc^x\left(c^t - 1\right)}{\ln c}\right)$$

> [!example]- Mortality follows Gompertz's law with $\mu_{50} = 0.003$ and $\mu_{60} = 0.009$. What are $c$ and ${}_{10}p_{60}$? {Example}
> - Dividing the two forces gives $c^{10} = 3$, so $c = 3^{0.1} = 1.116123$ and $\ln c = 0.109861$.
> - With $A = 0$ and $Bc^{60} = \mu_{60}$, the survival probability is ${}_{10}p_{60} = \exp\left(-\mu_{60}(c^{10} - 1)/\ln c\right)$.
> - The exponent is $0.009(3 - 1)/0.109861 = 0.163843$.
> - ${}_{10}p_{60} = e^{-0.163843} = 0.84888$. $B$ is never needed.

## The Standard Ultimate Life Table

The Standard Ultimate Life Table (SULT) used on FAM is Makeham's law with $A = 0.00022$, $B = 2.7 \times 10^{-6}$ and $c = 1.124$, tabulated from a radix at age 20. Its $\ell_x$ values give survival probabilities ${}_tp_x = \ell_{x+t}/\ell_x$ at integer ages. Between integer ages a table needs a [[Fractional Age Assumption|fractional age assumption]], while the law gives ${}_tp_x$ at every age directly.

> [!example]- Under the SULT, what is ${}_{10|10}q_{65}$ from Makeham's law, and does the table agree? {Example}
> The table gives $\ell_{65} = 94{,}579.7$, $\ell_{75} = 85{,}203.5$ and $\ell_{85} = 61{,}184.9$.
>
> > [!answer]-
> > - At age 65, $Bc^{65} = 0.00538485$ and $\ln c = 0.116894$.
> > - Over 10 years the integral of the force is $0.0022 + 0.00538485(1.124^{10} - 1)/0.116894 = 0.104401$, so ${}_{10}p_{65} = e^{-0.104401} = 0.90086$.
> > - Over 20 years it is $0.0044 + 0.00538485(1.124^{20} - 1)/0.116894 = 0.435543$, so ${}_{20}p_{65} = e^{-0.435543} = 0.64691$.
> > - So ${}_{10|10}q_{65} = 0.90086 - 0.64691 = 0.25395$.
> > - The table gives $(85{,}203.5 - 61{,}184.9)/94{,}579.7 = 0.25395$, the same value, because the table was generated from the law.

## Weibull's law

Weibull's law has $\mu_x = kx^n$, so the survival probability is

> $${}_tp_x = \exp\left(-\frac{k\left[(x+t)^{n+1} - x^{n+1}\right]}{n+1}\right)$$
> [!trap] Using $B$ in place of $Bc^x$
> The age-dependent factor in ${}_tp_x$ is $Bc^x$ at the current age $x$, not $B$. Using $B$ alone treats the life as a newborn. The integral also divides by $\ln c$, and leaving it out understates the integral by a factor of about 8.6 for the SULT.
