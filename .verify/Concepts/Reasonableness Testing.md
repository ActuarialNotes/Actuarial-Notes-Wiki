---
target: Concepts/Reasonableness Testing.md
created: 2026-10-16
---

## [C-001] Exam 5, Exam 8 and most Exam 7 claims need sources outside this packet
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rca
- date: 2026-10-16
- locus: whole page
- note: Checked in the Exam 7 reading packet Brosius / Mack (2000) / Hurlimann. Those readings support one claim on the page: 'A credibility-weighted estimate should lie between the chain ladder and the a priori' (Mack 2000 s.2 p.335, U_c = cU_CL + (1-c)U_0 with c in [0,1]; Brosius Development Formula 2 p.13, L = Z x/d + (1-Z)E(Y); Hurlimann (3.1)). None of the three states the rest: the Exam 5 ratemaking/reserving/monitoring bullets (Werner & Modlin, Friedland), the excess-layer and net-vs-gross checks (Sahasrabuddhe, Siewert, Friedland 2022), Shapland's standard-error/CoV patterns, Meyers' uniformity test with the 136/sqrt(n) K-S band, the 'slanted S = light tails' reading and Meyers' finding for Mack on incurred data. A later pass needs Shapland (CAS Monograph #4), Meyers (CAS Monograph #8, 2nd ed.) and Friedland's Exam 5 text. Recomputation (rank 5, can only falsify) found no arithmetic error in the three examples: 1,030/845 = 1.219; 1.03 x 1.02 x 1.02 = 1.072; E = 6,000 x 0.30/0.50 = 3,600, A/E = 1.25, CL 13,125, BF 12,900; 136/sqrt(200) = 9.6, 136/sqrt(50) = 19.2. The expected-emergence identity follows from IBNR = Ult x (1 - p_t) for both CL and BF.

## [C-002] Suggestion for a writer: the Exam 7 checks Brosius states
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rca
- date: 2026-10-16
- locus: Unpaid claim estimates (Exam 7) bullet
- note: Not a finding (what a topic covers is a writer's call). Brosius, the first reading on Exam 7's A3/A11 lines, states reasonableness checks the page does not mention: intervene when a least-squares fit gives a < 0 (substitute the link ratio method) or b < 0 (substitute the budgeted loss method), p.4; and across a triangle Z should rise, and c and a fall, as years mature, 'a way to cross-check the work ... one should not believe the analysis if it makes no sense', p.18. Mack (2000) s.7 adds that its mse formulas assume the prior U_0 is independent of the observed claims, so a prior adjusted during development defeats them.

## [C-003] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rca
- date: 2026-10-16
- status_set: in_review
- checks_run: objective lines that link the page read (Exam 7 A3 and A11, Exam 5 A4/B2/B17, Exam 8); claims sorted by which reading states them; the one claim this packet's readings cover checked against Mack 2000 s.2 and Brosius Formula 2; all three worked examples recomputed (rank 5); wiki-links resolve
- sources_checked: CREDIBLE CLAIMS RESERVES: THE BENKTANDER METHOD, Section 2, p.335 (credibility mixture U_c = cU_CL + (1-c)U_0), sha256:8e9e86f6dd4ed6a402d5380dd446ebeba5e2c3d921f90828ad485a8cfb508086 — https://www.casact.org/sites/default/files/2021-03/7_Mack_2000.pdf; https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf, Development Formula 2, p.13; parameter checks p.4; Table 9 cross-check p.18, sha256:de06a701db8825c8a6384bf92f577a5fe6ccfab627379f21199df35396a2a690 — https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf
- note: in_review, not verified: most of the page rests on Shapland, Meyers and Friedland, none read in this packet. See the comment for what still needs a source.
