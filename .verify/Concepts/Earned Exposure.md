---
target: Concepts/Earned Exposure.md
created: 2026-09-12
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Definition diffed against Werner Ch.4 (printed p.55 = PDF p.67): 'Earned exposures represent that portion of the written exposures for which coverage has already been provided as of a certain point in time. This example inherently assumes that the probability of a claim is evenly distributed throughout the year. For instance, if all policies were written on January 1 for a period of one year, the earned exposures as of May 31 would be 5/12 of the written exposures' — this is exactly the page's pro rata bullet, and Werner's Policy C (0.75 earned in 2011, 0.25 in 2012) is the same mechanic. The non-uniform-earning bullet is Werner's footnote 8 on the same passage ('Some products (e.g., warranties) do not earn evenly'). Written/earned/unearned/in-force as the four exposure definitions confirmed at Ch.1 p.2 (PDF p.14); Table 4.1 (PDF p.63) confirms earned car year / earned house year as the personal auto and homeowners bases. Both examples recomputed from scratch before reading their answers: 100 x (12+11+...+1)/12 = 100 x 78/12 = 650 earned car-years, 650/1,200 = 54.2%, 550 unearned, and using 1,200 would scale the pure premium by 0.542 ('nearly half'); and 0.5 x 12,000 + 0.5 x 10,000 = 11,000, 4,500,000/11,000 = $409.09, 4,500,000/12,000 = $375.00, 375/409.09 - 1 = -8.3% ('an 8% understatement') — every figure reproduces, and the direction of the growing-book bias is right.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p.2 (PDF p.14) and Ch. 4 pp.51-56 (PDF pp.63-68), incl. Table 4.1 and footnote 8, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: No findings. Definition, both formulas and both worked examples confirmed against Werner Ch.4. Cross-page note (rank 4, consistency only): this page writes Pure Premium = Losses / Earned Exposures while Concepts/Exposure Base.md writes (Losses + LAE) / Earned Exposures; both readings appear in Werner depending on whether LAE is loaded into losses, so neither is filed as a finding.
