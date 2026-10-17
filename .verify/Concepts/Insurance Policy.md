---
target: Concepts/Insurance Policy.md
created: 2026-10-17
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: in_review
- checks_run: Exam 8 bullet and retro example checked against Fisher Ch.2; other bullets searched for in the Exam 8 and cached 6C readings; examples recomputed
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 §1-3, §7, PDF pp.21-26, 30, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf
- note: Left in_review. Checked: the after-expiration bullet against Fisher Ch.2 §1-3 (guaranteed cost fixed up front; incurred retro first evaluated about 6 months after expiration then annually; credit risk on additional premium; premium audit of exposures) and the retro example (111,280; return 13,720; 202,800 capped at 200,000; charge 88,720). Not checked this run: the policy-anatomy list, the Exam 6C Canadian-law bullet (utmost good faith, contra proferentem, deemed statutory conditions - not found in CAS Financial Reporting or Dutil) and the Exam 9 risk-adjusted pricing bullet; these need those exams' readings. Second example recomputed (1,020 and 1,090).

## [F-001] Retro evaluation timing attributed to the NCCI plan
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: minor
- status: open
- locus: After expiration (Exam 8) bullet, last sentence
- claim: Under the NCCI plan the first computation comes six months after expiration, with further ones annually.
- evidence: Fisher Ch.2 §3 (PDF p.26) says that for incurred loss retrospective rating plans losses are "typically" first evaluated 6 months after policy expiration (18 months of development) and then annually, and its footnote 5 says the chapter is not specific to NCCI's or ISO's plans. The NCCI attribution is not in the reading.
- source_rank: 2
- proposed_action: Attribute the timing to Fisher et al. ("typically") or cite NCCI's Retrospective Rating Plan Manual.
- applied: false
- fingerprint: 0e569f8ec847

## [F-002] Other-exam bullets not checked against their readings
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: minor
- status: open
- locus: Anatomy, Canadian law (Exam 6C) and Pricing (Exam 9) bullets
- claim: Policy anatomy (declarations, insuring agreement, definitions, exclusions, conditions, endorsements); Canadian courts read coverage broadly, exclusions narrowly and ambiguity against the drafter; statutory conditions deemed into policies; risk load set by capital consumed in the portfolio.
- evidence: None of these appears in the Exam 8 readings (Fisher, Bahnemann, Goldburd). Searches of the cached 6C readings (CAS Financial Reporting, Dutil) for "good faith", "contra proferentem", "ambiguity" and "statutory conditions" returned nothing. The Exam 6C, DISC-IA and Exam 9 readings that might support them were not read this run.
- source_rank: 2
- proposed_action: Verify each bullet in that exam's pass and cite the reading, or remove what no reading supports.
- applied: false
- fingerprint: eb544bc4e276
