---
target: Concepts/Risk Modeling.md
created: 2026-10-18
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: in_review
- checks_run: worked examples recomputed (A 16.2/40/104, B 17.2/60/68; dependence TVaR 220 vs 300, capital 100 vs 180, implied correlation 0.44); empirical TVaR estimator checked; 'several metrics rather than one' compared with CAS 2015 Q26 report (the commonest mistake was examining only one risk measure); dependency points compared with 2016 Q21 v sample answers; parameter risk with 2017 Q22; links resolve; $$ balance
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B and D tasks, readings, and complete text references (Brehm et al.: tasks D1-D6; Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, and 5 (5.4 only); source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS Exam 7 Spring 2015 — sample answers and examiner's report, Q26 PDF pp.93-95 (efficient frontier on three risk measures; cost of capital plus net cost of reinsurance), Q28 PDF p.97 (operational vs strategic risk; strategic risks), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf; CAS Exam 7 Spring 2016 — sample answers and examiner's report, Q21 PDF pp.88-89 (ERM program strengths and weaknesses), Q27 PDF p.102 (agency theory, cycle management), Q28 PDF pp.104-105 (soft and technical cycle models), sha256:e07f38dd81edc9715ef2528c1861e75c609c85b598b51b723d665cf63b745b84 — https://www.casact.org/sites/default/files/2021-03/16-7.pdf; CAS Exam 7 Spring 2017 — sample answers and examiner's report, Q22 PDF pp.86-87 (accepted aspects of parameter risk), Q24 PDF pp.93-95 (scenario planning), Q25 PDF p.96 (behavioral cycle models), sha256:c32697af25fff52e2c5e1e49de12dacd66662b78644bbb28fba827da035c03c4 — https://www.casact.org/sites/default/files/2021-01/17-7.PDF
- note: Brehm et al. could not be read: the CAS supplies it only in the Exam 9 study kit (outline p.8, source key SK); no authorized free copy was found (web search; Guy Carpenter's ermbook.guycarp.com no longer resolves; the Wayback Machine was unreachable from this session, connection reset). D7 default applies. Brehm's list of model components and its points on integration and the planning calendar were not read. The exam reports corroborate them only in part. First pass on this page.

## [C-002] Run-id correction for this run's entries
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:56Z/8a71
- date: 2026-10-18
- note: Run-id correction. The entries dated 2026-10-18 that carry run_id 2026-10-18T15:01Z/0103 were written by the Brehm et al. reading packet, run 2026-10-18T14:56Z/8a71, not by the Clark/Bernegger packet that owns 0103. This file has nothing to do with the Clark/Bernegger packet. The run id was read from a scratch file that a concurrent agent overwrote. The entries' content is unchanged; their run summary is .verify/_runs/2026-10-18T14-56Z-8a71.md.

## [F-001] Two Brehm attributions unread
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullets 'Selecting models for diverse risks' and 'The effect on strategic management'
- claim: Parsimony matters: a model management cannot follow will not be used ... Brehm stresses integration - the model should sit in the planning and reinsurance-buying calendar, not be run once for a report.
- evidence: No open source read states either claim. The CAS Exam 7 2017 Q22 report (PDF p.87) supports the rest of the sentence: 'reduce any over-parameterization' is a way to reduce parameter risk. The integration point is Brehm's own, and Brehm is study-kit only (D22). Both were deleted here. The integration claim stays on Enterprise Risk Management, which is in_review for Brehm's implementation issues.
- source_rank: 1
- proposed_action: Delete; restore with the Brehm text in hand.
- applied: true
- fingerprint: 06426a7ca16d

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Both clauses deleted in this run. The integration point remains on Enterprise Risk Management, which is in_review for Brehm's implementation issues.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: worked examples recomputed before comparing (A 16.2 / VaR 40 / TVaR 104, B 17.2 / 60 / 68; dependence: E 120, TVaR 220 vs 300, capital 100 vs 180, 44%, implied correlation 0.44); surplus recursion and empirical TVaR estimator checked algebraically (Hardy p.9: CTE is easy to apply with simulation output); IRM as structural simulation / DFA (CAS ERM PDF p.23); ESG linking inflation and interest rates (CAS ERM p.25; Exam 7 2013 Q15); components and dependencies (2013 Q22 pricing risk, claim variability, market risk, correlation, inflation on liabilities and bonds; 2016 Q21 dependencies, tail correlation; 2013 Q8(h) tail dependence via copulas); parameter risk (2017 Q22); materiality (2016 Q21 report); capital reference points incl. rating level (2016 Q23); efficient frontier and several measures (2015 Q26); links resolve; $$ balance
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B, C and D tasks and readings; complete text references (Brehm et al.: D1-D6, Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, 5.4; source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.109-114 (PDF pp.11-16: definition, four risk types and lists, process steps, treat/exploit: avoid, retain, reduce, transfer, exploit); pp.117-118 (PDF pp.19-20: solvency- and performance-related measures); PDF pp.23, 25 (DFA as structural simulation model; ESG linking interest rates and inflation; natural hedge), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf; Hardy, An Introduction to Risk Measures for Actuarial Applications (SOA/CAS study note C-25-07, 2006), PDF pp.3 (expected value, standard deviation, variance premium principles), 8-11 (quantile, CTE = TVaR = TCE = expected shortfall; probability-mass adjustment; CTE robust to sampling error, easy with simulation), 15-18 (distortion risk measures: g increasing, g(0)=0, g(1)=1; quantile and CTE distortions; PH, dual power, Wang), 20-23 (coherence axioms; quantile not subadditive; SD principle fails monotonicity, variance principle fails subadditivity; semi-variance), sha256:9d0c40a0b4cb1e1e68e68744c096dd36e7422560e9eabe4ee89e539443bcddc7 — https://www.soa.org/globalassets/assets/files/edu/c-25-07.pdf; CAS Exam 7 Spring 2013 - exam and sample answers/examiner's report, Q15 PDF p.68 (cat models, ESGs, copulas); Q19 PDF pp.75-76 (TVaR, EPD, subadditivity); Q20 PDF pp.77-78 (efficient frontier, cost allocation); Q21 PDF pp.25, 79-80 (Basel II basic indicator and standardized approaches); Q22 PDF pp.26, 81-82 (pricing risk, claim variability, market risk, correlation; inflation raises liabilities and lowers bond values), sha256:b10657555e3da0116f715810c94b20afbcb50b86a4ba6b2fa3b9f771f2ab9d99 — https://www.casact.org/sites/default/files/2021-03/13-7.pdf; CAS Exam 7 Spring 2015 - exam and sample answers/examiner's report, Q22 PDF pp.84-85 (key elements of parameter uncertainty); Q26 PDF pp.30, 93-95 (efficient frontier on three risk measures; capital = 1-in-100 TVaR; cost of capital plus net reinsurance cost; report: commonest mistake was examining only one risk measure); Q28 PDF pp.97-98 (operational vs strategic risk; strategic risk types); Q29 PDF p.99 (currency, concentration, catastrophe, liquidity risk), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf; CAS Exam 7 Spring 2016 - exam and sample answers/examiner's report, Q21 PDF pp.25, 88-89 (ERM program: monitoring, operational and strategic risk, materiality per 'the Brehm text', upside, dependencies); Q22 PDF pp.90-92 (cycle and asset strategy; reinsurance reduces volatility); Q23 PDF p.92 (capital reference points); Q26 PDF pp.99-100 (operational vs underwriting risk); Q27 PDF pp.101-103 (agency theory, cycle management); Q28 PDF pp.104-105 (soft and technical cycle models), sha256:e07f38dd81edc9715ef2528c1861e75c609c85b598b51b723d665cf63b745b84 — https://www.casact.org/sites/default/files/2021-03/16-7.pdf; CAS Exam 7 Spring 2017 - sample answers/examiner's report, Q22 PDF pp.86-88 (process vs parameter risk; parameter risk does not diversify; accepted aspects: estimation, projection, event, systematic, model risk; reduce over-parameterization); Q24 PDF pp.93-95 (scenario planning vs unilateral plan); Q25 PDF pp.96-98 (behavioral cycle models), sha256:c32697af25fff52e2c5e1e49de12dacd66662b78644bbb28fba827da035c03c4 — https://www.casact.org/sites/default/files/2021-01/17-7.PDF; CAS Exam 7 Spring 2018 - exam and sample answers/examiner's report, Q1 PDF pp.6, 34-37 (strategic risk types; deficient loss reserves a primary cause of insolvency, impairment causes 'as mentioned in Brehm'; process vs parameter risk); Q20 PDF p.25 (reduce insurance hazard risk by reinsurance; capital set by 1-in-100 TVaR), sha256:b5f6e6454919cfb04da8295ac4a70c89af58e770707daa4faf575bdca8a4fa6b — https://www.casact.org/sites/default/files/2021-03/18-7_0.pdf
- note: D22 (content plan §6): Brehm et al. is study-kit only and was not read; this pass checks each claim against an open source that states the same thing, at D7's medium ceiling, with the Fall 2026 outline as the scope check (the concept sits in a Domain B, C or D task with an assigned reading). CAS Exam 7 2012-2019 examiner's reports on the Brehm-era ERM syllabus are rank 1 corroboration, not the text itself. Edited this run (F-001). 'The cycle moving lines together' is read as an instance of systematic risk acting on many policies (2017 Q22 sample answers).
