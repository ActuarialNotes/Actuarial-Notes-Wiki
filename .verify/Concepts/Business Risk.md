---
target: Concepts/Business Risk.md
created: 2026-10-18
---

## [F-001] Missing the reading's strategic-risk material that the exams test
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: whole page (Exam 9 D2 links 'strategic risks' here)
- claim: The page's narrow sense of business risk lists competition, demand, the underwriting cycle, regulation, reputation, technology and the wrong plan. It does not cover the Brehm strategic-risk material the CAS examines.
- evidence: Official Exam 7 sample answers and examiner's reports on the Brehm reading test material the page never mentions. Strategic risk types (industry, competitor, stagnation, brand): 2015 Q28(b), PDF p.97. Agency theory and cycle management (intellectual property, underwriter incentives, owner education, avoiding market overreaction, scenario planning): 2016 Q27, PDF p.102. Soft approaches to modeling the underwriting cycle (the Delphi method, competitor analysis) and technical ones (AR(n) time series): 2016 Q28, PDF pp.104-105. Behavioral and econometric approaches: 2017 Q25, PDF p.96. Scenario planning versus a unilateral plan: 2017 Q24, PDF pp.93-95. The 2016 Q28 report speaks of 'the three soft approaches presented in the text'. The verified Underwriting Cycle page covers the cycle itself but not these models or management practices either. A D2 candidate reading the linked page would miss a topic that has been examined at least five times.
- source_rank: 1
- proposed_action: A writer, working from the Brehm study-kit text, adds a section on Brehm's strategic risk: the risk types, the underwriting cycle as a strategic risk, its soft, technical and behavioral modeling approaches, cycle management, agency theory and scenario planning. Alternatively, write separate concept pages and link them from here and from the Exam 9 D2 objective. Then a different checker verifies it.
- applied: false
- fingerprint: e712bff66eaa

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: in_review
- checks_run: worked examples recomputed (sigma_ROE 10%/12%, sigma_ROA needed 2.5%, new equity 60M); links resolve; $$ balance; coverage compared with CAS Exam 7 2015-2017 examiner's reports on Brehm's strategic-risk material
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B and D tasks, readings, and complete text references (Brehm et al.: tasks D1-D6; Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, and 5 (5.4 only); source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS Exam 7 Spring 2015 — sample answers and examiner's report, Q26 PDF pp.93-95 (efficient frontier on three risk measures; cost of capital plus net cost of reinsurance), Q28 PDF p.97 (operational vs strategic risk; strategic risks), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf; CAS Exam 7 Spring 2016 — sample answers and examiner's report, Q21 PDF pp.88-89 (ERM program strengths and weaknesses), Q27 PDF p.102 (agency theory, cycle management), Q28 PDF pp.104-105 (soft and technical cycle models), sha256:e07f38dd81edc9715ef2528c1861e75c609c85b598b51b723d665cf63b745b84 — https://www.casact.org/sites/default/files/2021-03/16-7.pdf; CAS Exam 7 Spring 2017 — sample answers and examiner's report, Q22 PDF pp.86-87 (accepted aspects of parameter risk), Q24 PDF pp.93-95 (scenario planning), Q25 PDF p.96 (behavioral cycle models), sha256:c32697af25fff52e2c5e1e49de12dacd66662b78644bbb28fba827da035c03c4 — https://www.casact.org/sites/default/files/2021-01/17-7.PDF
- note: Brehm et al. could not be read: the CAS supplies it only in the Exam 9 study kit (outline p.8, source key SK); no authorized free copy was found (web search; Guy Carpenter's ermbook.guycarp.com no longer resolves; the Wayback Machine was unreachable from this session, connection reset). D7 default applies. The ROE = ROA x A/E decomposition and the broad/narrow senses could not be traced to the reading. The omission is F-001. Also linked from SOA CFE-201 (in development), whose reading was not read.

## [C-002] Run-id correction for this run's entries
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:56Z/8a71
- date: 2026-10-18
- note: Run-id correction. The entries dated 2026-10-18 that carry run_id 2026-10-18T15:01Z/0103 were written by the Brehm et al. reading packet, run 2026-10-18T14:56Z/8a71, not by the Clark/Bernegger packet that owns 0103. This file has nothing to do with the Clark/Bernegger packet. The run id was read from a scratch file that a concurrent agent overwrote. The entries' content is unchanged; their run summary is .verify/_runs/2026-10-18T14-56Z-8a71.md.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: worked examples recomputed (sigma_ROE 10.0% -> 12.0%; sigma_ROA needed 2.5%; new equity 60M; A/E 3.33); ROE = ROA x A/E checked as an identity; business vs financial risk (Teall ch.8: business risk independent of financing, leverage magnifies ROE variability); insurer leverage through reserves and premium (Exam 9 2013 Q25: R/S leverage raises expected return and volatility; Odomirok p.121: premium-to-surplus is IRIS Ratio 2); 'overall risk a business faces' (outline Domain D); strategic-risk list (CAS ERM p.111; Exam 7 2015 Q28 industry and competitor risk, cycle volatility, predatory pricing); rewarded vs unrewarded risk (AAE p.7; CAS ERM exploit); reinsurance creates counterparty exposure (Solvency II Art.105(6)); soft-market example read against 2014 Q25(b), 2016 Q22 and Q27(c), 2017 Q24; links resolve; $$ balance
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B, C and D tasks and readings; complete text references (Brehm et al.: D1-D6, Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, 5.4; source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; Teall, Chapter 8 Leverage (Cornell course notes), PDF pp.1-2 (business risk from operating, independent of financing; financial risk from borrowing; leverage magnifies ROE variability), sha256:4aed4d4d3f23e66f1d14076055f2976f33d33dafd79d6ac9a715163688a2df96 — https://courses.cit.cornell.edu/jteall/000308.pdf; CAS Exam 9 Spring 2013 - exam and sample answers/examiner's report, Q15 PDF pp.49, 97 (RAROC and EVA: profit over capital, profit less cost of capital; choose higher EVA when capital constrained); Q24-25 PDF pp.26, 74-75 (ROE decomposition with premium-to-surplus and reserves-to-surplus leverage; leverage raises expected return and volatility), sha256:8cad072030f7457e0220739fd8af1f74ce23873efd78efdd1d99021816131e75 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam9_13-9.pdf; Odomirok et al., Financial Reporting Through the Lens of a Property/Casualty Actuary v4 (CAS), PDF p.121 (surplus relief: ceded premium lowers premium-to-surplus, IRIS Ratio 2; quota share ceding commission); PDF pp.230-231 (RBC R0-R5), sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf; CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.109-114 (PDF pp.11-16: definition, four risk types and lists, process steps, treat/exploit: avoid, retain, reduce, transfer, exploit); pp.117-118 (PDF pp.19-20: solvency- and performance-related measures); PDF pp.23, 25 (DFA as structural simulation model; ESG linking interest rates and inflation; natural hedge), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf; Actuarial Association of Europe, Actuaries and Operational Risk Management (discussion paper, July 2025 edition), PDF p.7 (insurers' operational risks usually unrewarded; underwriting and investment risks rewarded), p.11 (KRIs, Sarbanes-Oxley, loss data, scenario analysis), p.23 (fraud, IT breakdown, mis-selling scenarios), sha256:5cb06d4d0276a331cf352207597f3e852d33ff4608e47b471d9432dc28a82c2b — https://actuary.eu/wp-content/uploads/2025/07/Actuaries-and-Operational-Risk-Management-2025.pdf; Directive 2009/138/EC (Solvency II), consolidated HTML, Art.13(30)-(34) definitions (underwriting, market, credit, operational, liquidity risk); Art.45(1) ORSA; Art.101(3) 99.5% one-year VaR; Art.104(1) risk modules; Art.105(2), (5), (6) non-life premium/reserve and catastrophe, market sub-modules, counterparty default (reinsurance, derivatives, receivables from intermediaries); Art.107(1), (3) operational risk capital requirement, sha256:ad77288b3961fb0425f2e8db221ecc9706975bf72c37d7d3adcf8f0df62f702e — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138; CAS Exam 7 Spring 2014 - sample answers/examiner's report, Q25 PDF pp.95-96 (bridging model as operational risk; cycle management: intellectual property, underwriter incentives, owner education), sha256:2caeacb1b71970f0958ebaf5a56fb6a822eaa9d16d6d738888a310d19c1339ae — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam7_14-7.pdf; CAS Exam 7 Spring 2015 - exam and sample answers/examiner's report, Q22 PDF pp.84-85 (key elements of parameter uncertainty); Q26 PDF pp.30, 93-95 (efficient frontier on three risk measures; capital = 1-in-100 TVaR; cost of capital plus net reinsurance cost; report: commonest mistake was examining only one risk measure); Q28 PDF pp.97-98 (operational vs strategic risk; strategic risk types); Q29 PDF p.99 (currency, concentration, catastrophe, liquidity risk), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf; CAS Exam 7 Spring 2016 - exam and sample answers/examiner's report, Q21 PDF pp.25, 88-89 (ERM program: monitoring, operational and strategic risk, materiality per 'the Brehm text', upside, dependencies); Q22 PDF pp.90-92 (cycle and asset strategy; reinsurance reduces volatility); Q23 PDF p.92 (capital reference points); Q26 PDF pp.99-100 (operational vs underwriting risk); Q27 PDF pp.101-103 (agency theory, cycle management); Q28 PDF pp.104-105 (soft and technical cycle models), sha256:e07f38dd81edc9715ef2528c1861e75c609c85b598b51b723d665cf63b745b84 — https://www.casact.org/sites/default/files/2021-03/16-7.pdf; CAS Exam 7 Spring 2017 - sample answers/examiner's report, Q22 PDF pp.86-88 (process vs parameter risk; parameter risk does not diversify; accepted aspects: estimation, projection, event, systematic, model risk; reduce over-parameterization); Q24 PDF pp.93-95 (scenario planning vs unilateral plan); Q25 PDF pp.96-98 (behavioral cycle models), sha256:c32697af25fff52e2c5e1e49de12dacd66662b78644bbb28fba827da035c03c4 — https://www.casact.org/sites/default/files/2021-01/17-7.PDF; CAS Exam 7 Spring 2018 - exam and sample answers/examiner's report, Q1 PDF pp.6, 34-37 (strategic risk types; deficient loss reserves a primary cause of insolvency, impairment causes 'as mentioned in Brehm'; process vs parameter risk); Q20 PDF p.25 (reduce insurance hazard risk by reinsurance; capital set by 1-in-100 TVaR), sha256:b5f6e6454919cfb04da8295ac4a70c89af58e770707daa4faf575bdca8a4fa6b — https://www.casact.org/sites/default/files/2021-03/18-7_0.pdf
- note: D22 (content plan §6): Brehm et al. is study-kit only and was not read; this pass checks each claim against an open source that states the same thing, at D7's medium ceiling, with the Fall 2026 outline as the scope check (the concept sits in a Domain B, C or D task with an assigned reading). CAS Exam 7 2012-2019 examiner's reports on the Brehm-era ERM syllabus are rank 1 corroboration, not the text itself. F-001 (minor) stays open: the page still lacks the strategic-risk material the CAS examines on Brehm (strategic risk types, cycle models, cycle management, agency theory, scenario planning); the 2018 Q1(a) stem (project risk as a type of strategic risk) is one more instance. Writing it is a writer's job. The claims the page does make are all sourced, so the open omission does not hold the status.

## [F-002] Supply contraction on capital loss attributed to Feldblum, who does not say it
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T14:07Z/1623
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'The underwriting cycle as a strategic risk', lead paragraph
- claim: Feldblum: since capacity is limited only by financial and psychological constraints, supply expands quickly when profits look good and contracts when capital is lost.
- evidence: Feldblum PCAS 2001 PDF pp.7-8 (printed 181-182), 'Underwriting Philosophy': 'Since capacity is limited only by financial and psychological constraints, not by physical plant and equipment, supply expands.' The downturn there is pessimism and re-underwriting ('Underwriters become pessimistic, curtail their acceptance of marginal applicants'), not capital loss; a full-text search of the paper finds no capital-contraction argument. The capital-shock mechanism is in the 2019 Exam 7 Q21(b) sample answers (PDF p.93), which the page already teaches under 'How the components link'.
- source_rank: 2
- proposed_action: Delete 'and contracts when capital is lost' from the Feldblum sentence.
- applied: true
- fingerprint: 971706a7cb1b

## [F-003] General factor model glossed beyond what the equation or any source says
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T14:07Z/1623
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'Modelling the cycle', general factor model sentence and the bullet under its equation
- claim: X_t 'adjusts toward the factor's previous value'; c is 'how fast the combined ratio closes the gap'; the disturbances are 'independent'.
- evidence: The only readable source is the 2016 Exam 7 Q28(b) sample answer 2 (PDF p.104): Z_t = a + b Z_{t-1} + sigma eps; X_t = d + d x (Z_{t-1} - X_{t-1}) + tau delta, with no interpretation; the report (p.105) accepts notation from outside readings 'similarly for the second equation'. As written, X_t = d + c(Z_{t-1} - X_{t-1}) is a level driven by the lagged gap, not a partial-adjustment X_t - X_{t-1} = c(...), so 'closes the gap' at speed c is not what the equation says; independence of the two disturbances is stated nowhere. Brehm is study-kit only (D22). Judgment on the writer's c: the report's 'd + d x' gives one letter to two parameters (constant and coefficient), a slip; a distinct letter is needed, the report accepts notation variants for this equation, so c is kept.
- source_rank: 1
- proposed_action: Restate to what the equation shows: X_t 'depends on its gap from the factor's previous value'; c 'how strongly the combined ratio responds to that gap'; drop 'independent'.
- applied: true
- fingerprint: 49f6d86a96af

## [F-004] 'three halves of the problem'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T14:07Z/1623
- date: 2026-10-31
- severity: nit
- status: open
- locus: 'The underwriting cycle as a strategic risk', lead paragraph
- claim: Managing the cycle, modelling it and planning around it are the three halves of the problem.
- evidence: Three items cannot be halves; typo.
- source_rank: 5
- proposed_action: 'three parts'.
- applied: true
- fingerprint: 24633cdfc9ac

## [F-005] Anderson & Formisano's words quoted without naming them
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T14:07Z/1623
- date: 2026-10-31
- severity: nit
- status: open
- locus: 'Managing the cycle', naive-strategy bullet
- claim: rapid growth "can realistically only be accomplished by pricing below cost" — he cites Best's finding
- evidence: Feldblum PCAS 2001 PDF p.34, footnote 42: the quotation is Anderson and Formisano's (p.460), which Feldblum quotes; Best's 81% follows it. The page's wording reads as Feldblum's own.
- source_rank: 2
- proposed_action: Writer: name Anderson and Formisano as the quoted authors.
- applied: false
- fingerprint: 2221339aaaa6

## [F-006] Residue of F-001: Delphi method, AR(n) model and strategic-risk types still missing
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T14:07Z/1623
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'Modelling the cycle' and the narrow-sense bullet
- claim: The new section names two soft approaches (competitor analysis, scenario testing) and one technical model (general factor); the narrow-sense list does not name industry or stagnation risk.
- evidence: CAS Exam 7 2016 Q28 report PDF p.105: candidates were expected to know 'one of the three soft approaches presented in the text' (most chose the Delphi method, sample answer 1 p.104: expert questionnaire, aggregated responses, iterate to consensus) and 'one of the three technical approaches' (sample answer 1: AR(n) on the industry combined ratio, n = 2 or 3). 2015 Q28(b) PDF p.97: strategic risk types industry (capital intensiveness, overcapacity, commoditization, deregulation, cycle volatility), competitor, stagnation, brand.
- source_rank: 1
- proposed_action: Writer: add the Delphi method and the AR(n) model to 'Modelling the cycle', and the strategic-risk types (industry, competitor, stagnation, brand) to the narrow-sense bullet, from the reports above or an open text; then a different checker.
- applied: false
- fingerprint: f088dda3691e

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T14:07Z/1623
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Answered by the new section 'The underwriting cycle as a strategic risk' (checked this run against the 2014, 2016-2019 Exam 7 reports, Feldblum, OpenStax and MSRB): the cycle as a strategic risk, soft, technical and behavioral modelling, cycle management (IP, underwriter incentives, owner education, market overreaction, investment strategy), agency theory and scenario planning. The remaining gaps (Delphi, AR(n), strategic-risk types) are carried forward as a new, narrower finding this run.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T14:07Z/1623
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole page re-read; every new claim traced to an Exam 7 report or open text; Feldblum full-text search for each attributed phrase; bridging example recomputed (0.64x1.05^2/(1.03x1.02)=67.2%, 0.70 -> 73.5%, +6.3 pts); leverage example recomputed (10%, 12%, 2.5%, $60M, A/E 3.33); rule 10: no question's numbers or setup on the page; links resolve; $$ balance
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B, C and D tasks and readings; complete text references (Brehm et al.: D1-D6, Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, 5.4; source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; Teall, Chapter 8 Leverage (Cornell course notes), PDF pp.1-2 (business risk from operating, independent of financing; financial risk from borrowing; leverage magnifies ROE variability), sha256:4aed4d4d3f23e66f1d14076055f2976f33d33dafd79d6ac9a715163688a2df96 — https://courses.cit.cornell.edu/jteall/000308.pdf; CAS Exam 9 Spring 2013 - exam and sample answers/examiner's report, Q15 PDF pp.49, 97 (RAROC and EVA: profit over capital, profit less cost of capital; choose higher EVA when capital constrained); Q24-25 PDF pp.26, 74-75 (ROE decomposition with premium-to-surplus and reserves-to-surplus leverage; leverage raises expected return and volatility), sha256:8cad072030f7457e0220739fd8af1f74ce23873efd78efdd1d99021816131e75 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam9_13-9.pdf; Odomirok et al., Financial Reporting Through the Lens of a Property/Casualty Actuary v4 (CAS), PDF p.121 (surplus relief: ceded premium lowers premium-to-surplus, IRIS Ratio 2; quota share ceding commission); PDF pp.230-231 (RBC R0-R5), sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf; CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.109-114 (PDF pp.11-16: definition, four risk types and lists, process steps, treat/exploit: avoid, retain, reduce, transfer, exploit); pp.117-118 (PDF pp.19-20: solvency- and performance-related measures); PDF pp.23, 25 (DFA as structural simulation model; ESG linking interest rates and inflation; natural hedge), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf; Actuarial Association of Europe, Actuaries and Operational Risk Management (discussion paper, July 2025 edition), PDF p.7 (insurers' operational risks usually unrewarded; underwriting and investment risks rewarded), p.11 (KRIs, Sarbanes-Oxley, loss data, scenario analysis), p.23 (fraud, IT breakdown, mis-selling scenarios), sha256:5cb06d4d0276a331cf352207597f3e852d33ff4608e47b471d9432dc28a82c2b — https://actuary.eu/wp-content/uploads/2025/07/Actuaries-and-Operational-Risk-Management-2025.pdf; Directive 2009/138/EC (Solvency II), consolidated HTML, Art.13(30)-(34) definitions (underwriting, market, credit, operational, liquidity risk); Art.45(1) ORSA; Art.101(3) 99.5% one-year VaR; Art.104(1) risk modules; Art.105(2), (5), (6) non-life premium/reserve and catastrophe, market sub-modules, counterparty default (reinsurance, derivatives, receivables from intermediaries); Art.107(1), (3) operational risk capital requirement, sha256:ad77288b3961fb0425f2e8db221ecc9706975bf72c37d7d3adcf8f0df62f702e — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138; Feldblum, Underwriting Cycles and Business Strategies, PCAS LXXXVIII (2001), PDF pp.7-8 (capacity limited only by financial and psychological constraints; supply expands), 34-35 (Anderson & Formisano and Best's 81% quoted; following rates downward is no remedy; prices cascade below marginal cost), sha256:02e494fce1810157e17d5f634338c6f803d29536b990661173966bd38c90faa1 — https://www.casact.org/sites/default/files/database/proceed_proceed01_01175.pdf; OpenStax, Principles of Economics 3e, §3.1 (price on the vertical axis, quantity horizontal; demand slopes down, supply up; equilibrium where they intersect), sha256:8353b360b446a7f34f5369805d9b2845e02c605c6d2d04fb3e7dbbe4b4a4cbc1 — https://openstax.org/books/principles-economics-3e/pages/3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services; OpenStax, Principles of Economics 3e, §3.3 ('When both curves shift, typically we can determine the overall effect on price or on quantity, but not on both'), sha256:7f785bc322a7870d3c2720b99c089a38c70af227287524b14132c8a84bb48e4c — https://openstax.org/books/principles-economics-3e/pages/3-3-changes-in-equilibrium-price-and-quantity-the-four-step-process; MSRB, Municipal Bond Basics, Tax Status (interest often excluded from gross income for federal income tax; tax-exempt rate typically lower than taxable), sha256:26de25b4a15ef6f5d8d4093b09220b8d93b256aadc93b22369c30a34a004c0ad — https://www.msrb.org/Municipal-Bond-Basics; CAS Exam 7 Spring 2014 - sample answers/examiner's report, Q25 PDF pp.95-96 (bridging model, autocorrelation; intellectual property, underwriter incentives, owner education), sha256:2caeacb1b71970f0958ebaf5a56fb6a822eaa9d16d6d738888a310d19c1339ae — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam7_14-7.pdf; CAS Exam 7 Spring 2015 - exam and sample answers/examiner's report, Q20(c) PDF p.80 (contract complexity; XS loss not linear in the underlying risks; some contracts warrant no credit, e.g. for tax reasons); Q28 PDF pp.97-98 (strategic risk types: industry, competitor, stagnation, brand), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf; CAS Exam 7 Spring 2016 - sample answers/examiner's report, Q22 PDF pp.90-91 (asset strategy across the cycle; tax-exempt bonds in hard markets; asset risk); Q27 PDF pp.101-103 (agency theory; short-term incentive plan; IP, UW incentives, market overreaction, owner education, scenario planning); Q28 PDF pp.104-105 (Delphi, competitor analysis, scenario testing; AR(n), general factor model printed 'd + d x'; notation variants accepted; econometric vs soft and technical), sha256:e07f38dd81edc9715ef2528c1861e75c609c85b598b51b723d665cf63b745b84 — https://www.casact.org/sites/default/files/2021-03/16-7.pdf; CAS Exam 7 Spring 2017 - exam and sample answers/examiner's report, Q23 PDF pp.29, 89-90 (cost/benefit diagram: cost = premium less recoveries, bare at 0, benefit = result less bare at each level); Q24 PDF pp.93-95 (unilateral plan drawbacks; three steps of scenario planning; advantages); Q25 PDF pp.96-98 (behavioral approach; shifts after a capital infusion; price either way, quantity higher), sha256:c32697af25fff52e2c5e1e49de12dacd66662b78644bbb28fba827da035c03c4 — https://www.casact.org/sites/default/files/2021-01/17-7.PDF; CAS Exam 7 Spring 2018 - sample answers/examiner's report, Q22 PDF pp.100-103 (surplus note cost principal x (coupon - yield); QS cost ceded premium x economic margin; principal repayment not a cost; three paradigms: stability, frees up capital, adds firm value); Q24 PDF pp.106-107 (maintain-market-share strategy; IP, UW incentives, owner education, market overreaction, scenario planning, investment strategy, agency theory), sha256:b5f6e6454919cfb04da8295ac4a70c89af58e770707daa4faf575bdca8a4fa6b — https://www.casact.org/sites/default/files/2021-03/18-7_0.pdf; CAS Exam 7 Spring 2019 - sample answers/examiner's report, Q21 PDF pp.93-94 (econometric components: capital, supply, demand, profit flows; demand shifts right to a smaller extent; shocks reduce capital and supply; blend of soft and technical), sha256:f6c6d52b71498f5c65eae5da824d1f74f31bf531f5059dcc64f0bfcf7c4b8416 — https://www.casact.org/sites/default/files/2021-03/19-7_0.pdf
- note: D22: Brehm et al. is study-kit only and was not read; the cycle material rests on CAS Exam 7 examiner's reports (rank 1 for what the examiners grade) with Feldblum, OpenStax and MSRB where an open text says the same thing — medium ceiling. Two minor glosses corrected and one typo fixed this run; F-001 resolved; a narrower minor finding (Delphi, AR(n), strategic-risk types) and a nit stay open. General factor model: the writer's c is kept (the report's 'd + d x' is a slip; notation variants accepted). Rule 6: the whole page was checked, not only the new section; it is also linked by SOA CFE-201 (in development), so this is their re-check too.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T14:07Z/1623
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Deleted this run: the sentence now reads 'supply expands quickly when profits look good.', which is what Feldblum says (PDF pp.7-8).

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T14:07Z/1623
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Restated this run to what the equation shows: X_t 'depends on its gap from the factor's previous value'; c is 'how strongly the combined ratio responds to that gap'; 'independent' dropped. The equation itself, with c for the coefficient, is kept.

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T14:07Z/1623
- date: 2026-10-31
- resolves: F-004
- status: resolved
- note: Fixed this run: 'three parts of the problem'.
