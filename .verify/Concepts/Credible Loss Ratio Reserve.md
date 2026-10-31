---
target: Concepts/Credible Loss Ratio Reserve.md
created: 2026-10-31
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: g8-cas7-chk-pk
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: whole page (never verified): every definition and formula against Hürlimann eqs 2.1-2.8 (m_k, p_i, q_i, individual and collective reserves, Mack 1997 loss ratio method, same-premium agreement), 3.1-3.3 (credible reserve; Benktander Z = p_i; Neuhaus Z = p_i x sum m_k), Theorem 3.1 (iteration collective -> Benktander -> individual), 4.4-4.7 (Mack 2000 conditional model, Z = p/(p+t)), 4.11 (all three mse formulas), 6.1-6.6 (t* = sqrt(p) at f = 1, Z* <= 1/2 with equality at the first origin period, monotone decreasing weights, Benktander and Neuhaus usually higher; minimum mse and variance), 6.9-6.13 (p^CL = 1/F, chain-ladder reserve, Cape Cod as a Benktander-type mixture with LR = sum C / sum p^CL V and Z = p^CL, optimal Cape Cod), 6.14 (optimal BF); the 0.382 crossover derived from Z* = p/(p+sqrt p) (rank 5, consistent); both examples recomputed blind (totals 1,364.29 / 1,450.00 / 1,412.50 / 1,420.00 / 1,415.48; mse 20,000 / 17,071 / 14,268 / 14,146 / 14,142); links resolve
- sources_checked: Hürlimann, Credible Loss Ratio Claims Reserves: The Benktander, Neuhaus and Mack Methods Revisited (ASTIN Bulletin 39(1), 2009), printed pp.81-94 (PDF pp.1-14: eqs 2.1-2.8, 3.1-3.5, 4.4-4.7, 4.11, 6.1-6.14, Theorem 6.1, abstract and Section 1 conclusions), sha256:83ebe8ec5758fdb800e168175d6b7f2a6862a2d85bf8314875fcc7d5d1453c28 — https://www.casact.org/sites/default/files/2021-03/7_Hurlimann.pdf
- note: Formulas read from rendered page images (PDF pp.8, 11, 13), since the text layer drops the equations. Commit 822d12c4's two edits (Neuhaus as payout factor times the ELR; the chain-ladder and Hürlimann Cape Cod sub-bullets) say what eqs 3.3 and 6.9-6.13 say. No findings.
