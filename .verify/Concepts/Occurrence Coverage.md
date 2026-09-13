---
target: Concepts/Occurrence Coverage.md
created: 2026-09-13
---

## [F-001] Mature claims-made cost uses an average-lag exponent; the lag-weighted computation gives 1,061.78 not 1,060
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/03f2
- date: 2026-09-13
- severity: minor
- status: open
- locus: Example 'Why the Occurrence Form Costs More', claims-made answer
- claim: Avg lag = 0.4(0)+0.3(1)+0.2(2)+0.1(3) = 1.0 year, therefore Cost = 1,000 x 1.06^(2-1.0) = 1,060.
- evidence: Recomputed from scratch before reading the answer. A mature claims-made policy covering report year 2026 picks up accident years 2026/2025/2024/2023 at weights 0.4/0.3/0.2/0.1, so its expected cost is 1,000 x [0.4(1.06^2) + 0.3(1.06^1) + 0.2(1.06^0) + 0.1(1.06^-1)] = 449.44 + 318.00 + 200.00 + 94.34 = 1,061.78. Putting the average lag into the exponent instead (1.06^1.0 = 1,060.00) understates it by 1.78, because 1.06^x is convex - Jensen, not a rounding slip. Werner & Modlin Ch. 16 p.315 (PDF p.327) does the lag-weighted sum cell by cell in Table 16.3: with 20% per lag over five lags and 5% trend the claims-made loss cost is 1,000.00 and the occurrence loss cost 1,105.13 = 200 x (1.05^0+...+1.05^4), never an average-lag exponent. The occurrence side of the page's example (1,000 x 1.06^2 = 1,123.60) is exact, and the qualitative conclusion is unaffected (1,123.60/1,061.78 - 1 = +5.8%, so 'about 6% cheaper' still holds). sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: Compute the claims-made cost as the lag-weighted sum (1,061.78), as Werner Table 16.3 does, or keep 1,060 but label it an approximation that uses the average lag in the exponent.
- applied: false
- fingerprint: c99d1b9fdd84
