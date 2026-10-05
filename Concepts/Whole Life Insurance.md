---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:4d2058bc7ffa145ae418ad984ee3a029640528ef4ecc032a53974bb2b5cd17fe
  sources:
    - "Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), ch.3 pp.5-8 (whole life = unlimited term; $1 at the end of the year of death; A_x = νq_x + νp_xA_{x+1}; A_x = Σ ν^{n+1} np_x q_{x+n}; premium at the start of each year = life-annuity-due; 1 = dä_x + A_x, ä_x = (1 - A_x)/d; level premium A_x = Pä_x; Ex.3 and Ex.6 second moment at ν^2 / double the force of interest and variance), appendix p.14 (P_40 = 0.010888), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Tables, Illustrative Life Table: Basic Functions and Single Benefit Premiums at i = 0.06, PDF p.4, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §4.2 p.108 eq.(4.24) (Ā_x = E_x(v^{T-x}) = ∫ v^t μ(x+t) tp_x dt), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "SOA Exam MLC Sample Solutions (MLC-09-16, 2016), Q2 (p.2; PDF p.3: Ā_x = μ/(μ+δ) under constant force) and Q14 (p.10; PDF p.11: ²Ā = μ/(μ+2δ), Var = ²Ā - Ā²), sha256:791e13b42b926bfe8abe54f489fa6767aa508c9c0419bfa2340a24e9a2ea37f7 — https://www.soa.org/globalassets/assets/files/edu/edu-2014-spring-mlc-sol.pdf"
    - "CAS Exam MAS-I Spring 2018, Q12 — official exam paper (scan), PDF p.16, sha256:12d102c422a45e87674b082ad448ac5e25a495115f963d1a9ac63a9f8f028020 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-18.pdf"
    - "CAS Exam MAS-I Fall 2019, Q11 — official exam paper (scan), PDF p.15, sha256:32e26dbc1bd463e053ea0f9116473551be6d1b2f35b6d3670a716ecb86a141bd — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-19.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6: Ross A1-A6, Struppeck A5-6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Whole Life Insurance.md
---

**Whole Life Insurance** is a life insurance contract with an unlimited term: it pays a benefit of 1 (one unit) on the death of the insured, whenever that occurs. In the life-table model of Exam MAS-I the benefit is paid at the **end of the year of death**, and its actuarial present value (the **net single premium**) for a life aged $x$ is $A_x$.

> $$A_x = \sum_{k=0}^{\infty} v^{k+1}\,{_k}p_x\,q_{x+k}$$

> $$A_x = v\,q_x + v\,p_x\,A_{x+1}$$

> $$P = \frac{A_x}{\ddot{a}_x}$$

- $v = 1/(1+i)$: a death in year $k+1$ (survive $k$ years, probability ${_k}p_x$, then die, $q_{x+k}$) is paid at time $k+1$
- **Recursion:** either $(x)$ dies in the first year and 1 is paid in a year, or $(x)$ survives and holds, one year from now, a whole life policy on $(x+1)$
- **Level annual premium:** a premium $P$ paid at the start of each year while $(x)$ is alive is a [[Life Annuity|life-annuity-due]], so $A_x = P\,\ddot{a}_x$; since $\ddot{a}_x = (1 - A_x)/d$, $P$ follows from $A_x$ and $d$ alone
- **Variance:** the second moment ${}^2\!A_x$ of the present value is $A_x$ at discount factor $v^2$ (double the force of interest), and $\text{Var} = {}^2\!A_x - (A_x)^2$. The exam's Illustrative Life Table lists $1000A_x$, $1000\,{}^2\!A_x$ and $\ddot{a}_x$ at $i = 0.06$
- **Paid at the moment of death** (continuous variant): $\bar{A}_x = E\!\left[e^{-\delta T_x}\right] = \int_0^\infty e^{-\delta t}\,{_t}p_x\,\mu_{x+t}\,dt$, with ${}^2\!\bar{A}_x$ at $2\delta$; under a constant force of mortality $\mu$, $\bar{A}_x = \mu/(\mu + \delta)$

![[Media/Figures/Whole_Life_Insurance.svg|340]]

> [!example]- Whole Life Value by Recursion {Example}
> The Illustrative Life Table ($i = 0.06$) gives $1000q_{40} = 2.78$ and $1000A_{41} = 168.69$. Calculate $A_{40}$.
>
> > [!answer]-
> > $$A_{40} = \frac{q_{40} + p_{40}\,A_{41}}{1.06} = \frac{0.00278 + 0.99722 \times 0.16869}{1.06} = \frac{0.17100}{1.06} = 0.16132$$
> > This is the table's own $1000A_{40} = 161.32$.

> [!example]- Level Annual Premium from the Illustrative Life Table {Example}
> Using the Illustrative Life Table ($A_{40} = 0.16132$, $\ddot{a}_{40} = 14.8166$, $i = 0.06$), find the level annual premium for a whole life insurance of 1 on $(40)$.
>
> > [!answer]-
> > $$P = \frac{A_{40}}{\ddot{a}_{40}} = \frac{0.16132}{14.8166} = 0.010888$$
> > From $A_{40}$ alone, with $d = 0.06/1.06$: $\ddot{a}_{40} = (1 - 0.16132)(1.06)/0.06 = 14.8167$, and $P = 0.16132/14.8167 = 0.010888$ again.

> [!example]- Paid at the Moment of Death, Constant Force {Example}
> A life is subject to constant force of mortality $\mu = 0.02$ and the force of interest is $\delta = 0.05$. Calculate $\bar{A}_x$ and the variance of the present value $e^{-\delta T_x}$.
>
> > [!answer]-
> > $$\bar{A}_x = \frac{\mu}{\mu + \delta} = \frac{0.02}{0.07} = 0.2857$$
> > $${}^2\!\bar{A}_x = \frac{0.02}{0.02 + 2(0.05)} = \frac{0.02}{0.12} = 0.1667$$
> > $$\text{Var} = {}^2\!\bar{A}_x - (\bar{A}_x)^2 = \frac{1}{6} - \frac{4}{49} = \frac{25}{294} \approx 0.0850$$
