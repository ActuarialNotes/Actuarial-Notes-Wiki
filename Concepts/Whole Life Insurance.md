---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:c51f849ef154bdcdd326c2c76408fe153286c8fc714996368d2db02d502349ed
  sources:
    - "Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), ch.3 pp.5-7 (whole life = unlimited term; $1 at end of year of death; A_x = νq_x + νp_xA_{x+1}; A_x = Σν^{n+1} np_x q_{x+n}; level premium A_x = Pä_x), ch.3 Ex.6 p.8 (second moment at double the force of interest; variance), appendix p.14, sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Tables, Illustrative Life Table: Basic Functions and Single Benefit Premiums at i = 0.06, PDF p.4, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §4.2 pp.106-108, eq.(4.22)-(4.24) (instantaneous-payment whole life Ā_x = E_x(v^{T-x}) = ∫ v^t μ(x+t) tpx dt), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "SOA Exam MLC Sample Solutions (MLC-09-16, 2016), Q2 (p.2; PDF p.3: Ā_x = μ/(μ+δ) under constant force), Q14 and Q16 (p.10; PDF p.11: ²Ā_x = μ/(2δ+μ), variance ²Ā - Ā², 1000P_40 = A_40/ä_40 = 161.32/14.8166 = 10.89), sha256:791e13b42b926bfe8abe54f489fa6767aa508c9c0419bfa2340a24e9a2ea37f7 — https://www.soa.org/globalassets/assets/files/edu/edu-2014-spring-mlc-sol.pdf"
    - "CAS Exam MAS-I Spring 2018, Q12 — official exam paper (scan), PDF p.16, sha256:12d102c422a45e87674b082ad448ac5e25a495115f963d1a9ac63a9f8f028020 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-18.pdf"
    - "CAS Exam MAS-I Fall 2019, Q11 — official exam paper (scan), PDF p.15, sha256:32e26dbc1bd463e053ea0f9116473551be6d1b2f35b6d3670a716ecb86a141bd — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-19.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Whole Life Insurance.md
---

**Whole Life Insurance** is a life insurance policy that pays a benefit of 1 (one unit) at the moment of the insured's death, regardless of when death occurs. The **net single premium** (expected present value of the benefit) is denoted $\bar{A}_x$ for a life aged $x$.

> $$\bar{A}_x = E\!\left[e^{-\delta T_x}\right]$$

> $$= \int_0^\infty e^{-\delta t} \, {_t}p_x \, \mu_{x+t}\,dt$$

> $$\text{Var}\!\left(e^{-\delta T_x}\right)$$

> $$= {}^{2}\!\bar{A}_x - \left(\bar{A}_x\right)^2$$

- $\delta$ is the **force of interest** (continuous discounting); under discrete discounting at rate $i$, the benefit is paid at end of year of death with APV $A_x = \sum_{k=0}^\infty v^{k+1} {_k}p_x\, q_{x+k}$
- **Recursion:** $A_x = v\,q_x + v\,p_x\,A_{x+1}$
- Under a **constant force of mortality** $\mu$ and force of interest $\delta$: $\bar{A}_x = \dfrac{\mu}{\mu + \delta}$
- The **variance** uses the **double-force-of-interest trick**: ${}^2\!\bar{A}_x$ is $\bar{A}_x$ evaluated at $2\delta$

![[Media/Figures/Whole_Life_Insurance.svg|340]]

> [!example]- Net Single Premium Under Constant Force of Mortality {Example}
> A life is subject to constant force of mortality $\mu = 0.02$ and the force of interest is $\delta = 0.05$. Calculate $\bar{A}_x$.
>
> > [!answer]-
> > $$\bar{A}_x = \frac{\mu}{\mu + \delta} = \frac{0.02}{0.02 + 0.05} = \frac{0.02}{0.07} \approx 0.2857$$

> [!example]- Variance of the Present Value of the Benefit {Example}
> Using the same assumptions ($\mu = 0.02$, $\delta = 0.05$), find the variance of $v^{T_x}$.
>
> > [!answer]-
> > Compute ${}^2\!\bar{A}_x$ by doubling the force of interest:
> > $${}^2\!\bar{A}_x = \frac{0.02}{0.02 + 2(0.05)} = \frac{0.02}{0.12} \approx 0.1667$$
> > $$\text{Var}(v^{T_x}) = {}^2\!\bar{A}_x - (\bar{A}_x)^2 = 0.1667 - (0.2857)^2 \approx 0.1667 - 0.0816 = 0.0851$$
