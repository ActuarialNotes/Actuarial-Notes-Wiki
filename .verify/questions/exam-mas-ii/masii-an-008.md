---
target: questions/exam-mas-ii/masii-an-008.md
created: 2026-10-18
---

## [F-001] Rests on ISLR §5.2, a MAS-I reading, not a MAS-II one
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- severity: minor
- status: open
- locus: whole question (bootstrap standard error)
- claim: A MAS-II question computing a bootstrap standard error from the formula of ISLR §5.2.
- evidence: MAS-II Content Outline 2026 p.4 (https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf, sha256:babf0548…) assigns James et al. 'Chapters 1 (Background reading only), 2.2, 4.4.2 (Confusion Matrix Only), 8, 10, 12' - not Ch.5; p.5 names ISLR 5.1 and 5.2 only as MAS-I review and says candidates 'are expected to have mastered the concepts in Exam MAS-I'. MAS-I Content Outline 2026 p.6 (https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf, sha256:24589236…) assigns ISLR Chapter 5. So the bootstrap SE is assumed knowledge for MAS-II, examinable only through Ch.8's bagging. The arithmetic matches ISLR (5.8), PDF p.220.
- source_rank: 1
- proposed_action: Keep as MAS-I assumed knowledge or move/retag; scope decision tied to Exam MAS-II (CAS).md F-002. Not auto-fixed.
- applied: false
- fingerprint: 2723defc78d2

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: blind recomputation in Python before reading the key; every distractor's stated reasoning reproduced; explanation worked line by line; wiki_link targets exist (spaces as +) and sit on Exam MAS-II (CAS).md; topic/learning_objective match the exam page domain; format per question-writer formats.md; validate_content.py clean
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted PDF, §5.2 eq.(5.8), PDF p.220: SE_B = sqrt(1/(B-1) sum (alpha*r - mean)^2), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS, Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06 2026_1_13), p.4 James et al. chapters; p.5 MAS-I review list, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Recomputed: mean 1,000; squared deviations sum 5,800; sqrt(5,800/4) = 38.08, option D. Distractors: /sqrt(250) 2.41 (A); /sqrt(5) 17.03 (B); divisor 5 gives 34.06 (C); variance 1,450 (E). Open minor F-001: off the MAS-II readings (MAS-I assumed knowledge).

## [C-002] Bootstrap is now off the MAS-II page; F-001 left open
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:08Z/4700
- date: 2026-10-18
- note: Exam MAS-II (CAS).md F-002 was resolved this run by removing [[Bootstrap]] from the page, so this question's wiki_link no longer sits on the MAS-II page. off_syllabus is not the right tag: a current exam covers the bootstrap (MAS-I assigns ISLR Ch.5, per this log's F-001), and MAS-II outline 2026 p.5 (read today, sha256:babf0548...) says candidates 'are expected to have mastered the concepts in Exam MAS-I' and names ISLR 5.1 and 5.2 as review. My read for the maintainer: keep it as MAS-I assumed knowledge or move it to the MAS-I bank (a move needs a new id/log, since a log is not renamed). File unchanged; status stays verified (minor finding only).
