---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:db5468a7a43c8d305c71d7f10668105693ebfb3a9ff0a96bb9e1f69fa9987f1c
  sources:
    - "Frees, Classic Joint Life Models (Univ. of Wisconsin-Madison course notes, 2013): '1. Joint Life Fundamentals' html sha256:a439240d8baac0131723263bf140fbb1610c5c5c2598fa6f7b0829f3b7950f45 — https://media.wsb.wisc.edu/data/act_sci/Frees/ActMathII/JointLifeClassics/JointLifeClassic05May2013/1_joint_life_fundamentals.html; 'Joint-Life Probability Functions' sha256:9c3b020b73d2de68ec2f4192628cef570cefe9c5f4a2e1a1d8dba9dc90a4a28d — https://media.wsb.wisc.edu/data/act_sci/Frees/ActMathII/JointLifeClassics/JointLifeClassic05May2013/jointlife_probability_functions.html; 'Last-Survivor Probability Functions' sha256:e4c2c9b40e6db153a0c0baed2a029e7c782c646d13e46af046a938da00bda7f3 — https://media.wsb.wisc.edu/data/act_sci/Frees/ActMathII/JointLifeClassics/JointLifeClassic05May2013/lastsurvivor_probability_functions.html; 'Relating Status Distributions' sha256:ae1e1765770d1a1bff6f7b6ad0ba1f683ac29d8667d55b3486e1aaaa1b7cb8b9 — https://media.wsb.wisc.edu/data/act_sci/Frees/ActMathII/JointLifeClassics/JointLifeClassic05May2013/relating_status_distributions.html; 'Lifetime Moments' sha256:9e6529ee30e580938858769871654ffb5c8492ce24ed4b9e12e1b46be5eda0c9 — https://media.wsb.wisc.edu/data/act_sci/Frees/ActMathII/JointLifeClassics/JointLifeClassic05May2013/lifetime_moments.html"
    - "Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), ch.3 p.6 (double dot = payments at the start of the year), ch.6 pp.11-12 (annuities on joint lives ä_xy until the first death and ä_{xy-bar} until both have died; arbitrage identity ä_x + ä_y = ä_xy + ä_{xy-bar}; exercise), appendix p.13 Ex.3 (independent lives: multiply probabilities) and p.14 (answer 15 + 13 - 20 = 8), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Fall 2018, Q13 — official exam paper (scan), PDF p.17, sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6: Ross A1-A6, Struppeck A5-6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Joint Life.md
---

![[Media/Figures/Joint_Life.svg|340]]

A **Joint Life** status is a status formed from two lives $(x)$ and $(y)$ that survives while both lives survive and fails at the first death. If $T_x$ and $T_y$ are the future lifetimes of the two lives, the future lifetime of the joint life status is

> $$T_{xy} = \min(T_x, T_y)$$

For independent lives, the probability that the joint life status survives $t$ years is

> $${}_tp_{xy} = {}_tp_x \; {}_tp_y$$

The probability that the status fails within $t$ years, so that at least one of the two lives dies, is ${}_tq_{xy} = 1 - {}_tp_{xy}$.

A [[System Reliability|series system]] of independent components fails when its first component fails, so its lifetime is a joint life status of the components. When each lifetime has a constant [[Hazard Rate|hazard rate]], the joint life status has a constant hazard rate equal to their sum, $\mu_x + \mu_y$.

> [!example]- Two independent lives have constant forces of mortality $\mu_x = 0.04$ and $\mu_y = 0.03$. What is the probability that at least one of them dies within 5 years? {Example}
> - The probability that both survive 5 years is ${}_5p_{xy} = e^{-0.04 \times 5}\,e^{-0.03 \times 5} = e^{-0.35} = 0.7047$.
> - The probability that at least one dies within 5 years is ${}_5q_{xy} = 1 - 0.7047 = 0.2953$.

## Last survivor status

The last survivor status of $(x)$ and $(y)$ survives while at least one of the two lives survives and fails at the second death. Its future lifetime is

> $$T_{\overline{xy}} = \max(T_x, T_y)$$

The probability that the last survivor status survives $t$ years is

> $${}_tp_{\overline{xy}} = {}_tp_x + {}_tp_y - {}_tp_{xy}$$

This holds whether or not the lives are independent. A [[System Reliability|parallel system]] works until all of its components have failed, so its lifetime is a last survivor status of the components.

> [!example]- Two independent lives, aged 40 and 50, have ${}_{10}p_{40} = 0.95$ and ${}_{10}p_{50} = 0.88$. What is the probability that both survive 10 years, and what is the probability that at least one of them does? {Example}
> - The probability that both survive is ${}_{10}p_{40:50} = 0.95 \times 0.88 = 0.836$.
> - The probability that at least one survives is ${}_{10}p_{\overline{40:50}} = 0.95 + 0.88 - 0.836 = 0.994$.

## Expected future lifetimes

For any two lifetimes, $\min(T_x, T_y) + \max(T_x, T_y) = T_x + T_y$. Taking expectations, the expected future lifetimes satisfy

> $$\mathring{e}_{xy} + \mathring{e}_{\overline{xy}} = \mathring{e}_x + \mathring{e}_y$$

- $\mathring{e}_{xy} = \int_0^\infty {}_tp_{xy}\,dt$ is the expected future lifetime of the joint life status.

> [!example]- Two independent lives have constant forces of mortality $\mu_x = 0.04$ and $\mu_y = 0.03$. What is the expected time until the second death? {Example}
> - Each lifetime is exponential, so $\mathring{e}_x = 1/0.04 = 25$ and $\mathring{e}_y = 1/0.03 = 33.33$.
> - The joint life status has constant hazard rate $0.04 + 0.03 = 0.07$, so $\mathring{e}_{xy} = 1/0.07 = 14.29$.
> - The expected time until the second death is $\mathring{e}_{\overline{xy}} = 25 + 33.33 - 14.29 = 44.05$ years.

## Annuities on two lives

A joint life annuity-due $\ddot{a}_{xy}$ pays 1 at the start of each year while both lives survive. A last survivor annuity-due $\ddot{a}_{\overline{xy}}$ pays 1 at the start of each year while at least one survives. Paying 1 to each life while it is alive is the same as paying 1 while either is alive and 1 more while both are, so

> $$\ddot{a}_x + \ddot{a}_y = \ddot{a}_{xy} + \ddot{a}_{\overline{xy}}$$

- $\ddot{a}_x$ and $\ddot{a}_y$ are the [[Life Annuity|life annuities]]-due on the single lives.

> [!example]- Life annuities-due on $(40)$ and $(50)$ have actuarial present values 15 and 13, and the last survivor annuity-due on the two lives has actuarial present value 20. What is the actuarial present value of the joint life annuity-due? {Example}
> - The joint life annuity-due is $\ddot{a}_{40:50} = \ddot{a}_{40} + \ddot{a}_{50} - \ddot{a}_{\overline{40:50}}$.
> - $\ddot{a}_{40:50} = 15 + 13 - 20 = 8$.

> [!trap] Treating the last survivor status as the complement of the joint life status
> The complement of "both survive" is "at least one dies", not "at least one survives". With ${}_{10}p_{40:50} = 0.836$, the probability that at least one life survives is 0.994, not $1 - 0.836 = 0.164$.
