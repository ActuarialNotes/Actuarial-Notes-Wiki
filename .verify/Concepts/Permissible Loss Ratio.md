---
target: Concepts/Permissible Loss Ratio.md
created: 2026-09-12
---

## [F-001] Headline formula is Werner's VARIABLE permissible loss ratio, labelled PLR
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- severity: major
- status: open
- locus: Headline formula block, first display equation
- claim: PLR = 1 - V - Q_T, with the total-expense form 1 - V - F% - Q_T given only as an 'all-variable' convention.
- evidence: Werner Ch. 7 p.139 (PDF p.151) defines two distinct quantities: 'The variable permissible loss ratio is calculated as follows: VPLR = 1.0 - V - Q_T' and 'The total permissible loss ratio is calculated as follows: PLR = 1.0 - V - F - Q_T', noting 'If all expenses are treated as variable expenses, the VPLR and PLR are the same.' Both terms are live in the same text's exhibits: Appendix B-5 line (21) 'Variable Permissible Loss Ratio 81.2%' = 100% - 13.8% - 5.0%, while Appendix C-7 line (11) 'Permissible Loss Ratio 70.3%' = 100% - 34.7% expense&ULAE - (-5.0%) profit. The page never uses the term VPLR, so a reader asked for 'the permissible loss ratio' is pointed at the wrong one of the two definitions. The page's arithmetic is all correct: 0.68/0.73 = -6.8%, 0.60/0.65 = -7.7%, and the double-count 0.68/0.65 = +4.6% are each reproduced. Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: Label the first formula VPLR (variable permissible loss ratio) and state Werner's total PLR = 1 - V - F% - Q_T alongside it, keeping the existing numerator/denominator discussion.
- applied: false
- fingerprint: c646a123d5a3

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- status_set: verified
- confidence: medium
- checks_run: Headline formula compared with Werner's VPLR and total PLR definitions (p.139) and with both appendix exhibits that use them; the all-variable claim 'same overall rate level, distorted by policy size' checked against Werner p.129's 'Potential Distortions Using this Approach' and his p.130 worked identity ($180/[1-(0.15+0.08)-0.05] = $250); both worked examples recomputed from scratch (0.68/0.73 = -6.85%, 0.60/0.65 = -7.69%, double-count 0.68/0.65 = +4.6%; agency 0.77/0.68 = +13.2%, captive 0.79/0.75 = +5.3%, direct 0.84/0.86 = -2.3%).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp.129-130 and p.139 (PDF pp.141-142, 151), and Appendix B-5 / C-7 (PDF pp.363, 380), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: All arithmetic reproduces; the open major finding is definitional — the headline PLR is Werner's VPLR.
