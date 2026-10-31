---
target: Concepts/Short-Term Insurance Coverage.md
created: 2026-10-31
---

## [F-001] "group health" listed as a short-term line with no source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- severity: minor
- status: open
- locus: lead sentence, list of lines
- claim: Short-term coverages include "property, liability, auto, workers compensation, group health".
- evidence: LDA 1.1.3 defines short-term contracts (typically a year or six months, U.S. auto often six months) and LDA 1.1/1.2 name property, auto, liability and workers compensation (casualty) lines; none of the sources read this session classifies group health. The FAM syllabus Topic 7(b) lists health among the long-term coverages, so the line is not self-evidently short-term to a FAM reader.
- source_rank: 3
- proposed_action: Source "group health" from the SOA GH syllabus/readings (the GH-101 and GH-201U pages link this page), or delete it.
- applied: false
- fingerprint: 942a1373bd54

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Short-term definition and renewal against LDA 1.1.3/1.2.2; indicated-rate formula against LDA 7.2.1 and W&M ch.8; BF outstanding ELR x EP x (1-1/CDF) against Friedland ch.9; chain-ladder against LDA 11.3.1; both examples recomputed independently (E[(X-1000)_+]=4,093.65, rate 469.99, +6.8%; CL 4.5M, BF 3.9M); FAM/ASTAM wording against the syllabi; wiki-links resolve.
- sources_checked: Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.1, 1.1.3 Insurance Processes (short-term: a year or six months; one-period model), 1.2.2 Renewing Insurance (decline, new premium at renewal), sha256:2c2039e91e3cd3a8b02d046160e76b59b69c79c3b891b63adf8f7900f48421dc — https://openacttexts.github.io/Loss-Data-Analytics/ChapIntro.html; Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.7, 7.2.1 Pure Premium Method: Premium = (Losses + Fixed)/(1 - V - Q), sha256:e2b442d46d43ea67112f4a7a8f3b2cbb8e6437db8600722d5ea1a1c5f19c8408 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPremiumFoundations.html; Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.11, 11.1.1 IBNR and RBNS claims; 11.3.1 deterministic chain-ladder, sha256:040c5904f5d17dccd17772da19b8d45cf2a23fbec75661549d5168e6e611e939 — https://openacttexts.github.io/Loss-Data-Analytics/ChapLossReserves.html; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.9 Bornhuetter-Ferguson: Ultimate = Actual Paid + Expected Claims x % Unpaid; Z = 1/CDF; unpaid claims develop on expected claims, PDF pp.158-159 (printed 152-153), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.8 pure premium vs loss ratio methods, indicated change vs current rate, PDF p.158; unearned premium definition, PDF p.78, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; SOA Exam FAM Syllabus, February 2027, Topic 5 (ELR, chain-ladder, BF; ratemaking adjustments; loss cost and loss ratio methods), p.5, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf
- note: One minor finding open (F-001, "group health" unsourced); everything else checks.
