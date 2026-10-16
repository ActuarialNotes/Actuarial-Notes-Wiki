---
target: Concepts/Actuarial Assumptions.md
created: 2026-10-16
---

## [F-001] Venter's alternatives all replace the same assumption
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- severity: minor
- status: open
- locus: Last bullet
- claim: Venter's alternatives to the chain ladder (a constant added to the factor, Bornhuetter-Ferguson, Cape Cod) each drop a different chain ladder assumption.
- evidence: Venter pp.812-819 (PDF pp.6-13): the linear-with-constant, factor-times-parameter (BF) and Cape Cod models are all 'alternative emergence patterns' under Implication 2, 'superiority of factor assumption to alternative emergence patterns', and Implications 1-4 'are tests of assumption (1)'. Each replaces assumption (1), E[q(w,d+1) | data] = f(d)c(w,d), with a different expected-emergence formula; none of them drops assumption (2) independence or (3) the variance assumption. Venter, Testing the Assumptions of Age-to-Age Factors (PCAS 1998), pp.809-819 (PDF pp.3-13): assumptions, testable implications, Implication 1, alternative emergence patterns, sha256:58523222aa33f1b8c82455818e8c2da1b8f24aee7d83badf8c88d2f71a638dcb — https://www.casact.org/sites/default/files/database/proceed_proceed98_980807.pdf
- source_rank: 2
- proposed_action: Restate: each replaces the chain ladder's assumption about expected emergence with a different emergence pattern.
- applied: false
- fingerprint: c791cfa7b158

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- status_set: in_review
- checks_run: Mack eq. (3) and the other two assumptions; ASOP 43 secs. 3.6.2 and 4.2(b) word by word; Venter Implications 1-6, the 2-standard-deviation rule and its alternatives; Shapland residual diagnostics; both examples recomputed (tail IBNR 1,500 vs 3,000, 20,000 vs 21,500, 7.5%; 0.35 < 0.40); link check
- sources_checked: Mack, Measuring the Variability of Chain Ladder Reserve Estimates (1994), eqs. (3)-(5), pp.107-113 (PDF pp.7-13), sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf; ASOP No. 43, Property/Casualty Unpaid Claim Estimates (Doc. No. 159), sec. 3.6.1-3.6.2 p.6 (PDF pp.10-11), sec. 3.7.3 p.8 (PDF p.13), sec. 4.2 p.10 (PDF p.15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.casact.org/sites/default/files/2021-03/5_ASOP_43.pdf; Venter, Testing the Assumptions of Age-to-Age Factors (PCAS 1998), pp.809-819 (PDF pp.3-13): assumptions, testable implications, Implication 1, alternative emergence patterns, sha256:58523222aa33f1b8c82455818e8c2da1b8f24aee7d83badf8c88d2f71a638dcb — https://www.casact.org/sites/default/files/database/proceed_proceed98_980807.pdf; Shapland, Using the ODP Bootstrap Model (CAS Monograph #4, 2016), eq. (3.16) p.11 (PDF p.19); Sections 4.1-4.9 pp.20-30 and 5.1-5.3 pp.31-37 (PDF pp.28-45), eqs. (4.8)-(4.10), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf
- note: Holds against Mack, ASOP 43, Venter and Shapland except one minor misattribution (F-001), to be restated in the clean-up round.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rbb
- date: 2026-10-16
- resolves: F-001
- status: resolved
- note: Restated in run e7rbb to Venter pp.812-819: the alternatives each replace the chain ladder's assumption about expected emergence with a different emergence pattern.

## [C-002] Actuarial Assumptions re-verified after the clean-up
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rbb
- date: 2026-10-16
- status_set: verified
- confidence: high
- checks_run: delta re-check of the corrected bullet against Venter pp.812-819; link check; the rest unchanged since e7rba's check
- sources_checked: Mack, Measuring the Variability of Chain Ladder Reserve Estimates (1994), eqs. (3)-(5), pp.107-113 (PDF pp.7-13), sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf; ASOP No. 43, Property/Casualty Unpaid Claim Estimates (Doc. No. 159), sec. 3.6.1-3.6.2 p.6 (PDF pp.10-11), sec. 3.7.3 p.8 (PDF p.13), sec. 4.2 p.10 (PDF p.15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.casact.org/sites/default/files/2021-03/5_ASOP_43.pdf; Venter, Testing the Assumptions of Age-to-Age Factors (PCAS 1998), pp.809-819 (PDF pp.3-13): assumptions, testable implications, Implication 1, alternative emergence patterns, sha256:58523222aa33f1b8c82455818e8c2da1b8f24aee7d83badf8c88d2f71a638dcb — https://www.casact.org/sites/default/files/database/proceed_proceed98_980807.pdf; Shapland, Using the ODP Bootstrap Model (CAS Monograph #4, 2016), eq. (3.16) p.11 (PDF p.19); Sections 4.1-4.9 pp.20-30 and 5.1-5.3 pp.31-37 (PDF pp.28-45), eqs. (4.8)-(4.10), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf
- note: Re-verified after F-001 was fixed; holds against Mack, ASOP 43, Venter and Shapland.
