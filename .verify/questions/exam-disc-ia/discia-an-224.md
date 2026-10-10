---
target: questions/exam-disc-ia/discia-an-224.md
created: 2026-10-10
---

## [F-001] Explanation repeats the Wikipedia-only charitable immunity dates
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: Explanation, option B
- claim: B is outdated: between the 1940s and 1992 almost every state abrogated or limited charitable immunity.
- evidence: The answer is unaffected (B is outdated): Picher v. Roman Catholic Bishop of Portland, 2009 ME 67, quoting Prosser & Keeton, and Restatement (Second) s.895E confirm virtually all states rejected complete charitable immunity. The '1940s and 1992' date range is only in Wikipedia (rank 3). Same finding as on Concepts/Defenses Against Negligence.md.
- source_rank: 3
- proposed_action: Drop the date range or cite a primary source, together with the concept page.
- applied: false
- fingerprint: 74ae5a68d343

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind recomputation from the stem before reading the key; key and every distractor explanation checked against the sources; wiki_link tags and learning_objective (exact exam section title) checked; question_lint clean
- sources_checked: Cornell LII Wex, "sovereign immunity", whole entry, sha256:16b2651a31fd3dce1d1d950f2aaac31dd411e62af79901dc93a001da76ca1cbc — https://www.law.cornell.edu/wex/sovereign_immunity; Picher v. Roman Catholic Bishop of Portland, 2009 ME 67 (Me. SJC), paras 12-17 (Restatement s.895E; Prosser & Keeton), read via WebFetch 2026-10-10 (host refuses scripted fetch, no hash) — https://caselaw.findlaw.com/court/me-supreme-judicial-court/1010006.html; IRMI Glossary, "charitable immunity", whole entry, sha256:47ebf562ed2ec4097fd4bc0536f6cab0fdaf2f5a419d9b0f82903cbf112fe6c1 — https://www.irmi.com/term/insurance-definitions/charitable-immunity; Wikipedia, "Charitable immunity" (rank 3), lead, sha256:c5c858f200396511907d662f8c47c5fade366dea21cdf8cffb637848e3235084 — https://en.wikipedia.org/wiki/Charitable_immunity; Heino v. Harper, 306 Or. 347 (1988) (Caselaw Access Project), Restatement s.895F discussion, sha256:da9c72437d9d8a0b53f37086f9e6e6a6d03bea17d44f218c15ac0d68f4a76e5c — https://static.case.law/or/306/cases/0347-01.json
- note: Blind answer matched the key. Key A: government cannot be sued without consent; FTCA waived federal immunity (LII). Distractors B and C confirmed outdated by Picher (Me. 2009) and Heino v. Harper (Or. 1988). Vault-written question with no publisher key, so medium per the MAS-I / Exam P precedent. Open: one minor finding.
