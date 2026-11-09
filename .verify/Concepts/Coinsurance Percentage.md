---
target: Concepts/Coinsurance Percentage.md
created: 2026-09-13
---

## [F-001] Defines the coinsurance percentage only in the SOA loss-models sense; Exam 5 links it for Werner's required-ITV percentage
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/03f2
- date: 2026-09-13
- severity: major
- status: open
- locus: Whole page - opening definition and the Y = alpha(X-d)+ formula
- claim: 'A Coinsurance Percentage (alpha) is the fraction of the covered loss (after any deductible) that the insurer agrees to pay, with the insured retaining the remaining fraction 1 - alpha.'
- evidence: Two exam pages link this concept and they mean different quantities. 'Exam P-1 (SOA).md' line 44 links it under 'Calculate the amount that an insurance company pays to a policyholder for a claim given Policy Information, including Deductibles, Coinsurance Percentages, and Benefit Limits' - the loss-models sense the page gives. 'Exam 5 (CAS).md' line 42 links it as '[[Coinsurance Rating|coinsurance]] and the [[Coinsurance Percentage]]' inside the alternative-ratemaking objective, i.e. Werner & Modlin Ch. 11, where the notation list on p.209 (PDF p.221) defines 'c = required coinsurance percentage' and the mechanism is the property coinsurance clause: apportionment ratio a = min(F/cV, 1.0), indemnity I = L x F/(cV) subject to I <= F and I <= L (p.210, PDF p.222). Under Werner an 80% coinsurance percentage is the minimum insurance-to-value the insured must carry, NOT the insurer's share of each loss; an Exam 5 candidate arriving from that objective and reading this page learns the wrong object. The sibling page Concepts/Coinsurance Rating.md already distinguishes the two provisions correctly. Per P2 the divergence is a legitimate CAS/SOA context difference to flag, not to reconcile. sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: State both usages at the top - Werner's c (required insurance-to-value percentage, Exam 5) and the loss-models alpha (insurer's share, Exam P) - and cross-link Coinsurance Rating for the clause mechanics. Do not silently replace one with the other.
- applied: false
- fingerprint: edb98d2791d5

## [C-001] Still present: Defines the coinsurance percentage only in the SOA loss-models sense; Exam 5 links it for Werner's required-ITV percentage
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- reaffirms: F-001
- note: Re-confirmed against Werner PDF pp.221-222 and the current Exam 5 page (link now at line 39).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Exam P sense (alpha = the insurer share of the loss above the deductible, Y = alpha (X - d)+) vs P-21-05 pp.7-9 and the Exam P objective (syllabus p.3). Variance scales by alpha^2 vs G&S V(cX) = c^2 V(X) p.267 and SOA Q328 solution (Var[1.03X + 2.5] = 1.03^2 Var X); expectation scales by alpha (same derivation). Example recomputed first: 0.8 x 1200 = 960; 0.64 x 4,000,000 = 2,560,000 - agrees. Links and embed resolve. F-001 (Exam 5 / Werner sense) independently re-confirmed and reaffirmed, still open.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI: only a certain percentage of each loss may be reimbursed, often referred to as coinsurance PDF p.7; reimburse 80% of costs PDF pp.8-9; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ch.6: V(cX) = c^2 V(X) (PDF p.267), E((xbar - mu)^2) = sigma^2/n (PDF p.274), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q50 (PDF pp.17-18), Q243 (PDF p.72), Q328 (PDF p.91), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA Probability Exam syllabus, November 2026, objective "Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Werner & Modlin, Basic Ratemaking (CAS), Ch.6 Leveraged Effect of Limits on Severity Trend PDF pp.129-130; Ch.11 coinsurance notation PDF pp.221-222, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: Exam P content verified; open major F-001 is the CAS Exam 5 vs SOA Exam P definitional difference already on file, not a formula error in the Exam P sense.

## [F-001/R] Both usages stated; Exam 5 coinsurance clause added from Werner & Modlin
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: The lead now gives both senses: Exam P alpha, the insurer share of the covered loss (P-21-05 PDF p.7), and Exam 5 c, the required coinsurance percentage of Werner & Modlin Ch.11 (PDF p.221), with a link to Coinsurance Rating. Added Werner formulas a = min(F/cV, 1.0) (PDF p.221) and I = L x F/(cV) with I <= F and I <= L (PDF p.222), the notation (L = loss after deductible), and Werner example: home 500,000 insured for 300,000 under 80%, cV = 400,000, a = 0.75, 200,000 loss paid 150,000.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001: Exam 5 formulas and example match Werner pp.221-222; recomputed 0.8 x 500000 = 400000, 300000/400000 = 0.75, 200000 x 0.75 = 150000 <= F and <= L. Exam P example recomputed: 0.8 x 1200 = 960; 0.64 x 4000000 = 2560000 (V(cX) = c^2 V(X), Grinstead and Snell p.267). Medium: original worked example.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI only a certain percentage of each loss may be reimbursed, often referred to as coinsurance PDF p.7; reimburse 80% of costs PDF pp.8-9; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ch.6: V(cX) = c^2 V(X) (PDF p.267), E((xbar - mu)^2) = sigma^2/n (PDF p.274), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Werner & Modlin, Basic Ratemaking (CAS, 2016), Ch.11 coinsurance notation and apportionment ratio PDF p.221; indemnity formula and 500,000 / 300,000 / 80% example PDF p.222, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; SOA Probability Exam syllabus, November 2026, objective "Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:02Z/0389
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: Recomputed in python before comparing (scipy quad / closed forms): uniform(0,1000), d=200: E[(X-200)+] = 320, E[(X-200)+^2] = 170,666.67, Var 68,266.67; x0.64 = 43,690.67, SD 209.02 = 0.8 x 261.28; trap 0.8 x Var = 54,613; per payment Var 800^2/12 = 53,333.33, x0.64 = 34,133.33; alpha = 200/320 = 0.625; cap at 200 + 400/0.8 = 700; table rows (0/50, 120/230, 560/340). Try-its: 960 and 2,560,000; uniform(0,600): 133.33, 35,555.56, Var 17,777.78, alpha^2 = 0.5625, alpha = 0.75; home 400,000/240,000/80%: a = 0.75, 75,000 and min(270,000, 240,000) = 240,000; W&M example 0.75 x 200,000 = 150,000. All agree. Exam P sense vs P-21-05 p.7 and LDA §3.4.3; scaling vs G&S p.267; Exam 5 sense and formulas vs W&M pp.221-222 (I = min(aL, F) equals W&M's I = L F/cV with I <= F, I <= L since aL <= L). Links resolve.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05), §VI: only a certain percentage of each loss may be reimbursed, often referred to as coinsurance PDF p.7; 80% of the lesser of 5000 and the cost PDF pp.8-9, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; Frees et al., Loss Data Analytics (open text), Ch.3 Modeling Loss Severity, §3.4.3 coinsurance factor alpha applied after the ordinary deductible: Y^L = alpha[(X^u) - (X^d)], maximum payment alpha(u - d) with u the maximum covered loss; k-th moment carries alpha^k, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.11 coinsurance clause: notation I, L (loss after deductible), F, V, c, a, e; a = min(F/cV, 1.0) PDF p.221; I = L x F/(cV), I <= F, I <= L; 500,000 home insured 300,000 at 80%: a = 0.75, 200,000 loss pays 150,000, penalty 50,000 PDF p.222, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Grinstead & Snell, Introduction to Probability, Ch.6 V(cX) = c^2 V(X) (PDF p.267), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Probability Exam (Exam P) syllabus, November 2026, Topic 2 outcome: deductibles, coinsurance percentages, benefit limits, inflation, PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Full re-pass of the rewritten page; no findings. LDA's u is the maximum covered loss (cap before coinsurance); the page's u caps the payment and says the order is set by the wording, as Payment Random Variable shows.
