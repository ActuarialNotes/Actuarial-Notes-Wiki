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
