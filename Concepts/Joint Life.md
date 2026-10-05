---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:574de227ea38b525c8a93b5f99c666d6c8bffe3fecdbf96a0033f8f0786d409d
  sources:
    - "Frees, Classic Joint Life Models (Univ. of Wisconsin-Madison course notes, 2013): '1. Joint Life Fundamentals' html sha256:a439240d8baac0131723263bf140fbb1610c5c5c2598fa6f7b0829f3b7950f45 — https://media.wsb.wisc.edu/data/act_sci/Frees/ActMathII/JointLifeClassics/JointLifeClassic05May2013/1_joint_life_fundamentals.html; 'Joint-Life Probability Functions' sha256:9c3b020b73d2de68ec2f4192628cef570cefe9c5f4a2e1a1d8dba9dc90a4a28d — https://media.wsb.wisc.edu/data/act_sci/Frees/ActMathII/JointLifeClassics/JointLifeClassic05May2013/jointlife_probability_functions.html; 'Last-Survivor Probability Functions' sha256:e4c2c9b40e6db153a0c0baed2a029e7c782c646d13e46af046a938da00bda7f3 — https://media.wsb.wisc.edu/data/act_sci/Frees/ActMathII/JointLifeClassics/JointLifeClassic05May2013/lastsurvivor_probability_functions.html; 'Relating Status Distributions' sha256:ae1e1765770d1a1bff6f7b6ad0ba1f683ac29d8667d55b3486e1aaaa1b7cb8b9 — https://media.wsb.wisc.edu/data/act_sci/Frees/ActMathII/JointLifeClassics/JointLifeClassic05May2013/relating_status_distributions.html; 'Lifetime Moments' sha256:9e6529ee30e580938858769871654ffb5c8492ce24ed4b9e12e1b46be5eda0c9 — https://media.wsb.wisc.edu/data/act_sci/Frees/ActMathII/JointLifeClassics/JointLifeClassic05May2013/lifetime_moments.html"
    - "Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), ch.3 p.6 (double dot = payments at the start of the year), ch.6 pp.11-12 (annuities on joint lives ä_xy until the first death and ä_{xy-bar} until both have died; arbitrage identity ä_x + ä_y = ä_xy + ä_{xy-bar}; exercise), appendix p.13 Ex.3 (independent lives: multiply probabilities) and p.14 (answer 15 + 13 - 20 = 8), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Fall 2018, Q13 — official exam paper (scan), PDF p.17, sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6: Ross A1-A6, Struppeck A5-6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Joint Life.md
---

**Joint Life** models describe the survival of two (or more) lives simultaneously, focusing on the time until the **first** death. Given two independent lives aged $x$ and $y$ with future lifetimes $T_x$ and $T_y$, the joint-life future lifetime is $T_{xy} = \min(T_x, T_y)$.

> $$_{t}p_{xy} = P(T_{xy} > t)$$

> $$= {_t}p_x \cdot {_t}p_y \quad \text{(independence)}$$

> $$_{t}q_{xy} = 1 - {_t}p_{xy}$$

> $$= 1 - {_t}p_x \cdot {_t}p_y$$

> $$_{t}p_{\overline{xy}} = {_t}p_x + {_t}p_y - {_t}p_{xy}$$

> $$\ddot{a}_x + \ddot{a}_y = \ddot{a}_{xy} + \ddot{a}_{\overline{xy}}$$

- The **last survivor** status $T_{\overline{xy}} = \max(T_x, T_y)$ lasts until the **second** death. It is not the complement of the joint-life status: its survival probability is ${_t}p_x + {_t}p_y - {_t}p_{xy}$, which holds with or without independence and becomes ${_t}p_x + {_t}p_y - {_t}p_x\,{_t}p_y$ for independent lives
- Relationship: $T_{xy} + T_{\overline{xy}} = T_x + T_y$, so $\mathring{e}_{xy} + \mathring{e}_{\overline{xy}} = \mathring{e}_x + \mathring{e}_y$
- The **complete joint-life expectancy**: $\mathring{e}_{xy} = \int_0^\infty {_t}p_{xy}\,dt$
- Under independence, the joint survival function factors into the product of the individual survival functions
- **Annuities on two lives:** the joint-life annuity $\ddot{a}_{xy}$ pays 1 at the start of each year until the first of the two dies, the last-survivor annuity $\ddot{a}_{\overline{xy}}$ until both have died (see [[Life Annuity]]). Paying 1 to each life while it is alive is the same as paying 1 while either is alive plus a second 1 while both are — so if annuities on $(40)$ and $(50)$ cost 15 and 13 and the last-survivor annuity costs 20, the joint-life annuity costs $15 + 13 - 20 = 8$

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
