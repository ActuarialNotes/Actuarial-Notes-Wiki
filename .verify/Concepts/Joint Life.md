---
target: Concepts/Joint Life.md
created: 2026-10-04
---

## [F-001] Last-survivor status called 'complementary' to the joint-life status
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: first bullet
- claim: The last survivor status T_{xy-bar} = max(T_x, T_y) is complementary to the joint-life status
- evidence: Frees, Classic Joint Life Models (UW-Madison), 'Relating Status Distributions' (sha256:ae1e1765…): tp_{xy-bar} = tp_x + tp_y - tp_xy, which holds without independence; 'Last-Survivor Probability Functions' (sha256:e4c2c9b4…): under independence tp_{xy-bar} = tp_x + tp_y - tp_x tp_y. SOA Exam MLC Sample Solutions Q80, p.46 (sha256:791e13b4…) uses the same formula ('since independent'). Neither status is the complement of the other: with the page's own example 1, 10p_{40:50} = 0.836 and the 10-year last-survivor survival probability is 0.95 + 0.88 - 0.836 = 0.994, not 1 - 0.836 = 0.164. 'Complementary' invites exactly that wrong step, and the page never states the correct relation.
- source_rank: 3
- proposed_action: Drop 'complementary to the joint-life status' (call it the counterpart / the other basic status) and state tp_{xy-bar} = tp_x + tp_y - tp_xy. Rewording is authoring; left for the page's author.
- applied: false
- fingerprint: 2430e957dc6e

## [F-002] Omits the joint-life result the MAS-I reading teaches
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: whole page (omission)
- claim: The page covers T_xy, tp_xy = tp_x tp_y, T_xy + T_{xy-bar} = T_x + T_y and complete expectations, but no annuity on joint lives and no last-survivor probability.
- evidence: The 2026 MAS-I outline (sha256:24589236…) assigns task A5 'Perform joint life calculations' to Ross and Struppeck (Struppeck A5-6, p.6). Struppeck's whole treatment of joint lives (pp.11-12, sha256:8ea3f762…) is the annuity notation a_xy (pays until one of the two dies) and a_{xy-bar} (until both have died) and the arbitrage identity a_x + a_y = a_xy + a_{xy-bar}, with an exercise (annuities of 15 and 13, last-survivor 20, so the joint annuity costs 15 + 13 - 20 = 8, appendix p.14). The page has neither the identity nor any joint annuity. It also lacks tp_{xy-bar} (see F-001), which the CAS Fall 2018 Q13 paper question (two independent lives (35) and (55), probability that (35) is the only one alive at 90; PDF p.17, sha256:47ced888…) turns on. The page's own content is correct (Frees, Joint Life Fundamentals / Lifetime Moments).
- source_rank: 2
- proposed_action: Add Struppeck's joint / last-survivor annuity identity a_x + a_y = a_xy + a_{xy-bar} (in his notation, annuities-due) and the last-survivor survival probability. Authoring; not applied.
- applied: false
- fingerprint: 5f2d0d7cbf69

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Every formula checked against Frees: T_xy = min(T_x, T_y) and T_{xy-bar} = max (Joint Life Fundamentals); tp_xy = tp_x tp_y and tq_xy = 1 - tp_x tp_y under independence (Joint-Life Probability Functions); e̊_xy = ∫ tp_xy dt and e̊_{xy-bar} = e̊_x + e̊_y - e̊_xy without independence (Lifetime Moments) — the page's T_xy + T_{xy-bar} = T_x + T_y is min + max = sum and gives the same expectation identity. Notation T_xy / T_{xy-bar} matches the SOA LTAM notation note p.1; Struppeck writes only the annuity symbols. Both worked examples recomputed from scratch in Python and then compared: 0.95 x 0.88 = 0.836; e^{-0.35} = 0.704688, 1 - 0.7047 = 0.2953 — agree. Figure (generated, joint_life) draws tp_xy below both single lives and the last-survivor curve above both — consistent with min/max. Links resolve. Linked only by Exam MAS-I (CAS) (A5).
- sources_checked: Frees, Classic Joint Life Models (Univ. of Wisconsin-Madison course notes, 2013): '1. Joint Life Fundamentals' html sha256:a439240d8baac0131723263bf140fbb1610c5c5c2598fa6f7b0829f3b7950f45, 'Joint-Life Probability Functions' sha256:9c3b020b73d2de68ec2f4192628cef570cefe9c5f4a2e1a1d8dba9dc90a4a28d, 'Last-Survivor Probability Functions' sha256:e4c2c9b40e6db153a0c0baed2a029e7c782c646d13e46af046a938da00bda7f3, 'Relating Status Distributions' sha256:ae1e1765770d1a1bff6f7b6ad0ba1f683ac29d8667d55b3486e1aaaa1b7cb8b9, 'Lifetime Moments' sha256:9e6529ee30e580938858769871654ffb5c8492ce24ed4b9e12e1b46be5eda0c9 — https://media.wsb.wisc.edu/data/act_sci/Frees/ActMathII/JointLifeClassics/JointLifeClassic05May2013/1_joint_life_fundamentals.html; SOA Exam MLC Sample Solutions (MLC-09-16, 2016), Q80 (p.46; PDF p.47), sha256:791e13b42b926bfe8abe54f489fa6767aa508c9c0419bfa2340a24e9a2ea37f7 — https://www.soa.org/globalassets/assets/files/edu/edu-2014-spring-mlc-sol.pdf; Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), pp.11-12 (annuities on joint lives, a_xy and a_{xy-bar}, a_x + a_y = a_xy + a_{xy-bar}) and appendix p.14, sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf; CAS Exam MAS-I Fall 2018, Q13 — official exam paper (scan), PDF p.17, sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf; SOA, Notation and Terminology Used on Exam LTAM (version Aug 1, 2021), pp.1-2, sha256:ffcc9efd3c0a72edadf4b259703660e07515b313f6fd9ffa57e25d72b1d090f9 — https://www.soa.org/globalassets/assets/Files/Edu/2018/ltam-notation-note.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Medium: what the page states is confirmed by rank-3 sources (Frees; SOA MLC solutions), and the MAS-I reading (Struppeck) covers only the joint-life annuity identity, which the page omits (F-002). Ross was not read. Open: F-001 minor (wording that suggests a complement), F-002 minor (omission).
