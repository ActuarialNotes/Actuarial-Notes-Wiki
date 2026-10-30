---
target: Concepts/Overfitting.md
created: 2026-10-30
---

## [F-001] Penalized regression called 'the remedy'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-30T22:10Z/g8C-chk
- date: 2026-10-30
- severity: nit
- status: open
- locus: body, bullet 'Actual against predicted on holdout data', last sentence
- claim: penalized regression (ridge or lasso), which shrinks the coefficients, is the remedy
- evidence: Van Calster et al., BMC Medicine 17:230 (2019), 'How to prevent or correct poor calibration?' (https://pmc.ncbi.nlm.nih.gov/articles/PMC6912996/) offers penalized regression such as Ridge or Lasso as a way to prevent overfitting and warns it is no miracle solution; it is one remedy, not the remedy. Restated as 'one way to prevent it'.
- source_rank: 3
- applied: true
- fingerprint: dd0d306c8c9f

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-30T22:10Z/g8C-chk
- date: 2026-10-30
- resolves: F-001
- status: resolved
- note: Restated in this run: penalized regression is 'one way to prevent it', as Van Calster et al. present it.

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T22:10Z/g8C-chk
- date: 2026-10-30
- status_set: in_review
- checks_run: Diff check: git diff against HEAD (last verified bytes) confined to the body, frontmatter untouched; question files read, no numbers, scenario or answer on the page; page keeps the concept-definitions shape. G8: MAS-I. Only the added bullet was checked (actual-to-predicted by holdout bucket, too-extreme predictions, penalized regression) against Van Calster et al. and Monograph 5 §7.1/§7.2.1; nit F-001 restated. Left in_review: the page has no earlier pass and the rest of it (ISLR definitions, the two worked examples, the SRM/PA/ATPA exam claims) was not checked in this packet.
- sources_checked: Van Calster, McLernon, van Smeden, Wynants & Steyerberg, 'Calibration: the Achilles heel of predictive analytics', BMC Medicine 17:230 (2019): slope < 1 means estimated risks too extreme (too high for high risk, too low for low risk); overfitted algorithms give predicted risks that are too extreme on new data; penalized regression (Ridge, Lasso) to prevent overfitting — https://pmc.ncbi.nlm.nih.gov/articles/PMC6912996/; Goldburd et al., CAS Monograph 5, 2nd ed., §7.1 printed p.76 (actual vs predicted on holdout data; sort by prediction, buckets of equal aggregate weight, averages of actual and predicted per bucket) and §7.2.1 printed p.77 (quantile plots: quintiles, deciles, vigintiles), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
