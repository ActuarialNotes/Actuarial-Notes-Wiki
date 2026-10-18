---
target: Concepts/Insurance Risk.md
created: 2026-10-18
---

## [F-001] Parameter risk split into four aspects; the CAS accepted five
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Brehm's components of underwriting risk'
- claim: Parameter risk is subdivided into estimation, projection, event and systematic risk.
- evidence: CAS Exam 7 Spring 2017 Q22(b) examiner's report, PDF p.87, on the Brehm reading: 'The following aspects of parameter risks were accepted: a. Estimation risk b. Projection risk c. Event risk d. Systematic risk e. Model risk.' The page lists the first four and gives model risk only as a separate link elsewhere. A candidate taking the page's list as complete would leave out an aspect the examiners accept. Brehm itself could not be read, so it is open whether the book lists model risk as a fifth aspect or as part of estimation risk. The page's event-risk examples (a court ruling, a latent exposure, a new cause of loss) agree with the same report, which counts a catastrophe as event risk as a common error.
- source_rank: 1
- proposed_action: With the study-kit text in hand, check how Brehm subdivides parameter risk. If model risk is one of its aspects, add it to the list; if it sits inside estimation risk, say so in the bullet.
- applied: false
- fingerprint: d318a960d745

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: in_review
- checks_run: every worked example recomputed (CV 30.4%/5.83%, parameter share 74%; Bin(1000,0.002) P(N<=5)=0.984, P(N<=6)=0.996, SD 353k, 99th pct 1.5M vs 25M, ratio 17); variance decomposition; links resolve; $$ balance; Brehm parameter-risk aspects compared with the CAS 2017 Q22 examiner's report
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B and D tasks, readings, and complete text references (Brehm et al.: tasks D1-D6; Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, and 5 (5.4 only); source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS Exam 7 Spring 2017 — sample answers and examiner's report, Q22 PDF pp.86-87 (accepted aspects of parameter risk), Q24 PDF pp.93-95 (scenario planning), Q25 PDF p.96 (behavioral cycle models), sha256:c32697af25fff52e2c5e1e49de12dacd66662b78644bbb28fba827da035c03c4 — https://www.casact.org/sites/default/files/2021-01/17-7.PDF
- note: Brehm et al. could not be read: the CAS supplies it only in the Exam 9 study kit (outline p.8, source key SK); no authorized free copy was found (web search; Guy Carpenter's ermbook.guycarp.com no longer resolves; the Wayback Machine was unreachable from this session, connection reset). D7 default applies. The Brehm attributions (components of underwriting risk) are corroborated only in part, by the 2017 Q22 examiner's report (F-001). The A.M. Best impairment claim and the reserve-risk statements were not checked against any source. Linked from SOA GI-201 and ILA-201 pages too (in development), whose readings were not read.

## [C-002] Run-id correction for this run's entries
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:56Z/8a71
- date: 2026-10-18
- note: Run-id correction. The entries dated 2026-10-18 that carry run_id 2026-10-18T15:01Z/0103 were written by the Brehm et al. reading packet, run 2026-10-18T14:56Z/8a71, not by the Clark/Bernegger packet that owns 0103. This file has nothing to do with the Clark/Bernegger packet. The run id was read from a scratch file that a concurrent agent overwrote. The entries' content is unchanged; their run summary is .verify/_runs/2026-10-18T14-56Z-8a71.md.
