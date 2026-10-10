---
target: questions/exam-disc-rm/discrm-an-245.md
created: 2026-10-10
---

## [F-001] Distractor C is true under one documented usage
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- severity: minor
- status: open
- locus: option C
- claim: Option C, 'A non-waiver agreement takes effect when the insurer sends it, whether or not the insured responds', is keyed wrong on the basis that a non-waiver agreement needs the insured's signature.
- evidence: ALFA International, Reservation of Rights 101 §1: a non-waiver agreement is 'sometimes' a bilateral agreement signed by both parties, but 'Other insurers use the term non-waiver agreement when referring to a letter sent to the insured immediately after the claim is tendered' - a unilateral notice. Under that usage C describes the document accurately. B remains the best answer, so the key stands.
- source_rank: 3
- proposed_action: Reword C so it is false under every usage (e.g. 'A non-waiver agreement is a denial of coverage'), or qualify B/C with 'in its bilateral form'.
- applied: false
- fingerprint: 12ad59627633

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Recomputed blind from the stem (answer and explanation stripped) before reading the key; blind B = key. ROR generally unilateral, non-waiver agreement sometimes bilateral (ALFA §1); ROR is not a denial and lets the insurer defend without waiving (IRMI); untimely ROR risks waiver/estoppel (ALFA §3) refutes D.
- sources_checked: Dunn & Fencl, Reservation of Rights 101 (ALFA International), §§1, 3: ROR generally unilateral, non-waiver agreement sometimes bilateral, untimely ROR risks waiver/estoppel, jurisdictional variation, sha256:bcfbba032e5df89d121c693bc0226a8b0c8e9f90c9f3d8a84ef46879cc162d08 — https://www.alfainternational.com/publications_news/reservation-of-rights-101/; IRMI glossary, 'reservation of rights', sha256:ada48198a157a8c1c8d24b80c061118d4ac01e8fdc21df0f28d2cba0746333b4 — https://www.irmi.com/term/insurance-definitions/reservation-of-rights
- note: Vault-written; medium; one minor finding open on distractor C.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Option C reworded to 'A non-waiver agreement is a denial of coverage, sent once the investigation is complete', false under both usages ALFA documents; its why-not line rewritten.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the option C rewrite: B still the only correct statement (ALFA §1); C now false (a non-waiver agreement preserves the right to deny, it is not a denial); A and D as before.
- sources_checked: Dunn & Fencl, Reservation of Rights 101 (ALFA International), §§1, 3: ROR generally unilateral, non-waiver agreement sometimes bilateral, untimely ROR risks waiver/estoppel, jurisdictional variation, sha256:bcfbba032e5df89d121c693bc0226a8b0c8e9f90c9f3d8a84ef46879cc162d08 — https://www.alfainternational.com/publications_news/reservation-of-rights-101/; IRMI glossary, 'reservation of rights', sha256:ada48198a157a8c1c8d24b80c061118d4ac01e8fdc21df0f28d2cba0746333b4 — https://www.irmi.com/term/insurance-definitions/reservation-of-rights
- note: Medium.
