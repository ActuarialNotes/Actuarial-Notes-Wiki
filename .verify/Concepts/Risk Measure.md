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
