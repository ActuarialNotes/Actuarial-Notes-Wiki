---
target: Concepts/Boosting.md
created: 2026-10-18
---

## [F-001] Bias framing, gradient boosting and the lambda claim go beyond the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: lead ('boosting attacks bias'); bullet 5 (gradient boosting, Poisson/Tweedie); example answer ('usually a slightly better minimum')
- claim: Boosting attacks bias; gradient boosting generalizes to any differentiable loss, used for Poisson and Tweedie responses; a smaller lambda usually gives a slightly better minimum.
- evidence: ISLR §8.2.3 (pp.345-348) describes boosting as learning slowly by fitting residuals; it never says it 'attacks bias', omits classification details, never mentions gradient boosting, Poisson or Tweedie, and says only that 'very small lambda can require using a very large value of B'. Full-text search 'gradient boost' / 'Tweedie': not in the reading.
- source_rank: 2
- proposed_action: Cite a source for these (e.g. ESL ch.10, Friedman 2001) or delete them.
- applied: false
- fingerprint: d1e97d219103

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: read the routed ISLR pages before the page; formula-by-formula comparison; full-text search of every named method; worked examples recomputed independently; wiki-links and embeds resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.2.1-8.2.3 and 8.2.5, printed pp.340-347, 351-352 (PDF pp.348-355, 359-360), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.3.3-8.3.4 lab, printed pp.358-360 (PDF pp.366-368), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Updates (8.10)-(8.11), output (8.12), sequential fitting to residuals, no bootstrap, three tuning parameters with B by CV and overfitting if too large, lambda 0.01/0.001, d splits / stumps additive / interaction depth all match pp.345-347; d up to 4 matches the lab (interaction.depth=4, p.359). F-001 open. Also linked from Exam SRM and Exam PA.
