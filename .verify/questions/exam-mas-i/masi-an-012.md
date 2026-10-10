---
target: questions/exam-mas-i/masi-an-012.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind recomputation from the stem before reading answer/explanation; key compared with the blind answer; every distractor's arithmetic and rationale recomputed; option distinctness; explanation arithmetic line by line; wiki_link tags against what the question tests (all resolve; validate_content.py clean); learning_objective against the Exam MAS-I domain titles and the 2026 outline tasks; stated facts against the cited sources
- sources_checked: Mahler & Dean, "Credibility", ch.8 of Foundations of Casualty Actuarial Science (SOA study note C-21-01), 5.3 conjugate priors: gamma posterior alpha+C, lambda+Y; posterior mean (alpha+C)/(lambda+Y), PDF pp.101-102, sha256:bccdb7968ae276e041bf7f6eb5aea3aea473f1dc7739bc64352419c8a6a0f3c5 — https://www.soa.org/globalassets/assets/files/edu/C-21-01.pdf; CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: A (2+1)/(10+1)=0.2727, B (2+2)/(10+4)=0.2857 -> B. Key B. All four distractor constructions reproduced (0.227; 0.300/0.400; 0.467/0.400 with Z=t/(t+alpha); raw 1.000/0.500). Mahler & Dean's lambda is the gamma rate 1/theta, matching the explanation's 1/theta + t. Medium (not a MAS-I reading). Tags tested; LO Domain A.
