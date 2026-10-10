---
target: Concepts/Insurer Goals and Constraints.md
created: 2026-10-10
---

## [C-001] Pass incomplete: goal framework unsourced
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- note: Checked: loss ratio indicated-change formula (Werner & Modlin Ch.8, PDF p.157), operating income = underwriting + investment (Rejda Ch.7 p.129), mutuals need surplus (Rejda Ch.5). Examples recomputed (6.85%; 0.312M, 3.0% margin; capacity 120M < 130M). Not verified: the four major goals (profit, customer needs, legal compliance, duty to society) and the internal/external constraint lists - no source read states them (The Institutes' text is not freely available; a secondary study-aid list adds rating agencies and public opinion as external constraints). Left in_review.

## [F-001] U.S. page links Canadian-framed regulation pages
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- severity: minor
- status: open
- locus: Comply with legal requirements bullet
- claim: Links [[Solvency Regulation]], [[Rate Regulation]] and [[Market Conduct Regulation]] for U.S. regulatory oversight.
- evidence: Solvency Regulation opens with OSFI's federal mandate; Rate Regulation and Market Conduct Regulation are framed around Canada and the provinces (followups note D2 created U.S. pages, e.g. State Market Conduct Regulation, State and Federal Insurance Regulation).
- source_rank: 4
- proposed_action: Relink to the U.S. regulation pages.
- applied: false
- fingerprint: 361043d21796

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: in_review
- checks_run: every definition, list, rule and attribution checked against the sources listed; every worked example recomputed; all [[links]] resolve; U.S. framing reviewed
- sources_checked: Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.8 (PDF p.157) loss ratio method, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.7 p.129 (PDF p.148), sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0
- note: Left in_review: goal and constraint framework unsourced (see comment).
