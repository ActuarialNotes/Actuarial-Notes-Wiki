---
target: Concepts/Residual Sum of Squares.md
created: 2026-10-04
---

## [F-001] Tree example says a split must beat every other partition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: example 'RSS as a Decision Tree Split Criterion', last sentence
- claim: A split is accepted if no other partition gives a lower total RSS.
- evidence: ISLR 2nd ed. §8.1.1, eqs (8.1)-(8.3), printed pp.330-331 (PDF pp.338-339): 'it is computationally infeasible to consider every possible partition of the feature space ... we take a top-down, greedy approach that is known as recursive binary splitting', choosing the predictor j and cutpoint s that minimize the RSS of the two resulting regions. Only splits of the form X_j < s versus X_j >= s are compared, not arbitrary partitions of the observations. The example's arithmetic (RSS_L = 2, RSS_R = 2, total 4) is correct.
- source_rank: 2
- proposed_action: Say the chosen split is the one, among all predictors and cutpoints, with the lowest total RSS (wording for a human).
- applied: false
- fingerprint: 920a653b223d

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: both examples recomputed before comparison (RSS = 400 + 100 + 100 = 600; tree split RSS 2 + 2 = 4) - agree; definition and SSE alias, OLS minimizes RSS, sigma-hat² = RSS/(n-p-1) df checked, SSTot = SSReg + RSS decomposition, R², tree split criterion checked; links and embed resolve; MAS-I and MAS-II (trees) usage consistent
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.1 RSS (3.3), §3.1.3 RSE (3.15)-(3.17) and R², §3.2.2 RSE (3.25) with n-p-1, printed pp.61-80 (PDF pp.71-90); §8.1.1 regression-tree RSS (8.1)-(8.3), printed pp.330-331 (PDF pp.338-339), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 2 §2.3-2.6 SSE, SSR = sum(yhat - ybar)², SSTO = SSR + SSE, ANOVA table, sha256:1e70ff328d0ed946e167ac2949a287f8b23c3ae7f407af884fe4c6e447a6be32 — https://online.stat.psu.edu/stat501/Lesson02.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 4 and 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: One minor wording finding on the tree example (F-001). Otherwise confirmed by ISLR 2nd ed.; the decomposition rests on PSU notes, hence medium.
