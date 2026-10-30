---
target: Concepts/Claim.md
created: 2026-09-28
---

## [F-001] Example conclusion that large claims drive most of the variance is not supported by the example data
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: Aggregate Claims example, closing sentence, line 66
- claim: The compound variance uses E[X^2] rather than Var(X), and the large claims drive most of it.
- evidence: Recomputed before reading the answer: E[S] = 40 x 5,000 = 200,000; E[X^2] = 10,000^2 + 5,000^2 = 1.25e8; Var(S) = 40 x 1.25e8 = 5e9, SD 70,711; P(no claim above 20,000) = e^-4 = 0.0183 - all agree with the page, and Var(S) = EN Var(X) + (EX)^2 Var(N) = 40(1e8) + 25e6(40) = 5e9 matches Pishro-Nik §5.1.5. The data give only P(X > 20,000) = 0.10, which bounds the large-claim share of E[X^2] from below at 0.10 x 20,000^2 / 1.25e8 = 32%; nothing in the example establishes that the share is most of it. The first half of the sentence is right; the second is an assertion.
- source_rank: 5
- proposed_action: Drop the clause 'and the large claims drive most of it', or add data to the example that shows it.
- applied: false
- fingerprint: f01b2791ac8b

## [F-002] First-/third-party claim and occurrence/claim/loss distinctions not located in the sources read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: opening definition line 14 and 'Claim, loss, occurrence' bullet line 21
- claim: It is made either by a policyholder against its own insurer (first party) or by someone the policyholder harmed (third party). ... The occurrence is the event. It can produce several claims, one per claimant or per coverage, and the loss is the dollar amount.
- evidence: Not located in the passages read this run: P-21-05 §II (PDF p.2) defines the claim payment as the amount the insurer pays to the policyholder or designated beneficiary on a specific loss, and §VI (PDF p.7) distinguishes losses from claim payments; Friedland PDF p.44 discusses the accident date under claims-made policies. None of these defines first- vs third-party claims or the occurrence/claim/loss three-way split. The rest of the page is supported (see the pass record).
- source_rank: 1
- proposed_action: Cite a source for these definitions (e.g. a CAS DISC-IA or Exam 5 reading) or trim them.
- applied: false
- fingerprint: 4c6bacb55273

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: E[S] = E[N]E[X] with X_i iid and independent of N vs Pishro-Nik §5.1.5 (same conditions). Payments under a deductible are Poisson with rate lambda P(X > d) vs Pishro-Nik §11.1.3 splitting. E[Y^L] = P(X > d)E[Y^P] by iterated expectation (§5.1.5); loss vs payment distinction vs P-21-05 p.7. Claim life cycle (reported, case outstanding, payments, settlement), reopened claims, IBNR, claims-made, reported claim count triangle vs Friedland pp.14, 20, 44, 66. Example 1 recomputed first: e^-0.25 = 0.7788; 2000 e^-0.25 = 1557.60 (C tables E[X^x]); E[Y^P] = 2000; 100 x 1557.60 = 77.88 x 2000 = 155,760 - agrees. Example 2 recomputed: 200,000; 1.25e8; 5e9; 70,711; e^-4 = 0.0183 - agrees. All wiki-links resolve.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §II claim payment PDF p.2; §III frequency and severity PDF p.3; §VI losses vs claim payments PDF p.7; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.5 (random sum Y = X1+...+XN: EY = E[X]E[N], Var(Y) = EN Var(X) + (EX)^2 Var(N)), fetched 2026-09-28, sha256:b02361ccef1565d4250b62e694cf7e84e96005add6eb5bb45dff9f51d72d12be — https://www.probabilitycourse.com/chapter5/5_1_5_conditional_expectation.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §11.1.3 Splitting a Poisson process (N1(t) Poisson with rate lambda p), fetched 2026-09-28, sha256:2b83b99ec8feade5f4778629c16b496516b0d40ae3e284456afcf1cc6a3a4506 — https://www.probabilitycourse.com/chapter11/11_1_3_merging_and_splitting_poisson_processes.php; SOA, Tables for Exam C (Fall 2009), exponential entry E[X^x] = theta(1 - e^(-x/theta)), PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS study note, 451 pp.), claim life cycle PDF p.14, reopened claims and IBNR PDF p.20, claims-made accident date PDF p.44, reported claim count triangle PDF p.66, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Formulas and both examples verified; two open minors (an unsupported closing clause in Example 2; first/third-party and occurrence definitions not located in the sources read).

## [F-001/R] Unsupported clause dropped
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Deleted "and the large claims drive most of it" from the Aggregate Claims example; the example data fix only a 32% lower bound on the large-claim share of E[X^2].

## [F-002/R] Definition and loss/accident-date bullet restated from Werner & Modlin
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Opening sentence and the second bullet rewritten to Werner & Modlin Ch.1 (PDF pp.14-15): a claim is the demand to the insurer for indemnification under the policy made by the insured or other individual as provided in the policy; the claimant can be an insured or a third party alleging injuries or damages covered by the policy; loss is the amount of compensation paid or payable to the claimant; the date of the event is the date of loss or accident date (sometimes occurrence date); losses and claims are occasionally used interchangeably. The first/third-party labels and the occurrence/claim/loss three-way split, which no source read supports, were deleted.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001, F-002: definitions now match Werner PDF pp.14-15 word for word in substance. Example 1 recomputed: e^-0.25 = 0.7788; 2000 x 0.7788 = 1557.60; 1557.60/0.7788 = 2000; 100 x 1557.60 = 77.88 x 2000 = 155760. Example 2: 40 x 5000 = 200000; 1e8 + 2.5e7 = 1.25e8; x 40 = 5e9; sqrt = 70711; e^-4 = 0.0183. Pishro-Nik citations carried from the C-001 pass of this run (formulas unchanged). Medium: original worked examples.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §II claim payment PDF p.2; §III frequency and severity PDF p.3; §VI losses vs claim payments PDF p.7; Werner & Modlin, Basic Ratemaking (CAS, 2016), Ch.1 claim, claimant, accident date PDF p.14; loss, losses and claims used interchangeably PDF p.15, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.5 (random sum Y = X1+...+XN: EY = E[X]E[N], Var(Y) = EN Var(X) + (EX)^2 Var(N)), fetched 2026-09-28, sha256:b02361ccef1565d4250b62e694cf7e84e96005add6eb5bb45dff9f51d72d12be — https://www.probabilitycourse.com/chapter5/5_1_5_conditional_expectation.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §11.1.3 Splitting a Poisson process (N1(t) Poisson with rate lambda p), fetched 2026-09-28, sha256:2b83b99ec8feade5f4778629c16b496516b0d40ae3e284456afcf1cc6a3a4506 — https://www.probabilitycourse.com/chapter11/11_1_3_merging_and_splitting_poisson_processes.php; SOA, Tables for Exam C (Fall 2009), exponential entry E[X^x] = theta(1 - e^(-x/theta)), PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS study note), claim life cycle PDF p.14, reopened claims and IBNR PDF p.20, reported claim count triangle PDF p.66, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Delta check: diffed from commit 3aa695816 (run 919b) to HEAD; additions are the 'Property damage claims' bullet and tip/warning callouts. Claim definition against IRMI 'claim' ('a demand by an individual or corporation to recover, under a policy of insurance, for loss that may come within that policy'). First-party label: IRMI 'first-party insurance' ('applies to the insured's own property or person'); third party on a liability policy: IRMI 'liability insurance' (obligation to pay damages arising out of legal liability to others) and Werner PDF p.14 (claimant an insured or a third party). Run 919b deleted the first/third-party labels for want of a source (F-002); they return now with these sources, which is the new evidence. HO 00 03 05 11: signed, sworn proof of loss (C.8); Our Option — written notice within 30 days after the proof of loss, repair or replace with like kind and quality (I); loss payable 60 days after proof of loss and agreement, final judgment or appraisal award (J) — all as stated. Proof of loss as a formal statement used especially in property insurance: IRMI. Tip 'valued on the policy's basis, then reduced for coinsurance and the deductible, capped by the limit': CP 00 10 10 12 D ('first reduce the amount of loss if required by the Coinsurance Condition ... subtract the Deductible ... pay the resulting amount or the Limit of Insurance, whichever is less').
- sources_checked: IRMI Insurance Glossary, 'claim' (fetched 2026-10-10), sha256:38c7e60380b2dc016b204eaa95c17228c89cf89e57152e7dcc4a37e300651b0b — https://www.irmi.com/term/insurance-definitions/claim; IRMI Insurance Glossary, 'proof of loss' (fetched 2026-10-10), sha256:4a15c05bdb1431633d387a74200419f35393f5ab6c054c4bcdd72de6782d79f2 — https://www.irmi.com/term/insurance-definitions/proof-of-loss; IRMI Insurance Glossary, 'first party insurance' (fetched 2026-10-10), sha256:345598aa5e91f2702abb219143b6331af4d3dfe650e779f0fcb151d439a3a9a0 — https://www.irmi.com/term/insurance-definitions/first-party-insurance; IRMI Insurance Glossary, 'liability insurance' (fetched 2026-10-10), sha256:3d142cd30f5eb36026cf77cd347df7109ee125eedb4c584e9242a19eb7bf7dd2 — https://www.irmi.com/term/insurance-definitions/liability-insurance; ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Conditions C.8, I, J (pp.14, 16), sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf; ISO CP 00 10 10 12, Building and Personal Property Coverage Form, D Deductible, F.1 Coinsurance (pp.10, 13), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.1 PDF pp.14-15 — prior-pass source, re-fetched, hash unchanged, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), §II, §III, §VI (PDF pp.2-3, 7) — re-fetched, hash unchanged, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.5 (fetched 2026-10-10), random sums — re-fetched; HTML hash differs from run 919b's copy, sha256:b7c8d711d8ba6910e0226b0beb5046d25a834faeeecc0ef5ce87ead3c15aede8 — https://www.probabilitycourse.com/chapter5/5_1_5_conditional_expectation.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §11.1.3 (fetched 2026-10-10), Poisson splitting — re-fetched; HTML hash differs from run 919b's copy, sha256:ee6db1bea6bec9eb05fbf1b8ec21a67b5b37ba380a8b425f8c99576739c86c0f — https://www.probabilitycourse.com/chapter11/11_1_3_merging_and_splitting_poisson_processes.php; SOA, Tables for Exam C (Fall 2009), exponential E[X^x], PDF p.11 — re-fetched, hash unchanged, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), PDF pp.14, 20, 66 — re-fetched, hash unchanged, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Additions confirmed. Medium: the first/third-party labels rest on IRMI's glossary (rank 3) together with Werner; prior pass's reasons for medium (original worked examples) also stand.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:38Z/1db6
- date: 2026-10-30
- status_set: verified
- confidence: medium
- checks_run: w5 re-pass after writer additions (adds only). E[S|N]=N E[X], Var(S|N)=N Var(X), E[S]=E[N]E[X], Var(S)=E[N]Var(X)+Var(N)E[X]^2 read verbatim in SIE 3.7 Random Sums (N independent of the iid X); Poisson case: SIE 13.6 var(V_t)=(mu^2+sigma^2)rt with rt -> a for a compound Poisson variable, i.e. lambda E[X^2]; algebra lambda Var X + lambda E[X]^2 = lambda E[X^2] checked. No question numbers (p-917/p-933) on the page. Prior sources re-cited.
- sources_checked: IRMI Insurance Glossary, 'claim' (fetched 2026-10-10), sha256:38c7e60380b2dc016b204eaa95c17228c89cf89e57152e7dcc4a37e300651b0b — https://www.irmi.com/term/insurance-definitions/claim; IRMI Insurance Glossary, 'proof of loss' (fetched 2026-10-10), sha256:4a15c05bdb1431633d387a74200419f35393f5ab6c054c4bcdd72de6782d79f2 — https://www.irmi.com/term/insurance-definitions/proof-of-loss; IRMI Insurance Glossary, 'first party insurance' (fetched 2026-10-10), sha256:345598aa5e91f2702abb219143b6331af4d3dfe650e779f0fcb151d439a3a9a0 — https://www.irmi.com/term/insurance-definitions/first-party-insurance; IRMI Insurance Glossary, 'liability insurance' (fetched 2026-10-10), sha256:3d142cd30f5eb36026cf77cd347df7109ee125eedb4c584e9242a19eb7bf7dd2 — https://www.irmi.com/term/insurance-definitions/liability-insurance; ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Conditions C.8, I, J (pp.14, 16), sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf; ISO CP 00 10 10 12, Building and Personal Property Coverage Form, D Deductible, F.1 Coinsurance (pp.10, 13), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.1 PDF pp.14-15 — prior-pass source, re-fetched, hash unchanged, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), §II, §III, §VI (PDF pp.2-3, 7) — re-fetched, hash unchanged, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.5 (fetched 2026-10-10), random sums — re-fetched; HTML hash differs from run 919b's copy, sha256:b7c8d711d8ba6910e0226b0beb5046d25a834faeeecc0ef5ce87ead3c15aede8 — https://www.probabilitycourse.com/chapter5/5_1_5_conditional_expectation.php; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §11.1.3 (fetched 2026-10-10), Poisson splitting — re-fetched; HTML hash differs from run 919b's copy, sha256:ee6db1bea6bec9eb05fbf1b8ec21a67b5b37ba380a8b425f8c99576739c86c0f — https://www.probabilitycourse.com/chapter11/11_1_3_merging_and_splitting_poisson_processes.php; SOA, Tables for Exam C (Fall 2009), exponential E[X^x], PDF p.11 — re-fetched, hash unchanged, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), PDF pp.14, 20, 66 — re-fetched, hash unchanged, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Conditional Expected Value, §3.7 Conditional Expected Value, Random Sums of Random Variables: E(Y_N|N) = N mu, E(Y_N) = E(N) mu, var(Y_N|N) = N sigma^2, var(Y_N) = E(N) sigma^2 + var(N) mu^2, sha256:23e328f9ee55e32522905aba62841f2920eef0d32fb68d7fbb1f4e0b0eaf62f6 — https://www.randomservices.org/random/expect/Conditional.html; Compound Poisson Processes, §13.6 Compound Poisson Processes: E(N_t) = var(N_t) = rt, var(V_t) = (mu^2 + sigma^2) rt; same with rt replaced by a for a compound Poisson variable, sha256:6c5a27a1dc417fbb651a6271f8bb72c6e6f9790ae3c59c781f8f51c29961afd6 — https://www.randomservices.org/random/poisson/Compound.html
