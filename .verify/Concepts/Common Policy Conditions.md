---
target: Concepts/Common Policy Conditions.md
created: 2026-10-10
---

## [F-001] Premiums bullet goes beyond the form
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- severity: minor
- status: open
- locus: Premiums bullet, second sentence
- claim: Other named insureds are covered but do not owe the premium.
- evidence: IL 00 17 11 98 §E says only that the first Named Insured 'is responsible for the payment of all premiums' and 'will be the payee for any return premiums'. It says nothing about whether other named insureds owe premium, and no source read this run states that they do not. The first sentence of the bullet is the form's rule; the second is an inference stated as fact.
- source_rank: 1
- proposed_action: Delete the second sentence, or source it.
- applied: false
- fingerprint: ba620fa52e4f

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: All six conditions against IL 00 17 11 98 (cancellation 1–6 incl. 10/30 days, first named insured's last known address, pro rata vs. may be less than pro rata, effective without refund, proof of mailing; changes; books and records up to three years; inspections and surveys 1–4 incl. rating organizations and boiler/elevator carve-out; premiums; transfer and death of an individual named insured). Examples recomputed: 12,000×219/365=7,200, 0.9×7,200=6,480, 720; day 110+10=120, 120×20=2,400, 2,400−1,800=600. State-law sentence checked against NY Ins. Law §3426 (15-day notice, enumerated grounds after 60 days).
- sources_checked: ISO IL 00 17 11 98 Common Policy Conditions (specimen), §A–F p.1, sha256:965a8a0deb36ac7fcb29ae356d89b1ca01776dd99b1aae2a22cf46bb13611db2 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=IL+00+17&ed=11-98 (The Nationwide forms host regenerates its PDFs per request: bytes differ from the writer's copies, extracted text identical.); New York Insurance Law §3426(b)–(c) (NY Senate official text, read via WebFetch, no digest), (b), (c) — https://www.nysenate.gov/legislation/laws/ISC/3426
- note: Medium: the short-rate rationale and inspection/transfer rationales are uncontroversial glosses with no source read; one minor finding open (other named insureds 'do not owe the premium').

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in this run. Deleted the unsupported sentence; the Premiums bullet now says only what IL 00 17 11 98 §E says (first Named Insured responsible for all premiums and payee for return premiums).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Delta re-check of the edited Premiums bullet against IL 00 17 11 98 §E; rest of page unchanged since this run's earlier pass.
- sources_checked: ISO IL 00 17 11 98 Common Policy Conditions (specimen), §A–F p.1, sha256:965a8a0deb36ac7fcb29ae356d89b1ca01776dd99b1aae2a22cf46bb13611db2 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=IL+00+17&ed=11-98 (The Nationwide forms host regenerates its PDFs per request: bytes differ from the writer's copies, extracted text identical.); New York Insurance Law §3426(b)–(c) (NY Senate official text, read via WebFetch, no digest), (b), (c) — https://www.nysenate.gov/legislation/laws/ISC/3426
- note: Medium kept: the short-rate, inspection and transfer rationale glosses still have no source read.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Delta re-check of the edited Premiums bullet against IL 00 17 11 98 §E; rest of page unchanged since this run's earlier pass.
- sources_checked: ISO IL 00 17 11 98 Common Policy Conditions (specimen), §A–F p.1, sha256:965a8a0deb36ac7fcb29ae356d89b1ca01776dd99b1aae2a22cf46bb13611db2 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=IL+00+17&ed=11-98 (The Nationwide forms host regenerates its PDFs per request: bytes differ from the writer's copies, extracted text identical.); New York Insurance Law §3426(b)–(c) (NY Senate official text, read via WebFetch, no digest), (b), (c) — https://www.nysenate.gov/legislation/laws/ISC/3426
- note: Supersedes this run's earlier delta pass, which recorded high in error. Medium kept: the short-rate, inspection and transfer rationale glosses still have no source read.
