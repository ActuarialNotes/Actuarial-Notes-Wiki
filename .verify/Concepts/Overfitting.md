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

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Whole page, as the 2026-10-30 comment C-001 asked (only the actual-vs-predicted bullet had been checked). Read every link (all resolve). Definition, the two inequalities, flexibility measures, the U-shape and its bias-variance cause against ISLR §2.2.1-2.2.3 (definition quoted near-verbatim from printed p.32); detection by validation set, CV and OOB against ISLR §5.1 and §8.2.1; remedies (pruning, variable selection, regularization, bagging/forests, more data) against ISLR §6, §8 and §3.1.2; Goldburd §4.3 for noise vs signal; the actual-vs-predicted bullet re-read against Goldburd §7.1-7.2.1 and Van Calster et al. (unchanged since F-001's restatement). Traps: training < test gap (ISLR p.32), B in bagging vs boosting (ISLR §8.2), more data cures variance not bias (ISLR §2.2.2, §3.1.2). SRM, PA and ATPA bullets against their syllabi. Examples recomputed (rank 5): train A 6.5, test A 1.5, test B 12.5 (8.3 times); model C overfits, B does not, by ISLR's definition. No new findings; no edits.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer, 2021; CAS-hosted copy), §2.2.1 printed pp.29-33 (PDF pp.40-44: training MSE falls monotonically, test MSE U-shaped, overfitting defined as small training and large test MSE when a less flexible model would do better); §2.2.2 (bias-variance); §2.2.3 printed p.41 (larger K less flexible); §3.1.2 printed p.66 (more observations, smaller standard error); §5.1 (validation set, CV); §8.1.1 (pruning alpha); §8.2.1-8.2.3 (OOB error; large B does not overfit bagging or random forests; boosting can overfit if B too large), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §4.3 printed pp.38-39 (noise vs signal; a model that includes noise in its estimates is overfit; holdout testing); §7.1 printed p.76 and §7.2.1 printed p.77 (actual vs predicted on holdout, buckets of equal weight, quantile plots), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Van Calster, McLernon, van Smeden, Wynants & Steyerberg, 'Calibration: the Achilles heel of predictive analytics', BMC Medicine 17:230 (2019): slope < 1 means estimated risks too extreme; overfitted algorithms give predicted risks that are too extreme on new data; penalized regression (Ridge, Lasso) to prevent overfitting — https://pmc.ncbi.nlm.nih.gov/articles/PMC6912996/; SOA, Exam SRM syllabus, January 2027, outcomes 1c and 4a, pp.2,4, sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf; SOA, ATPA learning objectives (Jan 2022), outcome (g), p.3, sha256:16d5e74841e90fdb61402248cb585dc8d7a3ceedbf678341478145a9e2fb4410 — https://www.soa.org/globalassets/assets/files/edu/2022/2022-01-atpa-learning-objectives.pdf; SOA, Exam PA syllabus, October 2026, tree outcome 'Construct, prune, and validate regression and classification trees'; regularized regression; written responses, sha256:1f1c46424d78ac04c297bf6c121bf9d03aec7d451560335cc9e07c7c533a4d84 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-exam-pa-syllabus.pdf
