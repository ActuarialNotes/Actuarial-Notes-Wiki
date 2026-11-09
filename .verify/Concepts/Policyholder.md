---
target: Concepts/Policyholder.md
created: 2026-09-28
---

## [F-001] Unsourced claims about mutual ownership, creditor rank and the purpose of solvency regulation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: last bullet, line 24
- claim: In a mutual insurer the policyholders are also the owners. In any insurer they are the largest creditors, and protecting them is the purpose of solvency regulation.
- evidence: P-21-05 (the insurance reading the Exam P syllabus names) defines the policyholder and insurer roles (PDF pp.2-3) and contains no occurrence of mutual, creditor or solvency (full-text search of the note). No other source read this run states these three claims, and they are outside the Exam P objective (syllabus PDF p.3). The Exam P content of the page is supported: Y = min(c(X-d)+, u) with u a maximum claim payment (P-21-05 PDF pp.8-9), a fixed deductible leverages inflation and a fixed maximum damps it (PDF pp.10-11).
- source_rank: 1
- proposed_action: Cite a source for the ownership / creditor / solvency-regulation sentence (an Exam 6C/6U or Exam 9 reading) or drop it from the Exam P page.
- applied: false
- fingerprint: 7a3a859f38da

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Formula Y = min(c(X-d)+, u) with u the maximum payment vs P-21-05 pp.8-9 (12,500 maximum on a claim payment). Retained share and deductible purpose (small-claim expense, incentive to prevent losses) vs P-21-05 p.7. Inflation bullet vs P-21-05 p.10 (fixed deductible: payments +54% vs losses +46%) and p.11 (fixed maximum: payments +34%). Example 1 recomputed first: 0.8 x 5500 = 4400, 0.8 x 6100 = 4880 (+10.9%), retained 1600 -> 1720 (+7.5%); 0.8 x 11500 = 9200 and 0.8 x 12700 = 10160 both capped at 8000, retained 4000 -> 5200 (+30%) - agrees. Example 2 recomputed: E[(X-250)+] = 1000 - 1000(1 - e^-0.25) = 778.80 (C tables E[X^x]); retained 221.20 = E[X^250]; F(250) = 0.2212 - agrees. All wiki-links resolve.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §II PDF pp.2-3 (policyholder, beneficiary); §VI deductibles PDF p.7, benefit limits and maximum claim payment PDF pp.8-9; §VII inflation PDF pp.10-11; SOA, Tables for Exam C (Fall 2009), exponential entry E[X^x] = theta(1 - e^(-x/theta)), PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Probability Exam syllabus, November 2026, objective "Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Verified against P-21-05 and the SOA tables for its Exam P content; one open minor for an unsourced sentence outside the Exam P scope.

## [F-002] Unsourced illustrations in the policyholder / insured / claimant bullet
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 4
- claim: A parents auto policy covers a child who drives it. A liability claim is brought by a third party and paid on the policyholders behalf. A life policys owner, insured life and beneficiary can be three separate people.
- evidence: P-21-05 PDF p.2 says the insurer pays the policyholder or his designated beneficiary; Werner & Modlin PDF p.14 says the claimant can be an insured or a third party alleging injuries or damages covered by the policy. Neither gives the auto or life illustrations, and no other source read supports them.
- source_rank: 1
- proposed_action: Restate the bullet from P-21-05 and Werner & Modlin.
- applied: true
- fingerprint: 57d271248929

## [F-001/R] Mutual / creditor / solvency sentence deleted
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: No source for the sentence on this Exam P page was found this session, so the last bullet was deleted. The deductible sentence in bullet 2 was also restated to the three reasons P-21-05 PDF p.7 gives (saves processing small claims, premium savings, economic incentive to prevent losses).

## [F-002/R] Bullet restated from P-21-05 and Werner & Modlin
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Bullet now reads: the insurer pays the policyholder or a designated beneficiary (P-21-05 PDF p.2), and the claimant can be an insured or a third party alleging injuries or damages the policy covers (Werner & Modlin PDF p.14), so the person paid need not be the policyholder.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001, F-002: bullets traced to P-21-05 and Werner. Example 1 recomputed: 0.8 x 5500 = 4400, 0.8 x 6100 = 4880 (+10.9%), retained 1600 -> 1720 (+7.5%); 0.8 x 11500 = 9200 and 0.8 x 12700 = 10160 both capped at 8000, retained 4000 -> 5200 (+30%). Example 2: 1000 e^-0.25 = 778.80; 1000 - 778.80 = 221.20 = 1000(1 - e^-0.25) = E[X ^ 250]; P(X <= 250) = 22.1%. Medium: original worked examples.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §II policyholder or designated beneficiary PDF p.2; §VI reasons for deductibles PDF p.7, benefit limits and maximum claim payment PDF pp.8-9; §VII inflation PDF pp.10-11; Werner & Modlin, Basic Ratemaking (CAS, 2016), Ch.1 claim and claimant PDF p.14, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; SOA, Tables for Exam C (Fall 2009), exponential entry E[X^x] = theta(1 - e^(-x/theta)), PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Probability Exam syllabus, November 2026, objective "Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:01Z/da69
- date: 2026-11-06
- status_set: verified
- confidence: medium
- checks_run: Full re-check of the rewritten page. Recomputed before re-reading (d=500, c=0.75, u=6000): losses 300/2500/6500/10000 -> payments 0/1500/4500/6000, retained 300/1000/2000/4000; limit reached at 8500; +10%: 2750/7150/11000 -> 1687.50/4987.50/6000, retained 1062.50/2162.50/5000; +12.5%, +6.25%, +25%. Try-it 1 (d=500, 80%, cap 8000): 4400/4880 (+10.9%), retained 1600/1720 (+7.5%); 8000/8000, retained 4000/5200 (+30%). Try-it 2: 1000 e^-0.25 = 778.80, 221.20 = E[X^250] (Exam C table formula), 1 - e^-0.25 = 22.1%. Statements traced: policyholder/beneficiary and deductible reasons (P-21-05 pp.2-3, 7), benefit limits and covered-loss cap (pp.8-9), claimant (Werner & Modlin p.14), Exam P objective (syllabus p.3); On other exams bullets traced to INV 201 p.7, ILA 201-U p.4, CIA FCIA GB/FIE/ILA syllabi.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), PDF pp.2-3 (policyholder pays premium; insurer pays the policyholder or his designated beneficiary), p.7 (deductible; three reasons for deductibles; policyholder covers part of the loss), pp.8-9 (benefit limits; maximum on a claim payment; 80% of the lesser of 5000 and the cost), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; Werner & Modlin, Basic Ratemaking (CAS, 2016), Ch.1 PDF p.14 (claim; claimant can be an insured or a third party alleging injuries or damages covered by the policy), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; SOA, Tables for Exam C (Fall 2009), exponential E[X ^ x] = theta(1 - e^{-x/theta}) (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes c) (expected values incl. mode, median, percentiles) and e) (amount an insurance company pays to a policyholder given deductibles, coinsurance percentages, benefit limits, inflation), PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; SOA INV 201 syllabus 2026-2027, PDF p.7: risks that can only be partially hedged or cannot be hedged, including policyholder behavior, sha256:8b5d280585ae9d0e35943729f861ac13ada7462be850c328da93645b7bbd9bc1 — https://www.soa.org/globalassets/assets/files/edu/2026/inv-201/2026-2027-inv-201-syllabus.pdf; SOA ILA 201-U syllabus 2026-2027, PDF p.4: perspectives of regulators, investors, policyholders and insurance company management regarding capital, sha256:daa04ce74955f3f9410aa18ae501d020420272b16de1fe550a788bf89c1d4e87 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-201u/2026-2027-ila-201u-syllabus.pdf; CIA FCIA syllabus, Group benefits track (2026 file), PDF pp.7, 13, 16: identify the stakeholders in an insurance policy (policyholder, insureds, including employees and dependents), sha256:bd811a7377eec93db261e916a3db6b0765be5917c843993b4acdf32f0c5a2634 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=36229&fid=17015; CIA FCIA syllabus, Financial/investment track (2026 file), PDF p.7: risks of guaranteed riders incl. policyholder behaviour; partially hedgeable or unhedgeable policyholder behaviour, sha256:596ac4b5b2e73cdc20410d14652686301c4d219b2bf85fd838751770de91b539 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=36225&fid=17007; CIA FCIA syllabus, Individual life and annuities track (2026 file), PDF p.12: policyholder behavior such as policy and premium persistency, sha256:ff0543bc33cd8d299931b668b66d589ebd03f5bc7595fd11ce67173d4e1a9097 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=36227&fid=17011
- note: Verified, medium: the worked examples are original (method from P-21-05 and the Exam C tables); 'often an employer' in the group-benefits bullet is the reading of the CIA's 'insureds, including employees and dependents'.
