---
target: Concepts/Parameter Risk.md
created: 2026-10-11
---

## [F-001] 'Parameter risk does not diversify with volume' contradicts Marshall and Mack
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7raa
- date: 2026-10-11
- severity: major
- status: open
- locus: bullet 'It does not diversify with volume.'
- claim: It does not diversify with volume. Process CoV shrinks roughly like 1/sqrt(volume). A misestimated factor, however, is applied to every year, so a large book still carries it in full.
- evidence: Marshall et al. (2008) section 2.2 (PDF p. 11): independent risk comprises 'the random component of parameter risk' and the random component of process risk; internal benchmarking (PDF p. 24): for independent risk 'the law of large numbers implies that the larger the portfolio, the lower the volatility arising from random effects'. Only parameter selection error (Figure 1, PDF p. 10) sits in internal systemic risk. Mack (1994) (D13), p. 150 (PDF p. 50): the estimation-error part of the mse is C_iI^2 sum (alpha_k^2/f_k^2)/sum_j C_jk, which falls as the column volumes sum_j C_jk grow. So the random part of parameter risk does shrink with volume; the page states the opposite as a general rule, and then attributes the random/selection split to Marshall in the same bullet.
- source_rank: 2
- proposed_action: Restate the bullet to what Marshall says: the random component of parameter risk is independent risk, which falls as the portfolio grows; parameter selection error is internal systemic (model specification) risk, common across claim groups.
- applied: false
- fingerprint: 9c56f74ef1d0

## [F-002] Worked example generalises a conditional result
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7raa
- date: 2026-10-11
- severity: minor
- status: open
- locus: example 'Process and Parameter Variance in a Cape Cod Fit', last sentence
- claim: That is why parameter risk dominates for large books: their process risk has largely diversified away.
- evidence: The example's doubling holds only under its stated premise 'with the same ELR uncertainty' (the ELR standard error held at 0.05 as volume doubles). Marshall et al. PDF pp. 11 and 24: the random component of parameter risk is independent risk and falls with portfolio size, so the general conclusion does not follow. Recomputed: R = 2,800, process 140,000, parameter 40,000, PE 424.3, CoV 15.2%, parameter share 22% - the arithmetic itself is right.
- source_rank: 2
- proposed_action: Delete the generalising sentence; keep the conditional doubling statement.
- applied: false
- fingerprint: c848dccb442d

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7raa
- date: 2026-10-11
- status_set: in_review
- checks_run: variance decomposition; Mack's 1/sum C term (D13); Clark's parameter variance and the 12-parameter / 55-point LDF fit, 4,688,826 -> 3,143,967 parameter SD and 'variance cut in half' (page images, Clark pp. 65, 69); bootstrap and MCMC placement (Shapland, Meyers); Marshall's independent/internal systemic split (Figure 1, s.2.2); example 1 recomputed blind (R 2,800, PE 424.3, CoV 15.2%, 22%) and example 2 (ELR95 0.7822 -> 3,911; SD 390.5; R95 4,142; gap 231) - arithmetic agrees
- note: One major finding (the 'does not diversify with volume' bullet) and one minor finding on the first example's closing sentence are open; the clean-up round restates the bullet to Marshall and deletes the sentence.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rab
- date: 2026-10-11
- resolves: F-001
- status: resolved
- note: Bullet restated to Marshall et al. (PDF pp. 10-11, 24): '**Its random part falls with volume; selection error does not.** ... the random component of parameter risk is independent risk, which the law of large numbers makes smaller as the portfolio grows. Parameter selection error is internal systemic risk, also called model specification risk (a model risk), and is potentially common across claim groups'. The unsourced 'does not diversify with volume' sentences are removed.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rab
- date: 2026-10-11
- resolves: F-002
- status: resolved
- note: Deleted the generalising sentence 'That is why parameter risk dominates for large books: their process risk has largely diversified away.' The conditional statement before it (same ELR uncertainty: process variance doubles, parameter variance quadruples) stays; it is correct under its stated premise.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rab
- date: 2026-10-11
- status_set: verified
- confidence: high
- checks_run: re-check after the clean-up edits: the restated bullet against Marshall s.2.2 and Figure 1 (PDF pp. 10-11) and internal benchmarking (PDF p. 24); the trimmed example's remaining text against its own premise; the rest unchanged since the e7raa pass (Mack D13 term, Clark 12 parameters / 55 points and 4,688,826 -> 3,143,967, variance cut in half, bootstrap/MCMC placement, both examples recomputed)
- sources_checked: Marshall, Collings, Hodson and O'Dowd, A Framework for Assessing Risk Margins (2008), Sections 1.3-2.2 incl. Table 1 and Figure 1 (PDF 7-11), internal benchmarking (PDF 24-25), sha256:534ad0edf3b2294d2d1421b1d17df1fc0837f1fe3a4e430db347a6abbcc8c774 — https://www.casact.org/sites/default/files/2021-03/7_Marshall_et_al.pdf; Clark, LDF Curve-Fitting and Stochastic Reserving, CAS Forum Fall 2003, Sections 2.3-2.4 (PDF 13-14) and the LDF/Cape Cod examples, pp. 65 and 69 (PDF 25, 29), sha256:1db0baa8ca6aef6711e6483601de5be6e180f016b1110a7fb0e49765c0953b9e — https://www.casact.org/sites/default/files/2021-03/7_Clark.pdf; Mack, Measuring the Variability of Chain Ladder Reserve Estimates, CAS Forum Spring 1994, assumptions (3)-(5) pp. 109-113, formulas (6)-(9) pp. 115-117, formula (11) p. 120, Appendices D and F pp. 150-154 (PDF 9-20, 50-54), sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf; Shapland, CAS Monograph 4 (2016), Sections 1, 3.2-3.4, 4.1.1, 5.5.1, 6, 6.1 (pp. 1-3, 8-19, 21-22, 41-49; PDF 9-11, 16-27, 29-30, 49-57), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf; Meyers, CAS Monograph 8 (2019), Sections 1, 3-5, 7-8, 12 (pp. 1-2, 6-22, 31-42, 77-80; PDF 11-12, 16-32, 41-52, 87-90), sha256:3c01999f6c8a170dc412968658d4f7d673d637e74cb27d84b4173ea60532d2d1 — https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf; Verrall, Variance 1(1) 2007, Sections 1, 3, 5, 6.1 (pp. 53-60, 61-63, 65-66; PDF 1-8, 9-11, 13-14), sha256:da4a19ac50ec7756ad651c5632e73b71ff99f584d7db436772f94de1ec024506 — https://www.casact.org/sites/default/files/2021-03/7_Verrall.pdf
- note: F-001 and F-002 resolved; clean.
