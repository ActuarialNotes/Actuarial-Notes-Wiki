---
target: Concepts/Risk Loads.md
created: 2026-10-18
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:04Z/6bfb
- date: 2026-10-18
- status_set: in_review
- checks_run: independent recomputation of every worked example before comparing (all reproduce to the stated rounding); algebra of every displayed identity; wiki links resolve; Mildenhall & Major terms and notation checked for existence against the book's index and the authors' 2020 arXiv paper; task wording against the Fall 2026 outline
- sources_checked: Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.1-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf; Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf; Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.5-6 (notation), 19-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), pp.4-5, 7 (Domains B and C; text references; study-note and errata hyperlinks), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Rests on chapters not read: B4: Mildenhall & Major Ch 9 (9.1 stand-alone classical PCPs, 9.2 portfolio CCoC), Ch 10-11 (distortions). The book is commercial and only its front matter, Chapter 1 and Index are published free; Cummins 2000 had no reachable free copy. Nothing here is verified against the reading; no arithmetic or algebraic error found. Book index lists expected value PCP p.182, constant cost of capital, distortion; the standard deviation and variance principles' scaling claims are algebraically right (rank 5, cannot confirm).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/7c12
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: both examples recomputed before comparing (E 0.70, Var 5.01, sd 2.238; premiums 1.050 / 1.260 / 0.951 / 1.523 / 1.913; loads 0.25 to 1.21; LR 37%, return 15%; pooled load 8.49, saving 3.51 = 41%, 4.24 each); technical premium and risk-loaded technical premium (outline Domain B; M&M Ch.1 pp.1-2: risk margin to afford capital a return); margin M = P - L and return = margin / equity (arXiv pp.6, 19, 22); prices exclude expenses (arXiv p.6); expected value, SD and variance principles (Hardy p.3; LDA 10.3.1); CCoC: d = r/(1+r), P = vL + da, so R = d(a - L) = iota Q, checked algebraically against the aggregate docs' g = min(1, d + v s); distortion loads and calibration to cat bond prices (M&M Ch.1 p.5; Hardy pp.15-18); non-additivity (SD principle subadditive, LDA; no-undercut, arXiv Prop.2); profit provision reflects the cost of capital (Werner & Modlin p.111); links resolve; $$ balance
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B, C and D tasks and readings; complete text references (Brehm et al.: D1-D6, Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, 5.4; source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt (publisher's free sample), pp.1-6 (risk margin to afford capital a return; capital vs pricing risk measures; VaR or TVaR at 99.5%; Artzner et al. 1999; SRMs as distortions; SRM calibrated to cat bond pricing; Constant Cost of Capital SRM), sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf; Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.5-8 (notation: premium = expected loss + margin, assets = premium + equity; prices exclude expenses; TVaR; Definition 1 concave distortion; DRMs coherent and comonotonic additive, Theorem 1; PH and Wang; layer premium density), pp.19-24 (return = margin / equity; no-undercut, Prop.2; frictional cost of capital), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1; Hardy, An Introduction to Risk Measures for Actuarial Applications (SOA/CAS study note C-25-07, 2006), PDF pp.3 (expected value, standard deviation, variance premium principles), 8-11 (quantile, CTE = TVaR = TCE = expected shortfall; probability-mass adjustment; CTE robust to sampling error, easy with simulation), 15-18 (distortion risk measures: g increasing, g(0)=0, g(1)=1; quantile and CTE distortions; PH, dual power, Wang), 20-23 (coherence axioms; quantile not subadditive; SD principle fails monotonicity, variance principle fails subadditivity; semi-variance), sha256:9d0c40a0b4cb1e1e68e68744c096dd36e7422560e9eabe4ee89e539443bcddc7 — https://www.soa.org/globalassets/assets/files/edu/c-25-07.pdf; Frees et al., Loss Data Analytics (open text), Chapter 10, Sec.10.3.1-10.3.3 (risk measure; standard deviation and variance principles; four coherence axioms; SD principle can fail monotonicity; VaR and TVaR definitions), sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html; Mildenhall, aggregate Python package documentation, aggregate.spectral source (stable), class CCoCDistortion: g(x) = min(1, d + v x), v = 1/(1+r) = 1 - d, d = r/(1+r), sha256:d6504ad3674897708aae677a2667ca49994eb2eb33de880d982dc7a417977c48 — https://aggregate.readthedocs.io/en/stable/_modules/aggregate/spectral.html; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), PDF p.111 (underwriting profit provision reflecting the cost of capital for extraordinary risk), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: D22 (content plan §6): Brehm et al. is study-kit only and was not read; this pass checks each claim against an open source that states the same thing, at D7's medium ceiling, with the Fall 2026 outline as the scope check (the concept sits in a Domain B, C or D task with an assigned reading). CAS Exam 7 2012-2019 examiner's reports on the Brehm-era ERM syllabus are rank 1 corroboration, not the text itself. Mildenhall & Major Ch.9-11 (B4) were not read; the scaling of the SD and variance loads with share is algebra (rank 5).

## [F-001] Closing contrast with a profit load is not in the reading, and misdescribes the alternative
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:18Z/81e2
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Risk-loaded increased limit factors (Exam 8)', sentence 3
- claim: ...calibrating $k$ against the portfolio's mix of limits and computing the second moment of limited severity for every limit, rather than applying one profit percentage to all limits.
- evidence: Bahnemann §6.3 (PDF pp.183-185) says only that k 'is selected arbitrarily to produce the desired level of risk loading' (p.183) and computes rho(l) for each limit (Table 6.3); it makes no comparison with a profit load, and the portfolio limit weights in Example 6.5 measure the loaded factors' overall effect (6.0%), they do not calibrate k. The writer flagged the clause as its own wording. The alternative in the exam's own question (CAS 8 2018 Q8) is varying the P&C load by limit, so 'one profit percentage to all limits' also misstates it.
- source_rank: 2
- proposed_action: Delete 'against the portfolio's mix of limits' and ', rather than applying one profit percentage to all limits'.
- applied: true
- fingerprint: dbadd42d6f5b

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:18Z/81e2
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Both clauses deleted in this change; the sentence now reads '...calibrating $k$ and computing the second moment of limited severity for every limit.', which Bahnemann pp.183-185 supports.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:18Z/81e2
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: delta of commit c7887a25 only (the Exam 8 risk-loaded ILF bullet); older text verified 2026-10-18 against the Exam 9 outline, Mildenhall & Major, Hardy and others, unchanged
- sources_checked: Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), §6.3 risk load, eqs.6.21-6.24, Example 6.5 and Table 6.3, PDF pp.183-186, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf
- note: I(l) is eq.6.22 with per-claim ALAE e=0, the case Example 6.5 uses; variance method eq.6.23 rho=k(E[X^2;l]+delta E[X;l]^2) reduces to k E[X^2;l] at delta=0 (Poisson); SD method eq.6.24 rho=k'sqrt(E[X^2;l]). Recomputed Example 6.5's I(1M)=(15,345x1.20+2,013)/(8,896x1.20+627)=20,427/11,302=1.8074. Layer overstatement and the 'ideally ... non-risk-loaded factors and then add on the risk load' remedy are p.185. F-001 (unsupported closing contrast) fixed. No question numbers on the page.
