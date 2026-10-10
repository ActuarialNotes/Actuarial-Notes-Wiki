---
target: questions/exam-mas-i/masi-an-068.md
created: 2026-10-10
---

## [F-001] Wrong-entry formula lacks absolute-value bars
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- severity: nit
- status: open
- locus: Part a explanation, Common wrong entries (0.372)
- claim: The 0.372 wrong entry is described as checking only the before-the-jump side, $F^* - (i-1)/10$.
- evidence: Signed, F* - (i-1)/10 is negative at every point after the first (e.g. 0.5276 - 0.9 = -0.3724 at 2,250); its maximum is 0.0488, not 0.372. The value 0.372 is the largest absolute gap on that side, |0.5276 - 0.9| = 0.3724. Loss Data Analytics ch.4 (KS table) defines that side as D- = max |F*_i - (i-1)/n|, with absolute values; Q67's own table also uses absolute bars.
- source_rank: 3
- proposed_action: Write the formula as $\lvert F^* - (i-1)/10 \rvert$.
- applied: true
- fingerprint: 415fd0d7ba7b

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Absolute-value bars added in this run; the formula now gives the 0.372 it is cited for.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind recomputation from the stem before reading answer/explanation; key compared with the blind answer; every distractor's arithmetic and rationale recomputed; option distinctness; explanation arithmetic line by line; wiki_link tags against what the question tests (all resolve; validate_content.py clean); learning_objective against the Exam MAS-I domain titles and the 2026 outline tasks; stated facts against the cited sources
- sources_checked: Frees et al., Loss Data Analytics (open text), ch.4 Model Selection and Estimation, Kolmogorov-Smirnov statistic max(D+, D-), D- = max |F*_i - (i-1)/n|, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; NIST/SEMATECH e-Handbook of Statistical Methods, 1.3.5.16 Kolmogorov-Smirnov Goodness-of-Fit Test, limitation: the distribution must be fully specified; if parameters are estimated from the data the critical region is no longer valid and must be found by simulation, sha256:a6fc0668b01bdb8ecdd3b3d26d553eff8ef86441013ab3155009135baae55d1c — https://www.itl.nist.gov/div898/handbook/eda/section3/eda35g.htm; Wikipedia, "Lilliefors test", estimating the parameters moves the hypothesised CDF closer to the data, making the maximum discrepancy smaller, sha256:968208b733ff9da11084a13ce385adb4ffceedfcab6bf02abf781a61c3ebb61d — https://en.wikipedia.org/wiki/Lilliefors_test; CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: a 1 - F*(2,250) = e^-0.75 = 0.4724 -> 0.472; b C (0.386 / 0.430 / 0.515); c B; second analyst's D = 0.159 with mean 900 reproduced. Key matches all parts. F-001 (nit, fixed here): the 0.372 wrong entry's formula lacked absolute-value bars. Medium: Domain B's readings (Hogg, Tse) are commercial; facts confirmed against open rank-3 references (MAS-I precedent). LO Domain B.
