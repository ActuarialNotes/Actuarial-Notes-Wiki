---
target: Concepts/Control Variable.md
created: 2026-10-04
---

## [F-001] A territory/class priced outside the model is listed as a control variable; the Monograph enters it as an offset
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: bullet 1 (common control variables), line 18
- claim: Common control variables in ratemaking include accident year or calendar year (to absorb trend) and a territory or class variable that is priced separately outside the model.
- evidence: Monograph 5 sec.2.6 (printed p.17, PDF p.27): where 'a base loss cost that varies by region or class ... is derived outside of the GLM-based analysis', 'the GLM must be made aware of its existence so that the estimated coefficients for the other variables are optimal in its presence. GLMs provide the facility to do so through the use of an offset'; sec.9.2 (p.90, PDF p.100): for territories modelled separately, 'This is accomplished by including territory in your model as an offset'. The Monograph's 'control variable' (sec.5.1.3, p.46, PDF p.56) is the temporal variable (year) included so trend, development and rate changes 'do not influence the parameter estimates of the rating variables' — the page's first example. Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; a PCPA syllabus reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf. Calling a separately priced territory or class a control variable inverts the control-vs-offset distinction MAS-I task C6 tests ('Understand and apply control and offset variables in GLMs', 2026 outline PDF p.5).
- source_rank: 3
- proposed_action: Delete 'and a territory or class variable that is priced separately outside the model' (the rest of the sentence is the Monograph sec.5.1.3 usage), or say such variables enter as offsets per secs.2.6 and 9.2.
- applied: false
- fingerprint: 52e1a7f09803

## [F-002] 'Control variables are still checked for significance and reasonableness' — not found in any source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 4, line 21
- claim: Control variables are still checked for statistical significance and reasonableness in the parameter estimate table, even though they will not appear in the final rating plan
- evidence: Not located in the sources read for this page. Monograph 5 sec.5.1.3 (printed p.46, PDF p.56) describes the temporal control variable only as picking up trend, development and rate-change effects 'so that they do not influence the parameter estimates of the rating variables', adding that 'the individual effects of development, trend, etc. are usually not of interest in models built for the purpose of rating' — nothing on testing the control's own significance; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf. Neither the 2026 MAS-I outline (task C6, PDF p.5; sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf) nor Larsen (pp.1-3; Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf) says anything on it.
- source_rank: 3
- proposed_action: Cite a source for the practice or delete the bullet.
- applied: false
- fingerprint: 26b8d04ba203

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: definition and year-as-control vs Monograph sec.5.1.3; F-001 re-confirmed against Monograph secs.2.6/9.2; coefficient estimated vs offset fixed at 1 vs Monograph sec.2.6; omitted-variable effect on correlated rating variables vs Monograph sec.2.9; example (calendar year as control) vs sec.5.1.3; figure read; links resolve
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.5.1.3 (temporal variable as a control, PDF p.56); sec.2.6 and sec.9.2 (separately priced territory/class as an offset, PDF pp.27, 100); sec.2.9 (GLM separates each variable's effect from correlated ones, PDF p.37); CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), task C6, PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: F-001 (major) confirmed and left open. New F-002 (minor): the 'still checked for significance' bullet has no source. Linked by the MAS-I exam page only.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Bullet 1 split: the control variable is now the temporal variable (accident or calendar year) picking up trend, loss development and rate changes the target has not been adjusted for (Monograph sec.5.1.3, PDF p.56); new bullet: a territory or class priced separately outside the model is not a control variable but enters as an offset with its coefficient fixed, so the other variables are fitted in its presence (Monograph sec.2.6, PDF p.27: base loss cost by region or class 'derived outside of the GLM' -> 'GLMs provide the facility to do so through the use of an offset'; sec.9.2, PDF p.100: 'including territory in your model as an offset'). Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Bullet 'Control variables are still checked for statistical significance and reasonableness in the parameter estimate table ...' deleted: no source read this session states it (Monograph sec.5.1.3 PDF p.56 says only that the temporal effects 'are usually not of interest' and are controlled for; its one significance remark is about testing year after the target has already been adjusted, a different claim). Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: every edit re-read: temporal control variable vs Monograph 5.1.3; separately priced territory/class as an offset vs Monograph 2.6 and 9.2; deleted bullet confirmed unsourced; estimated-vs-fixed coefficient vs Monograph 2.6; omitted-variable effect vs Monograph 2.9; example (calendar year as control) vs 5.1.3; figure labels read (no territory/class claim); links resolve
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sec.2.6 (PDF p.27), sec.2.9 (PDF p.37), sec.5.1.3 (PDF p.56), sec.9.2 (PDF p.100), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 6 (PDF p.5), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Resolve run: F-001 (major) and F-002 (minor) resolved. Medium: the page rests on the rank-3 Monograph.
