---
target: Concepts/Whole Life Insurance.md
created: 2026-10-04
---

## [F-001] Defines whole life by the continuous model the MAS-I reading never uses; omits the level premium the papers test
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: lead definition and opening formulas; level premium (absent)
- claim: Whole Life Insurance is a policy that pays a benefit of 1 at the moment of the insured's death; its net single premium is denoted Ā_x = E[e^{-δT_x}] — the discrete A_x appears only in a bullet, and no level (annual) premium is given.
- evidence: Struppeck (the MAS-I reading for task A6 per the 2026 outline p.3 and p.6, sha256:24589236…; note sha256:8ea3f762…) defines whole life by its term, not its payment timing — 'Policies with an unlimited term are called whole life policies' (p.5) — and works throughout with $1 paid at the end of the year of death: A_x = v q_x + v p_x A_{x+1} and A_x = Σ v^{n+1} np_x q_{x+n} (pp.5-6; 'all death benefits are assumed to be paid at the end of the year of death', p.6). Its level premium is P from A_x = P ä_x (p.7), worked in the appendix for (40): A_40 = 0.16132, ä_40 = 14.8166, P = 0.010888 (p.14; recomputed 0.0108878). The exam's own table is discrete: the MAS-I Tables' Illustrative Life Table gives 1000A_x, 1000 ²A_x and ä_x at i = 0.06 as 'Single Benefit Premiums' (PDF p.4, sha256:cb567413…). Every MAS-I paper question on whole life in the bank is discrete and two of them are level premiums the page cannot answer: Spring 2018 Q12 (P_45 - P_65 from the ILT; PDF p.16, sha256:12d102c4…) and Fall 2019 Q11 (annual level benefit premium on a 10,000 whole life from l_x, 1000q_x, ä_x, 1000A_x columns; PDF p.15, sha256:32e26dbc…). The continuous formulas on the page are correct as a variant (Slud §4.2 eq.(4.24); SOA MLC sample solutions Q2, Q14) — the issue is that the page presents the variant as the definition, so a MAS-I candidate who trusts it reaches for Ā_x = μ/(μ+δ) where the exam wants A_x, and finds no premium formula at all.
- source_rank: 2
- proposed_action: Lead with the MAS-I contract — $1 at the end of the year of death, A_x, its recursion and sum (Struppeck pp.5-6) — and the level premium P = A_x / ä_x (p.7); keep Ā_x as the payable-at-the-moment-of-death variant. Authoring; not applied.
- applied: false
- fingerprint: ae16c6bb4bdb

## [F-002] Variance example rounds from rounded intermediates (0.0851; exact 0.0850)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: example 'Variance of the Present Value of the Benefit', last line
- claim: Var(v^{T_x}) = 0.1667 - (0.2857)^2 ≈ 0.1667 - 0.0816 = 0.0851
- evidence: Recomputed from scratch in Python (by quadrature and in closed form) and then compared: Ā_x = 0.02/0.07 = 2/7, ²Ā_x = 0.02/0.12 = 1/6, Var = 1/6 - 4/49 = 25/294 = 0.085034, i.e. 0.0850 to four decimals. The page's 0.0851 comes from subtracting the rounded 0.0816 from the rounded 0.1667; the displayed line is internally consistent, only the final digit is off. Formulas ²Ā at double force and Var = ²Ā - Ā² as in SOA MLC sample solution Q14 (p.10, sha256:791e13b4…). Rank 5 for the digit.
- source_rank: 5
- proposed_action: Show the exact value (25/294 ≈ 0.0850) or carry more digits through the subtraction.
- applied: false
- fingerprint: 4aac5e3198d9

## [C-001] Exam DISC-IA links this page in a different sense
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: exam usage
- note: Exam DISC-IA (CAS).md links this page as [[Whole Life Insurance|Whole Life]] (line 81) under topic 7 'Life and Health Insurance', transcribing the DISC IA course syllabus p.3, 7 a-d: 'Understanding Term Life Insurance; Understanding Whole Life and Universal Life Insurance; Evaluating Types of Annuities; Health Insurance Plans' (CAS DISC IA syllabus, (c)2023 The Institutes, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b, https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf). That is a coverage course: whole life as a product, beside term and universal life. This page is the actuarial-valuation sense the MAS-I page uses (APVs, recursions, variance) and says nothing about the product. Nothing on the page contradicts the product sense; it just doesn't serve it. Not reconciled here; flagged for whoever maintains the DISC-IA page. The Institutes' course text is sold and was not read.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Every formula checked: Ā_x = E[e^{-δT}] = ∫ e^{-δt} tpx μ_{x+t} dt (Slud (4.24)); Var = ²Ā - Ā² with ²Ā at 2δ (Struppeck Ex.6 p.8; SOA MLC Q14); A_x = Σ v^{k+1} kpx q_{x+k} and A_x = v q_x + v p_x A_{x+1} (Struppeck p.6), and the recursion reproduces the CAS ILT exactly: v(q_40 + p_40 A_41) = 0.16132 = tabulated A_40, likewise A_20 = 0.06528; Ā_x = μ/(μ+δ) under constant force (SOA MLC Q2). Both worked examples recomputed from scratch in Python and then compared: Ā = 0.285714 agrees; ²Ā = 0.166667 agrees; variance exact 0.085034 vs page 0.0851 (F-002). Figure (generated, whole_life_insurance) draws k|qx bars with the year-4 death paid at time 4 and discounted by v^4 — the discrete end-of-year model, consistent with Struppeck. Links resolve. Linked by Exam MAS-I (CAS) (A6) and Exam DISC-IA (CAS) (product sense — see the comment).
- sources_checked: Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), ch.3 pp.5-7 (whole life = unlimited term; $1 at end of year of death; A_x = νq_x + νp_xA_{x+1}; A_x = Σν^{n+1} np_x q_{x+n}; level premium A_x = Pä_x), ch.3 Ex.6 p.8 (second moment at double the force of interest; variance), appendix p.14, sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf; CAS Exam MAS-I Tables, Illustrative Life Table: Basic Functions and Single Benefit Premiums at i = 0.06, PDF p.4, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §4.2 pp.106-108, eq.(4.22)-(4.24) (instantaneous-payment whole life Ā_x = E_x(v^{T-x}) = ∫ v^t μ(x+t) tpx dt), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf; SOA Exam MLC Sample Solutions (MLC-09-16, 2016), Q2 (p.2; PDF p.3: Ā_x = μ/(μ+δ) under constant force), Q14 and Q16 (p.10; PDF p.11: ²Ā_x = μ/(2δ+μ), variance ²Ā - Ā², 1000P_40 = A_40/ä_40 = 161.32/14.8166 = 10.89), sha256:791e13b42b926bfe8abe54f489fa6767aa508c9c0419bfa2340a24e9a2ea37f7 — https://www.soa.org/globalassets/assets/files/edu/edu-2014-spring-mlc-sol.pdf; CAS Exam MAS-I Spring 2018, Q12 — official exam paper (scan), PDF p.16, sha256:12d102c422a45e87674b082ad448ac5e25a495115f963d1a9ac63a9f8f028020 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-18.pdf; CAS Exam MAS-I Fall 2019, Q11 — official exam paper (scan), PDF p.15, sha256:32e26dbc1bd463e053ea0f9116473551be6d1b2f35b6d3670a716ecb86a141bd — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-19.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Every formula on the page is correct and sourced. Open: F-001 major — the page defines whole life by the continuous (moment-of-death) model, while the MAS-I reading, the exam's table and every MAS-I paper question use the end-of-year model, and the level premium the papers test is missing; F-002 nit (rounding). Medium because the continuous formulas rest on rank-3 sources (Slud, SOA MLC solutions). Notation: Struppeck writes ν for v and 'actuarial present value' where the page writes 'net single premium' (the ILT says 'single benefit premium'; the SOA notation note treats APV/EPV as interchangeable).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Page now leads with the MAS-I contract as the reading defines it: whole life = life insurance with an unlimited term (Struppeck ch.3 p.5, 'Policies with an unlimited term are called whole life policies'), the benefit paid at the end of the year of death, APV (net single premium) A_x. Opening formula blocks are now A_x = Σ_{k>=0} v^{k+1} kp_x q_{x+k} and A_x = v q_x + v p_x A_{x+1} (Struppeck pp.5-6) and the level annual premium P = A_x / ä_x (p.7: A_x = P ä_x; premiums at the start of each year while (x) lives form a life-annuity-due, p.6), with ä_x = (1 - A_x)/d (p.7) so P follows from A_x and d alone. Variance bullet restated for A_x: second moment = A_x at v^2 (double the force of interest), Var = ²A_x - A_x^2 (Struppeck ch.3 Ex.6 p.8); the ILT lists 1000A_x, 1000²A_x and ä_x at i = 0.06 (MAS-I Tables PDF p.4, sha256:cb567413…). The continuous Ā_x is kept as one bullet, labelled the paid-at-the-moment-of-death variant: Ā_x = E[e^{-δT_x}] = ∫ e^{-δt} tp_x μ_{x+t} dt (Slud §4.2 eq.(4.24) p.108), ²Ā at 2δ and Ā = μ/(μ+δ) under constant force (SOA MLC sample solutions Q2 p.2, Q14 p.10, sha256:791e13b4…). Examples: (1) new — A_40 by the recursion from the ILT, (0.00278 + 0.99722 × 0.16869)/1.06 = 0.16132 = tabulated 1000A_40 = 161.32; (2) new — level premium P_40 = 0.16132/14.8166 = 0.010888, Struppeck's own appendix answer (p.14), and again from A_40 and d alone (ä_40 = 0.83868 × 1.06/0.06 = 14.8167); (3) the two former continuous examples merged into one (see F-002). All recomputed in Python this session. Spring 2018 Q12 (P_45 - P_65 = 0.014257 - 0.044438 from the ILT; PDF p.16, sha256:12d102c4…) and Fall 2019 Q11 (PDF p.15, sha256:32e26dbc…), re-read this session, are now answerable from the page. Struppeck sha256:8ea3f762…; Slud sha256:dccaca6b….

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: The variance (now in the merged example 'Paid at the Moment of Death, Constant Force') shows the exact value: Var = ²Ā - Ā^2 = 1/6 - 4/49 = 25/294 ≈ 0.0850 (was 0.1667 - 0.0816 = 0.0851). Recomputed in Python this session in closed form and by Simpson quadrature of ∫ μ e^{-(μ+kδ)t} dt for k = 1, 2: Ā = 0.285714, ²Ā = 0.166667, Var = 0.085034. Formulas as in SOA MLC sample solution Q14 (p.10; PDF p.11), sha256:791e13b42b926bfe8abe54f489fa6767aa508c9c0419bfa2340a24e9a2ea37f7.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: Re-read the whole rewritten page against Struppeck ch.3 pp.5-8 sentence by sentence. Recomputed in Python from the ILT values read this session: A_40 = (0.00278 + 0.99722 × 0.16869)/1.06 = 0.161322 (table 0.16132); P_40 = 0.16132/14.8166 = 0.0108878 -> 0.010888 (= Struppeck's appendix answer); ä_40 from A_40 = 0.83868 × 1.06/0.06 = 14.81668 and P = 0.16132/14.8167 = 0.0108877 -> 0.010888; P_45 - P_65 = 0.014257 - 0.044438 (the Spring 2018 Q12 computation the page now supports). Continuous example: Ā = 2/7 = 0.285714, ²Ā = 1/6, Var = 25/294 = 0.085034 by closed form and Simpson quadrature. Links ([[Life Annuity|life-annuity-due]], figure embed) resolve; the figure (generated, k|q_x bars paid at year end) matches the end-of-year model the page now leads with. Exam DISC-IA's [[Whole Life Insurance|Whole Life]] link still lands on this page; the new lead (a life insurance with an unlimited term, paid for by level annual premiums) does not contradict the product sense.
- sources_checked: Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), ch.3 pp.5-8 (whole life = unlimited term; $1 at the end of the year of death; A_x = νq_x + νp_xA_{x+1}; A_x = Σ ν^{n+1} np_x q_{x+n}; premium at the start of each year = life-annuity-due; 1 = dä_x + A_x, ä_x = (1 - A_x)/d; level premium A_x = Pä_x; Ex.3 and Ex.6 second moment at ν^2 / double the force of interest and variance), appendix p.14 (P_40 = 0.010888), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf; CAS Exam MAS-I Tables, Illustrative Life Table: Basic Functions and Single Benefit Premiums at i = 0.06, PDF p.4, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §4.2 p.108 eq.(4.24) (Ā_x = E_x(v^{T-x}) = ∫ v^t μ(x+t) tp_x dt), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf; SOA Exam MLC Sample Solutions (MLC-09-16, 2016), Q2 (p.2; PDF p.3: Ā_x = μ/(μ+δ) under constant force) and Q14 (p.10; PDF p.11: ²Ā = μ/(μ+2δ), Var = ²Ā - Ā²), sha256:791e13b42b926bfe8abe54f489fa6767aa508c9c0419bfa2340a24e9a2ea37f7 — https://www.soa.org/globalassets/assets/files/edu/edu-2014-spring-mlc-sol.pdf; CAS Exam MAS-I Spring 2018, Q12 — official exam paper (scan), PDF p.16, sha256:12d102c422a45e87674b082ad448ac5e25a495115f963d1a9ac63a9f8f028020 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-18.pdf; CAS Exam MAS-I Fall 2019, Q11 — official exam paper (scan), PDF p.15, sha256:32e26dbc1bd463e053ea0f9116473551be6d1b2f35b6d3670a716ecb86a141bd — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-19.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6: Ross A1-A6, Struppeck A5-6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Resolve run: F-001 and F-002 closed. High: everything the page leads with (definition, A_x, recursion, sum, level premium, ä_x relation, variance by doubling the force of interest) is confirmed by the MAS-I reading (Struppeck, rank 2) and the exam's ILT (rank 1); the one-bullet continuous variant and its example rest on Slud and the SOA MLC solutions (rank 3). No open findings.
