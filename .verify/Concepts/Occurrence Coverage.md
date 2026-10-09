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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Recomputed: 1,000 x [0.4(1.06^2) + 0.3(1.06) + 0.2 + 0.1/1.06] = 449.44 + 318.00 + 200.00 + 94.34 = 1,061.78, the lag-weighted sum as in Werner Table 16.3 (Ch.16 p.315, PDF p.327). The example now computes it that way, notes the average-lag exponent (1,060) slightly understates it, and gives the gap as 1,061.78/1,123.60 - 1 = -5.5% (was 'about 6%'). Occurrence figure shown as 1,123.60.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Trigger against Werner p.314 (occurrence covers claims occurring in the period whatever the report date; aggregated by accident year, a diagonal); pure IBNR from reporting lag p.312; 'decades' replaced by Werner's 'many years'; pricing bullet rewritten — the page said occurrence costs more because of compounded uncertainty, Werner's reason is Principle 1 (cost increases) with greater pricing risk as a separate point; history bullet rewritten to Werner p.312 (1960s-70s, professional liability) — the unsourced list of occurrence lines and '1970s and 80s' removed. Example 1 dates checked; Example 2 recomputed (1,123.60 and 1,061.78, -5.5%); the 'price of the permanent tail' sentence replaced by Werner's step-factor reason.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.16 pp.312-319 (PDF pp.324-331), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: F-001 fixed. Medium: examples are vault-authored.
