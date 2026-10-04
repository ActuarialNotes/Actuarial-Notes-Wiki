---
target: Concepts/Life Annuity.md
created: 2026-10-04
---

## [F-001] Defines the whole life annuity as continuous; the MAS-I reading and papers use the annual annuity-due, whose recursion and temporary form are missing
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: lead definition and opening formulas; annuity-due recursion, annuity-immediate and temporary annuity-due (absent)
- claim: The whole life annuity pays 1 continuously per unit time for as long as the insured lives; its EPV is ā_x — the annuity-due ä_x = (1 - A_x)/d appears only in a bullet, the temporary annuity only in its continuous form, and there is no recursion and no annuity-immediate.
- evidence: Struppeck (MAS-I reading for task A6, 2026 outline p.3 and p.6, sha256:24589236…; note sha256:8ea3f762…) defines the life annuity in annual payments only: the life-annuity-due ä_x (payments at the start of each year while (x) is alive) and the life-annuity-immediate a_x (at the end) (p.6); the recursion ä_x = 1 + ν p_x ä_{x+1} (p.7); 1 = d ä_x + A_x and ä_x = (1 - A_x)/d (p.7); and the annuity paying until death or n years, whichever is first, and the one guaranteed for n years (p.8; worked with the ä_x column in ch.4 p.9). The exam's ILT tabulates ä_x (PDF p.4, sha256:cb567413…). The MAS-I papers ask exactly these: Spring 2019 Q11, the APV of a 20-year temporary annuity-due on (30) from the ILT at 6%, and Q12, the change in a whole life annuity-due of 10,000 when p_{x+1} drops by 0.01, given q_x, q_{x+1}, i and ä_{x+1} — the recursion (PDF pp.15-16, sha256:02debe7c…). The page offers neither the recursion nor a discrete temporary annuity. Its formulas are right — ā_x = ∫ e^{-δt} tpx dt and the temporary version (Slud (4.26)-(4.27)); ā_x = 1/(μ+δ) (Slud (4.34), n -> ∞; SOA MLC Q14); ä_x = (1 - A_x)/d reproduces the ILT (ä_40 = 14.8167 from A_40 vs 14.8166 tabulated) — but they define the contract by the continuous variant and leave out the forms the exam is set in.
- source_rank: 2
- proposed_action: Lead with the life-annuity-due ä_x and the annuity-immediate a_x as Struppeck defines them, the recursion ä_x = 1 + v p_x ä_{x+1}, and the temporary / guaranteed annuities (pp.6-8); keep ā_x as the continuous variant. Authoring; not applied.
- applied: false
- fingerprint: 4b7cf959a522

## [C-001] Exam DISC-IA links this page in a different sense
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: exam usage
- note: Exam DISC-IA (CAS).md links this page as [[Life Annuity|Types of Annuities]] (line 82), transcribing the DISC IA course syllabus p.3, topic 7 c 'Evaluating Types of Annuities', beside term, whole and universal life and health plans (CAS DISC IA syllabus, (c)2023 The Institutes, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b, https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf). In a coverage course 'types of annuities' is the product sense; this page is the actuarial-valuation sense the MAS-I page uses (EPVs, ā_x, ä_x) and lists no types of annuity product at all, so the DISC-IA link lands on content that does not answer it. Not reconciled here; flagged for whoever maintains the DISC-IA page. The Institutes' course text is sold and was not read, so what DISC-IA means by 'types' is inferred from the syllabus context only.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Every formula checked: ā_x = E[ā_{T|}] = ∫ e^{-δt} tpx dt and the temporary ā_{x:n} = ∫_0^n (Slud (4.26)-(4.27)); ā_x = 1/(μ+δ) under constant force (Slud (4.34) with n -> ∞; SOA MLC Q14); ä_x = (1 - A_x)/d with d = 1 - v (Struppeck p.7) — reproduces the CAS ILT: (1 - 0.16132)/(0.06/1.06) = 14.8167 vs ä_40 = 14.8166, 16.5134 vs ä_20 = 16.5133; the annuity-due recursion 1 + v p_x ä_{x+1} reproduces ä_40 and ä_20 exactly. Ā_x + δā_x = 1: Struppeck states the annual form 1 = dä_x + A_x by an arbitrage argument he says holds for any, even random, horizon (p.7); the continuous form follows by taking E_x of Slud's ā_{K|} = (1 - v^K)/δ at K = T - x, and SOA MLC Q14's numbers satisfy it (1/3 + 0.06/0.09 = 1). Both worked examples recomputed from scratch in Python and then compared: ā = 1/0.08 = 12.5 (also by quadrature, and Ā + δā = 1.000); (1 - 0.25)/0.06 = 12.5 — agree. Figure (generated, life_annuity) draws payments of 1 at times 0..8 scaled by kpx — the annual annuity-due, consistent with Struppeck. Links resolve. Linked by Exam MAS-I (CAS) (A6) and Exam DISC-IA (CAS) (product sense — see the comment).
- sources_checked: Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), ch.3 pp.6-8 (life-annuity-due ä_x and -immediate a_x; ä_x = 1 + νp_xä_{x+1}; 1 = dä_x + A_x, ä_x = (1 - A_x)/d; temporary and guaranteed annuities), ch.4 p.9, sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf; CAS Exam MAS-I Tables, Illustrative Life Table: Basic Functions and Single Benefit Premiums at i = 0.06, PDF p.4, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §1.2.2 / §4.2 p.107 (ā_{K|} = (1 - v^K)/δ, δ = ln(1+i)), eq.(4.26)-(4.27) p.108 (ā_x = ∫ v^t tpx dt, temporary to n), eq.(4.34) p.111 (constant force: ā_{x:n} = (1 - e^{-(δ+μ)n})/(δ+μ)), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf; SOA Exam MLC Sample Solutions (MLC-09-16, 2016), Q14 (p.10; PDF p.11: ā = 1/(μ+δ) and Ā = μ/(μ+δ) under constant force, μ = 0.03, δ = 0.06 giving Ā = 1/3 and δā = 2/3), sha256:791e13b42b926bfe8abe54f489fa6767aa508c9c0419bfa2340a24e9a2ea37f7 — https://www.soa.org/globalassets/assets/files/edu/edu-2014-spring-mlc-sol.pdf; CAS Exam MAS-I Spring 2019, Q11-Q12 — official exam paper (scan), PDF pp.15-16, sha256:02debe7c986ee38d3f484b277d0dc4a08ec424d0bb3b868b4890e4edb9312274 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-19.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Every formula on the page is correct and sourced. Open: F-001 major — the page defines the whole life annuity by its continuous form, while the MAS-I reading, the exam's table and the MAS-I papers use the annual annuity-due, and its recursion and temporary form are missing. Medium because the continuous formulas rest on rank-3 sources (Slud, SOA MLC solutions). Notation: the page's ä_x and a_x-free treatment vs Struppeck's ä_x / a_x; Struppeck writes ν for v.
