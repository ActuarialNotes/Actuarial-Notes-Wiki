---
target: Concepts/Risk Taxonomies.md
created: 2026-10-10
---

## [C-001] Pass incomplete: one attribution unread
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- note: Checked: CAS four types with full lists (CAS-ERM p.111), pure vs speculative, diversifiable/idiosyncratic vs systemic, fundamental vs particular (Saylor s05-04 Tables 1.2-1.3), NAIC P&C RBC charges for asset, credit, reserve and premium risk (Odomirok RBC chapter R0-R5) and catastrophe risk (NAIC RBC topic page), Solvency II module names (Directive 2009/138/EC Art.101(4)). Examples recomputed (19,300 -> 138.9, benefit 51.1; 23,300 -> 152.6). Not verified: the attribution that Brehm et al. use the insurer's version of the four types (insurance hazard for hazard) - Brehm not read. Left in_review.

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: in_review
- checks_run: every definition, list, rule and attribution checked against the sources listed; every worked example recomputed; all [[links]] resolve; U.S. framing reviewed
- sources_checked: CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), p.111 (PDF p.13), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s05-04 Tables 1.2-1.3, sha256:4d894cf157c8f6b7a4c620f551f76e788a2b6fb98bf979d3cbe23c3f32071592 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s05-04-types-of-risks-risk-exposures.html; Odomirok et al., Financial Reporting Through the Lens of a Property/Casualty Actuary v4 (CAS), RBC chapter, PDF pp.230-231 (R0-R5), sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf; NAIC Insurance Topics: Risk-Based Capital (last updated 06/30/2026; 'catastrophe risk is included only in the P/C formula'), read via WebFetch 2026-10-10 (no hash) — https://content.naic.org/insurance-topics/risk-based-capital; Directive 2009/138/EC (Solvency II), Art. 101(3), Art.101(3), sha256:17c8dd8d2f06a8d8881bfd4b031fcf662ff59f68ce5ff43f716451a4a906af94 — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138
- note: Left in_review: Brehm attribution not read (see comment).

## [F-001] Operational risk listed as a Solvency II module
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Frameworks slice it differently'
- claim: Solvency II has modules for non-life underwriting, market, counterparty default and operational risk, among others.
- evidence: Directive 2009/138/EC Art.104(1) names the Basic SCR's risk modules: non-life, life and health underwriting, market and counterparty default risk. Art.107(1) sets a separate capital requirement for operational risk, 'to the extent [operational risks] are not already reflected in the risk modules referred to in Article 104'. Operational risk is therefore not a module. 'and operational risk' was deleted from the list of modules, which is a deletion only.
- source_rank: 3
- proposed_action: Delete operational risk from the list of Solvency II modules.
- applied: true
- fingerprint: 1c22856d2794

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: The sentence now reads 'modules for non-life underwriting, market and counterparty default risk, among others', which is Art.104(1)'s list, in part.

## [C-003] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: in_review
- checks_run: the Brehm attribution (insurer's four categories: insurance hazard, financial, operational, strategic) compared with CAS Exam 7 2016 Q21 (stem and report: an ERM model of 'insurance hazard risk and financial risk' only is incomplete without operational and strategic risk; reserve, underwriting and asset risk are part of insurance or financial risk); Solvency II modules (Art.104(1), 107(1)); examples recomputed (19,300 -> 138.9, benefit 51.1; 23,300 -> 152.6, benefit 37.4); links resolve; $$ balance
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B and D tasks, readings, and complete text references (Brehm et al.: tasks D1-D6; Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, and 5 (5.4 only); source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS Exam 7 Spring 2016 — sample answers and examiner's report, Q21 PDF pp.88-89 (ERM program strengths and weaknesses), Q27 PDF p.102 (agency theory, cycle management), Q28 PDF pp.104-105 (soft and technical cycle models), sha256:e07f38dd81edc9715ef2528c1861e75c609c85b598b51b723d665cf63b745b84 — https://www.casact.org/sites/default/files/2021-03/16-7.pdf; Directive 2009/138/EC (Solvency II), Art.13(33), Art.101(4), Art.104(1), Art.107(1), sha256:cbd309f6304c5234f38013c0d1752bd4fbd3241a18ae22841d4825ddadeeaab6 — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138
- note: Brehm et al. could not be read: the CAS supplies it only in the Exam 9 study kit (outline p.8, source key SK); no authorized free copy was found (web search; Guy Carpenter's ermbook.guycarp.com no longer resolves; the Wayback Machine was unreachable from this session, connection reset). D7 default applies. C-001's open point, the Brehm attribution, is now corroborated by the 2016 Q21 examiner's report (rank 1) but not read in the book. The page is also Exam 9 B1's link target ('risk taxonomies'), and Mildenhall & Major (Wiley 2022, sold) was not read, so the domain-B half is unchecked. The 2026-10-10 checks of the CAS-ERM, Saylor, Odomirok and NAIC content were not repeated this run. Edited this run (F-001).

## [C-004] Run-id correction for this run's entries
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:56Z/8a71
- date: 2026-10-18
- note: Run-id correction. The entries dated 2026-10-18 that carry run_id 2026-10-18T15:01Z/0103 were written by the Brehm et al. reading packet, run 2026-10-18T14:56Z/8a71, not by the Clark/Bernegger packet that owns 0103. This file has nothing to do with the Clark/Bernegger packet. The run id was read from a scratch file that a concurrent agent overwrote. The entries' content is unchanged; their run summary is .verify/_runs/2026-10-18T14-56Z-8a71.md.

## [C-005] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: aggregation example recomputed before comparing (19,300 -> 138.9, benefit 51.1 (27%); 23,300 -> 152.6, benefit 37.4, move 13.7); variance formula; four types and their full lists, 'precise slotting less important' (CAS ERM p.111, re-read this session); insurer categories and Brehm's insurance-hazard version (Exam 7 2016 Q21 stem and report; 2018 Q20 'insurance hazard risk'); market sub-modules, counterparty default and non-life modules (Solvency II Art.104(1), 105(2), (5), (6)); NAIC P&C RBC R0-R5 (Odomirok PDF pp.230-231) and catastrophe charge (NAIC topic page); pure/speculative, diversifiable/systemic, fundamental/particular (Saylor s05-04, re-read); model-selection example against 2013 Q15 (cat models, ESG, copulas), 2013 Q21 (Basel factor approaches for operational risk), AMA scenarios, 2017 Q24 (scenario planning for strategic risk); links resolve; $$ balance
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B, C and D tasks and readings; complete text references (Brehm et al.: D1-D6, Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, 5.4; source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.109-114 (PDF pp.11-16: definition, four risk types and lists, process steps, treat/exploit: avoid, retain, reduce, transfer, exploit); pp.117-118 (PDF pp.19-20: solvency- and performance-related measures); PDF pp.23, 25 (DFA as structural simulation model; ESG linking interest rates and inflation; natural hedge), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s05-04, pure vs speculative, diversifiable/idiosyncratic vs nondiversifiable/systemic, fundamental vs particular risk, sha256:4d894cf157c8f6b7a4c620f551f76e788a2b6fb98bf979d3cbe23c3f32071592 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s05-04-types-of-risks-risk-exposures.html; Odomirok et al., Financial Reporting Through the Lens of a Property/Casualty Actuary v4 (CAS), PDF p.121 (surplus relief: ceded premium lowers premium-to-surplus, IRIS Ratio 2; quota share ceding commission); PDF pp.230-231 (RBC R0-R5), sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf; NAIC, Insurance Topics: Risk-Based Capital (P/C formula includes catastrophe risk; capital sufficiency ratio to ACL RBC including Basic Operational Risk), read via WebFetch 2026-10-18 (no hash) — https://content.naic.org/insurance-topics/risk-based-capital; Directive 2009/138/EC (Solvency II), consolidated HTML, Art.13(30)-(34) definitions (underwriting, market, credit, operational, liquidity risk); Art.45(1) ORSA; Art.101(3) 99.5% one-year VaR; Art.104(1) risk modules; Art.105(2), (5), (6) non-life premium/reserve and catastrophe, market sub-modules, counterparty default (reinsurance, derivatives, receivables from intermediaries); Art.107(1), (3) operational risk capital requirement, sha256:ad77288b3961fb0425f2e8db221ecc9706975bf72c37d7d3adcf8f0df62f702e — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138; CAS Exam 7 Spring 2013 - exam and sample answers/examiner's report, Q15 PDF p.68 (cat models, ESGs, copulas); Q19 PDF pp.75-76 (TVaR, EPD, subadditivity); Q20 PDF pp.77-78 (efficient frontier, cost allocation); Q21 PDF pp.25, 79-80 (Basel II basic indicator and standardized approaches); Q22 PDF pp.26, 81-82 (pricing risk, claim variability, market risk, correlation; inflation raises liabilities and lowers bond values), sha256:b10657555e3da0116f715810c94b20afbcb50b86a4ba6b2fa3b9f771f2ab9d99 — https://www.casact.org/sites/default/files/2021-03/13-7.pdf; CAS Exam 7 Spring 2016 - exam and sample answers/examiner's report, Q21 PDF pp.25, 88-89 (ERM program: monitoring, operational and strategic risk, materiality per 'the Brehm text', upside, dependencies); Q22 PDF pp.90-92 (cycle and asset strategy; reinsurance reduces volatility); Q23 PDF p.92 (capital reference points); Q26 PDF pp.99-100 (operational vs underwriting risk); Q27 PDF pp.101-103 (agency theory, cycle management); Q28 PDF pp.104-105 (soft and technical cycle models), sha256:e07f38dd81edc9715ef2528c1861e75c609c85b598b51b723d665cf63b745b84 — https://www.casact.org/sites/default/files/2021-03/16-7.pdf; CAS Exam 7 Spring 2017 - sample answers/examiner's report, Q22 PDF pp.86-88 (process vs parameter risk; parameter risk does not diversify; accepted aspects: estimation, projection, event, systematic, model risk; reduce over-parameterization); Q24 PDF pp.93-95 (scenario planning vs unilateral plan); Q25 PDF pp.96-98 (behavioral cycle models), sha256:c32697af25fff52e2c5e1e49de12dacd66662b78644bbb28fba827da035c03c4 — https://www.casact.org/sites/default/files/2021-01/17-7.PDF; CAS Exam 7 Spring 2018 - exam and sample answers/examiner's report, Q1 PDF pp.6, 34-37 (strategic risk types; deficient loss reserves a primary cause of insolvency, impairment causes 'as mentioned in Brehm'; process vs parameter risk); Q20 PDF p.25 (reduce insurance hazard risk by reinsurance; capital set by 1-in-100 TVaR), sha256:b5f6e6454919cfb04da8295ac4a70c89af58e770707daa4faf575bdca8a4fa6b — https://www.casact.org/sites/default/files/2021-03/18-7_0.pdf; Basel Committee on Banking Supervision, Operational Risk - Supervisory Guidelines for the Advanced Measurement Approaches (BIS, June 2011), Modelling section (PDF pp.42-43: loss distribution approach); fn 40 (PDF p.54: heavy-tailed losses, few observations, scenario analysis), sha256:785e1d05030bb5ac8271d5cbcfcd4434ec74757f2dc4bf307816ab82fb3e9a03 — https://www.bis.org/publications/201106-guidelines-operational-risk-supervisory-guidelines-advanced-measurement-approaches.pdf; Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt (publisher's free sample), pp.1-6 (risk margin to afford capital a return; capital vs pricing risk measures; VaR or TVaR at 99.5%; Artzner et al. 1999; SRMs as distortions; SRM calibrated to cat bond pricing; Constant Cost of Capital SRM), sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf
- note: D22 (content plan §6): Brehm et al. is study-kit only and was not read; this pass checks each claim against an open source that states the same thing, at D7's medium ceiling, with the Fall 2026 outline as the scope check (the concept sits in a Domain B, C or D task with an assigned reading). CAS Exam 7 2012-2019 examiner's reports on the Brehm-era ERM syllabus are rank 1 corroboration, not the text itself. The domain-B half (B1: risk taxonomies in Mildenhall & Major) is checked against the open sources above. The book's own taxonomy chapter was not read; Ch.1 p.2 says the book emphasises insurance risk and leaves out credit and operational risk.
