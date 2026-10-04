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
