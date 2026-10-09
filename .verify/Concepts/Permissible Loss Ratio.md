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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.7 p.139 (PDF p.151) re-read: 'The expense and profit provisions ... are used to calculate a variable permissible loss ratio (VPLR) or the total permissible loss ratio (PLR)'; VPLR = 1.0 - V - Q_T is 'the percentage of each premium dollar that is intended to pay for the projected loss and LAE and projected fixed expenses'; PLR = 1.0 - V - F - Q_T is 'the percentage ... intended to pay for the projected loss and LAE'; 'If all expenses are treated as variable expenses, the VPLR and PLR are the same.' The head of the page now gives both formulas with Werner's names, the indicated change against the VPLR, and the all-variable form against the PLR; the example's 1 - 0.22 - 0.05 = 0.73 is relabelled VPLR and 'Werner convention' (both forms are Werner's) becomes 'fixed expenses in the numerator'.

## [F-002] All variable expense method said to give 'the same overall rate level'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: major
- status: open
- locus: bullet on the all-variable convention
- claim: 'This is the all-variable expense method; it gives the same overall rate level and distorts the distribution across policy sizes.'
- evidence: Werner Ch.7 pp.129-130 (PDF pp.141-142), 'Potential Distortions Using this Approach': the $20 fixed expense equals 8% of the $250 final premium, so the all variable method gives the same $250 'because the fixed dollar amount of $20 is exactly equivalent to 8% of $250 (i.e., this is the average risk)'; Table 7.3: it 'undercharges the risks with premium less than the average and overcharges the risks with premium more than the average'. Werner shows equality for the average risk with the ratio measured at the final premium, not equality of the overall indication. The page's own example contradicts the bullet: 0.68/0.73 - 1 = -6.85% vs 0.60/0.65 - 1 = -7.69%, recomputed. A candidate would carry away a false equivalence.
- source_rank: 2
- proposed_action: State Werner's result: same rate for the average risk only; undercharges below-average, overcharges above-average premium risks.
- applied: true
- fingerprint: 70f686203700

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Bullet now: the all variable expense method 'reproduces the fixed-expense result only for the average risk — Werner & Modlin's $20 fixed expense is exactly 8% of the $250 average premium — and undercharges risks with below-average premium while overcharging those above it' (Werner pp.129-130, PDF pp.141-142). The example's existing explanation of the one-point gap is now consistent with it.

## [F-003] Unsourced claims: catastrophe load in the PLR, 'most common error', reinsurance tied to a gross indication
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet on reinsurance and catastrophe load; end of the all-variable bullet; combined-ratio bullet
- claim: 'The PLR should include a provision for the net cost of reinsurance where the indication is built gross, and for any catastrophe load handled as a percentage rather than in the loss projection.'; 'double-counts fixed expenses and is the most common error on this topic'; 'a 70% PLR with a 25% variable expense ratio implies a target combined ratio of 95%'.
- evidence: Werner Ch.7 p.137 (PDF p.149): the net cost of non-proportional reinsurance 'may be included as an expense item in the overall rate level indication' — as an alternative to reducing losses for recoveries and premium for the ceded amount. No source read puts a catastrophe load in the PLR; Werner Ch.6 p.94 (PDF p.106) adds the catastrophe provision to losses. 'Most common error' is not in Werner. Under the total PLR (1 - V - F - Q_T) the 70/25/5 arithmetic needs the 25% to be the total expense ratio, not the variable one.
- source_rank: 2
- proposed_action: Restate the reinsurance point per Werner p.137; delete the catastrophe clause and 'most common error'; say total expense ratio.
- applied: true
- fingerprint: bc1335c17a6f

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Reinsurance bullet now Werner p.137 (PDF p.149); catastrophe clause and 'most common error' deleted; combined-ratio bullet says 'total expense ratio' (0.70 + 0.25 = 0.95, profit 0.05).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: VPLR and PLR definitions and meanings against Werner p.139; loss ratio indication comparing (loss & LAE ratio + fixed expense ratio) with the VPLR against p.143 ('this method compares the sum of the projected loss and LAE ratio and the projected fixed expense ratio to the variable permissible loss ratio'); fixed expenses 'assumed to be the same for each risk' against p.139; all-variable distortions against pp.129-130. Examples recomputed before reading: 0.68/0.73 = 0.93151 (-6.8%); 0.60/0.65 = 0.92308 (-7.7%); 0.68/0.65 = 1.04615 (+4.6%); agency 0.77/0.68 = +13.2%, captive 0.79/0.75 = +5.3%, direct 0.84/0.86 = -2.3%.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p.94 (PDF p.106); Ch. 7 pp.129-130, 137, 139 (PDF pp.141-142, 149, 151); Ch. 8 p.143 (PDF p.155), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: F-001 (major) resolved; two new findings (F-002 major, F-003 minor) fixed and resolved. Confidence medium: the distribution-channel commentary and both examples are vault-authored.
