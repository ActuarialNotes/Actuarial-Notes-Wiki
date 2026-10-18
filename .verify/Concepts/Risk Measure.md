---
target: Concepts/Risk Measure.md
created: 2026-10-10
---

## [C-001] Pass incomplete: three Exam 9 claims unsourced
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- note: Checked: DISC basic measures (range, variance/SD, CV, semivariance) vs Saylor s06-02; solvency- vs performance-related families, probability of ruin, shortfall risk, EPD vs CAS-ERM pp.117-118; VaR/CTE(TVaR), coherence axioms, VaR not subadditive, SD principle fails monotonicity, variance principle fails subadditivity, distortion form g(S(x)) increasing with g(0)=0, g(1)=1, PH, dual power and Wang transforms vs Hardy SOA/CAS study note C-25-07; Solvency II 99.5% one-year VaR (Directive 2009/138/EC Art.101(3)); SST expected shortfall at 99% (FINMA technical document 2006). All examples recomputed (6.2, 17.99, 70, 62.5, 22.86; treaties 0/10 VaR, 8/10 TVaR). Notation note: Hardy calls the mass-adjusted measure CTE (= TVaR = ES); the page's narrower CTE = E[X|X>=VaR] is an alternative convention, which it flags. Not verified: concave distortion => subadditive/coherent and comonotonic additive, and the constant cost-of-capital distortion (nu s + delta) - not in any source read. Left in_review.

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: in_review
- checks_run: every definition, list, rule and attribution checked against the sources listed; every worked example recomputed; all [[links]] resolve; U.S. framing reviewed
- sources_checked: Hardy, An Introduction to Risk Measures for Actuarial Applications (SOA/CAS study note C-25-07, 2006), pp.3, 8-9, 15-23, sha256:9d0c40a0b4cb1e1e68e68744c096dd36e7422560e9eabe4ee89e539443bcddc7 — https://www.soa.org/globalassets/assets/files/edu/c-25-07.pdf; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s06-02 measures, sha256:2cd18f66c1d1d9bc8162fb93bce73ddf75b766f3363ac06e3ec20e165d473773 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s06-02-measures-of-risk-putting-it-to.html; CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.117-118 (PDF p.19), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf; Directive 2009/138/EC (Solvency II), Art. 101(3), Art.101(3), sha256:17c8dd8d2f06a8d8881bfd4b031fcf662ff59f68ce5ff43f716451a4a906af94 — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138; FINMA (Federal Office of Private Insurance), Technical Document on the Swiss Solvency Test (2006), pp.9-11 (expected shortfall at 99%), sha256:fdcde2ada75dc3ad2b1dd6d379ccf94af4a58f53c97d54f020c8ea06695d8137 — https://finma.ch/FinmaArchiv/bpv/download/e/SST_techDok_061002_E_wo_Li_20070118.pdf
- note: Left in_review: concave-distortion and cost-of-capital claims unsourced (see comment).

## [C-003] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: in_review
- checks_run: all four examples recomputed (6.2, 17.99, VaR 50, TVaR 70, CTE 62.5; treaties VaR 0/0/10, TVaR 8/8/10, CTE 0.4; distortions 70 and 22.86, margin 16.66; locations CV 0.141 and 0.200); 1-in-250 PML = VaR_0.996; SD-principle counterexample (15 > 10); TVaR shortcut identity; links resolve; $$ balance
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B and D tasks, readings, and complete text references (Brehm et al.: tasks D1-D6; Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, and 5 (5.4 only); source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS Exam 7 Spring 2015 — sample answers and examiner's report, Q26 PDF pp.93-95 (efficient frontier on three risk measures; cost of capital plus net cost of reinsurance), Q28 PDF p.97 (operational vs strategic risk; strategic risks), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf
- note: Brehm et al. could not be read: the CAS supplies it only in the Exam 9 study kit (outline p.8, source key SK); no authorized free copy was found (web search; Guy Carpenter's ermbook.guycarp.com no longer resolves; the Wayback Machine was unreachable from this session, connection reset). D7 default applies. The page's Exam 9 framing (capital vs pricing risk measures, X ^ a) and the constant cost-of-capital distortion follow Mildenhall & Major (B1-B2, Wiley 2022, sold), which was not read. The concave-distortion coherence claim is still unsourced, as C-001 says. Hardy C-25-07 was searched again and has no 'concave'. ASTAM and FAM halves (development) were not re-read this run.

## [C-004] Run-id correction for this run's entries
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:56Z/8a71
- date: 2026-10-18
- note: Run-id correction. The entries dated 2026-10-18 that carry run_id 2026-10-18T15:01Z/0103 were written by the Brehm et al. reading packet, run 2026-10-18T14:56Z/8a71, not by the Clark/Bernegger packet that owns 0103. This file has nothing to do with the Clark/Bernegger packet. The run id was read from a scratch file that a concurrent agent overwrote. The entries' content is unchanged; their run summary is .verify/_runs/2026-10-18T14-56Z-8a71.md.

## [F-001] VaR properties not in any source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Value at Risk'
- claim: VaR is easy to explain, always exists and is easy to back-test, but it is blind to how bad losses beyond the quantile are.
- evidence: Hardy C-25-07, PDF p.21, calls the quantile risk measure 'useful and well understood'. PDF p.9 says the loss distribution above the quantile does not affect it. No source read says it always exists or is easy to back-test. Restated to 'VaR is well understood, but it is blind to how bad losses beyond the quantile are.'
- source_rank: 3
- proposed_action: Restate to Hardy's wording.
- applied: true
- fingerprint: 6a4f92cb7b78

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated in this run to Hardy's wording: 'VaR is well understood, but it is blind to how bad losses beyond the quantile are.'

## [F-002] Expected shortfall / CVaR aside unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Tail Value at Risk'
- claim: Expected shortfall and CVaR usually mean TVaR, though some actuarial texts use expected shortfall for the unconditional E[(X - VaR_p)^+] - check the definition in use.
- evidence: Hardy C-25-07, PDF p.9, lists Tail-VaR, Tail Conditional Expectation and Expected Shortfall as names for the CTE. The FINMA SST technical document, PDF p.9, says 'expected shortfall' is synonymous with TailVaR. Neither names CVaR, or a text that uses expected shortfall for the unconditional excess. Restated to 'Expected shortfall usually means TVaR.' A notation difference is recorded, not corrected: Hardy calls the mass-adjusted measure CTE, while the page keeps CTE for E[X | X >= VaR_p] and flags that it differs at a mass (Hardy p.10).
- source_rank: 3
- proposed_action: Restate to what the sources say.
- applied: true
- fingerprint: cb002bb68840

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Restated in this run to 'Expected shortfall usually means TVaR.' (Hardy p.9; FINMA p.9).

## [F-003] 'TVaR is harder to estimate' contradicted
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Strategic effect'
- claim: TVaR charges for the whole tail but is harder to estimate and does not exist when the mean is infinite.
- evidence: Hardy C-25-07, PDF p.9: the CTE (= TVaR) 'is intuitive, easy to understand and to apply with simulation output. As a mean, it is more robust with respect to sampling error than the quantile.' That contradicts 'harder to estimate'. No source read addresses the infinite-mean point. Both clauses were deleted, leaving 'while TVaR charges for the whole tail'.
- source_rank: 3
- proposed_action: Delete both clauses.
- applied: true
- fingerprint: 51bebd81ede9

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: Deleted in this run; the sentence now ends 'while TVaR charges for the whole tail.'

## [C-005] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: all four examples recomputed before comparing (E 6.2, sd 17.99, VaR 50, TVaR 70, CTE 62.5; treaties VaR 0/0/10, TVaR 8/8/10, CTE 0.4 vs 10; distortions 70 and 22.86, margin 16.66; locations CV 0.141 and 0.200); capital vs pricing roles (M&M Ch.1 pp.2-4); VaR and TVaR definitions (LDA 10.3, arXiv p.6); PML = return-period loss (OSFI B-9 p.12), so 1-in-250 = VaR_0.996; CTE mass adjustment (Hardy p.10); EPD (CAS ERM p.117); moment principles (Hardy p.3); coherence axioms and Artzner et al. 1999 (LDA 10.3.1, M&M Ch.1 p.4); VaR not subadditive (Hardy p.21; Exam 7 2013 Q19); SD principle fails monotonicity, variance principle fails subadditivity (Hardy p.23, LDA); distortion form, quantile, TVaR, PH, dual and Wang distortions (Hardy pp.15-18); concave g -> coherent and comonotonic additive (arXiv p.7, Thm 1); CCoC distortion g = min(1, d + v s), d = r/(1+r) (aggregate docs, Mildenhall); DISC basic measures (Saylor s06-02); two families (CAS ERM pp.117-118); Solvency II 99.5% VaR (Art.101(3)); SST 99% ES (FINMA pp.9-11); links resolve; $$ balance
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B, C and D tasks and readings; complete text references (Brehm et al.: D1-D6, Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, 5.4; source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt (publisher's free sample), pp.1-6 (risk margin to afford capital a return; capital vs pricing risk measures; VaR or TVaR at 99.5%; Artzner et al. 1999; SRMs as distortions; SRM calibrated to cat bond pricing; Constant Cost of Capital SRM), sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf; Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.5-8 (notation: premium = expected loss + margin, assets = premium + equity; prices exclude expenses; TVaR; Definition 1 concave distortion; DRMs coherent and comonotonic additive, Theorem 1; PH and Wang; layer premium density), pp.19-24 (return = margin / equity; no-undercut, Prop.2; frictional cost of capital), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1; Hardy, An Introduction to Risk Measures for Actuarial Applications (SOA/CAS study note C-25-07, 2006), PDF pp.3 (expected value, standard deviation, variance premium principles), 8-11 (quantile, CTE = TVaR = TCE = expected shortfall; probability-mass adjustment; CTE robust to sampling error, easy with simulation), 15-18 (distortion risk measures: g increasing, g(0)=0, g(1)=1; quantile and CTE distortions; PH, dual power, Wang), 20-23 (coherence axioms; quantile not subadditive; SD principle fails monotonicity, variance principle fails subadditivity; semi-variance), sha256:9d0c40a0b4cb1e1e68e68744c096dd36e7422560e9eabe4ee89e539443bcddc7 — https://www.soa.org/globalassets/assets/files/edu/c-25-07.pdf; Frees et al., Loss Data Analytics (open text), Chapter 10, Sec.10.3.1-10.3.3 (risk measure; standard deviation and variance principles; four coherence axioms; SD principle can fail monotonicity; VaR and TVaR definitions), sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html; Mildenhall, aggregate Python package documentation, aggregate.spectral source (stable), class CCoCDistortion: g(x) = min(1, d + v x), v = 1/(1+r) = 1 - d, d = r/(1+r), sha256:d6504ad3674897708aae677a2667ca49994eb2eb33de880d982dc7a417977c48 — https://aggregate.readthedocs.io/en/stable/_modules/aggregate/spectral.html; OSFI, Earthquake Exposure Sound Practices Guideline B-9 (CAS Exam 6C copy), PDF pp.12-13 (PML is return period loss, the loss expected to be exceeded once in every X years), sha256:8b4fbc3a73d44f30961399bf2d7e1f752eaf94ad9c4ce4455f7042006b443a92 — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Earthquake.pdf; CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.109-114 (PDF pp.11-16: definition, four risk types and lists, process steps, treat/exploit: avoid, retain, reduce, transfer, exploit); pp.117-118 (PDF pp.19-20: solvency- and performance-related measures); PDF pp.23, 25 (DFA as structural simulation model; ESG linking interest rates and inflation; natural hedge), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s06-02, measures of risk: frequency, severity, expected value, range, variance, standard deviation, coefficient of variation, semivariance, VaR, sha256:2cd18f66c1d1d9bc8162fb93bce73ddf75b766f3363ac06e3ec20e165d473773 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s06-02-measures-of-risk-putting-it-to.html; Directive 2009/138/EC (Solvency II), consolidated HTML, Art.13(30)-(34) definitions (underwriting, market, credit, operational, liquidity risk); Art.45(1) ORSA; Art.101(3) 99.5% one-year VaR; Art.104(1) risk modules; Art.105(2), (5), (6) non-life premium/reserve and catastrophe, market sub-modules, counterparty default (reinsurance, derivatives, receivables from intermediaries); Art.107(1), (3) operational risk capital requirement, sha256:ad77288b3961fb0425f2e8db221ecc9706975bf72c37d7d3adcf8f0df62f702e — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138; FOPI/FINMA, Technical Document on the Swiss Solvency Test (2006), PDF pp.9-11 (expected shortfall, synonymous with TailVaR, at 99%), sha256:fdcde2ada75dc3ad2b1dd6d379ccf94af4a58f53c97d54f020c8ea06695d8137 — https://finma.ch/FinmaArchiv/bpv/download/e/SST_techDok_061002_E_wo_Li_20070118.pdf; CAS Exam 7 Spring 2012 - exam and sample answers/examiner's report, Q18 PDF pp.78-79 (risk measures for hurricane and price adequacy); Q22 PDF pp.26, 87 (operational risk definition; business disruption, external fraud, execution/delivery in a claims-system project), sha256:e38b20bb58b4c7dbd208b14d350fe3c9c6bc48b789aef61118d8cdae0566582a — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam7_12-7.pdf; CAS Exam 7 Spring 2013 - exam and sample answers/examiner's report, Q15 PDF p.68 (cat models, ESGs, copulas); Q19 PDF pp.75-76 (TVaR, EPD, subadditivity); Q20 PDF pp.77-78 (efficient frontier, cost allocation); Q21 PDF pp.25, 79-80 (Basel II basic indicator and standardized approaches); Q22 PDF pp.26, 81-82 (pricing risk, claim variability, market risk, correlation; inflation raises liabilities and lowers bond values), sha256:b10657555e3da0116f715810c94b20afbcb50b86a4ba6b2fa3b9f771f2ab9d99 — https://www.casact.org/sites/default/files/2021-03/13-7.pdf
- note: D22 (content plan §6): Brehm et al. is study-kit only and was not read; this pass checks each claim against an open source that states the same thing, at D7's medium ceiling, with the Fall 2026 outline as the scope check (the concept sits in a Domain B, C or D task with an assigned reading). CAS Exam 7 2012-2019 examiner's reports on the Brehm-era ERM syllabus are rank 1 corroboration, not the text itself. Edited this run (F-001 to F-003). The earlier passes' open points are now sourced: concave-distortion coherence (arXiv p.7) and the constant cost-of-capital distortion (aggregate docs). Two items rest on recomputation only (rank 5), being algebra: the variance principle fails positive homogeneity, and (1+theta)E[X] fails translation invariance. Mildenhall & Major beyond Ch.1 (B1-B2) was not read.
