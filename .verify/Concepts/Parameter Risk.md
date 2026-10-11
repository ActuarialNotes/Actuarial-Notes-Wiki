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
