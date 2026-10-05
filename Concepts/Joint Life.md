---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:a3adffc7e3c77240246781c4b2056fee6ef943ac0d48f99c059e85044afb37f2
  sources:
    - "Frees, Classic Joint Life Models (Univ. of Wisconsin-Madison course notes, 2013): '1. Joint Life Fundamentals' html sha256:a439240d8baac0131723263bf140fbb1610c5c5c2598fa6f7b0829f3b7950f45, 'Joint-Life Probability Functions' sha256:9c3b020b73d2de68ec2f4192628cef570cefe9c5f4a2e1a1d8dba9dc90a4a28d, 'Last-Survivor Probability Functions' sha256:e4c2c9b40e6db153a0c0baed2a029e7c782c646d13e46af046a938da00bda7f3, 'Relating Status Distributions' sha256:ae1e1765770d1a1bff6f7b6ad0ba1f683ac29d8667d55b3486e1aaaa1b7cb8b9, 'Lifetime Moments' sha256:9e6529ee30e580938858769871654ffb5c8492ce24ed4b9e12e1b46be5eda0c9 — https://media.wsb.wisc.edu/data/act_sci/Frees/ActMathII/JointLifeClassics/JointLifeClassic05May2013/1_joint_life_fundamentals.html"
    - "SOA Exam MLC Sample Solutions (MLC-09-16, 2016), Q80 (p.46; PDF p.47), sha256:791e13b42b926bfe8abe54f489fa6767aa508c9c0419bfa2340a24e9a2ea37f7 — https://www.soa.org/globalassets/assets/files/edu/edu-2014-spring-mlc-sol.pdf"
    - "Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), pp.11-12 (annuities on joint lives, a_xy and a_{xy-bar}, a_x + a_y = a_xy + a_{xy-bar}) and appendix p.14, sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Fall 2018, Q13 — official exam paper (scan), PDF p.17, sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf"
    - "SOA, Notation and Terminology Used on Exam LTAM (version Aug 1, 2021), pp.1-2, sha256:ffcc9efd3c0a72edadf4b259703660e07515b313f6fd9ffa57e25d72b1d090f9 — https://www.soa.org/globalassets/assets/Files/Edu/2018/ltam-notation-note.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Joint Life.md
---

**Joint Life** models describe the survival of two (or more) lives simultaneously, focusing on the time until the **first** death. Given two independent lives aged $x$ and $y$ with future lifetimes $T_x$ and $T_y$, the joint-life future lifetime is $T_{xy} = \min(T_x, T_y)$.

> $$_{t}p_{xy} = P(T_{xy} > t)$$

> $$= {_t}p_x \cdot {_t}p_y \quad \text{(independence)}$$

> $$_{t}q_{xy} = 1 - {_t}p_{xy}$$

> $$= 1 - {_t}p_x \cdot {_t}p_y$$

> $$_{t}p_{\overline{xy}} = {_t}p_x + {_t}p_y - {_t}p_{xy}$$

- The **last survivor** status $T_{\overline{xy}} = \max(T_x, T_y)$ lasts until the **second** death. It is not the complement of the joint-life status: its survival probability is ${_t}p_x + {_t}p_y - {_t}p_{xy}$, which holds with or without independence and becomes ${_t}p_x + {_t}p_y - {_t}p_x\,{_t}p_y$ for independent lives
- Relationship: $T_{xy} + T_{\overline{xy}} = T_x + T_y$, so $\mathring{e}_{xy} + \mathring{e}_{\overline{xy}} = \mathring{e}_x + \mathring{e}_y$
- The **complete joint-life expectancy**: $\mathring{e}_{xy} = \int_0^\infty {_t}p_{xy}\,dt$
- Under independence, the joint survival function factors into the product of the individual survival functions
- **Annuities on two lives:** $\ddot{a}_{xy}$ pays 1 at the start of each year until the first of the two dies, $\ddot{a}_{\overline{xy}}$ until both have died, and $\ddot{a}_x + \ddot{a}_y = \ddot{a}_{xy} + \ddot{a}_{\overline{xy}}$ — 1 to each life while it is alive is the same as 1 while either is alive plus a second 1 while both are (see [[Life Annuity]])

![[Media/Figures/Joint_Life.svg|340]]

> [!example]- Probability Both, and At Least One, Survive 10 Years {Example}
> Two independent lives, aged 40 and 50, have $_{10}p_{40} = 0.95$ and $_{10}p_{50} = 0.88$. Find the probability that both survive 10 years, and the probability that at least one of them does.
>
> > [!answer]-
> > $$_{10}p_{40:50} = {_{10}p_{40}} \cdot {_{10}p_{50}} = 0.95 \times 0.88 = 0.836$$
> > $$_{10}p_{\overline{40:50}} = 0.95 + 0.88 - 0.836 = 0.994$$
> > The last-survivor probability is not $1 - 0.836 = 0.164$: that is the probability that at least one of the two dies.

> [!example]- Probability That the Joint Life Status Fails Within 5 Years {Example}
> Under a constant force of mortality, $\mu_x = 0.04$ and $\mu_y = 0.03$. Find $_{5}q_{xy}$, the probability that the joint-life fails within 5 years.
>
> > [!answer]-
> > With constant forces, ${_t}p_x = e^{-0.04t}$ and ${_t}p_y = e^{-0.03t}$.
> > $$_{5}p_{xy} = e^{-0.04(5)} \cdot e^{-0.03(5)} = e^{-0.20} \cdot e^{-0.15} = e^{-0.35} \approx 0.7047$$
> > $$_{5}q_{xy} = 1 - 0.7047 = 0.2953$$

> [!example]- Pricing a Joint-Life Annuity by Arbitrage {Example}
> A life annuity of 1 on $(40)$ costs 15 and one on $(50)$ costs 13. An annuity paying 1 while either of them is alive costs 20. What does an annuity paying 1 while both are alive cost?
>
> > [!answer]-
> > $$\ddot{a}_{40:50} = \ddot{a}_{40} + \ddot{a}_{50} - \ddot{a}_{\overline{40:50}} = 15 + 13 - 20 = 8$$
