---
target: Concepts/Insurance Risk.md
created: 2026-10-18
---

## [F-001] Parameter risk split into four aspects; the CAS accepted five
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Brehm's components of underwriting risk'
- claim: Parameter risk is subdivided into estimation, projection, event and systematic risk.
- evidence: CAS Exam 7 Spring 2017 Q22(b) examiner's report, PDF p.87, on the Brehm reading: 'The following aspects of parameter risks were accepted: a. Estimation risk b. Projection risk c. Event risk d. Systematic risk e. Model risk.' The page lists the first four and gives model risk only as a separate link elsewhere. A candidate taking the page's list as complete would leave out an aspect the examiners accept. Brehm itself could not be read, so it is open whether the book lists model risk as a fifth aspect or as part of estimation risk. The page's event-risk examples (a court ruling, a latent exposure, a new cause of loss) agree with the same report, which counts a catastrophe as event risk as a common error.
- source_rank: 1
- proposed_action: With the study-kit text in hand, check how Brehm subdivides parameter risk. If model risk is one of its aspects, add it to the list; if it sits inside estimation risk, say so in the bullet.
- applied: false
- fingerprint: d318a960d745

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: in_review
- checks_run: every worked example recomputed (CV 30.4%/5.83%, parameter share 74%; Bin(1000,0.002) P(N<=5)=0.984, P(N<=6)=0.996, SD 353k, 99th pct 1.5M vs 25M, ratio 17); variance decomposition; links resolve; $$ balance; Brehm parameter-risk aspects compared with the CAS 2017 Q22 examiner's report
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B and D tasks, readings, and complete text references (Brehm et al.: tasks D1-D6; Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, and 5 (5.4 only); source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS Exam 7 Spring 2017 — sample answers and examiner's report, Q22 PDF pp.86-87 (accepted aspects of parameter risk), Q24 PDF pp.93-95 (scenario planning), Q25 PDF p.96 (behavioral cycle models), sha256:c32697af25fff52e2c5e1e49de12dacd66662b78644bbb28fba827da035c03c4 — https://www.casact.org/sites/default/files/2021-01/17-7.PDF
- note: Brehm et al. could not be read: the CAS supplies it only in the Exam 9 study kit (outline p.8, source key SK); no authorized free copy was found (web search; Guy Carpenter's ermbook.guycarp.com no longer resolves; the Wayback Machine was unreachable from this session, connection reset). D7 default applies. The Brehm attributions (components of underwriting risk) are corroborated only in part, by the 2017 Q22 examiner's report (F-001). The A.M. Best impairment claim and the reserve-risk statements were not checked against any source. Linked from SOA GI-201 and ILA-201 pages too (in development), whose readings were not read.

## [C-002] Run-id correction for this run's entries
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:56Z/8a71
- date: 2026-10-18
- note: Run-id correction. The entries dated 2026-10-18 that carry run_id 2026-10-18T15:01Z/0103 were written by the Brehm et al. reading packet, run 2026-10-18T14:56Z/8a71, not by the Clark/Bernegger packet that owns 0103. This file has nothing to do with the Clark/Bernegger packet. The run id was read from a scratch file that a concurrent agent overwrote. The entries' content is unchanged; their run summary is .verify/_runs/2026-10-18T14-56Z-8a71.md.

## [F-002] A.M. Best attribution and long-tail claim unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Reserve risk'
- claim: For long-tailed lines it is often the largest single risk, and A.M. Best's impairment studies have consistently found deficient reserves and inadequate pricing to be the leading cause of P&C insurer impairment.
- evidence: No A.M. Best impairment study was reachable, and no source read says reserve risk is often the largest single risk for long-tailed lines. The KPMG paper for PACICC (PDF pp.5, 13) states: 'PACICC has identified inadequate pricing and deficient reserves as the leading causes of insolvency for P&C insurers in Canada.' The CAS Exam 7 2018 Q1(b) stem (PDF p.6) calls deficient loss reserves 'a primary cause of property & casualty insurer insolvency'. The sentence was restated to the PACICC finding.
- source_rank: 3
- proposed_action: Restate to the PACICC finding; delete the long-tail claim.
- applied: true
- fingerprint: 6db9d443d157

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Restated in this run to the PACICC finding, near-verbatim: 'PACICC has identified inadequate pricing and deficient reserves as the leading causes of insolvency for P&C insurers in Canada.' The long-tail claim is deleted.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: worked examples recomputed before comparing (CV 30.4% / 5.83%, process CV 30% -> 3%, floor 5%, parameter share 74%; Bin(1000, 0.002) P(N<=5) 0.984, P(N<=6) 0.996, SD 353k, 99th pct 1.5M vs 25M, ratio 17); variance decomposition and EPV/VHM (LDA credibility); process risk diversifies, parameter risk does not (Exam 7 2017 Q22 sample answers and report); parameter-risk aspects and event-risk examples (2017 Q22 report); underwriting / reserve / catastrophe split (Solvency II Art.13(30), 105(2): premium and reserve risk, catastrophe risk); pricing risk and claim variability (2013 Q22); catastrophe concentration not diversified (Saylor s05-04 fundamental risk); links resolve; $$ balance
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B, C and D tasks and readings; complete text references (Brehm et al.: D1-D6, Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, 5.4; source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; Directive 2009/138/EC (Solvency II), consolidated HTML, Art.13(30)-(34) definitions (underwriting, market, credit, operational, liquidity risk); Art.45(1) ORSA; Art.101(3) 99.5% one-year VaR; Art.104(1) risk modules; Art.105(2), (5), (6) non-life premium/reserve and catastrophe, market sub-modules, counterparty default (reinsurance, derivatives, receivables from intermediaries); Art.107(1), (3) operational risk capital requirement, sha256:ad77288b3961fb0425f2e8db221ecc9706975bf72c37d7d3adcf8f0df62f702e — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138; Frees et al., Loss Data Analytics (open text), Credibility chapter, EPV and VHM decomposition of variance, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html; CAS Exam 7 Spring 2013 - exam and sample answers/examiner's report, Q15 PDF p.68 (cat models, ESGs, copulas); Q19 PDF pp.75-76 (TVaR, EPD, subadditivity); Q20 PDF pp.77-78 (efficient frontier, cost allocation); Q21 PDF pp.25, 79-80 (Basel II basic indicator and standardized approaches); Q22 PDF pp.26, 81-82 (pricing risk, claim variability, market risk, correlation; inflation raises liabilities and lowers bond values), sha256:b10657555e3da0116f715810c94b20afbcb50b86a4ba6b2fa3b9f771f2ab9d99 — https://www.casact.org/sites/default/files/2021-03/13-7.pdf; CAS Exam 7 Spring 2015 - exam and sample answers/examiner's report, Q22 PDF pp.84-85 (key elements of parameter uncertainty); Q26 PDF pp.30, 93-95 (efficient frontier on three risk measures; capital = 1-in-100 TVaR; cost of capital plus net reinsurance cost; report: commonest mistake was examining only one risk measure); Q28 PDF pp.97-98 (operational vs strategic risk; strategic risk types); Q29 PDF p.99 (currency, concentration, catastrophe, liquidity risk), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf; CAS Exam 7 Spring 2017 - sample answers/examiner's report, Q22 PDF pp.86-88 (process vs parameter risk; parameter risk does not diversify; accepted aspects: estimation, projection, event, systematic, model risk; reduce over-parameterization); Q24 PDF pp.93-95 (scenario planning vs unilateral plan); Q25 PDF pp.96-98 (behavioral cycle models), sha256:c32697af25fff52e2c5e1e49de12dacd66662b78644bbb28fba827da035c03c4 — https://www.casact.org/sites/default/files/2021-01/17-7.PDF; CAS Exam 7 Spring 2018 - exam and sample answers/examiner's report, Q1 PDF pp.6, 34-37 (strategic risk types; deficient loss reserves a primary cause of insolvency, impairment causes 'as mentioned in Brehm'; process vs parameter risk); Q20 PDF p.25 (reduce insurance hazard risk by reinsurance; capital set by 1-in-100 TVaR), sha256:b5f6e6454919cfb04da8295ac4a70c89af58e770707daa4faf575bdca8a4fa6b — https://www.casact.org/sites/default/files/2021-03/18-7_0.pdf; CAS Exam 7 Spring 2019 - exam and sample answers/examiner's report, Q1 PDF pp.6, 34-38 (model and estimation risk, estimation risk a subset of model risk; operational risks of a vendor agreement and KRIs: processing-centre down time, employee turnover), sha256:f6c6d52b71498f5c65eae5da824d1f74f31bf531f5059dcc64f0bfcf7c4b8416 — https://www.casact.org/sites/default/files/2021-03/19-7_0.pdf; KPMG for PACICC, Actuaries' Role in Safeguarding the Solvency of P&C Insurers, PDF pp.5, 13 (PACICC has identified inadequate pricing and deficient reserves as the leading causes of insolvency for P&C insurers in Canada), sha256:dfeb3261a08d006f20db422d1123bd5983dee29907f1fbb5a4b657bf5005f8fd — https://www.pacicc.ca/wp-content/uploads/2017/11/Actuaries-Role-in-Safeguarding-the-Solvency.pdf; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s05-04, pure vs speculative, diversifiable/idiosyncratic vs nondiversifiable/systemic, fundamental vs particular risk, sha256:4d894cf157c8f6b7a4c620f551f76e788a2b6fb98bf979d3cbe23c3f32071592 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s05-04-types-of-risks-risk-exposures.html; Hardy, An Introduction to Risk Measures for Actuarial Applications (SOA/CAS study note C-25-07, 2006), PDF pp.3 (expected value, standard deviation, variance premium principles), 8-11 (quantile, CTE = TVaR = TCE = expected shortfall; probability-mass adjustment; CTE robust to sampling error, easy with simulation), 15-18 (distortion risk measures: g increasing, g(0)=0, g(1)=1; quantile and CTE distortions; PH, dual power, Wang), 20-23 (coherence axioms; quantile not subadditive; SD principle fails monotonicity, variance principle fails subadditivity; semi-variance), sha256:9d0c40a0b4cb1e1e68e68744c096dd36e7422560e9eabe4ee89e539443bcddc7 — https://www.soa.org/globalassets/assets/files/edu/c-25-07.pdf
- note: D22 (content plan §6): Brehm et al. is study-kit only and was not read; this pass checks each claim against an open source that states the same thing, at D7's medium ceiling, with the Fall 2026 outline as the scope check (the concept sits in a Domain B, C or D task with an assigned reading). CAS Exam 7 2012-2019 examiner's reports on the Brehm-era ERM syllabus are rank 1 corroboration, not the text itself. Edited this run (F-002). F-001 (minor) stays open: the CAS accepted model risk as a fifth aspect of parameter risk (2017 Q22), and the 2019 Q1(c) report, PDF p.37, adds that 'estimation risk is a subset of model risk'. Whether Brehm lists model risk separately still needs the text.
