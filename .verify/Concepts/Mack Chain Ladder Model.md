---
target: Concepts/Mack Chain Ladder Model.md
created: 2026-10-30
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: g8-cas7-chk-bs
- date: 2026-10-30
- status_set: in_review
- checks_run: delta check of commit 62d997ba: the 'Checking the variance assumption' and 'Empirical limits' bullets read sentence by sentence against Mack fetched this session — the two plots, the weighted residual (C_i,k+1 - C_ik f_k)/sqrt(C_ik), f_k0 and its constant-variance assumption, f_k2 and Var proportional to C_ik^2, the several-k replacement rule; empirical limits from min/max individual factors, narrower for i<=4 and wider for i>=5, confidence probability rising toward recent years, 'does not seem to be reasonable'; no question numbers or wording (rule 10)
- sources_checked: Mack, Measuring the Variability of Chain Ladder Reserve Estimates (CAS Forum, Spring 1994), §3 regression view, printed pp.122-125 (PDF pp.22-25: f_k0 = sum C_ik C_i,k+1 / sum C_ik^2, f_k2 simple average, the two plots and Plots 0/1/2, 'replace ... with f_k0 or f_k2'), and the empirical limits, printed pp.133-134 (PDF pp.33-34); printed = PDF + 100, sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf
- note: Both added bullets match Mack; no changes. The page has never had a full verified pass (unverified, no sources, no prior log), and the rest of it was not checked here, so it stays in_review.
