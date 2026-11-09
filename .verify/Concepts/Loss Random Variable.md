---
target: Concepts/Loss Random Variable.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Definition (X = loss before policy provisions, Y = payment after them) against P-21-05 §VI PDF p.7 (loss vs claim payment; a 500 deductible pays 1500 on a 2000 loss, nothing below 500) and SOA sample solution Q101 (X = claim before the deductible, Y = claim payment after it); syllabus Topic 2 e-f names the loss random variable and the payment amount random variable; per-loss formula Y = 0 for X<=d, X-d for X>d against P-21-05 p.7; example recomputed before reading the answer: substituting y = x-500 gives e^-0.5 x 1000 = 606.53, agrees with stated 606.5, and with Tables A.3.3.1 (E[X] - E[X^500] = 1000 e^-0.5) and the Q101 solution (E[Y] = P(X>d) x mean, memoryless); 6 wiki-links and 1 embed resolve
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), §III theorem on S_n (PDF pp.4-5), §VI Deductibles (PDF p.7) and Benefit Limits (PDF pp.8-9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q101 (PDF pp.30-31), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 2 outcomes e-f (PDF p.3) and Topic 3 outcome i (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; SOA, Tables for Exam C (Fall 2009), A.3.3.1 Exponential (PDF p.11) and A.2.3.1 Pareto (PDF p.8), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf

## [F-001] Trap marks 'a deductible censors' as a mistake; the per-loss deductible variable is left censored
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-06T18:02Z/0389
- date: 2026-11-06
- severity: major
- status: open
- locus: Exam traps, third bullet
- claim: Censoring and truncation swapped. A limit censors the loss from above. A deductible truncates it from below.
- evidence: Loss Data Analytics Ch.3 §3.4.1 (ChapSeverity.html, sha256:263021bf...): Y^L = (X - d)+ 'is often referred to as left censored and shifted variable because the values below d are not ignored'; only Y^P is 'left truncated and shifted ... because the claims smaller than d are not reported'. Werner & Modlin PDF p.130: deductibles leverage severity trend analogously to excess losses 'except that the censoring is done below the deductible'. So the per-loss payment the page leads with (Y = (X - d)+) is a censored variable, and the trap tells a student who says so that they have swapped the terms. The body bullet (a deductible truncates: losses below d may never be seen, the rest shifted by d) is the per-payment view and is correct as written.
- source_rank: 2
- proposed_action: Delete the trap bullet (the body already gives the truncation view correctly); optionally an author adds the per-loss/per-payment split from LDA §3.4.1.
- applied: true
- fingerprint: 893e201cf186

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-11-06T18:02Z/0389
- date: 2026-11-06
- resolves: F-001
- status: resolved
- note: Deleted the 'Censoring and truncation swapped' trap bullet; the source contradicts its claim that a deductible only truncates. No replacement prose written. The body bullet on truncation (per-payment view) is unchanged and supported by LDA §3.4.1.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:02Z/0389
- date: 2026-11-06
- status_set: verified
- confidence: medium
- checks_run: Recomputed in python before comparing (scipy quad / closed forms): uniform(0,1000) table: d=200 -> 0/250/700, limit 600 -> 150/450/600, d=200 & 80% -> 0/200/560; means 500, 320, 400, 420; P(Y>400) = P(X>700) = 0.3; E[X] - d = 300 vs 320. Try-its: 1000e^-0.5 = 606.53; e^-2250/2000 = 0.3247; life: a.. = 14, P = 21.43, S + P/d = 1428.57, Var 61,224.5, SD 247.4. All agree. Definitions vs P-21-05 p.7, LDA §3.4.1-3.4.2 (censoring/truncation, which raised F-001), W&M pp.129-130. Life section vs Hartman slide 31 (benefit 1, scaled to S), Valdez slides 4-6 and the FAM syllabus Topic 10. ALTAM's syllabus does not name the loss random variable; it assigns policy values (AMLCR Ch.7-9), whose definition is the expected future loss, so the attribution is read as consistent. Links resolve.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05), §VI Deductibles: loss vs claim payment, 500 deductible pays 1500 on 2000 PDF p.7; Benefit limits PDF pp.8-9, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; Frees et al., Loss Data Analytics (open text), Ch.3 Modeling Loss Severity, §3.4.1 Y^L left censored and shifted, Y^P left truncated and shifted, E(Y^L) = int_d^inf (x-d) f; §3.4.2 X^u right censored, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.6 basic limits losses censored at the limit PDF p.129; deductible censoring below the deductible PDF p.130, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; B. Hartman, Stat 344 Life Contingencies I, Ch.6 Premiums (BYU), slide 31: L0 = v^(K+1) - P a..(K+1), E[L0] = A - P a.., Var(L0) = (1 + P/d)^2 (2A - A^2), sha256:da3f77bfcd709a519f2c4982b1969fa3d62c4ec4b410117ad00dedf510dee5e8 — https://hartman.byu.edu/docs/344Files/Stat344_Chapter6.pdf; E. Valdez, STT 456 Premium Calculation (MSU, 2015), slides 4-5: L0 = PVFB0 - PVFP0; equivalence principle E[L0] = 0, sha256:7b4af6694606f8ee6a4ad037032100e510c0f7d382d2f47d6f85044cff02cc98 — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks1to2-S2015.pdf; E. Valdez, STT 456 Policy Values (MSU, 2015), slide 6: future loss L_t = PVFB_t - PVFP_t, policy value tV = E[L_t], sha256:3ace4861349a3e83d119f5e4b1490970d1fc3dc70409fc2213e0584b1c255a5f — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks2to4-S2015.pdf; SOA Exam FAM syllabus, October 2026, Topic 10 outcome a: future loss random variables; outcome b equivalence principle, PDF p.7, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; SOA Exam ALTAM syllabus, October 2026, outcomes: policy values for state-dependent and joint-life insurance; AMLCR 3rd ed. Ch.7 §§2.4, 4, Ch.8-9 assigned, PDF pp.2-6, sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf; SOA Probability Exam (Exam P) syllabus, November 2026, Topic 2 outcomes e-f, PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; SOA, Tables for Exam C (Fall 2009), A.3.3.1 exponential PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf
- note: One major found and fixed by deletion (trap bullet contradicted by LDA and W&M). Medium: ALTAM attribution rests on its policy-value outcomes, not on a named outcome.
