---
target: questions/exam-disc-da/discda-an-025.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Blind recompute from the stem (key and explanation hidden) gave the keyed answer. 2,400,000 / 240,000 = 10x the limit recomputed; key B (check source, correct or set to missing, record) = r4ds §10.3.2/§10.4, ASOP 23 §3.3(b); A drops the row; C keeps a likely error; D caps every claim. learning_objective matches the DISC-DA page's numbered section title (DISC DA syllabus PDF pp.2-3); wiki_link tags resolve and are U.S./generic pages tested by the stem. Options distinct; explanation arithmetic resolves.
- sources_checked: Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.10 'Exploratory data analysis', §10.3.2 outliers may be entry errors; repeat with and without; disclose removal; §10.4 replace unusual values with NA rather than drop the row, sha256:ab13c323616810e786eb9f6298ed5d4b9bc50d1cebfb753d2725f91684553432 — https://r4ds.hadley.nz/EDA.html; ASB, ASOP No. 23 Data Quality (Doc. No. 185, Dec. 2016), §3.3(b) questionable values; disclose steps taken, PDF p.9, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — https://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf; The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf
- note: Vault-written question (no publisher key): medium per the MAS-I / Exam P precedent.
