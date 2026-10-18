---
target: questions/exam-8/cas8-an-010.md
created: 2026-10-17
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: verified
- confidence: high
- checks_run: key recomputed/derived independently from the stem before reading the answer; stem premises checked against the cited reading; every option's rationale checked; options distinct and key present; validate_content.py passed; wiki_link targets exist
- sources_checked: Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), Ch.6 consistency of ILFs, PDF pp.181-182, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf
- note: Vault-written question. Recomputed layer factors 0.300, 0.180, 0.220, 0.100: the $1M xs $3M layer (1,100) exceeds the equal-width layer below it (900) -> C; key C. Bahnemann Ch.6 (PDF pp.181-182): premiums for successively higher layers of constant width decrease as the attachment point rises, a property of all expected-loss pricing with reasonable claim-size distributions; ILFs with I''(x) < 0 are called consistent, and severity-based ILFs with a continuous density are always consistent.
