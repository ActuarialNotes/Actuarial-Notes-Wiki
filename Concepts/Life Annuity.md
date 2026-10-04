---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:edd6177e722aa444131a2d91997294392b3ff9f5ecdcbce0e2f6369458107ac9
  sources:
    - "Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), ch.3 pp.6-8 (life-annuity-due ä_x and -immediate a_x; ä_x = 1 + νp_xä_{x+1}; 1 = dä_x + A_x, ä_x = (1 - A_x)/d; temporary and guaranteed annuities), ch.4 p.9, sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Tables, Illustrative Life Table: Basic Functions and Single Benefit Premiums at i = 0.06, PDF p.4, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §1.2.2 / §4.2 p.107 (ā_{K|} = (1 - v^K)/δ, δ = ln(1+i)), eq.(4.26)-(4.27) p.108 (ā_x = ∫ v^t tpx dt, temporary to n), eq.(4.34) p.111 (constant force: ā_{x:n} = (1 - e^{-(δ+μ)n})/(δ+μ)), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "SOA Exam MLC Sample Solutions (MLC-09-16, 2016), Q14 (p.10; PDF p.11: ā = 1/(μ+δ) and Ā = μ/(μ+δ) under constant force, μ = 0.03, δ = 0.06 giving Ā = 1/3 and δā = 2/3), sha256:791e13b42b926bfe8abe54f489fa6767aa508c9c0419bfa2340a24e9a2ea37f7 — https://www.soa.org/globalassets/assets/files/edu/edu-2014-spring-mlc-sol.pdf"
    - "CAS Exam MAS-I Spring 2019, Q11-Q12 — official exam paper (scan), PDF pp.15-16, sha256:02debe7c986ee38d3f484b277d0dc4a08ec424d0bb3b868b4890e4edb9312274 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-19.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Life Annuity.md
---

A **Life Annuity** pays periodic benefits contingent on the survival of one or more lives. The **whole life annuity** pays 1 continuously per unit time for as long as the insured lives. Its expected present value (EPV) for a life aged $x$ is $\bar{a}_x$.

> $$\bar{a}_x = E\!\left[\bar{a}_{\overline{T_x}|}\right]$$

> $$= \int_0^\infty e^{-\delta t}\,{_t}p_x\,dt$$

> $$\bar{a}_x = \frac{1 - \bar{A}_x}{\delta}$$

- The **life annuity-due** $\ddot{a}_x$ pays 1 at the beginning of each year the insured is alive: $\ddot{a}_x = \dfrac{1 - A_x}{d}$, where $d = 1 - v$ is the effective discount rate
- **Temporary life annuity** $\bar{a}_{x:\overline{n}|}$ pays for at most $n$ years: $\bar{a}_{x:\overline{n}|} = \int_0^n e^{-\delta t}\,{_t}p_x\,dt$
- Under **constant force of mortality** $\mu$: $\bar{a}_x = \dfrac{1}{\mu + \delta}$
- Relationship to whole life insurance: $\bar{A}_x + \delta\,\bar{a}_x = 1$

![[Media/Figures/Life_Annuity.svg|340]]

> [!example]- EPV of a Whole Life Annuity Under Constant Force of Mortality {Example}
> A life has constant force of mortality $\mu = 0.03$ and the force of interest is $\delta = 0.05$. Calculate $\bar{a}_x$.
>
> > [!answer]-
> > $$\bar{a}_x = \frac{1}{\mu + \delta} = \frac{1}{0.03 + 0.05} = \frac{1}{0.08} = 12.5$$

> [!example]- Using the Annuity-Insurance Relationship {Example}
> For a life aged $x$, $\bar{A}_x = 0.25$ and $\delta = 0.06$. Find $\bar{a}_x$.
>
> > [!answer]-
> > Using the fundamental relationship $\bar{A}_x + \delta\,\bar{a}_x = 1$:
> > $$\bar{a}_x = \frac{1 - \bar{A}_x}{\delta} = \frac{1 - 0.25}{0.06} = \frac{0.75}{0.06} = 12.5$$
