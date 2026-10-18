---
target: Concepts/Operational Risk.md
created: 2026-10-18
---

## [F-001] Operational risk is not a Solvency II risk module
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Determining operational risks', last sentence
- claim: Capital regimes charge for it too: ... a module in Solvency II ...
- evidence: Directive 2009/138/EC Art.104(1): the Basic SCR 'shall consist of at least the following risk modules: (a) non-life underwriting risk; (b) life underwriting risk; (c) health underwriting risk; (d) market risk; (e) counterparty default risk.' Art.107(1): 'The capital requirement for operational risk shall reflect operational risks to the extent they are not already reflected in the risk modules referred to in Article 104.' So operational risk carries a capital requirement of its own beside the modules; the Directive does not make it a module. Art.101(4) does list operational risk among the risks the SCR must cover.
- source_rank: 3
- proposed_action: Replace 'a module in Solvency II' with 'a separate capital requirement in Solvency II (Art. 107)'.
- applied: false
- fingerprint: e34680e32547

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: in_review
- checks_run: worked examples recomputed (E[X^2]=312,500; SD 1,118 -> 968, a 13% cut; saving 250k vs cost 200k); classification example read for consistency; Solvency II definition (Art.13(33)) and scope (Art.101(4): includes legal risk, excludes strategic and reputation risk) checked; operational-vs-strategic definition compared with the CAS 2015 Q28 sample answer; links resolve; $$ balance
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B and D tasks, readings, and complete text references (Brehm et al.: tasks D1-D6; Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, and 5 (5.4 only); source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS Exam 7 Spring 2015 — sample answers and examiner's report, Q26 PDF pp.93-95 (efficient frontier on three risk measures; cost of capital plus net cost of reinsurance), Q28 PDF p.97 (operational vs strategic risk; strategic risks), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf; Directive 2009/138/EC (Solvency II), Art.13(33), Art.101(4), Art.104(1), Art.107(1), sha256:cbd309f6304c5234f38013c0d1752bd4fbd3241a18ae22841d4825ddadeeaab6 — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138
- note: Brehm et al. could not be read: the CAS supplies it only in the Exam 9 study kit (outline p.8, source key SK); no authorized free copy was found (web search; Guy Carpenter's ermbook.guycarp.com no longer resolves; the Wayback Machine was unreachable from this session, connection reset). D7 default applies. The Basel definition and seven event types were not read: bis.org returned an HTML page in place of the Sound Practices PDF. The MCT operational risk margin and the NAIC RBC operational risk component were not checked. Also linked from SOA CFE-101, CP-321, GH-101 and INV-201 (in development), whose readings were not read. Solvency II wording: F-001.

## [C-002] Run-id correction for this run's entries
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:56Z/8a71
- date: 2026-10-18
- note: Run-id correction. The entries dated 2026-10-18 that carry run_id 2026-10-18T15:01Z/0103 were written by the Brehm et al. reading packet, run 2026-10-18T14:56Z/8a71, not by the Clark/Bernegger packet that owns 0103. This file has nothing to do with the Clark/Bernegger packet. The run id was read from a scratch file that a concurrent agent overwrote. The entries' content is unchanged; their run summary is .verify/_runs/2026-10-18T14-56Z-8a71.md.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Applied this run: 'a module in Solvency II' now reads 'a separate capital requirement in Solvency II (Art. 107)'. Re-read Directive 2009/138/EC this session: Art.104(1) lists the Basic SCR modules (non-life, life, health underwriting, market, counterparty default) and Art.107(1) sets the operational risk requirement 'to the extent they are not already reflected in the risk modules referred to in Article 104'.

## [F-002] KRI example not in any source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Determining operational risks', KRI examples
- claim: Key risk indicators that give early warning (system downtime, claim-file backlog, staff turnover).
- evidence: BCBS Principles for the Sound Management of Operational Risk (2011) para 39(f), PDF p.20, defines KRIs as metrics monitoring the main drivers of exposure. The CAS Exam 7 Spring 2019 Q1(g) sample answers, PDF p.35, give processing-centre down time and employee turnover as KRIs for operational risks. No source read names claim-file backlog. It was deleted, leaving the two sourced examples.
- source_rank: 1
- proposed_action: Delete 'claim-file backlog'.
- applied: true
- fingerprint: 122e90a134f7

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Deleted 'claim-file backlog' in this run; the bullet now gives the two KRIs the sources name.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: worked examples recomputed before comparing (E[X^2] 312,500; mean 1,000 -> 750; SD 1,118 -> 968, a 13% cut; saving 250 vs cost 200); compound Poisson Var = lambda E[X^2] (LDA Ch.5); Basel definition, legal-in / strategic-and-reputational-out, seven Level 1 event types and their Level 2/3 examples (unauthorised activity, hacking, suitability and aggressive sales, model errors, system failures, outsourcing) diffed against Basel II para 644 and Annex 9; Solvency II Art.13(33) wording; LDA, external data and scenario analysis for heavy-tailed sparse data (AMA guidelines); identification tools and KRIs (BCBS 2011 para 39); SOX s.404; MCT operational risk margin (OSFI MCT ch.7); NAIC RBC Basic Operational Risk; unrewarded nature (AAE 2025 p.7); classification example read against Basel event types and the CAS 2016 Q26 report on separating operational from underwriting risk; links resolve; $$ balance
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B, C and D tasks and readings; complete text references (Brehm et al.: D1-D6, Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, 5.4; source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; Basel Committee on Banking Supervision, Principles for the Sound Management of Operational Risk (BIS, June 2011), para 10 and fn 5 (PDF p.11: definition, includes legal risk, excludes strategic and reputational); para 39(a)-(f) (PDF pp.19-20: loss data, external data, RCSA, business process mapping, KRIs), sha256:d9491f870b4d8ffafa78b45923ada75b3e93223fca2f0ca069e8e3b708a108fc — https://www.bis.org/publications/201106-guidelines-principles-sound-management-operational-risk.pdf; Basel Committee on Banking Supervision, Basel II: International Convergence of Capital Measurement and Capital Standards, Comprehensive Version (BIS, June 2006), para 644 (PDF p.158: definition); Annex 9 Detailed Loss Event Type Classification (PDF pp.319-321: seven Level 1 event types and their Level 2/3 examples), sha256:2543a00c6b6d75bb8208b02d6f823a0661db5a77725786722dfcaef910d00a4d — https://www.bis.org/publications/200606-standards-basel-ii-international-convergence-capital-measurement-and-capital-standards-revised-framework.pdf; Basel Committee on Banking Supervision, Operational Risk - Supervisory Guidelines for the Advanced Measurement Approaches (BIS, June 2011), Modelling section (PDF pp.42-43: loss distribution approach); fn 40 (PDF p.54: heavy-tailed losses, few observations, scenario analysis), sha256:785e1d05030bb5ac8271d5cbcfcd4434ec74757f2dc4bf307816ab82fb3e9a03 — https://www.bis.org/publications/201106-guidelines-operational-risk-supervisory-guidelines-advanced-measurement-approaches.pdf; Directive 2009/138/EC (Solvency II), consolidated HTML, Art.13(30)-(34) definitions (underwriting, market, credit, operational, liquidity risk); Art.45(1) ORSA; Art.101(3) 99.5% one-year VaR; Art.104(1) risk modules; Art.105(2), (5), (6) non-life premium/reserve and catastrophe, market sub-modules, counterparty default (reinsurance, derivatives, receivables from intermediaries); Art.107(1), (3) operational risk capital requirement, sha256:ad77288b3961fb0425f2e8db221ecc9706975bf72c37d7d3adcf8f0df62f702e — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138; OSFI, Minimum Capital Test Guideline (2024), Chapter 7, operational risk margin formula and components (7.2, 7.2.4), sha256:d24a1551e11bac611332379a895a9001c80ce749975b5fe4abfb203170efd5bf — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; NAIC, Insurance Topics: Risk-Based Capital (P/C formula includes catastrophe risk; capital sufficiency ratio to ACL RBC including Basic Operational Risk), read via WebFetch 2026-10-18 (no hash) — https://content.naic.org/insurance-topics/risk-based-capital; Sarbanes-Oxley Act of 2002, Public Law 107-204, Sec.404 Management assessment of internal controls (PDF p.45): annual report of each issuer to assess the internal control structure and procedures for financial reporting, sha256:f6666256313bbaddac941da3f5bda04645e5abaf08a6c53394eef2d26a93a127 — https://www.govinfo.gov/content/pkg/PLAW-107publ204/pdf/PLAW-107publ204.pdf; Actuarial Association of Europe, Actuaries and Operational Risk Management (discussion paper, July 2025 edition), PDF p.7 (insurers' operational risks usually unrewarded; underwriting and investment risks rewarded), p.11 (KRIs, Sarbanes-Oxley, loss data, scenario analysis), p.23 (fraud, IT breakdown, mis-selling scenarios), sha256:5cb06d4d0276a331cf352207597f3e852d33ff4608e47b471d9432dc28a82c2b — https://actuary.eu/wp-content/uploads/2025/07/Actuaries-and-Operational-Risk-Management-2025.pdf; CAS Exam 7 Spring 2012 - exam and sample answers/examiner's report, Q18 PDF pp.78-79 (risk measures for hurricane and price adequacy); Q22 PDF pp.26, 87 (operational risk definition; business disruption, external fraud, execution/delivery in a claims-system project), sha256:e38b20bb58b4c7dbd208b14d350fe3c9c6bc48b789aef61118d8cdae0566582a — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam7_12-7.pdf; CAS Exam 7 Spring 2013 - exam and sample answers/examiner's report, Q15 PDF p.68 (cat models, ESGs, copulas); Q19 PDF pp.75-76 (TVaR, EPD, subadditivity); Q20 PDF pp.77-78 (efficient frontier, cost allocation); Q21 PDF pp.25, 79-80 (Basel II basic indicator and standardized approaches); Q22 PDF pp.26, 81-82 (pricing risk, claim variability, market risk, correlation; inflation raises liabilities and lowers bond values), sha256:b10657555e3da0116f715810c94b20afbcb50b86a4ba6b2fa3b9f771f2ab9d99 — https://www.casact.org/sites/default/files/2021-03/13-7.pdf; CAS Exam 7 Spring 2016 - exam and sample answers/examiner's report, Q21 PDF pp.25, 88-89 (ERM program: monitoring, operational and strategic risk, materiality per 'the Brehm text', upside, dependencies); Q22 PDF pp.90-92 (cycle and asset strategy; reinsurance reduces volatility); Q23 PDF p.92 (capital reference points); Q26 PDF pp.99-100 (operational vs underwriting risk); Q27 PDF pp.101-103 (agency theory, cycle management); Q28 PDF pp.104-105 (soft and technical cycle models), sha256:e07f38dd81edc9715ef2528c1861e75c609c85b598b51b723d665cf63b745b84 — https://www.casact.org/sites/default/files/2021-03/16-7.pdf; CAS Exam 7 Spring 2019 - exam and sample answers/examiner's report, Q1 PDF pp.6, 34-38 (model and estimation risk, estimation risk a subset of model risk; operational risks of a vendor agreement and KRIs: processing-centre down time, employee turnover), sha256:f6c6d52b71498f5c65eae5da824d1f74f31bf531f5059dcc64f0bfcf7c4b8416 — https://www.casact.org/sites/default/files/2021-03/19-7_0.pdf; Frees et al., Loss Data Analytics (open text), Chapter 5 Aggregate Loss Models, compound Poisson: Var(S_N) = lambda E(X^2), sha256:09489050a45e6eb2ee0d96804458eb22c936a61716227e08ad0398b9cba870d4 — https://openacttexts.github.io/Loss-Data-Analytics/ChapAggLossModels.html
- note: D22 (content plan §6): Brehm et al. is study-kit only and was not read; this pass checks each claim against an open source that states the same thing, at D7's medium ceiling, with the Fall 2026 outline as the scope check (the concept sits in a Domain B, C or D task with an assigned reading). CAS Exam 7 2012-2019 examiner's reports on the Brehm-era ERM syllabus are rank 1 corroboration, not the text itself. Edited this run: F-001 applied and resolved; the KRI example (F-002) deleted. 'Classified by cause' is read from the definition itself (loss resulting from inadequate or failed processes, people, systems or external events). The NAIC RBC topic page was read through WebFetch (the site refuses the cache's fetcher), so it carries no hash.
