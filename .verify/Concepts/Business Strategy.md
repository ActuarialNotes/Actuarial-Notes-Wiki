---
target: Concepts/Business Strategy.md
created: 2026-10-10
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: in_review
- checks_run: DISC-RM bullet (strategic management process; corporate strategy = which businesses, business strategy = how each competes, cost leadership or differentiation) checked against PoM §5.2 and MSM §5.1. Recomputed the EVA example (RAROC 15.0/18.0/17.3%; EVA 12/15/16).
- note: Left in_review: most of the page is Exam 9 ERM content (RAROC, EVA, efficient frontier, risk-measure choice) whose syllabus source, Brehm et al., Enterprise Risk Analysis, is a sold book not read this run; the PCPA bullet's GLM-monograph claim was not re-read. For the lead: DISC-RM 15.3 is 'Determining Strategy at Different Organizational Levels' and the page covers only corporate and business level; no source read this run names a third (functional) level, so no omission finding was filed. Sources read: Carpenter, Bauer & Erdogan, Principles of Management v1.1 (Saylor, CC BY-NC-SA), §5.2 'Strategic Management in the P-O-L-C Framework': formulation and implementation, corporate vs business strategy, SWOT and SO/ST/WO/WT, value chain, VRIO, PESTEL, sha256:f8b7b28801d9bdb61effb2c7e7ed4269d9bf3831502508d2ddfb0688bcda5890 — https://saylordotorg.github.io/text_principles-of-management-v1.1/s09-02-strategic-management-in-the-p-.html; Mastering Strategic Management (Saylor), §5.1 generic strategies, sha256:b1d6cffee58ce0f293707e6d2918e12f550d6f19eca0aeb3a03eabc13b1f2b5a — https://saylordotorg.github.io/text_mastering-strategic-management/s09-01-understanding-business-level-s.html

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: in_review
- checks_run: EVA example recomputed (RAROC 15.0/18.0/17.3%; EVA 12/15/16; capital released 100); efficient-frontier bullet compared with CAS 2013 Q20(b) and 2015 Q26(a) sample answers; PCPA bullet's GLM-monograph claim checked (§3.2, PDF p.42: 'One of the most common reasons for a project failing or falling significantly behind schedule is lack of alignment on the goals and outcomes of the project among its key stakeholders'); links resolve; $$ balance
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B and D tasks, readings, and complete text references (Brehm et al.: tasks D1-D6; Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, and 5 (5.4 only); source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS Exam 7 Spring 2013 — sample answers and examiner's report, Q20 part b, PDF pp.77-78 (efficient frontier graph; cost allocation method), sha256:b10657555e3da0116f715810c94b20afbcb50b86a4ba6b2fa3b9f771f2ab9d99 — https://www.casact.org/sites/default/files/2021-03/13-7.pdf; CAS Exam 7 Spring 2015 — sample answers and examiner's report, Q26 PDF pp.93-95 (efficient frontier on three risk measures; cost of capital plus net cost of reinsurance), Q28 PDF p.97 (operational vs strategic risk; strategic risks), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating (CAS Monograph 5, 2nd ed. 2020), §3.1-3.2, PDF pp.41-42, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Brehm et al. could not be read: the CAS supplies it only in the Exam 9 study kit (outline p.8, source key SK); no authorized free copy was found (web search; Guy Carpenter's ermbook.guycarp.com no longer resolves; the Wayback Machine was unreachable from this session, connection reset). D7 default applies. Most of the page is Exam 9 D4 content (RAROC, EVA, measure choice) whose reading is Brehm, so it stays in_review as in C-001. The GLM claim C-001 left unread is now confirmed. The rest of the PCPA bullet (target, unit, success metric, reporting as business outcomes) was not traced. DISC-RM half as in C-001 (not re-read). Also linked from SOA CFE-101/201 and CP-311 (in development).

## [C-003] Run-id correction for this run's entries
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:56Z/8a71
- date: 2026-10-18
- note: Run-id correction. The entries dated 2026-10-18 that carry run_id 2026-10-18T15:01Z/0103 were written by the Brehm et al. reading packet, run 2026-10-18T14:56Z/8a71, not by the Clark/Bernegger packet that owns 0103. This file has nothing to do with the Clark/Bernegger packet. The run id was read from a scratch file that a concurrent agent overwrote. The entries' content is unchanged; their run summary is .verify/_runs/2026-10-18T14-56Z-8a71.md.

## [F-001] PCPA bullet says more than the GLM monograph
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Business goals in a model (PCPA)'
- claim: The goal sets the target (loss cost, retention, litigation), the unit of analysis and the success metric. ... Results are reported as business outcomes, such as premium movements, expected loss ratio and retention.
- evidence: Goldburd et al. (CAS Monograph 5, 2020) §3.1, PDF p.41, gives the goals of an analysis as a rating plan, underwriting criteria or the probability of a customer renewing. §5.1, PDF p.53, ties the target variable to the goal. Neither section names litigation as a target, the unit of analysis, a success metric, or reporting in premium-movement, loss-ratio and retention terms. Deleted down to 'The goal sets the target (loss cost, retention).' The monograph's stakeholder-alignment sentence (§3.2, p.42) stays; it was confirmed.
- source_rank: 3
- proposed_action: Delete the unsourced parts.
- applied: true
- fingerprint: b3a0ad1400be

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Trimmed in this run to 'The goal sets the target (loss cost, retention).' The unsourced reporting sentence is deleted.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: EVA example recomputed (RAROC 15.0/18.0/17.3%; EVA 12/15/16; capital released 100); RAROC and EVA definitions and the hurdle test against Exam 9 2013 Q15 sample answers; risk capital from a tail measure (Exam 7 2018 Q20 and 2015 Q26: capital = 1-in-100 TVaR); efficient frontier and choice within appetite (2013 Q20(b), 2015 Q26(a)); measure choice changes the answer (2015 Q26 report); strategic risk category (2015 Q28); DISC-RM bullet re-read against PoM 5.2 (vision, mission, formulation, implementation, SWOT, corporate vs business strategy) and MSM 5.1 (cost leadership, differentiation); PCPA bullet and second example against GLM monograph pp.41-42, 53, 88-91; links resolve; $$ balance
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B, C and D tasks and readings; complete text references (Brehm et al.: D1-D6, Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, 5.4; source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS Exam 9 Spring 2013 - exam and sample answers/examiner's report, Q15 PDF pp.49, 97 (RAROC and EVA: profit over capital, profit less cost of capital; choose higher EVA when capital constrained); Q24-25 PDF pp.26, 74-75 (ROE decomposition with premium-to-surplus and reserves-to-surplus leverage; leverage raises expected return and volatility), sha256:8cad072030f7457e0220739fd8af1f74ce23873efd78efdd1d99021816131e75 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam9_13-9.pdf; CAS Exam 7 Spring 2013 - exam and sample answers/examiner's report, Q15 PDF p.68 (cat models, ESGs, copulas); Q19 PDF pp.75-76 (TVaR, EPD, subadditivity); Q20 PDF pp.77-78 (efficient frontier, cost allocation); Q21 PDF pp.25, 79-80 (Basel II basic indicator and standardized approaches); Q22 PDF pp.26, 81-82 (pricing risk, claim variability, market risk, correlation; inflation raises liabilities and lowers bond values), sha256:b10657555e3da0116f715810c94b20afbcb50b86a4ba6b2fa3b9f771f2ab9d99 — https://www.casact.org/sites/default/files/2021-03/13-7.pdf; CAS Exam 7 Spring 2015 - exam and sample answers/examiner's report, Q22 PDF pp.84-85 (key elements of parameter uncertainty); Q26 PDF pp.30, 93-95 (efficient frontier on three risk measures; capital = 1-in-100 TVaR; cost of capital plus net reinsurance cost; report: commonest mistake was examining only one risk measure); Q28 PDF pp.97-98 (operational vs strategic risk; strategic risk types); Q29 PDF p.99 (currency, concentration, catastrophe, liquidity risk), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf; CAS Exam 7 Spring 2018 - exam and sample answers/examiner's report, Q1 PDF pp.6, 34-37 (strategic risk types; deficient loss reserves a primary cause of insolvency, impairment causes 'as mentioned in Brehm'; process vs parameter risk); Q20 PDF p.25 (reduce insurance hazard risk by reinsurance; capital set by 1-in-100 TVaR), sha256:b5f6e6454919cfb04da8295ac4a70c89af58e770707daa4faf575bdca8a4fa6b — https://www.casact.org/sites/default/files/2021-03/18-7_0.pdf; CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.109-114 (PDF pp.11-16: definition, four risk types and lists, process steps, treat/exploit: avoid, retain, reduce, transfer, exploit); pp.117-118 (PDF pp.19-20: solvency- and performance-related measures); PDF pp.23, 25 (DFA as structural simulation model; ESG linking interest rates and inflation; natural hedge), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf; Carpenter, Bauer & Erdogan, Principles of Management v1.1 (Saylor, CC BY-NC-SA), Sec.5.2, strategic management process: vision and mission, formulation and implementation; corporate vs business strategy; SWOT, sha256:f8b7b28801d9bdb61effb2c7e7ed4269d9bf3831502508d2ddfb0688bcda5890 — https://saylordotorg.github.io/text_principles-of-management-v1.1/s09-02-strategic-management-in-the-p-.html; Mastering Strategic Management (Saylor), Sec.5.1, generic business-level strategies: cost leadership, differentiation, sha256:b1d6cffee58ce0f293707e6d2918e12f550d6f19eca0aeb3a03eabc13b1f2b5a — https://saylordotorg.github.io/text_mastering-strategic-management/s09-01-understanding-business-level-s.html; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating (CAS Monograph 5, 2nd ed. 2020), PDF pp.41-42 (goals: rating plan, underwriting criteria, renewal probability; stakeholder alignment), p.53 (target variable by goal: pure premium, loss ratio, probability of a large loss), pp.88-91 (quantile plots, double lift, loss ratio charts, Lorenz curve), pp.27-29 (offsets), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: D22 (content plan §6): Brehm et al. is study-kit only and was not read; this pass checks each claim against an open source that states the same thing, at D7's medium ceiling, with the Fall 2026 outline as the scope check (the concept sits in a Domain B, C or D task with an assigned reading). CAS Exam 7 2012-2019 examiner's reports on the Brehm-era ERM syllabus are rank 1 corroboration, not the text itself. Edited this run (F-001: PCPA bullet trimmed to what the monograph says). That RAROC and EVA can rank options differently is shown by the page's own example (rank 5).
